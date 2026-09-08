const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'ATLAS_Master_Marketing_Plan_and_Projections.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\ATLAS_Master_Marketing_Plan_and_Projections.pdf';

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

function addFooter(pageNum, totalPages = 4) {
  doc.rect(38, 775, 519, 22).fill('#0F172A');
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS STRATEGIC GROWTH • MASTER MARKETING PLAN & 3-YEAR PROJECTIONS', 48, 782);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(`Page ${pageNum} of ${totalPages}`, 505, 782);
}

// ==========================================
// PAGE 1: TITLE & EXECUTIVE GROWTH ENGINE
// ==========================================
doc.rect(38, 38, 519, 85).fill(primary);
doc.fillColor('#FFFFFF').fontSize(18).font('Helvetica-Bold').text('MASTER MARKETING & GROWTH PLAN (2026–2029)', 52, 52);
doc.fillColor(gold).fontSize(11).font('Helvetica-Bold').text('Go-To-Market Strategy, Acquisition Funnels & 36-Month Financial Projections', 52, 74);
doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('ATLAS: The Private Wholesale Travel & Sovereign Banking Club • Strategic Roadbook', 52, 94);

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  '1. EXECUTIVE SUMMARY & VALUE PROPOSITION ENGINE:\n' +
  'ATLAS operates in an exceptionally high-margin, high-retention commercial niche: Closed-Loop B2B Wholesale Travel Arbitrage combined with Private FinTech Cardholder Banking.\n\n' +
  'THE CORE MARKETING HOOK: MATHEMATICAL ARBITRAGE OVER EMOTIONAL PROMISES\n' +
  'Traditional subscription apps sell features; ATLAS sells mathematical certainty. Because dominant Online Travel Agencies (Expedia, Booking.com, Hotels.com) enforce an 18%–45% retail marketing markup under "Rate Parity," any traveler staying 4+ nights per year pays a significant voluntary tax. ATLAS unlocks raw clearing rates with zero markup.',
  38,
  135,
  { width: 519, lineGap: 2.8 }
);

doc.rect(38, 235, 519, 105).fill(bgLight);
doc.rect(38, 235, 4, 105).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('2. TARGET AUDIENCE & ICP SEGMENTATION', 50, 245);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  '• High-Frequency Digital Nomads & Remote Execs: (28–45 yrs) 30–90 nights/yr across global hubs. Driven by seamless hotel procurement, zero FX forex markup, and multi-currency banking card.\n' +
  '• Luxury Leisure Travelers & Families: (35–60 yrs) Annual luxury vacations ($5K–$20K spend). Desire 5-star properties (Bellagio, Ritz, Four Seasons) at 4-star retail prices without resort fee traps.\n' +
  '• FinTech & Web3 Sovereign HNWI: Cross-border founders requiring private, un-tracked closed-loop bookings and metal card sovereign treasury.\n' +
  '• Corporate & SMB Road Warriors: Boutique agencies and distributed startups slashing corporate travel budgets by $15K–$50K annually.',
  50,
  260,
  { width: 495, lineGap: 2.5 }
);

doc.rect(38, 355, 519, 130).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('3. MEMBERSHIP TIERS & PRICING ARCHITECTURE', 50, 367);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'VOYAGER TIER — $199 / year:\n' +
  '• 0% Markup Wholesale Bedbank Access across 1M+ Global Stays\n' +
  '• Instant 1-Click Multi-OTA Rate Verification • Multi-Currency Digital Card\n\n' +
  'SOVEREIGN FOUNDER — $499 / year:\n' +
  '• Wholesale Luxury Hotels, Private Villas, Yacht Charters & Empty-Leg Jet Alerts\n' +
  '• Sovereign Heavy Metal FinTech Debit Card • VIP Lounge Access & Priority Concierge\n\n' +
  'BLACK CARD LIFETIME PASS — $1,999 One-Time (Limited to 2,500 Founders):\n' +
  '• Lifetime 0% Markup Travel Privileges • 24/7 Dedicated Private Concierge Desk\n' +
  '• Off-Market Villa Allocations • 5 Annual "Gift-a-Night" Wholesale Guest Passes',
  50,
  383,
  { width: 495, lineGap: 2.2 }
);

