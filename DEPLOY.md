# Deploy to GitHub Pages

## 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio` (or `shaqcomrie.github.io` for a direct username site)
3. Set to **Public**
4. **Do not** add a README, .gitignore, or license (you already have these)
5. Click **Create repository**

## 2. Push your code

GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd /Users/shaq/Documents/Projects/portfolio-website
git remote add origin https://github.com/elreyriquez/portfolio.git
git branch -M main
git push -u origin main
```

## 3. Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` | Folder: `/ (root)`
4. Click **Save**

Your site will be live at:

- `https://elreyriquez.github.io/portfolio/` (project site until a custom domain is set)

It may take 1–2 minutes to deploy.

## 4. Custom domain (`www` canonical)

This repo includes a **`CNAME`** file at the root with **`www.secfreelance.com`**. That matches GitHub Pages’ expected hostname for a **`www`-first** setup.

1. **Settings** → **Pages** → **Custom domain:** enter **`www.secfreelance.com`** → Save.  
   - GitHub should detect the `CNAME` file; if the UI asks to commit a `CNAME`, it should match the file in this repo.

2. After DNS propagates, enable **Enforce HTTPS** on the same Pages screen.

**DNS (summary — Namecheap or similar):**

- **`www`** → **CNAME** → **`elreyriquez.github.io`**
- **`@`** → **URL redirect** → **`https://www.secfreelance.com`** (no GitHub **A** records on `@` if you only use this redirect + `www`)

Do **not** keep both a **URL redirect on `@`** and **four GitHub A records on `@`** at the same time.
