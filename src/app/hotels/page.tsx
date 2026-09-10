'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import { Sparkles, ShieldCheck, Building2, TrendingDown } from 'lucide-react';
import Link from 'next/link';

function HotelsSearchContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || 'Las Vegas';

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            1,000,000+ Closed-Loop Wholesale Hotel Directory
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Search Wholesale Rates & Compare OTAs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time B2B Bedbank inventory with direct wholesale clearing prices. Live multi-source comparison against Expedia, Hotels.com, Agoda, and Kayak.
          </p>
        </div>
      </div>

      {/* Main Live Multi-OTA Search Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <LiveHotelSearch initialDestination={initialCity} />
      </div>
    </div>
  );
}

export default function HotelsSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
          Loading wholesale hotel catalog...
        </div>
      }
    >
      <HotelsSearchContent />
    </Suspense>
  );
}
