const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'ATLAS_Whitepaper.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\ATLAS_Whitepaper.pdf';

const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });

const stream1 = fs.createWriteStream(outputPath1);
doc.pipe(stream1);

// Palette
const primary = '#0F172A'; // Slate 900
const gold = '#D97706';    // Amber 600
const emerald = '#059669'; // Emerald 600
const sky = '#0284C7';     // Sky 600
const indigo = '#4F46E5';  // Indigo 600
const dark = '#1E293B';    // Slate 800
const muted = '#64748B';   // Slate 500
const bgLight = '#F8FAFC'; // Slate 50

function addHeader(title, sectionNum) {
  doc.fillColor(primary).fontSize(13.5).font('Helvetica-Bold').text(`${sectionNum}. ${title.toUpperCase()}`, 38, 38);
  doc.rect(38, 54, 519, 1).fill('#E2E8F0');
}

function addFooter(pageNum, totalPages = 8) {
  doc.rect(38, 775, 519, 22).fill('#0F172A');
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS VIP PLATFORM • THE SOVEREIGN TRAVEL MANIFESTO & MASTER PROSPECTUS', 48, 782);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(`Page ${pageNum} of ${totalPages}`, 505, 782);
}

// ==========================================
// PAGE 1: TITLE & COVER MANIFESTO
// ==========================================
doc.rect(38, 38, 519, 760).fill(primary);

doc.fillColor('#FFFFFF').fontSize(44).font('Helvetica-Bold').text('ATLAS', 65, 125);
doc.fillColor(gold).fontSize(15.5).font('Helvetica-Bold').text('THE PRIVATE WHOLESALE TRAVEL & BANKING CLUB', 65, 180);
doc.fillColor('#94A3B8').fontSize(10.5).font('Helvetica').text('The Sovereign Travel Manifesto, Financial Arbitrage & Complete Member Prospectus', 65, 203);
doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text('Confidential Edition • Version 6.0 • Complete Master Release • August 2026', 65, 222);

doc.rect(65, 255, 465, 2).fill(gold);

doc.fillColor('#FFFFFF').fontSize(10.5).font('Helvetica-Bold').text('THE SOVEREIGN TRAVEL DECLARATION:', 65, 280);
doc.fillColor('#E2E8F0').fontSize(9).font('Helvetica-Oblique').text(
  '"Paying retail prices for travel is a voluntary tax on consumers. ATLAS is the declaration of travel sovereignty—where raw wholesale B2B net pricing meets private financial banking equity, automated price-drop refunds, and borderless global mobility."',
  65,
  298,
  { width: 465, lineGap: 3.5 }
);

// Highlights Box
doc.rect(65, 370, 465, 255).fill('#1E293B');
doc.fillColor(gold).fontSize(10.5).font('Helvetica-Bold').text('THE UNFAIR ADVANTAGE: WHY THE 1% NEVER PAY RETAIL', 80, 385);

const coverHighlights = [
  '• 100% Wholesale Net Rates: Direct B2B Bedbank pipelines (Hotelbeds & WebBeds) at 30%–70% off retail.',
  '• Curated Luxury Estates: Private beachfront villas and alpine chalets with private French chefs (45% off).',
  '• Private Jet Empty Legs: Repositioning flights on Bombardier Challengers from $690/seat (80% off).',
  '• FinTech Reloadable Visa® Card: 0% FX fees worldwide + automated cash deposits from price drops & claims.',
  '• Post-Booking Price-Drop Sentinel: 24/7 Pruvo background re-hedging refunding rate drops straight to your card.',
  '• Automated Flight Delay Claims: AirHelp API recovering up to $650 direct cash per passenger.',
  '• Digital Nomad & Global Mobility Hub: 15+ Nomad Visas, Schengen 90-day sentinel & 1Gbps monthly coliving.',
  '• Aura AI Concierge: Autonomous itinerary gap detection powered by Gemini 3.7 Flash & ElevenLabs.',
  '• Travel Vault Treasury: Supplier volume overrides pooled and distributed as annual member dividends.'
];

