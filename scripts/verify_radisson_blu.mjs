import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3001/hotels?destination=Oslo', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const radissonHeading = page.locator('text=Radisson Blu Plaza Hotel, Oslo').first();
  await radissonHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027/radisson_card_exact.png' });
  console.log('Saved radisson_card_exact.png');

  // Click Audit Live Rates on the card containing Radisson
  const radissonContainer = page.locator('div:has(h2:has-text("Radisson Blu Plaza Hotel, Oslo")), div:has(h3:has-text("Radisson Blu Plaza Hotel, Oslo")), div:has(div:has-text("Radisson Blu Plaza Hotel, Oslo"))').filter({ hasText: 'Audit Live Rates' }).last();
  const btn = radissonContainer.locator('button:has-text("Audit Live Rates")').first();
  if (await btn.isVisible()) {
    await btn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027/radisson_modal_exact.png' });
    console.log('Saved radisson_modal_exact.png');
  }

  await browser.close();
}

test().catch(console.error);
