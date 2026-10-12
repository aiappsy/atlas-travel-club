'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  TrendingDown,
  CreditCard,
  Coins,
  CheckCircle2,
  Lock,
  ArrowRight,
  HelpCircle,
  Scale,
  Sparkles,
  Plane,
  Award,
  Zap,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorksPage() {
  const { locale } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {locale === 'no' ? '100% Transparent Reise- og Finansøkonomi' : '100% Transparent Travel & Banking Economics'}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {locale === 'no' ? (
              <>
                Slik fungerer ATLAS: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  Den lukkede engrosklubben for reiser
                </span>
              </>
            ) : (
              <>
                How ATLAS Works: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  The Private Wholesale Travel & Banking Club
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {locale === 'no'
              ? 'Hvorfor åpne nettsteder som Expedia må legge på store provisjoner, hvordan ATLAS får tilgang til konfidensielle B2B Bedbank-engrospriser, og hvordan ditt ATLAS Visa®-kort refunderer ekte penger tilbake til deg.'
              : 'Why public websites like Expedia charge retail markups, how ATLAS accesses confidential B2B Bedbank wholesale rates, and how your ATLAS Visa® Card deposits real cash back in your pocket.'}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ 0% kommersielt påslag' : '✓ Zero Retail Markups'}</span>
            <span className="flex items-center gap-1">•</span>
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ B2B Bedbank nettopriser' : '✓ B2B Bedbank Net Rates'}</span>
            <span className="flex items-center gap-1">•</span>
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ Automatiske prisdropp-refusjoner' : '✓ Automated Price-Drop Refunds'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Section 1: The Public Retail Trap vs The Closed-Loop Secret */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-sky-600 tracking-wider">
              {locale === 'no' ? 'Bransjehemmeligheten' : 'The Industry Secret'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Hvorfor er Expedia og Booking.com alltid dyrere?' : 'Why Is Expedia Always More Expensive?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {locale === 'no'
                ? 'Den globale hotellbransjen styres av en juridisk avtaleregel som 99% av reisende aldri har hørt om.'
                : 'The global hotel industry operates on a legal rule that 99% of travelers do not know about.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Box 1: Public OTAs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                {locale === 'no' ? 'Åpne nettsteder (Expedia, Booking.com)' : 'Public Websites (Expedia, Booking.com)'}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {locale === 'no' ? 'Bundet av «Rate Parity»-avtaler' : 'Bound by "Rate Parity" Contracts'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Hoteller signerer strenge avtaler med åpne bestillingsportaler som forbyr dem å annonsere billigere priser offentlig på nett. For å finansiere milliarder i TV-reklame og Google-kampanjer, legger åpne OTA-er på 20% til 45% påslag på hver eneste booking.'
                  : 'Hotels sign strict legal agreements with public booking sites promising they will never advertise a cheaper price publicly online. To fund billions in TV ads and Google search campaigns, public OTAs add a 20% to 45% retail markup on top of every booking.'}
              </p>
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 text-xs text-rose-900 font-semibold space-y-1">
                <div>{locale === 'no' ? '❌ Du betaler høye detaljistpåslag på hvert opphold.' : '❌ You pay retail markups on every stay.'}</div>
                <div>{locale === 'no' ? '❌ Faller prisen etter bestilling, taper du besparelsen.' : '❌ If the price drops after booking, you lose the savings.'}</div>
                <div>{locale === 'no' ? '❌ Ingen overskuddsdeling eller cashback-hvelv.' : '❌ No profit sharing or cashback treasury.'}</div>
              </div>
            </div>

            {/* Box 2: ATLAS Closed-Loop */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl border border-indigo-800 shadow-xl space-y-4 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase border border-emerald-400/30">
                {locale === 'no' ? 'ATLAS Lukket Medlemsklubb' : 'ATLAS Private Member Club'}
              </div>
              <h3 className="text-xl font-black text-white">
                {locale === 'no' ? 'Private B2B Bedbank-engrospriser' : 'Private B2B Wholesale Net Rates'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Når hoteller har ledige rom, overfører de disse til B2B Bedbanks (Hotelbeds, WebBeds) med 20% til 45% rabatt under én ufravikelig regel: Prisen kan kun vises bak en passordbeskyttet, lukket medlemsvegg.'
                  : 'When hotels have unsold rooms, they quietly release them to B2B Wholesale Bedbanks (Hotelbeds, WebBeds) at 20% to 45% off under one legal rule: The price must only be shown behind a private password-protected membership wall.'}
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs text-emerald-300 font-semibold space-y-1">
                <div>{locale === 'no' ? '✓ 100% rene engrospriser føres rett videre til deg.' : '✓ 100% Net Wholesale Pricing passed straight to you.'}</div>
                <div>{locale === 'no' ? '✓ 0% kommersielt påslag (vi tjener kun penger på medlemskontingent).' : '✓ Zero retail markups (we make money only on memberships).'}</div>
                <div>{locale === 'no' ? '✓ 24/7 prisdropp-robot refunderer automatiske prisfall til ditt Visa-kort.' : '✓ 24/7 post-booking re-booker auto-refunds price drops to your Visa.'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Real Rate Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {locale === 'no' ? 'Regnestykket: Rene engrosbesparelser' : 'The Math: Upfront Wholesale Savings'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Ekte prissammenligninger side-om-side for identiske 3-netters 5-stjerners reservasjoner:'
                : 'Real-world side-by-side comparison for identical 3-night 5-star resort reservations:'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">{locale === 'no' ? 'Eiendomsnavn & Datoer' : 'Luxury Property & Dates'}</th>
                  <th className="py-3 px-4">{locale === 'no' ? 'Expedia / Åpen markedspris' : 'Expedia / Public Retail'}</th>
                  <th className="py-3 px-4">{locale === 'no' ? 'ATLAS Engrospris' : 'ATLAS Wholesale'}</th>
                  <th className="py-3 px-4 text-emerald-600">{locale === 'no' ? 'Din netto besparelse' : 'Your Upfront Savings'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    The Grand Bellagio Resort (Las Vegas) <br />
                    <span className="text-[10px] text-slate-400 font-normal">
                      {locale === 'no' ? '3 netter • Fountain View King' : '3 Nights • Fountain View King'}
                    </span>
                  </td>
                  <td className="py-4 px-4 line-through text-slate-400">$1,167 ($389/nt)</td>
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">$665 ($221/nt)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">
                    {locale === 'no' ? 'SPAR $502 (43% Rabatt)' : 'SAVE $502 (43% Off)'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    Villa L’Étoile Beachfront Estate (St. Barts) <br />
                    <span className="text-[10px] text-slate-400 font-normal">
                      {locale === 'no' ? '3 netter • 6 soverom, kokk & butler inkludert' : '3 Nights • 6BR Chef & Butler Included'}
                    </span>
                  </td>
                  <td className="py-4 px-4 line-through text-slate-400">$17,400 ($5,800/nt)</td>
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">$9,600 ($3,200/nt)</td>
                  <td className="py-4 px-4 font-black text-emerald-600">
                    {locale === 'no' ? 'SPAR $7,800 (45% Rabatt)' : 'SAVE $7,800 (45% Off)'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    Icon of the Seas Caribbean Cruise <br />
                    <span className="text-[10px] text-slate-400 font-normal">
                      {locale === 'no' ? '7 netter • Oceanview Balcony + $250 ombordkreditt' : '7-Night Oceanview Balcony + $250 Credit'}
                    </span>
                  </td>
                  <td className="py-4 px-4 line-through text-slate-400">$2,240</td>
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">$1,390</td>
                  <td className="py-4 px-4 font-black text-emerald-600">
                    {locale === 'no' ? 'SPAR $850 (38% Rabatt)' : 'SAVE $850 (38% Off)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: The 3-Step Lifecycle */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-emerald-600 tracking-wider">
              {locale === 'no' ? '360° Medlemsreise' : 'The 360° Member Journey'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Du vinner før, under og etter hver eneste reise' : 'You Win Before, During, and After Every Trip'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h4 className="font-extrabold text-base text-slate-900">
                {locale === 'no' ? 'Før: Ved bestilling' : 'Upfront at Booking'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Spar 20% til 45% umiddelbart på over 1 million hoteller, luksusvillaer, cruise og flybilletter med direkte engrosavregning.'
                  : 'Save 20% to 45% instantly on 1,000,000+ hotels, villas, cruises, and private jet empty legs with 100% raw wholesale pass-through.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h4 className="font-extrabold text-base text-slate-900">
                {locale === 'no' ? 'Under: På reisen' : 'During Your Travels'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Gå forbi 2-timers passkøer på 3 minutter via Airport Fast-Track, nyt VIP-lounger og oppgrader umiddelbart til Hilton Diamond & Marriott Platinum.'
                  : 'Skip 2-hour customs lines in 3 minutes via Airport Fast-Track, enjoy VIP lounges, and upgrade instantly to Hilton Diamond & Marriott Platinum.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h4 className="font-extrabold text-base text-slate-900">
                {locale === 'no' ? 'Etter: Ved hjemkomst' : 'After You Return'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Prisdropp-roboten refunderer automatiske prisfall til ditt Visa-kort, Sentinel sikrer €600 flykompensasjon, og klubben utbetaler årlig overskuddsandel 31. desember.'
                  : 'Pruvo auto-refunds price drops to your Visa card, AirHelp wins $650 delay payouts, and the club pays you an annual profit dividend on Dec 31.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Honest Transparency FAQ */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {locale === 'no' ? 'Ofte stilte spørsmål og full åpenhet' : 'Frequently Asked Questions & Truths'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Full transparens om hvordan forretningsmodellen fungerer og hvorfor den eksisterer.'
                : 'Complete transparency on how we operate and why this model exists.'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Er det lovlig for hoteller å tilby så store rabatter?'
                  : 'Is it legal for hotels to offer these massive discounts?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Ja, 100% lovlig. Rate Parity-klausuler gjelder kun offentlig annonserte priser på åpne nettsteder. Hoteller har i over 30 år distribuert konfidensielle engrospriser via lukkede medlemsorganisasjoner (som Costco Travel, FoundersCard og lukkede bedriftsklubber).'
                  : 'Yes, 100% legal. Rate parity contracts only restrict publicly advertised prices. Hotels have legally distributed wholesale net rates to private, closed-loop membership organizations (like Costco Travel, FoundersCard, and corporate employee clubs) for over 30 years.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Hvordan tjener ATLAS penger når dere ikke har påslag på rompriser?'
                  : 'How does ATLAS make money if you don\'t mark up room prices?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Vi opererer på samme måte som Costco: gjennom forutsigbare, transparente årlige medlemskap ($179/år for Gold eller $349/år for Platinum), pluss mindre formidlingshonorarer på betalingskort. Fordi vi ikke er avhengige av påslag på rom for å overleve, føres 100% av engrosrabatten direkte til deg.'
                  : 'We operate like Costco or Netflix: on transparent, predictable annual membership subscriptions ($179/yr Gold or $349/yr Platinum), plus modest merchant interchange on our co-branded Visa cards. Because we don\'t rely on room markups to survive, we pass 100% of the wholesale discount directly to you.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Hvordan mottar mitt Visa-kort penger i praksis?'
                  : 'How does the Visa Prepaid Card actually receive funds?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Ditt ATLAS Visa-kort er et ekte betalingskort levert i samarbeid med Stripe Issuing. Når våre automatiske systemer henter inn prisdropp-refusjoner, vinner flykompensasjon eller deler ut årlig utbytte, settes midlene rett inn på din kortsaldo for fri bruk over hele verden.'
                  : 'Your ATLAS Visa card is an authentic co-branded Visa debit/prepaid card powered by Stripe Issuing. When our automated systems recover a price-drop refund, win an airline delay payout, or distribute year-end dividends, the funds are deposited directly into your card balance to spend anywhere worldwide.'}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-indigo-900 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center mx-auto text-slate-950 font-black shadow-lg">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-black">
            {locale === 'no'
              ? 'Klar til å reise til ekte engrospriser?'
              : 'Ready to Travel at Raw Wholesale Net Rates?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {locale === 'no'
              ? 'Bli med tusenvis av bevisste reisende som aldri betaler detaljistpåslag igjen. Start ditt 30-dagers VIP-medlemskap risikofritt.'
              : 'Join thousands of smart travelers who never pay retail markups again. Start your 30-day VIP membership risk-free.'}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/proof"
              className="py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'no' ? 'Se Prisbevis-motoren i sanntid' : 'See Live Savings Proof Engine'}</span>
            </Link>
            <Link
              href="/membership"
              className="py-4 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>{locale === 'no' ? 'Utforsk medlemskap' : 'Explore Membership Plans'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
