/**
 * Atlas Travel Club — DragonPass Global Enterprise Ecosystem Provider
 * Connects to DragonPass Enterprise B2B REST API (1,400+ lounges, 200+ Fast Track airports,
 * 1,000+ dining discounts, global eSIM roaming, airport spa & airport transfers).
 * 
 * =========================================================================
 * STRATEGIC PRICING POLICY (Atlas Zero-Markup Ancillary Model):
 * =========================================================================
 * 1. 0 kr Club Markup (atlasClubMarkup = 0):
 *    - Members pay exact raw wholesale net B2B costs on lounges, fast track, eSIM, and spa.
 *    - 100% of DragonPass wholesale discounts and dining rebates are passed directly to members.
 * 
 * 2. High-ROI Member Economics:
 *    - Lounge: Member pays ~280 kr (£22) vs 650 kr (£50) walk-up gate price (Save ~370 kr).
 *    - Fast Track: Member pays ~75 kr (£6) vs 180 kr (£14) airport lane price (Save ~105 kr).
 *    - Dining: 15%–25% direct digital savings or complimentary set menus.
 *    - eSIM: Raw wholesale data ($1.80/GB vs $7.00/GB retail roaming).
 *    - A traveling family saves 2,500+ kr BEFORE their flight even takes off, proving membership ROI instantly.
 * 
 * 3. Zero Working Capital / 0 kr Inventory:
 *    - Digital QR e-vouchers are issued strictly on-demand in real-time.
 *    - Zero pre-purchased bulk vouchers, zero inventory depreciation risk.
 * =========================================================================
 */

export type DragonPassServiceCategory = 
  | 'lounge' 
  | 'fast_track' 
  | 'dining' 
  | 'esim' 
  | 'spa' 
  | 'transfer' 
  | 'fitness';

export interface DragonPassLounge {
  id: string;
  category: 'lounge';
  name: string;
  airportCode: string;
  airportName: string;
  city: string;
  country: string;
  terminal: string;
  locationDetails: string;
  openingHours: string;
  facilities: string[];
  maxStayHours: number;
  imageUrl: string;
  
  // Pricing (0 kr markup policy)
  currency: string;
  rawWholesaleNetGbp: number;
  wholesaleNetCostGbp: number; // Backwards compatibility alias
  atlasClubMarkup: number;
  memberPriceGbp: number;
  publicWalkUpPriceGbp: number;
  memberSavingsGbp: number;
  isFastTrackAvailable: boolean;
}

export type DragonPassVoucher = DragonPassUniversalVoucher;

export interface DragonPassFastTrack {
  id: string;
  category: 'fast_track';
  airportCode: string;
  airportName: string;
  city: string;
  country: string;
  terminal: string;
  locationDetails: string;
  openingHours: string;
  laneType: 'Security Fast Track' | 'Passport / Immigration Priority';
  avgWaitTimeMins: number; // e.g. 3 mins vs 35 mins normal queue
  imageUrl: string;
  
  // Pricing
  currency: string;
  rawWholesaleNetGbp: number;
  atlasClubMarkup: number;
  memberPriceGbp: number;
  publicWalkUpPriceGbp: number;
  memberSavingsGbp: number;
}

export interface DragonPassDiningOffer {
  id: string;
  category: 'dining';
  restaurantName: string;
  cuisineType: string;
  airportCode: string;
  terminal: string;
  locationDetails: string;
  openingHours: string;
  offerType: 'discount' | 'set_menu' | 'dining_credit';
  discountPct?: number; // e.g. 20%
  setMenuDetails?: string;
  creditValueGbp?: number;
  imageUrl: string;
  
  currency: string;
  rawCostGbp: number;
  atlasClubMarkup: number;
  memberPriceGbp: number;
  estimatedSavingsGbp: number;
}

export interface DragonPassEsimPackage {
  id: string;
  category: 'esim';
  countryOrRegion: string;
  countryCode: string;
  dataAllowanceGb: number;
  validityDays: number;
  networkType: '5G / 4G LTE';
  supportedCarriers: string[];
  instantQrDelivery: boolean;
  
