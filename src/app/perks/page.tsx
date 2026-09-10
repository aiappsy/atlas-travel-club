'use client';

import React, { useState } from 'react';
import { MOCK_PERKS } from '@/lib/mockData';
import { PerkDeal } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import {
  Ticket,
  Car,
  Utensils,
  Sparkles,
  Search,
  QrCode,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';

export default function PerksPage() {
  const { user, isMember } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activePerkModal, setActivePerkModal] = useState<PerkDeal | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'Theme Parks', 'Car Rental', 'Dining', 'Entertainment'];

  const filteredPerks = MOCK_PERKS.filter((perk) => {
    const matchCat = selectedCategory === 'All' || perk.category === selectedCategory;
    const matchSearch =
      !searchTerm ||
      perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Ticket className="w-3.5 h-3.5" />
            500,000+ Local & Global Perks
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Theme Parks, Dining & Fleet Discounts
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Use your digital member pass for in-person merchant redemptions or instant closed-loop discount promo codes.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Disney, Universal, Hertz, restaurants..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Main Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-sky-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerks.map((perk) => (
            <div
              key={perk.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={perk.image}
                    alt={perk.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                    {perk.discountText}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {perk.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-extrabold uppercase text-sky-600 tracking-wider">
                    {perk.partnerName}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1 line-clamp-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {perk.description}
                  </p>
                  <div className="text-[11px] font-medium text-slate-400 mt-3">
                    📍 {perk.location}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActivePerkModal(perk)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  Redeem Member Voucher
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voucher Redemption Modal */}
      {activePerkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 p-6 text-white text-center relative">
              <button
                onClick={() => setActivePerkModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase text-amber-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {activePerkModal.discountText}
              </div>
              <h3 className="text-xl font-bold">{activePerkModal.partnerName}</h3>
              <p className="text-xs text-sky-100 mt-1 max-w-sm mx-auto">
                {activePerkModal.title}
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* Member Code or Barcode Display */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Exclusive Member Promo Code
                </div>
                <div className="flex items-center justify-center gap-2 my-2">
                  <span className="font-mono text-2xl font-black text-slate-900 tracking-wider">
                    {activePerkModal.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(activePerkModal.code)}
                    className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    {copiedCode ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">
                  Enter this code at merchant checkout or show at the counter.
                </div>
              </div>

              {/* Scannable Barcode Mock */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <div className="h-12 flex items-center justify-center gap-1 px-4">
                  {[4, 2, 8, 1, 6, 2, 4, 1, 8, 2, 5, 2, 7, 3, 2, 6, 4, 1, 5, 2, 4, 6].map(
                    (w, i) => (
                      <div
                        key={i}
                        className="h-full bg-slate-900"
                        style={{ width: `${w * 2}px` }}
                      ></div>
                    )
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  MEMBER-VOUCHER-{user?.memberId || 'HC-9824-VIP'}
                </div>
              </div>

              {/* Terms of Use */}
              <div className="text-xs text-slate-500 space-y-1">
                <div className="font-bold text-slate-700">Terms & Conditions:</div>
                <p>{activePerkModal.terms}</p>
              </div>

              <button
                onClick={() => setActivePerkModal(null)}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
