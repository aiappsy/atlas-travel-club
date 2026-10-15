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
    lounges: 'VIP-lounger',
    cruises: 'Cruise',
    savingsProof: 'Prissjekk',
    membership: 'Medlemskap',
    myBookings: 'Mine reiser',
    travelVault: 'Reisekreditter',
    concierge: 'Atlas Concierge',
    collapse: 'Minimer meny',
  },
  flights: {
    heroBadge: '0 KR I PÅSLAG • NETTOPRIS DIREKTE FRA FLYSELSKAPET',
    heroTitle: 'Flybilletter til nettopris',
    heroSubtitle: 'Direkte netto flypriser via IATA NDC uten skjulte bestillingsgebyrer eller påslag. Inkluderer automatisert EU261-erstatningsovervåking opptil 600 € for alle medlemmer.',
    fromLabel: 'Fra (flyplass / by)',
    toLabel: 'Til (flyplass / by)',
    departLabel: 'Avreise',
    cabinLabel: 'Kabin og seteklasse',
    searchBtn: 'Søk flybilletter',
    searching: 'Søker i sanntid...',
    configTitle: 'Konfigurer reisen samlet på forhånd:',
    configSubtitle: 'Velg bagasje og sitteplass nå – vanlige nettsider legger dette til trinn for trinn i kassen.',
    checkedBags: 'Innsjekket bagasje:',
    seatPreference: 'Sitteplass:',
    seatAny: 'Standard tilfeldig',
    seatPreferred: 'Vindu / midtgang (+0%)',
    seatExtraLegroom: 'Ekstra benplass',
    sentinelActive: 'EU261-overvåking: Aktiv (GRATIS)',
    sentinelOff: 'EU261-overvåking: Av',
    duffelLiveRate: 'Duffel Live NDC nettopris',
    allInAtCost: 'alt inkludert til nettopris',
    publicOtaWithAddons: 'Offentlig nettpris med samme tilvalg (Expedia / OTA)',
    youSave: 'DU SPARER',
    unpackFeesBtn: 'Avdekk skjulte gebyrer hos andre',
    verifyPublicRateBtn: 'Bekreft offentlig pris',
    clearTicketBtn: 'Se billettpris',
    modalTitle: 'Gjennomsiktig prissammenligning',
    modalSubtitle: 'Direkte oppgjør mot flyselskapet uten fordyrende mellomledd',
    feeAuditTitle: 'Slik legger vanlige bestillingssider på ekstra gebyrer',
    categoryHeader: 'Kategori og tilvalg',
    publicOtaHeader: 'Offentlig reisebyrå (Expedia)',
    atlasHeader: 'Atlas Club (nettopris)',
  },
  lounges: {
    heroBadge: '1 400+ GLOBALE VIP-LOUNGER PÅ FLYPLASSER',
    heroTitle: 'VIP-lounger til B2B-engrospris',
    heroSubtitle: 'Slipp unna overfylte terminaler. Nyt à la carte-måltider, drikke, private dusjer og rolige arbeidsområder for kun 330 kr per besøk (ordinær dørpris 700–950 kr).',
    searchPlaceholder: 'Søk på flyplasskode, by eller lounge (f.eks. OSL, LHR, DXB, Bangkok)...',
    allRegions: 'Alle regioner',
    walkInRate: 'Ordinær dørpris:',
    memberRate: 'Medlemspris:',
    perPass: ' /pass',
    getPassBtn: 'Hent adgang',
    includedAmenities: 'Inkluderte VIP-fordeler:',
    generatePassBtn: 'Hent digitalt adgangspass (330 kr)',
    scanInstructions: 'Skann denne strekkoden i loungens resepsjon for umiddelbar adgang.',
    doneBtn: 'Ferdig',
  },
  hotels: {
    heroBadge: 'LUKKEDE ENGROSPRISER • OVER 1 MILLION HOTELLER',
    heroTitle: 'Hoteller til ekte B2B-engrospriser',
    heroSubtitle: 'Få direkte tilgang til lukkede hotellpriser som vanlige bestillingssider ikke har lov til å vise offentlig.',
    searchDestination: 'Hvor ønsker du å reise?',
    checkIn: 'Innsjekking',
    checkOut: 'Utsjekking',
    roomsGuests: 'Rom og gjester',
    wholesaleRate: 'Medlemspris (engros)',
    publicOtaPrice: 'Ordinær nettpris (Booking / Expedia)',
    instantSavings: 'Din besparelse:',
    viewSuiteBtn: 'Se rom og suiter',
    bookAtCostBtn: 'Bestill til nettopris',
  },
  cruises: {
    heroBadge: 'B2B-CRUISE • DIREKTE FRA REDERIENE',
    heroTitle: 'Luksuscruise med eksklusive medlemsfordeler',
    heroSubtitle: 'Verdens ledende rederier til faste priser, med 50% av provisjonen rett tilbake til din konto som Atlas Travel Kickback.',
    filterDestination: 'Velg reisemål',
    cabinCategories: 'Lugarkategorier',
    onboardCredit: 'Kreditt om bord inkludert:',
    viewItineraryBtn: 'Se seilingsrute og lugarer',
  },
  footer: {
    tagline: 'Den private reise- og medlemsklubben. Direkte B2B-engrospriser på hotell og fly, automatisert prisfallsbeskyttelse og medlemsbonuser.',
    downloadWhitepaper: '📥 Last ned offisielt whitepaper (PDF)',
    wholesaleTravelTitle: 'Engrosreiser',
    fintechTitle: 'Medlemsfordeler',
    institutionalTitle: 'Vilkår og dokumenter',
    terms: 'Brukervilkår',
    privacy: 'Personvernerklæring',
    rateParity: 'Prisparitet og etterlevelse',
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
