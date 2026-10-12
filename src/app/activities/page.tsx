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
  titleNo: string;
  titleEn: string;
  locationNo: string;
  locationEn: string;
  category: 'Air & Sky' | 'Sea & Yacht' | 'Culinary & Wine' | 'Safari & Adventure' | 'VIP Culture';
  categoryNo: string;
  categoryEn: string;
  image: string;
  durationNo: string;
  durationEn: string;
  groupSizeNo: string;
  groupSizeEn: string;
  retailPrice: number;
  memberPrice: number;
  rating: number;
  reviewsCount: number;
  highlightsNo: string[];
  highlightsEn: string[];
  inclusionsNo: string[];
  inclusionsEn: string[];
}

const SAMPLE_ACTIVITIES: ActivityOffer[] = [
  {
    id: 'act-canyon-heli',
    titleNo: 'Privat Helikopterflyvning over Grand Canyon med Champagne-landing',
    titleEn: 'Private Grand Canyon Helicopter Expedition & Champagne Landing',
    locationNo: 'Las Vegas / Arizona, USA',
    locationEn: 'Las Vegas / Arizona, USA',
    category: 'Air & Sky',
    categoryNo: 'Luftfart & Helikopter',
    categoryEn: 'Aviation & Sky',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    durationNo: '4.5 timer',
    durationEn: '4.5 hours',
    groupSizeNo: 'Privat charter (opptil 6)',
    groupSizeEn: 'Private charter (up to 6)',
    retailPrice: 1450,
    memberPrice: 890,
    rating: 4.98,
    reviewsCount: 142,
    highlightsNo: ['Lavtflyvning over Hoover Dam og Mojave-ørkenen', 'Privat landing på canyon-bunnen', 'Moët & Chandon champagne-piknik'],
    highlightsEn: ['Low-level flight over Hoover Dam & Mojave desert', 'Private landing 3,200 ft below canyon rim', 'Moët & Chandon picnic at canyon floor'],
    inclusionsNo: ['Hotellhenting i Mercedes Maybach', 'VIP Lounge-innsjekk', 'Privat pilot-guide'],
    inclusionsEn: ['Mercedes Maybach curbside hotel transfer', 'Private terminal VIP lounge check-in', 'Senior pilot-narrator'],
  },
  {
    id: 'act-santorini-catamaran',
    titleNo: 'Privat Solnedgangscruise i Santorinis Kaldera med Personlig Kokk',
    titleEn: 'Bespoke Santorini Caldera Sunset Yacht Cruise & Private Chef',
    locationNo: 'Santorini, Hellas',
    locationEn: 'Santorini, Greece',
    category: 'Sea & Yacht',
    categoryNo: 'Sjø & Yachtcharter',
    categoryEn: 'Maritime & Yacht',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    durationNo: '5 timer',
    durationEn: '5 hours',
    groupSizeNo: 'Privat yacht (opptil 8)',
    groupSizeEn: 'Private yacht (up to 8)',
    retailPrice: 1850,
    memberPrice: 1190,
    rating: 4.96,
    reviewsCount: 98,
    highlightsNo: ['Stopp ved de varme kildene og Red Beach', 'Frisk sjømat grillet ombord av egen kokk', 'Uforstyrret solnedgang ved Oia fra havet'],
    highlightsEn: ['Anchorage at volcanic thermal hot springs & Red Beach', 'Live fresh Aegean seafood prepared onboard by chef', 'Private sunset vantage off Oia cliffs'],
    inclusionsNo: ['Ubegrenset lokal Assyrtiko-vin og champagne', 'Snorkleutstyr av toppklasse', 'Eksklusiv transport til/fra havn'],
    inclusionsEn: ['Complimentary premium Assyrtiko wine & bar', 'Pro-grade snorkeling equipment', 'Private executive harbor escort'],
  },
  {
    id: 'act-dubai-safari',
    titleNo: 'Eksklusiv Ørkensafari med Heritage Land Rover & 6-retters Middag',
    titleEn: 'Royal Desert Conservation Safari & 6-Course Private Oasis Dinner',
    locationNo: 'Dubai Desert Conservation Reserve, UAE',
    locationEn: 'Dubai Desert Conservation Reserve, UAE',
    category: 'Safari & Adventure',
    categoryNo: 'Safari & Ekspedisjon',
    categoryEn: 'Safari & Wilderness',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    durationNo: '7 timer',
    durationEn: '7 hours',
    groupSizeNo: 'Maks 4 personer per bil',
    groupSizeEn: 'Max 4 guests per vehicle',
    retailPrice: 750,
    memberPrice: 480,
    rating: 4.94,
    reviewsCount: 210,
    highlightsNo: ['Faunavandring i 1950-talls vintage Land Rovere', 'Falkeshow ved solnedgang over sanddynene', 'Privat oase-leir med astronomisk stjernekikking'],
    highlightsEn: ['Wildlife tracking in museum-grade 1950s Land Rovers', 'Sunset royal falconry demonstration on pristine dunes', 'Private torch-lit oasis camp with deep-space stargazing'],
    inclusionsNo: ['6-retters arabisk gourmetmiddag under stjernene', 'Astronomiguide med stjernekikkert', 'Privat sjåfør fra hotell'],
    inclusionsEn: ['6-course Emirati gourmet banquet under the stars', 'Resident astronomer with high-powered telescope', 'Chauffeured luxury hotel transfer'],
  },
  {
    id: 'act-bordeaux-wine',
    titleNo: 'Grand Cru Vinsmaking og Møte med Slottseiere i Saint-Émilion',
    titleEn: 'Private Grand Cru Estate Cellar Access & Vintner Tastings',
    locationNo: 'Bordeaux, Frankrike',
    locationEn: 'Bordeaux, France',
    category: 'Culinary & Wine',
    categoryNo: 'Gastronomi & Vin',
    categoryEn: 'Culinary & Wine',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    durationNo: 'Hel dag (8 timer)',
    durationEn: 'Full Day (8 hours)',
    groupSizeNo: 'Eksklusiv gruppe (2-4)',
    groupSizeEn: 'Intimate collective (2-4)',
    retailPrice: 1200,
    memberPrice: 790,
    rating: 4.99,
    reviewsCount: 64,
    highlightsNo: ['Tilgang til private kjellere stengt for allmennheten', 'Smaking av Premier Grand Cru Classé', 'Lunsj på privat vingård med slottsherren'],
    highlightsEn: ['Access to subterranean private archives closed to the public', 'Vertical tastings of Premier Grand Cru Classé vintages', 'Private château terrace luncheon hosted by estate owner'],
    inclusionsNo: ['Egen sommelier-ledsager gjennom dagen', 'Alle smakinger og 4-retters lunsj inkludert', 'Fraktordning for vinkjøp rett hjem'],
    inclusionsEn: ['Master sommelier companion throughout the day', 'All library tastings & 4-course estate pairing lunch', 'Direct temperature-controlled home cellar shipping'],
  },
];

