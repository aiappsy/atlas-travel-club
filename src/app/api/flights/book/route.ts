import { NextRequest, NextResponse } from 'next/server';
import { duffelProvider } from '@/lib/providers/duffel';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { offerId, passenger, paymentMethod } = body;

    if (!offerId) {
      return NextResponse.json(
        { success: false, error: 'Missing required offerId' },
        { status: 400 }
      );
    }

    if (!passenger || !passenger.givenName || !passenger.familyName) {
      return NextResponse.json(
        { success: false, error: 'Passenger givenName and familyName are required' },
        { status: 400 }
      );
    }

    const passengerFormatted = {
      title: (passenger.title || 'mr').toLowerCase() as 'mr' | 'ms' | 'mrs' | 'miss',
      gender: (passenger.gender || 'm').toLowerCase() as 'm' | 'f',
      given_name: passenger.givenName.trim(),
      family_name: passenger.familyName.trim(),
      born_on: passenger.bornOn || '1988-06-15',
      email: passenger.email || 'member@atlastravelclub.com',
      phone_number: passenger.phoneNumber || '+4790000000',
    };

    const bookingResult = await duffelProvider.createOrder({
      offerId,
      passengers: [passengerFormatted],
      payment: {
        type: paymentMethod === 'card' ? 'card' : 'balance',
      },
    });

    if (!bookingResult.success) {
      return NextResponse.json(
        { success: false, error: bookingResult.error || 'Failed to issue ticket with airline' },
        { status: 422 }
      );
    }

    const order = bookingResult.order;
    const slice = order?.slices?.[0];
    const segment = slice?.segments?.[0];

    return NextResponse.json({
      success: true,
      orderId: bookingResult.orderId,
      bookingReference: bookingResult.bookingReference,
      status: 'CONFIRMED',
      carrier: order?.owner?.name || segment?.marketing_carrier?.name || 'Partner Airline',
      flightNumber: `${segment?.marketing_carrier?.iata_code || ''} ${segment?.marketing_carrier_flight_number || ''}`.trim(),
      route: `${segment?.origin?.iata_code || ''} ➔ ${segment?.destination?.iata_code || ''}`,
      departureDate: segment?.departing_at,
      arrivalDate: segment?.arriving_at,
      passengers: order?.passengers?.map((p: any) => ({
        id: p.id,
        name: `${p.given_name} ${p.family_name}`,
        type: p.type,
      })),
      documents: order?.documents || [],
      totalAmount: order?.total_amount,
      totalCurrency: order?.total_currency,
      eu261Protected: true,
      issuedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[API /flights/book] Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal booking error' },
      { status: 500 }
    );
  }
}
