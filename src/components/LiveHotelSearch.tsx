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
  Building2
} from 'lucide-react';
import { ComparedHotel } from '@/app/api/hotels/compare/route';

interface LiveHotelSearchProps {
  initialDestination?: string;
  isCompact?: boolean;
}

export default function LiveHotelSearch({
  initialDestination = '',
  isCompact = false,
}: LiveHotelSearchProps) {
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
                placeholder="e.g. Oslo, Las Vegas, Paris, Bellagio..."
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

          {/* Price Category / Hotel Tier Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Category Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Hotel Result Cards */}
          <div className="space-y-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image & Quick Specs */}
                <div className="lg:col-span-4 relative min-h-[260px] lg:min-h-full">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image network error
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
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
                      <div className="font-black text-amber-300 text-sm">{hotel.roomType}</div>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5" />
                        <span>Verified Property</span>
                      </span>
                    </div>
                    <div className="text-slate-300 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </div>

                {/* Details & Live Comparison Matrix */}
                <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Hotel Title & Audit Ref */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl sm:text-2xl font-black text-white">
                            {hotel.name}
                          </h4>
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

                    {/* Multi-OTA Price Comparison Grid WITH LIVE VERIFICATION LINKS */}
                    <div className="pt-3 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <span>Public Retail Prices on Other Platforms:</span>
                          <span className="text-[10px] text-amber-400 font-normal normal-case">(Click any OTA to verify live)</span>
                        </div>
                        <a
                          href={hotel.prices.googleHotels.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                          title="Open Google Hotels search in a new tab"
                        >
                          <span>Compare on Google Hotels</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                        {/* Expedia */}
                        <a
                          href={hotel.prices.expedia.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all group block text-left sm:text-center"
                          title="Click to check live price on Expedia in new tab"
                        >
                          <div className="font-bold text-blue-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              <span>Expedia</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </div>
                          <div className="text-base font-bold text-slate-400 line-through mt-1.5">
                            ${hotel.prices.expedia.perNight}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ${hotel.prices.expedia.total} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-blue-400 font-semibold mt-1 group-hover:underline">
                            Verify on Expedia ↗
                          </div>
                        </a>

                        {/* Hotels.com */}
                        <a
                          href={hotel.prices.hotelsCom.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/50 transition-all group block text-left sm:text-center"
                          title="Click to check live price on Hotels.com in new tab"
                        >
                          <div className="font-bold text-rose-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              <span>Hotels.com</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-rose-400 transition-colors" />
                          </div>
                          <div className="text-base font-bold text-slate-400 line-through mt-1.5">
                            ${hotel.prices.hotelsCom.perNight}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ${hotel.prices.hotelsCom.total} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-rose-400 font-semibold mt-1 group-hover:underline">
                            Verify on Hotels.com ↗
                          </div>
                        </a>

                        {/* Agoda */}
                        <a
                          href={hotel.prices.agoda.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 transition-all group block text-left sm:text-center"
                          title="Click to check live price on Agoda in new tab"
                        >
                          <div className="font-bold text-purple-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                              <span>Agoda</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="text-base font-bold text-slate-400 line-through mt-1.5">
                            ${hotel.prices.agoda.perNight}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ${hotel.prices.agoda.total} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-purple-400 font-semibold mt-1 group-hover:underline">
                            Verify on Agoda ↗
                          </div>
                        </a>

                        {/* Kayak */}
                        <a
                          href={hotel.prices.kayak.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 transition-all group block text-left sm:text-center"
                          title="Click to check live price on Kayak in new tab"
                        >
                          <div className="font-bold text-amber-400 text-xs flex items-center justify-between sm:justify-center gap-1">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              <span>Kayak</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                          </div>
                          <div className="text-base font-bold text-slate-400 line-through mt-1.5">
                            ${hotel.prices.kayak.perNight}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ${hotel.prices.kayak.total} total ({nights} nts)
                          </div>
                          <div className="text-[9px] text-amber-400 font-semibold mt-1 group-hover:underline">
                            Verify on Kayak ↗
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
                          ${hotel.prices.atlasWholesale.perNight}
                        </span>
                        <span className="text-xs text-slate-300">/ night</span>
                        <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                          Save ${hotel.prices.atlasWholesale.instantSavingsPerNight}/nt ({hotel.prices.atlasWholesale.savingsPercent}% Off)
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">
                        Total for {nights} Nights: <strong className="text-white font-bold">${hotel.prices.atlasWholesale.total}</strong>{' '}
                        <span className="text-emerald-400 font-bold">(You save ${hotel.prices.atlasWholesale.totalSavings} vs. {hotel.prices.lowestOta.provider})</span>
                      </div>
                      <div className="text-xs text-slate-400 pt-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>OTA Marketing Ad Tax Eliminated: -${hotel.prices.atlasWholesale.adTaxEliminated}/nt</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                      <a
                        href={hotel.prices.googleHotels.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                        title="Verify real-time rates on Google Hotels in new window"
                      >
                        <span>Verify Live Prices</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>

                      <Link
                        href="/membership"
                        className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shrink-0"
                      >
                        <span>Unlock Wholesale Rate</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
