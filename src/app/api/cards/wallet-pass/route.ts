import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { memberId, name, tier, validUntil } = await req.json();

    const passData = {
      formatVersion: 1,
      passTypeIdentifier: 'pass.club.atlas.vip',
      serialNumber: memberId || 'ATLAS-VIP-8841',
      teamIdentifier: 'ATLAS9941X',
      organizationName: 'ATLAS Travel & Sovereign Banking Club',
      description: 'ATLAS VIP Membership & Airport Lounge Access Pass',
      foregroundColor: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(10, 15, 30)',
      labelColor: 'rgb(245, 158, 11)',
      logoText: 'ATLAS VIP',
      eventTicket: {
        primaryFields: [
          {
            key: 'memberTier',
            label: 'MEMBERSHIP TIER',
            value: (tier || 'VIP').toUpperCase() + ' PASS',
          },
        ],
        secondaryFields: [
          {
            key: 'holder',
            label: 'CARDHOLDER',
            value: name || 'VALUED MEMBER',
          },
          {
            key: 'expires',
            label: 'VALID UNTIL',
            value: validUntil || '12/2028',
          },
        ],
        auxiliaryFields: [
          {
            key: 'markup',
            label: 'WHOLESALE RATE',
            value: '0% RETAIL MARKUP',
          },
          {
            key: 'perks',
            label: 'VIP LOUNGE & FAST TRACK',
            value: 'UNLIMITED ACCESS',
          },
        ],
      },
      barcode: {
        message: `ATLAS://${memberId || 'ATLAS-VIP-8841'}/VERIFIED`,
        format: 'PKBarcodeFormatQR',
        messageEncoding: 'iso-8859-1',
        altText: memberId || 'ATLAS-VIP-8841',
      },
      nfc: {
        message: `ATLAS_NFC_TOKEN_${memberId || '8841'}`,
        encryptionPublicKey: 'ATLAS_ECDSA_PUBKEY_994182',
      },
    };

    return NextResponse.json({
      success: true,
      passUrl: `data:application/vnd.apple.pkpass;base64,${Buffer.from(JSON.stringify(passData)).toString('base64')}`,
      passData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate wallet pass' },
      { status: 500 }
    );
  }
}
