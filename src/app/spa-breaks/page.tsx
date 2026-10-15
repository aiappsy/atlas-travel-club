'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Utensils,
  MapPin,
  Heart,
  ArrowRight,
  Plane,
  Compass,
  Wine,
  Coffee,
  HelpCircle,
  Copy,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

interface SpaHotelItem {
  id: string;
  name: string;
  region: string;
  location: string;
  duration: string;
  rating: number;
  image: string;
  halfBoardEstNo: string;
  halfBoardEstEn: string;
  normalRoomValueNo: string;
  normalRoomValueEn: string;
  tagsNo: string[];
  tagsEn: string[];
  descriptionNo: string;
  descriptionEn: string;
  highlightsNo: string[];
  highlightsEn: string[];
}

const SPA_HOTEL_DATA: SpaHotelItem[] = [
  {
    id: 'dolomites-alpine-spa',
    name: 'Alpenresort Belvedere & Thermal Spa',
    region: 'Syd-Tirol / Dolomittene, Italia',
    location: 'Molveno, Dolomittene',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 490 kr (€42) per pers/dag',
    halfBoardEstEn: 'approx. $45 / €42 per person/day',
    normalRoomValueNo: '5 400 kr',
    normalRoomValueEn: '$520',
    tagsNo: ['Fjellpanorama', 'Oppvarmet utendørsbasseng', 'Gourmet 4-retter'],
    tagsEn: ['Mountain panorama', 'Heated outdoor pool', 'Gourmet 4-course'],
    descriptionNo: 'Majestetisk utsikt over Dolomittene og Molvenosjøen. Prisbelønt spa-anlegg med finsk badstue og panoramautsikt.',
    descriptionEn: 'Panoramic alpine views of the Dolomites and Lake Molveno. Award-winning thermal wellness and traditional gourmet dining.',
    highlightsNo: ['Frokostbuffé med lokale råvarer', '4-retters kveldsmeny inkludert', 'Fri adgang til 1 200 kvm spa-senter'],
    highlightsEn: ['Alpine breakfast buffet', '4-course daily gourmet dinner', 'Complimentary 1,200 sqm wellness access'],
  },
  {
    id: 'chianti-castle-wine',
    name: 'Castello di Spaltenna & Tuscan Spa',
    region: 'Toscana, Italia',
    location: 'Gaiole in Chianti, Toscana',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 580 kr (€50) per pers/dag',
    halfBoardEstEn: 'approx. $54 / €50 per person/day',
    normalRoomValueNo: '6 800 kr',
    normalRoomValueEn: '$650',
    tagsNo: ['Historisk slott', 'Michelin-guide kjøkken', 'Vingård'],
    tagsEn: ['Historic castle', 'Michelin-listed dining', 'Vineyard'],
    descriptionNo: 'Ekte 10. århundre slott og kloster omgitt av Chiantis bølgende vinmarker. Eget vinhvelv og La Pieve spa.',
    descriptionEn: 'Authentic 10th-century castle and monastery amidst rolling Chianti vineyards. Private wine cellars and La Pieve spa.',
    highlightsNo: ['Toskansk frokost og kveldens gourmetmiddag', 'Innendørs oppvarmet basseng & badstuer', 'Mulighet for vinsmaking på slottet'],
    highlightsEn: ['Tuscan breakfast & chef evening dining', 'Indoor heated pool & saunas', 'On-site estate wine cellar tours'],
  },
  {
    id: 'schwarzwald-thermal-park',
    name: 'Parkhotel Adler & Schwarzwald Spa',
    region: 'Schwarzwald, Tyskland',
    location: 'Hinterzarten, Tyskland',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 520 kr (€45) per pers/dag',
    halfBoardEstEn: 'approx. $48 / €45 per person/day',
    normalRoomValueNo: '5 900 kr',
    normalRoomValueEn: '$560',
    tagsNo: ['Boutique luksus', 'Skogsterapi', 'Oppvarmet saltvannsbasseng'],
    tagsEn: ['Boutique luxury', 'Forest wellness', 'Heated brine pool'],
    descriptionNo: 'Klassisk tysk kurhotelltradisjon i hjertet av Schwarzwald. Romantisk parkområde og ro for kropp og sjel.',
    descriptionEn: 'Historic Black Forest sanctuary set in a private 4-hectare park. Restorative spa suites and regional gastronomy.',
    highlightsNo: ['Rikelig Schwarzwald-frokost', 'Flerretters kveldsmeny fra mesterkokker', 'Fri adgang til badeland og saunaer'],
    highlightsEn: ['Black Forest breakfast buffet', 'Multi-course regional evening menu', 'Full access to spa & indoor brine pool'],
  },
  {
    id: 'salzburg-alpine-wellness',
    name: 'Hotel Gut Brandlhof Golf & Alpine Spa',
    region: 'Salzburgerland, Østerrike',
    location: 'Saalfelden, Østerrike',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 540 kr (€46) per pers/dag',
    halfBoardEstEn: 'approx. $50 / €46 per person/day',
    normalRoomValueNo: '6 200 kr',
    normalRoomValueEn: '$590',
    tagsNo: ['Alpeutsikt', 'Golf & ski', '3 000 kvm Vividus Spa'],
    tagsEn: ['Alpine views', 'Golf & ski', '3,000 sqm Vividus Spa'],
    descriptionNo: 'Plassert ved foten av Steinernes Meer. Enorme velværearealer, innendørs og utendørs bassenger og østerriksk gjestfrihet.',
    descriptionEn: 'Nestled beneath dramatic alpine crags in Salzburg province. Extensive indoor/outdoor pools and Austrian culinary excellence.',
    highlightsNo: ['Østerriksk frokost med eggestasjon', 'Kveldens 4-retters gourmetmeny', 'Fri bruk av Vividus Spa & saunalandskap'],
    highlightsEn: ['Artisanal breakfast & egg station', 'Evening 4-course alpine dinner', 'Complimentary Vividus wellness access'],
  },
  {
    id: 'provence-lavender-estate',
    name: 'Domaine de l\'Enclos & Provence Spa',
    region: 'Provence, Frankrike',
    location: 'Gordes / Luberon, Frankrike',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 620 kr (€54) per pers/dag',
    halfBoardEstEn: 'approx. $58 / €54 per person/day',
    normalRoomValueNo: '7 400 kr',
    normalRoomValueEn: '$710',
    tagsNo: ['Lavendelmarker', 'Fransk gastronomi', 'Privat hage'],
    tagsEn: ['Lavender fields', 'French dining', 'Private gardens'],
    descriptionNo: 'Romantisk herregård omgitt av sypresser og lavendel i Luberon. Fransk kokkekunst og stille luksus.',
    descriptionEn: 'Romantic Provençal stone estate nestled among lavender and olive groves. Authentic French culinary distinction.',
    highlightsNo: ['Fransk bakerfrokost med ferske croissanter', 'Kveldens provencalske gourmetmåltid', 'Stille svømmebasseng i olivenhagen'],
    highlightsEn: ['French bakery breakfast', 'Provençal evening gourmet dinner', 'Quiet pool set in the olive orchard'],
  },
  {
    id: 'lake-garda-panorama',
    name: 'Grand Hotel Riva & Garda Wellness',
    region: 'Gardasjøen, Italia',
    location: 'Riva del Garda, Italia',
    duration: '3 dager / 2 netter (Dobbeltrom)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    halfBoardEstNo: 'ca. 510 kr (€44) per pers/dag',
    halfBoardEstEn: 'approx. $47 / €44 per person/day',
    normalRoomValueNo: '5 800 kr',
    normalRoomValueEn: '$550',
    tagsNo: ['Sjøutsikt', 'Takbalkong', 'Historisk sentrum'],
    tagsEn: ['Lake view', 'Rooftop terrace', 'Historic center'],
    descriptionNo: 'Spektakulær beliggenhet like ved vannkanten i Riva del Garda. Takrestaurant med utsikt over hele sjøen og fjellet.',
    descriptionEn: 'Breathtaking setting on the northern shores of Lake Garda. Panoramic rooftop dining and lakeside wellness pavilion.',
    highlightsNo: ['Rikholdig italiensk frokostbuffé', 'Italiensk 4-retters kveldsmeny', 'Fri inngang til wellness- og badstueavdeling'],
    highlightsEn: ['Italian breakfast buffet', '4-course lakeside evening dinner', 'Full access to sauna and relaxation zone'],
  },
];

