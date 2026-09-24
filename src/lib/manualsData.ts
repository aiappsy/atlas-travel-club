export interface ManualChapter {
  id: string;
  title: string;
  readingTimeMinutes: number;
  content: string;
  actionChecklist: string[];
}

export interface TrainingManual {
  id: string;
  roleTitle: string;
  badge: string;
  iconName: string;
  targetAudience: string;
  summary: string;
  chapters: ManualChapter[];
}

export const ATLAS_TRAINING_MANUALS: TrainingManual[] = [
  {
    "id": "network-integrations-manual",
    "roleTitle": "Network & Third-Party Integrations Specialist",
    "badge": "Integrations & API Onboarding",
    "iconName": "Network",
    "targetAudience": "Operations leads, partnership managers, and technical integration specialists responsible for onboarding third-party services and APIs.",
    "summary": "The definitive master handbook for establishing corporate accounts, passing KYC/AML verifications, generating production API keys, configuring webhooks, and testing integrations across all 20+ ATLAS B2B suppliers.",
    "chapters": [
      {
        "id": "stripe-issuing-setup",
        "title": "Chapter 1: Stripe Issuing, Card Acquiring & Banking Gateway",
        "readingTimeMinutes": 12,
        "content": "### 1.1 Stripe Issuing Architecture Overview\nATLAS provides co-branded reloadable Visa cards to VIP and Patron members. These cards are powered by Stripe Issuing (with Marqeta as an enterprise secondary fallback).\n\n### 1.2 Account Setup & Corporate KYC Checklist\n1. Navigate to [dashboard.stripe.com/register](https://dashboard.stripe.com/register) and register an account under the ATLAS corporate entity.\n2. Complete business identity verification (EIN/tax ID, Certificate of Incorporation, Articles of Association, and Beneficial Ownership disclosures).\n3. In the Stripe Dashboard, request access to **Stripe Issuing** (Cards > Issuing > Request Access).\n4. Define your card funding account (connect your operating bank account via ACH/Fedwire).\n\n### 1.3 Key Extraction & Environment Configuration\nIn Stripe Dashboard > Developers > API Keys:\n- **Publishable Key**: `pk_live_...`\n- **Secret Key**: `sk_live_...`\n- **Issuing Webhook Secret**: `whsec_...`\n\nConfigure these in the ATLAS Admin Console under the **Visa Prepaid Manager** tab or in `.env.local`:\n```env\nSTRIPE_SECRET_KEY=sk_live_51P9824StripeIssuingKey...\nSTRIPE_PUBLISHABLE_KEY=pk_live_51P9824StripePublishable...\nSTRIPE_ISSUING_WEBHOOK_SECRET=whsec_99418247019284...\n```\n\n### 1.4 Webhook Endpoints to Register\nRegister the following webhook in Stripe Dashboard > Developers > Webhooks:\n- **Endpoint URL**: `https://atlasclub.vip/api/webhooks/stripe`\n- **Events to Listen For**:\n  - `issuing_authorization.request` (Real-time spend control and balance checks)\n  - `issuing_card.created` (Instant virtual card generation)\n  - `issuing_transaction.created` (Post-settlement debit tracking)\n  - `payment_intent.succeeded` (Membership subscription & wallet top-up confirmations)",
        "actionChecklist": [
          "Submit corporate KYC documents to Stripe Issuing team",
          "Provision Issuing balance funding account",
          "Deploy webhook handler to /api/webhooks/stripe",
          "Verify test transaction in sandbox before switching to live mode"
        ]
      },
      {
        "id": "b2b-bedbanks-setup",
        "title": "Chapter 2: B2B Bedbanks & Direct Wholesalers",
        "readingTimeMinutes": 15,
        "content": "### 2.1 Wholesale Travel Supply Chain Overview\nPublic Online Travel Agencies (OTAs like Expedia and Booking.com) mark up hotel room rates by 25% to 40% to cover massive advertising budgets. ATLAS accesses closed-loop B2B bedbanks that distribute wholesale room allotments directly from hotel chains.\n\n### 2.2 Supplier Account Onboarding\n1. **Hotelbeds (APItude)**:\n   - Register for a Developer / B2B Commercial Account at [developer.hotelbeds.com](https://developer.hotelbeds.com).\n   - Request **APItude Hotel Booking API** and **Hotel Content API** credentials.\n   - Extract `HOTELBEDS_API_KEY` and `HOTELBEDS_SECRET`.\n2. **WebBeds (Sunhotels / Totalstay)**:\n   - Apply for B2B API distribution access at [webbeds.com](https://webbeds.com).\n   - Secure XML/JSON gateway endpoints, Client ID, and Authentication Hash.\n3. **Travelpayouts / Aviasales Data API**:\n   - Register on [travelpayouts.com](https://travelpayouts.com).\n   - Enable the Flights & Hotels Data API tokens.\n\n### 2.3 Rate Parity Non-Disclosure Protocol\n- Bedbank contracts require wholesale rates to be presented strictly inside an authenticated, password-protected member environment.\n- **NEVER** expose raw wholesale supplier identifiers or unauthenticated direct booking links to public search engine scrapers.",
        "actionChecklist": [
          "Complete Hotelbeds APItude commercial agreement",
          "Secure WebBeds API keys and whitelist server IP addresses",
          "Store API tokens in Admin Console Wholesale Gateways tab",
          "Verify rate comparison engine returns live wholesale spreads"
        ]
      },
      {
        "id": "digital-nomad-ecosystem",
        "title": "Chapter 3: Digital Nomad Infrastructure Partners",
        "readingTimeMinutes": 10,
        "content": "### 3.1 Nomad Ecosystem Partner Portfolio\nATLAS integrates seamlessly with specialized digital nomad providers to offer a complete travel operating system:\n1. **Sherpa & iVisa API**: Automated visa requirement lookup and digital nomad visa application processing.\n2. **Outsite & Selina Coliving**: Direct member discounts and guaranteed room availability at top remote-work hubs.\n3. **Wise Business API**: Instant multi-currency FX conversion and global affiliate dividend distribution.\n4. **GigSky & Airalo eSIM API**: Programmatic 5G high-speed global data eSIM provisioning upon booking confirmation.\n\n### 3.2 Key Setup Steps\n- Configure the Sherpa Widget API Key in `.env.local` under `SHERPA_API_KEY`.\n- Integrate Wise Payout Batch API with OAuth2 client credentials for automated member dividend dispatch.",
        "actionChecklist": [
          "Generate Sherpa Travel Visa API sandbox & live credentials",
          "Set up Wise Multi-Currency Business account and API tokens",
          "Configure eSIM provisioning webhooks for automatic delivery"
        ]
      },
      {
        "id": "luxury-charter-protection",
        "title": "Chapter 4: Luxury Verticals, Charter & Travel Protection",
        "readingTimeMinutes": 12,
        "content": "### 4.1 Private Aviation & Maritime Webhooks\n1. **LunaJets & Victor Private Jet Brokerage**:\n   - Webhook endpoint: `/api/concierge/private-jet`\n   - Dispatches empty-leg alerts directly to VIP Telegram and WhatsApp channels.\n2. **Boatsetter & Burgess Yacht Charters**:\n   - Embedded concierge booking request pipeline for superyacht rentals in Monaco, Miami, Dubai, and the Caribbean.\n\n### 4.2 Automated Price-Drop & Flight Disruption Protection\n1. **Pruvo Price Drop Engine**:\n   - Automatically monitors booked hotel reservations 24/7. When prices drop prior to free cancellation deadlines, automatically rebooks at the lower rate and deposits 50% of the delta into the member's Sovereign Vault.\n2. **AirHelp & SafetyWing Nomad Insurance**:\n   - Automatic flight delay claim filing (up to $650 per delayed flight) and global medical insurance integration.",
        "actionChecklist": [
          "Establish LunaJets VIP partner affiliate desk",
          "Enable Pruvo post-booking tracking webhook",
          "Configure AirHelp claims dispatch gateway"
        ]
      },
      {
        "id": "apple-google-wallet-messaging",
        "title": "Chapter 5: Apple Wallet, Google Pay & VIP Webhook Bridges",
        "readingTimeMinutes": 14,
        "content": "### 5.1 Apple Wallet (.pkpass) PassKit Setup\n1. Register an Apple Developer Team Account at [developer.apple.com](https://developer.apple.com).\n2. Navigate to **Certificates, Identifiers & Profiles** > **Pass Type IDs**.\n3. Create Pass Type ID: `pass.com.atlas.membercard`.\n4. Generate a Pass Signing Certificate and convert to PEM format with private key.\n5. Export `APPLE_PASS_CERT_PEM`, `APPLE_PASS_KEY_PEM`, and `APPLE_PASS_WWDR_PEM`.\n\n### 5.2 Google Wallet Pass Setup\n1. Create a Google Cloud Project and enable Google Wallet API.\n2. Register a Google Pay & Wallet Business Console Issuer ID.\n3. Generate a Service Account key JSON and set as `GOOGLE_WALLET_SERVICE_ACCOUNT_KEY`.\n\n### 5.3 VIP Concierge Telegram & WhatsApp Webhooks\n- **Telegram Bot**: Obtain token from `@BotFather` and configure webhook:\n  `https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://atlasclub.vip/api/concierge/telegram`\n- **WhatsApp Cloud API**: Configure Meta Developer App with WhatsApp Product and point webhook to `/api/concierge/whatsapp`.",
        "actionChecklist": [
          "Generate Apple PassKit certificates & register Pass Type ID",
          "Configure Google Wallet Issuer ID & Service Account",
          "Deploy Telegram VIP Concierge bot and verify message forwarding",
          "Verify WhatsApp Cloud API webhook handshake and verify token"
        ]
      }
    ]
  },
  {
    "id": "junior-dev-tech-ops-manual",
    "roleTitle": "Junior Software Engineer & Technical Operations",
    "badge": "Software Architecture & Next.js 14",
    "iconName": "Code",
    "targetAudience": "Software engineers, frontend/full-stack developers, and technical support staff responsible for maintaining and extending the ATLAS codebase.",
    "summary": "The comprehensive engineering guide to the Next.js 14 App Router architecture, TypeScript models, state management, hotel supplier adapters, PDF generator engines, and CI/CD pipelines.",
    "chapters": [
      {
        "id": "architecture-overview",
        "title": "Chapter 1: Architecture Overview & Next.js 14 App Router",
        "readingTimeMinutes": 15,
        "content": "### 1.1 Tech Stack Summary\n- **Framework**: Next.js 14.2+ (App Router architecture)\n- **Language**: TypeScript (Strict mode enabled)\n- **Styling**: Tailwind CSS with custom luxury color palette (`amber-400`, `slate-900`, `emerald-400`)\n- **Icons**: Lucide React\n- **AI Integration**: Google Gemini API via `@google/genai`\n- **State Management**: React Contexts (`AuthContext.tsx`, `CurrencyContext.tsx`)\n\n### 1.2 Directory Structure\n```\nsrc/\n├── app/\n│   ├── layout.tsx             # Root layout with Currency & Auth Providers\n│   ├── page.tsx               # High-converting luxury public landing page\n│   ├── admin/page.tsx         # Comprehensive multi-tab operations console\n│   ├── members/page.tsx       # Gated members-only luxury wholesale hub\n│   ├── api/\n│   │   ├── concierge/         # AI Concierge & VIP Webhook routes\n│   │   ├── bookings/          # Voucher generator & checkout APIs\n│   │   ├── cards/             # Apple/Google Wallet pass generation\n│   │   └── admin/             # Admin education & academy tutors\n├── components/                # Reusable UI components (Navbar, Modals, Cards)\n└── lib/                       # Business logic, mock datasets, and adapters\n```",
        "actionChecklist": [
          "Clone repository and install dependencies with npm install",
          "Run development server with npm run dev on port 3000/3005",
          "Inspect CurrencyContext and AuthContext state lifecycles",
          "Review TypeScript interfaces in src/lib/hotelData.ts"
        ]
      },
      {
        "id": "hotel-supplier-adapters",
        "title": "Chapter 2: Adding a New Hotel Supplier Adapter",
        "readingTimeMinutes": 18,
        "content": "### 2.1 The Unified Hotel Adapter Pattern\nAll hotel suppliers (Hotelbeds, WebBeds, Direct API, Scraped wholesale) must implement the unified `HotelSupplierAdapter` interface to ensure zero-breaking-change integration.\n\n```typescript\nexport interface HotelSupplierAdapter {\n  supplierId: string;\n  name: string;\n  searchHotels(query: HotelSearchQuery): Promise<HotelOffer[]>;\n  getHotelDetails(hotelId: string): Promise<HotelDetails>;\n  verifyRateParity(hotelId: string, wholesaleRate: number): Promise<RateParityCheck>;\n  createBooking(bookingRequest: BookingPayload): Promise<BookingConfirmation>;\n}\n```\n\n### 2.2 Adding a New Supplier Step-by-Step\n1. Create a new file in `src/lib/adapters/<supplierName>.ts`.\n2. Implement rate normalization (convert supplier raw currencies to base USD).\n3. Apply the ATLAS wholesale spread calculation:\n   `Savings = (Public OTAs Average - Wholesale Net Rate)`\n4. Register the adapter in `src/lib/hotelData.ts`.",
        "actionChecklist": [
          "Implement HotelSupplierAdapter interface for new supplier",
          "Add error handling and timeout fallbacks (max 3500ms)",
          "Write unit test for rate normalization across multi-currencies",
          "Register adapter in hotelData registry"
        ]
      },
      {
        "id": "pdf-voucher-engine",
        "title": "Chapter 3: Booking Pipeline & PDF Generation Engine",
        "readingTimeMinutes": 12,
        "content": "### 3.1 B2B Wholesale Voucher Anatomy\nWhen a member completes a reservation:\n1. The server generates a unique B2B Wholesale Voucher at `/api/bookings/voucher`.\n2. The voucher embeds:\n   - Official B2B Bedbank Confirmation Reference.\n   - Hotel address, check-in instructions, and meal plans.\n   - Dynamic QR code for instant front-desk verification.\n   - **Rate Parity Non-Disclosure Notice**: Legally protects the wholesale net rate from public disclosure.\n\n### 3.2 QR Code & PDF Rendering Pipeline\nThe API route constructs clean, print-ready HTML with embedded CSS and renders dynamic SVG QR codes directly without external binary dependencies.",
        "actionChecklist": [
          "Test voucher generation at /api/bookings/voucher?bookingId=ATL-9842",
          "Verify QR code scans accurately to the member verification URL",
          "Confirm Rate Parity legal disclaimer renders on all voucher outputs"
        ]
      },
      {
        "id": "debugging-resiliency",
        "title": "Chapter 4: Debugging, Error Handling & API Resiliency",
        "readingTimeMinutes": 14,
        "content": "### 4.1 Resiliency Best Practices\n1. **Idempotency Keys**: All financial transactions (card reloads, dividend payouts) must pass a UUID idempotency key to prevent double charging.\n2. **Graceful Fallbacks**: If a bedbank API times out (>4s), the search engine gracefully falls back to cached inventory or secondary suppliers without crashing the UI.\n3. **Structured Error Responses**: All API routes must return consistent JSON:\n   ```json\n   { \"error\": true, \"message\": \"User friendly message\", \"code\": \"SUPPLIER_TIMEOUT\" }\n   ```",
        "actionChecklist": [
          "Audit all API routes for structured try/catch blocks",
          "Verify idempotency key validation on payment endpoints",
          "Monitor Next.js server logs for uncaught promise rejections"
        ]
      },
      {
        "id": "deployment-cicd",
        "title": "Chapter 5: Deployment, Environment Variables & CI/CD",
        "readingTimeMinutes": 10,
        "content": "### 5.1 Deployment Pipeline\n- **Production Host**: Vercel / Google Cloud Run\n- **Source Control**: GitHub (`master` branch auto-deploys to production)\n- **Pre-Flight Check**: Always execute `npm run build` locally before pushing to ensure zero TypeScript errors or missing imports.\n\n### 5.2 Environment Variables Configuration\nEnsure all production environment variables are configured in the deployment dashboard (`GEMINI_API_KEY`, `STRIPE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, etc.).",
        "actionChecklist": [
          "Run npm run build and confirm clean 0-error output",
          "Verify environment variables in production settings",
          "Push code to master and confirm deployment success"
        ]
      }
    ]
  },
  {
    "id": "platform-operations-manual",
    "roleTitle": "General App & Platform Operations Manager",
    "badge": "Operations & Business Execution",
    "iconName": "ShieldCheck",
    "targetAudience": "General managers, operations directors, and customer support leads running daily ATLAS platform operations.",
    "summary": "The operational runbook for executing daily health checks, Sovereign Vault dividend calculations, metal card fulfillment dispatch, Pruvo price-drop refund audits, and VIP dispute escalation.",
    "chapters": [
      {
        "id": "daily-operations-runbook",
        "title": "Chapter 1: Daily Operations Runbook & Health Checks",
        "readingTimeMinutes": 12,
        "content": "### 1.1 08:00 UTC Morning Operational Checklist\nEvery morning, the Platform Operations Manager must execute the following 5-point health check:\n1. **API Gateway Status**: Verify all 20+ supplier health bars are green in the Admin Console.\n2. **Rate Parity Variance Audit**: Review automated price comparison scans. Ensure our wholesale rates are at least 15% to 60% below Expedia/Booking.com.\n3. **Booking Reconciliation**: Match reservations booked in ATLAS against bedbank supplier confirmations.\n4. **Stripe Issuing Balance**: Confirm operating balance has at least $50,000 for member card spending.\n5. **AI Concierge Audit**: Review unresolved VIP concierge tickets on Telegram and WhatsApp.",
        "actionChecklist": [
          "Open Admin Console at /admin and inspect System Health Tab",
          "Verify live FX exchange rates are updated",
          "Confirm all overnight bookings have confirmed B2B voucher numbers"
        ]
      },
      {
        "id": "sovereign-vault-dividends",
        "title": "Chapter 2: Sovereign Vault Dividend Calculations & Batch Payouts",
        "readingTimeMinutes": 16,
        "content": "### 2.1 The 20% Profit-Sharing Model\nUnlike public OTAs that pocket 100% of profits, ATLAS pools **20% of net company profits** into the Sovereign Dividend Vault to distribute back to members annually.\n\n### 2.2 Dividend Formula\n`Member Dividend = (Individual Annual Spend / Total Club Member Spend) * Total Vault Pool`\n\n### 2.3 Executing Batch Payouts\n1. In Admin Console > **Sovereign Vault Manager**:\n2. Click **\"Calculate Quarterly Allocations\"**.\n3. Review audit table of qualifying members and their dividend amounts.\n4. Click **\"Execute Batch Payout via Wise / Stripe\"** or deposit directly onto the member's ATLAS Visa card balance.",
        "actionChecklist": [
          "Run quarterly Sovereign Vault audit calculation",
          "Verify member wallet balances match transaction logs",
          "Execute batch dividend distribution and send push notifications"
        ]
      },
      {
        "id": "metal-card-fulfillment",
        "title": "Chapter 3: Metal Visa Card Fulfillment Dispatch & VIP Tiering",
        "readingTimeMinutes": 10,
        "content": "### 3.1 Physical Metal Card Specifications\n- **Material**: 18-gram Matte Black Stainless Steel with Laser-Etched Member Name & ID.\n- **NFC Technology**: Embedded dual-interface chip supporting contactless tap-to-pay and Apple/Google Wallet provisioning.\n\n### 3.2 Fulfillment Workflow\n1. When a member reaches VIP or Patron tier, a card production ticket is generated in Admin Console.\n2. Verify shipping address and member name spelling.\n3. Dispatch engraving payload to our manufacturing partner (CompoSecure / Idemia).\n4. Enter DHL / FedEx Express tracking number into the member record to trigger shipping notifications.",
        "actionChecklist": [
          "Review pending physical card dispatch requests in Admin Console",
          "Validate member shipping addresses and engraving text",
          "Assign courier tracking numbers and notify members"
        ]
      },
      {
        "id": "pruvo-refunds-and-disputes",
        "title": "Chapter 4: Pruvo Price-Drop Audits & Customer Support Escalations",
        "readingTimeMinutes": 14,
        "content": "### 4.1 Automated Price-Drop Refund Processing\n1. When Pruvo detects a lower rate for an existing reservation, the system automatically creates a rebooking request.\n2. The Operations Manager reviews the savings delta in Admin Console > **Price Drop Refunds**.\n3. Approve rebooking: Old reservation is cancelled (under free cancellation terms) and new reservation is confirmed.\n4. 50% of the savings is credited to the member's wallet, and 50% is added to the Sovereign Vault pool.\n\n### 4.2 Handling Check-in Inquiries\nIf a hotel front desk claims they cannot find a reservation under the member's name:\n- Explain that the reservation is booked through the wholesale B2B bedbank allotment (e.g., Hotelbeds / WebBeds).\n- Instruct the front desk agent to search by the **Bedbank Confirmation Reference Number** listed on the B2B Wholesale Voucher.",
        "actionChecklist": [
          "Audit pending Pruvo price-drop alerts and approve savings splits",
          "Provide immediate concierge support for check-in voucher inquiries",
          "Maintain 99.8% customer satisfaction rating on VIP support desk"
        ]
      }
    ]
  },
  {
    "id": "cmo-growth-manual",
    "roleTitle": "Chief Marketing Officer & Growth Lead",
    "badge": "Marketing, User Acquisition & Compliance",
    "iconName": "TrendingUp",
    "targetAudience": "Marketing directors, growth hackers, content creators, and media buyers leading member acquisition campaigns.",
    "summary": "The ultimate marketing blueprint detailing core value propositions, persona playbooks, high-converting ad scripts, rate parity closed-loop advertising rules, and CAC/LTV unit economics.",
    "chapters": [
      {
        "id": "personas-and-value-props",
        "title": "Chapter 1: Core Value Proposition & Persona Breakdowns",
        "readingTimeMinutes": 14,
        "content": "### 1.1 The Core Positioning\n**ATLAS is the world's first closed-loop private travel club that gives travelers direct access to wholesale luxury hotel rates (0% retail markup), a reloadable Visa card, and annual profit dividends.**\n\n### 1.2 Target Personas\n1. **The High-Earning Digital Nomad**:\n   - Spends 6-12 months abroad in luxury hotels and coliving spaces.\n   - Cares about: 5G eSIM, instant visa processing, reloadable multi-currency cards, and community.\n2. **The Ultra-High-Net-Worth VIP**:\n   - Books 5-star suites at Aman, Four Seasons, Bulgari, and luxury chalets in St. Moritz/Courchevel.\n   - Cares about: VIP airport fast-track immigration, private jet empty-legs, discreet concierge service.\n3. **The Frequent Luxury Family / Business Traveler**:\n   - Takes 4-8 luxury family vacations per year.\n   - Cares about: Transparent wholesale savings ($5,000+ saved per year) and post-booking price drop refunds.",
        "actionChecklist": [
          "Align ad creative variants to the 3 target personas",
          "Audit landing page copy for luxury high-converting messaging",
          "Deploy dedicated landing pages for Digital Nomads and VIPs"
        ]
      },
      {
        "id": "ad-scripts-and-playbooks",
        "title": "Chapter 2: High-Converting Ad Scripts & Creative Playbooks",
        "readingTimeMinutes": 15,
        "content": "### 2.1 TikTok / Instagram Reels Video Script (Hook-Story-Offer)\n**Visual**: Split-screen showing Expedia checkout screen ($1,167) on the left, and ATLAS wholesale screen ($472) on the right at The Bellagio Las Vegas.\n\n- **Hook (0:00 - 0:03)**: *\"Stop booking hotels on Expedia. You are literally getting charged a 40% TV ad tax.\"*\n- **Story (0:03 - 0:15)**: *\"Public travel sites have legal 'Rate Parity' contracts that force them to keep prices high. But luxury hotels quietly offload empty suites to wholesale B2B bedbanks at up to 70% off. Until now, only travel agents had access.\"*\n- **Proof (0:15 - 0:30)**: *\"Look at this: Grand Hotel Oslo on Booking.com is $680/night. On ATLAS, it's $310/night. That is $370 cash saved every single night.\"*\n- **Offer & CTA (0:30 - 0:45)**: *\"ATLAS gives you raw wholesale rates with 0% retail markup, plus a matte black metal Visa card that reloads with cash dividends. Tap the link to check your savings!\"*\n\n### 2.2 Meta Static Ad Copy Template\n**Headline**: The Closed-Loop Travel Club That Public OTAs Don't Want You to Know About.  \n**Body**:  \n🏨 0% Retail Markups on 1,000,000+ 5-Star Hotels  \n💳 Matte Black Reloadable Visa® with Annual Cash Dividends  \n🛂 Digital Nomad Visa Concierge & 5G Global eSIM  \n⚡ VIP Airport Fast-Track Immigration (Skip 2-hr lines)  \n👉 Join over 10,000+ members who never pay retail for luxury travel again.",
        "actionChecklist": [
          "Produce 3 versions of the split-screen comparison video",
          "Deploy Meta static carousel ads featuring real proof screenshots",
          "Track ROAS targeting a minimum 3.2x return on ad spend"
        ]
      },
      {
        "id": "rate-parity-compliance-marketing",
        "title": "Chapter 3: Rate Parity Legal Compliance in Advertising",
        "readingTimeMinutes": 10,
        "content": "### 3.1 Strict Closed-Loop Marketing Rules\nTo remain 100% compliant with global hotel franchise agreements and bedbank distribution licenses:\n1. **Never Display Exact Wholesale Rates Publicly Without a Gated Login**: The public homepage displays audit savings percentages and sample comparisons, but specific date booking checkouts require membership authentication.\n2. **Use the Term 'Closed-Loop Wholesale Club'**: Emphasize that ATLAS is a private subscription club (like Costco for luxury travel).\n3. **Highlight Value-Added FinTech**: Market the reloadable Visa card, annual profit vault dividends, and post-booking price drop refunds as core platform differentiators.",
        "actionChecklist": [
          "Review all external marketing copy for closed-loop compliance",
          "Ensure booking checkout links are gated behind member authentication",
          "Distribute Investor Prospectus to institutional travel partners"
        ]
      },
      {
        "id": "unit-economics-and-referrals",
        "title": "Chapter 4: Unit Economics, CAC/LTV & Member Referral Growth",
        "readingTimeMinutes": 14,
        "content": "### 4.1 Unit Economics Model\n- **Member Acquisition Cost (CAC)**: Target $85 - $120 per paying subscriber.\n- **Annual Membership Fee**: $499 / year (VIP Tier) or $1,499 / year (Patron Tier).\n- **Average Hotel Booking Volume per Member**: $8,400 / year.\n- **Lifetime Value (LTV, 3-Year Horizon)**: $2,850+ per member (including annual fee renewals and transaction fees).\n- **LTV to CAC Ratio**: ~24:1 (Exceptional SaaS & FinTech unit economics).\n\n### 4.2 Viral Dual-Sided Referral Program\n- When Member A refers Member B:\n  - Member B gets **$100 in instant hotel booking credit**.\n  - Member A receives **$100 reload directly onto their ATLAS Visa Card** once Member B joins.",
        "actionChecklist": [
          "Set up automated referral tracking links in member portal",
          "Monitor blended CAC across Meta, TikTok, and Google search",
          "Run monthly cohort retention analysis on membership renewals"
        ]
      }
    ]
  }
];
