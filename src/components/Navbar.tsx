'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import AuthModal from './AuthModal';
import {
  Compass,
  CreditCard,
  ShieldCheck,
  Menu,
  LogOut,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export default function Navbar() {
  const { user, isMember, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        {/* Top Minimalist Ticker Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-medium text-slate-200 text-[11px] sm:text-xs">
                The Private Wholesale Travel & Banking Club: <strong className="text-amber-300">0% Retail Markup • Reloadable Visa® • Annual Profit Dividends</strong>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs">
              <Link href="/proof" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Live Savings Proof</span>
              </Link>
              {isMember && user && (
                <span className="text-amber-200 font-semibold">
                  Saved: <strong className="text-emerald-400">${user.lifetimeSavings}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Clean, Spacious Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu Trigger Button + Brand */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={toggleSidebar}
                className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-sm group"
                title="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Explore</span>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950 border border-amber-500/40 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-mono">
                    ATLAS
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-sans shadow-sm">
                      VIP CLUB
                    </span>
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:block">
                    The Private Wholesale Travel & Banking Club
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Quick Search Link */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/hotels"
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-2.5 transition-all border border-slate-200"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search 1,000,000+ Wholesale Stays & Villas...</span>
                <span className="px-2 py-0.5 bg-amber-300 text-slate-950 rounded-full text-[10px] font-black">
                  0% Markup
                </span>
              </Link>
            </div>

            {/* Right: Actions, Proof & User Account */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/case-study"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Case Study</span>
              </Link>

              <Link
                href="/proof"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rate Proof</span>
              </Link>

              {isMember && user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/membership/visa-card"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Visa® Card</span>
                  </Link>

                  <Link
                    href="/membership"
                    className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full pr-2.5 hover:bg-slate-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xs">
                      {user.displayName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                      {user.displayName.split(' ')[0]}
                    </span>
                  </Link>

                  <button
                    onClick={() => logout()}
                    title="Sign Out"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="text-xs font-bold text-slate-700 hover:text-slate-950 px-2 py-1.5"
                  >
                    Sign In
                  </button>

                  <Link
                    href="/membership"
                    className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Get VIP Pass</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
