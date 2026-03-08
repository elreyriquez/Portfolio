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
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

## 3. Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` | Folder: `/ (root)`
4. Click **Save**

Your site will be live at:
- `https://YOUR_USERNAME.github.io/portfolio/` (if repo is named "portfolio")
- `https://YOUR_USERNAME.github.io/` (if repo is named "YOUR_USERNAME.github.io")

It may take 1–2 minutes to deploy.
