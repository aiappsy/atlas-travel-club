import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027';

async function testBrowser() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('request', req => {
    if (req.url().includes('/api/hotels')) {
      console.log('BROWSER FETCH REQ:', req.url());
    }
  });

  page.on('response', async res => {
    if (res.url().includes('/api/hotels')) {
      console.log('BROWSER FETCH RES:', res.status(), res.url());
    }
  });

  // 1. Load homepage
  console.log('1. Loading http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Grand Hotel Oslo', { timeout: 10000 });
  console.log('   ✓ Grand Hotel Oslo visible on initial load.');

  // 2. Change check-in and check-out dates FIRST before searching Paris
  console.log('\n2. Setting custom dates: 2026-11-20 -> 2026-11-24 ...');
  const checkInInput = page.locator('input[type="date"]').first();
  const checkOutInput = page.locator('input[type="date"]').nth(1);

  await checkInInput.evaluate((el) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, '2026-11-20');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(500);

  await checkOutInput.evaluate((el) => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, '2026-11-24');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(1500);

  // 3. Search for Paris
  console.log('\n3. Searching for Paris ...');
  const destInput = page.locator('input[placeholder*="Search portfolio"]').first();
  await destInput.fill('Paris');
  await page.waitForTimeout(300);

  // Click Audit Live Rates
  const auditSubmit = page.locator('button:has-text("Audit Live Rates")').first();
  await auditSubmit.click();

  // Wait for results to load
  await page.waitForTimeout(3000);
  await page.waitForSelector('text=Hôtel Ritz Paris', { timeout: 10000 });
  console.log('   ✓ Paris results loaded with custom dates.');

  const headerText = await page.locator('p:has-text("Audited rates for")').innerText();
  console.log(`   ✓ On-screen header: "${headerText.trim()}"`);

  // 4. Open Market Audit Modal for Hôtel Ritz Paris
  console.log('\n4. Opening Market Audit Modal for Hôtel Ritz Paris ...');
  const auditModalBtn = page.locator('button:has-text("Google Travel Verified")').first();
  await auditModalBtn.click();

  await page.waitForSelector('div[role="dialog"]', { timeout: 10000 });
  await page.waitForTimeout(3000);

  // Check stay dates displayed in modal header
  const modalDatesText = await page.locator('div[role="dialog"]').innerText();
  const containsDates = modalDatesText.includes('2026-11-20') && modalDatesText.includes('2026-11-24');
  console.log(`   ✓ Modal header displays selected dates (2026-11-20 → 2026-11-24): ${containsDates}`);

  // Expand "Inspect verified public OTA links"
  const expandBtn = page.locator('button:has-text("Inspect verified public OTA links")').first();
  if (await expandBtn.isVisible()) {
    await expandBtn.click();
    await page.waitForTimeout(500);
    console.log('   ✓ Expanded public OTA links section in modal.');
  }

  // 5. Verify all OTA links in modal
  const otaLinks = await page.locator('a[href*="booking.com"], a[href*="expedia.com"], a[href*="hotels.com"], a[href*="agoda.com"]').all();
  console.log(`\n5. Verifying ${otaLinks.length} live OTA links in modal:`);

  let allHaveCustomDates = true;
  for (const link of otaLinks) {
    const text = (await link.innerText()).trim().split('\n')[0];
    const href = await link.getAttribute('href');
    const hasCustomDates = href.includes('2026-11-20') && href.includes('2026-11-24');
    if (!hasCustomDates) allHaveCustomDates = false;
    console.log(`   * [${text}]`);
    console.log(`     Link: ${href.substring(0, 110)}...`);
    console.log(`     Pre-filled selected dates (2026-11-20 & 2026-11-24): ${hasCustomDates}`);
  }

  // Screenshot modal with verified OTA links
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'live_browser_modal_custom_dates.png') });
  console.log('\n   ✓ Saved screenshot: live_browser_modal_custom_dates.png');

  if (allHaveCustomDates) {
    console.log('\n======================================================');
    console.log('VERIFICATION CONFIRMED: 100% OF LIVE OTA LINKS REFLECT VISITOR SELECTED DATES!');
    console.log('======================================================');
  }

  await browser.close();
}

testBrowser().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
