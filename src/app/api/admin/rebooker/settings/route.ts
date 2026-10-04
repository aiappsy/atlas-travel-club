import { NextRequest, NextResponse } from 'next/server';

// Server-side in-memory store for rebooker configuration (fallback if DB not connected)
let rebookerSettingsStore = {
  provider: 'pruvo',
  environment: 'sandbox',
  apiKey: process.env.PRUVO_API_KEY || '',
  apiSecret: process.env.PRUVO_API_SECRET || '',
  partnerId: process.env.PRUVO_PARTNER_ID || '',
  webhookSecret: process.env.PRUVO_WEBHOOK_SECRET || '',
  minSavingsThresholdUsd: 50,
  cancellationBufferHours: 48,
  executionMode: 'autonomous',
  refundAllocation: 'standard_split',
  autoScanFrequencyHours: 4,
  isEnabled: true,
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    settings: {
      ...rebookerSettingsStore,
      // Mask secret keys for safe admin inspection
      apiKeyMasked: rebookerSettingsStore.apiKey
        ? `${rebookerSettingsStore.apiKey.substring(0, 6)}••••••••${rebookerSettingsStore.apiKey.slice(-4)}`
        : null,
      apiSecretMasked: rebookerSettingsStore.apiSecret ? '••••••••••••••••' : null,
      webhookSecretMasked: rebookerSettingsStore.webhookSecret ? '••••••••••••••••' : null,
      hasApiKey: Boolean(rebookerSettingsStore.apiKey),
      hasApiSecret: Boolean(rebookerSettingsStore.apiSecret),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      provider,
      environment,
      apiKey,
      apiSecret,
      partnerId,
      webhookSecret,
      minSavingsThresholdUsd,
      cancellationBufferHours,
      executionMode,
      refundAllocation,
      autoScanFrequencyHours,
      isEnabled,
    } = body;

    rebookerSettingsStore = {
      provider: provider || rebookerSettingsStore.provider,
      environment: environment || rebookerSettingsStore.environment,
      apiKey: apiKey !== undefined ? apiKey : rebookerSettingsStore.apiKey,
      apiSecret: apiSecret !== undefined ? apiSecret : rebookerSettingsStore.apiSecret,
      partnerId: partnerId !== undefined ? partnerId : rebookerSettingsStore.partnerId,
      webhookSecret: webhookSecret !== undefined ? webhookSecret : rebookerSettingsStore.webhookSecret,
      minSavingsThresholdUsd: typeof minSavingsThresholdUsd === 'number' ? minSavingsThresholdUsd : rebookerSettingsStore.minSavingsThresholdUsd,
      cancellationBufferHours: typeof cancellationBufferHours === 'number' ? cancellationBufferHours : rebookerSettingsStore.cancellationBufferHours,
      executionMode: executionMode || rebookerSettingsStore.executionMode,
      refundAllocation: refundAllocation || rebookerSettingsStore.refundAllocation,
      autoScanFrequencyHours: typeof autoScanFrequencyHours === 'number' ? autoScanFrequencyHours : rebookerSettingsStore.autoScanFrequencyHours,
      isEnabled: typeof isEnabled === 'boolean' ? isEnabled : rebookerSettingsStore.isEnabled,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Autonomous Re-Booker configuration saved successfully.',
      settings: {
        ...rebookerSettingsStore,
        hasApiKey: Boolean(rebookerSettingsStore.apiKey),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to update re-booker settings' },
      { status: 400 }
    );
  }
}
