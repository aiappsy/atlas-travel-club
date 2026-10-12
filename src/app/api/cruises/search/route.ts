import { NextRequest, NextResponse } from 'next/server';
import { traveltekProvider } from '@/lib/providers/traveltek';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const destination = searchParams.get('destination') || searchParams.get('dest') || '';
    const cruiseLine = searchParams.get('line') || searchParams.get('cruiseLine') || '';
    const dateFrom = searchParams.get('dateFrom') || '';

    const cruises = await traveltekProvider.searchCruises({
      destination,
      cruiseLine,
      dateFrom,
    });

    return NextResponse.json({
      success: true,
      provider: 'traveltek',
      total: cruises.length,
      cruises,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to search cruises' },
      { status: 500 }
    );
  }
}
