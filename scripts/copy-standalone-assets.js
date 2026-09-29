const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  }
}

try {
  const rootDir = path.resolve(__dirname, '..');
  const standaloneDir = path.join(rootDir, '.next', 'standalone');

  if (fs.existsSync(standaloneDir)) {
    const staticSrc = path.join(rootDir, '.next', 'static');
    const staticDest = path.join(standaloneDir, '.next', 'static');
    if (fs.existsSync(staticSrc)) {
      copyFolderRecursiveSync(staticSrc, staticDest);
      console.log('✓ Copied .next/static into .next/standalone/.next/static');
    }

    const publicSrc = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    if (fs.existsSync(publicSrc)) {
      copyFolderRecursiveSync(publicSrc, publicDest);
      console.log('✓ Copied public/ into .next/standalone/public');
    }
  }
} catch (err) {
  console.warn('Asset copy warning (non-fatal):', err.message);
}
