const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'docs', 'investors');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const primary = '#0B2545';
const gold = '#D97706';
const dark = '#0F172A';
const slate = '#334155';
const lightBg = '#F8FAFC';

function createHeader(doc, title, subtitle) {
  doc.rect(38, 38, 519, 75).fill(primary);
  doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica-Bold').text(title.toUpperCase(), 50, 48);
  doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text(subtitle, 50, 68);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text('ATLAS TRAVEL CLUB LLC • CONFIDENTIAL • PRE-SEED ROUND ($75K / $1.75M CAP)', 50, 85);
}

function createFooter(doc, pageNum, totalPages) {
  doc.rect(38, 775, 519, 20).fill(primary);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS TRAVEL CLUB LLC — CONFIDENTIAL — SUBJECT TO MUTUAL NDA', 48, 781);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text('Page ' + pageNum + ' of ' + totalPages, 505, 781);
}

// 1. PITCH DECK
function generatePitchDeck() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Investor_Pitch_Deck.pdf'));
  doc.pipe(out);

  createHeader(doc, '10-Slide Investor Presentation', 'ATLAS Travel Club LLC — Pitch Deck (Revised Edition)');
  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 1: Cover & Elevator Pitch', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Headline: ATLAS Travel Club — The Digital Costco for Travel.\n' +
    '• Sub-headline: Private membership club passing 100% of wholesale travel savings to members at 0% markup.\n' +
    '• Presenter: Pål Juritzen, Founder & Managing Member.\n' +
    '• Visual: Side-by-side comparison of 0% markup rates vs public Expedia/Booking.com benchmarks.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 2: The Problem — The $350B OTA Cartel Tax', 38, 205);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Booking Holdings & Expedia extract 15%–30% commissions on every public room reservation.\n' +
    '• Contractual Rate Parity forces hotels to maintain inflated retail prices on open channels.\n' +
    '• High-frequency leisure families, SMBs, and luxury travelers overpay thousands annually.',
    38, 220, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 3: The Solution & Regulatory Arbitrage', 38, 285);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Closed-Loop Exemption: Under US Sherman Antitrust & EU Loi Macron (AT.40153), rate parity does NOT apply to closed-loop, password-protected membership clubs.\n' +
    '• Direct B2B Wholesale: Sourcing from Hotelbeds, RateHawk, WebBeds, and Duffel NDC at net clearing rates.\n' +
    '• Zero Markup: 100% net savings passed to subscribers; monetized purely via SaaS + interchange.',
    38, 300, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 4: The Four High-Value Target Segments', 38, 370);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '1. Affluent Families & Vacationers (45%): $8k–$25k/yr spend; save $1,500+ per 7-night vacation.\n' +
    '2. SMB Owners & Business Travelers (30%): $15k–$60k/yr spend; enterprise rates without corporate bureaucracy.\n' +
    '3. Luxury & Experiential Travelers (15%): $30k–$100k+/yr spend; 5-star suites, private villas, yacht charters.\n' +
    '4. Borderless Remote Professionals (10%): $10k–$30k/yr spend; extended stays, global 5G eSIMs, visas.',
    38, 385, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 5: The Product — Phase 1 Built on Google Cloud', 38, 465);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Production web application built on Next.js, deployed on Google Cloud Run with Cloud SQL.\n' +
    '• Proprietary Rate-Parity Shield (AuthModal + Google Cloud Armor edge bot mitigation).\n' +
    '• AI Travel Concierge powered by Google Cloud Vertex AI (Gemini) with Function Calling.',
    38, 480, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 1, 2);

  doc.addPage();
  createHeader(doc, '10-Slide Investor Presentation (Cont.)', 'Business Model, Projections & Capital Plan');

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 6: Business Model & Attractive Unit Economics', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• SaaS Memberships: Club ($349/yr), Family ($699/yr), VIP/Business ($1,499/yr).\n' +
    '• Secondary Revenue: 1.2% debit interchange yield on reloadable co-branded Visa cards.\n' +
    '• Unit Economics: $850 Blended ARPU, $115 CAC, 94% Gross Margin, 1.6-month payback, 38.6x LTV:CAC.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 7: Traction & Roadmap (Phases 1–4)', 38, 205);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Phase 1 (Completed): Fully responsive front-end, compliance shield, rate comparison engine on Google Cloud Run.\n' +
    '• Phase 2 (Months 1–3): Live RateHawk B2B and Duffel NDC flight feeds, Stripe Issuing.\n' +
    '• Phase 3 (Months 4–6): 24/7 price-drop rebooking daemon, automated Airalo 5G eSIM provisioning.\n' +
    '• Phase 4 (Months 7–12): High-touch WhatsApp/Telegram AI Concierge, empty-leg private jet charter desk.',
    38, 220, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 8: Go-To-Market & The "Savings Audit" Flywheel', 38, 285);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Live Savings Audit Tool: Upload an Expedia confirmation; tool shows live $400–$1,200 savings behind member gate.\n' +
    '• B2B Distribution: Executive syndicate partnerships with boutique wealth managers & SMB networks.\n' +
    '• Zero-Risk Value Guarantee: 100% money-back guarantee if members do not save more than their annual fee on trip #1.',
    38, 300, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 9: Competitive Landscape & Moat', 38, 365);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• vs OTAs (Expedia/Booking): 20%–30% lower prices on all identical room inventories.\n' +
    '• vs Legacy Clubs (Inspirato): Accessible $349–$1,499/yr, zero inventory leases, $0 in supplier deposits.\n' +
    '• The Moat: Closed-loop supplier compliance, autonomous price-drop rebooking, 100% Google Cloud native stack.',
    38, 380, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 10: The Ask & Lean $75,000 Budget', 38, 445);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Instrument: $75,000 USD via YC Post-Money SAFE for LLCs (Manager-Managed LLC — DE/WY).\n' +
    '• Valuation Cap: $1,750,000 USD (20% discount, ~4.3% ownership at cap).\n' +
    '• Capital Allocation (Over 57% in human execution):\n' +
    '  - Founder Executive Stipend: $25,000 (33.3%) • $2,500/mo x 10 months for full-time commitment\n' +
    '  - Contract Engineering & Tech Ops: $18,000 (24.0%) • 6 dev sprints for RateHawk & Duffel\n' +
    '  - Member Acquisition & Distribution: $16,500 (22.0%) • Executive outreach & creator seeds\n' +
    '  - Legal, SoT Licensing & Entity: $6,500 (8.7%) • Delaware/Wyoming LLC & SoT compliance\n' +
    '  - Google Cloud & Vertex AI Tokens: $3,500 (4.7%) • 12 mos Cloud Run, Cloud SQL, Gemini 2.0\n' +
    '  - Contingency Buffer: $3,500 (4.7%) • Minimal Operating Float: $2,000 (2.7%)\n' +
    '• Milestone: Complete live API integrations and reach 1,000 paid members ($850,000 net ARR) in 9–12 months.',
    38, 460, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 2, 2);
  doc.end();
}

