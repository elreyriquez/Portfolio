// Capture FX Sesh site after scrolling to trigger all animations
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('https://fxseshonline.github.io/home/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Scroll to bottom in steps to trigger scroll-based loading/animations
  await page.evaluate(async () => {
    const step = 400;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(150);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await delay(800);
    window.scrollTo(0, 0);
    await delay(1500);
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'Website.png', fullPage: true });
  await browser.close();
})();
