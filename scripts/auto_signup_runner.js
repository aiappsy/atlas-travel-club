const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const userDataDir = path.join(__dirname, '..', '.playwright_session');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const PROVIDERS = [
  {
    name: 'Travelpayouts All-in-One Master Network',
    url: 'https://www.travelpayouts.com/en/signup'
  },
  {
    name: 'ElevenLabs AI Voice Concierge',
    url: 'https://elevenlabs.io/app/sign-up'
  },
  {
    name: 'SafetyWing Nomad Travel Medical Insurance',
    url: 'https://safetywing.com/ambassadors'
  },
  {
    name: 'iVisa & Sherpa Digital Nomad Visas',
    url: 'https://www.ivisa.com/affiliates'
  },
  {
    name: 'Google AI Studio (Gemini 3.7 Flash)',
    url: 'https://aistudio.google.com/'
  },
  {
    name: 'Wise Multi-Currency Nomad Banking',
    url: 'https://wise.com/register'
  },
  {
    name: 'Outsite Coliving & Long-Stays Network',
    url: 'https://www.outsite.co/affiliates'
  }
];

async function runAutoSignup() {
  console.log('======================================================');
  console.log('🚀 LAUNCHING VISIBLE BROWSER ON YOUR DESKTOP...');
  console.log('======================================================');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  console.log('Chrome opened on your screen!');

  // Open first provider in the initial page
  const pages = context.pages();
  const firstPage = pages.length > 0 ? pages[0] : await context.newPage();
  
  console.log(`Opening Tab 1: ${PROVIDERS[0].name}...`);
  await firstPage.goto(PROVIDERS[0].url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});

  // Open remaining providers in separate tabs
  for (let i = 1; i < PROVIDERS.length; i++) {
    const p = PROVIDERS[i];
    console.log(`Opening Tab ${i + 1}: ${p.name}...`);
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  }

  console.log('\n======================================================');
  console.log('✅ ALL PROVIDER REGISTRATION TABS ARE OPEN ON YOUR SCREEN!');
  console.log('======================================================');
  console.log('1. Click "Continue with Google" across the open tabs.');
  console.log('2. Once finished, your session cookies and tokens will be automatically retained in .playwright_session.');
  console.log('Leaving browser active for you...\n');

  // Keep process alive so browser remains open on user screen
  await new Promise(() => {});
}

runAutoSignup().catch((err) => {
  console.error('Error launching browser:', err);
});
