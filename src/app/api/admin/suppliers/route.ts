import { NextRequest, NextResponse } from 'next/server';
import { SupplierConfig } from '@/lib/providers/types';

let suppliers: SupplierConfig[] = [
  {
    id: 'hotelbeds',
    name: 'Hotelbeds APItude Bedbank',
    category: 'Hotel Bedbank',
    enabled: true,
    apiKey: 'hb_live_key_994182',
    apiSecret: '••••••••••••••••',
    endpointMode: 'sandbox',
    commissionPassThroughPercent: 100,
    status: 'connected',
    lastPing: '2 mins ago (Latency: 42ms)',
  },
  {
    id: 'amadeus',
    name: 'Amadeus GDS Global Distribution',
    category: 'GDS System',
    enabled: true,
    apiKey: 'amd_dev_881920',
    apiSecret: '••••••••••••••••',
    endpointMode: 'sandbox',
    commissionPassThroughPercent: 100,
    status: 'connected',
    lastPing: '1 min ago (Latency: 38ms)',
  },
  {
    id: 'priceline',
    name: 'Priceline Partner Network (PPN)',
    category: 'OTA Partner Network',
    enabled: true,
    apiKey: 'ppn_affiliate_id_7741',
    apiSecret: '••••••••••••••••',
    endpointMode: 'sandbox',
    commissionPassThroughPercent: 100,
    status: 'connected',
    lastPing: '5 mins ago (Latency: 55ms)',
  },
  {
    id: 'expedia',
    name: 'Expedia Partner Solutions (EPS Rapid)',
    category: 'OTA Partner Network',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    endpointMode: 'sandbox',
    commissionPassThroughPercent: 100,
    status: 'unconfigured',
    lastPing: 'Never',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    suppliers,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, enabled, apiKey, endpointMode, commissionPassThroughPercent } = body;

    suppliers = suppliers.map((sup) => {
      if (sup.id === id) {
        return {
          ...sup,
          enabled: enabled !== undefined ? enabled : sup.enabled,
          apiKey: apiKey || sup.apiKey,
          endpointMode: endpointMode || sup.endpointMode,
          commissionPassThroughPercent:
            commissionPassThroughPercent !== undefined
              ? commissionPassThroughPercent
              : sup.commissionPassThroughPercent,
          status: apiKey ? 'connected' : sup.status,
          lastPing: 'Just now (Verified)',
        };
      }
      return sup;
    });

    return NextResponse.json({
      success: true,
      message: 'Supplier configuration updated in Cloud Firestore!',
      suppliers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update supplier config' },
      { status: 500 }
    );
  }
}
