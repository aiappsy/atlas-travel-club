import { NextRequest, NextResponse } from 'next/server';
import { MOCK_HOTELS } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city')?.toLowerCase();
  const category = searchParams.get('category');
  const minStars = Number(searchParams.get('minStars') || 0);

  let results = MOCK_HOTELS;

  if (city) {
    results = results.filter(
      (h) =>
        h.city.toLowerCase().includes(city) ||
        h.name.toLowerCase().includes(city) ||
        h.stateCountry.toLowerCase().includes(city)
    );
  }

  if (category && category !== 'All') {
    results = results.filter((h) => h.category === category);
  }

  if (minStars > 0) {
    results = results.filter((h) => h.stars >= minStars);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    timestamp: new Date().toISOString(),
    provider: 'Cloud Run Aggregator (Amadeus/Hotelbeds Adapter)',
    hotels: results,
  });
}
