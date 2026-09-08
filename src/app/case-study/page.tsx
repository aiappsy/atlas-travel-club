'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  Building2,
  TrendingDown,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Sparkles,
  Compass,
  Laptop,
  Users,
  Briefcase,
  ChevronRight,
  Lock,
  Globe,
  Coins
} from 'lucide-react';

export default function CaseStudyPage() {
  const [stayNights, setStayNights] = useState<number>(3);
  const wholesalePerNight = 198;
  const markupPerNight = 191;
  const retailPerNight = wholesalePerNight + markupPerNight;

  const totalWholesale = stayNights * wholesalePerNight;
  const totalMarkup = stayNights * markupPerNight;
  const totalRetail = stayNights * retailPerNight;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Editorial Hero Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              ATLAS Institute of Travel Economics • Academic Case Study
            </div>

            <a
              href="/ATLAS_Case_Study_Rate_Parity.pdf"
              download="ATLAS_Case_Study_Rate_Parity.pdf"
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Publication PDF (6 Pages)</span>
            </a>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Unmasking Rate Parity: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              The Invisible Hand of Global Travel Pricing
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive economic analysis of the $1.2 Trillion OTA cartel, the artificial "Rate Parity" pricing floor, and how private closed-loop B2B networks enable institutional travel arbitrage.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs text-slate-400 border-t border-slate-800/80">
            <div><strong>Author:</strong> ATLAS Economic Research Group</div>
            <div>•</div>
            <div><strong>Classification:</strong> Travel Sovereignty & Financial Arbitrage</div>
            <div>•</div>
            <div><strong>Updated:</strong> August / September 2026</div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Chapter 1: The Hidden Hook */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">1</span>
            The Hidden Hook
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Does Your Hotel Room Cost What It Does?
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            For the modern traveler, the <strong>"Retail Trap"</strong> is an invisible tax. As framed in the <em>Sovereign Travel Manifesto</em>, paying standard retail prices for a hotel room is effectively a <strong>"voluntary tax"</strong> levied not by the state, but by the "OTA Cartel"—a dominant group of Online Travel Agencies including Expedia, Booking.com, and Hotels.com. These platforms maintain an iron grip on the market by imposing an artificial retail markup that typically ranges from <strong>18% to 25%</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2">
            <div className="font-bold text-xs flex items-center gap-2 uppercase tracking-wide text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Key Economic Insight: The Marketing Subsidy
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              Retail markups exist primarily as a marketing subsidy. These funds do not improve the guest experience, upgrade the room quality, or pay hotel staff; instead, they finance the OTA Cartel’s aggressive customer acquisition strategies, including multi-million-dollar football stadium sponsorships and pervasive Google Search advertising.
            </p>
          </div>
        </section>

        {/* Chapter 2: Decoding Rate Parity */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-600">
            <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs">2</span>
            Decoding the Concept
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            What is Rate Parity?
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Rate parity is defined as the contractual requirement to maintain price consistency for the same travel product across every distribution channel. While presented by OTAs as a tool for "brand consistency," it serves as the primary obstacle to travelers seeking wholesale entry points.
          </p>

          {/* Parity Comparison Matrix */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Booking Channel</th>
                  <th className="p-4">Price Requirement</th>
                  <th className="p-4">Economic Penalty for Violation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-600" /> Direct Hotel Website
                  </td>
                  <td className="p-4 text-slate-600">Required to match OTA rates identically.</td>
                  <td className="p-4 text-rose-600 font-semibold">
                    <strong>Digital Invisibility:</strong> OTAs suppress the hotel’s listing or remove them entirely from search rankings.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-600" /> Online Travel Agency (OTA)
                  </td>
                  <td className="p-4 text-slate-600">Contractually demands price identity to ensure they are never undercut.</td>
                  <td className="p-4 text-slate-600">Retains 18%–25% commission while capturing guest data.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-600" /> Third-Party Reseller
                  </td>
                  <td className="p-4 text-slate-600">Sustains identical pricing to protect retail margins.</td>
                  <td className="p-4 text-slate-600">Prevents open-market price competition across intermediaries.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Chapter 3: Interactive Financial Anatomy Calculator */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">3</span>
              Financial Anatomy Calculator
            </div>
            <div className="text-xs text-slate-400 font-mono">Real B2B Bedbank Clearing Formula</div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              The True Anatomy of a Booking: Retail vs. Wholesale
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Adjust the stay duration below to simulate the exact amount of capital extracted by the retail ad tax.
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="space-y-3 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Length of Stay: <strong className="text-amber-300 font-mono text-base">{stayNights} Nights</strong></span>
              <span className="text-slate-400 text-xs">Average 5-Star Luxury Property</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={stayNights}
              onChange={(e) => setStayNights(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Dynamic 3-Column Cost Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase">1. Raw B2B Wholesale Net</div>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">${totalWholesale}</div>
              <div className="text-xs text-slate-300 mt-1">${wholesalePerNight}/night clearing cost on Bedbanks.</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/90 border border-rose-500/30">
              <div className="text-[11px] font-bold text-rose-400 uppercase">2. The OTA Marketing Ad Tax</div>
              <div className="text-2xl font-black text-rose-400 mt-1 font-mono">+${totalMarkup}</div>
              <div className="text-xs text-slate-300 mt-1">${markupPerNight}/night extracted for Google ads & TV.</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/90 border border-amber-500/30">
              <div className="text-[11px] font-bold text-amber-400 uppercase">3. Total Public Retail Price</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">${totalRetail}</div>
              <div className="text-xs text-slate-300 mt-1">Final price on Expedia/Hotels.com ($389/nt).</div>
            </div>
          </div>

          {/* Net Extracted Loss Pill */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <div className="text-xs font-black uppercase text-emerald-400">Total Capital Reclaimable by ATLAS Members:</div>
              <div className="text-lg sm:text-xl font-black text-white">
                You save <span className="text-emerald-400 font-mono">${totalMarkup}</span> on this {stayNights}-night stay.
              </div>
            </div>
            <Link
              href="/hotels"
              className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow transition-all"
            >
              Search Wholesale Rates
            </Link>
          </div>
        </section>

        {/* Chapter 4: Global Regulatory Shifts & The French Intervention */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs">4</span>
            Global Regulatory Precedents
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The French Intervention: Banning Rate Parity Clauses
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            In 2015, the French government intervened to restore market competition by legally banning rate parity clauses (<em>Loi Macron</em>). This landmark legislative shift fundamentally altered the power dynamic, allowing French hotels to bypass the OTA Cartel’s pricing mandates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-xs text-slate-900">1. Restored Sovereignty</div>
              <p className="text-xs text-slate-500">Hotels regained the legal right to set their own prices based on direct supply and demand.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-xs text-slate-900">2. Market Equilibrium</div>
              <p className="text-xs text-slate-500">OTAs were forced to compete on service quality rather than enforced price monopolies.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-xs text-slate-900">3. Direct Consumer Savings</div>
              <p className="text-xs text-slate-500">Travelers gained the ability to access lower rates by booking directly through the hotel.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-extrabold text-base text-slate-900">The Modern Strategy: Value-Added Bundling</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When the "Rate Parity" trap prevents a hotel from lowering the raw room rate on the open web, they pivot to <strong>Value-Added Competition</strong>. A $20 complimentary breakfast or suite upgrade costs the hotel far less than paying a $100–$150 OTA cash commission.
            </p>
          </div>
        </section>

        {/* Chapter 5: The B2B Bedbank & Closed-Loop Revolution */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-600">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs">5</span>
            The Closed-Loop Revolution
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The 4 Pillars of Sovereign Travel Infrastructure
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>"Travel Sovereignty"</strong> is the strategic transition from paying voluntary taxes to capturing raw wholesale net pricing. Under international antitrust law, password-protected membership organizations are legally classified as closed-loop networks and are <strong>100% EXEMPT from Rate Parity agreements</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                1. Wholesale Liquidity Access
              </div>
              <p className="text-xs text-slate-600">
                Direct XML integration into B2B Bedbanks (Hotelbeds, WebBeds), bypassing the 18%–25% retail markup across 1,000,000+ properties.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-sky-600" />
                2. Price-Drop Arbitrage
              </div>
              <p className="text-xs text-slate-600">
                24/7 background sentinel that tracks wholesale fluctuations post-booking, automatically re-securing lower rates and issuing refunds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-teal-600" />
                3. The Schengen Sentinel
              </div>
              <p className="text-xs text-slate-600">
                Automated rolling-window 90/180-day compliance engine and nomad visa integration (Spain, Portugal, Dubai) for global nomads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                4. Aura AI Concierge
              </div>
              <p className="text-xs text-slate-600">
                Proactive AI layer optimizing the temporal and financial ROI of every trip, itinerary gaps, and automated flight delay claims.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 6: Financial Arbitrage Across 4 Segments */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">6</span>
            Segment Arbitrage Case Studies
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Reclaiming Travel Alpha: 4 Case Studies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                Ultra-Luxury & Lifestyle Connoisseur
              </div>
              <div className="text-[11px] font-bold text-amber-800">Saved: $18,200 on St. Barts Beachfront Estate</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct reclamation of the 25% "luxury tax" into private liquidity. French gourmet chef, butler, and airport chauffeur included free.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-teal-600" />
                Global Digital Nomad
              </div>
              <div className="text-[11px] font-bold text-teal-800">Saved: $950 / month on 1Gbps Coliving</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cost-of-living arbitrage across Lisbon and Bali with automated Schengen Sentinel compliance and free 10GB monthly 5G eSIM.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                Smart Family Vacationers
              </div>
              <div className="text-[11px] font-bold text-sky-800">Saved: $2,070 on 2-Bedroom Family Suite</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capturing the $191/night "ad tax" as family equity; transforming vacation spend into a high-yield savings event with waterpark access.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-200 space-y-2">
              <div className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Corporate Road Warrior
              </div>
              <div className="text-[11px] font-bold text-indigo-800">Saved: $1,480 on Manhattan 5★ Stay</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conversion of corporate travel budgets into private equity through Aura’s price-drop reclamation and $650 flight delay payouts.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 7: The Learner's Synthesis & Final Action */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl space-y-8">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-amber-400 tracking-wider">
              7. Final Synthesis • The Learner's Toolkit
            </div>
            <h2 className="text-2xl sm:text-4xl font-black">
              The 3 Essential Truths of Travel Economics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-black text-amber-300 text-sm">1. Retail is a Subsidy</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The public price is not the cost of hospitality; it is the cost of the advertisement that caught your attention.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-black text-sky-300 text-sm">2. Parity is an Artificial Floor</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parity protects the OTA Cartel from the price-dropping power of direct wholesale net inventory.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-black text-emerald-300 text-sm">3. Wholesale is Private Equity</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                By bypassing the middleman, you reclaim capital into private liquidity and real cash dividends.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-white">Ready to Move Outside the Walled Garden?</div>
              <div className="text-xs text-slate-400">Choose between our instant Digital Pass or Cardholder VIP Edition.</div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/membership"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg transition-all"
              >
                Join ATLAS VIP Club
              </Link>
              <Link
                href="/proof"
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
              >
                Inspect Live Rate Proof
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
