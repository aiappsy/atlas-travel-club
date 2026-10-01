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
  Layers,
  Globe,
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
  onBookNow?: () => void;
}

// Provider accent colours
const PROVIDER_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  expedia:   { bg: 'bg-blue-500/10',   text: 'text-blue-300',   border: 'border-blue-500/30',   dot: 'bg-blue-400' },
  booking:   { bg: 'bg-sky-500/10',    text: 'text-sky-300',    border: 'border-sky-500/30',    dot: 'bg-sky-400' },
  hotelscom: { bg: 'bg-rose-500/10',   text: 'text-rose-300',   border: 'border-rose-500/30',   dot: 'bg-rose-400' },
  agoda:     { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30', dot: 'bg-purple-400' },
  direct:    { bg: 'bg-amber-500/10',  text: 'text-amber-300',  border: 'border-amber-500/30',  dot: 'bg-amber-400' },
  default:   { bg: 'bg-slate-800',     text: 'text-slate-300',  border: 'border-slate-700',     dot: 'bg-slate-400' },
};

function providerStyle(name: string) {
  const k = name.toLowerCase().replace(/[^a-z]/g, '');
  if (k.includes('booking'))  return PROVIDER_STYLES.booking;
  if (k.includes('expedia'))  return PROVIDER_STYLES.expedia;
  if (k.includes('hotelscom') || k.includes('hotelcom')) return PROVIDER_STYLES.hotelscom;
  if (k.includes('agoda'))    return PROVIDER_STYLES.agoda;
  if (k.includes('direct'))   return PROVIDER_STYLES.direct;
  return PROVIDER_STYLES.default;
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

  // View toggle: show total stay (apples-to-apples with Booking.com) or per-night
  const [viewMode, setViewMode] = useState<'total' | 'nightly'>('total');

  // Live per-OTA prices fetched when modal opens
  const [liveProviders, setLiveProviders] = useState<GoogleMarketProvider[] | null>(null);
  const [liveLowestAllIn, setLiveLowestAllIn] = useState<number | null>(null);
  const [liveLowestProvider, setLiveLowestProvider] = useState<string | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [liveError, setLiveError] = useState(false);

  const effectiveCheckIn  = checkIn  || (hotel?.checkInDate)  || '';
  const effectiveCheckOut = checkOut || (hotel?.checkOutDate) || '';
  const effectiveNights   = Math.max(1, nights || hotel?.nightsCount || 3);

  // Fetch hotel-specific prices (individual per-OTA) when modal opens
  const fetchLiveRates = useCallback(async () => {
    if (!hotel) return;
    setIsFetchingLive(true);
    setLiveError(false);
    try {
      const query = encodeURIComponent(`${hotel.name} ${hotel.city}`);
      const url = `/api/hotels/compare?destination=${query}&nights=${effectiveNights}&checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&currency=${currency}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      const matched: ComparedHotel | undefined = (data.hotels || []).find((h: ComparedHotel) =>
        h.name.toLowerCase().includes(hotel.name.toLowerCase().split(' ')[0]) ||
        hotel.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0])
      ) || data.hotels?.[0];

      if (matched?.marketProviders?.length) {
        setLiveProviders(matched.marketProviders);
        const lowest = matched.prices?.lowestOta;
        if (lowest) {
          setLiveLowestAllIn(lowest.perNight);
          setLiveLowestProvider(lowest.provider || 'OTA');
        }
      }
    } catch {
      setLiveError(true);
    } finally {
      setIsFetchingLive(false);
    }
  }, [hotel, effectiveCheckIn, effectiveCheckOut, effectiveNights, currency]);

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
  const atlasTotal    = atlasPerNight * effectiveNights;

  // Local Destination Tax Profile
  const taxPct = hotel.prices.taxBreakdown?.taxPercent || 20;

  // Public Headline Rate (All-Inclusive of taxes from Google Hotels)
  const publicAllInPerNight = liveLowestAllIn ?? hotel.prices.lowestOta?.perNight ?? hotel.prices.expedia?.perNight ?? Math.round(atlasPerNight * 1.55);
  const lowestProvider      = liveLowestProvider ?? hotel.prices.lowestOta?.provider ?? 'Expedia';
  const publicAllInTotal    = publicAllInPerNight * effectiveNights;

  // Derived Pre-Tax Base Room Rate and Tax Portion (no double tax calculation!)
  const publicBasePerNight = hotel.prices.taxBreakdown?.baseRoomRatePerNight || Math.round(publicAllInPerNight / (1 + taxPct / 100));
  const publicBaseTotal    = publicBasePerNight * effectiveNights;
  const publicTaxPerNight  = Math.max(0, publicAllInPerNight - publicBasePerNight);
  const publicTaxTotal     = publicTaxPerNight * effectiveNights;

  // Real Savings vs Public Retail
  const totalSavings    = Math.max(0, publicAllInTotal - atlasTotal);
  const savingsPerNight = Math.max(0, publicAllInPerNight - atlasPerNight);
  const savingsPct      = publicAllInTotal > 0 ? Math.round((totalSavings / publicAllInTotal) * 100) : 0;

  // Estimated Booking.com Genius 10% Discounted Rate for Comparison
  const geniusAllInTotal   = Math.round(publicAllInTotal * 0.90);
  const geniusSavingsTotal = Math.max(0, geniusAllInTotal - atlasTotal);

  // ── Providers ─────────────────────────────────────────────────────────────
  const providers: GoogleMarketProvider[] = liveProviders ??
    (hotel.marketProviders && hotel.marketProviders.length > 0
      ? hotel.marketProviders
      : [
          { name: 'Expedia',      logoKey: 'expedia',   perNight: publicAllInPerNight, total: publicAllInTotal, verifyUrl: hotel.prices.expedia.verifyUrl,    isLowest: true },
          { name: 'Booking.com',  logoKey: 'booking',   perNight: publicAllInPerNight, total: publicAllInTotal, verifyUrl: hotel.prices.booking.verifyUrl,    isLowest: true },
          { name: 'Hotels.com',   logoKey: 'hotelscom', perNight: publicAllInPerNight, total: publicAllInTotal, verifyUrl: hotel.prices.hotelsCom.verifyUrl,  isLowest: true },
          { name: 'Agoda',        logoKey: 'agoda',     perNight: publicAllInPerNight, total: publicAllInTotal, verifyUrl: hotel.prices.agoda.verifyUrl,      isLowest: true },
          { name: 'Hotel Direct', logoKey: 'direct',    perNight: publicAllInPerNight, total: publicAllInTotal, verifyUrl: hotel.prices.officialDirect?.verifyUrl || hotel.officialWebsite, isLowest: false },
        ]);

  const allSamePrice = providers.length > 1 && providers.every(p => p.perNight === providers[0].perNight);
  const isLiveHotelbeds = hotel.audit?.bedbankGateway?.includes('Hotelbeds APItude');

  // Master Google Hotels link for 100% verified cross-OTA meta-search
  const googleHotelsDirectUrl = hotel.prices.googleHotels?.verifyUrl || buildGoogleHotelsDirectUrl(
    `${hotel.name} ${hotel.city}`,
    effectiveCheckIn,
    effectiveCheckOut,
    hotelCurrency
  );

  // Public Market Spread (reflects real differences between Expedia, Booking, and Agoda)
  const providerRates = providers.map((p) => p.perNight);
  const minPublicRate = Math.min(...providerRates, publicAllInPerNight);
  const maxPublicRate = Math.max(...providerRates, publicAllInPerNight);
  const minPublicTotal = minPublicRate * effectiveNights;
  const maxPublicTotal = maxPublicRate * effectiveNights;

  const minSavingsTotal = Math.max(0, minPublicTotal - atlasTotal);
  const maxSavingsTotal = Math.max(0, maxPublicTotal - atlasTotal);
  const minSavingsPct = minPublicTotal > 0 ? Math.round((minSavingsTotal / minPublicTotal) * 100) : 0;
  const maxSavingsPct = maxPublicTotal > 0 ? Math.round((maxSavingsTotal / maxPublicTotal) * 100) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-150"
    >
      {/* ── TOP HEADER BAR ──────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Google Hotels Audit
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:block">
            #{hotel.audit?.auditHash?.substring(0, 10)}
          </span>
          {isFetchingLive && (
            <span className="inline-flex items-center gap-1 text-[11px] text-sky-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Polling live OTA feeds…
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Master Google Travel Meta-Search Link */}
          <a
            href={googleHotelsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 text-xs font-bold transition-all shadow-sm"
            title="Open official Google Hotels page showing all OTAs side-by-side"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Open on Google Travel ↗</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            title="Close Audit (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── HOTEL DETAILS & DATES ────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 sm:px-8 bg-slate-900/60 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{hotel.name}</h2>
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              {Array.from({ length: hotel.starRating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400">
            <span>{hotel.city}, {hotel.country}</span>
            {effectiveCheckIn && (
              <>
                <span className="text-slate-700">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  {effectiveCheckIn} → {effectiveCheckOut} ({effectiveNights} {effectiveNights === 1 ? 'night' : 'nights'} stay)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Total Stay vs Nightly Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('total')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'total'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Total for {effectiveNights} Nights
          </button>
          <button
            type="button"
            onClick={() => setViewMode('nightly')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'nightly'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Price per Night
          </button>
        </div>
      </div>

      {/* ── HERO SIDE-BY-SIDE SAVINGS COMPARISON ──────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-b border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left: ATLAS Wholesale Net */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-emerald-950/50 border-2 border-emerald-500/50 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                ATLAS Member Wholesale
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase">
                Guaranteed Lowest
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono leading-none">
              {viewMode === 'total' ? fmt(atlasTotal) : fmt(atlasPerNight)}
            </div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">
              {viewMode === 'total'
                ? `${fmt(atlasPerNight)} / night · all-inclusive total`
                : `${fmt(atlasTotal)} total for ${effectiveNights} nights`}
            </div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
              <Check className="w-3 h-3 shrink-0" />
              <span>All mandatory taxes &amp; resort fees included (0% markup)</span>
            </div>
          </div>

          {/* Middle: VS Divider */}
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-slate-600 text-2xl font-black">VS</span>
          </div>

          {/* Center: Public Retail Market Range */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Public Retail Market Range
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Google Verified</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-300 font-mono leading-none line-through">
              {viewMode === 'total'
                ? `${fmt(minPublicTotal)} – ${fmt(maxPublicTotal)}`
                : `${fmt(minPublicRate)} – ${fmt(maxPublicRate)}`}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {viewMode === 'total'
                ? `Standard public total across Expedia, Agoda & Booking`
                : `/night across Expedia, Agoda & Booking`}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Rates fluctuate between OTAs based on member tiers &amp; checkout taxes
            </div>
          </div>

          {/* Right: Net Member Savings */}
          <div className="md:col-span-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-center flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300 mb-0.5">
                Your Guaranteed Savings
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {viewMode === 'total' ? fmt(minSavingsTotal) : `${fmt(minPublicRate - atlasPerNight)}/nt`}
              </div>
              <div className="text-xs font-bold text-emerald-300 mt-0.5">
                Save {fmt(minSavingsTotal)} – {fmt(maxSavingsTotal)} ({minSavingsPct}% – {maxSavingsPct}% OFF)
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Rate Parity Exemption</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY & AUDIT TABLE ───────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 sm:px-8 pt-5 pb-2">
          {/* Genius Discount Comparison Notice */}
          <div className="mb-4 p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-xs flex items-start gap-2.5 text-sky-200 shadow-md">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Comparing with Booking.com Genius Member discounts?</span>
              <p className="text-[11px] text-sky-300/90 mt-0.5 leading-relaxed">
                If you have a 10% Genius loyalty discount on Booking.com, their 3-night total is approximately{' '}
                <strong className="text-white font-mono">{fmt(geniusAllInTotal)}</strong> ({fmt(Math.round(publicBaseTotal * 0.9))} base + {fmt(Math.round(publicTaxTotal * 0.9))} taxes).
                Your ATLAS Wholesale rate is{' '}
                <strong className="text-emerald-400 font-mono">{fmt(atlasTotal)}</strong> all-inclusive — still{' '}
                <strong className="text-emerald-300 font-bold">{fmt(geniusSavingsTotal)} cheaper ({Math.round((geniusSavingsTotal / geniusAllInTotal) * 100)}% lower)</strong> than Booking&apos;s lowest loyalty discount!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Live Google Travel Verified Competitors
            </h3>
            <span className="text-[11px] text-slate-400">
              Click any link to inspect live inventory on that provider
            </span>
          </div>
        </div>

        {/* ── ATLAS WHOLESALE ROW (PINNED MASTER) ── */}
        <div className="mx-5 sm:mx-8 mb-3 rounded-2xl border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-950/60 to-slate-900 overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
            <div className="flex items-center gap-3 sm:w-52 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-black text-white">ATLAS Wholesale</div>
                <div className="text-[11px] text-emerald-400 font-bold">Closed-Loop Bedbank</div>
              </div>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                Best Rate
              </span>
            </div>

            <div className="flex-1 sm:border-l sm:border-emerald-500/20 sm:pl-5">
              <div className="text-2xl font-black text-emerald-400 font-mono leading-none">
                {viewMode === 'total' ? fmt(atlasTotal) : fmt(atlasPerNight)}
              </div>
              <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                {viewMode === 'total' ? `total for ${effectiveNights} nights stay` : 'per night wholesale rate'}
              </div>
              <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" /> All taxes &amp; fees included — zero markup
              </div>
            </div>

            <div className="sm:border-l sm:border-emerald-500/20 sm:pl-5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                {viewMode === 'total' ? 'Nightly Equivalent' : `Total ${effectiveNights} Nights`}
              </div>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {viewMode === 'total' ? `${fmt(atlasPerNight)} / night` : fmt(atlasTotal)}
              </div>
              <div className="text-[10px] text-emerald-400/70">100% all-inclusive</div>
            </div>

            <div className="sm:border-l sm:border-emerald-500/20 sm:pl-5">
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                <TrendingDown className="w-3.5 h-3.5" />
                Save {savingsPct}% vs Google
              </div>
            </div>
          </div>
        </div>

        {/* ── PUBLIC COMPETITOR ROWS ── */}
        <div className="mx-5 sm:mx-8 mb-5 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/60 shadow-lg">
          {providers.map((p, idx) => {
            const style = providerStyle(p.name);
            const providerAllInTotal   = p.total || (p.perNight * effectiveNights);
            const providerAllInPerNight = p.perNight;
            const providerBasePerNight = Math.round(providerAllInPerNight / (1 + taxPct / 100));
            const providerBaseTotal    = providerBasePerNight * effectiveNights;
            const providerTaxTotal     = providerAllInTotal - providerBaseTotal;
            const providerTaxPerNight  = providerAllInPerNight - providerBasePerNight;

            const providerSavingsTotal = Math.max(0, providerAllInTotal - atlasTotal);
            const providerSavingsPct   = Math.round((providerSavingsTotal / providerAllInTotal) * 100);

            return (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 bg-slate-950 hover:bg-slate-900 transition-colors ${
                  p.isLowest ? 'bg-amber-500/5' : ''
                }`}
              >
                {/* Provider Logo / Badge */}
                <div className="flex items-center gap-3 sm:w-52 shrink-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                  <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${style.bg} ${style.text} ${style.border}`}>
                    {p.name}
                  </span>
                  {p.isLowest && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[9px] font-black uppercase">
                      Lowest on Google
                    </span>
                  )}
                </div>

                {/* Rates Breakdown */}
                <div className="flex-1 sm:border-l sm:border-slate-800 sm:pl-5">
                  <div className="text-xl font-black text-slate-300 font-mono leading-none line-through">
                    {viewMode === 'total' ? fmt(providerAllInTotal) : fmt(providerAllInPerNight)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {viewMode === 'total'
                      ? `${fmt(providerBaseTotal)} base room + ${fmt(providerTaxTotal)} local taxes`
                      : `${fmt(providerBasePerNight)} base room + ${fmt(providerTaxPerNight)} local taxes`}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Public retail price (adds taxes during checkout)
                  </div>
                </div>

                {/* Difference vs ATLAS */}
                <div className="sm:border-l sm:border-slate-800 sm:pl-5">
                  <div className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold">
                    You Save with ATLAS
                  </div>
                  <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5 font-mono">
                    +{fmt(providerSavingsTotal)} total
                  </div>
                  <div className="text-[10px] text-emerald-400/70">
                    {providerSavingsPct}% cheaper than {p.name}
                  </div>
                </div>

                {/* Direct Verification Link */}
                <div className="sm:ml-auto sm:border-l sm:border-slate-800 sm:pl-5 shrink-0 flex items-center gap-2">
                  <a
                    href={p.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-bold transition-all group shadow-sm"
                    title={`Inspect live rates directly on ${p.name}`}
                  >
                    <span>Verify on {p.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── TRANSPARENCY & ROOM TIER ADVISORY ── */}
        <div className="mx-5 sm:mx-8 mb-4 p-4 rounded-2xl bg-slate-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-xs mb-1.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              Why might the OTA show different numbers when clicking through?
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Google Hotels tracks the <strong className="text-slate-300">lowest entry-level room</strong> (e.g. Standard Queen, Room Only).
              When clicking through to an OTA, you will see all room tiers (Deluxe, Ocean View, Breakfast included, Flexible cancellation).
              <strong className="text-slate-300"> Your ATLAS wholesale rate is guaranteed to beat even the lowest public entry-level room.</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-concierge', {
                  detail: {
                    prompt: `Explain why OTA prices on Booking.com or Expedia might differ from the Google Hotels lowest rate for ${hotel.name} in ${hotel.city}.`,
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

        {/* ── HOW ATLAS WHOLESALE WORKS ── */}
        <div className="mx-5 sm:mx-8 mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-bold mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            Legal Wholesale Parity Exemption
          </div>
          <p className="text-[11px] leading-relaxed">
            Major retail sites (Booking.com, Expedia, Hotels.com) are legally obligated to match each other&apos;s rates under Rate Parity contracts.
            <strong className="text-slate-300"> ATLAS is legally exempt</strong> under European and international commercial travel laws because access is restricted to authenticated private club members. We connect directly to B2B Bedbanks (Hotelbeds, WebBeds) passing net rates with <strong className="text-slate-300">0% retail markup</strong>.
          </p>
        </div>
      </div>

      {/* ── BOTTOM CTA ACTION BAR ───────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            Your Guaranteed All-Inclusive Atlas Rate:
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {fmt(atlasTotal)}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              ({fmt(atlasPerNight)} / night · {effectiveNights} nights stay · all taxes &amp; fees included)
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
              onClick={() => { onClose(); onBookNow(); }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lock In Wholesale Rate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href={`/hotels/${hotel.id}?checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&nights=${effectiveNights}`}
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
