'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
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
    qNo: 'Hva er Atlas, og hvordan skiller dere dere fra vanlige bestillingssider?',
    qEn: 'What is ATLAS Travel Club, and how do you differ from regular booking platforms?',
    aNo: 'Atlas er en lukket medlemsklubb forbeholdt medlemmer. Fordi prisene våre vises bak en sikker innlogging, omgår vi prisparitetsklausuler fra hoteller og flyselskaper. Dette gir våre medlemmer direkte tilgang til ekte B2B-engrospriser helt uten provisjon eller påslag.',
    aEn: 'ATLAS Travel Club is a private, members-only travel collective. Because our rates are shielded behind a private membership wall, we bypass standard OTA Rate Parity clauses, granting members pure wholesale net rates with zero retail commission markups.',
  },
  {
    category: 'parity',
    qNo: 'Hva innebærer prisgarantien vår?',
    qEn: 'What does the 110% Rate Parity Guarantee entail?',
    aNo: 'Dersom du finner det samme hotellrommet eller flyet billigere offentlig tilgjengelig på en autorisert nettside (som Booking.com eller Expedia) med identiske vilkår innen 24 timer etter bestilling, refunderer vi prisforskjellen pluss 10 % ekstra i reisekreditt.',
    aEn: 'If you locate an identical publicly bookable room or flight on an authorized site with matching terms within 24 hours of booking, ATLAS refunds the complete difference plus an extra 10% in travel credits.',
  },
  {
    category: 'lounges',
    qNo: 'Hvordan fungerer tilgangen til flyplasslounger med DragonPass?',
    qEn: 'How does DragonPass airport lounge access work for members?',
    aNo: 'Alle medlemmer har digital tilgang til over 1 400 VIP-lounger globalt gjennom vårt partnerskap med DragonPass for kun 330 kr per besøk (ordinær dørpris ca. 700–950 kr). Du henter ditt digitale pass direkte i appen og viser QR-koden ved inngangen.',
    aEn: 'Platinum and Founder members enjoy digital lounge access across 1,300+ lounges globally via our DragonPass integration. Digital lounge boarding passes are generated directly within the app via a scannable QR code.',
  },
  {
    category: 'bookings',
    qNo: 'Kan jeg bestille reiser for venner og familie med mitt medlemskap?',
    qEn: 'Can I book travel for friends and family using my membership?',
    aNo: 'Ja. Som medlem kan du bestille hotellrom, leiebil og flyreiser for familie og venner du reiser sammen med. Du administrerer reservasjonene direkte fra din egen medlemskonto.',
    aEn: 'Yes! Members can book accommodations, private villas, and flights for companions and family traveling with them through their account dashboard.',
  },
  {
    category: 'bookings',
    qNo: 'Hvilke avbestillings- og endringsvilkår gjelder for medlemsbestillinger?',
    qEn: 'What cancellation and change policies apply to bookings?',
    aNo: 'De fleste av våre hotell- og leiebilbestillinger inkluderer gratis avbestilling frem til 24–48 timer før ankomst. For fly gjelder flyselskapets billettregler, med full oppfølging fra vår døgnåpne concierge.',
    aEn: 'Most hotel and car rental bookings include flexible complimentary cancellation up to 24–48 hours before check-in. Flight changes follow airline fare rules with complete assistance from our VIP concierge team.',
  },
  {
    category: 'membership',
    qNo: 'Hva koster et medlemskap, og er det bindingstid?',
    qEn: 'How much does membership cost, and is there a lock-in period?',
    aNo: 'Atlas har en fast årskontingent på 1 290 kr per år (kun 107,50 kr per måned). Til gjengjeld tar vi 0 kr i påslag og 0 kr i bestillingsgebyrer på alt – hotell, bil, fly og VIP-lounger. Det er ingen bindingstid utover den forhåndsbetalte perioden.',
    aEn: 'ATLAS operates on a pure flat membership of 1 290 NOK / year (~$120 / yr or ~107 NOK/mo). In return, you get 0 kr booking fees and 0% markups on everything – hotels, cars, flights, and VIP airport services. There are no lock-in commitments beyond your paid term.',
  },
  {
    category: 'membership',
    qNo: 'Hvordan fungerer Atlas Travel Kickback?',
    qEn: 'How does the ATLAS Club Credits loyalty system work?',
    aNo: 'Når du bestiller reiser der leverandøren utbetaler provisjon (for eksempel cruise og enkelte pakkereiser), deler Atlas denne provisjonen 50/50 direkte tilbake til din medlemskonto. Saldoen kan motregnes neste års medlemskontingent (1 290 kr) eller tas ut direkte.',
    aEn: 'Whenever you book hotels or cruises, you earn ATLAS Club Credits pegged at 100 points = $1.00 USD. Accumulated credits can be spent like cash on future bookings. To ensure platform liquidity, credits can cover up to 50% of any reservation total (50% co-payment cap), with a minimum redemption floor of 5,000 points ($50).',
  },
  {
    category: 'bookings',
    qNo: 'Hvordan fungerer cruisebestillinger og ombordkreditt?',
    qEn: 'How do cruise bookings and onboard credits (OBC) work?',
    aNo: 'Vi tilbyr direkte tilgang til over 25 000 seilinger via verdens ledende luksusrederier (inkludert Silversea, Regent Seven Seas, Celebrity og Ritz-Carlton Yacht Collection). Svært mange avganger inkluderer eksklusiv kreditt om bord (opptil 600 USD) samt 50 % kickback på provisjonen.',
    aEn: 'We provide direct wholesale booking access to over 25,000 itineraries across world-class cruise lines (including Silversea, Regent Seven Seas, Celebrity, and Ritz-Carlton Yacht Collection). Qualifying voyages feature exclusive onboard credits (up to $600 USD) plus ATLAS Club Credits earned on the entire journey.',
  },
  {
    category: 'parity',
    qNo: 'Når blir opptjent kickback utbetalt til min konto?',
    qEn: 'When do earned Club Credits vest and become available in my Rewards Vault?',
    aNo: 'For å sikre mot kanselleringer utbetales kickback så snart leverandøren har bekreftet gjennomført reise – normalt 7 dager etter utsjekk for hotell og 14 dager etter endt seilas for cruise.',
    aEn: 'To safeguard against booking cancellations, points are cleared into your spendable vault balance following completion of travel: 7 days post check-out for hotels, and 14 days post disembarkation for cruises, upon partner commission reconciliation.',
  },
];