export default function SpaBreaksPage() {
  const { locale } = useLanguage();
  const { user, isMember } = useAuth();
  const isNo = locale === 'no';

  const [claimedVoucher, setClaimedVoucher] = useState<{
    code: string;
    expiresAt: string;
    portalUrl: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleClaimVoucher = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/vouchers/claim-connex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Kunne ikke hente pass');
      }

      setClaimedVoucher(data.voucher);
    } catch (err: any) {
      setError(err.message || 'Det oppstod en feil ved henting av passet.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (claimedVoucher?.code) {
      navigator.clipboard.writeText(claimedVoucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isNo ? 'Atlas Gourmet & Spaturer i Europa' : 'Atlas European Gourmet & Spa Escapes'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {isNo ? (
              <>Bo gratis på 1 500 boutique- og spahoteller – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">du betaler kun for maten</span></>
            ) : (
              <>Complimentary luxury hotel stays for two – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">you pay only for dining</span></>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {isNo
              ? 'Som Atlas-medlem er selve hotellrommet 100 % spandert (0 kr i rompris for 2 personer i opptil 3–6 netter). Eneste betingelse er at dere nyter hotellets faste frokost og kveldens gourmet-middag. En genial modell som sparer dere for tusenvis av kroner på europeiske helgeturer!'
              : 'As an Atlas VIP Member, your double room accommodation is 100% complimentary ($0 room charge for 2 guests for up to 3–6 nights). The only condition: enjoy the hotel breakfast and multi-course chef dinner. Save $500–$800 on romantic getaways!'}
          </p>

          {/* CLAIM VOUCHER ACTION BOX */}
          <div className="max-w-xl mx-auto mt-10 p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl text-left">
            {!claimedVoucher ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      {isNo ? 'Inkludert i ditt medlemskap' : 'Included in Your Membership'}
                    </div>
                    <div className="text-lg font-black text-white">
                      {isNo ? 'Atlas Gourmet & Spa-Pass' : 'Atlas European Spa Pass'}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                    {isNo ? '0 kr (Inkludert)' : '$0 Included'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isNo
                    ? 'Klikk nedenfor for å hente ut din unike digitale kode. Koden aktiveres umiddelbart og gir deg tilgang til å velge blant 1 500 kvalitetshoteller i Alpene, Italia, Tyskland, Frankrike og Østerrike.'
                    : 'Click below to generate your unique digital access pass. Activates instantly with 365-day booking validity across 1,500 curated hotels.'}
                </p>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleClaimVoucher}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isNo ? 'Tildeler digitalt pass...' : 'Assigning Digital Pass...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{isNo ? 'Hent mitt inkluderte hotellpass nå' : 'Claim My Complimentary Pass Now'}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isNo ? 'Ditt pass er aktivert og klart!' : 'Your Pass is Active & Ready!'}</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isNo ? 'Din unike Holiday Plus-kode:' : 'Your Unique Holiday Plus Code:'}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                      {claimedVoucher.code}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? (isNo ? 'Kopiert!' : 'Copied!') : (isNo ? 'Kopier' : 'Copy')}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    {isNo ? 'Gyldig for booking inntil 31. oktober 2027.' : 'Valid for booking until October 31, 2027.'}
                  </div>
                </div>

                <a
                  href={claimedVoucher.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isNo ? 'Åpne katalogen og velg hotell' : 'Open Catalog & Choose Hotel'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INFORMATION & ECONOMICS EXPLAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* HOW THE MATH WORKS (TRANSPARENCY BOX) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isNo ? '100% Gjennomsiktig regnestykke' : '100% Transparent Economics'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Hvordan kan overnattingen være gratis?' : 'How Can The Accommodation Be Complimentary?'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {isNo
                ? 'Europeiske boutique- og spahoteller har ofte tomme rom utenfor de mest hektiske helgene. For å fylle rommene sine uten å dumpe prisene åpent på Booking.com, stiller de rommet til disposisjon for Atlas-medlemmer mot at dere spiser frokost og middag på hotellet. En vinn-vinn for begge parter!'
                : 'European boutique hotels leverage distressed capacity off-peak. Instead of discounting publicly on OTAs, they grant complimentary rooms to Atlas members in exchange for enjoying their half-board culinary program.'}
            </p>
          </div>

          {/* SIDE BY SIDE COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TRADITIONAL WAY */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isNo ? 'Den tradisjonelle måten (Uten Atlas)' : 'Traditional Booking (Without Atlas)'}
              </div>
              <div className="text-2xl font-black text-slate-900">
                {isNo ? 'Totalt ca. 9 500 kr' : 'Approx. $900 Total'}
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>{isNo ? 'Hotellrom (3 netter for 2 pers):' : 'Hotel Room (3 nights for 2):'}</span>
                  <span className="font-bold text-slate-900">6 500 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>{isNo ? 'Frokost & restaurantmiddag ute:' : 'Breakfast & dining out:'}</span>
                  <span className="font-bold text-slate-900">3 000 kr</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 italic">
                {isNo ? 'Du betaler full pris for både rommet og restaurantbesøkene.' : 'You pay retail for both lodging and off-site meals.'}
              </div>
            </div>

            {/* WITH ATLAS GOURMET PASS */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-300 space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                {isNo ? 'Atlas Medlemsfordel' : 'Atlas Member Benefit'}
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {isNo ? 'Med Atlas Gourmet & Spa-Pass' : 'With Atlas Gourmet & Spa Pass'}
              </div>
              <div className="text-2xl font-black text-emerald-950">
                {isNo ? 'Totalt kun ca. 2 800 kr' : 'Approx. $270 Total'}
              </div>

              <div className="space-y-2 text-xs text-emerald-950 pt-2 border-t border-emerald-200">
                <div className="flex justify-between">
                  <span>{isNo ? 'Hotellrom (3 netter for 2 pers):' : 'Hotel Room (3 nights for 2):'}</span>
                  <span className="font-black text-emerald-700">0 kr (100% dekket av Atlas)</span>
                </div>
                <div className="flex justify-between">
                  <span>{isNo ? 'Frokost & 4-retters gourmetmiddag på hotellet:' : 'Hotel breakfast & 4-course chef dinner:'}</span>
                  <span className="font-bold text-slate-900">ca. 2 800 kr (€45/pers/dag)</span>
                </div>
              </div>

              <div className="text-xs font-black text-emerald-900 bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-300">
                🎉 {isNo ? 'Du sparer over 6 700 kr på en helgetur for to!' : 'You save over $630 on a romantic getaway!'}
              </div>
            </div>
          </div>
        </div>

        {/* CURATED SHOWCASE HOTELS */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
              <Wine className="w-3.5 h-3.5 text-amber-600" />
              <span>{isNo ? 'Kurerte hotellperler i Europa' : 'Curated European Gems'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Eksempler på hoteller du kan velge mellom' : 'Examples of Included Hotels You Can Book'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isNo
                ? 'Dette er noen av de 1 500 partnerhotellene i Connex Holiday Plus-nettverket.'
                : 'A selection from the 1,500 verified partner hotels in the Connex Holiday Plus collection.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPA_HOTEL_DATA.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                      {hotel.region}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1 border border-white/20">
                    <span className="text-amber-400">★</span> {hotel.rating}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white text-lg font-black tracking-tight leading-snug drop-shadow-sm">
                      {hotel.name}
                    </div>
                    <div className="text-slate-300 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>2 personer</span>
                      </div>
                      <div className="w-px h-3.5 bg-slate-300" />
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{hotel.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isNo ? hotel.descriptionNo : hotel.descriptionEn}
                    </p>

                    <div className="space-y-1 text-xs text-slate-700 bg-amber-50/50 p-3 rounded-xl border border-amber-200/40">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {isNo ? 'Måltidspris på hotellet:' : 'Hotel Meal Cost:'}
                      </div>
                      <div className="font-bold text-slate-900">
                        {isNo ? hotel.halfBoardEstNo : hotel.halfBoardEstEn}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {isNo ? '(Frokost og kvelds gourmetmiddag)' : '(Breakfast & evening gourmet dining)'}
                      </div>
                    </div>
                  </div>

                  {/* Room Value & Action */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {isNo ? 'Ordinær romverdi' : 'Normal Room Value'}
                        </div>
                        <div className="text-xs text-slate-400 line-through">
                          {isNo ? hotel.normalRoomValueNo : hotel.normalRoomValueEn}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                          {isNo ? 'Rompris med Atlas-pass' : 'Room Rate with Atlas Pass'}
                        </div>
                        <div className="text-2xl font-black text-emerald-700 tracking-tight">
                          0 kr
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleClaimVoucher}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>{isNo ? 'Bruk pass på dette hotellet' : 'Use Pass on This Property'}</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILED FAQ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Ofte stilte spørsmål om Atlas Gourmet & Spaturer' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNo
                ? 'Alt du trenger å vite om Connex Holiday Plus-modellen, betaling og booking.'
                : 'Everything you need to know about the Connex Holiday Plus program and on-site dining.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Er selve rommet virkelig 100% gratis?' : 'Is the room accommodation truly free?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Ja! Romprisen for 2 personer i dobbeltrom er 0 kr. Du betaler ingenting til Atlas eller hotellet for selve overnattingen. Ditt digitale Holiday Plus-pass dekker oppholdet i sin helhet.'
                  : 'Yes! Double room lodging for 2 guests is completely $0. Your digital Holiday Plus certificate covers the accommodation in full.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Når og hvordan betaler jeg for maten?' : 'When and how do I pay for meals?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Du betaler for frokost og middag direkte til hotellet ved utsjekk. Prisen er fast og publisert på forhånd i katalogen (typisk €35–€60 per person per dag).'
                  : 'You pay for mandatory breakfast and dinner directly to the hotel upon checkout. Prices are fixed and published transparently in the booking directory.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hvor mange netter kan jeg bo?' : 'How many nights can I stay?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'De fleste hoteller tilbyr 2 til 6 sammenhengende netter per pass. Du velger selv antall netter når du booker i portalen.'
                  : 'Most partner hotels allow 2 to 6 consecutive nights per pass. You select your duration directly in the booking portal.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hva med flybillettene?' : 'What about flights?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Mange velger å bruke dette på bilferie i Europa (Alpene, Italia, Tyskland). Hvis du vil fly (f.eks. til Milano, München eller Nice), bestiller du flyene dine til 0% påslag rett i Atlas-appen!'
                  : 'Many drive to these alpine and Italian resorts. If flying (e.g. to Milan, Munich, or Nice), book wholesale flights right on Atlas at 0% markup!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="signup" />
    </div>
  );
}
