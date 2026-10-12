import { NextRequest, NextResponse } from 'next/server';
import { atlasCentralBrain } from '@/lib/orchestrator/atlasBrain';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const query = await request.json();
    const itinerary = await atlasCentralBrain.buildSynchronizedTrip(query);

    return NextResponse.json({
      success: true,
      itinerary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Atlas Brain failed to assemble itinerary' },
      { status: 500 }
    );
  }
}
