'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Utensils,
  MapPin,
  Palmtree,
  ArrowRight,
  Plane,
  Heart,
  Info,
  Clock,
  Compass,
  X
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

interface ResortItem {
  id: string;
  name: string;
  region: 'spain' | 'portugal' | 'greece' | 'italy' | 'all';
  regionLabelNo: string;
  regionLabelEn: string;
  location: string;
  capacity: string;
  bedrooms: string;
  image: string;
  rating: number;
  tagsNo: string[];
  tagsEn: string[];
  descriptionNo: string;
  descriptionEn: string;
  highlightsNo: string[];
  highlightsEn: string[];
  normalWeeklyRetailNo: number; // NOK
  normalWeeklyRetailEn: number; // USD
}

const RESORT_DATA: ResortItem[] = [
  {
    id: 'marbella-beach-club',
    name: 'Marbella Beach Club Residences',
    region: 'spain',
    regionLabelNo: 'Spania & Solkysten',
    regionLabelEn: 'Spain & Costa del Sol',
    location: 'Marbella, Andalucia',
    capacity: 'Inntil 4 personer',
    bedrooms: '1 separat soverom + sovesofa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    tagsNo: ['150m til strand', '3 basseng', 'Fullt kjøkken'],
    tagsEn: ['150m to beach', '3 pools', 'Full kitchen'],
    descriptionNo: 'Eksklusiv leilighet i hjerte av Costa del Sol med privat terrasse, tropisk hageanlegg og direkte adgang til strandpromenaden.',
    descriptionEn: 'Exclusive residence in the heart of Costa del Sol featuring private terrace, tropical gardens, and beachfront promenade access.',
    highlightsNo: ['Fullt utstyrt kjøkken med oppvaskmaskin', 'Stort lagunebasseng & barnebasseng', '24/7 sikkerhet & concierge'],
    highlightsEn: ['Fully equipped kitchen with dishwasher', 'Large lagoon pool & kids pool', '24/7 security & concierge'],
    normalWeeklyRetailNo: 18500,
    normalWeeklyRetailEn: 1750,
  },
  {
    id: 'tenerife-ocean-palms',
    name: 'Tenerife Royal Ocean Palms',
    region: 'spain',
    regionLabelNo: 'Kanariøyene',
    regionLabelEn: 'Canary Islands',
    location: 'Costa Adeje, Tenerife',
    capacity: 'Inntil 6 personer',
    bedrooms: '2 soverom + stue',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    tagsNo: ['Solsikkert hele året', 'Oppvarmet basseng', 'Havutsikt'],
    tagsEn: ['Year-round sun', 'Heated pool', 'Ocean view'],
    descriptionNo: 'Romslig to-roms leilighet med panoramautsikt over Atlanterhavet. Perfekt for sol og varme hele høsten og vinteren.',
    descriptionEn: 'Spacious two-bedroom residence with panoramic Atlantic views. Ideal for winter and shoulder-season sun escapes.',
    highlightsNo: ['2 separate bad & vaskemaskin', 'Oppvarmet ferskvannsbasseng', '5 minutter til Playa del Duque'],
    highlightsEn: ['2 bathrooms & private laundry', 'Heated freshwater pool', '5 min to Playa del Duque'],
    normalWeeklyRetailNo: 22000,
    normalWeeklyRetailEn: 2100,
  },
  {
    id: 'algarve-cliff-residences',
    name: 'Algarve Pine Cliffs & Suites',
    region: 'portugal',
    regionLabelNo: 'Algarve, Portugal',
    regionLabelEn: 'Algarve, Portugal',
    location: 'Albufeira, Algarve',
    capacity: 'Inntil 4 personer',
    bedrooms: '1 soverom + stue',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    tagsNo: ['Rød klippekyst', 'Tennis & golf', 'Spa'],
    tagsEn: ['Red cliffs', 'Tennis & golf', 'Spa'],
    descriptionNo: 'Spektakulær beliggenhet på de berømte røde sandsteinsklippene. Fantastiske solnedganger og førsteklasses fasiliteter.',
    descriptionEn: 'Spectacular cliff-top setting along the famous Algarve coastline. Breathtaking sunsets and championship amenities.',
    highlightsNo: ['Eget kjøkken med kaffemaskin', 'Heis ned til privat strandavsnitt', 'Prisbelønt spa- og velværeområde'],
    highlightsEn: ['Kitchen with espresso maker', 'Cliff elevator to private beach access', 'Award-winning spa & wellness zone'],
    normalWeeklyRetailNo: 19800,
    normalWeeklyRetailEn: 1850,
  },
  {
    id: 'crete-panorama-villas',
    name: 'Crete Panorama Cove & Suites',
    region: 'greece',
    regionLabelNo: 'Hellas & Øyene',
    regionLabelEn: 'Greece & Islands',
    location: 'Chania, Kreta',
    capacity: 'Inntil 4 personer',
    bedrooms: '1 soverom + stue',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    tagsNo: ['Egeerhavsutsikt', 'Gresk landsbyidyll', 'Rolig område'],
    tagsEn: ['Aegean views', 'Village charm', 'Quiet retreat'],
    descriptionNo: 'Tradisjonell kretisk arkitektur kombinert med moderne luksus. Utsikt over Chaniabukten og krystallklart vann.',
    descriptionEn: 'Authentic Cretan architecture paired with modern boutique luxury, overlooking the gulf of Chania and crystalline waters.',
    highlightsNo: ['Solterrasse med spiseplass ute', 'Flere evighetsbasseng', 'Kort spasertur til lokale tavernaer'],
    highlightsEn: ['Sun deck with outdoor dining', 'Multiple infinity pools', 'Short stroll to authentic tavernas'],
    normalWeeklyRetailNo: 17500,
    normalWeeklyRetailEn: 1650,
  },
  {
    id: 'tuscany-hills-estate',
    name: 'Tuscan Olive Grove Residences',
    region: 'italy',
    regionLabelNo: 'Italia & Toscana',
    regionLabelEn: 'Italy & Tuscany',
    location: 'Chianti, Toscana',
    capacity: 'Inntil 6 personer',
    bedrooms: '2 soverom + kjøkken',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    tagsNo: ['Vingård & olivenlunder', 'Privat hage', 'Basseng'],
    tagsEn: ['Vineyards & olive groves', 'Private garden', 'Pool'],
    descriptionNo: 'Autentisk steinhus og herregårdsleilighet omgitt av Chiantis bølgende vinranker. Det perfekte utgangspunktet for en bilferie i Italia.',
    descriptionEn: 'Authentic Tuscan stone residence nestled among rolling Chianti vineyards. An ideal base for culinary and wine touring.',
    highlightsNo: ['Romslig spisekjøkken med toskansk peis', 'Svømmebasseng med panoramautsikt', 'Vinsmaking på eiendommen'],
    highlightsEn: ['Country kitchen with fireplace', 'Panoramic infinity pool', 'On-site estate wine tastings'],
    normalWeeklyRetailNo: 21000,
    normalWeeklyRetailEn: 1950,
  },
  {
    id: 'mallorca-sol-palace',
    name: 'Mallorca Cala d\'Or Marina Club',
    region: 'spain',
    regionLabelNo: 'Balearene, Spania',
    regionLabelEn: 'Balearics, Spain',
    location: 'Cala d\'Or, Mallorca',
    capacity: 'Inntil 4 personer',
    bedrooms: '1 soverom + stue',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    tagsNo: ['Marina-utsikt', 'Gåavstand til bukter', 'Balkong'],
    tagsEn: ['Marina view', 'Walk to coves', 'Balcony'],
    descriptionNo: 'Lys middelhavsleilighet like ved den eksklusive yachthavnen i Cala d\'Or. Kort gangavstand til fem idylliske badeviker.',
    descriptionEn: 'Bright Mediterranean apartment steps from the prestigious Cala d\'Or marina and scenic secluded swimming coves.',
    highlightsNo: ['Privat balkong med utsikt', 'Havnebasseng og hageområde', 'Nær restauranter og båtutleie'],
    highlightsEn: ['Private balcony with views', 'Marina-side pool and gardens', 'Steps to dining & boat hire'],
    normalWeeklyRetailNo: 16900,
    normalWeeklyRetailEn: 1600,
  },
];