let hlY = 408;
coverHighlights.forEach((hl) => {
  doc.fillColor('#F1F5F9').fontSize(7.8).font('Helvetica').text(hl, 80, hlY, { width: 435 });
  hlY += 18.5;
});

doc.fillColor('#94A3B8').fontSize(7.8).font('Helvetica').text(
  'Target Archetypes: Ultra-Luxury Travelers • Digital Nomads • Frequent Vacation Families • Corporate Executives',
  65,
  735,
  { width: 465 }
);

// ==========================================
// PAGE 2: THE OUTRAGE & THE TWO ENGINES
// ==========================================
doc.addPage();
addHeader('The Outrage: The $1.2T Travel Cartel & Dual-Engine Solution', '1');

doc.fillColor(dark).fontSize(8.2).font('Helvetica').text(
  'Every time you book a hotel room, villa, or flight on Expedia, Booking.com, or Hotels.com, you are paying an artificial 18% to 25% retail markup. That extra $150–$300/night does not go to the hotel or get you better service—it exists solely to pay for the Google Search and TV ads that lured you in.\n\n' +
  '• The Rate Parity Trap: Hotels are contractually forbidden from advertising lower rates publicly on the web.\n' +
  '• The Closed-Loop Breakthrough: International antitrust law provides a strict legal exemption for private, password-protected membership clubs. ATLAS passes confidential B2B Bedbank inventory (Hotelbeds, WebBeds) at 0% retail markup.',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

// Engine 1
doc.rect(38, 175, 519, 125).fill(bgLight);
doc.rect(38, 175, 4, 125).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('ENGINE 1: THE RAW B2B WHOLESALE PIPELINE (UPFRONT DISCOUNTS)', 50, 185);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Direct Bedbank Net Feeds: Real-time XML/REST pipes into Hotelbeds, WebBeds, and Travco accessing 1,000,000+ properties at confidential wholesale net cost with 0% retail markup (30% to 70% off).\n' +
  '• Curated Luxury Estates (Le Collectionist): Beachfront villas in St. Barts and ski chalets in Courchevel with on-site French chefs and butlers at 45% below public villa brokers.\n' +
  '• Private Jet Aviation (LunaJets & FlyXO): Real-time empty-leg repositioning flights from $690/seat (80% off).',
  50,
  203,
  { width: 495, lineGap: 2.8 }
);

// Engine 2
doc.rect(38, 312, 519, 125).fill(bgLight);
doc.rect(38, 312, 4, 125).fill(emerald);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('ENGINE 2: THE FINTECH CASH INFLOW TREASURY (CASH PAYBACK)', 50, 322);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• High-Ticket Ancillary Bounties: Travel insurance, 5G eSIMs, fast-track customs, and nomad visa filings generate high B2B commissions and supplier volume overrides.\n' +
  '• Autonomous Post-Booking Price Drops: Pruvo Sentinel re-books when rates drop, refunding cash ($70–$240) to Visa.\n' +
  '• Automated Flight Delay Legal Enforcement: AirHelp API recovers $650 direct cash per delayed passenger.\n' +
  '• Annual Travel Vault Dividends: Non-operating supplier surpluses are distributed annually into member cards.',
  50,
  340,
  { width: 495, lineGap: 2.8 }
);

// Retail comparison box
doc.rect(38, 450, 519, 105).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('THE ECONOMIC REALITY: RETAIL OTA VS. ATLAS WHOLESALE', 50, 463);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  '• Public Retail Booking: Base Hotel Cost ($198) + Marketing & TV Ad Markup ($191) = $389 / Night\n' +
  '  ❌ Result: Consumer overpays by $573 on a 3-night stay with zero cash return or price-drop protection.\n\n' +
  '• ATLAS Closed-Loop Wholesale: Raw B2B Bedbank Net Rate ($198) + 0% Retail Markup = $198 / Night\n' +
  '  ✅ Result: Member saves $573 instantly + receives automatic price-drop monitoring, cashback, and dividends.',
  50,
  481,
  { width: 495, lineGap: 2.8 }
);

