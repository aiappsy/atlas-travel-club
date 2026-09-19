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

  createHeader(doc, '10-Slide Investor Presentation', 'The Private Travel Clearinghouse — Institutional Pitch Deck');
  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 1: The Executive Thesis', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Company: ATLAS Travel Club LLC (Manager-Managed LLC — Delaware / Wyoming)\n' +
    '• Core Thesis: Disintermediating the $1.4T Booking Duopoly via a Private Institutional Clearinghouse.\n' +
    '• Model: Gated closed-loop clearinghouse connecting affluent travelers directly to Tier-1 B2B wholesale liquidity pools with 0% retail markup.\n' +
    '• Monetization: 96% gross margin subscription ARR ($399–$1,799/yr) + high-ticket payment interchange (1.85%).\n' +
    '• Presenter: Pål Juritzen, Founder & Managing Member.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 2: The Problem — The $350B Duopoly Tollbooth', 38, 210);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• The Cartel: Booking Holdings & Expedia Group control >70% of global OTA volume, extracting an extortionate 18%–30% take-rate.\n' +
    '• The Threat: Draconian "Rate Parity" clauses legally forbid hotels from discounting publicly under threat of algorithmic de-listing.\n' +
    '• The Hoteliers\' Crisis: 5-star hotels suffer 32% average vacancy. Unsold rooms expire worthless at midnight, but hotels cannot discount publicly without destroying their brand equity.',
    38, 225, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 3: The Asymmetric Solution & Regulatory Moat', 38, 295);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• The Antitrust Safe Harbor: Under US Sherman Antitrust Act (15 U.S.C. § 1) and the EU Digital Markets Act (Regulation EU 2022/1925), rate parity rules do NOT apply to password-gated, closed-loop private buyer syndicates.\n' +
    '• Direct B2B Wholesale Plumbing: Sourcing directly from Tier-1 global bedbanks (Hotelbeds, WebBeds, Travco) at net clearing rates.\n' +
    '• Zero Markup Architecture: We pass 100% of wholesale net savings to verified members at 0% markup. Hoteliers quietly offload premium inventory without public rate degradation.',
    38, 310, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 4: High-Yield Customer Profile & Natural Demand', 38, 380);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '1. Affluent Families & Vacationers (45%): $10k–$35k/yr spend; save $1,600+ on a single 5-night stay (pays for membership on Day 1).\n' +
    '2. Executives & SMB Founders (30%): $20k–$80k/yr spend; enterprise wholesale rates without corporate travel desk friction.\n' +
    '3. Remote Tech Executives & Nomads (15%): $15k–$40k/yr spend; extended multi-week stays, global 5G eSIM connectivity.\n' +
    '4. Ultra-High-Net-Worth VIPs (10%): $50k–$150k+/yr spend; 5-star penthouse suites, superyachts, empty-leg jet charters.',
    38, 395, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 5: Production Platform & Zero-Deposit Architecture', 38, 465);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• 100% Serverless Google Cloud: Cloud Run container compute with Cloud SQL PostgreSQL v16; under $450/month fixed tech overhead.\n' +
    '• Rate-Parity Shield: Client-side bot defense and Cloud Armor edge enforcement block scrapers and verify member sessions.\n' +
    '• Zero Balance Sheet Liability: Synchronous real-time card authorization means member payment settles the wholesale bedbank. $0 locked in hotel deposits or inventory risk.',
    38, 480, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 1, 2);

  doc.addPage();
  createHeader(doc, '10-Slide Investor Presentation (Cont.)', 'The 4-Engine Monetization Machine & Capital Plan');

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 6: The 4-Engine Monetization Machine', 38, 125);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '1. High-LTV SaaS Subscriptions (96% Gross Margin): Nomad ($399/yr), Family ($799/yr), Sovereign VIP ($1,799/yr). Blended $684/yr.\n' +
    '2. High-Ticket Card Interchange: 1.85% net captured on card volume ($18.5k avg travel spend = $342/user/yr pure yield).\n' +
    '3. Autonomous Price-Drop Arbitrage (30% Performance Fee): Re-shopping bot rebooks lower wholesale drops, splitting savings 70/30.\n' +
    '4. Institutional FX Spread: 45 bps on cross-border transactions (saving members from 3.0%+ bank foreign transaction gouging).\n' +
    '• Blended ARPU: $1,026/yr • Blended CAC: $110 • Payback: Day 1 (First Booking) • LTV/CAC: 38.4x • Retention: 91%.',
    38, 140, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 7: Roadmap to $1M+ ARR (Phases 1–4)', 38, 220);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Phase 1 (Live & Tested): Web platform, parity enforcement shield, rate audit engine, legal compliance suite on Google Cloud.\n' +
    '• Phase 2 (Months 1–3): Direct RateHawk B2B and Duffel NDC flight feeds, Stripe Issuing card rails integration.\n' +
    '• Phase 3 (Months 4–6): Autonomous 24/7 price-drop rebooking daemon, automated Airalo global 5G eSIM provisioning.\n' +
    '• Phase 4 (Months 7–12): High-touch Vertex AI Concierge via WhatsApp/Telegram, private jet empty-leg clearinghouse.',
    38, 235, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 8: Go-To-Market: The Viral "Savings Audit" Engine', 38, 305);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• The Live Savings Audit: Prospects upload any Expedia or Booking.com itinerary; tool proves live $400–$1,500 cash savings instantly behind the member gate.\n' +
    '• Direct Syndicate Distribution: Strategic partnerships with boutique wealth advisors, executive founder groups, and private family offices.\n' +
    '• Irresistible Value Proposition: 100% Money-Back Guarantee if members do not save more than their annual fee on their very first stay.',
    38, 320, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 9: Trust & Capital Preservation — Why Your Money Is Protected', 38, 385);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Zero Inventory Liabilities: Negative working capital cycle means $0 in locked hotel deposits or villa leases. Principal cannot be burned on empty rooms.\n' +
    '• Founder Frugality & Alignment: Founder Pål Juritzen draws a capped $2,500/mo stipend over 10 months. Investor SAFE holds liquidation seniority.\n' +
    '• Working Production Stack: Live Next.js platform on Google Cloud Run with Vertex AI Gemini 2.0 and B2B bedbank schemas operating today.\n' +
    '• Governance & Tax Advantage: Monthly KPI updates, Delaware/Wyoming LLC registration, and Section 1202 QSBS ($10M tax-free gains) on C-Corp conversion.',
    38, 400, { width: 519, lineGap: 2 }
  );

  doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('SLIDE 10: What\'s In It For You — Asymmetric Returns, Cash Yield & VIP Perks', 38, 465);
  doc.fillColor(slate).fontSize(8.5).font('Helvetica').text(
    '• Deal Terms: $75,000 USD via YC Post-Money SAFE (Min Check: $5,000 | Cap: $1,750,000 USD | ~4.3% equity at cap).\n' +
    '• Return Multiples ($5k Min / $25k Check): (1) Seed Markup ($15M-$20M): $43k-$57k on $5k ($214k-$286k on $25k); (2) Mid-Market M&A ($60M Yr 3): $171k cash on $5k ($857k on $25k); (3) Scale Buyout ($175M Yr 4-5): $500k cash on $5k ($2.50M on $25k); (4) Cash Yield: ~$37.5k/yr on $5k check.\n' +
    '• Immediate Lifestyle ROI: Lifetime Sovereign VIP Membership ($1,799/yr waived forever) + Global 5G eSIMs + Direct Founder WhatsApp Concierge.',
    38, 480, { width: 519, lineGap: 2 }
  );

  createFooter(doc, 2, 2);
  doc.end();
}

