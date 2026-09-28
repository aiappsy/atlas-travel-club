import { NextRequest, NextResponse } from 'next/server';

// Mapping of ISO 3166-1 alpha-2 country codes to supported currency codes
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Scandinavia
  NO: 'NOK',
  SE: 'SEK',
  DK: 'DKK',

  // United Kingdom
  GB: 'GBP',
  UK: 'GBP',

  // North America
  US: 'USD',
  CA: 'CAD',

  // Asia Pacific
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  SG: 'SGD',
  HK: 'HKD',
  TH: 'THB',
  PH: 'PHP',
  IN: 'INR',
  ID: 'IDR',
  MY: 'MYR',

  // Middle East
  AE: 'AED',

  // Switzerland
  CH: 'CHF',

  // Eurozone
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  IE: 'EUR',
  GR: 'EUR',
  LU: 'EUR',
  CY: 'EUR',
  MT: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  EE: 'EUR',
  LV: 'EUR',
  LT: 'EUR',
  HR: 'EUR',
};

export async function GET(request: NextRequest) {
  try {
    // 1. Check direct edge / CDN geolocation headers
    const cfCountry = request.headers.get('cf-ipcountry');
    const vercelCountry = request.headers.get('x-vercel-ip-country');
    const fastlyCountry = request.headers.get('fastly-client-country');
    const headerCountry = (cfCountry || vercelCountry || fastlyCountry || '').toUpperCase();

    if (headerCountry && COUNTRY_TO_CURRENCY[headerCountry]) {
      return NextResponse.json({
        country: headerCountry,
        currency: COUNTRY_TO_CURRENCY[headerCountry],
        source: 'edge-header',
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
      });
    }

    // 2. Extract Client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    let clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '').trim();

    // Clean up local/private loopback IPs
    const isLocal = !clientIp || clientIp === '::1' || clientIp === '127.0.0.1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.');

    if (!isLocal) {
      // Query fast free geolocation service
      try {
        const geoRes = await fetch(`https://api.country.is/${clientIp}`, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(2500),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const country = (geoData?.country || '').toUpperCase();
          const currency = COUNTRY_TO_CURRENCY[country] || 'USD';
          return NextResponse.json({
            country,
            currency,
            ip: clientIp,
            source: 'country.is',
          }, {
            headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
          });
        }
      } catch {
        // Fallback to secondary service
        try {
          const whoRes = await fetch(`https://ipwho.is/${clientIp}`, {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(2500),
          });
          if (whoRes.ok) {
            const whoData = await whoRes.json();
            const country = (whoData?.country_code || '').toUpperCase();
            const currency = COUNTRY_TO_CURRENCY[country] || 'USD';
            return NextResponse.json({
              country,
              currency,
              ip: clientIp,
              source: 'ipwho.is',
            }, {
              headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
            });
          }
        } catch {
          // ignore
        }
      }
    }

    // 3. Fallback for local development or unidentified IP: fetch caller's public IP
    try {
      const publicGeo = await fetch('https://api.country.is/', {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(2500),
      });
      if (publicGeo.ok) {
        const data = await publicGeo.json();
        const country = (data?.country || '').toUpperCase();
        const currency = COUNTRY_TO_CURRENCY[country] || 'USD';
        return NextResponse.json({
          country,
          currency,
          source: 'public-ip',
        });
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      country: 'US',
      currency: 'USD',
      source: 'default',
    });
  } catch (error) {
    return NextResponse.json({
      country: 'US',
      currency: 'USD',
      source: 'error-fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
