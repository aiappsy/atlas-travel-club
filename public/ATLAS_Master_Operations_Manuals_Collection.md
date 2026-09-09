# ATLAS Master Operations Manuals & Training Collection (2026 Edition)

The complete training syllabus for ATLAS Travel & Sovereign Banking Club operations team.

# Section 1: Network & Third-Party Integrations Specialist
**Focus Area**: Integrations & API Onboarding
**Summary**: The definitive master handbook for establishing corporate accounts, passing KYC/AML verifications, generating production API keys, configuring webhooks, and testing integrations across all 20+ ATLAS B2B suppliers.

## Chapter 1: Stripe Issuing, Card Acquiring & Banking Gateway

### 1.1 Stripe Issuing Architecture Overview
ATLAS provides co-branded reloadable Visa cards to VIP and Patron members. These cards are powered by Stripe Issuing (with Marqeta as an enterprise secondary fallback).

### 1.2 Account Setup & Corporate KYC Checklist
1. Navigate to [dashboard.stripe.com/register](https://dashboard.stripe.com/register) and register an account under the ATLAS corporate entity.
2. Complete business identity verification (EIN/tax ID, Certificate of Incorporation, Articles of Association, and Beneficial Ownership disclosures).
3. In the Stripe Dashboard, request access to **Stripe Issuing** (Cards > Issuing > Request Access).
4. Define your card funding account (connect your operating bank account via ACH/Fedwire).

### 1.3 Key Extraction & Environment Configuration
In Stripe Dashboard > Developers > API Keys:
- **Publishable Key**: `pk_live_...`
- **Secret Key**: `sk_live_...`
- **Issuing Webhook Secret**: `whsec_...`

Configure these in the ATLAS Admin Console under the **Visa Prepaid Manager** tab or in `.env.local`:
```env
STRIPE_SECRET_KEY=sk_live_51P9824StripeIssuingKey...
STRIPE_PUBLISHABLE_KEY=pk_live_51P9824StripePublishable...
STRIPE_ISSUING_WEBHOOK_SECRET=whsec_99418247019284...
```

### 1.4 Webhook Endpoints to Register
Register the following webhook in Stripe Dashboard > Developers > Webhooks:
- **Endpoint URL**: `https://atlasclub.vip/api/webhooks/stripe`
- **Events to Listen For**:
  - `issuing_authorization.request` (Real-time spend control and balance checks)
  - `issuing_card.created` (Instant virtual card generation)
  - `issuing_transaction.created` (Post-settlement debit tracking)
  - `payment_intent.succeeded` (Membership subscription & wallet top-up confirmations)

### Action Checklist:
- [ ] Submit corporate KYC documents to Stripe Issuing team
- [ ] Provision Issuing balance funding account
- [ ] Deploy webhook handler to /api/webhooks/stripe
- [ ] Verify test transaction in sandbox before switching to live mode

## Chapter 2: B2B Bedbanks & Direct Wholesalers

### 2.1 Wholesale Travel Supply Chain Overview
Public Online Travel Agencies (OTAs like Expedia and Booking.com) mark up hotel room rates by 25% to 40% to cover massive advertising budgets. ATLAS accesses closed-loop B2B bedbanks that distribute wholesale room allotments directly from hotel chains.

### 2.2 Supplier Account Onboarding
1. **Hotelbeds (APItude)**:
   - Register for a Developer / B2B Commercial Account at [developer.hotelbeds.com](https://developer.hotelbeds.com).
   - Request **APItude Hotel Booking API** and **Hotel Content API** credentials.
   - Extract `HOTELBEDS_API_KEY` and `HOTELBEDS_SECRET`.
2. **WebBeds (Sunhotels / Totalstay)**:
   - Apply for B2B API distribution access at [webbeds.com](https://webbeds.com).
   - Secure XML/JSON gateway endpoints, Client ID, and Authentication Hash.
3. **Travelpayouts / Aviasales Data API**:
   - Register on [travelpayouts.com](https://travelpayouts.com).
   - Enable the Flights & Hotels Data API tokens.

### 2.3 Rate Parity Non-Disclosure Protocol
- Bedbank contracts require wholesale rates to be presented strictly inside an authenticated, password-protected member environment.
- **NEVER** expose raw wholesale supplier identifiers or unauthenticated direct booking links to public search engine scrapers.

### Action Checklist:
- [ ] Complete Hotelbeds APItude commercial agreement
- [ ] Secure WebBeds API keys and whitelist server IP addresses
- [ ] Store API tokens in Admin Console Wholesale Gateways tab
- [ ] Verify rate comparison engine returns live wholesale spreads

## Chapter 3: Digital Nomad Infrastructure Partners

### 3.1 Nomad Ecosystem Partner Portfolio
ATLAS integrates seamlessly with specialized digital nomad providers to offer a complete travel operating system:
1. **Sherpa & iVisa API**: Automated visa requirement lookup and digital nomad visa application processing.
2. **Outsite & Selina Coliving**: Direct member discounts and guaranteed room availability at top remote-work hubs.
3. **Wise Business API**: Instant multi-currency FX conversion and global affiliate dividend distribution.
4. **GigSky & Airalo eSIM API**: Programmatic 5G high-speed global data eSIM provisioning upon booking confirmation.

### 3.2 Key Setup Steps
- Configure the Sherpa Widget API Key in `.env.local` under `SHERPA_API_KEY`.
- Integrate Wise Payout Batch API with OAuth2 client credentials for automated member dividend dispatch.

### Action Checklist:
- [ ] Generate Sherpa Travel Visa API sandbox & live credentials
- [ ] Set up Wise Multi-Currency Business account and API tokens
- [ ] Configure eSIM provisioning webhooks for automatic delivery

## Chapter 4: Luxury Verticals, Charter & Travel Protection

### 4.1 Private Aviation & Maritime Webhooks
1. **LunaJets & Victor Private Jet Brokerage**:
   - Webhook endpoint: `/api/concierge/private-jet`
   - Dispatches empty-leg alerts directly to VIP Telegram and WhatsApp channels.
2. **Boatsetter & Burgess Yacht Charters**:
   - Embedded concierge booking request pipeline for superyacht rentals in Monaco, Miami, Dubai, and the Caribbean.

### 4.2 Automated Price-Drop & Flight Disruption Protection
1. **Pruvo Price Drop Engine**:
   - Automatically monitors booked hotel reservations 24/7. When prices drop prior to free cancellation deadlines, automatically rebooks at the lower rate and deposits 50% of the delta into the member's Sovereign Vault.
2. **AirHelp & SafetyWing Nomad Insurance**:
   - Automatic flight delay claim filing (up to $650 per delayed flight) and global medical insurance integration.

### Action Checklist:
- [ ] Establish LunaJets VIP partner affiliate desk
- [ ] Enable Pruvo post-booking tracking webhook
- [ ] Configure AirHelp claims dispatch gateway

## Chapter 5: Apple Wallet, Google Pay & VIP Webhook Bridges

### 5.1 Apple Wallet (.pkpass) PassKit Setup
1. Register an Apple Developer Team Account at [developer.apple.com](https://developer.apple.com).
2. Navigate to **Certificates, Identifiers & Profiles** > **Pass Type IDs**.
3. Create Pass Type ID: `pass.com.atlas.membercard`.
4. Generate a Pass Signing Certificate and convert to PEM format with private key.
5. Export `APPLE_PASS_CERT_PEM`, `APPLE_PASS_KEY_PEM`, and `APPLE_PASS_WWDR_PEM`.

### 5.2 Google Wallet Pass Setup
1. Create a Google Cloud Project and enable Google Wallet API.
2. Register a Google Pay & Wallet Business Console Issuer ID.
3. Generate a Service Account key JSON and set as `GOOGLE_WALLET_SERVICE_ACCOUNT_KEY`.

### 5.3 VIP Concierge Telegram & WhatsApp Webhooks
- **Telegram Bot**: Obtain token from `@BotFather` and configure webhook:
  `https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://atlasclub.vip/api/concierge/telegram`
- **WhatsApp Cloud API**: Configure Meta Developer App with WhatsApp Product and point webhook to `/api/concierge/whatsapp`.

### Action Checklist:
- [ ] Generate Apple PassKit certificates & register Pass Type ID
- [ ] Configure Google Wallet Issuer ID & Service Account
- [ ] Deploy Telegram VIP Concierge bot and verify message forwarding
- [ ] Verify WhatsApp Cloud API webhook handshake and verify token


---

# Section 2: Junior Software Engineer & Technical Operations
**Focus Area**: Software Architecture & Next.js 14
**Summary**: The comprehensive engineering guide to the Next.js 14 App Router architecture, TypeScript models, state management, hotel supplier adapters, PDF generator engines, and CI/CD pipelines.

## Chapter 1: Architecture Overview & Next.js 14 App Router

### 1.1 Tech Stack Summary
- **Framework**: Next.js 14.2+ (App Router architecture)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS with custom luxury color palette (`amber-400`, `slate-900`, `emerald-400`)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API via `@google/genai`
- **State Management**: React Contexts (`AuthContext.tsx`, `CurrencyContext.tsx`)

### 1.2 Directory Structure
```
src/
├── app/
│   ├── layout.tsx             # Root layout with Currency & Auth Providers
│   ├── page.tsx               # High-converting luxury public landing page
│   ├── admin/page.tsx         # Comprehensive multi-tab operations console
│   ├── members/page.tsx       # Gated members-only luxury wholesale hub
│   ├── api/
│   │   ├── concierge/         # AI Concierge & VIP Webhook routes
│   │   ├── bookings/          # Voucher generator & checkout APIs
│   │   ├── cards/             # Apple/Google Wallet pass generation
│   │   └── admin/             # Admin education & academy tutors
├── components/                # Reusable UI components (Navbar, Modals, Cards)
└── lib/                       # Business logic, mock datasets, and adapters
```

### Action Checklist:
- [ ] Clone repository and install dependencies with npm install
- [ ] Run development server with npm run dev on port 3000/3005
- [ ] Inspect CurrencyContext and AuthContext state lifecycles
- [ ] Review TypeScript interfaces in src/lib/hotelData.ts

## Chapter 2: Adding a New Hotel Supplier Adapter

### 2.1 The Unified Hotel Adapter Pattern
All hotel suppliers (Hotelbeds, WebBeds, Direct API, Scraped wholesale) must implement the unified `HotelSupplierAdapter` interface to ensure zero-breaking-change integration.

```typescript
export interface HotelSupplierAdapter {
  supplierId: string;
  name: string;
  searchHotels(query: HotelSearchQuery): Promise<HotelOffer[]>;
  getHotelDetails(hotelId: string): Promise<HotelDetails>;
  verifyRateParity(hotelId: string, wholesaleRate: number): Promise<RateParityCheck>;
  createBooking(bookingRequest: BookingPayload): Promise<BookingConfirmation>;
}
```

### 2.2 Adding a New Supplier Step-by-Step
1. Create a new file in `src/lib/adapters/<supplierName>.ts`.
2. Implement rate normalization (convert supplier raw currencies to base USD).
3. Apply the ATLAS wholesale spread calculation:
   `Savings = (Public OTAs Average - Wholesale Net Rate)`
4. Register the adapter in `src/lib/hotelData.ts`.

### Action Checklist:
- [ ] Implement HotelSupplierAdapter interface for new supplier
- [ ] Add error handling and timeout fallbacks (max 3500ms)
- [ ] Write unit test for rate normalization across multi-currencies
- [ ] Register adapter in hotelData registry

## Chapter 3: Booking Pipeline & PDF Generation Engine

### 3.1 B2B Wholesale Voucher Anatomy
When a member completes a reservation:
1. The server generates a unique B2B Wholesale Voucher at `/api/bookings/voucher`.
2. The voucher embeds:
   - Official B2B Bedbank Confirmation Reference.
   - Hotel address, check-in instructions, and meal plans.
   - Dynamic QR code for instant front-desk verification.
   - **Rate Parity Non-Disclosure Notice**: Legally protects the wholesale net rate from public disclosure.

### 3.2 QR Code & PDF Rendering Pipeline
The API route constructs clean, print-ready HTML with embedded CSS and renders dynamic SVG QR codes directly without external binary dependencies.

### Action Checklist:
- [ ] Test voucher generation at /api/bookings/voucher?bookingId=ATL-9842
- [ ] Verify QR code scans accurately to the member verification URL
- [ ] Confirm Rate Parity legal disclaimer renders on all voucher outputs

## Chapter 4: Debugging, Error Handling & API Resiliency

### 4.1 Resiliency Best Practices
1. **Idempotency Keys**: All financial transactions (card reloads, dividend payouts) must pass a UUID idempotency key to prevent double charging.
2. **Graceful Fallbacks**: If a bedbank API times out (>4s), the search engine gracefully falls back to cached inventory or secondary suppliers without crashing the UI.
3. **Structured Error Responses**: All API routes must return consistent JSON:
   ```json
   { "error": true, "message": "User friendly message", "code": "SUPPLIER_TIMEOUT" }
   ```

### Action Checklist:
- [ ] Audit all API routes for structured try/catch blocks
- [ ] Verify idempotency key validation on payment endpoints
- [ ] Monitor Next.js server logs for uncaught promise rejections

## Chapter 5: Deployment, Environment Variables & CI/CD

### 5.1 Deployment Pipeline
- **Production Host**: Vercel / Google Cloud Run
- **Source Control**: GitHub (`master` branch auto-deploys to production)
- **Pre-Flight Check**: Always execute `npm run build` locally before pushing to ensure zero TypeScript errors or missing imports.

### 5.2 Environment Variables Configuration
Ensure all production environment variables are configured in the deployment dashboard (`GEMINI_API_KEY`, `STRIPE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, etc.).

### Action Checklist:
- [ ] Run npm run build and confirm clean 0-error output
- [ ] Verify environment variables in production settings
- [ ] Push code to master and confirm deployment success


---

# Section 3: General App & Platform Operations Manager
**Focus Area**: Operations & Business Execution
**Summary**: The operational runbook for executing daily health checks, Sovereign Vault dividend calculations, metal card fulfillment dispatch, Pruvo price-drop refund audits, and VIP dispute escalation.

## Chapter 1: Daily Operations Runbook & Health Checks

### 1.1 08:00 UTC Morning Operational Checklist
Every morning, the Platform Operations Manager must execute the following 5-point health check:
1. **API Gateway Status**: Verify all 20+ supplier health bars are green in the Admin Console.
2. **Rate Parity Variance Audit**: Review automated price comparison scans. Ensure our wholesale rates are at least 15% to 60% below Expedia/Booking.com.
3. **Booking Reconciliation**: Match reservations booked in ATLAS against bedbank supplier confirmations.
4. **Stripe Issuing Balance**: Confirm operating balance has at least $50,000 for member card spending.
5. **AI Concierge Audit**: Review unresolved VIP concierge tickets on Telegram and WhatsApp.

### Action Checklist:
- [ ] Open Admin Console at /admin and inspect System Health Tab
- [ ] Verify live FX exchange rates are updated
- [ ] Confirm all overnight bookings have confirmed B2B voucher numbers

## Chapter 2: Sovereign Vault Dividend Calculations & Batch Payouts

### 2.1 The 20% Profit-Sharing Model
Unlike public OTAs that pocket 100% of profits, ATLAS pools **20% of net company profits** into the Sovereign Dividend Vault to distribute back to members annually.

### 2.2 Dividend Formula
`Member Dividend = (Individual Annual Spend / Total Club Member Spend) * Total Vault Pool`

### 2.3 Executing Batch Payouts
1. In Admin Console > **Sovereign Vault Manager**:
2. Click **"Calculate Quarterly Allocations"**.
3. Review audit table of qualifying members and their dividend amounts.
4. Click **"Execute Batch Payout via Wise / Stripe"** or deposit directly onto the member's ATLAS Visa card balance.

### Action Checklist:
- [ ] Run quarterly Sovereign Vault audit calculation
- [ ] Verify member wallet balances match transaction logs
- [ ] Execute batch dividend distribution and send push notifications

## Chapter 3: Metal Visa Card Fulfillment Dispatch & VIP Tiering

### 3.1 Physical Metal Card Specifications
- **Material**: 18-gram Matte Black Stainless Steel with Laser-Etched Member Name & ID.
- **NFC Technology**: Embedded dual-interface chip supporting contactless tap-to-pay and Apple/Google Wallet provisioning.

### 3.2 Fulfillment Workflow
1. When a member reaches VIP or Patron tier, a card production ticket is generated in Admin Console.
2. Verify shipping address and member name spelling.
3. Dispatch engraving payload to our manufacturing partner (CompoSecure / Idemia).
4. Enter DHL / FedEx Express tracking number into the member record to trigger shipping notifications.

### Action Checklist:
- [ ] Review pending physical card dispatch requests in Admin Console
- [ ] Validate member shipping addresses and engraving text
- [ ] Assign courier tracking numbers and notify members

## Chapter 4: Pruvo Price-Drop Audits & Customer Support Escalations

### 4.1 Automated Price-Drop Refund Processing
1. When Pruvo detects a lower rate for an existing reservation, the system automatically creates a rebooking request.
2. The Operations Manager reviews the savings delta in Admin Console > **Price Drop Refunds**.
3. Approve rebooking: Old reservation is cancelled (under free cancellation terms) and new reservation is confirmed.
4. 50% of the savings is credited to the member's wallet, and 50% is added to the Sovereign Vault pool.

### 4.2 Handling Check-in Inquiries
If a hotel front desk claims they cannot find a reservation under the member's name:
- Explain that the reservation is booked through the wholesale B2B bedbank allotment (e.g., Hotelbeds / WebBeds).
- Instruct the front desk agent to search by the **Bedbank Confirmation Reference Number** listed on the B2B Wholesale Voucher.

### Action Checklist:
- [ ] Audit pending Pruvo price-drop alerts and approve savings splits
- [ ] Provide immediate concierge support for check-in voucher inquiries
- [ ] Maintain 99.8% customer satisfaction rating on VIP support desk


---

# Section 4: Chief Marketing Officer & Growth Lead
**Focus Area**: Marketing, User Acquisition & Compliance
**Summary**: The ultimate marketing blueprint detailing core value propositions, persona playbooks, high-converting ad scripts, rate parity closed-loop advertising rules, and CAC/LTV unit economics.

## Chapter 1: Core Value Proposition & Persona Breakdowns

### 1.1 The Core Positioning
**ATLAS is the world's first closed-loop private travel club that gives travelers direct access to wholesale luxury hotel rates (0% retail markup), a reloadable Visa card, and annual profit dividends.**

### 1.2 Target Personas
1. **The High-Earning Digital Nomad**:
   - Spends 6-12 months abroad in luxury hotels and coliving spaces.
   - Cares about: 5G eSIM, instant visa processing, reloadable multi-currency cards, and community.
2. **The Ultra-High-Net-Worth VIP**:
   - Books 5-star suites at Aman, Four Seasons, Bulgari, and luxury chalets in St. Moritz/Courchevel.
   - Cares about: VIP airport fast-track immigration, private jet empty-legs, discreet concierge service.
3. **The Frequent Luxury Family / Business Traveler**:
   - Takes 4-8 luxury family vacations per year.
   - Cares about: Transparent wholesale savings ($5,000+ saved per year) and post-booking price drop refunds.

### Action Checklist:
- [ ] Align ad creative variants to the 3 target personas
- [ ] Audit landing page copy for luxury high-converting messaging
- [ ] Deploy dedicated landing pages for Digital Nomads and VIPs

## Chapter 2: High-Converting Ad Scripts & Creative Playbooks

### 2.1 TikTok / Instagram Reels Video Script (Hook-Story-Offer)
**Visual**: Split-screen showing Expedia checkout screen ($1,167) on the left, and ATLAS wholesale screen ($472) on the right at The Bellagio Las Vegas.

- **Hook (0:00 - 0:03)**: *"Stop booking hotels on Expedia. You are literally getting charged a 40% TV ad tax."*
- **Story (0:03 - 0:15)**: *"Public travel sites have legal 'Rate Parity' contracts that force them to keep prices high. But luxury hotels quietly offload empty suites to wholesale B2B bedbanks at up to 70% off. Until now, only travel agents had access."*
- **Proof (0:15 - 0:30)**: *"Look at this: Grand Hotel Oslo on Booking.com is $680/night. On ATLAS, it's $310/night. That is $370 cash saved every single night."*
- **Offer & CTA (0:30 - 0:45)**: *"ATLAS gives you raw wholesale rates with 0% retail markup, plus a matte black metal Visa card that reloads with cash dividends. Tap the link to check your savings!"*

### 2.2 Meta Static Ad Copy Template
**Headline**: The Closed-Loop Travel Club That Public OTAs Don't Want You to Know About.  
**Body**:  
🏨 0% Retail Markups on 1,000,000+ 5-Star Hotels  
💳 Matte Black Reloadable Visa® with Annual Cash Dividends  
🛂 Digital Nomad Visa Concierge & 5G Global eSIM  
⚡ VIP Airport Fast-Track Immigration (Skip 2-hr lines)  
👉 Join over 10,000+ members who never pay retail for luxury travel again.

### Action Checklist:
- [ ] Produce 3 versions of the split-screen comparison video
- [ ] Deploy Meta static carousel ads featuring real proof screenshots
- [ ] Track ROAS targeting a minimum 3.2x return on ad spend

## Chapter 3: Rate Parity Legal Compliance in Advertising

### 3.1 Strict Closed-Loop Marketing Rules
To remain 100% compliant with global hotel franchise agreements and bedbank distribution licenses:
1. **Never Display Exact Wholesale Rates Publicly Without a Gated Login**: The public homepage displays audit savings percentages and sample comparisons, but specific date booking checkouts require membership authentication.
2. **Use the Term 'Closed-Loop Wholesale Club'**: Emphasize that ATLAS is a private subscription club (like Costco for luxury travel).
3. **Highlight Value-Added FinTech**: Market the reloadable Visa card, annual profit vault dividends, and post-booking price drop refunds as core platform differentiators.

### Action Checklist:
- [ ] Review all external marketing copy for closed-loop compliance
- [ ] Ensure booking checkout links are gated behind member authentication
- [ ] Distribute Investor Prospectus to institutional travel partners

## Chapter 4: Unit Economics, CAC/LTV & Member Referral Growth

### 4.1 Unit Economics Model
- **Member Acquisition Cost (CAC)**: Target $85 - $120 per paying subscriber.
- **Annual Membership Fee**: $499 / year (VIP Tier) or $1,499 / year (Patron Tier).
- **Average Hotel Booking Volume per Member**: $8,400 / year.
- **Lifetime Value (LTV, 3-Year Horizon)**: $2,850+ per member (including annual fee renewals and transaction fees).
- **LTV to CAC Ratio**: ~24:1 (Exceptional SaaS & FinTech unit economics).

### 4.2 Viral Dual-Sided Referral Program
- When Member A refers Member B:
  - Member B gets **$100 in instant hotel booking credit**.
  - Member A receives **$100 reload directly onto their ATLAS Visa Card** once Member B joins.

### Action Checklist:
- [ ] Set up automated referral tracking links in member portal
- [ ] Monitor blended CAC across Meta, TikTok, and Google search
- [ ] Run monthly cohort retention analysis on membership renewals


---