addFooter(2);

// ==========================================
// PAGE 3: THE FINTECH BANKING MOAT & VISA CARD
// ==========================================
doc.addPage();
addHeader('The Anti-Expense: Travel That Deposits Cash Into Your Account', '2');

doc.fillColor(dark).fontSize(8.2).font('Helvetica').text(
  'Every other travel platform in the world takes your money and says goodbye. ATLAS is the world\'s first FinTech Travel Treasury where your card balance and Travel Vault equity compound with every single trip.',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

// Inflow 1
doc.rect(38, 100, 519, 95).fill(bgLight);
doc.rect(38, 100, 4, 95).fill(gold);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('1. THE ATLAS OBSIDIAN & GOLD VISA® CARD (POWERED BY STRIPE ISSUING)', 50, 110);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Heavy metallic Titanium and Gold physical cards plus instant Apple Pay and Google Pay virtual provisioning.\n' +
  '• 0% Foreign Transaction (FX) Fees across all global currencies, saving members an additional 3% on foreign spend.\n' +
  '• 1.2% to 1.6% card interchange yield reinvested into member rewards and Vault dividend pools.',
  50,
  127,
  { width: 495, lineGap: 2.5 }
);

// Inflow 2
doc.rect(38, 205, 519, 95).fill(bgLight);
doc.rect(38, 205, 4, 95).fill(emerald);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('2. AUTONOMOUS POST-BOOKING PRICE-DROP CASH REFUNDS (PRUVO SENTINEL)', 50, 215);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• While you sleep, our 24/7 background sentinel continuously scans 50+ global wholesale feeds for your booked room.\n' +
  '• When wholesale rates drop prior to check-in, ATLAS automatically re-hedges the reservation at the lower rate and deposits the cash difference (averaging $70 to $240 per stay) directly into your Visa card balance.\n' +
  '• Zero member effort required: the algorithm handles cancellation, re-booking, and cash credit autonomously.',
  50,
  232,
  { width: 495, lineGap: 2.5 }
);

// Inflow 3
doc.rect(38, 310, 519, 95).fill(bgLight);
doc.rect(38, 310, 4, 95).fill(sky);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('3. AUTOMATED FLIGHT DELAY LEGAL ENFORCEMENT ($650 DIRECT CASH VIA AIRHELP)', 50, 320);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Under European Regulation EU261/2004 and UK261 statutory rules, any airline delay exceeding 3 hours triggers automated legal court enforcement via the AirHelp registry.\n' +
  '• ATLAS recovers up to $650 direct cash per passenger deposited straight onto your ATLAS Visa card.\n' +
  '• Bypasses airline customer service runarounds with direct statutory court filings.',
  50,
  337,
  { width: 495, lineGap: 2.5 }
);

// Inflow 4
doc.rect(38, 415, 519, 95).fill(bgLight);
doc.rect(38, 415, 4, 95).fill(indigo);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('4. THE TRAVEL VAULT PROFIT SHARING TREASURY & ANNUAL CASH DIVIDENDS', 50, 425);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Every booking, empty-leg flight, villa stay, and card swipe accrues Vault Equity Units.\n' +
  '• On December 31 of each calendar year, the platform\'s pool of surplus supplier overrides and ancillary commissions is distributed pro-rata to members as annual cash dividend checks directly into their Visa balance.',
  50,
  442,
  { width: 495, lineGap: 2.5 }
);

addFooter(3);

// ==========================================
// PAGE 4: 10 WHOLESALE & LUXURY VERTICALS
// ==========================================
doc.addPage();
addHeader('The 10 Luxury & Wholesale Travel Verticals', '3');

