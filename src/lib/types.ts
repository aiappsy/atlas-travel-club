export type MembershipTier = 'free' | 'silver' | 'gold' | 'platinum' | 'nomad' | 'corporate';

export interface PlatformFeatureFlags {
  enableHotels: boolean;
  enableCruises: boolean;
  enableLounges: boolean;
  enableEsim: boolean;
  enableFlightClaims: boolean;
  enableTravelInsurance: boolean;
  enablePrivateJets: boolean;
  enableAutoRebooker: boolean;
  enableYachtsAndSupercars: boolean;
  enableFastTrackImmigration: boolean;
  enableStatusMatch: boolean;
  enableLuxuryVillas: boolean;
  enableTravelVault: boolean;
  enableNomadHub: boolean;
  enablePhysicalIdCards: boolean;
  enableVisaPrepaidCards: boolean;
  enableAiConcierge: boolean;
  enableProactiveTripGaps: boolean;
  enableElevenLabsVoice: boolean;
  allowMemberDirectBooking: boolean;
  defaultCommissionPassThrough: number;
  lastPublishedAt: string;
}

export interface SavingsProofAudit {
  id: string;
  hotelName: string;
  city: string;
  country: string;
  starRating: number;
  dates: string;
  nights: number;
  image: string;
  roomType: string;
  publicProvider: 'Expedia' | 'Booking.com' | 'Hotels.com' | 'Airbnb' | 'Kayak';
  publicRetailPricePerNight: number;
  publicTotalRetailPrice: number;
  retailMarketingMarkup: number;
  hotelsClubWholesalePerNight: number;
  hotelsClubTotalPaid: number;
  instantCashSaved: number;
  savingsPercentage: number;
  additionalCardBonuses: {
    priceDropProtection: number;
    travelVaultDividends: number;
    visaCashback: number;
  };
  totalNetValueDelivered: number;
  lastAuditedTimestamp: string;
  auditHash: string;
}

export interface LiveReceipt {
  id: string;
  memberNameMasked: string;
  memberTier: MembershipTier;
  itemBooked: string;
  destination: string;
  retailPrice: number;
  wholesalePaid: number;
  amountSaved: number;
  cashbackDepositedToVisa: number;
  timestampAgo: string;
}

export interface NomadVisaProgram {
  id: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  visaName: string;
  minMonthlyIncome: string;
  durationStay: string;
  taxRate: string;
  processingTime: string;
  cost: number;
  schengenStatus: string;
  region?: string;
  incomeThresholdUsd?: number;
  isZeroTax?: boolean;
  keyRequirements: string[];
  popularHubs: string[];
  fastTrackFilingAvailable: boolean;
}

export interface NomadColivingSpace {
  id: string;
  name: string;
  city: string;
  country: string;
  monthlyPublicRate: number;
  monthlyMemberRate: number;
  savingsPercentage: number;
  wifiSpeedMbps: number;
  roomType: 'Private Studio En-Suite' | 'Coliving Master Suite' | 'Coworking Villa Pod';
  amenities: string[];
  image: string;
  communityEventsIncluded: boolean;
}

export interface TravelVaultAccount {
  userId: string;
  vaultUnits: number;
  tierMultiplier: number;
  estimatedAnnualDividend: number;
  totalLifetimeDividendsPaid: number;
  nextPayoutDate: string;
  dividendHistory: {
    year: number;
    amount: number;
    destination: string;
    paidAt: string;
  }[];
}

export interface LuxuryVillaEstate {
  id: string;
  name: string;
  destination: string;
  region: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: 'Beachfront Villa' | 'Alpine Ski Chalet' | 'Vineyard Estate' | 'Cliffside Retreat';
  publicPricePerNight: number;
  memberPricePerNight: number;
  savingsPercentage: number;
  amenities: string[];
  staffIncluded: string[];
  images: string[];
  featured: boolean;
}

export interface StatusMatchProgram {
  id: string;
  loyaltyProgramName: string;
  brand: 'Hilton Honors' | 'Marriott Bonvoy' | 'IHG One Rewards' | 'Star Alliance' | 'SkyTeam';
  matchedTier: string;
  minHotelsClubTier: MembershipTier;
  logo: string;
  perks: string[];
  publicRequirement: string;
  matchProcessingTime: string;
  statusValidity: string;
  applicationFee: number;
  isComplimentaryForPlatinum: boolean;
}

