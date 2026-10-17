import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const reference = searchParams.get('reference') || 'ATLAS-HB-849201';
    const hotelName = searchParams.get('hotelName') || 'Curated European Partner Hotel';
    const location = searchParams.get('location') || 'Alps / Southern Europe';
    const guestName = searchParams.get('guestName') || 'Valued ATLAS VIP Member';
    const checkIn = searchParams.get('checkIn') || 'Upon Confirmation';
    const nights = searchParams.get('nights') || '3';
    const voucherCode = searchParams.get('voucherCode') || 'HP-8492-ATLAS-VIP';
    const halfBoard = searchParams.get('halfBoard') || 'Settled upon hotel checkout';
    const issueDate = new Date().toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      `https://atlasclub.web.app/api/vouchers/validate?code=${voucherCode}&ref=${reference}`
    )}`;

    const html = `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATLAS VIP Hotel Check-In Certificate — ${reference}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #0b1120;
      color: #0f172a;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    .action-bar {
      width: 100%;
      max-width: 820px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 12px 20px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-gold {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #0b1120;
    }

    .btn-gold:hover {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      transform: translateY(-1px);
    }

    .btn-ghost {
      background: #334155;
      color: #e2e8f0;
    }

    .btn-ghost:hover {
      background: #475569;
      color: #fff;
    }

    /* A4 Printable Certificate Container */
    .certificate {
      width: 100%;
      max-width: 820px;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(217, 119, 6, 0.3);
      position: relative;
    }

    .gold-trim-top {
      height: 8px;
      background: linear-gradient(90deg, #b45309, #f59e0b, #fef3c7, #f59e0b, #b45309);
    }

    .cert-header {
      background: linear-gradient(180deg, #090d16 0%, #0f172a 100%);
      color: #fff;
      padding: 36px 40px 30px;
      border-bottom: 2px solid #d97706;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }

    .cert-title-area h2 {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 3px;
      color: #fbbf24;
      text-transform: uppercase;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .cert-title-area h1 {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .cert-title-area p {
      font-size: 10px;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }

    .issuer-seal {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px dashed #f59e0b;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 6px;
      background: rgba(245, 158, 11, 0.05);
      shrink: 0;
    }

    .issuer-seal span {
      font-size: 8px;
      font-weight: 800;
      color: #fbbf24;
      text-transform: uppercase;
      line-height: 1.1;
    }

    .cert-body {
      padding: 36px 40px;
    }

    .ref-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 20px;
      margin-bottom: 24px;
    }

    .ref-item span.label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .ref-item span.value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: #ecfdf5;
      border: 1px solid #10b981;
      border-radius: 8px;
      color: #047857;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e2e8f0;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
    }

    .details-table tr:nth-child(even) {
      background: #f8fafc;
    }

    .details-table td {
      padding: 12px 16px;
      font-size: 13px;
      border-bottom: 1px solid #e2e8f0;
    }

    .details-table tr:last-child td {
      border-bottom: none;
    }

    .details-table td.label {
      width: 38%;
      color: #475569;
      font-weight: 600;
    }

    .details-table td.value {
      width: 62%;
      color: #0f172a;
      font-weight: 700;
    }

    .rate-free {
      color: #047857 !important;
      font-weight: 800 !important;
      background: #d1fae5;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-block;
    }

    /* Clearing Key Box */
    .clearing-box {
      background: #090d16;
      border: 2px solid #d97706;
      border-radius: 14px;
      padding: 20px;
      color: #ffffff;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .clearing-info .label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #94a3b8;
      letter-spacing: 1.5px;
      margin-bottom: 6px;
    }

    .clearing-info .code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 24px;
      font-weight: 900;
      color: #fbbf24;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }

    .clearing-info .subtext {
      font-size: 11px;
      color: #cbd5e1;
      line-height: 1.4;
    }

    .qr-container {
      background: #ffffff;
      padding: 6px;
      border-radius: 10px;
      shrink: 0;
      text-align: center;
    }

    .qr-container img {
      width: 90px;
      height: 90px;
      display: block;
    }

    .hotel-instructions {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #d97706;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .hotel-instructions h4 {
      font-size: 11px;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }

    .hotel-instructions p {
      font-size: 11px;
      color: #78350f;
      line-height: 1.5;
      margin-bottom: 6px;
    }

    .hotel-instructions p.german {
      font-style: italic;
      color: #92400e;
      font-size: 10.5px;
    }

    .cert-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 10px;
      color: #64748b;
      line-height: 1.5;
    }

    .legal-notice {
      max-width: 75%;
    }

    .legal-notice strong {
      color: #334155;
    }

    .gold-trim-bottom {
      height: 6px;
      background: linear-gradient(90deg, #b45309, #f59e0b, #fef3c7, #f59e0b, #b45309);
    }

    /* Print media query for crisp A4 paper output */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .action-bar {
        display: none !important;
      }
      .certificate {
        max-width: 100% !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Top Action Toolbar -->
  <div class="action-bar">
    <div style="color: #cbd5e1; font-size: 13px; font-weight: 600;">
      🏨 ATLAS Hotel Breaks — Offisielt Innsjekkingsbevis
    </div>
    <div style="display: flex; gap: 10px;">
      <button onclick="window.print()" class="btn btn-gold">
        🖨️ Skriv ut / Lagre som PDF
      </button>
      <a href="/hotel-breaks" class="btn btn-ghost">
        ← Tilbake til ATLAS
      </a>
    </div>
  </div>

  <!-- A4 Printable Certificate Container -->
  <div class="certificate">
    <div class="gold-trim-top"></div>

    <!-- Header -->
    <div class="cert-header">
      <div class="cert-title-area">
        <h2>ATLAS TRAVEL CLUB • PRIVATE MEMBER CREDENTIAL</h2>
        <h1>OFFICIAL HOTEL CHECK-IN CERTIFICATE</h1>
        <p>ISSUED BY HARD ROCK CAPITAL LTD (UK REG. #16833237) • 71-75 SHELTON ST, LONDON WC2H 9JQ</p>
      </div>
      <div class="issuer-seal">
        <span>★ ATLAS ★</span>
        <span>VIP PASS</span>
        <span>CLEARED</span>
      </div>
    </div>

    <!-- Body -->
    <div class="cert-body">
      <!-- Reference Bar -->
      <div class="ref-bar">
        <div class="ref-item">
          <span class="label">Bookingreferanse</span>
          <span class="value">${reference}</span>
        </div>
        <div class="ref-item">
          <span class="label">Utstedt Dato</span>
          <span class="value" style="font-size: 13px;">${issueDate}</span>
        </div>
        <div class="ref-item" style="text-align: right;">
          <span class="label">Sikkerhetsstatus</span>
          <span class="status-badge">● 100% BEKREFTET</span>
        </div>
      </div>

      <!-- Property & Reservation Table -->
      <div class="section-title">Hotell- og Reservasjonsdetaljer</div>
      <table class="details-table">
        <tr>
          <td class="label">Registrert Medlem (Gjest):</td>
          <td class="value">${guestName}</td>
        </tr>
        <tr>
          <td class="label">Hotelleiendom:</td>
          <td class="value">${hotelName}</td>
        </tr>
        <tr>
          <td class="label">Destinasjon / Område:</td>
          <td class="value">${location}</td>
        </tr>
        <tr>
          <td class="label">Ønsket Innsjekkingsdato:</td>
          <td class="value">${checkIn}</td>
        </tr>
        <tr>
          <td class="label">Oppholdets Varighet:</td>
          <td class="value">${nights} Netter (Dobbeltrom for 2 voksne)</td>
        </tr>
        <tr>
          <td class="label">Rompris (Losji):</td>
          <td class="value">
            <span class="rate-free">0 kr / 0.00 EUR — 100% Dekket av ATLAS VIP-Pass</span>
          </td>
        </tr>
        <tr>
          <td class="label">Måltidsordning (Halvpensjon):</td>
          <td class="value">${halfBoard} (gjort opp direkte på hotellet ved utsjekk)</td>
        </tr>
      </table>

      <!-- Clearing Key Box -->
      <div class="clearing-box">
        <div class="clearing-info">
          <div class="label">Offisiell Oppgjørsnøkkel (Holiday Plus / Connex Clearing Network)</div>
          <div class="code">${voucherCode}</div>
          <div class="subtext">
            Denne autoriserte koden bekrefter at romprisen er fullt oppgjort gjennom det europeiske hotellkvotenettverket.
          </div>
        </div>
        <div class="qr-container">
          <img src="${qrDataUrl}" alt="QR Validation Code">
        </div>
      </div>

      <!-- Hotel Front Desk Instructions -->
      <div class="hotel-instructions">
        <h4>Resepsjonsinstruksjoner / Front Desk Instructions</h4>
        <p>
          <strong>English:</strong> Please present this credential upon check-in. The lodging charge is covered in full via the Europe Hotel Allotment Clearing Network (Connex / Holiday Plus). Only published hotel half-board dining is to be billed directly to the guest upon checkout.
        </p>
        <p class="german">
          <strong>Deutsch:</strong> Gültiger Hotel-Voucher. Die Übernachtungskosten sind über das Holiday Plus / Connex Verrechnungssystem vollständig abgedeckt. Der Gast begleicht lediglich die vereinbarte Halbpension bei Abreise vor Ort im Hotel.
        </p>
      </div>

      <!-- Footer & Legal Disclosures -->
      <div class="cert-footer">
        <div class="legal-notice">
          <strong>Juridisk Merknad:</strong> Dette sertifikatet er utstedt av <strong>HARD ROCK CAPITAL LTD</strong> eksklusivt for verifiserte medlemmer av ATLAS Travel Club. Gjelder kun losji og avtalt halvpensjon på deltagende partnerhoteller. Ikke overdragelig. Support: <span style="color:#0284c7;">vip@atlasclub.web.app</span> | Tlf: +47 40059493.
        </div>
        <div style="text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 9px;">
          ATLAS-SEC-VAL: OK<br>
          HARD ROCK CAPITAL LTD
        </div>
      </div>
    </div>

    <div class="gold-trim-bottom"></div>
  </div>

</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    console.error('Error serving certificate:', err);
    return NextResponse.json(
      { error: 'Failed to generate certificate', message: err.message },
      { status: 500 }
    );
  }
}
