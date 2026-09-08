const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'ATLAS_Case_Study_Rate_Parity.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\ATLAS_Case_Study_Rate_Parity.pdf';

const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });

const stream1 = fs.createWriteStream(outputPath1);
doc.pipe(stream1);

// Palette
const primary = '#0F172A'; // Slate 900
const gold = '#D97706';    // Amber 600
const emerald = '#059669'; // Emerald 600
const sky = '#0284C7';     // Sky 600
const dark = '#1E293B';    // Slate 800
const muted = '#64748B';   // Slate 500
const bgLight = '#F8FAFC'; // Slate 50

function addHeader(title) {
  doc.fillColor(primary).fontSize(13.5).font('Helvetica-Bold').text(title.toUpperCase(), 38, 38);
  doc.rect(38, 54, 519, 1).fill('#E2E8F0');
}

function addFooter(pageNum, totalPages = 6) {
  doc.rect(38, 775, 519, 22).fill('#0F172A');
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS INSTITUTE OF TRAVEL ECONOMICS • CASE STUDY: RATE PARITY', 48, 782);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(`Page ${pageNum} of ${totalPages}`, 505, 782);
}

// ==========================================
// PAGE 1: TITLE & THE HIDDEN HOOK
// ==========================================
doc.rect(38, 38, 519, 85).fill(primary);
doc.fillColor('#FFFFFF').fontSize(18).font('Helvetica-Bold').text('ECONOMIC CASE STUDY & RESEARCH REPORT', 52, 52);
doc.fillColor(gold).fontSize(11).font('Helvetica-Bold').text('Unmasking Rate Parity: The Invisible Hand of Global Travel Pricing', 52, 74);
doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('The Great Distribution Divide: Rate Parity vs. Private Wholesale Sovereignty • Live Edition', 52, 94);

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'EXECUTIVE SUMMARY & PEDAGOGICAL OBJECTIVE:\n' +
  'For over two decades, the global travel marketplace has been governed by an artificial pricing tether known as Rate Parity. Under the guise of "brand consistency" and "fairness," this contractual mechanism forces hotels to match the rates listed on dominant Online Travel Agencies (OTAs)—principally the $1.2 Trillion OTA cartel comprising Expedia, Booking.com, and Hotels.com.\n\n' +
  'The consequence is a "Retail Trap" where travelers pay an artificial 18% to 25% voluntary tax on every night stayed. This capital does not fund superior hospitality, better champagne, or upgraded suites; it exists solely to finance multi-million-dollar football stadium sponsorships and aggressive Google Search advertising.',
  38,
  135,
  { width: 519, lineGap: 2.8 }
);

doc.moveDown(0.8);
doc.rect(38, doc.y, 519, 70).fill(bgLight);
doc.rect(38, doc.y, 4, 70).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('1. THE HIDDEN HOOK: WHY DOES YOUR HOTEL ROOM COST WHAT IT DOES?', 50, doc.y + 8);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  'Retail markups exist primarily as a marketing subsidy. For the modern traveler, the "Retail Trap" is an invisible tax. Paying standard retail prices is effectively a "voluntary tax" levied by the OTA Cartel. These funds do not improve room quality; instead, they finance aggressive customer acquisition strategies and stadium sponsorships.',
  50,
  doc.y + 23,
  { width: 495, lineGap: 2.5 }
);

doc.moveDown(1.5);
doc.rect(38, doc.y + 10, 519, 85).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('2. DECODING THE CONCEPT: WHAT IS RATE PARITY?', 50, doc.y + 20);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'Rate parity is defined as the contractual requirement to maintain price consistency for the same travel product across every distribution channel. While presented as "fairness," it serves as the primary obstacle to travelers seeking wholesale entry points.\n\n' +
  '• Direct Hotel Website: Required to match OTA rates to avoid "Digital Invisibility" retaliatory search burial.\n' +
  '• OTA Cartel: Demands price identity to guarantee they are never undercut by direct hotel sales.\n' +
  '• Third-Party Reseller: Sustains identical pricing to protect intermediary profit margins.',
  50,
  doc.y + 36,
  { width: 495, lineGap: 2.5 }
);

addFooter(1);

