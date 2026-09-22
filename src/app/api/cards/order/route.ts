import { NextRequest, NextResponse } from 'next/server';
import { PhysicalCardOrder } from '@/lib/types';
import { MOCK_CARD_ORDERS } from '@/lib/mockData';

let cardOrders: PhysicalCardOrder[] = [...MOCK_CARD_ORDERS];

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: cardOrders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, memberName, memberId, tier, photoUrl, foilStyle, cardType, shippingAddress } = body;

    if (!memberName || !shippingAddress || !shippingAddress.street) {
      return NextResponse.json(
        { error: 'Missing required shipping or member details' },
        { status: 400 }
      );
    }

    const newOrder: PhysicalCardOrder = {
      id: `CARD-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId || 'user-default',
      memberName,
      memberId: memberId || 'HC-9824-VIP',
      tier: tier || 'gold',
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      foilStyle: foilStyle || 'metallic_gold',
      cardType: cardType || 'Co-Branded Visa Prepaid',
      shippingAddress,
      status: 'ordered',
      trackingNumber: `USPS-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      carrier: 'USPS Priority Insured Mail',
      orderedAt: new Date().toISOString().split('T')[0],
    };

    cardOrders = [newOrder, ...cardOrders];

    return NextResponse.json({
      success: true,
      message: 'Physical Member Card queued for print & shipping fulfillment!',
      order: newOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit card print order' },
      { status: 500 }
    );
  }
}
