import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const reference = searchParams.get('reference') || 'ATLAS-SPA-000000';
    const hotelName = searchParams.get('hotelName') || 'Curated VIP Alpine Resort';
    const location = searchParams.get('location') || 'Europe';
    const guestName = searchParams.get('guestName') || 'Valued ATLAS VIP Member';
    const checkIn = searchParams.get('checkIn') || 'Upon Confirmation';
    const nights = searchParams.get('nights') || '3';
    const voucherCode = searchParams.get('voucherCode') || 'HP-8492-ATLAS-VIP';
    const halfBoard = searchParams.get('halfBoard') || 'Settled at hotel checkout';

    // Generate PDF via PDFKit
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      info: {
        Title: `ATLAS VIP Check-In Certificate - ${reference}`,
        Author: 'HARD ROCK CAPITAL LTD',
        Subject: 'Official Hotel Reservation & Check-In Credential',
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));
    });

    // 1. Top Decorative Header Bar
    doc.rect(40, 40, 515, 6).fill('#d97706'); // Warm Amber Gold

    // 2. Main Header Container
    doc.rect(40, 46, 515, 80).fill('#090d16'); // Dark Navy

    doc
      .fillColor('#fbbf24')
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('ATLAS TRAVEL CLUB — SOVEREIGN PRIVATE MEMBER CREDENTIAL', 60, 60, {
        characterSpacing: 1.5,
      });

    doc
      .fillColor('#ffffff')
      .fontSize(18)
      .font('Helvetica-Bold')
      .text('OFFICIAL VIP HOTEL CHECK-IN CERTIFICATE', 60, 78);

    doc
      .fillColor('#94a3b8')
      .fontSize(8)
      .font('Helvetica')
      .text(
        'ISSUED BY HARD ROCK CAPITAL LTD (UK REG. #16833237) • 71-75 SHELTON STREET, LONDON, WC2H 9JQ',
        60,
        104
      );

    // 3. Status Badge & Reference
    let y = 145;

    doc.rect(40, y, 515, 45).fill('#f8fafc').stroke('#e2e8f0');

    doc
      .fillColor('#64748b')
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('BOOKING REFERENCE', 55, y + 12);

    doc
      .fillColor('#0f172a')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(reference, 55, y + 24);

    doc
      .fillColor('#64748b')
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('STATUS', 380, y + 12);

    doc
      .fillColor('#059669')
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('CLEARED & CONFIRMED', 380, y + 25);

    // 4. Reservation Details Table
    y = 205;

    doc
      .fillColor('#0f172a')
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('RESERVATION & PROPERTY DETAILS', 40, y);

    y += 20;

    const drawRow = (label: string, value: string, currentY: number) => {
      doc.rect(40, currentY, 515, 26).fill(currentY % 52 === 0 ? '#f8fafc' : '#ffffff');
      doc.fillColor('#64748b').fontSize(9).font('Helvetica-Bold').text(label, 55, currentY + 8);
      doc.fillColor('#0f172a').fontSize(9).font('Helvetica').text(value, 220, currentY + 8);
      doc.moveTo(40, currentY + 26).lineTo(555, currentY + 26).strokeColor('#e2e8f0').stroke();
    };

    drawRow('Registered Guest (Member):', guestName, y);
    y += 26;
    drawRow('Hotel Property:', hotelName, y);
    y += 26;
    drawRow('Destination / Region:', location, y);
    y += 26;
    drawRow('Requested Check-In Date:', checkIn, y);
    y += 26;
    drawRow('Length of Stay:', `${nights} Nights (Double Room for 2 Adults)`, y);
    y += 26;
    drawRow('Room Accommodation Rate:', '0.00 EUR / 0.00 NOK (100% Covered by ATLAS)', y);
    y += 26;
    drawRow('Mandatory Meal Plan at Hotel:', halfBoard, y);
    y += 35;

    // 5. Official Redemption / Clearing Box (Golden Border)
    doc.rect(40, y, 515, 75).fill('#fffbeb').stroke('#d97706');

    doc
      .fillColor('#92400e')
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('HOTEL FRONT DESK / CLEARING INSTRUCTIONS', 55, y + 12);

    doc
      .fillColor('#78350f')
      .fontSize(10)
      .font('Helvetica')
      .text(
        'Please present this voucher upon check-in. The lodging charge is covered in full via the Europe Hotel Allotment Clearing Network (Connex / Holiday Plus). Only published half-board meal costs are to be billed directly to the guest upon checkout.',
        55,
        y + 26,
        { width: 485, lineGap: 3 }
      );

    // 6. Security Clearing Code Key Box
    y += 90;

    doc.rect(40, y, 515, 50).fill('#0f172a');

    doc
      .fillColor('#94a3b8')
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('OFFICIAL CLEARING CODE (CONNEX / HOLIDAY PLUS NETWORK)', 55, y + 12);

    doc
      .fillColor('#fbbf24')
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(voucherCode, 55, y + 25, { characterSpacing: 2 });

    doc
      .fillColor('#38bdf8')
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('VERIFIED VIP PASS', 420, y + 27);

    // 7. Security Notice & Footer
    y += 65;

    doc
      .fillColor('#94a3b8')
      .fontSize(7.5)
      .font('Helvetica')
      .text(
        'LEGAL & REGULATORY NOTICE: This credential is an accommodation certificate issued by HARD ROCK CAPITAL LTD exclusively to authorized ATLAS VIP club members. Valid only for lodging and specified half-board arrangements at participating partner hotels. Non-transferable, non-refundable for cash value. For verification or concierge assistance, contact vip@atlasclub.web.app or +47 40059493.',
        40,
        y,
        { width: 515, lineGap: 2.5 }
      );

    // Bottom Decorative Bar
    doc.rect(40, 770, 515, 3).fill('#d97706');

    doc
      .fillColor('#94a3b8')
      .fontSize(7)
      .font('Helvetica')
      .text(
        `Generated: ${new Date().toUTCString()} • ATLAS Travel Club • https://atlasclub.web.app`,
        40,
        780,
        { align: 'center', width: 515 }
      );

    doc.end();

    const pdfBuffer = await pdfBufferPromise;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ATLAS-Certificate-${reference}.pdf"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    console.error('Error generating PDF certificate:', err);
    return NextResponse.json(
      { error: 'Failed to generate certificate', message: err.message },
      { status: 500 }
    );
  }
}
