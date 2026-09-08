'use client';

import React, { useState } from 'react';
import { MOCK_NOMAD_VISAS, MOCK_NOMAD_COLIVINGS } from '@/lib/mockData';
import { NomadVisaProgram, NomadColivingSpace } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/context/PlatformContext';
import {
  Globe,
  Compass,
  Wifi,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Search,
  Sparkles,
  Building2,
  Laptop,
  Coins,
  ShieldCheck,
  Scale,
  CreditCard,
  X,
  ExternalLink,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function NomadsPage() {
  const { user } = useAuth();
  const { features } = usePlatform();
  const [activeTab, setActiveTab] = useState<'visas' | 'schengen_calculator' | 'coliving'>('visas');

  // Visa Search & Filter
  const [visaSearch, setVisaSearch] = useState('');
  const [selectedVisa, setSelectedVisa] = useState<NomadVisaProgram | null>(null);
  const [isFilingSubmitted, setIsFilingSubmitted] = useState(false);

  // Schengen Calculator State
  const [schengenDaysSpent, setSchengenDaysSpent] = useState<number>(55);

  // Coliving Booking State
  const [selectedColiving, setSelectedColiving] = useState<NomadColivingSpace | null>(null);
  const [colivingMonths, setColivingMonths] = useState<number>(1);
  const [isColivingBooked, setIsColivingBooked] = useState(false);

  if (!features.enableNomadHub) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Nomad Hub Temporarily Offline</h2>
          <p className="text-xs text-slate-600">
            The platform administrator is updating digital nomad visa feeds. Please check back shortly.
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

  const filteredVisas = MOCK_NOMAD_VISAS.filter(
    (v) =>
      !visaSearch ||
      v.country.toLowerCase().includes(visaSearch.toLowerCase()) ||
      v.visaName.toLowerCase().includes(visaSearch.toLowerCase()) ||
      v.schengenStatus.toLowerCase().includes(visaSearch.toLowerCase())
  );

  const daysRemaining = Math.max(0, 90 - schengenDaysSpent);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-teal-950">
        <div className="max-w-7xl mx-auto text-center max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-500/30">
            <Laptop className="w-3.5 h-3.5 text-teal-400" />
            Digital Nomad & Global Visa Intelligence Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Work From Anywhere: Visas, Schengen Sentinel & Monthly Coliving
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Live digital nomad visa rules, income requirements, 0% tax residency guides, automated Schengen 90-day tracking, and wholesale monthly coliving spaces.
          </p>

          {/* Sub Navigation Bar */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {[
              { id: 'visas', label: '🛂 Digital Nomad Visas (15+ Countries)' },
              { id: 'schengen_calculator', label: '⏳ Schengen 90/180-Day Sentinel' },
              { id: 'coliving', label: '🏡 Monthly Coliving & Long-Stays' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-5 rounded-2xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* TAB 1: DIGITAL NOMAD VISA DIRECTORY */}
        {activeTab === 'visas' && (
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={visaSearch}
                onChange={(e) => setVisaSearch(e.target.value)}
                placeholder="Search by country or region (e.g. Spain, Portugal, Dubai, Thailand, Bali)..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredVisas.map((visa) => (
                <div
                  key={visa.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{visa.flagEmoji}</span>
                          <span className="text-xs font-black uppercase text-teal-600 tracking-wider">
                            {visa.schengenStatus}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-xl text-slate-900 mt-1">
                          {visa.visaName}
                        </h3>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Gov Fee</span>
                        <span className="font-mono text-base font-black text-slate-900">${visa.cost}</span>
                      </div>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Min Income</span>
                        <span className="font-bold text-slate-800 text-[11px]">{visa.minMonthlyIncome}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Validity</span>
                        <span className="font-bold text-slate-800 text-[11px]">{visa.durationStay}</span>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 col-span-2 sm:col-span-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block">Tax Perk</span>
                        <span className="font-bold text-emerald-900 text-[11px]">{visa.taxRate}</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2 pt-1 text-xs">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                        Key Eligibility & Documentation:
                      </span>
                      {visa.keyRequirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-600 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Popular Hubs */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                      <span className="text-[10px] font-bold text-slate-400">Popular Nomad Hubs:</span>
                      {visa.popularHubs.map((hub, i) => (
                        <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          📍 {hub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      Processing: <strong>{visa.processingTime}</strong>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedVisa(visa);
                        setIsFilingSubmitted(false);
                      }}
                      className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Start Application Concierge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SCHENGEN 90/180-DAY CALCULATOR */}
        {activeTab === 'schengen_calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Schengen 90/180-Day Automated Tracker</h3>
                  <p className="text-xs text-slate-500">
                    Non-EU citizens can only stay in the Schengen Area for 90 days out of any rolling 180-day period.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-2">
                    <span>Days Spent in Schengen (Last 180 Days):</span>
                    <span className="font-mono font-black text-sm text-indigo-600">{schengenDaysSpent} Days</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={schengenDaysSpent}
                    onChange={(e) => setSchengenDaysSpent(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-teal-50 to-emerald-50 border border-indigo-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase text-indigo-900 tracking-wider">
                      Legal Schengen Days Remaining:
                    </div>
                    <div className="text-4xl font-black text-indigo-700 font-mono mt-1">
                      {daysRemaining} Days
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase ${
                      daysRemaining < 15 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {daysRemaining < 15 ? '⚠️ Visa Run Recommended' : '✓ In Safe Zone'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Non-Schengen Visa Run Destinations */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                Recommended Non-Schengen Havens
              </h4>
              <p className="text-xs text-slate-500">
                Reset your Schengen clock by staying in nearby European non-Schengen destinations:
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { country: 'United Kingdom (London)', stay: '6 Months Visa-Free', perk: 'World Financial & Coworking Hub' },
                  { country: 'Cyprus (Larnaca & Paphos)', stay: '90 Days Non-Schengen', perk: 'Mediterranean Beach & Tech Hub' },
                  { country: 'Albania (Tirana & Sarandë)', stay: '1 Year Visa-Free for US Citizens', perk: 'Super Affordable & Mountain/Beach' },
                  { country: 'Montenegro (Kotor)', stay: '90 Days Non-Schengen', perk: 'Adriatic Fjord Lifestyle' },
                  { country: 'Morocco (Taghazout & Marrakesh)', stay: '90 Days Visa-Free', perk: 'Surf & Coworking Hubs' },
                ].map((haven, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">{haven.country}</div>
                      <div className="text-[10px] text-slate-500">{haven.perk}</div>
                    </div>
                    <span className="text-[10px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {haven.stay}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LONG-STAY COLIVING & MONTHLY SPACES */}
        {activeTab === 'coliving' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_NOMAD_COLIVINGS.map((coliving) => (
              <div
                key={coliving.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={coliving.image}
                      alt={coliving.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow border border-white/10 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-teal-400" />
                      <span>{coliving.wifiSpeedMbps} Mbps Fiber Wi-Fi</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                      SAVE {coliving.savingsPercentage}%
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-teal-600 tracking-wider">
                        📍 {coliving.city}, {coliving.country}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-xl mt-0.5">{coliving.name}</h3>
                      <div className="text-xs text-slate-500 mt-1 font-semibold">
                        🛏️ {coliving.roomType} • All Utilities & High-Speed Internet Included
                      </div>
                    </div>

                    <div className="space-y-1 pt-1 text-xs">
                      {coliving.amenities.map((amenity, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Public Monthly: ${coliving.monthlyPublicRate}/mo
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      <span className="text-teal-600">${coliving.monthlyMemberRate}</span>
                      <span className="text-xs text-slate-500 font-normal"> /month</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedColiving(coliving);
                      setIsColivingBooked(false);
                    }}
                    className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Laptop className="w-4 h-4 text-teal-400" />
                    <span>Reserve Monthly Stay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visa Application Filing Modal */}
      {selectedVisa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-6 text-white text-center relative">
              <button
                onClick={() => setSelectedVisa(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-3xl">{selectedVisa.flagEmoji}</span>
              <h3 className="text-xl font-black mt-1">{selectedVisa.visaName}</h3>
              <p className="text-xs text-teal-300 mt-0.5">
                Sherpa & iVisa Embassy Fast-Track Filing
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {isFilingSubmitted ? (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Visa Intake File Dispatched!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-slate-700 space-y-1 text-left">
                    <div>Filing Reference: <strong>VISA-SHERPA-9941</strong></div>
                    <div>Destination: <strong>{selectedVisa.country}</strong></div>
                    <div>Concierge Status: <strong>Document Checklist & Apostille Guide dispatched to your email</strong></div>
                  </div>
                  <button
                    onClick={() => setSelectedVisa(null)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Government Visa Fee:</span>
                      <span className="font-mono font-bold text-slate-900">${selectedVisa.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">HotelsClub Filing Concierge:</span>
                      <span className="font-bold text-emerald-600">FREE (Nomad Member Perk)</span>
                    </div>
                    <div className="flex justify-between font-black text-sm pt-2 border-t border-slate-200">
                      <span>Total Payout:</span>
                      <span className="font-mono text-teal-600">${selectedVisa.cost}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilingSubmitted(true)}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Submit Remote Worker Visa Intake (${selectedVisa.cost})</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Coliving Monthly Booking Modal */}
      {selectedColiving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-6 text-white text-center relative">
              <button
                onClick={() => setSelectedColiving(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-black">{selectedColiving.name}</h3>
              <p className="text-xs text-teal-300 mt-0.5">
                {selectedColiving.city}, {selectedColiving.country}
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {isColivingBooked ? (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Monthly Coliving Reserved!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-slate-700 space-y-1 text-left">
                    <div>Booking Ref: <strong>COLIVING-OUTSITE-8821</strong></div>
                    <div>High-Speed Wi-Fi: <strong>{selectedColiving.wifiSpeedMbps} Mbps Fiber Dedicated</strong></div>
                  </div>
                  <button
                    onClick={() => setSelectedColiving(null)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold">
                      <label className="text-slate-700 uppercase text-[10px]">Stay Duration:</label>
                      <span className="text-slate-900">{colivingMonths} Month(s)</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={colivingMonths}
                      onChange={(e) => setColivingMonths(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-left">
                    <div className="flex justify-between text-slate-400">
                      <span>Public Rate:</span>
                      <span className="line-through">${(selectedColiving.monthlyPublicRate * colivingMonths).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-black text-slate-900 text-sm">
                      <span>Wholesale Member Total:</span>
                      <span className="text-teal-600 text-base">${(selectedColiving.monthlyMemberRate * colivingMonths).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsColivingBooked(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Confirm Monthly Coliving (${(selectedColiving.monthlyMemberRate * colivingMonths).toLocaleString()})
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
