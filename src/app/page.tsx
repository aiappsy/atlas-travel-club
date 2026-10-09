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
  Hotel
} from 'lucide-react';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import SavingsCalculator from '@/components/SavingsCalculator';

export default function LuxuryHomePage() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights' | 'b2b'>('hotels');

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24 selection:bg-amber-400 selection:text-slate-950">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          {/* Subtle VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Private Wholesale Travel Club • Closed-Loop Member Rates</span>
          </div>

          {/* Luxury Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Travel Wholesale. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              Never Pay Retail Again.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct access to raw B2B bedbank rates across 1,000,000+ hotels and commercial flights at pure cost — bypassing public OTA retail markups.
          </p>

          {/* Quick Pillar Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl gap-1">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span>Hotels &amp; Resorts</span>
            </button>
            <Link
              href="/flights"
              className="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-400 hover:text-white transition-all"
            >
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Flights (NDC)</span>
            </Link>
            <Link
              href="/b2b"
              className="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-400 hover:text-white transition-all"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>B2B Corporate</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Hotel Wholesale Search Engine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 py-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Wholesale Search • Audited Against Public OTAs
            </span>
            <span className="text-amber-400 font-mono text-[11px] hidden sm:inline">
              RateHawk • WebBeds • Hotelbeds
            </span>
          </div>

          <LiveHotelSearch initialDestination="Paris" />
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Dynamisk Sparekalkulator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Hvor mye sparer du i året med Atlas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Test reisemønsteret ditt og se nøyaktig hva du sparer på 4- og 5-stjerners hoteller sammenlignet med Expedia og Booking.com.
          </p>
        </div>

        <SavingsCalculator />
      </section>

      {/* Platform Ecosystem Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Forretningsområder &amp; Tjenester
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Utforsk Hele Atlas-Økosystemet
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* B2B Fleet */}
          <Link
            href="/b2b"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 transition-all hover:-translate-y-1 block"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors flex items-center justify-between">
              B2B Bedriftsflåte
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Gruppelisenser for bedrifter og organisasjoner (DNB, Tekna, Agenturer.no) med egne co-brandede portaler.
            </p>
          </Link>

          {/* Partners & Affiliates */}
          <Link
            href="/partners"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400/60 transition-all hover:-translate-y-1 block"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              Partnere &amp; Affiliates
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              270 kr direkte provisjon + 90 kr squad-override + 20% B2B ARR utbetalt ukentlig via Wise.
            </p>
          </Link>

          {/* Flights Hub */}
          <Link
            href="/flights"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-400/60 transition-all hover:-translate-y-1 block"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors flex items-center justify-between">
              Kommersielle Fly
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Duffel NDC-flymotor med 0% påslag, fast 95 kr klubbgebyr og innebygget EU261 forsinkelsesvern.
            </p>
          </Link>

          {/* Membership Portal */}
          <Link
            href="/membership"
            className="group p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-400/60 transition-all hover:-translate-y-1 block"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors flex items-center justify-between">
              Lukket Medlemsklubb
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Sikret CUG Rate Parity-unntak, Stripe-integrert innlogging og eksklusiv medlemsadgang.
            </p>
          </Link>
        </div>
      </section>

      {/* Transparency & Legal Parity Shield */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Transparens &amp; Juridisk Beskyttelse
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Slik Leverer Atlas Ekte Engrospriser Lovlig
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Direkte Bedbank-Kobling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Koblet direkte til store B2B bedbanker (WebBeds, RateHawk, Hotelbeds APItude) for ekte innkjøpspriser uten OTA-reklametillegg.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center font-bold">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">IATA/NDC Flyklarering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ekte NDC-flyintegrasjon via Duffel med 0% billettpåslag og automatisk EU261 €600 forsinkelseskrav-overvåking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Rate Parity Overholdelse</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prisene er låst bak lukket medlemsinnlogging (Closed User Group), som oppfyller alle krav fra hotellkjedene og antitrust-lovgivning.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
