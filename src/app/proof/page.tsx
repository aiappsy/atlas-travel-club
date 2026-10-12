'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Hotel,
  Plane,
  Coffee,
  Ship,
  CheckCircle2,
  Lock,
  Building2,
  CreditCard,
  Percent,
  Sliders,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SavingsProofPage() {
  const { formatPrice } = useCurrency();
  const { t, locale } = useLanguage();

  // Multi-Vertical ROI State
  // 1. Hotels
  const [hotelNights, setHotelNights] = useState<number>(12); // annual nights
  const hotelSavingsPerNight = 165; // average wholesale margin saved vs Booking/Expedia

  // 2. Flights
  const [annualFlights, setAnnualFlights] = useState<number>(4); // roundtrips per year
  const flightSavingsPerTicket = 180; // NDC direct net fare savings vs OTA markups

  // 3. Lounges
  const [loungeVisits, setLoungeVisits] = useState<number>(6); // annual lounge visits
  const loungeSavingsPerVisit = 33; // $32 member pass vs $65 walk-in door rate

  // 4. Cruises
  const [cruiseSailings, setCruiseSailings] = useState<number>(1); // cruise trips/yr
  const cruiseSavingsPerSailing = 650; // wholesale cabin rebate + $200 onboard credit

  // Annual Totals
  const totalHotelSavings = hotelNights * hotelSavingsPerNight;
  const totalFlightSavings = annualFlights * flightSavingsPerTicket;
  const totalLoungeSavings = loungeVisits * loungeSavingsPerVisit;
  const totalCruiseSavings = cruiseSailings * cruiseSavingsPerSailing;

  const grossAnnualSavings = totalHotelSavings + totalFlightSavings + totalLoungeSavings + totalCruiseSavings;
  const membershipFee = 179; // Atlas Club Annual Membership
  const netProfit = grossAnnualSavings - membershipFee;
  const roiMultiplier = Math.round((grossAnnualSavings / membershipFee) * 10);
  const roiPercent = Math.round((grossAnnualSavings / membershipFee) * 100);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Header Banner - Clean Light / Subtle Slate Accent */}
      <div className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {locale === 'no' ? 'Omfattende ROI- og Prisbevis-kalkulator' : 'Comprehensive Multi-Vertical Savings Engine'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {locale === 'no' ? 'Hvor mye sparer du med ATLAS?' : 'How Much Will You Save with ATLAS?'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {locale === 'no'
              ? 'Beregn din personlige avkastning (ROI) på luksushoteller, direkte NDC-flyvninger, VIP-lounger og cruiseskip til 0% påslag.'
              : 'Simulate your personal cash ROI across luxury hotels, direct NDC commercial flights, VIP airport lounges, and ocean cruises with 0% retail markups.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Interactive Multi-Vertical Calculator Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sliders for each vertical */}
            <div className="lg:col-span-7 space-y-7">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-600" />
                  {locale === 'no' ? 'Din Reiseprofil' : 'Your Travel Profile'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {locale === 'no'
                    ? 'Juster glidebryterne etter hvor ofte du reiser i løpet av året:'
                    : 'Adjust the sliders to reflect how often you travel throughout the year:'}
                </p>
              </div>

              {/* Slider 1: Hotels */}
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Hotel className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {locale === 'no' ? 'Hotellnetter / år' : 'Hotel Nights / Year'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {locale === 'no' ? 'Snitt engrosbesparelse: ~$165/natt' : 'Average wholesale saving: ~$165/night'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-black text-slate-900">
                      {hotelNights} {locale === 'no' ? 'netter' : 'nights'}
                    </span>
                    <div className="text-[11px] font-mono text-emerald-600 font-bold">
                      +{formatPrice(totalHotelSavings)}
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={hotelNights}
                  onChange={(e) => setHotelNights(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 {locale === 'no' ? 'netter' : 'nights'}</span>
                  <span>15 {locale === 'no' ? 'netter' : 'nights'}</span>
                  <span>30 {locale === 'no' ? 'netter' : 'nights'}</span>
                  <span>40+ {locale === 'no' ? 'netter' : 'nights'}</span>
                </div>
              </div>

              {/* Slider 2: Flights */}
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {locale === 'no' ? 'Flyreiser tur/retur / år' : 'Roundtrip Flights / Year'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {locale === 'no' ? 'Direkte NDC-nettobesparelse + EU261: ~$180/billett' : 'Direct NDC net fare savings + EU261 alerts: ~$180/ticket'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-black text-slate-900">
                      {annualFlights} {locale === 'no' ? 'reiser' : 'trips'}
                    </span>
                    <div className="text-[11px] font-mono text-emerald-600 font-bold">
                      +{formatPrice(totalFlightSavings)}
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={annualFlights}
                  onChange={(e) => setAnnualFlights(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 {locale === 'no' ? 'reiser' : 'flights'}</span>
                  <span>5 {locale === 'no' ? 'reiser' : 'flights'}</span>
                  <span>10 {locale === 'no' ? 'reiser' : 'flights'}</span>
                  <span>15+ {locale === 'no' ? 'reiser' : 'flights'}</span>
                </div>
              </div>

              {/* Slider 3: Airport Lounges */}
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {locale === 'no' ? 'VIP Lounge-besøk / år' : 'Airport Lounge Visits / Year'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {locale === 'no' ? '$32 medlemspris vs $65 dørpris (Spar $33/besøk)' : '$32 Member digital pass vs $65 walk-in rate (Save $33/visit)'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-black text-slate-900">
                      {loungeVisits} {locale === 'no' ? 'besøk' : 'visits'}
                    </span>
                    <div className="text-[11px] font-mono text-emerald-600 font-bold">
                      +{formatPrice(totalLoungeSavings)}
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={loungeVisits}
                  onChange={(e) => setLoungeVisits(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 {locale === 'no' ? 'besøk' : 'visits'}</span>
                  <span>8 {locale === 'no' ? 'besøk' : 'visits'}</span>
                  <span>16 {locale === 'no' ? 'besøk' : 'visits'}</span>
                  <span>24+ {locale === 'no' ? 'besøk' : 'visits'}</span>
                </div>
              </div>

              {/* Slider 4: Cruises */}
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                      <Ship className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {locale === 'no' ? 'Cruisereiser / år' : 'Cruise Sailings / Year'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {locale === 'no' ? 'Engrosrabatt på lugar + fri kreditt om bord: ~$650/seiling' : 'Net wholesale stateroom + free onboard credit: ~$650/sailing'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-black text-slate-900">
                      {cruiseSailings} {locale === 'no' ? 'seilinger' : 'sailings'}
                    </span>
                    <div className="text-[11px] font-mono text-emerald-600 font-bold">
                      +{formatPrice(totalCruiseSavings)}
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={cruiseSailings}
                  onChange={(e) => setCruiseSailings(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 {locale === 'no' ? 'seilinger' : 'sailings'}</span>
                  <span>1 {locale === 'no' ? 'seiling' : 'sailing'}</span>
                  <span>2 {locale === 'no' ? 'seilinger' : 'sailings'}</span>
                  <span>4 {locale === 'no' ? 'seilinger' : 'sailings'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Big Interactive ROI Summary Card */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 border border-slate-800">
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                    {locale === 'no' ? 'Estimert Årlig Totalbesparelse' : 'Total Estimated Annual Savings'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 mt-1">
                    {formatPrice(grossAnnualSavings)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {locale === 'no' ? 'Samlet verdi levert på tvers av alle 4 reisekategorier' : 'Combined value delivered across all 4 verticals'}
                  </div>
                </div>

                {/* Vertical-by-vertical Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-amber-400" />
                      {locale === 'no' ? `Engroshoteller (${hotelNights} netter)` : `Wholesale Hotels (${hotelNights} nts)`}
                    </span>
                    <span className="font-mono font-bold text-white">+{formatPrice(totalHotelSavings)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-sky-400" />
                      {locale === 'no' ? `Direkte flybilletter (${annualFlights} reiser)` : `Direct Flights (${annualFlights} flights)`}
                    </span>
                    <span className="font-mono font-bold text-white">+{formatPrice(totalFlightSavings)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-amber-400" />
                      {locale === 'no' ? `VIP Lounger (${loungeVisits} pass)` : `Airport Lounges (${loungeVisits} passes)`}
                    </span>
                    <span className="font-mono font-bold text-white">+{formatPrice(totalLoungeSavings)}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Ship className="w-3.5 h-3.5 text-indigo-400" />
                      {locale === 'no' ? `Luksuscruise (${cruiseSailings} seilinger)` : `Ocean Cruises (${cruiseSailings} sailings)`}
                    </span>
                    <span className="font-mono font-bold text-white">+{formatPrice(totalCruiseSavings)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-slate-400">
                    <span>{locale === 'no' ? 'Atlas Klubb Medlemskontingent:' : 'Atlas Club Membership Cost:'}</span>
                    <span className="font-mono text-rose-400">-{formatPrice(membershipFee)}/{locale === 'no' ? 'år' : 'yr'}</span>
                  </div>
                </div>

                {/* Net Profit & ROI Box */}
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-300">
                      {locale === 'no' ? 'Din netto årlige gevinst:' : 'Your Net Annual Profit:'}
                    </span>
                    <span className="text-lg font-black font-mono text-emerald-400">
                      +{formatPrice(netProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      {locale === 'no' ? 'Estimert avkastning på medlemskap:' : 'Estimated Return on Investment:'}
                    </span>
                    <span className="font-mono font-bold text-amber-300">{roiPercent}% ({Math.round(roiMultiplier / 10)}x ROI)</span>
                  </div>
                </div>

                <Link
                  href="/membership"
                  className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01]"
                >
                  <span>{t.common.startTrialNow}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-[11px] text-center text-slate-400">
                  {locale === 'no'
                    ? '🔒 0 kr å betale i dag • Beskyttet av 30 dagers prisgaranti'
                    : '🔒 $0 due today • Protected by 30-day rate parity guarantee'}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2 shadow-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{locale === 'no' ? 'Slik leverer ATLAS disse besparelsene' : 'How ATLAS Delivers These Savings'}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {locale === 'no'
                    ? 'Offentlige nettsider legger til 20% til 45% påslag for å betale for milliarder i søkeannonser. Fordi ATLAS opererer som en lukket privat klubb, videresender vi rene engrospriser direkte til deg med 0% kommisjon.'
                    : 'Public sites add 20% to 45% markups to pay for search advertising. Because ATLAS operates as a gated private club, we pass raw wholesale rates directly to you with 0% retail markup.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Member Value Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {locale === 'no' ? 'Tjener seg raskt inn' : 'Pays for Itself Fast'}
            </h4>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Et enkelt 2-netters hotellopphold eller én flyreise tur/retur sparer normalt inn hele årsavgiften.'
                : 'A single 2-night stay or one roundtrip flight typically recovers the entire annual $179 fee.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {locale === 'no' ? 'Ekte Engrosavregning' : 'True Wholesale Clearing'}
            </h4>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Direkte kobling til B2B Bedbanks og IATA/NDC-linjer med 100% åpenhet rundt nettopriser.'
                : 'Direct connection to B2B Bedbanks and airline NDC pipelines with 100% price transparency.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {locale === 'no' ? 'Risikofri Prøveperiode' : 'Zero Risk Free Trial'}
            </h4>
            <p className="text-xs text-slate-500">
              {locale === 'no'
                ? 'Prøv klubben gratis i 14 dager. Verifiser alle livepriser før medlemskapet trer i kraft.'
                : 'Try the club free for 14 days. Inspect all live rates before your membership begins.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
