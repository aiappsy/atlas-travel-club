export interface DiscountVoucher {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15%, or 100 for $100
  currency: string; // 'USD', 'EUR', 'NOK', or 'ALL'
  minSpend: number; // in base USD or 0
  maxRedemptions: number;
  redemptionCount: number;
  expiresAt: string; // YYYY-MM-DD
  appliesTo: 'all' | 'hotels' | 'membership';
  isActive: boolean;
  createdAt: string;
}

export const INITIAL_DISCOUNT_VOUCHERS: DiscountVoucher[] = [
  {
    id: 'vch-atlas100',
    code: 'ATLAS100',
    description: '$100 Sovereign Credit on luxury hotel stays over $500',
    discountType: 'fixed',
    discountValue: 100,
    currency: 'USD',
    minSpend: 500,
    maxRedemptions: 500,
    redemptionCount: 42,
    expiresAt: '2026-12-31',
    appliesTo: 'hotels',
    isActive: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'vch-welcome20',
    code: 'WELCOME20',
    description: '20% Welcome reduction across hotels & annual membership tiers',
    discountType: 'percentage',
    discountValue: 20,
    currency: 'ALL',
    minSpend: 0,
    maxRedemptions: 1000,
    redemptionCount: 188,
    expiresAt: '2026-12-31',
    appliesTo: 'all',
    isActive: true,
    createdAt: '2026-01-15',
  },
  {
    id: 'vch-vipnok500',
    code: 'VIPNOK500',
    description: '500 NOK Nordic VIP Hotel Credit for Scandinavian stays',
    discountType: 'fixed',
    discountValue: 50, // ~$50 USD equivalent base
    currency: 'NOK',
    minSpend: 250,
    maxRedemptions: 250,
    redemptionCount: 67,
    expiresAt: '2026-11-30',
    appliesTo: 'hotels',
    isActive: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'vch-founder50',
    code: 'FOUNDER50',
    description: '$50 Founder Invitation Credit with 0 minimum spend',
    discountType: 'fixed',
    discountValue: 50,
    currency: 'USD',
    minSpend: 0,
    maxRedemptions: 300,
    redemptionCount: 95,
    expiresAt: '2026-12-31',
    appliesTo: 'all',
    isActive: true,
    createdAt: '2026-02-10',
  },
];

const STORAGE_KEY = 'atlas_discount_vouchers';

export function getStoredVouchers(): DiscountVoucher[] {
  if (typeof window === 'undefined') {
    return INITIAL_DISCOUNT_VOUCHERS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DISCOUNT_VOUCHERS));
      return INITIAL_DISCOUNT_VOUCHERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DISCOUNT_VOUCHERS;
  }
}

export function saveStoredVouchers(vouchers: DiscountVoucher[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
    } catch (e) {
      console.error('Failed to save vouchers to localStorage', e);
    }
  }
}

export interface VoucherValidationResult {
  valid: boolean;
  message: string;
  voucher?: DiscountVoucher;
  discountAmount: number;
  finalSubtotal: number;
}

export function validateVoucherCode(
  code: string,
  subtotal: number,
  currency: string = 'USD',
  target: 'hotels' | 'membership' = 'hotels',
  vouchersList: DiscountVoucher[] = INITIAL_DISCOUNT_VOUCHERS
): VoucherValidationResult {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, message: 'Please enter a voucher or promo code.', discountAmount: 0, finalSubtotal: subtotal };
  }

  const voucher = vouchersList.find((v) => v.code.toUpperCase() === cleanCode);
  if (!voucher) {
    return { valid: false, message: `Voucher code "${cleanCode}" is invalid.`, discountAmount: 0, finalSubtotal: subtotal };
  }

  if (!voucher.isActive) {
    return { valid: false, message: `Voucher code "${cleanCode}" has been deactivated.`, discountAmount: 0, finalSubtotal: subtotal };
  }

  // Check expiration
  if (voucher.expiresAt) {
    const expiry = new Date(voucher.expiresAt + 'T23:59:59Z');
    if (new Date() > expiry) {
      return { valid: false, message: `Voucher code "${cleanCode}" expired on ${voucher.expiresAt}.`, discountAmount: 0, finalSubtotal: subtotal };
    }
  }

  // Check usage limit
  if (voucher.maxRedemptions && voucher.redemptionCount >= voucher.maxRedemptions) {
    return { valid: false, message: `Voucher code "${cleanCode}" has reached its maximum redemption limit.`, discountAmount: 0, finalSubtotal: subtotal };
  }

  // Check target eligibility
  if (voucher.appliesTo !== 'all' && voucher.appliesTo !== target) {
    return {
      valid: false,
      message: `Voucher code "${cleanCode}" applies only to ${voucher.appliesTo === 'hotels' ? 'hotel stays' : 'membership subscriptions'}.`,
      discountAmount: 0,
      finalSubtotal: subtotal,
    };
  }

  // Check minimum spend
  if (voucher.minSpend > 0 && subtotal < voucher.minSpend) {
    return {
      valid: false,
      message: `Voucher code "${cleanCode}" requires a minimum spend of $${voucher.minSpend}. (Current: $${Math.round(subtotal)})`,
      discountAmount: 0,
      finalSubtotal: subtotal,
    };
  }

  // Calculate discount
  let discountAmount = 0;
  if (voucher.discountType === 'percentage') {
    discountAmount = (subtotal * voucher.discountValue) / 100;
  } else {
    // Fixed amount
    discountAmount = voucher.discountValue;
  }

  // Cap discount at subtotal
  discountAmount = Math.min(discountAmount, subtotal);
  discountAmount = Math.round(discountAmount * 100) / 100;
  const finalSubtotal = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100);

  return {
    valid: true,
    message: `${voucher.discountType === 'percentage' ? voucher.discountValue + '% off' : '$' + voucher.discountValue + ' credit'} applied successfully!`,
    voucher,
    discountAmount,
    finalSubtotal,
  };
}
