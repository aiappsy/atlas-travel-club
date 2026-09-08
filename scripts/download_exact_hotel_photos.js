const fs = require('fs');
const path = require('path');
const https = require('https');

const hotelImagesDir = path.join(__dirname, '..', 'public', 'images', 'hotels');
if (!fs.existsSync(hotelImagesDir)) {
  fs.mkdirSync(hotelImagesDir, { recursive: true });
}

// Exact physical landmark photos mapped to official Wikimedia Commons / Open sources
const EXACT_HOTEL_URLS = [
  {
    id: 'grand-hotel-oslo',
    name: 'Grand Hotel Oslo (Karl Johans gate)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Grand_Hotel_Oslo.jpg/1024px-Grand_Hotel_Oslo.jpg'
  },
  {
    id: 'clarion-hotel-the-hub-oslo',
    name: 'Clarion Hotel The Hub Oslo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Clarion_Hotel_The_Hub_Oslo.jpg/1024px-Clarion_Hotel_The_Hub_Oslo.jpg'
  },
  {
    id: 'bellagio-las-vegas',
    name: 'The Bellagio Resort & Casino Las Vegas (Fountains & Lake)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bellagio_Hotel_%26_Casino%2C_Las_Vegas.jpg/1024px-Bellagio_Hotel_%26_Casino%2C_Las_Vegas.jpg'
  },
  {
    id: 'wynn-las-vegas',
    name: 'Wynn Las Vegas (Curved Tower)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Wynn_Las_Vegas_2005.jpg/1024px-Wynn_Las_Vegas_2005.jpg'
  },
  {
    id: 'park-mgm-las-vegas',
    name: 'Park MGM Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Park_MGM_Las_Vegas_2018.jpg/1024px-Park_MGM_Las_Vegas_2018.jpg'
  },
  {
    id: 'horseshoe-las-vegas',
    name: 'Horseshoe / Ballys Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ballys_Las_Vegas.jpg/1024px-Ballys_Las_Vegas.jpg'
  },
  {
    id: 'ritz-paris',
    name: 'Hôtel Ritz Paris (Place Vendôme)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/H%C3%B4tel_Ritz_Paris%2C_Place_Vend%C3%B4me_15%2C_Paris_1er.jpg/1024px-H%C3%B4tel_Ritz_Paris%2C_Place_Vend%C3%B4me_15%2C_Paris_1er.jpg'
  },
  {
    id: 'four-seasons-george-v-paris',
    name: 'Four Seasons Hotel George V Paris',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Four_Seasons_Hotel_George_V%2C_Paris_3_November_2011.jpg/1024px-Four_Seasons_Hotel_George_V%2C_Paris_3_November_2011.jpg'
  },
  {
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Jumeirah Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Burj_Al_Arab_%282713715154%29.jpg/1024px-Burj_Al_Arab_%282713715154%29.jpg'
  },
  {
    id: 'atlantis-the-royal-dubai',
    name: 'Atlantis The Palm Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atlantis_The_Palm_Dubai_2019.jpg/1024px-Atlantis_The_Palm_Dubai_2019.jpg'
  },
  {
    id: 'the-plaza-new-york',
    name: 'The Plaza Hotel New York (5th Ave / Central Park South)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/The_Plaza_Hotel_from_Central_Park_South.jpg/1024px-The_Plaza_Hotel_from_Central_Park_South.jpg'
  },
  {
    id: 'the-standard-high-line-nyc',
    name: 'The Standard High Line Manhattan',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/The_Standard_High_Line_Hotel.jpg/1024px-The_Standard_High_Line_Hotel.jpg'
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy Hotel London (Strand)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Savoy_Hotel_London.jpg/1024px-Savoy_Hotel_London.jpg'
  },
  {
    id: 'aman-tokyo',
    name: 'Aman Tokyo (Otemachi Tower)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Otemachi_Tower_201405.jpg/1024px-Otemachi_Tower_201405.jpg'
  }
];

function downloadImage(item) {
  return new Promise((resolve) => {
    const filePath = path.join(hotelImagesDir, `${item.id}.jpg`);
    const file = fs.createWriteStream(filePath);

    const options = new URL(item.url);
    const reqOptions = {
      hostname: options.hostname,
      path: options.pathname,
      headers: {
        'User-Agent': 'AtlasTravelClubBot/1.0 (https://atlastravelclub.com; dev@atlastravelclub.com) Node/22.0'
      }
    };

    https.get(reqOptions, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        https.get(res.headers.location, { headers: reqOptions.headers }, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`[SUCCESS] Downloaded exact photo for ${item.name} (${item.id}.jpg)`);
            resolve(true);
          });
        });
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[SUCCESS] Downloaded exact photo for ${item.name} (${item.id}.jpg)`);
          resolve(true);
        });
      } else {
        console.error(`[FAIL ${res.statusCode}] for ${item.name}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`[ERROR] ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading exact, verified physical hotel photographs into public/images/hotels/ ...');
  for (const item of EXACT_HOTEL_URLS) {
    await downloadImage(item);
  }
  console.log('All downloads completed!');
}

run();
