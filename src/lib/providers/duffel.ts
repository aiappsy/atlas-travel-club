import { calculateFlightClearingSummary } from '@/lib/flights/flightPolicy';

export interface DuffelNormalizedFlight {
  id: string;
  offerId: string;
  airlineName: string;
  airlineCode: string;
  airlineLogoUrl?: string;
  flightNumber: string;
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  aircraft: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  currency: string;
  baseNetFare: number;
  airportTaxes: number;
  totalAtCost: number;
  retailOtaComparison: number;
  memberInstantSavings: number;
  baggageAllowance: string;
  rawOffer: any;
}

export class DuffelProvider {
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
   * Health ping to Duffel API
   */
  async checkStatus(): Promise<{ success: boolean; status: string; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      if (!this.token) {
        return {
          success: false,
          status: 'CONFIG_MISSING',
          latencyMs: 0,
          error: 'Missing DUFFEL_ACCESS_TOKEN in environment',
        };
      }
      const res = await fetch(`${this.baseUrl}/air/aircraft?limit=1`, {
        headers: this.getHeaders(),
        cache: 'no-store',
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        return {
          success: false,
          status: `HTTP_${res.status}`,
          latencyMs,
          error: await res.text(),
        };
      }
      return {
        success: true,
        status: 'CONNECTED_200_OK',
        latencyMs,
      };
    } catch (err: any) {
      return {
        success: false,
        status: 'NETWORK_ERROR',
        latencyMs: Date.now() - start,
        error: err?.message,
      };
    }
  }

  /**
   * Search real-time flight offers via Duffel NDC/GDS aggregator
   */
  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
    adults?: number;
  }): Promise<DuffelNormalizedFlight[]> {
    if (!this.token) {
      console.warn('[DuffelProvider] No access token configured');
      return [];
    }

    const cabin = params.cabinClass || 'business';
    const passengers = Array.from({ length: params.adults || 1 }, () => ({ type: 'adult' }));

    const body = {
      data: {
        slices: [
          {
            origin: params.origin.toUpperCase(),
            destination: params.destination.toUpperCase(),
            departure_date: params.departureDate,
          },
        ],
        passengers,
        cabin_class: cabin,
      },
    };

    try {
      const res = await fetch(`${this.baseUrl}/air/offer_requests?return_offers=true`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[DuffelProvider] Search failed HTTP ${res.status}:`, errorText);
        return [];
      }

      const json = await res.json();
      const offers = json.data?.offers || [];
      const normalized: DuffelNormalizedFlight[] = [];

      for (const offer of offers.slice(0, 15)) {
        const slice = offer.slices?.[0];
        const seg = slice?.segments?.[0];
        const lastSeg = slice?.segments?.[slice.segments.length - 1];
        if (!slice || !seg) continue;

        const baseAmount = parseFloat(offer.base_amount || '0');
        const taxAmount = parseFloat(offer.tax_amount || '0');
        const totalAmount = parseFloat(offer.total_amount || '0');
        const currency = offer.total_currency || 'USD';

        // 0% Risk cost-clearing calculation
        const clearing = calculateFlightClearingSummary(baseAmount, taxAmount, 'card_pass_through');

        // Parse duration (e.g. PT8H15M -> 8h 15m)
        const rawDur = slice.duration || '';
        const durMatch = rawDur.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
        const durationFormatted = durMatch
          ? `${durMatch[1] ? durMatch[1] + 'h ' : ''}${durMatch[2] ? durMatch[2] + 'm' : ''}`.trim() || 'Direct'
          : 'Direct';

        // Stops calculation
        const stopsCount = Math.max(0, (slice.segments?.length || 1) - 1);
        const stopsFormatted = stopsCount === 0 ? 'Non-stop' : `${stopsCount} Stop${stopsCount > 1 ? 's' : ''}`;

        // Cabin formatting
        let mappedCabin: 'Economy' | 'Premium Economy' | 'Business' | 'First' = 'Business';
        if (cabin === 'economy') mappedCabin = 'Economy';
        else if (cabin === 'premium_economy') mappedCabin = 'Premium Economy';
        else if (cabin === 'first') mappedCabin = 'First';

        normalized.push({
          id: offer.id,
          offerId: offer.id,
          airlineName: offer.owner?.name || seg.marketing_carrier?.name || 'Partner Airline',
          airlineCode: offer.owner?.iata_code || seg.marketing_carrier?.iata_code || 'PA',
          airlineLogoUrl: offer.owner?.logo_symbol_url,
          flightNumber: `${seg.marketing_carrier?.iata_code || ''} ${seg.marketing_carrier_flight_number || ''}`.trim(),
          departureAirport: seg.origin?.iata_code || params.origin,
          departureCity: seg.origin?.city_name || seg.origin?.name || params.origin,
          departureTime: seg.departing_at ? seg.departing_at.substring(11, 16) : '00:00',
          arrivalAirport: lastSeg?.destination?.iata_code || params.destination,
          arrivalCity: lastSeg?.destination?.city_name || lastSeg?.destination?.name || params.destination,
          arrivalTime: lastSeg?.arriving_at ? lastSeg.arriving_at.substring(11, 16) : '00:00',
          duration: durationFormatted,
          stops: stopsFormatted,
          aircraft: seg.aircraft?.name || 'Commercial Jet',
          cabinClass: mappedCabin,
          currency,
          baseNetFare: Math.round(baseAmount),
          airportTaxes: Math.round(taxAmount),
          totalAtCost: Math.round(clearing.totalAmountCharged),
          retailOtaComparison: Math.round(clearing.retailOtaComparison),
          memberInstantSavings: Math.round(clearing.memberInstantSavings),
          baggageAllowance: 'Included (Carrier Standard)',
          rawOffer: offer,
        });
      }

      return normalized;
    } catch (err) {
      console.error('[DuffelProvider] Search caught error:', err);
      return [];
    }
  }
}

export const duffelProvider = new DuffelProvider();
