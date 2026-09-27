import { NextRequest, NextResponse } from 'next/server';
import { hotelbedsProvider } from '@/lib/providers/hotelbeds';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination') || 'Palma de Mallorca';
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined;
    const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined;

    const rates = await hotelbedsProvider.searchWholesaleRates(destination, checkIn, checkOut, {
      lat,
      lng,
      adults: 2,
      rooms: 1,
    });

    return NextResponse.json({
      success: true,
      provider: 'hotelbeds',
      destination,
      count: rates.length,
      rates,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to search Hotelbeds availability',
      },
      { status: 500 }
    );
  }
}
