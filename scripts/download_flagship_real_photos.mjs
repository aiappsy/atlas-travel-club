import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destDir = path.join(__dirname, '..', 'public', 'images', 'hotels');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const FLAGSHIP_PHOTOS = [
  {
    id: 'grand-hotel-oslo',
    name: 'Grand Hotel Oslo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Grand_Hotel_Oslo.JPG'
  },
  {
    id: 'clarion-hotel-the-hub-oslo',
    name: 'Clarion Hotel The Hub Oslo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Clarion_Hotel_The_Hub_Oslo.jpg'
  },
  {
    id: 'ritz-paris',
    name: 'Hôtel Ritz Paris Place Vendôme',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/H%C3%B4tel_Ritz.jpg'
  },
  {
    id: 'four-seasons-george-v-paris',
    name: 'Four Seasons Hotel George V Paris',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/H%C3%B4tel_George-V%2C_31_avenue_George-V%2C_Paris_8e_1.jpg'
  },
  {
    id: 'the-plaza-new-york',
    name: 'The Plaza Hotel New York',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/New_York_-_Manhattan_-_Plaza_Hotel.jpg'
  },
  {
    id: 'the-standard-high-line-nyc',
    name: 'The Standard High Line NYC',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/The_Standard_High_Line_%2824245%29.jpg'
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy London Strand',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/H%C3%B4tel_Savoy_The_Strand_Londres_-_edited.jpg'
  },
  {
    id: 'the-ritz-london',
    name: 'The Ritz Hotel London Piccadilly',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/The_Ritz_%286902790412%29.jpg'
  },
  {
    id: 'bellagio-las-vegas',
    name: 'Bellagio Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bellagio_Hotel_%26_Casino%2C_Las_Vegas.jpg'
  },
  {
    id: 'wynn-las-vegas',
    name: 'Wynn Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Wynn_2_%282%29.jpg'
  },
  {
    id: 'the-venetian-las-vegas',
    name: 'The Venetian Las Vegas',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/11_The_Venetian_Las_Vegas_-_luxury_hotel_and_casino_in_Las_Vegas_Strip.jpg'
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
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Burj_Al_Arab%2C_Dubai%2C_by_Joi_Ito_Dec2007.jpg'
  },
  {
    id: 'atlantis-the-royal-dubai',
    name: 'Atlantis The Palm Dubai',
    url: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Hotel_Atlantis_at_Sunset%2C_The_Palm_-_Dubai_%2849510861268%29.jpg'
  },
  {
    id: 'hotel-eden-rome',
    name: 'Hotel Eden Rome Via Ludovisi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Hotel_Eden_-_Dorchester_Collection.jpg'
  },
  {
    id: 'hotel-de-paris-monaco',
    name: 'Hôtel de Paris Monte-Carlo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Monte_Carlo_Monaco_February_2013_-_panoramio.jpg'
  },
  {
    id: 'palace-hotel-tokyo',
    name: 'Palace Hotel Tokyo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Palace_Hotel_Tokyo2012.jpg'
  },
  {
    id: 'imperial-hotel-tokyo',
    name: 'Imperial Hotel Tokyo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Imperial_Hotel_Tokyo.JPG'
  },
  {
    id: 'hotel-jerome-aspen',
    name: 'Hotel Jerome Aspen',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Hotel_Jerome%2C_Aspen%2C_CO.jpg'
  },
  {
    id: 'the-setai-miami',
    name: 'The Setai Miami Beach',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/The_Setai_Hotel_%26_Residences_Tower%2C_Miami.jpg'
  },
  {
    id: 'fontainebleau-miami',
    name: 'Fontainebleau Miami Beach',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/MiamiBeachFontainebleau.jpg'
  }
];

async function downloadFile(item) {
  const dest = path.join(destDir, `${item.id}.jpg`);
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'AtlasTravelClubBot/1.0 (contact: admin@atlastravelclub.com)'
      }
    });
    if (!res.ok) {
      console.error(`✗ FAIL ${res.status}: ${item.name}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    console.log(`✓ [SAVED GENUINE PHOTO] ${item.name} -> /images/hotels/${item.id}.jpg (${Math.round(buffer.length / 1024)} KB)`);
    return true;
  } catch (err) {
    console.error(`✗ ERROR ${item.name}: ${err.message}`);
    return false;
  }
}

async function run() {
  console.log('Downloading genuine physical hotel photographs into public/images/hotels/ ...');
  for (const item of FLAGSHIP_PHOTOS) {
    await downloadFile(item);
  }
  console.log('Completed genuine photography download.');
}

run();
