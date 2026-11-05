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
The existing serverless `/api/quote` route sends email through the [Resend API](https://resend.com/docs/api-reference/emails/send-email):

- **From:** `AAC Painters Website <submission@aacpaintersinc.com>`
- **To:** `aacpaintersinc@gmail.com`
- **Reply-to:** the customer's email, when supplied
- **Contents:** all submitted contact and project details, a reference ID, and submission time

Before enabling production submissions:

1. Add and [verify `aacpaintersinc.com` in Resend](https://resend.com/docs/dashboard/domains/introduction), using the DNS records Resend provides.
2. Create a Resend API key with permission to send from this domain.
3. In Cloudflare, open the `aac-painters-inc` Worker → **Settings → Variables and Secrets**, add a **Secret** named `RESEND_API_KEY`, and save/deploy it. This must be a Worker runtime secret, not only a build variable. Alternatively, from this project run `npx wrangler secret put RESEND_API_KEY` and paste the key at the prompt; this updates the deployed Worker. See [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
4. Submit a test through the deployed form and confirm it arrives at `aacpaintersinc@gmail.com` with the expected sender, details, and reply-to address.

No additional server or SDK is needed. The API key stays on the server. `QUOTE_WEBHOOK_URL` is no longer used. For local email testing, copy `.dev.vars.example` to `.dev.vars`, enter a real key, and restart `npm run dev`. Local submissions with a real key send real emails to the recipient above; the automated tests mock Resend and never send email. Configure preview and production secrets separately as appropriate.

The route acknowledges a request only after Resend returns success and an email ID. An absent API key returns 503; a rejected, malformed, or timed-out response returns 502. In either case, the form retains the entered details and offers the existing call/text contact, including a prefilled text message. A timeout does not prove Resend failed to accept the request; there are no automatic retries. Resend acceptance does not guarantee inbox delivery, so verify receipt before relying on online leads. The endpoint does not store submissions in a database.

### GA4 analytics

The shared layout loads Tag Manager container `GTM-N3ZWT8VH`, whose published Google tag sends to GA4 measurement ID `G-EX8HXMVRGP`. Its existing configuration owns `page_view`, `first_visit`, and enhanced measurement; the site does not send an additional page view or load a second Google tag.

Custom events are sent through `gtag` to that same destination:

| Event | When | Parameters |
| --- | --- | --- |
| `first_landing` | First page in a browser tab's session; requires session storage | `landing_page` |
| `scroll_depth` | First time each 25%, 50%, 75%, and 90% depth is reached per page | `percent_scrolled` |
| `navigation_click` | Internal navigation links | `link_name`, `link_url`, `link_location` |
| `cta_click` | Estimate buttons, project CTAs, call/text/email links, and submit-button clicks | `link_name`, `link_url`, `link_location` |
| `generate_lead` | Quote API confirms a successful submission | `form_id`, `form_name` |

Every custom event includes `page_path`. Link destinations omit query strings; phone, SMS, and email links report only their protocol. Custom events never include form values, quote IDs, or the prefilled SMS body. GA4's automatic `form_submit` can represent a submission attempt; use `generate_lead` to count confirmed leads. `first_landing` is once per tab session, while GA4's `first_visit` identifies a new visitor.

GA4 property `562468727` has event-scoped custom dimensions for `link_name` (Link name), `link_location` (Link location), `percent_scrolled` (Scroll depth), and `landing_page` (First landing path). `generate_lead` is registered as a key event, counted once per event, with no default monetary value. These property settings are managed in GA4, outside this repository. Events can be checked in Realtime/DebugView; custom-dimension reports require processing time. Browser tests block Google analytics traffic and mock quote delivery.

### Validation

```bash
npm run check
npm test                 # API tests with mocked delivery; no real leads
npm run build
npx playwright install chromium
npm run test:browser     # desktop/mobile browser flows, mocked API delivery
```

`npm run validate` runs all four checks. Browser tests can use an existing Chromium binary by setting `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Node 22.6+ is required for the TypeScript API tests (CI uses Node 22).
