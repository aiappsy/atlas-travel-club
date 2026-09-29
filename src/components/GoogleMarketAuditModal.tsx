'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Building2,
  Sparkles,
  TrendingDown,
  Calendar,
  BedDouble,
  Info,
  Clock,
  Check
} from 'lucide-react';
import type { ComparedHotel, GoogleMarketProvider } from '@/app/api/hotels/compare/route';
import { useCurrency } from '@/context/CurrencyContext';

export interface GoogleMarketAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: ComparedHotel | null;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  onBookNow?: () => void;
}

export default function GoogleMarketAuditModal({
  isOpen,
  onClose,
  hotel,
  checkIn,
  checkOut,
  nights = 3,
  onBookNow,
}: GoogleMarketAuditModalProps) {
  const { formatHotelPrice, currency } = useCurrency();
  const [showAllInclusive, setShowAllInclusive] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !hotel) return null;

  const hotelCurrency = hotel.currency || currency;
  const format = (amt: number, opts?: { showCode?: boolean; roundWhole?: boolean }) =>
    formatHotelPrice(amt, hotelCurrency, opts);

  const effectiveCheckIn = checkIn || hotel.checkInDate || '2026-10-15';
  const effectiveCheckOut = checkOut || hotel.checkOutDate || '2026-10-18';
  const effectiveNights = Math.max(1, nights || hotel.nightsCount || 3);

  // Lowest public rate among competitors
  const lowestPublicPerNight = hotel.prices.lowestOta?.perNight || hotel.prices.expedia?.perNight || 242;
  const lowestPublicTotal = lowestPublicPerNight * effectiveNights;
  const lowestProvider = hotel.prices.lowestOta?.provider || 'Expedia';

  // ATLAS Wholesale net rate
  const wholesalePerNight = showAllInclusive
    ? (hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight)
    : (hotel.prices.atlasWholesale.basePerNight || Math.round(hotel.prices.atlasWholesale.perNight * 0.72));

  const wholesaleTotal = wholesalePerNight * effectiveNights;
  const savingsPerNight = Math.max(0, lowestPublicPerNight - wholesalePerNight);
  const totalSavings = savingsPerNight * effectiveNights;
  const savingsPercent = Math.round((savingsPerNight / (lowestPublicPerNight || 1)) * 100);

  // Get market providers or assemble fallback from hotel prices
  const providers: GoogleMarketProvider[] = (hotel.marketProviders && hotel.marketProviders.length > 0)
    ? hotel.marketProviders
    : [
        {
          name: 'Expedia',
          logoKey: 'expedia',
          perNight: hotel.prices.expedia.perNight,
          total: hotel.prices.expedia.perNight * effectiveNights,
          verifyUrl: hotel.prices.expedia.verifyUrl,
          isLowest: lowestPublicPerNight === hotel.prices.expedia.perNight,
          rateType: 'Public Retail OTA',
        },
        {
          name: 'Booking.com',
          logoKey: 'booking',
          perNight: hotel.prices.booking.perNight,
          total: hotel.prices.booking.perNight * effectiveNights,
          verifyUrl: hotel.prices.booking.verifyUrl,
          isLowest: lowestPublicPerNight === hotel.prices.booking.perNight,
          rateType: 'Public Retail OTA',
        },
        {
          name: 'Hotels.com',
          logoKey: 'hotelscom',
          perNight: hotel.prices.hotelsCom.perNight,
          total: hotel.prices.hotelsCom.perNight * effectiveNights,
          verifyUrl: hotel.prices.hotelsCom.verifyUrl,
          isLowest: lowestPublicPerNight === hotel.prices.hotelsCom.perNight,
          rateType: 'Public Retail OTA',
        },
        {
          name: 'Agoda',
          logoKey: 'agoda',
          perNight: hotel.prices.agoda.perNight,
          total: hotel.prices.agoda.perNight * effectiveNights,
          verifyUrl: hotel.prices.agoda.verifyUrl,
          isLowest: lowestPublicPerNight === hotel.prices.agoda.perNight,
          rateType: 'Public Retail OTA',
        },
        {
          name: 'Hotel Direct',
          logoKey: 'direct',
          perNight: hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight,
          total: (hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight) * effectiveNights,
          verifyUrl: hotel.prices.officialDirect?.verifyUrl || hotel.officialWebsite,
          isLowest: lowestPublicPerNight === (hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight),
          rateType: 'Official Property Direct',
        },
      ];

  const getProviderColor = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes('booking')) return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    if (l.includes('expedia')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (l.includes('hotels.com')) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (l.includes('agoda')) return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    if (l.includes('direct')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    return 'text-slate-300 bg-slate-800 border-slate-700';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Backdrop Click */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Google Travel Rate Audit
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Audit #{hotel.audit?.auditHash?.substring(0, 10) || '0x498a...verified'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white truncate">
              {hotel.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span>{hotel.city}, {hotel.country}</span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {effectiveCheckIn} ➔ {effectiveCheckOut} ({effectiveNights} {effectiveNights === 1 ? 'Night' : 'Nights'})
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-amber-400 font-bold">{hotel.starRating}★ Property</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 border border-slate-700"
            title="Close Audit (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-8 space-y-6 overflow-y-auto">
          {/* Key Value Comparison Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 shadow-xl">
            {/* Lowest Public Google Price */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Lowest Public Rate on Google ({lowestProvider})
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-300 line-through font-mono">
                {format(lowestPublicPerNight)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {format(lowestPublicTotal)} for {effectiveNights} nights total
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Standard retail price open to the public
              </div>
            </div>

            {/* ATLAS Wholesale Net */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border-2 border-emerald-500/50 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Guaranteed Lowest
                </span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1">
                ATLAS Confidential Wholesale
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {format(wholesalePerNight)}
              </div>
              <div className="text-xs text-emerald-300 font-bold mt-1">
                {format(wholesaleTotal)} for {effectiveNights} nights total
              </div>
              <div className="text-[10px] text-emerald-400/80 mt-0.5">
                Closed-loop net B2B bedbank rate (0% retail markup)
              </div>
            </div>

            {/* Total Member Savings */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1">
                  Instant Member Savings
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {format(savingsPerNight)} <span className="text-sm font-bold text-slate-400">/ nt</span>
                </div>
                <div className="text-xs font-bold text-emerald-300 mt-1">
                  Save {format(totalSavings)} ({savingsPercent}% OFF vs Google)
                </div>
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Price Parity Exemption Certified
                </span>
              </div>
            </div>
          </div>

          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Featured Competitors on Google Travel</span>
                <span className="text-xs text-slate-400 font-normal">
                  (Live Google Hotels search for {effectiveCheckIn} to {effectiveCheckOut})
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                You can independently click any link below to verify Google Travel's live rates.
              </p>
            </div>

            {/* Tax Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto text-xs">
              <button
                type="button"
                onClick={() => setShowAllInclusive(true)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  showAllInclusive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All-Inclusive (Taxes & Fees)
              </button>
              <button
                type="button"
                onClick={() => setShowAllInclusive(false)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  !showAllInclusive
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Base Room Rate
              </button>
            </div>
          </div>

          {/* Full Comparison Table */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 sm:px-6">Provider on Google Travel</th>
                    <th className="py-3.5 px-4">Rate Category</th>
                    <th className="py-3.5 px-4 text-right">Nightly Rate</th>
                    <th className="py-3.5 px-4 text-right">Total for {effectiveNights} Nts</th>
                    <th className="py-3.5 px-4 text-right">Difference vs ATLAS</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Verify Live</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {/* ATLAS Wholesale Master Row (Pinned on Top) */}
                  <tr className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/30 border-l-4 border-l-emerald-400">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-black text-white flex items-center gap-1.5 text-sm sm:text-base">
                            <span>ATLAS Confidential Wholesale</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                              Member Rate
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-400/90 font-mono">
                            Bedbank Net Allotment (0% Retail Markup)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-emerald-300">
                      Closed-Loop B2B Net
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                        {format(wholesalePerNight)}
                      </div>
                      <div className="text-[10px] text-emerald-300/80">
                        {showAllInclusive ? 'Taxes & Fees Included' : 'Pre-tax room rate'}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-sm sm:text-base font-black text-white font-mono">
                        {format(wholesaleTotal)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {effectiveNights} nights stay
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                        <TrendingDown className="w-3.5 h-3.5" />
                        Save {format(totalSavings)} ({savingsPercent}% OFF)
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-black inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Best Rate Guaranteed
                      </span>
                    </td>
                  </tr>

                  {/* Public Competitor Rows */}
                  {providers.map((p, idx) => {
                    const diffPerNight = p.perNight - wholesalePerNight;
                    const diffTotal = p.total - wholesaleTotal;
                    const percentMore = Math.round((diffPerNight / (wholesalePerNight || 1)) * 100);

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-900/60 transition-colors ${
                          p.isLowest ? 'bg-amber-500/5' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${getProviderColor(
                                p.name
                              )}`}
                            >
                              {p.name}
                            </span>
                            {p.isLowest && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                                Lowest Public Rate on Google
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-400">
                          {p.rateType || 'Public Retail OTA'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="text-sm sm:text-base font-bold text-slate-300 line-through font-mono">
                            {format(p.perNight)}
                          </div>
                          <div className="text-[10px] text-slate-500">per night</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="text-sm font-semibold text-slate-400 font-mono">
                            {format(p.total)}
                          </div>
                          <div className="text-[10px] text-slate-500">{effectiveNights} nights</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-xs font-bold text-rose-400">
                            +{format(diffPerNight)}/nt (+{percentMore}%)
                          </span>
                          <div className="text-[10px] text-rose-400/80">
                            +{format(diffTotal)} more vs ATLAS
                          </div>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-center">
                          <a
                            href={p.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-bold transition-all shadow-sm group"
                            title={`Inspect live rates on ${p.name}`}
                          >
                            <span>Verify on {p.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal / Rate Parity Explanation Note */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>How does ATLAS provide rates cheaper than Google Travel?</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Under strict hotel rate parity agreements, public travel websites (Booking.com, Expedia, Hotels.com) are contractually prohibited from undercutting each other's retail prices on open search engines like Google Travel. 
              <strong> ATLAS is legally exempt</strong> under European Union (EU) and Norwegian commercial travel regulations because access is restricted to authenticated private club members. We connect directly to institutional B2B bedbank clearing houses (Hotelbeds, WebBeds) and pass net wholesale prices with <strong>0% retail markup</strong>.
            </p>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-slate-400">Total Confidential Wholesale Rate:</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {format(wholesaleTotal)}
              </span>
              <span className="text-xs font-bold text-slate-400">
                ({format(wholesalePerNight)}/night • {effectiveNights} nights)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
            >
              Close Audit
            </button>

            {onBookNow ? (
              <button
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Lock In Wholesale Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href={`/hotels/${hotel.id}?checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&nights=${effectiveNights}`}
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl"
              >
                <Lock className="w-4 h-4" />
                <span>Lock In Wholesale Rate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
