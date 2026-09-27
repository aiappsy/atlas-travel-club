import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface FxCache {
  timestamp: number;
  rates: Record<string, number>;
  date: string;
}

let cachedFx: FxCache | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache

export async function GET(request: NextRequest) {
  const now = Date.now();

  // Return cached rates if fresh
  if (cachedFx && now - cachedFx.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      source: 'European Central Bank (ECB via Frankfurter)',
      base: 'USD',
      date: cachedFx.date,
      cached: true,
      rates: cachedFx.rates,
    });
  }

  try {
    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Frankfurter API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const rawRates: Record<string, number> = data.rates || {};

    // Standardize all 19 ATLAS supported currencies
    const rates: Record<string, number> = {
      USD: 1.0,
      EUR: rawRates.EUR || 0.92,
      GBP: rawRates.GBP || 0.79,
      PHP: rawRates.PHP || 58.5,
      AUD: rawRates.AUD || 1.52,
      CAD: rawRates.CAD || 1.38,
      SGD: rawRates.SGD || 1.34,
      JPY: rawRates.JPY || 155.0,
      CHF: rawRates.CHF || 0.88,
      AED: 3.6725, // UAE Dirham is formally pegged to USD
      THB: rawRates.THB || 36.5,
      HKD: rawRates.HKD || 7.8,
      NZD: rawRates.NZD || 1.65,
      NOK: rawRates.NOK || 10.8,
      SEK: rawRates.SEK || 10.6,
      DKK: rawRates.DKK || 6.85,
      INR: rawRates.INR || 83.5,
      IDR: rawRates.IDR || 15800.0,
      MYR: rawRates.MYR || 4.72,
    };

    cachedFx = {
      timestamp: now,
      rates,
      date: data.date || new Date().toISOString().split('T')[0],
    };

    return NextResponse.json({
      source: 'European Central Bank (ECB via Frankfurter)',
      base: 'USD',
      date: cachedFx.date,
      cached: false,
      rates,
    });
  } catch (error: any) {
    console.warn('[FX API] Failed to fetch live ECB rates, returning fallback:', error?.message);

    // If cache exists even if expired, return it
    if (cachedFx) {
      return NextResponse.json({
        source: 'European Central Bank (ECB Cached)',
        base: 'USD',
        date: cachedFx.date,
        cached: true,
        rates: cachedFx.rates,
      });
    }

    // Default baseline rates
    return NextResponse.json({
      source: 'ATLAS Standard Fixed Interbank Baseline',
      base: 'USD',
      date: new Date().toISOString().split('T')[0],
      cached: true,
      rates: {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        PHP: 58.5,
        AUD: 1.52,
        CAD: 1.38,
        SGD: 1.34,
        JPY: 155.0,
        CHF: 0.88,
        AED: 3.6725,
        THB: 36.5,
        HKD: 7.8,
        NZD: 1.65,
        NOK: 10.8,
        SEK: 10.6,
        DKK: 6.85,
        INR: 83.5,
        IDR: 15800.0,
        MYR: 4.72,
      },
    });
  }
}
