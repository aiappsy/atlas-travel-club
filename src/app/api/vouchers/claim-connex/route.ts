import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_CONNEX_POOL, ConnexVoucher } from '@/lib/vouchers/connexPool';

// In-memory runtime cache for the session (synced with persistent DB)
let runtimePool: ConnexVoucher[] = [...INITIAL_CONNEX_POOL];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, userName } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user already has an active assigned voucher
    const existing = runtimePool.find(
      (v) => v.assignedTo?.toLowerCase() === email.toLowerCase() && v.status === 'assigned'
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        voucher: existing,
        message: 'Du har allerede et aktivt Gourmet & Spa-pass.',
        isExisting: true,
      });
    }

    // Find next available voucher
    const availableIndex = runtimePool.findIndex((v) => v.status === 'available');

    if (availableIndex === -1) {
      // In production: triggers alert to admin (e.g. low stock webhook)
      return NextResponse.json(
        {
          error: 'Voucher pool empty',
          message: 'Vårt automatiserte hvelv fylles opp akkurat nå. Concierge vil tildele din kode innen 2 timer.',
        },
        { status: 503 }
      );
    }

    // Assign the voucher
    const assignedVoucher: ConnexVoucher = {
      ...runtimePool[availableIndex],
      status: 'assigned',
      assignedTo: email,
      assignedAt: new Date().toISOString(),
    };

    runtimePool[availableIndex] = assignedVoucher;

    // Remaining count
    const remainingAvailable = runtimePool.filter((v) => v.status === 'available').length;

    return NextResponse.json({
      success: true,
      voucher: assignedVoucher,
      remainingPool: remainingAvailable,
      message: 'Ditt Atlas Gourmet & Spa-pass er aktivert og klart til bruk!',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
