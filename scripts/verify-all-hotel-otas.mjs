// Automated Integrity Verification Suite for All Hotel Searches, OTA Links, and Wholesale Rates
const baseUrl = 'http://localhost:3000';

async function testEndpoint(name, url) {
  console.log(`\n========================================`);
  console.log(`TESTING: ${name}`);
  console.log(`URL: ${url}`);
  console.log(`========================================`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: Failed to fetch ${url}`);
  }

  const data = await res.json();
  const hotels = data.hotel ? [data.hotel] : data.hotels || [];

  if (hotels.length === 0) {
    throw new Error(`Zero hotels returned for ${name}!`);
  }

  console.log(`Received ${hotels.length} hotels.`);

  for (const hotel of hotels) {
    console.log(`\n--> Checking: "${hotel.name}" (${hotel.city}, ${hotel.country}) [ID: ${hotel.id}]`);
    
    // 1. Hotels.com Check
    const hcUrl = hotel.prices?.hotelsCom?.verifyUrl;
    if (!hcUrl) throw new Error(`Missing Hotels.com URL for ${hotel.name}`);
    if (!hcUrl.startsWith('https://www.hotels.com/Hotel-Search?destination=')) {
      throw new Error(`Invalid Hotels.com URL (does not use Hotel-Search): ${hcUrl}`);
    }
    if (hcUrl.includes('/ho')) {
      throw new Error(`CRITICAL: Found legacy /ho numeric ID in Hotels.com URL: ${hcUrl}`);
    }
    if (!hcUrl.includes('startDate=') || !hcUrl.includes('endDate=') || !hcUrl.includes('adults=2')) {
      throw new Error(`Hotels.com URL missing required date/adult parameters: ${hcUrl}`);
    }
    console.log(`  ✓ Hotels.com URL verified (No /ho, clean Hotel-Search, valid dates & adults)`);

    // 2. Expedia Check
    const expUrl = hotel.prices?.expedia?.verifyUrl;
    if (!expUrl) throw new Error(`Missing Expedia URL for ${hotel.name}`);
    if (!expUrl.startsWith('https://www.expedia.com/Hotel-Search?destination=')) {
      throw new Error(`Invalid Expedia URL (does not use Hotel-Search): ${expUrl}`);
    }
    if (!expUrl.includes('startDate=') || !expUrl.includes('endDate=') || !expUrl.includes('adults=2')) {
      throw new Error(`Expedia URL missing required date/adult parameters: ${expUrl}`);
    }
    console.log(`  ✓ Expedia URL verified (Clean Hotel-Search, valid dates & adults)`);

    // 3. Agoda Check
    const agodaUrl = hotel.prices?.agoda?.verifyUrl;
    if (!agodaUrl) throw new Error(`Missing Agoda URL for ${hotel.name}`);
    if (!agodaUrl.startsWith('https://www.agoda.com/search?')) {
      throw new Error(`Invalid Agoda URL (does not use search): ${agodaUrl}`);
    }
    if (!agodaUrl.includes('checkIn=') || !agodaUrl.includes('checkOut=') || !agodaUrl.includes('adults=2') || !agodaUrl.includes('los=')) {
      throw new Error(`Agoda URL missing checkIn/checkOut/adults/los parameters: ${agodaUrl}`);
    }
    console.log(`  ✓ Agoda URL verified (Pre-filled checkIn, checkOut, los, adults=2)`);

    // 4. Kayak Check
    const kayakUrl = hotel.prices?.kayak?.verifyUrl;
    if (!kayakUrl) throw new Error(`Missing Kayak URL for ${hotel.name}`);
    if (!kayakUrl.includes('kayak.com/hotels/')) {
      throw new Error(`Invalid Kayak URL: ${kayakUrl}`);
    }
    if (!kayakUrl.includes('/2adults')) {
      throw new Error(`Kayak URL missing /2adults: ${kayakUrl}`);
    }
    console.log(`  ✓ Kayak URL verified (${kayakUrl.substring(0, 85)}...)`);

    // 5. Rate Math Consistency
    const expRate = hotel.prices.expedia.perNight;
    const hcRate = hotel.prices.hotelsCom.perNight;
    const agodaRate = hotel.prices.agoda.perNight;
    const kayakRate = hotel.prices.kayak.perNight;
    const expectedLowest = Math.min(expRate, hcRate, agodaRate, kayakRate);

    if (hotel.prices.lowestOta.perNight !== expectedLowest) {
      throw new Error(`Lowest OTA math mismatch! Expected ${expectedLowest}, got ${hotel.prices.lowestOta.perNight}`);
    }

    const wholesale = hotel.prices.atlasWholesale.perNight;
    const expectedSavingsPerNight = Math.max(0, expectedLowest - wholesale);
    if (hotel.prices.atlasWholesale.instantSavingsPerNight !== expectedSavingsPerNight) {
      throw new Error(`Wholesale instant savings mismatch! Expected ${expectedSavingsPerNight}, got ${hotel.prices.atlasWholesale.instantSavingsPerNight}`);
    }

    console.log(`  ✓ Rates math consistent: Public lowest $${expectedLowest}/nt vs Wholesale $${wholesale}/nt (Saves $${expectedSavingsPerNight}/nt)`);
  }
  console.log(`\n>>> PASSED: ${name}`);
}

async function runAll() {
  console.log('STARTING FOOLPROOF HOTEL & OTA INTEGRITY AUDIT...');
  
  const testCases = [
    { name: 'Curated Oslo Search (6 hotels)', url: `${baseUrl}/api/hotels/compare?destination=Oslo&nights=3&checkIn=2026-10-15&checkOut=2026-10-18` },
    { name: 'Curated London Search (6 hotels)', url: `${baseUrl}/api/hotels/compare?destination=London&nights=4&checkIn=2026-11-01&checkOut=2026-11-05` },
    { name: 'Curated Las Vegas Search (4 hotels)', url: `${baseUrl}/api/hotels/compare?destination=Las%20Vegas&nights=3` },
    { name: 'Curated Paris Search (3 hotels)', url: `${baseUrl}/api/hotels/compare?destination=Paris&nights=3` },
    { name: 'Curated New York Search (3 hotels)', url: `${baseUrl}/api/hotels/compare?destination=New%20York&nights=3` },
    { name: 'Curated Dubai Search (3 hotels)', url: `${baseUrl}/api/hotels/compare?destination=Dubai&nights=3` },
    { name: 'Global Dynamic Search: Rome', url: `${baseUrl}/api/hotels/compare?destination=Rome&nights=3` },
    { name: 'Global Dynamic Search: Tokyo', url: `${baseUrl}/api/hotels/compare?destination=Tokyo&nights=3` },
    { name: 'Single Hotel Lookup: Grand Hotel Oslo', url: `${baseUrl}/api/hotels/compare?id=grand-hotel-oslo&nights=3&checkIn=2026-10-15&checkOut=2026-10-18` },
    { name: 'Single Hotel Lookup: The Ritz London', url: `${baseUrl}/api/hotels/compare?id=the-ritz-london&nights=3` },
  ];

  for (const tc of testCases) {
    await testEndpoint(tc.name, tc.url);
  }

  console.log('\n=============================================================');
  console.log('ALL HOTEL & OTA INTEGRITY CHECKS PASSED WITH 100% SUCCESS!');
  console.log('=============================================================');
}

runAll().catch((err) => {
  console.error('\n❌ INTEGRITY AUDIT FAILED:', err.message);
  process.exit(1);
});
