# AAC Painters Inc. — Astro + Cloudflare Workers Website

Official story-driven, high-SEO website for **AAC Painters Inc.** (*"Coloring Your Dream" — CSLB License #1039849*), featuring interactive Before & After comparison sliders, 4-stage jobsite documentaries, an interactive Flake & Coating System Lab, live field video reels, and a Cloudflare Workers Quote Builder API (`/api/quote`).

## Quick Start

```bash
# Install dependencies
npm install

# Start local Astro + Cloudflare Workers dev server
npm run dev

# Build production static assets + Cloudflare Worker bundle
npm run build

# Deploy directly to Cloudflare Workers
npm run deploy
```

## Deploying to Cloudflare Workers from GitHub

This project is pre-configured with both [`wrangler.jsonc`](./wrangler.jsonc) and [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). You can deploy automatically from GitHub in either of two ways:

### Option A: Cloudflare Dashboard Native Git Integration (Recommended — Zero Secrets Setup)
1. Push this repository to GitHub.
2. In the **Cloudflare Dashboard**, go to **Compute (Workers) → Workers & Pages → Create → Import a repository**.
3. Select your GitHub repository (`aac-painters`).
4. Set the build configuration:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
5. Every push to `main` (and every Pull Request preview) will automatically build and deploy to Cloudflare Workers.

### Option B: GitHub Actions Workflow (Included in `.github/workflows/deploy.yml`)
1. In your GitHub repository, navigate to **Settings → Secrets and variables → Actions**.
2. Add two repository secrets:
   - `CLOUDFLARE_API_TOKEN` (Create in Cloudflare Dashboard → My Profile → API Tokens → *"Edit Cloudflare Workers"* template)
   - `CLOUDFLARE_ACCOUNT_ID` (Found on your Cloudflare Workers overview sidebar)
3. Pushing to `main` triggers `.github/workflows/deploy.yml` to build and publish to Cloudflare Workers.

### Optional Webhook Forwarding for Quote Leads
To forward `/api/quote` form submissions to an external CRM, Slack channel, Zapier/Make webhook, or email service, add a `QUOTE_WEBHOOK_URL` environment variable in your Cloudflare Worker settings.
