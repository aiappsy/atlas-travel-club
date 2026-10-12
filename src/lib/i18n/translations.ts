export type Locale = 'no' | 'en';

export interface Translations {
  common: {
    language: string;
    startTrialNow: string;
    signIn: string;
    signOut: string;
    save: string;
    verified: string;
    loading: string;
    search: string;
    close: string;
    allRightsReserved: string;
    freeTrialBadge: string;
  };
  nav: {
    hotels: string;
    flights: string;
    lounges: string;
    cruises: string;
    savingsProof: string;
    membership: string;
    myBookings: string;
    travelVault: string;
    concierge: string;
    collapse: string;
  };
  flights: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    fromLabel: string;
    toLabel: string;
    departLabel: string;
    cabinLabel: string;
    searchBtn: string;
    searching: string;
    configTitle: string;
    configSubtitle: string;
    checkedBags: string;
    seatPreference: string;
    seatAny: string;
    seatPreferred: string;
    seatExtraLegroom: string;
    sentinelActive: string;
    sentinelOff: string;
    duffelLiveRate: string;
    allInAtCost: string;
    publicOtaWithAddons: string;
    youSave: string;
    unpackFeesBtn: string;
    verifyPublicRateBtn: string;
    clearTicketBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    feeAuditTitle: string;
    categoryHeader: string;
    publicOtaHeader: string;
    atlasHeader: string;
  };
  lounges: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    allRegions: string;
    walkInRate: string;
    memberRate: string;
    perPass: string;
    getPassBtn: string;
    includedAmenities: string;
    generatePassBtn: string;
    scanInstructions: string;
    doneBtn: string;
  };
  hotels: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    searchDestination: string;
    checkIn: string;
    checkOut: string;
    roomsGuests: string;
    wholesaleRate: string;
    publicOtaPrice: string;
    instantSavings: string;
    viewSuiteBtn: string;
    bookAtCostBtn: string;
  };
  cruises: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    filterDestination: string;
    cabinCategories: string;
    onboardCredit: string;
    viewItineraryBtn: string;
  };
  footer: {
    tagline: string;
    downloadWhitepaper: string;
    wholesaleTravelTitle: string;
    fintechTitle: string;
    institutionalTitle: string;
    terms: string;
    privacy: string;
    rateParity: string;
    bankingDisclosures: string;
  };
}