const verticals = [
  { name: '1. Wholesale Hotels (1M+ Properties)', desc: 'Direct B2B Bedbank net rates from Hotelbeds, WebBeds, and Travco at 30% to 70% off retail.' },
  { name: '2. Curated Luxury Villas & Chalets', desc: 'Hand-picked estates in St. Barts and Courchevel with on-site French chefs and butlers (45% off).' },
  { name: '3. Private Jet Aviation Empty Legs', desc: 'Real-time repositioning flights on Bombardier Challenger and Citation jets from $690/seat (80% off).' },
  { name: '4. Captained Yachts & Supercars', desc: '75ft Sunseeker Predator motor yachts and doorstep Ferrari F8 deliveries at raw wholesale day rates.' },
  { name: '5. Wholesale Closed-Loop Cruises', desc: 'Royal Caribbean Icon of the Seas staterooms from $1,390 with $250 free onboard spending credit.' },
  { name: '6. VIP Airport Lounges ($32 Flat Pass)', desc: 'Access to Skyview Oasis Lounges with hot buffets, premium open bar, and private shower suites.' },
  { name: '7. Airport Fast-Track Customs Escorts', desc: '3-minute priority customs escort and tarmac electric buggy at London Heathrow, JFK, and Miami ($85).' },
  { name: '8. Elite Hotel Status Matching', desc: 'Instant status match bridge directly into Hilton Honors Diamond and Marriott Bonvoy Platinum.' },
  { name: '9. Global 5G Travel eSIM (140+ Nations)', desc: 'Auto-refilled monthly 10GB high-speed 5G mobile data with seamless multi-country connectivity.' },
  { name: '10. Comprehensive Travel Medical Cover', desc: 'Integrated global emergency medical coverage and evacuation via SafetyWing Nomad insurance.' },
];

let vY = 68;
verticals.forEach((v) => {
  doc.rect(38, vY, 519, 33).fill(bgLight);
  doc.rect(38, vY, 3, 33).fill(gold);
  doc.fillColor(primary).fontSize(8.2).font('Helvetica-Bold').text(v.name, 48, vY + 5.5);
  doc.fillColor(dark).fontSize(7.2).font('Helvetica').text(v.desc, 48, vY + 18);
  vY += 39;
});

addFooter(4);

// ==========================================
// PAGE 5: GLOBAL MOBILITY & NOMAD INFRASTRUCTURE
// ==========================================
doc.addPage();
addHeader('Global Mobility Infrastructure: 15+ Nomad Visas & Schengen Sentinel', '4');

doc.fillColor(dark).fontSize(8.2).font('Helvetica').text(
  'ATLAS is the complete operating system for sovereign remote living, tax optimization, and perpetual travel.',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

// Nomad Visas
doc.rect(38, 98, 519, 135).fill(bgLight);
doc.rect(38, 98, 4, 135).fill(emerald);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('15+ FAST-TRACK DIGITAL NOMAD VISAS (1-CLICK INTAKE & APOSTILLE)', 50, 108);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Spain Ley de Startups: €2,646/mo remote income requirement, flat 24% Beckham tax regime for 5 years.\n' +
  '• Portugal D8 Visa: €3,280/mo remote income, direct path to EU permanent residency and citizenship in 5 years.\n' +
  '• Dubai Virtual Working Program: $3,500/mo income, 0% personal income tax, 1-year renewable residency.\n' +
  '• Thailand DTV (Destination Thailand Visa): 5-year multi-entry with $14,000 proof of funds and 180-day stays.\n' +
  '• Bali E33G Remote Worker Residency: 1-year renewable permit for remote tech workers with $60k/yr income.\n' +
  '• Costa Rica Rentista & Greece Nomad Visas: Complete consular preparation and Hague Apostille packaging.',
  50,
  126,
  { width: 495, lineGap: 2.8 }
);

