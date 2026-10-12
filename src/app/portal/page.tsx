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
          badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          desc: 'Offisiell lanseringsside med sparekalkulator, FAQ, medlemskap og e-postinnsamling. Hoveddomenet ruter hit.',
          url: 'https://atlastravelclub.com',
          path: 'atlastravelclub.com',
          icon: '🚀',
          primary: true,
        },
        {
          title: 'Main App Showcase',
          badge: 'Live Showcase URL',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          desc: 'Den fullstendige medlemsplattformen med 71 ruter, tospråklig støtte (NO/EN), concierge og reisesøk.',
          url: 'https://atlasclub.web.app',
          path: 'atlasclub.web.app',
          icon: '🌐',
          primary: true,
        },
        {
          title: 'Lokal Utviklingsserver',
          badge: 'Localhost',
          badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
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
          badge: 'Søkemotor & Rate Parity',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Hotellsøkemotor med prissammenligninger mot Booking.com/Expedia og eksklusive medlemspriser.',
          url: 'https://atlasclub.web.app/hotels',
          path: '/hotels',
          icon: '🏨',
        },
        {
          title: 'Fly & Ruter',
          badge: 'Flybestilling',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Søk etter globale flyruter med direkteforbindelser, Business- og First Class-fordeler.',
          url: 'https://atlasclub.web.app/flights',
          path: '/flights',
          icon: '✈️',
        },
        {
          title: 'Luksuscruise',
          badge: 'Cruiseruter',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Eksklusive seilinger i Middelhavet, Karibia og arktiske farvann med dedikerte ombordkreditter.',
          url: 'https://atlasclub.web.app/cruises',
          path: '/cruises',
          icon: '🚢',
        },
        {
          title: 'Private Villaer',
          badge: 'Luxury Estates',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Håndplukkede luksusvillaer verden over med concierge-fasiliteter og privat stab.',
          url: 'https://atlasclub.web.app/villas',
          path: '/villas',
          icon: '🏡',
        },
        {
          title: 'Aktiviteter & Opplevelser',
          badge: 'Opplevelser',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Safarier, vinsmakinger, helikopterturer og kuraterte reisemålsopplevelser.',
          url: 'https://atlasclub.web.app/activities',
          path: '/activities',
          icon: '🏄‍♂️',
        },
        {
          title: 'Billeie & Kjøretøy',
          badge: 'Premium Rental',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          desc: 'Premium billeie med inkluderte forsikringer og eksklusive oppgraderinger for medlemmer.',
          url: 'https://atlasclub.web.app/cars',
          path: '/cars',
          icon: '🚗',
        },
      ],
    },
    {
      title: '💎 Medlemskap & Verdi',
      cards: [
        {
          title: 'Medlemskapsplaner',
          badge: 'Planer & Nivåer',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          desc: 'Detaljert oversikt over fordelene for Silver, Gold, Platinum og Founder.',
          url: 'https://atlasclub.web.app/membership',
          path: '/membership',
          icon: '💳',
        },
        {
          title: 'Sparekalkulator',
          badge: 'Interaktiv Kalkulator',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          desc: 'La potensielle medlemmer beregne nøyaktig hva de sparer per ferie og gjennom året.',
          url: 'https://atlasclub.web.app/calculator',
          path: '/calculator',
          icon: '🧮',
        },
        {
          title: 'Ofte Stilte Spørsmål',
          badge: 'FAQ & Vilkår',
          badgeClass: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
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
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          desc: 'Administrasjon for prosjektet (bizmaster-abfed): Hosting-domener, Cloud Functions og logger.',
          url: 'https://console.firebase.google.com/project/bizmaster-abfed/overview',
          path: 'console.firebase.google.com',
          icon: '🔥',
        },
        {
          title: 'GitHub Repositories',
          badge: 'Source Code',
          badgeClass: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
          desc: 'Kildekoden for både atlasprelaunch og atlastravelnewfromaistudio.',
          url: 'https://github.com/aiappsy',
          path: 'github.com/aiappsy',
          icon: '📦',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F3F4F6] px-4 py-12 md:py-16 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Private Mission Control Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-3">
            ATLAS Travel Club Portaloversikt
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Sentral hub med direkte lenker og oversikt over alle deler av reiseplattformen.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#ECC86B]">
                  {section.title}
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.cards.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className={`flex flex-col justify-between p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                      card.primary
                        ? 'bg-[#121620]/90 border-amber-500/40 hover:border-amber-400 shadow-lg shadow-black/40'
                        : 'bg-[#0E121A]/70 border-white/10 hover:border-amber-500/40 hover:shadow-lg hover:shadow-black/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl shrink-0">
                          {card.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-white truncate">
                            {card.title}
                          </h3>
                          <span
                            className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded border mt-1 ${card.badgeClass}`}
                          >
                            {card.badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-gray-500 truncate max-w-[140px]">
                        {card.path}
                      </span>
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          card.primary
                            ? 'bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
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
        <footer className="text-center mt-16 pt-8 border-t border-white/5 text-xs text-gray-500">
          ATLAS Travel Club &bull; Private Internal Directory &bull; Konfidensiell
        </footer>
      </div>
    </div>
  );
}