export const NO_TRANSLATIONS: Translations = {
  common: {
    language: 'Norsk',
    startTrialNow: 'Start ditt prøvemedlemskap nå',
    signIn: 'Logg inn',
    signOut: 'Logg ut',
    save: 'Spar',
    verified: 'Verifisert',
    loading: 'Laster inn...',
    search: 'Søk',
    close: 'Lukk',
    allRightsReserved: 'Alle rettigheter reservert. Lukket medlemsbasert engrosklubb.',
    freeTrialBadge: '14 DAGER GRATIS',
  },
  nav: {
    hotels: 'Hoteller',
    flights: 'Flybilletter',
    lounges: 'VIP Lounger',
    cruises: 'Cruiser',
    savingsProof: 'Prisbevis',
    membership: 'Medlemskap',
    myBookings: 'Mine reiser',
    travelVault: 'Reisehvelv',
    concierge: 'Atlas Concierge',
    collapse: 'Minimer meny',
  },
  flights: {
    heroBadge: '0% PÅSLAG • NETTO FLYKLARING DIREKTE FRA FLYSELSKAP',
    heroTitle: 'Kommersiell Flyklarering',
    heroSubtitle: 'Direkte netto flypriser via IATA/NDC uten skjulte gebyrer, bagasjepåslag eller bestillingsgebyr. Inkluderer automatisert EU261 €600 forsinkelsesovervåking for alle medlemmer.',
    fromLabel: 'Fra (Flyplass / By)',
    toLabel: 'Til (Flyplass / By)',
    departLabel: 'Avreise',
    cabinLabel: 'Klasse',
    searchBtn: 'Søk fly',
    searching: 'Søker live...',
    configTitle: 'Konfigurer reisen samlet på forhånd:',
    configSubtitle: 'Velg bagasje og sitteplass nå – vanlige nettsider legger dette til trinn for trinn i kassen.',
    checkedBags: 'Innsjekket bagasje:',
    seatPreference: 'Sitteplass:',
    seatAny: 'Standard tilfeldig',
    seatPreferred: 'Vindu / Midtgang (+0%)',
    seatExtraLegroom: 'Ekstra benplass',
    sentinelActive: 'EU261 Overvåking: Aktiv (GRATIS)',
    sentinelOff: 'EU261 Overvåking: Av',
    duffelLiveRate: 'Duffel Live NDC Klareringspris',
    allInAtCost: 'alt inkludert til nettopris',
    publicOtaWithAddons: 'Offentlig nettpris med samme tilvalg (Expedia / OTA)',
    youSave: 'DU SPARER',
    unpackFeesBtn: 'Avdekk skjulte OTA-gebyrer',
    verifyPublicRateBtn: 'Bekreft offentlig pris',
    clearTicketBtn: 'Klarér billett',
    modalTitle: '0% Risiko Flyklareringsrapport',
    modalSubtitle: 'Direkte avregning mot flyselskapet uten fordyrende mellomledd',
    feeAuditTitle: 'Slik blåser kommersielle reisebyråer opp prisen på denne flyvningen',
    categoryHeader: 'Gebyrkategori & Tilvalg',
    publicOtaHeader: 'Offentlig OTA (Expedia)',
    atlasHeader: 'Atlas Klubb (Nettopris)',
  },
  lounges: {
    heroBadge: '1 400+ GLOBALE VIP-LOUNGER PÅ FLYPLASSER',
    heroTitle: 'VIP Flyplasslounger til Engrospris',
    heroSubtitle: 'Slipp unna overfylte terminaler. Nyt à la carte-måltider fra kokk, champagnebar, private marmordusjer og hvileområder for kun $32 per besøk (ordinær dørpris $65–$90).',
    searchPlaceholder: 'Søk flyplasskode, by eller lounge (f.eks. OSL, LHR, DXB, Bangkok)...',
    allRegions: 'Alle regioner',
    walkInRate: 'Ordinær dørpris:',
    memberRate: 'Medlemspris:',
    perPass: ' /pass',
    getPassBtn: 'Hent adgang',
    includedAmenities: 'Inkluderte VIP-fordeler:',
    generatePassBtn: 'Generer digitalt adgangspass ($32)',
    scanInstructions: 'Skann denne strekkoden i loungens resepsjon for umiddelbar adgang.',
    doneBtn: 'Ferdig',
  },
  hotels: {
    heroBadge: 'LUKKEDE ENGROSPRISER • OVER 1 MILLION HOTELLER',
    heroTitle: 'Hoteller til Ekte B2B Netto Engrospris',
    heroSubtitle: 'Få direkte tilgang til hemmelige hotellpriser som vanlige bestillingssider ikke har lov til å vise offentlig.',
    searchDestination: 'Hvor ønsker du å reise?',
    checkIn: 'Innsjekking',
    checkOut: 'Utsjekking',
    roomsGuests: 'Rom og gjester',
    wholesaleRate: 'Medlemspris (Engros)',
    publicOtaPrice: 'Ordinær nettpris (Booking/Expedia)',
    instantSavings: 'Direkte besparelse:',
    viewSuiteBtn: 'Se rom & suiter',
    bookAtCostBtn: 'Bestill til nettopris',
  },
  cruises: {
    heroBadge: 'ENGROS CRUISE • DIREKTE FRA REDERIER',
    heroTitle: 'Luksuscruise med Eksklusive Medlemsfordeler',
    heroSubtitle: 'Verdens ledende rederier til lukkede klubbpriser med inkludert kreditt om bord, drikkepakker og spesialrestauranter.',
    filterDestination: 'Velg reisemål',
    cabinCategories: 'Lugarkategorier',
    onboardCredit: 'Kreditt om bord inkludert:',
    viewItineraryBtn: 'Se seilingsrute & lugarer',
  },
  footer: {
    tagline: 'Den private reise- og fordelsklubben. Direkte B2B-engrospriser på hotell og fly, automatisk prisfallsbeskyttelse og medlemsdividender.',
    downloadWhitepaper: '📥 Last ned offisielt whitepaper (PDF)',
    wholesaleTravelTitle: 'Engros Reiser',
    fintechTitle: 'Finans & Fordeler',
    institutionalTitle: 'Institusjonelt & Dokumenter',
    terms: 'Brukervilkår',
    privacy: 'Personvern',
    rateParity: 'Prisparitets-etterlevelse',
    bankingDisclosures: 'Juridiske erklæringer',
  },
};

