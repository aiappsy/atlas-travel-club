import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ATLAS Travel Club — Private Mission Control',
  description: 'Internal directory and route navigator for ATLAS Travel Club modules.',
};

export default function PortalPage() {
  const sections = [
    {
      title: '⭐ Primære Miljøer & Produksjon',
      cards: [
        {
          title: 'Prelaunch / Venteliste',
          badge: '100% Live på Hoveddomenet',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Offisiell lanseringsside med sparekalkulator, FAQ, medlemskap og e-postinnsamling. Hoveddomenet ruter hit.',
          url: 'https://atlastravelclub.com',
          path: 'atlastravelclub.com',
          icon: '🚀',
          primary: true,
        },
        {
          title: 'Main App Showcase',
          badge: 'Live Showcase URL',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          desc: 'Den fullstendige medlemsplattformen med 76 ruter, tospråklig støtte (NO/EN), concierge og reisesøk.',
          url: 'https://atlasclub.web.app',
          path: 'atlasclub.web.app',
          icon: '🌐',
          primary: true,
        },
        {
          title: 'Lokal Utviklingsserver',
          badge: 'Localhost',
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          desc: 'Kjører lokalt på din maskin (port 3000) for umiddelbar testing av nye endringer før deploy.',
          url: 'http://localhost:3000',
          path: 'localhost:3000',
          icon: '💻',
        },
      ],
    },
    {
      title: '🔍 Søkemotorer & Bestillingsmoduler',
      cards: [
        {
          title: 'Hoteller & Resorts',
          badge: '1M+ Grossistpriser',
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
          desc: 'Hotellsøkemotor med prissammenligninger mot Booking.com/Expedia og eksklusive medlemspriser.',
          url: 'https://atlasclub.web.app/hotels',
          path: '/hotels',
          icon: '🏨',
        },
        {
          title: 'Fly & Ruter',
          badge: 'NDC Netto Fares',
          badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: 'Søk etter globale flyruter med direkteforbindelser, Business- og First Class-fordeler.',
          url: 'https://atlasclub.web.app/flights',
          path: '/flights',
          icon: '✈️',
        },
        {
          title: 'DragonPass Lounger',
          badge: '1 300+ VIP Lounger',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          desc: 'Global loungetilgang og Fast-Track via DragonPass. Søk etter flyplass (LHR, DXB, OSL, SIN) og generer digitale QR-pass.',
          url: 'https://atlasclub.web.app/lounges',
          path: '/lounges',
          icon: '☕',
        },
        {
          title: 'Billeie & Kjøretøy',
          badge: '0,- Egenandel',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          desc: 'Premium billeie og luksusflåte med inkluderte forsikringer og VIP-levering på rullebanen.',
          url: 'https://atlasclub.web.app/cars',
          path: '/cars',
          icon: '🚗',
        },
        {
          title: 'Luksuscruise',
          badge: 'Wholesale Seilinger',
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          desc: 'Eksklusive seilinger i Middelhavet, Karibia og arktiske farvann med dedikerte ombordkreditter.',
          url: 'https://atlasclub.web.app/cruises',
          path: '/cruises',
          icon: '🚢',
        },
        {
          title: 'Private Villaer',
          badge: 'Luxury Estates',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Håndplukkede luksusvillaer verden over med concierge-fasiliteter og privat stab.',
          url: 'https://atlasclub.web.app/villas',
          path: '/villas',
          icon: '🏡',
        },
        {
          title: 'Aktiviteter & Opplevelser',
          badge: 'Signaturopplevelser',
          badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
          desc: 'Safarier, vinsmakinger, helikopterturer og kuraterte reisemålsopplevelser.',
          url: 'https://atlasclub.web.app/activities',
          path: '/activities',
          icon: '🏄‍♂️',
        },
      ],
    },
    {
      title: '💎 Medlemskap & Verdi',
      cards: [
        {
          title: 'Medlemskapsplaner',
          badge: 'Planer & Nivåer',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          desc: 'Detaljert oversikt over fordelene for Silver, Gold, Platinum og Founder.',
          url: 'https://atlasclub.web.app/membership',
          path: '/membership',
          icon: '💳',
        },
        {
          title: 'Sparekalkulator',
          badge: 'Interaktiv ROI',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'La potensielle medlemmer beregne nøyaktig hva de sparer per ferie og gjennom året.',
          url: 'https://atlasclub.web.app/calculator',
          path: '/calculator',
          icon: '🧮',
        },
        {
          title: 'Ofte Stilte Spørsmål',
          badge: 'FAQ & Kunnskap',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          desc: 'Klare svar om hvordan klubben fungerer, prisgaranti, kanselleringsvilkår og kundestøtte.',
          url: 'https://atlasclub.web.app/faq',
          path: '/faq',
          icon: '💬',
        },
      ],
    },
    {
      title: '⚙️ Konsoller & Kode',
      cards: [
        {
          title: 'Firebase Console',
          badge: 'Google Cloud Platform',
          badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
          desc: 'Administrasjon for prosjektet (bizmaster-abfed): Hosting-domener, Cloud Functions og logger.',
          url: 'https://console.firebase.google.com/project/bizmaster-abfed/overview',
          path: 'console.firebase.google.com',
          icon: '🔥',
        },
        {
          title: 'GitHub Repositories',
          badge: 'Source Code',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          desc: 'Kildekoden for både atlasprelaunch og atlastravelnewfromaistudio.',
          url: 'https://github.com/aiappsy',
          path: 'github.com/aiappsy',
          icon: '📦',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-12 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Private Mission Control Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            ATLAS Travel Club Portaloversikt
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Sentral hub med direkte lenker og oversikt over alle deler av reiseplattformen.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
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
                        Åpne Siden →
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
          ATLAS Travel Club &bull; Private Internal Directory &bull; Konfidensiell
        </footer>
      </div>
    </div>
  );
}
