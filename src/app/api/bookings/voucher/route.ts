import { NextRequest, NextResponse } from 'next/server';
import { getDefaultTripDates } from '@/lib/mockData';

function generateVoucherPayload(params: {
  bookingId?: string | null;
  hotelName?: string | null;
  guestName?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  roomType?: string | null;
  supplierRef?: string | null;
  totalPaid?: string | null;
  savings?: string | null;
  nights?: string | null;
}) {
  const { bookingId, hotelName, guestName, checkIn, checkOut, roomType, supplierRef, totalPaid, savings, nights } = params;
  const defaultDates = getDefaultTripDates(14, 3);

  return {
    voucherId: bookingId || `ATLAS-HB-${Math.floor(100000 + Math.random() * 900000)}`,
    hotelName: hotelName || 'The Grand Hotel & Suites',
    guestName: guestName || 'Valued ATLAS VIP Member',
    checkIn: checkIn || defaultDates.checkIn,
    checkOut: checkOut || defaultDates.checkOut,
    nights: nights || '3',
    roomType: roomType || 'Superior Deluxe Room (Bed & Breakfast)',
    supplier: 'Hotelbeds APItude & WebBeds Global B2B Clearing Feed',
    supplierRef: supplierRef || `HB-${Math.floor(1000000 + Math.random() * 9000000)}`,
    hotelConfirmationCode: `HTL-CONF-${Math.floor(10000 + Math.random() * 90000)}`,
    rateType: 'Closed-Loop Wholesale Net Rate (100% Prepaid by ATLAS)',
    totalPaid: totalPaid ? `$${totalPaid}` : '$369.00',
    savings: savings ? `$${savings}` : '$225.00',
    disclaimer:
      'Strict Closed-Loop Member Allotment. Rate Parity Non-Disclosure Clause: Net wholesale billing is settled directly via ATLAS Sovereign Banking Pool & Hotelbeds APItude B2B clearing. Hotel front desk should not collect room charges or taxes from guest, except personal incidentals.',
    emergencyHotline: '+1 (800) 847-ATLAS / B2B Supplier Desk: +44 20 8123 4567',
    qrPayload: `https://atlastravel.club/verify/voucher/${bookingId || '994182'}`,
    issuedAt: new Date().toISOString(),
  };
}