export const EN_TRANSLATIONS: Translations = {
  common: {
    language: 'English',
    startTrialNow: 'Start Your Trial Membership Now',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    save: 'Save',
    verified: 'Verified',
    loading: 'Loading...',
    search: 'Search',
    close: 'Close',
    allRightsReserved: 'All rights reserved. Closed-loop private wholesale travel club.',
    freeTrialBadge: '14 DAYS FREE TRIAL',
  },
  nav: {
    hotels: 'Hotels',
    flights: 'Flights',
    lounges: 'VIP Lounges',
    cruises: 'Cruises',
    savingsProof: 'Savings Proof',
    membership: 'Membership',
    myBookings: 'My Bookings',
    travelVault: 'Travel Vault',
    concierge: 'Atlas Concierge',
    collapse: 'Collapse',
  },
  flights: {
    heroBadge: '0% RETAIL MARKUP • AT-COST AIRLINE GDS/NDC CLEARING',
    heroTitle: 'Commercial Flight Clearing Hub',
    heroSubtitle: 'Direct airline net fares without OTA service charges, baggage markup, or hidden surcharges. Includes complimentary EU261 €600 delay monitoring on all member bookings.',
    fromLabel: 'From (Airport / City)',
    toLabel: 'To (Airport / City)',
    departLabel: 'Depart',
    cabinLabel: 'Cabin',
    searchBtn: 'Search Flights',
    searching: 'Searching live...',
    configTitle: 'Upfront All-In Trip Configuration:',
    configSubtitle: 'Configure luggage & seat needs upfront. OTAs add these step-by-step at checkout.',
    checkedBags: 'Checked Bags:',
    seatPreference: 'Seat:',
    seatAny: 'Standard Any',
    seatPreferred: 'Window / Aisle (+0%)',
    seatExtraLegroom: 'Extra Legroom',
    sentinelActive: 'EU261 Sentinel: Active (FREE)',
    sentinelOff: 'EU261 Sentinel: Off',
    duffelLiveRate: 'Duffel Live NDC All-In',
    allInAtCost: 'all add-ons at cost',
    publicOtaWithAddons: 'Public OTA With Same Add-ons (Expedia)',
    youSave: 'YOU SAVE',
    unpackFeesBtn: 'Unpack Hidden OTA Fees',
    verifyPublicRateBtn: 'Verify Public Rate',
    clearTicketBtn: 'Clear Ticket',
    modalTitle: '0% Risk Carrier Clearing Ledger',
    modalSubtitle: 'Direct carrier settlement with zero retail middleman commission',
    feeAuditTitle: 'How Commercial OTAs Inflate This Flight vs. Atlas Wholesale Settlement',
    categoryHeader: 'Fee Category & Add-on',
    publicOtaHeader: 'Public OTA (Expedia)',
    atlasHeader: 'Atlas Club (At-Cost)',
  },
  lounges: {
    heroBadge: '1,400+ GLOBAL VIP AIRPORT LOUNGES',
    heroTitle: 'VIP Lounges at Wholesale Net Rates',
    heroSubtitle: 'Escape crowded departure terminals. Enjoy à la carte chef dining, champagne bars, marble private shower suites, and quiet relaxation pods for just $32 / visit (vs. $65–$90 walk-in rates).',
    searchPlaceholder: 'Search airport code, city or lounge (e.g. OSL, LHR, DXB, Bangkok)...',
    allRegions: 'All Regions',
    walkInRate: 'Standard Walk-In:',
    memberRate: 'Member Pass Rate:',
    perPass: ' /pass',
    getPassBtn: 'Get Pass',
    includedAmenities: 'Included VIP Amenities:',
    generatePassBtn: 'Generate Instant Digital Pass ($32)',
    scanInstructions: 'Scan this digital barcode at the lounge reception desk for immediate entry.',
    doneBtn: 'Done',
  },
  hotels: {
    heroBadge: '1M+ WHOLESALE HOTELS • CLOSED-LOOP PARITY',
    heroTitle: 'Wholesale Hotel Settlement Hub',
    heroSubtitle: 'Access private B2B Bedbank wholesale rates protected behind password authentication, bypassing public OTA retail markups.',
    searchDestination: 'Where are you travelling?',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    roomsGuests: 'Rooms & Guests',
    wholesaleRate: 'Member Wholesale Rate',
    publicOtaPrice: 'Public Retail OTA (Booking/Expedia)',
    instantSavings: 'Instant Cash Saved:',
    viewSuiteBtn: 'View Rooms & Suites',
    bookAtCostBtn: 'Book At Cost',
  },
  cruises: {
    heroBadge: 'WHOLESALE CRUISES • DIRECT FROM CRUISE LINES',
    heroTitle: 'Luxury Ocean Cruises at Wholesale Net Rates',
    heroSubtitle: 'Sail on the world’s premier cruise liners with included onboard spending cash, beverage packages, and specialty dining.',
    filterDestination: 'Destination',
    cabinCategories: 'Cabin Categories',
    onboardCredit: 'Onboard Credit Included:',
    viewItineraryBtn: 'View Itinerary & Cabins',
  },
  footer: {
    tagline: 'The Private Wholesale Travel & Banking Club. Raw B2B Bedbank wholesale rates, reloadable Visa® debit cards, automated price-drop refunds, and annual profit dividends.',
    downloadWhitepaper: '📥 Download Official Whitepaper (PDF)',
    wholesaleTravelTitle: 'Wholesale Travel',
    fintechTitle: 'FinTech & Privileges',
    institutionalTitle: 'Institutional & Docs',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    rateParity: 'Rate Parity Compliance',
    bankingDisclosures: 'Banking Disclosures',
  },
};
