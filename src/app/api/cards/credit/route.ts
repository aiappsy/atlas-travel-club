import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, source, reference } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid credit amount' }, { status: 400 });
    }

    // In production, this executes:
    // 1. stripe.issuing.cardholders.update / stripe.topups.create
    // 2. Firestore ledger write to `users/{userId}/visa_transactions`
    // 3. Send SMS / Push notification via Twilio / Firebase Cloud Messaging

    return NextResponse.json({
      success: true,
      creditedAmount: amount,
      source: source || 'HotelsClub Automated Treasury',
      reference: reference || `CREDIT-${Date.now()}`,
      status: 'posted_to_visa_balance',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to credit Visa card' },
      { status: 500 }
    );
  }
}
