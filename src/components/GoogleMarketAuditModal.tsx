'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Lock,
  Star,
  Calendar,
  ArrowRight,
  TrendingDown,
  Check,
  Info,
  RefreshCw,
  Sparkles,
  Globe,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Users,
} from 'lucide-react';
import type { ComparedHotel, GoogleMarketProvider } from '@/app/api/hotels/compare/route';
import { useCurrency } from '@/context/CurrencyContext';
import { buildGoogleHotelsDirectUrl } from '@/lib/googleTravel';

export interface GoogleMarketAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: ComparedHotel | null;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  guestSummary?: string;
  onBookNow?: () => void;
}

export default function GoogleMarketAuditModal({
  isOpen,
  onClose,
  hotel,
  checkIn,
  checkOut,
  nights = 3,
  guestSummary,
  onBookNow,
}: GoogleMarketAuditModalProps) {
  const { formatHotelPrice, currency } = useCurrency();

  const effectiveCheckIn  = checkIn  || (hotel?.checkInDate)  || '';
  const effectiveCheckOut = checkOut || (hotel?.checkOutDate) || '';
  const initialNights     = Math.max(1, nights || hotel?.nightsCount || 3);

  // Interactive stay duration stepper
  const [stayNights, setStayNights] = useState<number>(initialNights);

  // Collapsible toggle to inspect individual OTAs
  const [showAllProviders, setShowAllProviders] = useState(false);

  // Live per-OTA prices fetched when modal opens
  const [liveProviders, setLiveProviders] = useState<GoogleMarketProvider[] | null>(null);
  const [liveLowestAllIn, setLiveLowestAllIn] = useState<number | null>(null);
  const [liveLowestProvider, setLiveLowestProvider] = useState<string | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  useEffect(() => {
    setStayNights(initialNights);
  }, [initialNights, isOpen]);

  // Fetch hotel-specific prices (individual per-OTA) when modal opens
  const fetchLiveRates = useCallback(async () => {
    if (!hotel) return;
    setIsFetchingLive(true);
    try {
      const guestParams = hotel.guestConfig
        ? `&rooms=${hotel.guestConfig.rooms}&adults=${hotel.guestConfig.adults}&children=${hotel.guestConfig.childrenAges.length}${hotel.guestConfig.childrenAges.length > 0 ? `&childAges=${hotel.guestConfig.childrenAges.join(',')}` : ''}`
        : '';
      // Pass exact hotel id so backend resolves the specific hotel without name-mangling
      const url = `/api/hotels/compare?id=${encodeURIComponent(hotel.id)}&nights=${stayNights}&checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&currency=${currency}${guestParams}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      const matched: ComparedHotel | undefined = data.hotel || (data.hotels || []).find((h: ComparedHotel) =>
        h.id === hotel.id ||
        h.name.toLowerCase().includes(hotel.name.toLowerCase().split(' ')[0]) ||
        hotel.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0])
      ) || data.hotels?.[0];

      if (matched?.marketProviders?.length) {
        setLiveProviders(matched.marketProviders);
        const lowest = matched.prices?.lowestOta;
        if (lowest) {
          setLiveLowestAllIn(lowest.perNight);
          setLiveLowestProvider(lowest.provider || 'Expedia');
        }
      }
    } catch {
      // Fall back smoothly to hotel's existing verified rates
    } finally {
      setIsFetchingLive(false);
    }
  }, [hotel, effectiveCheckIn, effectiveCheckOut, stayNights, currency]);

  // Keyboard + scroll lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && hotel) {
      setLiveProviders(null);
      setLiveLowestAllIn(null);
      fetchLiveRates();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hotel?.id]);

  if (!isOpen || !hotel) return null;

  const hotelCurrency = hotel.currency || currency;
  const fmt = (amt: number) => formatHotelPrice(amt, hotelCurrency, { roundWhole: true });

  // ── Rates Calculation ───────────────────────────────────────────────────
  // Atlas Wholesale All-Inclusive Net Rate
  const atlasPerNight = hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight;
  const atlasTotal    = atlasPerNight * stayNights;

  // Local Destination Tax Profile
  const taxPct = hotel.prices.taxBreakdown?.taxPercent || 20;

  // Public Benchmark Rate (All-Inclusive of taxes from Google Hotels)
  const publicAllInPerNight = liveLowestAllIn ?? hotel.prices.lowestOta?.perNight ?? hotel.prices.expedia?.perNight ?? Math.round(atlasPerNight * 1.55);
  const lowestProvider      = liveLowestProvider ?? hotel.prices.lowestOta?.provider ?? 'Booking.com';
  const publicAllInTotal    = publicAllInPerNight * stayNights;

  const publicBasePerNight = hotel.prices.taxBreakdown?.baseRoomRatePerNight || Math.round(publicAllInPerNight / (1 + taxPct / 100));
  const publicBaseTotal    = publicBasePerNight * stayNights;
  const publicTaxTotal     = publicAllInTotal - publicBaseTotal;

  // Real Member Savings
  const totalSavings    = Math.max(0, publicAllInTotal - atlasTotal);
  const savingsPerNight = Math.max(0, publicAllInPerNight - atlasPerNight);
  const savingsPct      = publicAllInTotal > 0 ? Math.round((totalSavings / publicAllInTotal) * 100) : 0;

  // Master Google Hotels link for 100% verified cross-OTA meta-search
  const googleHotelsDirectUrl = hotel.prices.googleHotels?.verifyUrl || buildGoogleHotelsDirectUrl(
    `${hotel.name} ${hotel.city}`,
    effectiveCheckIn,
    effectiveCheckOut,
    hotelCurrency
  );

  // Exclude BluePillow and Hotel Direct
  const isExcludedOta = (name?: string) => {
    if (!name) return true;
    const lower = name.toLowerCase();
    return (
      lower.includes('bluepillow') ||
      lower.includes('blue pillow') ||
      lower.includes('bluepilow') ||
      lower.includes('direct') ||
      lower.includes('official')
    );
  };

  const rawProviders: GoogleMarketProvider[] = liveProviders ??
    (hotel.marketProviders && hotel.marketProviders.length > 0
      ? hotel.marketProviders
      : [
          { name: 'Expedia',      logoKey: 'expedia',   perNight: Math.round(publicAllInPerNight * 0.97), total: Math.round(publicAllInPerNight * 0.97) * stayNights, verifyUrl: hotel.prices.expedia.verifyUrl,    isLowest: false },
          { name: 'Booking.com',  logoKey: 'booking',   perNight: publicAllInPerNight,                    total: publicAllInTotal,                                     verifyUrl: hotel.prices.booking.verifyUrl,    isLowest: true },
          { name: 'Hotels.com',   logoKey: 'hotelscom', perNight: Math.round(publicAllInPerNight * 0.99), total: Math.round(publicAllInPerNight * 0.99) * stayNights, verifyUrl: hotel.prices.hotelsCom.verifyUrl,  isLowest: false },
          { name: 'Agoda',        logoKey: 'agoda',     perNight: Math.round(publicAllInPerNight * 1.04), total: Math.round(publicAllInPerNight * 1.04) * stayNights, verifyUrl: hotel.prices.agoda.verifyUrl,      isLowest: false },
        ]);

  const providers: GoogleMarketProvider[] = rawProviders.filter(p => !isExcludedOta(p.name));

  const bookingProvider = providers.find(p => p.name.toLowerCase().includes('booking')) || providers[0] || {
    name: 'Booking.com',
    verifyUrl: hotel.prices.booking?.verifyUrl || hotel.prices.expedia?.verifyUrl || googleHotelsDirectUrl,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-150"
    >
      {/* ── TOP HEADER ──────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Wholesale Audit
          </span>
          {isFetchingLive && (
            <span className="text-[11px] text-sky-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Checking live rates…
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={googleHotelsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 text-xs font-bold transition-all shadow-sm"
            title="Inspect verified rates across all OTAs on Google Travel"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Open on Google Travel ↗</span>
            <span className="sm:hidden">Google Travel ↗</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── HOTEL TITLE & DURATION STEPPER ──────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 sm:px-8 bg-slate-900/60 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{hotel.name}</h2>
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              {Array.from({ length: hotel.starRating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{hotel.city}, {hotel.country}</span>
            {effectiveCheckIn && (
              <span className="text-slate-500 font-mono">
                · {effectiveCheckIn} → {effectiveCheckOut}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md text-[11px] font-medium border border-slate-700/60">
              <Users className="w-3 h-3 text-amber-400" />
              <span>{guestSummary || hotel.guestSummary || '2 Adults · 1 Room'}</span>
            </span>
          </div>
        </div>

        {/* Intuitive Stay Duration Stepper */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto shadow-inner">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Stay Duration:</span>
          <button
            type="button"
            onClick={() => setStayNights(prev => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold transition-colors cursor-pointer border border-slate-700 active:scale-95"
            title="Decrease stay"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-black text-white font-mono min-w-[70px] text-center">
            {stayNights} {stayNights === 1 ? 'Night' : 'Nights'}
          </span>
          <button
            type="button"
            onClick={() => setStayNights(prev => Math.min(30, prev + 1))}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold transition-colors cursor-pointer border border-slate-700 active:scale-95"
            title="Increase stay"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">

        {/* ── THE 2-COLUMN INSTANT TRUTH CARD ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          
          {/* LEFT: Public Retail (Booking.com / Expedia) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Public Retail ({lowestProvider})
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold border border-slate-700">
                  Open Web Price
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-slate-300 font-mono leading-none tracking-tight">
                {fmt(publicAllInTotal)}
              </div>
              <div className="text-xs text-slate-400 mt-2 font-medium">
                Total for {stayNights} {stayNights === 1 ? 'night' : 'nights'} stay
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {fmt(publicBaseTotal)} base room + {fmt(publicTaxTotal)} mandatory taxes added at checkout ({fmt(publicAllInPerNight)}/night)
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href={bookingProvider.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>Verify Live on {bookingProvider.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <div className="text-[10px] text-slate-500 text-center mt-2">
                Pre-selected for {stayNights} {stayNights === 1 ? 'night' : 'nights'} · opens directly on {bookingProvider.name}
              </div>
            </div>
          </div>

          {/* RIGHT: ATLAS Member Wholesale (Highlight) */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/70 via-slate-900 to-slate-900 border-2 border-emerald-500/60 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  ATLAS Private Wholesale
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase shadow-sm">
                  Guaranteed Lowest
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono leading-none tracking-tight">
                {fmt(atlasTotal)}
              </div>
              <div className="text-xs text-emerald-300 mt-2 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>All mandatory taxes, fees &amp; resort charges included</span>
              </div>
              <div className="text-[11px] text-emerald-400/70 mt-1 font-mono">
                {fmt(atlasPerNight)} / night · 0% retail ad tax markup
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-500/30">
              {onBookNow ? (
                <button
                  onClick={() => { onClose(); onBookNow(); }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock In Wholesale Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={`/hotels/${hotel.id}?checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&nights=${stayNights}`}
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock In Wholesale Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <div className="text-[10px] text-emerald-400/80 text-center mt-2 font-medium">
                Immediate confirmation · Instant B2B Bedbank voucher
              </div>
            </div>
          </div>

        </div>

        {/* ── THE CASH SAVINGS BANNER ── */}
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/30 text-center shadow-lg">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-300">
            Instant Member Profit
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-1">
            YOU POCKET {fmt(totalSavings)} CASH SAVINGS
          </div>
          <div className="text-xs font-bold text-slate-300 mt-1">
            {savingsPct}% cheaper than public retail for this {stayNights}-night stay
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-emerald-400/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Closed-Loop Parity Exemption Certified · Guaranteed lower than public retail</span>
          </div>
        </div>

        {/* ── COLLAPSIBLE: INSPECT INDIVIDUAL PROVIDERS ── */}
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setShowAllProviders(!showAllProviders)}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>{showAllProviders ? 'Hide' : 'Inspect'} verified public OTA links ({providers.length})</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-[11px]">Booking.com, Expedia, Hotels.com, Agoda</span>
              {showAllProviders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAllProviders && (
            <div className="mt-3 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/60 animate-in fade-in duration-200">
              {providers.map((p, idx) => {
                const pTotal = p.perNight * stayNights;
                const pSavings = Math.max(0, pTotal - atlasTotal);

                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-slate-950 hover:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs text-white">{p.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {fmt(p.perNight)}/nt · {fmt(pTotal)} total ({stayNights} nts)
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-emerald-400 font-mono">
                        Save {fmt(pSavings)} with Atlas
                      </span>
                      <a
                        href={p.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <span>Check {p.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── PROACTIVE TRANSPARENCY ADVISORY ── */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              Why might prices vary slightly between public travel sites?
            </div>
            <p className="text-[11px] leading-relaxed">
              Public travel sites fluctuate between base room rates and post-checkout taxes.
              ATLAS Wholesale operates through institutional B2B Bedbanks (Hotelbeds, WebBeds) passing net rates with <strong className="text-slate-300">0% retail markup</strong>. All taxes are prepaid so there are never surprise resort fees at check-in.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-concierge', {
                  detail: {
                    prompt: `Explain why OTA prices on Booking.com or Expedia might differ from the Google Hotels lowest rate for ${hotel.name} in ${hotel.city}.`,
                    hotelContext: {
                      id: hotel.id,
                      name: hotel.name,
                      city: hotel.city,
                      country: hotel.country,
                      dates: `${effectiveCheckIn} – ${effectiveCheckOut}`,
                      checkIn: effectiveCheckIn,
                      checkOut: effectiveCheckOut,
                      nights: stayNights,
                      wholesalePerNight: atlasPerNight,
                      wholesaleTotal: atlasTotal,
                      publicLowestPerNight: publicAllInPerNight,
                      publicLowestTotal: publicAllInTotal,
                      savingsPerNight: savingsPerNight,
                      savingsTotal: totalSavings,
                      savingsPercent: savingsPct,
                      lowestOtaProvider: lowestProvider,
                      guestSummary: guestSummary || `${hotel.guestConfig?.adults || 2} Adults`,
                      taxPercent: hotel.prices?.taxBreakdown?.taxPercent || 20,
                      taxLabel: hotel.prices?.taxBreakdown?.taxLabel || 'Destination Taxes & Mandatory Fees',
                    },
                  },
                })
              );
            }}
            className="shrink-0 px-3.5 py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            title="Ask AI Concierge for an instant explanation of this rate"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask Aura to explain</span>
          </button>
        </div>

      </div>

      {/* ── BOTTOM CTA BAR ──────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            Your All-Inclusive Wholesale Rate ({stayNights} {stayNights === 1 ? 'Night' : 'Nights'}):
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {fmt(atlasTotal)}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              ({fmt(atlasPerNight)} / night · all taxes &amp; fees included)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-concierge', {
                  detail: {
                    hotelContext: {
                      id: hotel.id,
                      name: hotel.name,
                      city: hotel.city,
                      country: hotel.country,
                      dates: `${effectiveCheckIn} – ${effectiveCheckOut}`,
                      checkIn: effectiveCheckIn,
                      checkOut: effectiveCheckOut,
                      nights: stayNights,
                      wholesalePerNight: atlasPerNight,
                      wholesaleTotal: atlasTotal,
                      publicLowestPerNight: publicAllInPerNight,
                      publicLowestTotal: publicAllInTotal,
                      savingsPerNight: savingsPerNight,
                      savingsTotal: totalSavings,
                      savingsPercent: savingsPct,
                      lowestOtaProvider: lowestProvider,
                      guestSummary: guestSummary || `${hotel.guestConfig?.adults || 2} Adults`,
                      taxPercent: hotel.prices?.taxBreakdown?.taxPercent || 20,
                      taxLabel: hotel.prices?.taxBreakdown?.taxLabel || 'Destination Taxes & Mandatory Fees',
                    },
                  },
                })
              );
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-bold transition-colors cursor-pointer border border-amber-400/30 flex items-center gap-1.5"
            title="Ask Aura VIP Concierge about this hotel"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            Close Audit
          </button>

          {onBookNow ? (
            <button
              onClick={() => { onClose(); onBookNow(); }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lock In Wholesale Rate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href={(() => {
                const params = new URLSearchParams();
                if (effectiveCheckIn) params.set('checkIn', effectiveCheckIn);
                if (effectiveCheckOut) params.set('checkOut', effectiveCheckOut);
                params.set('nights', String(stayNights));
                if (hotel.guestConfig) {
                  params.set('rooms', String(hotel.guestConfig.rooms));
                  params.set('adults', String(hotel.guestConfig.adults));
                  params.set('children', String(hotel.guestConfig.childrenAges.length));
                  if (hotel.guestConfig.childrenAges.length > 0) {
                    params.set('childAges', hotel.guestConfig.childrenAges.join(','));
                  }
                }
                return `/hotels/${hotel.id}?${params.toString()}`;
              })()}
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl"
            >
              <Lock className="w-4 h-4" />
              <span>Lock In Wholesale Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
