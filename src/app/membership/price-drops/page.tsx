'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
  const [records, setRecords] = useState<PriceDropRebookRecord[]>(MOCK_PRICE_DROP_RECORDS);

  const totalRefunded = records.reduce((acc, r) => acc + r.cashRefunded, 0);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Member Portal
        </Link>

        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-300">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              Autonomous Post-Booking Price Drop Sentinel
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Never Overpay: 24/7 Auto-Rebook & Cash Refunds
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Even after you book, our background algorithms monitor 100+ B2B bedbanks. When rates drop before check-in, we automatically rebook and refund the difference straight to your Visa card.
            </p>
          </div>

          <div className="bg-emerald-950 text-white p-5 rounded-3xl border border-emerald-800/60 shadow-xl flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Total Cash Refunded to Visa Card
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
                  Actively Monitored Reservations
                </h3>
                <p className="text-xs text-slate-500">
                  Rate queries performed automatically every 4 hours until check-in date.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Active Sentinel Protected
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

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-slate-900">{rec.hotelName}</h4>
                        {rec.status === 'auto_rebooked_success' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Auto-Rebooked & Refunded
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-600" />
                            Actively Monitoring
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        📍 {rec.city} • {rec.checkInDate} to {rec.checkOutDate} ({rec.nights} Nights)
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1">
                        Last Sentinel Scan: <strong className="text-slate-700">{rec.lastCheckedAt}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 line-through">
                        Original Booked Price: ${rec.originalPriceTotal.toFixed(2)}
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        New Rebooked Total: <span className="text-sky-600">${rec.newRebookedPriceTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {rec.cashRefunded > 0 ? (
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-right">
                        <div className="text-[10px] text-emerald-700 font-bold uppercase">
                          Cash Refunded to Visa
                        </div>
                        <div className="text-lg font-black text-emerald-600 font-mono">
                          +${rec.cashRefunded.toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-100 rounded-2xl text-right">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">
                          Status
                        </div>
                        <div className="text-xs font-bold text-slate-700">
                          Best Price Guaranteed
                        </div>
                      </div>
                    )}
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
