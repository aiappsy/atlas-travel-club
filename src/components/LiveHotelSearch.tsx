'use client';

import React, { useState, useEffect } from 'react';
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
  Info
} from 'lucide-react';
import { ComparedHotel } from '@/app/api/hotels/compare/route';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';

interface LiveHotelSearchProps {
  initialDestination?: string;
  isCompact?: boolean;
}

export default function LiveHotelSearch({
  initialDestination = '',
  isCompact = false,
}: LiveHotelSearchProps) {
  const { formatPrice, currency } = useCurrency();
  const { isMember } = useAuth();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guests, setGuests] = useState('2 Guests, 1 Room');
  
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

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) || 3);

  const popularCities = [
    { name: 'All Destinations', query: '' },
    { name: 'Las Vegas', query: 'Las Vegas' },
    { name: 'Paris', query: 'Paris' },
    { name: 'Zermatt (Alps)', query: 'Zermatt' },
    { name: 'Santorini', query: 'Santorini' },
    { name: 'Aspen', query: 'Aspen' },
    { name: 'Maui', query: 'Maui' },
    { name: 'Dubai', query: 'Dubai' },
    { name: 'New York', query: 'New York' },
    { name: 'Oslo', query: 'Oslo' },
    { name: 'London', query: 'London' },
    { name: 'Tokyo', query: 'Tokyo' },
    { name: 'Bali', query: 'Bali' },
  ];

  const categories = [
    { id: 'all', label: 'All Price Tiers' },
    { id: 'ultra-luxury', label: '👑 Ultra-Luxury (5★)' },
    { id: 'luxury-resort', label: '💎 Luxury Resorts & Palaces' },
    { id: 'upscale-boutique', label: '✨ Upscale & Boutique (4★)' },
    { id: 'smart-value', label: '🏷️ Smart Value (3-4★)' },
  ];

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    const dIn = new Date(newCheckIn);
    const dOut = new Date(checkOut);
    if (isNaN(dOut.getTime()) || dOut.getTime() <= dIn.getTime()) {
      const nextOut = new Date(dIn.getTime() + 3 * 86400000);
      setCheckOut(nextOut.toISOString().split('T')[0]);
    }
  };

  const performSearch = async (targetDest: string) => {
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

    try {
      const res = await fetch(
        `/api/hotels/compare?destination=${encodeURIComponent(targetDest)}&nights=${nights}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}`
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

  useEffect(() => {
    performSearch(destination);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(destination);
  };

  const filteredHotels = hotels
    .filter((h) => {
      if (selectedCategory === 'all') return true;
      return h.category === selectedCategory;
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
      {/* Luxury Floating Search Bar */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 space-y-4 text-white">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 1. Destination / Hotel Name */}
          <div className="md:col-span-4 bg-slate-950 hover:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Destination or Hotel
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Las Vegas, Paris, Oslo, Bellagio..."
                className="w-full bg-transparent font-bold text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* 2. Check-In Date */}
          <div className="md:col-span-2 bg-slate-950 hover:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Check-In
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 3. Check-Out Date */}
          <div className="md:col-span-2 bg-slate-950 hover:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Check-Out ({nights} Nts)
              </label>
              <input
                type="date"
                min={checkIn || new Date().toISOString().split('T')[0]}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 4. Guests & Rooms */}
          <div className="md:col-span-2 bg-slate-950 hover:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Guests
              </label>
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="md:col-span-2 flex items-stretch">
            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-75 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>{isScanning ? 'Auditing...' : 'Audit Live Rates'}</span>
            </button>
          </div>
        </form>

        {/* Live URL Audit Banner */}
        {(/^https?:\/\//i.test(destination.trim()) || isUrlAudited) && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong>Universal OTA Link Detected:</strong> ATLAS is scanning confidential B2B bedbank clearing rates for this specific property to unmask live retail markups and eliminate OTA commissions.
            </span>
          </div>
        )}

        {/* Quick Destination Pills */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
            Destinations:
          </span>
          {popularCities.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setDestination(item.query);
                performSearch(item.query);
              }}
              className={`px-3 py-1 rounded-full border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                destination.toLowerCase() === item.query.toLowerCase()
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Stage Scanning Animation State */}
      {isScanning && (
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
              <h4 className="text-base font-black">
                Pinging Global OTA Feeds & Live Bedbank Gateways...
              </h4>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              Live Gateway Audit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 1 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Expedia Rapid API Feed</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 2 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Hotels.com GDS Benchmark</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 3 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Agoda / Booking.com Yield</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 4 ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <Zap className="w-4 h-4 text-amber-400" />
              <span>ATLAS B2B Bedbank Clearing</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Section with Price Tier Filter Tabs */}
      {!isScanning && hasSearched && hotels.length > 0 && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Live Wholesale Arbitrage: {destination ? destination : 'Global Curated Portfolio'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold">
                  {filteredHotels.length} Properties
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Audited rates for {nights} night stay ({checkIn} to {checkOut}) • 0% Hotel Retail Markup (At-Cost Transaction Settlement) • Direct Live Verification Available
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Rate Parity Exemption Certified
              </span>
            </div>
          </div>

          {/* Controls Bar: Category Filter & Sort Options */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
            {/* Price Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 shrink-0 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Tier:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Instant Sort Options */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 self-start md:self-auto">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sort:</span>
              </span>
              {[
                { id: 'savings', label: '💰 Max Savings' },
                { id: 'price-asc', label: '🏷️ Lowest Price' },
                { id: 'rating', label: '⭐ Top Rated' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sortBy === s.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Result Cards */}
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
              const publicLowest = Math.min(bookingPerNight, agodaPerNight, expediaPerNight);
              const savingsPerNight = Math.max(0, publicLowest - wholesalePerNight);
              const savingsTotal = savingsPerNight * nights;
              const savingsPercent = Math.round((savingsPerNight / (publicLowest || 1)) * 100);

              return (
              <div
                key={hotel.id}
                className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image & Quick Specs */}
                <Link
                  href={`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`}
                  className="lg:col-span-4 relative min-h-[260px] lg:min-h-full block group overflow-hidden cursor-pointer"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-black flex items-center gap-1.5 border border-amber-400/30 shadow">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{hotel.guestRating} / 10 Excellent</span>
                  </div>

                  {/* Category Tier Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-slate-200 text-[10px] font-bold border border-white/20 shadow">
                    {hotel.categoryLabel}
                  </div>

                  {/* Room & Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-slate-950/95 backdrop-blur-md text-white text-xs border border-white/10 shadow-lg group-hover:border-amber-400/40 transition-colors">
                    <div className="font-black text-amber-300 text-sm group-hover:text-amber-200 transition-colors">{hotel.roomType}</div>
                    <div className="text-slate-300 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </Link>

                {/* Details & Live Comparison Matrix */}
                <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Hotel Title & Audit Ref */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`}
                            className="text-xl sm:text-2xl font-black text-white hover:text-amber-300 transition-colors"
                          >
                            {hotel.name}
                          </Link>
                        </div>
                        <div className="text-xs text-amber-400 font-semibold mt-0.5">
                          {hotel.starRating}★ Rated Property • Verified B2B Bedbank Inventory
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                        Audit Ref: {hotel.audit.auditHash.substring(0, 10)}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 text-xs font-semibold border border-slate-800"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Multi-OTA Price Comparison Grid WITH INDEPENDENT GOOGLE TRAVEL AUDIT */}
                    <div className="pt-3.5 border-t border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={hotel.prices.googleHotels.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-5 h-5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:text-sky-300 font-black text-[10px] transition-colors cursor-pointer"
                            title={`Open Google Travel rates for ${hotel.name}`}
                          >
                            G
                          </a>
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                              <span>Official Public Retail Rates</span>
                              <a
                                href={hotel.prices.googleHotels.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-all cursor-pointer shadow-sm group/glink"
                                title={`Verify live rates for ${hotel.name} on Google Travel`}
                              >
                                <span>Google Travel Verified</span>
                                <ExternalLink className="w-2.5 h-2.5 group-hover/glink:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                            <p className="text-[10px] text-slate-400">
                              Real-time live prices across major retail booking platforms for this stay:
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Tax Transparency & Room Baseline Alignment Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 mb-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px]">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                            <BedDouble className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Standard Room Baseline</span>
                          </div>
                          <span className="text-slate-600 hidden sm:inline">•</span>
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span>Stay: <strong className="text-white font-bold">{checkIn} ➔ {checkOut}</strong> ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                          </div>
                        </div>

                        {/* Interactive Mode Toggle */}
                        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setShowAllInclusive(true)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              showAllInclusive
                                ? 'bg-emerald-500 text-slate-950 font-black shadow'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            title="Includes mandatory destination taxes and resort fees to match Google Travel live headline rates"
                          >
                            ✓ Taxes & Fees Included
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAllInclusive(false)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              !showAllInclusive
                                ? 'bg-slate-800 text-amber-300 font-black shadow border border-amber-400/30'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            title="Base room cost before regional taxes and mandatory fees"
                          >
                            Base Room Only
                          </button>
                        </div>
                      </div>

                      {/* Tax Notice Explanation */}
                      <div className="text-[10px] text-slate-400 mb-2 px-1 flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-sky-400 shrink-0" />
                        <span>
                          {showAllInclusive ? (
                            <>
                              <strong className="text-emerald-400 font-semibold">Taxes & Fees Included:</strong> Rates include ~{taxPercent}% {taxBreakdown?.taxLabel || 'destination tourism VAT & fees'} (reflects Google Travel European/Norwegian headline pricing).
                            </>
                          ) : (
                            <>
                              <strong className="text-amber-400 font-semibold">Base Room Only:</strong> Excludes ~{taxPercent}% local taxes & resort fees collected at property check-in.
                            </>
                          )}
                        </span>
                      </div>

                      {/* 4 Multi-OTA Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                        {/* Booking.com */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left sm:text-center">
                          <div className="font-bold text-sky-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                              <span>Booking.com</span>
                            </div>
                          </div>
                          <div className="text-base font-bold text-slate-300 line-through mt-1.5">
                            {formatPrice(bookingPerNight)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatPrice(bookingPerNight * nights)} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-sky-300/80 font-medium mt-1">
                            {showAllInclusive ? 'Taxes & Fees Included' : 'Base Rate Only'}
                          </div>
                        </div>

                        {/* Hotels.com */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left sm:text-center">
                          <div className="font-bold text-rose-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              <span>Hotels.com</span>
                            </div>
                          </div>
                          <div className="text-base font-bold text-slate-300 line-through mt-1.5">
                            {formatPrice(hotelsComPerNight)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatPrice(hotelsComPerNight * nights)} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-rose-300/80 font-medium mt-1">
                            Breakfast & Free Cancel
                          </div>
                        </div>

                        {/* Agoda */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left sm:text-center">
                          <div className="font-bold text-purple-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                              <span>Agoda</span>
                            </div>
                          </div>
                          <div className="text-base font-bold text-slate-300 line-through mt-1.5">
                            {formatPrice(agodaPerNight)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatPrice(agodaPerNight * nights)} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-purple-300/80 font-medium mt-1">
                            {showAllInclusive ? 'Promo Net Rate' : 'Base Promo Rate'}
                          </div>
                        </div>

                        {/* Expedia */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left sm:text-center">
                          <div className="font-bold text-blue-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              <span>Expedia</span>
                            </div>
                          </div>
                          <div className="text-base font-bold text-slate-300 line-through mt-1.5">
                            {formatPrice(expediaPerNight)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatPrice(expediaPerNight * nights)} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-blue-300/80 font-medium mt-1">
                            {showAllInclusive ? 'Taxes & Fees Included' : 'Base Rate Only'}
                          </div>
                        </div>
                      </div>

                      {/* Single Unified Google Travel Verification CTA */}
                      <a
                        href={hotel.prices.googleHotels.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full py-2.5 px-4 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm group"
                        title={`Verify live rates across all OTAs on Google Travel for ${hotel.name}`}
                      >
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                        </span>
                        <span>Verify Live Rates on Google Travel (Opens {hotel.name} for {checkIn} to {checkOut})</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Highlighted ATLAS Wholesale Price Box */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 border border-emerald-500/40 shadow-2xl">
                    <Link
                      href={
                        isMember
                          ? `/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`
                          : `/login?redirect=${encodeURIComponent(`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`)}&hotelId=${hotel.id}&hotelName=${encodeURIComponent(hotel.name)}`
                      }
                      className="space-y-1.5 text-center sm:text-left group cursor-pointer block"
                      title={isMember ? 'View wholesale booking options' : 'Log in to book this confidential wholesale rate'}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30 transition-colors">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        ATLAS Confidential B2B Wholesale Rate
                      </div>
                      <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                        <span className="text-3xl sm:text-4xl font-black text-emerald-400 group-hover:text-emerald-300 font-mono transition-colors">
                          {formatPrice(wholesalePerNight)}
                        </span>
                        <span className="text-xs text-slate-300">/ night</span>
                        <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                          Save {formatPrice(savingsPerNight)}/nt ({savingsPercent}% Off)
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">
                        Total for {nights} Nights: <strong className="text-white font-bold">{formatPrice(wholesaleTotal)}</strong>{' '}
                        <span className="text-emerald-400 font-bold">(You save {formatPrice(savingsTotal)} vs. {hotel.prices.lowestOta?.provider || 'Booking.com'})</span>
                      </div>
                      <div className="text-[11px] text-slate-300 pt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {showAllInclusive ? (
                          <span>
                            <strong>Transparent All-Inclusive Rate:</strong> Base Net {formatPrice(hotel.prices.atlasWholesale.basePerNight || Math.round(wholesalePerNight * 0.72))} + Est. Taxes & Fees ({taxPercent}%): {formatPrice(wholesalePerNight - (hotel.prices.atlasWholesale.basePerNight || Math.round(wholesalePerNight * 0.72)))}/nt
                          </span>
                        ) : (
                          <span>
                            <strong>Base Room Rate Only:</strong> Excludes ~{taxPercent}% local taxes & mandatory resort fees collected at check-in.
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 text-center sm:text-left pt-0.5">
                        * 0% hotel room markup pass-through. A nominal merchant transaction fee is applied at cost during checkout to cover payment processing.
                      </div>
                    </Link>

                    <div className="flex flex-col gap-2.5 w-full lg:w-80 shrink-0">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Link
                          href={`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`}
                          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors text-center whitespace-nowrap shadow-sm"
                          title="View all room options, suites, and property gallery"
                        >
                          <span>View Rooms ({hotel.roomOptions?.length || 1})</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setAuditingHotel(hotel)}
                          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors text-center whitespace-nowrap shadow-sm cursor-pointer"
                          title="Audit live price breakdown for this hotel"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Audit Live Rates</span>
                        </button>
                      </div>

                      {isMember ? (
                        <Link
                          href={`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`}
                          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
                          title="Book confidential wholesale net rate"
                        >
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                          <span className="whitespace-nowrap font-black">Book Wholesale Rate</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </Link>
                      ) : (
                        <Link
                          href={`/login?redirect=${encodeURIComponent(`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`)}&hotelId=${hotel.id}&hotelName=${encodeURIComponent(hotel.name)}`}
                          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
                          title="Sign in to unlock confidential wholesale rates"
                        >
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                          <span className="whitespace-nowrap font-black">Book Wholesale Rate (Log In)</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Load More Properties Pagination */}
          {filteredHotels.length > visibleCount && (
            <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 8, filteredHotels.length))}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Load More Properties ({filteredHotels.length - visibleCount} More Available)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <span className="text-xs text-slate-400 font-mono">
                Showing {Math.min(visibleCount, filteredHotels.length)} of {filteredHotels.length} Audited Properties
              </span>
            </div>
          )}
        </div>
      )}

      {/* Single-Property Live Rate Audit & OTA Price Breakdown Modal */}
      {auditingHotel && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setAuditingHotel(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Single-Property Live Rate Audit</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{auditingHotel.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{auditingHotel.address}</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{checkIn} to {checkOut} ({nights} nts)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>2 Adults</span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAuditingHotel(null)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-slate-200 flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                  <span>Standard Room (Room Only Baseline)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-400 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{checkIn} ➔ {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                This audit is strictly isolated to <strong>{auditingHotel.name}</strong> for the standard room tier. Public OTA rates are verified via Google Travel for the exact dates without competing properties.
              </p>
              <div className="text-[10px] text-amber-300/90 bg-amber-400/10 p-2.5 rounded-xl border border-amber-400/20 leading-relaxed">
                <strong>Pricing Caveat & Disclosure:</strong> ATLAS passes confidential B2B Bedbank net rates with <strong>0% hotel room markup</strong>. Unlike retail OTAs that add a 20%–45% profit margin, ATLAS charges zero retail markup on rooms. A nominal transaction & payment processing fee (~3.5%) is applied at cost during checkout to cover credit card interchange, merchant settlement, and 24/7 booking delivery guarantees.
              </div>
            </div>

            {/* Tax & Fee Transparency Breakdown Box */}
            {auditingHotel.prices.taxBreakdown && (
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Destination Tax & Mandatory Fee Profile</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-black">
                    ~{auditingHotel.prices.taxBreakdown.taxPercent}% Required Taxes & Fees
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {auditingHotel.prices.taxBreakdown.taxLabel}
                </div>
                <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Base Room Rate</div>
                    <div className="font-bold text-slate-200 mt-0.5">
                      {formatPrice(auditingHotel.prices.taxBreakdown.baseRoomRatePerNight)} / nt
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Estimated Taxes & Fees</div>
                    <div className="font-bold text-amber-300 mt-0.5">
                      +{formatPrice(auditingHotel.prices.taxBreakdown.estimatedTaxesPerNight)} / nt
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">All-Inclusive Headline</div>
                    <div className="font-bold text-emerald-400 mt-0.5">
                      {formatPrice(auditingHotel.prices.taxBreakdown.allInclusivePerNight)} / nt
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Side-by-side Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
                <span>Verified Provider Rates</span>
                <span className="text-[10px] text-emerald-400 font-bold lowercase">
                  ✓ {showAllInclusive ? 'showing all-inclusive rates' : 'showing base room rates'}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800 bg-slate-950">
                {/* Booking.com */}
                <div className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <span className="font-bold text-white">Booking.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-slate-300">
                        {formatPrice(showAllInclusive ? (auditingHotel.prices.booking?.withTaxesPerNight || auditingHotel.prices.booking?.perNight || auditingHotel.prices.expedia.perNight) : (auditingHotel.prices.booking?.basePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78)))} / nt
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatPrice((showAllInclusive ? (auditingHotel.prices.booking?.withTaxesPerNight || auditingHotel.prices.booking?.perNight || auditingHotel.prices.expedia.perNight) : (auditingHotel.prices.booking?.basePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78))) * nights)} total
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-800 text-[10px] font-semibold text-sky-300">
                      Taxes & Fees Included
                    </span>
                  </div>
                </div>

                {/* Hotels.com */}
                <div className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="font-bold text-white">Hotels.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-slate-300">
                        {formatPrice(showAllInclusive ? (auditingHotel.prices.hotelsCom?.withTaxesPerNight || auditingHotel.prices.hotelsCom?.perNight) : (auditingHotel.prices.hotelsCom?.basePerNight || Math.round(auditingHotel.prices.hotelsCom.perNight * 0.78)))} / nt
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatPrice((showAllInclusive ? (auditingHotel.prices.hotelsCom?.withTaxesPerNight || auditingHotel.prices.hotelsCom?.perNight) : (auditingHotel.prices.hotelsCom?.basePerNight || Math.round(auditingHotel.prices.hotelsCom.perNight * 0.78))) * nights)} total
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-950 border border-rose-800 text-[10px] font-semibold text-rose-300">
                      Breakfast & Free Cancel
                    </span>
                  </div>
                </div>

                {/* Agoda */}
                <div className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <span className="font-bold text-white">Agoda</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-slate-300">
                        {formatPrice(showAllInclusive ? (auditingHotel.prices.agoda?.withTaxesPerNight || auditingHotel.prices.agoda?.perNight) : (auditingHotel.prices.agoda?.basePerNight || Math.round(auditingHotel.prices.agoda.perNight * 0.78)))} / nt
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatPrice((showAllInclusive ? (auditingHotel.prices.agoda?.withTaxesPerNight || auditingHotel.prices.agoda?.perNight) : (auditingHotel.prices.agoda?.basePerNight || Math.round(auditingHotel.prices.agoda.perNight * 0.78))) * nights)} total
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-800 text-[10px] font-semibold text-purple-300">
                      Promo Rate
                    </span>
                  </div>
                </div>

                {/* Expedia */}
                <div className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span className="font-bold text-white">Expedia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-slate-300">
                        {formatPrice(showAllInclusive ? (auditingHotel.prices.expedia?.withTaxesPerNight || auditingHotel.prices.expedia?.perNight) : (auditingHotel.prices.expedia?.basePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78)))} / nt
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatPrice((showAllInclusive ? (auditingHotel.prices.expedia?.withTaxesPerNight || auditingHotel.prices.expedia?.perNight) : (auditingHotel.prices.expedia?.basePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78))) * nights)} total
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-400">
                      Public Rate
                    </span>
                  </div>
                </div>

                {/* Hotel Direct */}
                <div className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-white">Hotel Direct</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-slate-300">
                        {formatPrice(showAllInclusive ? (auditingHotel.prices.officialDirect?.withTaxesPerNight || auditingHotel.prices.officialDirect?.perNight || auditingHotel.prices.expedia.perNight) : (auditingHotel.prices.officialDirect?.basePerNight || auditingHotel.prices.taxBreakdown?.baseRoomRatePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78)))} / nt
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {formatPrice((showAllInclusive ? (auditingHotel.prices.officialDirect?.withTaxesPerNight || auditingHotel.prices.officialDirect?.perNight || auditingHotel.prices.expedia.perNight) : (auditingHotel.prices.officialDirect?.basePerNight || auditingHotel.prices.taxBreakdown?.baseRoomRatePerNight || Math.round(auditingHotel.prices.expedia.perNight * 0.78))) * nights)} total
                      </div>
                    </div>
                    <a
                      href={auditingHotel.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-800 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Direct</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* ATLAS Wholesale Net */}
                <div className="p-4 flex items-center justify-between text-xs bg-emerald-950/40 border-t-2 border-emerald-500/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span className="font-black text-emerald-400 text-sm">ATLAS Wholesale Net Rate</span>
                    </div>
                    <div className="text-[10px] text-emerald-300/80 mt-0.5">
                      0% Hotel Retail Markup • Net B2B Bedbank Clearing (At-cost payment settlement at checkout) • {showAllInclusive ? 'Includes local hospitality taxes & resort fees' : 'Base room rate before local taxes'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      {formatPrice(showAllInclusive ? (auditingHotel.prices.atlasWholesale.withTaxesPerNight || auditingHotel.prices.atlasWholesale.perNight) : (auditingHotel.prices.atlasWholesale.basePerNight || Math.round(auditingHotel.prices.atlasWholesale.perNight * 0.72)))} / nt
                    </div>
                    <div className="text-xs font-bold text-emerald-300">
                      Save {formatPrice(showAllInclusive ? auditingHotel.prices.atlasWholesale.instantSavingsPerNight : Math.round(auditingHotel.prices.atlasWholesale.instantSavingsPerNight * 0.72))} / nt ({auditingHotel.prices.atlasWholesale.savingsPercent}% Off)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={auditingHotel.prices.googleHotels.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/30 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Verify Live on Google Travel (Opens {auditingHotel.name} for {checkIn} to {checkOut})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href={`/hotels/${auditingHotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <Lock className="w-4 h-4" />
                <span>Book at Wholesale Rate ({formatPrice(auditingHotel.prices.atlasWholesale.total)} total)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
