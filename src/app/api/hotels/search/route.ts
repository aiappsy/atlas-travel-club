import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || 'Las Vegas';
  const category = searchParams.get('category');
  const minStars = Number(searchParams.get('minStars') || 0);

  const compareUrl = new URL('/api/hotels/compare', req.url);
  compareUrl.searchParams.set('destination', city);

  try {
    const res = await fetch(compareUrl.toString());
    const data = await res.json();
    let hotels = data.hotels || [];

    if (category && category !== 'All') {
      hotels = hotels.filter((h: any) => h.category === category);
    }

    if (minStars > 0) {
      hotels = hotels.filter((h: any) => h.starRating >= minStars);
    }

    return NextResponse.json({
      success: true,
      total: hotels.length,
      timestamp: new Date().toISOString(),
      provider: 'Live Google Hotels & B2B Clearing Adapter',
      hotels,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve live hotels' },
      { status: 500 }
    );
  }
}
