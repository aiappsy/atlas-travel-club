'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight, Wallet, Clock, ShieldCheck, Download, Sparkles } from 'lucide-react';

const PORTAL_AUTH_KEY = 'atlas_mission_control_auth';
const CORRECT_PIN = 'atlas2026';

export default function PortalPage() {
  const { locale, setLocale } = useLanguage();
  const isNo = locale === 'no';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(PORTAL_AUTH_KEY);
      if (stored === 'granted') {
        setIsAuthenticated(true);
      }
    } catch {
      // sessionStorage unavailable
    } finally {
      setIsCheckingSession(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === CORRECT_PIN.toLowerCase()) {
      try {
        sessionStorage.setItem(PORTAL_AUTH_KEY, 'granted');
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(isNo ? 'Feil adgangskode. Vennligst prøv igjen.' : 'Invalid security passkey. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(PORTAL_AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const content = {
    cardShowcaseTitle: isNo ? 'Offisielt ATLAS Travel Card (Visa)' : 'Official ATLAS Travel Card (Visa)',
    cardShowcaseSub: isNo ? 'Eksklusivt metallkort med 100% matchende klubblogo' : 'Exclusive metal Visa card with verified brand identity',
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
            title: isNo ? 'Atlas Signature Resorts' : 'Atlas Signature Resorts',
            badge: isNo ? 'Fra 2 890 kr / 7 Netter' : 'From 2,890 NOK / 7 Nts',
            badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
            desc: isNo
              ? 'Likvidering av overskuddskapasitet fra RCI: 7 netters ferieleilighet (1–2 soverom, fullt kjøkken, opptil 4–6 personer) fra 2 890 kr (Last-Minute) eller 4 490 kr (Helår).'
              : 'RCI surplus condo liquidation: 7-night whole condo stays (sleeps 4–6, full kitchen) across Spain, Portugal, Greece, and Italy from 2,890 NOK ($269 USD).',
            url: 'https://atlasclub.web.app/resorts',
            path: '/resorts',
            icon: '🏖️',
            primary: true,
          },
          {
            title: isNo ? 'Atlas Gourmet & Spa Escapes' : 'Atlas Gourmet & Spa Escapes',
            badge: isNo ? '0 kr Rompris / Halvpensjon' : '$0 Room Rate / Half-Board',
            badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
            desc: isNo
              ? 'Connex/Holiday Plus-partnerskap: Gratis romopphold for 2 personer på boutique- og velværerhoteller i Alpene og Sør-Europa. Betal kun for hotellets faste halvpensjon.'
              : 'Connex/Holiday Plus partnership: $0 complimentary lodging for 2 guests across alpine and Mediterranean wellness retreats. Guests pay only published half-board at checkout.',
            url: 'https://atlasclub.web.app/spa-breaks',
            path: '/spa-breaks',
            icon: '🍷',
            primary: true,
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
            title: isNo ? 'Luksuscruise' : 'Luxury Ocean Voyages',
            badge: isNo ? 'Wholesale Seilinger' : 'Curated Ocean Lines',
            badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
            desc: isNo
              ? 'Eksklusive seilinger med Silversea, Regent og Celebrity med ombordkreditt og Club Credits.'
              : 'Wholesale cruise inventory, stateroom allocations, complimentary OBC, and Club Credits earnings.',
            url: 'https://atlasclub.web.app/cruises',
            path: '/cruises',
            icon: '🚢',
          },
          {
            title: isNo ? 'Billeie & Kjøretøy' : 'Prestige Fleet & Car Rental',
            badge: isNo ? '0,- Egenandel' : 'Zero Excess Deductible',
            badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
            desc: isNo
              ? 'Premium billeie og luksusflåte med inkluderte forsikringer og VIP-levering.'
              : 'Corporate rates on executive SUVs, luxury fleets, and guaranteed curbside delivery.',
            url: 'https://atlasclub.web.app/cars',
            path: '/cars',
            icon: '🚗',
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
              ? 'Safarier, helikopterturer og kuraterte reisemålsopplevelser.'
              : 'Private aviation charters, grand cru vineyard access, and bespoke adventures reserved for members.',
            url: 'https://atlasclub.web.app/activities',
            path: '/activities',
            icon: '🏄‍♂️',
          },
        ],
      },
      {
        title: isNo ? '💎 Medlemskap, Lojalitet & Verdi' : '💎 Membership, Loyalty & Value Proposition',
        cards: [
          {
            title: isNo ? 'ATLAS Rewards Hvelv' : 'Rewards Vault & Club Credits',
            badge: isNo ? '100p = $1 USD' : '100 pts = $1 USD',
            badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
            desc: isNo
              ? 'Oversikt over opptjente Club Credits, opptjeningsstatus, 50 % samfinansieringstak og VCC-oppgjørsregler.'
              : 'Real-time ledger of earned and redeemed credits, 50% co-pay cap, and treasury liquidity guards.',
            url: 'https://atlasclub.web.app/rewards',
            path: '/rewards',
            icon: '💎',
            primary: true,
          },
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
          {
            title: isNo ? 'Juridisk & Samsvarshub' : 'Compliance & Governance Hub',
            badge: isNo ? 'Kommersielle Vilkår' : 'Commercial Terms',
            badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
            desc: isNo
              ? 'Lovfestede garantier, Reisegarantifondet (RGF), lukkede antitrustnotater og kommersielle tokenvilkår.'
              : 'Statutory guarantees, Norwegian RGF, closed-loop antitrust briefs, and commercial token covenants.',
            url: 'https://atlasclub.web.app/legal',
            path: '/legal',
            icon: '⚖️',
          },
        ],
      },
      {
        title: isNo ? '🏢 Institusjonelt Salg, B2B & Bedriftsavtaler' : '🏢 Institutional Sales, B2B & Enterprise Portals',
        cards: [
          {
            title: isNo ? 'B2B Hovedportal & Bedriftsfordeler' : 'Institutional Sales Hub & Enterprise B2B',
            badge: isNo ? '30–50 % Reisebesparelser' : '30–50% Corporate Savings',
            badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            desc: isNo
              ? 'Hovedsiden for bedriftsavtaler: Interaktiv ansattkalkulator, engrosavtaler, MVA-fradrag og forespørselsskjema.'
              : 'Enterprise portal with corporate headcount savings calculator, zero-markup NDC flights, and lead acquisition.',
            url: 'https://atlasclub.web.app/b2b',
            path: '/b2b',
            icon: '🏢',
            primary: true,
          },
          {
            title: isNo ? 'Agenturer.no B2B Medlemsportal' : 'Agenturer.no Co-Branded Portal',
            badge: isNo ? 'Live Partner-Portal' : 'Live Partner Environment',
            badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
            desc: isNo
              ? 'Aktiv partnerportal for Agenturer.no med e-postvalidering (@agenturer.no), 35 % rabatt og digitalt Agent-pass.'
              : 'Live co-branded partner portal for Agenturer.no with automated domain verification and member benefits.',
            url: 'https://atlasclub.web.app/b2b/portal/agenturer-no',
            path: '/b2b/portal/agenturer-no',
            icon: '🤝',
          },
          {
            title: isNo ? 'Tekna B2B Organisasjonsportal' : 'Tekna Organization Portal',
            badge: isNo ? '105 000 Medlemmer' : '105,000 Engineers',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            desc: isNo
              ? 'Eksempel på storskala foreningsfordel for Tekna-ingeniører med 40 % engrosrabatt og EU261-passasjersikring.'
              : 'Large-scale union and association benefit model with 40% wholesale hotel discounts and EU261 flight protection.',
            url: 'https://atlasclub.web.app/b2b/portal/tekna',
            path: '/b2b/portal/tekna',
            icon: '🎓',
          },
          {
            title: isNo ? 'Enterprise Case Study' : 'Enterprise ROI Case Study',
            badge: isNo ? 'Finansiell Analyse' : 'Financial Case Study',
            badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
            desc: isNo
              ? 'Konkret analyse av hvordan en bedrift kutter 30–50 % på forretningsreiser mot tradisjonelle reisebyråer.'
              : 'Detailed institutional case study detailing net corporate yield, OTA margin elimination, and automated receipting.',
            url: 'https://atlasclub.web.app/case-study',
            path: '/case-study',
            icon: '📊',
          },
          {
            title: isNo ? 'Pris- og Revisjonsbevis (Proof)' : 'Audit & Rate Proof Hub',
            badge: isNo ? 'Verifiserte Reiser' : 'Audited Bookings',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            desc: isNo
              ? 'Reelle prissammenligninger og revisjonsbevis for bedriftskunder og CFO som dokumenterer besparelsene.'
              : 'Direct pricing audit logs and supplier confirmations proving tangible savings over public booking channels.',
            url: 'https://atlasclub.web.app/proof',
            path: '/proof',
            icon: '🧾',
          },
          {
            title: isNo ? 'Strategiske B2B Partnere' : 'Strategic Supplier Network',
            badge: isNo ? 'Leverandørøkosystem' : 'Wholesale Consortium',
            badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
            desc: isNo
              ? 'Oversikt over våre leverandører og integrasjoner: WebBeds, Duffel NDC, DragonPass og Stripe Enterprise.'
              : 'Comprehensive directory of direct bedbanks, airline aggregators, and global lounge infrastructure partners.',
            url: 'https://atlasclub.web.app/partners',
            path: '/partners',
            icon: '🌐',
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

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // PASSWORD GATE IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans antialiased text-slate-900">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <Lock className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-bold tracking-wider uppercase">
              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
              {isNo ? 'Sikkerhetsbeskyttet Portal' : 'Security Protected Portal'}
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isNo ? 'ATLAS Mission Control' : 'ATLAS Mission Control'}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isNo
                ? 'Dette er et beskyttet internt administrasjonsområde. Tast inn din adgangskode for å fortsette.'
                : 'This is a private administrative gateway. Enter your master passkey to unlock access.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                {isNo ? 'Adgangskode' : 'Master Passkey'}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError('');
                }}
                placeholder={isNo ? 'Tast inn adgangskode...' : 'Enter passkey...'}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{isNo ? 'Lås Opp Portal' : 'Unlock Portal'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>ATLAS Travel Club &bull; Confidential</span>
            <button
              onClick={() => setLocale(isNo ? 'en' : 'no')}
              className="font-bold text-slate-600 hover:text-slate-900 underline"
            >
              {isNo ? 'Switch to English' : 'Bytt til Norsk'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-12 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Language selector & Logout in Portal Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isNo ? 'Autentisert Sesjon' : 'Authenticated Session'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-all cursor-pointer shadow-2xs"
            >
              {isNo ? 'Lås portal (Logg ut)' : 'Lock Portal (Log Out)'}
            </button>

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
          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8">
            {content.subtitle}
          </p>

          {/* OFFICIAL CARD & APPLE WALLET SHOWCASE */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
              <div className="inline-block px-3.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                {content.cardShowcaseTitle}
              </div>
              <p className="text-slate-400 text-xs md:text-sm mb-6">{content.cardShowcaseSub}</p>
              <div className="overflow-hidden rounded-2xl border border-amber-500/30 shadow-2xl max-w-2xl mx-auto">
                <img 
                  src="/atlas-final-card.jpg" 
                  alt="ATLAS Travel Card" 
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            {/* DIGITAL APPLE WALLET PASS & LIQUIDITY GUARD */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {isNo ? 'Digitalt Medlemskort' : 'Digital Member Pass'}
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      {isNo ? 'Apple Wallet & Rewards Vault Pass' : 'Apple Wallet & Rewards Vault Pass'}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="/api/cards/wallet-pass/download?platform=apple&memberId=ATLAS-FOUNDER-001&availablePoints=42500&pendingPoints=79000"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow"
                  >
                    <span></span>
                    <span>{isNo ? 'Apple Wallet (.pkpass)' : 'Apple Wallet (.pkpass)'}</span>
                  </a>
                  <a
                    href="/api/cards/wallet-pass/download?platform=google&memberId=ATLAS-FOUNDER-001&availablePoints=42500&pendingPoints=79000"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow"
                  >
                    <span className="text-amber-400">G</span>
                    <span>{isNo ? 'Google Wallet (JWT)' : 'Google Wallet (JWT)'}</span>
                  </a>
                  <Link
                    href="/rewards"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all"
                  >
                    <span>{isNo ? 'Hvelv →' : 'Vault →'}</span>
                  </Link>
                </div>
              </div>

              {/* LIVE BALANCES WITH LIQUIDITY STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {isNo ? 'Disponibel Saldo (Klar til bruk)' : 'Available to Spend'}
                    </span>
                    <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded text-emerald-900">100% Likvid</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    42 500 <span className="text-sm font-bold text-slate-500">PTS</span>
                    <span className="text-xs font-bold text-emerald-700 ml-2">≈ 4 250 NOK</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2">
                    {isNo 
                      ? 'Motregnes automatisk din 1 290 kr årsfaktura i Stripe, eller kan overføres til bankkonto ved overskudd.'
                      : 'Automatically offsets your 1 290 NOK annual renewal in Stripe, or withdrawable upon surplus.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {isNo ? 'Venter på oppgjør (In Escrow)' : 'Pending Clearance (In Escrow)'}
                    </span>
                    <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded text-amber-900">30–60 Dager</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    79 000 <span className="text-sm font-bold text-slate-500">PTS</span>
                    <span className="text-xs font-bold text-amber-800 ml-2">≈ 7 900 NOK</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2">
                    {isNo 
                      ? 'Opptjent fra Regent Seven Seas Cruise. Fristilles når provisjonen er fysisk innbetalt til HARD ROCK CAPITAL LTD.'
                      : 'Earned on Regent Cruise voyage. Matures once commission has physically settled into HARD ROCK CAPITAL LTD.'}
                  </p>
                </div>
              </div>

              {/* STRICT LIQUIDITY BANNER */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">
                    {isNo ? 'Ufravikelig Likviditetsregel: ' : 'Immutable Solvency Protocol: '}
                  </span>
                  <span>
                    {isNo
                      ? 'Medlemmer kan aldri bruke poeng før provisjonene eller betalingen er fysisk mottatt på selskapets bankkonto. Dette eliminerer likviditetsrisiko for HARD ROCK CAPITAL LTD.'
                      : 'Points can strictly never be spent before supplier commissions are physically collected into the corporate treasury of HARD ROCK CAPITAL LTD.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
