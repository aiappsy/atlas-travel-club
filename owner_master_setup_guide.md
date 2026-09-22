# 🚀 Master Provider Signup & Setup Blueprint for HotelsClub App Owner

This master blueprint provides step-by-step instructions for the platform owner to register with all **10 B2B providers**, obtain API keys, and connect them directly into your **HotelsClub Master Admin Console** at [http://localhost:3005/admin](http://localhost:3005/admin).

---

## 📋 Pre-Registration Checklist (Have These Ready)
To breeze through the B2B verification process, keep these standard business details on hand:
- **Business Legal Name & Registered Address** (LLC, Corp, Ltd, or Sole Proprietorship).
- **Tax Identification Number** (EIN, VAT, or Business Number).
- **Company Website URL** (`https://hotelsclub.vip` or your staging domain).
- **Owner Photo ID** (Passport or Driver’s License for FinTech/KYC verification).
- **Business Bank Account / PayPal Business** (For payout deposits and card treasury funding).

---

## 🏦 1. Banking & Visa Cards: Stripe Issuing

* **Service Provided**: Co-branded physical metal & virtual Apple/Google Pay Visa cards for members.
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: 1.2% – 1.6% Interchange Revenue on every member card swipe.

### Step-by-Step Registration:
1. Go to **[dashboard.stripe.com/register](https://dashboard.stripe.com/register)** and create or log into your Stripe Business account.
2. In the left navigation menu, click **"Issuing"** (or visit `dashboard.stripe.com/issuing`).
3. Click **"Request Access"** and choose **"Commercial / Consumer Card Issuing"**.
4. Submit your company formation documents and verify the primary owner's identity.
5. In **"Card Designs"**, upload your HotelsClub Metallic Gold and Platinum card artwork (1013x638px at 300 DPI with your logo).
6. Go to **Developers > API Keys** and copy your **Secret Key** (`sk_live_...`) and **Publishable Key** (`pk_live_...`).
7. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Visa Prepaid Manager](http://localhost:3005/admin).
   - Paste your `sk_live_...` key and click **"Save Visa Config"**.

---

## 🏨 2. Wholesale Hotels: Hotelbeds & WebBeds

* **Service Provided**: Access to 400,000+ wholesale hotels worldwide at 30%–70% off Expedia rates.
* **Estimated Approval**: 2 – 3 Business Days.
* **Revenue Model**: 100% net rate pass-through to members (monetized via monthly memberships).

### Step-by-Step Registration:
1. Go to **[hotelbeds.com/distribution](https://www.hotelbeds.com/distribution)** or **[webbeds.com/api-integration](https://www.webbeds.com/)**.
2. Click **"Become a Client / Partner"** and select **"Closed-Loop Travel Club / B2B Agency"**.
3. Under *Integration Type*, select **"APIs (APItude / XML Booking API)"**.
4. Once your account manager approves your contract, log into the **Hotelbeds Developer Portal** (`developer.hotelbeds.com`).
5. Copy your **API Key**, **Secret**, and **Live Endpoint URL**.
6. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > B2B Suppliers](http://localhost:3005/admin).
   - Paste your API Key under **Hotelbeds B2B API** and toggle **"Wholesale Hotel Engine"** in the Switchboard.

---

## 🏰 3. Ultra-Luxury Villas: Le Collectionist & Oliver's Travels

* **Service Provided**: Curated private estates in St. Barts, French Alps, and Tuscany with private chefs and butlers.
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: 40%–50% member wholesale discount + 10% platform broker commission.

### Step-by-Step Registration:
1. Go to **[lecollectionist.com/en/travel-designers](https://www.lecollectionist.com/en/travel-designers)** or **[oliverstravels.com/travel-agents](https://www.oliverstravels.com/travel-agents)**.
2. Click **"Join Partner Network"** and register as a *Luxury Travel Club / Concierge Partner*.
3. In your partner dashboard under **"API & Inventory Feeds"**, request your **B2B Estate Token**.
4. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Luxury Villas](http://localhost:3005/admin).
   - Paste your **Le Collectionist B2B API Token** and click **"Save Luxury Villa Configuration"**.

---

## 🛡️ 4. Autonomous Price-Drop Re-Booker: Pruvo For Business

* **Service Provided**: 24/7 background sentinel that cancels and re-books when rates drop, depositing cash onto member Visa cards.
* **Estimated Approval**: 1 Business Day.
* **Revenue**: Members save extra cash post-booking ($70–$240/booking); platform keeps a performance split.

### Step-by-Step Registration:
1. Go to **[pruvo.com/business](https://www.pruvo.com/business)** or **[hotelmize.com](https://www.hotelmize.com/)**.
2. Click **"Request Demo / B2B Access"** and register your platform.
3. In Developer Settings, obtain your **B2B Sentinel REST API Key**.
4. Set your Webhook URL to: `https://yourdomain.com/api/cards/credit`.
5. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Auto-Rebooker](http://localhost:3005/admin).
   - Paste your **Pruvo B2B Token** and set minimum rebook threshold to `$25.00`.

---

## 👑 5. Elite Loyalty Status Matching: StatusMatch.com

* **Service Provided**: Instant upgrades to Hilton Honors Diamond, Marriott Platinum, and Star Alliance Gold.
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: Platform keeps a fee split on expedited status match applications.

### Step-by-Step Registration:
1. Go to **[statusmatch.com/business](https://www.statusmatch.com/business)** or **[loylogic.com](https://www.loylogic.com/)**.
2. Click **"Contact Enterprise Sales"** and select *Closed-Loop VIP Club Integration*.
3. Copy your **Status Match Enterprise Secret Key**.
4. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Status Match](http://localhost:3005/admin).
   - Paste your Secret Key and define tier mappings (e.g. Gold VIP ➔ Hilton Diamond).

---

## ⚡ 6. VIP Airport Fast-Track Immigration: Diamond Air International

* **Service Provided**: 3-minute customs escort and electric buggy at 500+ global airports ($85 flat pass).
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: 50% member discount + 15% platform booking commission.

### Step-by-Step Registration:
1. Go to **[diamondair.co.uk](https://www.diamondair.co.uk/)** or **[marhabaservices.com](https://www.marhabaservices.com/)**.
2. Register as a *Corporate Travel Partner / Agency*.
3. In Developer Settings, obtain your **Dispatch API Token**.
4. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > VIP Fast-Track](http://localhost:3005/admin).
   - Paste your **Diamond Air B2B Token** and save.

---

## 🛥️ 7. Luxury Yachts & Supercars: Boatsetter & Blacklane

* **Service Provided**: Captained day yacht charters and exotic supercar rentals (Ferraris/Lamborghinis).
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: 35%–45% member discount + 10% platform broker commission.

### Step-by-Step Registration:
1. Go to **[boatsetter.com/affiliates](https://www.boatsetter.com/affiliates)** and **[blacklane.com/en/partners](https://www.blacklane.com/en/partners)**.
2. Sign up as a *VIP Concierge & Travel Partner*.
3. Copy your **Fleet Partner Key**.
4. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Yachts & Supercars](http://localhost:3005/admin).
   - Paste your **Boatsetter Partner Key** and click save.

---

## 🛩️ 8. Private Jet Empty Legs: LunaJets / FlyXO

* **Service Provided**: Private jet empty-leg flights from $690/seat (up to 80% off retail charter rates).
* **Estimated Approval**: 1 – 2 Business Days.
* **Revenue**: Earn $250 – $750 commission per whole aircraft charter.

### Step-by-Step Registration:
1. Go to **[lunajets.com/en/b2b-partners](https://www.lunajets.com/en/b2b-partners)** or **[flyxo.com/partners](https://flyxo.com/partners)**.
2. Register for the *B2B Empty Leg Feed API*.
3. Copy your **Empty Leg JSON Webhook Key**.
4. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Private Jet Empty Legs](http://localhost:3005/admin).
   - Paste your **LunaJets API Key** and save.

---

## ⚖️ 9. Flight Delay Legal Claims: AirHelp API

* **Service Provided**: Automated legal enforcement for delayed flights; pays $650 direct cash to member Visa cards.
* **Estimated Approval**: Instant / 1 Business Day.
* **Revenue**: $25 – $45 affiliate bounty per successful claim.

### Step-by-Step Registration:
1. Go to **[airhelp.com/en/affiliates](https://www.airhelp.com/en/affiliates/)** or apply for **AirHelp Connect B2B API**.
2. Copy your **Affiliate Campaign ID** or **REST API Partner Token**.
3. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Delay Claims (AirHelp)](http://localhost:3005/admin).
   - Paste your token and click save.

---

## 🏥 10. Travel Insurance: SafetyWing / Allianz Partners

* **Service Provided**: Global travel medical and trip cancellation insurance policies ($1.60/day).
* **Estimated Approval**: Instant Sandbox / 24h Live.
* **Revenue**: 15% – 20% recurring commission on policy sales.

### Step-by-Step Registration:
1. Go to **[safetywing.com/partners](https://safetywing.com/partners)** or **[allianz-partners.com](https://www.allianz-partners.com/)**.
2. Sign up and copy your **Partner Secret Token**.
3. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > Travel Insurance](http://localhost:3005/admin).
   - Paste your **SafetyWing Partner Secret** and save.

---

## 🤖 11. AI Voice & LLM: Google Gemini & ElevenLabs

* **Service Provided**: Aura Proactive AI Concierge with natural voice conversation.
* **Estimated Approval**: Instant.

### Step-by-Step Registration:
1. Go to **[elevenlabs.io](https://elevenlabs.io/)**, create an account, and copy your **API Key** from Profile Settings.
2. Go to **[aistudio.google.com](https://aistudio.google.com/)**, generate a **Gemini 3.7 Flash API Key**.
3. **Where to Paste in HotelsClub**:
   - Go to [Admin Console > AI Concierge Studio](http://localhost:3005/admin).
   - Paste your **ElevenLabs Voice Key** and save.

---

## 🚀 Final Step: Publishing Changes Live
Once you have entered your API keys:
1. Open the [Admin Master Switchboard](http://localhost:3005/admin).
2. Ensure all desired services are toggled to **Active (Green)**.
3. Click the top-right button: **"⚡ Publish Changes to Member Portal"**.
4. Your member storefront on **[http://localhost:3005](http://localhost:3005)** is instantly updated and live worldwide!