function renderVoucherHtml(v: ReturnType<typeof generateVoucherPayload>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Hotel Voucher — ${v.voucherId}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0f172a;
      color: #1e293b;
      padding: 24px;
      display: flex;
      justify-content: center;
    }
    .voucher-card {
      background: #ffffff;
      max-width: 800px;
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
      color: #ffffff;
      padding: 32px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #f59e0b;
    }
    .logo-area { display: flex; align-items: center; gap: 14px; }
    .logo-icon {
      width: 44px;
      height: 44px;
      background: #f59e0b;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 900;
      color: #0f172a;
    }
    .logo-text h1 { font-size: 22px; font-weight: 900; letter-spacing: 0.1em; color: #ffffff; }
    .logo-text p { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.05em; }
    .badge-voucher {
      text-align: right;
    }
    .badge-voucher .ref {
      font-family: monospace;
      font-size: 16px;
      font-weight: 800;
      color: #fbbf24;
      background: rgba(245, 158, 11, 0.15);
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid rgba(245, 158, 11, 0.3);
      display: inline-block;
    }
    .badge-voucher .sub { font-size: 10px; text-transform: uppercase; color: #94a3b8; margin-top: 4px; }
    .content { padding: 36px 40px; }
    .status-banner {
      background: #ecfdf5;
      border: 1px solid #10b981;
      border-radius: 12px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .status-banner .left { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 800; color: #065f46; }
    .status-banner .stamp {
      font-size: 10px;
      background: #10b981;
      color: #ffffff;
      padding: 4px 8px;
      border-radius: 6px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .info-box {
      background: #f8fafc;
      padding: 18px 20px;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
    }
    .info-box .title { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; }
    .info-box .val-main { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .info-box .val-sub { font-size: 12px; color: #475569; }
    .full-box {
      background: #f8fafc;
      padding: 18px 20px;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }
    .dates-strip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 14px;
      padding: 18px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .dates-item .lbl { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #1e40af; }
    .dates-item .dt { font-size: 16px; font-weight: 900; color: #1e3a8a; }
    .dates-item .tm { font-size: 11px; color: #3b82f6; }
    .dates-divider { font-size: 18px; font-weight: 900; color: #93c5fd; }
    .instruction-box {
      background: #fffbeb;
      border: 1px dashed #f59e0b;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 24px;
      font-size: 11px;
      color: #78350f;
      line-height: 1.6;
    }
    .instruction-box strong { color: #b45309; }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #64748b;
    }
    .actions-bar {
      padding: 16px 40px;
      background: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .print-btn {
      background: #0f172a;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .print-btn:hover { background: #1e293b; }
    @media print {
      body { background: transparent; padding: 0; }
      .voucher-card { box-shadow: none; border: none; max-width: 100%; }
      .actions-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="voucher-card">
    <div class="header">
      <div class="logo-area">
        <div class="logo-icon">A</div>
        <div class="logo-text">
          <h1>ATLAS TRAVEL CLUB</h1>
          <p>Official B2B Wholesale Hotel Accommodation Voucher</p>
        </div>
      </div>
      <div class="badge-voucher">
        <div class="ref">${v.voucherId}</div>
        <div class="sub">Supplier Ref: ${v.supplierRef}</div>
      </div>
    </div>

    <div class="actions-bar">
      <span style="font-size: 12px; font-weight: 700; color: #475569;">
        🖨️ Present this official B2B voucher upon check-in at hotel front desk
      </span>
      <button class="print-btn" onclick="window.print()">
        <span>Print / Save as PDF</span>
      </button>
    </div>

    <div class="content">
      <div class="status-banner">
        <div class="left">
          <span>✓ RESERVATION CONFIRMED & PREPAID</span>
          <span style="font-weight: 400; color: #047857;">• Rate Parity Certified (0% Markup)</span>
        </div>
        <div class="stamp">CLOSED-LOOP ALLOTMENT</div>
      </div>

      <div class="grid-2">
        <div class="info-box">
          <div class="title">Hotel Property</div>
          <div class="val-main">${v.hotelName}</div>
          <div class="val-sub">Internal CRS Code: ${v.hotelConfirmationCode}</div>
        </div>

        <div class="info-box">
          <div class="title">Lead Guest Name</div>
          <div class="val-main">${v.guestName}</div>
          <div class="val-sub">VIP Member Allotment (2 Adults)</div>
        </div>
      </div>

      <div class="dates-strip">
        <div class="dates-item">
          <div class="lbl">Check-In</div>
          <div class="dt">${v.checkIn}</div>
          <div class="tm">From 15:00 Local Time</div>
        </div>
        <div class="dates-divider">➔</div>
        <div class="dates-item">
          <div class="lbl">Duration</div>
          <div class="dt">${v.nights} Nights</div>
          <div class="tm">Room Only / B&B Included</div>
        </div>
        <div class="dates-divider">➔</div>
        <div class="dates-item">
          <div class="lbl">Check-Out</div>
          <div class="dt">${v.checkOut}</div>
          <div class="tm">Until 12:00 Local Time</div>
        </div>
      </div>

      <div class="full-box">
        <div class="title">Reserved Room Category & Rate Plan</div>
        <div class="val-main">${v.roomType}</div>
        <div class="val-sub" style="margin-top: 6px; line-height: 1.5;">
          <strong>Rate Plan:</strong> ${v.rateType}<br>
          <strong>Total Paid at Wholesale:</strong> ${v.totalPaid} • <strong>Direct Member Savings:</strong> ${v.savings}
        </div>
      </div>

      <div class="instruction-box">
        <strong>IMPORTANT HOTEL FRONT DESK BILLING NOTICE:</strong><br>
        This reservation has been booked under the <strong>${v.supplier}</strong> master service agreement and is <strong>100% PREPAID</strong> by ATLAS Sovereign Clearing Desk. Under closed-loop rate parity non-disclosure rules, room rate and taxes are billed to the master wholesale account. <strong>DO NOT collect room rate charges or local taxes from the guest.</strong> Only personal incidentals (minibar, room service, telephone) may be requested directly from the guest upon departure.
      </div>

      <div class="footer">
        <div>
          <strong>Issued By:</strong> ATLAS Sovereign Travel Club LLC (Operated by Hard Rock Capital Ltd)<br>
          24/7 VIP Concierge & B2B Resolution Desk: ${v.emergencyHotline}
        </div>
        <div style="text-align: right; font-family: monospace; font-size: 10px;">
          Timestamp: ${v.issuedAt.substring(0, 19).replace('T', ' ')} UTC<br>
          Verification Hash: 0x${Math.random().toString(16).substring(2, 10).toUpperCase()}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const voucherData = generateVoucherPayload({
      bookingId: searchParams.get('bookingId') || searchParams.get('bookingRef'),
      hotelName: searchParams.get('hotelName'),
      guestName: searchParams.get('guestName') || searchParams.get('guest'),
      checkIn: searchParams.get('checkIn'),
      checkOut: searchParams.get('checkOut'),
      roomType: searchParams.get('roomType') || searchParams.get('room'),
      supplierRef: searchParams.get('supplierRef'),
      totalPaid: searchParams.get('totalPaid'),
      savings: searchParams.get('savings'),
      nights: searchParams.get('nights'),
    });

    const format = searchParams.get('format');
    const acceptsHtml = req.headers.get('accept')?.includes('text/html');

    // Return print-ready HTML if format=html, format=pdf or opened in browser
    if (format === 'html' || format === 'pdf' || acceptsHtml) {
      return new Response(renderVoucherHtml(voucherData), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    return NextResponse.json({
      success: true,
      voucher: voucherData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch B2B booking voucher' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const voucherData = generateVoucherPayload(body);

    return NextResponse.json({
      success: true,
      voucher: voucherData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate B2B booking voucher' },
      { status: 500 }
    );
  }
}
