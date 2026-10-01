import { NextRequest, NextResponse } from 'next/server';
import { PlatformFeatureFlags } from '@/lib/types';
import { DEFAULT_PLATFORM_CONFIG } from '@/lib/mockData';
import { resolveActiveGeminiModel, formatGeminiEngineBadge } from '@/lib/geminiModels';
import { runLiveMarketScan } from '@/lib/marketScanner';

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

function buildAuraSystemPrompt(hotelContext?: HotelConciergeContext, userName?: string): string {
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

4. 100% Transparent Taxes & At-Cost Transaction Settlement:
   - By default, ATLAS rates are All-Inclusive (destination taxes, VAT, and mandatory resort fees are prepaid).
   - Unlike US OTAs that display deceptive "pre-tax room rates" and only disclose high resort fees at checkout, ATLAS has zero surprise fees at check-in.
   - 0% Room Markup: ATLAS passes 100% net wholesale room rates. A nominal ~3.5% merchant transaction fee is billed at cost at checkout to cover credit card processing (Visa/Mastercard) and secure B2B settlement.

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

${contextSection}

Instructions:
- Provide authoritative, concise, elegant, VIP concierge responses in Markdown.
- If the user is asking about the active hotel being audited, directly reference the real hotel name, dates, public price, wholesale price, and exact savings!
- Never invent fake cruise bookings or fake names like 'Alex' unless specified by the user.
- Highlight key numbers in bold.`;
}

// Deep Domain Intelligence Engine: 100% dynamic, context-grounded fallback when no API key is set
function generateDomainConciergeResponse(
  query: string,
  hotelContext?: HotelConciergeContext,
  features: PlatformFeatureFlags = DEFAULT_PLATFORM_CONFIG
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

    reply = `🛡️ **The 100% Transparent Truth About How ATLAS Works:**\n\n1. 📢 **The OTA Ad Tax**: Public OTAs (Expedia, Booking.com) spend billions every year on Google Search Ads, TV commercials, and billboard campaigns. To fund this, they add a **20%–45% retail markup** on top of hotel rooms.\n\n2. 🏢 **The Institutional Bedbank Clearing Feed**: Hotels quietly allocate unsold room inventory to confidential **B2B Bedbanks (Hotelbeds, WebBeds)** at **18%–42% wholesale net discounts** to keep rooms filled without diluting their public retail pricing.\n\n3. 🔒 **0% Hotel Room Markup**: ATLAS passes **100% of the raw wholesale net room rate** directly to verified club members with zero markup. ${hotelExample}\n\n4. 🧾 **At-Cost Processing**: Unlike public sites that hide margins in inflated room prices, ATLAS charges a transparent, nominal merchant fee (~3.5%) at cost during checkout to cover credit card processing and secure B2B voucher settlement.\n\n5. 🎫 **Official B2B Vouchers**: Bookings are backed by instant, official B2B Bedbank vouchers with guaranteed check-in and 24/7 supplier support.`;
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

  // 10. MEMBERSHIP TIERS, PRICING & ROI
  else if (
    q.includes('membership') || q.includes('how much') || q.includes('join') ||
    q.includes('cost') || q.includes('subscription') || q.includes('pricing') ||
    q.includes('tier') || q.includes('explorer') || q.includes('sovereign')
  ) {
    reply = `👑 **ATLAS Membership Tiers & Return on Investment (ROI):**\n\nBecause ATLAS does not take a markup on hotel rooms, we operate on a transparent membership model:\n\n• **Explorer Tier ($19.99/mo or $199/yr)**: Unlimited access to confidential wholesale rates across 1,000,000+ luxury hotels, all-inclusive tax transparency, and digital vouchers.\n• **Sovereign VIP Tier ($49.99/mo or $499/yr)**: All Explorer perks + VIP airport lounge access, EU261 automated flight delay claims, and private jet empty-leg access.\n• **Founder Lifetime Pass ($1,499 one-time)**: Permanent VIP access with zero recurring dues, dedicated concierge phone line, and sovereign banking priority.\n\n💡 **Immediate ROI**: ${hasHotel ? `On **${hotelName}** alone, you save **$${savings}** — which immediately pays for an entire year of membership on your very first booking!` : 'A single 3-night luxury hotel stay saves an average of $350–$900, instantly paying for your annual membership.'}\n\nWould you like to explore membership options?`;
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

  // 15. DYNAMIC CONVERSATIONAL HOTEL OR GENERAL TRAVEL RESPONSE
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
    const { prompt, hotelContext, userContext, features: passedFeatures, history } = await req.json();
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
      const systemPrompt = buildAuraSystemPrompt(hotelContext, userContext?.name);
      reply = await queryGeminiApi(apiKey, activeModel.id, systemPrompt, query, history);
    }

    // 2. If Gemini is not configured or failed, use our comprehensive Deep Domain Intelligence Engine
    if (!reply) {
      const domainResult = generateDomainConciergeResponse(query, hotelContext, features);
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

    return NextResponse.json({
      success: true,
      reply,
      bookingAction,
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
