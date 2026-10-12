'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  Users,
  Check
} from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Light Header */}
      <div className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            {isNo ? 'Kuraterte Signaturopplevelser' : 'Curated Signature Experiences'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isNo ? 'Opplevelser Utover det Vanlige' : 'Beyond Exceptional Adventures'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isNo
              ? 'Privat tilgang til lukkede vinkjellere, helikoptercharter, yacht-seilinger og ørkensafarier. Skreddersydd med personlig concierge for klubbens medlemmer.'
              : 'Privileged access to restricted estates, private aviation tours, and bespoke culinary journeys designed exclusively for ATLAS Club members.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
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
                className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 shadow-2xs">
                      {act.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 backdrop-blur-md">
                      {isNo ? `Spar ${formatPrice(convertPrice(savings))}` : `Save ${formatPrice(convertPrice(savings))}`}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] text-amber-700 font-bold flex items-center gap-1 shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{act.rating} ({act.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-amber-700 font-bold mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {act.location}
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      {act.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {act.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {act.groupSize}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {isNo ? 'Høydepunkter' : 'Highlights'}
                    </h4>
                    <div className="space-y-1">
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-slate-400 line-through">
                        {isNo ? 'Ordinær pris: ' : 'Retail: '}
                        {formatPrice(convertPrice(act.retailPrice))}
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        {formatPrice(convertPrice(act.memberPrice))}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {isNo ? 'Medlemspris per opplevelse' : 'Exclusive member rate'}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center gap-1.5 transition-all"
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            {!booked ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {isNo ? 'Bekreft Opplevelse' : 'Confirm Experience'}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      {selectedActivity.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-slate-400 hover:text-slate-900 text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 py-3 border-y border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Sted:' : 'Location:'}</span>
                    <span className="font-bold text-slate-900">{selectedActivity.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Varighet:' : 'Duration:'}</span>
                    <span className="font-bold text-slate-900">{selectedActivity.duration}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900">{isNo ? 'Medlemspris:' : 'Member Rate:'}</span>
                    <span className="font-black text-slate-900">
                      {formatPrice(convertPrice(selectedActivity.memberPrice))}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                  >
                    {isNo ? 'Avbryt' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => setBooked(true)}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                  >
                    {isNo ? 'Bekreft & Bestill' : 'Confirm & Request'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4 text-3xl font-black">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {isNo ? 'Opplevelse Reservert!' : 'Experience Requested!'}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {isNo
                    ? 'Din VIP Concierge har mottatt forespørselen og kontakter deg for å bekrefte detaljer og dato.'
                    : 'Your VIP Concierge has received your request and will contact you directly.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedActivity(null);
                    setBooked(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider"
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
