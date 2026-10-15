export interface WalletPassParams {
  memberId?: string | null;
  name?: string | null;
  tier?: string | null;
  validUntil?: string | null;
  availablePoints?: number | string | null;
  pendingPoints?: number | string | null;
  currency?: string | null;
}

export function generatePassPayload(params: WalletPassParams) {
  const {
    memberId = 'ATLAS-VIP-8841',
    name = 'Pål Juritzen',
    tier = 'Founder',
    validUntil = '12/2028',
    availablePoints = 42500,
    pendingPoints = 79000,
    currency = 'PTS',
  } = params;

  const numAvailable = Number(availablePoints) || 0;
  const numPending = Number(pendingPoints) || 0;
  const nokAvailable = Math.round(numAvailable * 0.10); // 100 pts = $1 USD = ~10 NOK -> 1 pt = 0.10 NOK
  const nokPending = Math.round(numPending * 0.10);

  return {
    formatVersion: 1,
    passTypeIdentifier: 'pass.club.atlas.vip',
    serialNumber: memberId || 'ATLAS-VIP-8841',
    teamIdentifier: 'ATLAS9941X',
    organizationName: 'HARD ROCK CAPITAL LTD',
    description: 'ATLAS VIP Membership & Rewards Vault Pass',
    foregroundColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(10, 15, 30)',
    labelColor: 'rgb(245, 158, 11)',
    logoText: 'ATLAS VIP',
    storeCard: {
      headerFields: [
        {
          key: 'availableBalance',
          label: 'DISPONIBEL SALDO',
          value: `${numAvailable.toLocaleString()} ${currency} (≈ ${nokAvailable.toLocaleString()} kr)`,
        },
      ],
      primaryFields: [
        {
          key: 'memberTier',
          label: 'MEDLEMSKAPSNIVÅ',
          value: (tier || 'FOUNDER').toUpperCase() + ' MEMBER',
        },
      ],
      secondaryFields: [
        {
          key: 'holder',
          label: 'KORTHOLDER',
          value: (name || 'PÅL JURITZEN').toUpperCase(),
        },
        {
          key: 'pendingEscrow',
          label: 'VENTER PÅ OPPGJØR (IN ESCROW)',
          value: `🟡 ${numPending.toLocaleString()} ${currency} (≈ ${nokPending.toLocaleString()} kr)`,
        },
      ],
      auxiliaryFields: [
        {
          key: 'markup',
          label: 'WHOLESALE PRIS',
          value: '0 kr PÅSLAG (NETTO)',
        },
        {
          key: 'expires',
          label: 'GYLDIG TIL',
          value: validUntil || '12/2028',
        },
        {
          key: 'perks',
          label: 'VIP LOUNGE & FAST TRACK',
          value: 'INKLUDERT',
        },
      ],
      backFields: [
        {
          key: 'liquidityNotice',
          label: 'LIKVIDITETSSIKRING & CASH LAG REGEL',
          value:
            'Provisjoner fra rederier og hotellpartnere utbetales 30–60 dager etter gjennomført reise. Opptjente poeng står låst (🟡 In Escrow) inntil provisjonen fysisk har landet på HARD ROCK CAPITAL LTDs bankkonto. Kun bekreftet disponibel saldo (🟢) kan innløses.',
        },
        {
          key: 'spendingRules',
          label: 'BRUK AV DISPONIBLE POENG',
          value:
            'Disponible poeng trekkes automatisk fra din neste årskontingent i Stripe eller kan benyttes mot hotellopphold og overskuddsutbetaling.',
        },
        {
          key: 'operatingCompany',
          label: 'UTSTEDER & DRIFTSSELSKAP',
          value:
            'HARD ROCK CAPITAL LTD (UK Reg. #16833237)\n71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom.',
        },
        {
          key: 'managingDirector',
          label: 'LEDELSE & KONTAKT',
          value:
            'Pål Juritzen, Managing Director\nE-post: paljuritzen@gmail.com | Tlf: +47 40059493\nWeb: https://atlasclub.web.app',
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
}

export function generateGoogleWalletPassPayload(params: WalletPassParams) {
  const {
    memberId = 'ATLAS-VIP-8841',
    name = 'Pål Juritzen',
    tier = 'Founder',
    validUntil = '12/2028',
    availablePoints = 42500,
    pendingPoints = 79000,
    currency = 'PTS',
  } = params;

  const numAvailable = Number(availablePoints) || 0;
  const numPending = Number(pendingPoints) || 0;
  const nokAvailable = Math.round(numAvailable * 0.10);
  const nokPending = Math.round(numPending * 0.10);

  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || '3388000000022314567';

  return {
    iss: 'atlas-wallet@bizmaster-abfed.iam.gserviceaccount.com',
    aud: 'google',
    typ: 'savetowallet',
    origins: ['https://atlasclub.web.app'],
    payload: {
      genericObjects: [
        {
          id: `${issuerId}.${memberId}`,
          classId: `${issuerId}.atlas_vip_membership_tier`,
          logo: {
            sourceUri: {
              uri: 'https://atlasclub.web.app/atlas-final-card.jpg',
            },
            contentDescription: {
              defaultValue: {
                language: 'en-US',
                value: 'ATLAS VIP Club Card',
              },
            },
          },
          cardTitle: {
            defaultValue: {
              language: 'en-US',
              value: 'ATLAS TRAVEL CLUB',
            },
          },
          subheader: {
            defaultValue: {
              language: 'en-US',
              value: 'KORTHOLDER',
            },
          },
          header: {
            defaultValue: {
              language: 'en-US',
              value: (name || 'PÅL JURITZEN').toUpperCase(),
            },
          },
          hexBackgroundColor: '#0a0f1e',
          textModulesData: [
            {
              id: 'tier',
              header: 'MEDLEMSKAPSNIVÅ',
              body: `${(tier || 'FOUNDER').toUpperCase()} VIP PASS`,
            },
            {
              id: 'available_balance',
              header: 'DISPONIBEL SALDO (KLAR)',
              body: `🟢 ${numAvailable.toLocaleString()} ${currency} (≈ ${nokAvailable.toLocaleString()} NOK)`,
            },
            {
              id: 'pending_escrow',
              header: 'VENTER PÅ OPPGJØR (IN ESCROW)',
              body: `🟡 ${numPending.toLocaleString()} ${currency} (≈ ${nokPending.toLocaleString()} NOK)`,
            },
            {
              id: 'wholesale_rate',
              header: 'WHOLESALE PRIS',
              body: '0 kr PÅSLAG (NETTO ENGROS)',
            },
            {
              id: 'valid_until',
              header: 'GYLDIG TIL',
              body: validUntil || '12/2028',
            },
            {
              id: 'liquidity_guard',
              header: 'LIKVIDITETSSIKRING & CASH LAG',
              body: 'Provisjoner utbetales 30–60 dager etter reise. Kun oppgjorte midler kan innløses.',
            },
            {
              id: 'legal_entity',
              header: 'UTSTEDER',
              body: 'HARD ROCK CAPITAL LTD (UK Reg #16833237), 71-75 Shelton Street, London, UK.',
            },
          ],
          barcode: {
            type: 'QR_CODE',
            value: `ATLAS://${memberId}/VERIFIED`,
            alternateText: memberId,
          },
        },
      ],
    },
  };
}