export interface FastTrackAirportService {
  id: string;
  airportCode: string;
  airportName: string;
  city: string;
  country: string;
  serviceType: 'Arrival Jet Bridge Escort' | 'Departure Curbside-to-Gate' | 'Transit Buggy Connection';
  provider: 'Diamond Air International' | 'Marhaba VIP' | 'Royal Airport Concierge';
  publicRetailPrice: number;
  memberWholesalePrice: number;
  savingsPercentage: number;
  features: string[];
  image: string;
  includesElectricBuggy: boolean;
  averageCustomsTimeMinutes: number;
}

export interface LuxuryYachtCharter {
  id: string;
  name: string;
  lengthFeet: number;
  builder: string;
  location: string;
  city: string;
  maxGuests: number;
  staterooms: number;
  crewCount: number;
  includesCaptain: boolean;
  halfDayRetailPrice: number;
  halfDayMemberPrice: number;
  fullDayRetailPrice: number;
  fullDayMemberPrice: number;
  amenities: string[];
  waterToys: string[];
  image: string;
  featured: boolean;
}

export interface SupercarRental {
  id: string;
  makeModel: string;
  category: 'Supercar' | 'Hypercar' | 'Ultra-Luxury Sedan' | 'Luxury SUV';
  city: string;
  location: string;
  horsepower: number;
  zeroToSixtyMph: string;
  dailyRetailPrice: number;
  dailyMemberPrice: number;
  includedMilesPerDay: number;
  image: string;
  deliveryAvailable: boolean;
  features: string[];
}

export interface PriceDropRebookRecord {
  id: string;
  userId: string;
  hotelName: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  originalPriceTotal: number;
  newRebookedPriceTotal: number;
  cashRefunded: number;
  status: 'monitoring' | 'price_drop_detected' | 'auto_rebooked_success';
  refundDestination: 'HotelsClub Visa Card' | 'PayPal';
  lastCheckedAt: string;
  rebookedAt?: string;
  hotelImage: string;
}

export interface TripGapAlert {
  id: string;
  type: 'missing_flight' | 'missing_hotel' | 'missing_esim' | 'missing_lounge';
  tripTitle: string;
  destination: string;
  dates: string;
  message: string;
  suggestedActionText: string;
  targetRoute: string;
  category: 'flight' | 'hotel' | 'esim' | 'jet';
}

export interface PrivateJetEmptyLeg {
  id: string;
  aircraftType: string;
  category: 'Light Jet' | 'Midsize Jet' | 'Super Midsize' | 'Heavy Long-Range';
  operator: string;
  tailNumber: string;
  departureAirportCode: string;
  departureAirportName: string;
  departureCity: string;
  arrivalAirportCode: string;
  arrivalAirportName: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  flightDuration: string;
  maxPassengers: number;
  wholeJetRetailPrice: number;
  wholeJetMemberPrice: number;
  perSeatMemberPrice: number;
  savingsPercentage: number;
  amenities: string[];
  image: string;
  fboTerminal: string;
  status: 'available' | 'reserved' | 'departed';
}

export interface FlightClaimRecord {
  id: string;
  userId: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDate: string;
  delayHours: number;
  claimReason: 'Flight Delayed 3+ Hours' | 'Flight Cancelled' | 'Denied Boarding (Overbooking)' | 'Missed Connection';
  estimatedPayout: number;
  payoutCurrency: string;
  passengerCount: number;
  status: 'eligible_filed' | 'airline_review' | 'court_enforcement' | 'payout_dispatched';
  airHelpReference: string;
  payoutMethod: 'visa_card' | 'paypal';
  createdAt: string;
}

export interface TravelInsurancePlan {
  id: string;
  title: string;
  provider: 'SafetyWing' | 'Allianz Global Assistance' | 'World Nomads';
  category: 'Nomad Essential Medical' | 'VIP Comprehensive Trip Cancellation' | 'Annual Multi-Trip Explorer';
  dailyPrice: number;
  annualPrice: number;
  medicalEmergencyCoverage: string;
  evacuationCoverage: string;
  tripCancellationCoverage: string;
  lostLuggageCoverage: string;
  deductible: string;
  features: string[];
  instantPolicyPdf: boolean;
}

export interface ProviderInstructionGuide {
  id: string;
  providerName: string;
  category: string;
  requirements: string[];
  stepByStepGuide: string[];
  portalUrl: string;
  estimatedApprovalTime: string;
  typicalCommissionOrSavings: string;
}

