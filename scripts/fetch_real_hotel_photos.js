const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'images', 'hotels');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const HOTELS_TO_FETCH = [
  { id: 'bellagio-las-vegas', search: 'Bellagio Las Vegas hotel fountain' },
  { id: 'wynn-las-vegas', search: 'Wynn Las Vegas hotel' },
  { id: 'park-mgm-las-vegas', search: 'Park MGM Las Vegas' },
  { id: 'horseshoe-las-vegas', search: 'Ballys Las Vegas hotel' },
  { id: 'ritz-paris', search: 'Hotel Ritz Paris Place Vendome' },
  { id: 'four-seasons-george-v-paris', search: 'Four Seasons Hotel George V' },
  { id: 'burj-al-arab-dubai', search: 'Burj Al Arab hotel' },
  { id: 'atlantis-the-royal-dubai', search: 'Atlantis The Palm Dubai hotel' },
  { id: 'the-plaza-new-york', search: 'The Plaza Hotel Manhattan New York' },
  { id: 'the-standard-high-line-nyc', search: 'The Standard High Line' },
  { id: 'the-savoy-london', search: 'Savoy Hotel London Strand' },
  { id: 'aman-tokyo', search: 'Otemachi Tower Tokyo' },
  { id: 'clarion-hotel-the-hub-oslo', search: 'Clarion Hotel The Hub Oslo' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AtlasTravelClubBot/1.0 (contact: dev@atlastravelclub.com)' } }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'AtlasTravelClubBot/1.0 (contact: dev@atlastravelclub.com)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'AtlasTravelClubBot/1.0 (contact: dev@atlastravelclub.com)' } }, redRes => {
          redRes.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(true);
          });
        });
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        reject(new Error(`Failed with status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function searchAndDownload(item) {
  try {
    // Search Wikimedia Commons
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.search)}&gsrlimit=3&prop=imageinfo&iiprop=url|size&format=json`;
    const data = await fetchJson(searchUrl);
    const pages = data?.query?.pages;
    if (!pages) {
      console.log(`[NO RESULT] for ${item.id} (${item.search})`);
      return;
    }

    const firstPage = Object.values(pages)[0];
    const imageInfo = firstPage?.imageinfo?.[0];
    if (imageInfo?.url) {
      const destPath = path.join(destDir, `${item.id}.jpg`);
      await downloadFile(imageInfo.url, destPath);
      const stats = fs.statSync(destPath);
      console.log(`✓ [SUCCESS] Downloaded REAL photo for ${item.id} (${Math.round(stats.size / 1024)} KB) - Title: ${firstPage.title}`);
    } else {
      console.log(`[NO IMAGE INFO] for ${item.id}`);
    }
  } catch (err) {
    console.error(`[ERROR] ${item.id}:`, err.message);
  }
}

async function main() {
  console.log('Fetching 100% REAL Wikimedia Commons photographs for all hotels...');
  for (const item of HOTELS_TO_FETCH) {
    await searchAndDownload(item);
  }
  console.log('Complete!');
}

main();
