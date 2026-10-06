import { NextRequest, NextResponse } from 'next/server';
import {
  calculateFlightClearingSummary,
  FLIGHT_LEGAL_DISCLOSURES,
} from '@/lib/flights/flightPolicy';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fareParam = parseFloat(searchParams.get('fare') || '450');
    const taxesParam = parseFloat(searchParams.get('taxes') || '45');
    const paymentMode =
      (searchParams.get('mode') as 'card_pass_through' | 'atlas_merchant') ||
      'card_pass_through';

    const calculation = calculateFlightClearingSummary(fareParam, taxesParam, paymentMode);

    return NextResponse.json({
      success: true,
      clubGuarantee: {
        retailMarkup: '0%',
        model: 'Closed-Loop At-Cost Airline Clearing',
        financialRiskToClub: '$0.00 (Zero Capital Exposure)',
      },
      calculation,
      legalDisclosures: FLIGHT_LEGAL_DISCLOSURES,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error calculating flight policy' },
      { status: 500 }
    );
  }
}