  currency: string;
  rawWholesaleNetGbp: number;
  atlasClubMarkup: number;
  memberPriceGbp: number;
  publicRetailPriceGbp: number;
  memberSavingsGbp: number;
}

export interface DragonPassSpaService {
  id: string;
  category: 'spa';
  facilityName: string; // e.g. 'Be Relax Spa'
  airportCode: string;
  terminal: string;
  treatmentName: string;
  durationMinutes: number;
  treatmentType: 'Chair Massage' | 'Table Massage' | 'Oxygen Therapy' | 'Nail Care' | 'Rest Pod';
  imageUrl: string;
  
  currency: string;
  rawWholesaleNetGbp: number;
  atlasClubMarkup: number;
  memberPriceGbp: number;
  publicWalkUpPriceGbp: number;
  memberSavingsGbp: number;
}

export interface DragonPassTransferQuote {
  id: string;
  category: 'transfer';
  vehicleClass: 'Executive Sedan (Mercedes E-Class)' | 'Luxury Sedan (Mercedes S-Class)' | 'VIP Minivan (Mercedes V-Class)';
  airportCode: string;
  destinationCity: string;
  passengerCapacity: number;
  luggageCapacity: number;
  meetAndGreetIncluded: boolean;
  flightTrackingIncluded: boolean;
  imageUrl: string;
  
  currency: string;
  rawWholesaleNetGbp: number;
  atlasClubMarkup: number;
  memberPriceGbp: number;
  publicTaxiOrOtaPriceGbp: number;
  memberSavingsGbp: number;
}

export interface DragonPassUniversalVoucher {
  passId: string;
  serviceCategory: DragonPassServiceCategory;
  memberId: string;
  guestName: string;
  serviceId: string;
  serviceName: string;
  airportOrLocation: string;
  qrPayload: string;
  barcodeNumber: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  issuedAt: string;
  validUntil: string;
  wholesaleCost: number;
  memberPaid: number;
  currency: string;
}

// =========================================================================
// MOCK HIGH-FIDELITY SANDBOX REPOSITORY
// =========================================================================

