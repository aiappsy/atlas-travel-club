import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, hotelId, roomId, nights, guests } = body;

    if (!userId || !hotelId || !roomId) {
      return NextResponse.json(
        { error: 'Missing required booking parameters' },
        { status: 400 }
      );
    }

    const confirmationCode = `HC-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      booking: {
        id: `bk-${Date.now()}`,
        confirmationCode,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        details: body,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process reservation' },
      { status: 500 }
    );
  }
}
