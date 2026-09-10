'use client';

import React, { useState } from 'react';
import { MOCK_VILLAS } from '@/lib/mockData';
import { LuxuryVillaEstate } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/context/PlatformContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Castle,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Search,
  Building2,
  Wine,
  Utensils,
  X,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';

export default function VillasPage() {
  const { user, isMember } = useAuth();
  const { features } = usePlatform();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVilla, setSelectedVilla] = useState<LuxuryVillaEstate | null>(null);
  const [nights, setNights] = useState<number>(3);
  const [isBooked, setIsBooked] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  if (!features.enableLuxuryVillas) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Castle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Luxury Villas Currently Offline</h2>
          <p className="text-xs text-slate-600">
            The platform administrator has currently scheduled villa updates. Please check back shortly or explore our 5-star wholesale hotels.
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800 transition-all"
          >
            <Building2 className="w-4 h-4" />
            <span>Browse Wholesale Hotels</span>
          </Link>
        </div>
      </div>
    );
  }

  const filteredVillas = MOCK_VILLAS.filter(
    (v) =>
      !searchTerm ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-400/30">
            <Castle className="w-3.5 h-3.5 text-amber-400" />
            Curated Ultra-Luxury Villas & Private Chalets
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Wholesale Private Estates with Chef & Butler
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            100% private wholesale estates in St. Barts, Courchevel 1850, Tuscany, and the Greek Islands with on-site private chefs, dedicated butlers, and infinity pools.
          </p>

          {/* Search Filter */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Destination or Country (e.g. St. Barts, Courchevel, Tuscany)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Villas Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredVillas.map((villa) => (
            <div
              key={villa.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={villa.images[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'}
                    alt={villa.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10">
                    🏰 {villa.propertyType}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                    SAVE {villa.savingsPercentage}%
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                      📍 {villa.destination}, {villa.country} ({villa.region})
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-xl mt-0.5">{villa.name}</h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>🛏️ {villa.bedrooms} Bedrooms</span>
                      <span>🚿 {villa.bathrooms} Baths</span>
                      <span>👥 {villa.maxGuests} Guests</span>
                    </div>
                  </div>

                  {/* Staff Included */}
                  <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1.5 text-xs">
                    <div className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-amber-700" />
                      <span>Dedicated On-Site Staff Included:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {villa.staffIncluded.map((staff, i) => (
                        <div key={i} className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{staff}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estate Amenities */}
                  <div className="space-y-1 pt-1 text-xs">
                    {villa.amenities.slice(0, 3).map((amenity, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 line-through">
                    Public Retail: {formatPrice(villa.publicPricePerNight)}/nt
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    <span className="text-emerald-600">{formatPrice(villa.memberPricePerNight)}</span>
                    <span className="text-xs text-slate-500 font-normal"> /night</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedVilla(villa);
                    setIsBooked(false);
                  }}
                  className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Castle className="w-4 h-4 text-amber-400" />
                  <span>Reserve Estate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Villa Reservation Modal */}
      {selectedVilla && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setSelectedVilla(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                Le Collectionist Luxury Estate
              </div>
              <h3 className="text-xl font-black">{selectedVilla.name}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                {selectedVilla.destination}, {selectedVilla.country}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {isBooked ? (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Private Villa Confirmed!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>Booking Ref: <strong>VILLA-COLLECTIONIST-9941</strong></div>
                    <div>Estate: <strong>{selectedVilla.name}</strong></div>
                    <div>Concierge Protocol: <strong>Private Chef menu preference intake dispatched via email</strong></div>
                  </div>
                  <button
                    onClick={() => setSelectedVilla(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-700 uppercase text-[10px]">
                        Length of Stay:
                      </label>
                      <span className="font-black text-slate-900">{nights} Nights</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="14"
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Public Retail Total:</span>
                      <span className="line-through">{formatPrice(selectedVilla.publicPricePerNight * nights)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Total ({nights} Nights):</span>
                      <span className="text-emerald-600 font-black text-base">
                        {formatPrice(selectedVilla.memberPricePerNight * nights)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold text-[11px]">
                      ✓ Includes private chef, dedicated butler, daily housekeeping & concierge.
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isMember) {
                        setIsAuthOpen(true);
                        return;
                      }
                      setIsBooked(true);
                    }}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {!isMember ? (
                      <>
                        <Lock className="w-4 h-4 text-slate-950" />
                        <span>Sign Up to Reserve Estate ({formatPrice(selectedVilla.memberPricePerNight * nights)})</span>
                      </>
                    ) : (
                      <>
                        <span className="font-black text-[#003087]">Pay</span>
                        <span className="font-black text-[#0079C1]">Pal</span>
                        <span className="font-bold text-slate-900">
                          • Confirm Villa Reservation ({formatPrice(selectedVilla.memberPricePerNight * nights)})
                        </span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Gate Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode="signup"
        customTitle="Join ATLAS to Reserve Private Estates"
        customSubtitle="Direct wholesale estate pricing with private chef & butler is exclusively cleared for ATLAS club members."
      />
    </div>
  );
}