addFooter(1, 4);

// ==========================================
// PAGE 2: ACQUISITION CHANNELS & FUNNELS
// ==========================================
doc.addPage();
addHeader('4. Omnichannel Growth & Customer Acquisition (CAC Engine)');

const channels = [
  {
    title: 'CHANNEL 1: Live Rate Checker & 1-Click Verification Proof (Top of Funnel)',
    desc: 'The interactive search engine allows visitors to input any destination (Las Vegas, Paris, Dubai, Oslo) and directly click out to Expedia, Hotels.com, Agoda, and Google Hotels in real time. Proving the exact savings in dollars before paywall converts visitors at a high rate (12%–18% lead capture).'
  },
  {
    title: 'CHANNEL 2: Split-Screen Comparative Paid Ads (Meta, YouTube, TikTok)',
    desc: 'Video ads demonstrating side-by-side checkout: Left screen shows Booking.com at $450/nt; right screen shows ATLAS B2B member portal at $270/nt for the exact same suite. Target blended CAC is under $65 across high-intent travel audiences.'
  },
  {
    title: 'CHANNEL 3: Programmatic Destination Arbitrage SEO (500 Global City Hubs)',
    desc: 'Programmatically generated landing pages (e.g. /rates/paris, /rates/las-vegas) capturing organic search queries for hotel discounts, secret codes, and corporate rate loopholes.'
  },
  {
    title: 'CHANNEL 4: Built-in Viral Referral Loop ("Gift a Wholesale Night")',
    desc: 'Every member receives 3 complimentary Guest Passes per year. When their referral saves $200+ on a single stay, the referral converts to annual membership, and the inviter receives $100 in booking credits or cash dividend.'
  }
];

let chY = 68;
channels.forEach((c) => {
  doc.rect(38, chY, 519, 62).fill(bgLight);
  doc.rect(38, chY, 4, 62).fill(sky);
  doc.fillColor(primary).fontSize(8.5).font('Helvetica-Bold').text(c.title, 50, chY + 7);
  doc.fillColor(dark).fontSize(7.5).font('Helvetica').text(c.desc, 50, chY + 22, { width: 495, lineGap: 2.2 });
  chY += 70;
});

doc.rect(38, 360, 519, 130).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('5. UNIT ECONOMICS & COHORT METRICS', 50, 372);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica').text(
  '• Blended CAC (Customer Acquisition Cost):        $65.00  (Driven by organic tools & viral passes)\n' +
  '• Average Initial Order Value (AOV):              $349.00 (Blended Voyager $199 + Founder $499)\n' +
  '• Payback Period on Paid CAC:                    Immediate (< 24 Hours on membership purchase)\n' +
  '• Annual Member Churn Rate:                      12%     (High retention due to single-trip ROI)\n' +
  '• Average Customer Lifetime:                     3.8 Years\n' +
  '• Lifetime Value (LTV):                          $1,180.00\n' +
  '• LTV / CAC Ratio:                               18.1x   (Exceptional institutional capital efficiency)',
  50,
  390,
  { width: 495, lineGap: 2.6 }
);

addFooter(2, 4);

// ==========================================
// PAGE 3: 3-YEAR FINANCIAL PROJECTIONS (P&L)
// ==========================================
doc.addPage();
addHeader('6. 3-Year Financial Model & Revenue Projections (2026–2029)');

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'The financial model demonstrates the leverage of a zero-inventory software + membership model. ATLAS does not carry hotel room liabilities; it captures recurring subscription cash flows and transaction fee spreads.',
  38,
  68,
  { width: 519, lineGap: 2.5 }
);

// Projections Table Box
doc.rect(38, 105, 519, 290).fill(primary);
doc.fillColor(gold).fontSize(10).font('Helvetica-Bold').text('36-MONTH P&L PROJECTION SUMMARY', 50, 118);