// ==========================================
// PAGE 2: THE FINANCIAL ANATOMY (MATH)
// ==========================================
doc.addPage();
addHeader('3. The Financial Anatomy of a Booking: Retail vs. Wholesale');

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'To understand the "True Wholesale Cost," one must look toward B2B Bedbanks (Hotelbeds, WebBeds, Travco)—the private institutional exchanges where rooms are traded at raw clearing costs before the public retail marketing layer is applied.\n\n' +
  'Consider the economic breakdown of a standard 3-night stay in a 5-star property:',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

// Cost Stack Box
doc.rect(38, 120, 519, 130).fill(primary);
doc.fillColor(gold).fontSize(10).font('Helvetica-Bold').text('THE 3-NIGHT HOTEL ECONOMIC SPREAD', 50, 132);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica').text(
  '1. Raw Wholesale Net Price ($198 / night):\n' +
  '   The raw base cost of the room, accessible through closed-loop B2B Bedbanks.\n' +
  '   Total Raw Cost: $594.00 for 3 Nights\n\n' +
  '2. The OTA Marketing Ad Tax ($191 / night):\n' +
  '   The specific markup applied to the wholesale rate to fund Google Search and television ads.\n' +
  '   Total Marketing Extraction: $573.00 on a 3-Night Stay\n\n' +
  '3. Public Retail Trap Price ($389 / night):\n' +
  '   The final price presented to the public on the open internet: $1,167.00 Total Paid.\n' +
  '   ➔ NET LOSS / EXTRACTED EQUITY: $573.00 WITH ZERO EXTRA SERVICE BENEFIT.',
  50,
  148,
  { width: 495, lineGap: 2.2 }
);

// Annualized Calculation
doc.rect(38, 265, 519, 85).fill(bgLight);
doc.rect(38, 265, 4, 85).fill(emerald);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('ANNUALIZED CAPITAL LEAKAGE FORMULA (20 NIGHTS/YEAR)', 50, 275);
doc.fillColor(dark).fontSize(8).font('Helvetica').text(
  '• Public Retail Cost (20 Nights @ $389/nt):   $7,780.00 Paid\n' +
  '• Raw Wholesale Net Cost (20 Nights @ $198/nt): $3,960.00 Base Value\n' +
  '• Annual Extracted Ad Tax Paid by Traveler:  $3,820.00 in Extracted Liquidity\n\n' +
  'Key Finding: Continuing to book via public OTAs costs an active traveler $3,820/yr in voluntary marketing subsidies.',
  50,
  290,
  { width: 495, lineGap: 2.2 }
);

// Penalty Box
doc.rect(38, 365, 519, 80).fill('#FEF3C7');
doc.fillColor('#92400E').fontSize(9).font('Helvetica-Bold').text('4. THE "RATE PARITY" TRAP: THE PENALTY OF DIGITAL INVISIBILITY', 50, 375);
doc.fillColor('#78350F').fontSize(7.8).font('Helvetica').text(
  'If a hotel attempts to reclaim its pricing sovereignty by offering a lower direct rate on its own website, the OTA Cartel responds with severe technical penalties: demoting search visibility to page 10+, tagging listings as "High Price," or completely delisting the property. This algorithmic coercion forces hotels to keep public prices high.',
  50,
  390,
  { width: 495, lineGap: 2.2 }
);

addFooter(2);

// ==========================================
// PAGE 3: LEGAL SHIFTS & VALUE-ADDED PERKS
// ==========================================
doc.addPage();
addHeader('5. Global Regulatory Responses: The French Intervention');

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'In 2015, the French government intervened to restore market competition by legally banning rate parity clauses (Loi Macron). This legislative shift fundamentally altered the power dynamic in European hospitality:',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

const frenchPillars = [
  { title: '1. Restored Pricing Sovereignty', desc: 'Hotels regained the legal right to set their own prices based on direct supply and demand rather than contractual mandate.' },
  { title: '2. Competitive Market Equilibrium', desc: 'OTAs were forced to compete on service quality, lower commission fees, and tech features rather than enforced price monopolies.' },
  { title: '3. Direct Consumer Savings', desc: 'Travelers gained the ability to access lower rates by booking directly through the hotel\'s own booking engine.' }
];

