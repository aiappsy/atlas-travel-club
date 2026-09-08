import {
  Hotel,
  PerkDeal,
  TierPlan,
  CruiseItinerary,
  AirportLounge,
  PhysicalCardOrder,
  EsimPackage,
  ProviderInstructionGuide,
  PlatformFeatureFlags,
  VisaCardAccount,
  FlightClaimRecord,
  TravelInsurancePlan,
  PrivateJetEmptyLeg,
  TripGapAlert,
  PriceDropRebookRecord,
  LuxuryYachtCharter,
  SupercarRental,
  FastTrackAirportService,
  StatusMatchProgram,
  LuxuryVillaEstate,
  TravelVaultAccount,
  NomadVisaProgram,
  NomadColivingSpace,
  SavingsProofAudit,
  LiveReceipt
} from './types';

export const MOCK_PROOF_AUDITS: SavingsProofAudit[] = [
  {
    id: 'proof-bellagio-vegas',
    hotelName: 'The Grand Bellagio & Casino Resort',
    city: 'Las Vegas, NV',
    country: 'United States',
    starRating: 5,
    dates: 'Sep 15 – Sep 18 (3 Nights)',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Deluxe Fountain View King Suite',
    publicProvider: 'Expedia',
    publicRetailPricePerNight: 389,
    publicTotalRetailPrice: 1167,
    retailMarketingMarkup: 573,
    hotelsClubWholesalePerNight: 198,
    hotelsClubTotalPaid: 594,
    instantCashSaved: 573,
    savingsPercentage: 49,
    additionalCardBonuses: {
      priceDropProtection: 168,
      travelVaultDividends: 48.50,
      visaCashback: 23.76
    },
    totalNetValueDelivered: 813.26,
    lastAuditedTimestamp: 'Today at 07:15 UTC (Real-time Bedbank Sync)',
    auditHash: '0x88f2a91...bedbank_par_ok'
  },
  {
    id: 'proof-plaza-nyc',
    hotelName: 'The Plaza Fifth Avenue',
    city: 'New York, NY',
    country: 'United States',
    starRating: 5,
    dates: 'Oct 10 – Oct 14 (4 Nights)',
    nights: 4,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Edwardian Fifth Avenue Park Suite',
    publicProvider: 'Booking.com',
    publicRetailPricePerNight: 740,
    publicTotalRetailPrice: 2960,
    retailMarketingMarkup: 1480,
    hotelsClubWholesalePerNight: 370,
    hotelsClubTotalPaid: 1480,
    instantCashSaved: 1480,
    savingsPercentage: 50,
    additionalCardBonuses: {
      priceDropProtection: 210,
      travelVaultDividends: 118.40,
      visaCashback: 59.20
    },
    totalNetValueDelivered: 1867.60,
    lastAuditedTimestamp: 'Today at 06:42 UTC (Real-time Bedbank Sync)',
    auditHash: '0x33b1e70...hotelbeds_ver_ok'
  },
  {
    id: 'proof-ritz-paris',
    hotelName: 'Ritz Paris (Place Vendôme)',
    city: 'Paris',
    country: 'France',
    starRating: 5,
    dates: 'Nov 02 – Nov 05 (3 Nights)',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Prestige Deluxe Junior Suite',
    publicProvider: 'Hotels.com',
    publicRetailPricePerNight: 1650,
    publicTotalRetailPrice: 4950,
    retailMarketingMarkup: 2250,
    hotelsClubWholesalePerNight: 900,
    hotelsClubTotalPaid: 2700,
    instantCashSaved: 2250,
    savingsPercentage: 45,
    additionalCardBonuses: {
      priceDropProtection: 340,
      travelVaultDividends: 216.00,
      visaCashback: 108.00
    },
    totalNetValueDelivered: 2914.00,
    lastAuditedTimestamp: 'Today at 05:30 UTC (Real-time Bedbank Sync)',
    auditHash: '0x99a4c12...webbeds_xml_pass'
  },
  {
    id: 'proof-villa-stbarts',
    hotelName: 'Villa L’Étoile & Private Beach Estate',
    city: 'St. Barts',
    country: 'Caribbean',
    starRating: 5,
    dates: 'Dec 18 – Dec 25 (7 Nights)',
    nights: 7,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    roomType: '6-Bedroom Oceanfront Villa with Chef & Butler',
    publicProvider: 'Airbnb',
    publicRetailPricePerNight: 5800,
    publicTotalRetailPrice: 40600,
    retailMarketingMarkup: 18200,
    hotelsClubWholesalePerNight: 3200,
    hotelsClubTotalPaid: 22400,
    instantCashSaved: 18200,
    savingsPercentage: 45,
    additionalCardBonuses: {
      priceDropProtection: 750,
      travelVaultDividends: 1792.00,
      visaCashback: 896.00
    },
    totalNetValueDelivered: 21638.00,
    lastAuditedTimestamp: 'Today at 04:12 UTC (B2B Estate Feed)',
    auditHash: '0x77c9d44...lecoll_estate_ok'
  }
];

export const MOCK_LIVE_RECEIPTS: LiveReceipt[] = [
  {
    id: 'rec-991',
    memberNameMasked: 'Marcus V.',
    memberTier: 'gold',
    itemBooked: 'The Plaza Fifth Avenue (4 Nights)',
    destination: 'New York, NY',
    retailPrice: 2960,
    wholesalePaid: 1480,
    amountSaved: 1480,
    cashbackDepositedToVisa: 59.20,
    timestampAgo: '2 minutes ago'
  },
  {
    id: 'rec-992',
    memberNameMasked: 'Elena R.',
    memberTier: 'nomad',
    itemBooked: 'Outsite Coliving Lisbon (30 Nights)',
    destination: 'Lisbon, Portugal',
    retailPrice: 2100,
    wholesalePaid: 1150,
    amountSaved: 950,
    cashbackDepositedToVisa: 46.00,
    timestampAgo: '5 minutes ago'
  },
  {
    id: 'rec-993',
    memberNameMasked: 'Alexander H.',
    memberTier: 'platinum',
    itemBooked: 'The Grand Bellagio (3 Nights)',
    destination: 'Las Vegas, NV',
    retailPrice: 1167,
    wholesalePaid: 594,
    amountSaved: 573,
    cashbackDepositedToVisa: 23.76,
    timestampAgo: '9 minutes ago'
  },
  {
    id: 'rec-994',
    memberNameMasked: 'Sophia C.',
    memberTier: 'gold',
    itemBooked: 'Bombardier Challenger 300 Private Jet Seat',
    destination: 'Miami ➔ New York',
    retailPrice: 3800,
    wholesalePaid: 1250,
    amountSaved: 2550,
    cashbackDepositedToVisa: 50.00,
    timestampAgo: '14 minutes ago'
  }
];

