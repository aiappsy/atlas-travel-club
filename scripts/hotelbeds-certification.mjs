import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Load .env.local manually if not in Node env
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const API_KEY = (process.env.HOTELBEDS_API_KEY || '').trim();
const SECRET = (process.env.HOTELBEDS_SECRET || '').trim();
const BASE_URL = 'https://api.test.hotelbeds.com/hotel-api/1.0';
const LOG_OUTPUT_PATH = path.resolve(process.cwd(), 'hotelbeds-certification-log.json');
const REPORT_OUTPUT_PATH = path.resolve(process.cwd(), 'hotelbeds-certification-report.md');

function getAuthHeaders() {
  const timestamp = Math.floor(Date.now() / 1000);
  const hash = crypto.createHash('sha256');
  hash.update(API_KEY + SECRET + timestamp);
  const signature = hash.digest('hex');

  return {
    'Api-key': API_KEY,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

const certLog = {
  metadata: {
    client: 'Atlas Travel Club',
    apiKey: API_KEY,
    environment: 'TEST / Sandbox',
    timestamp: new Date().toISOString(),
    engine: 'APItude Hotel API 1.0',
  },
  scenarios: [],
};

async function logStep(name, endpoint, method, reqBody, resStatus, resBody, success) {
  const step = {
    stepName: name,
    timestamp: new Date().toISOString(),
    request: {
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: {
        'Api-key': API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: reqBody,
    },
    response: {
      status: resStatus,
      body: resBody,
    },
    success,
  };
  certLog.scenarios.push(step);
  return step;
}

async function runCertification() {
  console.log('================================================================');
  console.log('   HOTELBEDS (HBX GROUP) APItude CERTIFICATION RUNNER');
  console.log('   Client: Atlas Travel Club');
  console.log(`   API Key: ${API_KEY}`);
  console.log(`   Base URL: ${BASE_URL}`);
  console.log('================================================================\n');

  if (!API_KEY || !SECRET) {
    console.error('❌ ERROR: Missing HOTELBEDS_API_KEY or HOTELBEDS_SECRET in environment.');
    process.exit(1);
  }

  // ── Step 0: Ping Status Endpoint ──
  console.log('▶ [Scenario 0] Health Check (GET /status)...');
  try {
    const res = await fetch(`${BASE_URL}/status`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    console.log(`   Status: HTTP ${res.status} -> ${JSON.stringify(data)}`);
    await logStep('0_HEALTH_CHECK', '/status', 'GET', null, res.status, data, res.ok);
  } catch (err) {
    console.error(`   ❌ Ping failed:`, err.message);
  }

  // Future check-in dates (30 days ahead to avoid blackout or past dates)
  const dIn = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
  const dOut = new Date(Date.now() + 33 * 86400000).toISOString().split('T')[0];

  // ── Step 1: Hotel Availability Search ──
  console.log(`\n▶ [Scenario 1] Hotel Availability Search (POST /hotels for dates ${dIn} to ${dOut})...`);
  const searchPayload = {
    stay: {
      checkIn: dIn,
      checkOut: dOut,
    },
    occupancies: [
      {
        rooms: 1,
        adults: 2,
        children: 0,
      },
    ],
    hotels: {
      hotel: [1067, 1070, 1500, 1060], // Standard Hotelbeds Palma de Mallorca sandbox hotels
    },
  };

  let searchResData = null;
  let selectedRateKey = null;

  try {
    const res = await fetch(`${BASE_URL}/hotels`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(searchPayload),
    });
    const status = res.status;
    const text = await res.text();
    try {
      searchResData = JSON.parse(text);
    } catch {
      searchResData = text;
    }

    console.log(`   HTTP ${status}`);
    if (res.ok && searchResData?.hotels?.hotels?.length > 0) {
      const hotel = searchResData.hotels.hotels[0];
      const room = hotel.rooms?.[0];
      selectedRateKey = room?.rates?.[0]?.rateKey;
      console.log(`   ✓ Found property: ${hotel.name} (Code: ${hotel.code})`);
      console.log(`   ✓ Selected Room: ${room?.name}`);
      console.log(`   ✓ RateKey: ${selectedRateKey?.substring(0, 35)}...`);
      await logStep('1_AVAILABILITY_SEARCH', '/hotels', 'POST', searchPayload, status, searchResData, true);
    } else {
      console.warn(`   ⚠️ Search response:`, text);
      await logStep('1_AVAILABILITY_SEARCH', '/hotels', 'POST', searchPayload, status, searchResData, false);
    }
  } catch (err) {
    console.error(`   ❌ Search request failed:`, err.message);
    await logStep('1_AVAILABILITY_SEARCH', '/hotels', 'POST', searchPayload, 500, { error: err.message }, false);
  }

  // ── Step 2: CheckRate ──
  if (selectedRateKey) {
    console.log(`\n▶ [Scenario 2] CheckRate Re-verification (POST /checkrates)...`);
    const checkRatePayload = {
      rooms: [
        {
          rateKey: selectedRateKey,
        },
      ],
    };

    let checkRateData = null;
    try {
      const res = await fetch(`${BASE_URL}/checkrates`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(checkRatePayload),
      });
      const status = res.status;
      checkRateData = await res.json();
      console.log(`   HTTP ${status}`);
      if (res.ok && checkRateData?.hotel?.rooms?.[0]?.rates?.[0]) {
        const rate = checkRateData.hotel.rooms[0].rates[0];
        // Use updated rateKey if returned
        selectedRateKey = rate.rateKey || selectedRateKey;
        console.log(`   ✓ Rate re-validated: Net ${rate.net} ${checkRateData.hotel.currency}`);
        console.log(`   ✓ Cancellation Policies:`, rate.cancellationPolicies || 'None');
        await logStep('2_CHECK_RATE', '/checkrates', 'POST', checkRatePayload, status, checkRateData, true);
      } else {
        await logStep('2_CHECK_RATE', '/checkrates', 'POST', checkRatePayload, status, checkRateData, false);
      }
    } catch (err) {
      console.error(`   ❌ CheckRate failed:`, err.message);
      await logStep('2_CHECK_RATE', '/checkrates', 'POST', checkRatePayload, 500, { error: err.message }, false);
    }

    // ── Step 3: Test Booking Creation ──
    console.log(`\n▶ [Scenario 3] Test Booking Creation (POST /bookings)...`);
    const bookingPayload = {
      holder: {
        name: 'Pal',
        surname: 'Atlas',
      },
      rooms: [
        {
          rateKey: selectedRateKey,
          paxes: [
            {
              roomId: 1,
              type: 'AD',
              name: 'Pal',
              surname: 'Atlas',
            },
            {
              roomId: 1,
              type: 'AD',
              name: 'Member',
              surname: 'Atlas',
            },
          ],
        },
      ],
      clientReference: `ATLAS-CERT-${Date.now()}`,
      remark: 'Hotelbeds APItude Certification Test Booking - Atlas Travel Club',
      tolerance: 2.0,
    };

    let bookingRef = null;
    let bookingData = null;
    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingPayload),
      });
      const status = res.status;
      bookingData = await res.json();
      console.log(`   HTTP ${status}`);
      if (res.ok && bookingData?.booking?.reference) {
        bookingRef = bookingData.booking.reference;
        console.log(`   ✓ Test Booking Confirmed! Reference: ${bookingRef}`);
        console.log(`   ✓ Booking Status: ${bookingData.booking.status}`);
        await logStep('3_CREATE_BOOKING', '/bookings', 'POST', bookingPayload, status, bookingData, true);
      } else {
        console.warn(`   ⚠️ Booking creation response:`, bookingData);
        await logStep('3_CREATE_BOOKING', '/bookings', 'POST', bookingPayload, status, bookingData, false);
      }
    } catch (err) {
      console.error(`   ❌ Booking failed:`, err.message);
      await logStep('3_CREATE_BOOKING', '/bookings', 'POST', bookingPayload, 500, { error: err.message }, false);
    }

    // ── Step 4: Booking Retrieval ──
    if (bookingRef) {
      console.log(`\n▶ [Scenario 4] Retrieve Booking Details (GET /bookings/${bookingRef})...`);
      try {
        const res = await fetch(`${BASE_URL}/bookings/${bookingRef}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        const status = res.status;
        const detailData = await res.json();
        console.log(`   HTTP ${status}`);
        console.log(`   ✓ Reference match: ${detailData?.booking?.reference === bookingRef}`);
        await logStep('4_RETRIEVE_BOOKING', `/bookings/${bookingRef}`, 'GET', null, status, detailData, res.ok);
      } catch (err) {
        console.error(`   ❌ Retrieve booking failed:`, err.message);
      }

      // ── Step 5: Booking Cancellation ──
      console.log(`\n▶ [Scenario 5] Cancel Test Booking (DELETE /bookings/${bookingRef})...`);
      try {
        const res = await fetch(`${BASE_URL}/bookings/${bookingRef}?cancellationFlag=CANCELLATION`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        const status = res.status;
        const cancelData = await res.json();
        console.log(`   HTTP ${status}`);
        console.log(`   ✓ Cancelled status: ${cancelData?.booking?.status}`);
        console.log(`   ✓ Cancellation fee: ${cancelData?.booking?.cancellationAmount || 0} ${cancelData?.booking?.currency || ''}`);
        await logStep('5_CANCEL_BOOKING', `/bookings/${bookingRef}`, 'DELETE', null, status, cancelData, res.ok);
      } catch (err) {
        console.error(`   ❌ Cancel booking failed:`, err.message);
      }
    }
  }

  // ── Write Log Files ──
  fs.writeFileSync(LOG_OUTPUT_PATH, JSON.stringify(certLog, null, 2), 'utf8');
  console.log(`\n================================================================`);
  console.log(`✅ Certification run recorded to:`);
  console.log(`   📄 ${LOG_OUTPUT_PATH}`);

  // Create human-readable Markdown summary report
  let mdReport = `# Hotelbeds APItude Integration Certification Report\n\n`;
  mdReport += `**Client Application:** Atlas Travel Club  \n`;
  mdReport += `**API Key:** \`${API_KEY}\`  \n`;
  mdReport += `**Environment:** Sandbox (\`api.test.hotelbeds.com\`)  \n`;
  mdReport += `**Execution Date:** ${certLog.metadata.timestamp}  \n\n`;
  mdReport += `## Scenarios Summary\n\n`;
  mdReport += `| Scenario | Method & Endpoint | Status Code | Result |\n`;
  mdReport += `| :--- | :--- | :--- | :--- |\n`;

  for (const s of certLog.scenarios) {
    const badge = s.success ? '✅ PASSED' : (s.response.status === 403 ? '⏳ QUOTA LIMITED' : '⚠️ FAILED');
    mdReport += `| ${s.stepName} | \`${s.request.method} ${s.request.url.replace(BASE_URL, '')}\` | HTTP ${s.response.status} | ${badge} |\n`;
  }

  mdReport += `\n## Detailed Logs\n\n`;
  for (const s of certLog.scenarios) {
    mdReport += `### ${s.stepName}\n`;
    mdReport += `**Request:**\n\`\`\`json\n${JSON.stringify(s.request, null, 2)}\n\`\`\`\n\n`;
    mdReport += `**Response (HTTP ${s.response.status}):**\n\`\`\`json\n${JSON.stringify(s.response.body, null, 2)}\n\`\`\`\n\n---\n\n`;
  }

  fs.writeFileSync(REPORT_OUTPUT_PATH, mdReport, 'utf8');
  console.log(`   📄 ${REPORT_OUTPUT_PATH}`);
  console.log('================================================================');
}

runCertification().catch(console.error);
