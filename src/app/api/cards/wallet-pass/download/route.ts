import { NextRequest, NextResponse } from 'next/server';
import { generatePassPayload } from '@/lib/cards/walletPass';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId') || 'ATLAS-VIP-8841';
    const name = searchParams.get('name') || 'Pål Juritzen';
    const tier = searchParams.get('tier') || 'Founder';
    const availablePoints = searchParams.get('availablePoints') || '42500';
    const pendingPoints = searchParams.get('pendingPoints') || '79000';

    const passPayload = generatePassPayload({
      memberId,
      name,
      tier,
      availablePoints,
      pendingPoints,
    });

    return new NextResponse(JSON.stringify(passPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="ATLAS-${memberId}.pass.json"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to download wallet pass' },
      { status: 500 }
    );
  }
}
