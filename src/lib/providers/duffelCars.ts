/**
 * Atlas Travel Club — Duffel Cars B2B Provider Client
 * Connects to Duffel Cars API (40+ global rental brands, 40,000 locations).
 * 
 * Strategic Policy:
 * - 0 kr Club Markup: Member pays the raw B2B rate with zero markup (100% price transparency).
 * - Provider Commission: Atlas earns 8% - 12% B2B commission directly from Duffel in the background.
 * - Zero Working Capital (Guarantee): Reservations are guaranteed via customer card and paid directly at the pickup counter.
 */

export interface DuffelCarLocation {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  locationName?: string;
  iataCode?: string;
}

export interface DuffelCarSearchParams {
  pickupLocation: DuffelCarLocation;
  dropoffLocation?: DuffelCarLocation; // Optional for one-way rentals
  pickupDate: string;   // YYYY-MM-DD
  pickupTime: string;   // HH:MM
  dropoffDate: string;  // YYYY-MM-DD
  dropoffTime: string;  // HH:MM
  driverAge: number;
  driverCountryCode: string; // ISO (e.g. 'NO', 'GB', 'US')
  loyaltyProgramNumber?: string;
  vehicleCategory?: 'All' | 'Economy' | 'Compact' | 'SUV' | 'Luxury' | 'EV';
}

export interface AtlasNormalizedCarOffer {
  id: string;
  rateId: string;
  supplierName: string;
  supplierLogoUrl?: string;
  vehicleName: string;
  carGroup: string; // e.g. "CCAR", "IFAR", "PCAR" (ACRISS code)
  category: 'Economy' | 'Compact' | 'Intermediate' | 'Standard' | 'Fullsize' | 'Premium' | 'Luxury' | 'SUV' | 'Minivan' | 'EV';
  transmission: 'Automatic' | 'Manual';
  seats: number;
  doors: number;
  baggageLarge: number;
  baggageSmall: number;
  airConditioning: boolean;
  electricOrHybrid: boolean;
  imageUrl: string;
  mileagePolicy: string; // e.g. 'Unlimited mileage included'
  
  // Payment & MoR
  paymentType: 'guarantee' | 'postpaid' | 'prepaid';
  depositRequiredAtCounterGbp: number;
  
  // Financial Transparency (0 kr Markup Policy)
  currency: string;
  rawSupplierRate: number;      // Exact wholesale/direct rate from supplier
  atlasClubMarkup: number;       // Explicitly 0 kr / £0.00
  memberPrice: number;          // Total price member pays (= rawSupplierRate)
  estimatedCommissionPct: number; // 8% - 12% earned by Hard Rock Capital Ltd
  estimatedCommissionAmount: number; // Cash commission earned by Atlas
  expediaRetailBenchmark: number; // Estimated OTA comparison
  memberInstantSavings: number;  // Net savings vs Expedia
  
  // Policies
  cancellationPolicy: string;
  pickupStation: {
    name: string;
    address: string;
    locationType: 'Airport Terminal' | 'City Center' | 'Railway Station';
    openingHours: string;
  };
}

export class DuffelCarsProvider {
  private token: string;
  private baseUrl: string = 'https://api.duffel.com';

  constructor(token: string = '') {
    this.token = token || process.env.DUFFEL_ACCESS_TOKEN || '';
  }

  get isConfigured(): boolean {
    return !!this.token;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Duffel-Version': 'v2',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Search real-time car rental offers via Duffel Cars
   */
  async searchCars(params: DuffelCarSearchParams): Promise<{
    success: boolean;
    offers: AtlasNormalizedCarOffer[];
    totalCount: number;
    currency: string;
    searchId?: string;
    isMockSimulation?: boolean;
    error?: string;
  }> {
    // If token is missing, provide realistic sandbox simulation
    if (!this.token) {
      return this.getMockCarOffers(params);
    }

    try {
      const payload = {
        data: {
          pickup_location: {
            geographic_coordinates: {
              latitude: params.pickupLocation.latitude,
              longitude: params.pickupLocation.longitude,
            },
            radius: params.pickupLocation.radiusKm || 10,
          },
          pickup_date: params.pickupDate,
          pickup_time: params.pickupTime,
          dropoff_location: {
            geographic_coordinates: {
              latitude: (params.dropoffLocation || params.pickupLocation).latitude,
              longitude: (params.dropoffLocation || params.pickupLocation).longitude,
            },
            radius: (params.dropoffLocation || params.pickupLocation).radiusKm || 10,
          },
          dropoff_date: params.dropoffDate,
          dropoff_time: params.dropoffTime,
          driver: {
            age: params.driverAge || 35,
            residence_country_code: params.driverCountryCode || 'NO',
          },
        },
      };

      const res = await fetch(`${this.baseUrl}/cars/search`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`[DuffelCars] API search failed (${res.status}): ${errText}. Falling back to sandbox simulation.`);
        return this.getMockCarOffers(params);
      }

      const json = await res.json();
      const rawRates = json?.data?.rates || [];
      const searchId = json?.data?.id || '';

      const normalized = rawRates.map((rate: any) => this.normalizeDuffelRate(rate, params));

      return {
        success: true,
        offers: normalized,
        totalCount: normalized.length,
        currency: normalized[0]?.currency || 'GBP',
        searchId,
      };
    } catch (err: any) {
      console.warn(`[DuffelCars] Network error: ${err.message}. Falling back to simulation.`);
      return this.getMockCarOffers(params);
    }
  }

