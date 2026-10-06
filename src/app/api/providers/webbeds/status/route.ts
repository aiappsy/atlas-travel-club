import { NextRequest, NextResponse } from 'next/server';
import { webbedsProvider } from '@/lib/providers/webbeds';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const status = await webbedsProvider.checkStatus();
    const isSandbox = process.env.WEBBEDS_ENV !== 'live';

    return NextResponse.json({
      connected: status.success,
      provider: 'webbeds',
      gateway: isSandbox ? 'WebBeds Direct B2B Sandbox (trade-test.sunhotels.net)' : 'WebBeds Production Gateway',
      environment: isSandbox ? 'test' : 'production',
      apiStatus: status.status,
      latencyMs: status.latencyMs,
      timestamp: new Date().toISOString(),
      authType: 'B2B Client Credentials (Sunhotels/DOTW/JacTravel)',
      error: status.error || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        provider: 'webbeds',
        error: error?.message || 'Failed to ping WebBeds',
      },
      { status: 500 }
    );
  }
}