export interface CertificateTier {
  id: 'last-minute' | 'standard' | 'short-stay';
  nameNo: string;
  nameEn: string;
  bookingWindowNo: string;
  bookingWindowEn: string;
  priceNok: number;
  priceUsd: number;
  points: number;
  officialRetailUsd: number;
  promoWholesaleUsd: number;
  durationNo: string;
  durationEn: string;
  badgeNo: string;
  badgeEn: string;
  descriptionNo: string;
  descriptionEn: string;
}

const CERTIFICATE_TIERS: CertificateTier[] = [
  {
    id: 'last-minute',
    nameNo: 'Last-Minute Ukesopphold (7 netter)',
    nameEn: 'Last-Minute 7-Night Stay',
    bookingWindowNo: 'Bestill opptil 30 dager før avreise',
    bookingWindowEn: 'Reserve up to 30 days in advance',
    priceNok: 3890,
    priceUsd: 359,
    points: 3900,
    officialRetailUsd: 249,
    promoWholesaleUsd: 219,
    durationNo: '7 sammenhengende netter',
    durationEn: '7 consecutive nights',
    badgeNo: 'Beste pris for spontanturer',
    badgeEn: 'Best value for spontaneous getaways',
    descriptionNo: '100% forhåndsbetalt 7-netters ferieleilighet. Må bookes innen 30 dager før reise. 0 kr i ekstra gebyrer ved booking.',
    descriptionEn: '100% prepaid 7-night vacation condo stay. Book up to 30 days in advance of departure. Zero hidden fees at booking.',
  },
  {
    id: 'standard',
    nameNo: 'Standard Helårsopphold (7 netter)',
    nameEn: 'Standard 365-Day 7-Night Stay',
    bookingWindowNo: 'Bestill opptil 365 dager i forveien',
    bookingWindowEn: 'Reserve up to 365 days in advance',
    priceNok: 5890,
    priceUsd: 549,
    points: 5900,
    officialRetailUsd: 499,
    promoWholesaleUsd: 379,
    durationNo: '7 sammenhengende netter',
    durationEn: '7 consecutive nights',
    badgeNo: 'Helårsfleksibilitet (Mest populær)',
    badgeEn: 'Full 365-day flexibility (Most Popular)',
    descriptionNo: '100% forhåndsbetalt 7-netters ferieleilighet. Planlegg sommerferie, høstferie eller vinterferie et helt år i forveien.',
    descriptionEn: '100% prepaid 7-night vacation condo stay. Plan your summer, autumn, or winter vacation up to a full year ahead.',
  },
  {
    id: 'short-stay',
    nameNo: 'Short Stay Miniferie (2–6 netter)',
    nameEn: 'Short Stay Get-Away (2–6 Nights)',
    bookingWindowNo: 'Bestill opptil 365 dager i forveien',
    bookingWindowEn: 'Reserve up to 365 days in advance',
    priceNok: 3290,
    priceUsd: 299,
    points: 3300,
    officialRetailUsd: 219,
    promoWholesaleUsd: 199,
    durationNo: '2 til 6 netter',
    durationEn: '2 to 6 nights',
    badgeNo: 'Perfekt for langhelger',
    badgeEn: 'Ideal for extended weekends',
    descriptionNo: '100% forhåndsbetalt miniferie for 2–6 netter. Perfekt når du vil ha en kortere pause i solen eller ved kysten.',
    descriptionEn: '100% prepaid get-away for 2 to 6 nights. Perfect for an extended weekend or flexible short trip.',
  },
];