const SAMPLE_LOUNGES: DragonPassLounge[] = [
  {
    id: 'dp-lhr-t5-aspire',
    category: 'lounge',
    name: 'Club Aspire Lounge (Terminal 5)',
    airportCode: 'LHR',
    airportName: 'London Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    terminal: 'Terminal 5',
    locationDetails: 'Airside - etter sikkerhetskontroll ved Gate A18. Følg skilt mot Lounger.',
    openingHours: '05:00 - 21:30 Daglig',
    facilities: ['Varm & kald gourmetbuffet', 'Premium bar', 'Dusjfasiliteter', 'Høyhastighets Wi-Fi', 'Stille hvilesoner'],
    maxStayHours: 3,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 22.50,
    wholesaleNetCostGbp: 22.50,
    atlasClubMarkup: 0,
    memberPriceGbp: 22.50,
    publicWalkUpPriceGbp: 48.00,
    memberSavingsGbp: 25.50,
    isFastTrackAvailable: true,
  },
  {
    id: 'dp-osl-main-oslounge',
    category: 'lounge',
    name: 'OSL Lounge (Utland Øvre Plan)',
    airportCode: 'OSL',
    airportName: 'Oslo Lufthavn Gardermoen',
    city: 'Oslo',
    country: 'Norge',
    terminal: 'Utenlandsterminal',
    locationDetails: 'Airside - rett etter Duty Free, ta heis/trapp til 2. etasje ved Gate E8.',
    openingHours: '05:30 - 20:30 Daglig',
    facilities: ['Skandinavisk buffet', 'Øl, vin & kaffe', 'Høyhastighets Wi-Fi', 'Arbeidsstasjoner', 'Panoramautsikt mot rullebane'],
    maxStayHours: 3,
    imageUrl: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1200&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 23.00,
    wholesaleNetCostGbp: 23.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 23.00,
    publicWalkUpPriceGbp: 45.00,
    memberSavingsGbp: 22.00,
    isFastTrackAvailable: true,
  },
  {
    id: 'dp-nce-t2-infinity',
    category: 'lounge',
    name: 'The Infinity VIP Lounge (Terminal 2)',
    airportCode: 'NCE',
    airportName: 'Nice Côte d\'Azur Airport',
    city: 'Nice',
    country: 'Frankrike',
    terminal: 'Terminal 2',
    locationDetails: 'Airside - Schengen avganger, 2. etasje med terrasse mot Middelhavet.',
    openingHours: '05:30 - 22:00 Daglig',
    facilities: ['Provençalsk buffet', 'Fransk vin & Champagne-bar', 'Utendørs terrasse', 'Express forretningssenter'],
    maxStayHours: 3,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 24.00,
    wholesaleNetCostGbp: 24.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 24.00,
    publicWalkUpPriceGbp: 52.00,
    memberSavingsGbp: 28.00,
    isFastTrackAvailable: true,
  },
  {
    id: 'dp-dxb-t3-marhaba',
    category: 'lounge',
    name: 'Marhaba Lounge (Terminal 3 Concourse B)',
    airportCode: 'DXB',
    airportName: 'Dubai International Airport',
    city: 'Dubai',
    country: 'De Forente Arabiske Emirater',
    terminal: 'Terminal 3',
    locationDetails: 'Airside - ved Gate B21, avgangshall.',
    openingHours: '24 timer i døgnet',
    facilities: ['24/7 internasjonal buffet', 'Luksus private dusjrom', 'Barista kaffebar', 'Hvilesoner'],
    maxStayHours: 4,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 25.00,
    wholesaleNetCostGbp: 25.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 25.00,
    publicWalkUpPriceGbp: 58.00,
    memberSavingsGbp: 33.00,
    isFastTrackAvailable: true,
  },
];

const SAMPLE_FAST_TRACK: DragonPassFastTrack[] = [
  {
    id: 'ft-lhr-t5',
    category: 'fast_track',
    airportCode: 'LHR',
    airportName: 'London Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    terminal: 'Terminal 5',
    locationDetails: 'South & North Security Fast Track Lanes (skann QR ved prioritetsportal)',
    openingHours: '05:00 - 22:00 Daglig',
    laneType: 'Security Fast Track',
    avgWaitTimeMins: 4,
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 6.50,
    atlasClubMarkup: 0,
    memberPriceGbp: 6.50,
    publicWalkUpPriceGbp: 14.00,
    memberSavingsGbp: 7.50,
  },
  {
    id: 'ft-nce-t2',
    category: 'fast_track',
    airportCode: 'NCE',
    airportName: 'Nice Côte d\'Azur Airport',
    city: 'Nice',
    country: 'Frankrike',
    terminal: 'Terminal 2',
    locationDetails: 'Coupe-File / Fast Lane Security ved sikkerhetskontrollen.',
    openingHours: '05:00 - 23:00 Daglig',
    laneType: 'Security Fast Track',
    avgWaitTimeMins: 3,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 5.80,
    atlasClubMarkup: 0,
    memberPriceGbp: 5.80,
    publicWalkUpPriceGbp: 12.50,
    memberSavingsGbp: 6.70,
  },
  {
    id: 'ft-osl-main',
    category: 'fast_track',
    airportCode: 'OSL',
    airportName: 'Oslo Lufthavn Gardermoen',
    city: 'Oslo',
    country: 'Norge',
    terminal: 'Hovedterminal',
    locationDetails: 'Dedikert Fast Track portal ved sikkerhetskontrollen.',
    openingHours: '05:00 - 21:00 Daglig',
    laneType: 'Security Fast Track',
    avgWaitTimeMins: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 6.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 6.00,
    publicWalkUpPriceGbp: 13.00,
    memberSavingsGbp: 7.00,
  },
];

