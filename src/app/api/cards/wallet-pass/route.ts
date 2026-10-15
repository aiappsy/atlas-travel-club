import { NextRequest, NextResponse } from 'next/server';
import { generatePassPayload, generateGoogleWalletPassPayload } from '@/lib/cards/walletPass';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const platform = (searchParams.get('platform') || 'apple').toLowerCase();
    const params = {
      memberId: searchParams.get('memberId'),
      name: searchParams.get('name'),
      tier: searchParams.get('tier'),
      validUntil: searchParams.get('validUntil'),
      availablePoints: searchParams.get('availablePoints'),
      pendingPoints: searchParams.get('pendingPoints'),
      currency: searchParams.get('currency'),
    };

    const passData = platform === 'google' 
      ? generateGoogleWalletPassPayload(params)
      : generatePassPayload(params);

    const serialNumber = searchParams.get('memberId') || 'ATLAS-VIP-8841';

    return NextResponse.json({
      success: true,
      platform,
      pass: passData,
      downloadUrl: `/api/cards/wallet-pass/download?platform=${platform}&memberId=${serialNumber}&availablePoints=${params.availablePoints || '42500'}&pendingPoints=${params.pendingPoints || '79000'}`,
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
    const platform = (body.platform || 'apple').toLowerCase();
    
    const passData = platform === 'google'
      ? generateGoogleWalletPassPayload(body)
      : generatePassPayload(body);

    const serialNumber = body.memberId || 'ATLAS-VIP-8841';

    return NextResponse.json({
      success: true,
      platform,
      pass: passData,
      downloadUrl: `/api/cards/wallet-pass/download?platform=${platform}&memberId=${serialNumber}&availablePoints=${body.availablePoints || '42500'}&pendingPoints=${body.pendingPoints || '79000'}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate digital wallet pass' },
      { status: 500 }
    );
  }
}
