const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// User Data Directory for persistent session / Google cookies
const userDataDir = path.join(__dirname, '..', '.playwright_session');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const PROVIDERS = [
  {
    name: 'Travelpayouts (All-in-One Master Network: Hotelbeds, Booking.com, AirHelp, SafetyWing, eSIMs)',
    url: 'https://www.travelpayouts.com/en/signup',
    keyName: 'TRAVELPAYOUTS_MARKER',
    desc: 'Sign in with Google. Once on the dashboard, navigate to Settings > API & Markers to copy your Marker / Token.'
  },
  {
    name: 'ElevenLabs (Aura AI Voice Concierge)',
    url: 'https://elevenlabs.io/app/sign-up',
    keyName: 'ELEVENLABS_API_KEY',
    desc: 'Click "Continue with Google". In the top-right profile icon, click "Profile + API Keys" and copy your API key.'
  },
  {
    name: 'SafetyWing (Global Travel Medical & Nomad Insurance)',
    url: 'https://safetywing.com/ambassadors',
    keyName: 'SAFETYWING_PARTNER_ID',
    desc: 'Click "Join Now" / "Sign in with Google". Copy your Ambassador Partner Link / ID.'
  },
  {
    name: 'iVisa / Sherpa Affiliates (Digital Nomad Visas)',
    url: 'https://www.ivisa.com/affiliates',
    keyName: 'IVISA_CAMPAIGN_ID',
    desc: 'Click "Become an Affiliate". Sign up with your details to get your tracking token.'
  },
  {
    name: 'Outsite Coliving (Monthly Stays Network)',
    url: 'https://www.outsite.co/affiliates',
    keyName: 'OUTSITE_AFFILIATE_ID',
    desc: 'Click "Apply to Partner Program". Copy your affiliate referral tag.'
  },
  {
    name: 'Stripe Issuing (Co-Branded Visa Card Program)',
    url: 'https://dashboard.stripe.com/register',
    keyName: 'STRIPE_SECRET_KEY',
    desc: 'Log in with your Google account. Navigate to Issuing and copy your API Secret Key from Developers > API Keys.'
  }
];

async function main() {
  console.log('\n======================================================');
  console.log('🚀 HOTELSCLUB AUTOMATED SIGNUP & BROWSER ASSISTANT');
  console.log('======================================================\n');
  console.log('Launching a real visible Chrome window on your screen...');
  console.log('A persistent session is enabled so your Google login stays remembered.\n');

  let browserContext;
  try {
    browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      viewport: { width: 1280, height: 850 },
      args: ['--start-maximized', '--no-sandbox']
    });
  } catch (err) {
    console.log('Using standard chromium launch...');
    const browser = await chromium.launch({ headless: false });
    browserContext = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  }

  const page = await browserContext.newPage();

  console.log('Browser window opened successfully on your desktop!\n');

  const capturedCredentials = {};

  for (let i = 0; i < PROVIDERS.length; i++) {
    const p = PROVIDERS[i];
    console.log(`\n------------------------------------------------------`);
    console.log(`[${i + 1}/${PROVIDERS.length}] Navigating to: ${p.name}`);
    console.log(`URL: ${p.url}`);
    console.log(`Instructions: ${p.desc}`);
    console.log(`------------------------------------------------------`);

    try {
      await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
      console.log(`Note: Page opened, navigating...`);
    }

    console.log(`\n👉 Look at the opened Chrome window on your screen.`);
    console.log(`Click "Continue with Google" or complete the 1-click login.`);

    const key = await askQuestion(
      `\nPaste the generated API Key / Partner Marker for ${p.name} (or press Enter to skip to next): `
    );

    if (key.trim()) {
      capturedCredentials[p.keyName] = key.trim();
      console.log(`✅ Saved ${p.keyName}: ${key.trim()}`);
    } else {
      console.log(`⏩ Skipped ${p.name}`);
    }
  }

  console.log('\n======================================================');
  console.log('🎉 SIGNUP BROWSER SESSION COMPLETE');
  console.log('======================================================\n');

  // Save to .env.local
  if (Object.keys(capturedCredentials).length > 0) {
    const envPath = path.join(__dirname, '..', '.env.local');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    for (const [k, v] of Object.entries(capturedCredentials)) {
      const regex = new RegExp(`^${k}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${k}=${v}`);
      } else {
        envContent += `\n${k}=${v}`;
      }
    }

    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('✅ Successfully wrote your API credentials to .env.local!');
  }

  console.log('\nClosing browser context...');
  await browserContext.close();
  rl.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('Error running signup assistant:', err);
  process.exit(1);
});
