'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Compass,
  Sparkles,
  Building2,
  Plane,
  Percent,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  Globe,
  Users,
  Award,
  CreditCard,
  Briefcase,
  Share2,
  Hotel,
  Ship,
  Coffee,
  Search,
  Calendar,
  Check
} from 'lucide-react';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { usePlatform } from '@/context/PlatformContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LuxuryHomePage() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights' | 'lounges' | 'cruises'>('hotels');
  const { user, isMember, bookings } = useAuth();
  const { formatPrice } = useCurrency();
  const { features } = usePlatform();
  const { t, locale } = useLanguage();
  const isTrialActive = features.enableFreeTrial ?? true;
  const trialDays = features.freeTrialDays ?? 14;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans pb-24 selection:bg-amber-100 selection:text-amber-900">
      {/* Light, Clean Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          {/* Member Status Ribbon (Clean white card with subtle green/gold highlights) */}
          {isMember && user && (
            <div className="max-w-4xl mx-auto mb-6 p-4 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {locale === 'no' ? 'Totalt Spart' : 'Lifetime Savings'}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-600 font-mono mt-0.5">
                    {formatPrice(user.lifetimeSavings || 1480)}
                  </div>
                  <div className="text-[10px] text-slate-400">vs. Booking.com</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {locale === 'no' ? 'Aktive Reiser' : 'Active Bookings'}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono mt-0.5">
                    {bookings?.length || 2} {locale === 'no' ? 'bookinger' : 'trips'}
                  </div>
                  <div className="text-[10px] text-slate-400">{locale === 'no' ? 'Se verdikuponger' : 'View vouchers'}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {locale === 'no' ? 'Medlemsstatus' : 'Membership Status'}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    VIP #{user.memberId?.split('-')[1] || '0001'}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {locale === 'no' ? '0% Påslag Aktivt' : '0% Retail Markup'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {locale === 'no' ? 'Gyldighet' : 'Valid Until'}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    {user.validUntil || (locale === 'no' ? '31. Des 2026' : 'Dec 31, 2026')}
                  </div>
                  <div className="text-[10px] text-slate-400">{locale === 'no' ? 'Auto-fornyelse' : 'Auto-renew'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Minimalist Membership Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/70">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {locale === 'no'
                ? 'Lukket Medlemsbasert Engrosklubb • B2B Netto Klubbpriser'
                : 'Private Wholesale Travel Club • Closed-Loop Member Rates'}
            </span>
          </div>

          {/* Clean Modern Headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              {locale === 'no' ? (
                <>
                  Reis til Netto Engrospris. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
                    Betal aldri fullpris igjen.
                  </span>
                </>
              ) : (
                <>
                  Direct Wholesale Travel. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
                    Never Pay Retail Again.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {locale === 'no'
                ? 'Direkte tilgang til hemmelige B2B-engrospriser på over 1 000 000 luksushoteller, kommersielle flybilletter (NDC), VIP-lounger og cruiseskip med 0% kommersielt påslag.'
                : 'Direct access to raw B2B bedbank rates across 1,000,000+ luxury hotels, NDC commercial flights, airport lounges, and ocean cruises with 0% retail markup.'}
            </p>

            {/* Prominent Free Trial Call-To-Action */}
            {!isMember && (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/membership"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-sm shadow-md transition-all flex items-center gap-2 transform hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{t.common.startTrialNow}</span>
                  <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {locale === 'no' ? '0 kr i dag' : '$0 Today'}
                  </span>
                </Link>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {locale === 'no'
                      ? `Gratis ${trialDays}-dagers prøveperiode • Avslutt når som helst • 0% påslag`
                      : `Free ${trialDays}-day trial • Cancel anytime • 0% retail markups`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Clean 4 Pillars Pill Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-xs gap-1 flex-wrap justify-center mt-2">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-white text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hotel className="w-4 h-4 text-amber-700" />
              <span>{t.nav.hotels}</span>
            </button>
            <Link
              href="/flights"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Plane className="w-4 h-4 text-sky-600" />
              <span>{t.nav.flights}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800 font-mono font-bold">NDC</span>
            </Link>
            <Link
              href="/lounges"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>{t.nav.lounges}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-mono font-bold">VIP</span>
            </Link>
            <Link
              href="/cruises"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Ship className="w-4 h-4 text-indigo-600" />
              <span>{t.nav.cruises}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LiveHotelSearch initialDestination="Paris" />
      </section>


      {/* Clean Ecosystem Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Forretningsområder &amp; Tjenester
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Utforsk Hele Atlas-Økosystemet
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* B2B Fleet */}
          <Link
            href="/b2b"
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all block"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-800 transition-colors flex items-center justify-between">
              B2B Bedriftsflåte
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Gruppelisenser for bedrifter og organisasjoner med egne co-brandede portaler.
            </p>
          </Link>

          {/* Partners & Affiliates */}
          <Link
            href="/partners"
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all block"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors flex items-center justify-between">
              Partnere &amp; Affiliates
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              270 kr direkte provisjon + squad-override utbetalt ukentlig via Wise.
            </p>
          </Link>

          {/* Flights Hub */}
          <Link
            href="/flights"
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all block"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-800 transition-colors flex items-center justify-between">
              Kommersielle Fly
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Duffel NDC-flymotor med 0% påslag og innebygget EU261 forsinkelsesvern.
            </p>
          </Link>

          {/* Membership Portal */}
          <Link
            href="/membership"
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all block"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-800 transition-colors flex items-center justify-between">
              Lukket Medlemsklubb
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Sikret CUG Rate Parity-unntak, Stripe-integrert innlogging og eksklusiv adgang.
            </p>
          </Link>
        </div>
      </section>

      {/* Transparency & Legal Parity Shield */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Transparens &amp; Sikkerhet
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Slik Leverer Atlas Ekte Engrospriser Lovlig
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direkte Bedbank-Kobling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Koblet direkte til store B2B bedbanker (WebBeds, RateHawk, Hotelbeds) for ekte innkjøpspriser uten OTA-reklametillegg.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">IATA/NDC Flyklarering</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ekte NDC-flyintegrasjon via Duffel med 0% billettpåslag og automatisk EU261 €600 forsinkelseskrav-overvåking.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Rate Parity Overholdelse</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prisene er låst bak lukket medlemsinnlogging (Closed User Group), som oppfyller alle krav fra hotellkjedene og antitrust-lovgivning.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
