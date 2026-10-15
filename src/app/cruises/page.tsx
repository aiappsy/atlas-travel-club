'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CruiseAudioDeepDive from '@/components/CruiseAudioDeepDive';

export default function CruisesPage() {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const [activeLine, setActiveLine] = useState('ALL');
  const [activeDestination, setActiveDestination] = useState('ALL');

  const content = {
    badge: isNo ? 'Eksklusive cruise og seilinger' : 'Exclusive Ocean & River Voyages',
    title: isNo ? 'Luksuscruise med Atlas' : 'ATLAS Prestige Cruise Collection',
    subtitle: isNo
      ? 'Få tilgang til verdens ledende luksusrederier med opptil 10 % tilbakebetalt som Atlas Kickback, garanterte priser og kreditt om bord.'
      : 'Access the world’s premier ocean and river lines with up to 10% back in ATLAS Club Credits, rate parity guarantee, and exclusive onboard spending credit.',
    pointsCalloutTitle: isNo ? '🏛️ Atlas Travel Kickback: Slik fungerer det' : '🏛️ Atlas Travel Kickback: How It Works',
    pointsCalloutBody: isNo
      ? 'Rederiene krever offisielle katalogpriser ved bestilling. Til gjengjeld deler Atlas provisjonen 50/50 direkte tilbake til din medlemskonto etter endt seilas. Beløpet kan motregnes neste årskontingent (1 290 kr) eller utbetales direkte.'
      : 'Cruise lines require published public rates at checkout (MAP). In return, Atlas shares the B2B supplier commission 50/50 straight back into your Rewards Vault post-voyage. Your balance automatically offsets your next annual renewal (1 290 NOK) in Stripe, or can be cashed out on surplus!',
    searchPlaceholder: isNo ? 'Søk etter reisemål, skip eller rederi...' : 'Search destination, ship, or cruise line...',
    allFilter: isNo ? 'Alle rederier' : 'All Cruise Lines',
    destFilter: isNo ? 'Alle reisemål' : 'All Destinations',
    viewItinerary: isNo ? 'Se seilingsplan og lugarer' : 'View Itinerary & Cabins',
    onboardCreditLabel: isNo ? 'inkludert om bord' : 'Onboard Credit',
    pointsEarnLabel: isNo ? 'Atlas Kickback' : 'Earn Club Credits',
    perPerson: isNo ? 'per person i dobbeltlugar' : 'per person (double occupancy)',
    verifiedPartner: isNo ? 'Verifiserte B2B-rederier' : 'Automated B2B Cruise Partner',
    partnerNote: isNo
      ? 'Sanntids tilgjengelighet, dekkplaner og direkte bestilling med 100 % prisbeskyttelse og døgnåpen support.'
      : 'Real-time cabin availability, live deck plans, and instant automated booking with 100% price protection and 24/7 operator support.',
  };

  const cruiseLines = [
    { id: 'ALL', name: content.allFilter },
    { id: 'SILVERSEA', name: 'Silversea' },
    { id: 'REGENT', name: 'Regent Seven Seas' },
    { id: 'SEABOURN', name: 'Seabourn' },
    { id: 'CELEBRITY', name: 'Celebrity Cruises' },
    { id: 'ROYAL', name: 'Royal Caribbean' },
    { id: 'RITZ', name: 'Ritz-Carlton Yacht' },
  ];

  const destinations = [
    { id: 'ALL', name: content.destFilter },
    { id: 'MED', name: isNo ? 'Middelhavet' : 'Mediterranean' },
    { id: 'CARIB', name: isNo ? 'Karibia' : 'Caribbean' },
    { id: 'NORWAY', name: isNo ? 'Norske fjorder & Nordkapp' : 'Norwegian Fjords' },
    { id: 'ASIA', name: isNo ? 'Asia & Japan' : 'Asia & Japan' },
  ];

  const cruises = [
    {
      id: 'cr-1',
      line: 'SILVERSEA',
      lineName: 'Silversea',
      ship: 'Silver Dawn',
      title: isNo ? 'Klassisk Middelhav & Den franske riviera' : 'Grand Mediterranean & French Riviera',
      route: isNo ? 'Barcelona • Cannes • Portofino • Roma (Civitavecchia)' : 'Barcelona • Cannes • Portofino • Rome (Civitavecchia)',
      duration: isNo ? '7 netter' : '7 Nights',
      destination: 'MED',
      departure: 'Mai – Oktober 2027',
      priceUsd: 4850,
      priceNok: 48500,
      onboardCredit: '$400 USD',
      pointsEarn: 48500, // $485 USD value
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
      tag: isNo ? 'All-inclusive luksus' : 'All-Inclusive Ultra-Luxury',
    },
    {
      id: 'cr-2',
      line: 'REGENT',
      lineName: 'Regent Seven Seas',
      ship: 'Seven Seas Grandeur',
      title: isNo ? 'Norske fjorder og midnattssol' : 'Norwegian Fjords & Midnight Sun',
      route: isNo ? 'Southampton • Stavanger • Geiranger • Flåm • Bergen' : 'Southampton • Stavanger • Geiranger • Flåm • Bergen',
      duration: isNo ? '10 netter' : '10 Nights',
      destination: 'NORWAY',
      departure: 'Juni – August 2027',
      priceUsd: 7900,
      priceNok: 79000,
      onboardCredit: '$600 USD',
      pointsEarn: 79000, // $790 USD value
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      tag: isNo ? 'Inkluderer ubegrensede utflukter' : 'Unlimited Free Excursions',
    },
    {
      id: 'cr-3',
      line: 'CELEBRITY',
      lineName: 'Celebrity Cruises',
      ship: 'Celebrity Beyond',
      title: isNo ? 'Det østlige Karibia' : 'Eastern Caribbean Retreat',
      route: isNo ? 'Miami • St. Thomas • St. Maarten • Puerto Plata' : 'Miami • St. Thomas • St. Maarten • Puerto Plata',
      duration: isNo ? '7 netter' : '7 Nights',
      destination: 'CARIB',
      departure: 'November 2026 – Mars 2027',
      priceUsd: 2450,
      priceNok: 24500,
      onboardCredit: '$250 USD',
      pointsEarn: 24500, // $245 USD value
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
      tag: 'The Retreat Suite Class',
    },
    {
      id: 'cr-4',
      line: 'RITZ',
      lineName: 'Ritz-Carlton Yacht Collection',
      ship: 'Ilma (Superyacht)',
      title: isNo ? 'Kykladene og Det egeiske hav' : 'Cyclades & The Aegean Splendor',
      route: isNo ? 'Athen • Mykonos • Santorini • Bodrum • Rhodos' : 'Athens • Mykonos • Santorini • Bodrum • Rhodes',
      duration: isNo ? '7 netter' : '7 Nights',
      destination: 'MED',
      departure: 'Juli – September 2027',
      priceUsd: 8900,
      priceNok: 89000,
      onboardCredit: '$500 USD',
      pointsEarn: 89000, // $890 USD value
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80',
      tag: isNo ? 'Bespoke Superyacht' : 'Bespoke Superyacht Voyage',
    },
  ];

  const filtered = cruises.filter((c) => {
    const matchLine = activeLine === 'ALL' || c.line === activeLine;
    const matchDest = activeDestination === 'ALL' || c.destination === activeDestination;
    return matchLine && matchDest;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {content.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {content.title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>

          {/* POINTS REWARDS CALLOUT BANNER */}
          <div className="mt-8 max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-300/60 rounded-2xl p-5 text-left flex flex-col md:flex-row items-center gap-5 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
              💎
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 mb-1">{content.pointsCalloutTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{content.pointsCalloutBody}</p>
            </div>
            <Link
              href="/rewards"
              className="px-4 py-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 text-xs font-bold tracking-wider uppercase transition-all shrink-0"
            >
              {isNo ? 'Se mine fordeler' : 'View Rewards Vault'}
            </Link>
          </div>
        </div>
      </div>

      {/* VERIFIED AUDIO DEEP DIVE PODCAST & BRIEFING */}
      <CruiseAudioDeepDive />

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {cruiseLines.map((line) => (
              <button
                key={line.id}
                onClick={() => setActiveLine(line.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeLine === line.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {line.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setActiveDestination(dest.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeDestination === dest.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CRUISE ITINERARIES GRID */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* IMAGE & BADGES */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-amber-300 text-xs font-bold tracking-wider uppercase border border-amber-500/30">
                      {item.lineName}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold">
                      {item.duration}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                      +{item.onboardCredit} {content.onboardCreditLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-slate-200 text-xs">
                      📍 {item.route}
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                    <span>🛳️ {item.ship}</span>
                    <span>🗓️ {item.departure}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-4">
                    {item.tag}
                  </div>

                  {/* POINTS EARNED CALLOUT */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👑</span>
                      <span className="text-xs font-bold text-slate-700">{content.pointsEarnLabel}:</span>
                    </div>
                    <span className="text-xs font-black text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      +{item.pointsEarn.toLocaleString()} pts (${(item.pointsEarn / 100).toFixed(0)} value)
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER PRICING & BOOKING ACTION */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {isNo ? `${item.priceNok.toLocaleString()} NOK` : `$${item.priceUsd.toLocaleString()}`}
                  </div>
                  <div className="text-[11px] text-slate-500">{content.perPerson}</div>
                </div>

                <Link
                  href={`/contact?subject=Cruise+Booking+${encodeURIComponent(item.ship)}`}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold tracking-wider uppercase transition-all shadow-xs flex items-center gap-2"
                >
                  <span>{content.viewItinerary}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHITE LABEL INTEGRATION FOOTER NOTE */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs leading-relaxed shadow-xs">
          <div className="font-bold text-slate-900 text-sm mb-1">
            🔒 {content.verifiedPartner}
          </div>
          <p>{content.partnerNote}</p>
        </div>
      </div>
    </div>
  );
}