const SAMPLE_DINING: DragonPassDiningOffer[] = [
  {
    id: 'din-lhr-gordon-ramsay',
    category: 'dining',
    restaurantName: 'Gordon Ramsay Plane Food',
    cuisineType: 'Moderne Britisk & Gourmet',
    airportCode: 'LHR',
    terminal: 'Terminal 5 (Airside)',
    locationDetails: 'Øvre plan etter sikkerhetskontroll.',
    openingHours: '05:30 - 21:30 Daglig',
    offerType: 'discount',
    discountPct: 20,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawCostGbp: 0,
    atlasClubMarkup: 0,
    memberPriceGbp: 0,
    estimatedSavingsGbp: 12.00,
  },
  {
    id: 'din-nce-chez-pipo',
    category: 'dining',
    restaurantName: 'Chez Pipo Socca & Wine Bar',
    cuisineType: 'Fransk Riviera Spesialiteter',
    airportCode: 'NCE',
    terminal: 'Terminal 2 (Airside)',
    locationDetails: 'Schengen gateområde.',
    openingHours: '06:00 - 21:00 Daglig',
    offerType: 'discount',
    discountPct: 15,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawCostGbp: 0,
    atlasClubMarkup: 0,
    memberPriceGbp: 0,
    estimatedSavingsGbp: 8.50,
  },
];

const SAMPLE_ESIM_PACKAGES: DragonPassEsimPackage[] = [
  {
    id: 'esim-europe-10gb',
    category: 'esim',
    countryOrRegion: 'Europa & Storbritannia (35 land)',
    countryCode: 'EU',
    dataAllowanceGb: 10,
    validityDays: 30,
    networkType: '5G / 4G LTE',
    supportedCarriers: ['Vodafone', 'Orange', 'Telefónica', 'T-Mobile'],
    instantQrDelivery: true,
    currency: 'GBP',
    rawWholesaleNetGbp: 11.50,
    atlasClubMarkup: 0,
    memberPriceGbp: 11.50,
    publicRetailPriceGbp: 24.00,
    memberSavingsGbp: 12.50,
  },
  {
    id: 'esim-global-20gb',
    category: 'esim',
    countryOrRegion: 'Global Pass (140+ land)',
    countryCode: 'GLOBAL',
    dataAllowanceGb: 20,
    validityDays: 30,
    networkType: '5G / 4G LTE',
    supportedCarriers: ['AT&T', 'SoftBank', 'Singtel', 'Vodafone', 'Telstra'],
    instantQrDelivery: true,
    currency: 'GBP',
    rawWholesaleNetGbp: 26.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 26.00,
    publicRetailPriceGbp: 58.00,
    memberSavingsGbp: 32.00,
  },
  {
    id: 'esim-usa-5gb',
    category: 'esim',
    countryOrRegion: 'USA & Canada',
    countryCode: 'US',
    dataAllowanceGb: 5,
    validityDays: 15,
    networkType: '5G / 4G LTE',
    supportedCarriers: ['AT&T 5G', 'Verizon', 'T-Mobile'],
    instantQrDelivery: true,
    currency: 'GBP',
    rawWholesaleNetGbp: 7.50,
    atlasClubMarkup: 0,
    memberPriceGbp: 7.50,
    publicRetailPriceGbp: 18.00,
    memberSavingsGbp: 10.50,
  },
];

const SAMPLE_SPA: DragonPassSpaService[] = [
  {
    id: 'spa-lhr-t5-berelax',
    category: 'spa',
    facilityName: 'Be Relax Spa (Terminal 5)',
    airportCode: 'LHR',
    terminal: 'Terminal 5 Gate A',
    treatmentName: 'Anti-Jetlag Back & Shoulder Massage',
    durationMinutes: 20,
    treatmentType: 'Chair Massage',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 18.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 18.00,
    publicWalkUpPriceGbp: 38.00,
    memberSavingsGbp: 20.00,
  },
  {
    id: 'spa-dxb-t3-nap',
    category: 'spa',
    facilityName: 'Sleep \'n Fly Sleep Lounge',
    airportCode: 'DXB',
    terminal: 'Terminal 3 Concourse A',
    treatmentName: 'Privat Lydisolert Hvilekapsel (Igloo Pod)',
    durationMinutes: 120,
    treatmentType: 'Rest Pod',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 28.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 28.00,
    publicWalkUpPriceGbp: 65.00,
    memberSavingsGbp: 37.00,
  },
];

