'use client';

import React, { useState } from 'react';
import { MOCK_NOMAD_VISAS, MOCK_NOMAD_COLIVINGS } from '@/lib/mockData';
import { NomadVisaProgram, NomadColivingSpace } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/context/PlatformContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Globe,
  Wifi,
  Calendar,
  CheckCircle2,
  Search,
  Sparkles,
  Building2,
  Laptop,
  ShieldCheck,
  X,
  RefreshCw,
  Filter,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function NomadsPage() {
  const { features } = usePlatform();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'visas' | 'schengen_calculator' | 'coliving'>('visas');

  // Visa Search & Multi-Filters
  const [visaSearch, setVisaSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [incomeFilter, setIncomeFilter] = useState<string>('all');
  const [selectedVisa, setSelectedVisa] = useState<NomadVisaProgram | null>(null);
  const [isFilingSubmitted, setIsFilingSubmitted] = useState(false);

  // Schengen Calculator State
  const [schengenDaysSpent, setSchengenDaysSpent] = useState<number>(55);

  // Coliving State & Filter
  const [colivingSearch, setColivingSearch] = useState('');
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

  // Region Filter Options
  const regionOptions = [
    { id: 'all', label: 'All Countries (' + MOCK_NOMAD_VISAS.length + ')' },
    { id: 'schengen', label: '🇪🇺 Schengen Zone' },
    { id: 'zero_tax', label: '🏖️ 0% Tax Havens' },
    { id: 'asia_pacific', label: '🌏 Asia-Pacific' },
    { id: 'latin_america', label: '🌴 Latin America & Caribbean' },
    { id: 'europe_non_schengen', label: '🏰 Europe (Non-Schengen)' },
    { id: 'middle_east_africa', label: '🌍 Middle East & Africa' },
    { id: 'fast_track', label: '⚡ Fast-Track E-Visa' }
  ];

  // Quick Suggested Search Terms
  const quickSearches = [
    'Spain', 'Portugal', 'Japan', 'Thailand', 'Indonesia', 'Philippines', 'Davao',
    'Dubai', 'Costa Rica', 'Mexico', 'Italy', 'Greece', '0% Tax', 'Bansko', 'Medellin'
  ];

  // Filtered Visas with Smart Multi-field matching
  const filteredVisas = MOCK_NOMAD_VISAS.filter((v) => {
    // 1. Keyword search
    const query = visaSearch.trim().toLowerCase();
    if (query) {
      const matchCountry = v.country.toLowerCase().includes(query);
      const matchName = v.visaName.toLowerCase().includes(query);
      const matchCode = v.countryCode.toLowerCase() === query;
      const matchStatus = v.schengenStatus.toLowerCase().includes(query);
      const matchRegion = (v.region || '').toLowerCase().includes(query);
      const matchHubs = v.popularHubs.some((h) => h.toLowerCase().includes(query));
      const matchTax = v.taxRate.toLowerCase().includes(query);
      const matchReqs = v.keyRequirements.some((r) => r.toLowerCase().includes(query));

      if (
        !matchCountry &&
        !matchName &&
        !matchCode &&
        !matchStatus &&
        !matchRegion &&
        !matchHubs &&
        !matchTax &&
        !matchReqs
      ) {
        return false;
      }
    }

    // 2. Region Category Chip Filter
    if (selectedRegion === 'schengen' && !v.schengenStatus.includes('Full Schengen')) {
      return false;
    }
    if (selectedRegion === 'zero_tax' && !v.isZeroTax) {
      return false;
    }
    if (selectedRegion === 'asia_pacific' && v.region !== 'Asia-Pacific') {
      return false;
    }
    if (selectedRegion === 'latin_america' && v.region !== 'Latin America & Caribbean') {
      return false;
    }
    if (selectedRegion === 'europe_non_schengen' && v.schengenStatus !== 'Non-Schengen Europe') {
      return false;
    }
    if (selectedRegion === 'middle_east_africa' && v.region !== 'Middle East & Africa') {
      return false;
    }
    if (selectedRegion === 'fast_track' && !v.fastTrackFilingAvailable) {
      return false;
    }

    // 3. Income Threshold Filter
    const threshold = v.incomeThresholdUsd || 3000;
    if (incomeFilter === 'under_2000' && threshold > 2000) {
      return false;
    }
    if (incomeFilter === 'under_3500' && threshold > 3500) {
      return false;
    }
    if (incomeFilter === 'high_earner' && threshold < 5000) {
      return false;
    }

    return true;
  });

  // Filtered Coliving Spaces
  const filteredColivings = MOCK_NOMAD_COLIVINGS.filter((c) => {
    if (!colivingSearch) return true;
    const q = colivingSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.amenities.some((a) => a.toLowerCase().includes(q))
    );
  });

  const daysRemaining = Math.max(0, 90 - schengenDaysSpent);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-teal-950">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-500/30">
            <Laptop className="w-3.5 h-3.5 text-teal-400" />
            Global Digital Nomad & Remote Residency Intelligence
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Work From Anywhere: {MOCK_NOMAD_VISAS.length}+ Digital Nomad Visas & Wholesale Coliving
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Live verified income requirements, 0% tax residency rules, automated Schengen 90/180-day tracker, and monthly wholesale coliving estates across all 5 continents.
          </p>

          {/* Sub Navigation Bar */}
          <div className="pt-3 flex flex-wrap justify-center gap-2">
            {[
              { id: 'visas', label: '🛂 Digital Nomad Visas (' + MOCK_NOMAD_VISAS.length + '+ Countries)' },
              { id: 'schengen_calculator', label: '⏳ Schengen 90/180-Day Sentinel' },
              { id: 'coliving', label: '🏡 Monthly Coliving & Long-Stays (' + MOCK_NOMAD_COLIVINGS.length + ' Hubs)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={'py-2.5 px-5 rounded-2xl text-xs font-black transition-all cursor-pointer ' + (
                  activeTab === tab.id
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-white/10 text-white hover:bg-white/20'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: DIGITAL NOMAD VISA DIRECTORY */}
        {activeTab === 'visas' && (
          <div className="space-y-6">
            {/* Search & Multi-Filter Control Box */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Input */}
                <div className="md:col-span-8 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={visaSearch}
                    onChange={(e) => setVisaSearch(e.target.value)}
                    placeholder="Search by country, city, hub (e.g. Japan, Philippines, Tokyo, Davao, Bali, Spain, 0% Tax)..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {visaSearch && (
                    <button
                      onClick={() => setVisaSearch('')}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Income Filter Dropdown */}
                <div className="md:col-span-4 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 shrink-0 hidden sm:inline">
                    <Filter className="w-3.5 h-3.5 inline mr-1 text-teal-600" />
                    Income:
                  </span>
                  <select
                    value={incomeFilter}
                    onChange={(e) => setIncomeFilter(e.target.value)}
                    className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Any Monthly Income</option>
                    <option value="under_2000">Under $2,000 / mo (~Low Threshold)</option>
                    <option value="under_3500">Under $3,500 / mo (~Standard)</option>
                    <option value="high_earner">$5,000+ / mo (~High Earner / Tech)</option>
                  </select>
                </div>
              </div>

              {/* Region Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                <span className="text-[11px] font-black uppercase text-slate-400 shrink-0 mr-1">
                  Region:
                </span>
                {regionOptions.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedRegion(chip.id)}
                    className={'px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ' + (
                      selectedRegion === chip.id
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    )}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Quick Destination Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-[11px] font-bold text-slate-400 shrink-0">Popular Searches:</span>
                {quickSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setVisaSearch(item)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-600 border border-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Header Status */}
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-bold text-slate-500">
                Showing <strong className="text-slate-900 font-mono">{filteredVisas.length}</strong> of {MOCK_NOMAD_VISAS.length} Global Digital Nomad Visa Programs
              </div>
              {(visaSearch || selectedRegion !== 'all' || incomeFilter !== 'all') && (
                <button
                  onClick={() => {
                    setVisaSearch('');
                    setSelectedRegion('all');
                    setIncomeFilter('all');
                  }}
                  className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            {/* Empty Search Fallback */}
            {filteredVisas.length === 0 && (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 shadow-sm">
                <Globe className="w-12 h-12 text-teal-600 mx-auto opacity-75 animate-bounce" />
                <h3 className="text-xl font-black text-slate-900">
                  No Nomad Visas Found Matching "{visaSearch}"
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We cover 38+ countries worldwide. Try searching for "Japan", "Philippines", "Spain", "Portugal", "Thailand", "Bali", "0% Tax", or clear your filters to view all countries.
                </p>
                <button
                  onClick={() => {
                    setVisaSearch('');
                    setSelectedRegion('all');
                    setIncomeFilter('all');
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                >
                  View All 38+ Nomad Visas
                </button>
              </div>
            )}

            {/* Visa Program Grid Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {filteredVisas.map((visa) => (
                <div
                  key={visa.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{visa.flagEmoji}</span>
                          <span className="text-xs font-black uppercase text-teal-600 tracking-wider">
                            {visa.schengenStatus}
                          </span>
                          {visa.isZeroTax && (
                            <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              0% Tax Haven
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-xl text-slate-900 mt-1.5 group-hover:text-teal-700 transition-colors">
                          {visa.visaName}
                        </h3>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">
                          {visa.country} ({visa.countryCode}) • {visa.region}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Gov Fee</span>
                        <span className="font-mono text-base font-black text-slate-900">
                          {visa.cost === 0 ? 'Free' : formatPrice(visa.cost)}
                        </span>
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
                        <span className="font-bold text-emerald-900 text-[11px] truncate block" title={visa.taxRate}>
                          {visa.taxRate}
                        </span>
                      </div>
                    </div>

                    {/* Key Requirements */}
                    <div className="space-y-1.5 pt-1 text-xs">
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
                        <button
                          key={i}
                          type="button"
                          onClick={() => setVisaSearch(hub)}
                          className="text-[10px] font-bold bg-slate-100 hover:bg-teal-100 hover:text-teal-800 text-slate-700 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                        >
                          📍 {hub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      Processing: <strong>{visa.processingTime}</strong>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedVisa(visa);
                        setIsFilingSubmitted(false);
                      }}
                      className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Start Concierge Filing</span>
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
                    Non-EU citizens can stay in the Schengen Area for up to 90 days in any rolling 180-day window.
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
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>0 Days (Clean Slate)</span>
                    <span>45 Days (Halfway)</span>
                    <span>90 Days (Maximum Limit)</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Schengen Rolling Status:</div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] uppercase text-slate-400 block font-bold">Days Used</span>
                      <span className="font-mono text-xl font-black text-slate-900">{schengenDaysSpent} / 90</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] uppercase text-emerald-800 block font-bold">Days Remaining</span>
                      <span className="font-mono text-xl font-black text-emerald-600">{daysRemaining} Days</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Escape Destinations */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-black uppercase text-slate-500">
                    Recommended Non-Schengen Nomad Havens to Reset Your Clock:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { country: 'Bulgaria (Bansko)', flag: '🇧🇬', note: '10% Flat Tax' },
                      { country: 'Montenegro (Kotor)', flag: '🇲🇪', note: 'Bay of Kotor' },
                      { country: 'Albania (Tirana)', flag: '🇦🇱', note: '1-Yr 0% Tax' },
                      { country: 'Cyprus (Limassol)', flag: '🇨🇾', note: '60-Day Non-Dom' },
                      { country: 'Georgia (Tbilisi)', flag: '🇬🇪', note: '365-Day Visa-Free' },
                      { country: 'Dubai (UAE)', flag: '🇦🇪', note: '0% Tax E-Visa' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{item.flag}</span>
                          <span className="truncate">{item.country}</span>
                        </div>
                        <div className="text-[10px] text-teal-600 font-semibold">{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Schengen Advisory Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-indigo-800 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase border border-indigo-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Automated Border Sentinel
                </div>
                <h4 className="text-xl font-black">
                  Need More Than 90 Days in Europe?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Avoid border fines or Schengen entry bans. You can obtain a 1-to-3 Year Digital Nomad Visa for Spain, Portugal, Italy, Greece, Croatia, or Malta to live and work in the EU full-time with 0% to low flat tax rates.
                </p>

                <div className="space-y-2 text-xs text-slate-200 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Spain Digital Nomad Visa: 3 Years Full EU Rights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Portugal D8 Visa: 2 Years Renewable Stay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Malta Nomad Permit: 1 Year 0% Local Tax</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTab('visas');
                  setSelectedRegion('schengen');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Schengen Nomad Visas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MONTHLY WHOLESALE COLIVING & HUBS */}
        {activeTab === 'coliving' && (
          <div className="space-y-6">
            {/* Coliving Search */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={colivingSearch}
                  onChange={(e) => setColivingSearch(e.target.value)}
                  placeholder="Search coliving hubs by city, country, or workspace (e.g. Lisbon, Bali, Tokyo, Chiang Mai, Bansko, Medellin)..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="text-xs font-bold text-slate-500 shrink-0">
                {filteredColivings.length} Wholesale Spaces Available
              </div>
            </div>

            {/* Coliving Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColivings.map((coliving) => (
                <div
                  key={coliving.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={coliving.image}
                        alt={coliving.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-teal-500/30">
                        <Wifi className="w-3 h-3 text-teal-400" />
                        <span>{coliving.wifiSpeedMbps} Mbps Fiber</span>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        Save {coliving.savingsPercentage}%
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                          📍 {coliving.city}, {coliving.country}
                        </span>
                        <h4 className="text-base font-black text-slate-900 mt-0.5">{coliving.name}</h4>
                        <div className="text-xs text-slate-500">{coliving.roomType}</div>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 pt-1">
                        {coliving.amenities.slice(0, 3).map((amenity, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Booking Footer */}
                  <div className="p-5 pt-0">
                    <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 line-through">
                          Public: {formatPrice(coliving.monthlyPublicRate)}/mo
                        </div>
                        <div className="text-lg font-black text-teal-400 font-mono">
                          {formatPrice(coliving.monthlyMemberRate)}
                          <span className="text-xs text-slate-400 font-normal font-sans"> / mo</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedColiving(coliving);
                          setIsColivingBooked(false);
                          setColivingMonths(1);
                        }}
                        className="py-2 px-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-black shadow transition-all cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: VISA APPLICATION CONCIERGE MODAL */}
      {selectedVisa && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 my-8">
            <button
              onClick={() => setSelectedVisa(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedVisa.flagEmoji}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-teal-600">
                    {selectedVisa.schengenStatus} Concierge
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{selectedVisa.visaName}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Official legal concierge filing service for remote workers, freelancers, and entrepreneurs.
              </p>
            </div>

            {isFilingSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-emerald-950">Concierge Docket Assigned!</h4>
                <p className="text-xs text-emerald-800">
                  Your application file for <strong>{selectedVisa.country}</strong> has been routed to our licensed immigration legal team. Check your email for your pre-vetted document upload link.
                </p>
                <button
                  onClick={() => setSelectedVisa(null)}
                  className="py-2.5 px-6 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close & View Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Min Income</span>
                    <span className="font-bold text-slate-800">{selectedVisa.minMonthlyIncome}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Processing SLA</span>
                    <span className="font-bold text-teal-700">{selectedVisa.processingTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Required Documentation Checklist:</span>
                  {selectedVisa.keyRequirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-1">
                  <div className="font-bold text-teal-950 flex items-center justify-between">
                    <span>ATLAS VIP Member Concierge Fee:</span>
                    <span className="font-mono font-black text-teal-700">0% Surcharge Included</span>
                  </div>
                  <p className="text-[11px] text-teal-800">
                    Includes sworn translation reviews, Hague Apostille audit, and local tax residency registration.
                  </p>
                </div>

                <button
                  onClick={() => setIsFilingSubmitted(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Confirm & Submit Legal Concierge File
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: COLIVING RESERVATION MODAL */}
      {selectedColiving && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 my-8">
            <button
              onClick={() => setSelectedColiving(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-teal-600 tracking-wider">
                Wholesale Monthly Reservation
              </span>
              <h3 className="text-xl font-black text-slate-900">{selectedColiving.name}</h3>
              <p className="text-xs text-slate-500">
                📍 {selectedColiving.city}, {selectedColiving.country} • {selectedColiving.wifiSpeedMbps} Mbps Fiber
              </p>
            </div>

            {isColivingBooked ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-emerald-950">Wholesale Coliving Confirmed!</h4>
                <p className="text-xs text-emerald-800">
                  Your {colivingMonths}-month stay at {selectedColiving.name} has been confirmed at 0% markup.
                </p>
                <button
                  onClick={() => setSelectedColiving(null)}
                  className="py-2.5 px-6 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Duration of Stay (Months):
                  </label>
                  <select
                    value={colivingMonths}
                    onChange={(e) => setColivingMonths(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value={1}>1 Month (Flexible Remote Work)</option>
                    <option value={2}>2 Months (Extended Workation)</option>
                    <option value={3}>3 Months (Full Season - 90 Days)</option>
                    <option value={6}>6 Months (Long-Term Residency Rate)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Wholesale Rate ({formatPrice(selectedColiving.monthlyMemberRate)} × {colivingMonths} mo)</span>
                    <span className="font-mono text-white font-bold">{formatPrice(selectedColiving.monthlyMemberRate * colivingMonths)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Public Retail Value ({formatPrice(selectedColiving.monthlyPublicRate)} × {colivingMonths} mo)</span>
                    <span className="font-mono line-through text-slate-400">{formatPrice(selectedColiving.monthlyPublicRate * colivingMonths)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-2 text-sm">
                    <span>Your Total Savings:</span>
                    <span className="font-mono">
                      {formatPrice((selectedColiving.monthlyPublicRate - selectedColiving.monthlyMemberRate) * colivingMonths)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsColivingBooked(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Reserve Wholesale Coliving ({formatPrice(selectedColiving.monthlyMemberRate * colivingMonths)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
