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

function buildAuraSystemPrompt(hotelContext?: HotelConciergeContext, userName?: string, travelProfile?: any, isNorwegian: boolean = false): string {
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

  const norwegianLanguagePreamble = isNorwegian
    ? `
CRITICAL LANGUAGE DIRECTIVE:
The user is speaking Norwegian or has selected Norwegian as their language.
YOU MUST RESPOND 100% IN FLUENT, PROFESSIONAL, SOPHISTICATED NORWEGIAN (BOKMÅL).
NEVER respond in English when the user speaks Norwegian or isNorwegian is true!
Maintain an elite, polite, selling, VIP concierge tone representing HARD ROCK CAPITAL LTD's ATLAS club.
`
    : '';

  return `${norwegianLanguagePreamble}You are Aura, the proactive VIP AI Travel Concierge for ATLAS Travel Club (Operated by HARD ROCK CAPITAL LTD, UK Company Reg. #16833237).
User: ${userName || 'VIP Member'}.

You have deep mastery over the entire ATLAS platform, hospitality law, global B2B bedbanks, rate parity covenants, luxury hotel pricing, airline passenger rights (EU261), and digital nomad relocation.

CORE ATLAS PLATFORM KNOWLEDGE:
0. Legal Identity & Official Launch (January 4, 2027):
   - Legal Entity: HARD ROCK CAPITAL LTD (UK Reg. #16833237, 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK). Founder & MD: Pål Juritzen.
   - Official Launch Date: Monday January 4, 2027 at 10:00 AM CET.
   - Founding 100 Member Perk: The first 100 paying members (1 290 NOK / yr) receive a 100% Free 3-Day European Hotel Break for 2 (worth 5 400 kr / $520) via Connex (Holiday Plus), plus automatic entry into the draw where 3 of 100 win ALL gourmet meals (half-board) fully covered by ATLAS.
   - 48-Hour Forfeiture Rule: Allocations on launch day are reserved for 48 hours; unactivated spots are forfeited and passed to the next applicant on the waitlist.
   - 100% Commission Rebate: 100% of commissions from cruise lines (10–16%) and car rentals are rebated directly to the member's Rewards Vault. ATLAS does not retain travel commissions.

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
     * Last-Minute (7 nights, book within 30 days): 3 890 NOK ($359 USD / 3 900 points). Wholesale promo is $219.
     * Standard 365-Day (7 nights, book up to 365 days ahead): 5 890 NOK ($549 USD / 5 900 points). Wholesale promo is $379.
     * Short Stay (2–6 nights, book up to 365 days ahead): 3 290 NOK ($299 USD / 3 300 points). Wholesale promo is $199.
   - Local on-site fee transparency: Explain clearly that online booking is 0 kr, but some European resorts charge a modest local utility/eco fee (e.g. 20–40 € per week) directly at the front desk for electricity/cleaning.
   - Rejection of $69 buy-up certificate traps: Atlas strictly rejects certificates that slap members with mandatory $299+ co-pays at booking.
   - 14-day 100% money-back guarantee if no suitable dates/destination are found.
   - Curated destinations: Marbella (Costa del Sol), Tenerife (Canary Islands), Algarve (Portugal), Crete (Greece), Tuscany (Italy), Mallorca.
   - Legal: Accommodation only; members book their own wholesale flights separately. Exempt from Norwegian Package Travel Act (Pakkereiseloven).

14. Atlas Hotel Breaks (/hotel-breaks):
   - Handpicked 3–5* partner hotels across the Alps, Dolomites, Black Forest, Tuscany, Lake Garda, Provence liquidated via Holiday Plus / Connex.
   - Room Rate: 0 NOK / $0 (complimentary 2–6 night lodging for 2 adults).
   - Transparent Economics: The guest pays only the hotel's published fixed half-board rate (€35–€60/person/day for breakfast and multi-course dinner) directly at hotel checkout.
   - Proves verified savings of 6 700+ NOK per getaway compared to Booking.com. Instant on-site booking and official check-in certificate generated at /hotel-breaks.

15. Airport-to-Hotel Ground Transit & European Route Intelligence (/hotel-breaks, /cars, /lounges):
   - Ground transport is a critical service for ATLAS Hotel Breaks because European countryside, alpine, and wellness hotels are located in scenic resort areas outside major city hubs.
   - 4 Core Alternatives:
     1) Private Chauffeur & VIP Airport Transfer (Door-to-Door): Fixed-rate meet & greet by driver in arrivals hall with baggage assist, Mercedes E-Class or V-Class directly to hotel lobby. 0 stress, ideal for couples, late flights, or traveling with luggage. Integrated via ATLAS DragonPass/wholesale transfer rails.
     2) Wholesale Airport Car Rental (0 kr markup / Net Club Rates via /cars): Direct pick-up at airport terminal (Hertz, Avis, Europcar, Sixt) with ATLAS wholesale rates (saving 30-50%). Complete freedom to explore scenic wine regions, mountain passes, and lakes.
     3) Scenic European Express Rail & Mountain Transit: Europe's premier train networks (Trenitalia/Frecciarossa, SBB, ÖBB, DB, SNCF TGV) offer eco-friendly, fast, scenic travel directly to regional stations, followed by hotel courtesy shuttles or local resort buses.
     4) Hotel Courtesy Shuttle & Resort Express: Many partner hotels operate scheduled shuttle vans to/from the nearest train station or regional airport for guests.
   - Specific Destination Routing Knowledge:
     * Dolomites / Molveno (Alpenresort Belvedere):
       - Primary: Verona Villafranca (VRN) - 1h 25m drive (125 km) north via A22 Brenner Autostrada (exit San Michele all'Adige / Mezzocorona).
       - Alternates: Milan Bergamo (BGY) - 2h 10m (180 km); Venice Marco Polo (VCE) - 2h 20m.
       - Rail: Trenitalia / Frecciarossa to Mezzocorona or Trento, then local Trentino Trasporti B611 bus or hotel shuttle (25m).
       - Car Rental: Highly recommended for Dolomites mountain touring.
     * Tuscany / Chianti (Castello di Spaltenna):
       - Primary: Florence Amerigo Vespucci (FLR) - 55m drive (65 km) via SR222 Chiantigiana wine road.
       - Alternates: Pisa Galileo Galilei (PSA) - 1h 30m; Bologna (BLQ) - 1h 45m.
       - Rail: Regionale Veloce from Firenze SMN to Montevarchi-Terranuova (35m) + 15 min taxi/hotel car to Gaiole.
       - Car Rental: Essential for visiting medieval Tuscan hamlets and wineries.
     * Black Forest / Hinterzarten (Parkhotel Adler):
       - Primary: EuroAirport Basel-Mulhouse-Freiburg (BSL/MLH) - 55m drive (75 km).
       - Alternates: Zurich Airport (ZRH) - 1h 15m (85 km); Stuttgart (STR) - 1h 35m.
       - Rail (Höllentalbahn): One of Germany's most scenic steep-grade railway lines! DB regional train from Freiburg Hbf directly to Hinterzarten Station (30 min). The hotel is 300 meters from the station.
     * Austrian Alps / Saalfelden (Gut Brandlhof):
       - Primary: Salzburg W.A. Mozart (SZG) - 55m drive (65 km) via Bad Reichenhall (Kleines Deutsches Eck).
       - Alternates: Innsbruck (INN) - 1h 35m; Munich (MUC) - 2h 00m.
       - Rail: ÖBB direct scenic train to Saalfelden station. Hotel provides complimentary private van pickup from Saalfelden station.
       - Vignette: Austrian highway toll vignette required if driving on Autobahn (~€11.50 for 10 days).
     * Provence / Gordes (Domaine de l'Enclos):
       - Primary: Marseille Provence (MRS) - 55m drive (75 km) via A7.
       - Alternates: Avignon (AVN) - 35m; Nice (NCE) - 2h 15m; or TGV from Paris to Avignon TGV station (2h 40m).
       - Car Rental: Crucial for touring Luberon hilltop villages (Gordes, Roussillon, Ménerbes).
     * Lake Garda / Riva del Garda (Grand Hotel Riva):
       - Primary: Verona Villafranca (VRN) - 1h 05m drive (85 km) via A22 exit Rovereto Sud.
       - Alternates: Milan Bergamo (BGY) - 1h 40m; Venice (VCE) - 2h 05m.
       - Rail & Ferry: Train to Desenzano del Garda, then take the panoramic public passenger ferry across the full length of Lake Garda directly into Riva del Garda harbor!

${contextSection}
${profileSection}

Instructions:
- Provide authoritative, concise, elegant, VIP concierge responses in Markdown.
- If the user is asking about the active hotel being audited, directly reference the real hotel name, dates, public price, wholesale price, and exact savings!
- If the user asks about B2B corporate agreements, cruises, loyalty points, Signature Resorts (ferieleiligheter fra 3 890 kr), or Hotel Breaks (0 kr rooms), provide accurate, confident domain guidance.
- If member profile DNA is provided, naturally tailor travel plans, home hub departure airports, cabin classes, and dietary outing suggestions to them!
- Highlight key numbers in bold.`;
}

