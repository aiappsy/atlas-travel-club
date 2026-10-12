import { NextRequest, NextResponse } from 'next/server';
import { atlasCentralBrain } from '@/lib/orchestrator/atlasBrain';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const bookingReq = await request.json();
    const result = await atlasCentralBrain.executeAtomicTripBooking(bookingReq);

    return NextResponse.json({
      success: result.success,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Atlas Brain atomic booking execution failed' },
      { status: 500 }
    );
  }
}
