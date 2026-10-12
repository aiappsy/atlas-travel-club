'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_PRICE_DROP_RECORDS } from '@/lib/mockData';
import { PriceDropRebookRecord } from '@/lib/types';
import {
  TrendingDown,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowDownLeft,
  CreditCard,
  Building2,
  ArrowLeft,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function PriceDropsPage() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const [records, setRecords] = useState<PriceDropRebookRecord[]>(MOCK_PRICE_DROP_RECORDS);

  const totalRefunded = records.reduce((acc, r) => acc + r.cashRefunded, 0);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'no' ? 'Tilbake til Medlemsportalen' : 'Back to Member Portal'}</span>
        </Link>

        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-300">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              {locale === 'no' ? 'Automatisk Prisdropp-Overvåking Etter Bestilling' : 'Autonomous Post-Booking Price Drop Sentinel'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Betal aldri for mye: 24/7 Automatisk Ombooking & Refusjon' : 'Never Overpay: 24/7 Auto-Rebook & Cash Refunds'}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {locale === 'no'
                ? 'Selv etter bestilling overvåker våre bakgrunnsalgoritmer over 100 B2B Bedbanks. Når prisen faller før innsjekking, ombooker vi automatisk og overfører differansen rett til ditt Visa-kort.'
                : 'Even after you book, our background algorithms monitor 100+ B2B bedbanks. When rates drop before check-in, we automatically rebook and refund the difference straight to your Visa card.'}
            </p>
          </div>

          <div className="bg-emerald-950 text-white p-5 rounded-3xl border border-emerald-800/60 shadow-xl flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                {locale === 'no' ? 'Totalt refundert til kort' : 'Total Cash Refunded to Visa Card'}
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +${totalRefunded.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Monitored Reservations List */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-sky-600 animate-spin" />
                  {locale === 'no' ? 'Aktivt Overvåkede Bestillinger' : 'Actively Monitored Reservations'}
                </h3>
                <p className="text-xs text-slate-500">
                  {locale === 'no'
                    ? 'Prissjekk utføres automatisk hver 4. time frem til innsjekkingsdato.'
                    : 'Rate queries performed automatically every 4 hours until check-in date.'}
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {locale === 'no' ? 'Aktivt Sentinel-beskyttet' : 'Active Sentinel Protected'}
              </span>
            </div>

            <div className="space-y-4">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={rec.hotelImage}
                      alt={rec.hotelName}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {rec.status === 'auto_rebooked_success'
                            ? (locale === 'no' ? 'Ombooket & Refundert' : 'Rebooked & Refunded')
                            : (locale === 'no' ? 'Overvåker Pris' : 'Monitoring Rate')}
                        </span>
                        <span className="text-xs font-mono text-slate-400">#{rec.id.substring(0, 10)}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base">{rec.hotelName}</h4>
                      <div className="text-xs text-slate-500">
                        {rec.checkInDate} ➔ {rec.checkOutDate} • {rec.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {locale === 'no' ? 'Opprinnelig Pris' : 'Original Rate'}
                      </div>
                      <div className="text-sm font-bold text-slate-600 line-through">
                        ${rec.originalPriceTotal}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-emerald-600">
                        {locale === 'no' ? 'Ny Engrospris' : 'New Dropped Rate'}
                      </div>
                      <div className="text-lg font-black text-emerald-600 font-mono">
                        ${rec.newRebookedPriceTotal}
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-900 text-right">
                      <div className="text-[10px] uppercase font-bold text-emerald-800">
                        {locale === 'no' ? 'Penger Refundert' : 'Cash Refunded'}
                      </div>
                      <div className="text-lg font-black text-emerald-700 font-mono">
                        +${rec.cashRefunded}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
