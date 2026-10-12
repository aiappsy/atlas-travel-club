'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingDown, ArrowRight, Building2, CheckCircle2, ShieldCheck, HelpCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MEMBERSHIP_TIERS, GOLD_VIP_TIER, GOLD_VIP_ANNUAL_FEE } from '@/lib/mockData';
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
  const [selectedTierId, setSelectedTierId] = useState<string>('gold');

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

  // Dynamic Tier Payback Calculations
  const targetTier = MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId) || GOLD_VIP_TIER;
  const tierAnnualFee = targetTier.priceAnnual > 0 ? targetTier.priceAnnual : GOLD_VIP_ANNUAL_FEE;
  const isFullPayback = totalNetSaved >= tierAnnualFee;
  const paybackRatio = Math.round((totalNetSaved / tierAnnualFee) * 100);
  const netProfit = totalNetSaved - tierAnnualFee;

  const handleBookDeal = () => {
    if (!isMember) {
      setIsAuthOpen(true);
    } else {
      router.push(`/hotels/${targetHotelId}`);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-10 text-slate-900 shadow-xl shadow-slate-200/50 border border-slate-200/90 relative overflow-hidden">
        {/* Subtle background ambient accents */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-amber-50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Live Rate Comparison Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Compare Member Rates vs. Public Portals
            </h2>
            <p className="text-sm text-slate-600">
              Public booking portals add markups to protect published rates. Below is a live comparison comparing closed-loop member rates against Expedia, Booking.com, and Hotels.com.
            </p>
          </div>

          {/* Destination Picker Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {DESTINATION_DATA.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDestId(d.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedDestId === d.id
                    ? 'bg-slate-900 text-white shadow-md font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Comparison Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls & Trip Customizer */}
            <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={dest.image}
                  alt={dest.resortName}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    Featured Property
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                    {dest.resortName}
                  </h4>
                  <div className="text-xs text-slate-500">{dest.name}</div>
                </div>
              </div>

              {/* Stay Duration Slider */}
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Length of Stay:</span>
                  <span className="text-slate-900 text-sm font-black">{nights} Nights</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 Night</span>
                  <span>7 Nights (Week)</span>
                  <span>14 Nights</span>
                </div>
              </div>

              {/* Travel Add-ons */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Include Travel Club Add-Ons:
                </div>

                <label className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeRentalCar}
                      onChange={(e) => setIncludeRentalCar(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Hertz / Avis Fleet Car Rental
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Wholesale $49/day vs $85/day public retail
                      </div>
                    </div>
                  </div>
                  {includeRentalCar && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save {formatPrice(carSavings)}
                    </span>
                  )}
                </label>

                <label className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeThemePasses}
                      onChange={(e) => setIncludeThemePasses(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Theme Park / Attraction VIP Passes (2 Guests)
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Wholesale {formatPrice(110)}/ticket vs {formatPrice(170)}/ticket gate price
                      </div>
                    </div>
                  </div>
                  {includeThemePasses && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save {formatPrice(ticketSavings)}
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* Side-by-Side OTA Comparison Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Live Rate Audit
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    SAVE {totalSavedPercent}%
                  </span>
                </div>

                {/* Competitor Price Breakdown Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      Expedia.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-slate-400 line-through">
                      {formatPrice(dest.retailOTA.expedia * nights)} ({formatPrice(dest.retailOTA.expedia)}/nt)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      Booking.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-slate-400 line-through">
                      {formatPrice(dest.retailOTA.bookingCom * nights)} ({formatPrice(dest.retailOTA.bookingCom)}/nt)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      Hotels.com Public Price:
                    </span>
                    <span className="font-mono font-bold text-slate-400 line-through">
                      {formatPrice(dest.retailOTA.hotelsCom * nights)} ({formatPrice(dest.retailOTA.hotelsCom)}/nt)
                    </span>
                  </div>
                </div>

                {/* Total Summary Row */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Total Public OTA Cart:</span>
                    <span className="font-bold line-through">{formatPrice(totalOTAPaid)}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900">
                    <span>Wholesale Member Total:</span>
                    <span className="text-xl sm:text-2xl font-mono text-slate-900">{formatPrice(totalWholesalePaid)}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-800">
                        Your Direct Cash Savings
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                        {formatPrice(totalNetSaved)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-800">
                        {totalSavedPercent}% Lower
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Single {nights}-night stay
                      </div>
                    </div>
                  </div>

                  {/* Membership Payback ROI Callout & Interactive Tier Selector */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5 px-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Payback Against:</span>
                      {MEMBERSHIP_TIERS.filter((t) => t.id !== 'free').map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedTierId(tier.id)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                            selectedTierId === tier.id
                              ? 'bg-slate-900 text-white font-bold shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {tier.name} ({formatPrice(tier.priceAnnual)}/yr)
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">💡</span>
                        <div>
                          <div className="font-bold text-amber-900 uppercase text-[10px] tracking-wider">
                            {targetTier.name} Payback ROI
                          </div>
                          <div className="text-slate-800 text-xs font-medium">
                            {isFullPayback
                              ? `This single trip pays for 100% of your ${formatPrice(tierAnnualFee)} annual fee + leaves +${formatPrice(netProfit)} in savings!`
                              : `This single trip instantly recoups ${paybackRatio}% of your ${targetTier.name} annual fee!`}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-amber-900 text-sm shrink-0 bg-white px-2.5 py-1 rounded-xl border border-amber-200 shadow-xs">
                        {paybackRatio}% Recouped
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleBookDeal}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {!isMember && <Lock className="w-4 h-4 text-amber-400" />}
                  <span>{isMember ? `Book This Deal & Save ${formatPrice(totalNetSaved)}` : `Sign In to Book & Save ${formatPrice(totalNetSaved)}`}</span>
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
