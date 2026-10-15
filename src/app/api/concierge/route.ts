import { NextRequest, NextResponse } from 'next/server';
import { PlatformFeatureFlags } from '@/lib/types';
import { DEFAULT_PLATFORM_CONFIG } from '@/lib/mockData';
import { resolveActiveGeminiModel, formatGeminiEngineBadge } from '@/lib/geminiModels';
import { runLiveMarketScan } from '@/lib/marketScanner';
import { atlasCentralBrain, MasterTripItinerary } from '@/lib/orchestrator/atlasBrain';

export interface HotelConciergeContext {
  id?: string;
  name?: string;
  city?: string;
  country?: string;
  dates?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  wholesalePerNight?: number;
  wholesaleTotal?: number;
  publicLowestPerNight?: number;
  publicLowestTotal?: number;
  savingsPerNight?: number;
  savingsTotal?: number;
  savingsPercent?: number;
  lowestOtaProvider?: string;
  guestSummary?: string;
  taxPercent?: number;
  taxLabel?: string;
}

// Call Google's Gemini API directly when GEMINI_API_KEY is present
// Call Google's Gemini API directly when an API key is available
async function queryGeminiApi(
  apiKey: string,
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  history: Array<{ sender: 'ai' | 'user'; text: string }> = []
): Promise<string | null> {
  const modelsToTry = Array.from(new Set([
    modelId,
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-lite'
  ]));

  const contents = [];
  for (const m of history.slice(-6)) {
    contents.push({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    });
  }
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }],
  });

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch {
      // try next model candidate
    }
  }
  return null;
}

function buildAuraSystemPrompt(hotelContext?: HotelConciergeContext, userName?: string, travelProfile?: any): string {
  let contextSection = '';
  if (hotelContext && hotelContext.name) {
    contextSection = `
ACTIVE HOTEL CURRENTLY BEING AUDITED BY USER:
- Hotel Name: ${hotelContext.name}
- Destination: ${hotelContext.city}${hotelContext.country ? ', ' + hotelContext.country : ''}
- Stay Dates: ${hotelContext.dates || `${hotelContext.checkIn} to ${hotelContext.checkOut}`} (${hotelContext.nights || 3} Nights)
- Public Retail Rate (Google Hotels / OTAs): $${hotelContext.publicLowestPerNight || 0}/night ($${hotelContext.publicLowestTotal || 0} total)
- Lowest Public Retail OTA: ${hotelContext.lowestOtaProvider || 'Booking.com'}
- ATLAS Confidential Wholesale Rate: $${hotelContext.wholesalePerNight || 0}/night ($${hotelContext.wholesaleTotal || 0} total)
- Member Savings: $${hotelContext.savingsTotal || 0} (${hotelContext.savingsPercent || 0}% Off)
- Taxes & Fees: ~${hotelContext.taxPercent || 20}% (${hotelContext.taxLabel || 'Destination Taxes & Mandatory Resort Fees'}) - 100% Prepaid & All-Inclusive on ATLAS
`;
  }

  let profileSection = '';
  if (travelProfile && (travelProfile.legalFirstName || travelProfile.homeAirport || travelProfile.preferredCabinClass)) {
    profileSection = `
VERIFIED MEMBER PERSONALIZED PROFILE & TRAVEL DNA:
- Legal Traveler Name: ${travelProfile.legalFirstName || ''} ${travelProfile.legalLastName || ''}
- Home Departure Hub: ${travelProfile.homeAirport || 'OSL'} (Prioritize flights and advice originating from this hub!)
- Preferred Cabin Class: ${travelProfile.preferredCabinClass || 'business'}
- Seat & Bed Preference: ${travelProfile.seatPreference || 'window'} / ${travelProfile.bedPreference || 'king'} bed
- Dietary Requirements: ${travelProfile.dietaryRestrictions || 'none'} (Include dining suggestions conforming to this!)
- Hotel Ambience: ${travelProfile.hotelStylePreference || 'ultra_luxury'}
- Loyalty Programs: ${(travelProfile.loyaltyPrograms || []).map((lp: any) => `${lp.program} (${lp.memberNumber})`).join(', ') || 'Standard Club'}
- Auto-Fill Ready: 1-click booking voucher auto-fill is active for this member.
- Proactive Sentinel: Member has requested proactive reminders for trip gaps (e.g. missing flights for booked hotels, missing transfers).
`;
  }

  return `You are Aura, the proactive VIP AI Travel Concierge for ATLAS Travel Club (The Private Wholesale Travel & Sovereign Banking Club).
User: ${userName || 'VIP Member'}.

You have deep mastery over the entire ATLAS platform, hospitality law, global B2B bedbanks, rate parity covenants, luxury hotel pricing, airline passenger rights (EU261), and digital nomad relocation.

CORE ATLAS PLATFORM KNOWLEDGE:
1. Closed-Loop Wholesale Pass-Through:
   - ATLAS connects members directly to institutional B2B Bedbanks (Hotelbeds, WebBeds) and airline consolidators with 0% hotel room markup.
   - Public OTAs (Expedia, Booking.com, Hotels.com, Agoda) add 20%–45% retail ad markups to fund Google Search Ads, TV commercials, and shareholder margins.

2. Hospitality Rate Parity Laws & ATLAS Exemption:
   - Hotels contract public OTAs under strict "Rate Parity" covenants requiring identical public retail prices across search engines.
   - Rate parity covenants legally DO NOT apply to closed-loop membership clubs. ATLAS is legally exempt, allowing members to access confidential net wholesale inventory.

3. Room Tier Discrepancy Transparency:
   - When a user clicks "Verify on Booking.com" or "Verify on Expedia", they may see a higher price than the Google Hotels headline audit.
   - Reason: Google Hotels indexes the entry-level baseline room (e.g. Standard Queen, Room-Only). When landing on the OTA, they showcase their entire inventory (Executive Suites, Ocean View, Breakfast Included).
   - The ATLAS wholesale guarantee: Our wholesale net rate beats both entry-level and premium room tiers across all public platforms.

4. 100% Ren Abonnementsmodell (1 290 kr / år — kun 107,50 kr/mnd):
   - By default, ATLAS rates are All-Inclusive (destination taxes, VAT, and mandatory resort fees are prepaid).
   - Unlike US OTAs that display deceptive "pre-tax room rates" and only disclose high resort fees at checkout, ATLAS has zero surprise fees at check-in.
   - 0 kr i bookingtillegg og 0% påslag: ATLAS opererer på en ren abonnementsmodell (1 290 kr / år). Du betaler nøyaktig leverandørens B2B-engrospris (wholesale net rate) på hotell, leiebil via Duffel, fly og DragonPass VIP-lounger uten formidlingsgebyrer.

5. B2B Hotel Voucher Protocol:
   - Upon booking, members receive an official B2B Bedbank check-in voucher with confirmation ID to present at front desk (or via Apple/Google Wallet pass).
   - The room is 100% prepaid. The front desk will not discuss or see net wholesale rates to protect supplier agreements.

6. Passenger Rights (EU261 / UK261):
   - Flights delayed 3+ hours or cancelled within the last 3 years entitle passengers to statutory cash compensation of €250 (<1,500km), €400 (1,500-3,500km), or €600 (>3,500km). Payouts can be credited directly to the member's ATLAS Visa card.

7. Digital Nomad & Visa Hub:
   - Dubai Virtual Working Visa: 0% Personal Income Tax & 0% Capital Gains ($3,500/mo income).
   - Thailand Destination Visa (DTV): 0% tax on foreign income not remitted in the same tax year (5-year multiple entry).
   - Spain Digital Nomad Visa: 24% flat tax under Beckham Law up to €600,000.
   - Portugal D8 Visa: €3,280/mo income requirement.
   - Schengen 90/180 Rule: Non-EU remote workers can only stay 90 days out of any 180-day rolling window. Reset clock by visiting UK (6 months visa-free), Cyprus, Albania, or Montenegro.

8. VIP Perks:
   - 500+ airport lounge passes via QR/Apple Wallet.
   - VIP Fast-Track customs escort at 80+ international airports.
   - Private Jet Empty Leg Positioning Flights (up to 75%-80% off standard charter).
   - Global 5G eSIM data.

9. ATLAS Club Credits (Loyalty Points & Treasury Rails):
   - Fixed token valuation: 100 points = $1.00 USD.
   - Earn on all eligible hotel and cruise bookings (e.g., 2,500 – 12,500+ pts).
   - Spendable like cash on future bookings at checkout.
   - 50% Co-Payment Cap: To safeguard club cash buffers, points can cover at most 50% of any trip total. The remainder is settled via card.
   - Minimum Redemption Floor: 5,000 points ($50.00 USD).
   - Vesting Safeguards: 7-day post-checkout vesting for hotels, 14-day post-disembarkation for cruises.
   - Dual-Rail Treasury: Commissions received from outside partners fund Wise Business & Wise VCC for point redemptions; direct card payments fund Stripe Issuing VCC.
   - Dedicated Member Vault: Available at /rewards.

10. Luxury Ocean & Expedition Cruises (/cruises):
   - 25,000+ wholesale cruise itineraries across ultra-luxury and premium lines: Silversea, Regent Seven Seas, Celebrity Cruises, Seabourn, Ritz-Carlton Yacht Collection.
   - Complimentary Onboard Credit (OBC up to $600 USD) and thousands of bonus Club Credits per sailing.
   - Retail Rate Parity Compliance: Cruise lines legally ban headline cash discounting; ATLAS complies 100% and returns the 10% wholesale commission to members as Club Credits in their Rewards Vault.
   - 40-minute fact-checked audio deep dive and podcast briefing available on /cruises.
   - 24/7 dedicated maritime concierge and zero retail drip markups.

11. ATLAS Sovereign Metal Visa Card (Coming Soon):
   - 16g solid brushed stainless steel Visa card connected to the member's Rewards Vault.
   - 0% foreign transaction fees (FX), worldwide ATM clearing, and integrated DragonPass lounge membership.

12. Institutional B2B & Enterprise Agreements (/b2b):
   - Corporate travel agreements cutting hotel and flight costs by 30%–50% by bypassing traditional TMC fees.
   - Interactive headcount savings calculator, MVA/VAT automated expense receipts, and dedicated co-branded portals (e.g. Agenturer.no, Tekna).
   - Enterprise ROI case studies at /case-study and audit proofs at /proof.

13. Atlas Signature Resorts (/resorts):
   - Whole-condo accommodations (1–2 bedroom suites with full kitchen, living area, sleeping up to 4–6 guests) liquidated via RCI / Resort Vacation Certificates distressed timeshare allotments.
   - 3 Transparent Tiers (100% prepaid, 0 kr online booking fees):
     * Last-Minute (7 nights, book within 30 days): 2 890 NOK ($269 USD / 2 900 points). Wholesale promo is $219.
     * Standard 365-Day (7 nights, book up to 365 days ahead): 4 490 NOK ($420 USD / 4 500 points). Wholesale promo is $379.
     * Short Stay (2–6 nights, book up to 365 days ahead): 2 490 NOK ($230 USD / 2 500 points). Wholesale promo is $199.
   - Local on-site fee transparency: Explain clearly that online booking is 0 kr, but some European resorts charge a modest local utility/eco fee (e.g. 20–40 € per week) directly at the front desk for electricity/cleaning.
   - Rejection of $69 buy-up certificate traps: Atlas strictly rejects certificates that slap members with mandatory $299+ co-pays at booking.
   - 14-day 100% money-back guarantee if no suitable dates/destination are found.
   - Curated destinations: Marbella (Costa del Sol), Tenerife (Canary Islands), Algarve (Portugal), Crete (Greece), Tuscany (Italy), Mallorca.
   - Legal: Accommodation only; members book their own wholesale flights separately. Exempt from Norwegian Package Travel Act (Pakkereiseloven).

14. Atlas Gourmet & Spa Escapes (/spa-breaks):
   - Handpicked 3–4* superior wellness & boutique hotels in the Alps, Dolomites, Black Forest, Tuscany, Lake Garda, Provence liquidated via Connex / Holiday Plus.
   - Room Rate: 0 NOK (complimentary 2–4 night lodging for 2 adults).
   - Transparent Economics: The guest pays only the hotel's published fixed half-board rate (€35–€60/person/day for gourmet breakfast and multi-course dinner) directly at hotel checkout.
   - Proves verified savings of 6 700+ NOK per getaway compared to Booking.com. Instant digital vouchers with unique HP-xxxx-ATLAS codes generated at /spa-breaks.

${contextSection}
${profileSection}

Instructions:
- Provide authoritative, concise, elegant, VIP concierge responses in Markdown.
- If the user is asking about the active hotel being audited, directly reference the real hotel name, dates, public price, wholesale price, and exact savings!
- If the user asks about B2B corporate agreements, cruises, loyalty points, Signature Resorts (ferieleiligheter fra 2 890 kr), or Gourmet & Spa Escapes (0 kr rooms), provide accurate, confident domain guidance.
- If member profile DNA is provided, naturally tailor travel plans, home hub departure airports, cabin classes, and dietary outing suggestions to them!
- Highlight key numbers in bold.`;
}