// 2. PROSPECTUS
function generateProspectus() {
  const doc = new PDFDocument({ margin: 38, size: 'A4', bufferPages: true });
  const out = fs.createWriteStream(path.join(targetDir, 'ATLAS_Confidential_Prospectus.pdf'));
  doc.pipe(out);

  createHeader(doc, 'Confidential Offering Prospectus', 'Private Placement Memorandum (Institutional FinTech Edition)');
  
  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('1. EXECUTIVE SUMMARY & ASYMMETRIC THESIS', 38, 125);
  doc.fillColor(slate).fontSize(8).font('Helvetica').text(
    'ATLAS Travel Club LLC ("ATLAS" or the "Company") is an asset-light, closed-loop private travel clearinghouse and financial technology platform organized as a Manager-Managed Limited Liability Company under the laws of Delaware and Wyoming. The Company is built specifically for affluent vacationers, digital executives, and high-frequency business travelers. By operating as a password-protected, authenticated private membership network, ATLAS operates under established statutory exemptions under the US Sherman Antitrust Act (15 U.S.C. § 1) and the European Union Digital Markets Act (Regulation EU 2022/1925 / EC Case AT.40153). These legal precedents establish that public Online Travel Agency (OTA) "Rate Parity" restrictions do NOT apply to closed buyer syndicates.\n\n' +
    'ATLAS procures institutional room allotments directly from global B2B bedbanks (Hotelbeds, WebBeds, Travco) and airline New Distribution Capability (NDC) feeds at raw wholesale net clearing costs, passing 100% of the discount directly to subscribers at 0% retail markup. The Company monetizes through four high-margin recurring engines: high-margin annual software subscriptions (96% gross margin), merchant card interchange (1.85% on luxury travel volume), autonomous price-drop arbitrage performance fees (30% share of savings), and institutional FX spreads (45 bps). Securities offered in this round are YC Post-Money SAFEs for LLCs at a $1,750,000 valuation cap, with corporate conversion optionality into a Delaware C-Corporation for institutional venture rounds.',
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
    ['Ending Active Members', '1,000', '5,500', '22,000', '65,000', '140,000'],
    ['Gross Travel Booked (GMV)', '$18.5M', '$101.8M', '$407.0M', '$1,202.5M', '$2,590.0M'],
    ['Subscription Net ARR (96% GM)', '$0.68M', '$3.76M', '$15.05M', '$44.46M', '$95.76M'],
    ['Fintech Card Interchange (1.85%)', '$0.34M', '$1.88M', '$7.53M', '$22.25M', '$47.92M'],
    ['TOTAL NET REVENUE', '$1.03M', '$5.64M', '$22.58M', '$66.71M', '$143.68M'],
    ['COGS (APIs, Serverless, SIMs)', '($0.06M)', '($0.32M)', '($1.25M)', '($3.45M)', '($7.20M)'],
    ['Operating Expenses (Opex)', '($0.52M)', '($2.50M)', '($8.20M)', '($18.50M)', '($34.50M)'],
    ['NET PROFIT (EBITDA)', '+$0.45M', '+$2.82M', '+$13.13M', '+$44.76M', '+$101.98M'],
    ['EBITDA Margin %', '43.7%', '50.0%', '58.2%', '67.1%', '71.0%']
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

  doc.fillColor(dark).fontSize(9.5).font('Helvetica-Bold').text('3. USE OF PROCEEDS ($75,000 BUDGET ALLOCATION)', 38, 430);
  doc.fillColor(slate).fontSize(7.8).font('Helvetica').text(
    'ATLAS operates on modern, asset-light API protocols (RateHawk B2B, Duffel NDC, Stripe Issuing) that settle bookings synchronously via real-time card authorization at the moment of reservation. This architecture requires $0 in locked supplier deposits or legacy airline IATA bonds. Unlike legacy travel agencies that lock up $50k–$100k in non-productive bank guarantees and hotel room blocks, ATLAS operates a pure software model with zero inventory liability.\n\n' +
    '• Founder Executive Stipend: $25,000 (33.3%) — $2,500/mo over 10 months for full-time founder operational leadership.\n' +
    '• Contract Engineering & Tech Ops: $18,000 (24.0%) — Direct API pipelines for live RateHawk & Duffel on Google Cloud Run.\n' +
    '• Member Acquisition & Growth: $16,500 (22.0%) — Targeted executive syndicate outreach, "Savings Audit" marketing, and creator seeds.\n' +
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
    '• MINIMUM INVESTMENT: $5,000 USD (Checks of $25,000 preferred)\n' +
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
    '• Subscription Steps: (1) Execute Mutual NDA; (2) Review PPM & Financials; (3) Confirm allocation via executive@atlastravelclub.com; (4) Sign YC SAFE via DocuSign; (5) Wire funds within 10 business days.',
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
    'All platform workloads are containerized and deployed to Google Cloud Run (us-central1) with fully managed concurrency (80 concurrent requests/instance, min 1, max 50 instances). Ingress is protected by Cloud Load Balancing and Google Cloud Armor edge bot mitigation, enforcing the Rate Parity Compliance Shield by blocking scrapers and applying X-Robots-Tag: noindex at the CDN layer.',
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
    'A: No. Rate Parity clauses apply exclusively to publicly accessible internet distribution (Google search, Trivago, public listings). Under the US Sherman Antitrust Act (15 U.S.C. § 1) and European Competition Law (EU Digital Markets Act / French Loi Macron), closed-loop buyer syndicates and password-protected membership clubs are strictly exempt. Furthermore, B2B Bedbanks (Hotelbeds, WebBeds) exist specifically to trade this wholesale inventory to closed groups.',
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
    ['Base Case (M&A)', 'Year 3', '22,000', '$22.6M', '$13.1M', '$79.1M (3.5x Rev) ~45x'],
    ['Growth Case (Fintech)', 'Year 4', '65,000', '$66.7M', '$44.8M', '$537.6M (12x EBITDA) ~307x'],
    ['Conservative PE Recap', 'Year 5', '140,000', '$143.7M', '$102.0M', '$816.0M (8x EBITDA) ~466x']
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