// 2. PROSPECTUS
function generateProspectus() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Confidential_Prospectus.pdf'));
  doc.pipe(out);

  createHeader(doc, 'Confidential Investor Prospectus', 'Private Placement Memorandum (Budget Restructure & LLC Edition)');
  
  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('1. EXECUTIVE SUMMARY & LEGAL BASIS', 38, 125);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'ATLAS Travel Club LLC ("ATLAS" or the "Company") is an asset-light, closed-loop travel collective and financial technology platform organized as a Manager-Managed Limited Liability Company under the laws of Delaware and Wyoming. The Company is designed for high-spend leisure travelers, affluent families, and SMB business travelers. By operating as an authenticated, password-protected membership club, ATLAS exercises well-established antitrust exemptions under the US Sherman Antitrust Act (15 U.S.C. § 1) and EU Competition Law (French Loi Macron / EC Case AT.40153). These legal precedents establish that public Online Travel Agency (OTA) "Rate Parity" agreements do not apply to closed-loop buyer syndicates.\n\n' +
    'ATLAS procures institutional room allotments directly from global B2B bedbanks (Hotelbeds, RateHawk, WebBeds) and airline New Distribution Capability (NDC) feeds at wholesale clearing costs, passing 100% of the wholesale discount directly to subscribers at 0% markup. The Company monetizes purely via high-margin recurring annual subscriptions and secondary debit interchange. Securities offered in this round are YC Post-Money SAFE for LLCs, convertible into Preferred Membership Units at the $1,750,000 valuation cap, or — at the election of the Manager — into Preferred Stock if the Company converts to a Delaware C-Corporation prior to an institutional Series Seed financing.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('2. 5-YEAR PRO-FORMA FINANCIAL MODEL (USD MILLIONS)', 38, 255);
  
  doc.rect(38, 270, 519, 18).fill(dark);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold');
  doc.text('LINE ITEM', 45, 275);
  doc.text('YEAR 1', 180, 275);
  doc.text('YEAR 2', 250, 275);
  doc.text('YEAR 3', 320, 275);
  doc.text('YEAR 4', 390, 275);
  doc.text('YEAR 5', 460, 275);

  const rows = [
    ['Ending Active Members', '1,000', '6,000', '25,000', '60,000', '120,000'],
    ['Gross Travel Booked (GMV)', '$13.8M', '$83.1M', '$346.2M', '$831.0M', '$1,662M'],
    ['Subscription Net ARR', '$0.68M', '$4.10M', '$17.10M', '$41.04M', '$82.08M'],
    ['Fintech Card Interchange', '$0.17M', '$1.00M', '$4.16M', '$9.97M', '$19.94M'],
    ['TOTAL NET REVENUE', '$0.85M', '$5.10M', '$21.26M', '$51.01M', '$102.02M'],
    ['COGS (Software, APIs, SIMs)', '($0.05M)', '($0.29M)', '($1.15M)', '($2.55M)', '($5.10M)'],
    ['Operating Expenses (Opex)', '($0.45M)', '($2.10M)', '($6.96M)', '($14.45M)', '($26.50M)'],
    ['NET PROFIT (EBITDA)', '+$0.35M', '+$2.76M', '+$13.15M', '+$34.01M', '+$70.42M'],
    ['EBITDA Margin %', '41.2%', '54.1%', '61.9%', '66.7%', '69.0%']
  ];

  let currentY = 288;
  rows.forEach((r, idx) => {
    doc.rect(38, currentY, 519, 14).fill(idx % 2 === 0 ? lightBg : '#FFFFFF');
    doc.fillColor(r[0].includes('TOTAL') || r[0].includes('NET PROFIT') ? gold : slate)
       .fontSize(7).font(r[0].includes('TOTAL') || r[0].includes('NET PROFIT') ? 'Helvetica-Bold' : 'Helvetica');
    doc.text(r[0], 45, currentY + 3);
    doc.text(r[1], 180, currentY + 3);
    doc.text(r[2], 250, currentY + 3);
    doc.text(r[3], 320, currentY + 3);
    doc.text(r[4], 390, currentY + 3);
    doc.text(r[5], 460, currentY + 3);
    currentY += 14;
  });

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('3. USE OF PROCEEDS ($75,000 BUDGET RESTRUCTURE)', 38, 430);
  doc.fillColor(slate).fontSize(7.8).font('Helvetica').text(
    'ATLAS operates on modern, asset-light API protocols (RateHawk B2B, Duffel NDC, Stripe Issuing) that settle bookings synchronously via real-time card authorization at the moment of reservation. This architecture requires $0 in locked supplier deposits or legacy airline IATA bonds. Unlike legacy travel agencies that lock up $50k–$100k in non-productive bank guarantees and hotel room blocks, ATLAS operates a pure software model with zero inventory liability.\n\n' +
    '• Founder Executive Stipend: $25,000 (33.3%) — $2,500/mo over 10 months for full-time founder operational leadership.\n' +
    '• Contract Engineering & Tech Ops: $18,000 (24.0%) — 6 milestone dev sprints for live RateHawk & Duffel on Google Cloud Run.\n' +
    '• Member Acquisition & Distribution: $16,500 (22.0%) — Targeted executive flyer outreach, "Savings Audit" marketing, and creator seeds.\n' +
    '• Legal, SoT Licensing & Entity Setup: $6,500 (8.7%) — Delaware/Wyoming LLC formalization and Seller of Travel (FL/CA) compliance.\n' +
    '• Google Cloud & Vertex AI Tokens: $3,500 (4.7%) — 12 months Google Cloud Run, Cloud SQL, Cloud Armor, and Gemini 2.0 API calls.\n' +
    '• Contingency Operating Buffer: $3,500 (4.7%) — Cash reserve guaranteeing 10–12 months of operational runway.\n' +
    '• Minimal Revolving Operating Float: $2,000 (2.7%) — Working float for instant card generation ($1,200) and eSIM inventory ($800).\n' +
    '• TOTAL: $75,000 (100.0%) — Fully funded to 1,000 active members and cash-flow profitability.',
    38, 445, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 1, 1);
  doc.end();
}

