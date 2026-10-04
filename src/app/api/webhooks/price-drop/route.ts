import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'ATLAS Autonomous Price-Drop Re-Booker Webhook Gateway',
    status: 'active',
    supportedProviders: ['pruvo', 'hotelmize', 'bedbank_sentinel'],
    expectedPayload: {
      event: 'price_drop_detected',
      bookingReference: 'ATLAS-HB-102948',
      supplier: 'hotelbeds',
      hotelName: 'The Bellagio Resort & Casino',
      originalNetPrice: 590.00,
      newLowerNetPrice: 420.00,
      currency: 'USD',
      freeCancellationDeadline: '2026-11-12T14:00:00Z',
    },
    documentation: 'Configure this webhook URL in your Pruvo for Business or Hotelmize portal to receive real-time rate drop alerts.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    const {
      event = 'price_drop_detected',
      bookingReference,
      hotelName,
      originalNetPrice,
      newLowerNetPrice,
      currency = 'USD',
      freeCancellationDeadline,
      supplier = 'hotelbeds',
    } = rawBody;

    if (!bookingReference || typeof originalNetPrice !== 'number' || typeof newLowerNetPrice !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload: bookingReference, originalNetPrice, and newLowerNetPrice are required.' },
        { status: 400 }
      );
    }

    const savingsDelta = originalNetPrice - newLowerNetPrice;

    if (savingsDelta <= 0) {
      return NextResponse.json({
        success: true,
        action: 'ignored',
        reason: 'New rate is not lower than existing booked rate.',
      });
    }

    // Standard 50/50 split policy
    const memberCashRefund = Math.round((savingsDelta * 0.5) * 100) / 100;
    const vaultDividendPool = Math.round((savingsDelta * 0.5) * 100) / 100;

    const eventId = `EVT-DROP-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      eventId,
      action: 'rebooking_queued',
      bookingReference,
      hotelName: hotelName || 'Monitored Wholesale Property',
      supplier,
      originalNetPrice,
      newLowerNetPrice,
      currency,
      savingsDelta,
      allocation: {
        memberCashRefundToVisa: memberCashRefund,
        vaultDividendPoolContribution: vaultDividendPool,
      },
      status: 'pending_execution',
      freeCancellationDeadline: freeCancellationDeadline || null,
      message: `Captured $${savingsDelta.toFixed(2)} price drop for ${bookingReference}. Autonomous rebooking pipeline engaged.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
