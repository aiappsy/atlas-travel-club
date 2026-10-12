'use client';

import React, { useState } from 'react';
import { MOCK_ESIM_PACKAGES } from '@/lib/mockData';
import { EsimPackage } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Wifi,
  Smartphone,
  Globe,
  Search,
  Sparkles,
  TrendingDown,
  QrCode,
  CheckCircle2,
  Lock,
  X,
  CreditCard,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function EsimPage() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activePackageModal, setActivePackageModal] = useState<EsimPackage | null>(null);
  const [installedQr, setInstalledQr] = useState(false);

  const regions = locale === 'no'
    ? [
        { key: 'All', label: 'Alle Regioner' },
        { key: 'Americas', label: 'Amerika' },
        { key: 'Europe', label: 'Europa' },
        { key: 'Asia-Pacific', label: 'Asia-Stillehavet' },
        { key: 'Global (140+ Countries)', label: 'Global (140+ land)' }
      ]
    : [
        { key: 'All', label: 'All' },
        { key: 'Americas', label: 'Americas' },
        { key: 'Europe', label: 'Europe' },
        { key: 'Asia-Pacific', label: 'Asia-Pacific' },
        { key: 'Global (140+ Countries)', label: 'Global (140+ Countries)' }
      ];

  const filteredPackages = MOCK_ESIM_PACKAGES.filter((pkg) => {
    const matchRegion = selectedRegion === 'All' || pkg.region === selectedRegion;
    const matchSearch =
      !searchTerm ||
      pkg.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.countryCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Wifi className="w-3.5 h-3.5" />
            {locale === 'no' ? '190+ Land Reisedata Uten Fysisk SIM' : '190+ Countries SIM-Less Travel Data'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {locale === 'no' ? 'Høyhastighets 5G Global Reisetilgang (eSIM)' : 'High-Speed 5G Global Travel eSIM'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {locale === 'no'
              ? 'Aldri betal dyre roamingkostnader på ferie igjen. Umiddelbar aktivering via QR-kode på iPhone eller Android før avreise.'
              : 'Never pay expensive $10/day international roaming fees again. Instant digital QR activation on your iPhone or Android device before you take off.'}
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === 'no' ? 'Søk etter destinasjonsland (f.eks. USA, Spania, Japan, Thailand)...' : 'Search destination country (e.g. United States, Europe, Japan, Mexico)...'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Main Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Region Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((reg) => (
            <button
              key={reg.key}
              onClick={() => setSelectedRegion(reg.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                selectedRegion === reg.key
                  ? 'bg-sky-600 text-white shadow-sky-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pkg.flagEmoji}</span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{pkg.countryName}</h3>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{pkg.networkSpeed}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase">
                    {pkg.dataAmount}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 mb-6 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>{locale === 'no' ? 'Gyldighetsperiode:' : 'Validity Period:'}</span>
                    <span className="font-bold text-slate-900">{pkg.validityDays} {locale === 'no' ? 'dager' : 'Days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'no' ? 'Telenett:' : 'Supported Networks:'}</span>
                    <span className="font-bold text-slate-900">{pkg.carrierPartners}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{locale === 'no' ? 'Deling / Hotspot:' : 'Personal Hotspot:'}</span>
                    <span className="text-emerald-600 font-bold">{locale === 'no' ? 'Tillatt' : 'Enabled'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">
                    {locale === 'no' ? 'Medlemspris' : 'Member Rate'}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    <span className="text-emerald-600">${pkg.memberWholesalePrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActivePackageModal(pkg);
                    setInstalledQr(false);
                  }}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>{locale === 'no' ? 'Aktiver eSIM' : 'Activate eSIM'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activation Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActivePackageModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-4xl mb-2">{activePackageModal.flagEmoji}</div>
              <h3 className="text-xl font-black">{activePackageModal.countryName} eSIM</h3>
              <p className="text-xs text-sky-200 mt-0.5">
                {activePackageModal.dataAmount} • {activePackageModal.validityDays} {locale === 'no' ? 'dagers gyldighet' : 'Days Validity'}
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {installedQr ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LPA:1$smdp.io$${activePackageModal.id}-ATLAS`}
                      alt="eSIM QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-slate-600">
                    {locale === 'no'
                      ? 'Skann koden med telefonens kamera i Innstillinger ➔ Mobilnett ➔ Legg til eSIM'
                      : 'Scan this code with your phone camera in Settings ➔ Cellular ➔ Add eSIM'}
                  </div>
                  <button
                    onClick={() => setActivePackageModal(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    {locale === 'no' ? 'Ferdig' : 'Done'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>{locale === 'no' ? 'Pakke:' : 'Package:'}</span>
                      <span className="font-bold text-slate-900">{activePackageModal.dataAmount} High-Speed 5G</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{locale === 'no' ? 'Pris:' : 'Price:'}</span>
                      <span className="text-emerald-600 font-black text-base">${activePackageModal.memberWholesalePrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setInstalledQr(true)}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{locale === 'no' ? 'Generer Digital QR-Kode Nå' : 'Generate Digital QR Code Now'}</span>
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
