'use client';

import React from 'react';
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
  Share2
} from 'lucide-react';
import LiveHotelSearch from '@/components/LiveHotelSearch';

export default function PreLaunchHomePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Pre-Launch Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-2.5 px-4 text-center text-xs font-black tracking-wide shadow-md">
        🚀 Atlas Travel Club Pre-Launch Platform • Official Partner, Enterprise &amp; Bedbank Overview
      </div>

      {/* Hero Section */}
      <section className="relative pt-14 pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Closed-Loop Wholesale Travel Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            The Private Wholesale Travel Club. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              0% Retail Markup. At-Cost Clearing.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Atlas Travel Club operates on a transparent membership subscription model. Instead of marking up hotel rooms and flight tickets by 20%–45% like public OTAs, our members access direct B2B wholesale net rates at pure cost.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">0%</div>
              <div className="text-xs font-bold text-white mt-1">Retail Markup</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Zero middleman markup on bedbank room rates.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400 font-mono">28%–42%</div>
              <div className="text-xs font-bold text-white mt-1">Wholesale Savings</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Average savings below Booking.com &amp; Expedia.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-black text-sky-400 font-mono">1M+</div>
              <div className="text-xs font-bold text-white mt-1">Global Properties</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Curated 5-star flagships &amp; boutique inventory.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-black text-purple-400 font-mono">100%</div>
              <div className="text-xs font-bold text-white mt-1">Parity Compliant</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Protected behind closed-user-group (CUG) login.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Exploration Grid (Pillars) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Plattformens Moduler &amp; Forretningsområder
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Utforsk Atlas Travel Club Økosystemet
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
              Gruppemedlemskap for bedrifter og foreninger (DNB, Tekna, Agenturer.no) med co-brandede portaler.
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

      {/* Live Hotel Wholesale Search Engine */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live B2B Rate Comparison Engine
            </span>
            <span className="text-amber-400 font-mono">Audited Against Live Public OTAs</span>
          </div>

          <LiveHotelSearch initialDestination="Paris" />
        </div>
      </section>

      {/* Partner Architecture Briefing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Wholesale Distribution Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            How Atlas Connects to B2B Wholesalers &amp; Airlines
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Our Next.js 14 cloud routing engine aggregates live B2B feeds into a unified member checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Direct Bedbank Connectivity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrated with major B2B bedbank feeds (WebBeds, RateHawk, Hotelbeds APItude) for true net contracted room rates with zero retail advertising markup.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-400/10 text-sky-400 flex items-center justify-center font-black">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">IATA/NDC Airline Clearing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live NDC flight integration via Duffel, providing direct airline net fares with 0% markup and built-in EU261 €600 flight delay compensation monitoring.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Strict Rate Parity Compliance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All wholesale rates are strictly sealed behind authenticated member logins, fully respecting hotel brand standards and closed-user-group (CUG) legal exemptions.
            </p>
          </div>
        </div>

        {/* Founder & Partner Contact Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-amber-400/40 text-center space-y-4 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Partner &amp; Supplier Inquiries
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            We are currently finalizing B2B bedbank supplier agreements and API connectivity during our pre-launch phase. For commercial agreements or technical onboarding:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/4740059493"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Connect on WhatsApp (+47 40059493)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/b2b"
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Bedriftsflåte &amp; B2B ➔
            </Link>
            <Link
              href="/partners"
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Partner &amp; Affiliate Program ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
