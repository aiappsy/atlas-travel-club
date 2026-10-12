import { NextRequest, NextResponse } from 'next/server';
import { duffelProvider } from '@/lib/providers/duffel';
import { resolveAirportIata } from '@/lib/flights/airportResolver';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawOrigin = (searchParams.get('origin') || 'LHR').trim();
    const rawDest = (searchParams.get('destination') || 'JFK').trim();
    
    // Automatically resolve city names like 'oslo', 'bangkok', 'paris' to IATA codes
    const origin = resolveAirportIata(rawOrigin, 'LHR');
    const destination = resolveAirportIata(rawDest, 'JFK');

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
