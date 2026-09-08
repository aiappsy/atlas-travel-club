const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'ATLAS_Institutional_Investor_Prospectus.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\ATLAS_Institutional_Investor_Prospectus.pdf';

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
  doc.fillColor(primary).fontSize(13).font('Helvetica-Bold').text(title.toUpperCase(), 38, 38);
  doc.rect(38, 54, 519, 1).fill('#E2E8F0');
}

function addFooter(pageNum, totalPages = 5) {
  doc.rect(38, 775, 519, 22).fill('#0F172A');
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS VIP PLATFORM INC. • CONFIDENTIAL INVESTOR PROSPECTUS & ADA', 48, 782);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(`Page ${pageNum} of ${totalPages}`, 505, 782);
}

// ==========================================
// PAGE 1: COVER & EXECUTIVE THESIS
// ==========================================
doc.rect(38, 38, 519, 95).fill(primary);
doc.fillColor('#FFFFFF').fontSize(17).font('Helvetica-Bold').text('CONFIDENTIAL INSTITUTIONAL INVESTOR PROSPECTUS', 52, 50);
doc.fillColor(gold).fontSize(10.5).font('Helvetica-Bold').text('Capturing the $1.2 Trillion OTA Cartel Markup Inefficiency Through Closed-Loop Wholesale Arbitrage', 52, 72);
doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('ATLAS VIP PLATFORM INC. • $3.5M SEED ROUND • $18.5M PRE-MONEY VALUATION CAP', 52, 92);
doc.fillColor('#38BDF8').fontSize(8).font('Helvetica-Bold').text('Includes Institutional ADA (Audited Data Appendix & Anti-Dilution Addendum)', 52, 108);

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  '1. THE CORE INVESTMENT THESIS:\n' +
  'The global online travel agency (OTA) market is dominated by Booking Holdings (Market Cap: ~$140B) and Expedia Group (Market Cap: ~$22B). Together, they extract an 18% to 45% commission on every public hotel booking. To sustain this monopoly, they spend over $12.5 Billion annually on Google Search ad bidding and TV sponsorships.\n\n' +
  'ATLAS captures this arbitrage. Under global antitrust laws (including EU DMA & French Loi Macron), private closed-loop membership clubs are 100% EXEMPT from Rate Parity contracts. ATLAS delivers raw B2B Bedbank wholesale clearing rates (Hotelbeds/HBX Group, WebBeds) directly to members at 0% markup, monetizing purely via high-margin recurring subscriptions ($199–$499/yr) and sovereign FinTech cardholder interchange.',
  38,
  148,
  { width: 519, lineGap: 2.8 }
);

doc.rect(38, 260, 519, 105).fill(bgLight);
doc.rect(38, 260, 4, 105).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('2. MARKET SIZING (TAM / SAM / SOM)', 50, 272);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Total Addressable Market (TAM): $1.11 Trillion (Global Online Travel by 2030, Grand View Research, 10.8% CAGR).\n' +
  '• Serviceable Addressable Market (SAM): $142 Billion (Premium, Luxury, and Nomad frequent travel in US, EU, GCC, APAC).\n' +
  '• Serviceable Obtainable Market (SOM): $850 Million (Capturing 85,000 active high-volume members within 36 months).\n' +
  '• Wholesale Supply Engine: B2B Bedbanks (Hotelbeds, WebBeds, Travco) clear $75B+ annually in non-public distressed inventory at 20%–50% discounts.',
  50,
  288,
  { width: 495, lineGap: 2.5 }
);

addFooter(1, 5);

// ==========================================
// PAGE 2: EMPIRICAL RESEARCH & COMPS
// ==========================================
doc.addPage();
addHeader('3. Empirical Market Comps & Subscription Proof');

const comps = [
  {
    name: 'eDreams ODIGEO (Prime) — 6.2M Paid Members',
    detail: 'Proved the travel subscription thesis. Scaled from 500k to 6.2M paying subscribers in under 4 years. Generates 65%+ of company gross profit with 80%+ renewal retention.'
  },
  {
    name: 'Costco Travel — $3.5B+ Travel GMV',
    detail: 'World\'s largest closed-loop wholesale buying club. Generates multi-billions in travel bookings with 92% member retention, proving that consumers demand raw wholesale pricing over public retail.'
  },
  {
    name: 'FoundersCard — 100,000+ Executive Members',
    detail: 'B2B VIP lifestyle club ($595/yr) proving high willingness-to-pay for rate parity overrides and corporate hospitality perks among entrepreneurs and road warriors.'
  },
  {
    name: 'HBX Group / Hotelbeds — $75B+ Bedbank Infrastructure',
    detail: 'Validates that billions in raw wholesale room nights are traded at 20%–50% discounts daily outside public OTA channels.'
  }
];

