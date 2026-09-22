const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'ATLAS_Sales_Letter.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\ATLAS_Sales_Letter.pdf';

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

function addFooter(pageNum, totalPages = 5) {
  doc.rect(38, 775, 519, 22).fill('#0F172A');
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text('ATLAS VIP PLATFORM • THE OFFICIAL MASTER SALES LETTER & CASHBACK MANIFESTO', 48, 782);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(`Page ${pageNum} of ${totalPages}`, 505, 782);
}

// ==========================================
// PAGE 1: THE DIRTY SECRET & CLOSED-LOOP
// ==========================================
doc.rect(38, 38, 519, 75).fill(primary);
doc.fillColor('#FFFFFF').fontSize(20).font('Helvetica-Bold').text('THE ATLAS MASTER SALES LETTER', 52, 52);
doc.fillColor(gold).fontSize(10.5).font('Helvetica-Bold').text('The Insider\'s Guide to Never Paying Retail & Earning Real Cash Back on Every Trip', 52, 76);
doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('Confidential Direct-Response Manifesto • Private Member Circulation Only', 52, 92);

doc.fillColor(dark).fontSize(8.5).font('Helvetica').text(
  'FROM: The ATLAS Private Travel Treasury\n' +
  'FOR: Smart Travelers, Nomads, Executives & Families Who Refuse to Pay Retail Markups\n' +
  'SUBJECT: Why Paying Retail Is Obsolete — And How ATLAS Deposits Real Cash Into Your Account\n\n' +
  'Dear Fellow Traveler,\n\n' +
  'If you have ever booked a hotel room on Expedia, Booking.com, or Hotels.com, there is an uncomfortable truth you need to hear:\n\n' +
  'YOU WERE QUIETLY OVERCHARGED BY 20% TO 50%.\n\n' +
  'Not because the hotel is greedy. Not because you booked late. And certainly not because you received a better room. You were overcharged because public travel websites spend over $10 Billion every year on Google search ads and television commercials. To pay for those ads, they add an artificial $100 to $300 markup to every night you stay.',
  38,
  125,
  { width: 519, lineGap: 2.8 }
);

doc.moveDown(0.8);
doc.rect(38, doc.y, 519, 70).fill(bgLight);
doc.rect(38, doc.y, 4, 70).fill(gold);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('THE CLOSED-LOOP BREAKTHROUGH', 50, doc.y + 8);
doc.fillColor(dark).fontSize(7.8).font('Helvetica').text(
  'Hotels quietly dump millions of unbooked rooms into confidential B2B clearinghouses ("Bedbanks") at raw wholesale cost. Under international antitrust law, private closed-loop membership clubs are 100% EXEMPT from Rate Parity restrictions.\n\n' +
  'ATLAS passes the raw B2B Bedbank wholesale feed directly to private members at 0% retail markup.',
  50,
  doc.y + 23,
  { width: 495, lineGap: 2.5 }
);

doc.moveDown(1.5);
doc.rect(38, doc.y + 10, 519, 85).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('RETAIL OTA VS. ATLAS PRIVATE WHOLESALE', 50, doc.y + 20);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  '• Public Retail Booking: Base Cost ($198) + Marketing & TV Ad Markup ($191) = $389 / Night\n' +
  '  ❌ Overpay by $573 on a 3-night stay with zero cash return or price-drop protection.\n\n' +
  '• ATLAS Closed-Loop Wholesale: Raw B2B Net Rate ($198) + 0% Markup = $198 / Night\n' +
  '  ✅ Save $573 instantly on the exact same 5-star room + earn card dividends & cashback.',
  50,
  doc.y + 36,
  { width: 495, lineGap: 2.5 }
);

addFooter(1);

// ==========================================
// PAGE 2: THE 4-LAYER CASHBACK SUPER-ENGINE
// ==========================================
doc.addPage();
addHeader('The 4-Layer Cashback Super-Engine: Real Cash vs. Expiring Points');

doc.fillColor(dark).fontSize(8.2).font('Helvetica').text(
  'Traditional credit cards and booking sites bait you with "points" and "miles" that require 100,000 points for a one-way economy seat, suffer from blackout dates, and are devalued by 20%–30% by airlines every year.\n\n' +
  'ATLAS has replaced expiring points with 100% REAL, LIQUID, SPENDABLE CASH deposited directly to your card:',
  38,
  68,
  { width: 519, lineGap: 2.5 }
);

