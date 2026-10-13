/**
 * ATLAS Travel Club — Rewards & Points Engine Rules
 * Enforces liquidity guards, vesting schedules, redemption caps, and treasury safety.
 */

export interface WalletTransaction {
  id: string;
  type: 'EARN_PENDING' | 'EARN_CLEARED' | 'REDEEM' | 'EXPIRE' | 'REVOKE';
  points: number;
  cashValueUsd: number;
  referenceType: 'CRUISE' | 'HOTEL' | 'FLIGHT' | 'CARS' | 'MEMBERSHIP';
  referenceId: string;
  status: 'PENDING' | 'CLEARED' | 'CANCELLED';
  description: string;
  createdAt: string;
  vestingDate?: string;
}

export interface MemberWallet {
  userId: string;
  tier: 'SILVER' | 'GOLD' | 'PLATINUM' | 'FOUNDER';
  pointsBalance: number;       // Cleared, available to spend
  pendingPoints: number;       // In escrow awaiting partner payout
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  lastActivityDate: string;
  history: WalletTransaction[];
}

export const REWARDS_CONFIG = {
  // Valuation: 100 Points = $1.00 USD (10 NOK / £0.80 GBP)
  POINTS_PER_USD: 100,
  USD_PER_POINT: 0.01,
  NOK_PER_POINT: 0.10,
  GBP_PER_POINT: 0.008,

  // Liquidity Guards
  MIN_REDEMPTION_POINTS: 5000,      // $50 minimum floor
  REDEMPTION_INCREMENT: 1000,       // $10 increments
  MAX_REDEMPTION_PERCENTAGE: 0.50,  // Max 50% can be paid in points (50% real card cash required)
  
  // Vesting Delays (Days after completion of travel)
  VESTING_DAYS_CRUISE: 14,          // Clears 14 days post-cruise completion
  VESTING_DAYS_HOTEL: 7,            // Clears 7 days post-checkout
  VESTING_DAYS_FLIGHT: 3,           // Clears 3 days post-flight

  // Expiration
  EXPIRATION_MONTHS_INACTIVE: 18,   // 18 months rolling inactivity clause

  // Treasury Safety
  MIN_WISE_TREASURY_BUFFER_USD: 5000, // Hard stop on Wise VCC if balance drops below $5k

  // Earning Rates (% back on booking total in points)
  EARN_RATES: {
    SILVER: 0.05,    // 5% back
    GOLD: 0.07,      // 7% back
    PLATINUM: 0.09,  // 9% back
    FOUNDER: 0.10,   // 10% back
  }
};

/**
 * Calculate how many points can be applied to a booking given total price and member balance
 */
export function calculateRedemptionEligibility(
  bookingTotalUsd: number,
  availablePoints: number
): {
  isEligible: boolean;
  maxPointsUsd: number;
  maxPoints: number;
  minPoints: number;
  reason?: string;
} {
  const maxAllowedUsd = bookingTotalUsd * REWARDS_CONFIG.MAX_REDEMPTION_PERCENTAGE;
  const maxAllowedPoints = Math.floor(maxAllowedUsd * REWARDS_CONFIG.POINTS_PER_USD);

  if (availablePoints < REWARDS_CONFIG.MIN_REDEMPTION_POINTS) {
    return {
      isEligible: false,
      maxPointsUsd: 0,
      maxPoints: 0,
      minPoints: REWARDS_CONFIG.MIN_REDEMPTION_POINTS,
      reason: `Minimum ${REWARDS_CONFIG.MIN_REDEMPTION_POINTS.toLocaleString()} points required to redeem ($${(REWARDS_CONFIG.MIN_REDEMPTION_POINTS * REWARDS_CONFIG.USD_PER_POINT).toFixed(2)}).`
    };
  }

  const redeemablePoints = Math.min(availablePoints, maxAllowedPoints);
  const roundedPoints = Math.floor(redeemablePoints / REWARDS_CONFIG.REDEMPTION_INCREMENT) * REWARDS_CONFIG.REDEMPTION_INCREMENT;

  return {
    isEligible: roundedPoints >= REWARDS_CONFIG.MIN_REDEMPTION_POINTS,
    maxPointsUsd: roundedPoints * REWARDS_CONFIG.USD_PER_POINT,
    maxPoints: roundedPoints,
    minPoints: REWARDS_CONFIG.MIN_REDEMPTION_POINTS
  };
}

/**
 * Calculate points earned on a completed booking
 */
export function calculatePointsEarned(
  bookingTotalUsd: number,
  tier: 'SILVER' | 'GOLD' | 'PLATINUM' | 'FOUNDER' = 'SILVER'
): number {
  const rate = REWARDS_CONFIG.EARN_RATES[tier] || REWARDS_CONFIG.EARN_RATES.SILVER;
  const earnValueUsd = bookingTotalUsd * rate;
  return Math.round(earnValueUsd * REWARDS_CONFIG.POINTS_PER_USD);
}
