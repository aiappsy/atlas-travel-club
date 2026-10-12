import { NextRequest, NextResponse } from 'next/server';
import { dragonPassProvider } from '@/lib/providers/dragonpass';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, guestName, loungeId } = body;

    if (!memberId || !guestName || !loungeId) {
      return NextResponse.json(
        { success: false, error: 'Missing memberId, guestName, or loungeId' },
        { status: 400 }
      );
    }

    const voucher = await dragonPassProvider.generateLoungePass({
      memberId,
      guestName,
      loungeId,
    });

    return NextResponse.json({
      success: true,
      voucher,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate lounge pass' },
      { status: 500 }
    );
  }
}
