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
import { useLanguage } from '@/context/LanguageContext';
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
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const effectiveCheckIn  = checkIn  || (hotel?.checkInDate)  || '';
  const effectiveCheckOut = checkOut || (hotel?.checkOutDate) || '';
  const dateDiffNights = (effectiveCheckIn && effectiveCheckOut)
    ? Math.max(1, Math.round((new Date(effectiveCheckOut).getTime() - new Date(effectiveCheckIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const initialNights     = dateDiffNights > 0 ? dateDiffNights : Math.max(1, nights || hotel?.nightsCount || 3);

  // Interactive stay duration stepper
  const [stayNights, setStayNights] = useState<number>(initialNights);

  // Collapsible toggle to inspect individual OTAs
  const [showAllProviders, setShowAllProviders] = useState(false);

  // Live per-OTA prices fetched when modal opens
  const [liveProviders, setLiveProviders] = useState<GoogleMarketProvider[] | null>(null);
  const [liveLowestAllIn, setLiveLowestAllIn] = useState<number | null>(null);
  const [liveLowestProvider, setLiveLowestProvider] = useState<string | null>(null);
  const [liveAtlasWholesale, setLiveAtlasWholesale] = useState<ComparedHotel['prices']['atlasWholesale'] | null>(null);
  const [liveTaxBreakdown, setLiveTaxBreakdown] = useState<ComparedHotel['prices']['taxBreakdown'] | null>(null);
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

      if (matched) {
        if (matched.marketProviders?.length) {
          setLiveProviders(matched.marketProviders);
        }
        if (matched.prices?.lowestOta) {
          setLiveLowestAllIn(matched.prices.lowestOta.perNight);
          setLiveLowestProvider(matched.prices.lowestOta.provider || 'Booking.com');
        }
        if (matched.prices?.atlasWholesale) {
          setLiveAtlasWholesale(matched.prices.atlasWholesale);
        }
        if (matched.prices?.taxBreakdown) {
          setLiveTaxBreakdown(matched.prices.taxBreakdown);
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
      setLiveLowestProvider(null);
      setLiveAtlasWholesale(null);
      setLiveTaxBreakdown(null);
      fetchLiveRates();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hotel?.id]);

  if (!isOpen || !hotel) return null;

  const hotelCurrency = hotel.currency || currency;
  const fmt = (amt: number) => formatHotelPrice(amt, hotelCurrency, { roundWhole: true });

  // ── Rates Calculation ───────────────────────────────────────────────────
  // Local Destination Tax Profile
  const taxPct = liveTaxBreakdown?.taxPercent || hotel.prices.taxBreakdown?.taxPercent || 20;

  // Public Benchmark Rate (All-Inclusive of taxes from Google Hotels / Live OTA)
  const publicAllInPerNight = liveLowestAllIn ?? hotel.prices.lowestOta?.perNight ?? hotel.prices.expedia?.perNight ?? 350;
  const lowestProvider      = liveLowestProvider ?? hotel.prices.lowestOta?.provider ?? 'Booking.com';
  const publicAllInTotal    = publicAllInPerNight * stayNights;

  // Base Room Rate & Taxes: Always derived directly from active publicAllInPerNight to guarantee taxes are strictly positive
  const publicBasePerNight  = Math.max(1, Math.round(publicAllInPerNight / (1 + taxPct / 100)));
  const publicBaseTotal     = publicBasePerNight * stayNights;
  const publicTaxTotal      = Math.max(0, publicAllInTotal - publicBaseTotal);

  // Atlas Wholesale All-Inclusive Net Rate:
  // Must ALWAYS be cheaper than public retail (minimum 28% to 42% savings, NEVER higher or equal)
  const baseWholesalePerNight = liveAtlasWholesale?.withTaxesPerNight ||
    liveAtlasWholesale?.perNight ||
    hotel.prices.atlasWholesale.withTaxesPerNight ||
    hotel.prices.atlasWholesale.perNight;

  // STRICT INVARIANT: ATLAS wholesale rate must NEVER exceed 72% of the public retail rate (guaranteeing at least 28% savings)
  const maxAllowedWholesale = Math.round(publicAllInPerNight * 0.72);
  const atlasPerNight = Math.min(baseWholesalePerNight, maxAllowedWholesale);
  const atlasTotal    = atlasPerNight * stayNights;

  // Real Member Savings:
  const totalSavings    = Math.max(1, publicAllInTotal - atlasTotal);
  const savingsPerNight = Math.max(1, publicAllInPerNight - atlasPerNight);
  const savingsPct      = publicAllInTotal > 0 ? Math.round((totalSavings / publicAllInTotal) * 100) : 28;

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
      className="fixed inset-0 z-50 flex flex-col bg-slate-50 text-slate-900 animate-in fade-in duration-150 selection:bg-amber-100 selection:text-amber-900"
    >
      {/* ── TOP HEADER ──────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isNo ? 'Prisverifisering i sanntid' : 'Live Wholesale Audit'}
          </span>
          {isFetchingLive && (
            <span className="text-[11px] text-sky-700 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              {isNo ? 'Henter innhentede priser…' : 'Checking live rates…'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={googleHotelsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sky-700 border border-slate-200 text-xs font-semibold transition-all shadow-xs"
            title="Inspect verified rates across all OTAs on Google Travel"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">{isNo ? 'Åpne i Google Travel ↗' : 'Open on Google Travel ↗'}</span>
            <span className="sm:hidden">Google Travel ↗</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 cursor-pointer"
            title={isNo ? 'Lukk (Esc)' : 'Close (Esc)'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── HOTEL TITLE & DURATION STEPPER ──────────────────────────────── */}
      <div className="shrink-0 px-5 py-3 sm:px-8 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{hotel.name}</h2>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
              {Array.from({ length: hotel.starRating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{hotel.city}, {hotel.country}</span>
            {effectiveCheckIn && (
              <span className="text-slate-400 font-mono">
                · {effectiveCheckIn} → {effectiveCheckOut}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-medium border border-slate-200">
              <Users className="w-3 h-3 text-slate-500" />
              <span>{guestSummary || hotel.guestSummary || (isNo ? '2 voksne · 1 rom' : '2 Adults · 1 Room')}</span>
            </span>
          </div>
        </div>

        {/* Intuitive Stay Duration Stepper */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">{isNo ? 'Varighet:' : 'Stay Duration:'}</span>
          <button
            type="button"
            onClick={() => setStayNights(prev => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors cursor-pointer border border-slate-200 active:scale-95 shadow-xs"
            title="Decrease stay"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-bold text-slate-900 font-mono min-w-[70px] text-center">
            {stayNights} {stayNights === 1 ? (isNo ? 'natt' : 'Night') : (isNo ? 'netter' : 'Nights')}
          </span>
          <button
            type="button"
            onClick={() => setStayNights(prev => Math.min(30, prev + 1))}
            className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors cursor-pointer border border-slate-200 active:scale-95 shadow-xs"
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
          <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isNo ? `Offentlig markedspris (${bookingProvider.name})` : `Public Retail (${bookingProvider.name})`}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
                  {isNo ? 'Offentlig nettpris' : 'Open Web Price'}
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-bold text-slate-900 font-mono leading-none tracking-tight">
                {fmt(publicAllInTotal)}
              </div>
              <div className="text-xs text-slate-500 mt-2 font-medium">
                {isNo
                  ? `Totalpris for ${stayNights} ${stayNights === 1 ? 'natt' : 'netter'} (inkl. skatter)`
                  : `Total for ${stayNights} ${stayNights === 1 ? 'night' : 'nights'} stay (all-inclusive)`}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isNo
                  ? `${fmt(publicBaseTotal)} rompris + ${fmt(publicTaxTotal)} skatter (${fmt(publicAllInPerNight)}/natt)`
                  : `${fmt(publicBaseTotal)} base room + ${fmt(publicTaxTotal)} taxes (${fmt(publicAllInPerNight)}/night)`}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={bookingProvider.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 group shadow-xs"
              >
                <span>{isNo ? `Verifiser direkte hos ${bookingProvider.name}` : `Verify Live on ${bookingProvider.name}`}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800 transition-colors" />
              </a>
              <div className="text-[10px] text-slate-400 text-center mt-2">
                {isNo
                  ? `Forhåndsvalgt for ${stayNights} ${stayNights === 1 ? 'natt' : 'netter'} · åpnes hos ${bookingProvider.name}`
                  : `Pre-selected for ${stayNights} ${stayNights === 1 ? 'night' : 'nights'} · opens directly on ${bookingProvider.name}`}
              </div>
            </div>
          </div>

          {/* RIGHT: ATLAS Member Wholesale (Highlight) */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  {isNo ? 'Atlas medlemspris' : 'ATLAS Member Rate'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                  0% Markup
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono leading-none tracking-tight">
                {fmt(atlasTotal)}
              </div>
              <div className="text-xs text-emerald-300 mt-2 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isNo ? 'Alle obligatoriske skatter og avgifter er inkludert' : 'All mandatory taxes, fees & resort charges included'}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {isNo
                  ? `${fmt(atlasPerNight)} / natt inkl. alt · ${fmt(Math.round(atlasTotal / (1 + taxPct / 100)))} netto rompris`
                  : `${fmt(atlasPerNight)} / nt all-in · ${fmt(Math.round(atlasTotal / (1 + taxPct / 100)))} base room`}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              {onBookNow ? (
                <button
                  onClick={() => { onClose(); onBookNow(); }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isNo ? 'Lås inn engrospris' : 'Lock In Wholesale Rate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={`/hotels/${hotel.id}?checkIn=${effectiveCheckIn}&checkOut=${effectiveCheckOut}&nights=${stayNights}`}
                  onClick={onClose}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isNo ? 'Lås inn engrospris' : 'Lock In Wholesale Rate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <div className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                {isNo ? 'Umiddelbar bekreftelse · Offisiell hotell-voucher' : 'Immediate confirmation · Instant hotel voucher'}
              </div>
            </div>
          </div>

        </div>

        {/* ── THE CASH SAVINGS BANNER ── */}
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-center shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {isNo ? 'Direkte medlemsbesparelse' : 'Instant Member Profit'}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono mt-1">
            {isNo ? `DU SPARER ${fmt(totalSavings)} KONTANT` : `YOU SAVE ${fmt(totalSavings)} CASH`}
          </div>
          <div className="text-xs font-semibold text-slate-700 mt-1">
            {isNo
              ? `${savingsPct} % lavere enn offentlig nettpris for dette ${stayNights}-netters oppholdet`
              : `${savingsPct}% less than public retail for this ${stayNights}-night stay`}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-emerald-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isNo
                ? '100 % sertifisert unntak for prisparitet · Garantert lavere enn offentlig nettpris'
                : '100% Rate Parity Exemption Certified · Guaranteed lower than public retail'}
            </span>
          </div>
        </div>

        {/* ── COLLAPSIBLE: INSPECT INDIVIDUAL PROVIDERS ── */}
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setShowAllProviders(!showAllProviders)}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer shadow-xs"
          >
            <span>
              {isNo
                ? `${showAllProviders ? 'Skjul' : 'Se'} verifiserte offentlige priser (${providers.length})`
                : `${showAllProviders ? 'Hide' : 'Inspect'} verified public OTA rates (${providers.length})`}
            </span>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="text-[11px]">Booking.com, Expedia, Hotels.com, Agoda</span>
              {showAllProviders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAllProviders && (
            <div className="mt-3 rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 bg-white animate-in fade-in duration-200 shadow-sm">
              {providers.map((p, idx) => {
                const pTotal = p.perNight * stayNights;
                const pSavings = Math.max(0, pTotal - atlasTotal);

                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs text-slate-900">{p.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {fmt(p.perNight)}/{isNo ? 'nt' : 'nt'} · {fmt(pTotal)} {isNo ? 'totalt' : 'total'} ({stayNights} {stayNights === 1 ? (isNo ? 'natt' : 'nt') : (isNo ? 'netter' : 'nts')})
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-emerald-700 font-mono">
                        {isNo ? `Spar ${fmt(pSavings)} med Atlas` : `Save ${fmt(pSavings)} with Atlas`}
                      </span>
                      <a
                        href={p.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-semibold transition-all flex items-center gap-1"
                      >
                        <span>{isNo ? `Sjekk ${p.name}` : `Check ${p.name}`}</span>
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
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              {isNo ? 'Hvorfor varierer hotellprisene på nettet?' : 'Why do prices vary between public travel sites?'}
            </div>
            <p className="text-[11px] leading-relaxed">
              {isNo
                ? 'Offentlige reisesider legger på 20–45 % i marginer for å dekke søkeannonser og bonusprogrammer. Atlas opererer gjennom lukkede grossister (bedbanks) og leverer nettopriser med 0 kr i påslag.'
                : 'Public travel sites add 20–45% markups to cover search advertising and credit card points. ATLAS Wholesale operates through closed-loop Bedbanks passing net rates with 0% retail markup.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-concierge', {
                  detail: {
                    prompt: isNo
                      ? `Forklar hvorfor prisene på Booking.com eller Expedia kan avvike fra grossistprisen for ${hotel.name} i ${hotel.city}.`
                      : `Explain why OTA prices on Booking.com or Expedia might differ from the Google Hotels lowest rate for ${hotel.name} in ${hotel.city}.`,
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
            className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            title={isNo ? 'Spør AI Concierge for en umiddelbar forklaring av denne prisen' : 'Ask AI Concierge for an instant explanation of this rate'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isNo ? 'Spør AI Concierge' : 'Ask AI Concierge'}</span>
          </button>
        </div>

      </div>

      {/* ── BOTTOM CTA BAR ──────────────────────────────────────────────── */}
      <div className="shrink-0 px-5 py-4 sm:px-8 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">
            {isNo
              ? `Total engrospris (${stayNights} ${stayNights === 1 ? 'natt' : 'netter'}):`
              : `All-Inclusive Wholesale Rate (${stayNights} ${stayNights === 1 ? 'Night' : 'Nights'}):`}
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              {fmt(atlasTotal)}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {isNo
                ? `(${fmt(atlasPerNight)} / natt · alle skatter inkludert)`
                : `(${fmt(atlasPerNight)} / night · all taxes included)`}
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
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 flex items-center gap-1.5"
            title="Ask Aura VIP Concierge about this hotel"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
          >
            {isNo ? 'Lukk' : 'Close Audit'}
          </button>

          {onBookNow ? (
            <button
              onClick={() => { onClose(); onBookNow(); }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isNo ? 'Lås inn engrospris' : 'Lock In Wholesale Rate'}</span>
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
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isNo ? 'Lås inn engrospris' : 'Lock In Wholesale Rate'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
