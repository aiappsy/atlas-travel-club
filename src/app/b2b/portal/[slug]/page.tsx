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

export default function OrganizationPortalPage({
  params,
}: {
  params: { slug: string };
}) {
  const org = getOrganizationBySlug(params.slug);
  const [workEmail, setWorkEmail] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'verified' | 'invalid'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights'>('hotels');

  if (!org) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Organisasjonsportalen ble ikke funnet</h2>
        <p className="text-xs text-slate-400">
          Det finnes ingen aktiv bedriftsavtale for koden &quot;{params.slug}&quot;.
        </p>
        <Link
          href="/b2b"
          className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
        >
          Se alle bedriftsavtaler ➔
        </Link>
      </div>
    );
  }

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = workEmail.trim().toLowerCase();
    if (!clean.includes('@')) {
      setAuthStatus('invalid');
      setFeedbackMsg('Vennligst oppgi en gyldig e-postadresse.');
      return;
    }

    const domain = clean.split('@')[1];
    const isDomainAllowed = org.allowedEmailDomains.some(
      (d) => d.toLowerCase() === domain
    );

    if (isDomainAllowed) {
      setAuthStatus('verified');
      setFeedbackMsg(
        `✓ Verifisert! Din e-post (${clean}) er godkjent under ${org.shortName} sin fellesavtale. Tilgang er aktivert.`
      );
    } else {
      setAuthStatus('invalid');
      setFeedbackMsg(
        `Kun e-postadresser som slutter på @${org.allowedEmailDomains.join(' eller @')} er godkjent for denne portalen.`
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
              <span>Akkreditert Closed User Group (CUG) • 0% Påslag</span>
            </div>
          </div>

          {/* Headline & Welcome message */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {org.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                Eksklusiv Reise- &amp; Hotellportal
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {org.customWelcomeMessage}
            </p>
          </div>

          {/* Quick Metrics & Whitelist Pill */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Godkjent Domene</span>
              <span className="text-white font-mono font-bold">@{org.allowedEmailDomains.join(', @')}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Avtalefordel</span>
              <span className="text-emerald-400 font-bold">{org.discountPercentage}% Rabatt på Engros</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Akkumulert Sparing YTD</span>
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
                Aktiver Tilgang med Din Jobb-E-post
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ingen personlig betaling kreves. Skriv inn din e-postadresse under @{org.allowedEmailDomains[0]} for umiddelbar adgang.
              </p>
            </div>
            {authStatus === 'verified' && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Aktiv Konsernbruker
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
                placeholder={`fornavn.etternavn@${org.allowedEmailDomains[0]}`}
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verifiser &amp; Lås Opp Engrospriser</span>
              </button>
            </form>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center justify-between">
              <span>{feedbackMsg}</span>
              <button
                onClick={() => setAuthStatus('idle')}
                className="text-[11px] underline text-slate-400 hover:text-white cursor-pointer ml-3 shrink-0"
              >
                Bytt e-post
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
              <span>Hoteller (1M+ Engrosrom)</span>
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
              <span>Fly (Duffel NDC + EU261 Sentinel)</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Status: <span className="text-emerald-400 font-bold">B2B Engros Tilgang Aktiv</span>
          </span>
        </div>

        {activeTab === 'hotels' ? (
          <div className="bg-slate-900/60 p-4 rounded-3xl border border-slate-800">
            <LiveHotelSearch initialDestination="Oslo" />
          </div>
        ) : (
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Direkte NDC Flyavtaler med EU261-Beskyttelse</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Søk og bestill forretningsreiser og ferier direkte hos flyselskapene uten fordyrende GDS-tillegg eller OTA-kortgebyrer. Alle billetter registreres automatisk i Atlas Sentinel for forsinkelseserstatning inntil €600 per passasjer.
            </p>
            <Link
              href="/flights"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md"
            >
              <span>Åpne Fullstendig Flyhub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* 4. Avtalens Nøkkelfordeler for Ansatte */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Inkluderte Rettigheter under {org.shortName}-Avtalen:
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