let fpY = 105;
frenchPillars.forEach((p) => {
  doc.rect(38, fpY, 519, 42).fill(bgLight);
  doc.rect(38, fpY, 4, 42).fill(sky);
  doc.fillColor(primary).fontSize(8.5).font('Helvetica-Bold').text(p.title, 50, fpY + 6);
  doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(p.desc, 50, fpY + 19, { width: 495 });
  fpY += 48;
});

// Section 6: Value-Added Strategy
doc.rect(38, 260, 519, 175).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('6. THE MODERN STRATEGY: VALUE BEYOND PRICE & THE PROFIT INCENTIVE', 50, 272);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'In regions where public rate parity remains standard, hotels pivot to "Value-Added" bundling to bypass parity contracts while delivering high net value to direct bookers:\n\n' +
  '• Free High-Speed Wi-Fi: Often unbundled and charged as an extra on third-party OTAs.\n' +
  '• Complimentary Gourmet Breakfast: $30–$50/day in real utility that bypasses base rate restrictions.\n' +
  '• Flexible 24-Hour Cancellation: Avoiding restrictive "non-refundable" traps.\n' +
  '• Executive Lounge Access & Suite Upgrades: Prioritizing direct bookers for premium inventory.\n\n' +
  'THE PROFIT INCENTIVE:\n' +
  'Why do hotels offer these perks? Simple economics. A $20 breakfast is significantly cheaper for the hotel than paying a $100–$150 OTA cash commission. By booking direct or via private wholesale, you help the hotel eliminate intermediary waste, and they reward you with saved commissions in luxury perks.',
  50,
  288,
  { width: 495, lineGap: 2.2 }
);

addFooter(3);

// ==========================================
// PAGE 4: THE B2B BEDBANK & CLOSED-LOOP REVOLUTION
// ==========================================
doc.addPage();
addHeader('The Closed-Loop Revolution: Anatomy of Travel Sovereignty');

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  '"Travel Sovereignty" is the strategic transition from paying voluntary taxes to capturing raw wholesale net pricing. This revolution is predicated on moving travel liquidity into closed-loop networks and B2B Bedbanks that operate outside the visibility of the public OTA cartel.\n\n' +
  'Under international antitrust law, password-protected membership collectives are 100% EXEMPT from Rate Parity.',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

const sovPillars = [
  {
    num: 'PILLAR 1',
    title: 'Wholesale Liquidity Access (B2B Bedbanks)',
    desc: 'Direct XML/REST integration into B2B Bedbanks (Hotelbeds, WebBeds, Travco), bypassing the 18%–25% markup to access raw clearing net rates across 1,000,000+ properties.'
  },
  {
    num: 'PILLAR 2',
    title: 'Autonomous Price-Drop Arbitrage (Pruvo Sentinel)',
    desc: '24/7 background sentinel that monitors wholesale price fluctuations post-booking, instantly re-securing the inventory and issuing cash refunds if the price drops before check-in.'
  },
  {
    num: 'PILLAR 3',
    title: 'The Schengen Sentinel (Global Mobility Asset)',
    desc: 'Automated rolling-window 90/180-day tracker and nomad visa integration (Spain, Portugal, Dubai) ensuring complete legal compliance and borderless freedom.'
  },
  {
    num: 'PILLAR 4',
    title: 'Aura (Autonomous AI Concierge)',
    desc: 'Proactive AI layer that manages the temporal and financial ROI of a trip, optimizing itineraries, flight gap alerts, and legal delay claims.'
  }
];

let spY = 145;
sovPillars.forEach((sp) => {
  doc.rect(38, spY, 519, 58).fill(bgLight);
  doc.rect(38, spY, 4, 58).fill(emerald);
  doc.fillColor(emerald).fontSize(7.5).font('Helvetica-Bold').text(sp.num, 50, spY + 7);
  doc.fillColor(primary).fontSize(8.8).font('Helvetica-Bold').text(sp.title, 105, spY + 7);
  doc.fillColor(dark).fontSize(7.6).font('Helvetica').text(sp.desc, 50, spY + 22, { width: 495, lineGap: 2.2 });
  spY += 65;
});

addFooter(4);

