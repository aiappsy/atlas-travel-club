import { NextRequest, NextResponse } from 'next/server';
import { duffelProvider } from '@/lib/providers/duffel';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Missing order ID' }, { status: 400 });
    }

    const order = await duffelProvider.getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Missing order ID' }, { status: 400 });
    }

    const cancelResult = await duffelProvider.cancelOrder(orderId);
    if (!cancelResult.success) {
      return NextResponse.json({ success: false, error: cancelResult.error }, { status: 422 });
    }

    return NextResponse.json({ success: true, refundAmount: cancelResult.refundAmount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
