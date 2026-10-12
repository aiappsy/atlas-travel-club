/**
 * Comprehensive global airport city and IATA code resolver.
 * Maps city names, common spellings, and IATA codes to canonical IATA 3-letter codes.
 */

export interface AirportInfo {
  iata: string;
  name: string;
  city: string;
  country: string;
}

export const POPULAR_AIRPORTS: Record<string, AirportInfo> = {
  // Scandinavia & Nordics
  OSL: { iata: 'OSL', name: 'Oslo Gardermoen Airport', city: 'Oslo', country: 'Norway' },
  BGO: { iata: 'BGO', name: 'Bergen Airport Flesland', city: 'Bergen', country: 'Norway' },
  TRD: { iata: 'TRD', name: 'Trondheim Airport', city: 'Trondheim', country: 'Norway' },
  SVG: { iata: 'SVG', name: 'Stavanger Airport Sola', city: 'Stavanger', country: 'Norway' },
  TOS: { iata: 'TOS', name: 'Tromsø Airport', city: 'Tromsø', country: 'Norway' },
  ARN: { iata: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden' },
  GOT: { iata: 'GOT', name: 'Göteborg Landvetter Airport', city: 'Gothenburg', country: 'Sweden' },
  CPH: { iata: 'CPH', name: 'Copenhagen Airport Kastrup', city: 'Copenhagen', country: 'Denmark' },
  HEL: { iata: 'HEL', name: 'Helsinki-Vantaa Airport', city: 'Helsinki', country: 'Finland' },
  KEF: { iata: 'KEF', name: 'Keflavík International Airport', city: 'Reykjavik', country: 'Iceland' },

  // Asia & Southeast Asia
  BKK: { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  DMK: { iata: 'DMK', name: 'Don Mueang International', city: 'Bangkok', country: 'Thailand' },
  HKT: { iata: 'HKT', name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand' },
  CNX: { iata: 'CNX', name: 'Chiang Mai International', city: 'Chiang Mai', country: 'Thailand' },
  SIN: { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  KUL: { iata: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  DPS: { iata: 'DPS', name: 'Ngurah Rai (Bali) Airport', city: 'Bali / Denpasar', country: 'Indonesia' },
  CGK: { iata: 'CGK', name: 'Soekarno-Hatta International', city: 'Jakarta', country: 'Indonesia' },
  MNL: { iata: 'MNL', name: 'Ninoy Aquino International', city: 'Manila', country: 'Philippines' },
  CEB: { iata: 'CEB', name: 'Mactan-Cebu International', city: 'Cebu', country: 'Philippines' },
  SGN: { iata: 'SGN', name: 'Tan Son Nhat International', city: 'Ho Chi Minh City', country: 'Vietnam' },
  HAN: { iata: 'HAN', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam' },
  HKG: { iata: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  HND: { iata: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
  NRT: { iata: 'NRT', name: 'Tokyo Narita Airport', city: 'Tokyo', country: 'Japan' },
  KIX: { iata: 'KIX', name: 'Kansai International Airport', city: 'Osaka', country: 'Japan' },
  ICN: { iata: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  TPE: { iata: 'TPE', name: 'Taiwan Taoyuan International', city: 'Taipei', country: 'Taiwan' },
  PEK: { iata: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China' },
  PVG: { iata: 'PVG', name: 'Shanghai Pudong International', city: 'Shanghai', country: 'China' },

  // Middle East
  DXB: { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  AUH: { iata: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  DOH: { iata: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
  IST: { iata: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  SAW: { iata: 'SAW', name: 'Sabiha Gökçen International', city: 'Istanbul', country: 'Turkey' },
  TLV: { iata: 'TLV', name: 'Ben Gurion Airport', city: 'Tel Aviv', country: 'Israel' },
  RUH: { iata: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia' },

  // Europe
  LHR: { iata: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },
  LGW: { iata: 'LGW', name: 'London Gatwick Airport', city: 'London', country: 'United Kingdom' },
  STN: { iata: 'STN', name: 'London Stansted Airport', city: 'London', country: 'United Kingdom' },
  MAN: { iata: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom' },
  EDI: { iata: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom' },
  CDG: { iata: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France' },
  ORY: { iata: 'ORY', name: 'Paris Orly Airport', city: 'Paris', country: 'France' },
  AMS: { iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  FRA: { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  MUC: { iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  BER: { iata: 'BER', name: 'Berlin Brandenburg Airport', city: 'Berlin', country: 'Germany' },
  ZRH: { iata: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  GVA: { iata: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland' },
  VIE: { iata: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
  BCN: { iata: 'BCN', name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain' },
  MAD: { iata: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'Spain' },
  AGP: { iata: 'AGP', name: 'Málaga-Costa del Sol Airport', city: 'Malaga', country: 'Spain' },
  PMI: { iata: 'PMI', name: 'Palma de Mallorca Airport', city: 'Mallorca', country: 'Spain' },
  FCO: { iata: 'FCO', name: 'Rome Fiumicino Airport', city: 'Rome', country: 'Italy' },
  MXP: { iata: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy' },
  LIN: { iata: 'LIN', name: 'Milan Linate Airport', city: 'Milan', country: 'Italy' },
  ATH: { iata: 'ATH', name: 'Athens International Airport', city: 'Athens', country: 'Greece' },
  LIS: { iata: 'LIS', name: 'Humberto Delgado Airport', city: 'Lisbon', country: 'Portugal' },
  OPO: { iata: 'OPO', name: 'Francisco Sá Carneiro Airport', city: 'Porto', country: 'Portugal' },
  DUB: { iata: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland' },
  WAW: { iata: 'WAW', name: 'Warsaw Chopin Airport', city: 'Warsaw', country: 'Poland' },
  PRG: { iata: 'PRG', name: 'Václav Havel Airport Prague', city: 'Prague', country: 'Czech Republic' },
  BUD: { iata: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary' },

  // Americas
  JFK: { iata: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States' },
  EWR: { iata: 'EWR', name: 'Newark Liberty International', city: 'New York / Newark', country: 'United States' },
  LGA: { iata: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States' },
  LAX: { iata: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
  SFO: { iata: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States' },
  ORD: { iata: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
  MIA: { iata: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
  MCO: { iata: 'MCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States' },
  LAS: { iata: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'United States' },
  SEA: { iata: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'United States' },
  BOS: { iata: 'BOS', name: 'Boston Logan International', city: 'Boston', country: 'United States' },
  IAD: { iata: 'IAD', name: 'Washington Dulles International', city: 'Washington D.C.', country: 'United States' },
  ATL: { iata: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'United States' },
  DFW: { iata: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'United States' },
  DEN: { iata: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
  YYZ: { iata: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada' },
  YVR: { iata: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  MEX: { iata: 'MEX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico' },
  CUN: { iata: 'CUN', name: 'Cancún International Airport', city: 'Cancun', country: 'Mexico' },
  GRU: { iata: 'GRU', name: 'São Paulo/Guarulhos', city: 'Sao Paulo', country: 'Brazil' },
  GIG: { iata: 'GIG', name: 'Rio de Janeiro/Galeão', city: 'Rio de Janeiro', country: 'Brazil' },
  EZE: { iata: 'EZE', name: 'Ministro Pistarini (Ezeiza)', city: 'Buenos Aires', country: 'Argentina' },
  BOG: { iata: 'BOG', name: 'El Dorado International', city: 'Bogota', country: 'Colombia' },

  // Australia & Oceania
  SYD: { iata: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  MEL: { iata: 'MEL', name: 'Melbourne Airport (Tullamarine)', city: 'Melbourne', country: 'Australia' },
  BNE: { iata: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia' },
  PER: { iata: 'PER', name: 'Perth Airport', city: 'Perth', country: 'Australia' },
  AKL: { iata: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },

  // Africa
  JNB: { iata: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  CPT: { iata: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  CAI: { iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
  NBO: { iata: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi', country: 'Kenya' },
  RAK: { iata: 'RAK', name: 'Marrakesh Menara Airport', city: 'Marrakech', country: 'Morocco' },
};

// Aliases mapping common city names, alternate spellings, or lowercase words to canonical IATA codes
const CITY_ALIASES: Record<string, string> = {
  // Oslo & Norway
  'oslo': 'OSL',
  'gardermoen': 'OSL',
  'norway': 'OSL',
  'norge': 'OSL',
  'bergen': 'BGO',
  'trondheim': 'TRD',
  'stavanger': 'SVG',
  'tromso': 'TOS',
  'tromsø': 'TOS',

  // Bangkok & Thailand
  'bangkok': 'BKK',
  'bkk': 'BKK',
  'thailand': 'BKK',
  'suvarnabhumi': 'BKK',
  'phuket': 'HKT',
  'chiang mai': 'CNX',

  // Major global cities
  'london': 'LHR',
  'heathrow': 'LHR',
  'gatwick': 'LGW',
  'stansted': 'STN',
  'paris': 'CDG',
  'charles de gaulle': 'CDG',
  'new york': 'JFK',
  'nyc': 'JFK',
  'jfk': 'JFK',
  'manhattan': 'JFK',
  'newark': 'EWR',
  'los angeles': 'LAX',
  'la': 'LAX',
  'singapore': 'SIN',
  'changi': 'SIN',
  'dubai': 'DXB',
  'doha': 'DOH',
  'qatar': 'DOH',
  'tokyo': 'HND',
  'haneda': 'HND',
  'narita': 'NRT',
  'sydney': 'SYD',
  'melbourne': 'MEL',
  'amsterdam': 'AMS',
  'schiphol': 'AMS',
  'frankfurt': 'FRA',
  'munich': 'MUC',
  'berlin': 'BER',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'rome': 'FCO',
  'milan': 'MXP',
  'copenhagen': 'CPH',
  'kobenhavn': 'CPH',
  'københavn': 'CPH',
  'stockholm': 'ARN',
  'helsinki': 'HEL',
  'zurich': 'ZRH',
  'geneva': 'GVA',
  'vienna': 'VIE',
  'lisbon': 'LIS',
  'dublin': 'DUB',
  'istanbul': 'IST',
  'hong kong': 'HKG',
  'seoul': 'ICN',
  'incheon': 'ICN',
  'bali': 'DPS',
  'denpasar': 'DPS',
  'jakarta': 'CGK',
  'manila': 'MNL',
  'kuala lumpur': 'KUL',
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'miami': 'MIA',
  'orlando': 'MCO',
  'cancun': 'CUN',
  'cancún': 'CUN',
};

/**
 * Resolves any user input (city name, airport name, or IATA code) to a valid 3-letter IATA code.
 */
export function resolveAirportIata(input: string, fallback: string = 'LHR'): string {
  if (!input) return fallback;
  const clean = input.trim().toLowerCase();

  // 1. Direct match with alias dictionary
  if (CITY_ALIASES[clean]) {
    return CITY_ALIASES[clean];
  }

  // 2. Direct match with uppercase IATA
  const upper = clean.toUpperCase();
  if (POPULAR_AIRPORTS[upper]) {
    return upper;
  }

  // 3. Search by city name substring
  for (const [iata, info] of Object.entries(POPULAR_AIRPORTS)) {
    if (
      info.city.toLowerCase().includes(clean) ||
      clean.includes(info.city.toLowerCase()) ||
      info.name.toLowerCase().includes(clean)
    ) {
      return iata;
    }
  }

  // 4. If exactly 3 letters, assume it's an IATA code
  if (/^[A-Za-z]{3}$/.test(clean)) {
    return clean.toUpperCase();
  }

  return fallback;
}
