'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_VISA_ACCOUNT } from '@/lib/mockData';
import {
  CreditCard,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Sparkles,
  Zap,
  Smartphone,
  CheckCircle2,
  DollarSign,
  ArrowLeft,
  Coins,
  Scale,
  TrendingDown,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  cashbackEarned: number;
  tag?: string;
}

export default function VisaCardPage() {
  const { user, isMember } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotelsclub_visa_balance');
      if (saved) return Number(saved);
    }
    return MOCK_VISA_ACCOUNT.balance;
  });

  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('250');
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [justCredited, setJustCredited] = useState<string | null>(null);

  if (!user || !isMember) {
    return (
      <div className="bg-slate-950 min-h-screen py-24 px-4 text-white font-sans flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 text-center border border-amber-500/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
              Sovereign Card Terminal
            </span>
            <h2 className="text-2xl font-black text-white">ATLAS Obsidian Visa® Wallet</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Closed-loop reloadable Visa cards with automated price drop refunds and profit dividends are exclusively issued to active members.
            </p>
          </div>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Sign Up for VIP Membership
          </button>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="signup" />
      </div>
    );
  }

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-dividend-2025',
      merchant: 'Annual Club Profit Dividend Payout',
      category: 'Travel Vault Distribution',
      date: '2025-12-31',
      amount: +290.00,
      cashbackEarned: 0,
      tag: '👑 Travel Vault Dividend'
    },
    {
      id: 'tx-price-drop-1',
      merchant: 'Autonomous Price-Drop Refund (Bellagio Las Vegas)',
      category: 'Pruvo Sentinel Re-Booker',
      date: '2026-08-24',
      amount: +168.00,
      cashbackEarned: 0,
      tag: '🛡️ Price-Drop Cashback'
    },
    {
      id: 'tx-visa-1',
      merchant: 'Ruth’s Chris Steak House',
      category: 'Dining & Entertainment',
      date: '2026-08-25',
      amount: -124.50,
      cashbackEarned: +6.20,
    },
    {
      id: 'tx-visa-3',
      merchant: 'Hertz Gold Plus Car Rental',
      category: 'Car Fleet',
      date: '2026-08-22',
      amount: -196.00,
      cashbackEarned: +9.80,
    }
  ]);

  // Persist balance
  useEffect(() => {
    localStorage.setItem('hotelsclub_visa_balance', balance.toString());
  }, [balance]);

  const handleProgrammaticCredit = (amount: number, merchant: string, tag: string, category: string) => {
    setLoading(true);
    setTimeout(() => {
      setBalance((prev) => prev + amount);
      const newTx: Transaction = {
        id: `tx-credit-${Date.now()}`,
        merchant,
        category,
        date: new Date().toISOString().split('T')[0],
        amount: +amount,
        cashbackEarned: 0,
        tag
      };
      setTransactions((prev) => [newTx, ...prev]);
      setJustCredited(tag);
      setLoading(false);
      setTimeout(() => setJustCredited(null), 4000);
    }, 600);
  };

  const handleTopUp = () => {
    setLoading(true);
    setTimeout(() => {
      const added = Number(topUpAmount) || 100;
      setBalance((prev) => prev + added);
      setTransactions((prev) => [
        {
          id: `tx-visa-${Date.now()}`,
          merchant: 'PayPal Express Top-Up',
          category: 'Wallet Deposit',
          date: new Date().toISOString().split('T')[0],
          amount: added,
          cashbackEarned: 0,
        },
        ...prev,
      ]);
      setLoading(false);
      setShowTopUpModal(false);
      alert(`🎉 Successfully uploaded $${added} onto your HotelsClub Visa card!`);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Member Portal
        </Link>

        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-300">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Co-Branded Rechargeable Visa Prepaid Card & FinTech Treasury
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Closed-Loop Travel Card & Profit Treasury
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Your card automatically receives <strong>post-booking price drop cash refunds</strong>, <strong>EU261 flight delay legal claims</strong>, and <strong>Annual Travel Vault Profit Dividends</strong>.
          </p>
        </div>

        {/* Live Notification Banner */}
        {justCredited && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-sm">Funds Successfully Credited to Visa!</div>
                <div className="text-xs text-emerald-100">{justCredited} — Card balance updated in real-time.</div>
              </div>
            </div>
            <span className="font-mono font-black text-lg text-white">Live Sync Active</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 3D Physical Visa Card & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              {/* Card Rendering */}
              <div
                className={`relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br ${
                  isFrozen
                    ? 'from-slate-600 via-slate-700 to-slate-800 opacity-75'
                    : 'from-amber-700 via-amber-900 to-amber-950 border border-amber-400/50'
                } text-white shadow-2xl transition-all duration-300`}
              >
                {/* Top: Brand & Chip */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <span className="font-black text-sm tracking-widest uppercase font-mono">
                      ATLAS <span className="text-amber-400 font-sans text-xs">VIP</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300">
                    {user?.tier.toUpperCase() || 'GOLD'} OBSIDIAN VISA®
                  </span>
                </div>

                {/* EMV Chip & NFC */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/50 flex items-center justify-around px-1">
                    <div className="w-full h-4 border-t border-b border-amber-800/40"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Current Balance</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                      ${balance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Card Number & Holder */}
                <div className="space-y-3">
                  <div className="font-mono text-base font-bold tracking-widest text-white/95 drop-shadow">
                    4829 •••• •••• 8842
                  </div>

                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-white/50">Cardholder</div>
                      <div className="font-bold text-xs text-white uppercase">
                        {user?.displayName || 'ALEX HARRISON'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black italic tracking-tighter text-white">
                        VISA
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowTopUpModal(true)}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Money</span>
                </button>

                <button
                  onClick={() => setIsFrozen(!isFrozen)}
                  className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    isFrozen
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
                </button>
              </div>
            </div>

            {/* FinTech Flywheel Simulator */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
                  FinTech Cash Inflow Simulator
                </h4>
              </div>
              <p className="text-xs text-slate-300">
                Test how the automated webhooks deposit real cash directly onto this Visa card:
              </p>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    handleProgrammaticCredit(
                      168.00,
                      'Autonomous Price-Drop Refund (Bellagio Las Vegas)',
                      '🛡️ $168.00 Price-Drop Refund',
                      'Pruvo Sentinel Re-Booker'
                    )
                  }
                  className="w-full text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>Trigger Price-Drop Sentinel Refund</span>
                  </div>
                  <span className="font-mono font-black text-emerald-400">+$168.00</span>
                </button>

                <button
                  onClick={() =>
                    handleProgrammaticCredit(
                      650.00,
                      'EU261 Flight Delay Legal Payout (LH442 Lufthansa)',
                      '⚖️ $650.00 Flight Delay Claim Payout',
                      'AirHelp Legal Enforcement'
                    )
                  }
                  className="w-full text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-sky-400" />
                    <span>Trigger Flight Delay Compensation</span>
                  </div>
                  <span className="font-mono font-black text-sky-400">+$650.00</span>
                </button>

                <button
                  onClick={() =>
                    handleProgrammaticCredit(
                      384.20,
                      '2026 Annual Club Profit Dividend (Gold VIP 4x Boost)',
                      '👑 $384.20 Annual Profit Dividend',
                      'Travel Vault Treasury'
                    )
                  }
                  className="w-full text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>Trigger Travel Vault Annual Dividend</span>
                  </div>
                  <span className="font-mono font-black text-amber-400">+$384.20</span>
                </button>
              </div>
            </div>
          </div>

          {/* Activity & Transaction Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Real-Time Visa Card Ledger</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live balance feed with automated cashback and profit dividend credits.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Inflows</div>
                  <div className="text-sm font-black text-emerald-600 font-mono">
                    ${transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 animate-in fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          tx.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                          <span>{tx.merchant}</span>
                          {tx.tag && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              {tx.tag}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{tx.category} • {tx.date}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`font-mono text-sm font-black ${
                          tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'
                        }`}
                      >
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </div>
                      {tx.cashbackEarned > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold">
                          +${tx.cashbackEarned.toFixed(2)} Cashback
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

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Upload Money to Visa Card</h3>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase">
                Select Amount to Upload
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['100', '250', '500'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                      topUpAmount === amt
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Custom Top-Up Amount ($)
                </label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <button
                onClick={handleTopUp}
                disabled={loading}
                className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span className="font-black text-[#003087]">Pay</span>
                <span className="font-black text-[#0079C1]">Pal</span>
                <span className="font-bold text-slate-900">
                  {loading ? 'Funding Card Balance...' : `• Fund $${topUpAmount} with PayPal`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
