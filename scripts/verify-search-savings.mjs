// Comprehensive test script verifying that EVERY search proves member savings
import { fetch } from 'undici';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

const TEST_QUERIES = [
  // Curated cities
  'Rome',
  'Tokyo',
  'Maldives',
  'Zermatt',
  'Monaco',
  'Santorini',
  'Bali',
  'Aspen',
  'Maui',
  'Paris',
  'London',
  'New York',
  'Dubai',
  'Las Vegas',
  'Oslo',
  // Dynamic non-curated cities
  'Reykjavik',
  'Copenhagen',
  'Seoul',
  'Sydney',
  'Barcelona',
  'Cape Town',
  'Singapore',
  // Blank (all destinations showcase)
  '',
  // Pasted OTA links
  'https://www.booking.com/hotel/it/hassler-roma.html?checkin=2026-11-10&checkout=2026-11-14',
  'https://www.expedia.com/Hotel-Search?destination=Aspen&startDate=2026-12-01&endDate=2026-12-05&adults=2'
];

async function runTest() {
  console.log('======================================================');
  console.log('TESTING ALL SEARCH QUERIES FOR STRICT MEMBER SAVINGS');
  console.log('Target:', BASE_URL);
  console.log('======================================================');

  let totalHotelsChecked = 0;
  let allPassed = true;

  for (const query of TEST_QUERIES) {
    const url = `${BASE_URL}/api/hotels/compare?destination=${encodeURIComponent(query)}&nights=3`;
    process.stdout.write(`Query: "${query || '[All Destinations Showcase]'}" ... `);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`FAILED: HTTP ${res.status}`);
        allPassed = false;
        continue;
      }
      const data = await res.json();
      const hotels = data.hotels || [];
      if (hotels.length === 0) {
        console.error('FAILED: No hotels returned');
        allPassed = false;
        continue;
      }

      for (const h of hotels) {
        totalHotelsChecked++;
        const publicRate = h.prices?.lowestOta?.perNight;
        const wholesaleRate = h.prices?.atlasWholesale?.perNight;
        const savingsPerNight = h.prices?.atlasWholesale?.instantSavingsPerNight;
        const totalSavings = h.prices?.atlasWholesale?.totalSavings;
        const savingsPct = h.prices?.atlasWholesale?.savingsPercent;

        if (!publicRate || !wholesaleRate) {
          console.error(`\nFAIL: Missing rates for ${h.name}`);
          allPassed = false;
          break;
        }

        if (wholesaleRate >= publicRate) {
          console.error(`\nFAIL: Wholesale ($${wholesaleRate}) is NOT cheaper than public ($${publicRate}) for ${h.name}`);
          allPassed = false;
          break;
        }

        if (savingsPerNight <= 0 || totalSavings <= 0) {
          console.error(`\nFAIL: Savings is not positive for ${h.name}`);
          allPassed = false;
          break;
        }

        if (savingsPct < 28 || savingsPct > 42) {
          console.error(`\nFAIL: Savings pct (${savingsPct}%) outside 28%-42% Rule 4 corridor for ${h.name}`);
          allPassed = false;
          break;
        }
      }

      console.log(`✓ ${hotels.length} hotels verified (Savings: ${hotels[0].prices.atlasWholesale.savingsPercent}% off)`);
    } catch (err) {
      console.error(`\nERROR: ${err.message}`);
      allPassed = false;
    }
  }

  console.log('======================================================');
  if (allPassed) {
    console.log(`PASSED: All ${totalHotelsChecked} hotels across all queries prove 100% member savings!`);
  } else {
    console.error('FAILED: Some searches did not prove savings.');
    process.exit(1);
  }
}

runTest();
