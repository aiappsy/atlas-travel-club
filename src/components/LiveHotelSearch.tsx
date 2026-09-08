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
  TrendingDown,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  Percent
} from 'lucide-react';
import { ComparedHotel } from '@/app/api/hotels/compare/route';

interface LiveHotelSearchProps {
  initialDestination?: string;
  isCompact?: boolean;
}

export default function LiveHotelSearch({
  initialDestination = 'Las Vegas',
  isCompact = false,
}: LiveHotelSearchProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guests, setGuests] = useState('2 Guests, 1 Room');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hotels, setHotels] = useState<ComparedHotel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) || 3);

  const popularCities = ['Las Vegas', 'Paris', 'Dubai', 'New York', 'Tokyo', 'London', 'Miami', 'Bali'];

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
    }, 250);

    try {
      const res = await fetch(`/api/hotels/compare?destination=${encodeURIComponent(targetDest)}&nights=${nights}`);
      const data = await res.json();
      setTimeout(() => {
        setHotels(data.hotels || []);
        setIsScanning(false);
      }, 1000);
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

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Luxury Floating Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 1. Destination / Hotel Name */}
          <div className="md:col-span-4 bg-slate-50 hover:bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Destination or Hotel
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Las Vegas, Paris, Bellagio..."
                className="w-full bg-transparent font-bold text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 2. Check-In Date */}
          <div className="md:col-span-2 bg-slate-50 hover:bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Check-Out Date */}
          <div className="md:col-span-2 bg-slate-50 hover:bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Check-Out ({nights} Nts)
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Guests & Rooms */}
          <div className="md:col-span-2 bg-slate-50 hover:bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200 transition-colors flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Guests
              </label>
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent font-bold text-xs text-slate-900 focus:outline-none"
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
              <span>{isScanning ? 'Auditing...' : 'Check Real Rates'}</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
            Popular Hubs:
          </span>
          {popularCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setDestination(city);
                performSearch(city);
              }}
              className={`px-3 py-1 rounded-full border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                destination.toLowerCase() === city.toLowerCase()
                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {city}
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
                Connecting to Global OTA Feeds & B2B Bedbanks...
              </h4>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              Live Gateway Audit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 1 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Expedia Rapid API</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${scanStep >= 2 ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Hotels.com GDS Feed</span>
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

      {/* Results Section */}
      {!isScanning && hasSearched && hotels.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Live Wholesale Arbitrage in {destination}
              </h3>
              <p className="text-xs text-slate-500">
                Audited rates for {nights} night stay ({checkIn} to {checkOut}) • 0% Retail Markup Applied
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Rate Parity Exemption Certified
            </span>
          </div>

          {/* Hotel Result Cards */}
          <div className="space-y-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image & Quick Specs */}
                <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-300 text-xs font-black flex items-center gap-1 border border-amber-400/30 shadow">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{hotel.guestRating} / 10 Excellent</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md text-white text-xs border border-white/10">
                    <div className="font-black text-amber-300 text-sm">{hotel.roomType}</div>
                    <div className="text-slate-300 text-xs">{hotel.city}, {hotel.country}</div>
                  </div>
                </div>

                {/* Details & Comparison Matrix */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                        {hotel.name}
                      </h4>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        Audit Ref: {hotel.audit.auditHash.substring(0, 10)}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Multi-OTA Price Comparison Grid */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                        Public Retail Price on Other Platforms (Per Night):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="font-bold text-blue-900 text-xs flex items-center justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span> Expedia
                          </div>
                          <div className="text-sm font-bold text-slate-500 line-through mt-1">${hotel.prices.expedia.perNight}</div>
                          <div className="text-[10px] text-slate-400">${hotel.prices.expedia.total} total</div>
                        </div>

                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="font-bold text-rose-900 text-xs flex items-center justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-600"></span> Hotels.com
                          </div>
                          <div className="text-sm font-bold text-slate-500 line-through mt-1">${hotel.prices.hotelsCom.perNight}</div>
                          <div className="text-[10px] text-slate-400">${hotel.prices.hotelsCom.total} total</div>
                        </div>

                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="font-bold text-purple-900 text-xs flex items-center justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-600"></span> Agoda
                          </div>
                          <div className="text-sm font-bold text-slate-500 line-through mt-1">${hotel.prices.agoda.perNight}</div>
                          <div className="text-[10px] text-slate-400">${hotel.prices.agoda.total} total</div>
                        </div>

                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div className="font-bold text-amber-900 text-xs flex items-center justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-600"></span> Kayak
                          </div>
                          <div className="text-sm font-bold text-slate-500 line-through mt-1">${hotel.prices.kayak.perNight}</div>
                          <div className="text-[10px] text-slate-400">${hotel.prices.kayak.total} total</div>
                        </div>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
