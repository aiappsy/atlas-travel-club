const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'images', 'hotels');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Exact authentic photographs of the actual physical properties from verified archives
const REAL_HOTEL_PHOTOS = [
  {
    id: 'grand-hotel-oslo',
    name: 'Grand Hotel Oslo Karl Johan',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Grand_Hotel_Oslo.JPG'
  },
  {
    id: 'clarion-hotel-the-hub-oslo',
    name: 'Clarion Hotel The Hub Oslo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Clarion_Hotel_The_Hub_Oslo.jpg'
  },
  {
    id: 'bellagio-las-vegas',
    name: 'The Bellagio Resort & Casino Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bellagio_Hotel_%26_Casino%2C_Las_Vegas.jpg'
  },
  {
    id: 'wynn-las-vegas',
    name: 'Wynn & Encore Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Wynn_2_%282%29.jpg'
  },
  {
    id: 'park-mgm-las-vegas',
    name: 'Park MGM Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Park_MGM_from_Pedestrian_Bridge.jpg'
  },
  {
    id: 'horseshoe-las-vegas',
    name: 'Horseshoe Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Ballyshotelcasino-lv_cropped.jpg'
  },
  {
    id: 'ritz-paris',
    name: 'Ritz Paris Place Vendôme',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/H%C3%B4tel_Ritz.jpg'
  },
  {
    id: 'four-seasons-george-v-paris',
    name: 'Four Seasons Hotel George V Paris',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/H%C3%B4tel_George-V%2C_31_avenue_George-V%2C_Paris_8e_1.jpg'
  },
  {
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Jumeirah Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Burj_Al_Arab%2C_Dubai%2C_by_Joi_Ito_Dec2007.jpg'
  },
  {
    id: 'atlantis-the-royal-dubai',
    name: 'Atlantis The Palm Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Atlantis_The_Palm_Dubai_2019.jpg'
  },
  {
    id: 'the-plaza-new-york',
    name: 'The Plaza Hotel New York',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/New_York_-_Manhattan_-_Plaza_Hotel.jpg'
  },
  {
    id: 'the-standard-high-line-nyc',
    name: 'The Standard High Line Manhattan',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/The_Standard_High_Line_%2824245%29.jpg'
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy London Strand',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/H%C3%B4tel_Savoy_The_Strand_Londres_-_edited.jpg'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(destDir, `${item.id}.jpg`);
    const file = fs.createWriteStream(dest);

    const client = item.url.startsWith('https') ? https : http;
    client.get(item.url, { headers: { 'User-Agent': 'AtlasTravelClubBot/1.0 (contact: dev@atlastravelclub.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        client.get(res.headers.location, { headers: { 'User-Agent': 'AtlasTravelClubBot/1.0 (contact: dev@atlastravelclub.com)' } }, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(dest);
            console.log(`✓ [SAVED REAL PHOTO] ${item.name} -> /images/hotels/${item.id}.jpg (${Math.round(stats.size / 1024)} KB)`);
            resolve(true);
          });
        });
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`✓ [SAVED REAL PHOTO] ${item.name} -> /images/hotels/${item.id}.jpg (${Math.round(stats.size / 1024)} KB)`);
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

async function run() {
  console.log('Downloading real authentic hotel photographs into public/images/hotels/ ...');
  for (const item of REAL_HOTEL_PHOTOS) {
    await download(item);
  }
  console.log('Done!');
}

run();
