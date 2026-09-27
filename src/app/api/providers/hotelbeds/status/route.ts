import { NextRequest, NextResponse } from 'next/server';
import { hotelbedsProvider } from '@/lib/providers/hotelbeds';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const status = await hotelbedsProvider.checkStatus();
    const isSandbox = process.env.HOTELBEDS_ENV !== 'live';

    return NextResponse.json({
      connected: status.success,
      provider: 'hotelbeds',
      gateway: isSandbox ? 'Hotelbeds APItude Sandbox Gateway (api.test.hotelbeds.com)' : 'Hotelbeds APItude Production Gateway',
      environment: isSandbox ? 'test' : 'production',
      apiStatus: status.status,
      latencyMs: status.latencyMs,
      timestamp: new Date().toISOString(),
      authType: 'HMAC-SHA256 (Api-key + Secret + Timestamp)',
      error: status.error || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        provider: 'hotelbeds',
        error: error?.message || 'Failed to ping Hotelbeds APItude',
      },
      { status: 500 }
    );
  }
}
