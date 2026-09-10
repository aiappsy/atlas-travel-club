'use client';

import React, { useState } from 'react';
import { MOCK_VAULT_ACCOUNT } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Coins,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  CreditCard,
  Building2,
  Calendar,
  Gift,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';

export default function VaultPage() {
  const { user, isMember } = useAuth();
  const { formatPrice } = useCurrency();
  const [vault, setVault] = useState(MOCK_VAULT_ACCOUNT);
  const [spendSimulation, setSpendSimulation] = useState<number>(5000);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  if (!user || !isMember) {
    return (
      <div className="bg-slate-950 min-h-screen py-24 px-4 text-white font-sans flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 text-center border border-amber-500/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
              Sovereign Treasury Restricted
            </span>
            <h2 className="text-2xl font-black text-white">Travel Vault Member Terminal</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Annual Profit Dividends and Vault Equity Units are exclusively accessible to verified ATLAS Club members. Sign up or sign in to view your dividend ledger.
            </p>
          </div>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Join VIP Club / Sign In
          </button>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="signup" />
      </div>
    );
  }

  // Dynamic Dividend Calculator based on simulation
  const simulatedDividends = (spendSimulation * 0.08 * (vault.tierMultiplier / 4)).toFixed(2);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Member Portal
        </Link>

        {/* Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 text-xs font-black uppercase tracking-wider mb-2 border border-amber-300">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              Member-Owned Profit Sharing Program
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Travel Vault & Annual Profit Dividends
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Unlike traditional travel agencies, HotelsClub shares platform commissions and interchange profits with members. Every booking and Visa card swipe accumulates Vault Equity Units paid as an annual cash dividend.
            </p>
          </div>

          <div className="bg-slate-950 text-white p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Your Vault Balance
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {vault.vaultUnits.toLocaleString()} Units
              </div>
            </div>
          </div>
        </div>

        {/* Main 3-Column Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Estimated Next Dividend</span>
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-600 font-mono">
              +{formatPrice(vault.estimatedAnnualDividend)}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Payout Date: <strong className="text-slate-800">{vault.nextPayoutDate}</strong></span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Tier Equity Multiplier</span>
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Award className="w-5 h-5" />
              </span>
            </div>
            <div className="text-3xl font-black text-amber-600 font-mono">
              {vault.tierMultiplier}x Boost
            </div>
            <div className="text-xs text-slate-500">
              Gold VIP Status provides 400% dividend allocation vs Free.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Lifetime Dividends Paid</span>
              <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Gift className="w-5 h-5" />
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              {formatPrice(vault.totalLifetimeDividendsPaid)}
            </div>
            <div className="text-xs text-emerald-700 font-semibold">
              ✓ Credited to Visa Card (•••• 8842)
            </div>
          </div>
        </div>

        {/* Interactive Dividend Calculator & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  Interactive Annual Profit Dividend Estimator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate your annual travel spend to estimate your year-end cash profit dividend.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Annual Travel & Visa Card Spend:</span>
                  <span className="text-sky-600 font-black text-sm font-mono">
                    {formatPrice(spendSimulation)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={spendSimulation}
                  onChange={(e) => setSpendSimulation(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-extrabold uppercase text-emerald-900 tracking-wider">
                    Projected Annual Cash Dividend Payout:
                  </div>
                  <div className="text-3xl font-black text-emerald-700 font-mono mt-0.5">
                    +{formatPrice(Number(simulatedDividends))}
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-1">
                    Deposited directly onto your HotelsClub Reloadable Visa Card on Dec 31.
                  </div>
                </div>

                <Link
                  href="/membership/visa-card"
                  className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>View Visa Wallet</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Past Dividend History */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-slate-900">Historical Dividend Payouts</h4>
            <div className="space-y-3">
              {vault.dividendHistory.map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{item.year} Annual Club Dividend</span>
                    <span className="font-mono text-emerald-600 font-black text-sm">
                      +{formatPrice(item.amount)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Paid To: <strong className="text-slate-700">{item.destination}</strong>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Timestamp: {item.paidAt}
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
