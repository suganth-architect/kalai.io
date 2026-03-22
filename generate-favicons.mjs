import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import pngToIco from 'png-to-ico';

const INPUT = 'public/icon-base.png';
const OUT_DIR = 'public';

async function generate() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input file not found: ${INPUT}`);
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const baseImage = sharp(INPUT);

  // 1. Generate PNG variants
  const sizes = [16, 32, 48, 180, 192, 512];
  for (const size of sizes) {
    let name = `favicon-${size}x${size}.png`;
    if (size === 180) name = 'apple-touch-icon.png';
    else if (size === 192) name = 'android-chrome-192x192.png';
    else if (size === 512) name = 'android-chrome-512x512.png';

    await baseImage.clone().resize(size, size).png().toFile(path.join(OUT_DIR, name));
    console.log(`Generated ${name}`);
  }

  // 2. Generate multi-size favicon.ico
  const icoBuf = await pngToIco([
    path.join(OUT_DIR, 'favicon-16x16.png'),
    path.join(OUT_DIR, 'favicon-32x32.png'),
    path.join(OUT_DIR, 'favicon-48x48.png')
  ]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), icoBuf);
  console.log(`Generated favicon.ico`);

  // 3. Monochrome and dark mode versions
  await baseImage.clone().resize(512, 512).grayscale().png().toFile(path.join(OUT_DIR, 'icon-monochrome.png'));
  console.log(`Generated icon-monochrome.png`);

  // To make white lines dark we need to invert
  await baseImage.clone().resize(512, 512).negate({ alpha: false }).png().toFile(path.join(OUT_DIR, 'icon-dark.png'));
  console.log(`Generated icon-dark.png`);
}

generate().catch(console.error);