// Schengen Sentinel
doc.rect(38, 245, 519, 105).fill(bgLight);
doc.rect(38, 245, 4, 105).fill(sky);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('THE SCHENGEN 90/180-DAY AUTOMATED COMPLIANCE SENTINEL', 50, 255);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Real-time rolling window tracking algorithm that computes exact remaining days in the European Schengen Area.\n' +
  '• Automated alert triggers when reaching 75 days, preventing illegal overstays and travel bans.\n' +
  '• Instant 1-click booking for Non-Schengen Visa Run Sanctuaries: London, Cyprus, Albania, Montenegro, and Georgia with high-speed coliving accommodations.',
  50,
  273,
  { width: 495, lineGap: 2.8 }
);

// Coliving
doc.rect(38, 362, 519, 105).fill(bgLight);
doc.rect(38, 362, 4, 105).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('VERIFIED 1GBPS LONG-STAY COLIVING STAYS (30+ NIGHTS)', 50, 372);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Partnerships with Outsite, Selina, and Dojo Coliving across Lisbon, Bali, Medellín, Bansko, and Cape Town.\n' +
  '• Every property is pre-tested and certified for 300 to 1,000 Mbps Fiber Wi-Fi, ergonomic workstations, private en-suite bathrooms, and active entrepreneur communities at 50% below public Airbnb monthly rates.',
  50,
  390,
  { width: 495, lineGap: 2.8 }
);

addFooter(5);

// ==========================================
// PAGE 6: 4 SOVEREIGN CASE STUDIES
// ==========================================
doc.addPage();
addHeader('The 4 Sovereign Travel Journeys (Real-World Case Studies)', '5');

// Case 1
doc.rect(38, 68, 519, 105).fill(bgLight);
doc.rect(38, 68, 4, 105).fill(gold);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('JOURNEY 1: THE ULTRA-LUXURY CONNOISSEUR (MARCUS & VICTORIA V., LONDON / GENEVA)', 48, 78);
doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(
  '• Trip: 7 Nights in St. Barts for New Year\'s Eve + London to Nice Private Jet Flight.\n' +
  '• Public Retail Cost: Villa L\'Étoile ($40,600) + Private Jet Charter ($12,400) = $53,000 Total.\n' +
  '• ATLAS VIP Cost: Villa L\'Étoile ($22,400) + Empty Leg ($3,800) + French Chef & Butler Included = $26,200.\n' +
  '• Net Member Savings: $26,800 (50.5% Saved) + $1,420 in Travel Vault Dividends & Card Cashback.',
  48,
  95,
  { width: 495, lineGap: 2.5 }
);

// Case 2
doc.rect(38, 183, 519, 105).fill(bgLight);
doc.rect(38, 183, 4, 105).fill(emerald);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('JOURNEY 2: THE GLOBAL DIGITAL NOMAD (ELENA R., SENIOR SOFTWARE ENGINEER)', 48, 193);
doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(
  '• Lifestyle: 12 Months Remote Living across Lisbon, Bansko, and Bali with zero tax friction.\n' +
  '• Legacy Nomad Costs: Airbnb monthly stays ($24,800) + Consular Lawyers ($3,200) + Roaming SIMs ($1,440) = $29,440/yr.\n' +
  '• ATLAS Nomad Passport: 1Gbps Coliving ($11,800) + Free 10GB 5G eSIM ($0) + Visa Intake ($0) = $11,800/yr.\n' +
  '• Net Annual Savings: $17,640 / year + Zero Schengen Overstay Risk via Automated Sentinel.',
  48,
  210,
  { width: 495, lineGap: 2.5 }
);

