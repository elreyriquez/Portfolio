const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const base = 'file://' + path.resolve('/Users/shaq/Documents/Projects/gspco-website');
const outDir = path.resolve(__dirname, '../gspco-screens');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function capture(name, url, viewport = { width: 1280, height: 800 }) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, name + '.png'), fullPage: true });
  await browser.close();
  console.log('Captured', name);
}

(async () => {
  await capture('Home', base + '/index.html');
  await capture('Practice-Areas', base + '/practice-areas.html');
  await capture('Attorneys', base + '/attorneys.html');
  await capture('Responsive', base + '/index.html', { width: 375, height: 812 });
})();
