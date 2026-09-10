'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { MOCK_CRUISES } from '@/lib/mockData';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Ship,
  Anchor,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  TrendingDown,
  Gift,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

function CruisesSearchContent() {
  const { formatPrice } = useCurrency();
  const [selectedLine, setSelectedLine] = useState<string>('All');
  const [selectedDest, setSelectedDest] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const cruiseLines = ['All', 'Royal Caribbean', 'Celebrity Cruises', 'Norwegian Cruise Line'];
  const destinations = ['All', 'Eastern Caribbean', 'Mediterranean', 'Alaska'];

  const filteredCruises = useMemo(() => {
    return MOCK_CRUISES.filter((cruise) => {
      const matchLine = selectedLine === 'All' || cruise.cruiseLine === selectedLine;
      const matchDest = selectedDest === 'All' || cruise.destination === selectedDest;
      const matchPrice = cruise.memberPriceStarting <= maxPrice;
      return matchLine && matchDest && matchPrice;
    });
  }, [selectedLine, selectedDest, maxPrice]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Anchor className="w-3.5 h-3.5" />
            Closed-Loop Wholesale Cruise Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Wholesale Cruise Sailings & Free Onboard Credit
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Save up to 40% on Royal Caribbean, Celebrity, and NCL with exclusive member bonuses: <strong>$150 to $400 Free Onboard Spending Cash</strong> and complimentary drink packages.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                  Filter Cruises
                </div>
                <button
                  onClick={() => {
                    setSelectedLine('All');
                    setSelectedDest('All');
                    setMaxPrice(2000);
                  }}
                  className="text-[11px] font-bold text-sky-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Cruise Line Filter */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Cruise Line
                </label>
                <div className="space-y-1.5">
                  {cruiseLines.map((line) => (
                    <button
                      key={line}
                      onClick={() => setSelectedLine(line)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedLine === line
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{line}</span>
                      {selectedLine === line && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Filter */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Sailing Destination
                </label>
                <div className="space-y-1.5">
                  {destinations.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setSelectedDest(dest)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedDest === dest
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{dest}</span>
                      {selectedDest === dest && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Budget */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Max Starting Rate
                  </label>
                  <span className="text-xs font-bold text-emerald-600">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            </div>
          </div>

          {/* Cruise Listings */}
          <div className="lg:col-span-9 space-y-6">
            {filteredCruises.map((cruise) => (
              <div
                key={cruise.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col md:flex-row group"
              >
                {/* Image */}
                <div className="relative md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
                  <img
                    src={cruise.thumbnail}
                    alt={cruise.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    SAVE {cruise.savingsPercentage}%
                  </div>
                  <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    +{formatPrice(cruise.onboardCredit)} FREE Onboard Cash
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-sky-600 uppercase tracking-wider">
                        {cruise.cruiseLine} • {cruise.shipName}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {cruise.durationNights} Nights
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                      {cruise.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Departs from: <strong>{cruise.departurePort}</strong></span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Ports of Call:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cruise.portsOfCall.map((port, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            ⚓ {port}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Comparison and Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-400">
                        Brochure Retail: <span className="line-through font-bold">{formatPrice(cruise.publicPriceStarting)}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs uppercase font-extrabold text-emerald-600">
                          Wholesale Starting:
                        </span>
                        <span className="text-2xl font-black text-slate-900">
                          {formatPrice(cruise.memberPriceStarting)}
                        </span>
                        <span className="text-xs text-slate-400"> /person</span>
                      </div>
                    </div>

                    <Link
                      href={`/cruises/${cruise.id}`}
                      className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Select Stateroom</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CruisesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500 text-sm">Loading wholesale cruise catalog...</div>}>
      <CruisesSearchContent />
    </Suspense>
  );
}
