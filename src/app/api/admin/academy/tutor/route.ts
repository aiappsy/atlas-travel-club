import { NextRequest, NextResponse } from 'next/server';
import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';

export async function POST(req: NextRequest) {
  try {
    const { role = 'network-integrations-manual', prompt = '', chapterId } = await req.json();
    const query = (prompt || '').toLowerCase().trim();

    // Find the relevant manual
    const activeManual = ATLAS_TRAINING_MANUALS.find(
      (m) => m.id === role || m.roleTitle.toLowerCase().includes(role.toLowerCase())
    ) || ATLAS_TRAINING_MANUALS[0];

    let tutorResponse = '';

    // ==============================================================
    // 1. NETWORK & THIRD-PARTY INTEGRATIONS SPECIALIST MENTOR
    // ==============================================================
    if (activeManual.id === 'network-integrations-manual') {
      if (query.includes('stripe') || query.includes('issuing') || query.includes('card') || query.includes('marqeta')) {
        tutorResponse = `💳 **AI Integrations Tutor: Stripe Issuing & Prepaid Card Infrastructure**

Here is your exact step-by-step implementation guide:

1. **Stripe Corporate KYC**:
   - Register at \`dashboard.stripe.com\` under the corporate entity.
   - Submit Certificate of Incorporation, Tax EIN, and Beneficial Ownership disclosures.
   - Navigate to **Cards > Issuing** and submit an Issuing commercial activation request.

2. **API Keys & Webhooks**:
   - Set \`STRIPE_SECRET_KEY=sk_live_...\` and \`STRIPE_ISSUING_WEBHOOK_SECRET=whsec_...\` in \`.env.local\`.
   - Register webhook endpoint: \`https://atlasclub.vip/api/webhooks/stripe\`.
   - Subscribe to events: \`issuing_authorization.request\`, \`issuing_card.created\`, and \`payment_intent.succeeded\`.

3. **Funding & Spend Controls**:
   - Link operating bank via ACH/Fedwire for auto-reload balance.
   - Set maximum single-transaction limits (e.g. $10,000 per swipe) and block non-travel MCC codes if desired.

💡 **Quick Quiz Question**: Why do we use real-time webhooks on \`issuing_authorization.request\` instead of asynchronous transaction events?
*(Answer: To approve/decline spending authorization in under 1,500ms based on the member's live Sovereign Vault balance!)*`;
      } else if (query.includes('hotelbeds') || query.includes('webbeds') || query.includes('bedbank') || query.includes('supplier') || query.includes('wholesale')) {
        tutorResponse = `🏨 **AI Integrations Tutor: B2B Bedbank Onboarding & Wholesale Pipeline**

Here is your deployment protocol:

1. **Hotelbeds APItude Onboarding**:
   - Portal: [developer.hotelbeds.com](https://developer.hotelbeds.com)
   - Subscribe to **Hotel Booking API v1.0** and **Hotel Content API**.
   - Note down: \`HOTELBEDS_API_KEY\` and \`HOTELBEDS_SECRET\` (SHA256 signature generated dynamically).

2. **WebBeds (Sunhotels / Totalstay)**:
   - Portal: [webbeds.com](https://webbeds.com)
   - Secure XML/JSON gateway endpoints and request server IP whitelisting.

3. **Rate Parity Non-Disclosure Protocol**:
   - **CRITICAL COMPLIANCE**: Never expose raw wholesale supplier net rates to public unauthenticated scrapers.
   - Always gate booking endpoints behind authenticated member JWT session tokens.

💡 **Pro-Tip**: Use the **Wholesale Gateways Tab** in the Admin Console to test API response latency. We target < 1,800ms for hotel searches.`;
      } else if (query.includes('apple') || query.includes('google') || query.includes('wallet') || query.includes('pass') || query.includes('.pkpass')) {
        tutorResponse = `📱 **AI Integrations Tutor: Apple Wallet & Google Pay Pass Generation**

Here is the setup walkthrough:

1. **Apple PassKit (.pkpass)**:
   - Create Pass Type ID: \`pass.com.atlas.membercard\` in Apple Developer Portal.
   - Generate Pass Signing Certificate (.p12) and convert to PEM format.
   - Set \`APPLE_PASS_CERT_PEM\` and \`APPLE_PASS_KEY_PEM\` in Admin Console.
   - Endpoint \`/api/cards/wallet-pass?format=apple\` returns dynamic cryptographic .pkpass.

2. **Google Wallet (Google Pay Passes)**:
   - Enable Google Wallet API in Google Cloud Console.
   - Create Issuer ID in Google Pay & Wallet Business Console.
   - Provision Service Account Key JSON.

3. **NFC Tap Credentials**:
   - PassKit payload embeds encrypted NFC payload for contactless VIP lounge and concierge check-in.`;
      } else if (query.includes('telegram') || query.includes('whatsapp') || query.includes('webhook') || query.includes('messaging')) {
        tutorResponse = `💬 **AI Integrations Tutor: VIP Telegram & WhatsApp Webhook Bridge**

1. **Telegram VIP Concierge**:
   - Bot Token from \`@BotFather\`.
   - Set Webhook: \`https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://atlasclub.vip/api/concierge/telegram\`
   - Endpoint handles inbound VIP requests, queries Gemini, and responds in under 800ms.

2. **WhatsApp Cloud API**:
   - Create App in Meta Developer Portal > WhatsApp > Quickstart.
   - Register Webhook Callback: \`https://atlasclub.vip/api/concierge/whatsapp\` with verification token.
   - Auto-responds to member inquiries with direct wholesale hotel links and PDF vouchers.`;
      } else {
        tutorResponse = `🔧 **AI Integrations Tutor: Network & Partner Support**

I am your dedicated technical integrations mentor for ATLAS. I can assist you with:
- **Stripe Issuing & Banking**: Corporate KYC, API keys, Webhooks, Spend Controls.
- **B2B Bedbanks**: Hotelbeds APItude, WebBeds, Travelpayouts, Rate Parity rules.
- **Digital Nomad Partners**: Sherpa Visa API, iVisa, Wise Business payouts, GigSky eSIM.
- **Luxury Verticals**: LunaJets private aviation webhooks, Boatsetter yacht charter API, AirHelp claims.
- **Mobile Wallets & Messaging**: Apple Wallet PassKit (.pkpass), Google Wallet, Telegram & WhatsApp VIP bridges.

What specific integration or supplier account would you like me to walk you through right now?`;
      }
    }

    // ==============================================================
    // 2. JUNIOR SOFTWARE ENGINEER & TECH OPS MENTOR
    // ==============================================================
    else if (activeManual.id === 'junior-dev-tech-ops-manual') {
      if (query.includes('adapter') || query.includes('hotel') || query.includes('provider') || query.includes('interface')) {
        tutorResponse = `💻 **AI Engineer Tutor: Implementing a Hotel Supplier Adapter**

To connect a new hotel wholesaler, implement the standard \`HotelSupplierAdapter\` interface:

\`\`\`typescript
// src/lib/adapters/mySupplierAdapter.ts
export interface HotelSupplierAdapter {
  supplierId: string;
  name: string;
  searchHotels(query: HotelSearchQuery): Promise<HotelOffer[]>;
  getHotelDetails(hotelId: string): Promise<HotelDetails>;
  verifyRateParity(hotelId: string, wholesaleRate: number): Promise<RateParityCheck>;
  createBooking(bookingRequest: BookingPayload): Promise<BookingConfirmation>;
}
\`\`\`

**Key Implementation Rules**:
1. Always normalize supplier room rates to Base USD before applying \`CurrencyContext\` conversions.
2. Calculate savings spread: \`savingsUsd = Math.max(0, publicOtaAvg - wholesaleNetRate)\`.
3. Wrap upstream HTTP calls with a 3,500ms timeout promise race to prevent blocking the UI.
4. Export and register your adapter inside \`src/lib/hotelData.ts\`.`;
      } else if (query.includes('pdf') || query.includes('voucher') || query.includes('qr') || query.includes('booking')) {
        tutorResponse = `📄 **AI Engineer Tutor: Wholesale PDF Voucher & QR Engine**

The B2B Voucher Generator is located at \`src/app/api/bookings/voucher/route.ts\`:

1. **How It Works**:
   - Takes \`bookingId\` or JSON booking payload.
   - Builds a responsive, high-contrast HTML document with SVG QR code.
   - Embeds the official B2B Bedbank supplier reference (e.g. \`HB-9982410-X\`).
   - Embeds the **Wholesale Rate Parity Non-Disclosure Disclaimer** to prevent unauthorized commercial rate re-publishing.

2. **Triggering Client-Side Download / Print**:
   \`\`\`typescript
   window.open('/api/bookings/voucher?bookingId=' + bookingId, '_blank');
   \`\`\`
   The printable window includes CSS \`@media print\` rules for crisp standard A4 voucher output.`;
      } else if (query.includes('build') || query.includes('deploy') || query.includes('error') || query.includes('tsc')) {
        tutorResponse = `🚀 **AI Engineer Tutor: Deployment & Build Verification**

1. **Zero-Error Build Pipeline**:
   - Always run \`npm run build\` before submitting PRs or pushing to \`master\`.
   - Next.js performs static page generation across all 44+ routes and TypeScript checks.

2. **Key App Router Gotcha**:
   - In Next.js App Router \`route.ts\` files, do **NOT** export arbitrary helper functions with \`export const helper = ...\` because Next.js treats named exports as HTTP methods (GET, POST, PUT, DELETE). Use internal \`const helper = ...\`.

3. **Environment Checklist**:
   - \`GEMINI_API_KEY\`
   - \`STRIPE_SECRET_KEY\`
   - \`NEXT_PUBLIC_APP_URL\`
   - \`TELEGRAM_BOT_TOKEN\``;
      } else {
        tutorResponse = `⚡ **AI Engineer Tutor: Software Architecture & Tech Ops**

I am your technical mentor for the ATLAS codebase. I can help you with:
- **Next.js 14 App Router**: Layouts, Server vs Client components, API route patterns.
- **Supplier Adapters**: Implementing \`HotelSupplierAdapter\`, normalizing currency spreads.
- **State Management**: \`CurrencyContext.tsx\` multi-currency conversion, \`AuthContext.tsx\` tier gating.
- **Voucher & QR Pipeline**: Headless PDF generation, SVG QR encoding, print styling.
- **Resiliency**: Idempotency keys, timeout fallbacks, rate limiting, and CI/CD builds.

What code or architectural pattern would you like to explore or debug?`;
      }
    }

    // ==============================================================
    // 3. GENERAL APP & PLATFORM OPERATIONS MANAGER MENTOR
    // ==============================================================
    else if (activeManual.id === 'platform-operations-manual') {
      if (query.includes('morning') || query.includes('health') || query.includes('runbook') || query.includes('08:00') || query.includes('daily')) {
        tutorResponse = `📋 **AI Operations Mentor: Daily 08:00 UTC Runbook**

Execute this mandatory 5-step morning checklist:

1. **System Health Check (Admin > System Health Tab)**:
   - Ensure all 20+ API gateway ping statuses are green (< 200ms latency).
2. **Wholesale Rate Parity Audit**:
   - Review automated price comparison scans. Verify that wholesale spreads are between 15% and 70% below public OTAs.
3. **Overnight Booking Reconciliation**:
   - Verify all bookings have an official B2B Bedbank confirmation voucher generated.
4. **Stripe Issuing Balance Sentinel**:
   - Verify card pool balance is above $50,000 threshold for member card authorizations.
5. **VIP Concierge Queue**:
   - Inspect unresolved Telegram and WhatsApp member requests. Ensure 100% response rate within 15 minutes.`;
      } else if (query.includes('dividend') || query.includes('vault') || query.includes('sovereign') || query.includes('payout') || query.includes('profit')) {
        tutorResponse = `💰 **AI Operations Mentor: Sovereign Vault Dividends & Batch Payouts**

**The 20% Profit Distribution Formula**:
\`\`\`
Member Dividend = (Member Annual Spend / Total Club Member Spend) * 20% Net Annual Profit Vault
\`\`\`

**Execution Steps in Admin Console**:
1. Open **Sovereign Vault Manager** tab.
2. Click **"Run Quarterly Audit Calculation"** to generate qualifying member share weights.
3. Review audit table of recipients.
4. Choose payout destination:
   - **Instant Card Reload**: Credits directly to the member's ATLAS Visa card balance (0% fee).
   - **Wise / Stripe Batch Transfer**: Dispatches bank ACH/SEPA transfer directly to the member's linked account.`;
      } else if (query.includes('metal') || query.includes('card') || query.includes('fulfillment') || query.includes('shipping') || query.includes('engrav')) {
        tutorResponse = `💳 **AI Operations Mentor: Metal Visa Card Fulfillment Dispatch**

**Card Specifications**:
- 18-gram Matte Black Stainless Steel with Dual-Interface NFC Chip.

**Fulfillment Steps**:
1. Navigate to Admin Console > **Prepaid Card Manager**.
2. Filter by status: \`Pending Fulfillment\`.
3. Validate member legal name spelling and international shipping address.
4. Export batch laser-engraving manifest for manufacturing partner.
5. Once dispatched, attach DHL Express / FedEx tracking code to the member record to trigger delivery tracking SMS/email.`;
      } else if (query.includes('pruvo') || query.includes('refund') || query.includes('price drop') || query.includes('dispute')) {
        tutorResponse = `📉 **AI Operations Mentor: Pruvo Price Drop Audits & Dispute Escalation**

1. **Pruvo Price Drop Rebooking**:
   - When Pruvo detects a lower wholesale rate for an existing reservation, review the savings delta.
   - Confirm old booking is within free cancellation window.
   - Rebook at lower rate; allocate 50% savings to member's wallet and 50% to Sovereign Vault.

2. **Hotel Check-In Front Desk Disputes**:
   - If hotel front desk cannot find a guest name:
   - Instruct the receptionist to look under the **B2B Bedbank Master Allotment** (e.g., Hotelbeds / WebBeds reference code on the member's PDF voucher), rather than direct consumer retail.`;
      } else {
        tutorResponse = `🛡️ **AI Operations Mentor: Platform Management & Runbooks**

I am your operational supervisor for ATLAS. I can assist you with:
- **Daily Operations**: 08:00 UTC morning health inspections and API checks.
- **Sovereign Vault**: 20% profit pool calculations, member weighting, and batch dividend payouts.
- **Metal Visa Cards**: Laser-engraving dispatch, VIP tier provisioning, and shipping tracking.
- **Price Drops & Audits**: Pruvo automated rebooking, refund split processing.
- **VIP Customer Support**: Front desk check-in voucher resolutions and rate parity disputes.

What operational procedure or task would you like to review?`;
      }
    }

    // ==============================================================
    // 4. CHIEF MARKETING OFFICER & GROWTH LEAD MENTOR
    // ==============================================================
    else {
      if (query.includes('ad') || query.includes('script') || query.includes('tiktok') || query.includes('meta') || query.includes('creative') || query.includes('hook')) {
        tutorResponse = `🎬 **AI CMO Mentor: High-Converting Video Ad Blueprint**

**The Split-Screen Comparison Video (Target ROAS: 3.8x+)**:

- **Visual Frame**: Left side shows Expedia checkout screen ($1,167), Right side shows ATLAS wholesale checkout screen ($472) for The Bellagio Las Vegas.
- **Hook (0-3s)**: *"Stop booking hotels on public travel sites. You are literally paying a 40% TV advertising tax."*
- **Story (3-15s)**: *"Public sites have legal 'Rate Parity' rules that prevent them from dropping prices. But 5-star hotels quietly dump empty suites into private wholesale bedbanks for up to 70% off. Until now, only travel insiders had access."*
- **Proof (15-28s)**: *"Look at Grand Hotel Oslo: $680 on Booking.com vs $310 on ATLAS. That's $370 saved on a single night."*
- **Call-to-Action (28-40s)**: *"ATLAS gives you raw wholesale rates with 0% retail markup, plus a matte black metal Visa card that reloads with cash dividends. Claim your invite code below!"*`;
      } else if (query.includes('parity') || query.includes('legal') || query.includes('compliance') || query.includes('rules') || query.includes('ftc')) {
        tutorResponse = `⚖️ **AI CMO Mentor: Rate Parity Legal Advertising Guardrails**

To remain 100% legally compliant with global hotel franchise agreements and bedbank licenses:

1. **Closed-Loop Gating**:
   - You **must** position ATLAS as a private subscription club (like Costco for luxury travel).
   - Public ads may display audit savings percentages and sample comparisons, but specific live checkout links must require user authentication.

2. **Accurate Terminology**:
   - Use: *"Closed-Loop Wholesale Club"*, *"0% Retail Markup"*, *"Raw Bedbank Rates"*.
   - Avoid: Stating hotels are breaking contracts (they aren't; wholesale allotments are standard B2B distribution).

3. **FinTech Differentiators**:
   - Always feature the physical metal Visa card and Sovereign Vault cash dividends to emphasize that ATLAS is an ecosystem, not just another OTA.`;
      } else if (query.includes('cac') || query.includes('ltv') || query.includes('economics') || query.includes('referral') || query.includes('growth')) {
        tutorResponse = `📊 **AI CMO Mentor: Unit Economics & Viral Referral Engines**

**Platform Unit Economics**:
- **Target CAC**: $85 - $120 across Meta, TikTok, and Search.
- **Annual Subscription Price**: $499 (VIP Tier) / $1,499 (Patron Tier).
- **Annual Booking GMV per Member**: $8,400.
- **3-Year Customer LTV**: $2,850+.
- **LTV:CAC Ratio**: ~24:1.

**Dual-Sided Referral Viral Loop**:
- Referring member receives: **$100 instant reload on their ATLAS Visa card**.
- Referred member receives: **$100 hotel booking credit** upon joining.
- Viral K-Factor target: 0.42 organic member invites per active user.`;
      } else {
        tutorResponse = `🚀 **AI CMO Mentor: Growth, Marketing & Acquisition Strategy**

I am your growth marketing advisor for ATLAS. I can assist you with:
- **Campaign Strategy**: Persona targeting (Digital Nomads, Ultra-HNW VIPs, Luxury Families).
- **Creative Playbooks**: High-converting TikTok/Reels hooks, Meta static copy, Google Search intent ads.
- **Legal Compliance**: Rate Parity closed-loop advertising rules and FTC/EU compliance.
- **Unit Economics**: CAC/LTV payback models, subscription pricing, and viral referral loops.
- **Investor & Partner Collateral**: High-ticket B2B pitch decks and institutional prospectuses.

What marketing channel, creative campaign, or metric would you like to optimize?`;
      }
    }

    return NextResponse.json({
      success: true,
      role: activeManual.id,
      roleTitle: activeManual.roleTitle,
      tutorResponse
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to generate tutor response' },
      { status: 500 }
    );
  }
}
