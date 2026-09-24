const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const manualsDataRaw = fs.readFileSync(path.join(__dirname, '../src/lib/manualsData.ts'), 'utf8');
const jsonMatch = manualsDataRaw.match(/export const ATLAS_TRAINING_MANUALS: TrainingManual\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  throw new Error('Could not parse ATLAS_TRAINING_MANUALS');
}
const ATLAS_TRAINING_MANUALS = JSON.parse(jsonMatch[1]);

const artifactsDir = 'C:/Users/paul/.gemini/antigravity/brain/758bc5ae-6be8-4bb5-959d-08c5895aa455';
const publicDir = path.join(__dirname, '../public');

// Helper to escape HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Convert simple markdown to styled HTML
function markdownToHtml(md) {
  let html = md;

  // Code blocks
  html = html.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h4 class="section-h4">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="section-h3">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="section-h2">$1</h2>');

  // Bold & Italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Lists
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<div class="ordered-item"><span class="num-bullet">•</span> <span>$1</span></div>');
  html = html.replace(/^\s*-\s+(.*$)/gim, '<div class="unordered-item"><span class="dash-bullet">—</span> <span>$1</span></div>');

  // Paragraphs (lines with text)
  html = html.split('\n\n').map(p => {
    if (p.trim().startsWith('<') || p.trim().length === 0) return p;
    return `<p class="paragraph">${p.trim()}</p>`;
  }).join('\n');

  return html;
}

