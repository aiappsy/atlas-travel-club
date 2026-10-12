import { NextRequest, NextResponse } from 'next/server';
import { traveltekProvider } from '@/lib/providers/traveltek';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cruiseId = params.id;
    const cruise = await traveltekProvider.getCruiseDetails(cruiseId);

    if (!cruise) {
      return NextResponse.json(
        { success: false, error: 'Cruise itinerary not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      cruise,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch cruise details' },
      { status: 500 }
    );
  }
}
