import { NextRequest, NextResponse } from 'next/server';
import { generatePassPayload } from '@/lib/cards/walletPass';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const passData = generatePassPayload({
      memberId: searchParams.get('memberId'),
      name: searchParams.get('name'),
      tier: searchParams.get('tier'),
      validUntil: searchParams.get('validUntil'),
      availablePoints: searchParams.get('availablePoints'),
      pendingPoints: searchParams.get('pendingPoints'),
      currency: searchParams.get('currency'),
    });

    return NextResponse.json({
      success: true,
      pass: passData,
      downloadUrl: `/api/cards/wallet-pass/download?memberId=${passData.serialNumber}&availablePoints=${searchParams.get('availablePoints') || '42500'}&pendingPoints=${searchParams.get('pendingPoints') || '79000'}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch digital wallet pass' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const passData = generatePassPayload(body);

    return NextResponse.json({
      success: true,
      pass: passData,
      downloadUrl: `/api/cards/wallet-pass/download?memberId=${passData.serialNumber}&availablePoints=${body.availablePoints || '42500'}&pendingPoints=${body.pendingPoints || '79000'}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate digital wallet pass' },
      { status: 500 }
    );
  }
}
