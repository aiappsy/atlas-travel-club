import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { bookingId, hotelName, guestName, checkIn, checkOut, roomType, supplierRef } = await req.json();

    const voucherData = {
      voucherId: bookingId || 'ATLAS-B2B-994182',
      hotelName: hotelName || 'The Grand Hotel & Suites',
      guestName: guestName || 'Valued ATLAS VIP Member',
      checkIn: checkIn || '2026-10-15',
      checkOut: checkOut || '2026-10-18',
      roomType: roomType || 'Deluxe King Fountain View Suite',
      supplier: 'WebBeds / Hotelbeds Global B2B Network',
      supplierRef: supplierRef || 'WB-8841920-ATLAS',
      hotelConfirmationCode: 'HTL-CONF-99214',
      rateType: 'Closed-Loop Wholesale Net Rate (Prepaid)',
      disclaimer: 'Strict Closed-Loop Member Rate. Rate Parity Non-Disclosure Clause: Net wholesale billing is settled directly via ATLAS Sovereign Banking Pool. Front desk should not collect room charges except incidentals.',
      emergencyHotline: '+1 (800) 847-ATLAS / B2B Supplier Desk: +44 20 8123 4567',
      qrPayload: `https://atlas-travel.club/verify/voucher/${bookingId || '994182'}`,
      issuedAt: new Date().toISOString(),
    };

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
