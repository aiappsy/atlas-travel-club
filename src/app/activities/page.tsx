'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface ActivityOffer {
  id: string;
  title: string;
  location: string;
  category: 'Air & Sky' | 'Sea & Yacht' | 'Culinary & Wine' | 'Safari & Adventure' | 'VIP Culture';
  image: string;
  duration: string;
  groupSize: string;
  retailPrice: number;
  memberPrice: number;
  rating: number;
  reviewsCount: number;
  highlights: string[];
  inclusions: string[];
}

const SAMPLE_ACTIVITIES: ActivityOffer[] = [
  {
    id: 'act-canyon-heli',
    title: 'Privat Helikopterflyvning over Grand Canyon med Champagne-landing',
    location: 'Las Vegas / Arizona, USA',
    category: 'Air & Sky',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    duration: '4.5 timer',
    groupSize: 'Privat charter (opptil 6)',
    retailPrice: 1450,
    memberPrice: 890,
    rating: 4.98,
    reviewsCount: 142,
    highlights: ['Lavtflyvning over Hoover Dam og Mojave-ørkenen', 'Privat landing på canyon-bunnen', 'Moët & Chandon champagne-piknik'],
    inclusions: ['Hotellhenting i Mercedes Maybach', 'VIP Lounge-innsjekk', 'Privat pilot-guide'],
  },
  {
    id: 'act-santorini-catamaran',
    title: 'Privat Solnedgangscruise i Santorinis Kaldera med Personlig Kokk',
    location: 'Santorini, Hellas',
    category: 'Sea & Yacht',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    duration: '5 timer',
    groupSize: 'Privat yacht (opptil 8)',
    retailPrice: 1850,
    memberPrice: 1190,
    rating: 4.96,
    reviewsCount: 98,
    highlights: ['Stopp ved de varme kildene og Red Beach', 'Frisk sjømat grillet ombord', 'Solnedgang ved Oia fra havet'],
    inclusions: ['Ubegrenset lokal vin og drikke', 'Snorkleutstyr av toppklasse', 'Eksklusiv transport til/fra havn'],
  },
  {
    id: 'act-dubai-safari',
    title: 'Eksklusiv Ørkensafari med Heritage Land Rover & 6-retters Middag',
    location: 'Dubai Desert Conservation Reserve, UAE',
    category: 'Safari & Adventure',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    duration: '7 timer',
    groupSize: 'Maks 4 personer per bil',
    retailPrice: 750,
    memberPrice: 480,
    rating: 4.94,
    reviewsCount: 210,
    highlights: ['Faunavandring i 1950-talls vintage Land Rovere', 'Falkeshow ved solnedgang', 'Privat oase-leir med stjernekikking'],
    inclusions: ['6-retters arabisk gourmetmiddag', 'Astronomiguide med stjernekikkert', 'Privat sjåfør'],
  },
  {
    id: 'act-bordeaux-wine',
    title: 'Grand Cru Vinsmaking og Møte med Slottseiere i Saint-Émilion',
    location: 'Bordeaux, Frankrike',
    category: 'Culinary & Wine',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    duration: 'Hel dag (8 timer)',
    groupSize: 'Eksklusiv gruppe (2-4)',
    retailPrice: 1200,
    memberPrice: 790,
    rating: 4.99,
    reviewsCount: 64,
    highlights: ['Tilgang til private kjellere stengt for allmennheten', 'Smaking av Premier Grand Cru Classé', 'Lunsj på privat vingård'],
    inclusions: ['Sommelier-ledsager', 'Alle smakinger og lunsj inkludert', 'Fraktordning for vinkjøp'],
  },
];

export default function ActivitiesPage() {
  const { convertPrice, formatPrice } = useCurrency();
  const { currentLanguage } = useLanguage();
  const isNo = currentLanguage === 'no';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<ActivityOffer | null>(null);
  const [booked, setBooked] = useState(false);

  const categories = ['All', 'Air & Sky', 'Sea & Yacht', 'Culinary & Wine', 'Safari & Adventure'];

  const filtered = selectedCategory === 'All'
    ? SAMPLE_ACTIVITIES
    : SAMPLE_ACTIVITIES.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F3F4F6] selection:bg-[#D4AF37] selection:text-black">
      {/* Header */}
      <div className="relative pt-12 pb-20 px-4 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#07090C] to-[#07090C]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            {isNo ? 'Kuraterte Signaturopplevelser' : 'Curated Signature Experiences'}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-4">
            {isNo ? 'Opplevelser Utover det Vanlige' : 'Beyond Exceptional Adventures'}
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isNo
              ? 'Privat tilgang til lukkede vinkjellere, helikoptercharter, yacht-seilinger og ørkensafarier. Skreddersydd med personlig concierge for klubbens medlemmer.'
              : 'Privileged access to restricted estates, private aviation tours, and bespoke culinary journeys designed exclusively for ATLAS Club members.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-24">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat === 'All' ? (isNo ? 'Alle Opplevelser' : 'All Experiences') : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((act) => {
            const savings = act.retailPrice - act.memberPrice;

            return (
              <div
                key={act.id}
                className="bg-[#0E121A] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-black/60">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {act.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {isNo ? `Spar ${formatPrice(convertPrice(savings))}` : `Save ${formatPrice(convertPrice(savings))}`}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-amber-300 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{act.rating} ({act.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {act.location}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                      {act.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between py-2 border-y border-white/5 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {act.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {act.groupSize}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      {isNo ? 'Høydepunkter' : 'Highlights'}
                    </h4>
                    <div className="space-y-1">
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through">
                        {isNo ? 'Ordinær pris: ' : 'Retail: '}
                        {formatPrice(convertPrice(act.retailPrice))}
                      </div>
                      <div className="text-2xl md:text-3xl font-serif font-bold text-amber-300">
                        {formatPrice(convertPrice(act.memberPrice))}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {isNo ? 'Medlemspris per opplevelse' : 'Exclusive member rate'}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                    >
                      {isNo ? 'Bestill Opplevelse' : 'Book Experience'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E121A] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            {!booked ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {isNo ? 'Bekreft Opplevelse' : 'Confirm Experience'}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-1">
                      {selectedActivity.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-white text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 py-3 border-y border-white/5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Sted:' : 'Location:'}</span>
                    <span className="font-semibold text-white">{selectedActivity.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Varighet:' : 'Duration:'}</span>
                    <span className="font-semibold text-white">{selectedActivity.duration}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-white/5">
                    <span className="font-bold text-white">{isNo ? 'Medlemspris:' : 'Member Rate:'}</span>
                    <span className="font-serif font-bold text-amber-300">
                      {formatPrice(convertPrice(selectedActivity.memberPrice))}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/5"
                  >
                    {isNo ? 'Avbryt' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => setBooked(true)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20"
                  >
                    {isNo ? 'Bekreft & Bestill' : 'Confirm & Request'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {isNo ? 'Opplevelse Reservert!' : 'Experience Requested!'}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {isNo
                    ? 'Din VIP Concierge har mottatt forespørselen og kontakter deg for å bekrefte dato, tidspunkt og eventuelle spesialønsker.'
                    : 'Your VIP Concierge has received your request and will contact you directly to confirm logistics and bespoke requests.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedActivity(null);
                    setBooked(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black text-xs font-bold uppercase tracking-wider"
                >
                  {isNo ? 'Lukk' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
