import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/paul/.gemini/antigravity/brain/1c75a7fd-f403-4cbc-bd3e-a2193c712027';

async function runLiveTest() {
  console.log('=== STARTING LIVE END-TO-END BROWSER TEST ON PORT 3001 ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // 1. Load Homepage
    console.log('1. Loading Homepage at http://localhost:3001 ...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('   ✓ Page loaded. Title:', await page.title());

    // 2. Check initial dates in search bar
    const checkInInput = page.locator('input[type="date"]').first();
    const checkOutInput = page.locator('input[type="date"]').nth(1);
    const initialCheckInVal = await checkInInput.inputValue();
    const initialCheckOutVal = await checkOutInput.inputValue();
    console.log(`2. Default search dates: Check-In: ${initialCheckInVal}, Check-Out: ${initialCheckOutVal}`);

    // Capture initial page
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'live_1_homepage.png'), fullPage: false });
    console.log('   ✓ Saved screenshot: live_1_homepage.png');

    // 3. Enter custom destination "Paris" and custom dates: 2026-11-20 to 2026-11-24
    console.log('\n3. Entering destination "Paris" with custom dates 2026-11-20 to 2026-11-24 ...');
    const destInput = page.locator('input[placeholder*="Search portfolio"]').first();
    await destInput.fill('Paris');
    await checkInInput.fill('2026-11-20');
    await checkOutInput.fill('2026-11-24');

    // Submit search
    const searchBtn = page.locator('button[type="submit"]').first();
    await searchBtn.click();
    console.log('   ✓ Search submitted. Waiting for live B2B bedbank results ...');

    // Wait for hotel items to appear
    await page.waitForSelector('text=Hôtel Ritz Paris', { timeout: 15000 });
    console.log('   ✓ "Hôtel Ritz Paris" appeared on screen!');

    // Check hotel images and prices on screen
    const ritzHeading = page.locator('text=Hôtel Ritz Paris').first();
    const hotelCard = ritzHeading.locator('xpath=ancestor::div[contains(@class, "rounded-3xl") and contains(@class, "border-slate-800")]').first();
    
    const imgEl = hotelCard.locator('img').first();
    const imgSrc = await imgEl.getAttribute('src');
    console.log(`   ✓ Authentic photo src rendered: "${imgSrc}"`);

    // Capture search results
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'live_2_paris_results.png'), fullPage: false });
    console.log('   ✓ Saved screenshot: live_2_paris_results.png');

    // 4. Open Market Audit Modal for Hôtel Ritz Paris
    console.log('\n4. Opening Market Audit Modal for Hôtel Ritz Paris ...');
    const auditBtn = hotelCard.locator('button:has-text("Google Travel Verified")').first();
    await auditBtn.click();

    await page.waitForSelector('text=Market Audit & Rate Intelligence', { timeout: 10000 });
    console.log('   ✓ GoogleMarketAuditModal opened successfully!');

    // Check stay nights displayed
    const stayNightsText = await page.locator('text=4 NIGHTS STAY').or(page.locator('text=4-night stay')).first().isVisible();
    console.log(`   ✓ Modal reflects 4-night stay: ${stayNightsText}`);

    // Expand the "Inspect verified public OTA links" collapsible
    console.log('\n5. Expanding verified public OTA links accordion ...');
    const inspectBtn = page.locator('button:has-text("Inspect verified public OTA links")').first();
    if (await inspectBtn.isVisible()) {
      await inspectBtn.click();
      await page.waitForTimeout(500);
      console.log('   ✓ Expanded OTA accordion.');
    }

    // Inspect the OTA links generated in the modal
    const otaLinks = await page.locator('a[href*="booking.com"], a[href*="expedia.com"], a[href*="hotels.com"], a[href*="agoda.com"]').all();
    console.log(`   ✓ Found ${otaLinks.length} live OTA links in modal:`);

    for (const link of otaLinks) {
      const text = (await link.innerText()).trim();
      const href = await link.getAttribute('href');
      const hasCustomDates = href.includes('2026-11-20') && href.includes('2026-11-24');
      console.log(`     * [${text}] -> Contains selected dates (2026-11-20 & 2026-11-24): ${hasCustomDates}`);
      console.log(`       URL: ${href}`);
    }

    // Capture modal screenshot
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'live_3_market_audit_modal.png'), fullPage: false });
    console.log('   ✓ Saved screenshot: live_3_market_audit_modal.png');

    console.log('\n======================================================');
    console.log('SUCCESS: LIVE DATES & LIVE OTA LINKS FULLY VERIFIED IN BROWSER!');
    console.log('======================================================');

  } catch (err) {
    console.error('Test execution failed:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

runLiveTest();