// 3. SAFE TERM SHEET
function generateSafeTermSheet() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_SAFE_Term_Sheet_LLC.pdf'));
  doc.pipe(out);

  createHeader(doc, 'YC Post-Money SAFE Term Sheet Summary', 'LLC Edition • $75,000 USD • $1.75M Valuation Cap');

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('1. CORE DEAL TERMS', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• ISSUER: ATLAS Travel Club LLC (Manager-Managed LLC — Delaware / Wyoming)\n' +
    '• SECURITIES: Y Combinator Post-Money SAFE (LLC Edition)\n' +
    '• TARGET FINANCING: $75,000 USD (Minimum: $50,000 | Maximum: $100,000)\n' +
    '• VALUATION CAP: $1,750,000 USD\n' +
    '• DISCOUNT RATE: 20%\n' +
    '• MINIMUM INVESTMENT: $10,000 USD (Checks of $25,000 preferred)\n' +
    '• IMPLIED OWNERSHIP: ~4.3% equity interest at the $1.75M valuation cap upon conversion.',
    38, 140, { width: 519, lineGap: 3 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('2. CONVERSION & CORPORATE FLEXIBILITY', 38, 235);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '1. Qualifying Equity Financing: Automatically converts into Preferred Membership Units upon the closing of an institutional round raising not less than $1,000,000.\n\n' +
    '2. Corporate Conversion Option: At the election of the Manager, the Company may convert into a Delaware C-Corporation immediately prior to a qualified financing round to accommodate institutional venture funds, preserving all investor rights, valuation caps, and Section 1202 QSBS eligibility ($10M tax-free capital gains). The SAFE converts into Preferred Stock on identical terms.\n\n' +
    '3. Liquidity Event / M&A: In the event of a change of control or IPO, the investor receives the greater of: (i) the purchase amount returned in cash, or (ii) the fair market value of the Preferred Units calculated at the $1.75M Valuation Cap.',
    38, 250, { width: 519, lineGap: 3 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('3. INFORMATION RIGHTS & TAX TREATMENT', 38, 355);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Information Rights: Quarterly financial updates and monthly KPI newsletters sent to all participating angel investors.\n' +
    '• Tax Treatment: Schedule K-1 pass-through during LLC phase; converts to standard 1099 dividend reporting upon corporate election.\n' +
    '• Subscription Steps: (1) Execute Mutual NDA; (2) Review PPM & Financials; (3) Confirm allocation via executive@atlas-travel-club.com; (4) Sign YC SAFE via DocuSign; (5) Wire funds within 10 business days.',
    38, 370, { width: 519, lineGap: 3 }
  );

  createFooter(doc, 1, 1);
  doc.end();
}

// 4. TECH MANUAL
function generateTechManual() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Technical_Architecture_Google_Cloud.pdf'));
  doc.pipe(out);

  createHeader(doc, 'Technical Architecture Manual', '100% Google Cloud Ecosystem • Cloud Run • Vertex AI • Cloud SQL');

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('1. GOOGLE CLOUD RUN COMPUTE & AUTOSCALING', 38, 125);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'All platform workloads are containerized using Bun and deployed to Google Cloud Run (us-central1) with fully managed concurrency (80 concurrent requests/instance, min 1, max 50 instances). Ingress is protected by Cloud Load Balancing and Google Cloud Armor edge bot mitigation, enforcing the Rate Parity Compliance Shield by blocking scrapers and applying X-Robots-Tag: noindex at the CDN layer.',
    38, 140, { width: 519, lineGap: 2.5 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('2. DATABASE & CLOUD SQL AUTH PROXY', 38, 205);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'The primary database is Google Cloud SQL for PostgreSQL (v16) configured with regional persistent disks and automated 7-day point-in-time recovery. Access is strictly private IP via Cloud SQL Auth Proxy using short-lived IAM-derived OAuth tokens rather than static database passwords, ensuring zero public IP exposure.',
    38, 220, { width: 519, lineGap: 2.5 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('3. ARTIFICIAL INTELLIGENCE VIA VERTEX AI (GEMINI)', 38, 285);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'All AI inference is routed natively through Google Cloud Vertex AI using Gemini 1.5 Pro (deep itinerary reasoning, multi-supplier rate aggregation) and Gemini 2.0 Flash (instant conversational turns). The AI Concierge utilizes Vertex AI Function Calling to query RateHawk, Hotelbeds, and Duffel APIs in real-time, keeping live wholesale queries server-side behind authenticated sessions.',
    38, 300, { width: 519, lineGap: 2.5 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('4. SECRETS & ENVIRONMENT INTEGRATIONS', 38, 365);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'All credentials (HOTELBEDS_API_KEY, RATEHAWK_KEY_ID, DUFFEL_ACCESS_TOKEN, STRIPE_SECRET_KEY, AIRALO_CLIENT_SECRET) are stored in Google Secret Manager and mounted directly into the Cloud Run container environment at runtime. Secrets are never checked into version control, never logged, and rotated seamlessly via Secret Manager versioning.',
    38, 380, { width: 519, lineGap: 2.5 }
  );

  createFooter(doc, 1, 1);
  doc.end();
}

// 5. DUE DILIGENCE FAQ
function generateDueDiligenceFaq() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Due_Diligence_FAQ.pdf'));
  doc.pipe(out);

  createHeader(doc, 'Investor Due Diligence FAQ', 'Legal Antitrust, Security & Operational Risk Brief (Revised Edition)');

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('Q1: Can Booking.com or Expedia legally shut this down?', 38, 125);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'A: No. Rate Parity clauses apply exclusively to publicly accessible internet distribution (Google search, Trivago, public listings). Under the US Sherman Antitrust Act (15 U.S.C. § 1) and European Competition Law (French Loi Macron / EC AT.40153), closed-loop buyer syndicates and password-protected membership clubs are strictly exempt. Furthermore, B2B Bedbanks (Hotelbeds, RateHawk) exist specifically to trade this wholesale inventory to closed groups.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('Q2: What prevents members from sharing their accounts?', 38, 205);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'A: Three layered security controls: (1) Device fingerprinting and session limits prevent concurrent logins; (2) Passport & legal name verification requires room check-in names to match the primary account holder or verified family roster; (3) Personalized savings, price-drop credits, and Visa card balances create an economic disincentive to share credentials.',
    38, 220, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('Q3: Why is your pre-seed capital requirement so lean ($75,000)?', 38, 285);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'A: Unlike legacy travel agencies that lock up $50k–$100k in non-productive bank guarantees and hotel room blocks, ATLAS operates an asset-light software model with zero inventory liability. Modern APIs (RateHawk, Duffel, Stripe Issuing) settle bookings synchronously via real-time card authorization, requiring $0 in locked supplier deposits. Over 57% of proceeds are invested directly into human execution—a modest $2,500/mo founder stipend and specialized engineering—to ship Phase 2 on Google Cloud and reach self-sustaining cash flow.',
    38, 300, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('Q4: What happens if a hotel does not honor a wholesale voucher?', 38, 380);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'A: All bookings are pushed directly into the hotel CRS with instant confirmation codes via tier-1 bedbanks. The front desk sees a standard pre-paid corporate reservation identical to an Amex Fine Hotels & Resorts booking. Non-honoring risk is structurally identical to any major OTA and is backed by the bedbank rebooking guarantee.',
    38, 395, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 1, 1);
  doc.end();
}

