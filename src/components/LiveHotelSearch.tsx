'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Lock,
  ArrowUpDown,
  X,
  BedDouble,
  Info,
  Maximize2,
  Map,
  List,
  Coffee,
  Check,
  Building,
  CheckSquare
} from 'lucide-react';
import type { ComparedHotel } from '@/app/api/hotels/compare/route';
import GoogleMarketAuditModal from '@/components/GoogleMarketAuditModal';
import GuestRoomPicker, { GuestRoomConfig, formatGuestSummary } from '@/components/GuestRoomPicker';
import { formatGoogleTravelUrlWithCurrency } from '@/lib/googleTravel';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface LiveHotelSearchProps {
  initialDestination?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialRooms?: number;
  initialAdults?: number;
  initialChildrenAges?: number[];
  isCompact?: boolean;
}

export default function LiveHotelSearch({
  initialDestination = '',
  initialCheckIn,
  initialCheckOut,
  initialRooms = 1,
  initialAdults = 2,
  initialChildrenAges = [],
  isCompact = false,
}: LiveHotelSearchProps) {
  const { formatPrice: rawFormatPrice, formatHotelPrice, currency } = useCurrency();
  const { t, locale } = useLanguage();
  // Hotel search rates from the API are already in the requested currency (matching Google Travel live rates).
  const formatPrice = (amt: number, hotelCurrency?: string, options?: { showCode?: boolean; roundWhole?: boolean }) =>
    formatHotelPrice(amt, hotelCurrency || currency, options);
  const { isMember } = useAuth();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState(() => {
    if (initialCheckIn) return initialCheckIn;
    const d1 = new Date(Date.now() + 14 * 86400000);
    return d1.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    if (initialCheckOut) return initialCheckOut;
    const d2 = new Date(Date.now() + 17 * 86400000);
    return d2.toISOString().split('T')[0];
  });
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [guestConfig, setGuestConfig] = useState<GuestRoomConfig>({
    rooms: initialRooms,
    adults: initialAdults,
    childrenAges: initialChildrenAges,
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'savings' | 'price-asc' | 'price-desc' | 'rating'>('savings');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hotels, setHotels] = useState<ComparedHotel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isUrlAudited, setIsUrlAudited] = useState(false);
  const [auditingHotel, setAuditingHotel] = useState<ComparedHotel | null>(null);
  const [showAllInclusive, setShowAllInclusive] = useState<boolean>(true);

  // RateHawk-style filters & Map View Mode
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterBreakfast, setFilterBreakfast] = useState<boolean>(false);
  const [filterFreeCancel, setFilterFreeCancel] = useState<boolean>(false);
  const [filterMinStars, setFilterMinStars] = useState<number>(0);
  const [activeMapHotel, setActiveMapHotel] = useState<ComparedHotel | null>(null);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) || 3);

  const getHotelUrl = (hotelId: string) => {
    const params = new URLSearchParams();
    params.set('checkIn', checkIn);
    params.set('checkOut', checkOut);
    params.set('nights', String(nights));
    params.set('rooms', String(guestConfig.rooms));
    params.set('adults', String(guestConfig.adults));
    params.set('children', String(guestConfig.childrenAges.length));
    if (guestConfig.childrenAges.length > 0) {
      params.set('childAges', guestConfig.childrenAges.join(','));
    }
    return `/hotels/${hotelId}?${params.toString()}`;
  };

  const isNo = locale === 'no';

  const popularCities = [
    { name: isNo ? 'Alle reisemål' : 'All Destinations', query: '' },
    { name: 'Paris', query: 'Paris' },
    { name: 'London', query: 'London' },
    { name: 'New York', query: 'New York' },
    { name: 'Dubai', query: 'Dubai' },
    { name: 'Las Vegas', query: 'Las Vegas' },
    { name: isNo ? 'Roma' : 'Rome', query: 'Rome' },
    { name: 'Tokyo', query: 'Tokyo' },
    { name: isNo ? 'Maldivene' : 'Maldives', query: 'Maldives' },
    { name: 'Zermatt', query: 'Zermatt' },
    { name: 'Monaco', query: 'Monaco' },
    { name: 'Santorini', query: 'Santorini' },
    { name: 'Bali', query: 'Bali' },
    { name: 'Aspen', query: 'Aspen' },
    { name: 'Maui', query: 'Maui' },
    { name: 'Oslo', query: 'Oslo' },
  ];

  const categories = [
    { id: 'all', label: isNo ? 'Alle kategorier' : 'All Price Tiers' },
    { id: 'ultra-luxury', label: isNo ? '👑 Ultraluksus (5★)' : '👑 Ultra-Luxury (5★)' },
    { id: 'luxury-resort', label: isNo ? '💎 Resorts & slott' : '💎 Luxury Resorts & Palaces' },
    { id: 'upscale-boutique', label: isNo ? '✨ Førsteklasses & boutique (4★)' : '✨ Upscale & Boutique (4★)' },
    { id: 'smart-value', label: isNo ? '🏷️ Prisgunstig kvalitet (3-4★)' : '🏷️ Smart Value (3-4★)' },
  ];

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    const dIn = new Date(newCheckIn);
    const dOut = new Date(checkOut);
    let nextOutStr = checkOut;
    if (isNaN(dOut.getTime()) || dOut.getTime() <= dIn.getTime()) {
      const nextOut = new Date(dIn.getTime() + 3 * 86400000);
      nextOutStr = nextOut.toISOString().split('T')[0];
      setCheckOut(nextOutStr);
    }
    if (hasSearched) {
      performSearch(destination, newCheckIn, nextOutStr);
    }
  };

  const handleCheckOutChange = (newCheckOut: string) => {
    setCheckOut(newCheckOut);
    if (hasSearched) {
      performSearch(destination, checkIn, newCheckOut);
    }
  };

  const performSearch = async (
    targetDest: string = destination,
    inDate: string = checkIn,
    outDate: string = checkOut,
    currentGuests = guestConfig
  ) => {
    setIsScanning(true);
    setScanStep(0);
    setHasSearched(true);
    setVisibleCount(8);

    const stepsInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(stepsInterval);
        return prev;
      });
    }, 200);

    const dIn = new Date(inDate);
    const dOut = new Date(outDate);
    const currentNights = Math.max(1, Math.round((dOut.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24)) || 3);

    try {
      const childAgesParam = currentGuests.childrenAges.length > 0 ? `&childAges=${currentGuests.childrenAges.join(',')}` : '';
      const res = await fetch(
        `/api/hotels/compare?destination=${encodeURIComponent(targetDest)}&nights=${currentNights}&checkIn=${inDate}&checkOut=${outDate}&currency=${currency}&rooms=${currentGuests.rooms}&adults=${currentGuests.adults}&children=${currentGuests.childrenAges.length}${childAgesParam}`
      );
      const data = await res.json();
      setTimeout(() => {
        setHotels(data.hotels || []);
        setIsUrlAudited(!!data.isOtaUrlAudited);
        setIsScanning(false);
      }, 800);
    } catch (e) {
      setIsScanning(false);
    }
  };

  // Re-fetch when currency changes (converts all prices server-side via SerpApi)
  useEffect(() => {
    if (hasSearched) {
      performSearch(destination, checkIn, checkOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Initial load only
  useEffect(() => {
    performSearch(destination, checkIn, checkOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(destination, checkIn, checkOut);
  };

  const filteredHotels = hotels
    .filter((h) => {
      if (selectedCategory !== 'all' && h.category !== selectedCategory) return false;
      if (filterMinStars > 0 && (h.starRating || 0) < filterMinStars) return false;
      if (filterBreakfast) {
        const hasBreakfast =
          h.amenities?.some((a) => a.toLowerCase().includes('breakfast')) ||
          h.description?.toLowerCase().includes('breakfast') ||
          h.roomOptions?.some((r) => r.amenities?.some((a) => a.toLowerCase().includes('breakfast')));
        if (!hasBreakfast) return false;
      }
      if (filterFreeCancel) {
        const hasFreeCancel =
          h.amenities?.some((a) => a.toLowerCase().includes('cancellation')) ||
          h.description?.toLowerCase().includes('free cancellation') ||
          (h.prices?.hotelsCom?.packageLabel && h.prices.hotelsCom.packageLabel.toLowerCase().includes('cancel'));
        if (!hasFreeCancel) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'savings') {
        const savA = a.prices?.atlasWholesale?.instantSavingsPerNight || 0;
        const savB = b.prices?.atlasWholesale?.instantSavingsPerNight || 0;
        return savB - savA;
      }
      if (sortBy === 'price-asc') {
        return (a.prices?.atlasWholesale?.perNight || 0) - (b.prices?.atlasWholesale?.perNight || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.prices?.atlasWholesale?.perNight || 0) - (a.prices?.atlasWholesale?.perNight || 0);
      }
      if (sortBy === 'rating') {
        return (b.guestRating || 0) - (a.guestRating || 0);
      }
      return 0;
    });

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Modern Luxury Floating Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/60 border border-slate-200/90 space-y-4 text-slate-900 relative z-30">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 1. Destination / Hotel Name */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 p-3.5 rounded-2xl border border-slate-200 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {t.hotels.searchDestination}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={locale === 'no' ? 'Søk reisemål, hotell eller lim inn OTA-lenke...' : 'Search destination, hotel, or paste OTA link...'}
                className="w-full bg-transparent font-bold text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 2. Check-In Date */}
          <div
            onClick={() => {
              try {
                checkInRef.current?.showPicker?.();
              } catch {
                checkInRef.current?.focus();
              }
            }}
            className="md:col-span-2 bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-700 flex items-center justify-center shrink-0 pointer-events-none">
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 cursor-pointer pointer-events-none">
                {t.hotels.checkIn}
              </label>
              <input
                ref={checkInRef}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={checkIn}
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    (e.target as HTMLInputElement).showPicker?.();
                  } catch {}
                }}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer [color-scheme:light]"
              />
            </div>
          </div>

          {/* 3. Check-Out Date */}
          <div
            onClick={() => {
              try {
                checkOutRef.current?.showPicker?.();
              } catch {
                checkOutRef.current?.focus();
              }
            }}
            className="md:col-span-2 bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-700 flex items-center justify-center shrink-0 pointer-events-none">
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 cursor-pointer pointer-events-none">
                {t.hotels.checkOut} ({nights} {locale === 'no' ? 'netter' : 'Nts'})
              </label>
              <input
                ref={checkOutRef}
                type="date"
                min={checkIn || new Date().toISOString().split('T')[0]}
                value={checkOut}
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    (e.target as HTMLInputElement).showPicker?.();
                  } catch {}
                }}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer [color-scheme:light]"
              />
            </div>
          </div>

          {/* 4. Guests & Rooms */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {t.hotels.roomsGuests}
              </label>
              <GuestRoomPicker
                value={guestConfig}
                onChange={setGuestConfig}
                theme="light"
                align="right"
              />
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="md:col-span-2 flex items-stretch">
            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>{isScanning ? t.common.loading : (locale === 'no' ? 'Søk engrospriser' : 'Search Rates')}</span>
            </button>
          </div>
        </form>

        {/* Live URL Audit Banner */}
        {(/^https?:\/\//i.test(destination.trim()) || isUrlAudited) && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
            <span>
              <strong>Universal OTA Link Detected:</strong> ATLAS is scanning confidential wholesale clearing rates for this property to eliminate retail markup.
            </span>
          </div>
        )}

        {/* Quick Destination Pills */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0">
            {locale === 'no' ? 'Reisemål:' : 'Destinations:'}
          </span>
          {popularCities.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setDestination(item.query);
                performSearch(item.query);
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                destination.toLowerCase() === item.query.toLowerCase()
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200/90 hover:bg-slate-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Stage Scanning Animation State */}
      {isScanning && (
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-amber-600 animate-spin" />
              <h4 className="text-base font-bold text-slate-900">
                {isNo ? 'Søker globale grossister og henter innhentede priser...' : 'Pinging Global Bedbank Gateways & Live Rates...'}
              </h4>
            </div>
            <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 font-semibold">
              {isNo ? 'Grossist-oppslag' : 'Wholesale Bedbank Clearing'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Expedia Rapid API Feed</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isNo ? 'Hotels.com referanse' : 'Hotels.com Benchmark'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isNo ? 'Booking.com sanntidsrom' : 'Booking.com Live Inventory'}</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 4 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <Zap className="w-4 h-4 text-amber-600" />
              <span>{isNo ? 'ATLAS B2B nettopris' : 'ATLAS B2B Net Clearing'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Section with Price Tier Filter Tabs */}
      {!isScanning && hasSearched && hotels.length > 0 && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {destination ? (isNo ? `Hoteller i ${destination}` : `Hotels in ${destination}`) : (isNo ? 'Utvalgte kvalitetshoteller' : 'Curated Luxury Portfolio')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                  {isNo ? `${filteredHotels.length} hoteller` : `${filteredHotels.length} Properties`}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isNo
                  ? `Priser for ${nights} ${nights === 1 ? 'natt' : 'netter'} (${checkIn} til ${checkOut}) • 0 kr i hotellpåslag • Direkte grossistpriser`
                  : `Rates for ${nights} night stay (${checkIn} to ${checkOut}) • 0% Hotel Markup • Direct Bedbank Rates`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Sertifisert CUG-prisparitet' : 'Rate Parity Exemption Certified'}
              </span>
            </div>
          </div>

          {/* RateHawk-Style B2B Controls Bar */}
          <div className="space-y-3 pb-3 border-b border-slate-200">
            {/* Top Row: Category Tiers & View Mode Switcher (List vs Map) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Category Tier Pills */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 shrink-0 mr-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isNo ? 'Kategori:' : 'Tier:'}</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-xs font-bold'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* View Switcher: List vs Map (RateHawk style) */}
              <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>{isNo ? 'Liste' : 'List'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'map'
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>{isNo ? 'Kartvisning' : 'Interactive Map'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: RateHawk Quick Feature Filters & Sorting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
              {/* Feature Pills: Breakfast, Free Cancellation, Star Rating */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilterBreakfast(!filterBreakfast)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    filterBreakfast
                      ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isNo ? 'Inkl. frokost' : 'Breakfast Included'}</span>
                  {filterBreakfast && <Check className="w-3 h-3 text-amber-600 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setFilterFreeCancel(!filterFreeCancel)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    filterFreeCancel
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isNo ? 'Gratis avbestilling' : 'Free Cancellation'}</span>
                  {filterFreeCancel && <Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
                </button>

                {/* Star Filter Pills */}
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5">{isNo ? 'Stjerner:' : 'Stars:'}</span>
                  {[
                    { stars: 0, label: isNo ? 'Alle' : 'All' },
                    { stars: 4, label: '4★+' },
                    { stars: 5, label: isNo ? 'Kun 5★' : '5★ Only' },
                  ].map((s) => (
                    <button
                      key={s.stars}
                      type="button"
                      onClick={() => setFilterMinStars(s.stars)}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        filterMinStars === s.stars
                          ? 'bg-slate-900 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Global Tax Display Toggle */}
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowAllInclusive(true)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      showAllInclusive
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isNo ? 'Inkl. skatter' : 'Taxes Included'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAllInclusive(false)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      !showAllInclusive
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isNo ? 'Netto grunnpris' : 'Base Rate'}
                  </button>
                </div>

                {(filterBreakfast || filterFreeCancel || filterMinStars > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterBreakfast(false);
                      setFilterFreeCancel(false);
                      setFilterMinStars(0);
                    }}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline ml-1 cursor-pointer"
                  >
                    {isNo ? 'Nullstill filtre' : 'Clear filters'}
                  </button>
                )}
              </div>

              {/* Instant Sort Options */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 self-start md:self-auto">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isNo ? 'Sorter:' : 'Sort:'}</span>
                </span>
                {[
                  { id: 'savings', label: isNo ? '💰 Størst besparelse' : '💰 Max Savings' },
                  { id: 'price-asc', label: isNo ? '🏷️ Laveste pris' : '🏷️ Lowest Price' },
                  { id: 'rating', label: isNo ? '⭐ Beste vurdering' : '⭐ Top Rated' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSortBy(s.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      sortBy === s.id
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode: Map View Split-Screen vs Standard List View */}
          {viewMode === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Interactive RateHawk-style Map Frame */}
              <div className="lg:col-span-7 sticky top-20 bg-white rounded-3xl border border-slate-200 p-4 shadow-xl overflow-hidden space-y-3">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Interactive Property Map ({destination || 'Europe'})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {filteredHotels.length} Properties
                  </span>
                </div>

                {/* Simulated Geocoded Map Surface with Hotel Price Badges */}
                <div className="relative w-full h-[540px] rounded-2xl bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 border border-slate-200 overflow-hidden flex flex-col justify-between p-4 select-none">
                  {/* Subtle Grid Map Texture */}
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>

                  {/* Top Map HUD Controls */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 text-slate-800 shadow-sm backdrop-blur-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-bold">{destination || 'Selected Destination'}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold shadow-xs">
                      0% Markup Active
                    </div>
                  </div>

                  {/* Geocoded Hotel Markers Pinned on Map */}
                  <div className="relative z-10 w-full h-full my-auto flex flex-wrap items-center justify-around p-4 gap-3 content-center">
                    {filteredHotels.slice(0, 10).map((hotel, idx) => {
                      const netRate = showAllInclusive
                        ? (hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight)
                        : (hotel.prices.atlasWholesale.basePerNight || Math.round(hotel.prices.atlasWholesale.perNight / 1.2));
                      const isSelected = activeMapHotel?.id === hotel.id;

                      return (
                        <button
                          key={hotel.id}
                          type="button"
                          onClick={() => setActiveMapHotel(hotel)}
                          className={`group/pin relative transition-all transform cursor-pointer ${
                            isSelected
                              ? 'scale-110 z-30 ring-4 ring-amber-400/50'
                              : 'hover:scale-105 z-10'
                          }`}
                        >
                          <div
                            className={`px-3 py-1.5 rounded-full font-mono text-xs font-black shadow-md flex items-center gap-1.5 border transition-all ${
                              isSelected
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                                : 'bg-white text-emerald-800 border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover/pin:bg-white"></span>
                            <span>{formatPrice(netRate)}</span>
                          </div>
                          {/* Pin Pointer Tail */}
                          <div className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${isSelected ? 'bg-slate-900' : 'bg-white border-r border-b border-slate-200'}`}></div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Map Hotel Popover Detail Card (RateHawk style) */}
                  {activeMapHotel ? (
                    <div className="relative z-20 p-4 rounded-2xl bg-white/98 border border-slate-200 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in text-slate-900">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={activeMapHotel.image}
                          alt={activeMapHotel.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                            {'★'.repeat(activeMapHotel.starRating || 5)} {activeMapHotel.city}
                          </div>
                          <div className="text-sm font-bold text-slate-900 truncate max-w-xs">
                            {activeMapHotel.name}
                          </div>
                          <div className="text-xs text-emerald-700 font-bold font-mono">
                            {formatPrice(
                              showAllInclusive
                                ? (activeMapHotel.prices.atlasWholesale.withTaxesPerNight || activeMapHotel.prices.atlasWholesale.perNight)
                                : (activeMapHotel.prices.atlasWholesale.basePerNight || Math.round(activeMapHotel.prices.atlasWholesale.perNight / 1.2))
                            )}/nt
                            <span className="text-slate-500 font-normal ml-1">
                              (Save {formatPrice(activeMapHotel.prices.atlasWholesale.instantSavingsPerNight || 85)}/nt)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => setAuditingHotel(activeMapHotel)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 cursor-pointer"
                        >
                          Audit
                        </button>
                        <Link
                          href={getHotelUrl(activeMapHotel.id)}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap cursor-pointer"
                        >
                          <span>Select Rooms</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 text-center py-2 text-xs text-slate-500 bg-white/80 rounded-xl border border-slate-200 backdrop-blur-xs">
                      💡 Click on any price tag on the map to inspect property details
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Compact Hotel Feed Beside Map */}
              <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredHotels.slice(0, visibleCount).map((hotel) => {
                  const netRate = showAllInclusive
                    ? (hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight)
                    : (hotel.prices.atlasWholesale.basePerNight || Math.round(hotel.prices.atlasWholesale.perNight / 1.2));
                  const isSelected = activeMapHotel?.id === hotel.id;

                  return (
                    <div
                      key={hotel.id}
                      onClick={() => setActiveMapHotel(hotel)}
                      className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="text-amber-600 font-bold">
                              {'★'.repeat(hotel.starRating || 5)}
                            </span>
                            <span className="text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              Save {hotel.prices.atlasWholesale.savingsPercent || 22}%
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate mt-0.5">
                            {hotel.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {hotel.city}, {hotel.country}
                          </p>
                          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-100">
                            <div className="text-[11px] line-through text-slate-400">
                              {formatPrice(hotel.prices.lowestOta?.perNight || Math.round(netRate * 1.25))}
                            </div>
                            <div className="text-base font-bold text-emerald-700 font-mono">
                              {formatPrice(netRate)}
                              <span className="text-[10px] text-slate-500 font-normal"> /nt</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Standard Full-Width Hotel Result Cards (List View) */
            <div className="space-y-6">
            {filteredHotels.slice(0, visibleCount).map((hotel) => {
              const taxBreakdown = hotel.prices.taxBreakdown;
              const taxPercent = taxBreakdown?.taxPercent || 20;

              // Individual OTA rates based on tax display mode
              const bookingPerNight = showAllInclusive
                ? (hotel.prices.booking?.withTaxesPerNight || hotel.prices.booking?.perNight || hotel.prices.expedia.perNight)
                : (hotel.prices.booking?.basePerNight || Math.round((hotel.prices.booking?.perNight || hotel.prices.expedia.perNight) / (1 + taxPercent / 100)));

              const hotelsComPerNight = showAllInclusive
                ? (hotel.prices.hotelsCom?.withTaxesPerNight || hotel.prices.hotelsCom?.perNight)
                : (hotel.prices.hotelsCom?.basePerNight || Math.round(hotel.prices.hotelsCom.perNight / (1 + taxPercent / 100)));

              const agodaPerNight = showAllInclusive
                ? (hotel.prices.agoda?.withTaxesPerNight || hotel.prices.agoda?.perNight)
                : (hotel.prices.agoda?.basePerNight || Math.round(hotel.prices.agoda.perNight / (1 + taxPercent / 100)));

              const expediaPerNight = showAllInclusive
                ? (hotel.prices.expedia?.withTaxesPerNight || hotel.prices.expedia?.perNight)
                : (hotel.prices.expedia?.basePerNight || Math.round(hotel.prices.expedia.perNight / (1 + taxPercent / 100)));

              const wholesalePerNight = showAllInclusive
                ? (hotel.prices.atlasWholesale.withTaxesPerNight || hotel.prices.atlasWholesale.perNight)
                : (hotel.prices.atlasWholesale.basePerNight || Math.round(hotel.prices.atlasWholesale.perNight / (1 + taxPercent / 100)));

              const wholesaleTotal = wholesalePerNight * nights;
              const publicLowest = Math.min(bookingPerNight, agodaPerNight, expediaPerNight, hotelsComPerNight);
              const savingsPerNight = Math.max(0, publicLowest - wholesalePerNight);
              const savingsTotal = savingsPerNight * nights;
              const savingsPercent = Math.round((savingsPerNight / (publicLowest || 1)) * 100);

              return (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch"
              >
                {/* Compact Landscape Photo */}
                <Link
                  href={getHotelUrl(hotel.id)}
                  className="w-full md:w-72 lg:w-80 h-52 sm:h-56 md:h-60 shrink-0 relative rounded-2xl overflow-hidden block group cursor-pointer bg-slate-100"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold flex items-center gap-1 border border-slate-200/80 shadow-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{hotel.guestRating} / 10</span>
                  </div>

                  {/* Category Tier Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20 shadow-xs">
                    {hotel.categoryLabel}
                  </div>

                  {/* Room Type & Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 text-xs border border-slate-200/80 shadow-xs">
                    <div className="font-bold text-slate-900 text-xs truncate">{hotel.roomType}</div>
                    <div className="text-slate-600 text-[11px] flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </Link>

                {/* Details & Live Comparison Matrix */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Hotel Title & Google Verified Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <Link
                          href={getHotelUrl(hotel.id)}
                          className="text-lg sm:text-xl font-bold text-slate-900 hover:text-amber-700 transition-colors block"
                        >
                          {hotel.name}
                        </Link>
                        <div className="text-xs text-amber-700 font-semibold flex items-center gap-1.5 mt-0.5">
                          <span>{'★'.repeat(hotel.starRating)}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">{hotel.city}, {hotel.country}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-emerald-700 font-medium">
                            {isNo ? 'B2B-engrosrom' : 'B2B Wholesale Inventory'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAuditingHotel(hotel)}
                        className="self-start px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        title={`Open Live Market Audit for ${hotel.name}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isNo ? 'Verifisert via Google' : 'Google Verified'}</span>
                      </button>
                    </div>

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Clean Multi-OTA Comparison Strip */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {isNo
                          ? `Offentlige markedspriser (${showAllInclusive ? 'Inkl. skatter' : 'Netto grunnpris'})`
                          : `Public Retail Benchmark (${showAllInclusive ? 'Taxes Included' : 'Base Rate'})`}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div
                          onClick={() => setAuditingHotel(hotel)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                        >
                          <div className="text-[10px] font-semibold text-slate-500">Booking.com</div>
                          <div className="text-sm font-bold text-slate-400 line-through font-mono mt-0.5">
                            {formatPrice(bookingPerNight)}
                          </div>
                        </div>

                        <div
                          onClick={() => setAuditingHotel(hotel)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                        >
                          <div className="text-[10px] font-semibold text-slate-500">Expedia</div>
                          <div className="text-sm font-bold text-slate-400 line-through font-mono mt-0.5">
                            {formatPrice(expediaPerNight)}
                          </div>
                        </div>

                        <div
                          onClick={() => setAuditingHotel(hotel)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                        >
                          <div className="text-[10px] font-semibold text-slate-500">Agoda</div>
                          <div className="text-sm font-bold text-slate-400 line-through font-mono mt-0.5">
                            {formatPrice(agodaPerNight)}
                          </div>
                        </div>

                        <div
                          onClick={() => setAuditingHotel(hotel)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                        >
                          <div className="text-[10px] font-semibold text-slate-500">Hotels.com</div>
                          <div className="text-sm font-bold text-slate-400 line-through font-mono mt-0.5">
                            {formatPrice(hotelsComPerNight)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean ATLAS Member Wholesale Rate Bar */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {isNo ? 'Atlas-klubbpris' : 'Atlas Wholesale'}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {t.common.save} {formatPrice(savingsPerNight)}/{isNo ? 'natt' : 'nt'} ({savingsPercent}% {isNo ? 'rabatt' : 'Off'})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                          {formatPrice(wholesalePerNight)}
                        </span>
                        <span className="text-xs text-slate-500">{isNo ? '/ natt' : '/ night'}</span>
                        <span className="text-xs text-slate-400 ml-2">
                          • {formatPrice(wholesaleTotal)} total ({nights} {nights === 1 ? (isNo ? 'natt' : 'night') : (isNo ? 'netter' : 'nights')})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setAuditingHotel(hotel)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                        title={isNo ? 'Verifiser markedspris i sanntid' : 'Audit live market rate'}
                      >
                        {isNo ? 'Verifiser' : 'Audit'}
                      </button>

                      <Link
                        href={
                          isMember
                            ? getHotelUrl(hotel.id)
                            : `/login?redirect=${encodeURIComponent(getHotelUrl(hotel.id))}&hotelId=${hotel.id}&hotelName=${encodeURIComponent(hotel.name)}`
                        }
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                      >
                        <span>{t.hotels.viewSuiteBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
          )}

          {/* Load More Properties Pagination */}
          {filteredHotels.length > visibleCount && (
            <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 8, filteredHotels.length))}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {isNo
                    ? `Vis flere hoteller (${filteredHotels.length - visibleCount} til)`
                    : `Load More Properties (${filteredHotels.length - visibleCount} More)`}
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <span className="text-xs text-slate-500 font-mono">
                {isNo
                  ? `Viser ${Math.min(visibleCount, filteredHotels.length)} av ${filteredHotels.length} hoteller`
                  : `Showing ${Math.min(visibleCount, filteredHotels.length)} of ${filteredHotels.length} Properties`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Zero Results Helpful Fallback */}
      {!isScanning && hasSearched && hotels.length === 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-md text-slate-900">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {isNo ? `Ingen hoteller funnet for «${destination}»` : `No Properties Found for "${destination}"`}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isNo
              ? 'Prøv å søke etter en av våre mest populære destinasjoner med aktive medlemspriser:'
              : 'Try searching for one of our top luxury destinations with active member wholesale rates:'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['Oslo', 'Paris', 'Las Vegas', 'New York', 'London', 'Dubai'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setDestination(city);
                  performSearch(city);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                {isNo ? `Søk ${city}` : `Search ${city}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Google Travel Live Market Audit Modal */}
      <GoogleMarketAuditModal
        isOpen={!!auditingHotel}
        onClose={() => setAuditingHotel(null)}
        hotel={auditingHotel}
        checkIn={checkIn}
        checkOut={checkOut}
        nights={nights}
        guestSummary={formatGuestSummary(guestConfig, locale)}
      />
    </div>
  );
}
