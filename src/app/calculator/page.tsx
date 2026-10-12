'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Hotel,
  Plane,
  Car,
  Compass
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
    <div className="min-h-screen bg-[#07090C] text-[#F3F4F6] selection:bg-[#D4AF37] selection:text-black">
      {/* Header */}
      <div className="relative pt-12 pb-20 px-4 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#07090C] to-[#07090C]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            {isNo ? 'Offisiell Sparekalkulator' : 'Official Savings Calculator'}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-4">
            {isNo ? 'Beregn Din Årlige Medlemsgevinst' : 'Calculate Your Annual Return'}
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {isNo
              ? 'Juster dine reisevaner og se nøyaktig hvor mye du sparer på grossistpriser, VIP-oppgraderinger og loungefordeler.'
              : 'Tailor your travel habits to reveal exact verified savings across hotels, aviation, car rentals, and complimentary perks.'}
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sliders and Controls */}
          <div className="lg:col-span-7 bg-[#0E121A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-7 shadow-xl">
            <h2 className="font-serif font-bold text-xl text-white pb-3 border-b border-white/5">
              {isNo ? 'Dine Reisevaner' : 'Your Travel Profile'}
            </h2>

            {/* Slider 1: Hotel Nights */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-amber-400" />
                  {isNo ? 'Hotellnetter per år:' : 'Hotel nights per year:'}
                </span>
                <span className="font-bold text-amber-300">{hotelNights} {isNo ? 'netter' : 'nights'}</span>
              </div>
              <input
                type="range"
                min="4"
                max="60"
                step="1"
                value={hotelNights}
                onChange={(e) => setHotelNights(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>4 {isNo ? 'netter' : 'nights'}</span>
                <span>30 {isNo ? 'netter' : 'nights'}</span>
                <span>60 {isNo ? 'netter' : 'nights'}</span>
              </div>
            </div>

            {/* Slider 2: Average Nightly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  {isNo ? 'Gjennomsnittlig rompris per natt:' : 'Avg. nightly room rate:'}
                </span>
                <span className="font-bold text-amber-300">
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
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>Standard (150$)</span>
                <span>5-Star Luxury (450$)</span>
                <span>Ultra-Luxury (1500$)</span>
              </div>
            </div>

            {/* Selector: Flights */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium flex items-center gap-2">
                  <Plane className="w-4 h-4 text-blue-400" />
                  {isNo ? 'Antall flyreiser og kabinklasse:' : 'Flights per year & Cabin:'}
                </span>
                <span className="font-bold text-amber-300">{flightsPerYear} {isNo ? 'reiser' : 'trips'}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['Economy', 'Premium', 'Business', 'First'] as const).map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setFlightClass(cls)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                      flightClass === cls
                        ? 'bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black shadow-md'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
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
                className="w-full accent-[#D4AF37] cursor-pointer mt-2"
              />
            </div>

            {/* Slider 4: Car Rental Days */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-400" />
                  {isNo ? 'Dager med billeie per år:' : 'Car rental days per year:'}
                </span>
                <span className="font-bold text-amber-300">{rentalCarDays} {isNo ? 'dager' : 'days'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={rentalCarDays}
                onChange={(e) => setRentalCarDays(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Live Savings & ROI Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-[#131722] to-[#0A0D13] border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {isNo ? 'Beregnet Netto Besparelse' : 'Estimated Annual Savings'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +{calculation.roiPercentage}% ROI
                </span>
              </div>

              <div className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-2">
                {formatPrice(convertPrice(calculation.totalAnnualSavings))}
              </div>
              <p className="text-xs text-gray-400 mb-6">
                {isNo ? 'Beregnet årlig verdi spart sammenlignet med offentlige priser.' : 'Verified annual savings vs. public OTA retail rates.'}
              </p>

              {/* Breakdown */}
              <div className="space-y-3 py-4 border-y border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">{isNo ? 'Hoteller (-28% gjennomsnitt):' : 'Hotels (-28% avg.):'}</span>
                  <span className="font-semibold text-white">
                    {formatPrice(convertPrice(calculation.hotelSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isNo ? 'Fly (Netto grossistpriser):' : 'Flights (Net wholesale fares):'}</span>
                  <span className="font-semibold text-white">
                    {formatPrice(convertPrice(calculation.flightSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isNo ? 'Billeie & 0,- egenandel:' : 'Car Rental & 0 Excess:'}</span>
                  <span className="font-semibold text-white">
                    {formatPrice(convertPrice(calculation.carSavings))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{isNo ? 'VIP Lounge Pass & Fordeler:' : 'Lounge passes & perks:'}</span>
                  <span className="font-semibold text-emerald-400">
                    {formatPrice(convertPrice(calculation.perkValue))}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 font-bold text-sm">
                  <span className="text-gray-300">{isNo ? 'Netto profitt etter medlemskontingent:' : 'Net profit after membership:'}</span>
                  <span className="text-amber-300 font-serif">
                    {formatPrice(convertPrice(calculation.netReturn))}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/membership"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {isNo ? 'Sikre Ditt Medlemskap' : 'Lock In Membership'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {isNo ? 'Beskyttet av 110% Rate Parity Guarantee' : 'Protected by 110% Rate Parity Guarantee'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
