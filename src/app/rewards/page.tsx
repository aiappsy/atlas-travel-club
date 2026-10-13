'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { REWARDS_CONFIG } from '@/lib/rewards/rules';

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
      title: isNo ? 'Four Seasons Madrid (3 Netter)' : 'Four Seasons Madrid (3 Nights)',
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
      title: isNo ? 'Velkomstbonus: Founder Medlemskap' : 'Welcome Grant: Founder Member Invitation',
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
                <span>{isNo ? 'Privat Medlemshvelv' : 'Private Member Vault'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {isNo ? 'ATLAS Club Credits & Belønninger' : 'ATLAS Club Credits & Rewards'}
              </h1>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                {isNo
                  ? 'Dine opptjente reisekreditter kan benyttes mot hoteller, fly, cruise og leiebiler med opptil 50 % dekning.'
                  : 'Your accumulated travel credits can be redeemed against hotels, flights, cruises, and car rentals up to 50% co-pay.'}
              </p>
            </div>

            <Link
              href="/hotels"
              className="px-6 py-3 rounded-2xl bg-slate-900 text-amber-300 hover:bg-slate-800 text-xs font-bold tracking-widest uppercase transition-all shadow-sm shrink-0 text-center"
            >
              {isNo ? 'Bruk Poeng på Reise →' : 'Redeem on Travel →'}
            </Link>
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
              {isNo ? 'Tilgjengelig for Bruk' : 'Available to Spend'}
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {wallet.pointsBalance.toLocaleString()} <span className="text-lg font-bold text-slate-500">pts</span>
            </div>
            <div className="text-sm font-semibold text-emerald-700 mt-2">
              ≈ {isNo ? `${nokAvailable} NOK` : `$${cashAvailable} USD`}
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              {isNo ? 'Klar til å trekkes fra i kassen.' : 'Ready to apply directly at checkout.'}
            </p>
          </div>

          {/* PENDING CLEARANCE */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2">
              <span>⏳</span>
              {isNo ? 'Påventer Reiseavslutning' : 'Pending Clearance'}
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {wallet.pendingPoints.toLocaleString()} <span className="text-lg font-bold text-slate-500">pts</span>
            </div>
            <div className="text-sm font-semibold text-amber-800 mt-2">
              ≈ {isNo ? `${nokPending} NOK` : `$${cashPending} USD`}
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              {isNo
                ? 'Krediteres 14 dager etter fullført seiling/opphold.'
                : 'Matures 14 days after completed voyage or stay.'}
            </p>
          </div>

          {/* LIFETIME METRICS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {isNo ? 'Livstidsstatistikk' : 'Lifetime Metrics'}
            </div>
            <div className="space-y-3 mt-4 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">{isNo ? 'Totalt Opptjent' : 'Total Earned'}:</span>
                <span className="font-bold text-slate-900">{wallet.lifetimeEarned.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isNo ? 'Totalt Innvekslet' : 'Total Redeemed'}:</span>
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
            {isNo ? 'Vilkår for Bruk av Club Credits' : 'Club Credits Redemption Rules'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? '50 % Dekningstak' : '50% Co-Pay Cap'}</div>
              {isNo
                ? 'Kreditter kan dekke inntil 50 % av totalbeløpet per bestilling. Resterende 50 % betales med ordinært kort.'
                : 'Credits can cover up to 50% of any booking total. Remaining 50% is covered with standard card.'}
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? 'Minsteuttak' : 'Minimum Threshold'}</div>
              {isNo
                ? 'Minimum 5 000 poeng (500 NOK / $50) for å aktivere innveksling. Trinnvis i 1 000 poeng.'
                : 'Minimum 5,000 points ($50 USD) to unlock redemption, redeemable in 1,000 pt increments.'}
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60">
              <div className="font-bold text-slate-900 mb-1">{isNo ? '18 Måneders Gyldighet' : '18-Month Active Window'}</div>
              {isNo
                ? 'Poeng fornyes automatisk ved hver nye bestilling eller fornyelse av årsmedlemskap.'
                : 'Points automatically roll over with any new booking activity or annual renewal.'}
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
