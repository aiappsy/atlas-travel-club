import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData().catch(() => null);
    let incomingText = '';
    let fromNumber = '';

    if (formData) {
      incomingText = (formData.get('Body') as string) || '';
      fromNumber = (formData.get('From') as string) || '';
    } else {
      const json = await req.json().catch(() => ({}));
      incomingText = json?.text || json?.message || '';
      fromNumber = json?.from || '';
    }

    const host = req.headers.get('host') || 'localhost:3005';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    let aiReply = '✨ ATLAS WhatsApp Concierge: Welcome. How can I assist your luxury travel today?';

    try {
      const conciergeRes = await fetch(`${protocol}://${host}/api/concierge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: incomingText }),
      });
      const data = await conciergeRes.json();
      if (data.reply) {
        aiReply = data.reply;
      }
    } catch (err) {
      console.error('Error in WhatsApp concierge forward:', err);
    }

    // Return clean TwiML or JSON format
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${aiReply}</Message></Response>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process WhatsApp webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'ATLAS WhatsApp Business VIP Bridge',
    phone: '+1 (800) 847-ATLAS',
  });
}
