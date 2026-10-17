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
            {locale === 'no' ? 'Full åpenhet om reiseøkonomi' : '100% Transparent Travel & Banking Economics'}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {locale === 'no' ? (
              <>
                Slik fungerer Atlas: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  Eksklusiv medlemsklubb med ekte engrospriser
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
              ? 'Hvorfor åpne reisesider legger på store provisjoner, hvordan Atlas henter B2B-engrospriser direkte fra grossister, og hvordan medlemskapet gir deg garanterte nettopriser.'
              : 'Why public websites like Expedia charge retail markups, how ATLAS accesses confidential B2B Bedbank wholesale rates, and how your ATLAS Visa® Card deposits real cash back in your pocket.'}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ 0 kr i påslag' : '✓ Zero Retail Markups'}</span>
            <span className="flex items-center gap-1">•</span>
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ Ekte B2B-nettopriser' : '✓ B2B Bedbank Net Rates'}</span>
            <span className="flex items-center gap-1">•</span>
            <span className="flex items-center gap-1">{locale === 'no' ? '✓ Automatisert prisfallovervåking' : '✓ Automated Price-Drop Refunds'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Section 1: The Public Retail Trap vs The Closed-Loop Secret */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-sky-600 tracking-wider">
              {locale === 'no' ? 'Bak kulissene' : 'The Industry Secret'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Hvorfor koster det mer på vanlige reisesider?' : 'Why Is Expedia Always More Expensive?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {locale === 'no'
                ? 'Hotellbransjen styres av avtaler om prisparitet som de færreste reisende kjenner til.'
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
                {locale === 'no' ? 'Bundet av prisparitet' : 'Bound by "Rate Parity" Contracts'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Hoteller inngår avtaler med åpne bestillingsportaler som forbyr dem å vise lavere priser offentlig. For å dekke markedsføring og fortjeneste, legger vanlige nettsteder på 15–35 % på hver bestilling.'
                  : 'Hotels sign strict legal agreements with public booking sites promising they will never advertise a cheaper price publicly online. To fund billions in TV ads and Google search campaigns, public OTAs add a 20% to 45% retail markup on top of every booking.'}
              </p>
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 text-xs text-rose-900 font-semibold space-y-1">
                <div>{locale === 'no' ? '❌ Du betaler unødvendige påslag og provisjoner.' : '❌ You pay retail markups on every stay.'}</div>
                <div>{locale === 'no' ? '❌ Ingen oppfølging hvis prisen faller før ankomst.' : '❌ If the price drops after booking, you lose the savings.'}</div>
                <div>{locale === 'no' ? '❌ Ingen tilbakebetaling eller kickback.' : '❌ No profit sharing or cashback treasury.'}</div>
              </div>
            </div>

            {/* Box 2: ATLAS Closed-Loop */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl border border-indigo-800 shadow-xl space-y-4 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase border border-emerald-400/30">
                {locale === 'no' ? 'Atlas eksklusiv medlemsklubb' : 'ATLAS Private Member Club'}
              </div>
              <h3 className="text-xl font-black text-white">
                {locale === 'no' ? 'Direkte B2B-engrospriser' : 'Private B2B Wholesale Net Rates'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Når hoteller vil fylle ledige rom, frigir de rom til globale grossister med betydelige rabatter. Vilkåret er at prisene kun kan tilbys medlemmer bak en innlogging.'
                  : 'When hotels have unsold rooms, they quietly release them to B2B Wholesale Bedbanks (Hotelbeds, WebBeds) at 20% to 45% off under one legal rule: The price must only be shown behind a private password-protected membership wall.'}
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs text-emerald-300 font-semibold space-y-1">
                <div>{locale === 'no' ? '✓ 100 % rene engrospriser rett til deg.' : '✓ 100% Net Wholesale Pricing passed straight to you.'}</div>
                <div>{locale === 'no' ? '✓ 0 kr i påslag – vi lever kun av medlemskontingenten.' : '✓ Zero retail markups (we make money only on memberships).'}</div>
                <div>{locale === 'no' ? '✓ Kontinuerlig overvåking av prisfall frem mot avreise.' : '✓ 24/7 post-booking re-booker auto-refunds price drops to your Visa.'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Real Rate Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {locale === 'no' ? 'Prissammenligning' : 'The Math: Upfront Wholesale Savings'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Eksempler på identiske reservasjoner:'
                : 'Real-world side-by-side comparison for identical 3-night 5-star resort reservations:'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">{locale === 'no' ? 'Hotell og opphold' : 'Luxury Property & Dates'}</th>
                  <th className="py-3 px-4">{locale === 'no' ? 'Offentlig nettpris' : 'Expedia / Public Retail'}</th>
                  <th className="py-3 px-4">{locale === 'no' ? 'Atlas-medlemspris' : 'ATLAS Wholesale'}</th>
                  <th className="py-3 px-4 text-emerald-600">{locale === 'no' ? 'Din besparelse' : 'Your Upfront Savings'}</th>
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
                    {locale === 'no' ? 'Du sparer $502 (43 %)' : 'SAVE $502 (43% Off)'}
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
                    {locale === 'no' ? 'Du sparer $7,800 (45 %)' : 'SAVE $7,800 (45% Off)'}
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
                    {locale === 'no' ? 'Du sparer $850 (38 %)' : 'SAVE $850 (38% Off)'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 bg-amber-50/40">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    Atlas Signature Resort (Costa del Sol / Tenerife) <br />
                    <span className="text-[10px] text-slate-500 font-normal">
                      {locale === 'no' ? '7 netter • 2-roms leilighet med fullt kjøkken (opptil 4–6 pers)' : '7 Nights • 2-Bedroom Condo with Full Kitchen (Sleeps 4–6)'}
                    </span>
                  </td>
                  <td className="py-4 px-4 line-through text-slate-400">15 900 kr</td>
                  <td className="py-4 px-4 font-black text-amber-700 text-sm">Fra 3 890 kr</td>
                  <td className="py-4 px-4 font-black text-emerald-600">
                    {locale === 'no' ? 'Du sparer inntil 12 010 kr (76 %)' : 'SAVE up to 12,010 NOK (76% Off)'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 bg-emerald-50/40">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    Atlas Hotel Breaks (Dolomittene / Syd-Tirol) <br />
                    <span className="text-[10px] text-slate-500 font-normal">
                      {locale === 'no' ? '3 netter • 0 kr i rompris for 2 pers (betal kun lokal halvpensjon)' : '3 Nights • $0 Room Rate for 2 Guests (Pay Local Half-Board Only)'}
                    </span>
                  </td>
                  <td className="py-4 px-4 line-through text-slate-400">9 800 kr</td>
                  <td className="py-4 px-4 font-black text-rose-700 text-sm">3 100 kr</td>
                  <td className="py-4 px-4 font-black text-emerald-600">
                    {locale === 'no' ? 'Du sparer 6 700 kr (68 %)' : 'SAVE 6,700 NOK (68% Off)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2B: Distressed Inventory Liquidation Explained */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-indigo-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === 'no' ? 'Likvidering av overskuddskapasitet' : 'Distressed Inventory Mechanics'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {locale === 'no'
                ? 'Hvorfor kan vi tilby leilighetsuker fra 3 890 kr og 0 kr i rompris?'
                : 'Why Can Atlas Offer 7-Night Condos from 3,890 NOK and $0 Hotel Rooms?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {locale === 'no'
                ? 'Reisebransjen har en iboende svakhet: et tomt hotellrom eller en tom ferieleilighet er tapt omsetning som aldri kan hentes inn igjen. Åpen dumping på Booking.com eller Hotels.com er forbudt av prisparitetsavtaler. Gjennom Atlas løses dette diskret:'
                : 'Hospitality inventory is perishable: an empty condo or hotel bed produces zero revenue. Dumping rates publicly on Expedia violates chain covenants. Atlas solves this via two sovereign closed-loop mechanisms:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
                <span>🏖️</span>
                <span>{locale === 'no' ? 'RCI / Timeshare Allotments' : 'RCI Timeshare Surplus'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Store ferieanlegg har ledige uker i skuldersesonger. De frigir disse som forhåndsbetalte sertifikater til lukkede klubber til ren engrospris (fra 3 890 kr for 7 netter) i stedet for å la dem stå tomme. Du får full leilighet med kjøkken til en brøkdel av vanlig hotellpris.'
                  : 'Major vacation resorts allocate empty shoulder-season weeks to private closed clubs at wholesale clearance rates (from 3,890 NOK / week) to cover maintenance rather than sit vacant. You get a full apartment with kitchen for the cost of a single motel night.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <span>🏨</span>
                <span>{locale === 'no' ? 'Holiday Plus / Connex Hotellopphold' : 'Holiday Plus Hotel Breaks'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Kvalitetshoteller og boutique-resorter tilbyr gratis overnatting (0 kr rompris) for 2 personer fordi de vet at gjestene spiser i restauranten. Du betaler kun hotellets faste, rimelige halvpensjonspris ved utsjekk, og hotellet fyller kapasitet uten å bryte offentlige rompriser.'
                  : 'Curated partner hotels offer complimentary rooms ($0 room rate) for 2 guests because they generate restaurant and beverage revenue. You pay only the published fixed half-board rate at checkout, filling empty capacity without triggering public rate parity alarms.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The 3-Step Lifecycle */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-emerald-600 tracking-wider">
              {locale === 'no' ? 'Medlemsfordeler' : 'The 360° Member Journey'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Fordeler før, under og etter reisen' : 'You Win Before, During, and After Every Trip'}
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
                  ? 'Få umiddelbar tilgang til engrospriser på over 1 million hoteller, flybilletter til nettopris, VIP-lounger og cruise.'
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
                  ? 'Nyt tilgang til over 1 400 flyplasslounger for 330 kr, prioritert innsjekking og personlig concierge-hjelp.'
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
                  ? 'Automatisk oppfølging av flyforsinkelser (EU261 opptil 600 €) og rask kreditering av kickbacks rett til din konto.'
                  : 'Pruvo auto-refunds price drops to your Visa card, AirHelp wins $650 delay payouts, and the club pays you an annual profit dividend on Dec 31.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Honest Transparency FAQ */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {locale === 'no' ? 'Spørsmål og svar' : 'Frequently Asked Questions & Truths'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Alt du trenger å vite om hvordan klubben fungerer.'
                : 'Complete transparency on how we operate and why this model exists.'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Er det lovlig for hoteller å tilby lukkede medlemspriser?'
                  : 'Is it legal for hotels to offer these massive discounts?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Ja, helt uproblematisk. Prisparitetsklausuler gjelder utelukkende priser som annonseres åpent for allmennheten. Hoteller har i flere tiår tilbudt konfidensielle engrospriser gjennom lukkede medlemsklubber og bedriftsnettverk.'
                  : 'Yes, 100% legal. Rate parity contracts only restrict publicly advertised prices. Hotels have legally distributed wholesale net rates to private, closed-loop membership organizations (like Costco Travel, FoundersCard, and corporate employee clubs) for over 30 years.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Hvordan tjener Atlas penger uten påslag på prisene?'
                  : 'How does ATLAS make money if you don\'t mark up room prices?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Vi har samme forretningsmodell som Costco: et fast, årlig medlemskap på 1 290 kr (tilsvarer 107,50 kr per måned). Vi tar 0 kr i påslag på hotell, fly eller lounger, og gir deg 100 % av engrosrabatten uavkortet.'
                  : 'We operate like Costco: on a transparent, flat annual membership (1 290 NOK/yr, ~$120/yr or ~107 NOK/mo) with 0 kr booking fees on everything (hotels, cars, flights, and lounges). We pass 100% of the raw B2B wholesale discount directly to you.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-sm text-slate-900">
                {locale === 'no'
                  ? 'Hvordan fungerer kickback og refusjoner i praksis?'
                  : 'How does the Visa Prepaid Card actually receive funds?'}
              </h5>
              <p className="text-slate-600 leading-relaxed">
                {locale === 'no'
                  ? 'Når du mottar kickback fra reiser eller kompensasjon for flyforsinkelser, godskrives beløpet din medlemskonto for direkte uttak eller fradrag på fremtidige reiser.'
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
              ? 'Bli med i medlemsklubben og få tilgang til ekte nettopriser. Prøv Atlas gratis i 14 dager.'
              : 'Join thousands of smart travelers who never pay retail markups again. Start your 30-day VIP membership risk-free.'}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/proof"
              className="py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'no' ? 'Prøv priskalkulatoren' : 'See Live Savings Proof Engine'}</span>
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
