import { NextRequest, NextResponse } from 'next/server';
import { ratehawkProvider } from '@/lib/providers/ratehawk';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const status = await ratehawkProvider.checkStatus();
    const isSandbox = process.env.RATEHAWK_ENV !== 'live';

    return NextResponse.json({
      connected: status.success,
      provider: 'ratehawk',
      gateway: isSandbox ? 'RateHawk B2B Sandbox (api.worldota.net/api/b2b/v3)' : 'RateHawk Production Gateway',
      environment: isSandbox ? 'test' : 'production',
      apiStatus: status.status,
      latencyMs: status.latencyMs,
      timestamp: new Date().toISOString(),
      authType: 'HTTP Basic Auth (KeyId:ApiKey) - WorldOTA v3',
      error: status.error || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        provider: 'ratehawk',
        error: error?.message || 'Failed to ping RateHawk',
      },
      { status: 500 }
    );
  }
}