export default function ActivitiesPage() {
  const { convertPrice, formatPrice } = useCurrency();
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<ActivityOffer | null>(null);
  const [booked, setBooked] = useState(false);

  const categories = [
    { key: 'All', label: isNo ? 'Alle Opplevelser' : 'All Experiences' },
    { key: 'Air & Sky', label: isNo ? 'Luftfart & Helikopter' : 'Aviation & Sky' },
    { key: 'Sea & Yacht', label: isNo ? 'Sjø & Yachtcharter' : 'Maritime & Yacht' },
    { key: 'Culinary & Wine', label: isNo ? 'Gastronomi & Vin' : 'Culinary & Wine' },
    { key: 'Safari & Adventure', label: isNo ? 'Safari & Ekspedisjon' : 'Safari & Wilderness' },
  ];

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
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((act) => {
            const savings = act.retailPrice - act.memberPrice;
            const title = isNo ? act.titleNo : act.titleEn;
            const location = isNo ? act.locationNo : act.locationEn;
            const categoryLabel = isNo ? act.categoryNo : act.categoryEn;
            const duration = isNo ? act.durationNo : act.durationEn;
            const groupSize = isNo ? act.groupSizeNo : act.groupSizeEn;
            const highlights = isNo ? act.highlightsNo : act.highlightsEn;

            return (
              <div
                key={act.id}
                className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={act.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 shadow-2xs">
                      {categoryLabel}
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
                      {location}
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      {title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {groupSize}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {isNo ? 'Høydepunkter' : 'Highlights'}
                    </h4>
                    <div className="space-y-1">
                      {highlights.map((h, i) => (
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
                      {isNo ? selectedActivity.titleNo : selectedActivity.titleEn}
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
                    <span className="font-bold text-slate-900">{isNo ? selectedActivity.locationNo : selectedActivity.locationEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Varighet:' : 'Duration:'}</span>
                    <span className="font-bold text-slate-900">{isNo ? selectedActivity.durationNo : selectedActivity.durationEn}</span>
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
