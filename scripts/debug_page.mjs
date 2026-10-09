import { chromium } from 'playwright';

async function debugPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure()?.errorText));

  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Check if LiveHotelSearch element exists
  const hasLiveHotelSearch = await page.locator('input[placeholder*="Search portfolio"]').count();
  console.log('Search input count:', hasLiveHotelSearch);

  await browser.close();
}

debugPage().catch(console.error);
