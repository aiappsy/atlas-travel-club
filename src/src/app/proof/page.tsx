'use client';

import React, { useState } from 'react';
import { MOCK_PROOF_AUDITS, MOCK_LIVE_RECEIPTS } from '@/lib/mockData';
import { SavingsProofAudit } from '@/lib/types';
import {
  ShieldCheck,
  Zap,
  TrendingDown,
  Lock,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Globe,
  Coins,
  CreditCard,
  Scale,
  RefreshCw,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SavingsProofPage() {
  const [selectedAuditId, setSelectedAuditId] = useState<string>('proof-bellagio-vegas');
  const [urlInput, setUrlInput] = useState('');
  const [isAuditingUrl, setIsAuditingUrl] = useState(false);
  const [urlAuditResult, setUrlAuditResult] = useState<SavingsProofAudit | null>(null);

  // Annual ROI Slider (Trips per year)
  const [tripsPerYear, setTripsPerYear] = useState<number>(3);
  const [avgNightsPerTrip, setAvgNightsPerTrip] = useState<number>(4);

  const activeAudit = MOCK_PROOF_AUDITS.find((a) => a.id === selectedAuditId) || MOCK_PROOF_AUDITS[0];

  const handleAuditUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsAuditingUrl(true);
    setTimeout(() => {
      setIsAuditingUrl(false);
      setUrlAuditResult({
        id: 'custom-audit-' + Date.now(),
        hotelName: 'The Ritz-Carlton Central Park',
        city: 'New York, NY',
        country: 'USA',
        starRating: 5,
        dates: 'Next Weekend (3 Nights)',
        nights: 3,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        roomType: 'Deluxe Park View King Suite',
        publicProvider: 'Expedia',
        publicRetailPricePerNight: 895,
        publicTotalRetailPrice: 2685,
        retailMarketingMarkup: 1290,
        hotelsClubWholesalePerNight: 465,
        hotelsClubTotalPaid: 1395,
        instantCashSaved: 1290,
        savingsPercentage: 48,
        additionalCardBonuses: {
          priceDropProtection: 185,
          travelVaultDividends: 92.50,
          visaCashback: 55.80
        },
        totalNetValueDelivered: 1623.30,
        lastAuditedTimestamp: 'Just now (Audited Live from Bedbank Feed)',
        auditHash: '0x' + Math.random().toString(16).substring(2, 10) + '...verified'
      });
    }, 1200);
  };

  // ROI Calculations
  const estimatedSavingsPerNight = 165;
  const totalAnnualNights = tripsPerYear * avgNightsPerTrip;
  const totalAnnualSavings = totalAnnualNights * estimatedSavingsPerNight;
  const goldMembershipCost = 179; // $179/yr
  const netProfitForMember = totalAnnualSavings - goldMembershipCost;
  const returnOnInvestment = Math.round((totalAnnualSavings / goldMembershipCost) * 100);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Live Wholesale Savings Proof Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Cryptographically Audited Rates: Expedia vs. ATLAS
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Never wonder if you're getting the true wholesale price. Every rate is audited live against public OTA feeds and certified with real-time B2B Bedbank timestamps.
          </p>
        </div>
      </div>

      {/* Live Member Receipts Ticker */}
      <div className="bg-slate-900 text-slate-200 py-3 border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 text-xs overflow-x-auto scrollbar-none whitespace-nowrap">
          <span className="flex items-center gap-1.5 font-bold uppercase text-emerald-400 text-[10px] tracking-wider shrink-0 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Member Savings Stream:
          </span>

          <div className="flex items-center gap-6 text-[11px] text-slate-300">
            {MOCK_LIVE_RECEIPTS.map((rec) => (
              <span key={rec.id} className="flex items-center gap-1.5 shrink-0">
                <span className="font-bold text-white">{rec.memberNameMasked}</span>
                <span className="text-slate-400">saved</span>
                <strong className="text-emerald-400 font-mono">${rec.amountSaved}</strong>
                <span className="text-slate-400">on {rec.itemBooked}</span>
                <span className="text-[10px] text-slate-500">({rec.timestampAgo})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* SECTION 1: LIVE AUDIT COMPARISON CARDS */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Live Audited Hotel Rates
            </h2>
            <p className="text-xs text-slate-500">
              Select any destination below to inspect the raw B2B Bedbank feed vs. public retail pricing:
            </p>
          </div>

          {/* Audit Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {MOCK_PROOF_AUDITS.map((audit) => (
              <button
                key={audit.id}
                onClick={() => setSelectedAuditId(audit.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedAuditId === audit.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                📍 {audit.hotelName} ({audit.city})
              </button>
            ))}
          </div>

          {/* Detailed Side-by-Side Breakdown Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Hotel Photo & Basic Info */}
              <div className="md:col-span-5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={activeAudit.image}
                  alt={activeAudit.hotelName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                    {'⭐'.repeat(activeAudit.starRating)} {activeAudit.city}, {activeAudit.country}
                  </span>
                  <h3 className="font-extrabold text-xl leading-tight">{activeAudit.hotelName}</h3>
                  <div className="text-[11px] text-slate-300">{activeAudit.roomType}</div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    Dates: {activeAudit.dates}
                  </div>
                </div>
              </div>

              {/* Price & Markup Breakdown Table */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Live Pricing Audit</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Hash: {activeAudit.auditHash}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Public Price Row */}
                    <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/60 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-rose-950 flex items-center gap-1">
                          <span>Public Retail Price ({activeAudit.publicProvider})</span>
                          <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded font-mono">
                            Includes TV/Ad Markup
                          </span>
                        </div>
                        <div className="text-[10px] text-rose-700 mt-0.5">
                          ${activeAudit.publicRetailPricePerNight} / night × {activeAudit.nights} nights
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-rose-950">
                          ${activeAudit.publicTotalRetailPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* HotelsClub Wholesale Row */}
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border-2 border-emerald-500 flex items-center justify-between">
                      <div>
                        <div className="font-black text-emerald-950 flex items-center gap-1">
                          <span>HotelsClub Raw Net Wholesale Rate</span>
                          <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                            SAVE {activeAudit.savingsPercentage}%
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-800 mt-0.5">
                          ${activeAudit.hotelsClubWholesalePerNight} / night × {activeAudit.nights} nights (0% Markup)
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xl font-black text-emerald-700">
                          ${activeAudit.hotelsClubTotalPaid.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Instant Cash Saved Highlight */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-slate-800">
                      <span className="font-bold">Instant Cash Saved at Booking:</span>
                      <span className="font-mono font-black text-base text-emerald-600">
                        -${activeAudit.instantCashSaved.toLocaleString()}
                      </span>
                    </div>

                    {/* FinTech & Card Bonuses Added on Top */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                        Extra FinTech Cash Inflows Deposited Onto Member Visa Card:
                      </span>
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>🛡️ Post-Booking Price-Drop Guarantee:</span>
                        <span className="font-mono text-slate-800 font-bold">+${activeAudit.additionalCardBonuses.priceDropProtection}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>🏦 Travel Vault Annual Profit Dividend:</span>
                        <span className="font-mono text-slate-800 font-bold">+${activeAudit.additionalCardBonuses.travelVaultDividends}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>💳 Reloadable Visa Card FX Savings & Cashback:</span>
                        <span className="font-mono text-slate-800 font-bold">+${activeAudit.additionalCardBonuses.visaCashback}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Net Value Delivered:</div>
                    <div className="text-xl font-black text-slate-900 font-mono">
                      ${activeAudit.totalNetValueDelivered.toLocaleString()}
                    </div>
                  </div>

                  <Link
                    href={`/hotels`}
                    className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Book at Wholesale</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PASTE ANY URL INSTANT RATE AUDITOR */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl border border-indigo-800 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Live Rate Audit Tool
            </div>
            <h3 className="text-2xl font-black text-white">
              Paste Any Expedia or Booking.com Link
            </h3>
            <p className="text-xs text-slate-300">
              Test our wholesale engine right now. Paste any hotel URL or hotel name to see the un-marked up Bedbank price:
            </p>
          </div>

          <form onSubmit={handleAuditUrl} className="flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste hotel URL or name (e.g. Ritz-Carlton Central Park, Plaza Paris)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              disabled={isAuditingUrl}
              className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {isAuditingUrl ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing B2B Feeds...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Audit Wholesale Rate</span>
                </>
              )}
            </button>
          </form>

          {/* Audit Result Box */}
          {urlAuditResult && (
            <div className="p-6 bg-slate-800/90 rounded-2xl border border-amber-400/40 text-left space-y-4 animate-in zoom-in-95">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400">Live Audit Verified</span>
                  <h4 className="font-extrabold text-base text-white">{urlAuditResult.hotelName}</h4>
                  <div className="text-xs text-slate-300">{urlAuditResult.city} • {urlAuditResult.roomType}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">You Save:</span>
                  <div className="font-mono text-2xl font-black text-emerald-400">
                    ${urlAuditResult.instantCashSaved}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">Public Expedia Total:</span>
                  <span className="font-mono text-base font-bold text-white line-through">
                    ${urlAuditResult.publicTotalRetailPrice.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Wholesale Member Total:</span>
                  <span className="font-mono text-base font-black text-emerald-400">
                    ${urlAuditResult.hotelsClubTotalPaid.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">Total Net Value:</span>
                  <span className="font-mono text-base font-black text-amber-400">
                    ${urlAuditResult.totalNetValueDelivered.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: ANNUAL ROI CALCULATOR */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              Will HotelsClub Membership Pay for Itself?
            </h3>
            <p className="text-xs text-slate-500">
              Calculate your personal return on investment (ROI) based on how often you travel:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>How many trips do you take per year?</span>
                  <span className="font-mono font-black text-sm text-indigo-600">{tripsPerYear} Trips</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={tripsPerYear}
                  onChange={(e) => setTripsPerYear(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Average nights per trip:</span>
                  <span className="font-mono font-black text-sm text-indigo-600">{avgNightsPerTrip} Nights</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={avgNightsPerTrip}
                  onChange={(e) => setAvgNightsPerTrip(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 space-y-1">
                <div>Total Nights Traveling per Year: <strong>{totalAnnualNights} Nights</strong></div>
                <div>Average Wholesale Savings: <strong>~$165 / night</strong></div>
                <div>Gold VIP Annual Membership Cost: <strong>$179 / year ($14.90/mo)</strong></div>
              </div>
            </div>

            {/* Big ROI Result Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white text-center space-y-4 shadow-xl">
              <div>
                <span className="text-xs font-black uppercase text-emerald-100 tracking-wider">
                  Your Estimated Annual Cash Savings:
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono mt-1">
                  ${totalAnnualSavings.toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-slate-950/20 rounded-2xl border border-white/20 text-xs space-y-1">
                <div>Net Profit After Membership Fee: <strong className="text-amber-300 font-mono text-sm">+${netProfitForMember.toLocaleString()}</strong></div>
                <div>Membership Return on Investment: <strong className="text-white font-mono text-sm">{returnOnInvestment}% ROI</strong></div>
              </div>

              <p className="text-[11px] text-emerald-100 leading-tight">
                ✨ <strong>Your membership pays for itself on your very first trip</strong>, leaving you with thousands in pure savings and Visa card equity for the rest of the year!
              </p>

              <Link
                href="/membership"
                className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all inline-flex items-center justify-center gap-1.5"
              >
                <span>Unlock VIP Wholesale Rates Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
