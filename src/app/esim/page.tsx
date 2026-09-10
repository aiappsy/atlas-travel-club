'use client';

import React, { useState } from 'react';
import { MOCK_ESIM_PACKAGES } from '@/lib/mockData';
import { EsimPackage } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
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
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activePackageModal, setActivePackageModal] = useState<EsimPackage | null>(null);
  const [installedQr, setInstalledQr] = useState(false);

  const regions = ['All', 'Americas', 'Europe', 'Asia-Pacific', 'Global (140+ Countries)'];

  const filteredPackages = MOCK_ESIM_PACKAGES.filter((pkg) => {
    const matchRegion = selectedRegion === 'All' || pkg.region === selectedRegion;
    const matchSearch =
      !searchTerm ||
      pkg.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.countryCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Wifi className="w-3.5 h-3.5" />
            190+ Countries SIM-Less Travel Data
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            High-Speed 5G Global Travel eSIM
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Never pay expensive $10/day international roaming fees again. Instant digital QR activation on your iPhone or Android device before you take off.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination country (e.g. United States, Europe, Japan, Mexico)..."
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
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                selectedRegion === reg
                  ? 'bg-sky-600 text-white shadow-sky-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {reg}
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
                      <div className="text-[11px] text-slate-500 font-medium">{pkg.carrierPartners}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    5G High-Speed
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Data Allowance:</span>
                    <span className="text-sky-600">{pkg.dataAmount}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Validity Period:</span>
                    <span>{pkg.validityDays} Days</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Activation Type:</span>
                    <span className="text-emerald-600 font-semibold">Instant Digital QR Scan</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Public Retail: {formatPrice(pkg.publicRetailPrice)}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      <span className="text-emerald-600">{formatPrice(pkg.memberWholesalePrice)}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save {Math.round(((pkg.publicRetailPrice - pkg.memberWholesalePrice) / pkg.publicRetailPrice) * 100)}%
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActivePackageModal(pkg);
                    setInstalledQr(false);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  Install Instant eSIM
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* eSIM Installation & QR Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActivePackageModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-3xl mb-1">{activePackageModal.flagEmoji}</div>
              <h3 className="text-xl font-black">{activePackageModal.countryName} 5G eSIM</h3>
              <p className="text-xs text-sky-200 mt-0.5">
                {activePackageModal.dataAmount} • Valid for {activePackageModal.validityDays} Days
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {installedQr ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center">
                    <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="10" y="10" width="25" height="25" fill="#000" />
                      <rect x="15" y="15" width="15" height="15" fill="#fff" />
                      <rect x="20" y="20" width="5" height="5" fill="#000" />
                      <rect x="65" y="10" width="25" height="25" fill="#000" />
                      <rect x="70" y="15" width="15" height="15" fill="#fff" />
                      <rect x="75" y="20" width="5" height="5" fill="#000" />
                      <rect x="10" y="65" width="25" height="25" fill="#000" />
                      <rect x="15" y="70" width="15" height="15" fill="#fff" />
                      <rect x="20" y="75" width="5" height="5" fill="#000" />
                      <rect x="40" y="15" width="15" height="25" fill="#000" />
                      <rect x="40" y="55" width="20" height="20" fill="#000" />
                      <rect x="65" y="45" width="25" height="15" fill="#000" />
                    </svg>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 p-2 rounded-xl">
                    SM-DP+ Address: LPA:1$esim.hotelsclub.com$ACTIVATION-KEY-9824
                  </div>
                  <p className="text-xs text-slate-500">
                    Open Camera on your iPhone/Android or go to <strong>Settings ➔ Cellular ➔ Add eSIM</strong> and point at this code.
                  </p>
                  <button
                    onClick={() => setActivePackageModal(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Public Roaming Rate:</span>
                      <span className="line-through">{formatPrice(activePackageModal.publicRetailPrice)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Wholesale Member Rate:</span>
                      <span className="text-emerald-600 font-black text-base">
                        {formatPrice(activePackageModal.memberWholesalePrice)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                      ✓ Instant digital activation. Connects automatically upon landing.
                    </div>
                  </div>

                  <button
                    onClick={() => setInstalledQr(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • Instant eSIM Activation ({formatPrice(activePackageModal.memberWholesalePrice)})
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
