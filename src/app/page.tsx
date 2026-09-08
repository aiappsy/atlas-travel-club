'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MOCK_HOTELS, MEMBERSHIP_TIERS } from '@/lib/mockData';
import LiveHotelSearch from '@/components/LiveHotelSearch';
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
  Compass,
  BookOpen,
  Download,
  Award
} from 'lucide-react';

const FEATURED_ESCAPES = [
  {
    id: 'bellagio-vegas',
    name: 'The Bellagio Resort & Luxury Casino',
    city: 'Las Vegas, NV',
    image: 'https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=800&q=80',
    stars: 5,
    rating: 9.4,
    retailPrice: 389,
    wholesalePrice: 198,
    savings: '49%',
    category: 'Luxury Casino Resort'
  },
  {
    id: 'ritz-paris',
    name: 'Ritz Paris Place Vendôme',
    city: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    stars: 5,
    rating: 9.8,
    retailPrice: 1120,
    wholesalePrice: 640,
    savings: '43%',
    category: 'Palace Suite'
  },
  {
    id: 'atlantis-the-royal',
    name: 'Atlantis The Royal Palm',
    city: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    stars: 5,
    rating: 9.6,
    retailPrice: 890,
    wholesalePrice: 510,
    savings: '43%',
    category: 'Ultra-Luxury Beachfront'
  },
  {
    id: 'faena-miami',
    name: 'Faena Hotel Miami Beach',
    city: 'Miami Beach, FL',
    image: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=800&q=80',
    stars: 5,
    rating: 9.5,
    retailPrice: 740,
    wholesalePrice: 390,
    savings: '47%',
    category: 'Oceanfront Art Deco'
  }
];

const MEMBER_POSTCARDS = [
  {
    name: 'Christian V.',
    location: 'Zurich, Switzerland',
    hotel: 'The Ritz-Carlton, Kyoto',
    saved: '$1,840',
    quote: 'Booked 5 nights in Kyoto. Saved $1,840 compared to Booking.com. The concierge had Japanese green tea waiting in our suite.',
    tier: 'Platinum Nomad'
  },
  {
    name: 'Elena & Marcus B.',
    location: 'London, UK',
    hotel: 'Faena Hotel Miami Beach',
    saved: '$1,420',
    quote: 'We used the 0% FX Visa card across Miami and saved 3% on every meal, plus $350/night off our oceanfront suite.',
    tier: 'Gold VIP'
  },
  {
    name: 'Henrik & Silje T.',
    location: 'Oslo, Norway',
    hotel: 'Villa D’Este, Lake Como',
    saved: '$2,350',
    quote: 'Raw wholesale prices with no retail markups. 3 nights at Lake Como paid for our annual membership 10x over.',
    tier: 'Gold VIP'
  }
];

export default function HomePage() {
  const { user, isMember } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [editionType, setEditionType] = useState<'digital' | 'card'>('digital');

  return (
    <div className="space-y-20 pb-24 font-sans text-slate-900 bg-slate-50">
      {/* 1. High-Impact Luxury Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30 shadow-sm">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>The Private Wholesale Travel & Sovereign Banking Club</span>
          </div>

          {/* Large Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight max-w-5xl mx-auto">
            Travel at Raw Wholesale. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              0% Retail Markup.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Public booking portals add an 18%–25% retail ad markup. <strong>ATLAS</strong> lets you compare real-time prices across <strong>Expedia, Hotels.com, Agoda & Kayak</strong> against confidential B2B Bedbank clearing rates.
          </p>

          {/* Standard Live Travel Search & Real Multi-OTA Price Checker */}
          <div className="pt-2 text-left max-w-5xl mx-auto">
            <LiveHotelSearch initialDestination="Las Vegas" />
          </div>

          {/* 3 Core Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto pt-6 text-left">
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

      {/* 2. Featured Wholesale Deals Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
              Curated Escapes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Wholesale Member Rates
            </h2>
          </div>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700"
          >
            <span>Explore All 1,000,000+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ESCAPES.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                  {hotel.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow">
                  SAVE {hotel.savings}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{hotel.city}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                    {hotel.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      Expedia: ${hotel.retailPrice}/nt
                    </div>
                    <div className="text-lg font-black text-slate-900 font-mono">
                      ${hotel.wholesalePrice}
                      <span className="text-xs font-normal text-slate-500"> /nt</span>
                    </div>
                  </div>

                  <Link
                    href="/hotels"
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    View Rate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How ATLAS Works (3 Clean Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
              The Sovereign Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How ATLAS Works in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-black text-base text-slate-900">Search Confidential Wholesale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter any destination to unlock confidential B2B Bedbank wholesale inventory with 0% retail markup (saving 30%–70% instantly).
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-black text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-black text-base text-slate-900">Travel with 360° VIP Privileges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy airport fast-track customs, VIP lounge access ($32), instant Hilton Diamond status matches, and auto-refilled 5G eSIM data.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
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

      {/* 4. Interactive Savings Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator />
      </section>

      {/* 5. Real Member Testimonials */}
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
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{post.name}</h4>
                    <div className="text-[11px] text-slate-500">{post.location}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    Saved {post.saved}
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-600">{post.hotel}</div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{post.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified Member</span>
                <span className="font-semibold text-slate-700">{post.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Membership Plans (Digital Pass vs Cardholder Edition) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
            Flexible Membership Options
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Choose Your Travel Access Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Every plan unlocks 100% of our raw wholesale hotel, villa, and cruise inventory. Choose whether you want a pure digital pass or the optional physical Visa® card.
          </p>

          {/* Interactive Edition Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm mt-2">
            <button
              type="button"
              onClick={() => setEditionType('digital')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                editionType === 'digital'
                  ? 'bg-slate-900 text-white shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📱 Digital Pass (Pay with Any Card / PayPal)</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded-full">
                $0 Card Fee
              </span>
            </button>
            <button
              type="button"
              onClick={() => setEditionType('card')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                editionType === 'card'
                  ? 'bg-slate-900 text-amber-300 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>💳 Cardholder Edition (With ATLAS Visa®)</span>
              <span className="text-[10px] font-bold text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded-full">
                0% FX Fees
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Tier Cards */}
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
                  {tier.perksIncluded.slice(0, 4).map((p, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="opacity-90">{p}</span>
                    </div>
                  ))}

                  <div className="flex items-start gap-2 pt-1 border-t border-slate-200/20 text-xs font-semibold text-emerald-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      {editionType === 'digital'
                        ? 'Refunds & claims sent to your existing credit card/PayPal'
                        : 'Includes Physical Laser-Engraved Titanium Visa® Card'}
                    </span>
                  </div>
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

      {/* 7. Rate Parity Academic Case Study Spotlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Economic Research & Case Study
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Unmasking Rate Parity: The Invisible Hand of Travel Pricing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Read our full 6-chapter deep dive into the $1.2 Trillion OTA cartel, the 2015 French Loi Macron parity ban, and the mathematical proof of closed-loop wholesale arbitrage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/case-study"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              Read Full Case Study
            </Link>
            <a
              href="/ATLAS_Case_Study_Rate_Parity.pdf"
              download="ATLAS_Case_Study_Rate_Parity.pdf"
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
