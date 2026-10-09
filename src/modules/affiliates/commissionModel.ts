import { PartnerIncomeSimulation } from './types';

export const PARTNER_RULES = {
  annualMembershipFeeNok: 990,
  threeAndFreeThreshold: 3,
  directMemberCommissionNok: 270, // 270 NOK per year per active direct recruit (recruit 4+)
  tier2OverrideCommissionNok: 90, // 90 NOK per year per active squad recruit
  b2bCorporateCommissionPercent: 0.20, // 20% recurring on corporate contracts
  avgB2BSeatPriceNok: 490, // Average enterprise seat price (50-200 seats)
};

export function calculatePartnerEarnings(params: {
  directMembers: number;
  tier2Members: number;
  corporateDeals: number;
  avgSeatsPerDeal?: number;
}): PartnerIncomeSimulation {
  const direct = Math.max(0, params.directMembers);
  const tier2 = Math.max(0, params.tier2Members);
  const corpDeals = Math.max(0, params.corporateDeals);
  const seatsPerDeal = params.avgSeatsPerDeal || 50;

  // 1. B2C Direct:
  // Recruits 1-3 waive the 990 kr fee (valuable perk). Recruits 4+ pay 270 NOK each.
  const isMembershipFree = direct >= PARTNER_RULES.threeAndFreeThreshold;
  const payingDirectRecruits = Math.max(0, direct - PARTNER_RULES.threeAndFreeThreshold);
  const b2cDirectIncome = payingDirectRecruits * PARTNER_RULES.directMemberCommissionNok;

  // 2. B2C Tier 2 Squad Override:
  // 90 NOK per active squad member
  const b2cTier2Income = tier2 * PARTNER_RULES.tier2OverrideCommissionNok;

  // 3. B2B Corporate Fleet Income:
  // corporateDeals * seats * 490 kr * 20%
  const b2bTotalVolumeNok = corpDeals * seatsPerDeal * PARTNER_RULES.avgB2BSeatPriceNok;
  const b2bCorporateIncome = Math.round(b2bTotalVolumeNok * PARTNER_RULES.b2bCorporateCommissionPercent);

  const totalAnnual = b2cDirectIncome + b2cTier2Income + b2bCorporateIncome;
  const monthlyAvg = Math.round(totalAnnual / 12);

  return {
    directMembersCount: direct,
    tier2MembersCount: tier2,
    corporateDealsCount: corpDeals,
    avgSeatsPerDeal: seatsPerDeal,
    b2cDirectAnnualIncomeNok: b2cDirectIncome,
    b2cTier2AnnualIncomeNok: b2cTier2Income,
    b2bCorporateAnnualIncomeNok: b2bCorporateIncome,
    totalAnnualIncomeNok: totalAnnual,
    monthlyAverageNok: monthlyAvg,
    isMembershipFree,
  };
}