export interface VisaCardAccount {
  id: string;
  userId: string;
  cardNumberMasked: string;
  cardholderName: string;
  expiry: string;
  cvvMasked: string;
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'pending_kyc';
  tier: MembershipTier;
  cardType: 'Physical Plastic Chip & PIN' | 'Virtual Apple/Google Pay';
  cardDesign: 'Gold VIP Metallic' | 'Platinum Titanium' | 'Obsidian Black';
  autoReloadEnabled: boolean;
  autoReloadAmount: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  memberId: string;
  role: 'member' | 'vip' | 'partner' | 'admin';
  tier: MembershipTier;
  membershipStatus: 'active' | 'expired' | 'trial';
  validUntil: string;
  lifetimeSavings: number;
  totalBookings: number;
  createdAt: string;
  hasPhysicalCard?: boolean;
  physicalCardStatus?: 'ordered' | 'printing' | 'shipped' | 'delivered';
  physicalCardTracking?: string;
  visaCard?: VisaCardAccount;
  activeGapAlerts?: TripGapAlert[];
  priceDropRefundsTotal?: number;
  travelVault?: TravelVaultAccount;
}

export interface EsimPackage {
  id: string;
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Global (140+ Countries)' | 'Middle East' | 'Africa' | 'Global' | string;
  dataAmount: string;
  validityDays: number;
  publicRetailPrice: number;
  memberWholesalePrice: number;
  networkSpeed: string;
  carrierPartners: string;
  instantQrDelivery: boolean;
}

export interface CabinOption {
  id: string;
  name: string;
  category: 'Interior' | 'Oceanview' | 'Balcony' | 'Suite' | 'Royal Loft';
  description: string;
  publicBrochurePrice: number;
  wholesaleMemberPrice: number;
  onboardCreditBonus: number;
  freePerks: string[];
  availableCount: number;
}

export interface CruiseItinerary {
  id: string;
  shipName: string;
  cruiseLine: 'Royal Caribbean' | 'Celebrity Cruises' | 'Norwegian Cruise Line' | 'Carnival' | 'MSC Cruises' | 'Princess';
  title: string;
  destination: string;
  departurePort: string;
  durationNights: number;
  portsOfCall: string[];
  departureDates: string[];
  thumbnail: string;
  images: string[];
  publicPriceStarting: number;
  memberPriceStarting: number;
  savingsPercentage: number;
  onboardCredit: number;
  cabins: CabinOption[];
}

export interface AirportLounge {
  id: string;
  airportCode: string;
  airportName: string;
  terminal: string;
  loungeName: string;
  image: string;
  amenities: string[];
  walkInPrice: number;
  memberPassPrice: number;
  operatingHours: string;
  locationDetails: string;
}

export interface PhysicalCardOrder {
  id: string;
  userId: string;
  memberName: string;
  memberId: string;
  tier: MembershipTier;
  photoUrl: string;
  foilStyle: 'metallic_gold' | 'holographic_platinum' | 'brushed_titanium';
  cardType: 'Membership Photo ID' | 'Co-Branded Visa Prepaid';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  status: 'ordered' | 'printing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  carrier?: string;
  orderedAt: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  bedType: string;
  maxGuests: number;
  publicRetailPrice: number;
  wholesaleMemberPrice: number;
  availableCount: number;
  amenities: string[];
  refundable: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  city: string;
  stateCountry: string;
  address: string;
  stars: number;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  images: string[];
  publicPricePerNight: number;
  memberPricePerNight: number;
  savingsPercentage: number;
  amenities: string[];
  category: 'Luxury Resort' | 'Boutique' | 'City Center' | 'All-Inclusive' | 'Beachfront' | 'Ultra-Luxury' | 'Historic Palace' | string;
  featured: boolean;
  rooms: HotelRoom[];
}

export interface PerkDeal {
  id: string;
  title: string;
  partnerName: string;
  category: 'Dining' | 'Car Rental' | 'Theme Parks' | 'Shopping' | 'Entertainment' | 'Cruises' | 'Chauffeur & Transfer' | string;
  discountText: string;
  description: string;
  image: string;
  terms: string;
  code: string;
  location: string;
  rating: number;
  redemptionType: 'online_code' | 'barcode' | 'qr_in_store' | 'direct_link';
}

export interface BookingRecord {
  id: string;
  userId: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelCity: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  totalPublicPrice: number;
  totalMemberPaid: number;
  totalSaved: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  confirmationCode: string;
  createdAt: string;
}

export interface TierPlan {
  id: MembershipTier;
  name: string;
  badgeColor: string;
  priceMonthly: number;
  priceAnnual: number;
  wholesaleHotelDiscount: string;
  perksIncluded: string[];
  isPopular?: boolean;
}
