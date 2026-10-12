'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function HotelsSearchContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || searchParams.get('destination') || (locale === 'no' ? 'Oslo' : 'Las Vegas');
  const initialCheckIn = searchParams.get('checkIn') || undefined;
  const initialCheckOut = searchParams.get('checkOut') || undefined;
  const initialRooms = parseInt(searchParams.get('rooms') || '1', 10);
  const initialAdults = parseInt(searchParams.get('adults') || '2', 10);
  const childAgesParam = searchParams.get('childAges');
  const initialChildrenAges = childAgesParam
    ? childAgesParam.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n))
    : [];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      {/* Light Clean Header Banner matching Light Mode Theme */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {t.hotels.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            {t.hotels.heroTitle}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.hotels.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Main Live Multi-OTA Search Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <LiveHotelSearch
          initialDestination={initialCity}
          initialCheckIn={initialCheckIn}
          initialCheckOut={initialCheckOut}
          initialRooms={initialRooms}
          initialAdults={initialAdults}
          initialChildrenAges={initialChildrenAges}
        />
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