// Deep Domain Intelligence Engine: 100% dynamic, context-grounded fallback when no API key is set
function generateDomainConciergeResponse(
  query: string,
  hotelContext?: HotelConciergeContext,
  features: PlatformFeatureFlags = DEFAULT_PLATFORM_CONFIG,
  travelProfile?: any,
  isNorwegian: boolean = false
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
    q.includes('what is aura') || q === 'help' || q.includes('what can you do') ||
    q === 'hei' || q === 'hallo' || q.startsWith('hei ') || q.startsWith('hallo ') ||
    q.includes('hvem er du') || q.includes('hva kan du') || q.includes('hjelp')
  ) {
    if (isNorwegian) {
      if (hasHotel) {
        reply = `👋 Hei! Jeg er **Aura**, din personlige VIP Travel Concierge for ATLAS.\n\nJeg ser at du vurderer **${hotelName}** i ${city} for **${dates}** (${nights} netter):\n\n• **Offisiell retailpris**: $${pubRate}/natt ($${pubTotal} totalt) hos ${ota}\n• **ATLAS Engrospris**: **$${wsRate}/natt ($${wsTotal} totalt)**\n• **Din medlemsgevinst**: **Du sparer $${savings} (${savingsPct}% rabatt)**\n\nJeg kan forklare rate parity, romkategorier, bekrefte at alle skatter er inkludert, eller hjelpe deg med å låse inn reservasjonen med en gang. Hva kan jeg bistå med?`;
      } else {
        reply = `👋 Hei! Jeg er **Aura**, din personlige VIP AI Travel Concierge for ATLAS.\n\nJeg er direkte tilkoblet **50+ institusjonelle B2B Bedbanks og grossister (Hotelbeds, WebBeds)** på over 1 000 000 luksushoteller over hele verden. Våre medlemmer unngår de 20%–45% påslagene som vanlige reisesider tar for reklame, og får ren engrospris med 0 kr påslag.\n\n**Dette kan jeg hjelpe deg med nå:**\n• **Prisrevisjon**: Se hvorfor ethvert hotell eller by er billigere hos ATLAS enn Booking.com eller Expedia.\n• **Rate Parity**: Forstå hvorfor åpne reisesider har identiske priser, og hvorfor ATLAS har juridisk unntak.\n• **Skatter og avgifter**: Se hvordan alle lokale skatter er 100% forhåndsbetalt.\n• **Vouchere & Innsjekk**: Lær hvordan våre offisielle B2B-vouchere fungerer ved innsjekk.\n• **Rewards Vault**: Se hvordan du tjener og bruker Club Credits på reiser.\n\nHvilken destinasjon eller hvilket hotell planlegger du å besøke?`;
      }
    } else {
      if (hasHotel) {
        reply = `👋 Hello! I am **Aura**, your VIP Travel Concierge for ATLAS.\n\nI see you are currently reviewing **${hotelName}** in ${city} for **${dates}** (${nights} nights):\n\n• **Public Retail Rate**: $${pubRate}/night ($${pubTotal} total) on ${ota}\n• **ATLAS Wholesale Rate**: **$${wsRate}/night ($${wsTotal} total)**\n• **Member Savings**: **You pocket $${savings} (${savingsPct}% Off)**\n\nI can explain rate parity, clarify room categories, confirm tax inclusions, or help lock in your wholesale room reservation. What would you like to know?`;
      } else {
        reply = `👋 Hello! I am **Aura**, your proactive VIP AI Travel Concierge for ATLAS.\n\nI am continuously connected to **50+ institutional B2B Bedbanks and wholesale clearing feeds (Hotelbeds, WebBeds)** across 1,000,000+ luxury properties worldwide. I help our members bypass the 20%–45% OTA retail ad markup, audit rate parity, and navigate sovereign travel.\n\n**Here is how I can assist you right now:**\n• **Audit Rates**: Ask why any hotel or city is cheaper on ATLAS vs Booking.com or Expedia.\n• **Rate Parity**: Understand why public OTAs contractually advertise identical prices.\n• **Taxes & Resort Fees**: See why all destination taxes and fees are prepaid upfront.\n• **Vouchers & Check-In**: Learn how B2B Bedbank confirmation vouchers work at the front desk.\n• **Digital Nomad & Visas**: Explore 0% tax nomad visas and Schengen 90/180-day compliance.\n\nWhich destination or property are you planning to visit?`;
      }
    }
  }

  // 2. HOTEL-SPECIFIC BOOKING INTENT
  else if (
    hasHotel &&
    (q.includes('reserve') || q.includes('lock in') || q.includes('how to book') ||
     q.includes('book now') || q.includes('confirm booking') ||
     q.includes('bestill') || q.includes('reserver') || q.includes('lås inn') ||
     /\bbook\s+(this|my|a|the|now|it)\b/i.test(q) ||
     (q.includes('book') && !q.includes('booking.com') && !q.includes('why') && !q.includes('cheaper')))
  ) {
    if (isNorwegian) {
      reply = `👑 **Klar til å låse inn ${hotelName} (${city})!**\n\nHer er din bekreftede B2B-engrosrevisjon:\n- **Hotell**: **${hotelName}** (${city})\n- **Oppholdsdatoer**: **${dates}** (${nights} netter)\n- **Veiledende retailpris**: $${pubRate}/natt ($${pubTotal} totalt) hos ${ota}\n- **ATLAS Medlemspris**: **$${wsRate}/natt ($${wsTotal} totalt)**\n- **Din medlemsgevinst**: **Spar $${savings} (${savingsPct}% rabatt)**\n\nAlle lokale skatter og avgifter er 100% forhåndsbetalt. Klikk **Lås inn engrospris** under for å sikre din offisielle B2B-voucher:`;
    } else {
      reply = `👑 **Ready to Reserve ${hotelName} (${city})!**\n\nHere is your locked-in B2B wholesale audit summary:\n- **Property**: **${hotelName}** (${city})\n- **Stay Dates**: **${dates}** (${nights} Nights)\n- **Public Retail Benchmark**: $${pubRate}/nt ($${pubTotal} total) on ${ota}\n- **ATLAS Member Net Rate**: **$${wsRate}/nt ($${wsTotal} total)**\n- **Instant Member Profit**: **Save $${savings} (${savingsPct}% Off)**\n\nAll destination taxes and resort fees are 100% prepaid. Click **Lock In Wholesale Rate** below to secure your instant B2B voucher:`;
    }
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
    (q.includes('verify') && (q.includes('price') || q.includes('rate') || q.includes('show') || q.includes('see'))) ||
    q.includes('varierer') || q.includes('forskjellig') || q.includes('romtype') || q.includes('dyrere') ||
    q.includes('høyere pris') || q.includes('hvorfor varierer')
  ) {
    showHowItWorksLink = true;
    const propName = hasHotel ? hotelName : 'a luxury hotel';
    if (isNorwegian) {
      reply = `🏨 **Hvorfor priser hos reisesider kan variere ved direkte klikk for ${hasHotel ? hotelName : 'luksushoteller'}:**\n\nNår du klikker for å sjekke prisen hos Booking.com eller Expedia, kan du noen ganger se høyere priser enn i vår prisoversikt. Her er den åpne forklaringen:\n\n1. 🏷️ **Google Hotels indekserer rimeligste standardrom**: Prissammenligningen henter det rimeligste innstegsrommet (f.eks. Standard Queen, kun rom).\n\n2. 🛏️ **Reisesidene viser hele katalogen sin**: Når du lander på deres side, fremhever de ofte **Executive Suites, Deluxe rom med havutsikt og pakker med frokost inkludert**, som naturlig koster mer.\n\n3. 🛡️ **ATLAS Engrosgaranti**: ${hasHotel ? `Din medlemspris på **$${wsRate}/natt ($${wsTotal} totalt)**` : 'Vår engrospris'} leveres direkte fra institusjonelle B2B Bedbanks (Hotelbeds, WebBeds) og slår både standardrom og premium-suiter på enhver åpen nettside!\n\nØnsker du at jeg skal hjelpe deg med å reservere rommet nå?`;
    } else {
      reply = `🏨 **Why OTA Prices Can Differ When Clicking Out for ${propName}:**\n\nWhen you click **"Verify on Booking.com"** or **"Verify on Expedia"**, you might see higher prices than the headline audit. Here is the transparent reason:\n\n1. 🏷️ **Google Hotels Indexes the Baseline Entry Room**: Our live wholesale audit pulls the lowest entry-level rate (e.g. Standard Queen, Room-Only) available across public channels.\n\n2. 🛏️ **OTAs Display Their Entire Catalog**: When you arrive on the OTA landing page, they display their full inventory — including **Executive Suites, Deluxe Ocean/City Views, and Breakfast-Included packages** which carry much higher price tags.\n\n3. 🛡️ **The ATLAS Wholesale Guarantee**: ${hasHotel ? `Your wholesale rate of **$${wsRate}/night ($${wsTotal} total)**` : 'Our wholesale member rate'} is cleared directly through institutional B2B Bedbanks (Hotelbeds, WebBeds) and is guaranteed to beat both entry-level and premium rooms on any retail site!\n\nWould you like me to help you reserve your room allotment now?`;
    }
  }

  // 4. TAXES, RESORT FEES & AT-COST MERCHANT PROCESSING
  else if (
    q.includes('tax') || q.includes('taxes') || q.includes('resort fee') || q.includes('vat') ||
    q.includes('hidden fee') || q.includes('extra charge') || q.includes('skatt') || q.includes('skatter') ||
    q.includes('mva') || q.includes('gebyr') || q.includes('gebyrer') || q.includes('resort-gebyr')
  ) {
    if (isNorwegian) {
      const propContextNo = hasHotel
        ? `For **${hotelName}** utgjør lokale skatter og avgifter ca. ${hotelContext!.taxPercent || 20}% (${hotelContext!.taxLabel || 'Byspesifikke skatter og resort-avgifter'}).`
        : 'Destinasjonsskatter varierer typisk fra 12% til 28% avhengig av land og by.';
      reply = `🧾 **Hvordan hotellskatter og resort-gebyrer fungerer på ATLAS:**\n\n1. 🏛️ **Lokale hotellskatter & obligatoriske gebyrer**: ${propContextNo}\n\n2. 👁️ **Lokketilbud hos åpne reisesider**: Amerikanske og internasjonale bookingsider viser ofte lokkepriser uten skatter, og legger først til store gebyrer på siste betalingsside.\n\n3. ✅ **ATLAS Alt Inkludert-standard**: Hos ATLAS er prisen som standard **100% Alt Inkludert (Skatter & Gebyrer inkludert)**, så du slipper ubehagelige overraskelser i resepsjonen ved ankomst.\n\n4. 💳 **0 kr i påslag**: ATLAS formidler 100% rå nettopris fra leverandøren uten ekstra fortjenestepåslag.\n\n5. 🔀 **Sammenlign enkelt**: Du kan når som helst bytte mellom **Alt Inkludert** og **Grunnpris** i søket for å sammenligne krone for krone mot andre aktører!`;
    } else {
      const propContext = hasHotel
        ? `For **${hotelName}**, local taxes & fees are ~${hotelContext!.taxPercent || 20}% (${hotelContext!.taxLabel || 'Lodging Taxes & Resort Fees'}).`
        : 'Destination taxes typically range from 12% to 28% depending on city ordinances.';

      reply = `🧾 **How Hotel Taxes & Resort Fees Work on ATLAS:**\n\n1. 🏛️ **Destination Lodging Taxes & Mandatory Fees**: ${propContext}\n\n2. 👁️ **The OTA Bait-and-Switch**: Public retail sites in the US frequently display deceptive "pre-tax room rates" and only disclose high resort fees and lodging taxes on the final payment screen.\n\n3. ✅ **ATLAS All-Inclusive Standard**: By default, your ATLAS rate is **100% All-Inclusive (Taxes & Fees Included)** so there are never surprise fees at the hotel front desk upon check-in.\n\n4. 💳 **Zero Room Markup & At-Cost Processing**: ATLAS passes 100% net wholesale room rates. A nominal ~3.5% merchant processing fee is billed at cost at checkout to cover credit card processing (Visa/Mastercard) and secure B2B settlement.\n\n5. 🔀 **Switch Anytime**: You can toggle between **All-Inclusive** and **Base Room Rate** in our search bar or audit modal to compare apples-to-apples against any OTA!`;
    }
  }

  // 5. RATE PARITY LAW & WHY OTAS HAVE IDENTICAL RATES
  else if (
    q.includes('same price') || q.includes('identical') || q.includes('same rate') ||
    q.includes('rate parity') || q.includes('all otas') || q.includes('why same') ||
    q.includes('samme pris') || q.includes('like priser') || q.includes('lik pris') ||
    q.includes('hvorfor like') || q.includes('hvorfor samme')
  ) {
    showHowItWorksLink = true;
    if (isNorwegian) {
      reply = `⚖️ **Hvorfor Booking.com, Expedia og Hotels.com ofte har identiske priser:**\n\n1. 📜 **Avtalefestet Rate Parity**: De store hotellkjedene inngår strenge avtaler med Booking.com og Expedia som krever at nøyaktig samme pris vises på alle åpne nettsider.\n\n2. 🌐 **Google Hotels Benchmark**: På grunn av denne prispariteten viser Google Hotels stort sett identiske priser over hele linjen.\n\n3. 👑 **ATLAS sitt lukkede medlemsunntak**: I henhold til europeisk og internasjonal konkurranserett er lukkede, private medlemsklubber **juridisk unntatt fra offentlig Rate Parity**.\n\nFordi ATLAS er en lukket medlemsklubb, kan hotellene og globale Bedbanks (Hotelbeds, WebBeds) trygt gi oss konfidensielle engrospriser med **0 kr i retailpåslag**!`;
    } else {
      reply = `⚖️ **Why All OTAs (Expedia, Booking.com, Hotels.com) Often Show Identical Rates:**\n\n1. 📜 **Contractual Rate Parity Clauses**: Major hotel chains sign contracts with Expedia and Booking.com containing strict "Rate Parity" covenants. These prohibit any public website from advertising a lower price on the open web.\n\n2. 🌐 **Google Hotels Benchmark**: Because of parity clauses, Google Hotels indexes virtually identical rates across all public OTAs.\n\n3. 👑 **ATLAS Closed-Loop Parity Exemption**: Under international competition law and EU antitrust rulings, closed-loop private membership clubs are **legally exempt from public rate parity covenants**.\n\nBecause ATLAS is not a public booking site, hotels and institutional Bedbanks (Hotelbeds, WebBeds) securely pass us confidential net wholesale inventory with **0% retail ad markup**!`;
    }
  }

  // 6. HOW ATLAS WORKS / WHY CHEAPER / BEDBANK MECHANISM
  else if (
    q.includes('how it works') || q.includes('why cheaper') || q.includes('how does it work') ||
    q.includes('wholesale') || q.includes('bedbank') || q.includes('hotelbeds') || q.includes('webbeds') ||
    q.includes('what is atlas') || q.includes('about atlas') || q.includes('how can you be') ||
    q.includes('hvordan fungerer') || q.includes('hvorfor billigere') || q.includes('hva er atlas') ||
    q.includes('hvordan virker') || q.includes('engros')
  ) {
    showHowItWorksLink = true;
    if (isNorwegian) {
      const hotelExampleNo = hasHotel
        ? `På **${hotelName}** fjerner dette **$${savings}** i unødvendige reklamepåslag for ditt opphold!`
        : 'Dette sparer medlemmene i gjennomsnitt 20% til 45% på hver eneste bestilling.';
      reply = `🛡️ **Slik fungerer ATLAS sin lukkede engrosmodell:**\n\n1. 📢 **Uten fordyrende markedsføringspåslag**: Åpne bookingsider (Booking.com, Expedia) bruker milliarder hvert år på Google-annonser, TV-reklamer og sponsorater. Dette finansieres med et **20%–45% påslag** på hotellrommet ditt.\n\n2. 🏢 **Institusjonelle B2B Bedbanks**: Hotellene selger ledig kapasitet diskré via konfidensielle grossistnettverk (**Hotelbeds, WebBeds**) med **18%–42% engrosrabatt** for å fylle rommene uten å ødelegge sine offisielle priser.\n\n3. 🔒 **0 kr hotellpåslag**: ATLAS sender **100% av den rå engrosprisen** direkte videre til våre medlemmer. ${hotelExampleNo}\n\n4. 🧾 **100% Ren Abonnementsmodell (1 290 kr/år)**: ATLAS har 0 kr i bookinggebyrer, 0 kr i transaksjonstillegg og 0% provisjonspåslag. Du betaler nøyaktig det hotellet koster i innkjøp.\n\n5. 🎫 **Offisielle B2B-vouchere**: Bestillingen bekreftes med umiddelbar, offisiell Bedbank-voucher med garantert innsjekk og døgnåpen leverandørstøtte.`;
    } else {
      const hotelExample = hasHotel
        ? `On **${hotelName}**, that eliminates **$${savings}** in public ad tax for your stay!`
        : 'That saves members an average of 20% to 45% on every booking.';

      reply = `🛡️ **The 100% Transparent Truth About How ATLAS Works:**\n\n1. 📢 **The OTA Ad Tax**: Public OTAs (Expedia, Booking.com) spend billions every year on Google Search Ads, TV commercials, and billboard campaigns. To fund this, they add a **20%–45% retail markup** on top of hotel rooms.\n\n2. 🏢 **The Institutional Bedbank Clearing Feed**: Hotels quietly allocate unsold room inventory to confidential **B2B Bedbanks (Hotelbeds, WebBeds)** at **18%–42% wholesale net discounts** to keep rooms filled without diluting their public retail pricing.\n\n3. 🔒 **0% Hotel Room Markup**: ATLAS passes **100% of the raw wholesale net room rate** directly to verified club members with zero markup. ${hotelExample}\n\n4. 🧾 **100% Ren Abonnementsmodell**: I motsetning til åpne bookingsider har ATLAS **0 kr i bookingtillegg, 0 kr i transaksjonsgebyr og 0% påslag**. Du betaler nøyaktig leverandørens B2B-engrospris direkte ved utsjekk.\n\n5. 🎫 **Official B2B Vouchers**: Bookings are backed by instant, official B2B Bedbank vouchers with guaranteed check-in and 24/7 supplier support.`;
    }
  }

  // 7. IS IT REAL / LEGITIMACY / SAFETY / LEGAL GUARANTEES
  else if (
    q.includes('real') || q.includes('legit') || q.includes('scam') || q.includes('fake') ||
    q.includes('trust') || q.includes('legal') || q.includes('license') || q.includes('guarantee') ||
    q.includes('safe') || q.includes('is this for real') || q.includes('ekte') || q.includes('svindel') ||
    q.includes('trygt') || q.includes('lovlig') || q.includes('garanti')
  ) {
    showProofLink = true;
    if (isNorwegian) {
      reply = `🛡️ **Ja, ATLAS er 100% ekte, trygt og fullt lisensiert:**\n\n1. 📜 **Hard Rock Capital Ltd**: Registrert i England & Wales (Org.nr. 16833237) under ledelse av grunnlegger Pål Juritzen.\n2. 🏢 **Direkte B2B-integrasjoner**: Vi opererer på samme institusjonelle infrastruktur som verdens ledende luksusreisebyråer (**Hotelbeds, WebBeds, Sabre, Amadeus**).\n3. ⚖️ **Juridisk godkjent Rate Parity-unntak**: Internasjonale konkurranseregler sikrer lukkede klubber retten til å formidle engrospriser.\n4. 🏦 **Forbrukerbeskyttelse & Reisegaranti**: Alle bestillinger oppfyller kravene i Reisegarantifondet (RGF) og EUs pakkereisedirektiv.\n5. 🔒 **Bankgradert sikkerhet**: Betalinger behandles med PCI-DSS Level 1 kryptering og direkte B2B-kupongutstedelse med garantert innsjekk.`;
    } else {
      reply = `🛡️ **Yes, ATLAS is 100% Real, Legal, and Fully Compliant:**\n\n1. 📜 **Institutional B2B Partnerships**: ATLAS operates under direct B2B integration with the world's largest travel wholesalers (**Hotelbeds, WebBeds, Sabre, Amadeus**), the same infrastructure used by luxury travel agencies worldwide.\n\n2. ⚖️ **Rate Parity Exemption Certified**: International hospitality antitrust regulations legally protect closed-loop private member clubs from retail rate parity restrictions.\n\n3. 🏦 **Consumer Protection & Escrow Compliance**: All bookings are fully backed and bonded under Norwegian Travel Guarantee Fund (RGF) standards and European Package Travel Directive consumer protections.\n\n4. 🔒 **PCI-DSS Level 1 Security**: Payments are processed through bank-grade encrypted payment gateways with direct B2B voucher issuance.\n\n5. 🏨 **Guaranteed Room Fulfillment**: Every reservation issues an official Bedbank voucher with an active supplier reservation code verifiable directly with hotel reservations desks.\n\nWould you like to test a live rate audit on any hotel of your choice?`;
    }
  }

  // 8. CHECK-IN VOUCHER & FRONT DESK PROTOCOL
  else if (
    q.includes('voucher') || q.includes('check in') || q.includes('front desk') ||
    q.includes('confirmation') || q.includes('how do i check in') || q.includes('what happens at check in') ||
    q.includes('innsjekk') || q.includes('hvordan sjekker') || q.includes('kupong') || q.includes('resepsjon')
  ) {
    if (isNorwegian) {
      reply = `📄 **Offisiell B2B Engros Innsjekks-Voucher:**\n\nInnsjekking med en ATLAS-reservasjon er helt sømløs:\n\n1. 🎟️ **Umiddelbar Digital Voucher**: Ved bestilling mottar du en offisiell B2B-voucher med ditt unike **Bedbank referansenummer (WebBeds/Hotelbeds)** og QR-kode (tilgjengelig som PDF og i Apple/Google Wallet).\n\n2. 🏨 **Enkel innsjekking**: Vis kupongen eller det digitale lommebok-passet sammen med legitimasjon i resepsjonen. Rommet ditt er **100% forhåndsbetalt** gjennom vår grossistavtale.\n\n3. 🤫 **Rate Parity-konfidensialitet**: Resepsjonen ser en bekreftet og forhåndsbetalt bedriftsbestilling og diskuterer ikke engrospriser.\n\n4. 🆘 **24/7 Døgnåpen Leverandørsupport**: Skulle resepsjonen ha spørsmål om tildelingen, er vår dedikerte B2B-støttelinje tilgjengelig 24 timer i døgnet (+44 20 8123 4567 / +1-800-847-ATLAS).\n\nOppholdet ditt er 100% garantert.`;
    } else {
      reply = `📄 **Official B2B Wholesale Check-in Voucher Protocol:**\n\nChecking in with an ATLAS reservation is seamless:\n\n1. 🎟️ **Instant Digital Voucher**: Upon reserving, you receive an official B2B voucher featuring your **Bedbank Confirmation ID (WebBeds/Hotelbeds)** and cryptographic QR code (available as PDF or Apple/Google Wallet pass).\n\n2. 🏨 **Front Desk Presentation**: Present the voucher or digital pass at check-in along with your government ID. Your room is **100% prepaid** directly through ATLAS wholesale clearing.\n\n3. 🤫 **Rate Parity Compliance**: The hotel front desk sees a confirmed, prepaid reservation from the Bedbank network and will not discuss net wholesale pricing.\n\n4. 🆘 **24/7 Priority Supplier Hotline**: If a front desk clerk has questions about the B2B allocation, our dedicated emergency supplier desk is available 24/7/365 (+1-800-847-ATLAS / +44 20 8123 4567).\n\nYour stay is guaranteed.`;
    }
  }

  // 9. CANCELLATION & REFUND POLICIES
  else if (
    q.includes('cancel') || q.includes('refund') || q.includes('change date') || q.includes('policy') ||
    q.includes('avbestill') || q.includes('kanseller') || q.includes('refusjon') || q.includes('avbestilling')
  ) {
    if (isNorwegian) {
      reply = `🔄 **ATLAS Avbestillings- og Refusjonsvilkår:**\n\n1. 🟢 **Gratis avbestilling**: Det store flertallet av våre engrosrom inkluderer **100% gratis avbestilling frem til 48 timer før innsjekk**.\n\n2. ⚡ **Umiddelbar behandling**: Ved avbestilling i ditt medlemsdashbord behandles refusjonen umiddelbart tilbake til ditt opprinnelige betalingskort.\n\n3. 📅 **Datoendring**: Fordi vi er koblet direkte til levende grossistfeeder, følger eventuelle datoendringer hotellets ledige kapasitet og gjeldende engrospris.\n\n4. 🛡️ **Tydelig merking**: Enkelte kampanjer med ekstra store rabatter er merket som ikke-refunderbare fra hotellet. Dette fremheves alltid klart og tydelig med fet skrift før du bestiller.`;
    } else {
      reply = `🔄 **ATLAS Cancellation & Refund Policy:**\n\n1. 🟢 **Free Cancellation**: The vast majority of ATLAS wholesale allotments include **100% Free Cancellation up to 48 hours prior to check-in**.\n\n2. ⚡ **Instant Processing**: If you need to cancel an eligible reservation, you can do so in 1 click from your Member Dashboard, and your refund is processed immediately to your original payment method.\n\n3. 📅 **Date Modifications**: Because our bookings connect directly to live Bedbank feeds, date modifications are subject to live room availability and seasonal wholesale rate adjustments.\n\n4. 🛡️ **Non-Refundable Promos**: A small subset of last-minute flash inventory is marked as non-refundable by the hotel, which is always clearly highlighted in bold before you confirm.`;
    }
  }

  // 9B. CRUISE BOOKINGS & CRUISE WHITE-LABEL
  else if (
    q.includes('cruise') || q.includes('sail') || q.includes('ship') || q.includes('silversea') ||
    q.includes('regent') || q.includes('seabourn') || q.includes('celebrity') || q.includes('seiling')
  ) {
    if (isNorwegian) {
      reply = `🚢 **ATLAS Prestige Cruise Collection (/cruises):**\n\n1. 🌊 **Verdens ledende rederier**: Tilgang til 25 000+ seilinger med **Silversea, Regent Seven Seas, Seabourn, Celebrity Cruises og Ritz-Carlton Yacht Collection**.\n\n2. 💎 **100% Provisjonsrefusjon som Poeng**: Rederiene forbyr rabatt i kassen (Rate Parity). ATLAS overholder reglene, men gir 100% av grossistprovisjonen (10%–16%) tilbake til deg som Club Credits i din Rewards Vault!\n\n3. 🍸 **Opptil $600 i Onboard Credit**: Få gratis lommepenger om bord til spesialrestauranter, utflukter og spabehandlinger.\n\n4. 🎙️ **40-minutters Audio Deep Dive**: Hør vår grundige podcast om cruisemekanikken direkte på cruisesiden.\n\nUtforsk seilingene i [ATLAS Cruisekatalog](/cruises)!`;
    } else {
      reply = `🚢 **ATLAS Prestige Cruise Collection & Rewards Advantage:**\n\n1. 🌊 **Premier Fleet Coverage**: Access luxury ocean and river itineraries across **Silversea, Regent Seven Seas, Seabourn, Celebrity, and Ritz-Carlton Yacht Collection**.\n\n2. 👑 **Up to 10% Back in Club Credits**: Every stateroom booking earns 5%–10% back in ATLAS Club Credits (Points), credited directly to your Rewards Vault.\n\n3. 🍸 **Free Onboard Credit**: Member staterooms receive $200–$1,000 in complimentary onboard spending money for shore excursions, spa treatments, and specialty dining.\n\n4. 🔒 **Automated Booking & 24/7 Operator Support**: Bookings feature live deck plans, real-time cabin selection, and round-the-clock maritime concierge support.\n\nExplore active voyages in the [ATLAS Cruise Directory](/cruises)!`;
    }
  }

  // 9C. ATLAS REWARDS POINTS & CLUB CREDITS
  else if (
    q.includes('point') || q.includes('credit') || q.includes('reward') || q.includes('vault') ||
    q.includes('how to spend points') || q.includes('club credit') || q.includes('poeng') ||
    q.includes('saldo') || q.includes('cashback') || q.includes('fordeler') || q.includes('bonus')
  ) {
    if (isNorwegian) {
      reply = `💎 **ATLAS Rewards Vault & Club Credits (/rewards):**\n\n1. 🪙 **Krystallklar verdi**: **100 poeng = $1,00 USD (ca. 10 NOK / £0,80 GBP)** i reelle reisekreditter.\n\n2. 📈 **Tjen på hver reise**: Få 100% av formidlingsprovisjonene på hotell, fly og cruise kreditert rett til din personlige Rewards Vault.\n\n3. 🛡️ **50% Egenandeltak**: For å beskytte klubbens likviditetsreserver kan poeng dekke inntil **50% av totalbeløpet** på enhver bestilling, mens resten gjøres opp med kort.\n\n4. ⏳ **Escrow & Likviditetssikring**: Opptjente poeng står som \`🟡 Venter på oppgjør (In Escrow)\` frem til provisjonen fra leverandøren har landet på Hard Rock Capital Ltd sin bankkonto (30–60 dager etter gjennomført reise). Deretter frigis de til \`🟢 Disponibel Saldo\` for umiddelbar bruk.\n\n5. 📱 **Digital Wallet**: Last ned ditt personlige medlemskort direkte til **Apple Wallet** eller **Google Wallet** for sanntidsoppdatering av din poengsaldo!\n\n6. 💵 **Lav innløsningsgrense**: Bruk poeng fra 5 000 poeng ($50 USD) i intervaller på 1 000 poeng.\n\nSe din saldo og transaksjonshistorikk i [ATLAS Rewards Vault](/rewards)!`;
    } else {
      reply = `💎 **ATLAS Club Credits (Points) & Liquidity Safeguards:**\n\n1. 🪙 **Universal Valuation**: **100 Points = $1.00 USD (10 NOK / £0.80 GBP)** in direct purchasing credits.\n\n2. 📈 **Earn on Every Journey**: Members earn 5%–10% back on hotels, flights, cruises, and car rentals.\n\n3. 🛡️ **50% Co-Pay Cap**: To preserve platform liquidity, Club Credits can cover up to **50% of any booking total**, with the remaining balance settled via card.\n\n4. ⏳ **Vesting Schedule**: Points for cruises vest 14 days post-sailing; hotel stays vest 7 days post-checkout. Unvested points remain safely in escrow.\n\n5. 💵 **Minimum Floor**: Redeem starting at 5,000 points ($50 USD) in 1,000-point increments.\n\nReview your cleared balance and transaction history in the [ATLAS Rewards Vault](/rewards)!`;
    }
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
  else if (
    q.includes('delay') || q.includes('claim') || q.includes('cancelled flight') ||
    q.includes('eu261') || q.includes('compensation') || q.includes('airhelp') ||
    q.includes('forsinkelse') || q.includes('erstatning') || q.includes('innstilt fly') ||
    q.includes('kansellert fly') || q.includes('flyforsinkelse')
  ) {
    if (isNorwegian) {
      reply = `⚖️ **ATLAS EU261 & Passasjerrettigheter ved Flyforsinkelse:**\n\nDersom flyet ditt ble forsinket med 3+ timer eller innstilt i løpet av de siste 3 årene, har du lovfestet rett til standardisert kontanterstatning etter EU/EØS-forordning 261/2004:\n\n- ✈️ **Kortdistanse (< 1 500 km, f.eks. Oslo ➔ London/Stockholm/København)**: **250 €** per passasjer.\n- ✈️ **Mellomdistanse (1 500 – 3 500 km, f.eks. Oslo ➔ Barcelona/Roma/Mallorca/Alicante)**: **400 €** per passasjer.\n- ✈️ **Langdistanse (> 3 500 km, f.eks. Oslo/Frankfurt ➔ New York/Bangkok/Dubai)**: **600 €** per passasjer.\n\n🛡️ **0% Gebyrsnoking**: Tradisjonelle kravselskaper krever 30%–45% i gebyr. ATLAS veileder deg slik at hele erstatningen tilfaller deg direkte!`;
    } else {
      reply = `⚖️ **ATLAS EU261 & International Flight Disruption Compensation Sentinel:**\n\nIf your flight was delayed by 3+ hours or cancelled within the last 3 years, you are legally entitled to statutory cash compensation under European Regulation 261/2004 and UK Air Passenger Rights:\n\n- ✈️ **Short-Haul (< 1,500 km, e.g. Oslo ➔ London/Stockholm)**: **€250 ($275)** per passenger.\n- ✈️ **Medium-Haul (1,500 – 3,500 km, e.g. Oslo ➔ Barcelona/Rome/Mallorca)**: **€400 ($440)** per passenger.\n- ✈️ **Long-Haul (> 3,500 km, e.g. Frankfurt/London ➔ New York/Miami)**: **€600 ($650)** per passenger.\n\n🛡️ **Instant Verification**: Enter any flight number in our [Live Flight Claims Scanner](/flight-claims) for immediate verification and direct payout straight to your ATLAS Visa Card!`;
    }
  }

  // 14. PRIVATE JETS & EMPTY-LEG CHARTERS
  else if (q.includes('jet') || q.includes('empty leg') || q.includes('private flight') || q.includes('charter') || q.includes('privatfly')) {
    if (isNorwegian) {
      reply = `🛩️ **ATLAS Privatfly & Empty-Leg Formidling (/private-jets):**\n\nNår private charterfly reposisjonerer uten passasjerer, får ATLAS-medlemmer tilgang til disse **tomme flysetene med inntil 75%–80% rabatt sammenlignet med standard charter**:\n\n• **London Luton ➔ Nice / Cannes**: Fra **$1 150 / sete** (Cessna Citation XLS)\n• **Oslo Gardermoen ➔ Genève / Zürich**: Fra **$1 650 / sete** (Challenger 350)\n• **Genève ➔ Dubai Al Maktoum**: Fra **$2 800 / sete** (Gulfstream G550)\n\n☕ **VIP FBO-Terminaler**: Inkluderer champagne i privat lounge, egen passkontroll og diskré ombordstigning på under 15 minutter. Utforsk ledige ruter på [Privatfly](/private-jets)!`;
    } else {
      reply = `🛩️ **ATLAS Private Aviation & Empty-Leg Clearing:**\n\nWhen private charter aircraft reposition without passengers, ATLAS members access these **Empty-Leg Seats at up to 75%–80% below retail charter rates**:\n\n• **London Luton ➔ Nice / Cannes**: From **$1,150 / seat** (Cessna Citation XLS)\n• **Miami ➔ New York Teterboro**: From **$1,450 / seat** (Bombardier Challenger 350)\n• **Geneva ➔ Dubai Al Maktoum**: From **$2,800 / seat** (Gulfstream G550)\n\n☕ **VIP Airport Lounge Access**: Includes complimentary champagne, private boarding gate, and customs escort at 500+ private FBO terminals worldwide. Explore active listings on our [Private Jets](/private-jets) portal!`;
    }
  }

  // 17. B2B & INSTITUTIONAL ENTERPRISE SALES
  else if (
    q.includes('b2b') || q.includes('bedrift') || q.includes('corporate') ||
    q.includes('ansatt') || q.includes('enterprise') || q.includes('institutional') ||
    q.includes('firmareise') || q.includes('agenturer') || q.includes('tekna') ||
    q.includes('organisasjon') || q.includes('forretningsreise')
  ) {
    if (isNorwegian) {
      reply = `🏢 **ATLAS B2B Bedriftsavtaler & Institusjonelle Lisenser (/b2b):**\n\nVi inngår direkte rammeavtaler med bedrifter, bransjeorganisasjoner og fagforeninger for å kutte reisekostnader drastisk:\n\n• **30%–50% Kostnadskutt**: Erstatter fordyrende forretningsreisebyråer (TMC) og gebyrtunge bestillingssystemer med direkte nettopriser på hotell og fly.\n• **Bedriftskalkulator**: Beregn nøyaktig besparelse for din virksomhet på [/b2b](/b2b).\n• **Skreddersydde Portaler**: Se eksempler som [Agenturer.no](/b2b/portal/agenturer-no) og [Tekna](/b2b/portal/tekna).\n• **MVA/VAT & Regnskap**: Automatiserte, revisjonsklare kvitteringer med full oversikt.\n\nØnsker du at vi utarbeider et uforpliktende bedriftsforslag for din virksomhet?`;
    } else {
      reply = `🏢 **ATLAS B2B Enterprise & Institutional Agreements (/b2b):**\n\nWe partner directly with corporations, associations, and unions to slash business travel expenditure:\n\n• **30%–50% Travel Cost Reduction**: Replaces traditional Travel Management Companies (TMCs) and high-commission booking tools with direct wholesale bedbank and NDC air feeds.\n• **Headcount Savings Calculator**: Calculate exact corporate ROI based on your team size at [/b2b](/b2b).\n• **Turnkey Partner Portals**: Live examples include [Agenturer.no](/b2b/portal/agenturer-no) (Nordic sales agent network) and [Tekna](/b2b/portal/tekna) (105,000 engineers).\n• **Audit-Ready Financials**: Automated MVA/VAT expense receipting with zero personal credit card float.\n• **Case Study & Audited Proofs**: Review verified corporate cost studies at [/case-study](/case-study) and [/proof](/proof).\n\nWould you like to request an institutional enterprise proposal for your organization?`;
    }
  }

  // 18. ATLAS SOVEREIGN METAL VISA CARD
  else if (
    q.includes('card') || q.includes('kort') || q.includes('visa') ||
    q.includes('metal') || q.includes('kredittkort') || q.includes('sovereign card') ||
    q.includes('debetkort') || q.includes('betalingskort')
  ) {
    if (isNorwegian) {
      reply = `💳 **ATLAS Sovereign Metal Card (Visa — Lanseres snart):**\n\nEksklusivt metallkort designet for ATLAS-medlemmer for sømløs global reise uten bankgebyrer:\n\n• **16g Børstet Rustfritt Stål**: Tungt luksusmetall med inngravert ATLAS-identitet.\n• **Direkte koblet til Rewards Vault**: Bruk dine opptjente Club Credits direkte overalt hvor Visa aksepteres i verden.\n• **0% Valutapåslag (FX)**: Rå interbank-vekslingskurs uten banksmøring eller skjulte spread.\n• **DragonPass VIP Lounger**: Adgang til 1 300+ flyplasslounger og fast-track sikkerhetskontroll.\n• **Gebyrfrie minibankuttak**: Gratis kontantuttak i over 200 land.\n\nSe kortpresentasjonen på [Forsiden](/) og hold deg oppdatert i medlemsportalen!`;
    } else {
      reply = `💳 **The ATLAS Sovereign Metal Card (Visa Infinite — Coming Soon):**\n\nDesigned exclusively for ATLAS members to navigate global travel with zero banking frictions:\n\n• **16g Solid Brushed Steel**: Heavy luxury metal form factor featuring the official ATLAS wordmark.\n• **Direct Vault Integration**: Spend your ATLAS Club Credits seamlessly anywhere Visa is accepted worldwide.\n• **0% Foreign Exchange (FX) Fees**: Wholesale interbank exchange rates with zero bank spread.\n• **DragonPass Lounge Integration**: Tap into 1,300+ VIP airport lounges and fast-track security lanes globally.\n• **Worldwide ATM Fee Rebates**: Free cash withdrawals across 200+ countries.\n\nCheck out the card showcase on our [Homepage](/) and stay tuned for early founder card dispatch!`;
    }
  }

  // 19. CRUISE RATE PARITY AUDIO & PODCAST FACT-CHECK
  else if (
    q.includes('audio') || q.includes('podcast') || q.includes('fact check') ||
    q.includes('fact-check') || q.includes('samme pris') || q.includes('identical price') ||
    q.includes('hvorfor samme') || q.includes('lyd') || q.includes('episode')
  ) {
    if (isNorwegian) {
      reply = `🎙️ **Verifisert Audio Deep Dive & Podcast Briefing:**\n\nVi har publisert grundige executive podcasts og PDF-rapporter direkte på plattformen:\n\n1. 📱 **Digitale Lommebøker vs. Lojalitetsapper (/rewards)**: Hvordan Apple & Google Wallet erstatter tradisjonelle lojalitetsapper med sanntids saldo og likviditetsvern.\n2. 🚢 **Rate Parity & Luksuscruise (/cruises)**: 40-minutters faktasjekk som forklarer hvorfor rederier forbyr rabatter, og hvordan ATLAS gir deg 100% av provisjonen tilbake som Club Credits.\n\nDu kan lytte til podcastene og laste ned den fullstendige PDF-rapporten direkte i [ATLAS Rewards Vault](/rewards)!`;
    } else {
      reply = `🎙️ **Verified Audio Deep Dive: Why Luxury Cruise Prices Are Identical (/cruises):**\n\nWe have published a 40-minute executive briefing directly on our cruise portal explaining the financial mechanics of the industry:\n\n1. ⚖️ **Retail Rate Parity Laws**: Why Silversea, Regent, and Ritz-Carlton contractually ban Expedia and OTAs from discounting ticket prices publicly.\n2. 💰 **The Hidden 10%–16% Commission**: Cruise lines quietly pay large wholesale commissions, which standard OTAs pocket 100% as corporate profit.\n3. 💎 **The ATLAS Arbitrage**: ATLAS complies with rate parity at checkout, but rebates that 10% back to you as Club Credits in your Rewards Vault + up to $600 USD in Onboard Credit.\n\nYou can listen to or download the full audio episode directly on our [Cruises Portal](/cruises)!`;
    }
  }

  // 20. ATLAS SIGNATURE RESORTS (FERIELEILIGHETER FRA 3 890 NOK)
  else if (
    q.includes('resort') || q.includes('ferieleilighet') || q.includes('leilighet') ||
    q.includes('condo') || q.includes('7 netter') || q.includes('rci') ||
    q.includes('tenerife') || q.includes('marbella') || q.includes('familieferie') ||
    q.includes('ukesopphold') || q.includes('feriesuiter') || q.includes('sertifikat')
  ) {
    reply = `🏖️ **Atlas Signature Resorts — Ferieleiligheter fra 3 890 kr (/resorts):**\n\nVi likviderer overskuddskapasitet fra førsteklasses ferieresorter (RCI/Panorama-nettverket) til faste engrospriser uten påslag:\n\n• **3 fleksible nivåer** (100% forhåndsbetalt, 0 kr bookinggebyr på nett):\n  - **Last-Minute (7 netter innen 30 dager)**: Kun **3 890 NOK** (eller 3 900 poeng / $359 USD).\n  - **Standard Helår (7 netter opptil 365 dager frem)**: **5 890 NOK** (eller 5 900 poeng / $549 USD).\n  - **Short Stay (2–6 netter opptil 365 dager frem)**: **3 290 NOK** (eller 3 300 poeng / $299 USD).\n• **Full plass for familien**: 1–2 soveromssuiter med fullt utstyrt kjøkken og stue – plass til **opptil 4–6 personer** uten ekstra persongebyrer.\n• **Transparent om lokale gebyrer**: Enkelte europeiske resorter har en obligatorisk lokal energi-/renholdsavgift (utility surcharge på ca. 20–40 € per uke) som betales direkte i resepsjonen ved utsjekking.\n• **Utvalgte destinasjoner**: Marbella (Costa del Sol), Tenerife (Kanariøyene), Algarve (Portugal), Kreta (Hellas), Toscana (Italia) og Mallorca.\n• **100% Trygghet**: 14 dagers ubetinget angrefrist med pengene tilbake dersom du ikke finner ønsket uke eller reisemål.\n\nUtforsk tilgjengelige resorter og bestill ditt ukesopphold direkte på [Feriesuiter](/resorts)!`;
  }

  // 21. ATLAS HOTEL BREAKS (0 KR ROMPRIS / HALVPENSJON)
  else if (
    q.includes('hotel break') || q.includes('hotellopphold') || q.includes('spa') ||
    q.includes('gourmet') || q.includes('connex') || q.includes('holiday plus') ||
    q.includes('0 kr') || q.includes('halvpensjon') || q.includes('dolomitt') ||
    q.includes('velvære') || q.includes('alpeferie') || q.includes('rompris') ||
    q.includes('frokost') || q.includes('middag')
  ) {
    reply = `🏨 **Atlas Hotel Breaks — 0 kr i Rompris (/hotel-breaks):**\n\nGjennom vårt partnerskap med Holiday Plus (Connex) fyller utvalgte 3–5* kvalitetshoteller i Europa ledig kapasitet med en genial modell:\n\n• **Rompris**: **0 NOK** (gratis opphold for 2 personer i 2–6 netter).\n• **100% Transparent Økonomi**: Du betaler kun hotellets offisielle, faste halvpensjonspris (**€35–€60 per person/dag**) for rikholdig frokost og fleretters middag direkte ved utsjekk på hotellet.\n• **Dokumentert besparelse**: Sparer typisk **over 6 700 NOK** per helg eller miniferie sammenlignet med Booking.com og Expedia.\n• **Håndplukkede destinasjoner**: Dolomittene (Sør-Tyrol), Chianti (Toscana), Schwarzwald (Tyskland), Salzburg (Østerrike), Gardasjøen og Provence.\n• **Offisielt innsjekkingssertifikat**: Generer og last ned ditt offisielle A4-sertifikat for enkel innsjekk på hotellet.\n\nUtforsk og reserver ditt opphold på [Atlas Hotel Breaks](/hotel-breaks)!`;
  }

  // 21b. AIRPORT-TO-HOTEL GROUND TRANSIT & ROUTE ASSISTANT
  else if (
    q.includes('transfer') || q.includes('transit') || q.includes('flyplass') ||
    q.includes('airport') || q.includes('hvordan komme') || q.includes('hvordan reise') ||
    q.includes('how to get') || q.includes('get there') || q.includes('leiebil') ||
    q.includes('car rental') || q.includes('sjåfør') || q.includes('chauffeur') ||
    q.includes('tog') || q.includes('train') || q.includes('shuttle') ||
    q.includes('hvilken flyplass') || q.includes('which airport') || q.includes('transport')
  ) {
    if (isNorwegian) {
      if (hasHotel && (hotelName.toLowerCase().includes('belvedere') || city.toLowerCase().includes('molveno') || q.includes('molveno') || q.includes('dolomitt'))) {
        reply = `🚗 **Reiserute fra Flyplass til Alpenresort Belvedere (Molveno, Dolomittene):**\n\n` +
          `• ✈️ **Beste ankomstflyplasser:**\n` +
          `  1. **Verona Villafranca (VRN)**: **1t 25m** (125 km) — *Sterkt anbefalt! Raskest og enklest direkte nordover på A22 Brenner-motorveien.*\n` +
          `  2. **Milano Bergamo (BGY)**: **2t 10m** (180 km) — *Godt alternativ for direkte lavprisfly/SAS.*\n` +
          `  3. **Venezia Marco Polo (VCE)**: **2t 20m** (190 km).\n\n` +
          `• 🚖 **Alternativ 1: Privat VIP Sjåfør (Door-to-Door)**\n` +
          `  - Privatsjåfør møter deg i ankomsthallen med navneskilt og bagasjehjelp.\n` +
          `  - Fast engrospris: **ca. 1 650 kr (€145)** for Mercedes E/V-klasse direkte til hotellet.\n\n` +
          `• 🚙 **Alternativ 2: Leiebil fra flyplass (ATLAS Engrospris)**\n` +
          `  - Hent på VRN eller BGY terminal fra **320 kr/dag (€28)** via [ATLAS Billeie](/cars).\n` +
          `  - Rute: A22 mot Brennero, ta avkjøring **San Michele all'Adige / Mezzocorona**, følg deretter SS43/SP64 direkte til Molvenosjøen. Perfekt for å utforske Dolomittene!\n\n` +
          `• 🚆 **Alternativ 3: Panoramatog + Hotellshuttle**\n` +
          `  - Ta Frecciarossa / Trenitalia-tog til **Mezzocorona Stasjon** (eller Trento).\n` +
          `  - Derfra går lokalbuss B611 eller hotellets forhåndsbestilte henting (25 minutter) opp til Molveno.`;
      } else if (hasHotel && (hotelName.toLowerCase().includes('spaltenna') || city.toLowerCase().includes('chianti') || q.includes('chianti') || q.includes('toscana'))) {
        reply = `🚗 **Reiserute fra Flyplass til Castello di Spaltenna (Gaiole in Chianti, Toscana):**\n\n` +
          `• ✈️ **Beste ankomstflyplasser:**\n` +
          `  1. **Firenze Amerigo Vespucci (FLR)**: **55m** (65 km) — *Nærmeste flyplass! Enkel kjøring rett inn på SR222 Chiantigiana.*\n` +
          `  2. **Pisa Galileo Galilei (PSA)**: **1t 30m** (110 km) — *Mange direktefly fra Norge.*\n` +
          `  3. **Bologna (BLQ)**: **1t 45m** (145 km).\n\n` +
          `• 🚙 **Alternativ 1: Leiebil (Sterkt anbefalt for Chianti)**\n` +
          `  - Hent på FLR eller PSA fra **290 kr/dag (€26)** via [ATLAS Billeie](/cars).\n` +
          `  - Kjøring gjennom Chianti Classico-vinåsene er en opplevelse i seg selv. Gir full frihet til å besøke middelalderborger, vingårder og Siena.\n\n` +
          `• 🚖 **Alternativ 2: Privat Sjåfør**\n` +
          `  - Mercedes E-Klasse fra FLR ankomst direkte til slottsporten for **ca. 1 350 kr (€120)**.\n\n` +
          `• 🚆 **Alternativ 3: Tog + Lokalbil**\n` +
          `  - 35 min med Regionale Veloce fra Firenze SMN til **Montevarchi-Terranuova**, deretter 20 min taxi/slottstransfer opp til Gaiole.`;
      } else if (hasHotel && (hotelName.toLowerCase().includes('adler') || city.toLowerCase().includes('hinterzarten') || q.includes('schwarzwald') || q.includes('svartskogen'))) {
        reply = `🚗 **Reiserute fra Flyplass til Parkhotel Adler (Hinterzarten, Schwarzwald):**\n\n` +
          `• ✈️ **Beste ankomstflyplasser:**\n` +
          `  1. **EuroAirport Basel-Mulhouse-Freiburg (BSL)**: **55m** (75 km) — *Raskeste rute via A5.*\n` +
          `  2. **Zürich Airport (ZRH)**: **1t 15m** (85 km) — *Utmerket for direkteruter fra Oslo/Bergen.*\n` +
          `  3. **Stuttgart (STR)**: **1t 35m** (135 km).\n\n` +
          `• 🚆 **Alternativ 1: Legendariske Höllentalbahn (Anbefalt tog!)**\n` +
          `  - En av Europas mest spektakulære fjellbaner. Tog fra Freiburg Hbf tar kun 30 minutter direkte til **Hinterzarten Stasjon**.\n` +
          `  - Hotellet ligger en behagelig **3-minutters spasertur (300 meter)** fra stasjonen, med bagasjeservice!\n\n` +
          `• 🚙 **Alternativ 2: Leiebil fra flyplass**\n` +
          `  - Fra **310 kr/dag** på BSL eller ZRH. Nydelig kjøretur gjennom Schwarzwald på B31.\n\n` +
          `• 🚖 **Alternativ 3: Privat Sjåfør**\n` +
          `  - Fast transfer fra Basel eller Zürich flyplass direkte til resepsjonen for **ca. 1 500 kr (€130)**.`;
      } else {
        reply = `🚗 **ATLAS Flyplass- og Transportassistent for Hotellopphold:**\n\nNår du benytter deg av våre **0 kr Hotel Breaks** på europeiske luksus- og velværesteder, har du 3 smidige alternativer fra flyplassen:\n\n` +
          `1. 🚖 **Privat VIP Sjåfør (Door-to-Door)**: Sjåfør med navneskilt i ankomsthallen, bagasjeassistanse og direkte kjøring til hotellobbyen. Fast klubb-engrospris (ca. €110–€145).\n` +
          `2. 🚙 **Leiebil med medlemsrabatt (0 kr påslag)**: Hent bil direkte i flyplassterminalen via [ATLAS Billeie](/cars) fra ca. 290–340 kr/dag. Perfekt for frihet til å oppleve vingårder, fjellpass og innsjøer.\n` +
          `3. 🚆 **Panoramatog & Hotellshuttle**: Europeisk jernbane (Trenitalia, DB, ÖBB, SBB, TGV) tar deg naturskjønt og rimelig (€15–€30) til nærmeste dalstasjon, hvor mange av våre partnerhoteller tilbyr gratis stasjonshenting.\n\n*Hvilket hotell eller destinasjon vil du ha nøyaktig reiserute og flyplassanbefaling for?*`;
      }
    } else {
      reply = `🚗 **ATLAS Airport-to-Hotel Ground Transit & Transfer Copilot:**\n\nWhen claiming your **$0 Hotel Breaks** at our curated European countryside and alpine sanctuaries, you have 3 seamless transit alternatives from the arrival terminal:\n\n` +
        `1. 🚖 **Private VIP Chauffeur (Door-to-Door)**: Driver meets you in the arrival hall with a personalized name card and luggage assistance. Mercedes E/V-Class direct to the hotel lobby at wholesale pass-through rates (~€110–€145).\n` +
        `2. 🚙 **Wholesale Airport Car Rental (0% Markup)**: Terminal pick-up via [ATLAS Cars](/cars) from ~$28–$34/day. Total autonomy to explore alpine passes, vineyards, and lakes.\n` +
        `3. 🚆 **Scenic European Express Rail & Shuttle**: Europe's premier rail lines (Trenitalia, DB, ÖBB, SBB, TGV) bring you comfortably to regional stations, where partner hotels provide courtesy shuttle pickups.\n\n*Which hotel or destination would you like exact route times and airport recommendations for?*`;
    }
  }

  // 22. BESPOKE TRAVEL PLAN, ITINERARY & OUTINGS GENERATOR
  else if (
    q.includes('reiseplan') || q.includes('travel plan') || q.includes('itinerary') ||
    q.includes('utflukt') || q.includes('outings') || q.includes('dag for dag') ||
    q.includes('day by day') || q.includes('things to do') || q.includes('aktivitet') ||
    q.includes('hva bør jeg gjøre') || q.includes('schedule')
  ) {
    const dest = hasHotel ? hotelContext!.city || 'din destinasjon' : 'Barcelona / Paris';
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

  // 23. DYNAMIC CONVERSATIONAL HOTEL OR GENERAL TRAVEL RESPONSE
  else if (hasHotel) {
    if (isNorwegian) {
      reply = `🏨 **Engrosanalyse for ${hotelName} (${city}):**\n\nAngående ditt spørsmål om **"${query}"** for oppholdet **${dates}**:\n\n• **Offisiell retailpris**: $${pubRate}/natt ($${pubTotal} totalt) hos ${ota}\n• **ATLAS Engrospris**: **$${wsRate}/natt ($${wsTotal} totalt)**\n• **Din medlemsgevinst**: **$${savings} (${savingsPct}% rabatt)**\n\nAlle bestillinger hos ATLAS inkluderer alle destinasjonsskatter, 0 kr i påslag, full rate parity-beskyttelse og garantert B2B Bedbank-innsjekking. Ønsker du at jeg låser inn denne prisen for deg, eller vil du ha detaljer om romkategoriene?`;
    } else {
      reply = `🏨 **Wholesale Intelligence for ${hotelName} (${city}):**\n\nRegarding your question about **"${query}"** for your stay from **${dates}**:\n\n• **Public Retail Rate**: $${pubRate}/night ($${pubTotal} total) on ${ota}\n• **ATLAS Wholesale Rate**: **$${wsRate}/night ($${wsTotal} total)**\n• **Instant Member Savings**: **$${savings} (${savingsPct}% Off)**\n\nEvery ATLAS booking includes all destination taxes, 0% retail markup, full rate parity protection, and guaranteed B2B Bedbank check-in vouchers. Would you like me to reserve this rate or explain room categories?`;
    }
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
    if (isNorwegian) {
      reply = `✨ Jeg er **Aura**, din personlige VIP Travel Concierge for ATLAS.\n\nAngående ditt spørsmål om **"${query}"**:\n\nATLAS gir deg direkte tilgang til over 1 000 000 luksushoteller via institusjonelle B2B Bedbanks (Hotelbeds, WebBeds) og flygrossister med 0 kr påslag. Du betaler nøyaktig leverandørens engrospris.\n\n**Hva ønsker du at jeg skal hjelpe deg med?**\n1. Sjekke engrosprisen på et bestemt hotell eller reisemål?\n2. Forklare hvorfor ATLAS er fritatt Rate Parity?\n3. Vise hvordan du bruker poeng og Rewards Vault?\n4. Guide deg gjennom våre eksklusive feriesuiter (fra 3 890 kr for 7 netter)?\n\nFortell meg hvilket hotell eller reisemål du har i tankene!`;
    } else {
      reply = `✨ I am **Aura**, your proactive VIP Travel Concierge.\n\nRegarding your question about **"${query}"**:\n\nATLAS operates directly on institutional B2B Bedbanks (Hotelbeds, WebBeds) across 1,000,000+ luxury hotels worldwide. By eliminating public retail ad costs (the 20%–45% markup charged by Booking.com and Expedia), our members access net wholesale pass-through pricing with zero retail markup.\n\n**Would you like me to:**\n1. Run a live wholesale rate audit for a specific hotel or city?\n2. Explain rate parity and the legal closed-loop exemption?\n3. Show how taxes and resort fees are prepaid upfront?\n4. Guide you through B2B check-in voucher guarantees?\n\nTell me which hotel or city you are considering!`;
    }
  }

  return { reply, bookingAction, showHowItWorksLink, showNomadLink, showProofLink };
}

function detectIsNorwegian(query: string, userLocale?: string): boolean {
  if (userLocale && userLocale.toLowerCase().startsWith('no')) return true;
  if (/[æøåÆØÅ]/.test(query)) return true;
  const norwegianWords = [
    'hei', 'hallo', 'hva', 'hvorfor', 'hvordan', 'hvem', 'når', 'hvilke', 'hvilken',
    'poeng', 'saldo', 'reise', 'reiser', 'hotell', 'fly', 'flyreiser', 'leilighet',
    'ferie', 'ferier', 'bestill', 'bestille', 'bestilling', 'medlem', 'medlemskap',
    'fordeler', 'pass', 'lommebok', 'utflukt', 'utflukter', 'norge', 'oslo', 'kroner',
    'nok', 'skatt', 'skatter', 'gebyr', 'gebyrer', 'avbestille', 'avbestilling',
    'erstatning', 'forsinkelse', 'voucher', 'kupong', 'halvpensjon', 'opphold',
    'norsk', 'språk', 'forstår', 'hjelp', 'vis'
  ];
  const qLower = query.toLowerCase();
  return norwegianWords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(qLower));
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, hotelContext, userContext, travelProfile, features: passedFeatures, history } = await req.json();
    const query = (prompt || '').trim();
    const features: PlatformFeatureFlags = passedFeatures || DEFAULT_PLATFORM_CONFIG;
    const isNorwegian = detectIsNorwegian(query, userContext?.locale);

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
      const systemPrompt = buildAuraSystemPrompt(hotelContext, userContext?.name, travelProfile, isNorwegian);
      reply = await queryGeminiApi(apiKey, activeModel.id, systemPrompt, query, history);
    }

    // 2. If Gemini is not configured or failed, use our comprehensive Deep Domain Intelligence Engine
    if (!reply) {
      const domainResult = generateDomainConciergeResponse(query, hotelContext, features, travelProfile, isNorwegian);
      reply = domainResult.reply;
      bookingAction = domainResult.bookingAction;
      showHowItWorksLink = domainResult.showHowItWorksLink || false;
      showNomadLink = domainResult.showNomadLink || false;
      showProofLink = domainResult.showProofLink || false;
    }

    // Ensure booking action is attached if user is asking to book the active hotel
    if (!bookingAction && hotelContext && hotelContext.name) {
      const qLower = query.toLowerCase();
      if (qLower.includes('book') || qLower.includes('reserve') || qLower.includes('lock in') || qLower.includes('bestill') || qLower.includes('reserver')) {
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

          if (isNorwegian) {
            reply = `🎯 **Atlas Central Brain: Komplett engrospakke sammensatt for ${dest}!**\n\nJeg har mobilisert våre 5 domenesubagenter (Hoteller, Fly, Lounger, Cruise og Finans) for å sette sammen en synkronisert reiserute med 0 kr påslag:\n\n• 🏨 **Engroshotell**: ${hotelComp?.hotelName || 'Luksus 5★ Palass'} ($${hotelComp?.rawWholesaleNetPrice || 310}/natt)\n• ✈️ **Direkte NDC-fly**: ${flightComp?.airlineName || 'SAS / British Airways'} (${flightComp?.cabinClass || 'Business'})\n• ☕ **VIP Flyplasslounge**: ${loungeComp?.name || 'Club Aspire VIP Lounge'}\n\n💰 **Samlet Medlemsbesparelse**: Spar **$${tripItinerary.pricing.memberTotalSavings}** mot åpne reisesider!\n\nSe detaljene i reisekortet under for å sikre pakken:`;
          } else {
            reply = `🎯 **Atlas Central Brain: Full Wholesale Package Assembled for ${dest}!**\n\nI have mobilized our 5 domain subagents (Hotels, Flights, Lounges, Cruises, and Finance Guardian) to create your synchronized 0% retail markup itinerary:\n\n• 🏨 **Wholesale Hotel**: ${hotelComp?.hotelName || 'Luxury 5★ Palace'} ($${hotelComp?.rawWholesaleNetPrice || 310}/nt)\n• ✈️ **NDC Flight Direct**: ${flightComp?.airlineName || 'British Airways / SAS'} (${flightComp?.cabinClass || 'Business'})\n• ☕ **VIP Airport Lounge**: ${loungeComp?.name || 'Club Aspire VIP Lounge'} (£${loungeComp?.wholesaleNetCostGbp || 22.50} vs £${loungeComp?.publicWalkUpPriceGbp || 48} walk-in)\n\n💰 **Consolidated Savings**: Save **$${tripItinerary.pricing.memberTotalSavings}** vs. public retail travel aggregators!\n\nReview the synchronized trip card below to lock in the wholesale bundle:`;
          }
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
