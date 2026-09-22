const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath1 = path.join(publicDir, 'HotelsClub_Owner_Master_Setup_Guide.pdf');
const outputPath2 = 'C:\\Users\\paul\\.gemini\\antigravity\\brain\\758bc5ae-6be8-4bb5-959d-08c5895aa455\\HotelsClub_Owner_Master_Setup_Guide.pdf';

const doc = new PDFDocument({ margin: 40, size: 'A4' });

// Pipe to public and artifacts
const stream1 = fs.createWriteStream(outputPath1);
doc.pipe(stream1);

// Styling helpers
const primaryColor = '#0F172A'; // Slate 900
const accentSky = '#0284C7';    // Sky 600
const accentGold = '#D97706';   // Amber 600
const darkText = '#1E293B';     // Slate 800
const mutedText = '#64748B';    // Slate 500

// Title Banner
doc.rect(40, 40, 515, 75).fill(primaryColor);
doc.fillColor('#FFFFFF').fontSize(20).font('Helvetica-Bold').text('ATLAS VIP PLATFORM', 55, 55);
doc.fillColor(accentGold).fontSize(11).font('Helvetica-Bold').text('THE PRIVATE WHOLESALE TRAVEL & BANKING CLUB • SETUP BLUEPRINT', 55, 80);
doc.fillColor('#94A3B8').fontSize(9).font('Helvetica').text('Confidential Implementation Guide for Platform Owner • Version 3.4', 55, 96);

doc.moveDown(4);

// Intro
doc.fillColor(darkText).fontSize(10).font('Helvetica').text(
  'This master blueprint provides comprehensive step-by-step instructions for the platform owner to register with all B2B suppliers, obtain live API keys, and connect them directly into your ATLAS Master Admin Console.',
  40,
  135,
  { width: 515, align: 'left', lineGap: 3 }
);

doc.moveDown(1);

// Checklist
doc.rect(40, doc.y, 515, 65).fill('#F1F5F9');
const checklistY = doc.y - 60;
doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text('PRE-REGISTRATION CHECKLIST (HAVE THESE READY):', 50, checklistY);
doc.fillColor(darkText).fontSize(8.5).font('Helvetica').text(
  '• Business Legal Name, Tax ID (EIN/VAT), and Registered Company Address\n' +
  '• Company Website URL (https://hotelsclub.vip) & Owner Government Photo ID\n' +
  '• Business Bank Account / PayPal Business (for payout deposits and card treasury funding)',
  50,
  checklistY + 16,
  { lineGap: 3 }
);

doc.y = checklistY + 65;
doc.moveDown(1.5);

