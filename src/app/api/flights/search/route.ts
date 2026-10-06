import { NextRequest, NextResponse } from 'next/server';
import { duffelProvider } from '@/lib/providers/duffel';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = (searchParams.get('origin') || 'LHR').trim().toUpperCase();
    const destination = (searchParams.get('destination') || 'JFK').trim().toUpperCase();
    const departureDate =
      searchParams.get('departureDate') ||
      new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
    const cabin =
      (searchParams.get('cabinClass')?.toLowerCase() as
        | 'economy'
        | 'premium_economy'
        | 'business'
        | 'first') || 'business';
    const adults = parseInt(searchParams.get('adults') || '1', 10);

    const flights = await duffelProvider.searchFlights({
      origin,
      destination,
      departureDate,
      cabinClass: cabin,
      adults,
    });

    return NextResponse.json({
      success: true,
      provider: 'duffel',
      origin,
      destination,
      departureDate,
      cabinClass: cabin,
      totalOffers: flights.length,
      flights,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to search live flight offers',
      },
      { status: 500 }
    );
  }
}
