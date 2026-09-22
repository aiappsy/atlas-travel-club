'use client';

import React from 'react';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import { ShieldCheck, Search, Sparkles, Building2, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RateCheckerPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            Live Multi-Platform Price Inspector
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Check Any Hotel Rate vs. Expedia, Agoda & Hotels.com
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Enter your destination or hotel below to run an instant live audit comparing public retail OTA prices against raw B2B Bedbank wholesale clearing rates.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <LiveHotelSearch initialDestination="Las Vegas" />
      </div>

      {/* Educational Callout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900">
              How Can ATLAS Offer Rates 24% to 52% Below Public Sites?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Public travel platforms are bound by contractual <strong>Rate Parity</strong>, forcing them to inflate prices by 18%–25% to fund Google search advertising. Because ATLAS operates as a closed-loop membership club, our B2B Bedbank inventory is 100% exempt from parity laws.
            </p>
          </div>

          <Link
            href="/case-study"
            className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 font-bold text-xs shadow transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Read Rate Parity Case Study</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
