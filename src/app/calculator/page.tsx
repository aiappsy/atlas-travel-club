'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Hotel,
  Plane,
  Car
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CalculatorPage() {
  const { convertPrice, formatPrice } = useCurrency();
  const { currentLanguage } = useLanguage();
  const isNo = currentLanguage === 'no';

  // Calculator inputs
  const [tripsPerYear, setTripsPerYear] = useState<number>(3);
  const [hotelNights, setHotelNights] = useState<number>(14);
  const [avgHotelNightRate, setAvgHotelNightRate] = useState<number>(450); // USD
  const [flightsPerYear, setFlightsPerYear] = useState<number>(4);
  const [flightClass, setFlightClass] = useState<'Economy' | 'Premium' | 'Business' | 'First'>('Business');
  const [rentalCarDays, setRentalCarDays] = useState<number>(7);

  // Dynamic calculations
  const calculation = useMemo(() => {
    // Hotel savings: avg 28% off retail
    const totalHotelSpendRetail = hotelNights * avgHotelNightRate;
    const hotelSavings = totalHotelSpendRetail * 0.28;

    // Flight savings based on class
    const flightMultiplier = {
      Economy: 65,
      Premium: 140,
      Business: 380,
      First: 750,
    }[flightClass];
    const flightSavings = flightsPerYear * flightMultiplier;

    // Car rental savings: avg $70/day savings on luxury fleet
    const carSavings = rentalCarDays * 70;

    // Perks value (lounge passes: $65 each x trips, upgrades, etc.)
    const loungeValue = tripsPerYear * 2 * 65;
    const perkValue = 350 + loungeValue;

    const totalAnnualSavings = hotelSavings + flightSavings + carSavings + perkValue;
    const annualMembershipCost = 1490; // Gold/Platinum tier average
    const netReturn = totalAnnualSavings - annualMembershipCost;
    const roiPercentage = Math.round((netReturn / annualMembershipCost) * 100);

    return {
      hotelSavings,
      flightSavings,
      carSavings,
      perkValue,
      totalAnnualSavings,
      annualMembershipCost,
      netReturn,
      roiPercentage,
    };
  }, [hotelNights, avgHotelNightRate, flightsPerYear, flightClass, rentalCarDays, tripsPerYear]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Light Header */}
      <div className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            {isNo ? 'Offisiell Sparekalkulator' : 'Official Savings Calculator'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isNo ? 'Beregn Din Årlige Medlemsgevinst' : 'Calculate Your Annual Return'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {isNo
              ? 'Juster dine reisevaner og se nøyaktig hvor mye du sparer på grossistpriser, VIP-oppgraderinger og loungefordeler.'
              : 'Tailor your travel habits to reveal exact verified savings across hotels, aviation, car rentals, and complimentary perks.'}
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sliders and Controls */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-7 shadow-xs">
            <h2 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
              {isNo ? 'Dine Reisevaner' : 'Your Travel Profile'}
            </h2>

            {/* Slider 1: Hotel Nights */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-amber-600" />
                  {isNo ? 'Hotellnetter per år:' : 'Hotel nights per year:'}
                </span>
                <span className="font-black text-amber-800">{hotelNights} {isNo ? 'netter' : 'nights'}</span>
              </div>
              <input
                type="range"
                min="4"
                max="60"
                step="1"
                value={hotelNights}
                onChange={(e) => setHotelNights(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>4 {isNo ? 'netter' : 'nights'}</span>
                <span>30 {isNo ? 'netter' : 'nights'}</span>
                <span>60 {isNo ? 'netter' : 'nights'}</span>
              </div>
            </div>

            {/* Slider 2: Average Nightly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  {isNo ? 'Gjennomsnittlig rompris per natt:' : 'Avg. nightly room rate:'}
                </span>
                <span className="font-black text-amber-800">
                  {formatPrice(convertPrice(avgHotelNightRate))}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="1500"
                step="25"
                value={avgHotelNightRate}
                onChange={(e) => setAvgHotelNightRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>Standard (150$)</span>
                <span>5-Star Luxury (450$)</span>
                <span>Ultra-Luxury (1500$)</span>
              </div>
            </div>

            {/* Selector: Flights */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <Plane className="w-4 h-4 text-sky-600" />
                  {isNo ? 'Antall flyreiser og kabinklasse:' : 'Flights per year & Cabin:'}
                </span>
                <span className="font-black text-amber-800">{flightsPerYear} {isNo ? 'reiser' : 'trips'}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['Economy', 'Premium', 'Business', 'First'] as const).map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setFlightClass(cls)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                      flightClass === cls
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={flightsPerYear}
                onChange={(e) => setFlightsPerYear(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer mt-2"
              />
            </div>

            {/* Slider 4: Car Rental Days */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700 font-bold flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-700" />
                  {isNo ? 'Dager med billeie per år:' : 'Car rental days per year:'}
                </span>
                <span className="font-black text-amber-800">{rentalCarDays} {isNo ? 'dager' : 'days'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={rentalCarDays}
                onChange={(e) => setRentalCarDays(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Live Savings & ROI Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-amber-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {isNo ? 'Beregnet Netto Besparelse' : 'Estimated Annual Savings'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  +{calculation.roiPercentage}% ROI
                </span>
              </div>

              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                {formatPrice(convertPrice(calculation.totalAnnualSavings))}
              </div>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                {isNo ? 'Beregnet årlig verdi spart sammenlignet med offentlige priser.' : 'Verified annual savings vs. public OTA retail rates.'}
              </p>

              {/* Breakdown */}
              <div className="space-y-3 py-4 border-y border-slate-100 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isNo ? 'Hoteller (-28% gjennomsnitt):' : 'Hotels (-28% avg.):'}</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice(convertPrice(calculation.hotelSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isNo ? 'Fly (Netto grossistpriser):' : 'Flights (Net wholesale fares):'}</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice(convertPrice(calculation.flightSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isNo ? 'Billeie & 0,- egenandel:' : 'Car Rental & 0 Excess:'}</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice(convertPrice(calculation.carSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isNo ? 'VIP Lounge Pass & Fordeler:' : 'Lounge passes & perks:'}</span>
                  <span className="font-bold text-emerald-700">
                    {formatPrice(convertPrice(calculation.perkValue))}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-sm">
                  <span className="text-slate-700">{isNo ? 'Netto profitt etter medlemskontingent:' : 'Net profit after membership:'}</span>
                  <span className="text-amber-800 font-black">
                    {formatPrice(convertPrice(calculation.netReturn))}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/membership"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                {isNo ? 'Sikre Ditt Medlemskap' : 'Lock In Membership'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {isNo ? 'Beskyttet av 110% Rate Parity Guarantee' : 'Protected by 110% Rate Parity Guarantee'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
