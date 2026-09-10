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
  SlidersHorizontal,
  Camera,
  Building2,
  Globe
} from 'lucide-react';
import { ComparedHotel } from '@/app/api/hotels/compare/route';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';

interface LiveHotelSearchProps {
  initialDestination?: string;
  isCompact?: boolean;
}

export default function LiveHotelSearch({
  initialDestination = '',
  isCompact = false,
}: LiveHotelSearchProps) {
  const { formatPrice, currency, setCurrency, currencies } = useCurrency();
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guests, setGuests] = useState('2 Guests, 1 Room');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hotels, setHotels] = useState<ComparedHotel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) || 3);

  const popularCities = [
    { name: 'All Destinations', query: '' },
    { name: 'Oslo', query: 'Oslo' },
    { name: 'Las Vegas', query: 'Las Vegas' },
    { name: 'Paris', query: 'Paris' },
    { name: 'Dubai', query: 'Dubai' },
    { name: 'New York', query: 'New York' },
  ];

  const categories = [
    { id: 'all', label: 'All Price Tiers' },
    { id: 'ultra-luxury', label: '👑 Ultra-Luxury (5★)' },
    { id: 'luxury-resort', label: '💎 Luxury Resorts & Palaces' },
    { id: 'upscale-boutique', label: '✨ Upscale & Boutique (4★)' },
    { id: 'smart-value', label: '🏷️ Smart Value (3-4★)' },
  ];

  const performSearch = async (targetDest: string) => {
    setIsScanning(true);
    setScanStep(0);
    setHasSearched(true);

    const stepsInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(stepsInterval);
        return prev;
      });
    }, 200);

    try {
      const res = await fetch(
        `/api/hotels/compare?destination=${encodeURIComponent(targetDest)}&nights=${nights}&checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await res.json();
      setTimeout(() => {
        setHotels(data.hotels || []);
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

  const filteredHotels = hotels.filter((h) => {
    if (selectedCategory === 'all') return true;
    return h.category === selectedCategory;
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
                placeholder="e.g. Oslo, Las Vegas, Paris, Horseshoe..."
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
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
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
                Querying Live GDS & Direct OTA Property Feeds...
              </h4>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              Live Gateway Audit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 1 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Expedia Property GDS</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 2 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Hotels.com Live Benchmark</span>
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


      {/* Empty Search Fallback */}
      {!isScanning && hasSearched && hotels.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl text-white">
          <Building2 className="w-12 h-12 text-amber-400 mx-auto opacity-75" />
          <h4 className="text-lg font-black text-white">No Properties Found for "{destination}"</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We searched live B2B Bedbank gateways. Try searching for Oslo, Paris, Las Vegas, Dubai, Davao, Tokyo, or explore our global portfolio.
          </p>
          <button
            type="button"
            onClick={() => {
              setDestination('');
              performSearch('');
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Global Wholesale Portfolio
          </button>
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
                Audited rates for {nights} night stay ({checkIn} to {checkOut}) • 0% Retail Ad Markup Applied • Direct Live Verification Available
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Rate Parity Exemption Certified
              </span>
            </div>
          </div>

          {/* Price Category / Hotel Tier Filter Tabs + Currency Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 shrink-0 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Category:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* In-Search Currency Selector */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Currency:</span>
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-slate-950 text-amber-300 border border-slate-800 hover:border-amber-400/50 rounded-xl px-2.5 py-1.5 text-xs font-bold font-mono focus:outline-none cursor-pointer transition-colors"
                title="Select active currency"
              >
                {Object.values(currencies).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hotel Result Cards */}
          <div className="space-y-6">
            {filteredHotels.map((hotel) => {
              const detailUrl = `/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${encodeURIComponent(guests)}`;

              return (
                <div
                  key={hotel.id}
                  className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image & Quick Specs */}
                  <div className="lg:col-span-4 relative min-h-[260px] lg:min-h-full">
                    <Link href={detailUrl} className="block w-full h-full">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-black flex items-center gap-1.5 border border-amber-400/30 shadow">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{hotel.guestRating} / 10 Excellent</span>
                    </div>

                    {/* Category Tier Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-slate-200 text-[10px] font-bold border border-white/20 shadow flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-400" />
                      <span>{hotel.categoryLabel}</span>
                    </div>

                    {/* Room & Location Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-slate-950/95 backdrop-blur-md text-white text-xs border border-white/10 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="font-black text-amber-300 text-sm truncate">{hotel.roomType}</div>
                        <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 shrink-0 ml-1">
                          <Camera className="w-2.5 h-2.5" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <div className="text-slate-300 text-xs flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{hotel.address || `${hotel.city}, ${hotel.country}`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details & Live Comparison Matrix */}
                  <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Hotel Title & Audit Ref */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <Link href={detailUrl} className="hover:text-amber-400 transition-colors">
                            <h4 className="text-xl sm:text-2xl font-black text-white">
                              {hotel.name}
                            </h4>
                          </Link>
                          <div className="text-xs text-amber-400 font-semibold mt-0.5">
                            {hotel.starRating}★ Rated Property • Verified B2B Bedbank Clearing Inventory
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

                      {/* Multi-OTA Direct Property Verification Grid */}
                      <div className="pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <span>Direct Property Retail Rates:</span>
                            <span className="text-[10px] text-amber-400 font-normal normal-case">(Click to verify live property page)</span>
                          </div>
                          <a
                            href={hotel.prices.googleHotels.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                            title="Open Google Hotels search for this exact property in a new tab"
                          >
                            <span>Google Hotels Direct ↗</span>
                          </a>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                          {/* Expedia Direct Property */}
                          <a
                            href={hotel.prices.expedia.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all group block"
                            title={`Click to verify direct rate for ${hotel.name} on Expedia`}
                          >
                            <div className="font-bold text-blue-400 text-xs flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              <span>Expedia</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-blue-400" />
                            </div>
                            <div className="text-sm font-bold text-slate-400 line-through mt-1">
                              {formatPrice(hotel.prices.expedia.perNight)}
                            </div>
                            <div className="text-[9px] text-blue-400 font-semibold group-hover:underline">
                              Verify ↗
                            </div>
                          </a>

                          {/* Hotels.com Direct Property */}
                          <a
                            href={hotel.prices.hotelsCom.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/50 transition-all group block"
                            title={`Click to verify direct rate for ${hotel.name} on Hotels.com`}
                          >
                            <div className="font-bold text-rose-400 text-xs flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              <span>Hotels.com</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-rose-400" />
                            </div>
                            <div className="text-sm font-bold text-slate-400 line-through mt-1">
                              {formatPrice(hotel.prices.hotelsCom.perNight)}
                            </div>
                            <div className="text-[9px] text-rose-400 font-semibold group-hover:underline">
                              Verify ↗
                            </div>
                          </a>

                          {/* Agoda Direct Property */}
                          <a
                            href={hotel.prices.agoda.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 transition-all group block"
                            title={`Click to verify direct rate for ${hotel.name} on Agoda`}
                          >
                            <div className="font-bold text-purple-400 text-xs flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                              <span>Agoda</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-purple-400" />
                            </div>
                            <div className="text-sm font-bold text-slate-400 line-through mt-1">
                              {formatPrice(hotel.prices.agoda.perNight)}
                            </div>
                            <div className="text-[9px] text-purple-400 font-semibold group-hover:underline">
                              Verify ↗
                            </div>
                          </a>

                          {/* Kayak Direct Property */}
                          <a
                            href={hotel.prices.kayak.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 transition-all group block"
                            title={`Click to verify direct rate for ${hotel.name} on Kayak`}
                          >
                            <div className="font-bold text-amber-400 text-xs flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>Kayak</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-amber-400" />
                            </div>
                            <div className="text-sm font-bold text-slate-400 line-through mt-1">
                              {formatPrice(hotel.prices.kayak.perNight)}
                            </div>
                            <div className="text-[9px] text-amber-400 font-semibold group-hover:underline">
                              Verify ↗
                            </div>
                          </a>

                          {/* Hotel Official Direct Website */}
                          <a
                            href={hotel.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all group block"
                            title={`Click to open official hotel website for ${hotel.name}`}
                          >
                            <div className="font-bold text-emerald-400 text-xs flex items-center justify-center gap-1">
                              <Globe className="w-2.5 h-2.5 text-emerald-400" />
                              <span>Hotel Site</span>
                              <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-emerald-400" />
                            </div>
                            <div className="text-sm font-bold text-slate-400 line-through mt-1">
                              {formatPrice(hotel.prices.officialDirect?.perNight || hotel.prices.expedia.perNight)}
                            </div>
                            <div className="text-[9px] text-emerald-400 font-semibold group-hover:underline">
                              Direct ↗
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Highlighted ATLAS Wholesale Price Box */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-emerald-500/40 shadow-2xl">
                      <div className="space-y-1.5 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                          ATLAS Confidential B2B Wholesale Rate
                        </div>
                        <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                          <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                            {formatPrice(hotel.prices.atlasWholesale.perNight)}
                          </span>
                          <span className="text-xs text-slate-300">/ night</span>
                          <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                            Save {formatPrice(hotel.prices.atlasWholesale.instantSavingsPerNight)}/nt ({hotel.prices.atlasWholesale.savingsPercent}% Off)
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-200 font-medium">
                          Total for {nights} Nights: <strong className="text-white font-bold">{formatPrice(hotel.prices.atlasWholesale.total)}</strong>{' '}
                          <span className="text-emerald-400 font-bold">(You save {formatPrice(hotel.prices.atlasWholesale.totalSavings)} vs. {hotel.prices.lowestOta.provider})</span>
                        </div>
                        <div className="text-xs text-slate-400 pt-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>OTA Marketing Ad Tax Eliminated: -{formatPrice(hotel.prices.atlasWholesale.adTaxEliminated)}/nt</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                        <Link
                          href={detailUrl}
                          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shrink-0"
                        >
                          <span>View Full Presentation & Book</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
