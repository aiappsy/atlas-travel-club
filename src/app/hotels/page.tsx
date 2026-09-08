'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MOCK_HOTELS } from '@/lib/mockData';
import {
  Search,
  MapPin,
  Star,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

function HotelsSearchContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || '';

  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minStars, setMinStars] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [sortBy, setSortBy] = useState<'savings' | 'priceAsc' | 'rating'>('savings');

  // Filter and sort hotels
  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter((hotel) => {
      const matchCity =
        !searchTerm ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.stateCountry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || hotel.category === selectedCategory;

      const matchStars = hotel.stars >= minStars;
      const matchPrice = hotel.memberPricePerNight <= maxPrice;

      return matchCity && matchCategory && matchStars && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'savings') return b.savingsPercentage - a.savingsPercentage;
      if (sortBy === 'priceAsc') return a.memberPricePerNight - b.memberPricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, selectedCategory, minStars, maxPrice, sortBy]);

  const categories = ['All', 'Luxury Resort', 'City Center', 'All-Inclusive'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Closed-Loop Wholesale Hotel Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            Search Wholesale Rates Worldwide
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Real-time B2B inventory with direct wholesale prices. Compare our net rates against major public booking portals.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-6 max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, resort name, or destination (e.g. Las Vegas, Paris, Cancun)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Filters Sidebar + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                  Filter Inventory
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setMinStars(0);
                    setMaxPrice(600);
                  }}
                  className="text-[11px] font-bold text-sky-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Property Category
                </label>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Minimum Star Rating
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinStars(star)}
                      className={`py-2 text-center rounded-xl text-xs font-bold transition-all ${
                        minStars === star
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {star === 0 ? 'Any' : `${star}★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Wholesale Price */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Max Member Rate
                  </label>
                  <span className="text-xs font-bold text-emerald-600">${maxPrice}/nt</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            </div>
          </div>

          {/* Hotel Results List */}
          <div className="lg:col-span-9 space-y-4">
            {/* Sort Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-600">
                Found <span className="text-sky-600 font-extrabold">{filteredHotels.length}</span> wholesale properties
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="savings">Highest % Saved First</option>
                  <option value="priceAsc">Wholesale Price (Low to High)</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col md:flex-row group"
                  >
                    {/* Hotel Image with Badges */}
                    <div className="relative md:w-72 h-56 md:h-auto shrink-0 overflow-hidden">
                      <img
                        src={hotel.thumbnail}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        SAVE {hotel.savingsPercentage}%
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {hotel.category}
                      </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-sky-600" />
                            <span>{hotel.address}</span>
                          </div>

                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-black text-amber-900">{hotel.rating}</span>
                            <span className="text-[10px] text-amber-700 font-medium">
                              ({hotel.reviewCount})
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {hotel.description}
                        </p>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Comparison and Action */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Public Retail:</span>
                            <span className="text-xs line-through text-slate-500 font-bold">
                              ${hotel.publicPricePerNight}/night
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-xs uppercase font-extrabold text-emerald-600">
                              Wholesale Member Rate:
                            </span>
                            <span className="text-2xl font-black text-slate-900">
                              ${hotel.memberPricePerNight}
                            </span>
                            <span className="text-xs text-slate-400">/night</span>
                          </div>
                        </div>

                        <Link
                          href={`/hotels/${hotel.id}`}
                          className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 text-center transition-all"
                        >
                          Book Wholesale
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">No properties match your filters</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or adjusting your maximum budget filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setMaxPrice(600);
                  }}
                  className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelsSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
          Loading wholesale hotel catalog...
        </div>
      }
    >
      <HotelsSearchContent />
    </Suspense>
  );
}
