'use client';

import React, { useState } from 'react';
import { MOCK_FAST_TRACK_SERVICES } from '@/lib/mockData';
import { FastTrackAirportService } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Plane,
  ArrowRight,
  Sparkles,
  Search,
  Building2,
  X,
  CreditCard
} from 'lucide-react';

export default function FastTrackPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<FastTrackAirportService | null>(null);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('2026-09-20');
  const [isBooked, setIsBooked] = useState(false);

  const filteredServices = MOCK_FAST_TRACK_SERVICES.filter(
    (s) =>
      !searchTerm ||
      s.airportCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.airportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-400/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Diplomatic Airport Fast-Track & Tarmac Escort
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Skip 2-Hour Passport Lines in 3 Minutes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            A dedicated VIP airport officer meets you directly at the aircraft jet bridge with a personalized name board, whisks you through crew/diplomatic lanes, handles your luggage, and escorts you to your chauffeur.
          </p>

          {/* Airport Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Airport Code or City (e.g. LHR, DXB, CDG, JFK)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Fast-Track Services Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.airportName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10">
                    ✈️ {service.airportCode} • {service.city}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                    SAVE {service.savingsPercentage}%
                  </div>
                  <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow">
                    ⚡ {service.averageCustomsTimeMinutes}-Min Clearance Time
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                      {service.serviceType}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-xl mt-0.5">
                      {service.airportName}
                    </h3>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      VIP Fast-Track Inclusions:
                    </div>
                    <div className="space-y-1.5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="text-[11px] text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 line-through">
                    Public Retail: ${service.publicRetailPrice}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    <span className="text-emerald-600">${service.memberWholesalePrice}</span>
                    <span className="text-xs text-slate-500 font-normal"> /passenger</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedService(service);
                    setIsBooked(false);
                  }}
                  className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Book VIP Escort</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Intake Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                VIP Airport Fast-Track Reservation
              </div>
              <h3 className="text-xl font-black">{selectedService.airportName}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                {selectedService.city}, {selectedService.country} ({selectedService.airportCode})
              </p>
            </div>

            <div className="p-6 space-y-4">
              {isBooked ? (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">VIP Escort Dispatched!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>Dispatch ID: <strong>FT-DIAMOND-88294</strong></div>
                    <div>Flight: <strong>{flightNumber || 'LH442'} ({flightDate})</strong></div>
                    <div>Jet Bridge Greeter: <strong>Uniformed VIP Officer with Name Board: "{user?.displayName || 'Alex Harrison'}"</strong></div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                        Arrival / Departure Flight Number
                      </label>
                      <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        placeholder="e.g. BA178, LH442, EK201"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                        Flight Date
                      </label>
                      <input
                        type="date"
                        value={flightDate}
                        onChange={(e) => setFlightDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Public Fast-Track Price:</span>
                      <span className="line-through">${selectedService.publicRetailPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Rate:</span>
                      <span className="text-emerald-600 font-black text-base">
                        ${selectedService.memberWholesalePrice}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBooked(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Confirm VIP Fast-Track Pass (${selectedService.memberWholesalePrice})
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