// Case 3
doc.rect(38, 298, 519, 105).fill(bgLight);
doc.rect(38, 298, 4, 105).fill(sky);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('JOURNEY 3: THE SMART FAMILY (THE RICHARDSON FAMILY, 4 MEMBERS, CHICAGO)', 48, 308);
doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(
  '• Vacation: 5 Nights at Moon Palace Cancun (All-Inclusive) + 7-Night Caribbean Cruise on Royal Caribbean.\n' +
  '• Public Retail Cost: Moon Palace 2-Bedroom Suite ($3,850) + Cruise Stateroom ($4,480) + Park Tickets = $9,530.\n' +
  '• ATLAS Family Advantage: Moon Palace Wholesale ($1,780) + Cruise Wholesale ($2,790) + $250 Free Credit = $5,240.\n' +
  '• Net Family Savings: $4,290 (45% Saved) + 4 Sub-Member Family Account Passes Included Free under Gold VIP.',
  48,
  325,
  { width: 495, lineGap: 2.5 }
);

// Case 4
doc.rect(38, 413, 519, 105).fill(bgLight);
doc.rect(38, 413, 4, 105).fill(indigo);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('JOURNEY 4: THE CORPORATE EXECUTIVE (JONATHAN K., MANAGEMENT CONSULTANT)', 48, 423);
doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(
  '• Annual Travel: 24 Hotel Stays in NYC & London + 18 International Business Flights.\n' +
  '• Legacy Friction: Manhattan Hotel Markups ($18,400) + Unclaimed Delays ($0) + Lounge Fees ($1,170) = $19,570.\n' +
  '• ATLAS Corporate: Wholesale City Stays ($9,200) + Pruvo Price Drops (+$1,450) + AirHelp Delay Payouts (+$1,950) = $5,800.\n' +
  '• Net Financial Value Added: $13,200 in Wholesale Savings and Direct Cash Deposits onto ATLAS Visa Card.',
  48,
  440,
  { width: 495, lineGap: 2.5 }
);

addFooter(6);

// ==========================================
// PAGE 7: LIVE PROOF ENGINE, ROI & AURA AI
// ==========================================
doc.addPage();
addHeader('Live Savings Proof Engine, Mathematical ROI & Aura AI', '6');

// Proof Engine
doc.rect(38, 68, 519, 125).fill(primary);
doc.fillColor(gold).fontSize(9).font('Helvetica-Bold').text('CRYPTOGRAPHICALLY AUDITED REAL-TIME PROOF VS. PUBLIC OTAS', 48, 80);
doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica').text(
  '• The Grand Bellagio (Las Vegas): Public Expedia $1,167 vs Wholesale $594 ➔ Save $573 (49% Off)\n' +
  '• The Plaza Fifth Avenue (NYC): Public Booking.com $2,960 vs Wholesale $1,480 ➔ Save $1,480 (50% Off)\n' +
  '• Ritz Paris (Place Vendôme): Public Hotels.com $4,950 vs Wholesale $2,700 ➔ Save $2,250 (45% Off)\n' +
  '• Villa L\'Étoile (St. Barts): Public Airbnb $40,600 vs Wholesale $22,400 ➔ Save $18,200 (45% Off)\n\n' +
  'ROI PROOF: Taking just 1 weekend trip per year saves ~$382, paying for a Gold VIP Pass ($179/yr) on Day 1 (213% Immediate ROI).\n' +
  'Taking 3 trips/yr (12 nights) saves $1,980 + $185 price drop + $650 delay claim = $2,781 Net Cash Profit (1,653% ROI).',
  48,
  98,
  { width: 495, lineGap: 2.5 }
);

