'use client';

import React, { useState } from 'react';
import { MOCK_LOUNGES } from '@/lib/mockData';
import { AirportLounge } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Plane,
  Search,
  Sparkles,
  TrendingDown,
  QrCode,
  Coffee,
  Wifi,
  Utensils,
  CheckCircle2,
  Clock,
  MapPin,
  X,
  CreditCard
} from 'lucide-react';

export default function LoungesPage() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLoungeModal, setActiveLoungeModal] = useState<AirportLounge | null>(null);
  const [passClaimed, setPassClaimed] = useState(false);

  const filteredLounges = MOCK_LOUNGES.filter(
    (l) =>
      !searchTerm ||
      l.airportCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.airportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.loungeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5" />
            1,400+ Global Airport VIP Lounges
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Relax in Luxury Before Every Flight
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Enjoy complimentary chef-prepared buffet dining, premium open bars, private shower suites, and high-speed Wi-Fi for just <strong>$32 / visit</strong> (vs. $65+ walk-in rates).
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search airport code or city (e.g. JFK, LHR, DXB, LAX)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Lounges Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLounges.map((lounge) => (
            <div
              key={lounge.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={lounge.image}
                    alt={lounge.loungeName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-300 font-black text-sm px-3 py-1 rounded-full shadow flex items-center gap-1.5 font-mono">
                    ✈️ {lounge.airportCode}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                    SAVE 50%
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                    {lounge.airportName} • {lounge.terminal}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-1">
                    {lounge.loungeName}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{lounge.operatingHours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    <span>{lounge.locationDetails}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Amenities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lounge.amenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 line-through">
                    Walk-In Door Rate: {formatPrice(lounge.walkInPrice)}
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    <span className="text-emerald-600 font-extrabold">{formatPrice(lounge.memberPassPrice)}</span>
                    <span className="text-xs text-slate-500 font-normal"> /pass</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveLoungeModal(lounge);
                    setPassClaimed(false);
                  }}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  Generate VIP Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lounge QR Pass Modal */}
      {activeLoungeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActiveLoungeModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                VIP Airport Lounge Access
              </div>
              <h3 className="text-xl font-black">{activeLoungeModal.loungeName}</h3>
              <p className="text-xs text-sky-200 mt-0.5">
                {activeLoungeModal.airportCode} • {activeLoungeModal.terminal}
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {passClaimed ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-40 h-40 mx-auto bg-slate-900 p-3 rounded-2xl flex items-center justify-center">
                    <svg className="w-32 h-32 text-white" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="10" y="10" width="25" height="25" fill="#fff" />
                      <rect x="15" y="15" width="15" height="15" fill="#000" />
                      <rect x="65" y="10" width="25" height="25" fill="#fff" />
                      <rect x="70" y="15" width="15" height="15" fill="#000" />
                      <rect x="10" y="65" width="25" height="25" fill="#fff" />
                      <rect x="15" y="70" width="15" height="15" fill="#000" />
                      <rect x="40" y="20" width="20" height="20" fill="#fff" />
                      <rect x="45" y="55" width="10" height="30" fill="#fff" />
                      <rect x="65" y="65" width="25" height="25" fill="#fff" />
                    </svg>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900">
                    PASS-LOUNGE-{user?.memberId || 'HC-9824'}-ACTIVE
                  </div>
                  <p className="text-xs text-slate-500">
                    Scan this digital barcode at the lounge reception desk for immediate entry.
                  </p>
                  <button
                    onClick={() => setActiveLoungeModal(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Standard Door Entry:</span>
                      <span className="line-through">{formatPrice(activeLoungeModal.walkInPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Member Discount Pass:</span>
                      <span className="text-emerald-600 font-black text-sm">{formatPrice(activeLoungeModal.memberPassPrice)}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                      ✓ Includes unlimited gourmet buffet, premium drinks, showers & Wi-Fi.
                    </div>
                  </div>

                  <button
                    onClick={() => setPassClaimed(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-4 h-4 text-amber-300" />
                    <span>Unlock Lounge Pass ({formatPrice(activeLoungeModal.memberPassPrice)} via Member Pass)</span>
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
