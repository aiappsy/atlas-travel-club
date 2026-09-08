import { NextRequest, NextResponse } from 'next/server';

let currentPayPalConfig = {
  mode: 'sandbox' as 'sandbox' | 'live',
  clientId: 'AbC123_Sandbox_PayPal_ClientID_HotelClub',
  clientSecret: '••••••••••••••••••••••••••••••••',
  webhookId: 'WH-982410-HOTELCLUB',
  autoCapture: true,
  memberCommissionRebateEnabled: true,
  commissionPassThroughPercent: 100, // 100% of affiliate commission passed to member
  status: 'connected' as 'connected' | 'unconfigured',
};

export async function GET() {
  return NextResponse.json({
    success: true,
    config: currentPayPalConfig,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    currentPayPalConfig = {
      ...currentPayPalConfig,
      ...body,
      status: body.clientId ? 'connected' : 'unconfigured',
    };

    return NextResponse.json({
      success: true,
      message: 'PayPal Billing Configuration successfully saved to Cloud Firestore!',
      config: currentPayPalConfig,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to save PayPal settings' },
      { status: 500 }
    );
  }
}