// ==========================================
// PAGE 5: FINANCIAL ARBITRAGE ACROSS SEGMENTS
// ==========================================
doc.addPage();
addHeader('Financial Arbitrage: Case Studies in Private Wholesale Economics');

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'The modern traveler no longer views mobility as an expense, but as a "travel asset that deposits cash." Reclaiming the retail markup is functionally equivalent to generating high-yield banking equity:\n',
  38,
  68,
  { width: 519, lineGap: 2.8 }
);

const segments = [
  {
    name: '1. Ultra-Luxury & Lifestyle Connoisseur',
    need: 'Total exclusivity and bespoke vertical access.',
    roi: 'Direct reclamation of the 25% "luxury tax" into private liquidity; access to off-market villas in St. Barts & Courchevel with French chefs included ($18,200 saved per stay).'
  },
  {
    name: '2. Global Digital Nomad',
    need: 'Seamless borderless mobility and long-term legal compliance.',
    roi: 'Arbitrage of cost-of-living through "Schengen Sentinel" compliance and 1Gbps fiber coliving studios in Lisbon & Bali ($950/month saved).'
  },
  {
    name: '3. Smart Family',
    need: 'High-volume occupancy and multi-room logistics.',
    roi: 'Capturing the $191/night "ad tax" as family equity; transforming 2-bedroom all-inclusive suite vacation spend into a high-yield savings event ($2,070 saved).'
  },
  {
    name: '4. Corporate Road Warrior',
    need: 'Maximizing temporal ROI and executive efficiency.',
    roi: 'Conversion of corporate travel budgets into private equity through Aura\'s autonomous price-drop reclamation and $650 flight delay payouts ($1,480 saved).'
  }
];

let segY = 110;
segments.forEach((s) => {
  doc.rect(38, segY, 519, 68).fill(bgLight);
  doc.rect(38, segY, 4, 68).fill(gold);
  doc.fillColor(primary).fontSize(8.8).font('Helvetica-Bold').text(s.name, 50, segY + 8);
  doc.fillColor(muted).fontSize(7.5).font('Helvetica-Bold').text(`Strategic Need: ${s.need}`, 50, segY + 22);
  doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(`Economic Advantage: ${s.roi}`, 50, segY + 36, { width: 495, lineGap: 2 });
  segY += 76;
});

addFooter(5);

// ==========================================
// PAGE 6: THE LEARNER'S SYNTHESIS & INVITATION
// ==========================================
doc.addPage();
addHeader('7. Final Synthesis: The Learner\'s Toolkit & Conclusion');

doc.rect(38, 68, 519, 130).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('THE THREE ESSENTIAL TRUTHS OF TRAVEL ECONOMICS', 50, 80);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica').text(
  '1. Retail is a Marketing Subsidy:\n' +
  '   The public retail price is not the cost of hospitality; it is the cost of the advertisement that caught your attention.\n\n' +
  '2. Parity is an Artificial Floor:\n' +
  '   While the industry frames parity as "fairness," it is an anti-competitive mechanism designed to protect the OTA Cartel from the price-dropping power of direct wholesale.\n\n' +
  '3. Direct & Closed-Loop Wholesale is Private Equity:\n' +
  '   By cutting out the middleman, you allow the property to maintain higher profit margins, which they reinvest into your stay via value-added perks and direct wholesale net pricing.',
  50,
  98,
  { width: 495, lineGap: 2.2 }
);

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'CONCLUSION: THE FUTURE OF PRIVATE FINANCIAL TRAVEL ARBITRAGE\n\n' +
  'The travel industry is currently bifurcating:\n' +
  '• On one side sits the "Retail Markup Past"—a system defined by public commoditization and the extraction of a voluntary advertising tax.\n' +
  '• On the other is the "Wholesale Sovereign Future"—where travel is managed as a private financial asset class.\n\n' +
  'Through the utilization of closed-loop B2B networks and autonomous AI logistics, travelers can now exploit information asymmetry to generate significant travel alpha.\n\n' +
  'In a post-parity world, the only way to win is to move outside the garden.\n\n' +
  'Access the ATLAS Closed-Loop Travel Treasury at http://localhost:3005\n' +
  'Published by ATLAS VIP Platform Inc. • Global Research Department',
  38,
  215,
  { width: 519, lineGap: 3.5 }
);

addFooter(6);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('The ATLAS Rate Parity Case Study PDF successfully generated at: ' + outputPath1);
});
