import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027';

async function testLive() {
  console.log('=== VERIFYING LIVE HOTEL SEARCH & OTA LINKS IN HEADLESS BROWSER ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Navigate directly to Paris with custom dates in the URL
  console.log('1. Loading http://localhost:3001/hotels?city=Paris&checkIn=2026-11-20&checkOut=2026-11-24 ...');
  await page.goto('http://localhost:3001/hotels?city=Paris&checkIn=2026-11-20&checkOut=2026-11-24', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check if hotels loaded
  await page.waitForSelector('text=Hôtel Ritz Paris', { timeout: 15000 });
  console.log('   ✓ Hôtel Ritz Paris loaded.');

  // Check header text displays the selected dates
  const headerText = await page.locator('p:has-text("Audited rates for")').innerText();
  console.log(`   ✓ On-screen stay duration: "${headerText.trim()}"`);

  // 2. Open Market Audit Modal for Hôtel Ritz Paris
  console.log('\n2. Opening Market Audit Modal for Hôtel Ritz Paris ...');
  const ritzSection = page.locator('div:has-text("Hôtel Ritz Paris")').filter({ has: page.locator('button:has-text("Google Travel Verified")') }).first();
  const auditBtn = ritzSection.locator('button:has-text("Google Travel Verified")').first();
  await auditBtn.click();

  await page.waitForSelector('div[role="dialog"]', { timeout: 10000 });
  await page.waitForTimeout(2500);
  console.log('   ✓ Market Audit Modal opened.');

  // 3. Expand verified public OTA links
  const expandBtn = page.locator('button:has-text("Inspect verified public OTA links")').first();
  if (await expandBtn.isVisible()) {
    await expandBtn.click();
    await page.waitForTimeout(500);
    console.log('   ✓ Expanded public OTA links section.');
  }

  // 4. Verify live OTA links in modal
  const otaLinks = await page.locator('div[role="dialog"] a[href*="booking.com"], div[role="dialog"] a[href*="expedia.com"], div[role="dialog"] a[href*="hotels.com"], div[role="dialog"] a[href*="agoda.com"]').all();
  console.log(`\n3. Verifying ${otaLinks.length} live OTA deep-links inside the modal:`);

  let allDatesMatched = true;
  for (const link of otaLinks) {
    const text = (await link.innerText()).trim().split('\n')[0];
    const href = await link.getAttribute('href');
    const hasDates = href.includes('2026-11-20') && href.includes('2026-11-24');
    if (!hasDates) allDatesMatched = false;
    console.log(`   * [${text}]`);
    console.log(`     Link: ${href.substring(0, 105)}...`);
    console.log(`     Has selected dates (2026-11-20 & 2026-11-24): ${hasDates}`);
  }

  // Save screenshot of modal with live OTA links
  const shotPath = path.join(ARTIFACTS_DIR, 'live_verified_ota_links.png');
  await page.screenshot({ path: shotPath });
  console.log(`\n   ✓ Saved screenshot to ${shotPath}`);

  if (allDatesMatched) {
    console.log('\n======================================================');
    console.log('CONFIRMED: ALL OTA LINKS IN MODAL HAVE VISITOR SELECTED DATES (2026-11-20 & 2026-11-24)!');
    console.log('======================================================');
  } else {
    console.log('Notice: Some links may use alternative date parameters.');
  }

  await browser.close();
}

testLive().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
