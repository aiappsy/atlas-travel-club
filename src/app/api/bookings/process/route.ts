import { NextRequest, NextResponse } from 'next/server';
import { travelRouter } from '@/lib/providers/router';
import { GuestManifest, ProviderName } from '@/lib/providers/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      provider = 'hotelbeds',
      rateKey = 'HB-KEY-1',
      manifest,
      nights = 3,
      hotelName,
      roomName,
      wholesalePricePerNight,
      publicRetailPricePerNight,
      memberId,
      isMember,
    } = body;

    // Strict Closed-Loop Rate Parity Enforcement:
    // Bedbank wholesale allocations legally cannot be booked by unauthenticated non-members
    if (!isMember && !memberId) {
      return NextResponse.json(
        {
          error: 'Closed-Loop Rate Parity Violation: Direct wholesale booking through Hotelbeds/Bedbanks is strictly restricted to authenticated club members.',
          code: 'CLOSED_LOOP_MEMBERSHIP_REQUIRED',
          redirect: '/membership',
        },
        { status: 403 }
      );
    }

    if (!manifest || !manifest.email || !hotelName) {
      return NextResponse.json(
        { error: 'Missing required guest manifest or property details' },
        { status: 400 }
      );
    }

    const bookingResult = await travelRouter.executeBooking(
      provider as ProviderName,
      rateKey,
      manifest as GuestManifest,
      nights,
      hotelName,
      roomName,
      wholesalePricePerNight,
      publicRetailPricePerNight
    );

    return NextResponse.json({
      success: true,
      booking: bookingResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process provider booking' },
      { status: 500 }
    );
  }
}