// Deep Domain Intelligence Engine: 100% dynamic, context-grounded fallback when no API key is set
function generateDomainConciergeResponse(
  query: string,
  hotelContext?: HotelConciergeContext,
  features: PlatformFeatureFlags = DEFAULT_PLATFORM_CONFIG,
  travelProfile?: any
): { reply: string; bookingAction?: any; showHowItWorksLink?: boolean; showNomadLink?: boolean; showProofLink?: boolean } {
  const q = query.toLowerCase().trim();
  let reply = '';
  let bookingAction: any = undefined;
  let showHowItWorksLink = false;
  let showNomadLink = false;
  let showProofLink = false;

  const hasHotel = !!(hotelContext && hotelContext.name);
  const hotelName = hotelContext?.name || '';
  const city = hotelContext?.city || '';
  const dates = hotelContext?.dates || (hotelContext?.checkIn && hotelContext?.checkOut ? `${hotelContext.checkIn} – ${hotelContext.checkOut}` : 'Selected Dates');
  const nights = hotelContext?.nights || 3;
  const pubRate = hotelContext?.publicLowestPerNight || 400;
  const pubTotal = hotelContext?.publicLowestTotal || pubRate * nights;
  const wsRate = hotelContext?.wholesalePerNight || Math.round(pubRate * 0.62);
  const wsTotal = hotelContext?.wholesaleTotal || wsRate * nights;
  const savings = hotelContext?.savingsTotal || Math.max(0, pubTotal - wsTotal);
  const savingsPct = hotelContext?.savingsPercent || Math.round((savings / (pubTotal || 1)) * 100);
  const ota = hotelContext?.lowestOtaProvider || 'Booking.com';

  // 1. GREETINGS & CASUAL INTRODUCTIONS
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hello') || q.startsWith('hi ') ||
    q.includes('good morning') || q.includes('good evening') || q.includes('who are you') ||
    q.includes('what is aura') || q === 'help' || q.includes('what can you do')
  ) {
    if (hasHotel) {
      reply = `👋 Hello! I am **Aura**, your VIP Travel Concierge for ATLAS.\n\nI see you are currently reviewing **${hotelName}** in ${city} for **${dates}** (${nights} nights):\n\n• **Public Retail Rate**: $${pubRate}/night ($${pubTotal} total) on ${ota}\n• **ATLAS Wholesale Rate**: **$${wsRate}/night ($${wsTotal} total)**\n• **Member Savings**: **You pocket $${savings} (${savingsPct}% Off)**\n\nI can explain rate parity, clarify room categories, confirm tax inclusions, or help lock in your wholesale room reservation. What would you like to know?`;
    } else {
      reply = `👋 Hello! I am **Aura**, your proactive VIP AI Travel Concierge for ATLAS.\n\nI am continuously connected to **50+ institutional B2B Bedbanks and wholesale clearing feeds (Hotelbeds, WebBeds)** across 1,000,000+ luxury properties worldwide. I help our members bypass the 20%–45% OTA retail ad markup, audit rate parity, and navigate sovereign travel.\n\n**Here is how I can assist you right now:**\n• **Audit Rates**: Ask why any hotel or city is cheaper on ATLAS vs Booking.com or Expedia.\n• **Rate Parity**: Understand why public OTAs contractually advertise identical prices.\n• **Taxes & Resort Fees**: See why all destination taxes and fees are prepaid upfront.\n• **Vouchers & Check-In**: Learn how B2B Bedbank confirmation vouchers work at the front desk.\n• **Digital Nomad & Visas**: Explore 0% tax nomad visas and Schengen 90/180-day compliance.\n\nWhich destination or property are you planning to visit?`;
    }
  }

  // 2. HOTEL-SPECIFIC BOOKING INTENT
  else if (
    hasHotel &&
    (q.includes('reserve') || q.includes('lock in') || q.includes('how to book') ||
     q.includes('book now') || q.includes('confirm booking') ||
     /\bbook\s+(this|my|a|the|now|it)\b/i.test(q) ||
     (q.includes('book') && !q.includes('booking.com') && !q.includes('why') && !q.includes('cheaper')))
  ) {
    reply = `👑 **Ready to Reserve ${hotelName} (${city})!**\n\nHere is your locked-in B2B wholesale audit summary:\n- **Property**: **${hotelName}** (${city})\n- **Stay Dates**: **${dates}** (${nights} Nights)\n- **Public Retail Benchmark**: $${pubRate}/nt ($${pubTotal} total) on ${ota}\n- **ATLAS Member Net Rate**: **$${wsRate}/nt ($${wsTotal} total)**\n- **Instant Member Profit**: **Save $${savings} (${savingsPct}% Off)**\n\nAll destination taxes and resort fees are 100% prepaid. Click **Lock In Wholesale Rate** below to secure your instant B2B voucher:`;
    bookingAction = {
      hotelId: hotelContext!.id || 'hotel-stay',
      hotelName,
      city,
      dates,
      wholesaleRate: wsRate,
      retailRate: pubRate,
      savings,
    };
  }

  // 3. ROOM CATEGORY & RATE DISCREPANCY (Why OTA prices differ on click-through)
  else if (
    q.includes('differ') || q.includes('different') || q.includes('room type') ||
    q.includes('mismatch') || q.includes('more expensive') || q.includes('price higher') ||
    q.includes('rate higher') || (q.includes('higher') && (q.includes('price') || q.includes('rate') || q.includes('cost'))) ||
    (q.includes('verify') && (q.includes('price') || q.includes('rate') || q.includes('show') || q.includes('see')))
  ) {
    showHowItWorksLink = true;
    const propName = hasHotel ? hotelName : 'a luxury hotel';
    reply = `🏨 **Why OTA Prices Can Differ When Clicking Out for ${propName}:**\n\nWhen you click **"Verify on Booking.com"** or **"Verify on Expedia"**, you might see higher prices than the headline audit. Here is the transparent reason:\n\n1. 🏷️ **Google Hotels Indexes the Baseline Entry Room**: Our live wholesale audit pulls the lowest entry-level rate (e.g. Standard Queen, Room-Only) available across public channels.\n\n2. 🛏️ **OTAs Display Their Entire Catalog**: When you arrive on the OTA landing page, they display their full inventory — including **Executive Suites, Deluxe Ocean/City Views, and Breakfast-Included packages** which carry much higher price tags.\n\n3. 🛡️ **The ATLAS Wholesale Guarantee**: ${hasHotel ? `Your wholesale rate of **$${wsRate}/night ($${wsTotal} total)**` : 'Our wholesale member rate'} is cleared directly through institutional B2B Bedbanks (Hotelbeds, WebBeds) and is guaranteed to beat both entry-level and premium rooms on any retail site!\n\nWould you like me to help you reserve your room allotment now?`;
  }

  // 4. TAXES, RESORT FEES & AT-COST MERCHANT PROCESSING
  else if (q.includes('tax') || q.includes('taxes') || q.includes('resort fee') || q.includes('vat') || q.includes('hidden fee') || q.includes('extra charge')) {
    const propContext = hasHotel
      ? `For **${hotelName}**, local taxes & fees are ~${hotelContext!.taxPercent || 20}% (${hotelContext!.taxLabel || 'Lodging Taxes & Resort Fees'}).`
      : 'Destination taxes typically range from 12% to 28% depending on city ordinances.';

    reply = `🧾 **How Hotel Taxes & Resort Fees Work on ATLAS:**\n\n1. 🏛️ **Destination Lodging Taxes & Mandatory Fees**: ${propContext}\n\n2. 👁️ **The OTA Bait-and-Switch**: Public retail sites in the US frequently display deceptive "pre-tax room rates" and only disclose high resort fees and lodging taxes on the final payment screen.\n\n3. ✅ **ATLAS All-Inclusive Standard**: By default, your ATLAS rate is **100% All-Inclusive (Taxes & Fees Included)** so there are never surprise fees at the hotel front desk upon check-in.\n\n4. 💳 **Zero Room Markup & At-Cost Processing**: ATLAS passes 100% net wholesale room rates. A nominal ~3.5% merchant processing fee is billed at cost at checkout to cover credit card processing (Visa/Mastercard) and secure B2B settlement.\n\n5. 🔀 **Switch Anytime**: You can toggle between **All-Inclusive** and **Base Room Rate** in our search bar or audit modal to compare apples-to-apples against any OTA!`;
  }

  // 5. RATE PARITY LAW & WHY OTAS HAVE IDENTICAL RATES
  else if (
    q.includes('same price') || q.includes('identical') || q.includes('same rate') ||
    q.includes('rate parity') || q.includes('all otas') || q.includes('why same')
  ) {
    showHowItWorksLink = true;
    reply = `⚖️ **Why All OTAs (Expedia, Booking.com, Hotels.com) Often Show Identical Rates:**\n\n1. 📜 **Contractual Rate Parity Clauses**: Major hotel chains sign contracts with Expedia and Booking.com containing strict "Rate Parity" covenants. These prohibit any public website from advertising a lower price on the open web.\n\n2. 🌐 **Google Hotels Benchmark**: Because of parity clauses, Google Hotels indexes virtually identical rates across all public OTAs.\n\n3. 👑 **ATLAS Closed-Loop Parity Exemption**: Under international competition law and EU antitrust rulings, closed-loop private membership clubs are **legally exempt from public rate parity covenants**.\n\nBecause ATLAS is not a public booking site, hotels and institutional Bedbanks (Hotelbeds, WebBeds) securely pass us confidential net wholesale inventory with **0% retail ad markup**!`;
  }

  // 6. HOW ATLAS WORKS / WHY CHEAPER / BEDBANK MECHANISM
  else if (
    q.includes('how it works') || q.includes('why cheaper') || q.includes('how does it work') ||
    q.includes('wholesale') || q.includes('bedbank') || q.includes('hotelbeds') || q.includes('webbeds') ||
    q.includes('what is atlas') || q.includes('about atlas') || q.includes('how can you be')
  ) {
    showHowItWorksLink = true;
    const hotelExample = hasHotel
      ? `On **${hotelName}**, that eliminates **$${savings}** in public ad tax for your stay!`
      : 'That saves members an average of 20% to 45% on every booking.';

    reply = `🛡️ **The 100% Transparent Truth About How ATLAS Works:**\n\n1. 📢 **The OTA Ad Tax**: Public OTAs (Expedia, Booking.com) spend billions every year on Google Search Ads, TV commercials, and billboard campaigns. To fund this, they add a **20%–45% retail markup** on top of hotel rooms.\n\n2. 🏢 **The Institutional Bedbank Clearing Feed**: Hotels quietly allocate unsold room inventory to confidential **B2B Bedbanks (Hotelbeds, WebBeds)** at **18%–42% wholesale net discounts** to keep rooms filled without diluting their public retail pricing.\n\n3. 🔒 **0% Hotel Room Markup**: ATLAS passes **100% of the raw wholesale net room rate** directly to verified club members with zero markup. ${hotelExample}\n\n4. 🧾 **100% Ren Abonnementsmodell**: I motsetning til åpne bookingsider har ATLAS **0 kr i bookingtillegg, 0 kr i transaksjonsgebyr og 0% påslag**. Du betaler nøyaktig leverandørens B2B-engrospris direkte ved utsjekk.\n\n5. 🎫 **Official B2B Vouchers**: Bookings are backed by instant, official B2B Bedbank vouchers with guaranteed check-in and 24/7 supplier support.`;
  }

  // 7. IS IT REAL / LEGITIMACY / SAFETY / LEGAL GUARANTEES
  else if (
    q.includes('real') || q.includes('legit') || q.includes('scam') || q.includes('fake') ||
    q.includes('trust') || q.includes('legal') || q.includes('license') || q.includes('guarantee') ||
    q.includes('safe') || q.includes('is this for real')
  ) {
    showProofLink = true;
    reply = `🛡️ **Yes, ATLAS is 100% Real, Legal, and Fully Compliant:**\n\n1. 📜 **Institutional B2B Partnerships**: ATLAS operates under direct B2B integration with the world's largest travel wholesalers (**Hotelbeds, WebBeds, Sabre, Amadeus**), the same infrastructure used by luxury travel agencies worldwide.\n\n2. ⚖️ **Rate Parity Exemption Certified**: International hospitality antitrust regulations legally protect closed-loop private member clubs from retail rate parity restrictions.\n\n3. 🏦 **Consumer Protection & Escrow Compliance**: All bookings are fully backed and bonded under Norwegian Travel Guarantee Fund (RGF) standards and European Package Travel Directive consumer protections.\n\n4. 🔒 **PCI-DSS Level 1 Security**: Payments are processed through bank-grade encrypted payment gateways with direct B2B voucher issuance.\n\n5. 🏨 **Guaranteed Room Fulfillment**: Every reservation issues an official Bedbank voucher with an active supplier reservation code verifiable directly with hotel reservations desks.\n\nWould you like to test a live rate audit on any hotel of your choice?`;
  }

  // 8. CHECK-IN VOUCHER & FRONT DESK PROTOCOL
  else if (
    q.includes('voucher') || q.includes('check in') || q.includes('front desk') ||
    q.includes('confirmation') || q.includes('how do i check in') || q.includes('what happens at check in')
  ) {
    reply = `📄 **Official B2B Wholesale Check-in Voucher Protocol:**\n\nChecking in with an ATLAS reservation is seamless:\n\n1. 🎟️ **Instant Digital Voucher**: Upon reserving, you receive an official B2B voucher featuring your **Bedbank Confirmation ID (WebBeds/Hotelbeds)** and cryptographic QR code (available as PDF or Apple/Google Wallet pass).\n\n2. 🏨 **Front Desk Presentation**: Present the voucher or digital pass at check-in along with your government ID. Your room is **100% prepaid** directly through ATLAS wholesale clearing.\n\n3. 🤫 **Rate Parity Compliance**: The hotel front desk sees a confirmed, prepaid reservation from the Bedbank network and will not discuss net wholesale pricing.\n\n4. 🆘 **24/7 Priority Supplier Hotline**: If a front desk clerk has questions about the B2B allocation, our dedicated emergency supplier desk is available 24/7/365 (+1-800-847-ATLAS / +44 20 8123 4567).\n\nYour stay is guaranteed.`;
  }

  // 9. CANCELLATION & REFUND POLICIES
  else if (q.includes('cancel') || q.includes('refund') || q.includes('change date') || q.includes('policy')) {
    reply = `🔄 **ATLAS Cancellation & Refund Policy:**\n\n1. 🟢 **Free Cancellation**: The vast majority of ATLAS wholesale allotments include **100% Free Cancellation up to 48 hours prior to check-in**.\n\n2. ⚡ **Instant Processing**: If you need to cancel an eligible reservation, you can do so in 1 click from your Member Dashboard, and your refund is processed immediately to your original payment method.\n\n3. 📅 **Date Modifications**: Because our bookings connect directly to live Bedbank feeds, date modifications are subject to live room availability and seasonal wholesale rate adjustments.\n\n4. 🛡️ **Non-Refundable Promos**: A small subset of last-minute flash inventory is marked as non-refundable by the hotel, which is always clearly highlighted in bold before you confirm.`;
  }

  // 9B. CRUISE BOOKINGS & CRUISE WHITE-LABEL
  else if (q.includes('cruise') || q.includes('sail') || q.includes('ship') || q.includes('silversea') || q.includes('regent') || q.includes('seabourn') || q.includes('celebrity')) {
    reply = `🚢 **ATLAS Prestige Cruise Collection & Rewards Advantage:**\n\n1. 🌊 **Premier Fleet Coverage**: Access luxury ocean and river itineraries across **Silversea, Regent Seven Seas, Seabourn, Celebrity, and Ritz-Carlton Yacht Collection**.\n\n2. 👑 **Up to 10% Back in Club Credits**: Every stateroom booking earns 5%–10% back in ATLAS Club Credits (Points), credited directly to your Rewards Vault.\n\n3. 🍸 **Free Onboard Credit**: Member staterooms receive $200–$1,000 in complimentary onboard spending money for shore excursions, spa treatments, and specialty dining.\n\n4. 🔒 **Automated Booking & 24/7 Operator Support**: Bookings feature live deck plans, real-time cabin selection, and round-the-clock maritime concierge support.\n\nExplore active voyages in the [ATLAS Cruise Directory](/cruises)!`;
  }

  // 9C. ATLAS REWARDS POINTS & CLUB CREDITS
  else if (q.includes('point') || q.includes('credit') || q.includes('reward') || q.includes('vault') || q.includes('how to spend points') || q.includes('club credit')) {
    reply = `💎 **ATLAS Club Credits (Points) & Liquidity Safeguards:**\n\n1. 🪙 **Universal Valuation**: **100 Points = $1.00 USD (10 NOK / £0.80 GBP)** in direct purchasing credits.\n\n2. 📈 **Earn on Every Journey**: Members earn 5%–10% back on hotels, flights, cruises, and car rentals.\n\n3. 🛡️ **50% Co-Pay Cap**: To preserve platform liquidity, Club Credits can cover up to **50% of any booking total**, with the remaining balance settled via card.\n\n4. ⏳ **Vesting Schedule**: Points for cruises vest 14 days post-sailing; hotel stays vest 7 days post-checkout. Unvested points remain safely in escrow.\n\n5. 💵 **Minimum Floor**: Redeem starting at 5,000 points ($50 USD) in 1,000-point increments.\n\nReview your cleared balance and transaction history in the [ATLAS Rewards Vault](/rewards)!`;
  }

  // 10. MEMBERSHIP TIERS, PRICING & ROI
  else if (
    q.includes('membership') || q.includes('how much') || q.includes('join') ||
    q.includes('cost') || q.includes('subscription') || q.includes('pricing') ||
    q.includes('tier') || q.includes('explorer') || q.includes('sovereign')
  ) {
    reply = `👑 **ATLAS Medlemskap & Investering:**\n\nATLAS opererer etter en 100% ren abonnementsmodell uten bookinggebyr eller provisjonspåslag på noen reiser:\n\n• **Atlas Club Pass (1 290 kr / år — kun 107,50 kr/mnd)**: Full tilgang til over 1 000 000 lukkede B2B-engroshoteller, Duffel leiebiler, IATA NDC flybilletter og DragonPass 7-pillers VIP Airport Suite med 0 kr i påslag.\n• **Sovereign VIP Pass (2 490 kr / år)**: Alt i Club Pass + ubegrenset VIP Lounge og Fast Track-pass.\n• **Bedriftsflåte (B2B Fleet)**: Volumavtaler for organisasjoner og bedrifter fra 490 kr/ansatt/år.\n\n💡 **Øyeblikkelig ROI**: ${hasHotel ? `På **${hotelName}** alene sparer du **$${savings}** (ca. ${(savings * 10.8).toLocaleString('nb-NO')} kr) — noe som betaler for over 2–3 års medlemskap på din aller første reise!` : 'En gjennomsnittlig helgetur eller 3-netters hotellopphold sparer typisk 2 500–6 000 kr, som tjener inn hele årsmedlemskapet på Dag 1.'}\n\nVil du at jeg skal hjelpe deg med å aktivere medlemskapet?`;
  }

  // 11. SPECIFIC CITIES & DESTINATIONS
  else if (
    q.includes('oslo') || q.includes('las vegas') || q.includes('vegas') ||
    q.includes('new york') || q.includes('london') || q.includes('paris') ||
    q.includes('dubai') || q.includes('tokyo') || q.includes('barcelona') ||
    q.includes('rome') || q.includes('singapore') || q.includes('miami')
  ) {
    let destName = 'this destination';
    let savingsRange = '22% to 42%';
    if (q.includes('las vegas') || q.includes('vegas')) { destName = 'Las Vegas'; savingsRange = '28% to 44%'; }
    else if (q.includes('oslo')) { destName = 'Oslo'; savingsRange = '18% to 35%'; }
    else if (q.includes('paris')) { destName = 'Paris'; savingsRange = '24% to 40%'; }
    else if (q.includes('london')) { destName = 'London'; savingsRange = '20% to 38%'; }
    else if (q.includes('new york')) { destName = 'New York'; savingsRange = '25% to 42%'; }
    else if (q.includes('dubai')) { destName = 'Dubai'; savingsRange = '30% to 48%'; }
    else if (q.includes('tokyo')) { destName = 'Tokyo'; savingsRange = '20% to 36%'; }

    reply = `🌆 **Wholesale Market Intelligence for ${destName}:**\n\nATLAS maintains active B2B wholesale clearing allotments across top 4-star and 5-star properties in **${destName}**:\n\n• **Wholesale Spread**: Eliminates an average of **${savingsRange} in retail OTA markups**.\n• **Tax Compliance**: All municipal lodging taxes, tourism fees, and resort surcharges are calculated upfront.\n• **Instant Audit**: You can search "${destName}" in the ATLAS search console to see live side-by-side audits against Booking.com, Expedia, and Google Hotels.\n\nWould you like me to find the highest-saving luxury property in ${destName} for your dates?`;
  }

  // 12. DIGITAL NOMAD & VISA HUB
  else if (
    q.includes('nomad') || q.includes('visa') || q.includes('schengen') ||
    q.includes('coliving') || q.includes('remote work') || q.includes('tax free') ||
    q.includes('spain visa') || q.includes('portugal d8') || q.includes('thailand dtv')
  ) {
    showNomadLink = true;
    if (q.includes('schengen') || q.includes('90 day') || q.includes('overstay')) {
      reply = `⏳ **Schengen 90/180-Day Automated Compliance Sentinel:**\n\nNon-EU/EEA remote workers may only spend **90 days out of any 180-day rolling window** inside the European Schengen Zone.\n\n⚠️ **Schengen Reset Strategy**: If you are nearing 90 days, you must exit to a nearby **Non-Schengen European Haven**:\n1. 🇬🇧 **United Kingdom (London)**: 6 Months Visa-Free for most travelers.\n2. 🇨🇾 **Cyprus (Larnaca & Paphos)**: 90 Days Non-Schengen (Schengen clock pauses!).\n3. 🇦🇱 **Albania (Tirana/Sarandë)**: 1 Full Year Visa-Free for US passport holders.\n4. 🇲🇪 **Montenegro (Kotor)**: 90 Days Non-Schengen.\n\nUse our interactive [Schengen Tracker](/nomads) to monitor your exact rolling dates!`;
    } else if (q.includes('tax') || q.includes('cheapest') || q.includes('0%')) {
      reply = `💰 **Top 0% & Low-Tax Digital Nomad Visas (2026):**\n\n1. 🇦🇪 **Dubai Virtual Working Visa**: **0% Personal Income Tax & 0% Capital Gains** ($3,500/mo income requirement, 1-year renewable).\n2. 🇹🇭 **Thailand Destination Visa (DTV)**: **0% Tax on foreign income** not remitted in the same tax year (5-Year Multiple Entry, 180 days/stay).\n3. 🇨🇷 **Costa Rica Remote Worker Visa**: **100% Tax Exemption** on foreign earnings + duty-free equipment import ($3,000/mo income).\n4. 🇪🇸 **Spain Digital Nomad Visa**: **24% Flat Tax under Beckham Law** up to €600,000 (€2,646/mo income requirement).\n\nWould you like me to open the instant intake file for any of these visas?`;
    } else {
      reply = `🌍 **ATLAS Digital Nomad & Global Visa Hub:**\n\nWe provide complete relocation and remote worker infrastructure:\n\n- 🛂 **Fast-Track Nomad Visas**: Spain (€2,646/mo), Portugal D8 (€3,280/mo), Dubai ($3,500/mo), Thailand DTV ($14k funds), Bali E33G ($60k/yr).\n- 🏡 **Monthly Coliving Stays (30+ Nights)**: Lisbon ($1,150/mo), Bali Canggu ($890/mo), Medellín ($740/mo), Bansko ($580/mo) with verified **300–1,000 Mbps Fiber Wi-Fi**.\n- 📶 **Global 5G Data**: Free 10GB monthly eSIM on the **Global Nomad Passport Tier ($29.99/mo)**.\n\nTell me where you want to live and work, and I will calculate your visa eligibility!`;
    }
  }

  // 13. FLIGHT DELAY & EU261 CASH COMPENSATION
  else if (q.includes('delay') || q.includes('claim') || q.includes('cancelled flight') || q.includes('eu261') || q.includes('compensation') || q.includes('airhelp')) {
    reply = `⚖️ **ATLAS EU261 & International Flight Disruption Compensation Sentinel:**\n\nIf your flight was delayed by 3+ hours or cancelled within the last 3 years, you are legally entitled to statutory cash compensation under European Regulation 261/2004 and UK Air Passenger Rights:\n\n- ✈️ **Short-Haul (< 1,500 km, e.g. Oslo ➔ London/Stockholm)**: **€250 ($275)** per passenger.\n- ✈️ **Medium-Haul (1,500 – 3,500 km, e.g. Oslo ➔ Barcelona/Rome/Mallorca)**: **€400 ($440)** per passenger.\n- ✈️ **Long-Haul (> 3,500 km, e.g. Frankfurt/London ➔ New York/Miami)**: **€600 ($650)** per passenger.\n\n🛡️ **Instant Verification**: Enter any flight number in our [Live Flight Claims Scanner](/flight-claims) for immediate verification and direct payout straight to your ATLAS Visa Card!`;
  }

  // 14. PRIVATE JETS & EMPTY-LEG CHARTERS
  else if (q.includes('jet') || q.includes('empty leg') || q.includes('private flight') || q.includes('charter') || q.includes('lounge')) {
    reply = `🛩️ **ATLAS Private Aviation & Empty-Leg Clearing:**\n\nWhen private charter aircraft reposition without passengers, ATLAS members access these **Empty-Leg Seats at up to 75%–80% below retail charter rates**:\n\n• **London Luton ➔ Nice / Cannes**: From **$1,150 / seat** (Cessna Citation XLS)\n• **Miami ➔ New York Teterboro**: From **$1,450 / seat** (Bombardier Challenger 350)\n• **Geneva ➔ Dubai Al Maktoum**: From **$2,800 / seat** (Gulfstream G550)\n\n☕ **VIP Airport Lounge Access**: Includes complimentary champagne, private boarding gate, and customs escort at 500+ private FBO terminals worldwide. Explore active listings on our [Private Jets](/private-jets) portal!`;
  }

  // 15. ATLAS CLUB CREDITS & LOYALTY REWARDS VAULT
  else if (
    q.includes('point') || q.includes('points') || q.includes('credit') || q.includes('credits') ||
    q.includes('poeng') || q.includes('reward') || q.includes('loyal') || q.includes('vault') ||
    q.includes('cashback') || q.includes('redemption')
  ) {
    reply = `💎 **ATLAS Club Credits & Rewards Vault (/rewards):**\n\nATLAS operates a sovereign rewards token system giving members back travel purchasing power:\n\n• **Token Value**: **100 Points = $1.00 USD** (pegged firmly; never diluted).\n• **Earning**: Earn thousands of Club Credits on qualifying wholesale hotels and luxury cruise voyages.\n• **50% Co-Payment Cap**: You can apply your points up to **50% of any booking total** at checkout. The remaining 50% is paid with your card, ensuring continuous wholesale supplier settlement and platform liquidity.\n• **Minimum Redemption**: 5,000 points ($50.00 USD) in 1,000 pt increments.\n• **Vesting Delays**: Points clear into your spendable vault **7 days after hotel check-out** or **14 days after cruise disembarkation**, once supplier reconciliations are finalized.\n• **Dual-Rail Treasury**: Redemptions are settled via dedicated Wise Business Virtual Commercial Cards (VCC), funded by partner commissions.\n\nVisit your personal [Rewards Vault](/rewards) to view your cleared balance and pending escrow!`;
  }

  // 16. LUXURY CRUISES & OCEAN EXPEDITIONS
  else if (
    q.includes('cruise') || q.includes('cruises') || q.includes('cruising') ||
    q.includes('seiling') || q.includes('skip') || q.includes('silversea') ||
    q.includes('regent') || q.includes('celebrity') || q.includes('ritz')
  ) {
    reply = `🚢 **ATLAS Luxury Cruises & Ocean Expeditions (/cruises):**\n\nWe provide members wholesale voyage access across 25,000+ itineraries with world-class maritime fleets:\n\n• **Curated Fleets**: Silversea, Regent Seven Seas, Celebrity Cruises, Seabourn, and The Ritz-Carlton Yacht Collection.\n• **Complimentary Onboard Credit (OBC)**: Up to **$600 USD** in stateroom credits for fine dining, spa, and shore excursions.\n• **Club Credits Earned**: Every cruise voyage awards **+10,000 to +35,000 ATLAS Club Credits** credited directly to your Rewards Vault.\n• **Zero Retail Markups**: Direct wholesale access bypasses high retail agency commissions.\n\nExplore departures in the Mediterranean, Caribbean, Fjords, and Antarctica on our [Cruises Portal](/cruises)!`;
  }

  // 17. B2B & INSTITUTIONAL ENTERPRISE SALES
  else if (
    q.includes('b2b') || q.includes('bedrift') || q.includes('corporate') ||
    q.includes('ansatt') || q.includes('enterprise') || q.includes('institutional') ||
    q.includes('firmareise') || q.includes('agenturer') || q.includes('tekna') ||
    q.includes('organisasjon') || q.includes('forretningsreise')
  ) {
    reply = `🏢 **ATLAS B2B Enterprise & Institutional Agreements (/b2b):**\n\nWe partner directly with corporations, associations, and unions to slash business travel expenditure:\n\n• **30%–50% Travel Cost Reduction**: Replaces traditional Travel Management Companies (TMCs) and high-commission booking tools with direct wholesale bedbank and NDC air feeds.\n• **Headcount Savings Calculator**: Calculate exact corporate ROI based on your team size at [/b2b](/b2b).\n• **Turnkey Partner Portals**: Live examples include [Agenturer.no](/b2b/portal/agenturer-no) (Nordic sales agent network) and [Tekna](/b2b/portal/tekna) (105,000 engineers).\n• **Audit-Ready Financials**: Automated MVA/VAT expense receipting with zero personal credit card float.\n• **Case Study & Audited Proofs**: Review verified corporate cost studies at [/case-study](/case-study) and [/proof](/proof).\n\nWould you like to request an institutional enterprise proposal for your organization?`;
  }

  // 18. ATLAS SOVEREIGN METAL VISA CARD
  else if (
    q.includes('card') || q.includes('kort') || q.includes('visa') ||
    q.includes('metal') || q.includes('kredittkort') || q.includes('sovereign card') ||
    q.includes('debetkort') || q.includes('betalingskort')
  ) {
    reply = `💳 **The ATLAS Sovereign Metal Card (Visa Infinite — Coming Soon):**\n\nDesigned exclusively for ATLAS members to navigate global travel with zero banking frictions:\n\n• **16g Solid Brushed Steel**: Heavy luxury metal form factor featuring the official ATLAS wordmark.\n• **Direct Vault Integration**: Spend your ATLAS Club Credits seamlessly anywhere Visa is accepted worldwide.\n• **0% Foreign Exchange (FX) Fees**: Wholesale interbank exchange rates with zero bank spread.\n• **DragonPass Lounge Integration**: Tap into 1,300+ VIP airport lounges and fast-track security lanes globally.\n• **Worldwide ATM Fee Rebates**: Free cash withdrawals across 200+ countries.\n\nCheck out the card showcase on our [Homepage](/) and stay tuned for early founder card dispatch!`;
  }

  // 19. CRUISE RATE PARITY AUDIO & PODCAST FACT-CHECK
  else if (
    q.includes('audio') || q.includes('podcast') || q.includes('fact check') ||
    q.includes('fact-check') || q.includes('samme pris') || q.includes('identical price') ||
    q.includes('hvorfor samme') || q.includes('lyd') || q.includes('episode')
  ) {
    reply = `🎙️ **Verified Audio Deep Dive: Why Luxury Cruise Prices Are Identical (/cruises):**\n\nWe have published a 40-minute executive briefing directly on our cruise portal explaining the financial mechanics of the industry:\n\n1. ⚖️ **Retail Rate Parity Laws**: Why Silversea, Regent, and Ritz-Carlton contractually ban Expedia and OTAs from discounting ticket prices publicly.\n2. 💰 **The Hidden 10%–16% Commission**: Cruise lines quietly pay large wholesale commissions, which standard OTAs pocket 100% as corporate profit.\n3. 💎 **The ATLAS Arbitrage**: ATLAS complies with rate parity at checkout, but rebates that 10% back to you as Club Credits in your Rewards Vault + up to $600 USD in Onboard Credit.\n\nYou can listen to or download the full audio episode directly on our [Cruises Portal](/cruises)!`;
  }

  // 20. ATLAS SIGNATURE RESORTS (FERIELEILIGHETER FRA 2 890 NOK)
  else if (
    q.includes('resort') || q.includes('ferieleilighet') || q.includes('leilighet') ||
    q.includes('condo') || q.includes('7 netter') || q.includes('rci') ||
    q.includes('tenerife') || q.includes('marbella') || q.includes('familieferie') ||
    q.includes('ukesopphold') || q.includes('feriesuiter') || q.includes('sertifikat')
  ) {
    reply = `🏖️ **Atlas Signature Resorts — Ferieleiligheter fra 2 890 kr (/resorts):**\n\nVi likviderer overskuddskapasitet fra førsteklasses ferieresorter (RCI/Panorama-nettverket) til faste engrospriser uten påslag:\n\n• **3 fleksible nivåer** (100% forhåndsbetalt, 0 kr bookinggebyr på nett):\n  - **Last-Minute (7 netter innen 30 dager)**: Kun **2 890 NOK** (eller 2 900 poeng / $269 USD).\n  - **Standard Helår (7 netter opptil 365 dager frem)**: **4 490 NOK** (eller 4 500 poeng / $420 USD).\n  - **Short Stay (2–6 netter opptil 365 dager frem)**: **2 490 NOK** (eller 2 500 poeng / $230 USD).\n• **Full plass for familien**: 1–2 soveromssuiter med fullt utstyrt kjøkken og stue – plass til **opptil 4–6 personer** uten ekstra persongebyrer.\n• **Transparent om lokale gebyrer**: Enkelte europeiske resorter har en obligatorisk lokal energi-/renholdsavgift (utility surcharge på ca. 20–40 € per uke) som betales direkte i resepsjonen ved utsjekking.\n• **Utvalgte destinasjoner**: Marbella (Costa del Sol), Tenerife (Kanariøyene), Algarve (Portugal), Kreta (Hellas), Toscana (Italia) og Mallorca.\n• **100% Trygghet**: 14 dagers ubetinget angrefrist med pengene tilbake dersom du ikke finner ønsket uke eller reisemål.\n\nUtforsk tilgjengelige resorter og bestill ditt ukesopphold direkte på [Feriesuiter](/resorts)!`;
  }

  // 21. ATLAS GOURMET & SPA ESCAPES (0 KR ROMPRIS / HALVPENSJON)
  else if (
    q.includes('spa') || q.includes('gourmet') || q.includes('connex') ||
    q.includes('holiday plus') || q.includes('0 kr') || q.includes('halvpensjon') ||
    q.includes('dolomitt') || q.includes('velvære') || q.includes('alpeferie') ||
    q.includes('rompris') || q.includes('frokost') || q.includes('middag')
  ) {
    reply = `🍷 **Atlas Gourmet & Spa Escapes — 0 kr i Rompris (/spa-breaks):**\n\nGjennom vårt partnerskap med Connex (Holiday Plus) fyller utvalgte 3–4* superior velværerhoteller i Europa ledig kapasitet med en genial modell:\n\n• **Rompris**: **0 NOK** (gratis opphold for 2 personer i 2–4 netter).\n• **100% Transparent Økonomi**: Du betaler kun hotellets offisielle, faste halvpensjonspris (**€35–€60 per person/dag**) for rikholdig frokost og gourmet fleretters middag direkte ved utsjekk på hotellet.\n• **Dokumentert besparelse**: Sparer typisk **over 6 700 NOK** per helg eller miniferie sammenlignet med Booking.com og Expedia.\n• **Håndplukkede destinasjoner**: Dolomittene (Sør-Tyrol), Chianti (Toscana), Schwarzwald (Tyskland), Salzburg (Østerrike), Gardasjøen og Provence.\n• **Umiddelbar kupongutstedelse**: Aktiver din unike verdikupong (HP-xxxx-ATLAS) med ett klikk på vår portal.\n\nHent din 0 kr hotellkupong på [Gourmet & Spa Escapes](/spa-breaks)!`;
  }

  // 20. BESPOKE TRAVEL PLAN, ITINERARY & OUTINGS GENERATOR
  else if (
    q.includes('reiseplan') || q.includes('travel plan') || q.includes('itinerary') ||
    q.includes('utflukt') || q.includes('outings') || q.includes('dag for dag') ||
    q.includes('day by day') || q.includes('things to do') || q.includes('aktivitet') ||
    q.includes('hva bør jeg gjøre') || q.includes('schedule')
  ) {
    const dest = hasHotel ? hotelContext!.city || 'your destination' : 'Barcelona / Paris';
    const hotelRef = hasHotel ? ` med opphold på **${hotelName}**` : '';
    const homeHub = travelProfile?.homeAirport || 'OSL';
    const cabin = travelProfile?.preferredCabinClass || 'Business Class';
    const diet = travelProfile?.dietaryRestrictions && travelProfile.dietaryRestrictions !== 'none'
      ? ` (tilpasset ${travelProfile.dietaryRestrictions})`
      : '';

    reply = `🗺️ **Skreddersydd 4-Dagers Reiseplan & Utflukter: ${dest}**\n\nHer er din personlige reiserute${hotelRef}, tilpasset direkte avreise fra **${homeHub}** (${cabin})${diet}:\n\n` +
      `📅 **Dag 1: Ankomst, VIP Innsjekk & Kveldsutflukt**\n` +
      `• **Formiddag**: Avgang fra **${homeHub}** med priority boarding. Fast-Track passasjersikring ved ankomst.\n` +
      `• **Ettermiddag**: Innsjekk med din konfidensielle B2B hotellkupong. Velkomstglass og hvile.\n` +
      `• **Solnedgangsutflukt**: Reservert bord på privat takterrasse med panoramautsikt over ${dest}.\n` +
      `• **Middag**: Håndplukket restaurant i det historiske kvarteret${diet}.\n\n` +
      `📅 **Dag 2: Kulturarv & Privat Guidet Ekskursjon**\n` +
      `• **09:30**: Privat guide henter deg ved hotellet. Skip-the-line adgang til byens fremste landemerker.\n` +
      `• **13:00**: Lunsj på en skjult perle borte fra turiststrømmene.\n` +
      `• **15:30**: Besøk i private kunstgallerier og historiske verksteder.\n` +
      `• **Kveld**: Michelin-anbefalt gourmetmiddag eller intim jazzklubb.\n\n` +
      `📅 **Dag 3: Kyst, Vin & Signaturutflukt**\n` +
      `• **10:00**: Halvdags privat seiltur eller guidet utflukt til en eksklusiv vingård med Grand Cru smaking.\n` +
      `• **15:00**: Tilbake til hotellet for luksuriøs spabehandling og massasje.\n` +
      `• **20:30**: Festmiddag med lokale råvarer og sommelierens vinvalg.\n\n` +
      `📅 **Dag 4: Frokost, Shopping & Sømløs Hjemreise**\n` +
      `• **Formiddag**: Avslappende frokost og shopping med privatsjåfør tilgjengelig.\n` +
      `• **Ettermiddag**: DragonPass VIP-loungeadgang på flyplassen før returen til **${homeHub}**.\n\n` +
      `💡 *Ønsker du at jeg reserverer noen av disse utfluktene eller overfører reiseplanen til dine aktive bestillinger?*`;
  }

  // 21. DYNAMIC CONVERSATIONAL HOTEL OR GENERAL TRAVEL RESPONSE
  else if (hasHotel) {
    reply = `🏨 **Wholesale Intelligence for ${hotelName} (${city}):**\n\nRegarding your question about **"${query}"** for your stay from **${dates}**:\n\n• **Public Retail Rate**: $${pubRate}/night ($${pubTotal} total) on ${ota}\n• **ATLAS Wholesale Rate**: **$${wsRate}/night ($${wsTotal} total)**\n• **Instant Member Savings**: **$${savings} (${savingsPct}% Off)**\n\nEvery ATLAS booking includes all destination taxes, 0% retail markup, full rate parity protection, and guaranteed B2B Bedbank check-in vouchers. Would you like me to reserve this rate or explain room categories?`;
    bookingAction = {
      hotelId: hotelContext!.id || 'hotel-stay',
      hotelName,
      city,
      dates,
      wholesaleRate: wsRate,
      retailRate: pubRate,
      savings,
    };
  } else {
    reply = `✨ I am **Aura**, your proactive VIP Travel Concierge.\n\nRegarding your question about **"${query}"**:\n\nATLAS operates directly on institutional B2B Bedbanks (Hotelbeds, WebBeds) across 1,000,000+ luxury hotels worldwide. By eliminating public retail ad costs (the 20%–45% markup charged by Booking.com and Expedia), our members access net wholesale pass-through pricing with zero retail markup.\n\n**Would you like me to:**\n1. Run a live wholesale rate audit for a specific hotel or city?\n2. Explain rate parity and the legal closed-loop exemption?\n3. Show how taxes and resort fees are prepaid upfront?\n4. Guide you through B2B check-in voucher guarantees?\n\nTell me which hotel or city you are considering!`;
  }

  return { reply, bookingAction, showHowItWorksLink, showNomadLink, showProofLink };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, hotelContext, userContext, travelProfile, features: passedFeatures, history } = await req.json();
    const query = (prompt || '').trim();
    const features: PlatformFeatureFlags = passedFeatures || DEFAULT_PLATFORM_CONFIG;

    const activeModel = resolveActiveGeminiModel({
      modelOverride: features.geminiModelId,
      autoUpgradeEnabled: features.autoUpgradeGeminiModel ?? true,
    });

    const marketScan = runLiveMarketScan();
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let reply: string | null = null;
    let bookingAction: any = undefined;
    let showHowItWorksLink = false;
    let showNomadLink = false;
    let showProofLink = false;

    // 1. If an API key is configured, call Google Gemini with full platform grounding
    if (apiKey) {
      const systemPrompt = buildAuraSystemPrompt(hotelContext, userContext?.name, travelProfile);
      reply = await queryGeminiApi(apiKey, activeModel.id, systemPrompt, query, history);
    }

    // 2. If Gemini is not configured or failed, use our comprehensive Deep Domain Intelligence Engine
    if (!reply) {
      const domainResult = generateDomainConciergeResponse(query, hotelContext, features, travelProfile);
      reply = domainResult.reply;
      bookingAction = domainResult.bookingAction;
      showHowItWorksLink = domainResult.showHowItWorksLink || false;
      showNomadLink = domainResult.showNomadLink || false;
      showProofLink = domainResult.showProofLink || false;
    }

    // Ensure booking action is attached if user is asking to book the active hotel
    if (!bookingAction && hotelContext && hotelContext.name) {
      const qLower = query.toLowerCase();
      if (qLower.includes('book') || qLower.includes('reserve') || qLower.includes('lock in')) {
        bookingAction = {
          hotelId: hotelContext.id || 'hotel-stay',
          hotelName: hotelContext.name,
          city: hotelContext.city || 'Destination',
          dates: hotelContext.dates || `${hotelContext.checkIn} – ${hotelContext.checkOut}`,
          wholesaleRate: hotelContext.wholesalePerNight || 0,
          retailRate: hotelContext.publicLowestPerNight || 0,
          savings: hotelContext.savingsTotal || 0,
        };
      }
    }

    let tripItinerary: MasterTripItinerary | null = null;

    // Detect Multi-Modal Trip Planning Intent (e.g., "plan trip to London", "weekend in Paris with flights")
    const qLower = query.toLowerCase();
    const isTripIntent =
      qLower.includes('plan') ||
      qLower.includes('itinerary') ||
      qLower.includes('package') ||
      qLower.includes('tur til') ||
      qLower.includes('reise til') ||
      qLower.includes('trip to') ||
      (qLower.includes('flight') && qLower.includes('hotel')) ||
      (qLower.includes('fly') && qLower.includes('hotell'));

    if (isTripIntent) {
      try {
        let dest = 'London';
        if (qLower.includes('paris')) dest = 'Paris';
        else if (qLower.includes('new york') || qLower.includes('nyc')) dest = 'New York';
        else if (qLower.includes('dubai')) dest = 'Dubai';
        else if (qLower.includes('rome') || qLower.includes('roma')) dest = 'Rome';
        else if (qLower.includes('tokyo')) dest = 'Tokyo';
        else if (qLower.includes('oslo')) dest = 'Oslo';
        else if (hotelContext?.city) dest = hotelContext.city;

        const depDate = hotelContext?.checkIn || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
        const retDate = hotelContext?.checkOut || new Date(Date.now() + 17 * 86400000).toISOString().split('T')[0];

        tripItinerary = await atlasCentralBrain.buildSynchronizedTrip({
          destination: dest,
          originAirport: 'LHR',
          departureDate: depDate,
          returnDate: retDate,
          adults: 2,
          rooms: 1,
          includeFlight: true,
          includeHotel: true,
          includeLounge: true,
          includeCruise: false,
        });

        if (tripItinerary) {
          const hotelComp = tripItinerary.components.hotel;
          const flightComp = tripItinerary.components.flight;
          const loungeComp = tripItinerary.components.lounge;

          reply = `🎯 **Atlas Central Brain: Full Wholesale Package Assembled for ${dest}!**\n\nI have mobilized our 5 domain subagents (Hotels, Flights, Lounges, Cruises, and Finance Guardian) to create your synchronized 0% retail markup itinerary:\n\n• 🏨 **Wholesale Hotel**: ${hotelComp?.hotelName || 'Luxury 5★ Palace'} ($${hotelComp?.rawWholesaleNetPrice || 310}/nt)\n• ✈️ **NDC Flight Direct**: ${flightComp?.airlineName || 'British Airways / SAS'} (${flightComp?.cabinClass || 'Business'})\n• ☕ **VIP Airport Lounge**: ${loungeComp?.name || 'Club Aspire VIP Lounge'} (£${loungeComp?.wholesaleNetCostGbp || 22.50} vs £${loungeComp?.publicWalkUpPriceGbp || 48} walk-in)\n\n💰 **Consolidated Savings**: Save **$${tripItinerary.pricing.memberTotalSavings}** vs. public retail travel aggregators!\n\nReview the synchronized trip card below to lock in the wholesale bundle:`;
        }
      } catch (err) {
        console.warn('Atlas Brain auto-trip assemble fallback:', err);
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      bookingAction,
      tripItinerary,
      showHowItWorksLink,
      showNomadLink,
      showProofLink,
      model: {
        id: activeModel.id,
        name: activeModel.name,
        version: activeModel.version,
        status: activeModel.status,
        autoUpgraded: features.autoUpgradeGeminiModel ?? true,
        latencyProfile: activeModel.latencyProfile,
      },
      marketScan: {
        scanId: marketScan.scanId,
        timestamp: marketScan.timestamp,
        freshnessSeconds: marketScan.freshnessSeconds,
        feedsScanned: marketScan.feedsScannedCount,
        propertiesMonitored: marketScan.propertiesMonitored,
        averageDiscount: marketScan.averageWholesaleMarginEliminated,
        activePriceDrops: marketScan.activePriceDropsDetected,
      },
    });
  } catch (error: any) {
    console.error('Concierge route error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process concierge query' },
      { status: 500 }
    );
  }
}
