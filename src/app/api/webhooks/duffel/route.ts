import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const eventType = payload.data?.type || payload.type;
    console.log(`[Duffel Webhook] Received event: ${eventType}`, payload);

    switch (eventType) {
      case 'airline_initiated_change.detected': {
        const orderId = payload.data?.order_id;
        console.log(`[EU261 Sentinel] Airline schedule change or disruption detected for order ${orderId}! Initiating passenger protection workflow.`);
        // Flag for EU261 Sentinel claim check
        break;
      }
      case 'order.created': {
        console.log(`[Duffel Webhook] Order created: ${payload.data?.id}`);
        break;
      }
      case 'order.cancelled': {
        console.log(`[Duffel Webhook] Order cancelled: ${payload.data?.id}`);
        break;
      }
      default:
        console.log(`[Duffel Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Duffel Webhook] Handler error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