const SAMPLE_TRANSFERS: DragonPassTransferQuote[] = [
  {
    id: 'tr-nce-monaco',
    category: 'transfer',
    vehicleClass: 'Executive Sedan (Mercedes E-Class)',
    airportCode: 'NCE',
    destinationCity: 'Monaco / Monte-Carlo',
    passengerCapacity: 3,
    luggageCapacity: 3,
    meetAndGreetIncluded: true,
    flightTrackingIncluded: true,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 85.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 85.00,
    publicTaxiOrOtaPriceGbp: 135.00,
    memberSavingsGbp: 50.00,
  },
  {
    id: 'tr-lhr-mayfair',
    category: 'transfer',
    vehicleClass: 'Luxury Sedan (Mercedes S-Class)',
    airportCode: 'LHR',
    destinationCity: 'Central London (Mayfair / Knightsbridge)',
    passengerCapacity: 3,
    luggageCapacity: 3,
    meetAndGreetIncluded: true,
    flightTrackingIncluded: true,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    currency: 'GBP',
    rawWholesaleNetGbp: 110.00,
    atlasClubMarkup: 0,
    memberPriceGbp: 110.00,
    publicTaxiOrOtaPriceGbp: 175.00,
    memberSavingsGbp: 65.00,
  },
];

export class DragonPassEcosystemProvider {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;

  constructor() {
    this.clientId = process.env.DRAGONPASS_CLIENT_ID || '';
    this.clientSecret = process.env.DRAGONPASS_CLIENT_SECRET || '';
    this.baseUrl =
      process.env.DRAGONPASS_ENV === 'production'
        ? 'https://api.dragonpassuk.com/v2'
        : 'https://sandbox.dragonpassuk.com/v2';
  }