let compY = 68;
comps.forEach((c) => {
  doc.rect(38, compY, 519, 58).fill(bgLight);
  doc.rect(38, compY, 4, 58).fill(sky);
  doc.fillColor(primary).fontSize(8.5).font('Helvetica-Bold').text(c.name, 50, compY + 7);
  doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(c.detail, 50, compY + 22, { width: 495, lineGap: 2.2 });
  compY += 66;
});

// Section 4: Proprietary Live Rate Audit Moat
doc.rect(38, 335, 519, 135).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('4. PROPRIETARY MOAT: THE LIVE RATE AUDIT & DEEP-LINK PROOF ENGINE', 50, 348);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'To permanently eliminate consumer skepticism, ATLAS features a live Multi-OTA Rate Audit Engine directly on its landing page:\n\n' +
  '1. Live Multi-OTA Benchmark: Automatically queries real-time pricing across Expedia, Hotels.com, Agoda, and Kayak.\n' +
  '2. 1-Click Third-Party Verification: Provides direct outbound deep-links to Google Hotels, Expedia, and Agoda with prefilled dates so visitors verify public rates independently.\n' +
  '3. Pruvo Price-Drop Sentinel: 24/7 background AI sentinel that automatically re-books rooms post-reservation when wholesale drops occur, refunding the difference directly to the member.',
  50,
  365,
  { width: 495, lineGap: 2.4 }
);

addFooter(2, 5);

// ==========================================
// PAGE 3: UNIT ECONOMICS & 3-YEAR MODEL
// ==========================================
doc.addPage();
addHeader('5. Unit Economics & 36-Month P&L Financial Projections');

doc.rect(38, 68, 519, 85).fill(bgLight);
doc.rect(38, 68, 4, 85).fill(emerald);
doc.fillColor(primary).fontSize(9).font('Helvetica-Bold').text('UNIT ECONOMICS SUMMARY', 50, 78);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• Blended CAC: $65.00  |  • Average Initial Order Value (AOV): $349.00\n' +
  '• Contribution Margin: +$284.00 (Immediate 100% Day-1 Payback)  |  • Retention Rate: 88%–91%\n' +
  '• Average Lifetime: 3.8 Years  |  • Customer Lifetime Value (LTV): $1,180.00  |  • LTV / CAC: 18.1x',
  50,
  95,
  { width: 495, lineGap: 2.5 }
);

// Projections Table Box
doc.rect(38, 165, 519, 290).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('3-YEAR FINANCIAL PROJECTIONS (2026–2029)', 50, 178);

const tableLines = [
  'METRIC                                  YEAR 1 (2026-27)     YEAR 2 (2027-28)     YEAR 3 (2028-29)',
  '─────────────────────────────────────────────────────────────────────────────',
  'Active Paid Members                         5,000                25,000               85,000',
  'Gross Merchandise Value (GMV)         $22,500,000          $145,000,000         $620,000,000',
  'Annual Member Retention Rate                   -                   88%                  91%',
  '',
  'REVENUE STREAMS',
  '1. Membership Subscriptions (ARR)       $1,550,000           $7,950,000          $27,850,000',
  '2. FinTech FX / Multi-Currency Card       $120,000           $1,250,000           $5,100,000',
  '3. Ancillary B2B Clearing & VIP Fee        $85,000             $620,000           $2,450,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'TOTAL NET REVENUE                       $1,755,000           $9,820,000          $35,400,000',
  '',
  'OPERATING EXPENSES (OPEX)',
  '• Bedbank API & Clearing Gateways         $140,000             $420,000           $1,200,000',
  '• Growth & Paid User Acquisition          $325,000           $1,365,000           $4,290,000',
  '• Engineering & Infrastructure            $180,000             $450,000           $1,100,000',
  '• VIP Concierge & Support                 $150,000             $550,000           $1,850,000',
  '• Regulatory, Legal & FinTech Compliance  $110,000             $280,000             $650,000',
  '• General & Administrative (G&A)          $120,000             $320,000             $800,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'TOTAL OPERATING EXPENSES                $1,025,000           $3,385,000           $9,890,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'EBITDA / OPERATING PROFIT                 $730,000           $6,435,000          $25,510,000',
  'EBITDA MARGIN                                41.6%                65.5%                72.1%'
];

let tabY = 196;
tableLines.forEach((line) => {
  if (line.startsWith('METRIC') || line.startsWith('TOTAL') || line.startsWith('EBITDA')) {
    doc.fillColor(gold).fontSize(7.2).font('Courier-Bold').text(line, 48, tabY);
  } else if (line.startsWith('──')) {
    doc.fillColor('#64748B').fontSize(7.2).font('Courier').text(line, 48, tabY);
  } else if (line.startsWith('REVENUE') || line.startsWith('OPERATING')) {
    doc.fillColor(emerald).fontSize(7.2).font('Courier-Bold').text(line, 48, tabY);
  } else {
    doc.fillColor('#FFFFFF').fontSize(7.2).font('Courier').text(line, 48, tabY);
  }
  tabY += 10.5;
});

