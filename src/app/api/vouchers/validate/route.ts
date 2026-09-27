import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_DISCOUNT_VOUCHERS, validateVoucherCode, DiscountVoucher } from '@/lib/vouchers';

// GET: List active discount vouchers for public/member or admin reference
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('target') as 'all' | 'hotels' | 'membership' | null;

    let vouchers = INITIAL_DISCOUNT_VOUCHERS.filter((v) => v.isActive);
    if (target && target !== 'all') {
      vouchers = vouchers.filter((v) => v.appliesTo === 'all' || v.appliesTo === target);
    }

    return NextResponse.json({
      success: true,
      count: vouchers.length,
      vouchers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve vouchers' },
      { status: 500 }
    );
  }
}

// POST: Validate voucher code against booking/membership parameters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal, currency = 'USD', target = 'hotels', customVouchers } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, message: 'Please provide a voucher code.' },
        { status: 400 }
      );
    }

    // Merge in any custom vouchers dynamically passed from admin localStorage
    const vouchersList: DiscountVoucher[] = Array.isArray(customVouchers) && customVouchers.length > 0
      ? customVouchers
      : INITIAL_DISCOUNT_VOUCHERS;

    const result = validateVoucherCode(
      code,
      Number(subtotal) || 0,
      currency,
      target,
      vouchersList
    );

    if (!result.valid) {
      return NextResponse.json(
        {
          valid: false,
          message: result.message,
          discountAmount: 0,
          finalSubtotal: Number(subtotal) || 0,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: result.voucher?.code,
      voucherId: result.voucher?.id,
      discountType: result.voucher?.discountType,
      discountValue: result.voucher?.discountValue,
      discountAmount: result.discountAmount,
      finalSubtotal: result.finalSubtotal,
      message: result.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, message: error.message || 'Error validating voucher code' },
      { status: 500 }
    );
  }
}
