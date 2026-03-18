# FX Sesh screenshots

Screenshots and scripts for the portfolio UI/UX case study.

## Full-page website capture

From the **Projects** folder (parent of `portfolio-website`):

```bash
cd portfolio-website/assets/ui-ux/fxsesh-screens && node capture-fullpage.js
```

Or use the full path:

```bash
cd /Users/shaq/Documents/Projects/portfolio-website/assets/ui-ux/fxsesh-screens && node capture-fullpage.js
```

Requires `playwright` (`npm install playwright` in this folder if needed). Output: `Website.png`.

## Stitch 3 images into one

If you have three page screenshots in the workspace assets folder, run:

```bash
cd /Users/shaq/Documents/Projects/portfolio-website/assets/ui-ux/fxsesh-screens && node stitch-website.js
```

Update the file paths in `stitch-website.js` if your images are elsewhere. Requires `sharp` (`npm install sharp`).
