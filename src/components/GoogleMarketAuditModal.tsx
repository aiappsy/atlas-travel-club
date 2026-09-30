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

  // Live per-OTA prices fetched when modal opens
  const [liveProviders, setLiveProviders] = useState<GoogleMarketProvider[] | null>(null);
  const [liveLowestBase, setLiveLowestBase] = useState<number | null>(null);
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
      // Find the matching hotel in results (best name match)
      const matched: ComparedHotel | undefined = (data.hotels || []).find((h: ComparedHotel) =>
        h.name.toLowerCase().includes(hotel.name.toLowerCase().split(' ')[0]) ||
        hotel.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0])
      ) || data.hotels?.[0];

      if (matched?.marketProviders?.length) {
        setLiveProviders(matched.marketProviders);
        const lowest = matched.prices?.lowestOta;
        if (lowest) {
          setLiveLowestBase(lowest.perNight);
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

  // Fetch live per-OTA rates when modal opens
  useEffect(() => {
    if (isOpen && hotel) {
      setLiveProviders(null);
      setLiveLowestBase(null);
      fetchLiveRates();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hotel?.id]);

  if (!isOpen || !hotel) return null;

  const hotelCurrency = hotel.currency || currency;
  const fmt = (amt: number) => formatHotelPrice(amt, hotelCurrency, { roundWhole: true });

  // ── Rates ────────────────────────────────────────────────────────────────
  const atlasPerNight = hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight;
  const atlasTotal    = atlasPerNight * effectiveNights;

  const estTaxPerNight = hotel.prices.taxBreakdown?.estimatedTaxesPerNight || 0;
  const taxPct         = hotel.prices.taxBreakdown?.taxPercent || 0;

  // Use live lowest if available, otherwise fall back to original data
  const lowestOtaBase     = liveLowestBase ?? hotel.prices.lowestOta?.perNight ?? hotel.prices.expedia?.perNight ?? 0;
  const lowestProvider    = liveLowestProvider ?? hotel.prices.lowestOta?.provider ?? 'OTA';
  const lowestOtaEstAllIn = lowestOtaBase + estTaxPerNight;

  const savingsPerNight = Math.max(0, lowestOtaEstAllIn - atlasPerNight);
  const totalSavings    = savingsPerNight * effectiveNights;
  const savingsPct      = lowestOtaEstAllIn > 0 ? Math.round((savingsPerNight / lowestOtaEstAllIn) * 100) : 0;

  // ── Providers — use live per-OTA data if available ───────────────────────
  const providers: GoogleMarketProvider[] = liveProviders ??
    (hotel.marketProviders && hotel.marketProviders.length > 0
      ? hotel.marketProviders
      : [
          { name: 'Expedia',      logoKey: 'expedia',   perNight: hotel.prices.expedia.perNight,    total: hotel.prices.expedia.perNight * effectiveNights,    verifyUrl: hotel.prices.expedia.verifyUrl,    isLowest: lowestOtaBase === hotel.prices.expedia.perNight },
          { name: 'Booking.com',  logoKey: 'booking',   perNight: hotel.prices.booking.perNight,    total: hotel.prices.booking.perNight * effectiveNights,    verifyUrl: hotel.prices.booking.verifyUrl,    isLowest: lowestOtaBase === hotel.prices.booking.perNight },
          { name: 'Hotels.com',   logoKey: 'hotelscom', perNight: hotel.prices.hotelsCom.perNight,  total: hotel.prices.hotelsCom.perNight * effectiveNights,  verifyUrl: hotel.prices.hotelsCom.verifyUrl,  isLowest: lowestOtaBase === hotel.prices.hotelsCom.perNight },
          { name: 'Agoda',        logoKey: 'agoda',     perNight: hotel.prices.agoda.perNight,      total: hotel.prices.agoda.perNight * effectiveNights,      verifyUrl: hotel.prices.agoda.verifyUrl,      isLowest: lowestOtaBase === hotel.prices.agoda.perNight },
          { name: 'Hotel Direct', logoKey: 'direct',    perNight: hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight, total: (hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight) * effectiveNights, verifyUrl: hotel.prices.officialDirect?.verifyUrl || hotel.officialWebsite, isLowest: false },
        ]);

  const allSamePrice = providers.length > 1 && providers.every(p => p.perNight === providers[0].perNight);
  const isLiveHotelbeds = hotel.audit?.bedbankGateway?.includes('Hotelbeds APItude');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-150"
    >
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Rate Audit · Google Hotels
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:block">
            #{hotel.audit?.auditHash?.substring(0, 10)}
          </span>
          {isFetchingLive && (
            <span className="inline-flex items-center gap-1 text-[11px] text-sky-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Fetching live OTA rates…
            </span>
          )}
          {liveProviders && !isFetchingLive && (
            <span className="text-[11px] text-emerald-400 font-bold">✓ Individual OTA rates loaded</span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block text-right">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              {isLiveHotelbeds ? 'Hotelbeds Live Rate' : 'Estimated Wholesale'}
            </div>
            <div className={`text-[10px] font-bold ${isLiveHotelbeds ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isLiveHotelbeds ? '✓ Real B2B Rate' : '28–42% below OTA'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── HOTEL META ──────────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 sm:px-8 bg-slate-900/60 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-400" />
                {effectiveCheckIn} → {effectiveCheckOut} · {effectiveNights} {effectiveNights === 1 ? 'night' : 'nights'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── HERO SAVINGS BANNER ─────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-b border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          {/* Atlas rate */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-0.5">Your Atlas Rate</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono leading-none">{fmt(atlasPerNight)}</div>
            <div className="text-xs text-emerald-300 mt-1 font-semibold">per night · taxes &amp; fees included</div>
            <div className="text-[10px] text-emerald-400/60 mt-0.5 font-mono">{fmt(atlasTotal)} total for {effectiveNights} nights</div>
          </div>

          <div className="hidden sm:block text-slate-700 text-3xl font-thin">vs</div>

          {/* Cheapest OTA */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
              Cheapest on Google Hotels ({lowestProvider})
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-400 font-mono leading-none line-through">{fmt(lowestOtaBase)}</div>
            <div className="text-xs text-slate-500 mt-1">
              base rate · <span className="text-slate-400">+ {fmt(estTaxPerNight)} est. taxes ≈ {fmt(lowestOtaEstAllIn)}/nt all-in</span>
            </div>
          </div>

          {/* Savings */}
          {savingsPerNight > 0 && (
            <div className="sm:ml-auto bg-emerald-500/20 border border-emerald-500/40 rounded-2xl px-5 py-3 text-center">
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300 mb-0.5">You save</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{fmt(savingsPerNight)}<span className="text-sm font-bold text-emerald-300">/nt</span></div>
              <div className="text-xs font-bold text-emerald-300 mt-0.5">{fmt(totalSavings)} total · {savingsPct}% off</div>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold">Best Rate Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 sm:px-8 pt-5 pb-2">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {liveProviders ? 'Individual OTA Rates from Google Hotels' : 'Market Rates on Google Hotels'}
            </h3>
            {liveError && (
              <button onClick={fetchLiveRates} className="text-[11px] text-sky-400 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mb-4 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              {allSamePrice
                ? <>These rates are sourced from Google Hotels as a <strong className="text-slate-300">market benchmark</strong>. OTAs sometimes show the same price in aggregated searches — click any <em>Verify</em> button to see live pricing directly on that site. Prices vary by room type, meal plan, and cancellation policy.</>
                : <>Rates sourced live from Google Hotels for this specific hotel. Prices shown are for the <strong className="text-slate-300">lowest available room</strong>. Click <em>Verify</em> to see all room options and current availability. Taxes shown are estimated ({taxPct}%).</>
              }
            </span>
          </div>

          {/* If all same price — show honest note */}
          {allSamePrice && !isFetchingLive && (
            <div className="mb-4 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Google Hotels returned one aggregate rate for all OTAs for this search.
                Each OTA may show different prices when you visit — use the <strong>Verify</strong> buttons to check each one live.
              </span>
            </div>
          )}
        </div>

        {/* ── ATLAS ROW ── */}
        <div className="mx-5 sm:mx-8 mb-3 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-950/50 to-slate-900 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
            <div className="flex items-center gap-3 sm:w-52 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-black text-white">ATLAS</div>
                <div className="text-[11px] text-emerald-400 font-bold">Member Wholesale Rate</div>
              </div>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">Best Price</span>
            </div>

            <div className="flex-1 sm:border-l sm:border-emerald-500/20 sm:pl-5">
              <div className="text-2xl font-black text-emerald-400 font-mono leading-none">{fmt(atlasPerNight)}</div>
              <div className="text-xs text-emerald-300 font-semibold mt-0.5">per night</div>
              <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
                <Check className="w-3 h-3" /> All taxes &amp; fees included — no surprises at checkout
              </div>
            </div>

            <div className="sm:border-l sm:border-emerald-500/20 sm:pl-5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total {effectiveNights} nights</div>
              <div className="text-xl font-black text-white font-mono mt-0.5">{fmt(atlasTotal)}</div>
              <div className="text-[10px] text-emerald-400/70 mt-0.5">taxes &amp; fees included</div>
            </div>

            {savingsPerNight > 0 && (
              <div className="sm:border-l sm:border-emerald-500/20 sm:pl-5">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Save {savingsPct}% vs cheapest OTA
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── OTA ROWS ── */}
        <div className="mx-5 sm:mx-8 mb-5 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800/60">

          {/* Loading skeleton */}
          {isFetchingLive && [1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 bg-slate-950 animate-pulse">
              <div className="w-24 h-7 bg-slate-800 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="w-28 h-5 bg-slate-800 rounded" />
                <div className="w-40 h-3 bg-slate-800/60 rounded" />
              </div>
              <div className="w-20 h-8 bg-slate-800 rounded-xl" />
            </div>
          ))}

          {/* OTA rows */}
          {!isFetchingLive && providers.map((p, idx) => {
            const style        = providerStyle(p.name);
            const basePerNight = p.perNight;
            const estAllIn     = basePerNight + estTaxPerNight;
            const estTotal     = estAllIn * effectiveNights;
            const youSave      = Math.max(0, estAllIn - atlasPerNight);
            const savePct      = estAllIn > 0 ? Math.round((youSave / estAllIn) * 100) : 0;

            return (
              <div key={idx} className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 bg-slate-950 hover:bg-slate-900 transition-colors ${p.isLowest ? 'bg-amber-500/5' : ''}`}>
                {/* Provider */}
                <div className="flex items-center gap-3 sm:w-52 shrink-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                  <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${style.bg} ${style.text} ${style.border}`}>
                    {p.name}
                  </span>
                  {p.isLowest && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[9px] font-black uppercase">
                      Cheapest on Google
                    </span>
                  )}
                </div>

                {/* Price — Booking.com style */}
                <div className="flex-1 sm:border-l sm:border-slate-800 sm:pl-5">
                  <div className="text-xl font-black text-slate-300 font-mono leading-none">{fmt(basePerNight)}</div>
                  <div className="text-xs text-slate-500 mt-0.5">per night (base rate)</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    + est. {fmt(estTaxPerNight)} taxes &amp; fees
                  </div>
                </div>

                {/* Est. total */}
                <div className="sm:border-l sm:border-slate-800 sm:pl-5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Est. total {effectiveNights} nights</div>
                  <div className="text-base font-bold text-slate-400 font-mono mt-0.5">{fmt(estTotal)}</div>
                  <div className="text-[10px] text-slate-600">incl. est. taxes</div>
                </div>

                {/* You save */}
                {youSave > 0 && (
                  <div className="sm:border-l sm:border-slate-800 sm:pl-5">
                    <div className="text-[10px] text-emerald-400/70 uppercase tracking-wider">With Atlas you save</div>
                    <div className="text-sm font-black text-emerald-400 mt-0.5">{fmt(youSave)}/nt ({savePct}% off)</div>
                  </div>
                )}

                {/* Verify link */}
                <div className="sm:ml-auto sm:border-l sm:border-slate-800 sm:pl-5 shrink-0">
                  <a
                    href={p.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-bold transition-all group"
                    title={`Check live price on ${p.name}`}
                  >
                    <span>Verify on {p.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── WHY DIFFERENT PRICES ── */}
        <div className="mx-5 sm:mx-8 mb-4 p-4 rounded-2xl bg-slate-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-xs mb-1.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              Why might the OTA show a different price when I click through?
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The prices above are sourced live from Google Hotels for the <strong className="text-slate-300">cheapest available room</strong> at this property.
              When you click through to an OTA, you&apos;ll see <strong className="text-slate-300">all room types</strong> — superior rooms, suites, breakfast-inclusive options etc.
              <strong className="text-slate-300"> Your Atlas wholesale rate is guaranteed to be lower than even the cheapest Google Hotels room.</strong>
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

        {/* ── HOW ATLAS WORKS ── */}
        <div className="mx-5 sm:mx-8 mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-bold mb-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            How can Atlas be cheaper than every OTA?
          </div>
          <p className="text-[11px] leading-relaxed">
            Public travel sites (Booking.com, Expedia, Hotels.com) are contractually bound by hotel rate parity — they cannot undercut each other on open search engines.
            <strong className="text-slate-300"> Atlas is legally exempt</strong> because membership is restricted to a closed private club. We connect directly to wholesale bedbanks (Hotelbeds, WebBeds) and pass net rates with <strong className="text-slate-300">0% retail markup</strong>.
          </p>
        </div>
      </div>

      {/* ── BOTTOM CTA BAR ──────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Your all-inclusive Atlas rate</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{fmt(atlasTotal)}</span>
            <span className="text-xs text-slate-400 font-bold">{fmt(atlasPerNight)}/night · {effectiveNights} nights · all taxes included</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            Close
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