const providers = [
  {
    num: '1',
    title: 'FinTech & Visa Cards: Stripe Issuing',
    url: 'dashboard.stripe.com/issuing',
    approval: '1 – 2 Business Days',
    revenue: '1.2% – 1.6% Interchange Revenue on every member card swipe',
    adminSection: 'Admin > Visa Prepaid Manager',
    steps: [
      '1. Create or log into your Stripe Business account at dashboard.stripe.com.',
      '2. Navigate to "Issuing" and click "Request Access" for Commercial Card Issuing.',
      '3. In "Card Designs", upload your HotelsClub Metallic Gold and Platinum card artwork.',
      '4. In Developers > API Keys, copy your Secret Key (sk_live_...) and Webhook Secret.',
      '5. Paste in Admin > Visa Prepaid Manager and click Save.'
    ]
  },
  {
    num: '2',
    title: 'Wholesale Hotels: Hotelbeds & WebBeds',
    url: 'hotelbeds.com/distribution | webbeds.com',
    approval: '2 – 3 Business Days',
    revenue: '100% Net Wholesale Pass-Through (Monetized via monthly memberships)',
    adminSection: 'Admin > B2B Suppliers',
    steps: [
      '1. Register as a "Closed-Loop Travel Club / B2B Agency" at hotelbeds.com/distribution.',
      '2. Request APItude REST / XML Booking API credentials.',
      '3. In the Developer Portal, obtain your API Key, Secret, and Live Endpoint URL.',
      '4. Paste into Admin > B2B Suppliers and toggle Wholesale Hotel Engine in Switchboard.'
    ]
  },
  {
    num: '3',
    title: 'Ultra-Luxury Villas: Le Collectionist & Oliver’s Travels',
    url: 'lecollectionist.com/en/travel-designers',
    approval: '1 – 2 Business Days',
    revenue: '40%–50% Member Wholesale Savings + 10% Platform Broker Commission',
    adminSection: 'Admin > Luxury Villas',
    steps: [
      '1. Apply as a Luxury Travel Club / Concierge Partner at lecollectionist.com.',
      '2. Under "API & Inventory Feeds", obtain your B2B Estate Token.',
      '3. Paste in Admin > Luxury Villas and click Save Luxury Villa Configuration.'
    ]
  },
  {
    num: '4',
    title: 'Autonomous Price-Drop Re-Booker: Pruvo For Business',
    url: 'pruvo.com/business | hotelmize.com',
    approval: '1 Business Day',
    revenue: 'Members save $70–$240 post-booking; Platform keeps performance split',
    adminSection: 'Admin > Price-Drop Re-Booker',
    steps: [
      '1. Register for B2B API access at pruvo.com/business.',
      '2. Set your Webhook endpoint to: https://yourdomain.com/api/cards/credit.',
      '3. In Developer Settings, copy your B2B Token.',
      '4. Paste in Admin > Price-Drop Re-Booker and set minimum threshold to $25.00.'
    ]
  },
  {
    num: '5',
    title: 'Elite Loyalty Status Matching: StatusMatch.com',
    url: 'statusmatch.com/business',
    approval: '1 – 2 Business Days',
    revenue: 'Instant Hilton Diamond / Marriott Platinum ($1,500+ value)',
    adminSection: 'Admin > Status Match',
    steps: [
      '1. Register for Enterprise Partner status at statusmatch.com/business.',
      '2. Copy your Status Match Enterprise Secret Token.',
      '3. Paste in Admin > Status Match and define tier mappings (Gold ➔ Hilton Diamond).'
    ]
  },
  {
    num: '6',
    title: 'VIP Airport Fast-Track Immigration: Diamond Air',
    url: 'diamondair.co.uk | marhabaservices.com',
    approval: '1 – 2 Business Days',
    revenue: '50% Member Discount on VIP Escorts + 15% Platform Commission',
    adminSection: 'Admin > VIP Fast-Track',
    steps: [
      '1. Register as a Corporate Travel Partner at diamondair.co.uk.',
      '2. In Developer Settings, copy your Dispatch API Token.',
      '3. Paste in Admin > VIP Fast-Track and save.'
    ]
  },
  {
    num: '7',
    title: 'Luxury Yachts & Supercars: Boatsetter & Blacklane',
    url: 'boatsetter.com/affiliates | blacklane.com',
    approval: '1 – 2 Business Days',
    revenue: '35%–45% Member Savings + 10% Platform Broker Commission',
    adminSection: 'Admin > Yachts & Supercars',
    steps: [
      '1. Sign up as a VIP Concierge Partner at boatsetter.com/affiliates.',
      '2. Copy your Fleet Partner API Key and Webhook URL.',
      '3. Paste in Admin > Yachts & Supercars.'
    ]
  },
  {
    num: '8',
    title: 'Private Jet Empty Legs: LunaJets / FlyXO',
    url: 'lunajets.com/en/b2b-partners | flyxo.com',
    approval: '1 – 2 Business Days',
    revenue: '$250 – $750 Commission per whole aircraft charter booking',
    adminSection: 'Admin > Private Jet Empty Legs',
    steps: [
      '1. Register for the B2B Empty Leg Feed API at lunajets.com.',
      '2. Copy your Empty Leg JSON Webhook Key.',
      '3. Paste in Admin > Private Jet Empty Legs.'
    ]
  },
  {
    num: '9',
    title: 'Flight Delay Legal Claims: AirHelp API',
    url: 'airhelp.com/en/affiliates/',
    approval: 'Instant / 1 Business Day',
    revenue: '$650 Cash to Member + $25–$45 Affiliate Bounty to Platform',
    adminSection: 'Admin > Delay Claims (AirHelp)',
    steps: [
      '1. Register at airhelp.com/en/affiliates or apply for AirHelp Connect B2B API.',
      '2. Copy your Affiliate Campaign ID or REST API Token.',
      '3. Paste in Admin > Delay Claims (AirHelp).'
    ]
  },
  {
    num: '10',
    title: 'Global Travel Insurance: SafetyWing / Allianz',
    url: 'safetywing.com/partners',
    approval: 'Instant Sandbox / 24h Live',
    revenue: '15% – 20% Recurring Commission on policy sales',
    adminSection: 'Admin > Travel Insurance',
    steps: [
      '1. Register at safetywing.com/partners.',
      '2. Obtain your Partner Secret Token and Embed API Key.',
      '3. Paste in Admin > Travel Insurance.'
    ]
  },
  {
    num: '11',
    title: 'Digital Nomad Visas & Coliving: iVisa & Outsite Affiliates',
    url: 'ivisa.com/affiliates | outsite.co/affiliates',
    approval: 'Instant / 1 Business Day',
    revenue: '$20–$75 per visa filing + $50–$100 (8%–10%) on monthly coliving stays',
    adminSection: 'Admin > Digital Nomad & Visas',
    steps: [
      '1. Register at ivisa.com/affiliates and outsite.co/affiliates.',
      '2. Copy your Affiliate Campaign IDs.',
      '3. Paste in Admin > Digital Nomad & Visas under Nomad Affiliates and save.'
    ]
  }
];