  /**
   * Normalize Duffel Car rate into Atlas zero-markup transparent model
   */
  private normalizeDuffelRate(rate: any, params: DuffelCarSearchParams): AtlasNormalizedCarOffer {
    const rawAmount = parseFloat(rate.total_amount || rate.amount || '0');
    const currency = rate.currency || 'GBP';
    
    // Atlas Zero-Markup Policy
    const atlasClubMarkup = 0; // 0 kr / £0.00
    const memberPrice = rawAmount;
    
    // Duffel pays Atlas 10% commission on average
    const commissionPct = 10;
    const estimatedCommissionAmount = Math.round(rawAmount * (commissionPct / 100) * 100) / 100;
    
    // Expedia Benchmark (Expedia typically adds 18-22% retail markup)
    const expediaRetailBenchmark = Math.round(rawAmount * 1.20 * 100) / 100;
    const memberInstantSavings = Math.round((expediaRetailBenchmark - memberPrice) * 100) / 100;

    return {
      id: rate.id,
      rateId: rate.id,
      supplierName: rate.supplier?.name || 'Hertz',
      supplierLogoUrl: rate.supplier?.logo_url,
      vehicleName: rate.vehicle?.name || 'Volkswagen Golf or similar',
      carGroup: rate.vehicle?.acriss_code || 'CDAR',
      category: this.mapCategory(rate.vehicle?.category),
      transmission: rate.vehicle?.transmission_type === 'manual' ? 'Manual' : 'Automatic',
      seats: rate.vehicle?.passenger_capacity || 5,
      doors: rate.vehicle?.doors || 5,
      baggageLarge: rate.vehicle?.baggage_capacity || 2,
      baggageSmall: 1,
      airConditioning: rate.vehicle?.has_air_conditioning ?? true,
      electricOrHybrid: rate.vehicle?.engine_type === 'electric' || rate.vehicle?.engine_type === 'hybrid',
      imageUrl: rate.vehicle?.image_url || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      mileagePolicy: rate.mileage_policy === 'unlimited' ? 'Ubegrenset kjørelengde inkludert' : 'Begrenset kjørelengde',
      paymentType: rate.payment_type || 'guarantee',
      depositRequiredAtCounterGbp: parseFloat(rate.security_deposit?.amount || '200'),
      currency,
      rawSupplierRate: rawAmount,
      atlasClubMarkup: 0,
      memberPrice,
      estimatedCommissionPct: commissionPct,
      estimatedCommissionAmount,
      expediaRetailBenchmark,
      memberInstantSavings,
      cancellationPolicy: 'Gratis avbestilling frem til 48 timer før henting',
      pickupStation: {
        name: rate.pickup_location?.name || 'Flyplassterminal Car Rental Center',
        address: rate.pickup_location?.address || 'Terminal 1 Arrivals Hall',
        locationType: 'Airport Terminal',
        openingHours: '06:00 - 23:30 Daglig',
      },
    };
  }

  private mapCategory(raw: string): AtlasNormalizedCarOffer['category'] {
    const lower = (raw || '').toLowerCase();
    if (lower.includes('suv')) return 'SUV';
    if (lower.includes('luxury') || lower.includes('premium')) return 'Luxury';
    if (lower.includes('electric') || lower.includes('ev')) return 'EV';
    if (lower.includes('compact')) return 'Compact';
    if (lower.includes('intermediate') || lower.includes('standard')) return 'Standard';
    return 'Economy';
  }

