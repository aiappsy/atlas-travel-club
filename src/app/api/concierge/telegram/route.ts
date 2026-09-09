import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    const chatId = message?.chat?.id;
    const text = message?.text || '';

    if (!chatId) {
      return NextResponse.json({ success: true, message: 'No chat ID detected' });
    }

    // Call internal concierge engine
    const host = req.headers.get('host') || 'localhost:3005';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    let aiReply = '✨ ATLAS Concierge: How may I assist your sovereign travel itinerary today?';
    
    try {
      const conciergeRes = await fetch(`${protocol}://${host}/api/concierge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await conciergeRes.json();
      if (data.reply) {
        aiReply = data.reply;
      }
    } catch (err) {
      console.error('Error forwarding to internal concierge:', err);
    }

    return NextResponse.json({
      method: 'sendMessage',
      chat_id: chatId,
      text: aiReply,
      parse_mode: 'Markdown',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process Telegram webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'ATLAS Telegram VIP Concierge Bridge',
    bot: '@AtlasConciergeBot',
  });
}
