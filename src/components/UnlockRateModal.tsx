'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ComparedHotel } from '@/app/api/hotels/compare/route';
import {
  X,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  CreditCard,
  User,
  Zap,
  Tag
} from 'lucide-react';

interface UnlockRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: ComparedHotel | null;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export default function UnlockRateModal({
  isOpen,
  onClose,
  hotel,
  checkIn,
  checkOut,
  nights,
}: UnlockRateModalProps) {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, toggleDemoMode, loading } = useAuth();
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<'login' | 'choose-plan'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !hotel) return null;

  const navigateToHotel = () => {
    onClose();
    router.push(`/hotels/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}`);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmail(email, password);
      navigateToHotel();
    } catch (err: any) {
      setError(err?.message || 'Invalid member email or password. Please try again.');
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
      navigateToHotel();
    } catch (err: any) {
      setError('Google Sign-in failed. Please try again.');
    }
  };

  const handleDemoPass = () => {
    toggleDemoMode();
    navigateToHotel();
  };

  const handleChooseMembership = () => {
    onClose();
    const query = new URLSearchParams({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelCity: hotel.city,
      wholesaleRate: hotel.prices.atlasWholesale.perNight.toString(),
      savings: hotel.prices.atlasWholesale.instantSavingsPerNight.toString(),
      totalSavings: hotel.prices.atlasWholesale.totalSavings.toString(),
      totalWholesale: hotel.prices.atlasWholesale.total.toString(),
      totalRetail: hotel.prices.lowestOta.total.toString(),
      nights: nights.toString(),
      checkIn,
      checkOut,
    });
    router.push(`/membership?${query.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30 mb-3">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Closed-Bed Wholesale Rate Gate</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            Unlock Member Rate for {hotel.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {hotel.city} • {nights} Nights ({checkIn} → {checkOut})
          </p>

          {/* Pricing Highlight Pill */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Public OTA Rate</div>
              <div className="text-sm font-bold text-rose-400 line-through font-mono">
                {formatPrice(hotel.prices.lowestOta.perNight)}/nt
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800"></div>

            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-400">Wholesale Net</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {formatPrice(hotel.prices.atlasWholesale.perNight)}/nt
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-right">
              <div className="text-[10px] uppercase font-bold">You Save</div>
              <div className="text-xs font-black font-mono">
                {formatPrice(hotel.prices.atlasWholesale.totalSavings)} ({hotel.prices.atlasWholesale.savingsPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Already a Member (Sign In)</span>
          </button>

          <button
            onClick={() => setActiveTab('choose-plan')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'choose-plan'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Traveler (Choose Plan)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          {activeTab === 'login' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Sign in to your ATLAS account to verify membership and instantly unlock this confidential B2B rate.
              </p>

              {/* Google 1-Click Sign In */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.64v3h3.88c2.27-2.09 3.66-5.17 3.66-9.08z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.09C3.26 21.37 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.41l4.02-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.63 1.26 6.59l4.02 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Instant VIP Demo Access */}
              <button
                type="button"
                onClick={handleDemoPass}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 font-bold text-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>⚡ Instant VIP Member Access (Demo Pass)</span>
              </button>

              <div className="relative my-3 text-center">
                <hr className="border-slate-800" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Or with Member Email
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSignIn} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Member Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="member@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{loading ? 'Authenticating...' : 'Sign In & Unlock Wholesale Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('choose-plan')}
                  className="text-xs text-slate-400 hover:text-amber-300 transition-colors"
                >
                  Don&apos;t have an active club pass? <strong className="underline">Choose a membership plan ➔</strong>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-black text-white">Why Join ATLAS Wholesale Club?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  International Rate Parity contracts legally forbid public display of wholesale bedbank pricing. Join ATLAS to bypass the 20% to 45% OTA marketing tax.
                </p>
              </div>

              {/* Membership Benefits List */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white">Save {formatPrice(hotel.prices.atlasWholesale.totalSavings)} on this stay:</span>{' '}
                    <span className="text-slate-400">Your membership pays for itself on this single booking.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white">Reloadable Visa® Debit Card:</span>{' '}
                    <span className="text-slate-400">0% foreign exchange fees + 5% card swipe cashback.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white">100% Rate Parity Guarantee:</span>{' '}
                    <span className="text-slate-400">30-day money-back guarantee if any public site beats our net rate.</span>
                  </div>
                </div>
              </div>

              {/* CTA to Choose Membership */}
              <button
                type="button"
                onClick={handleChooseMembership}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Explore Membership Tiers (From $19/mo)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Already have a membership? <strong className="underline">Sign in here ➔</strong>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee Ribbon */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Encrypted with Google Firebase Security • 100% Rate Parity Exemption Certified</span>
        </div>
      </div>
    </div>
  );
}
