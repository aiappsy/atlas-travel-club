'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { REWARDS_CONFIG } from '@/lib/rewards/rules';
import { Palmtree, Coffee, ArrowRight, Sparkles, ShieldCheck, Wine, Hotel } from 'lucide-react';
import RewardsPodcastDeepDive from '@/components/RewardsPodcastDeepDive';

export default function RewardsPage() {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  // Demo active wallet state for Member
  const wallet = {
    tier: 'FOUNDER',
    pointsBalance: 42500,        // 42,500 pts = $425.00 USD
    pendingPoints: 79000,        // 79,000 pts = $790.00 USD (Regent Cruise pending travel completion)
    lifetimeEarned: 135000,
    lifetimeRedeemed: 13500,
  };

  const cashAvailable = (wallet.pointsBalance * REWARDS_CONFIG.USD_PER_POINT).toFixed(2);
  const nokAvailable = (wallet.pointsBalance * REWARDS_CONFIG.NOK_PER_POINT).toFixed(0);
  const cashPending = (wallet.pendingPoints * REWARDS_CONFIG.USD_PER_POINT).toFixed(2);
  const nokPending = (wallet.pendingPoints * REWARDS_CONFIG.NOK_PER_POINT).toFixed(0);

  const transactions = [
    {
      id: 'tx-1',
      date: '10. Okt 2026',
      title: isNo ? 'Regent Seven Seas Cruise (Lugar 824)' : 'Regent Seven Seas Cruise (Suite 824)',
      type: isNo ? '🟡 Påventer seiling' : '🟡 Pending Sailing',
      points: '+79,000',
      value: '+$790.00',
      statusClass: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'tx-2',
      date: '02. Okt 2026',
      title: isNo ? 'Four Seasons Madrid (3 netter)' : 'Four Seasons Madrid (3 Nights)',
      type: isNo ? '🟢 Bekreftet & Klar' : '🟢 Cleared to Spend',
      points: '+12,500',
      value: '+$125.00',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'tx-3',
      date: '28. Sep 2026',
      title: isNo ? 'Innvekslet på Emirates Business Class' : 'Redeemed on Emirates Business Class',
      type: isNo ? '🔴 Benyttet' : '🔴 Redeemed',
      points: '-13,500',
      value: '-$135.00',
      statusClass: 'text-slate-600 bg-slate-100 border-slate-200',
    },
    {
      id: 'tx-4',
      date: '15. Sep 2026',
      title: isNo ? 'Velkomstbonus: Founder-medlemskap' : 'Welcome Grant: Founder Member Invitation',
      type: isNo ? '🟢 Bekreftet & Klar' : '🟢 Cleared to Spend',
      points: '+30,000',
      value: '+$300.00',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3">
                <span>👑</span>
                <span>{isNo ? 'Mine medlemsfordeler' : 'Private Member Vault'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Atlas Kickback og opptjente fordeler' : 'ATLAS Club Credits & Rewards'}
              </h1>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                {isNo
                  ? 'Dine opptjente reisekreditter fra cruise og leiebil samles her. Saldoen motregnes automatisk mot din neste årskontingent (1 290 kr) i Stripe – eller kan overføres til din bankkonto ved overskudd!'
                  : 'Your earned travel kickbacks from cruises and car rentals accumulate here. Your balance automatically offsets your next annual renewal (1 290 NOK) in Stripe, or can be cashed out on surplus!'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                <span>✓</span> {isNo ? 'Automatisk fornyelse aktiv' : 'Stripe Auto-Renewal Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        {/* VAULT BALANCE OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* AVAILABLE SPENDABLE */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {isNo ? 'Tilgjengelig saldo' : 'Available to Spend'}
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {wallet.pointsBalance.toLocaleString()} <span className="text-lg font-bold text-slate-500">pts</span>
            </div>
            <div className="text-sm font-semibold text-emerald-700 mt-2">
              ≈ {isNo ? `${nokAvailable} NOK` : `$${cashAvailable} USD`}
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              {isNo ? 'Trekkes automatisk fra din neste årskontingent (1 290 kr) i Stripe.' : 'Automatically deducted from your next annual renewal (1 290 NOK) in Stripe.'}
            </p>
          </div>

          {/* PENDING CLEARANCE */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2">
              <span>⏳</span>
              {isNo ? 'Under opptjening' : 'Pending Clearance'}
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {wallet.pendingPoints.toLocaleString()} <span className="text-lg font-bold text-slate-500">pts</span>
            </div>
            <div className="text-sm font-semibold text-amber-800 mt-2">
              ≈ {isNo ? `${nokPending} NOK` : `$${cashPending} USD`}
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              {isNo
                ? 'Godskrives 30–45 dager etter gjennomført reise ved fullført partneroppgjør.'
                : 'Matures 30–45 days post-travel upon partner supplier reconciliation.'}
            </p>
          </div>

          {/* LIFETIME METRICS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {isNo ? 'Samlet oversikt' : 'Lifetime Metrics'}
            </div>
            <div className="space-y-3 mt-4 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">{isNo ? 'Totalt opptjent' : 'Total Earned'}:</span>
                <span className="font-bold text-slate-900">{wallet.lifetimeEarned.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isNo ? 'Totalt benyttet' : 'Total Redeemed'}:</span>
                <span className="font-bold text-slate-900">{wallet.lifetimeRedeemed.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isNo ? 'Medlemsnivå' : 'Club Tier'}:</span>
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {wallet.tier} (10% Back)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LIQUIDITY & RULES GUARD NOTIFICATION */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span>🛡️</span>
            {isNo ? 'Slik fungerer Atlas Travel Kickback' : 'How Atlas Travel Kickback Works'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? 'Automatisk motregning' : 'Stripe Auto-Renewal'}</div>
              {isNo
                ? 'Opptjente kreditter legges direkte inn på din Stripe-konto og trekkes automatisk fra din 1 290 kr årsfaktura ved fornyelse.'
                : 'Earned kickbacks are credited to your Stripe customer balance and automatically offset your 1 290 NOK annual renewal.'}
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? '30–45 dagers avstemming' : '30–45 Day Settlement'}</div>
              {isNo
                ? 'Provisjoner fra rederier og leiebilselskaper frigis etter at reisen er gjennomført og partneroppgjøret er godkjent.'
                : 'Commissions from cruise lines and car rentals clear once the journey is completed and reconciled with the supplier.'}
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? 'Utbetaling ved overskudd' : 'Cash Payout on Surplus'}</div>
              {isNo
                ? 'Har du opptjent mer enn årskontingenten (1 290 kr), kan du overføre det overskytende beløpet direkte til din bankkonto.'
                : 'Any earned balance exceeding your annual renewal (1 290 NOK) can be withdrawn directly to your bank account.'}
            </div>
          </div>
        </div>

        {/* PODCAST DEEP DIVE & INSTITUTIONAL RESEARCH HUB */}
        <RewardsPodcastDeepDive />

        {/* REDEMPTION SPENDING OPTIONS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isNo ? 'Bruk dine poeng' : 'Spend Your Points'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Hva kan du løse inn dine opptjente poeng i?' : 'What can you redeem your points for?'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* OPTION 1: RESORTS */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/40 to-slate-50 border border-amber-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-600 font-bold">
                  <Palmtree className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isNo ? '7 netter ferieleilighet' : '7-Night Resort Week'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isNo
                      ? 'Løs inn 3 500 poeng for en hel uke i Spania, Hellas, Portugal eller Italia for hele familien.'
                      : 'Redeem 3,500 points for a full 7-night condo week in Spain, Greece, Portugal, or Italy.'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/50 flex items-center justify-between">
                <span className="text-xs font-black text-amber-900">3 500 pts</span>
                <Link
                  href="/resorts"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900"
                >
                  <span>{isNo ? 'Se resorts' : 'View'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* OPTION 2: HOTEL BREAKS (CONNEX / HOLIDAY PLUS) */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50/40 to-slate-50 border border-purple-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-600 font-bold">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isNo ? 'Atlas Hotellopphold' : 'Atlas Hotel Breaks'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isNo
                      ? 'Bo gratis på 1 500 kvalitetshoteller for 2 personer. Dere betaler kun for maten på hotellet.'
                      : 'Complimentary double room stays for 2 at 1,500 curated partner hotels. Pay only for on-site dining.'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-200/50 flex items-center justify-between">
                <span className="text-xs font-black text-purple-900">0 kr rompris</span>
                <Link
                  href="/hotel-breaks"
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
                >
                  <span>{isNo ? 'Hent pass' : 'Claim'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* OPTION 3: LOUNGES */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-50/40 to-slate-50 border border-sky-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-600 font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isNo ? 'DragonPass Lounger' : 'DragonPass Lounges'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isNo
                      ? 'Umiddelbar digital QR-kode til 1 400+ flyplasslounger verden over. Mat, drikke og ro før avgang.'
                      : 'Instant digital QR code for 1,400+ airport lounges worldwide. Complimentary dining & quiet zones.'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-sky-200/50 flex items-center justify-between">
                <span className="text-xs font-black text-sky-900">330 pts (330 kr)</span>
                <Link
                  href="/lounges"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900"
                >
                  <span>{isNo ? 'Bestill pass' : 'Redeem'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* OPTION 4: STRIPE AUTO-OFFSET */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/40 to-slate-50 border border-emerald-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-600 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isNo ? 'Kontingent-offset' : 'Renewal Offset'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isNo
                      ? 'Saldoen din dekker automatisk årskontingenten på 1 290 kr. Har du 1 290 poeng er medlemskapet gratis.'
                      : 'Your balance automatically credits your 1 290 NOK annual renewal in Stripe for a free year.'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/50 flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900">1 pt = 1 kr</span>
                <span className="text-xs font-bold text-emerald-700">Aktiv som standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEDGER ACTIVITY HISTORY */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            {isNo ? 'Transaksjonshistorikk' : 'Transaction Activity'}
          </h2>
          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-900">{tx.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{tx.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tx.statusClass}`}>
                    {tx.type}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">{tx.points} pts</div>
                    <div className="text-xs text-slate-500 font-medium">{tx.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
