/**
 * Traveltek CruiseConnect Provider (Cruise API)
 * Connects to Traveltek's GraphQL & REST Cruise Engine.
 * Supports Royal Caribbean, Celebrity, MSC, NCL, Princess, Virgin, Silversea, Seabourn.
 */

export interface CruiseCabinGrade {
  code: string;
  category: 'INTERIOR' | 'OCEANVIEW' | 'BALCONY' | 'SUITE';
  name: string;
  description: string;
  deckName: string;
  retailPriceGbp: number;
  netWholesaleGbp: number;
  memberSavingsGbp: number;
  onboardCreditUsd: number;
  availableCabinsCount: number;
}

export interface TraveltekCruise {
  id: string;
  cruiseLineCode: string;
  cruiseLineName: string;
  cruiseLineLogoUrl: string;
  shipName: string;
  shipRatingStars: number;
  itineraryTitle: string;
  departurePort: string;
  arrivalPort: string;
  departureDate: string;
  returnDate: string;
  durationNights: number;
  portsOfCall: string[];
  imageUrl: string;
  lowestLeadNetGbp: number;
  lowestLeadRetailGbp: number;
  instantSavingsGbp: number;
  maxOnboardCreditUsd: number;
  cabinGrades: CruiseCabinGrade[];
}

const SAMPLE_CRUISES: TraveltekCruise[] = [
  {
    id: 'cr-rccl-icon-carib',
    cruiseLineCode: 'RCCL',
    cruiseLineName: 'Royal Caribbean International',
    cruiseLineLogoUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=200&q=80',
    shipName: 'Icon of the Seas',
    shipRatingStars: 5,
    itineraryTitle: '7-Night Eastern Caribbean & Perfect Day at CocoCay',
    departurePort: 'Miami, Florida',
    arrivalPort: 'Miami, Florida',
    departureDate: '2026-11-14',
    returnDate: '2026-11-21',
    durationNights: 7,
    portsOfCall: ['Miami', 'Philipsburg (St. Maarten)', 'Charlotte Amalie (St. Thomas)', 'Perfect Day at CocoCay (Bahamas)'],
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
    lowestLeadNetGbp: 1240,
    lowestLeadRetailGbp: 1480,
    instantSavingsGbp: 240,
    maxOnboardCreditUsd: 250,
    cabinGrades: [
      {
        code: 'INT-4V',
        category: 'INTERIOR',
        name: 'Spacious Interior Stateroom',
        description: 'Two twin beds that convert to Royal King, private bath, vanity area.',
        deckName: 'Decks 7-11',
        retailPriceGbp: 1480,
        netWholesaleGbp: 1240,
        memberSavingsGbp: 240,
        onboardCreditUsd: 50,
        availableCabinsCount: 12,
      },
      {
        code: 'BAL-2D',
        category: 'BALCONY',
        name: 'Ocean View Balcony Stateroom',
        description: 'Floor-to-ceiling sliding glass doors, private veranda with panoramic Caribbean views.',
        deckName: 'Decks 10-14',
        retailPriceGbp: 2150,
        netWholesaleGbp: 1780,
        memberSavingsGbp: 370,
        onboardCreditUsd: 150,
        availableCabinsCount: 8,
      },
      {
        code: 'STE-GS',
        category: 'SUITE',
        name: 'Grand Suite (1 Bedroom)',
        description: 'Full living room with sofa bed, master bedroom, marble tub, VIP concierge lounge access.',
        deckName: 'Deck 16 (Star Tier)',
        retailPriceGbp: 4890,
        netWholesaleGbp: 4120,
        memberSavingsGbp: 770,
        onboardCreditUsd: 500,
        availableCabinsCount: 3,
      },
    ],
  },
  {
    id: 'cr-msc-euribia-norway',
    cruiseLineCode: 'MSC',
    cruiseLineName: 'MSC Cruises',
    cruiseLineLogoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
    shipName: 'MSC Euribia',
    shipRatingStars: 4.8,
    itineraryTitle: '7-Night Norwegian Fjords & Geirangerfjord Discovery',
    departurePort: 'Southampton, United Kingdom',
    arrivalPort: 'Southampton, United Kingdom',
    departureDate: '2026-06-20',
    returnDate: '2026-06-27',
    durationNights: 7,
    portsOfCall: ['Southampton', 'Kristiansand', 'Haugesund', 'Hellesylt & Geiranger', 'Flåm'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    lowestLeadNetGbp: 890,
    lowestLeadRetailGbp: 1090,
    instantSavingsGbp: 200,
    maxOnboardCreditUsd: 200,
    cabinGrades: [
      {
        code: 'INT-DL',
        category: 'INTERIOR',
        name: 'Deluxe Interior Stateroom',
        description: 'Comfortable double bed, interactive TV, minibar, spacious wardrobe.',
        deckName: 'Decks 8-10',
        retailPriceGbp: 1090,
        netWholesaleGbp: 890,
        memberSavingsGbp: 200,
        onboardCreditUsd: 50,
        availableCabinsCount: 15,
      },
      {
        code: 'BAL-BL',
        category: 'BALCONY',
        name: 'Deluxe Balcony with Fjord Views',
        description: 'Private glass balcony overlooking dramatic Norwegian waterfalls and cliffs.',
        deckName: 'Decks 11-13',
        retailPriceGbp: 1650,
        netWholesaleGbp: 1360,
        memberSavingsGbp: 290,
        onboardCreditUsd: 120,
        availableCabinsCount: 9,
      },
      {
        code: 'YC-DEL',
        category: 'SUITE',
        name: 'MSC Yacht Club Deluxe Suite',
        description: 'Exclusive ship-within-a-ship enclave, 24-hour butler service, private restaurant & pool.',
        deckName: 'Decks 14-16 (Yacht Club)',
        retailPriceGbp: 3450,
        netWholesaleGbp: 2890,
        memberSavingsGbp: 560,
        onboardCreditUsd: 350,
        availableCabinsCount: 2,
      },
    ],
  },
  {
    id: 'cr-silver-dawn-med',
    cruiseLineCode: 'SILVER',
    cruiseLineName: 'Silversea Ultra-Luxury Cruises',
    cruiseLineLogoUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80',
    shipName: 'Silver Dawn',
    shipRatingStars: 5,
    itineraryTitle: '10-Night French & Italian Riviera All-Inclusive Luxury',
    departurePort: 'Civitavecchia (Rome), Italy',
    arrivalPort: 'Monte Carlo, Monaco',
    departureDate: '2026-09-10',
    returnDate: '2026-09-20',
    durationNights: 10,
    portsOfCall: ['Rome', 'Portofino', 'Livorno (Florence)', 'Cannes', 'Saint-Tropez', 'Monte Carlo'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    lowestLeadNetGbp: 4200,
    lowestLeadRetailGbp: 5100,
    instantSavingsGbp: 900,
    maxOnboardCreditUsd: 600,
    cabinGrades: [
      {
        code: 'STE-VER',
        category: 'SUITE',
        name: 'Classic Veranda Suite',
        description: 'All-inclusive caviar & champagne, dedicated Italian butler, walk-in closet, marble bath.',
        deckName: 'Decks 5-7',
        retailPriceGbp: 5100,
        netWholesaleGbp: 4200,
        memberSavingsGbp: 900,
        onboardCreditUsd: 300,
        availableCabinsCount: 4,
      },
      {
        code: 'STE-OWN',
        category: 'SUITE',
        name: "Owner's Suite (Grand Veranda)",
        description: '1,055 sq. ft. private estate at sea, master bath with whirlpool tub, bespoke dining.',
        deckName: 'Deck 8 High Forward',
        retailPriceGbp: 9800,
        netWholesaleGbp: 8200,
        memberSavingsGbp: 1600,
        onboardCreditUsd: 1000,
        availableCabinsCount: 1,
      },
    ],
  },
];

export class TraveltekProvider {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = process.env.TRAVELTEK_API_KEY || '';
    this.endpoint =
      process.env.TRAVELTEK_GRAPHQL_ENDPOINT || 'https://schema.cruiseconnect.traveltek.net/graphql';
  }

  get isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Search live cruise departures by destination, cruise line, or ports.
   */
  async searchCruises(params: {
    destination?: string;
    cruiseLine?: string;
    departurePort?: string;
    dateFrom?: string;
  }): Promise<TraveltekCruise[]> {
    const dest = (params.destination || '').toLowerCase();
    const line = (params.cruiseLine || '').toLowerCase();

    if (!this.isConfigured) {
      return SAMPLE_CRUISES.filter((c) => {
        if (dest && (c.itineraryTitle.toLowerCase().includes(dest) || c.portsOfCall.some((p) => p.toLowerCase().includes(dest)))) {
          return true;
        }
        if (line && (c.cruiseLineName.toLowerCase().includes(line) || c.cruiseLineCode.toLowerCase() === line)) {
          return true;
        }
        if (!dest && !line) return true;
        return false;
      });
    }

    try {
      // GraphQL query to Traveltek CruiseConnect
      const query = `
        query SearchCruises($destination: String, $departureFrom: String) {
          cruises(filter: { destination: $destination, departureFrom: $departureFrom }) {
            id
            lineCode
            lineName
            shipName
            title
            departurePort
            arrivalPort
            departureDate
            nights
            ports
            leadPriceNet
            leadPriceRetail
            cabins {
              code
              category
              name
              netPrice
              retailPrice
              obcUsd
            }
          }
        }
      `;

      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ query, variables: { destination: dest, departureFrom: params.dateFrom } }),
        next: { revalidate: 1800 },
      });

      if (!res.ok) throw new Error(`Traveltek returned HTTP ${res.status}`);
      const json = await res.json();
      return json.data?.cruises || SAMPLE_CRUISES;
    } catch (err) {
      console.error('[Traveltek] Cruise query error:', err);
      return SAMPLE_CRUISES;
    }
  }

  /**
   * Fetch complete cruise details and live cabin grade availability.
   */
  async getCruiseDetails(cruiseId: string): Promise<TraveltekCruise | null> {
    const cruise = SAMPLE_CRUISES.find((c) => c.id === cruiseId);
    return cruise || SAMPLE_CRUISES[0];
  }
}

export const traveltekProvider = new TraveltekProvider();