// Aura AI
doc.rect(38, 205, 519, 135).fill(bgLight);
doc.rect(38, 205, 4, 135).fill(emerald);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('AURA: AUTONOMOUS PROACTIVE AI CONCIERGE (GEMINI 3.7 FLASH + ELEVENLABS)', 48, 215);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Proactive Itinerary Gap Detection: Automatically identifies missing flight legs, unbooked airport transfers, and missing hotel nights (e.g. booked cruise in Miami without inbound flight) and surfaces 1-click wholesale solutions.\n' +
  '• Real-Time Wholesale Rate Parity Audits: Scans Bedbank feeds live, compares public OTA rates, and outputs instant reservation checkout cards directly in the chat feed.\n' +
  '• Natural Voice AI: ElevenLabs ultra-realistic vocal briefings on flight updates, visa rules, and lounge locations.\n' +
  '• Nomad & Schengen Companion: Computes rolling 90-day EU limits and assists with 0% tax nomad visa filings.',
  48,
  233,
  { width: 495, lineGap: 2.8 }
);

addFooter(7);

// ==========================================
// PAGE 8: MEMBERSHIP TIERS & INVITATION
// ==========================================
doc.addPage();
addHeader('Membership Architecture, Tiers & The Invitation to Sovereignty', '7');

// Tier table
const tiers = [
  { name: 'Silver Club ($89/yr | $9.99/mo)', desc: '400,000+ wholesale hotels (up to 35% off), 2x Travel Vault multiplier, fleet car rental discounts.' },
  { name: 'Global Nomad ($279/yr | $29.99/mo)', desc: 'Free 10GB monthly eSIM, SafetyWing medical insurance, 1-on-1 Visa concierge, 1Gbps monthly coliving.' },
  { name: 'Gold VIP ($179/yr | $19.99/mo) [POPULAR]', desc: '1M+ hotels, Luxury Villas, Hilton Diamond status match, $85 Fast-Track, Pruvo Price Drops, ATLAS Visa Card, 4 Family Passes.' },
  { name: 'Platinum Elite ($349/yr | $39.99/mo)', desc: 'Guaranteed lowest rate + 10%, 8x Vault dividend multiplier, Heavy Titanium Card, Private Jets & Yachts, 6 Family Passes.' },
];

let tY = 68;
tiers.forEach((t) => {
  doc.rect(38, tY, 519, 33).fill(bgLight);
  doc.rect(38, tY, 3, 33).fill(gold);
  doc.fillColor(primary).fontSize(8.2).font('Helvetica-Bold').text(t.name, 48, tY + 5.5);
  doc.fillColor(dark).fontSize(7.2).font('Helvetica').text(t.desc, 48, tY + 18);
  tY += 39;
});

// Why Saying No is Irrational
doc.rect(38, 235, 519, 110).fill(bgLight);
doc.rect(38, 235, 4, 110).fill(indigo);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('THE MATHEMATICAL REALITY: WHY SAYING NO IS IRRATIONAL', 48, 245);
doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(
  '• A Gold VIP pass costs $179/year ($14.90/month).\n' +
  '• Taking just 1 weekend trip saves ~$382, putting $203 pure profit in your pocket on Day 1.\n' +
  '• An average member taking 3 trips per year saves $2,781 in retail markups, price-drop refunds, and delay payouts.\n' +
  '• Remaining a non-member is a voluntary decision to pay a 25% tax to legacy booking corporations.',
  48,
  262,
  { width: 495, lineGap: 2.5 }
);

// Conclusion
doc.rect(38, 355, 519, 120).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('WELCOME TO THE INNER CIRCLE: RECLAIM YOUR TRAVEL SOVEREIGNTY', 48, 370);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'The era of paying 25% retail markups to subsidize corporate television commercials is over. ATLAS unifies raw wholesale pricing, sovereign travel banking, and autonomous AI intelligence into an invincible ecosystem.\n\n' +
  'Whether you are an ultra-luxury connoisseur booking private chalets in the French Alps, a digital nomad working from beachside villas in Bali, or a family exploring the world:\n\n' +
  'Welcome to the inner circle. Welcome to ATLAS.',
  48,
  390,
  { width: 495, lineGap: 2.8 }
);

addFooter(8);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('The Sovereign Travel Manifesto PDF successfully generated at: ' + outputPath1);
});
