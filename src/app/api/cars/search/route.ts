import { NextRequest, NextResponse } from 'next/server';
import { DuffelCarsProvider, DuffelCarSearchParams } from '@/lib/providers/duffelCars';

/**
 * GET /api/cars/search
 * 
 * Atlas Travel Club — Car Rental Search Endpoint
 * Policy:
 * - 0 kr Club Markup: Member pays the raw wholesale/direct B2B price with 0 kr fee.
 * - Atlas earns 8% - 12% cash commission directly from Duffel.
 * - Outperforms Expedia retail pricing by ~15-20%.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = parseFloat(searchParams.get('lat') || '43.6653'); // Default: Nice Airport (NCE)
    const lng = parseFloat(searchParams.get('lng') || '7.2150');
    const pickupDate = searchParams.get('pickupDate') || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
    const pickupTime = searchParams.get('pickupTime') || '10:00';
    const dropoffDate = searchParams.get('dropoffDate') || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0];
    const dropoffTime = searchParams.get('dropoffTime') || '10:00';
    const driverAge = parseInt(searchParams.get('driverAge') || '35', 10);
    const category = searchParams.get('category') as any;

    const provider = new DuffelCarsProvider();

    const searchCriteria: DuffelCarSearchParams = {
      pickupLocation: {
        latitude: lat,
        longitude: lng,
        radiusKm: 15,
        locationName: searchParams.get('locationName') || 'Nice Côte d\'Azur Airport (NCE)',
        iataCode: searchParams.get('iata') || 'NCE',
      },
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverAge,
      driverCountryCode: 'NO',
      vehicleCategory: category || 'All',
    };

    const results = await provider.searchCars(searchCriteria);

    return NextResponse.json({
      ...results,
      timestamp: new Date().toISOString(),
      policy: {
        markupPolicy: '0 kr Club Markup (100% Raw B2B Net Rate)',
        atlasClubMarkup: 0,
        monetization: '8% - 12% backend volume commission paid by consolidator',
        paymentRail: 'Credit card guarantee (pay at counter upon vehicle collection)',
        workingCapitalRequired: '0 kr',
      },
    });
  } catch (error: any) {
    console.error('[API Cars Search Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to search cars',
      },
      { status: 500 }
    );
  }
}
