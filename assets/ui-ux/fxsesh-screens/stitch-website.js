const sharp = require('sharp');
const path = require('path');

const assetsDir = '/Users/shaq/.cursor/projects/Users-shaq-Documents-Projects/assets';
const pages = [
  path.join(assetsDir, 'Website_Page_1-49dd1c78-7a3e-41ba-8c49-eb46eb57cf00.png'),
  path.join(assetsDir, 'Website_Page_2-ef9990a5-1fb0-4106-978f-6a62e9aa7bc3.png'),
  path.join(assetsDir, 'Website_Page_3-2843c790-9a81-4c8c-85ec-bc6226ca8c82.png'),
];

async function stitch() {
  const meta = await Promise.all(pages.map((p) => sharp(p).metadata()));
  const width = Math.max(...meta.map((m) => m.width));
  const heights = meta.map((m) => m.height);
  const totalHeight = heights.reduce((a, b) => a + b, 0);

  const buffers = await Promise.all(pages.map((p) => sharp(p).toBuffer()));
  const compositors = [];
  let y = 0;
  for (let i = 0; i < buffers.length; i++) {
    compositors.push({ input: buffers[i], top: y, left: 0 });
    y += heights[i];
  }

  await sharp({
    create: { width, height: totalHeight, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite(compositors)
    .png()
    .toFile(path.join(__dirname, 'Website.png'));
  console.log('Stitched Website.png:', width, 'x', totalHeight);
}

stitch().catch((e) => { console.error(e); process.exit(1); });
