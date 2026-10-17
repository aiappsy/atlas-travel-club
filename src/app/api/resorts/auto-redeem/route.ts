import { NextRequest, NextResponse } from 'next/server';
import { allocateAndRedeemCertificate, getReservationByCode, getVaultInventorySummary, RvcCertificateTier } from '@/lib/rvcVault';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tierId = 'standard',
      resortId = 'resort-selection',
      resortName,
      resortLocation,
      preferredTimeframe = 'Fleksibel',
      memberName,
      memberEmail,
      guestsCount = 2,
    } = body;

    if (!resortName) {
      return NextResponse.json(
        { error: 'Resort name is required' },
        { status: 400 }
      );
    }

    const email = memberEmail || 'member@atlasclub.vip';
    const name = memberName || 'Atlas Member';

    const result = await allocateAndRedeemCertificate({
      tierId: tierId as RvcCertificateTier,
      resortId,
      resortName,
      resortLocation: resortLocation || 'Europa',
      preferredTimeframe,
      memberName: name,
      memberEmail: email,
      guestsCount: Number(guestsCount) || 2,
    });

    return NextResponse.json({
      success: true,
      booking: result,
      message: 'Automated RVC certificate allocated and reservation confirmed.',
    });
  } catch (error: any) {
    console.error('Error in RVC auto-redeem API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process automated resort redemption' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const summary = searchParams.get('summary');

  if (summary === 'true') {
    return NextResponse.json({
      success: true,
      vault: getVaultInventorySummary(),
    });
  }

  if (code) {
    const booking = getReservationByCode(code);
    if (!booking) {
      return NextResponse.json({ error: 'Reservation code not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking });
  }

  return NextResponse.json({
    success: true,
    vault: getVaultInventorySummary(),
    status: 'RVC Automated Redemption Service Operational',
  });
}