addFooter(3, 5);

// ==========================================
// PAGE 4: OFFERING TERMS & USE OF PROCEEDS
// ==========================================
doc.addPage();
addHeader('6. Seed Round Terms & Capital Allocation ($3.5M)');

doc.rect(38, 68, 519, 130).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('OFFERING SUMMARY', 50, 80);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica').text(
  '• Issuer: ATLAS VIP Platform Inc. (Delaware C-Corp)\n' +
  '• Offering Amount: $3,500,000 USD\n' +
  '• Security Type: Post-Money SAFE with Institutional Anti-Dilution Addendum (ADA)\n' +
  '• Pre-Money Valuation Cap: $18,500,000 USD\n' +
  '• Discount Rate: 20.0%\n' +
  '• Target Close: Q4 2026\n' +
  '• Minimum Investment: $50,000 USD (Institutional & Accredited Angels)',
  50,
  98,
  { width: 495, lineGap: 2.8 }
);

doc.rect(38, 210, 519, 140).fill(bgLight);
doc.rect(38, 210, 4, 140).fill(sky);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('USE OF PROCEEDS ($3,500,000)', 50, 222);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '1. Paid User Acquisition & Growth Marketing ($1,400,000 / 40%):\n' +
  '   Scaling split-screen comparative video campaigns on Meta/TikTok and ranking 500 programmatic SEO city hubs.\n\n' +
  '2. Engineering & B2B Bedbank Integrations ($1,050,000 / 30%):\n' +
  '   Direct XML pipeline connections to Hotelbeds, WebBeds, and multi-currency banking card issuance.\n\n' +
  '3. Working Capital & Multi-Currency Treasury Float ($525,000 / 15%):\n' +
  '   Regulatory liquidity reserve for cross-border card transactions and sovereign treasury.\n\n' +
  '4. Legal, Compliance & IP Protection ($350,000 / 10%):\n' +
  '   Global rate parity closed-loop exemption certifications and FinTech banking licenses.\n\n' +
  '5. G&A Operations ($175,000 / 5%): 18-month runway operational buffer.',
  50,
  238,
  { width: 495, lineGap: 2.2 }
);

addFooter(4, 5);

// ==========================================
// PAGE 5: THE ADA (ANTI-DILUTION ADDENDUM)
// ==========================================
doc.addPage();
addHeader('7. Institutional ADA: Audited Data & Anti-Dilution Addendum');

doc.rect(38, 68, 519, 210).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('CONFIDENTIAL ADA TERMS & PROTECTIONS', 50, 80);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'The Investor executing this Agreement shall receive full structural anti-dilution rights:\n\n' +
  '1. Broad-Based Weighted Average & Full-Ratchet Anti-Dilution:\n' +
  '   If the Company issues equity securities in any subsequent round at a price per share lower than the Valuation Cap implied price, the conversion price of this SAFE shall adjust downward automatically to eliminate economic or percentage dilution.\n\n' +
  '2. Pro-Rata Super-Preemptive Rights:\n' +
  '   The Investor retains the irrevocable right to participate in all future equity rounds (Series A, Series B, Pre-IPO) up to their full pro-rata share, plus a 25% super-allocation allotment.\n\n' +
  '3. Most Favored Nation (MFN) Protection:\n' +
  '   If the Company issues any subsequent SAFE, convertible note, or warrant with more favorable terms (lower valuation cap, higher discount, or superior governance), such terms shall immediately apply to this Agreement.\n\n' +
  '4. Information & Board Observer Rights:\n' +
  '   Investors contributing $500,000+ receive quarterly audited GAAP financials, annual operating budgets, and one designated Board Observer seat.',
  50,
  98,
  { width: 495, lineGap: 2.5 }
);

// Signature Block Box
doc.rect(38, 290, 519, 130).fill('#FEF3C7');
doc.rect(38, 290, 4, 130).fill(gold);
doc.fillColor('#92400E').fontSize(9).font('Helvetica-Bold').text('EXECUTION & ALLOCATION ACCEPTANCE', 50, 302);
doc.fillColor('#78350F').fontSize(8).font('Helvetica').text(
  'INVESTOR ENTITY / NAME: _________________________________________________________________\n\n' +
  'COMMITTED CAPITAL ALLOCATION: $________________________________________________________\n\n' +
  'AUTHORIZED INVESTOR SIGNATURE: _____________________________ DATE: ______________________\n\n' +
  'FOR ATLAS VIP PLATFORM INC.: ________________________________ DATE: ______________________',
  50,
  320,
  { width: 495, lineGap: 3.5 }
);

addFooter(5, 5);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('ATLAS Institutional Investor Prospectus & ADA PDF successfully generated at: ' + outputPath1);
});
