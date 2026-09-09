'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingDown, ArrowRight, Building2, CheckCircle2, ShieldCheck, HelpCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import AuthModal from '@/components/AuthModal';

interface DestinationComparison {
  id: string;
  name: string;
  resortName: string;
  retailOTA: {
    expedia: number;
    bookingCom: number;
    hotelsCom: number;
    rackRate: number;
  };
  wholesaleRate: number;
  image: string;
}

const DESTINATION_DATA: DestinationComparison[] = [
  {
    id: 'vegas',
    name: 'Las Vegas, NV',
    resortName: 'The Bellagio Resort & Fountain View Suite',
    retailOTA: {
      expedia: 389,
      bookingCom: 395,
      hotelsCom: 389,
      rackRate: 440,
    },
    wholesaleRate: 198,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cancun',
    name: 'Cancun, Mexico',
    resortName: 'Secrets Riviera All-Inclusive Oceanfront',
    retailOTA: {
      expedia: 510,
      bookingCom: 525,
      hotelsCom: 510,
      rackRate: 580,
    },
    wholesaleRate: 235,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'paris',
    name: 'Paris, France',
    resortName: 'Le Grand Palace Vendôme Deluxe',
    retailOTA: {
      expedia: 620,
      bookingCom: 640,
      hotelsCom: 620,
      rackRate: 710,
    },
    wholesaleRate: 345,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'orlando',
    name: 'Orlando, FL',
    resortName: 'Kingdom Bay Family Resort & Waterpark',
    retailOTA: {
      expedia: 275,
      bookingCom: 289,
      hotelsCom: 275,
      rackRate: 310,
    },
    wholesaleRate: 129,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    resortName: 'Tokyo Sky Panorama High-Floor Suite',
    retailOTA: {
      expedia: 390,
      bookingCom: 405,
      hotelsCom: 390,
      rackRate: 460,
    },
    wholesaleRate: 215,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
  },
];