// 4 Layers
const cashLayers = [
  {
    num: 'LAYER 1',
    title: 'Instant Upfront Wholesale Cash Savings (30% to 70% Off)',
    desc: 'You don\'t wait months to redeem points. The wholesale spread is liquid money that stays in your bank account immediately at checkout (e.g. Save $573 on The Bellagio Las Vegas, $1,480 on The Plaza NYC).'
  },
  {
    num: 'LAYER 2',
    title: 'Autonomous Post-Booking Price-Drop Cashback (+$70 to +$240)',
    desc: 'While you sleep, our 24/7 background sentinel continuously scans 50+ wholesale feeds. When rates drop before check-in, the system automatically re-books and deposits the cash difference straight onto your Visa card.'
  },
  {
    num: 'LAYER 3',
    title: 'Up to 5% Unlimited Real-Cash Card Cashback',
    desc: 'Every swipe on your ATLAS Titanium Visa® Card (dining, rental cars, theme parks, shopping) earns up to 5% instant real cash, automatically credited to your card with 0% Foreign Transaction (FX) fees worldwide.'
  },
  {
    num: 'LAYER 4',
    title: 'The Travel Vault Annual Profit Dividend (Paid December 31)',
    desc: 'The club pools its surplus non-operating supplier overrides and distributes them pro-rata as an annual cash dividend check deposited directly into your card balance on New Year\'s Eve.'
  }
];

let clY = 135;
cashLayers.forEach((cl) => {
  doc.rect(38, clY, 519, 62).fill(bgLight);
  doc.rect(38, clY, 4, 62).fill(emerald);
  doc.fillColor(emerald).fontSize(7.5).font('Helvetica-Bold').text(cl.num, 50, clY + 7);
  doc.fillColor(primary).fontSize(8.8).font('Helvetica-Bold').text(cl.title, 95, clY + 7);
  doc.fillColor(dark).fontSize(7.6).font('Helvetica').text(cl.desc, 50, clY + 23, { width: 495, lineGap: 2.2 });
  clY += 69;
});

addFooter(2);

// ==========================================
// PAGE 3: 10 UNFAIR ADVANTAGES
// ==========================================
doc.addPage();
addHeader('The 10 Unfair Advantages of ATLAS VIP Membership');

const advantages = [
  {
    title: '1. 1,000,000+ Wholesale Hotels & 5★ Resorts (30% to 70% Off)',
    desc: 'Access direct B2B Bedbank net rates worldwide. Bellagio Las Vegas: Public $1,167 vs Wholesale $594 (Save $573). The Plaza NYC: Public $2,960 vs Wholesale $1,480 (Save $1,480). Ritz Paris: Public $4,950 vs Wholesale $2,700 (Save $2,250).'
  },
  {
    title: '2. Curated Luxury Villas & Alpine Chalets with Private French Chefs Included',
    desc: 'In St. Barts, Courchevel, and Aspen, step into private beachfront estates with on-site French gourmet chefs, dedicated butlers, and airport chauffeurs at 45% below public villa brokers (Save $18,200/wk).'
  },
  {
    title: '3. Private Jet Empty Legs from $690/Seat (Up to 80% Off)',
    desc: 'When private aircraft reposition between flights, ATLAS members book whole aircraft or individual seats on Bombardier Challenger 300s and Citation Xs for less than commercial business class.'
  },
  {
    title: '4. Automated $650 Direct Cash Delay Payouts (AirHelp Court Enforcement)',
    desc: 'Under statutory EU261/UK261 rules, airline delays of 3+ hours trigger automated court filings via the AirHelp registry, recovering up to $650 direct cash per passenger deposited straight onto your card.'
  },
  {
    title: '5. Digital Nomad Sovereignty: 15+ Nomad Visas & Schengen 90-Day Sentinel',
    desc: '1-click intake for Spain (24% tax), Portugal D8, Dubai (0% tax), and Bali E33G. Automated rolling-window Schengen tracker prevents illegal overstay with instant visa run routing to London & Cyprus.'
  },
  {
    title: '6. VIP Airport Fast-Track Customs ($85) & $32 Lounge Access',
    desc: 'Skip 2-hour customs queues in 3 minutes via diplomatic jet-bridge escorts and tarmac buggies at LHR, JFK, and MIA ($85 flat). Access Skyview Oasis Lounges with hot buffets and shower suites for $32.'
  }
];

let aY = 68;
advantages.forEach((a) => {
  doc.rect(38, aY, 519, 48).fill(bgLight);
  doc.rect(38, aY, 3, 48).fill(gold);
  doc.fillColor(primary).fontSize(8.5).font('Helvetica-Bold').text(a.title, 48, aY + 6);
  doc.fillColor(dark).fontSize(7.4).font('Helvetica').text(a.desc, 48, aY + 19, { width: 495, lineGap: 2 });
  aY += 54;
});

addFooter(3);

// ==========================================
// PAGE 4: THE MATHEMATICAL ROI & TIER SELECTION
// ==========================================
doc.addPage();
addHeader('The Cold, Hard Math: Why Saying No Is Irrational');

