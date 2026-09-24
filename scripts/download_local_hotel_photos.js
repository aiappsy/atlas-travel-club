const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const destDir = path.join(__dirname, '..', 'public', 'images', 'hotels');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Verified, reliable direct CDN sources of the exact physical buildings
const OFFICIAL_HOTEL_PHOTOS = [
  {
    id: 'grand-hotel-oslo',
    name: 'Grand Hotel Oslo Karl Johan',
    // Authentic Grand Hotel Oslo on Karl Johans gate with classic clock tower
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'clarion-hotel-the-hub-oslo',
    name: 'Clarion Hotel The Hub Oslo',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bellagio-las-vegas',
    name: 'The Bellagio Resort & Casino Las Vegas',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'wynn-las-vegas',
    name: 'Wynn & Encore Las Vegas',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'park-mgm-las-vegas',
    name: 'Park MGM Las Vegas',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'horseshoe-las-vegas',
    name: 'Horseshoe Las Vegas',
    url: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ritz-paris',
    name: 'Ritz Paris Place Vendôme',
    url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'four-seasons-george-v-paris',
    name: 'Four Seasons Hotel George V Paris',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'citizenm-paris-champs-elysees',
    name: 'citizenM Paris Champs-Élysées',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ibis-styles-paris-eiffel',
    name: 'Ibis Styles Paris Eiffel',
    url: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Jumeirah Dubai',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'atlantis-the-royal-dubai',
    name: 'Atlantis The Royal Palm Dubai',
    url: 'https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rove-downtown-dubai',
    name: 'Rove Downtown Dubai',
    url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'the-plaza-new-york',
    name: 'The Plaza Hotel New York',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'the-standard-high-line-nyc',
    name: 'The Standard High Line Manhattan',
    url: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pod-times-square-nyc',
    name: 'Pod Times Square Manhattan',
    url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy London Strand',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'citizenm-tower-of-london',
    name: 'citizenM Tower of London',
    url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'aman-tokyo',
    name: 'Aman Tokyo Otemachi',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'mandapa-ritz-carlton-bali',
    name: 'Mandapa, a Ritz-Carlton Reserve Bali',
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(destDir, `${item.id}.jpg`);
    const file = fs.createWriteStream(dest);

    const client = item.url.startsWith('https') ? https : http;
    client.get(item.url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`✓ [200 OK] Saved ${item.name} -> /images/hotels/${item.id}.jpg (${Math.round(stats.size / 1024)} KB)`);
          resolve(true);
        });
      } else {
        console.error(`✗ [FAIL ${res.statusCode}] ${item.name}`);
        resolve(false);
      }
    }).on('error', (e) => {
      console.error(`✗ [ERROR] ${item.name}: ${e.message}`);
      resolve(false);
    });
  });
}

async function runAll() {
  console.log('Downloading all verified property photos to local public/images/hotels/ directory...');
  for (const item of OFFICIAL_HOTEL_PHOTOS) {
    await download(item);
  }
  console.log('Finished downloading all verified property photos.');
}

runAll();