export const DEFAULT_PLATFORM_CONFIG: PlatformFeatureFlags = {
  enableHotels: true,
  enableCruises: true,
  enableLounges: true,
  enableEsim: true,
  enableFlightClaims: true,
  enableTravelInsurance: true,
  enablePrivateJets: true,
  enableAutoRebooker: true,
  enableYachtsAndSupercars: true,
  enableFastTrackImmigration: true,
  enableStatusMatch: true,
  enableLuxuryVillas: true,
  enableTravelVault: true,
  enableNomadHub: true,
  enablePhysicalIdCards: true,
  enableVisaPrepaidCards: true,
  enableAiConcierge: true,
  enableProactiveTripGaps: true,
  enableElevenLabsVoice: true,
  allowMemberDirectBooking: true,
  defaultCommissionPassThrough: 100,
  lastPublishedAt: '2026-08-26 07:00 UTC',
};

export const MOCK_NOMAD_VISAS: NomadVisaProgram[] = [
  {
    id: 'visa-spain-dvn',
    country: 'Spain',
    countryCode: 'ES',
    flagEmoji: '🇪🇸',
    visaName: 'Spain Digital Nomad Visa (Ley de Startups)',
    minMonthlyIncome: '€2,646 / month (~$2,850)',
    durationStay: '3 Years (Renewable up to 5 Years) ➔ Permanent Residency',
    taxRate: '24% Flat Tax (Beckham Law exemption on foreign income up to €600k)',
    processingTime: '20 Business Days via UGE Fast-Track',
    cost: 80,
    schengenStatus: 'Full Schengen Zone',
    keyRequirements: [
      'Proof of remote employment or remote freelancing contracts (minimum 3 months tenure)',
      'University degree or 3+ years verified professional experience',
      'Clean criminal record certificate (with Hague Apostille)',
      'Private Health Insurance with full Spain coverage ($0 copay)'
    ],
    popularHubs: ['Barcelona', 'Madrid', 'Valencia', 'Málaga', 'Las Palmas (Canary Islands)'],
    fastTrackFilingAvailable: true,
  },
  {
    id: 'visa-portugal-d8',
    country: 'Portugal',
    countryCode: 'PT',
    flagEmoji: '🇵🇹',
    visaName: 'Portugal D8 Digital Nomad Visa',
    minMonthlyIncome: '€3,280 / month (4x Portuguese Minimum Wage)',
    durationStay: '1 Year Temporary Stay OR 2-Year Renewable Residence Permit',
    taxRate: '20% Flat Rate under NHR 2.0 / Standard Tiered Rates',
    processingTime: '30 – 60 Days via AIMA',
    cost: 90,
    schengenStatus: 'Full Schengen Zone',
    keyRequirements: [
      'Remote work contract or active freelance client contracts',
      'Bank statements showing last 3 months average income above €3,280/mo',
      'Portuguese NIF tax number and proof of local accommodation (Lease or Coliving)',
      'Clean police record and international travel health insurance'
    ],
    popularHubs: ['Lisbon', 'Porto', 'Madeira Island (Nomad Village Ponta do Sol)', 'Ericeira', 'Lagos (Algarve)'],
    fastTrackFilingAvailable: true,
  },
  {
    id: 'visa-uae-dubai',
    country: 'United Arab Emirates (Dubai)',
    countryCode: 'AE',
    flagEmoji: '🇦🇪',
    visaName: 'Dubai Virtual Working Programme',
    minMonthlyIncome: '$3,500 / month',
    durationStay: '1 Year (Renewable indefinitely)',
    taxRate: '0% Personal Income Tax • 0% Capital Gains Tax',
    processingTime: '5 – 7 Business Days Instant E-Visa',
    cost: 287,
    schengenStatus: 'Middle East 0% Tax',
    keyRequirements: [
      'Proof of Employment with 1-year contract validity OR Proof of Company Ownership',
      'Last 3 months of bank statements showing regular salary deposits',
      'Valid health insurance with UAE coverage',
      'Passport valid for at least 6 months'
    ],
    popularHubs: ['Dubai Marina', 'Downtown Dubai', 'Jumeirah Lakes Towers (JLT)', 'DIFC'],
    fastTrackFilingAvailable: true,
  },
  {
    id: 'visa-thailand-dtv',
    country: 'Thailand',
    countryCode: 'TH',
    flagEmoji: '🇹🇭',
    visaName: 'Destination Thailand Visa (DTV)',
    minMonthlyIncome: '500,000 THB (~$14,000) Proof of Funds in Bank',
    durationStay: '5 Years Multiple Entry (180 Days per stay, extendable by 180 days)',
    taxRate: '0% Tax on foreign income not remitted in the same tax year',
    processingTime: '5 – 10 Business Days via Thai E-Visa Portal',
    cost: 300,
    schengenStatus: 'Asia-Pacific',
    keyRequirements: [
      'Employment contract, freelance portfolio, or professional digital nomad status',
      'Financial proof: Bank statement showing minimum 500,000 THB (~$14,000)',
      'Valid passport with at least 6 months validity',
      'Allows spouse and accompanying dependent children'
    ],
    popularHubs: ['Chiang Mai (Nimman)', 'Bangkok (Sukhumvit)', 'Koh Phangan', 'Phuket (Rawai)'],
    fastTrackFilingAvailable: true,
  },
  {
    id: 'visa-bali-indonesia',
    country: 'Indonesia (Bali)',
    countryCode: 'ID',
    flagEmoji: '🇮🇩',
    visaName: 'Indonesia E33G Remote Worker Visa',
    minMonthlyIncome: '$60,000 / year (~$5,000/mo) income or contract',
    durationStay: '1 Year (Renewable up to 2 Years)',
    taxRate: '0% Indonesian Income Tax (Exempt from local tax on foreign-sourced earnings)',
    processingTime: '5 – 8 Business Days Online E-Visa',
    cost: 350,
    schengenStatus: 'Asia-Pacific',
    keyRequirements: [
      'Proof of employment from an overseas company outside Indonesia',
      'Annual earnings proof of at least $60,000 USD',
      'Bank statement showing minimum $2,000 balance for living expenses',
      'Valid passport with at least 6 months validity'
    ],
    popularHubs: ['Canggu', 'Ubud', 'Pererenan', 'Uluwatu', 'Seminyak'],
    fastTrackFilingAvailable: true,
  },
  {
    id: 'visa-costarica-rentista',
    country: 'Costa Rica',
    countryCode: 'CR',
    flagEmoji: '🇨🇷',
    visaName: 'Costa Rica Estancia Remote Worker Visa',
    minMonthlyIncome: '$3,000 / month ($4,000 for family)',
    durationStay: '1 Year (Renewable for an additional year)',
    taxRate: '100% Tax Exemption (0% local tax on foreign income, import duty waiver on laptop/gear)',
    processingTime: '14 – 21 Business Days',
    cost: 250,
    schengenStatus: 'Americas / Caribbean',
    keyRequirements: [
      'Bank statements certified showing regular $3,000/mo incoming remote salary',
      'Medical insurance policy covering minimum $50,000 in Costa Rica',
      'Police background check and passport copy',
      'Driver’s license validation for immediate local driving'
    ],
    popularHubs: ['Santa Teresa', 'Nosara', 'Puerto Viejo', 'San José (Escazú)', 'Tamarindo'],
    fastTrackFilingAvailable: true,
  }
];

