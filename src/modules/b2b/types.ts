export type B2BAgreementType = 'employer_sponsored' | 'member_benefit';

export interface B2BOrganization {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  logoUrl?: string;
  primaryColor: string; // Brand accent hex (e.g. '#007272')
  allowedEmailDomains: string[]; // Whitelisted domains e.g. ['dnb.no', 'tekna.no']
  agreementType: B2BAgreementType;
  seatCount: number;
  seatsClaimed: number;
  contactPerson: {
    name: string;
    email: string;
    role: string;
  };
  agentReferralId?: string; // e.g. 'agenturer_no_lars'
  customWelcomeMessage: string;
  discountPercentage: number;
  annualFeePerSeatNok: number;
  estimatedSavingsYtdNok: number;
  features: string[];
}

export interface B2BEvaluationEstimate {
  seatCount: number;
  annualCostPerSeatNok: number;
  totalAnnualCostNok: number;
  estimatedHotelSavingsNok: number;
  estimatedFlightSavingsNok: number;
  netEstimatedAnnualSavingsNok: number;
  estimatedRoiRatio: number;
}