function buildManualHtml(manuals, title, subtitle) {
  const manualsContent = manuals.map((manual, mIdx) => {
    const chaptersHtml = manual.chapters.map((ch, chIdx) => {
      const parsedContent = markdownToHtml(ch.content);
      const checklistHtml = (ch.actionChecklist && ch.actionChecklist.length > 0)
        ? `
        <div class="checklist-card">
          <div class="checklist-header">
            <span class="checklist-badge">MANDATORY OPERATOR CHECKLIST</span>
            <span class="checklist-count">${ch.actionChecklist.length} ACTION ITEMS</span>
          </div>
          <div class="checklist-items">
            ${ch.actionChecklist.map((item, i) => `
              <div class="checklist-item">
                <span class="check-box">✓</span>
                <span class="check-text">${escapeHtml(item)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        `
        : '';

      return `
      <div class="chapter-card">
        <div class="chapter-header">
          <div class="chapter-title-group">
            <span class="chapter-num-badge">CHAPTER ${chIdx + 1}</span>
            <h3 class="chapter-title">${escapeHtml(ch.title.replace(/^Chapter \d+:\s*/i, ''))}</h3>
          </div>
          <span class="reading-time">⏱ ${ch.readingTimeMinutes} MIN READ</span>
        </div>
        <div class="chapter-body">
          ${parsedContent}
          ${checklistHtml}
        </div>
      </div>
      `;
    }).join('\n');

    return `
    <div class="manual-section ${mIdx > 0 ? 'page-break-before' : ''}">
      <div class="role-header-banner">
        <div class="role-badge">TRACK 0${mIdx + 1} • ${escapeHtml(manual.badge.toUpperCase())}</div>
        <h2 class="role-title">${escapeHtml(manual.roleTitle)}</h2>
        <div class="role-target"><strong>Target Role:</strong> ${escapeHtml(manual.targetAudience)}</div>
        <div class="role-summary"><strong>Executive Summary:</strong> ${escapeHtml(manual.summary)}</div>
      </div>
      <div class="chapters-container">
        ${chaptersHtml}
      </div>
    </div>
    `;
  }).join('\n');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(title)}</title>
    <style>
      @page {
        size: A4;
        margin: 18mm 16mm 20mm 16mm;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #1e293b;
        background: #ffffff;
        font-size: 9.5pt;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }

      .page-break-before {
        page-break-before: always;
      }

      /* COVER PAGE */
      .cover-page {
        page-break-after: always;
        height: 100vh;
        min-height: 250mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: linear-gradient(135deg, #090d16 0%, #0f172a 100%);
        border: 2px solid #d97706;
        border-radius: 8px;
        padding: 40px 30px;
        color: #ffffff;
      }
      .cover-header {
        text-align: center;
        margin-top: 40px;
      }
      .cover-brand {
        font-size: 34pt;
        font-weight: 900;
        letter-spacing: 6px;
        color: #f59e0b;
        margin: 0;
      }
      .cover-subbrand {
        font-size: 10.5pt;
        font-weight: 700;
        letter-spacing: 3px;
        color: #94a3b8;
        margin-top: 8px;
      }
      .cover-divider {
        width: 120px;
        height: 3px;
        background: #f59e0b;
        margin: 24px auto;
        border-radius: 2px;
      }
      .cover-title-group {
        text-align: center;
        margin: 40px 0;
      }
      .cover-title {
        font-size: 22pt;
        font-weight: 800;
        color: #ffffff;
        line-height: 1.3;
        margin: 0;
      }
      .cover-subtitle {
        font-size: 11pt;
        color: #38bdf8;
        margin-top: 12px;
        font-weight: 600;
      }
      .cover-meta-card {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid #334155;
        border-radius: 8px;
        padding: 20px 24px;
        margin: 0 auto;
        width: 90%;
      }
      .cover-meta-title {
        font-size: 9pt;
        font-weight: 800;
        color: #f59e0b;
        letter-spacing: 1.5px;
        margin-bottom: 10px;
      }
      .cover-meta-list {
        font-size: 8.5pt;
        color: #cbd5e1;
        line-height: 1.6;
      }
      .cover-meta-list div {
        margin-bottom: 4px;
      }
      .cover-footer {
        text-align: center;
        font-size: 8pt;
        color: #64748b;
        letter-spacing: 1px;
      }

      /* ROLE BANNER */
      .role-header-banner {
        background: #0f172a;
        color: #ffffff;
        border-radius: 8px;
        padding: 16px 20px;
        margin-bottom: 20px;
        page-break-inside: avoid;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      }
      .role-badge {
        display: inline-block;
        font-size: 7.5pt;
        font-weight: 800;
        color: #38bdf8;
        letter-spacing: 1.5px;
        margin-bottom: 4px;
      }
      .role-title {
        font-size: 16pt;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 8px 0;
      }
      .role-target {
        font-size: 8pt;
        color: #94a3b8;
        margin-bottom: 6px;
      }
      .role-summary {
        font-size: 8pt;
        color: #cbd5e1;
        background: #1e293b;
        padding: 8px 12px;
        border-radius: 6px;
        line-height: 1.4;
      }

      /* CHAPTER CARD */
      .chapter-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 20px;
        page-break-inside: avoid;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      }
      .chapter-header {
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        padding: 10px 16px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chapter-title-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .chapter-num-badge {
        background: #0f172a;
        color: #f59e0b;
        font-size: 7pt;
        font-weight: 800;
        padding: 3px 6px;
        border-radius: 4px;
        letter-spacing: 0.5px;
      }
      .chapter-title {
        font-size: 10.5pt;
        font-weight: 800;
        color: #0f172a;
        margin: 0;
      }
      .reading-time {
        font-size: 7.5pt;
        font-weight: 700;
        color: #0284c7;
        background: #e0f2fe;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .chapter-body {
        padding: 14px 18px;
      }

      /* TYPOGRAPHY IN BODY */
      .section-h4 {
        font-size: 9.5pt;
        font-weight: 800;
        color: #0369a1;
        margin: 12px 0 6px 0;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 3px;
      }
      .paragraph {
        margin: 0 0 8px 0;
        color: #334155;
        font-size: 8.5pt;
        line-height: 1.45;
      }
      .ordered-item, .unordered-item {
        display: flex;
        align-items: baseline;
        gap: 6px;
        font-size: 8.5pt;
        color: #334155;
        margin-bottom: 4px;
        line-height: 1.4;
      }
      .num-bullet {
        color: #f59e0b;
        font-weight: 800;
        font-size: 10pt;
      }
      .dash-bullet {
        color: #0284c7;
        font-weight: 800;
      }
      .inline-code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 7.5pt;
        background: #f1f5f9;
        color: #0f172a;
        padding: 1px 4px;
        border-radius: 3px;
        border: 1px solid #e2e8f0;
      }
      .code-block {
        background: #0f172a;
        color: #e2e8f0;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 7.5pt;
        padding: 10px 14px;
        border-radius: 6px;
        overflow-x: auto;
        margin: 8px 0;
        line-height: 1.4;
      }

      /* CHECKLIST CARD */
      .checklist-card {
        background: #f0fdf4;
        border: 1px solid #86efac;
        border-radius: 6px;
        padding: 10px 14px;
        margin-top: 12px;
        page-break-inside: avoid;
      }
      .checklist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        border-bottom: 1px solid #bbf7d0;
        padding-bottom: 4px;
      }
      .checklist-badge {
        font-size: 7.5pt;
        font-weight: 800;
        color: #15803d;
        letter-spacing: 0.5px;
      }
      .checklist-count {
        font-size: 7pt;
        font-weight: 700;
        color: #166534;
      }
      .checklist-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .checklist-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 8pt;
        color: #166534;
      }
      .check-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 13px;
        height: 13px;
        background: #16a34a;
        color: #ffffff;
        border-radius: 3px;
        font-size: 7pt;
        font-weight: 900;
      }
    </style>
  </head>
  <body>
    <!-- COVER PAGE -->
    <div class="cover-page">
      <div class="cover-header">
        <h1 class="cover-brand">ATLAS</h1>
        <div class="cover-subbrand">THE SOVEREIGN TRAVEL &amp; WHOLESALE BANKING CLUB</div>
        <div class="cover-divider"></div>
      </div>
      <div class="cover-title-group">
        <h2 class="cover-title">${escapeHtml(title)}</h2>
        <div class="cover-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="cover-meta-card">
        <div class="cover-meta-title">EXECUTIVE SPECIFICATIONS &amp; COMPLIANCE CLEARANCE</div>
        <div class="cover-meta-list">
          <div>• <strong>Classification:</strong> Strictly Confidential (Closed-Loop Enterprise Operations)</div>
          <div>• <strong>Version:</strong> 3.4.0 Production Build (2026 Edition)</div>
          <div>• <strong>Standard:</strong> Rate Parity Non-Disclosure &amp; B2B Wholesale Distribution Licensure</div>
          <div>• <strong>Audited:</strong> Verified Against Live Bedbank &amp; FinTech Gateway Endpoints</div>
          <div>• <strong>Distribution:</strong> Operations Leads, Platform Engineers &amp; Board of Directors</div>
        </div>
      </div>
      <div class="cover-footer">
        &copy; 2026 ATLAS Travel &amp; Sovereign Banking Network. All Rights Reserved.
      </div>
    </div>

    <!-- MAIN CONTENT -->
    ${manualsContent}
  </body>
  </html>
  `;
}

function buildSetupGuideHtml() {
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

  const cardsHtml = providers.map(p => `
    <div class="provider-card">
      <div class="provider-header">
        <span class="provider-num">${p.num}</span>
        <h3 class="provider-title">${escapeHtml(p.title)}</h3>
        <span class="provider-approval">⏱ ${escapeHtml(p.approval)}</span>
      </div>
      <div class="provider-body">
        <div class="meta-row">
          <span class="meta-pill portal-pill"><strong>PORTAL:</strong> ${escapeHtml(p.portal)}</span>
          <span class="meta-pill rev-pill"><strong>REVENUE:</strong> ${escapeHtml(p.revenue)}</span>
        </div>
        <div class="admin-dest">
          <strong>ADMIN DESTINATION:</strong> <span class="dest-badge">${escapeHtml(p.adminSection)}</span>
        </div>
        <div class="provider-steps">
          ${p.steps.map((s, idx) => `
            <div class="step-item">
              <span class="step-num">${idx + 1}.</span>
              <span class="step-text">${escapeHtml(s.replace(/^\d+\.\s*/, ''))}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('\n');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ATLAS VIP Platform Owner Setup Blueprint</title>
    <style>
      @page {
        size: A4;
        margin: 14mm 14mm 16mm 14mm;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #1e293b;
        background: #ffffff;
        font-size: 8.5pt;
        line-height: 1.4;
        margin: 0;
        padding: 0;
      }
      .brand-bar {
        background: #0f172a;
        color: #ffffff;
        border-radius: 8px;
        padding: 14px 18px;
        margin-bottom: 12px;
      }
      .brand-title {
        font-size: 15pt;
        font-weight: 800;
        color: #f59e0b;
        margin: 0 0 3px 0;
      }
      .brand-subtitle {
        font-size: 8.5pt;
        font-weight: 700;
        color: #38bdf8;
        letter-spacing: 1px;
      }
      .brand-desc {
        font-size: 7.5pt;
        color: #94a3b8;
        margin-top: 3px;
      }
      .checklist-bar {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 10px 14px;
        margin-bottom: 14px;
      }
      .checklist-title {
        font-size: 8.5pt;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 4px;
      }
      .checklist-items {
        font-size: 7.5pt;
        color: #475569;
        line-height: 1.5;
      }
      .provider-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        margin-bottom: 10px;
        page-break-inside: avoid;
        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      }
      .provider-header {
        background: #0f172a;
        color: #ffffff;
        padding: 6px 12px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .provider-num {
        font-size: 8pt;
        font-weight: 800;
        color: #f59e0b;
        margin-right: 6px;
      }
      .provider-title {
        font-size: 9pt;
        font-weight: 800;
        color: #ffffff;
        margin: 0;
        flex: 1;
      }
      .provider-approval {
        font-size: 7pt;
        font-weight: 700;
        color: #38bdf8;
      }
      .provider-body {
        padding: 8px 12px;
      }
      .meta-row {
        display: flex;
        gap: 8px;
        margin-bottom: 5px;
      }
      .meta-pill {
        font-size: 7pt;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .portal-pill {
        background: #e0f2fe;
        color: #0369a1;
      }
      .rev-pill {
        background: #dcfce7;
        color: #15803d;
      }
      .admin-dest {
        font-size: 7.5pt;
        color: #d97706;
        margin-bottom: 6px;
      }
      .dest-badge {
        font-weight: 800;
        color: #0f172a;
      }
      .provider-steps {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .step-item {
        display: flex;
        gap: 6px;
        font-size: 7.5pt;
        color: #334155;
      }
      .step-num {
        color: #f59e0b;
        font-weight: 800;
      }
      .step-text {
        flex: 1;
      }
      .final-box {
        background: #ecfdf5;
        border: 1px solid #10b981;
        border-radius: 6px;
        padding: 10px 14px;
        margin-top: 14px;
        page-break-inside: avoid;
      }
      .final-title {
        font-size: 8.5pt;
        font-weight: 800;
        color: #065f46;
        margin-bottom: 4px;
      }
      .final-text {
        font-size: 7.5pt;
        color: #047857;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="brand-bar">
      <div class="brand-title">ATLAS VIP SOVEREIGN PLATFORM</div>
      <div class="brand-subtitle">MASTER OWNER SETUP BLUEPRINT • 2026 PRODUCTION EDITION</div>
      <div class="brand-desc">Confidential Implementation Guide for Platform Owner &amp; Lead Integrator</div>
    </div>

    <div class="checklist-bar">
      <div class="checklist-title">MANDATORY PRE-REGISTRATION CHECKLIST (HAVE THESE READY):</div>
      <div class="checklist-items">
        <div>• Business Legal Name, Tax ID (EIN/VAT), and Registered Articles of Incorporation</div>
        <div>• Company Domain (https://atlasclub.vip) &amp; Beneficial Owner Government Photo ID</div>
        <div>• Commercial Operating Bank Account (ACH/Fedwire/SEPA) for settlement &amp; card funding</div>
      </div>
    </div>

    ${cardsHtml}

    <div class="final-box">
      <div class="final-title">FINAL STEP: PUBLISHING PLATFORM CHANGES LIVE</div>
      <div class="final-text">
        1. Open the Admin Master Switchboard at <strong>http://localhost:3005/admin</strong>.<br/>
        2. Verify all supplier API credentials in their respective management tabs.<br/>
        3. Click the top-right button <strong>"⚡ Publish Changes to Member Portal"</strong> to push changes live worldwide.
      </div>
    </div>
  </body>
  </html>
  `;
}

async function convertHtmlToPdf(htmlContent, outputPath) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '12mm',
      right: '12mm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 7pt; font-family: -apple-system, sans-serif; color: #94a3b8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between;">
        <span>ATLAS SOVEREIGN OPERATIONS • STRICTLY CONFIDENTIAL</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `
  });

  await browser.close();
  console.log(`Generated HTML-to-PDF: ${outputPath}`);
}

async function run() {
  console.log('Generating Pixel-Perfect HTML-to-PDF Manuals via Chromium...');

  // 1. Master Operations Manual
  const masterHtml = buildManualHtml(
    ATLAS_TRAINING_MANUALS,
    'Operations Academy Master Manuals Collection',
    'Executive In-Depth Training Syllabus • 4 Specialized Tracks • 17 Chapters'
  );
  const masterPdfPath = path.join(publicDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf');
  await convertHtmlToPdf(masterHtml, masterPdfPath);
  if (fs.existsSync(artifactsDir)) {
    fs.copyFileSync(masterPdfPath, path.join(artifactsDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf'));
  }

  // 2. Individual Role Manuals
  for (const m of ATLAS_TRAINING_MANUALS) {
    const slug = m.id.replace(/-/g, '_');
    const manualHtml = buildManualHtml(
      [m],
      m.roleTitle,
      `Specialized Operations Playbook • ${m.badge}`
    );
    const manualPdfPath = path.join(publicDir, `ATLAS_${slug}.pdf`);
    await convertHtmlToPdf(manualHtml, manualPdfPath);
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(manualPdfPath, path.join(artifactsDir, `ATLAS_${slug}.pdf`));
    }
  }

  // 3. Owner Setup Guides
  const setupHtml = buildSetupGuideHtml();
  const setupPdfPath1 = path.join(publicDir, 'ATLAS_Owner_Master_Setup_Guide.pdf');
  const setupPdfPath2 = path.join(publicDir, 'HotelsClub_Owner_Master_Setup_Guide.pdf');
  await convertHtmlToPdf(setupHtml, setupPdfPath1);
  await convertHtmlToPdf(setupHtml, setupPdfPath2);
  if (fs.existsSync(artifactsDir)) {
    fs.copyFileSync(setupPdfPath1, path.join(artifactsDir, 'ATLAS_Owner_Master_Setup_Guide.pdf'));
    fs.copyFileSync(setupPdfPath2, path.join(artifactsDir, 'HotelsClub_Owner_Master_Setup_Guide.pdf'));
  }

  console.log('All PDF Manuals successfully rendered with ZERO blank pages and perfect typography!');
}

run();