export default function FaqPage() {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Light Header */}
      <div className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            {isNo ? 'Ofte stilte spørsmål' : 'Frequently Asked Questions'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isNo ? 'Svar på det du lurer på' : 'Everything You Need to Know'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
            {isNo
              ? 'Lær mer om hvordan Atlas fungerer, prisgarantien vår, medlemsfordeler og personlig concierge.'
              : 'Detailed answers on wholesale pricing mechanics, rate guarantees, lounge access, and concierge privileges.'}
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isNo ? 'Søk i spørsmål...' : 'Search questions...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[
            { id: 'all', label: isNo ? 'Alle spørsmål' : 'All Topics' },
            { id: 'membership', label: isNo ? 'Medlemskap' : 'Membership' },
            { id: 'parity', label: isNo ? 'Prisgaranti' : 'Price Parity' },
            { id: 'lounges', label: isNo ? 'Fly og lounger' : 'Lounges & Flights' },
            { id: 'bookings', label: isNo ? 'Bestilling og vilkår' : 'Bookings & Policies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
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
                className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900">
                    {isNo ? item.qNo : item.qEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {isNo ? item.aNo : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Concierge banner */}
        <div className="mt-16 bg-white border border-amber-200/80 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                {isNo ? 'Fant du ikke det du lette etter?' : 'Still have questions?'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {isNo
                  ? 'Vårt 24/7 VIP Concierge-team står klart til å assistere deg.'
                  : 'Our dedicated 24/7 VIP Concierge team is always on call.'}
              </p>
            </div>
          </div>
          <Link
            href="/membership"
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-xs shrink-0 flex items-center gap-1.5"
          >
            {isNo ? 'Kontakt Concierge' : 'Contact Concierge'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
