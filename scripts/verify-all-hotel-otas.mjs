// Automated Integrity Verification Suite for All Hotel Searches, OTA Links, and Wholesale Rates
const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';

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
    
    // 1. Hotels.com Check (Rule 2)
    const hcUrl = hotel.prices?.hotelsCom?.verifyUrl;
    if (!hcUrl) throw new Error(`Missing Hotels.com URL for ${hotel.name}`);
    if (!hcUrl.includes('hotels.com')) {
      throw new Error(`Invalid Hotels.com URL: ${hcUrl}`);
    }
    console.log(`  ✓ Hotels.com URL verified (Direct Hotels.com endpoint: ${hcUrl.substring(0, 75)}...)`);

    // 2. Expedia Check (Rule 2)
    const expUrl = hotel.prices?.expedia?.verifyUrl;
    if (!expUrl) throw new Error(`Missing Expedia URL for ${hotel.name}`);
    if (!expUrl.includes('expedia.com')) {
      throw new Error(`Invalid Expedia URL: ${expUrl}`);
    }
    console.log(`  ✓ Expedia URL verified (Direct Expedia endpoint: ${expUrl.substring(0, 75)}...)`);

    // 3. Booking.com Check (Rule 2)
    const bookingUrl = hotel.prices?.booking?.verifyUrl;
    if (!bookingUrl) throw new Error(`Missing Booking.com URL for ${hotel.name}`);
    if (!bookingUrl.includes('booking.com')) {
      throw new Error(`Invalid Booking.com URL: ${bookingUrl}`);
    }
    console.log(`  ✓ Booking.com URL verified (Direct Booking.com endpoint: ${bookingUrl.substring(0, 75)}...)`);

    // 4. Agoda Check (Rule 2)
    const agodaUrl = hotel.prices?.agoda?.verifyUrl;
    if (!agodaUrl) throw new Error(`Missing Agoda URL for ${hotel.name}`);
    if (!agodaUrl.includes('agoda.com')) {
      throw new Error(`Invalid Agoda URL: ${agodaUrl}`);
    }
    console.log(`  ✓ Agoda URL verified (Direct Agoda endpoint: ${agodaUrl.substring(0, 75)}...)`);

    // 5. Kayak Check (Rule 2)
    const kayakUrl = hotel.prices?.kayak?.verifyUrl;
    if (!kayakUrl) throw new Error(`Missing Kayak URL for ${hotel.name}`);
    if (!kayakUrl.includes('kayak.com') && !kayakUrl.includes('google.com/travel')) {
      throw new Error(`Invalid Kayak URL: ${kayakUrl}`);
    }
    console.log(`  ✓ Kayak URL verified (${kayakUrl.substring(0, 75)}...)`);

    // 6. Rate Math Consistency & Rule 4 Invariant Verification
    const lowestPublicRate = hotel.prices.lowestOta.perNight;
    const wholesale = hotel.prices.atlasWholesale.perNight;
    const expectedSavingsPerNight = Math.max(0, lowestPublicRate - wholesale);
    if (hotel.prices.atlasWholesale.instantSavingsPerNight !== expectedSavingsPerNight) {
      throw new Error(`Wholesale instant savings mismatch! Expected ${expectedSavingsPerNight}, got ${hotel.prices.atlasWholesale.instantSavingsPerNight}`);
    }

    const savingsPct = hotel.prices.atlasWholesale.savingsPercent;
    // Rule 4 Invariant: Wholesale discount must ALWAYS remain 28% to 42% below lowest public OTA
    if (savingsPct < 28 || savingsPct > 42) {
      throw new Error(`Rule 4 Invariant VIOLATION: savingsPercent is ${savingsPct}% (must be 28% to 42%) for "${hotel.name}"! Public: $${lowestPublicRate}, Wholesale: $${wholesale}`);
    }

    console.log(`  ✓ Rate Math & Rule 4 Invariant: Public lowest $${lowestPublicRate}/nt vs Wholesale $${wholesale}/nt (Saves $${expectedSavingsPerNight}/nt, ${savingsPct}% off — Strictly 28%-42%)`);
  }
  console.log(`\n>>> PASSED: ${name}`);
}

async function runAll() {
  console.log('STARTING FOOLPROOF HOTEL & OTA INTEGRITY AUDIT...');
  
  const testCases = [
    { name: 'Curated Oslo Search', url: `${baseUrl}/api/hotels/compare?destination=Oslo&nights=3&checkIn=2026-10-15&checkOut=2026-10-18` },
    { name: 'Curated London Search', url: `${baseUrl}/api/hotels/compare?destination=London&nights=4&checkIn=2026-11-01&checkOut=2026-11-05` },
    { name: 'Curated Las Vegas Search', url: `${baseUrl}/api/hotels/compare?destination=Las%20Vegas&nights=3` },
    { name: 'Curated Paris Search', url: `${baseUrl}/api/hotels/compare?destination=Paris&nights=3` },
    { name: 'Curated New York Search', url: `${baseUrl}/api/hotels/compare?destination=New%20York&nights=3` },
    { name: 'Curated Dubai Search', url: `${baseUrl}/api/hotels/compare?destination=Dubai&nights=3` },
    { name: 'Global Dynamic Search: Rome', url: `${baseUrl}/api/hotels/compare?destination=Rome&nights=3` },
    { name: 'Global Dynamic Search: Tokyo', url: `${baseUrl}/api/hotels/compare?destination=Tokyo&nights=3` },
    { name: 'Unrestricted Alpine Search: Zermatt (Ski Resort, 16 Properties)', url: `${baseUrl}/api/hotels/compare?destination=Zermatt&nights=3` },
    { name: 'Unrestricted Beach/Island Search: Santorini (16 Properties)', url: `${baseUrl}/api/hotels/compare?destination=Santorini&nights=3` },
    { name: 'Unrestricted Global Search: Kyoto (16 Properties)', url: `${baseUrl}/api/hotels/compare?destination=Kyoto&nights=3` },
    { name: 'Pasted Booking.com OTA Link Audit', url: `${baseUrl}/api/hotels/compare?destination=${encodeURIComponent('https://www.booking.com/hotel/fr/the-ritz-paris.html')}&nights=3` },
    { name: 'Pasted Expedia OTA Link Audit with Custom Dates', url: `${baseUrl}/api/hotels/compare?destination=${encodeURIComponent('https://www.expedia.com/Hotel-Search?destination=Aspen&startDate=2026-12-01&endDate=2026-12-05&adults=2')}&nights=4` },
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
