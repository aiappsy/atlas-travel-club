import { NextRequest, NextResponse } from 'next/server';
import { dragonPassProvider } from '@/lib/providers/dragonpass';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const airportCode = searchParams.get('airport') || searchParams.get('code') || '';
    const city = searchParams.get('city') || '';

    const lounges = await dragonPassProvider.searchLounges({
      airportCode,
      city,
    });

    return NextResponse.json({
      success: true,
      provider: 'dragonpass',
      airportCode,
      total: lounges.length,
      lounges,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to search airport lounges' },
      { status: 500 }
    );
  }
}
