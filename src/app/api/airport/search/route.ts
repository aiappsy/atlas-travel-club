import { NextRequest, NextResponse } from 'next/server';
import { dragonPassProvider } from '@/lib/providers/dragonpass';

/**
 * GET /api/airport/search?iata=NCE
 * 
 * Atlas Travel Club — Airport Perks & Ancillaries Hub
 * Searches all DragonPass capabilities:
 * 1. Lounges
 * 2. Fast Track Security
 * 3. Airport Dining Offers
 * 4. Global eSIM Connectivity
 * 5. Airport Spa & Rest Pods
 * 6. Airport Chauffeur Transfers
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const iata = (searchParams.get('iata') || 'NCE').trim().toUpperCase();

    const perks = await dragonPassProvider.searchAirportPerks(iata);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      policy: {
        markupPolicy: '0 kr Club Markup (100% Raw B2B Net Cost Passed Directly to Member)',
        atlasClubMarkup: 0,
        workingCapitalRequired: '0 kr (On-demand QR e-voucher issuance)',
        monetization: 'Funded via Annual Membership Dues & Volume Tiers',
      },
      data: perks,
    });
  } catch (err: any) {
    console.error('[API Airport Search Error]', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to search airport perks' },
      { status: 500 }
    );
  }
}
