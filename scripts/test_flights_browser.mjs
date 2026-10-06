import { chromium } from 'playwright';

async function testFlights() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('Loading /flights in browser...');
  await page.goto('http://localhost:3001/flights', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027/live_duffel_flights_rendered.png' });
  console.log('Saved live_duffel_flights_rendered.png');
  const count = await page.locator('button:has-text("Inspect")').count();
  console.log('Rendered flight cards:', count);
  await browser.close();
}

testFlights().catch(console.error);
