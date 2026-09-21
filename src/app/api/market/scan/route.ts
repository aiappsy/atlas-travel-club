import { NextRequest, NextResponse } from 'next/server';
import { runLiveMarketScan } from '@/lib/marketScanner';

export async function GET(req: NextRequest) {
  try {
    const marketReport = runLiveMarketScan();
    return NextResponse.json({
      success: true,
      report: marketReport,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to execute live travel market scan' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const marketReport = runLiveMarketScan();
    return NextResponse.json({
      success: true,
      message: 'Global travel market scanned across 50+ B2B bedbanks and OTAs in real-time',
      report: marketReport,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to execute live travel market scan' },
      { status: 500 }
    );
  }
}
