'use client';

import React, { useState } from 'react';
import { MOCK_PRIVATE_JETS } from '@/lib/mockData';
import { PrivateJetEmptyLeg } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import {
  Plane,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  Wine,
  Wifi,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function PrivateJetsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'seat_price_asc' | 'seat_price_desc' | 'savings'>('date');
  const [bookingModalJet, setBookingModalJet] = useState<PrivateJetEmptyLeg | null>(null);
  const [bookingType, setBookingType] = useState<'per_seat' | 'whole_jet'>('per_seat');
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const categories = [
    'All',
    'Light Jet',
    'Midsize Jet',
    'Super Midsize Jet',
    'Heavy Long-Range Jet',
    'Ultra Long-Range Jet'
  ];

  const regions = ['All', 'North America', 'Europe', 'Middle East & Asia'];

  const isRouteInRegion = (jet: PrivateJetEmptyLeg, region: string) => {
    if (region === 'All') return true;
    const usaCities = ['miami', 'teterboro', 'las vegas', 'van nuys', 'aspen', 'dallas', 'chicago', 'palm beach', 'white plains', 'nantucket', 'new york', 'los angeles'];
    const europeCities = ['london', 'nice', 'paris', 'olbia', 'farnborough', 'ibiza', 'geneva', 'milan', 'rome'];
    const meAsiaCities = ['dubai', 'singapore', 'phuket', 'tokyo', 'bangkok', 'doha'];

    const dep = jet.departureCity.toLowerCase();
    const arr = jet.arrivalCity.toLowerCase();

    if (region === 'North America') {
      return usaCities.some((c) => dep.includes(c) || arr.includes(c));
    }
    if (region === 'Europe') {
      return europeCities.some((c) => dep.includes(c) || arr.includes(c));
    }
    if (region === 'Middle East & Asia') {
      return meAsiaCities.some((c) => dep.includes(c) || arr.includes(c));
    }
    return true;
  };

  const filteredJets = MOCK_PRIVATE_JETS
    .filter((jet) => {
      const matchSearch =
        !searchTerm ||
        jet.departureCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jet.arrivalCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jet.departureAirportCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jet.arrivalAirportCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jet.aircraftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jet.operator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || jet.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchRegion = isRouteInRegion(jet, selectedRegion);
      return matchSearch && matchCategory && matchRegion;
    })
    .sort((a, b) => {
      if (sortBy === 'seat_price_asc') return a.perSeatMemberPrice - b.perSeatMemberPrice;
      if (sortBy === 'seat_price_desc') return b.perSeatMemberPrice - a.perSeatMemberPrice;
      if (sortBy === 'savings') return b.savingsPercentage - a.savingsPercentage;
      return 0; // default order
    });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-400/30">
            <Plane className="w-3.5 h-3.5 text-amber-400" />
            Private Aviation Empty Leg Steals (Up to 80% Off)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Fly Private for Commercial Business-Class Prices
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Repositioning private jets at wholesale rates. Enjoy VIP private FBO terminals, skip airport security, bring pets in-cabin, and sip complimentary vintage champagne.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search route or airport (e.g. Miami, Teterboro, Las Vegas, Nice, London)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Jet Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter Toolbar */}
        <div className="space-y-4 mb-8">
          {/* Aircraft Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Aircraft:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-amber-400 shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedRegion === reg
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Controls Bar: Results Count & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 text-xs">
            <div className="text-slate-600 font-semibold">
              Showing <span className="font-black text-slate-900">{filteredJets.length}</span> confirmed empty leg routes
              {(selectedCategory !== 'All' || selectedRegion !== 'All' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedRegion('All');
                    setSearchTerm('');
                  }}
                  className="ml-3 text-sky-600 hover:underline font-bold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="date">Featured Schedule</option>
                <option value="seat_price_asc">Per-Seat Price: Low to High</option>
                <option value="seat_price_desc">Per-Seat Price: High to Low</option>
                <option value="savings">Biggest Savings %</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJets.map((jet) => (
            <div
              key={jet.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Aircraft Image & Badges */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={jet.image}
                    alt={jet.aircraftType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10">
                    {jet.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow">
                    SAVE {jet.savingsPercentage}%
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md rounded-2xl p-3 text-white flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-amber-300">{jet.departureCity} ({jet.departureAirportCode})</div>
                      <div className="text-[10px] text-slate-400">{jet.departureTime}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="text-right">
                      <div className="font-bold text-amber-300">{jet.arrivalCity} ({jet.arrivalAirportCode})</div>
                      <div className="text-[10px] text-slate-400">{jet.flightDuration}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{jet.aircraftType}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Tail: <span className="font-mono font-bold text-slate-700">{jet.tailNumber}</span> • {jet.operator}
                    </div>
                    <div className="text-[11px] text-sky-700 font-semibold mt-1">
                      📍 {jet.fboTerminal}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Departure Date:</span>
                      <span className="font-bold text-slate-900">{jet.departureDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Cabin Capacity:</span>
                      <span className="font-bold text-slate-900">{jet.maxPassengers} VIP Seats</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Executive Inclusions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {jet.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 line-through">
                    Standard Charter: ${jet.wholeJetRetailPrice.toLocaleString()}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    <span className="text-emerald-600 font-black">${jet.perSeatMemberPrice.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-normal"> /seat</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingModalJet(jet);
                    setIsBooked(false);
                  }}
                  className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plane className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reserve Flight</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Checkout Modal */}
      {bookingModalJet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setBookingModalJet(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                Private Jet Empty Leg Charter
              </div>
              <h3 className="text-xl font-black">{bookingModalJet.aircraftType}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                {bookingModalJet.departureCity} ➔ {bookingModalJet.arrivalCity} on {bookingModalJet.departureDate}
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {isBooked ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Private Jet Reservation Confirmed!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>Manifest ID: <strong>JET-XO-994182</strong></div>
                    <div>FBO Executive Terminal: <strong>{bookingModalJet.fboTerminal}</strong></div>
                    <div>Boarding Protocol: <strong>Direct Tarmac Access (Arrive 15 mins prior)</strong></div>
                  </div>
                  <button
                    onClick={() => setBookingModalJet(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBookingType('per_seat')}
                      className={`p-3 rounded-2xl border font-bold transition-all ${
                        bookingType === 'per_seat'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Per-Seat (${bookingModalJet.perSeatMemberPrice})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('whole_jet')}
                      className={`p-3 rounded-2xl border font-bold transition-all ${
                        bookingType === 'whole_jet'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Whole Jet (${bookingModalJet.wholeJetMemberPrice.toLocaleString()})
                    </button>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Retail Charter Price:</span>
                      <span className="line-through">${bookingModalJet.wholeJetRetailPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Total:</span>
                      <span className="text-emerald-600 font-black text-base">
                        ${bookingType === 'per_seat'
                          ? (bookingModalJet.perSeatMemberPrice * passengerCount).toLocaleString()
                          : bookingModalJet.wholeJetMemberPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                      ✓ Includes champagne bar, gourmet catering, and private FBO VIP boarding.
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBooked(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Confirm & Lock Private Jet Reservation
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
