# AAC Painters Inc. — Astro + Cloudflare Workers Website

Official story-driven, high-SEO website for **AAC Painters Inc.** (*"Coloring Your Dream" — CSLB License #1039849*), featuring interactive Before & After comparison sliders, 4-stage jobsite documentaries, an interactive Flake & Coating System Lab, and a Cloudflare Workers Quote Builder API (`/api/quote`).

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

This project is configured with [`wrangler.jsonc`](./wrangler.jsonc) and deploys from GitHub through Cloudflare's native Git integration.

In the **Cloudflare Dashboard**, connect the `aac-painters` repository to the Worker and set:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

Every push to `main` builds and deploys through Cloudflare. GitHub Actions does not need a Cloudflare API token for this setup.

### Quote delivery configuration (required for online submissions)
Set `QUOTE_WEBHOOK_URL` in the Cloudflare Worker environment to an approved CRM or email-service webhook that accepts a JSON POST. Keep the endpoint private; do not commit it. Configure preview and production environments separately as appropriate.

The route acknowledges a request only after the destination returns a successful HTTP status. An unconfigured destination returns 503; a failed or timed-out delivery returns 502. In either case, the form retains the entered details and offers the existing call/text contact, including a prefilled text message. A timeout does not prove the destination failed to receive the request; avoid automatic retries that could duplicate leads.

Mocked tests verify the application contract, not production delivery. Before relying on online leads, the owner should verify the configured destination and receipt with an authorized test. No destination or credentials are provisioned by this change.

### Validation

```bash
npm run check
npm test                 # API tests with mocked delivery; no real leads
npm run build
npx playwright install chromium
npm run test:browser     # desktop/mobile browser flows, mocked API delivery
```

`npm run validate` runs all four checks. Browser tests can use an existing Chromium binary by setting `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Node 22.6+ is required for the TypeScript API tests (CI uses Node 22).
