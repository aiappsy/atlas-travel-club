import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const initialLang = (searchParams.get('lang') || 'en').toLowerCase();

    const now = new Date();
    const issueDateEn = now.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const issueDateNo = now.toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      `https://atlasclub.web.app/api/vouchers/validate?code=${voucherCode}&ref=${reference}`
    )}`;

    const html = `<!DOCTYPE html>
<html lang="${initialLang === 'no' ? 'no' : 'en'}">
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
      max-width: 840px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 20px;
      padding: 14px 20px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    .bar-title {
      color: #cbd5e1;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .controls-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .lang-switcher {
      display: inline-flex;
      background: #0f172a;
      padding: 3px;
      border-radius: 10px;
      border: 1px solid #334155;
    }

    .lang-btn {
      padding: 6px 12px;
      border-radius: 7px;
      font-size: 11px;
      font-weight: 700;
      border: none;
      background: transparent;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lang-btn.active {
      background: #d97706;
      color: #0b1120;
      font-weight: 800;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px;
      border-radius: 10px;
      font-size: 12px;
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
      max-width: 840px;
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
      width: 84px;
      height: 84px;
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
      line-height: 1.15;
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
    <div class="bar-title">
      <span>🏨</span>
      <span id="txt-bar-title">${initialLang === 'no' ? 'ATLAS Hotel Breaks — Offisielt Innsjekkingsbevis' : 'ATLAS Hotel Breaks — Official Check-In Certificate'}</span>
    </div>
    
    <div class="controls-group">
      <!-- Language Switcher -->
      <div class="lang-switcher">
        <button id="btn-lang-en" onclick="setLanguage('en')" class="lang-btn ${initialLang !== 'no' ? 'active' : ''}">🇬🇧 English</button>
        <button id="btn-lang-no" onclick="setLanguage('no')" class="lang-btn ${initialLang === 'no' ? 'active' : ''}">🇳🇴 Norsk</button>
      </div>

      <button onclick="window.print()" class="btn btn-gold">
        <span id="txt-print-btn">${initialLang === 'no' ? '🖨️ Skriv ut / Lagre som PDF' : '🖨️ Print / Save as PDF'}</span>
      </button>

      <a href="/hotel-breaks" class="btn btn-ghost">
        <span id="txt-back-btn">${initialLang === 'no' ? '← Tilbake' : '← Back to ATLAS'}</span>
      </a>
    </div>
  </div>

  <!-- A4 Printable Certificate Container -->
  <div class="certificate">
    <div class="gold-trim-top"></div>

    <!-- Header -->
    <div class="cert-header">
      <div class="cert-title-area">
        <h2 id="txt-cert-pre">ATLAS TRAVEL CLUB • PRIVATE MEMBER CREDENTIAL</h2>
        <h1 id="txt-cert-title">OFFICIAL HOTEL CHECK-IN CERTIFICATE</h1>
        <p>ISSUED BY HARD ROCK CAPITAL LTD (UK REG. #16833237) • 71-75 SHELTON ST, LONDON WC2H 9JQ</p>
      </div>
      <div class="issuer-seal">
        <span>★ ATLAS ★</span>
        <span>VIP PASS</span>
        <span id="txt-seal-status">CLEARED</span>
      </div>
    </div>

    <!-- Body -->
    <div class="cert-body">
      <!-- Reference Bar -->
      <div class="ref-bar">
        <div class="ref-item">
          <span class="label" id="txt-label-ref">${initialLang === 'no' ? 'Bookingreferanse' : 'Booking Reference'}</span>
          <span class="value">${reference}</span>
        </div>
        <div class="ref-item">
          <span class="label" id="txt-label-issued">${initialLang === 'no' ? 'Utstedt Dato' : 'Issue Date'}</span>
          <span class="value" id="txt-val-issued" style="font-size: 13px;">${initialLang === 'no' ? issueDateNo : issueDateEn}</span>
        </div>
        <div class="ref-item" style="text-align: right;">
          <span class="label" id="txt-label-status">${initialLang === 'no' ? 'Sikkerhetsstatus' : 'Verification Status'}</span>
          <span class="status-badge" id="txt-val-status">${initialLang === 'no' ? '● 100% BEKREFTET' : '● 100% VERIFIED & CLEARED'}</span>
        </div>
      </div>

      <!-- Property & Reservation Table -->
      <div class="section-title" id="txt-table-title">${initialLang === 'no' ? 'Hotell- og Reservasjonsdetaljer' : 'Reservation & Property Details'}</div>
      <table class="details-table">
        <tr>
          <td class="label" id="txt-row-guest">${initialLang === 'no' ? 'Registrert Medlem (Gjest):' : 'Registered Guest (Member):'}</td>
          <td class="value">${guestName}</td>
        </tr>
        <tr>
          <td class="label" id="txt-row-hotel">${initialLang === 'no' ? 'Hotelleiendom:' : 'Hotel Property:'}</td>
          <td class="value">${hotelName}</td>
        </tr>
        <tr>
          <td class="label" id="txt-row-loc">${initialLang === 'no' ? 'Destinasjon / Område:' : 'Destination / Region:'}</td>
          <td class="value">${location}</td>
        </tr>
        <tr>
          <td class="label" id="txt-row-date">${initialLang === 'no' ? 'Ønsket Innsjekkingsdato:' : 'Requested Check-In Date:'}</td>
          <td class="value">${checkIn}</td>
        </tr>
        <tr>
          <td class="label" id="txt-row-nights">${initialLang === 'no' ? 'Oppholdets Varighet:' : 'Length of Stay:'}</td>
          <td class="value" id="txt-val-nights">${nights} ${initialLang === 'no' ? 'Netter (Dobbeltrom for 2 voksne)' : 'Nights (Double Room for 2 Adults)'}</td>
        </tr>
        <tr>
          <td class="label" id="txt-row-roomcost">${initialLang === 'no' ? 'Rompris (Losji):' : 'Room Accommodation Rate:'}</td>
          <td class="value">
            <span class="rate-free" id="txt-val-roomcost">
              ${initialLang === 'no' ? '0 kr / 0.00 EUR — 100% Dekket av ATLAS VIP-Pass' : '0.00 EUR / $0.00 — 100% Cleared by ATLAS VIP Pass'}
            </span>
          </td>
        </tr>
        <tr>
          <td class="label" id="txt-row-meals">${initialLang === 'no' ? 'Måltidsordning (Halvpensjon):' : 'Mandatory Meal Plan at Hotel:'}</td>
          <td class="value" id="txt-val-meals">${halfBoard} (${initialLang === 'no' ? 'oppgjøres direkte på hotellet ved utsjekk' : 'settled directly at hotel checkout'})</td>
        </tr>
      </table>

      <!-- Clearing Key Box -->
      <div class="clearing-box">
        <div class="clearing-info">
          <div class="label" id="txt-clearing-title">
            ${initialLang === 'no' ? 'Offisiell Oppgjørsnøkkel (Holiday Plus / Connex Clearing Network)' : 'Official Clearing Key (Holiday Plus / Connex Clearing Network)'}
          </div>
          <div class="code">${voucherCode}</div>
          <div class="subtext" id="txt-clearing-sub">
            ${initialLang === 'no'
              ? 'Denne autoriserte koden bekrefter at romprisen er fullt oppgjort gjennom det europeiske hotellkvotenettverket.'
              : 'This authorized voucher code clears the room rate in full through the European Hotel Allotment Clearing Network.'}
          </div>
        </div>
        <div class="qr-container">
          <img src="${qrDataUrl}" alt="QR Validation Code">
        </div>
      </div>

      <!-- Hotel Front Desk Instructions -->
      <div class="hotel-instructions">
        <h4 id="txt-inst-title">Front Desk Instructions / Rezeptionshinweise</h4>
        <p>
          <strong>English:</strong> Please present this credential upon check-in. The lodging charge is covered in full via the Europe Hotel Allotment Clearing Network (Connex / Holiday Plus). Only published hotel half-board dining is to be billed directly to the guest upon checkout.
        </p>
        <p class="german">
          <strong>Deutsch:</strong> Gültiger Hotel-Voucher. Die Übernachtungskosten sind über das Holiday Plus / Connex Verrechnungssystem vollständig abgedeckt. Der Gast begleicht lediglich die vereinbarte Halbpension bei Abreise vor Ort im Hotel.
        </p>
      </div>

      <!-- Airport Arrival & Ground Transit Copilot Banner -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: #fef3c7; border: 1px solid #fde68a; display: flex; align-items: center; justify-content: center; font-size: 16px; shrink: 0;">
            ✈️
          </div>
          <div>
            <div id="txt-transit-title" style="font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
              ${initialLang === 'no' ? 'Flyplass & Transport (AI Ruteassistent)' : 'Airport Arrival & Transit Copilot'}
            </div>
            <div id="txt-transit-sub" style="font-size: 10px; color: #64748b; line-height: 1.4;">
              ${initialLang === 'no' 
                ? 'Trenger du privatsjåfør, leiebil eller tog til hotellet? Se dine 3 alternativer og spør AI Ruteassistenten.' 
                : 'Need a private chauffeur, wholesale car rental, or scenic train to the property? Access your route plan in Atlas.'}
            </div>
          </div>
        </div>
        <a href="/hotel-breaks" class="action-btn" id="txt-transit-btn" style="text-decoration: none; padding: 7px 14px; font-size: 10px; font-weight: 700; background: #0f172a; color: #ffffff; border-radius: 8px; shrink: 0; white-space: nowrap;">
          ${initialLang === 'no' ? 'Åpne Ruteassistent →' : 'Open Transit Copilot →'}
        </a>
      </div>

      <!-- Footer & Legal Disclosures -->
      <div class="cert-footer">
        <div class="legal-notice" id="txt-legal">
          ${initialLang === 'no'
            ? '<strong>Juridisk Merknad:</strong> Dette sertifikatet er utstedt av <strong>HARD ROCK CAPITAL LTD</strong> eksklusivt for verifiserte medlemmer av ATLAS Travel Club. Gjelder kun losji og avtalt halvpensjon på deltagende partnerhoteller. Ikke overdragelig. Support: <span style="color:#0284c7;">vip@atlasclub.web.app</span> | Tlf: +47 40059493.'
            : '<strong>Legal Notice:</strong> This credential is an accommodation certificate issued by <strong>HARD ROCK CAPITAL LTD</strong> exclusively to authorized ATLAS VIP club members. Valid for lodging and agreed half-board arrangements at participating partner hotels. Non-transferable. Support: <span style="color:#0284c7;">vip@atlasclub.web.app</span> | Phone: +47 40059493.'}
        </div>
        <div style="text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 9px;">
          ATLAS-SEC-VAL: OK<br>
          HARD ROCK CAPITAL LTD
        </div>
      </div>
    </div>

    <div class="gold-trim-bottom"></div>
  </div>

  <script>
    const DICTIONARY = {
      en: {
        barTitle: 'ATLAS Hotel Breaks — Official Check-In Certificate',
        printBtn: '🖨️ Print / Save as PDF',
        backBtn: '← Back to ATLAS',
        certTitle: 'OFFICIAL HOTEL CHECK-IN CERTIFICATE',
        sealStatus: 'CLEARED',
        labelRef: 'Booking Reference',
        labelIssued: 'Issue Date',
        valIssued: '${issueDateEn}',
        labelStatus: 'Verification Status',
        valStatus: '● 100% VERIFIED & CLEARED',
        tableTitle: 'Reservation & Property Details',
        rowGuest: 'Registered Guest (Member):',
        rowHotel: 'Hotel Property:',
        rowLoc: 'Destination / Region:',
        rowDate: 'Requested Check-In Date:',
        rowNights: 'Length of Stay:',
        valNights: '${nights} Nights (Double Room for 2 Adults)',
        rowRoomCost: 'Room Accommodation Rate:',
        valRoomCost: '0.00 EUR / $0.00 — 100% Cleared by ATLAS VIP Pass',
        rowMeals: 'Mandatory Meal Plan at Hotel:',
        valMeals: '${halfBoard} (settled directly at hotel checkout)',
        clearingTitle: 'Official Clearing Key (Holiday Plus / Connex Clearing Network)',
        clearingSub: 'This authorized voucher code clears the room rate in full through the European Hotel Allotment Clearing Network.',
        transitTitle: 'Airport Arrival & Transit Copilot',
        transitSub: 'Need a private chauffeur, wholesale car rental, or scenic train to the property? Access your route plan in Atlas.',
        transitBtn: 'Open Transit Copilot →',
        legal: '<strong>Legal Notice:</strong> This credential is an accommodation certificate issued by <strong>HARD ROCK CAPITAL LTD</strong> exclusively to authorized ATLAS VIP club members. Valid for lodging and agreed half-board arrangements at participating partner hotels. Non-transferable. Support: <span style="color:#0284c7;">vip@atlasclub.web.app</span> | Phone: +47 40059493.'
      },
      no: {
        barTitle: 'ATLAS Hotel Breaks — Offisielt Innsjekkingsbevis',
        printBtn: '🖨️ Skriv ut / Lagre som PDF',
        backBtn: '← Tilbake',
        certTitle: 'OFFISIELT HOTELL-INNSJEKKINGSBEVIS',
        sealStatus: 'BEKREFTET',
        labelRef: 'Bookingreferanse',
        labelIssued: 'Utstedt Dato',
        valIssued: '${issueDateNo}',
        labelStatus: 'Sikkerhetsstatus',
        valStatus: '● 100% BEKREFTET',
        tableTitle: 'Hotell- og Reservasjonsdetaljer',
        rowGuest: 'Registrert Medlem (Gjest):',
        rowHotel: 'Hotelleiendom:',
        rowLoc: 'Destinasjon / Område:',
        rowDate: 'Ønsket Innsjekkingsdato:',
        rowNights: 'Oppholdets Varighet:',
        valNights: '${nights} Netter (Dobbeltrom for 2 voksne)',
        rowRoomCost: 'Rompris (Losji):',
        valRoomCost: '0 kr / 0.00 EUR — 100% Dekket av ATLAS VIP-Pass',
        rowMeals: 'Måltidsordning (Halvpensjon):',
        valMeals: '${halfBoard} (oppgjøres direkte på hotellet ved utsjekk)',
        clearingTitle: 'Offisiell Oppgjørsnøkkel (Holiday Plus / Connex Clearing Network)',
        clearingSub: 'Denne autoriserte koden bekrefter at romprisen er fullt oppgjort gjennom det europeiske hotellkvotenettverket.',
        transitTitle: 'Flyplass & Transport (AI Ruteassistent)',
        transitSub: 'Trenger du privatsjåfør, leiebil eller tog til hotellet? Se dine 3 alternativer og spør AI Ruteassistenten.',
        transitBtn: 'Åpne Ruteassistent →',
        legal: '<strong>Juridisk Merknad:</strong> Dette sertifikatet er utstedt av <strong>HARD ROCK CAPITAL LTD</strong> eksklusivt for verifiserte medlemmer av ATLAS Travel Club. Gjelder kun losji og avtalt halvpensjon på deltagende partnerhoteller. Ikke overdragelig. Support: <span style="color:#0284c7;">vip@atlasclub.web.app</span> | Tlf: +47 40059493.'
      }
    };

    function setLanguage(lang) {
      const d = DICTIONARY[lang];
      if (!d) return;

      document.getElementById('txt-bar-title').innerText = d.barTitle;
      document.getElementById('txt-print-btn').innerText = d.printBtn;
      document.getElementById('txt-back-btn').innerText = d.backBtn;
      document.getElementById('txt-cert-title').innerText = d.certTitle;
      document.getElementById('txt-seal-status').innerText = d.sealStatus;
      document.getElementById('txt-label-ref').innerText = d.labelRef;
      document.getElementById('txt-label-issued').innerText = d.labelIssued;
      document.getElementById('txt-val-issued').innerText = d.valIssued;
      document.getElementById('txt-label-status').innerText = d.labelStatus;
      document.getElementById('txt-val-status').innerText = d.valStatus;
      document.getElementById('txt-table-title').innerText = d.tableTitle;
      document.getElementById('txt-row-guest').innerText = d.rowGuest;
      document.getElementById('txt-row-hotel').innerText = d.rowHotel;
      document.getElementById('txt-row-loc').innerText = d.rowLoc;
      document.getElementById('txt-row-date').innerText = d.rowDate;
      document.getElementById('txt-row-nights').innerText = d.rowNights;
      document.getElementById('txt-val-nights').innerText = d.valNights;
      document.getElementById('txt-row-roomcost').innerText = d.rowRoomCost;
      document.getElementById('txt-val-roomcost').innerText = d.valRoomCost;
      document.getElementById('txt-row-meals').innerText = d.rowMeals;
      document.getElementById('txt-val-meals').innerText = d.valMeals;
      document.getElementById('txt-clearing-title').innerText = d.clearingTitle;
      document.getElementById('txt-clearing-sub').innerText = d.clearingSub;
      if (document.getElementById('txt-transit-title')) document.getElementById('txt-transit-title').innerText = d.transitTitle;
      if (document.getElementById('txt-transit-sub')) document.getElementById('txt-transit-sub').innerText = d.transitSub;
      if (document.getElementById('txt-transit-btn')) document.getElementById('txt-transit-btn').innerText = d.transitBtn;
      document.getElementById('txt-legal').innerHTML = d.legal;

      const btnEn = document.getElementById('btn-lang-en');
      const btnNo = document.getElementById('btn-lang-no');
      if (lang === 'en') {
        btnEn.classList.add('active');
        btnNo.classList.remove('active');
      } else {
        btnNo.classList.add('active');
        btnEn.classList.remove('active');
      }
    }
  </script>
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
