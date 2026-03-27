const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIRS = [
  path.join(__dirname, '..', 'pictures_good'),
  path.join(__dirname, '..', 'public', 'uploads'),
];

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'];

async function convertImages() {
  let converted = 0;

  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTS.includes(ext)) continue;

      const baseName = file.slice(0, -ext.length);
      const webpPath = path.join(dir, `${baseName}.webp`);

      // Skip if WebP version already exists
      if (fs.existsSync(webpPath)) continue;

      try {
        const input = path.join(dir, file);
        await sharp(input).webp({ quality: 80 }).toFile(webpPath);
        converted++;
        console.log(`Converted: ${file} -> ${baseName}.webp`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err.message);
      }
    }
  }

  if (converted > 0) {
    console.log(`Image conversion complete: ${converted} files converted to WebP`);
  } else {
    console.log('No new images to convert');
  }
}

convertImages().catch(err => {
  console.error('Image conversion error:', err);
});
