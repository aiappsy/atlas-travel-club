'use client';

import React, { useState } from 'react';
import { MOCK_YACHTS, MOCK_SUPERCARS } from '@/lib/mockData';
import { LuxuryYachtCharter, SupercarRental } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Compass,
  Anchor,
  Gauge,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  Wine,
  ShieldCheck,
  Search,
  X
} from 'lucide-react';

export default function YachtsAndSupercarsPage() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'yachts' | 'supercars'>('yachts');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeYachtModal, setActiveYachtModal] = useState<LuxuryYachtCharter | null>(null);
  const [activeSupercarModal, setActiveSupercarModal] = useState<SupercarRental | null>(null);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const filteredYachts = MOCK_YACHTS.filter(
    (y) =>
      !searchTerm ||
      y.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      y.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      y.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSupercars = MOCK_SUPERCARS.filter(
    (c) =>
      !searchTerm ||
      c.makeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-400/30">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Captained Yachts & Supercar Day Charters
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Wholesale Luxury Marine & Exotic Fleets
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Enjoy private captained luxury motor yachts with Seabobs & champagne, or drive track-ready Ferraris & Lamborghinis delivered straight to your hotel doorstep.
          </p>

          {/* Navigation Mode Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <button
              onClick={() => setActiveTab('yachts')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'yachts'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Anchor className="w-4 h-4" />
              <span>Luxury Yacht Charters ({MOCK_YACHTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('supercars')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'supercars'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>Exotic Supercars ({MOCK_SUPERCARS.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* YACHTS DIRECTORY */}
        {activeTab === 'yachts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredYachts.map((yacht) => (
              <div
                key={yacht.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={yacht.image}
                      alt={yacht.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10">
                      ⚓ {yacht.lengthFeet}ft • {yacht.builder}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                      SAVE 40%
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                        📍 {yacht.city} • {yacht.location}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-xl mt-0.5">{yacht.name}</h3>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                        <span>👥 Up to {yacht.maxGuests} Guests</span>
                        <span>🛏️ {yacht.staterooms} Staterooms</span>
                        <span>🧑‍✈️ {yacht.crewCount} Crew (Captain Included)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        VIP Charter Inclusions:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {yacht.amenities.map((amenity, i) => (
                          <div key={i} className="text-[11px] text-slate-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Public Day Charter: {formatPrice(yacht.fullDayRetailPrice)}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      <span className="text-emerald-600">{formatPrice(yacht.halfDayMemberPrice)}</span>
                      <span className="text-xs text-slate-500 font-normal"> /half-day</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveYachtModal(yacht);
                      setIsBooked(false);
                    }}
                    className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Anchor className="w-4 h-4 text-amber-400" />
                    <span>Charter Yacht</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUPERCARS DIRECTORY */}
        {activeTab === 'supercars' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredSupercars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.makeModel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10">
                      🏎️ {car.horsepower} HP • 0-60: {car.zeroToSixtyMph}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                      SAVE 42%
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                        📍 {car.city}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg mt-0.5">{car.makeModel}</h3>
                      <div className="text-xs text-slate-500 mt-1">
                        Delivery: <strong className="text-emerald-700">{car.location}</strong>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      {car.features.map((feat, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Public Daily: {formatPrice(car.dailyRetailPrice)}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      <span className="text-emerald-600">{formatPrice(car.dailyMemberPrice)}</span>
                      <span className="text-xs text-slate-500 font-normal"> /day</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSupercarModal(car);
                      setIsBooked(false);
                    }}
                    className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span>Reserve Car</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Yacht Charter Modal */}
      {activeYachtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActiveYachtModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                Captained Luxury Yacht Charter
              </div>
              <h3 className="text-xl font-black">{activeYachtModal.name}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                {activeYachtModal.city} • {activeYachtModal.location}
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {isBooked ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Yacht Charter Confirmed!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>Charter Pass: <strong>YACHT-BOATSETTER-9941</strong></div>
                    <div>Harbor Slip: <strong>{activeYachtModal.location}</strong></div>
                    <div>Captain Briefing: <strong>USCG Captain will text 1 hour prior to departure</strong></div>
                  </div>
                  <button
                    onClick={() => setActiveYachtModal(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Public Charter Price:</span>
                      <span className="line-through">{formatPrice(activeYachtModal.halfDayRetailPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Total (4-Hour Charter):</span>
                      <span className="text-emerald-600 font-black text-base">
                        {formatPrice(activeYachtModal.halfDayMemberPrice)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                      ✓ Includes USCG Captain, open bar, fuel, and Seabob water toys.
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBooked(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Confirm Yacht Charter ({formatPrice(activeYachtModal.halfDayMemberPrice)})
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Supercar Rental Modal */}
      {activeSupercarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActiveSupercarModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                Exotic Supercar Delivery
              </div>
              <h3 className="text-xl font-black">{activeSupercarModal.makeModel}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                {activeSupercarModal.city} • {activeSupercarModal.horsepower} Horsepower
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {isBooked ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Supercar Delivery Confirmed!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>Reservation ID: <strong>EXOTIC-BK-881924</strong></div>
                    <div>Delivery Protocol: <strong>Concierge Doorstep Hotel Drop-off Included</strong></div>
                  </div>
                  <button
                    onClick={() => setActiveSupercarModal(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Public Retail Daily:</span>
                      <span className="line-through">{formatPrice(activeSupercarModal.dailyRetailPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Total (1 Day):</span>
                      <span className="text-emerald-600 font-black text-base">
                        {formatPrice(activeSupercarModal.dailyMemberPrice)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                      ✓ Includes 100 miles/day, comprehensive insurance, and hotel curbside drop-off.
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBooked(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Lock Supercar Reservation ({formatPrice(activeSupercarModal.dailyMemberPrice)})
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