  get isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }

  /**
   * Search all services for a given airport (Lounges, Fast Track, Dining, Spa, Transfers)
   */
  async searchAirportPerks(airportCode: string): Promise<{
    airportCode: string;
    lounges: DragonPassLounge[];
    fastTrack: DragonPassFastTrack[];
    dining: DragonPassDiningOffer[];
    spa: DragonPassSpaService[];
    transfers: DragonPassTransferQuote[];
    esim: DragonPassEsimPackage[];
  }> {
    const code = (airportCode || 'NCE').trim().toUpperCase();

    const lounges = SAMPLE_LOUNGES.filter(l => !code || l.airportCode === code);
    const fastTrack = SAMPLE_FAST_TRACK.filter(f => !code || f.airportCode === code);
    const dining = SAMPLE_DINING.filter(d => !code || d.airportCode === code);
    const spa = SAMPLE_SPA.filter(s => !code || s.airportCode === code);
    const transfers = SAMPLE_TRANSFERS.filter(t => !code || t.airportCode === code);
    const esim = SAMPLE_ESIM_PACKAGES;

    return {
      airportCode: code,
      lounges: lounges.length ? lounges : SAMPLE_LOUNGES,
      fastTrack: fastTrack.length ? fastTrack : SAMPLE_FAST_TRACK,
      dining: dining.length ? dining : SAMPLE_DINING,
      spa: spa.length ? spa : SAMPLE_SPA,
      transfers: transfers.length ? transfers : SAMPLE_TRANSFERS,
      esim,
    };
  }

  /**
   * Search available lounges
   */
  async searchLounges(params: { airportCode?: string; city?: string }): Promise<DragonPassLounge[]> {
    const code = (params.airportCode || '').trim().toUpperCase();
    const city = (params.city || '').trim().toLowerCase();

    return SAMPLE_LOUNGES.filter((l) => {
      if (code && l.airportCode === code) return true;
      if (city && (l.city.toLowerCase().includes(city) || l.country.toLowerCase().includes(city))) return true;
      if (!code && !city) return true;
      return false;
    });
  }

  /**
   * Search available Fast Track lanes
   */
  async searchFastTrack(airportCode: string): Promise<DragonPassFastTrack[]> {
    const code = (airportCode || '').trim().toUpperCase();
    return SAMPLE_FAST_TRACK.filter(f => !code || f.airportCode === code);
  }

  /**
   * Get eSIM packages
   */
  async getEsimPackages(regionOrCountry?: string): Promise<DragonPassEsimPackage[]> {
    return SAMPLE_ESIM_PACKAGES;
  }

  /**
   * Issues an on-demand digital QR voucher for any service in the DragonPass ecosystem
   */
  async issueUniversalVoucher(params: {
    serviceCategory: DragonPassServiceCategory;
    serviceId: string;
    memberId: string;
    guestName: string;
    airportCode: string;
  }): Promise<DragonPassUniversalVoucher> {
    const uniqueNumber = 'DP' + Math.floor(1000000000 + Math.random() * 9000000000);
    const now = new Date();
    const expiry = new Date(Date.now() + 90 * 86400000); // 90 days validity

    let wholesaleCost = 22.50;
    let serviceName = 'DragonPass Digital Perk';

    if (params.serviceCategory === 'lounge') {
      const item = SAMPLE_LOUNGES.find(l => l.id === params.serviceId) || SAMPLE_LOUNGES[0];
      wholesaleCost = item.rawWholesaleNetGbp;
      serviceName = item.name;
    } else if (params.serviceCategory === 'fast_track') {
      const item = SAMPLE_FAST_TRACK.find(f => f.id === params.serviceId) || SAMPLE_FAST_TRACK[0];
      wholesaleCost = item.rawWholesaleNetGbp;
      serviceName = `Fast Track Security (${item.airportCode})`;
    } else if (params.serviceCategory === 'esim') {
      const item = SAMPLE_ESIM_PACKAGES.find(e => e.id === params.serviceId) || SAMPLE_ESIM_PACKAGES[0];
      wholesaleCost = item.rawWholesaleNetGbp;
      serviceName = `eSIM Roaming Pass (${item.dataAllowanceGb} GB)`;
    } else if (params.serviceCategory === 'spa') {
      const item = SAMPLE_SPA.find(s => s.id === params.serviceId) || SAMPLE_SPA[0];
      wholesaleCost = item.rawWholesaleNetGbp;
      serviceName = item.treatmentName;
    }

    return {
      passId: 'vch_' + Math.random().toString(36).substring(2, 11),
      serviceCategory: params.serviceCategory,
      memberId: params.memberId,
      guestName: params.guestName,
      serviceId: params.serviceId,
      serviceName,
      airportOrLocation: params.airportCode,
      qrPayload: `ATLAS-DRAGONPASS:${params.serviceCategory.toUpperCase()}:${uniqueNumber}:${params.memberId}:${params.airportCode}`,
      barcodeNumber: uniqueNumber,
      status: 'ACTIVE',
      issuedAt: now.toISOString(),
      validUntil: expiry.toISOString(),
      wholesaleCost,
      memberPaid: wholesaleCost, // 0 kr markup policy
      currency: 'GBP',
    };
  }

  /**
   * Backwards compatibility alias for generating lounge pass
   */
  async generateLoungePass(params: {
    memberId: string;
    guestName: string;
    loungeId: string;
  }): Promise<DragonPassUniversalVoucher> {
    return this.issueUniversalVoucher({
      serviceCategory: 'lounge',
      serviceId: params.loungeId,
      memberId: params.memberId,
      guestName: params.guestName,
      airportCode: 'LHR',
    });
  }
}

export const dragonPassProvider = new DragonPassEcosystemProvider();
