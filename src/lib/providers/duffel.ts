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

  /**
   * Get single flight offer details with passenger slots and available services
   */
  async getOffer(offerId: string): Promise<any | null> {
    if (!this.token) return null;
    try {
      const res = await fetch(`${this.baseUrl}/air/offers/${offerId}?return_available_services=true`, {
        headers: this.getHeaders(),
        cache: 'no-store',
      });
      if (!res.ok) {
        console.error(`[DuffelProvider] Get offer failed HTTP ${res.status}:`, await res.text());
        return null;
      }
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[DuffelProvider] Get offer error:', err);
      return null;
    }
  }

  /**
   * Fetch aircraft seat maps for an offer
   */
  async getSeatMaps(offerId: string): Promise<any[]> {
    if (!this.token) return [];
    try {
      const res = await fetch(`${this.baseUrl}/air/seat_maps?offer_id=${offerId}`, {
        headers: this.getHeaders(),
        cache: 'no-store',
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.error('[DuffelProvider] Seat maps error:', err);
      return [];
    }
  }

  /**
   * Create an official airline order (Ticketing & PNR Generation)
   */
  async createOrder(params: {
    offerId: string;
    passengers: Array<{
      id?: string;
      title: 'mr' | 'ms' | 'mrs' | 'miss';
      gender: 'm' | 'f';
      given_name: string;
      family_name: string;
      born_on: string;
      email: string;
      phone_number: string;
    }>;
    payment?: {
      type: 'balance' | 'card';
      amount?: string;
      currency?: string;
    };
  }): Promise<{
    success: boolean;
    orderId?: string;
    bookingReference?: string;
    order?: any;
    error?: string;
  }> {
    if (!this.token) {
      return { success: false, error: 'Duffel API token is missing' };
    }

    try {
      // 1. Fetch offer to obtain passenger IDs and exact total amount if not specified
      const offer = await this.getOffer(params.offerId);
      if (!offer) {
        return { success: false, error: 'Flight offer expired or not found. Please refresh search.' };
      }

      const offerPassengers = offer.passengers || [];
      const mappedPassengers = params.passengers.map((p, idx) => {
        const matchingId = p.id || offerPassengers[idx]?.id;
        return {
          id: matchingId,
          title: p.title || 'mr',
          gender: p.gender || 'm',
          given_name: p.given_name,
          family_name: p.family_name,
          born_on: p.born_on,
          email: p.email,
          phone_number: p.phone_number,
        };
      });

      // 2. Format payment
      const paymentType = params.payment?.type || 'balance';
      const amount = params.payment?.amount || offer.total_amount;
      const currency = params.payment?.currency || offer.total_currency;

      const body = {
        data: {
          selected_offers: [params.offerId],
          passengers: mappedPassengers,
          payments: [
            {
              type: paymentType,
              amount,
              currency,
            },
          ],
        },
      };

      const res = await fetch(`${this.baseUrl}/air/orders`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      const json = await res.json();
      if (!res.ok) {
        const errorMsg = json.errors?.[0]?.message || `Booking failed with HTTP ${res.status}`;
        console.error('[DuffelProvider] Create order error:', json);
        return { success: false, error: errorMsg };
      }

      const order = json.data;
      return {
        success: true,
        orderId: order.id,
        bookingReference: order.booking_reference,
        order,
      };
    } catch (err: any) {
      console.error('[DuffelProvider] Create order exception:', err);
      return { success: false, error: err?.message || 'Unexpected ticketing failure' };
    }
  }

  /**
   * Retrieve existing Duffel order by ID
   */
  async getOrder(orderId: string): Promise<any | null> {
    if (!this.token) return null;
    try {
      const res = await fetch(`${this.baseUrl}/air/orders/${orderId}`, {
        headers: this.getHeaders(),
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[DuffelProvider] Get order error:', err);
      return null;
    }
  }

  /**
   * Cancel an order (Quote + Confirm)
   */
  async cancelOrder(orderId: string): Promise<{ success: boolean; refundAmount?: string; error?: string }> {
    if (!this.token) return { success: false, error: 'Token missing' };
    try {
      // 1. Create pending cancellation quote
      const quoteRes = await fetch(`${this.baseUrl}/air/order_cancellations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ data: { order_id: orderId } }),
      });
      const quoteJson = await quoteRes.json();
      if (!quoteRes.ok) {
        return { success: false, error: quoteJson.errors?.[0]?.message || 'Cancellation quote failed' };
      }

      const cancellationId = quoteJson.data.id;
      const refundAmount = quoteJson.data.refund_amount;

      // 2. Confirm cancellation
      const confirmRes = await fetch(`${this.baseUrl}/air/order_cancellations/${cancellationId}/actions/confirm`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
      if (!confirmRes.ok) {
        const confirmJson = await confirmRes.json();
        return { success: false, error: confirmJson.errors?.[0]?.message || 'Confirm cancellation failed' };
      }

      return { success: true, refundAmount };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }
}

export const duffelProvider = new DuffelProvider();
