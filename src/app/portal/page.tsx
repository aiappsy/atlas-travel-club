'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PortalPage() {
  const { locale, setLocale } = useLanguage();
  const isNo = locale === 'no';

  const content = {
    badge: isNo ? 'Privat Mission Control Portal' : 'Private Mission Control Portal',
    title: isNo ? 'ATLAS Travel Club Portaloversikt' : 'ATLAS Travel Club Directory & Hub',
    subtitle: isNo
      ? 'Sentral hub med direkte lenker og oversikt over alle deler av reiseplattformen.'
      : 'Central administrative gateway with direct access and live status across all platform modules.',
    openButton: isNo ? 'Åpne Siden →' : 'Launch Module →',
    footer: isNo
      ? 'ATLAS Travel Club • Privat Intern Hub • Konfidensiell'
      : 'ATLAS Travel Club • Private Internal Directory • Confidential',
    sections: [
      {
        title: isNo ? '⭐ Primære Miljøer & Produksjon' : '⭐ Primary Environments & Live Deployments',
        cards: [
          {
            title: isNo ? 'Prelaunch / Venteliste' : 'Prelaunch / Priority Waitlist',
            badge: isNo ? '100% Live på Hoveddomenet' : '100% Live on Apex Domain',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            desc: isNo
              ? 'Offisiell lanseringsside med sparekalkulator, FAQ, medlemskap og e-postinnsamling. Hoveddomenet ruter hit.'
              : 'Official public launch site featuring savings calculators, FAQs, founder tiers, and lead acquisition.',
            url: 'https://atlastravelclub.com',
            path: 'atlastravelclub.com',
            icon: '🚀',
            primary: true,
          },
          {
            title: isNo ? 'Main App Showcase' : 'Main App Live Showcase',
            badge: isNo ? 'Live Showcase URL' : 'Live Showcase Deployment',
            badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
            desc: isNo
              ? 'Den fullstendige medlemsplattformen med 76 ruter, tospråklig støtte (NO/EN), concierge og reisesøk.'
              : 'Complete proprietary luxury travel collective platform with 76 routes, dual language, and live engines.',
            url: 'https://atlasclub.web.app',
            path: 'atlasclub.web.app',
            icon: '🌐',
            primary: true,
          },
          {
            title: isNo ? 'Lokal Utviklingsserver' : 'Local Development Server',
            badge: isNo ? 'Localhost (Port 3000)' : 'Localhost (Port 3000)',
            badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            desc: isNo
              ? 'Kjører lokalt på din maskin for umiddelbar testing av nye endringer før deploy.'
              : 'Local development environment running on your machine for zero-latency testing before pushing.',
            url: 'http://localhost:3000',
            path: 'localhost:3000',
            icon: '💻',
          },
        ],
      },
      {
        title: isNo ? '🔍 Søkemotorer & Bestillingsmoduler' : '🔍 Booking Engines & Travel Verticals',
        cards: [
          {
            title: isNo ? 'Hoteller & Resorts' : 'Hotels & Luxury Resorts',
            badge: isNo ? '1M+ Grossistpriser' : '1M+ Wholesale Inventory',
            badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
            desc: isNo
              ? 'Hotellsøkemotor med prissammenligninger mot Booking.com/Expedia og eksklusive medlemspriser.'
              : 'Proprietary rate-parity comparison engine auditing OTA prices against wholesale bedbank rates.',
            url: 'https://atlasclub.web.app/hotels',
            path: '/hotels',
            icon: '🏨',
          },
          {
            title: isNo ? 'Fly & Ruter' : 'Flights & Air Mobility',
            badge: isNo ? 'NDC Netto Fares' : 'NDC Net Wholesale Fares',
            badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
            desc: isNo
              ? 'Søk etter globale flyruter med direkteforbindelser, Business- og First Class-fordeler.'
              : 'Direct carrier NDC integration providing transparent net airline pricing with zero drip charges.',
            url: 'https://atlasclub.web.app/flights',
            path: '/flights',
            icon: '✈️',
          },
          {
            title: isNo ? 'DragonPass Lounger' : 'DragonPass Global Lounges',
            badge: isNo ? '1 300+ VIP Lounger' : '1,300+ Airport Lounges',
            badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
            desc: isNo
              ? 'Global loungetilgang og Fast-Track via DragonPass. Søk etter flyplass og generer digitale QR-pass.'
              : 'Global airport hospitality and security fast-track network with instant digital QR pass issuance.',
            url: 'https://atlasclub.web.app/lounges',
            path: '/lounges',
            icon: '☕',
          },
          {
            title: isNo ? 'Billeie & Kjøretøy' : 'Prestige Fleet & Car Rental',
            badge: isNo ? '0,- Egenandel' : 'Zero Excess Deductible',
            badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
            desc: isNo
              ? 'Premium billeie og luksusflåte med inkluderte forsikringer og VIP-levering på rullebanen.'
              : 'Corporate rates on executive SUVs, electric performance vehicles, and guaranteed models with curbside delivery.',
            url: 'https://atlasclub.web.app/cars',
            path: '/cars',
            icon: '🚗',
          },
          {
            title: isNo ? 'Luksuscruise' : 'Luxury Ocean Voyages',
            badge: isNo ? 'Wholesale Seilinger' : 'Curated Ocean Lines',
            badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            desc: isNo
              ? 'Eksklusive seilinger i Middelhavet, Karibia og arktiske farvann med dedikerte ombordkreditter.'
              : 'Wholesale cruise inventory, stateroom allocations, and complimentary onboard spending credits.',
            url: 'https://atlasclub.web.app/cruises',
            path: '/cruises',
            icon: '🚢',
          },
          {
            title: isNo ? 'Private Villaer' : 'Private Villa Estates',
            badge: isNo ? 'Luxury Estates' : 'Vetted Luxury Estates',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            desc: isNo
              ? 'Håndplukkede luksusvillaer verden over med concierge-fasiliteter og privat stab.'
              : 'Hand-inspected global residences featuring dedicated culinary staff, security, and concierge services.',
            url: 'https://atlasclub.web.app/villas',
            path: '/villas',
            icon: '🏡',
          },
          {
            title: isNo ? 'Aktiviteter & Opplevelser' : 'Curated Signature Experiences',
            badge: isNo ? 'Signaturopplevelser' : 'Bespoke Adventures',
            badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
            desc: isNo
              ? 'Safarier, vinsmakinger, helikopterturer og kuraterte reisemålsopplevelser.'
              : 'Private aviation charters, grand cru vineyard access, and bespoke adventures reserved for members.',
            url: 'https://atlasclub.web.app/activities',
            path: '/activities',
            icon: '🏄‍♂️',
          },
        ],
      },
      {
        title: isNo ? '💎 Medlemskap & Verdi' : '💎 Membership Architecture & Value Proposition',
        cards: [
          {
            title: isNo ? 'Medlemskapsplaner' : 'Membership Tiers & Benefits',
            badge: isNo ? 'Planer & Nivåer' : 'Tier Matrix',
            badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
            desc: isNo
              ? 'Detaljert oversikt over fordelene for Silver, Gold, Platinum og Founder.'
              : 'Comprehensive privileges breakdown for Silver, Gold, Platinum, and Founder lifetime invitations.',
            url: 'https://atlasclub.web.app/membership',
            path: '/membership',
            icon: '💳',
          },
          {
            title: isNo ? 'Sparekalkulator' : 'Annual Return Calculator',
            badge: isNo ? 'Interaktiv ROI' : 'Interactive ROI Engine',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            desc: isNo
              ? 'La potensielle medlemmer beregne nøyaktig hva de sparer per ferie og gjennom året.'
              : 'Interactive financial modeling tool illustrating tangible net savings vs. public retail bookings.',
            url: 'https://atlasclub.web.app/calculator',
            path: '/calculator',
            icon: '🧮',
          },
          {
            title: isNo ? 'Ofte Stilte Spørsmål' : 'Frequently Asked Questions',
            badge: isNo ? 'FAQ & Kunnskap' : 'Knowledge Base & FAQs',
            badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
            desc: isNo
              ? 'Klare svar om hvordan klubben fungerer, prisgaranti, kanselleringsvilkår og kundestøtte.'
              : 'In-depth explanations of closed-user-group mechanics, 110% rate guarantees, and policies.',
            url: 'https://atlasclub.web.app/faq',
            path: '/faq',
            icon: '💬',
          },
        ],
      },
      {
        title: isNo ? '⚙️ Konsoller & Kode' : '⚙️ Infrastructure & Engineering Repositories',
        cards: [
          {
            title: isNo ? 'Firebase Console' : 'Google Firebase Console',
            badge: isNo ? 'Google Cloud Platform' : 'Google Cloud Platform',
            badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
            desc: isNo
              ? 'Administrasjon for prosjektet (bizmaster-abfed): Hosting-domener, Cloud Functions og logger.'
              : 'Cloud management for hosting distributions, edge caching, and serverless compute instances.',
            url: 'https://console.firebase.google.com/project/bizmaster-abfed/overview',
            path: 'console.firebase.google.com',
            icon: '🔥',
          },
          {
            title: isNo ? 'GitHub Repositories' : 'GitHub Version Control',
            badge: isNo ? 'Source Code' : 'Source Code Repositories',
            badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
            desc: isNo
              ? 'Kildekoden for både atlasprelaunch og atlastravelnewfromaistudio.'
              : 'Direct codebases and deployment configuration for both prelaunch and main showcase engines.',
            url: 'https://github.com/aiappsy',
            path: 'github.com/aiappsy',
            icon: '📦',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-12 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Language selector in Portal Header */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200 text-xs font-bold shadow-xs">
            <button
              onClick={() => setLocale('no')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                isNo
                  ? 'bg-slate-900 text-white shadow-2xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>🇳🇴</span> Norsk
            </button>
            <button
              onClick={() => setLocale('en')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                !isNo
                  ? 'bg-slate-900 text-white shadow-2xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>🇬🇧</span> English
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {content.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            {content.title}
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {content.sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {section.title}
                </h2>
                <div className="h-[1px] flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.cards.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      card.primary
                        ? 'bg-white border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                          {card.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-slate-900 truncate">
                            {card.title}
                          </h3>
                          <span
                            className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border mt-1 ${card.badgeClass}`}
                          >
                            {card.badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed mb-6">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-slate-400 truncate max-w-[140px]">
                        {card.path}
                      </span>
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          card.primary
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {content.openButton}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-slate-200 text-xs text-slate-500">
          {content.footer}
        </footer>
      </div>
    </div>
  );
}