export const MOCK_NOMAD_COLIVINGS: NomadColivingSpace[] = [
  {
    id: 'coliving-lisbon-cais',
    name: 'Outsite Coliving Lisbon & Ocean Workspace',
    city: 'Lisbon (Cais do Sodré)',
    country: 'Portugal',
    monthlyPublicRate: 2100,
    monthlyMemberRate: 1150,
    savingsPercentage: 45,
    wifiSpeedMbps: 500,
    roomType: 'Private Studio En-Suite',
    amenities: ['Dedicated Ergonomic Coworking Desk', '500 Mbps Redundant Fiber Wi-Fi', 'Weekly Community Dinners & Wine Tastings', 'Private En-Suite Bathroom & AC', 'Rooftop Workspace overlooking Tagus River'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    communityEventsIncluded: true,
  },
  {
    id: 'coliving-bali-canggu',
    name: 'Dojo & Outpost Nomad Resort Canggu',
    city: 'Bali (Canggu Beach)',
    country: 'Indonesia',
    monthlyPublicRate: 1650,
    monthlyMemberRate: 890,
    savingsPercentage: 46,
    wifiSpeedMbps: 300,
    roomType: 'Coliving Master Suite',
    amenities: ['Poolside Fiber Coworking Desks', 'Soundproof Zoom Call Booths', 'Complimentary Daily Yoga & Ice Bath', 'Daily Scooter Rental Discount', 'Air Conditioned Master Suite with Tropical Garden'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    communityEventsIncluded: true,
  },
  {
    id: 'coliving-medellin-poblado',
    name: 'Selina Coworking & Rooftop Suites',
    city: 'Medellín (El Poblado)',
    country: 'Colombia',
    monthlyPublicRate: 1390,
    monthlyMemberRate: 740,
    savingsPercentage: 47,
    wifiSpeedMbps: 250,
    roomType: 'Private Studio En-Suite',
    amenities: ['24/7 Access Coworking Floor', 'Podcast Audio Recording Studio', 'Rooftop Bar with Salsa Nights', 'Private High-Floor Studio with Balcony View', 'Direct access to Parque Lleras cafes'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    communityEventsIncluded: true,
  },
  {
    id: 'coliving-bansko-chalet',
    name: 'Coworking Bansko Mountain Alpine Hub',
    city: 'Bansko (Pirin Mountains)',
    country: 'Bulgaria (0% Non-Schengen Tax Haven)',
    monthlyPublicRate: 1050,
    monthlyMemberRate: 580,
    savingsPercentage: 45,
    wifiSpeedMbps: 1000,
    roomType: 'Coworking Villa Pod',
    amenities: ['1 Gbps Fiber High-Speed Internet', 'Ski-in / Coworking Lounge with Fireplace', 'Thermal Mineral Hot Springs Excursions', 'Bulgarian 10% Flat Tax Registration Concierge', 'Private Alpine Studio with Mountain View'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    communityEventsIncluded: true,
  }
];

export const MOCK_VAULT_ACCOUNT: TravelVaultAccount = {
  userId: 'demo-vip-member-777',
  vaultUnits: 12450,
  tierMultiplier: 4,
  estimatedAnnualDividend: 384.20,
  totalLifetimeDividendsPaid: 290.00,
  nextPayoutDate: 'December 31, 2026',
  dividendHistory: [
    {
      year: 2025,
      amount: 290.00,
      destination: 'HotelsClub Visa Prepaid Card (•••• 8842)',
      paidAt: '2025-12-31 23:59 UTC'
    }
  ]
};

export const MOCK_VILLAS: LuxuryVillaEstate[] = [
  {
    id: 'villa-stbarts-etoile',
    name: 'Villa L’Étoile & Private Beach Estate',
    destination: 'St. Barts',
    region: 'Flamands Beach',
    country: 'Caribbean',
    bedrooms: 6,
    bathrooms: 7,
    maxGuests: 12,
    propertyType: 'Beachfront Villa',
    publicPricePerNight: 5800,
    memberPricePerNight: 3200,
    savingsPercentage: 45,
    amenities: ['Heated Infinity Pool overlooking Flamands Bay', 'Direct Private Beach Boardwalk', 'Outdoor Cinema & Teppanyaki Grill', 'State-of-the-art Gym & Spa', 'Air Conditioned Master Suites with Terrace'],
    staffIncluded: ['Private French Gourmet Chef', 'Full-Time Butler & Bartender', 'Daily Housekeeping & Turndown', 'Dedicated Airport Chauffeur'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
  }
];

export const MOCK_STATUS_MATCH_PROGRAMS: StatusMatchProgram[] = [
  {
    id: 'sm-hilton-diamond',
    loyaltyProgramName: 'Hilton Honors Diamond Tier',
    brand: 'Hilton Honors',
    matchedTier: 'Diamond VIP',
    minHotelsClubTier: 'gold',
    logo: '🏨',
    perks: [
      'Complimentary Room Upgrades to One-Bedroom Suites',
      'Executive Lounge Access with Free Breakfast & Evening Cocktails',
      'Daily $25 Food & Beverage Dining Credit per person',
      'Guaranteed 4:00 PM Late Check-out',
      '100% Bonus Points on all wholesale and direct stays'
    ],
    publicRequirement: 'Requires 60 Nights or $20,000 spend',
    matchProcessingTime: 'Instant / 12 Hours via API',
    statusValidity: 'Valid for 12 Full Months',
    applicationFee: 0,
    isComplimentaryForPlatinum: true,
  }
];

export const MOCK_FAST_TRACK_SERVICES: FastTrackAirportService[] = [
  {
    id: 'ft-lhr-vip',
    airportCode: 'LHR',
    airportName: 'London Heathrow International Airport',
    city: 'London',
    country: 'United Kingdom',
    serviceType: 'Arrival Jet Bridge Escort',
    provider: 'Diamond Air International',
    publicRetailPrice: 180,
    memberWholesalePrice: 85,
    savingsPercentage: 53,
    features: [
      'VIP Agent meets you directly at aircraft jet bridge with name board',
      'Diplomatic / Crew priority passport control lanes (3-minute clearance)',
      'Dedicated luggage porter to retrieve checked baggage',
      'Escort to your waiting chauffeur or Heathrow Express'
    ],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    includesElectricBuggy: true,
    averageCustomsTimeMinutes: 3,
  }
];

export const MOCK_YACHTS: LuxuryYachtCharter[] = [
  {
    id: 'yacht-miami-sunseeker',
    name: '75ft Sunseeker Predator "Aura VIP"',
    lengthFeet: 75,
    builder: 'Sunseeker International',
    location: 'Miami Beach Marina, South Beach',
    city: 'Miami, FL',
    maxGuests: 12,
    staterooms: 3,
    crewCount: 2,
    includesCaptain: true,
    halfDayRetailPrice: 3800,
    halfDayMemberPrice: 2200,
    fullDayRetailPrice: 6500,
    fullDayMemberPrice: 3900,
    amenities: ['Licensed USCG Captain & First Mate', 'Open Bar with Top-Shelf Spirits', 'Full Sound System with Bluetooth', 'Air Conditioned Salon & Master Suite', 'Towel & Ice Service Included'],
    waterToys: ['2x Seabob Underwater Scooters', 'Inflatable Floating Island', 'Paddleboards & Snorkel Gear'],
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  }
];

export const MOCK_SUPERCARS: SupercarRental[] = [
  {
    id: 'car-ferrari-f8',
    makeModel: 'Ferrari F8 Tributo (710 HP)',
    category: 'Supercar',
    city: 'Las Vegas, NV & Miami, FL',
    location: 'Hotel Doorstep VIP Delivery',
    horsepower: 710,
    zeroToSixtyMph: '2.9s',
    dailyRetailPrice: 1690,
    dailyMemberPrice: 950,
    includedMilesPerDay: 100,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    deliveryAvailable: true,
    features: ['Twin-Turbo 3.9L V8', 'Full Carbon Fiber Package', 'Exhaust Valve Switch', 'Free Concierge Hotel Delivery'],
  }
];

export const MOCK_PRICE_DROP_RECORDS: PriceDropRebookRecord[] = [
  {
    id: 'REBOOK-9824',
    userId: 'demo-vip-member-777',
    hotelName: 'The Grand Bellagio & Casino Resort',
    city: 'Las Vegas, NV',
    checkInDate: '2026-09-15',
    checkOutDate: '2026-09-18',
    nights: 3,
    originalPriceTotal: 594.00,
    newRebookedPriceTotal: 426.00,
    cashRefunded: 168.00,
    status: 'auto_rebooked_success',
    refundDestination: 'HotelsClub Visa Card',
    lastCheckedAt: '12 mins ago',
    rebookedAt: '2026-08-24 14:20 UTC',
    hotelImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  }
];

export const MOCK_ACTIVE_GAP_ALERTS: TripGapAlert[] = [
  {
    id: 'gap-miami-cruise-flight',
    type: 'missing_flight',
    tripTitle: '7-Night Caribbean Cruise (Icon of the Seas)',
    destination: 'Miami, FL',
    dates: 'Oct 18 – Oct 25, 2026',
    message: 'You have booked your Caribbean cruise departing PortMiami on Oct 18, but you don\'t have a flight into Miami (MIA) or Fort Lauderdale (FLL) yet!',
    suggestedActionText: 'Find Wholesale Flights or Empty-Leg Jets to Miami',
    targetRoute: '/private-jets',
    category: 'jet'
  }
];

export const MOCK_PRIVATE_JETS: PrivateJetEmptyLeg[] = [
  {
    id: 'jet-opf-teb-300',
    aircraftType: 'Bombardier Challenger 300',
    category: 'Super Midsize',
    operator: 'VistaJet / XO Private Fleet',
    tailNumber: 'N882VJ',
    departureAirportCode: 'OPF',
    departureAirportName: 'Miami Opa-Locka Executive Airport',
    departureCity: 'Miami, FL',
    arrivalAirportCode: 'TEB',
    arrivalAirportName: 'Teterboro Executive Airport',
    arrivalCity: 'New York, NY',
    departureDate: '2026-09-12',
    departureTime: '14:30 EST',
    flightDuration: '2h 45m',
    maxPassengers: 8,
    wholeJetRetailPrice: 28500,
    wholeJetMemberPrice: 8900,
    perSeatMemberPrice: 1250,
    savingsPercentage: 69,
    amenities: ['Dom Pérignon Champagne & Full Bar', 'High-Speed Ka-Band Wi-Fi', 'Private Enclosed Lavatory', 'Pet Friendly In-Cabin', 'Direct Tarmac VIP Boarding'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    fboTerminal: 'Atlantic Aviation FBO (No TSA Lines)',
    status: 'available'
  }
];

export const MOCK_FLIGHT_CLAIMS: FlightClaimRecord[] = [
  {
    id: 'CLM-AIR-9824',
    userId: 'demo-vip-member-777',
    flightNumber: 'LH442 (Lufthansa)',
    airline: 'Lufthansa',
    departureAirport: 'Frankfurt (FRA)',
    arrivalAirport: 'New York (JFK)',
    flightDate: '2026-08-15',
    delayHours: 4.5,
    claimReason: 'Flight Delayed 3+ Hours',
    estimatedPayout: 650.00,
    payoutCurrency: 'USD',
    passengerCount: 1,
    status: 'court_enforcement',
    airHelpReference: 'AH-EU261-8841920',
    payoutMethod: 'visa_card',
    createdAt: '2026-08-16',
  }
];

export const MOCK_INSURANCE_PLANS: TravelInsurancePlan[] = [
  {
    id: 'safetywing-nomad',
    title: 'Nomad Essential Travel Medical Protection',
    provider: 'SafetyWing',
    category: 'Nomad Essential Medical',
    dailyPrice: 1.60,
    annualPrice: 540,
    medicalEmergencyCoverage: '$250,000 Maximum',
    evacuationCoverage: '$100,000 Emergency Medical Evacuation',
    tripCancellationCoverage: '$5,000 Trip Interruption',
    lostLuggageCoverage: '$3,000 Checked Baggage Loss',
    deductible: '$0 Deductible',
    features: [
      'Covers 180+ countries worldwide',
      'Emergency room, ambulance & hospitalization',
      'Lost checked luggage & delayed flight assistance',
      'Instant digital insurance certificate for visa applications'
    ],
    instantPolicyPdf: true,
  }
];

export const PROVIDER_INSTRUCTION_GUIDES: ProviderInstructionGuide[] = [
  {
    id: 'sherpa-nomad-visas',
    providerName: 'Sherpa Travel / iVisa B2B API (Digital Nomad Visas)',
    category: 'Global Digital Nomad Visas & Schengen Rules Engine',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: 'Instant automated visa requirements & filing • $20 – $75 filing commission per approved visa (20%–30% rev-share)',
    portalUrl: 'https://www.ivisa.com/affiliates',
    requirements: [
      'B2B Travel Platform or VIP Nomad Membership Club Registration',
      'Passenger passport data & destination country forwarder'
    ],
    stepByStepGuide: [
      '1. Sign up for a partner affiliate account at ivisa.com/affiliates or joinsherpa.com/partners.',
      '2. In Developer Settings, copy your Affiliate Campaign ID and API Token.',
      '3. In HotelsClub Admin > Digital Nomad & Visas, paste your credentials and save.',
      '4. When a member applies for a Spain, Portugal, Dubai, or Thailand Nomad Visa, you earn $20–$75 per approved filing.'
    ]
  },
  {
    id: 'outsite-coliving-affiliate',
    providerName: 'Outsite & Selina Coliving Affiliate Network',
    category: 'Monthly Coliving Spaces & Long-Stays',
    estimatedApprovalTime: 'Instant / 1 Business Day',
    typicalCommissionOrSavings: '$50 – $100 per member signup • 8% – 10% commission on 30+ day monthly stays ($100–$250/mo)',
    portalUrl: 'https://www.outsite.co/affiliates',
    requirements: [
      'Travel platform, community, or nomad club website',
      'Payout details (PayPal / Bank Transfer)'
    ],
    stepByStepGuide: [
      '1. Register at outsite.co/affiliates and apply for Selina CoLive partner network.',
      '2. Copy your Outsite Affiliate Tracking Token.',
      '3. In HotelsClub Admin > Digital Nomad & Visas, paste your Outsite ID.',
      '4. When members book long-stay suites in Lisbon, Bali, or Medellín, your affiliate tracking is automatically attached.'
    ]
  },
  {
    id: 'wise-nomad-banking',
    providerName: 'Wise (TransferWise) & Remote Banking Affiliate',
    category: 'Multi-Currency Nomad Banking & FX',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: '$20 – $50 per active member account funded',
    portalUrl: 'https://wise.com/affiliates',
    requirements: [
      'FinTech or Travel Platform entity',
      'Affiliate network acceptance (Impact Radius / Partnerize)'
    ],
    stepByStepGuide: [
      '1. Register at wise.com/affiliates (via Impact.com).',
      '2. Obtain your Wise Partner Campaign Link ID.',
      '3. Paste into HotelsClub Admin > Digital Nomad & Visas under "FinTech Banking Partner".',
      '4. Members setting up multi-currency local accounts for their foreign visas generate automated affiliate commissions.'
    ]
  },
  {
    id: 'travel-vault-dividends',
    providerName: 'HotelsClub Vault & Profit Dividend Smart Engine',
    category: 'Closed-Loop Profit Sharing & Member Dividend Distribution',
    estimatedApprovalTime: 'Instant / Built-in Protocol',
    typicalCommissionOrSavings: 'Members receive annual cash dividend checks ($250 – $1,200) deposited directly onto their Visa Prepaid Card',
    portalUrl: 'https://hotelsclub.vip/vault',
    requirements: [
      'Active HotelsClub membership in good standing',
      'HotelsClub Reloadable Visa Card or PayPal account for deposit'
    ],
    stepByStepGuide: [
      '1. Every booking across hotels, private jets, yachts, and reloadable Visa card swipes generates Vault Equity Points.',
      '2. In Admin > Travel Vault, the platform operator views the total accumulated supplier profit pool.',
      '3. On December 31, click "Execute Annual Profit Dividend Payout".',
      '4. Cash is automatically credited onto each member\'s Visa Prepaid Card with instant email and SMS notifications.'
    ]
  },
  {
    id: 'le-collectionist-villas',
    providerName: 'Le Collectionist / Oliver’s Travels (Luxury Villas API)',
    category: 'Ultra-Luxury Villas & Private Chalets',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: '40% – 50% Member Wholesale Savings on Private Estates • 10% Platform Broker Fee',
    portalUrl: 'https://www.lecollectionist.com/en/travel-designers',
    requirements: [
      'B2B Travel Designer or VIP Club business registration',
      'Guest verification & concierge damage deposit protocol'
    ],
    stepByStepGuide: [
      '1. Register as a partner at lecollectionist.com/en/travel-designers or oliverstravels.com.',
      '2. In Developer Settings, copy your B2B Estate XML/REST API credentials.',
      '3. In HotelsClub Admin > Luxury Villas, paste your credentials and set your member discount pass-through.',
      '4. When a member books an estate, the on-site butler and private chef are notified to tailor arrival provisioning.'
    ]
  },
  {
    id: 'statusmatch-api',
    providerName: 'StatusMatch.com / Loylogic B2B API',
    category: 'Hotel & Airline Loyalty Elite Tier Matching',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: 'Instant Diamond/Platinum Status ($1,500+ in annual perks) • Platform keeps match fee split',
    portalUrl: 'https://www.statusmatch.com/business',
    requirements: [
      'Closed-Loop VIP Travel Club partnership',
      'Member tier verification bridge'
    ],
    stepByStepGuide: [
      '1. Apply for an enterprise partner account at statusmatch.com/business or loylogic.com.',
      '2. In Developer Settings, obtain your Status Bridge API Secret.',
      '3. In HotelsClub Admin > Status Match, paste your API token and define tier mappings (e.g. Gold ➔ Hilton Diamond).',
      '4. When a member requests a match, StatusMatch.com pushes instant tier upgrades directly to Hilton/Marriott/Star Alliance.'
    ]
  },
  {
    id: 'diamond-air-fasttrack',
    providerName: 'Diamond Air International / Marhaba (Fast-Track VIP)',
    category: 'Airport Fast-Track Immigration & Tarmac Meet-and-Greet',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: '50% Member Discount on VIP Jet Bridge Escorts • 15% Platform Commission',
    portalUrl: 'https://www.diamondair.co.uk/',
    requirements: [
      'Travel Agency or VIP Membership Club Partner registration',
      'Passenger flight manifest & arrival flight number forwarding'
    ],
    stepByStepGuide: [
      '1. Sign up at diamondair.co.uk or marhabaservices.com B2B partner portal.',
      '2. Copy your Agency Account ID and API Dispatch Token.',
      '3. In HotelsClub Admin > Fast-Track Immigration, paste your token and save.',
      '4. When a member books an arrival escort, the airport agent is dispatched to the jet bridge with a digital name board.'
    ]
  },
  {
    id: 'boatsetter-yachts',
    providerName: 'Boatsetter B2B API / Click&Boat (Yacht Charters)',
    category: 'Luxury Yacht & Catamaran Day Charters',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: '35% – 45% Member Savings on Captained Yacht Charters • 10% Platform Commission',
    portalUrl: 'https://www.boatsetter.com/affiliates',
    requirements: [
      'Travel Agency or VIP Concierge Partner Registration',
      'Passenger manifest & marine insurance waiver handling'
    ],
    stepByStepGuide: [
      '1. Sign up at boatsetter.com/affiliates or clickandboat.com partner portal.',
      '2. Copy your B2B Fleet Partner API Key and Webhook URL.',
      '3. In HotelsClub Admin > Yachts & Supercars, paste your key and adjust commission margins.',
      '4. When a member books a yacht, the licensed captain is dispatched and coordinates harbor boarding directly.'
    ]
  },
  {
    id: 'pruvo-autorebook',
    providerName: 'Pruvo For Business / Hotelmize (Auto-Rebook API)',
    category: 'Post-Booking Price Drop Tracking & Autonomous Re-Hedging',
    estimatedApprovalTime: '1 Business Day',
    typicalCommissionOrSavings: 'Members save an extra $70 – $240 per reservation after booking • Platform keeps split',
    portalUrl: 'https://www.pruvo.com/business',
    requirements: [
      'B2B Travel Platform or Agency entity',
      'Webhook endpoint to receive automated price-drop notifications'
    ],
    stepByStepGuide: [
      '1. Create an enterprise developer account at pruvo.com/business or hotelmize.com.',
      '2. In Developer Settings, copy your B2B API Token and configure your Webhook URL.',
      '3. In HotelsClub Admin > Auto-Rebooker, paste your Token and set your minimum rebook drop threshold ($25 min).',
      '4. When a member books a room, the engine monitors the rate 24/7. When the price drops, it automatically re-reserves at the lower rate and deposits the difference onto their Visa card.'
    ]
  },
  {
    id: 'lunajets-aviation',
    providerName: 'LunaJets / FlyXO API (Private Jet Empty Legs)',
    category: 'Private Aviation & Empty Leg Charter Brokerage',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: 'Up to 80% Off Whole Aircraft Charters • Platform earns $250 – $750 commission per flight',
    portalUrl: 'https://www.lunajets.com/en/b2b-partners',
    requirements: [
      'VIP Travel Club or Luxury Concierge Business Entity',
      'Passenger Passenger Manifest & Passport verification protocol'
    ],
    stepByStepGuide: [
      '1. Apply at lunajets.com/en/b2b-partners or flyxo.com/partners.',
      '2. Request B2B Empty Leg Feed API credentials (REST JSON Webhook).',
      '3. In HotelsClub Admin > Private Jets, paste your API Key and set your charter commission markups.',
      '4. When a member reserves a seat or whole jet, the FBO handling team coordinates executive tarmac access, catering, and pilot briefing.'
    ]
  },
  {
    id: 'airhelp-claims',
    providerName: 'AirHelp API (Flight Delay Legal Claims)',
    category: 'Flight Delay Legal Compensation (EU261 / US DOT)',
    estimatedApprovalTime: '1 Business Day',
    typicalCommissionOrSavings: 'Passengers win up to $650 cash • Platform earns $25–$45 affiliate bounty per claim',
    portalUrl: 'https://www.airhelp.com/en/affiliates/',
    requirements: [
      'Affiliate or B2B Partner registration',
      'Passenger Flight details (Flight #, Date, Delay length, Boarding pass)'
    ],
    stepByStepGuide: [
      '1. Register at airhelp.com/en/affiliates or apply for AirHelp Connect B2B API access.',
      '2. Copy your Affiliate Campaign ID or REST API Token.',
      '3. Paste it in Admin > Flight Delay Claims and click Save.',
      '4. When a member experiences a flight delay of 3+ hours, they enter their flight number in your Member Claim Center.',
      '5. AirHelp legal attorneys automatically sue or negotiate with the airline on a no-win no-fee basis.',
      '6. When the airline pays out, cash is deposited into the member\'s Visa card or PayPal, and your platform receives the referral commission.'
    ]
  },
  {
    id: 'safetywing-insurance',
    providerName: 'SafetyWing / Allianz Partner (Global Travel Insurance)',
    category: 'Travel Medical & Trip Cancellation Insurance',
    estimatedApprovalTime: 'Instant Partner Sandbox / 24h Live',
    typicalCommissionOrSavings: '15% – 20% recurring commission on policy sales or 100% pass-through discount',
    portalUrl: 'https://safetywing.com/partners',
    requirements: [
      'Partner registration',
      'Payout account (PayPal / Bank Transfer)'
    ],
    stepByStepGuide: [
      '1. Sign up at safetywing.com/partners or allianz-partners.com.',
      '2. Obtain your Partner Tracking Token or Embed API Secret.',
      '3. Configure your member discount pass-through in Admin > Travel Insurance.',
      '4. Members receive instant policy PDFs with border control QR verification for international visa entry.'
    ]
  },
  {
    id: 'stripe-issuing',
    providerName: 'Stripe Issuing (Co-Branded Reloadable Visa Cards)',
    category: 'Banking-as-a-Service & Card Issuing',
    estimatedApprovalTime: '1 – 2 Business Days',
    typicalCommissionOrSavings: 'Earn 1.2% – 1.6% Interchange Revenue on every member card swipe',
    portalUrl: 'https://dashboard.stripe.com/issuing',
    requirements: [
      'Active Stripe account in good standing',
      'Business Registration Number / Tax ID (EIN / VAT)',
      'Custom Card Artwork (PDF or PNG 1013x638px at 300 DPI)',
      'Cardholder Terms of Service & Privacy Policy'
    ],
    stepByStepGuide: [
      '1. Log into your Stripe Dashboard and navigate to the "Issuing" tab.',
      '2. Click "Request Access" for Physical Card Issuing and submit your business entity details.',
      '3. In "Card Designs", upload your HotelsClub metallic Gold/Platinum card art with your logo.',
      '4. Copy your Secret Key (sk_live_...) and Webhook Secret from Developer Settings.',
      '5. Paste the keys in your HotelsClub Admin Console under "Prepaid Visa Manager" and click Publish.',
      '6. When members order a Visa card, Stripe automatically prints and ships it via USPS with real-time tracking.'
    ]
  }
];

export const MOCK_ESIM_PACKAGES: EsimPackage[] = [
  {
    id: 'esim-usa-5gb',
    countryCode: 'US',
    countryName: 'United States',
    flagEmoji: '🇺🇸',
    region: 'Americas',
    dataAmount: '5 GB High-Speed',
    validityDays: 30,
    publicRetailPrice: 16.00,
    memberWholesalePrice: 8.50,
    networkSpeed: '5G / 4G LTE',
    carrierPartners: 'AT&T / T-Mobile 5G',
    instantQrDelivery: true,
  }
];

export const MOCK_VISA_ACCOUNT: VisaCardAccount = {
  id: 'visa-acc-9824',
  userId: 'demo-vip-member-777',
  cardNumberMasked: '•••• •••• •••• 8842',
  cardholderName: 'ALEX HARRISON',
  expiry: '09/29',
  cvvMasked: '•••',
  balance: 450.00,
  currency: 'USD',
  status: 'active',
  tier: 'gold',
  cardType: 'Physical Plastic Chip & PIN',
  cardDesign: 'Gold VIP Metallic',
  autoReloadEnabled: true,
  autoReloadAmount: 100.00,
};

export const MEMBERSHIP_TIERS: TierPlan[] = [
  {
    id: 'free',
    name: 'Explorer (Free)',
    badgeColor: 'bg-slate-500',
    priceMonthly: 0,
    priceAnnual: 0,
    wholesaleHotelDiscount: 'Up to 15% Off',
    perksIncluded: [
      'Search live hotel rates',
      'Preview wholesale pricing',
      'Flight delay compensation scanner',
      'Standard customer support'
    ]
  },
  {
    id: 'nomad',
    name: 'Global Nomad Passport',
    badgeColor: 'bg-teal-600',
    priceMonthly: 29.99,
    priceAnnual: 279,
    wholesaleHotelDiscount: 'Up to 50% Off (Monthly Coliving & Long-Stays)',
    isPopular: true,
    perksIncluded: [
      'Free 10GB Global 5G Travel eSIM auto-renewed monthly',
      'SafetyWing Travel Medical Insurance included',
      'Digital Nomad Visa Application Concierge (Spain, Portugal, Dubai, Thailand)',
      'Schengen 90/180-Day Automated Compliance Sentinel',
      'Curated monthly coliving spaces with verified 300+ Mbps Fiber Wi-Fi',
      'HotelsClub Reloadable Visa Card with 0% Foreign Transaction Fees',
      '3x Travel Vault Dividend Multiplier'
    ]
  },
  {
    id: 'silver',
    name: 'Silver Club',
    badgeColor: 'bg-slate-400',
    priceMonthly: 9.99,
    priceAnnual: 89,
    wholesaleHotelDiscount: 'Up to 35% Off',
    perksIncluded: [
      'Access to 400,000+ wholesale hotels',
      '2x Travel Vault Dividend Multiplier',
      'Car rental discounts up to 25%',
      'Global eSIM travel data discounts',
      'Flight delay legal claim assistance ($650 compensation)',
      'Digital member card & app pass'
    ]
  },
  {
    id: 'gold',
    name: 'Gold VIP',
    badgeColor: 'bg-amber-500',
    priceMonthly: 19.99,
    priceAnnual: 179,
    wholesaleHotelDiscount: 'Up to 55% Off',
    perksIncluded: [
      'Maximum wholesale rates (1M+ properties)',
      '4x Travel Vault Dividend Multiplier (Annual Cash Payout to Visa)',
      'Curated Ultra-Luxury Villas & Private Chalets (45% Off)',
      'Wholesale cruise closed-loop pricing + $150 Onboard Credit',
      'Hilton Honors Diamond & Marriott Platinum Status Matches',
      'VIP Airport Fast-Track Immigration Escort Discounts ($85 flat rate)',
      'Autonomous Post-Booking Price Drop Re-Booker (Cashback to Visa)',
      'Supercar & Luxury Yacht Day Charters (Up to 45% Off)',
      'Private Jet Empty Leg Member Access (Up to 80% Off)',
      'Co-Branded Rechargeable Visa Prepaid Card included',
      'Proactive AI Concierge Itinerary Gap Alerts',
      'Physical holographic Photo ID card shipped free',
      'Family pass (Up to 4 sub-members)'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Elite',
    badgeColor: 'bg-purple-600',
    priceMonthly: 39.99,
    priceAnnual: 349,
    wholesaleHotelDiscount: 'Up to 70% Off',
    perksIncluded: [
      'Guaranteed lowest rate price match + 10%',
      '8x Travel Vault Dividend Multiplier (Maximum Club Profit Share)',
      'Complimentary Private Villa Butler & Chef on all estate bookings',
      'Complimentary Star Alliance Gold Airline Status Match included',
      'Complimentary VIP Airport Fast-Track Pass annually',
      'VIP Airport Lounge access discounts ($32 flat pass)',
      'Complimentary Essential Travel Medical Insurance included',
      'Wholesale cruises + $300 Free Onboard Credit bonus',
      'Complimentary Supercar Track Day or Yacht Sunset Cruise',
      'Private Jet Empty Leg Whole Aircraft Charter Discounts',
      'Free 5GB Global Travel eSIM Data Pass every year',
      'Heavy Titanium Physical Visa Prepaid Card included',
      'Dedicated Proactive AI Concierge + personal travel agent'
    ]
  }
];

export const MOCK_CRUISES: CruiseItinerary[] = [
  {
    id: 'icon-caribbean',
    shipName: 'Icon of the Seas',
    cruiseLine: 'Royal Caribbean',
    title: '7-Night Eastern Caribbean & Perfect Day at CocoCay',
    destination: 'Eastern Caribbean',
    departurePort: 'Miami, Florida',
    durationNights: 7,
    portsOfCall: ['Miami, FL', 'Philipsburg, St. Maarten', 'Charlotte Amalie, St. Thomas', 'Perfect Day at CocoCay, Bahamas'],
    departureDates: ['2026-10-18', '2026-11-08', '2026-12-06'],
    thumbnail: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=1200&q=80'
    ],
    publicPriceStarting: 1890,
    memberPriceStarting: 1140,
    savingsPercentage: 40,
    onboardCredit: 250,
    cabins: [
      {
        id: 'balcony-ocean',
        name: 'Spacious Ocean View Balcony Stateroom',
        category: 'Balcony',
        description: 'Private glass balcony with unobstructed Caribbean ocean views, sitting area with sofa bed, and luxury bedding.',
        publicBrochurePrice: 2240,
        wholesaleMemberPrice: 1390,
        onboardCreditBonus: 250,
        freePerks: ['$250 Free Onboard Spending Credit', 'Free Premium Wi-Fi Package', 'Complimentary Specialty Dining for 2'],
        availableCount: 5,
      }
    ]
  }
];

export const MOCK_LOUNGES: AirportLounge[] = [
  {
    id: 'jfk-clubhouse',
    airportCode: 'JFK',
    airportName: 'New York John F. Kennedy International',
    terminal: 'Terminal 4, Concourse A',
    loungeName: 'The Skyview Club & Oasis Lounge',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: ['Buffet Dining by Master Chefs', 'Craft Beer & Premium Spirits Bar', 'Private Shower Suites', 'High-Speed Wi-Fi', 'Quiet Nap Pods'],
    walkInPrice: 65,
    memberPassPrice: 32,
    operatingHours: '05:00 - 23:30 Daily',
    locationDetails: 'Airside - Post-security, adjacent to Gate A5.',
  }
];

export const MOCK_CARD_ORDERS: PhysicalCardOrder[] = [
  {
    id: 'CARD-ORD-901',
    userId: 'demo-vip-member-777',
    memberName: 'Alex Harrison',
    memberId: 'HC-9824-VIP',
    tier: 'gold',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    foilStyle: 'metallic_gold',
    cardType: 'Co-Branded Visa Prepaid',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zip: '97477',
      country: 'United States',
    },
    status: 'printing',
    trackingNumber: 'USPS-9400111899562534882190',
    carrier: 'USPS First Class Priority',
    orderedAt: '2026-08-25',
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'bellagio-vegas',
    name: 'The Grand Bellagio & Casino Resort',
    tagline: 'Iconic luxury fountains, five-star dining & prime Strip location',
    description: 'Experience unparalleled world-class hospitality on the Las Vegas Strip. Featuring lavish fountains, botanical gardens, upscale spa, fine dining by Michelin-starred chefs, and opulent suites.',
    city: 'Las Vegas',
    stateCountry: 'Nevada, USA',
    address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109',
    stars: 5,
    rating: 4.8,
    reviewCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    publicPricePerNight: 389,
    memberPricePerNight: 198,
    savingsPercentage: 49,
    category: 'Luxury Resort',
    featured: true,
    amenities: ['Casino', 'Full Spa', '5 Outdoor Pools', 'Free High-Speed WiFi', 'Valet Parking', 'Fine Dining'],
    rooms: [
      {
        id: 'deluxe-king',
        name: 'Deluxe Fountain View King Suite',
        description: 'Spectacular views of the world-famous fountains with plush king pillow-top bed and Italian marble bathroom.',
        bedType: '1 King Bed',
        maxGuests: 2,
        publicRetailPrice: 389,
        wholesaleMemberPrice: 198,
        availableCount: 4,
        amenities: ['Fountain View', 'Marble Bath', 'Espresso Machine', 'Smart TV'],
        refundable: true
      }
    ]
  }
];

export const MOCK_PERKS: PerkDeal[] = [
  {
    id: 'hertz-car-rental',
    title: 'Up to 30% Off Premium Car Rentals + Free Upgrade',
    partnerName: 'Hertz Gold Plus Rewards',
    category: 'Car Rental',
    discountText: '30% OFF',
    description: 'Save big on SUV, luxury sedan, and minivan rentals worldwide with waived additional driver fees and instant skip-the-counter access.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    terms: 'Valid at participating airport and neighborhood locations. Must present digital member ID card.',
    code: 'HOTELCLUB30',
    location: 'Nationwide & Global Locations',
    rating: 4.8,
    redemptionType: 'online_code'
  }
];
