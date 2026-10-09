export interface PartnerCommissionModel {
  membershipPriceNok: number; // 990 NOK
  threeAndFreeThreshold: number; // 3 members = own fee waived
  directCommissionPerMemberNok: number; // 270 NOK (approx €24)
  tier2OverridePerMemberNok: number; // 90 NOK (approx €8)
  b2bCorporateCommissionPercent: number; // 20% recurring
}

export interface PartnerIncomeSimulation {
  directMembersCount: number;
  tier2MembersCount: number;
  corporateDealsCount: number;
  avgSeatsPerDeal: number;
  b2cDirectAnnualIncomeNok: number;
  b2cTier2AnnualIncomeNok: number;
  b2bCorporateAnnualIncomeNok: number;
  totalAnnualIncomeNok: number;
  monthlyAverageNok: number;
  isMembershipFree: boolean;
}

export interface PartnerApplicationData {
  fullName: string;
  email: string;
  phone: string;
  companyOrOrg?: string;
  partnerType: 'b2b_agent' | 'digital_creator' | 'travel_professional' | 'community_leader';
  estimatedReach: string;
  notes?: string;
}