const tableLines = [
  'METRIC                                  YEAR 1 (2026-27)     YEAR 2 (2027-28)     YEAR 3 (2028-29)',
  '─────────────────────────────────────────────────────────────────────────────',
  'Active Paid Members                         5,000                25,000               85,000',
  'New Member Additions                        5,000                21,000               66,000',
  'Annual Member Retention Rate                   -                   88%                  91%',
  '',
  'REVENUE STREAMS',
  '1. Membership Subscriptions (ARR)       $1,550,000           $7,950,000          $27,850,000',
  '2. FinTech FX / Multi-Currency Card       $120,000           $1,250,000           $5,100,000',
  '3. Ancillary B2B Clearing & Concierge      $85,000             $620,000           $2,450,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'TOTAL GROSS REVENUE                     $1,755,000           $9,820,000          $35,400,000',
  '',
  'OPERATING EXPENSES (OPEX)',
  '• Bedbank API & Clearing Gateways         $140,000             $420,000           $1,200,000',
  '• User Acquisition & Paid Marketing       $325,000           $1,365,000           $4,290,000',
  '• Engineering, Infrastructure & Cloud     $180,000             $450,000           $1,100,000',
  '• Concierge & Member Support Desk         $150,000             $550,000           $1,850,000',
  '• Regulatory, Legal & FinTech Compliance  $110,000             $280,000             $650,000',
  '• General & Administrative (G&A)          $120,000             $320,000             $800,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'TOTAL OPERATING EXPENSES                $1,025,000           $3,385,000           $9,890,000',
  '─────────────────────────────────────────────────────────────────────────────',
  'EBITDA / NET PROFIT                       $730,000           $6,435,000          $25,510,000',
  'NET PROFIT MARGIN                           41.6%                65.5%                72.1%'
];

let tabY = 138;
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

addFooter(3, 4);

// ==========================================
// PAGE 4: 90-DAY EXECUTION ROADMAP
// ==========================================
doc.addPage();
addHeader('7. 90-Day Tactical Execution Roadmap & Key Milestones');

const roadmap = [
  {
    phase: 'MONTH 1 (Days 1–30): Foundation & Alpha Seeding',
    actions: [
      '• Deploy Live Multi-OTA Verification Tool on homepage & rate-checker route with Google Hotels deep-linking.',
      '• Finalize Stripe closed-loop billing gates and multi-tier membership onboarding.',
      '• Seed 250 Alpha Members (digital nomad influencers, remote founders, luxury travel creators).'
    ]
  },
  {
    phase: 'MONTH 2 (Days 31–60): Paid Proof Scaling & Viral Referral Activation',
    actions: [
      '• Launch split-screen comparative video ad creatives on Meta & TikTok with target CAC under $70.',
      '• Activate 3x "Gift a Wholesale Night" viral guest passes inside the member dashboard.',
      '• Distribute Academic Rate Parity Whitepaper to travel press and consumer finance media.'
    ]
  },
  {
    phase: 'MONTH 3 (Days 61–90): Programmatic SEO & FinTech Banking Card',
    actions: [
      '• Roll out 500 programmatic city rate comparison hubs to capture organic search traffic.',
      '• Issue first batch of Sovereign Metal Debit Cards to Founder & Black Card tier members.',
      '• Launch B2B Corporate Perks program for distributed remote companies.'
    ]
  }
];

let rmY = 68;
roadmap.forEach((r) => {
  doc.rect(38, rmY, 519, 85).fill(bgLight);
  doc.rect(38, rmY, 4, 85).fill(emerald);
  doc.fillColor(primary).fontSize(8.8).font('Helvetica-Bold').text(r.phase, 50, rmY + 8);
  let actY = rmY + 24;
  r.actions.forEach((a) => {
    doc.fillColor(dark).fontSize(7.6).font('Helvetica').text(a, 50, actY, { width: 495 });
    actY += 18;
  });
  rmY += 95;
});

doc.rect(38, 380, 519, 85).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('CONCLUSION & INVESTOR SUMMARY', 50, 392);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'ATLAS bridges the multi-billion dollar gap between wholesale bedbank supply and retail consumer demand. By treating travel procurement as an asset class and verifying real-time savings directly against Expedia, Hotels.com, and Agoda, ATLAS creates an unassailable high-margin subscription moat with strong unit economics (18.1x LTV/CAC).',
  50,
  408,
  { width: 495, lineGap: 2.5 }
);

addFooter(4, 4);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('ATLAS Master Marketing Plan PDF successfully generated at: ' + outputPath1);
});