export default function ResortsPage() {
  const { locale } = useLanguage();
  const { formatPrice, convertPrice } = useCurrency();
  const { user, isMember } = useAuth();
  const isNo = locale === 'no';

  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [selectedTierId, setSelectedTierId] = useState<'last-minute' | 'standard' | 'short-stay'>('standard');
  const [selectedResort, setSelectedResort] = useState<ResortItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [preferredTimeframe, setPreferredTimeframe] = useState('Vår 2026 (Mars – Mai)');
  const [guestCount, setGuestCount] = useState(2);

  const currentTier = CERTIFICATE_TIERS.find((t) => t.id === selectedTierId) || CERTIFICATE_TIERS[1];

  const filteredResorts = activeRegion === 'all'
    ? RESORT_DATA
    : RESORT_DATA.filter((r) => r.region === activeRegion);

  const handleBookClick = (resort: ResortItem) => {
    setSelectedResort(resort);
    if (user?.email && !guestEmail) setGuestEmail(user.email);
    if (user?.displayName && !guestName) setGuestName(user.displayName);
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResort) return;

    setIsSubmitting(true);
    try {
      const emailToUse = guestEmail || user?.email || 'medlem@atlasclub.vip';
      const nameToUse = guestName || user?.displayName || user?.email?.split('@')[0] || 'Atlas Medlem';

      const res = await fetch('/api/resorts/auto-redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: selectedTierId,
          resortId: selectedResort.id,
          resortName: selectedResort.name,
          resortLocation: selectedResort.location,
          preferredTimeframe,
          memberName: nameToUse,
          memberEmail: emailToUse,
          guestsCount: guestCount,
        }),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        setIsSuccessModal(true);
      } else {
        alert(data.error || 'Kunne ikke fullføre automatisert reservasjon. Vennligst prøv igjen.');
      }
    } catch (err: any) {
      console.error('Reservation error:', err);
      alert('En feil oppsto under kontakt med reservasjonsvaultet. Ta kontakt med concierge.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-xs">
            <Palmtree className="w-3.5 h-3.5" />
            <span>{isNo ? 'Eksklusive Feriesuiter & Resorts' : 'Atlas Signature Resort Weeks'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {isNo ? (
              <>En hel uke i ferieleilighet i Europa fra kun <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">3 890 kr</span></>
            ) : (
              <>A full week in a luxury European resort condo from just <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">$359</span></>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {isNo
              ? 'Atlas har forhandlet frem offisielle B2B-engrosavtaler med RCI / Resort Vacation Certificates (over 4 000 resorter globalt). Velg mellom spontane Last-Minute uker (innen 30 dager) eller helårsplanlegging (opptil 365 dager i forveien).'
              : 'Atlas unlocks negotiated B2B wholesale allotments via RCI / Resort Vacation Certificates across 4,000+ luxury resorts worldwide. Choose between spontaneous Last-Minute weeks (within 30 days) or full 365-day advance booking.'}
          </p>

          {/* 3 CORE PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-10 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold mb-3">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white mb-1">
                {isNo ? 'Hel leilighet med kjøkken' : 'Full Apartment & Kitchen'}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? 'Plass til hele familien (opptil 4–6 personer). Fullt kjøkken sparer tusenvis av kroner på restaurantmåltider.'
                  : 'Space for the whole family (sleeps 4–6). Full kitchen saves thousands on daily dining.'}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 font-bold mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white mb-1">
                {isNo ? '100% Forhåndsbetalt (0 kr ved booking)' : '100% Prepaid (Zero Co-Pay)'}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? `Fra ${currentTier.priceNok.toLocaleString()} kr for hele oppholdet (eller ${currentTier.points.toLocaleString()} poeng). Ingen skjulte gebyrer eller egenandeler.`
                  : `From $${currentTier.priceUsd} for the entire stay (or ${currentTier.points.toLocaleString()} points). Zero hidden fees or co-pays.`}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 font-bold mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white mb-1">
                {isNo ? '14 dagers bookinggaranti' : '14-Day Booking Guarantee'}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? 'Finner du mot formodning ingen datoer som passer ferieplanene dine innen 14 dager, refunderer vi 100% uten spørsmål.'
                  : 'If no resort dates suit your itinerary within 14 days, receive a 100% no-questions-asked refund.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* HOW IT WORKS BANNER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isNo ? 'Slik fungerer din ferieuke' : 'How Your Resort Week Operates'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Gyldig i 12 måneder – Ukentlig innsjekk (Fre / Lør / Søn)' : 'Valid for 12 Months – Weekly Check-In (Fri / Sat / Sun)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNo
                ? 'Sertifikatet gir deg 7 sammenhengende netter. Perfekt for solferier og langhelger på våren, høsten og vinteren på over 4 000 resorts. Når oppholdet er booket, bestiller du flyene dine direkte til nettopris via Atlas!'
                : 'Your pass secures 7 consecutive nights across 4,000+ verified resorts. Valid for 365 days. Once your resort week is locked, book your flights directly at 0% markup right on Atlas!'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/flights"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs"
            >
              <Plane className="w-4 h-4 text-sky-600" />
              <span>{isNo ? 'Søk fly til nettopris' : 'Search NDC Net Flights'}</span>
            </Link>
            <a
              href="#featured-resorts"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>{isNo ? 'Utforsk utvalgte resorts (4 000+ totalt)' : 'Explore Featured Resorts (4,000+ Total)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CERTIFICATE TIER SELECTOR */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isNo ? 'Velg Oppholdstype & Tidsfrist' : 'Choose Stay Tier & Advance Booking'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {isNo ? 'Tre fleksible måter å bruke feriesertifikatet på' : 'Three Flexible Certificate Tiers'}
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {isNo ? '100% Forhåndsbetalt • Ingen egenandeler ved booking' : '100% Prepaid • Zero Co-Pay at Booking'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CERTIFICATE_TIERS.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-5 rounded-2xl text-left transition-all border relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-300'
                      }`}>
                        {isNo ? tier.badgeNo : tier.badgeEn}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <div className="font-extrabold text-base text-white pt-1">
                      {isNo ? tier.nameNo : tier.nameEn}
                    </div>
                    <div className="text-xs text-amber-300 font-medium">
                      ⏱️ {isNo ? tier.bookingWindowNo : tier.bookingWindowEn}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {isNo ? tier.descriptionNo : tier.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        {isNo ? 'Klubbpris' : 'Club Price'}
                      </div>
                      <div className="text-xl font-black text-white">
                        {isNo ? `${tier.priceNok.toLocaleString()} kr` : `$${tier.priceUsd}`}
                      </div>
                    </div>
                    <div className="text-xs text-amber-400 font-mono">
                      {tier.points.toLocaleString()} pts
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* EXCLUSIVE LUXURY RESORTS VALUE PROPOSITION (100% ON-SITE) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isNo ? 'Eksklusiv Medlemsfordel' : 'Exclusive Member Privilege'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {isNo
                  ? '7 netter i romslig ferieleilighet til fast klubbpris'
                  : '7-Night Full Condo Stays at Fixed Member Rates'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {isNo
                  ? 'Gjennom våre lukkede allianser sikrer ATLAS tilgang til førsteklasses ferieleiligheter i Middelhavet og Kanariøyene. Én fast klubbpris for hele reisefølget – uansett om dere er 2, 4 eller 6 personer.'
                  : 'Through private institutional partnerships, ATLAS unlocks premium full-condo accommodations across the Mediterranean and Canary Islands. One flat club rate for your entire party.'}
              </p>
            </div>

            <div className="shrink-0 bg-slate-800/80 border border-amber-500/30 rounded-2xl p-4 text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isNo ? 'Typisk hotellpris på nettet' : 'Typical Public OTA Cost'}
              </div>
              <div className="text-lg font-black text-slate-400 line-through">
                12 000 – 25 000 kr
              </div>
              <div className="text-sm font-black text-amber-400 mt-0.5">
                {isNo ? 'ATLAS fra 3 890 kr / uke' : 'ATLAS from 3,890 NOK / wk'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs relative z-10">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNo ? 'Hele leiligheten inkludert' : 'Full Private Condo'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {isNo
                  ? 'Separate soverom, fullt utstyrt kjøkken, spiseplass og terrasse. Perfekt for familier og par som ønsker friheten til å lage egne måltider og ha god plass.'
                  : 'Multiple bedrooms, full kitchen, dining area, and balcony. Exceptional comfort and space for families and groups.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNo ? '100 % Forhåndsbetalt' : '100% Fully Prepaid'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {isNo
                  ? 'Klubbprisen dekker hele oppholdet for 7 netter. Ingen obligatoriske bookinggebyrer på nett, og full pris- og avbestillingstrygghet.'
                  : 'Your member rate covers all 7 nights. Zero mandatory online co-pays and complete price integrity from start to finish.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isNo ? 'Personlig Concierge-hjelp' : 'Dedicated VIP Concierge'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {isNo
                  ? 'Alt håndteres 100 % inne på ATLAS. Velg ditt ønskede resort under, så ordner vår VIP Concierge hele bestillingen direkte for deg.'
                  : 'Seamless on-site booking. Select your preferred resort below, and our dedicated VIP Concierge coordinates the entire reservation.'}
              </p>
            </div>
          </div>
        </div>

        {/* REGION FILTER TABS */}
        <div id="featured-resorts" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Utvalgte signatur-resorts' : 'Featured Signature Resorts'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {isNo
                  ? 'Konkrete eksempler på ferieleiligheter tilgjengelig for Atlas-medlemmer.'
                  : 'Curated examples of resort condo residences available for Atlas members.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: isNo ? 'Alle destinasjoner' : 'All Destinations' },
                { id: 'spain', label: isNo ? 'Spania & Kanariøyene' : 'Spain & Canaries' },
                { id: 'portugal', label: isNo ? 'Portugal & Algarve' : 'Portugal & Algarve' },
                { id: 'greece', label: isNo ? 'Hellas & Kreta' : 'Greece & Crete' },
                { id: 'italy', label: isNo ? 'Italia & Toscana' : 'Italy & Tuscany' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveRegion(pill.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeRegion === pill.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* RESORT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResorts.map((resort) => {
              const retailPrice = isNo ? resort.normalWeeklyRetailNo : resort.normalWeeklyRetailEn;
              const currentPrice = isNo ? currentTier.priceNok : currentTier.priceUsd;
              const savings = retailPrice - currentPrice;

              return (
                <div
                  key={resort.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={resort.image}
                      alt={resort.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                        {isNo ? resort.regionLabelNo : resort.regionLabelEn}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1 border border-white/20">
                      <span className="text-amber-400">★</span> {resort.rating}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-lg font-black tracking-tight leading-snug drop-shadow-sm">
                        {resort.name}
                      </div>
                      <div className="text-slate-300 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{resort.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Capacity & Room stats */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span>{resort.capacity}</span>
                        </div>
                        <div className="w-px h-3.5 bg-slate-300" />
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{isNo ? currentTier.durationNo : currentTier.durationEn}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo ? resort.descriptionNo : resort.descriptionEn}
                      </p>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {(isNo ? resort.tagsNo : resort.tagsEn).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60"
                          >
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {isNo ? 'Ordinær ukespris' : 'Public Retail Week'}
                          </div>
                          <div className="text-xs text-slate-400 line-through">
                            {isNo ? `${retailPrice.toLocaleString()} kr` : `$${retailPrice.toLocaleString()}`}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                            {isNo ? `Atlas Medlemspris (${currentTier.durationNo})` : `Atlas Member Price (${currentTier.durationEn})`}
                          </div>
                          <div className="text-2xl font-black text-slate-900 tracking-tight">
                            {isNo ? `${currentTier.priceNok.toLocaleString()} kr` : `$${currentTier.priceUsd}`}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {isNo ? `Du sparer ${savings.toLocaleString()} kr` : `You Save $${savings.toLocaleString()}`}
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookClick(resort)}
                        className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                      >
                        <span>{isNo ? 'Reserver ferieleilighet' : 'Reserve Resort Condo'}</span>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRANSPARENT FAQ SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Vanlige spørsmål om Atlas Signature Resorts' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNo
                ? 'Alt du trenger å vite om bestilling, gyldighet og reisedatoer.'
                : 'Everything you need to know about booking, certificate shelf-life, and inventory.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hvor lenge er oppholdet gyldig?' : 'How long is the certificate valid?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Ferieuken din er gyldig for booking i 12 måneder (365 dager) fra kjøpsdato. Du kan bestille reiser inntil 12 måneder frem i tid.'
                  : 'Your certificate is valid for booking for 365 days from issue date. You can reserve stays up to 12 months ahead.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hva koster et ukesopphold for hele familien?' : 'What does a resort stay cost?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Prisen starter på 3 890 kr for Last-Minute (7 netter innen 30 dager), 5 890 kr for Standard Helår (7 netter opptil 365 dager frem), og 3 290 kr for Short Stay (2–6 netter). Prisen dekker hele leiligheten for inntil 4–6 personer. 0 kr i ekstra bookinggebyr på nett.'
                  : 'Rates start at $359 (3,890 NOK) for Last-Minute (7 nights booked within 30 days), $549 (5,890 NOK) for Standard 365-Day (7 nights booked up to 1 year ahead), and $299 (3,290 NOK) for Short Stay (2–6 nights). Covers the entire condo for up to 4–6 guests with zero online booking fees.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Kan jeg bruke opptjente Rewards-poeng?' : 'Can I pay with Rewards Points?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Ja! Har du opptjent kickback-poeng i ditt Rewards Vault fra tidligere cruise eller leiebiler, kan du løse inn 2 500 – 4 500 poeng for å få hele ferieoppholdet 100% gratis.'
                  : 'Yes! Accumulated Rewards Vault points from cruises and car rentals can be redeemed (2,500 – 4,500 pts) for a 100% free stay.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Tilkommer det lokale gebyrer på resortet?' : 'Are there any local resort fees?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Selve bookingen på nett koster 0 kr ekstra når du har et sertifikat. Enkelte europeiske resorter har et obligatorisk lokalt energi-/renholdsgebyr (utility surcharge på typisk 20–40 € per uke) eller turistskatt som betales direkte i resepsjonen ved ankomst/avreise.'
                  : 'The online certificate booking has 0 charges. Some European resorts charge a mandatory on-site utility surcharge (typically 20–40 € per week) or local tourist tax paid directly at the front desk upon check-in/check-out.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hva med flybilletter?' : 'What about flights?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Fly bestiller du separat direkte i Atlas sin flysøkemotor. Fordi Atlas har 0 kr påslag, betaler du rå nettopris direkte til flyselskapet (SAS, Norwegian osv.).'
                  : 'Flights are booked separately via Atlas NDC Net search engine at raw airline wholesale with 0 kr markup.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {selectedResort && !isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedResort(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                <Palmtree className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedResort.name}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Reserver ferieleilighet' : 'Reserve Resort Condo'}
              </h3>

              {/* LIVE RETAIL COMPARISON CALLOUT */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">
                    {isNo ? 'Offisiell Booking.com / Retail' : 'Public Booking.com / Retail'}
                  </div>
                  <div className="line-through font-bold text-slate-500 text-sm">
                    {isNo ? `${selectedResort.normalWeeklyRetailNo.toLocaleString()} kr` : `$${selectedResort.normalWeeklyRetailEn.toLocaleString()}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-emerald-800">
                    {isNo ? 'Atlas Medlemsbesparelse' : 'Atlas Member Savings'}
                  </div>
                  <div className="font-black text-emerald-700 text-sm">
                    {isNo
                      ? `Spar ${(selectedResort.normalWeeklyRetailNo - currentTier.priceNok).toLocaleString()} kr`
                      : `Save $${(selectedResort.normalWeeklyRetailEn - currentTier.priceUsd).toLocaleString()}`}
                  </div>
                </div>
              </div>

              {/* TIER PICKER IN MODAL */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  {isNo ? 'Velg sertifikat-type' : 'Select Certificate Tier'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CERTIFICATE_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedTierId === tier.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-slate-900 truncate">
                        {tier.id === 'last-minute' ? (isNo ? 'Last-Minute' : 'Last-Minute') : tier.id === 'standard' ? (isNo ? 'Standard Helår' : 'Standard 365') : (isNo ? 'Short Stay' : 'Short Stay')}
                      </div>
                      <div className="text-xs font-black text-amber-700 mt-0.5">
                        {isNo ? `${tier.priceNok.toLocaleString()} kr` : `$${tier.priceUsd}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>{isNo ? 'Destinasjon:' : 'Destination:'}</span>
                  <span className="font-bold text-slate-900">{selectedResort.location}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isNo ? 'Varighet:' : 'Duration:'}</span>
                  <span className="font-bold text-slate-900">{isNo ? currentTier.durationNo : currentTier.durationEn}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isNo ? 'Bestillingsvindu:' : 'Booking Window:'}</span>
                  <span className="font-bold text-slate-900">{isNo ? currentTier.bookingWindowNo : currentTier.bookingWindowEn}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isNo ? 'Kapasitet:' : 'Capacity:'}</span>
                  <span className="font-bold text-slate-900">{selectedResort.capacity}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">{isNo ? 'Atlas Medlemspris:' : 'Atlas Member Price:'}</span>
                  <span className="text-base font-black text-emerald-700">
                    {isNo ? `${currentTier.priceNok.toLocaleString()} kr` : `$${currentTier.priceUsd}`}
                  </span>
                </div>
              </div>

              <form onSubmit={handleConfirmReservation} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isNo ? 'Ønsket tidsrom' : 'Preferred Timeframe'}
                    </label>
                    <select
                      value={preferredTimeframe}
                      onChange={(e) => setPreferredTimeframe(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-slate-900 outline-hidden bg-white"
                    >
                      <option>{isNo ? 'Vår 2026 (Mars – Mai)' : 'Spring 2026 (March – May)'}</option>
                      <option>{isNo ? 'Sommer 2026 (Juni – August)' : 'Summer 2026 (June – August)'}</option>
                      <option>{isNo ? 'Høst 2026 (September – November)' : 'Autumn 2026 (September – November)'}</option>
                      <option>{isNo ? 'Vinter 2026/2027 (Desember – Februar)' : 'Winter 2026/2027 (December – February)'}</option>
                      <option>{isNo ? 'Fleksibel (Søker etter beste tilgjengelighet)' : 'Flexible (Best Availability Search)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isNo ? 'Antall reisende' : 'Guests Count'}
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-slate-900 outline-hidden bg-white"
                    >
                      <option value={1}>1 person</option>
                      <option value={2}>2 personer</option>
                      <option value={3}>3 personer</option>
                      <option value={4}>4 personer</option>
                      <option value={5}>5 personer</option>
                      <option value={6}>6 personer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Ditt navn & e-post' : 'Your Name & Email'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={user?.email || 'ola.nordmann@example.com'}
                    value={guestEmail || (user?.email || '')}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-slate-900 outline-hidden bg-white"
                  />
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isNo ? '100% Automatisert & Skjermet for RVC' : '100% Automated & Shielded from RVC'}</span>
                  </div>
                  <p className="text-amber-800 leading-normal">
                    {isNo
                      ? 'Atlas allokerer og løser inn sertifikatet direkte fra vårt engros-vault i bakgrunnen. Du slipper å gå inn på tredjepartsportaler eller håndtere kompliserte gebyrstrukturer. 0 kr ekstra nettgebyr.'
                      : 'Atlas allocates and redeems certificates directly through our backend wholesale vault. You never deal with confusing third-party portals or hidden fees. 0 kr extra online fees.'}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isNo
                      ? '14 dagers bookinggaranti: Finner du ingen datoer som passer ferieplanene dine, refunderes 100% uten spørsmål.'
                      : '14-day booking guarantee: If no dates fit your schedule, 100% refund is issued without questions.'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isNo ? 'Allokerer sertifikat og reserverer...' : 'Allocating certificate & confirming...'}</span>
                    </>
                  ) : (
                    <span>
                      {isNo ? `Bekreft reservasjon (${currentTier.priceNok.toLocaleString()} kr)` : `Confirm Reservation ($${currentTier.priceUsd})`}
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center space-y-5 border border-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isNo ? '100% Bekreftet & Reservert' : '100% Confirmed & Reserved'}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Din ferieleilighet er sikret!' : 'Your Resort Condo is Locked!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                {isNo
                  ? 'Kupongen er automatisk allokert og tilknyttet ditt medlemskap. Du slipper å gjøre noe mer på eksterne nettsider.'
                  : 'Your certificate has been automatically allocated and attached to your membership.'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">{isNo ? 'Reservasjonskode:' : 'Reservation Code:'}</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {confirmedBooking?.confirmationCode || `ATLAS-RVC-${Date.now().toString().slice(-6)}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{isNo ? 'Sertifikatnummer:' : 'Certificate Number:'}</span>
                <span className="font-mono text-emerald-800 font-bold">
                  {confirmedBooking?.certificateNumber || 'RVC-PAN-77829-EU'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{isNo ? 'Resort:' : 'Resort:'}</span>
                <span className="font-bold text-slate-900">{selectedResort?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{isNo ? 'Destinasjon:' : 'Destination:'}</span>
                <span className="text-slate-800">{selectedResort?.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{isNo ? 'Enhet:' : 'Unit:'}</span>
                <span className="text-slate-800">{isNo ? 'Hel leilighet med kjøkken (7 netter)' : 'Full Apartment with Kitchen (7 nights)'}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">{isNo ? 'Total Klubbpris:' : 'Total Club Price:'}</span>
                <span className="font-black text-emerald-700 text-base">
                  {isNo ? `${currentTier.priceNok.toLocaleString()} kr` : `$${currentTier.priceUsd}`}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 italic pt-1">
                {confirmedBooking?.pricing?.localUtilityNoteNo || (isNo ? '0 kr ekstra nettgebyr.' : '0 kr extra online booking fees.')}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2.5 pt-1">
              <Link
                href={`/api/vouchers/certificate?code=${encodeURIComponent(confirmedBooking?.confirmationCode || 'ATLAS-RVC-DEMO')}&resort=${encodeURIComponent(selectedResort?.name || '')}`}
                target="_blank"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isNo ? 'Vis & Skriv ut Atlas Garantikupong' : 'View & Print Atlas Voucher Pass'}</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/flights"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5"
                >
                  <Plane className="w-3.5 h-3.5 text-sky-600" />
                  <span>{isNo ? 'Finn nettopris-fly' : 'Find Wholesale Flights'}</span>
                </Link>
                <Link
                  href="/cars"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isNo ? 'Leiebil / Transport' : 'Car Rental / Transit'}</span>
                </Link>
              </div>

              <button
                onClick={() => {
                  setIsSuccessModal(false);
                  setSelectedResort(null);
                }}
                className="w-full py-3 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer mt-1"
              >
                {isNo ? 'Lukk og gå til oversikt' : 'Close and Return'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal if guest */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="signup" />
    </div>
  );
}
