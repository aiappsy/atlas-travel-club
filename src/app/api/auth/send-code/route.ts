import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const GMAIL_USER = process.env.GMAIL_USER || process.env.SENDER_EMAIL || 'paljuritzen@gmail.com';
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || 'fdywbphwfsruudha').replace(/\s+/g, '');

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipientEmail, recipientName, verificationCode, channel, phone } = body;

    if (!recipientEmail || !verificationCode) {
      return NextResponse.json(
        { success: false, error: 'Recipient email and verification code are required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 30px; background-color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #F8FAFC;">
      <div style="max-width: 520px; margin: 0 auto; background-color: #1E293B; border: 1px solid #F59E0B50; border-radius: 20px; padding: 36px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
        <h1 style="font-family: Georgia, serif; color: #FFFFFF; letter-spacing: 4px; font-size: 22px; margin: 0 0 6px 0;">ATLAS TRAVEL CLUB</h1>
        <p style="color: #F59E0B; font-family: monospace; font-size: 11px; margin: 0 0 24px 0; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Founder Member Security Verification</p>
        
        <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          Hello <strong>${recipientName || 'Founder Applicant'}</strong>,<br>
          Please use the following 6-digit authentication code to verify your registration and unlock your official Sovereign Founder Member Diploma:
        </p>
        
        <div style="background-color: #0F172A; border: 2px solid #F59E0B; border-radius: 14px; padding: 18px 24px; margin: 0 auto 24px auto; display: inline-block; letter-spacing: 10px; font-size: 34px; font-weight: 900; font-family: monospace; color: #FDE68A;">
          ${verificationCode}
        </div>
        
        <p style="color: #94A3B8; font-size: 12px; line-height: 1.5; margin-bottom: 24px;">
          This code expires in 15 minutes. Once entered on the registration page, your official Diploma of Membership and 0% markup wholesale access will be activated immediately.
        </p>

        <div style="background-color: #0F172A40; border: 1px solid #334155; border-radius: 10px; padding: 12px; font-size: 11px; color: #64748B;">
          🔒 Security Notice: Never share this authentication code with anyone. ATLAS staff will never ask for your verification code.
        </div>

        <hr style="border: none; border-top: 1px solid #334155; margin: 28px 0 20px 0;">
        <p style="color: #64748B; font-size: 11px; font-family: monospace; margin: 0;">
          The Sovereign Registry &bull; ATLAS Travel Club &bull; atlastravelclub.com
        </p>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: `"ATLAS Travel Club Verification" <${GMAIL_USER}>`,
      to: recipientEmail,
      subject: `Your ATLAS Founder Verification Code: ${verificationCode}`,
      html: htmlContent,
    });

    console.log(`[Gmail Verification Success] Sent to ${recipientEmail} (ID: ${info.messageId})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Verification code successfully dispatched to your email inbox.',
        messageId: info.messageId,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error: any) {
    console.error('[Verification API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to dispatch verification email',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}
