'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MOCK_HOTELS, MEMBERSHIP_TIERS } from '@/lib/mockData';
import HeroSearch from '@/components/HeroSearch';
import SavingsCalculator from '@/components/SavingsCalculator';
import AuthModal from '@/components/AuthModal';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Castle,
  Laptop,
  Plane,
  Ship,
  Star,
  Check,
  ArrowRight,
  TrendingDown,
  Lock,
  Globe,
  Zap,
  CreditCard,
  MapPin,
  Compass
} from 'lucide-react';

const FEATURED_ESCAPES = [
  {
    id: 'bellagio-las-vegas',
    name: 'The Grand Bellagio & Casino Resort',
    location: 'Las Vegas Strip, NV',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    publicPrice: 389,
    netPrice: 198,
    savingsPct: 49,
    tag: '5★ Luxury Resort',
    link: '/hotels/bellagio-las-vegas'
  },
  {
    id: 'cancun-all-inclusive',
    name: 'Moon Palace All-Inclusive Luxury Resort',
    location: 'Cancun, Mexico',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    publicPrice: 510,
    netPrice: 235,
    savingsPct: 54,
    tag: 'All-Inclusive Family',
    link: '/hotels/cancun-all-inclusive'
  },
  {
    id: 'st-barts-villa',
    name: 'Villa L’Étoile & Private Beach Estate',
    location: 'St. Barts, Caribbean',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    publicPrice: 5800,
    netPrice: 3200,
    savingsPct: 45,
    tag: 'French Chef & Butler',
    link: '/villas'
  },
  {
    id: 'nomad-lisbon',
    name: 'Outsite Oceanfront Coliving & Studio',
    location: 'Lisbon, Portugal',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    publicPrice: 2100,
    netPrice: 1150,
    savingsPct: 45,
    tag: '1Gbps Fiber Wi-Fi',
    link: '/nomads'
  }
];

const MEMBER_POSTCARDS = [
  {
    name: 'Marcus & Victoria V.',
    location: 'St. Barts Vacation',
    saved: '$18,200',
    quote: 'Our French gourmet chef, butler, and airport buggy were all included. We saved over $18,000 on our New Year’s villa stay.',
    tier: 'Platinum Elite'
  },
  {
    name: 'Elena R.',
    location: 'Lisbon & Bali Coliving',
    saved: '$950 / mo',
    quote: 'The 1Gbps fiber Wi-Fi is rock-solid. Plus, the Schengen Sentinel saved me from an accidental overstay fine.',
    tier: 'Nomad Passport'
  },
  {
    name: 'The Richardson Family',
    location: 'Cancun All-Inclusive',
    saved: '$2,070',
    quote: 'Booked a 2-bedroom family suite for $235/night instead of $510 on Expedia. Our kids loved the waterpark.',
    tier: 'Gold VIP'
  }
];

export default function HomePage() {
  const { user, isMember } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="space-y-24 pb-24 font-sans text-slate-900 bg-white">
      {/* Clean, Elegant Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold tracking-wide border border-amber-500/30">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>The Private Wholesale Travel & Sovereign Banking Club</span>
          </div>

          {/* Clean Large Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Travel at Raw Wholesale. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              0% Retail Markup.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Public booking portals add a 20%+ retail ad markup. <strong>ATLAS</strong> grants private members raw B2B Bedbank wholesale pricing on 1M+ hotels, luxury villas, and nomad colivings.
          </p>

          {/* Centered Clean Search Bar */}
          <div className="pt-2">
            <HeroSearch />
          </div>

          {/* 3 Core Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> 1,000,000+ Hotels & Villas
              </div>
              <p className="text-xs text-slate-300 mt-1">Direct XML/REST Bedbank pipelines at 30% to 70% off retail.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-emerald-400 font-black text-sm flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> 0% FX Fees Visa® Card
              </div>
              <p className="text-xs text-slate-300 mt-1">Auto-deposited price-drop refunds and $650 delay payouts.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-sky-400 font-black text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Live Savings Proof Engine
              </div>
              <p className="text-xs text-slate-300 mt-1">Side-by-side Expedia rate audits certified with live timestamps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Wholesale Deals (Clean 4-Card Grid) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
              Trending This Week
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Wholesale Member Rates
            </h2>
          </div>
          <Link
            href="/hotels"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700"
          >
            <span>Explore All 1,000,000+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ESCAPES.map((deal) => (
            <Link
              key={deal.id}
              href={deal.link}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow">
                  SAVE {deal.savingsPct}%
                </div>
                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {deal.tag}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{deal.location}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {deal.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Expedia: ${deal.publicPrice}
                    </div>
                    <div className="text-base font-black text-emerald-600">
                      ${deal.netPrice} <span className="text-[10px] font-normal text-slate-400">/nt</span>
                    </div>
                  </div>
                  <span className="py-1.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    View
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: The 3-Step Wholesale Machine (Clean Layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
              The 360° Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How ATLAS Works in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-black text-base text-slate-900">Search Confidential Wholesale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter any destination to unlock confidential B2B Bedbank wholesale inventory with 0% retail markup (saving 30%–70% instantly).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-black text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-black text-base text-slate-900">Travel with 360° VIP Privileges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy airport fast-track customs, VIP lounge access ($32), instant Hilton Diamond status matches, and auto-refilled 5G eSIM data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-black text-base text-slate-900">Earn Cash While You Sleep</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our 24/7 Pruvo Sentinel auto-refunds price drops, AirHelp recovers $650 delay claims, and the club distributes annual profit dividends to your Visa card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Savings Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator />
      </section>

      {/* Section 5: Real Member Testimonials (Clean 3-Column) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Real Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            What Members Saved This Month
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBER_POSTCARDS.map((post, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{post.location}</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Saved {post.saved}
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{post.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{post.name}</span>
                <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {post.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Membership Tiers (Clean 4-Card Matrix) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Membership Plans
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Choose Your Access Tier
          </h2>
          <p className="text-xs text-slate-500">
            Every membership is backed by our 100% Rate Parity Guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                tier.isPopular
                  ? 'bg-slate-950 text-white border-amber-400 shadow-2xl scale-105 relative'
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                  Most Popular Pass
                </div>
              )}

              <div>
                <h3 className="font-black text-lg">{tier.name}</h3>
                <div className="text-2xl font-black mt-2">
                  ${tier.priceAnnual}
                  <span className="text-xs font-normal opacity-70"> /year</span>
                </div>
                <div className="text-xs text-emerald-500 font-bold mt-1">
                  Save {tier.wholesaleHotelDiscount}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/30 space-y-2 text-xs">
                  {tier.perksIncluded.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="opacity-90">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/membership"
                  className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 hover:from-amber-500 hover:to-amber-700 shadow-md'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Final Clean CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-amber-500/30 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto font-black shadow-lg">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-black">
            Stop Paying the 25% Retail Travel Tax.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Taking just 1 single trip pays for your entire annual Gold VIP membership. Join thousands of sovereign travelers who never pay retail markups again.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/membership"
              className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg transition-all"
            >
              Join ATLAS VIP Club
            </Link>
            <Link
              href="/proof"
              className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              See Live Rate Proof
            </Link>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
