'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Plane,
  Sparkles,
  Search,
  ExternalLink,
  Users,
  Compass,
  AlertCircle
} from 'lucide-react';
import { getOrganizationBySlug } from '@/modules/b2b/organizations';
import LiveHotelSearch from '@/components/LiveHotelSearch';
import { useLanguage } from '@/context/LanguageContext';

export default function OrganizationPortalPage({
  params,
}: {
  params: { slug: string };
}) {
  const { locale } = useLanguage();
  const isNo = locale === 'no';
  const org = getOrganizationBySlug(params.slug);
  const [workEmail, setWorkEmail] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'verified' | 'invalid'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights' | 'leisure'>('hotels');

  if (!org) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">
          {isNo ? 'Organisasjonsportalen ble ikke funnet' : 'Organization Portal Not Found'}
        </h2>
        <p className="text-xs text-slate-400">
          {isNo
            ? `Det finnes ingen aktiv bedriftsavtale for koden "${params.slug}".`
            : `No active corporate agreement found for code "${params.slug}".`}
        </p>
        <Link
          href="/b2b"
          className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
        >
          {isNo ? 'Se alle bedriftsavtaler ➔' : 'View all corporate agreements ➔'}
        </Link>
      </div>
    );
  }

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = workEmail.trim().toLowerCase();
    if (!clean.includes('@')) {
      setAuthStatus('invalid');
      setFeedbackMsg(
        isNo
          ? 'Vennligst oppgi en gyldig e-postadresse.'
          : 'Please provide a valid email address.'
      );
      return;
    }

    const domain = clean.split('@')[1];
    const isDomainAllowed = org.allowedEmailDomains.some(
      (d) => d.toLowerCase() === domain
    );

    if (isDomainAllowed) {
      setAuthStatus('verified');
      setFeedbackMsg(
        isNo
          ? `✓ Verifisert! Din e-post (${clean}) er godkjent under ${org.shortName} sin fellesavtale. Tilgang er aktivert.`
          : `✓ Verified! Your email (${clean}) is approved under the ${org.shortName} master agreement. Access is active.`
      );
    } else {
      setAuthStatus('invalid');
      setFeedbackMsg(
        isNo
          ? `Kun e-postadresser som slutter på @${org.allowedEmailDomains.join(' eller @')} er godkjent for denne portalen.`
          : `Only corporate email addresses ending in @${org.allowedEmailDomains.join(' or @')} are approved for this portal.`
      );
    }
  };

  return (
    <div className="pb-24 space-y-12">
      {/* 1. Co-Branded Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Dual Brand Identity Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-lg"
                style={{ backgroundColor: org.primaryColor }}
              >
                {org.shortName.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-slate-600 text-lg">✕</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Atlas Closed Bedbank</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {isNo
                  ? 'Akkreditert Closed User Group (CUG) • 0% Påslag'
                  : 'Accredited Closed User Group (CUG) • 0% Markup'}
              </span>
            </div>
          </div>

          {/* Headline & Welcome message */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {org.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                {isNo ? 'Eksklusiv Reise- & Hotellportal' : 'Exclusive Travel & Hotel Portal'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {org.customWelcomeMessage}
            </p>
          </div>

          {/* Quick Metrics & Whitelist Pill */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                {isNo ? 'Godkjent Domene' : 'Approved Domain'}
              </span>
              <span className="text-white font-mono font-bold">@{org.allowedEmailDomains.join(', @')}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                {isNo ? 'Avtalefordel' : 'Agreement Benefit'}
              </span>
              <span className="text-emerald-400 font-bold">
                {org.discountPercentage}% {isNo ? 'Rabatt på Engros' : 'Wholesale Discount'}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                {isNo ? 'Akkumulert Sparing YTD' : 'Accumulated Savings YTD'}
              </span>
              <span className="text-amber-400 font-mono font-bold">{org.estimatedSavingsYtdNok.toLocaleString()} NOK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Employee Work-Email Authentication Gate */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                {isNo ? 'Aktiver Tilgang med Din Jobb-E-post' : 'Activate Access with Your Corporate Email'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isNo
                  ? `Ingen personlig betaling kreves. Skriv inn din e-postadresse under @${org.allowedEmailDomains[0]} for umiddelbar adgang.`
                  : `No personal payment required. Enter your company email under @${org.allowedEmailDomains[0]} for instant access.`}
              </p>
            </div>
            {authStatus === 'verified' && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isNo ? 'Aktiv Konsernbruker' : 'Active Corporate Member'}
              </span>
            )}
          </div>

          {authStatus !== 'verified' ? (
            <form onSubmit={handleVerifyEmail} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder={`name@${org.allowedEmailDomains[0]}`}
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isNo ? 'Verifiser & Lås Opp Engrospriser' : 'Verify & Unlock Wholesale Rates'}</span>
              </button>
            </form>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center justify-between">
              <span>{feedbackMsg}</span>
              <button
                onClick={() => setAuthStatus('idle')}
                className="text-[11px] underline text-slate-400 hover:text-white cursor-pointer ml-3 shrink-0"
              >
                {isNo ? 'Bytt e-post' : 'Change email'}
              </button>
            </div>
          )}

          {authStatus === 'invalid' && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Search Tabs & Embedded Booking Engine */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'hotels'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isNo ? 'Hoteller (1M+ Engrosrom)' : 'Hotels (1M+ Wholesale Rooms)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'flights'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{isNo ? 'Fly (Duffel NDC + EU261 Sentinel)' : 'Flights (Duffel NDC + EU261 Sentinel)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('leisure')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'leisure'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isNo ? 'Feriesuiter & Spa (Fritid)' : 'Condos & Spa (Leisure)'}</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Status: <span className="text-emerald-400 font-bold">{isNo ? 'B2B Engros Tilgang Aktiv' : 'B2B Wholesale Access Active'}</span>
          </span>
        </div>

        {activeTab === 'hotels' && (
          <div className="bg-slate-900/60 p-4 rounded-3xl border border-slate-800">
            <LiveHotelSearch initialDestination="Oslo" />
          </div>
        )}

        {activeTab === 'flights' && (
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">
              {isNo ? 'Direkte NDC Flyavtaler med EU261-Beskyttelse' : 'Direct NDC Airline Agreements with EU261 Protection'}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {isNo
                ? 'Søk og bestill forretningsreiser og ferier direkte hos flyselskapene uten fordyrende GDS-tillegg eller OTA-kortgebyrer. Alle billetter registreres automatisk i Atlas Sentinel for forsinkelseserstatning inntil €600 per passasjer.'
                : 'Search and book business and leisure flights directly with airlines with zero GDS markups or OTA credit card surcharges. All tickets are automatically monitored by Atlas Sentinel for flight delay compensation up to €600 per passenger.'}
            </p>
            <Link
              href="/flights"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md"
            >
              <span>{isNo ? 'Åpne Fullstendig Flyhub' : 'Open Flight Hub'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {activeTab === 'leisure' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Signature Resorts */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase border border-amber-400/30">
                  {isNo ? '7 Netters Ukesopphold' : '7-Night Condo Stays'}
                </span>
                <span className="text-sm font-mono font-black text-amber-300">
                  {isNo ? '3 490 kr / uke' : '3,490 NOK / week'}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏖️</span>
                  <span>Atlas Signature Resorts</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {isNo
                    ? 'Romslige ferieleiligheter (1–2 soverom med fullt kjøkken) for opptil 4–6 personer i Marbella, Tenerife, Algarve, Kreta og Toscana. Fastpris 3 490 kr for hele uken uten per-person tillegg.'
                    : 'Spacious vacation condos (sleeps 4–6, full kitchen) across Spain, Portugal, Greece, and Italy for a flat 3,490 NOK for the entire 7 nights.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {isNo ? '✓ 14 dagers angrefrist' : '✓ 14-day guarantee'}
                </span>
                <Link
                  href="/resorts"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1"
                >
                  <span>{isNo ? 'Utforsk leiligheter' : 'Explore Condos'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 2. Gourmet & Spa */}
            <div className="bg-slate-900/80 border border-rose-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-400/20 text-rose-300 text-[10px] font-mono font-bold uppercase border border-rose-400/30">
                  {isNo ? '0 kr Rompris' : '$0 Room Rate'}
                </span>
                <span className="text-sm font-mono font-black text-rose-300">
                  {isNo ? '0 kr rom (500 pts)' : '$0 room (500 pts)'}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🍷</span>
                  <span>Atlas Gourmet &amp; Spa Escapes</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {isNo
                    ? 'Gratis hotellopphold for 2 personer på boutique- og velværerhoteller i Dolomittene, Schwarzwald og Toscana. Betal kun hotellets faste halvpensjonspris (€35–€60/pers/dag) ved utsjekk.'
                    : 'Complimentary lodging for 2 guests at European wellness and boutique retreats. Pay only published fixed half-board (€35–€60/guest/day) at checkout.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {isNo ? '✓ Spar 6 700+ kr' : '✓ Save $650+ vs Booking'}
                </span>
                <Link
                  href="/spa-breaks"
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs transition-all flex items-center gap-1"
                >
                  <span>{isNo ? 'Hent verdikupong' : 'Claim Voucher'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Avtalens Nøkkelfordeler for Ansatte */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            {isNo
              ? `Inkluderte Rettigheter under ${org.shortName}-Avtalen:`
              : `Included Benefits under the ${org.shortName} Agreement:`}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {org.features.map((feat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
