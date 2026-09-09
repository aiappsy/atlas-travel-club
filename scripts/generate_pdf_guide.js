const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const artifactsDir = 'C:/Users/paul/.gemini/antigravity/brain/758bc5ae-6be8-4bb5-959d-08c5895aa455';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function generateSetupGuidePDF(outputPath) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 45, left: 45, right: 45 },
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    const pageWidth = doc.page.width;
    const contentWidth = pageWidth - 90; // 505

    // ==========================================
    // PAGE 1: HEADER & EXECUTIVE SETUP
    // ==========================================

    // Top Brand Bar
    doc.roundedRect(45, 40, contentWidth, 75, 8).fill('#0F172A');

    doc.fillColor('#F59E0B').fontSize(16).font('Helvetica-Bold')
       .text('ATLAS VIP SOVEREIGN PLATFORM', 60, 52);

    doc.fillColor('#38BDF8').fontSize(9.5).font('Helvetica-Bold')
       .text('MASTER OWNER SETUP BLUEPRINT • 2026 PRODUCTION EDITION', 60, 72);

    doc.fillColor('#94A3B8').fontSize(8).font('Helvetica')
       .text('Confidential Implementation Guide for Platform Owner & Lead Integrator', 60, 88);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('#10B981')
       .text('● VERIFIED STATUS: LIVE', pageWidth - 180, 52, { align: 'right' });

    // Introductory Overview Card
    let currentY = 125;
    doc.roundedRect(45, currentY, contentWidth, 42, 6).fillAndStroke('#F8FAFC', '#E2E8F0');
    doc.fillColor('#334155').fontSize(8.5).font('Helvetica')
       .text('This master blueprint provides comprehensive, step-by-step instructions for the platform owner to register corporate accounts with all 20+ B2B suppliers, obtain live API keys, and connect them directly into the ATLAS Master Admin Console.', 55, currentY + 8, { width: contentWidth - 20, lineGap: 2 });

    currentY += 50;

    // Pre-Registration Checklist Card
    doc.roundedRect(45, currentY, contentWidth, 68, 6).fillAndStroke('#F1F5F9', '#CBD5E1');
    doc.fillColor('#0F172A').fontSize(9.5).font('Helvetica-Bold')
       .text('MANDATORY PRE-REGISTRATION CHECKLIST (HAVE THESE READY):', 55, currentY + 10);

    doc.fillColor('#475569').fontSize(8).font('Helvetica')
       .text('• Business Legal Name, Tax ID (EIN/VAT), and Registered Articles of Incorporation', 55, currentY + 26)
       .text('• Company Domain (https://atlasclub.vip) & Beneficial Owner Government Photo ID', 55, currentY + 38)
       .text('• Commercial Operating Bank Account (ACH/Fedwire/SEPA) for settlement & card funding', 55, currentY + 50);

    currentY += 78;

    const providers = [
      {
        num: '01',
        title: 'FinTech & Visa Prepaid Cards: Stripe Issuing',
        portal: 'dashboard.stripe.com/issuing',
        approval: '1 – 2 Business Days',
        revenue: '1.2% – 1.6% Interchange Revenue per card swipe',
        adminSection: 'Admin > Visa Prepaid Manager',
        steps: [
          'Create or log into your corporate Stripe account at dashboard.stripe.com.',
          'Navigate to Issuing and request Commercial Card Issuing access.',
          'In Developers > API Keys, copy your Publishable, Secret (sk_live_...) & Webhook keys.',
          'Paste credentials in Admin > Visa Prepaid Manager and configure auto-reload balance.'
        ]
      },
      {
        num: '02',
        title: 'Wholesale B2B Bedbanks: Hotelbeds & WebBeds',
        portal: 'hotelbeds.com/distribution | webbeds.com',
        approval: '2 – 3 Business Days',
        revenue: '100% Net Wholesale Pass-Through (Monetized via Subscriptions)',
        adminSection: 'Admin > B2B Suppliers',
        steps: [
          'Register as a "Closed-Loop Private Travel Club" at hotelbeds.com/distribution.',
          'Request APItude REST / XML Booking API and Content credentials.',
          'Extract API Key, Secret, and Live Endpoint URL from Developer Portal.',
          'Paste in Admin > B2B Suppliers and toggle Wholesale Hotel Engine to Active.'
        ]
      },
      {
        num: '03',
        title: 'Curated Luxury Villas: Le Collectionist & Oliver’s Travels',
        portal: 'lecollectionist.com/en/travel-designers',
        approval: '1 – 2 Business Days',
        revenue: '40%–50% Member Wholesale Savings + 10% Broker Commission',
        adminSection: 'Admin > Luxury Villas',
        steps: [
          'Apply as a Luxury Travel Club / Concierge Partner at lecollectionist.com.',
          'Under "API & Inventory Feeds", obtain your B2B Estate Token.',
          'Paste in Admin > Luxury Villas and click Save Luxury Villa Configuration.'
        ]
      },
      {
        num: '04',
        title: 'Autonomous Price-Drop Re-Booker: Pruvo B2B Engine',
        portal: 'pruvo.com/business | hotelmize.com',
        approval: '1 Business Day',
        revenue: 'Members save $70–$240 post-booking (50/50 Profit Split to Vault)',
        adminSection: 'Admin > Price-Drop Re-Booker',
        steps: [
          'Register for B2B API access at pruvo.com/business.',
          'Set webhook endpoint to: https://atlasclub.vip/api/cards/credit.',
          'In Developer Settings, copy your B2B Token and set threshold to $25.00.'
        ]
      },
      {
        num: '05',
        title: 'Elite Loyalty Status Match: StatusMatch.com B2B API',
        portal: 'statusmatch.com/business',
        approval: '1 – 2 Business Days',
        revenue: 'Instant Hilton Diamond / Star Alliance Gold ($1,500+ Member Value)',
        adminSection: 'Admin > Status Match',
        steps: [
          'Register for Enterprise Partner status at statusmatch.com/business.',
          'Copy your Status Match Enterprise Secret Token.',
          'Paste in Admin > Status Match and configure tier mappings.'
        ]
      },
      {
        num: '06',
        title: 'Airport VIP Fast-Track & Meet & Greet: Diamond Air / Marhaba',
        portal: 'diamondair.co.uk | marhabaservices.com',
        approval: '1 – 2 Business Days',
        revenue: '30% Member Discount on VIP Escorts + 15% Platform Margin',
        adminSection: 'Admin > VIP Fast-Track',
        steps: [
          'Register as a Corporate Travel Partner at diamondair.co.uk.',
          'In Developer Settings, copy your Dispatch API Token.',
          'Paste in Admin > VIP Fast-Track and activate airport coverage.'
        ]
      },
      {
        num: '07',
        title: 'Luxury Yachts & Supercars: Boatsetter B2B & Hertz Dream Cars',
        portal: 'boatsetter.com/affiliates | hertz.com',
        approval: 'Instant / 1 Business Day',
        revenue: '10% – 15% Commission on luxury yacht charters ($500 – $2,500 per booking)',
        adminSection: 'Admin > Yachts & Supercars',
        steps: [
          'Sign up as a VIP Concierge Partner at boatsetter.com/affiliates.',
          'Copy your Fleet Partner API Key and Webhook URL.',
          'Paste in Admin > Yachts & Supercars and save configuration.'
        ]
      },
      {
        num: '08',
        title: 'Private Jet Empty Legs: LunaJets & FlyXO B2B Webhooks',
        portal: 'lunajets.com/en/b2b-partners | flyxo.com',
        approval: '1 – 2 Business Days',
        revenue: '$250 – $750 Commission per whole aircraft charter booking',
        adminSection: 'Admin > Private Jet Empty Legs',
        steps: [
          'Register for the B2B Empty Leg Feed API at lunajets.com.',
          'Copy your Empty Leg JSON Webhook Key and paste in Admin > Private Jet Empty Legs.'
        ]
      },
      {
        num: '09',
        title: 'Flight Delay Legal Compensation: AirHelp B2B API',
        portal: 'airhelp.com/en/affiliates',
        approval: 'Instant / 1 Business Day',
        revenue: '$650 Cash to Member + $25–$45 Affiliate Bounty to Platform',
        adminSection: 'Admin > Delay Claims (AirHelp)',
        steps: [
          'Register at airhelp.com/en/affiliates or apply for AirHelp Connect B2B API.',
          'Copy your Affiliate Campaign ID or REST API Token and paste in Admin > Delay Claims.'
        ]
      },
      {
        num: '10',
        title: 'Global Nomad Health & Travel Insurance: SafetyWing API',
        portal: 'safetywing.com/partners',
        approval: 'Instant Sandbox / 24h Live',
        revenue: '15% – 20% Recurring Commission on policy renewals',
        adminSection: 'Admin > Travel Insurance',
        steps: [
          'Register at safetywing.com/partners.',
          'Obtain your Partner Secret Token and Embed API Key, then paste in Admin.'
        ]
      },
      {
        num: '11',
        title: 'Nomad Visas & Coliving: Sherpa, iVisa & Outsite',
        portal: 'joinsherpa.com | ivisa.com | outsite.co',
        approval: 'Instant / 1 Business Day',
        revenue: '$20–$75 per visa filing + 10% on monthly coliving bookings',
        adminSection: 'Admin > Digital Nomad & Visas',
        steps: [
          'Register for Sherpa Widget API, iVisa, and Outsite partner portals.',
          'Copy Affiliate / API keys and paste in Admin > Digital Nomad & Visas.'
        ]
      }
    ];

    providers.forEach((p) => {
      // Calculate card height dynamically
      const cardHeight = 72 + (p.steps.length * 12);

      if (currentY + cardHeight > 780) {
        doc.addPage();
        currentY = 45;
      }

      // Card Container
      doc.roundedRect(45, currentY, contentWidth, cardHeight, 6)
         .fillAndStroke('#FFFFFF', '#E2E8F0');

      // Card Header Banner
      doc.roundedRect(45, currentY, contentWidth, 22, 5)
         .fill('#0F172A');

      doc.fillColor('#F59E0B').fontSize(9).font('Helvetica-Bold')
         .text(`${p.num}`, 54, currentY + 6);

      doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold')
         .text(p.title.toUpperCase(), 75, currentY + 6);

      doc.fillColor('#38BDF8').fontSize(7.5).font('Helvetica-Bold')
         .text(`APPROVAL: ${p.approval}`, pageWidth - 180, currentY + 7, { align: 'right' });

      let textY = currentY + 28;

      // Meta info line
      doc.fillColor('#0284C7').fontSize(7.5).font('Helvetica-Bold')
         .text('PORTAL: ', 55, textY, { continued: true })
         .font('Helvetica').fillColor('#334155').text(`${p.portal}   |   `)
         .font('Helvetica-Bold').fillColor('#059669').text('REVENUE: ', { continued: true })
         .font('Helvetica').fillColor('#334155').text(`${p.revenue}`);

      textY += 13;

      doc.fillColor('#D97706').fontSize(7.5).font('Helvetica-Bold')
         .text('ADMIN DESTINATION: ', 55, textY, { continued: true })
         .font('Helvetica-Bold').fillColor('#0F172A').text(p.adminSection);

      textY += 13;

      // Steps
      p.steps.forEach((step, sIdx) => {
        doc.fillColor('#475569').fontSize(7.5).font('Helvetica')
           .text(`${sIdx + 1}.  ${step}`, 60, textY, { width: contentWidth - 25, lineGap: 1 });
        textY += 12;
      });

      currentY += cardHeight + 8;
    });

    // Final Action Box
    if (currentY + 65 > 780) {
      doc.addPage();
      currentY = 45;
    }

    doc.roundedRect(45, currentY, contentWidth, 55, 6).fillAndStroke('#ECFDF5', '#10B981');
    doc.fillColor('#065F46').fontSize(9.5).font('Helvetica-Bold')
       .text('FINAL STEP: PUBLISHING PLATFORM CHANGES LIVE', 55, currentY + 10);
    doc.fillColor('#047857').fontSize(8).font('Helvetica')
       .text('1. Navigate to the Admin Master Switchboard at http://localhost:3005/admin.', 55, currentY + 25)
       .text('2. Toggle all verified supplier services to Active (Green).', 55, currentY + 36)
       .text('3. Click the top-right button "⚡ Publish Changes to Member Portal" to deploy changes instantly worldwide.', 55, currentY + 47);

    // Running page numbers & footer
    const pageRange = doc.bufferedPageRange();
    for (let i = 0; i < pageRange.count; i++) {
      doc.switchToPage(i);
      doc.moveTo(45, 800).lineTo(pageWidth - 45, 800).lineWidth(0.5).strokeColor('#E2E8F0').stroke();
      doc.fontSize(7.5).font('Helvetica').fillColor('#94A3B8')
         .text('ATLAS SOVEREIGN OPERATIONS • STRICTLY CONFIDENTIAL', 45, 808);
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#64748B')
         .text(`Page ${i + 1} of ${pageRange.count}`, pageWidth - 120, 808, { align: 'right' });
    }

    doc.end();
    writeStream.on('finish', () => {
      console.log(`Successfully generated Setup Guide: ${outputPath}`);
      resolve(true);
    });
  });
}

async function run() {
  const p1 = path.join(publicDir, 'ATLAS_Owner_Master_Setup_Guide.pdf');
  const p2 = path.join(publicDir, 'HotelsClub_Owner_Master_Setup_Guide.pdf');
  await generateSetupGuidePDF(p1);
  await generateSetupGuidePDF(p2);

  if (fs.existsSync(artifactsDir)) {
    fs.copyFileSync(p1, path.join(artifactsDir, 'ATLAS_Owner_Master_Setup_Guide.pdf'));
    fs.copyFileSync(p2, path.join(artifactsDir, 'HotelsClub_Owner_Master_Setup_Guide.pdf'));
  }

  console.log('All Setup Guide PDFs successfully updated with pristine styling!');
}

run();
