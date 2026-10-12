'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Plane,
  Building,
  Headphones,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface FaqItem {
  qNo: string;
  qEn: string;
  aNo: string;
  aEn: string;
  category: 'membership' | 'parity' | 'bookings' | 'lounges';
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'membership',
    qNo: 'Hva er ATLAS Travel Club, og hvordan skiller dere dere fra vanlige bookingsider?',
    qEn: 'What is ATLAS Travel Club, and how do you differ from regular booking platforms?',
    aNo: 'ATLAS Travel Club er en lukket, medlemsbasert reiseklubb forbeholdt inviterte og godkjente medlemmer. Fordi vi ikke er en åpen forhandlerside, omgår vi Rate Parity-klausuler fra hoteller og flyselskaper, noe som gir våre medlemmer tilgang til rene grossist- og nettopriser uten provisjonspåslag.',
    aEn: 'ATLAS Travel Club is a private, members-only travel collective. Because our rates are shielded behind a private membership wall, we bypass standard OTA Rate Parity clauses, granting members pure wholesale net rates with zero retail commission markups.',
  },
  {
    category: 'parity',
    qNo: 'Hva innebærer 110% Rate Parity Guarantee (Prismatch)?',
    qEn: 'What does the 110% Rate Parity Guarantee entail?',
    aNo: 'Dersom du finner det samme hotellrommet eller flyet billigere offentlig tilgjengelig på en autorisert nettside (f.eks. Booking.com eller Expedia) med identiske vilkår innen 24 timer etter bestilling, refunderer vi prisforskjellen pluss 10% ekstra i reisekreditt.',
    aEn: 'If you locate an identical publicly bookable room or flight on an authorized site with matching terms within 24 hours of booking, ATLAS refunds the complete difference plus an extra 10% in travel credits.',
  },
  {
    category: 'lounges',
    qNo: 'Hvordan fungerer tilgangen til flyplasslounger med DragonPass?',
    qEn: 'How does DragonPass airport lounge access work for members?',
    aNo: 'Alle Platinum- og Founder-medlemmer har ubegrenset digital tilgang til over 1 300 VIP-lounger globalt gjennom vårt integrerte DragonPass-samarbeid. Du genererer ditt digitale lounge-pass direkte i appen med en QR-kode som scannes ved inngangen.',
    aEn: 'Platinum and Founder members enjoy digital lounge access across 1,300+ lounges globally via our DragonPass integration. Digital lounge boarding passes are generated directly within the app via a scannable QR code.',
  },
  {
    category: 'bookings',
    qNo: 'Kan jeg bestille reiser for venner og familie med mitt medlemskap?',
    qEn: 'Can I book travel for friends and family using my membership?',
    aNo: 'Ja! Som medlem kan du bestille hotellrom, villaer og flyreiser for reisefølget ditt. Medlemmet må selv administrere bestillingen gjennom sin profil.',
    aEn: 'Yes! Members can book accommodations, private villas, and flights for companions and family traveling with them through their account dashboard.',
  },
  {
    category: 'bookings',
    qNo: 'Hvilke kansellerings- og endringsvilkår gjelder for medlemsbestillinger?',
    qEn: 'What cancellation and change policies apply to bookings?',
    aNo: 'De fleste av våre hotell- og leiebilbestillinger inkluderer gratis avbestilling frem til 24–48 timer før ankomst. For fly gjelder flyselskapets respektive billettregler, med full assistanse fra vårt 24/7 Concierge-team.',
    aEn: 'Most hotel and car rental bookings include flexible complimentary cancellation up to 24–48 hours before check-in. Flight changes follow airline fare rules with complete assistance from our VIP concierge team.',
  },
  {
    category: 'membership',
    qNo: 'Hva koster et medlemskap, og er det bindingstid?',
    qEn: 'How much does membership cost, and is there a lock-in period?',
    aNo: 'Vi tilbyr medlemskap fra Silver til Founder-nivå, både som månedlig og årlig abonnement. Årlig medlemskap gir to måneder gratis og prioriterte flyplassfordeler. Det er ingen bindingstid utover den forhåndsbetalte perioden.',
    aEn: 'We offer tiers from Silver to Founder on both monthly and annual subscriptions. Annual plans grant two complimentary months and priority status. There are no lock-in commitments beyond your paid cycle.',
  },
];

export default function FaqPage() {
  const { currentLanguage } = useLanguage();
  const isNo = currentLanguage === 'no';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const q = isNo ? item.qNo : item.qEn;
    const a = isNo ? item.aNo : item.aEn;
    const matchesSearch =
      q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F3F4F6] selection:bg-[#D4AF37] selection:text-black">
      {/* Header */}
      <div className="relative pt-12 pb-20 px-4 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#07090C] to-[#07090C]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            {isNo ? 'Ofte Stilte Spørsmål' : 'Frequently Asked Questions'}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-4">
            {isNo ? 'Svar på det du lurer på' : 'Everything You Need to Know'}
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            {isNo
              ? 'Lær mer om hvordan ATLAS Travel Club sikrer grossistpriser, våre garantier, medlemsfordeler og VIP Concierge.'
              : 'Detailed answers on wholesale pricing mechanics, rate guarantees, lounge access, and concierge privileges.'}
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isNo ? 'Søk i spørsmål...' : 'Search questions...'}
              className="w-full bg-[#121620] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[
            { id: 'all', label: isNo ? 'Alle spørsmål' : 'All Topics' },
            { id: 'membership', label: isNo ? 'Medlemskap & Planer' : 'Membership' },
            { id: 'parity', label: isNo ? 'Prisgaranti & Besparelser' : 'Price Parity' },
            { id: 'lounges', label: isNo ? 'Fly & Lounger' : 'Lounges & Flights' },
            { id: 'bookings', label: isNo ? 'Bestilling & Vilkår' : 'Bookings & Policies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0E121A] border border-white/10 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif font-bold text-base md:text-lg text-white">
                    {isNo ? item.qNo : item.qEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-amber-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                    {isNo ? item.aNo : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Concierge banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                {isNo ? 'Fant du ikke det du lette etter?' : 'Still have questions?'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {isNo
                  ? 'Vårt 24/7 VIP Concierge-team står klart til å assistere deg.'
                  : 'Our dedicated 24/7 VIP Concierge team is always on call.'}
              </p>
            </div>
          </div>
          <Link
            href="/membership"
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110 shadow-lg shadow-amber-500/20 shrink-0 flex items-center gap-1.5"
          >
            {isNo ? 'Kontakt Concierge' : 'Contact Concierge'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