  /**
   * Mock sandbox simulation for preview & development
   */
  private getMockCarOffers(params: DuffelCarSearchParams): {
    success: boolean;
    offers: AtlasNormalizedCarOffer[];
    totalCount: number;
    currency: string;
    isMockSimulation: boolean;
  } {
    const isNiceOrMalaga = (params.pickupLocation.iataCode === 'NCE' || params.pickupLocation.iataCode === 'AGP');
    const currency = 'NOK';

    const SAMPLE_FLEET: AtlasNormalizedCarOffer[] = [
      {
        id: 'car-sixt-audi-a3',
        rateId: 'rate_sixt_01',
        supplierName: 'Sixt',
        supplierLogoUrl: 'https://assets.duffel.com/img/partners/sixt.png',
        vehicleName: 'Audi A3 Sportback eller tilsvarende',
        carGroup: 'CDAR',
        category: 'Compact',
        transmission: 'Automatic',
        seats: 5,
        doors: 5,
        baggageLarge: 2,
        baggageSmall: 1,
        airConditioning: true,
        electricOrHybrid: false,
        imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80',
        mileagePolicy: 'Ubegrenset kjørelengde inkludert',
        paymentType: 'guarantee',
        depositRequiredAtCounterGbp: 1500,
        currency: 'NOK',
        rawSupplierRate: 3450,
        atlasClubMarkup: 0,
        memberPrice: 3450,
        estimatedCommissionPct: 10,
        estimatedCommissionAmount: 345,
        expediaRetailBenchmark: 4190,
        memberInstantSavings: 740,
        cancellationPolicy: 'Gratis avbestilling frem til 48 timer før henting',
        pickupStation: {
          name: 'Sixt Car Rental Terminal Desk',
          address: 'Terminal Arrivals Hall / Car Rental Area',
          locationType: 'Airport Terminal',
          openingHours: '06:00 - 23:59 Daglig',
        },
      },
      {
        id: 'car-hertz-tesla-3',
        rateId: 'rate_hertz_02',
        supplierName: 'Hertz',
        supplierLogoUrl: 'https://assets.duffel.com/img/partners/hertz.png',
        vehicleName: 'Tesla Model 3 Long Range (EV)',
        carGroup: 'JDAE',
        category: 'EV',
        transmission: 'Automatic',
        seats: 5,
        doors: 5,
        baggageLarge: 2,
        baggageSmall: 2,
        airConditioning: true,
        electricOrHybrid: true,
        imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80',
        mileagePolicy: 'Ubegrenset kjørelengde inkludert',
        paymentType: 'guarantee',
        depositRequiredAtCounterGbp: 2000,
        currency: 'NOK',
        rawSupplierRate: 4890,
        atlasClubMarkup: 0,
        memberPrice: 4890,
        estimatedCommissionPct: 11,
        estimatedCommissionAmount: 538,
        expediaRetailBenchmark: 5950,
        memberInstantSavings: 1060,
        cancellationPolicy: 'Gratis avbestilling frem til 48 timer før henting',
        pickupStation: {
          name: 'Hertz Gold Plus Rewards Counter',
          address: 'Airport Parking Car Rental Deck P2',
          locationType: 'Airport Terminal',
          openingHours: '06:00 - 23:30 Daglig',
        },
      },
      {
        id: 'car-avis-bmw-x3',
        rateId: 'rate_avis_03',
        supplierName: 'Avis',
        supplierLogoUrl: 'https://assets.duffel.com/img/partners/avis.png',
        vehicleName: 'BMW X3 xDrive eller Mercedes-Benz GLC (SUV)',
        carGroup: 'PFAR',
        category: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        doors: 5,
        baggageLarge: 3,
        baggageSmall: 2,
        airConditioning: true,
        electricOrHybrid: true,
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
        mileagePolicy: 'Ubegrenset kjørelengde inkludert',
        paymentType: 'guarantee',
        depositRequiredAtCounterGbp: 2500,
        currency: 'NOK',
        rawSupplierRate: 6400,
        atlasClubMarkup: 0,
        memberPrice: 6400,
        estimatedCommissionPct: 12,
        estimatedCommissionAmount: 768,
        expediaRetailBenchmark: 7890,
        memberInstantSavings: 1490,
        cancellationPolicy: 'Gratis avbestilling frem til 24 timer før henting',
        pickupStation: {
          name: 'Avis Preferred Express Desk',
          address: 'Main Terminal Ground Level Parking',
          locationType: 'Airport Terminal',
          openingHours: '06:00 - 00:30 Daglig',
        },
      },
      {
        id: 'car-europcar-fiat-500',
        rateId: 'rate_europcar_04',
        supplierName: 'Europcar',
        supplierLogoUrl: 'https://assets.duffel.com/img/partners/europcar.png',
        vehicleName: 'Fiat 500 Hybrid eller Volkswagen Polo',
        carGroup: 'EDMR',
        category: 'Economy',
        transmission: 'Manual',
        seats: 4,
        doors: 3,
        baggageLarge: 1,
        baggageSmall: 1,
        airConditioning: true,
        electricOrHybrid: true,
        imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80',
        mileagePolicy: 'Ubegrenset kjørelengde inkludert',
        paymentType: 'guarantee',
        depositRequiredAtCounterGbp: 1000,
        currency: 'NOK',
        rawSupplierRate: 2190,
        atlasClubMarkup: 0,
        memberPrice: 2190,
        estimatedCommissionPct: 9,
        estimatedCommissionAmount: 197,
        expediaRetailBenchmark: 2690,
        memberInstantSavings: 500,
        cancellationPolicy: 'Gratis avbestilling frem til 48 timer før henting',
        pickupStation: {
          name: 'Europcar Rental Station',
          address: 'Terminal 2 Arrivals / Car Rental Center',
          locationType: 'Airport Terminal',
          openingHours: '07:00 - 23:00 Daglig',
        },
      },
    ];

    return {
      success: true,
      offers: SAMPLE_FLEET,
      totalCount: SAMPLE_FLEET.length,
      currency,
      isMockSimulation: true,
    };
  }
}
