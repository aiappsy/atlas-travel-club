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
  Loader2,
  AlertCircle,
  X,
  Clock,
  Send,
  Download,
  Building2,
  Hotel,
  Car,
  Train,
  Bot,
  Navigation
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import AirportTransitCopilotModal from '@/components/AirportTransitCopilotModal';

export interface HotelTransitOption {
  primaryAirport: {
    code: string;
    name: string;
    driveTime: string;
    distanceKm: number;
    descriptionNo: string;
    descriptionEn: string;
  };
  alternateAirports: Array<{
    code: string;
    name: string;
    driveTime: string;
    distanceKm: number;
  }>;
  chauffeur: {
    priceEstNo: string;
    priceEstEn: string;
    duration: string;
    highlightsNo: string;
    highlightsEn: string;
  };
  carRental: {
    dailyEstNo: string;
    dailyEstEn: string;
    recommendedHub: string;
    routeAdviceNo: string;
    routeAdviceEn: string;
  };
  trainTransit: {
    railLine: string;
    nearestStation: string;
    stationToHotelMin: number;
    shuttleAvailable: boolean;
    routeAdviceNo: string;
    routeAdviceEn: string;
  };
}

export interface HotelBreakItem {
  id: string;
  name: string;
  region: string;
  country: 'italy' | 'germany' | 'austria' | 'france';
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
  transit: HotelTransitOption;
}

