# ATLAS Operational Training Manual

## Role: Network & Third-Party Integrations Specialist
**Badge**: Integrations & API Onboarding
**Target Audience**: Operations leads, partnership managers, and technical integration specialists responsible for onboarding third-party services and APIs.

### Executive Summary
The definitive master handbook for establishing corporate accounts, passing KYC/AML verifications, generating production API keys, configuring webhooks, and testing integrations across all 20+ ATLAS B2B suppliers.

---

## Chapter 1: Stripe Issuing, Card Acquiring & Banking Gateway (Est. Reading Time: 12 mins)

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

### Operator Action Checklist:
- [ ] Submit corporate KYC documents to Stripe Issuing team
- [ ] Provision Issuing balance funding account
- [ ] Deploy webhook handler to /api/webhooks/stripe
- [ ] Verify test transaction in sandbox before switching to live mode

---

## Chapter 2: B2B Bedbanks & Direct Wholesalers (Est. Reading Time: 15 mins)

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

### Operator Action Checklist:
- [ ] Complete Hotelbeds APItude commercial agreement
- [ ] Secure WebBeds API keys and whitelist server IP addresses
- [ ] Store API tokens in Admin Console Wholesale Gateways tab
- [ ] Verify rate comparison engine returns live wholesale spreads

---

## Chapter 3: Digital Nomad Infrastructure Partners (Est. Reading Time: 10 mins)

### 3.1 Nomad Ecosystem Partner Portfolio
ATLAS integrates seamlessly with specialized digital nomad providers to offer a complete travel operating system:
1. **Sherpa & iVisa API**: Automated visa requirement lookup and digital nomad visa application processing.
2. **Outsite & Selina Coliving**: Direct member discounts and guaranteed room availability at top remote-work hubs.
3. **Wise Business API**: Instant multi-currency FX conversion and global affiliate dividend distribution.
4. **GigSky & Airalo eSIM API**: Programmatic 5G high-speed global data eSIM provisioning upon booking confirmation.

### 3.2 Key Setup Steps
- Configure the Sherpa Widget API Key in `.env.local` under `SHERPA_API_KEY`.
- Integrate Wise Payout Batch API with OAuth2 client credentials for automated member dividend dispatch.

### Operator Action Checklist:
- [ ] Generate Sherpa Travel Visa API sandbox & live credentials
- [ ] Set up Wise Multi-Currency Business account and API tokens
- [ ] Configure eSIM provisioning webhooks for automatic delivery

---

## Chapter 4: Luxury Verticals, Charter & Travel Protection (Est. Reading Time: 12 mins)

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

### Operator Action Checklist:
- [ ] Establish LunaJets VIP partner affiliate desk
- [ ] Enable Pruvo post-booking tracking webhook
- [ ] Configure AirHelp claims dispatch gateway

---

## Chapter 5: Apple Wallet, Google Pay & VIP Webhook Bridges (Est. Reading Time: 14 mins)

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

### Operator Action Checklist:
- [ ] Generate Apple PassKit certificates & register Pass Type ID
- [ ] Configure Google Wallet Issuer ID & Service Account
- [ ] Deploy Telegram VIP Concierge bot and verify message forwarding
- [ ] Verify WhatsApp Cloud API webhook handshake and verify token

---

