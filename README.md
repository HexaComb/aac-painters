# AAC Painters Inc. — Astro + Cloudflare Workers Website

Official story-driven, painting-focused website for **AAC Painters Inc.** (*"Coloring Your Dream" — CSLB License #1039849*), featuring interactive Before & After comparison sliders, exterior painting jobsite documentaries, and a Cloudflare Workers Quote Builder API (`/api/quote`).

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
3. Create a [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) widget for `aacpaintersinc.com` / `www.aacpaintersinc.com` (Managed mode recommended) to obtain your **Site Key** and **Secret Key**.
4. In Cloudflare, open the `aac-painters-inc` Worker:
   - Under **Settings → Build → Variables and secrets** (build-time variable), add `PUBLIC_TURNSTILE_SITE_KEY` with your Turnstile **Site Key** so Astro bakes it into the static pages.
   - Under **Settings → Variables and Secrets** (Worker runtime secrets), add **Secrets** named `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY`, and save/deploy. Alternatively, run `npx wrangler secret put RESEND_API_KEY` and `npx wrangler secret put TURNSTILE_SECRET_KEY`. See [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
5. Submit a test through the deployed form and confirm it arrives at `aacpaintersinc@gmail.com` with the expected sender, details, and reply-to address.

No additional server or SDK is needed. The Resend API key and Turnstile secret stay on the server. `QUOTE_WEBHOOK_URL` is no longer used. For local testing, `astro dev` defaults to Cloudflare's official Always-Passes Turnstile test site key (`1x00000000000000000000AA`) unless `PUBLIC_TURNSTILE_SITE_KEY` is set; copy `.dev.vars.example` to `.dev.vars` (which includes the matching Always-Passes test secret `1x0000000000000000000000000000000AA`), enter a real `RESEND_API_KEY` if testing email delivery, and restart `npm run dev`. Local submissions with a real Resend key send real emails to the recipient above; the automated tests mock both Turnstile and Resend and never send email. Configure preview and production secrets separately as appropriate.

The route verifies the Turnstile token with Cloudflare `siteverify` before contacting Resend, and acknowledges a request only after Resend returns success and an email ID. A missing `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` returns 503; a missing Turnstile token returns 400; a failed/expired Turnstile token returns 403; a rejected, malformed, or timed-out upstream response returns 502. In every failure case, the form retains the entered details, resets the single-use Turnstile widget, and offers the existing call/text contact, including a prefilled text message. A timeout does not prove Resend failed to accept the request; there are no automatic retries. Resend acceptance does not guarantee inbox delivery, so verify receipt before relying on online leads. The endpoint does not store submissions in a database.

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

## Service scope (November 16, 2026)
Patterson is the primary service market, with the Bay Area and Central Valley also served. Flooring, epoxy, concrete grinding/sealing and deck/patio coating offerings are withdrawn, including quote choices and floor galleries. The retired `/services/epoxy-flooring/` endpoint returns HTTP 410 and noindex. Surface services refer to painting preparation, cleaning, texture work and wood staining, not a relabeled flooring offering. Historical media remains in version control but is not promoted as an available service.
