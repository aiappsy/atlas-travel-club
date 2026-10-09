import { B2BOrganization, B2BEvaluationEstimate } from './types';

export const INITIAL_B2B_ORGANIZATIONS: B2BOrganization[] = [
  {
    id: 'org-agenturer-no',
    slug: 'agenturer-no',
    name: 'Agenturer.no Nordic Network',
    shortName: 'Agenturer.no',
    tagline: 'Nordens ledende portal for selvstendige salgsagenter og agenter',
    primaryColor: '#2563EB',
    allowedEmailDomains: ['agenturer.no', 'salgsagent.no'],
    agreementType: 'member_benefit',
    seatCount: 500,
    seatsClaimed: 142,
    contactPerson: {
      name: 'Lars Hellestraae',
      email: 'post@agenturer.no',
      role: 'Daglig Leder',
    },
    agentReferralId: 'lars_agenturer_no',
    customWelcomeMessage:
      'Velkommen til agentnettverkets eksklusive reisefordel. Som godkjent agent hos Agenturer.no får du tilgang til lukkede engrospriser på hotell og fly uten fordyrende mellomledd.',
    discountPercentage: 35,
    annualFeePerSeatNok: 640,
    estimatedSavingsYtdNok: 312000,
    features: [
      'Ubegrenset tilgang til 1 000 000+ engroshoteller (WebBeds)',
      'Direkte flyavtaler med 0 % OTA-påslag (Duffel NDC)',
      'Automatisk EU261 €600 forsinkelsesovervåking',
      'Digitalt Atlas Agent-pass for Apple & Google Wallet',
      'Egne fakturaer med MVA-spesifikasjon for fradrag',
    ],
  },
  {
    id: 'org-tekna',
    slug: 'tekna',
    name: 'Tekna – Teknisk-naturvitenskapelig forening',
    shortName: 'Tekna',
    tagline: 'Eksklusiv medlemsfordel for 105 000 ingeniører og teknologer',
    primaryColor: '#007272',
    allowedEmailDomains: ['tekna.no', 'student.tekna.no'],
    agreementType: 'member_benefit',
    seatCount: 10000,
    seatsClaimed: 2410,
    contactPerson: {
      name: 'Medlemsfordeler Tekna',
      email: 'fordel@tekna.no',
      role: 'Avdelingsleder Medlemsservice',
    },
    customWelcomeMessage:
      'Som Tekna-medlem reiser du med markedets beste vilkår. Bestill forretningsreiser og ferier direkte til engrospris, med heldekkende EU261-passasjerbeskyttelse inkludert.',
    discountPercentage: 40,
    annualFeePerSeatNok: 590,
    estimatedSavingsYtdNok: 1840000,
    features: [
      'Garantert engrospris på alle hotellbestillinger',
      'Ingen kredittkortpåslag på flybilletter',
      'EU261 forsinkelsesrefusjon inntil €600 rett til medlemmets konto',
      'Familie-tillegg (dekker inntil 4 personer per husstand)',
    ],
  },
  {
    id: 'org-dnb',
    slug: 'dnb',
    name: 'DNB Bank ASA Corporate Fleet',
    shortName: 'DNB',
    tagline: 'Foretaksavtale for konsern- og tjenestereiser',
    primaryColor: '#005959',
    allowedEmailDomains: ['dnb.no'],
    agreementType: 'employer_sponsored',
    seatCount: 1200,
    seatsClaimed: 890,
    contactPerson: {
      name: 'Corporate Procurement',
      email: 'travel@dnb.no',
      role: 'Global Travel & Expense Manager',
    },
    customWelcomeMessage:
      'DNB Foretaksportal. Reisepolicy og kostnadsoptimalisering for ansatte i DNB. Alle bestillinger bokføres automatisk med konsernets MVA-koder.',
    discountPercentage: 50,
    annualFeePerSeatNok: 490,
    estimatedSavingsYtdNok: 4250000,
    features: [
      'Full integrasjon mot konsernets kostnadsrapportering',
      'Prioritert 24/7 VIP Travel Desk & Disruption Rebooking',
      'Automatisk kravhåndtering ved forsinkelser via Atlas Sentinel',
      'Sentralisert samlefaktura per avdeling',
    ],
  },
];

export function getOrganizationBySlug(slug: string): B2BOrganization | null {
  const clean = slug.toLowerCase().trim();
  return INITIAL_B2B_ORGANIZATIONS.find((o) => o.slug === clean) || null;
}

export function getOrganizationByEmail(email: string): B2BOrganization | null {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase().trim();
  return (
    INITIAL_B2B_ORGANIZATIONS.find((o) =>
      o.allowedEmailDomains.some((d) => d.toLowerCase() === domain)
    ) || null
  );
}

/**
 * Calculates business ROI for team sizes
 */
export function calculateB2BSavings(seats: number): B2BEvaluationEstimate {
  let annualCostPerSeat = 990;
  if (seats >= 200) {
    annualCostPerSeat = 350;
  } else if (seats >= 50) {
    annualCostPerSeat = 490;
  } else if (seats >= 10) {
    annualCostPerSeat = 690;
  }

  const totalCost = seats * annualCostPerSeat;
  // Average employee takes 3 trips per year:
  // Hotel savings: 3 stays * 2 nights * 450 kr saving/night = 2,700 kr/employee
  const hotelSavings = seats * 2700;
  // Flight savings (OTA fee + GDS fee elimination): 3 flights * 350 kr = 1,050 kr/employee
  const flightSavings = seats * 1050;
  const totalSavings = hotelSavings + flightSavings;
  const netSavings = Math.max(0, totalSavings - totalCost);
  const roi = Math.round((totalSavings / (totalCost || 1)) * 10) / 10;

  return {
    seatCount: seats,
    annualCostPerSeatNok: annualCostPerSeat,
    totalAnnualCostNok: totalCost,
    estimatedHotelSavingsNok: hotelSavings,
    estimatedFlightSavingsNok: flightSavings,
    netEstimatedAnnualSavingsNok: netSavings,
    estimatedRoiRatio: roi,
  };
}