// Loop through providers
providers.forEach((p, idx) => {
  if (doc.y > 670) {
    doc.addPage();
  }

  doc.rect(40, doc.y, 515, 20).fill(primaryColor);
  const headerY = doc.y - 16;
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`${p.num}. ${p.title.toUpperCase()}`, 48, headerY);

  doc.y = headerY + 22;

  doc.fillColor(darkText).fontSize(8.5).font('Helvetica');
  doc.text(`• Official Portal: ${p.url}`, 48, doc.y, { lineGap: 2 });
  doc.text(`• Approval Time: ${p.approval}  |  Revenue: ${p.revenue}`, 48, doc.y, { lineGap: 2 });
  doc.text(`• Admin Destination: ${p.adminSection}`, 48, doc.y, { lineGap: 3 });

  doc.fillColor(mutedText).fontSize(8).font('Helvetica');
  p.steps.forEach((step) => {
    doc.text(step, 54, doc.y, { lineGap: 2 });
  });

  doc.moveDown(0.8);
});

// Final Publish Box
if (doc.y > 680) {
  doc.addPage();
}

doc.rect(40, doc.y, 515, 50).fill('#ECFDF5');
const finalY = doc.y - 42;
doc.fillColor('#065F46').fontSize(10).font('Helvetica-Bold').text('FINAL STEP: PUBLISHING CHANGES LIVE', 50, finalY);
doc.fillColor('#047857').fontSize(8.5).font('Helvetica').text(
  '1. Open the Admin Master Switchboard at http://localhost:3005/admin.\n' +
  '2. Ensure all 7 pillars and banking services are toggled to Active (Green).\n' +
  '3. Click the top-right button "⚡ Publish Changes to Member Portal" to push live worldwide!',
  50,
  finalY + 14,
  { lineGap: 2 }
);

doc.end();

stream1.on('finish', () => {
  try {
    fs.copyFileSync(outputPath1, outputPath2);
  } catch (e) {}
  console.log('PDF successfully generated at: ' + outputPath1);
});
