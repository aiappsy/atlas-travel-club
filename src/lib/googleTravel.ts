// Google Travel URL and currency formatting utilities
export const CURRENCY_TO_GOOGLE_LOCALE: Record<string, { gl: string; hl: string }> = {
  USD: { gl: 'us', hl: 'en' },
  EUR: { gl: 'de', hl: 'en' },
  GBP: { gl: 'gb', hl: 'en' },
  NOK: { gl: 'no', hl: 'no' },
  SEK: { gl: 'se', hl: 'sv' },
  DKK: { gl: 'dk', hl: 'da' },
  CHF: { gl: 'ch', hl: 'de' },
  CAD: { gl: 'ca', hl: 'en' },
  AUD: { gl: 'au', hl: 'en' },
  JPY: { gl: 'jp', hl: 'ja' },
  SGD: { gl: 'sg', hl: 'en' },
  AED: { gl: 'ae', hl: 'en' },
  SAR: { gl: 'sa', hl: 'ar' },
  INR: { gl: 'in', hl: 'en' },
  BRL: { gl: 'br', hl: 'pt' },
  MXN: { gl: 'mx', hl: 'es' },
  PLN: { gl: 'pl', hl: 'pl' },
  THB: { gl: 'th', hl: 'th' },
  HKD: { gl: 'hk', hl: 'en' },
};

export function formatGoogleTravelUrlWithCurrency(baseUrl: string, currencyCode: string = 'USD'): string {
  if (!baseUrl) return baseUrl;
  try {
    const parsed = new URL(baseUrl);
    const upper = (currencyCode || 'USD').toUpperCase();
    const loc = CURRENCY_TO_GOOGLE_LOCALE[upper] || { gl: 'us', hl: 'en' };
    parsed.searchParams.set('curr', upper);
    parsed.searchParams.set('gl', loc.gl);
    parsed.searchParams.set('hl', loc.hl);
    return parsed.toString();
  } catch {
    return baseUrl;
  }
}

export function buildGoogleHotelsDirectUrl(
  cleanDest: string,
  ciParam: string,
  coParam: string,
  currency: string = 'USD'
): string {
  const enc = encodeURIComponent;
  const upperCurr = (currency || 'USD').toUpperCase();
  const locale = CURRENCY_TO_GOOGLE_LOCALE[upperCurr] || { gl: 'us', hl: 'en' };
  return `https://www.google.com/travel/search?q=${enc(cleanDest)}&dates=${ciParam},${coParam}&curr=${upperCurr}&gl=${locale.gl}&hl=${locale.hl}`;
}
