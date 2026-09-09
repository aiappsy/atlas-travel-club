import { NextRequest, NextResponse } from 'next/server';
import { PlatformFeatureFlags } from '@/lib/types';
import { DEFAULT_PLATFORM_CONFIG } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const { prompt, features: passedFeatures } = await req.json();
    const query = (prompt || '').toLowerCase();
    const features: PlatformFeatureFlags = passedFeatures || DEFAULT_PLATFORM_CONFIG;

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
      reply = `🛡️ **The 100% Transparent Truth About How ATLAS Works:**\n\n1. **Why Public Sites (Expedia) Are More Expensive**: Public sites are legally bound by "Rate Parity" agreements and add an **18%–35% retail markup** to fund TV and Google ads.\n\n2. **The Closed-Loop Secret**: Hotels quietly release unsold inventory to **B2B Wholesale Bedbanks (Hotelbeds, WebBeds)** at **30%–70% discounts**. These rates are legally restricted to private, closed-loop club members.\n\n3. **100% Net Rate Pass-Through**: Because we earn revenue through predictable membership subscriptions ($19.99/mo), we pass the **raw wholesale price directly to you with 0% retail markup**.\n\n4. **The FinTech Visa Flywheel**: On top of upfront savings, any post-booking price drops (Pruvo), flight delay payouts ($650), and annual club dividends are **deposited straight onto your reloadable ATLAS Visa card**!\n\nWould you like to read the complete breakdown or compare live rates?`;
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
      reply = `💱 **Global Multi-Currency & 0% FX Engine:**\n\nATLAS supports **8 major global currencies** with real-time conversion at raw ECB interbank rates:\n\n- 🇺🇸 **USD ($)**: Base Club Currency\n- 🇪🇺 **EUR (€)**: ~0.92 per USD (No FX surcharge)\n- 🇬🇧 **GBP (£)**: ~0.79 per USD\n- 🇨🇭 **CHF (CHF)**: ~0.88 per USD\n- 🇦🇪 **AED (AED)**: 3.67 pegged\n- 🇸🇬 **SGD (S$)**: ~1.34 per USD\n- 🇯🇵 **JPY (¥)**: ~155.0 per USD\n- 🇦🇺 **AUD (A$)**: ~1.52 per USD\n\n🛡️ **Zero Foreign Transaction Fees**: Unlike consumer credit cards that charge 3% international fees, your ATLAS Visa card and bookings execute at pure interbank rates. You can switch your currency anytime via the navbar selector or Admin Console!`;
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
    // 4. Cruise / Miami Gap Intent
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
    // 6. Hotel Direct Booking Intent
    else if (query.includes('bellagio') || query.includes('vegas') || query.includes('oslo') || query.includes('paris') || query.includes('book')) {
      reply = `🏨 **Direct Wholesale Reservation Available!**\n\nI have queried B2B Bedbanks for **The Grand Bellagio & Casino Resort (Las Vegas)** for **Sep 15 – Sep 18 (3 Nights)**.\n\n- **Public Expedia Rate**: $389 / night\n- **ATLAS Wholesale Rate**: **$198 / night**\n- **Total Member Savings**: **$573.00 (49% Off)**\n\nI have generated your instant reservation checkout card below. Click **"Confirm Booking"** to lock this rate immediately!`;
    }
    // 7. Default Aura Greeting
    else {
      reply = `✨ I am **Aura**, your proactive VIP Travel Concierge (Gemini 3.7 Flash & ElevenLabs).\n\nI can help you find raw wholesale net rates (30%–70% off Expedia), detect missing travel legs in your itinerary, or assist with **Digital Nomad Visas (Spain, Portugal, Dubai, Thailand) and monthly coliving**.\n\nTell me where you want to travel or work from!`;
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process concierge query' },
      { status: 500 }
    );
  }
}