// 6. STRATEGIC EXIT OPPORTUNITIES
function generateExitStrategy() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Strategic_Exit_Opportunities.pdf'));
  doc.pipe(out);

  createHeader(doc, 'Strategic Exit Opportunities', 'M&A Acquirer Landscape & Path to Liquidity (3 to 6 Year Horizon)');

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('1. STRATEGIC ACQUIRER CATEGORIES & PRECEDENTS', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Category 1: Major Financial Institutions (Amex, Capital One, Chase).\n' +
    '  Precedent: Capital One acquired Velocity Black for $297 Million (2023) to power its premium card lifestyle perks; JPMorgan Chase acquired Frosch Travel and The Infatuation. Acquiring ATLAS gives card issuers a proprietary 0% wholesale booking engine driving high interchange volume.\n\n' +
    '• Category 2: Public OTAs & Metasearches (Booking Holdings, Expedia, Trip.com).\n' +
    '  OTAs spend billions annually bidding for one-off transactional users on Google Search. Acquiring ATLAS provides a sticky, high-margin SaaS subscription recurring revenue stream retaining the top 10% of frequent travelers.\n\n' +
    '• Category 3: Mobility & Super-Apps (Revolut, Hopper, Uber).\n' +
    '  Fintech apps with millions of cardholders can instantly transform into high-yield travel subscription clubs without negotiating separate bedbank supply agreements.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('2. VALUATION MULTIPLES AT EXIT ($75,000 SAFE CONVERSION)', 38, 275);
  
  doc.rect(38, 290, 519, 18).fill(dark);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold');
  doc.text('SCENARIO', 45, 295);
  doc.text('YEAR', 150, 295);
  doc.text('PAID USERS', 200, 295);
  doc.text('NET REVENUE', 270, 295);
  doc.text('EBITDA', 350, 295);
  doc.text('TARGET VALUATION', 420, 295);

  const exitRows = [
    ['Base Case (M&A)', 'Year 3', '25,000', '$21.2M', '$13.1M', '$74.2M (3.5x Rev) ~42x'],
    ['Growth Case (Fintech)', 'Year 4', '60,000', '$51.0M', '$31.5M', '$378.0M (12x EBITDA) ~215x'],
    ['Conservative PE Recap', 'Year 5', '100,000', '$85.0M', '$52.0M', '$416.0M (8x EBITDA) ~237x']
  ];

  let currentY = 308;
  exitRows.forEach((r, idx) => {
    doc.rect(38, currentY, 519, 16).fill(idx % 2 === 0 ? lightBg : '#FFFFFF');
    doc.fillColor(idx === 1 ? gold : slate).fontSize(7).font('Helvetica-Bold');
    doc.text(r[0], 45, currentY + 4);
    doc.text(r[1], 150, currentY + 4);
    doc.text(r[2], 200, currentY + 4);
    doc.text(r[3], 270, currentY + 4);
    doc.text(r[4], 350, currentY + 4);
    doc.text(r[5], 420, currentY + 4);
    currentY += 16;
  });

  createFooter(doc, 1, 1);
  doc.end();
}

console.log('Generating investor PDFs in public/docs/investors/ ...');
generatePitchDeck();
generateProspectus();
generateSafeTermSheet();
generateTechManual();
generateDueDiligenceFaq();
generateExitStrategy();
console.log('All investor PDFs successfully generated!');