export default function SavingsCalculator() {
  const { isMember } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState<string>('vegas');
  const [nights, setNights] = useState<number>(4);
  const [includeRentalCar, setIncludeRentalCar] = useState<boolean>(true);
  const [includeThemePasses, setIncludeThemePasses] = useState<boolean>(false);

  const dest = DESTINATION_DATA.find((d) => d.id === selectedDestId) || DESTINATION_DATA[0];

  // Map destination ID to exact hotel ID
  const hotelIdMap: Record<string, string> = {
    vegas: 'bellagio-las-vegas',
    cancun: 'paradise-cancun',
    paris: 'ritz-paris',
    orlando: 'orlando-resort-spa',
    tokyo: 'shinjuku-tower-tokyo',
  };

  const targetHotelId = hotelIdMap[dest.id] || 'bellagio-las-vegas';

  // Pricing calculations
  const otaHotelTotal = dest.retailOTA.expedia * nights;
  const wholesaleHotelTotal = dest.wholesaleRate * nights;
  const hotelSavings = otaHotelTotal - wholesaleHotelTotal;

  // Car rental addon
  const otaCarTotal = includeRentalCar ? 85 * nights : 0;
  const wholesaleCarTotal = includeRentalCar ? 49 * nights : 0;
  const carSavings = otaCarTotal - wholesaleCarTotal;

  // Theme pass addon
  const otaTicketsTotal = includeThemePasses ? 340 : 0;
  const wholesaleTicketsTotal = includeThemePasses ? 220 : 0;
  const ticketSavings = otaTicketsTotal - wholesaleTicketsTotal;

  const totalOTAPaid = otaHotelTotal + otaCarTotal + otaTicketsTotal;
  const totalWholesalePaid = wholesaleHotelTotal + wholesaleCarTotal + wholesaleTicketsTotal;
  const totalNetSaved = totalOTAPaid - totalWholesalePaid;
  const totalSavedPercent = Math.round((totalNetSaved / totalOTAPaid) * 100);

  const handleBookDeal = () => {
    if (!isMember) {
      setIsAuthOpen(true);
    } else {
      router.push(`/hotels/${targetHotelId}`);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-sky-900/60 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Live B2B Rate Comparison Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Compare Member Wholesale Rates vs Public Portals
            </h2>
            <p className="text-sm text-slate-300">
              Public OTAs are bound by strict rate parity contracts. Below is an unmasked price audit comparing our closed-loop net member price against Expedia, Booking.com, and Hotels.com.
            </p>
          </div>

          {/* Destination Picker Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {DESTINATION_DATA.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDestId(d.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedDestId === d.id
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Comparison Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls & Trip Customizer */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={dest.image}
                  alt={dest.resortName}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    Featured Property
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white line-clamp-1">
                    {dest.resortName}
                  </h4>
                  <div className="text-xs text-slate-400">{dest.name}</div>
                </div>
              </div>

              {/* Stay Duration Slider */}
              <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Length of Stay:</span>
                  <span className="text-amber-300 text-sm font-black">{nights} Nights</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 Night</span>
                  <span>7 Nights (Week)</span>
                  <span>14 Nights</span>
                </div>
              </div>

              {/* Travel Add-ons */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Include Travel Club Add-Ons:
                </div>

                <label className="flex items-center justify-between p-3.5 bg-black/20 rounded-2xl border border-white/5 cursor-pointer hover:bg-black/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeRentalCar}
                      onChange={(e) => setIncludeRentalCar(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 accent-sky-400 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Hertz / Avis Fleet Car Rental
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Wholesale $49/day vs $85/day public retail
                      </div>
                    </div>
                  </div>
                  {includeRentalCar && (
                    <span className="text-[11px] font-bold text-emerald-400">
                      Save {formatPrice(carSavings)}
                    </span>
                  )}
                </label>

                <label className="flex items-center justify-between p-3.5 bg-black/20 rounded-2xl border border-white/5 cursor-pointer hover:bg-black/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeThemePasses}
                      onChange={(e) => setIncludeThemePasses(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 accent-sky-400 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Theme Park / Attraction VIP Passes (2 Guests)
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Wholesale {formatPrice(110)}/ticket vs {formatPrice(170)}/ticket gate price
                      </div>
                    </div>
                  </div>
                  {includeThemePasses && (
                    <span className="text-[11px] font-bold text-emerald-400">
                      Save {formatPrice(ticketSavings)}
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* Side-by-Side OTA Comparison Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Market Price Audit
                  </span>
                  <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                    SAVE {totalSavedPercent}%
                  </span>
                </div>

                {/* Competitor Price Breakdown Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl text-xs">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Expedia.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-rose-300 line-through">
                      {formatPrice(dest.retailOTA.expedia * nights)} ({formatPrice(dest.retailOTA.expedia)}/nt)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl text-xs">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Booking.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-rose-300 line-through">
                      {formatPrice(dest.retailOTA.bookingCom * nights)} ({formatPrice(dest.retailOTA.bookingCom)}/nt)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-xl text-xs">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      Hotels.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-rose-300 line-through">
                      {formatPrice(dest.retailOTA.hotelsCom * nights)} ({formatPrice(dest.retailOTA.hotelsCom)}/nt)
                    </span>
                  </div>
                </div>

                {/* Total Summary Row */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Total Public OTA Cart (with selected add-ons):</span>
                    <span className="font-bold line-through">{formatPrice(totalOTAPaid)}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base font-black text-amber-300">
                    <span>Wholesale Member Total:</span>
                    <span className="text-xl sm:text-2xl">{formatPrice(totalWholesalePaid)}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-300">
                        Your Direct Cash Savings
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                        {formatPrice(totalNetSaved)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-300">
                        {totalSavedPercent}% Less Than Expedia
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleBookDeal}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {!isMember && <Lock className="w-4 h-4 text-slate-950" />}
                  <span>{isMember ? 'Book This Wholesale Deal' : 'Sign Up to Book This Wholesale Deal'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Gate Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode="signup"
        customTitle="Join ATLAS to Unlock Wholesale Rates"
        customSubtitle="Create your free or VIP membership to unlock 0% retail markup and confirm your reservation."
      />
    </>
  );
}
