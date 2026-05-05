# Push to GitHub — One-time Setup

Open **Terminal** on your Mac and paste these commands (in order). They'll initialize the repo, commit everything, and push to your GitHub.

```bash
cd "/Users/pilksclaes/Star Processing"

# Initialize git
git init -b main

# Set your git identity (only needed once globally)
git config user.email "aaron@skyway.media"
git config user.name "Aaron Pilk"

# Add the GitHub repo as origin
git remote add origin https://github.com/AaronPilk/Star-Processing-.git

# Stage and commit everything
git add -A
git commit -m "Initial commit: Star Processing website"

# Push to GitHub
git push -u origin main
```

When you run `git push`, GitHub will prompt for credentials:
- **Username:** `AaronPilk`
- **Password:** Use a **Personal Access Token** (not your GitHub password — GitHub disabled password auth)

## How to create a Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name it "Star Processing site"
4. Check the **`repo`** scope
5. Click **Generate token**
6. Copy the token and paste it as the password when `git push` prompts you

The token is your password from now on — save it in a password manager.

---

## After the first push

For all future updates, just run:

```bash
cd "/Users/pilksclaes/Star Processing"
git add -A
git commit -m "Describe what you changed"
git push
```

---

## Optional: Deploy to a free static host

The site is pure HTML/CSS/JS — no build step. Easiest deploys:

- **Netlify** — drag the folder onto netlify.com or connect your GitHub repo. Free SSL, custom domain.
- **Vercel** — connect the GitHub repo at vercel.com. Free SSL, custom domain.
- **Cloudflare Pages** — connect the GitHub repo at pages.cloudflare.com. Free SSL, custom domain.
- **GitHub Pages** — free, but requires repo to be public. Settings → Pages → Deploy from `main` branch.

For star-processing.com, Netlify or Cloudflare Pages is the easiest path — connect the repo, point your domain's DNS at the host, and every `git push` auto-deploys.
