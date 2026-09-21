import { NextRequest, NextResponse } from 'next/server';
import { getDefaultTripDates } from '@/lib/mockData';

function generateVoucherPayload(params: {
  bookingId?: string | null;
  hotelName?: string | null;
  guestName?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  roomType?: string | null;
  supplierRef?: string | null;
}) {
  const { bookingId, hotelName, guestName, checkIn, checkOut, roomType, supplierRef } = params;
  const defaultDates = getDefaultTripDates(14, 3);

  return {
    voucherId: bookingId || 'ATLAS-B2B-994182',
    hotelName: hotelName || 'The Grand Hotel & Suites',
    guestName: guestName || 'Valued ATLAS VIP Member',
    checkIn: checkIn || defaultDates.checkIn,
    checkOut: checkOut || defaultDates.checkOut,
    roomType: roomType || 'Deluxe King Fountain View Suite',
    supplier: 'WebBeds / Hotelbeds Global B2B Network',
    supplierRef: supplierRef || 'WB-8841920-ATLAS',
    hotelConfirmationCode: 'HTL-CONF-99214',
    rateType: 'Closed-Loop Wholesale Net Rate (Prepaid)',
    disclaimer:
      'Strict Closed-Loop Member Rate. Rate Parity Non-Disclosure Clause: Net wholesale billing is settled directly via ATLAS Sovereign Banking Pool. Front desk should not collect room charges except incidentals.',
    emergencyHotline: '+1 (800) 847-ATLAS / B2B Supplier Desk: +44 20 8123 4567',
    qrPayload: `https://atlas-travel.club/verify/voucher/${bookingId || '994182'}`,
    issuedAt: new Date().toISOString(),
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const voucherData = generateVoucherPayload({
      bookingId: searchParams.get('bookingId'),
      hotelName: searchParams.get('hotelName'),
      guestName: searchParams.get('guestName'),
      checkIn: searchParams.get('checkIn'),
      checkOut: searchParams.get('checkOut'),
      roomType: searchParams.get('roomType'),
      supplierRef: searchParams.get('supplierRef'),
    });

    return NextResponse.json({
      success: true,
      voucher: voucherData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch B2B booking voucher' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const voucherData = generateVoucherPayload(body);

    return NextResponse.json({
      success: true,
      voucher: voucherData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate B2B booking voucher' },
      { status: 500 }
    );
  }
}
