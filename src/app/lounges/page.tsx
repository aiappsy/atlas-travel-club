'use client';

import React, { useState } from 'react';
import { MOCK_LOUNGES } from '@/lib/mockData';
import { AirportLounge } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  QrCode,
  Coffee,
  Clock,
  MapPin,
  X,
} from 'lucide-react';

export default function LoungesPage() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const { t, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeLoungeModal, setActiveLoungeModal] = useState<AirportLounge | null>(null);
  const [passClaimed, setPassClaimed] = useState(false);

  const REGIONS = [
    { key: 'All', label: t.lounges.allRegions },
    { key: 'Europe', label: locale === 'no' ? 'Europa' : 'Europe' },
    { key: 'Middle East', label: locale === 'no' ? 'Midtøsten' : 'Middle East' },
    { key: 'Asia Pacific', label: locale === 'no' ? 'Asia-Stillehavet' : 'Asia Pacific' },
    { key: 'Americas', label: locale === 'no' ? 'Amerika' : 'Americas' },
  ];

  const filteredLounges = MOCK_LOUNGES.filter((l) => {
    const matchesSearch =
      !searchTerm ||
      l.airportCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.airportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.loungeName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || l.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Light Clean Header */}
      <div className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Coffee className="w-3.5 h-3.5 text-amber-600" />
            {t.lounges.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.lounges.heroTitle}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.lounges.heroSubtitle}
          </p>

          {/* Search bar & Region Filters */}
          <div className="pt-4 max-w-2xl mx-auto space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.lounges.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-semibold text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {/* Region Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {REGIONS.map((region) => (
                <button
                  key={region.key}
                  onClick={() => setSelectedRegion(region.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedRegion === region.key
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lounges Responsive 3-Column Luxury Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLounges.map((lounge) => {
            const savingsAmount = lounge.walkInPrice - lounge.memberPassPrice;
            const savingsPercent = Math.round((savingsAmount / lounge.walkInPrice) * 100);

            return (
              <div
                key={lounge.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container with fixed elegant proportions */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={lounge.image}
                      alt={lounge.loungeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Airport Badge */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 font-mono font-black text-xs px-3 py-1 rounded-full shadow flex items-center gap-1.5 border border-white/10">
                      <span>✈️</span>
                      <span>{lounge.airportCode}</span>
                    </div>

                    {/* Savings Badge */}
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-md">
                      {locale === 'no' ? `SPAR ${savingsPercent}%` : `SAVE ${savingsPercent}%`}
                    </div>

                    {/* City & Country caption on photo */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        {lounge.city}, {lounge.country}
                      </div>
                      <div className="text-xs text-slate-200 truncate">
                        {lounge.terminal}
                      </div>
                    </div>
                  </div>

                  {/* Lounge Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-amber-800 transition-colors">
                      {lounge.loungeName}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{lounge.operatingHours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{lounge.locationDetails}</span>
                      </div>
                    </div>

                    {/* Amenities pills */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {t.lounges.includedAmenities}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {lounge.amenities.slice(0, 4).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                        {lounge.amenities.length > 4 && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                            +{lounge.amenities.length - 4} {locale === 'no' ? 'flere' : 'more'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div>
                    <div className="text-[11px] text-slate-400 line-through">
                      {t.lounges.walkInRate} {formatPrice(lounge.walkInPrice)}
                    </div>
                    <div className="text-xl font-black text-slate-900 font-mono">
                      <span className="text-emerald-600">{formatPrice(lounge.memberPassPrice)}</span>
                      <span className="text-xs text-slate-500 font-sans font-normal">{t.lounges.perPass}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveLoungeModal(lounge);
                      setPassClaimed(false);
                    }}
                    className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.lounges.getPassBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lounge QR Pass Modal */}
      {activeLoungeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-950 p-6 text-white text-center relative border-b border-slate-800">
              <button
                onClick={() => setActiveLoungeModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase mb-2">
                {locale === 'no' ? 'VIP Flyplasslounge Adgang' : 'VIP Airport Lounge Access'}
              </div>
              <h3 className="text-lg font-black text-white">{activeLoungeModal.loungeName}</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeLoungeModal.airportName} ({activeLoungeModal.airportCode})
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {passClaimed ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border-2 border-slate-900 flex items-center justify-center shadow-md">
                    <svg className="w-36 h-36 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="10" y="10" width="25" height="25" fill="#000" />
                      <rect x="15" y="15" width="15" height="15" fill="#fff" />
                      <rect x="18" y="18" width="9" height="9" fill="#000" />
                      <rect x="65" y="10" width="25" height="25" fill="#000" />
                      <rect x="70" y="15" width="15" height="15" fill="#fff" />
                      <rect x="73" y="18" width="9" height="9" fill="#000" />
                      <rect x="10" y="65" width="25" height="25" fill="#000" />
                      <rect x="15" y="70" width="15" height="15" fill="#fff" />
                      <rect x="18" y="73" width="9" height="9" fill="#000" />
                      <rect x="42" y="20" width="16" height="16" fill="#000" />
                      <rect x="45" y="45" width="10" height="25" fill="#000" />
                      <rect x="65" y="65" width="25" height="25" fill="#000" />
                    </svg>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900">
                    PASS-{activeLoungeModal.airportCode}-{user?.memberId || 'HC-9824'}-VIP
                  </div>
                  <p className="text-xs text-slate-500">
                    {t.lounges.scanInstructions}
                  </p>
                  <button
                    onClick={() => setActiveLoungeModal(null)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    {t.lounges.doneBtn}
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.lounges.walkInRate}</span>
                      <span className="line-through text-slate-400 font-mono">{formatPrice(activeLoungeModal.walkInPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{t.lounges.memberRate}</span>
                      <span className="text-emerald-600 font-black text-base font-mono">
                        {formatPrice(activeLoungeModal.memberPassPrice)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-800 font-semibold text-[11px]">
                      {locale === 'no'
                        ? '✓ Inkluderer ubegrenset gourmetbuffé, champagne/drikke, private dusjer & lynraskt Wi-Fi.'
                        : '✓ Includes unlimited gourmet buffet, premium champagne/drinks, private showers & high-speed Wi-Fi.'}
                    </div>
                  </div>

                  <button
                    onClick={() => setPassClaimed(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01]"
                  >
                    <QrCode className="w-4 h-4 text-slate-950" />
                    <span>{t.lounges.generatePassBtn}</span>
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
