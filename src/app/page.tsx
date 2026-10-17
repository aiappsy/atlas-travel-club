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
                ? 'Eksklusiv medlemsklubb • B2B-engrospriser'
                : 'Private Wholesale Travel Club • Closed-Loop Member Rates'}
            </span>
          </div>

          {/* Clean Modern Headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              {locale === 'no' ? (
                <>
                  Reis til ekte engrospriser. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
                    Hvorfor betale overpris?
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
                ? 'Få direkte tilgang til lukkede B2B-engrospriser på over 1 000 000 kvalitetshoteller, flybilletter, VIP-lounger og luksuscruise – med 0 kr i påslag og 0 kr i bookinggebyr.'
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
                      ? `Gratis ${trialDays}-dagers prøveperiode • Ingen bindingstid • 0 kr i påslag`
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

      {/* EXCLUSIVE DISTRESSED INVENTORY SHOWCASE: RESORTS & GOURMET SPA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{locale === 'no' ? 'Eksklusive Medlemsfordeler' : 'Member-Exclusive Liquidation Deals'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {locale === 'no' ? 'Spesialavtaler for ferieleiligheter og spa' : 'Curated Condo Weeks & Spa Escapes'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {locale === 'no'
                ? 'Gjennom lukkede overskuddsavtaler med RCI og Connex gir vi medlemmene tilgang til hele ferieleiligheter til fast lavpris og gratis hotellopphold.'
                : 'Through closed liquidation agreements with RCI and Connex, members access 7-night whole-condo stays and complimentary hotel room lodging.'}
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {locale === 'no' ? '✓ 14 dagers angrefrist • Ingen pakkereisetvang' : '✓ 14-day money-back guarantee • Self-directed travel'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Atlas Signature Resorts */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Atlas Signature Resorts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-black uppercase tracking-wider">
                {locale === 'no' ? '7 Netters Ukesopphold' : '7-Night Condo Stays'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                {locale === 'no' ? 'RCI / Panorama Allotment' : 'RCI Surplus Allotment'}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Atlas Signature Resorts</div>
                <div className="text-2xl font-black">
                  {locale === 'no' ? 'Hele leiligheten fra kun 3 890 kr' : 'Whole Condo from just 3,890 NOK ($359 USD)'}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  {locale === 'no' ? 'Fast totalpris for 7 netter • Opptil 4–6 personer • Fullt kjøkken' : 'Flat rate for 7 nights • Sleeps 4–6 guests • Full kitchen'}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {locale === 'no'
                    ? 'Lei en romslig ferieleilighet på 4-stjerners resorter i Marbella, Tenerife, Algarve, Kreta eller Toscana. Ingen rompriser per natt eller persongebyrer – kun faste forhåndsbetalte uker fra 3 890 kr (Last-Minute) eller 5 890 kr (Helår).'
                    : 'Stay in spacious 1-2 bedroom condo suites across Costa del Sol, Canary Islands, Algarve, or Tuscany. No daily rate, no per-person surcharge—just 3,890 NOK ($359) for Last-Minute or 5,890 NOK ($549) for 365-day advance bookings.'}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{locale === 'no' ? 'Sparer over 12 000 kr' : 'Save $1,100+ vs OTAs'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{locale === 'no' ? '14 dagers angrefrist' : '14-Day Money Back'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{locale === 'no' ? 'Fra 3 890 kr' : 'From 3,890 NOK'}</span> / uke
                </div>
                <Link
                  href="/resorts"
                  className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{locale === 'no' ? 'Utforsk ferieleiligheter' : 'Explore Condos'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Atlas Hotel Breaks */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Atlas Hotel Breaks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider">
                {locale === 'no' ? '0 kr Rompris' : '$0 Room Rate'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                {locale === 'no' ? 'Holiday Plus / Connex' : 'Holiday Plus Hotel Network'}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Atlas Hotel Breaks</div>
                <div className="text-2xl font-black">
                  {locale === 'no' ? 'Gratis hotellopphold for 2 personer' : 'Complimentary Hotel Stay for 2'}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  {locale === 'no' ? 'Betal kun hotellets faste halvpensjon (€35–€60/pers/dag) ved utsjekk' : 'Pay only fixed half-board (€35–€60/guest/day) at checkout'}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {locale === 'no'
                    ? 'Nyt 2–4 netter på håndplukkede kvalitetshoteller i Alpene, Dolomittene, Schwarzwald, Provence eller Toscana. Rommet er 0 kr på hotellregningen – du betaler kun for lokal gourmetfrokost og middag ved utsjekk.'
                    : 'Experience 2–4 nights at handpicked partner hotels across the Alps, Black Forest, Provence, or Tuscany. Room charge is $0—you only pay the published half-board dining package directly to the hotel.'}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{locale === 'no' ? 'Sparer over 6 700 kr' : 'Save $650+ vs Booking'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{locale === 'no' ? 'Offisielt innsjekkingsbevis' : 'Official Check-In Certificate'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-900">0 kr</span> / rom (500 poeng)
                </div>
                <Link
                  href="/hotel-breaks"
                  className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{locale === 'no' ? 'Utforsk hotellopphold' : 'Explore Hotel Breaks'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL ATLAS TRAVEL CARD — COMING SOON SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl p-8 sm:p-12 lg:p-16">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Coming Soon Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-black tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{locale === 'no' ? 'KOMMER SNART • EKSKLUSIVT FOR MEDLEMMER' : 'COMING SOON • MEMBER EXCLUSIVE'}</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {locale === 'no' ? (
                    <>
                      ATLAS Sovereign Metal Card <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                        Visa® Prestige i massivt metall
                      </span>
                    </>
                  ) : (
                    <>
                      The Sovereign Metal Card <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                        Visa® Prestige in Solid Brushed Metal
                      </span>
                    </>
                  )}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {locale === 'no'
                    ? 'Det eksklusive betalingskortet for kvalitetsbevisste reisende. 0 % valutapåslag ved betaling i utlandet, adgang til over 1 300 VIP-flyplasslounger og direkte opptjening av reisekreditter.'
                    : 'The definitive physical card for discerning global travelers. Engineered for sovereign mobility featuring 0% FX interbank spread, 1,300+ DragonPass lounges, and seamless Rewards Vault redemption.'}
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-amber-400 text-xs font-black uppercase tracking-wider">
                    {locale === 'no' ? '0 % valutapåslag' : '0% Foreign FX Fees'}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {locale === 'no'
                      ? 'Offisielle interbank-kurser i over 150 valutaer – helt uten skjulte bankpåslag.'
                      : 'True mid-market interbank exchange rates worldwide with zero retail spread.'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-amber-400 text-xs font-black uppercase tracking-wider">
                    {locale === 'no' ? 'Over 1 300 VIP-lounger' : '1,300+ Airport Lounges'}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {locale === 'no'
                      ? 'Inkludert DragonPass-tilgang og prioritert sikkerhetskontroll (Fast Track).'
                      : 'Built-in DragonPass VIP privileges and fast-track airport security escort.'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-amber-400 text-xs font-black uppercase tracking-wider">
                    {locale === 'no' ? 'Reisekreditter og poeng' : 'Club Credits Redemption'}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {locale === 'no'
                      ? 'Bruk opptjente poeng direkte som delbetaling på dine neste hotell- og reisebestillinger.'
                      : 'Direct 100 pts = $1 spending with automated 50% liquidity safeguard.'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-amber-400 text-xs font-black uppercase tracking-wider">
                    {locale === 'no' ? 'Massivt metall & Apple Pay' : 'Solid Metal & Apple Pay'}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {locale === 'no'
                      ? 'Lasergravert 18 grams stål med kontaktløs chip, støtte for Apple Pay og Google Pay.'
                      : '18g laser-etched metal, contactless chip, and instant mobile wallet provisioning.'}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/membership/visa-card"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 transform hover:scale-[1.02]"
                >
                  <CreditCard className="w-4 h-4 text-slate-950" />
                  <span>{locale === 'no' ? 'Utforsk kortfordelene →' : 'Explore Card Privileges →'}</span>
                </Link>

                <Link
                  href="/membership"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <span>{locale === 'no' ? 'Se medlemskap' : 'View Memberships'}</span>
                </Link>
              </div>

            </div>

            {/* Right Card Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-900">
                  <img
                    src="/atlas-final-card.jpg"
                    alt="ATLAS Sovereign Visa Metal Card"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
                    Prestige Metal Edition
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Ecosystem Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            {locale === 'no' ? 'Tjenester og fordeler' : 'Business Areas & Services'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'no' ? 'Utforsk hele Atlas-økosystemet' : 'Explore The Entire Atlas Ecosystem'}
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
              {locale === 'no' ? 'Bedriftsavtaler (B2B)' : 'B2B Corporate'}
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {locale === 'no'
                ? 'Gruppelisenser for bedrifter og organisasjoner med egne skreddersydde portaler.'
                : 'Group licenses for companies and organizations with co-branded portals.'}
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
              {locale === 'no' ? 'Partnere & affiliate' : 'Partners & Affiliates'}
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {locale === 'no'
                ? '270 kr i direkte provisjon for hvert nye medlem, med ukentlige utbetalinger via Wise.'
                : '270 NOK direct referral commission + squad overrides paid weekly via Wise.'}
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
              {locale === 'no' ? 'Flybilletter' : 'Commercial Flights'}
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {locale === 'no'
                ? 'Direkte flybooking til nettopris (NDC) med 0 kr i billettpåslag og EU261-passasjervern.'
                : 'Duffel NDC flight engine with 0% markup and built-in EU261 delay protection.'}
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
              {locale === 'no' ? 'Lukket medlemsklubb' : 'Private Member Club'}
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {locale === 'no'
                ? 'Eksklusiv tilgang til lukkede engrospriser beskyttet bak personlig medlemsinnlogging.'
                : 'Secured CUG Rate Parity exemption, Stripe-integrated access, and exclusive perks.'}
            </p>
          </Link>
        </div>
      </section>

      {/* Transparency & Legal Parity Shield */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
            {locale === 'no' ? 'Trygghet og transparens' : 'Transparency & Security'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'no' ? 'Slik leverer Atlas ekte engrospriser' : 'How Atlas Delivers True Wholesale Rates'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'no' ? 'Direkte engrosavtaler' : 'Direct Bedbank Integration'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Koblet direkte til store grossister (WebBeds, RateHawk, Hotelbeds) for ekte innkjøpspriser uten fordyrende OTA-påslag.'
                : 'Direct connection to major B2B bedbanks (WebBeds, RateHawk, Hotelbeds) for raw wholesale rates without OTA advertising markup.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'no' ? 'Offisielle IATA/NDC-flypriser' : 'IATA/NDC Flight Ticketing'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Direkte tilgang til flyselskapenes egne nettopriser uten provisjonspåslag eller skjulte billettgebyrer.'
                : 'Direct access to official airline net fares via Duffel NDC with 0% retail markup and automated EU261 flight protection.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'no' ? 'Garantert prisparitet' : 'Rate Parity Compliance'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Gjennom vår lukkede medlemsmodell (CUG) kan vi tilby rabatter som ellers ikke er lov å vise åpent på nett.'
                : 'Rates are protected behind private member authentication (Closed User Group), complying fully with hotel chain parity requirements.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
