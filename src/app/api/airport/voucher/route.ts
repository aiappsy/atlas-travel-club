import { NextRequest, NextResponse } from 'next/server';
import { dragonPassProvider, DragonPassServiceCategory } from '@/lib/providers/dragonpass';

/**
 * POST /api/airport/voucher
 * 
 * Issues an on-demand digital QR voucher for Lounge, Fast Track, Dining, eSIM, or Spa.
 * Zero advance working capital.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceCategory, serviceId, memberId, guestName, airportCode } = body;

    if (!serviceCategory || !serviceId) {
      return NextResponse.json(
        { success: false, error: 'Missing serviceCategory or serviceId' },
        { status: 400 }
      );
    }

    const voucher = await dragonPassProvider.issueUniversalVoucher({
      serviceCategory: serviceCategory as DragonPassServiceCategory,
      serviceId,
      memberId: memberId || 'mem_demo_101',
      guestName: guestName || 'Atlas Member',
      airportCode: airportCode || 'NCE',
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      voucher,
    });
  } catch (err: any) {
    console.error('[API Voucher Issue Error]', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to issue voucher' },
      { status: 500 }
    );
  }
}