export const HOTEL_BREAKS_DATA: HotelBreakItem[] = [
  {
    id: 'dolomites-alpine-hotel',
    name: 'Alpenresort Belvedere & Wellness',
    region: 'Syd-Tirol / Dolomittene, Italia',
    country: 'italy',
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
    descriptionNo: 'Majestetisk utsikt over Dolomittene og Molvenosjøen. Prisbelønt velværeanlegg med finsk badstue og panoramautsikt.',
    descriptionEn: 'Panoramic alpine views of the Dolomites and Lake Molveno. Award-winning thermal wellness and traditional gourmet dining.',
    highlightsNo: ['Frokostbuffé med lokale råvarer', '4-retters kveldsmeny inkludert', 'Fri adgang til 1 200 kvm velværeavdeling'],
    highlightsEn: ['Alpine breakfast buffet', '4-course daily gourmet dinner', 'Complimentary 1,200 sqm wellness access'],
    transit: {
      primaryAirport: {
        code: 'VRN',
        name: 'Verona Villafranca Airport',
        driveTime: '1t 25m',
        distanceKm: 125,
        descriptionNo: 'Nærmeste og mest direkte flyplass. Rask kjøring nordover på A22 Brenner-motorveien.',
        descriptionEn: 'Optimal direct hub with rapid northbound connection via A22 Brenner autostrada.'
      },
      alternateAirports: [
        { code: 'BGY', name: 'Milano Bergamo Airport', driveTime: '2t 10m', distanceKm: 180 },
        { code: 'VCE', name: 'Venezia Marco Polo Airport', driveTime: '2t 20m', distanceKm: 190 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 650 kr (€145)',
        priceEstEn: 'approx. $155 (€145)',
        duration: '1t 25m',
        highlightsNo: 'Privatsjåfør møter deg i ankomsthallen med navneskilt. Mercedes E/V-klasse direkte til hotellet.',
        highlightsEn: 'Private driver meet & greet in arrivals hall. Executive Mercedes direct to hotel.'
      },
      carRental: {
        dailyEstNo: 'fra 320 kr/dag (€28)',
        dailyEstEn: 'from $30/day (€28)',
        recommendedHub: 'VRN eller BGY flyplassterminal',
        routeAdviceNo: 'Kjør A22 mot Brennero, ta avkjøring San Michele all\'Adige / Mezzocorona, følg SS43/SP64 til Molveno.',
        routeAdviceEn: 'Drive A22 north towards Brenner, exit at San Michele all\'Adige, follow SS43/SP64 up to Lake Molveno.'
      },
      trainTransit: {
        railLine: 'Frecciarossa / Trenitalia + Trentino Trasporti B611',
        nearestStation: 'Mezzocorona Stasjon (eller Trento)',
        stationToHotelMin: 25,
        shuttleAvailable: true,
        routeAdviceNo: 'Høyhastighetstog til Mezzocorona, deretter lokalbuss B611 eller hotellets forhåndsbestilte henting.',
        routeAdviceEn: 'High-speed rail to Mezzocorona, then local scenic bus B611 or pre-arranged hotel shuttle.'
      }
    }
  },
  {
    id: 'chianti-castle-wine',
    name: 'Castello di Spaltenna Estate & Hotel',
    region: 'Toscana, Italia',
    country: 'italy',
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
    descriptionNo: 'Ekte 10. århundre slott og kloster omgitt av Chiantis bølgende vinmarker. Eget vinhvelv og roserik park.',
    descriptionEn: 'Authentic 10th-century castle and monastery amidst rolling Chianti vineyards. Private wine cellars and peaceful grounds.',
    highlightsNo: ['Toskansk frokost og kveldens gourmetmiddag', 'Innendørs oppvarmet basseng & badstuer', 'Mulighet for vinsmaking på slottet'],
    highlightsEn: ['Tuscan breakfast & chef evening dining', 'Indoor heated pool & saunas', 'On-site estate wine cellar tours'],
    transit: {
      primaryAirport: {
        code: 'FLR',
        name: 'Firenze Amerigo Vespucci Airport',
        driveTime: '55m',
        distanceKm: 65,
        descriptionNo: 'Korteste kjøretid til Chianti langs den vakre SR222 Chiantigiana vinveien.',
        descriptionEn: 'Shortest drive to Chianti along the panoramic SR222 Chiantigiana wine road.'
      },
      alternateAirports: [
        { code: 'PSA', name: 'Pisa Galileo Galilei Airport', driveTime: '1t 30m', distanceKm: 110 },
        { code: 'BLQ', name: 'Bologna Guglielmo Marconi', driveTime: '1t 45m', distanceKm: 145 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 350 kr (€120)',
        priceEstEn: 'approx. $130 (€120)',
        duration: '55m',
        highlightsNo: 'Mercedes E-Klasse fra Firenze flyplass direkte til slottets port.',
        highlightsEn: 'Mercedes sedan from Florence terminal direct to the castle gates.'
      },
      carRental: {
        dailyEstNo: 'fra 290 kr/dag (€26)',
        dailyEstEn: 'from $28/day (€26)',
        recommendedHub: 'FLR eller PSA flyplassterminal',
        routeAdviceNo: 'Sterkt anbefalt for Toscana! Gir full fleksibilitet til å besøke vingårder, middelalderborger og Siena.',
        routeAdviceEn: 'Strongly recommended for Tuscany! Unlocks freedom to explore wineries, castles, and Siena.'
      },
      trainTransit: {
        railLine: 'Regionale Veloce (Firenze SMN – Chiusi)',
        nearestStation: 'Montevarchi-Terranuova Stasjon',
        stationToHotelMin: 20,
        shuttleAvailable: true,
        routeAdviceNo: '35 min med tog fra Firenze Santa Maria Novella til Montevarchi, deretter 20 min med taxi/hotellbil opp til Gaiole.',
        routeAdviceEn: '35-min train ride from Florence SMN to Montevarchi, then 20-min taxi or castle shuttle up to Gaiole.'
      }
    }
  },
  {
    id: 'schwarzwald-thermal-park',
    name: 'Parkhotel Adler & Black Forest Retreat',
    region: 'Schwarzwald, Tyskland',
    country: 'germany',
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
    highlightsNo: ['Svartskog-frokost med ferske delikatesser', 'Kveldens 4-retters meny fra sjefskokken', 'Fri adgang til badeland og bassenger'],
    highlightsEn: ['Artisanal Black Forest breakfast', '4-course gourmet dinner', 'Complimentary access to pool pavilions'],
    transit: {
      primaryAirport: {
        code: 'BSL',
        name: 'EuroAirport Basel-Mulhouse-Freiburg',
        driveTime: '55m',
        distanceKm: 75,
        descriptionNo: 'Fransk-sveitsisk grenseflyplass med direkte motorvei A5 til Svartskogen.',
        descriptionEn: 'Direct access via French-Swiss border hub and A5 highway to Black Forest.'
      },
      alternateAirports: [
        { code: 'ZRH', name: 'Zürich Airport', driveTime: '1t 15m', distanceKm: 85 },
        { code: 'STR', name: 'Stuttgart Airport', driveTime: '1t 35m', distanceKm: 135 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 500 kr (€130)',
        priceEstEn: 'approx. $140 (€130)',
        duration: '55m',
        highlightsNo: 'Direkte sjåfør fra Basel EuroAirport eller Zürich flyplass til resepsjonen.',
        highlightsEn: 'Executive chauffeur transfer from Basel EuroAirport or Zurich terminal.'
      },
      carRental: {
        dailyEstNo: 'fra 310 kr/dag (€27)',
        dailyEstEn: 'from $29/day (€27)',
        recommendedHub: 'BSL eller ZRH terminal',
        routeAdviceNo: 'Kjør A5 mot Freiburg, deretter naturskjønne B31 gjennom Höllental til Hinterzarten.',
        routeAdviceEn: 'Drive A5 to Freiburg, then take scenic mountain highway B31 through Höllental.'
      },
      trainTransit: {
        railLine: 'Legendariske Höllentalbahn (DB Regio)',
        nearestStation: 'Hinterzarten Stasjon',
        stationToHotelMin: 3,
        shuttleAvailable: true,
        routeAdviceNo: 'Tysklands bratteste og mest berømte fjellbane! 30 min tog fra Freiburg Hbf til Hinterzarten. Hotellet er 300m gange unna.',
        routeAdviceEn: 'Germany\'s premier mountain railway! 30 min direct train from Freiburg Hbf to Hinterzarten. Hotel is 300m walk.'
      }
    }
  },
  {
    id: 'salzburg-alpine-wellness',
    name: 'Gut Brandlhof Alpine Resort & Golf',
    region: 'Salzburger Land, Østerrike',
    country: 'austria',
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
    transit: {
      primaryAirport: {
        code: 'SZG',
        name: 'Salzburg Airport W.A. Mozart',
        driveTime: '55m',
        distanceKm: 65,
        descriptionNo: 'Raskeste adkomst via det vakre Kleines Deutsches Eck.',
        descriptionEn: 'Quickest alpine route via scenic Little German Corner.'
      },
      alternateAirports: [
        { code: 'INN', name: 'Innsbruck Airport', driveTime: '1t 35m', distanceKm: 130 },
        { code: 'MUC', name: 'München Airport', driveTime: '2t 00m', distanceKm: 185 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 450 kr (€125)',
        priceEstEn: 'approx. $135 (€125)',
        duration: '55m',
        highlightsNo: 'Privat sjåfør fra Salzburg flyplass direkte til resortet.',
        highlightsEn: 'Private executive transfer from Salzburg terminal direct to resort.'
      },
      carRental: {
        dailyEstNo: 'fra 340 kr/dag (€30)',
        dailyEstEn: 'from $32/day (€30)',
        recommendedHub: 'SZG eller MUC flyplass',
        routeAdviceNo: 'Kjør B21/B178 via Lofer. Husk østerriksk motorveivignett dersom du benytter Autobahn.',
        routeAdviceEn: 'Scenic drive on B21/B178 via Lofer. Note: Austrian vignette required if using Autobahn.'
      },
      trainTransit: {
        railLine: 'ÖBB Alpe-Express (Salzburg – Wörgl)',
        nearestStation: 'Saalfelden am Steinernen Meer',
        stationToHotelMin: 7,
        shuttleAvailable: true,
        routeAdviceNo: 'Direkte tog fra Salzburg Hbf til Saalfelden stasjon. Hotellet tilbyr gratis hentebuss fra stasjonen!',
        routeAdviceEn: 'Direct mountain rail from Salzburg Hbf to Saalfelden. Hotel provides complimentary guest van pickup!'
      }
    }
  },
  {
    id: 'provence-lavender-estate',
    name: 'Domaine de l\'Enclos & Provence Country House',
    region: 'Provence, Frankrike',
    country: 'france',
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
    transit: {
      primaryAirport: {
        code: 'MRS',
        name: 'Marseille Provence Airport',
        driveTime: '55m',
        distanceKm: 75,
        descriptionNo: 'Hovedflyplass for Provence med motorvei A7 direkte mot Luberon.',
        descriptionEn: 'Main international hub for Provence with direct A7 expressway access.'
      },
      alternateAirports: [
        { code: 'AVN', name: 'Avignon Airport / TGV', driveTime: '35m', distanceKm: 38 },
        { code: 'NCE', name: 'Nice Côte d\'Azur Airport', driveTime: '2t 15m', distanceKm: 210 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 600 kr (€140)',
        priceEstEn: 'approx. $150 (€140)',
        duration: '55m',
        highlightsNo: 'Privat sjåfør fra Marseille flyplass eller Avignon TGV-stasjon.',
        highlightsEn: 'Private chauffeur meet & greet from Marseille Airport or Avignon TGV.'
      },
      carRental: {
        dailyEstNo: 'fra 330 kr/dag (€29)',
        dailyEstEn: 'from $31/day (€29)',
        recommendedHub: 'MRS flyplass eller Avignon TGV',
        routeAdviceNo: 'Leiebil er uunnværlig i Luberon for å oppleve klippebyene Gordes, Roussillon og lavendelmarkene.',
        routeAdviceEn: 'Rental car is essential in Luberon to tour clifftop villages, lavender fields, and olive groves.'
      },
      trainTransit: {
        railLine: 'SNCF TGV Méditerranée',
        nearestStation: 'Avignon TGV Stasjon',
        stationToHotelMin: 35,
        shuttleAvailable: true,
        routeAdviceNo: 'Høyhastighetstog (TGV) tar kun 2t 40m fra Paris til Avignon TGV, deretter 35 min med leiebil eller hotelltransfer.',
        routeAdviceEn: 'High-speed TGV is just 2h 40m from Paris to Avignon TGV, followed by 35m drive or hotel transfer.'
      }
    }
  },
  {
    id: 'lake-garda-panorama',
    name: 'Grand Hotel Riva & Garda Lakeside',
    region: 'Gardasjøen, Italia',
    country: 'italy',
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
    descriptionEn: 'Breathtaking setting on the northern shores of Lake Garda. Panoramic rooftop dining and lakeside relaxation pavilion.',
    highlightsNo: ['Rikholdig italiensk frokostbuffé', 'Italiensk 4-retters kveldsmeny', 'Fri inngang til wellness- og badstueavdeling'],
    highlightsEn: ['Italian breakfast buffet', '4-course lakeside evening dinner', 'Full access to sauna and relaxation zone'],
    transit: {
      primaryAirport: {
        code: 'VRN',
        name: 'Verona Villafranca Airport',
        driveTime: '1t 05m',
        distanceKm: 85,
        descriptionNo: 'Beste flyplass med motorvei A22 direkte til Rovereto Sud.',
        descriptionEn: 'Closest airport with rapid A22 motorway transit to Rovereto Sud.'
      },
      alternateAirports: [
        { code: 'BGY', name: 'Milano Bergamo Airport', driveTime: '1t 40m', distanceKm: 130 },
        { code: 'VCE', name: 'Venezia Marco Polo Airport', driveTime: '2t 05m', distanceKm: 180 }
      ],
      chauffeur: {
        priceEstNo: 'ca. 1 300 kr (€115)',
        priceEstEn: 'approx. $125 (€115)',
        duration: '1t 05m',
        highlightsNo: 'Privat sjåfør langs Gardasjøens østre bredd direkte til hotellet.',
        highlightsEn: 'Executive chauffeur along scenic shores of Lake Garda direct to hotel.'
      },
      carRental: {
        dailyEstNo: 'fra 290 kr/dag (€26)',
        dailyEstEn: 'from $28/day (€26)',
        recommendedHub: 'VRN eller BGY flyplass',
        routeAdviceNo: 'Nydelig kjøretur langs sjøen. Fleksibelt for turer til Monte Baldo og Limone sul Garda.',
        routeAdviceEn: 'Panoramic lakeside drive. Ideal for day trips to Monte Baldo cableway and Limone.'
      },
      trainTransit: {
        railLine: 'Frecciarossa til Desenzano + Panoramasjøferge',
        nearestStation: 'Rovereto Stasjon (eller Desenzano del Garda)',
        stationToHotelMin: 20,
        shuttleAvailable: true,
        routeAdviceNo: 'Ta tog til Desenzano del Garda, deretter passasjerferge over hele Gardasjøen direkte til kaien i Riva (50m fra hotellet)!',
        routeAdviceEn: 'Train to Desenzano, followed by a scenic ferry ride across the entire lake right into Riva harbor dock (50m from hotel)!'
      }
    }
  },
];

export default function HotelBreaksPage() {
  const { locale } = useLanguage();
  const { user, isMember } = useAuth();
  const isNo = locale === 'no';

  const [claimedVoucher, setClaimedVoucher] = useState<{
    code: string;
    expiresAt: string;
  } | null>({
    code: 'HP-8492-ATLAS-VIP',
    expiresAt: '2027-10-31',
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Country filter
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'italy' | 'germany' | 'austria' | 'france'>('all');

  // Reservation dialog state
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<HotelBreakItem | null>(null);
  const [selectedHotelForTransit, setSelectedHotelForTransit] = useState<HotelBreakItem | null>(null);
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split('T')[0];
  });
  const [nightsCount, setNightsCount] = useState<number>(3);
  const [isReserving, setIsReserving] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<{
    reference: string;
    hotelName: string;
    checkIn: string;
    nights: number;
    voucherCode: string;
  } | null>(null);

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

  const handleOpenBookingModal = async (hotel: HotelBreakItem) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (!claimedVoucher) {
      await handleClaimVoucher();
    }

    setSelectedHotelForBooking(hotel);
    setReservationSuccess(null);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotelForBooking) return;

    setIsReserving(true);

    // Simulate concierge routing and generate exclusive reference
    await new Promise((r) => setTimeout(r, 800));

    const ref = `ATLAS-HB-${Math.floor(100000 + Math.random() * 900000)}`;
    const code = claimedVoucher?.code || 'HP-8492-ATLAS-VIP';

    setReservationSuccess({
      reference: ref,
      hotelName: selectedHotelForBooking.name,
      checkIn: checkInDate,
      nights: nightsCount,
      voucherCode: code,
    });

    setIsReserving(false);
  };

  const filteredHotels = selectedCountry === 'all'
    ? HOTEL_BREAKS_DATA
    : HOTEL_BREAKS_DATA.filter((h) => h.country === selectedCountry);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-xs">
            <Hotel className="w-3.5 h-3.5" />
            <span>{isNo ? 'Atlas Hotellopphold i Europa' : 'Atlas European Hotel Breaks'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {isNo ? (
              <>Bo gratis på 1 500 kvalitetshoteller – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">du betaler kun for maten</span></>
            ) : (
              <>Complimentary hotel breaks for two – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">you pay only for dining</span></>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {isNo
              ? 'Som Atlas-medlem er selve hotellrommet 100 % spandert (0 kr i rompris for 2 personer i opptil 3–6 netter). Eneste betingelse er at dere nyter hotellets faste frokost og kveldens gourmet-middag. En genial modell som sparer dere for tusenvis av kroner på europeiske hotellturer!'
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
                      {isNo ? 'Atlas Hotel Breaks-Pass' : 'Atlas European Hotel Breaks Pass'}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                    {isNo ? '0 kr (Inkludert)' : '$0 Included'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isNo
                    ? 'Klikk nedenfor for å aktivere din unike digitale passkode. Koden gir deg umiddelbar tilgang til å reservere blant 1 500 håndplukkede hoteller i Alpene, Italia, Tyskland, Frankrike og Østerrike.'
                    : 'Click below to activate your digital pass code. Grants immediate on-site reservation access across 1,500 hand-picked hotels in Italy, Germany, Austria, and France.'}
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
                    {isNo ? 'Ditt unike Atlas VIP Hotel Breaks-Pass:' : 'Your Unique Atlas VIP Hotel Breaks Pass:'}
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
                  href="#featured-hotels"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isNo ? 'Velg hotell nedenfor & reserver med 0 kr' : 'Choose Hotel Below & Reserve at $0'}</span>
                  <ArrowRight className="w-4 h-4" />
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
                ? 'Europeiske boutique- og feriehoteller har ofte tomme rom utenfor de mest hektiske toppsesongene. For å fylle rommene sine uten å dumpe prisene åpent på Booking.com, stiller de rommet til disposisjon for Atlas-medlemmer mot at dere spiser frokost og middag på hotellet. En vinn-vinn for begge parter!'
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

            {/* WITH ATLAS HOTEL BREAKS PASS */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-300 space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                {isNo ? 'Atlas Medlemsfordel' : 'Atlas Member Benefit'}
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {isNo ? 'Med Atlas Hotel Breaks-Pass' : 'With Atlas Hotel Breaks Pass'}
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
        <div id="featured-hotels" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{isNo ? 'Kurerte hotellperler i Europa' : 'Curated European Gems'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isNo ? 'Velg ditt reisemål og reserver on-site' : 'Choose Your Destination & Reserve On-Site'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isNo
                  ? 'Alle bestillinger behandles direkte av Atlas VIP Concierge. Romprisen er 0 kr med ditt medlemskap.'
                  : 'All reservations handled directly by Atlas VIP Concierge. Room rate is $0 with your membership.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-200/70 text-xs font-semibold">
              <button
                onClick={() => setSelectedCountry('all')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCountry === 'all'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isNo ? 'Alle (Europa)' : 'All (Europe)'}
              </button>
              <button
                onClick={() => setSelectedCountry('italy')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCountry === 'italy'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇮🇹 Italia
              </button>
              <button
                onClick={() => setSelectedCountry('germany')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCountry === 'germany'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇩🇪 Tyskland
              </button>
              <button
                onClick={() => setSelectedCountry('austria')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCountry === 'austria'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇦🇹 Østerrike
              </button>
              <button
                onClick={() => setSelectedCountry('france')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCountry === 'france'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇫🇷 Frankrike
              </button>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black tracking-wider uppercase shadow-sm">
                      {isNo ? '0 kr Rompris' : '$0 Room Rate'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="font-bold text-base line-clamp-1">{hotel.name}</div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(isNo ? hotel.tagsNo : hotel.tagsEn).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {isNo ? hotel.descriptionNo : hotel.descriptionEn}
                    </p>

                    <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1 text-xs">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        {isNo ? 'Måltidsavtale (Halvpensjon):' : 'Culinary Program (Half-Board):'}
                      </div>
                      <div className="font-bold text-slate-900">
                        {isNo ? hotel.halfBoardEstNo : hotel.halfBoardEstEn}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {isNo ? 'Gjort opp direkte på hotellet ved utsjekk' : 'Settled directly with hotel on checkout'}
                      </div>
                    </div>

                    {/* Airport Transit & Route Copilot Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedHotelForTransit(hotel)}
                      className="w-full py-2 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-between transition cursor-pointer border border-slate-800 hover:border-amber-400/50 group/transit shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                          <Plane className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-bold text-slate-200 group-hover/transit:text-white">
                            {hotel.transit.primaryAirport.code} ({hotel.transit.primaryAirport.driveTime})
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {isNo ? 'Sjåfør • Leiebil • Tog & AI' : 'Chauffeur • Car • Rail & AI'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover/transit:translate-x-0.5 transition-transform">
                        <span>{isNo ? 'Reiserute' : 'Transit'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 line-through">
                        {isNo ? `Verdi ${hotel.normalRoomValueNo}` : `Value ${hotel.normalRoomValueEn}`}
                      </div>
                      <div className="text-base font-black text-emerald-600">
                        0 kr <span className="text-[11px] font-normal text-slate-500">/ 2 pers</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBookingModal(hotel)}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isNo ? 'Reserver rom' : 'Reserve Room'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW TO REDEEM STEP-BY-STEP */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isNo ? 'Enkel 3-trinns prosess' : 'Simple 3-Step Process'}</span>
            </div>
            <h3 className="text-2xl font-black">
              {isNo ? 'Slik fungerer din reise med Atlas Hotel Breaks' : 'How Your Journey Works with Atlas Hotel Breaks'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                1
              </div>
              <div className="text-sm font-bold text-white">
                {isNo ? 'Aktiver ditt gratis pass' : 'Activate Your Free Pass'}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? 'Som VIP-medlem henter du din unike passkode øverst på denne siden. Koden er gyldig i over 12 måneder.'
                  : 'As an Atlas member, unlock your complimentary pass code. Valid for over 12 months for reservations.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                2
              </div>
              <div className="text-sm font-bold text-white">
                {isNo ? 'Velg hotell & datoer' : 'Choose Hotel & Dates'}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? 'Bla gjennom listen over kurerte hoteller ovenfor og bekreft dine reisedatoer direkte i reservasjonsdialogen.'
                  : 'Browse our curated retreats and submit your preferred stay dates directly in our on-site booking modal.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
                3
              </div>
              <div className="text-sm font-bold text-white">
                {isNo ? 'Nyt oppholdet og maten' : 'Enjoy The Retreat & Dining'}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isNo
                  ? 'Atlas Concierge bekrefter rommet (0 kr). Du ankommer hotellet, nyter herlige frokoster og gourmetmiddager, og betaler kun for maten ved utsjekk.'
                  : 'Concierge confirms your $0 lodging. Check in, savor farm-to-table breakfast and chef dinners, settling dining at checkout.'}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {isNo ? 'Ofte stilte spørsmål om Atlas Hotellopphold' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isNo
                ? 'Alt du trenger å vite om bestilling, måltider og vilkår.'
                : 'Everything you need to know about redemption, meals, and conditions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Er rommet virkelig 100% gratis?' : 'Is the room truly 100% free?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Ja! Selve romprisen (losjiet) for 2 personer er 0 kr. Du betaler kun hotellets offisielle halvpensjonspris for frokost og middag direkte til hotellet.'
                  : 'Yes! The double room rate is 0 kr / $0. You only settle the hotel published daily half-board breakfast and dinner upon checkout.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hvor mange personer dekker et pass?' : 'How many guests per pass?'}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {isNo
                  ? 'Hvert pass dekker et dobbeltrom for 2 voksne personer. Reiser dere med barn, kan ekstraseng ofte legges til mot et lite tillegg hos hotellet.'
                  : 'Each pass covers a double room for 2 adults. Extra beds for children can be arranged directly with the property.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isNo ? 'Hvor mange netter kan vi bo?' : 'How many nights can we stay?'}
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
                  : 'Many drive to these alpine and European retreats. If flying (e.g. to Milan, Munich, or Nice), book wholesale flights right on Atlas at 0% markup!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ON-SITE RESERVATION DIALOG MODAL */}
      {selectedHotelForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Hotel className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-cinzel">
                    {isNo ? 'Reservering med Atlas Hotel Breaks-Pass' : 'Atlas Hotel Breaks Pass Reservation'}
                  </h3>
                  <span className="text-[11px] text-amber-300 font-mono">
                    {isNo ? '0 kr rompris for 2 personer' : '$0 room charge for 2 guests'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHotelForBooking(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-left text-xs">
              {reservationSuccess ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {isNo ? 'Reservasjonsforespørsel registrert!' : 'Reservation Request Confirmed!'}
                      </h4>
                      <p className="text-slate-400 text-xs">
                        {isNo
                          ? 'Din forespørsel er oversendt Atlas Concierge og registrert i vårt hotellsystem.'
                          : 'Your request is forwarded to Atlas Concierge and logged in our system.'}
                      </p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>{isNo ? 'Referansenummer:' : 'Booking Reference:'}</span>
                      <span className="text-amber-300 font-bold">{reservationSuccess.reference}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{isNo ? 'Hotell:' : 'Property:'}</span>
                      <span className="text-white font-bold">{reservationSuccess.hotelName}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{isNo ? 'Ønsket innsjekk:' : 'Requested Check-In:'}</span>
                      <span className="text-white">{reservationSuccess.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{isNo ? 'Varighet:' : 'Duration:'}</span>
                      <span className="text-white">{reservationSuccess.nights} netter (Dobbeltrom for 2)</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                      <span>{isNo ? 'Rompris:' : 'Room Cost:'}</span>
                      <span className="text-emerald-400 font-bold">0 kr (100% dekket av Atlas)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{isNo ? 'Aktiv passkode:' : 'Applied Pass Code:'}</span>
                      <span className="text-amber-300">{reservationSuccess.voucherCode}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-[11px] leading-relaxed">
                    ℹ️ {isNo
                      ? 'Atlas Concierge bekrefter romtilgjengelighet direkte med hotellet og sender din skriftlige voucherkvittering til din e-post innen kort tid. Måltider (halvpensjon) gjøres opp direkte på hotellet ved utsjekk.'
                      : 'Atlas Concierge will confirm room availability directly with the hotel and dispatch your formal voucher credential to your email. Half-board dining is settled directly with the property at checkout.'}
                  </div>

                  {/* Direct Printable / PDF Certificate View */}
                  <div className="pt-1">
                    <a
                      href={`/api/vouchers/certificate?reference=${encodeURIComponent(reservationSuccess.reference)}&hotelName=${encodeURIComponent(reservationSuccess.hotelName)}&guestName=${encodeURIComponent(user?.displayName || user?.email || (isNo ? 'ATLAS VIP Medlem' : 'ATLAS VIP Member'))}&checkIn=${encodeURIComponent(reservationSuccess.checkIn)}&nights=${reservationSuccess.nights}&voucherCode=${encodeURIComponent(reservationSuccess.voucherCode)}&location=${encodeURIComponent(selectedHotelForBooking?.location || 'Europa')}&halfBoard=${encodeURIComponent(isNo ? selectedHotelForBooking?.halfBoardEstNo || 'Oppgjøres ved utsjekk' : selectedHotelForBooking?.halfBoardEstEn || 'Settled upon checkout')}&lang=${locale}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isNo ? 'Åpne offisielt innsjekkingssertifikat (PDF)' : 'Open Official Check-In Certificate (PDF)'}</span>
                    </a>
                  </div>

                  {/* Airport Transit & Route Options */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedHotelForTransit(selectedHotelForBooking);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-amber-400" />
                      <span>{isNo ? 'Transport fra flyplass (Sjåfør, Leiebil, Tog & AI)' : 'Airport Transit (Chauffeur, Car, Rail & AI)'}</span>
                    </button>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedHotelForBooking(null)}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      {isNo ? 'Lukk' : 'Close'}
                    </button>
                    <Link
                      href="/trips"
                      className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition text-center"
                    >
                      {isNo ? 'Se i Mine Reiser' : 'View in Trips'}
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  {/* Selected Hotel Overview */}
                  <div className="flex gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <img
                      src={selectedHotelForBooking.image}
                      alt={selectedHotelForBooking.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="text-white font-bold text-sm">{selectedHotelForBooking.name}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{selectedHotelForBooking.location}</span>
                      </div>
                      <div className="text-emerald-400 font-bold text-[11px]">
                        ✓ {isNo ? 'Dobbeltrom inkludert (0 kr rompris)' : 'Double room included ($0 rate)'}
                      </div>
                    </div>
                  </div>

                  {/* Booking Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        {isNo ? 'Ønsket innsjekkingsdato' : 'Preferred Check-In Date'}
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        {isNo ? 'Antall netter' : 'Number of Nights'}
                      </label>
                      <select
                        value={nightsCount}
                        onChange={(e) => setNightsCount(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                      >
                        <option value={2}>2 netter (Helgetur)</option>
                        <option value={3}>3 netter (Langhelg)</option>
                        <option value={4}>4 netter (Midtuke)</option>
                        <option value={6}>6 netter (Ukesopphold)</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isNo ? 'Prisoversikt for reservasjonen:' : 'Price Breakdown for Reservation:'}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">
                        {isNo ? `Hotellrom (${nightsCount} netter for 2 personer):` : `Hotel Room (${nightsCount} nights for 2):`}
                      </span>
                      <span className="text-emerald-400 font-black">0 kr (100% dekket av Atlas)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-1.5">
                      <span className="text-slate-300">
                        {isNo ? 'Frokost & gourmetmiddag på hotellet:' : 'Hotel breakfast & chef dinner:'}
                      </span>
                      <span className="text-amber-300 font-bold">
                        {isNo ? selectedHotelForBooking.halfBoardEstNo : selectedHotelForBooking.halfBoardEstEn}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 italic pt-1">
                      {isNo
                        ? '*Måltider gjøres opp direkte med hotellet ved utsjekk. Ingen betaling kreves på forhånd til Atlas.'
                        : '*Meals are paid directly to the hotel upon checkout. No advance payment required by Atlas.'}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isReserving}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isReserving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isNo ? 'Sender til VIP Concierge...' : 'Routing to VIP Concierge...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isNo ? 'Bekreft & Send reservasjon til Concierge' : 'Confirm & Send Reservation to Concierge'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <AirportTransitCopilotModal
        hotel={selectedHotelForTransit}
        isOpen={!!selectedHotelForTransit}
        onClose={() => setSelectedHotelForTransit(null)}
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultMode="signup" />
    </div>
  );
}
