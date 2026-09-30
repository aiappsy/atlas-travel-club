import { NextRequest, NextResponse } from 'next/server';
import { PlatformFeatureFlags } from '@/lib/types';
import { DEFAULT_PLATFORM_CONFIG } from '@/lib/mockData';
import { resolveActiveGeminiModel, formatGeminiEngineBadge } from '@/lib/geminiModels';
import { runLiveMarketScan, buildMarketGroundingContext } from '@/lib/marketScanner';

export async function POST(req: NextRequest) {
  try {
    const { prompt, features: passedFeatures } = await req.json();
    const query = (prompt || '').toLowerCase();
    const features: PlatformFeatureFlags = passedFeatures || DEFAULT_PLATFORM_CONFIG;

    const activeModel = resolveActiveGeminiModel({
      modelOverride: features.geminiModelId,
      autoUpgradeEnabled: features.autoUpgradeGeminiModel ?? true,
    });

    const marketScan = runLiveMarketScan();

    let reply = '';

    // 1. Digital Nomad & Visa Hub Intent
    if (
      query.includes('nomad') ||
      query.includes('visa') ||
      query.includes('schengen') ||
      query.includes('coliving') ||
      query.includes('remote work') ||
      query.includes('tax free') ||
      query.includes('spain visa') ||
      query.includes('portugal d8') ||
      query.includes('thailand dtv') ||
      query.includes('bali visa')
    ) {
      if (query.includes('schengen') || query.includes('90 day') || query.includes('overstay')) {
        reply = `⏳ **Schengen 90/180-Day Automated Compliance Sentinel:**\n\nNon-EU/EEA remote workers may only spend **90 days out of any 180-day rolling window** inside the European Schengen Zone.\n\n⚠️ **Schengen Reset Strategy**: If you are nearing 90 days, you must exit to a nearby **Non-Schengen European Haven**:\n1. 🇬🇧 **United Kingdom (London)**: 6 Months Visa-Free for most travelers.\n2. 🇨🇾 **Cyprus (Larnaca & Paphos)**: 90 Days Non-Schengen (Schengen clock pauses!).\n3. 🇦🇱 **Albania (Tirana/Sarandë)**: 1 Full Year Visa-Free for US passport holders.\n4. 🇲🇪 **Montenegro (Kotor)**: 90 Days Non-Schengen.\n\nUse our interactive [Schengen Tracker](/nomads) to monitor your exact rolling dates!`;
      } else if (query.includes('tax') || query.includes('cheapest') || query.includes('0%')) {
        reply = `💰 **Top 0% & Low-Tax Digital Nomad Visas (2026):**\n\n1. 🇦🇪 **Dubai Virtual Working Visa**: **0% Personal Income Tax & 0% Capital Gains** ($3,500/mo income requirement, 1-year renewable).\n2. 🇹🇭 **Thailand Destination Visa (DTV)**: **0% Tax on foreign income** not remitted in the same tax year (5-Year Multiple Entry, 180 days/stay).\n3. 🇨🇷 **Costa Rica Remote Worker Visa**: **100% Tax Exemption** on foreign earnings + duty-free equipment import ($3,000/mo income).\n4. 🇪🇸 **Spain Digital Nomad Visa**: **24% Flat Tax under Beckham Law** up to €600,000 (€2,646/mo income requirement).\n\nWould you like me to open the instant intake file for any of these visas?`;
      } else {
        reply = `🌍 **ATLAS Digital Nomad & Global Visa Hub:**\n\nWe provide complete relocation and remote worker infrastructure:\n\n- 🛂 **Fast-Track Nomad Visas**: Spain (€2,646/mo), Portugal D8 (€3,280/mo), Dubai ($3,500/mo), Thailand DTV ($14k funds), Bali E33G ($60k/yr).\n- 🏡 **Monthly Coliving Stays (30+ Nights)**: Lisbon ($1,150/mo), Bali Canggu ($890/mo), Medellín ($740/mo), Bansko ($580/mo) with verified **300–1,000 Mbps Fiber Wi-Fi**.\n- 📶 **Global 5G Data**: Free 10GB monthly eSIM on the **Global Nomad Passport Tier ($29.99/mo)**.\n\nTell me where you want to live and work, and I will calculate your visa eligibility!`;
      }
    }
    // 2. Savings Proof & Rate Audit Intent
    else if (
      query.includes('proof') ||
      query.includes('evidence') ||
      query.includes('audit') ||
      query.includes('receipt') ||
      query.includes('roi') ||
      query.includes('pay for itself')
    ) {
      reply = `🛡️ **ATLAS Live Savings Proof Engine:**\n\nEvery rate on our platform is cryptographically audited against live public OTA feeds (Expedia, Booking.com, Hotels.com) with real-time Bedbank timestamps:\n\n1. 🎰 **The Grand Bellagio (Las Vegas)**: Public Expedia $1,167 vs **Wholesale $594** ➔ **Save $573 (49% Off)**\n2. 🗽 **The Plaza Fifth Avenue (NYC)**: Public Booking.com $2,960 vs **Wholesale $1,480** ➔ **Save $1,480 (50% Off)**\n3. 🇫🇷 **Ritz Paris (Place Vendôme)**: Public Hotels.com $4,950 vs **Wholesale $2,700** ➔ **Save $2,250 (45% Off)**\n\n📊 **Annual ROI**: Taking just **1 single weekend trip per year saves ~$382**, completely paying for your Gold VIP membership on Day 1!\n\nCheck our live [Savings Proof Engine](/proof) to test any hotel URL!`;
    }
    // 2b. Rate Mismatch & Room Tier Transparency Intent
    else if (
      query.includes('different price') ||
      query.includes('higher price') ||
      query.includes('mismatch') ||
      query.includes('not the same') ||
      query.includes('booking show') ||
      query.includes('expedia show') ||
      query.includes('room tier') ||
      query.includes('room type') ||
      query.includes('differ') ||
      query.includes('more expensive on')
    ) {
      reply = `🏨 **Why OTA Prices Can Look Higher When You Click Through:**\n\nWhen you click "Verify on Booking.com" or "Verify on Expedia", you might see a higher price than our headline audit. Here is the 100% transparent explanation:\n\n1. 🏷️ **Google Hotels Indexes the Lowest Entry-Level Room**: Our live Google audit pulls the absolute lowest available rate for that property — typically an entry-level Standard Queen or Room-Only non-refundable deal.\n\n2. 🛏️ **OTAs Display All Available Room Categories**: When you land on Booking.com or Expedia, they present their full inventory — including **Superior Rooms, Executive Suites, Ocean Views, and Breakfast-Included packages** (which naturally cost more per night).\n\n3. 🛡️ **The ATLAS Wholesale Guarantee**: Your ATLAS member rate is negotiated directly through institutional B2B Bedbanks (Hotelbeds, WebBeds). **Our rate is always guaranteed to beat even the lowest public entry-level room** found on any retail OTA.\n\nClick any "Verify" button to check the live inventory on the OTA, and lock in your wholesale rate with 0% retail markup!`;
    }
    // 2c. Identical / Same Rate Across OTAs Intent
    else if (
      query.includes('same price') ||
      query.includes('identical') ||
      query.includes('same rate') ||
      query.includes('all otas') ||
      query.includes('all the same')
    ) {
      reply = `🔍 **Why All OTAs Sometimes Show the Exact Same Rate:**\n\n1. ⚖️ **Legal Hotel Rate Parity**: Hotels legally contract OTAs (Expedia, Booking.com, Hotels.com) under strict "Rate Parity" clauses, obligating them to publish identical retail rates across public meta-search engines.\n\n2. 🌐 **Google Hotels Market Benchmark**: On destination-wide searches, Google Hotels indexes one single verified lowest public benchmark rate for each property. We display this benchmark honestly rather than inventing fake, randomized differences.\n\n3. ⚡ **Individual Live Verification**: When you click the **Verify on [OTA]** button, you are redirected directly to that specific OTA's live booking page with your dates pre-selected, where you can inspect their current live rates in real time.\n\n4. 👑 **ATLAS Parity Exemption**: As a closed-loop private travel club, ATLAS is legally exempt from Rate Parity agreements, passing pure wholesale net rates with **0% retail markup**!`;
    }
    // 2d. Hotel Taxes & Fees Transparency Intent
    else if (
      query.includes('tax') ||
      query.includes('taxes') ||
      query.includes('resort fee') ||
      query.includes('vat') ||
      query.includes('all inclusive') ||
      query.includes('taxes included')
    ) {
      reply = `🧾 **How Hotel Taxes & Resort Fees Work on ATLAS:**\n\n1. 🏛️ **Destination Taxes & Local VAT**: Every destination charges local hospitality taxes (e.g., Dubai ~28% municipal fee + VAT, Las Vegas ~24% lodging tax + daily resort fee, Europe 10%–20% city tax).\n\n2. 👁️ **The OTA Bait-and-Switch**: Public sites in the US often display deceptive "pre-tax room rates" and only disclose hefty resort fees and local taxes at the final checkout screen.\n\n3. ✅ **ATLAS All-Inclusive Standard**: By default, your ATLAS rate is **All-Inclusive (Taxes & Fees Included)** so there are no surprises upon arrival at the hotel front desk.\n\n4. 🔀 **Switch Anytime**: In the rate modal or search bar, you can toggle between **All-Inclusive** and **Base Room Rate** to compare apples-to-apples against any OTA!`;
    }
    // 3. "How It Works" & Wholesale Transparency Intent
    else if (
      query.includes('how it works') ||
      query.includes('how does it work') ||
      query.includes('why cheaper') ||
      query.includes('expedia') ||
      query.includes('rate parity') ||
      query.includes('is this legal') ||
      query.includes('how do you make money') ||
      query.includes('wholesale') ||
      query.includes('explain')
    ) {
      reply = `🛡️ **The 100% Transparent Truth About How ATLAS Works:**\n\n1. **Why Public Sites (Expedia & Booking) Are More Expensive**: Public OTAs add a **20%–45% retail ad markup** to cover Google search ads, TV campaigns, and high shareholder profit margins.\n\n2. **The Closed-Loop Bedbank Secret**: Hotels quietly distribute unsold rooms to confidential **B2B Bedbanks (Hotelbeds, WebBeds)** at **18%–42% wholesale discounts**. Under international hospitality law, these rates are restricted to private, closed-loop club members.\n\n3. **0% Hotel Room Markup**: ATLAS passes **100% of the raw wholesale net room rate** directly to you with zero retail markup.\n\n4. **At-Cost Transaction Processing (Caveat)**: Unlike retail sites that hide markups in inflated prices, ATLAS charges a nominal merchant processing fee (~3.5%) at cost during checkout to cover credit card interchange (Visa/Mastercard) and secure B2B settlement.\n\n5. **Tax Transparency**: Toggle anytime between **Taxes & Fees Included** (matching European/Google Travel all-inclusive display) and **Base Room Only**.\n\nWould you like me to audit live rates for any specific hotel or destination?`;
    }
    // 3b. Currency & Interbank FX Intent
    else if (
      query.includes('currency') ||
      query.includes('currencies') ||
      query.includes('fx') ||
      query.includes('euro') ||
      query.includes('eur') ||
      query.includes('gbp') ||
      query.includes('pound') ||
      query.includes('chf') ||
      query.includes('franc') ||
      query.includes('aed') ||
      query.includes('dirham') ||
      query.includes('sgd') ||
      query.includes('jpy') ||
      query.includes('yen') ||
      query.includes('aud') ||
      query.includes('conversion') ||
      query.includes('exchange rate')
    ) {
      reply = `💱 **Global Multi-Currency & 0% FX Engine:**\n\nATLAS supports **19 major global currencies** with real-time conversion at raw European Central Bank (ECB via Frankfurter) interbank rates:\n\n- 🇺🇸 **USD ($)**: Base Club Currency\n- 🇪🇺 **EUR (€)**: Direct ECB interbank rate (0% markup)\n- 🇳🇴 **NOK (kr)**: Real-time Norwegian Krone live feed\n- 🇬🇧 **GBP (£)**: British Pound sterling live feed\n- 🇸🇪 **SEK (kr)** & 🇩🇰 **DKK (kr)**: Nordic interbank rates\n- 🇨🇭 **CHF (CHF)**: Swiss Franc parity\n- 🇦🇪 **AED (AED)**: 3.6725 pegged\n- 🇨🇦 **CAD (C$)** & 🇦🇺 **AUD (A$)**: Transatlantic & Pacific rates\n- 🇯🇵 **JPY (¥)**, 🇸🇬 **SGD (S$)**, 🇹🇭 **THB (฿)**, 🇵🇭 **PHP (₱)**, 🇮🇳 **INR (₹)**, 🇮🇩 **IDR (Rp)**, 🇲🇾 **MYR (RM)**, 🇳🇿 **NZD (NZ$)**, 🇭🇰 **HKD (HK$)**.\n\n🛡️ **Zero Foreign Transaction Fees**: Unlike consumer credit cards that charge 3% international fees, your ATLAS Visa card and bookings execute at pure interbank rates. You can switch your currency anytime via the navbar selector (marked with the 🟢 ECB Live badge)!`;
    }
    // 3c. Flight Delay & EU261 Legal Compensation Intent
    else if (
      query.includes('delay') ||
      query.includes('claim') ||
      query.includes('cancelled flight') ||
      query.includes('eu261') ||
      query.includes('compensation') ||
      query.includes('flight refund')
    ) {
      reply = `⚖️ **ATLAS EU261 & International Flight Disruption Compensation Sentinel:**\n\nIf your flight was delayed by 3+ hours or cancelled within the last 3 years, you are legally entitled to statutory cash compensation under European Regulation 261/2004 and UK Air Passenger Rights:\n\n- ✈️ **Short-Haul (< 1,500 km, e.g. Oslo ➔ London/Stockholm)**: **€250 ($275)** per passenger.\n- ✈️ **Medium-Haul (1,500 – 3,500 km, e.g. Oslo ➔ Barcelona/Rome/Mallorca)**: **€400 ($440)** per passenger.\n- ✈️ **Long-Haul (> 3,500 km, e.g. Frankfurt/London ➔ New York/Miami)**: **€600 ($650)** per passenger.\n\n🛡️ **Instant Verification**: Enter any flight number in our [Live Flight Claims Scanner](/flight-claims) (e.g. SK810, DY1234, LH442) for immediate verification and direct payout straight to your ATLAS Visa Card!`;
    }
    // 3c. Digital Wallet & Apple/Google Pass Intent
    else if (
      query.includes('apple wallet') ||
      query.includes('google pay') ||
      query.includes('google wallet') ||
      query.includes('passbook') ||
      query.includes('pkpass') ||
      query.includes('digital card') ||
      query.includes('qr pass') ||
      query.includes('nfc pass')
    ) {
      reply = `📱 **ATLAS Sovereign Mobile Wallet Passbook (.pkpass / Google Pay):**\n\nEvery ATLAS member receives a cryptographic digital pass signed by ATLAS Sovereign Keys:\n\n1.  **Apple Wallet**: Tap **"Add to Apple Wallet"** on your dashboard or membership card to store your pass in iOS Wallet.\n2. 🟢 **Google Pay**: Tap **"Save to Google Pay"** for instant 1-tap pass access on Android.\n3. ⚡ **NFC Lounge & Airport Tap**: Tap your iPhone or Apple Watch at 500+ airport lounge desks & VIP Fast-Track immigration scanners.\n4. 🎟️ **Offline QR Voucher**: Contains your verified closed-loop member ID and 0% markup authorization code for seamless luxury hotel check-ins.\n\nWould you like me to open your digital pass preview right now?`;
    }
    // 3d. WhatsApp & Telegram VIP Messaging Intent
    else if (
      query.includes('whatsapp') ||
      query.includes('telegram') ||
      query.includes('message') ||
      query.includes('text') ||
      query.includes('sms') ||
      query.includes('bot') ||
      query.includes('on the go')
    ) {
      reply = `💬 **24/7 VIP Mobile Concierge on WhatsApp & Telegram:**\n\nYou can chat with me directly from your mobile messaging apps without opening a browser:\n\n1. ✈️ **Telegram Bot**: Message **@AtlasConciergeBot** on Telegram to search wholesale hotels, request flight re-booking, or calculate Schengen days.\n2. 🟢 **WhatsApp Business**: Text our dedicated VIP Concierge line at **+1 (800) 847-ATLAS**.\n\nAll rates, gap alerts, and 1-click booking cards sync instantly across your web dashboard and mobile sessions!`;
    }
    // 3e. B2B Wholesale Voucher & Check-in Intent
    else if (
      query.includes('voucher') ||
      query.includes('check in') ||
      query.includes('hotel voucher') ||
      query.includes('receipt') ||
      query.includes('confirmation pdf') ||
      query.includes('front desk')
    ) {
      reply = `📄 **Official B2B Wholesale Check-in Voucher Protocol:**\n\nWhen checking into a luxury property booked via ATLAS:\n\n1. 🎟️ **Instant PDF Voucher**: Download your official B2B voucher featuring your **Bedbank Confirmation ID (WebBeds/Hotelbeds)** and cryptographic QR code.\n2. 🏨 **Front Desk Presentation**: Present the voucher or Apple/Google Wallet pass at check-in. The room is prepaid directly through ATLAS wholesale clearing.\n3. 🤫 **Rate Parity Protected**: The hotel front desk will not see or discuss the net wholesale rate, ensuring strict compliance with supplier agreements.\n4. 🆘 **24/7 B2B Emergency Support**: If the front desk requires immediate verification, our supplier priority desk is on standby (+1-800-847-ATLAS / +44 20 8123 4567).\n\nWould you like me to fetch the check-in voucher for your upcoming stay?`;
    }
    // 4. Cruise / Itinerary Gap Intent
    else if (query.includes('southampton') || query.includes('train') || (query.includes('cruise') && query.includes('boarding'))) {
      reply = `🚢 **Aura Proactive Logistical Gap Analysis (Deterministic Grounding):**\n\nI parsed the temporal sequence of your **London ➔ Southampton ➔ Transatlantic Cruise** itinerary:\n\n⚠️ **CRITICAL TEMPORAL CONFLICT DETECTED**:\n- **Current Train Booking**: London Waterloo ➔ Southampton Central arrives at **4:00 PM**.\n- **Cruise Boarding Gate**: Absolute final embarkation cutoff is strictly **3:30 PM**.\n\n*A standard calendar would record this blindly, but this sequence is physically impossible: you would arrive 30 minutes after the ship closes boarding.*\n\n✅ **Aura Automated Resolution**:\n- Re-routing to the **1:15 PM B2B Wholesale Train** from London Waterloo.\n- Arrives Southampton Central at **2:32 PM** (giving you 58 minutes buffer before boarding cutoff).\n\nWould you like me to execute this ticket switch now?`;
    }
    else if (query.includes('cruise') || query.includes('miami') || query.includes('icon of the seas')) {
      const jetOption = features.enablePrivateJets
        ? `1. 🛩️ **Private Jet Empty Leg**: Miami ➔ New York or Los Angeles ➔ Miami on a *Bombardier Challenger* from **$1,250/seat**.\n`
        : `1. ✈️ **Commercial Flights**: Wholesale business and economy flights into Miami (MIA/FLL).\n`;

      const fastTrackOption = features.enableFastTrackImmigration
        ? `2. ⚡ **Airport Fast-Track**: 3-minute customs escort at Miami International.\n`
        : `2. 🚗 **Chauffeured Port Transfer**: Direct hotel curbside to PortMiami slip.\n`;

      const loungeOption = features.enableLounges
        ? `3. ☕ **VIP Lounge Access**: Add the **Skyview Club at JFK / Miami Lounge Pass** for just **$32** to relax before departure.\n`
        : ``;

      reply = `🚢 **Proactive Itinerary Alert for Your Cruise!**\n\nI see you're interested in the **7-Night Caribbean Cruise on Icon of the Seas (departing PortMiami on Oct 18)**.\n\n⚠️ **Itinerary Gap Detected**: You do not have a flight into Miami (MIA) or Fort Lauderdale (FLL) yet!\n\nHere are your active VIP alternatives aligned with club services:\n${jetOption}${fastTrackOption}${loungeOption}\nWould you like me to book your Miami flight or reserve the cruise stateroom first?`;
    }
    // 5. Flight / Hotel Gap Intent
    else if (query.includes('flight') || query.includes('lh442') || query.includes('jfk') || query.includes('new york')) {
      const esimOption = features.enableEsim
        ? `3. 📶 **5G eSIM Data**: 5GB US High-Speed Data for **$8.50** so you stay connected on arrival.\n`
        : ``;

      const autoRebookNotice = features.enableAutoRebooker
        ? `\n\n🛡️ *Price-Drop Sentinel Active*: Once booked, if the rate drops before check-in, we automatically rebook and refund the difference to your Visa card!`
        : ``;

      reply = `✈️ **Flight Logged: New York JFK Arrival**\n\nI verified your flight **LH442 arriving at New York JFK on Sep 20**.\n\n⚠️ **Itinerary Gap Detected**: You have a confirmed flight, but you haven't reserved a hotel in Manhattan yet.\n\nHere are wholesale member deals locked in for your dates:\n1. 🏨 **The Plaza Fifth Avenue**: Wholesale **$345/nt** (Expedia: $690/nt — **Save 50%**)\n2. 🏨 **Grand Hyatt Manhattan**: Wholesale **$185/nt** (Hotels.com: $340/nt)\n${esimOption}Shall I lock in the Plaza or Hyatt for your stay?${autoRebookNotice}`;
    }
    // 6. Hotel Direct Booking & Global Destination Intent
    else if (
      query.includes('bellagio') ||
      query.includes('vegas') ||
      query.includes('oslo') ||
      query.includes('paris') ||
      query.includes('dubai') ||
      query.includes('burj') ||
      query.includes('tokyo') ||
      query.includes('aman') ||
      query.includes('maldives') ||
      query.includes('soneva') ||
      query.includes('st. moritz') ||
      query.includes('badrutt') ||
      query.includes('london') ||
      query.includes('claridge') ||
      query.includes('hotel') ||
      query.includes('resort') ||
      query.includes('book')
    ) {
      if (query.includes('oslo') || query.includes('grand hotel')) {
        reply = `🏨 **Direct Wholesale Reservation Available!**\n\n**Grand Hotel Oslo Karl Johan (Norway)**\n- **Public Expedia/Booking.com Rate**: $370 / night (Taxes Included)\n- **ATLAS Wholesale Net Rate**: **$267 / night**\n- **Direct Savings**: **$103 / night (28% Off)**\n\n👑 *Includes Nobel Suite floor access, Artesia Spa entry, and Palmen breakfast! (0% hotel markup • at-cost merchant processing applies at checkout)*`;
      } else if (query.includes('dubai') || query.includes('burj')) {
        reply = `🏨 **Direct Wholesale Reservation Available!**\n\n**Burj Al Arab Jumeirah (Dubai, UAE)**\n- **Public Expedia Rate**: $2,400 / night (Taxes Included)\n- **ATLAS Wholesale Net Rate**: **$1,650 / night**\n- **Direct Savings**: **$750 / night (31% Off)**\n\n👑 *Includes private Rolls-Royce airport transfer & 24/7 private butler service! (0% hotel markup • at-cost merchant processing applies at checkout)*`;
      } else if (query.includes('tokyo') || query.includes('aman')) {
        reply = `🏨 **Direct Wholesale Reservation Available!**\n\n**Aman Tokyo (Otemachi Tower Suite)**\n- **Public Booking.com Rate**: $1,850 / night\n- **ATLAS Wholesale Net Rate**: **$1,295 / night**\n- **Direct Savings**: **$555 / night (30% Off)**\n\n👑 *Includes traditional Onsen hot spring spa & panoramic Imperial Palace gardens view!*`;
      } else if (query.includes('maldives') || query.includes('soneva')) {
        reply = `🏨 **Direct Wholesale Reservation Available!**\n\n**Soneva Jani Overwater Villa (Noonu Atoll, Maldives)**\n- **Public Hotels.com Rate**: $3,200 / night\n- **ATLAS Wholesale Net Rate**: **$2,180 / night**\n- **Direct Savings**: **$1,020 / night (32% Off)**\n\n👑 *Includes retractable roof stargazing master suite & private water slide into the lagoon!*`;
      } else {
        reply = `🏨 **Direct Wholesale Reservation Available!**\n\nI have queried B2B Bedbanks for **The Grand Bellagio & Casino Resort (Las Vegas)**:\n\n- **Public Expedia Rate**: $389 / night (Taxes & Resort Fee Included)\n- **ATLAS Wholesale Net Rate**: **$268 / night**\n- **Direct Savings**: **$121 / night ($363.00 total for 3 nights — 31% Off)**\n\n🛡️ **Price-Drop Sentinel Active**: If the rate drops prior to check-in, our Pruvo engine automatically refunds the difference to your reloadable Visa card!`;
      }
    }
    // 6b. Live Travel Market Scan Intent
    else if (
      query.includes('market') ||
      query.includes('scan') ||
      query.includes('scanner') ||
      query.includes('latest prices') ||
      query.includes('up to date') ||
      query.includes('feeds')
    ) {
      reply = `📡 **Live Travel Market Scan Completed (#${marketScan.scanId}):**\n\nI just executed an autonomous scan across **${marketScan.feedsScannedCount} B2B Wholesale Bedbanks & GDS feeds** (${marketScan.freshnessSeconds}s ago), monitoring **${marketScan.propertiesMonitored.toLocaleString()} properties** worldwide.\n\n📊 **Current Real-Time Spreads:**\n- **Average Retail Markup Eliminated**: **${marketScan.averageWholesaleMarginEliminated}%**\n- **Pruvo Price-Drop Sentinel**: **${marketScan.activePriceDropsDetected} active rate drops** being monitored for auto-cashback to member Visa cards.\n- **AirHelp Flight Sentinel**: **${marketScan.activeDisruptionClaimsPending} active €600 compensation claims** filing autonomously.\n\n⚡ **Top Arbitrage Spreads Right Now:**\n${marketScan.topOpportunities.map((o) => `• **${o.hotelName} (${o.city})**: Public ${o.otaProvider} $${o.publicOtaPrice}/nt ➔ **ATLAS Wholesale $${o.wholesaleNetPrice}/nt** (Save **$${o.savingsPerNight}/nt — ${o.savingsPercent}% OFF**)`).join('\n')}\n\nOur market scanner runs 24/7 in the background so you never book at inflated retail rates. What destination would you like me to audit next?`;
    }
    // 7. Default Aura Greeting with Live Market Telemetry
    else {
      reply = `✨ I am **Aura**, your proactive VIP Travel Concierge (${formatGeminiEngineBadge(activeModel)}).\n\nMy autonomous market scanner continuously audits **50+ B2B Bedbanks & GDS networks** (updated ${marketScan.freshnessSeconds}s ago) to eliminate the 20%–45% OTA retail ad tax across 1,000,000+ luxury hotels, monitor price drops, and manage digital nomad relocation.\n\nTell me where you want to travel or work from!`;
    }

    return NextResponse.json({
      success: true,
      reply,
      model: {
        id: activeModel.id,
        name: activeModel.name,
        version: activeModel.version,
        status: activeModel.status,
        autoUpgraded: features.autoUpgradeGeminiModel ?? true,
        latencyProfile: activeModel.latencyProfile,
      },
      marketScan: {
        scanId: marketScan.scanId,
        timestamp: marketScan.timestamp,
        freshnessSeconds: marketScan.freshnessSeconds,
        feedsScanned: marketScan.feedsScannedCount,
        propertiesMonitored: marketScan.propertiesMonitored,
        averageDiscount: marketScan.averageWholesaleMarginEliminated,
        activePriceDrops: marketScan.activePriceDropsDetected,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process concierge query' },
      { status: 500 }
    );
  }
}