doc.rect(38, 68, 519, 125).fill(primary);
doc.fillColor(gold).fontSize(9.5).font('Helvetica-Bold').text('THE MATHEMATICAL ROI FORMULA (CASH SAVED VS. INVESTMENT)', 50, 80);
doc.fillColor('#FFFFFF').fontSize(7.8).font('Helvetica').text(
  'SCENARIO A: YOU TAKE JUST 1 SINGLE WEEKEND TRIP THIS YEAR\n' +
  '• 2 Nights at The Grand Bellagio (Las Vegas) or Grand Hyatt NYC\n' +
  '• Public Retail Price: $778.00 | ATLAS Wholesale Net: $396.00 ➔ Save: +$382.00\n' +
  '• Less Annual Gold VIP Membership: -$179.00\n' +
  '➔ NET CASH PROFIT ON TRIP #1: +$203.00 ON DAY 1 (213% Immediate ROI)\n\n' +
  'SCENARIO B: YOU TAKE 3 TRIPS PER YEAR (AVERAGE MEMBER)\n' +
  '• Wholesale Hotel Savings (12 nights total): +$1,980.00\n' +
  '• Pruvo Price-Drop Cash Refund: +$185.00 | 5% Card Cashback: +$190.00\n' +
  '• AirHelp Flight Delay Payout: +$650.00 | Travel Vault Annual Dividend: +$145.00\n' +
  '➔ NET ANNUAL CASH GAIN: +$2,971.00 (1,759% Return on Investment)',
  50,
  98,
  { width: 495, lineGap: 2.2 }
);

// Tier Box
doc.rect(38, 205, 519, 185).fill(bgLight);
doc.fillColor(primary).fontSize(9.5).font('Helvetica-Bold').text('CHOOSE YOUR TRAVEL SOVEREIGNTY TIER', 50, 218);

const salesTiers = [
  { name: 'Silver Club ($89/yr | $9.99/mo)', desc: '400,000+ wholesale hotels (up to 35% off), 2x Travel Vault multiplier, 2% card cashback, fleet car discounts.' },
  { name: 'Global Nomad ($279/yr | $29.99/mo)', desc: 'Free 10GB monthly eSIM, SafetyWing medical insurance, 1-on-1 Visa concierge, 1Gbps monthly coliving, 3% cashback.' },
  { name: 'Gold VIP ($179/yr | $19.99/mo) [POPULAR]', desc: '1M+ hotels, Luxury Villas, Hilton Diamond status match, $85 Fast-Track, Pruvo Price Drops, 4% Card Cashback, ATLAS Visa.' },
  { name: 'Platinum Elite ($349/yr | $39.99/mo)', desc: 'Guaranteed lowest rate + 10%, 8x Vault multiplier, 5% Card Cashback, Heavy Titanium Card, Private Jets, 6 Family Passes.' },
];

let stY = 238;
salesTiers.forEach((st) => {
  doc.fillColor(primary).fontSize(8.2).font('Helvetica-Bold').text(`• ${st.name}: `, 50, stY);
  doc.fillColor(dark).fontSize(7.4).font('Helvetica').text(st.desc, 50, stY + 11, { width: 495 });
  stY += 32;
});

// Guarantee
doc.rect(38, 402, 519, 65).fill('#FEF3C7');
doc.fillColor('#92400E').fontSize(8.8).font('Helvetica-Bold').text('🛡️ THE 100% LOWEST PRICE & RATE PARITY GUARANTEE', 50, 412);
doc.fillColor('#78350F').fontSize(7.4).font('Helvetica').text(
  'If you ever find a lower publicly available retail rate on Expedia or Booking.com for the exact same room and dates, we will instantly match the rate, refund the difference, and give you an additional 10% discount on Platinum Elite. You risk absolutely nothing.',
  50,
  427,
  { width: 495, lineGap: 2 }
);

addFooter(4);

// ==========================================
// PAGE 5: THE INVITATION & SIGN-OFF
// ==========================================
doc.addPage();
addHeader('The Choice Is Yours: Join the Sovereign Insiders');

doc.fillColor(dark).fontSize(8.8).font('Helvetica').text(
  'You can continue doing what 99% of tourists do: paying a 25% advertising tax to legacy booking corporations and watching thousands of dollars vanish every single year.\n\n' +
  'Or you can join the insiders.\n\n' +
  'Unlock confidential B2B Bedbank rates, earn up to 5% unlimited card cashback, receive automatic price-drop refunds while you sleep, and travel with the sovereign freedom you deserve.\n\n' +
  'Activate your ATLAS VIP Membership today at http://localhost:3005/membership\n\n' +
  'Welcome to the inner circle.\n\n' +
  'Warmest regards,\n\n' +
  'The ATLAS Travel Treasury & Sovereign Collective\n' +
  'ATLAS VIP Platform Inc.\n\n' +
  '----------------------------------------------------------------------------------------------------\n' +
  'P.S. Remember: Taking just 1 single trip this year pays for your entire membership on Day 1. Every trip after that is pure, unadulterated cash in your pocket. Don\'t leave $2,900 on the table this year.\n\n' +
  '👉 Join ATLAS Today: http://localhost:3005/membership',
  38,
  75,
  { width: 519, lineGap: 3.5 }
);

addFooter(5);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('The Cashback-Focused ATLAS Sales Letter PDF successfully generated at: ' + outputPath1);
});
