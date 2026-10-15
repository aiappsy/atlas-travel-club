'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSidebar } from '@/context/SidebarContext';
import { usePlatform } from '@/context/PlatformContext';
import AuthModal from './AuthModal';
import {
  LogOut,
  ChevronDown,
  Menu,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, isMember, logout } = useAuth();
  const { currency, setCurrency, currencies } = useCurrency();
  const { locale, setLocale, t } = useLanguage();
  const { toggleMobile } = useSidebar();
  const { features } = usePlatform();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const trialDays = features.freeTrialDays ?? 14;
  const isTrialActive = features.enableFreeTrial ?? true;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs text-slate-800 transition-colors">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Mobile Menu Button only */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMobile}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Open Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Language Toggle + Currency Selector + Trial Membership CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
              
              {/* Language Toggle Pill: [ NO | EN ] */}
              <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold shadow-2xs">
                <button
                  onClick={() => setLocale('no')}
                  className={`flex items-center px-3 py-1 rounded-full transition-all cursor-pointer ${
                    locale === 'no'
                      ? 'bg-white text-slate-950 shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-800 font-semibold'
                  }`}
                  title="Norsk versjon"
                >
                  <span className="text-xs tracking-wider">NO</span>
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`flex items-center px-3 py-1 rounded-full transition-all cursor-pointer ${
                    locale === 'en'
                      ? 'bg-white text-slate-950 shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-800 font-semibold'
                  }`}
                  title="English version"
                >
                  <span className="text-xs tracking-wider">EN</span>
                </button>
              </div>

              {/* Currency Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  title="Change Currency"
                >
                  <span className="text-sm">{currencies[currency]?.flag}</span>
                  <span className="font-mono font-bold">{currency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Select Currency
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        Live FX
                      </span>
                    </div>
                    {Object.values(currencies).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr.code as CurrencyCode);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                          currency === curr.code ? 'text-amber-800 font-bold bg-amber-50/60' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{curr.flag}</span>
                          <span>{curr.code}</span>
                        </span>
                        <span className="text-slate-400 font-mono">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Account / Trial Membership CTA */}
              {isMember && user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/membership"
                    className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors border border-slate-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {user.displayName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                      {user.displayName.split(' ')[0]}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Member
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="hidden sm:inline-block px-4 py-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 text-xs font-bold rounded-full transition-all cursor-pointer"
                  >
                    {t.common.signIn}
                  </button>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap transform hover:scale-[1.02]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTrialActive ? t.common.startTrialNow : (locale === 'no' ? 'Bli medlem i Atlas' : 'Join Atlas Club')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal with Clean Google and Email Login */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        customTitle={isTrialActive ? `Start Your ${trialDays}-Day Trial Membership` : undefined}
        customSubtitle={isTrialActive ? '$0 due today. Instant wholesale access across all hotels, flights & lounges.' : undefined}
      />
    </>
  );
}
