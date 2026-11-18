# AAC mobile performance benchmarks — November 17, 2026

## Scope

This PR changes when decorative video assets are fetched; it does **not**
remove the hero animation, the hero video, the before-and-after feature,
Google Analytics, galleries, or SEO content.

The original PageSpeed report supplied by the client:
https://pagespeed.web.dev/analysis/https-aacpaintersinc-com/x839kjbar5?utm_source=search_console&form_factor=mobile&hl=en

**Important:** The public report's detailed Lighthouse scores were not
readable through the tools used to prepare this PR. Do not present guessed
scores as measured baselines. The report indicated insufficient real-user
CrUX data ("No Data"); that is not a failed Core Web Vitals assessment.

## Audited source baseline (main before this PR)

- The hero begins with `src="/videos/before-after-video.mp4"`,
  `autoplay` and `preload="metadata"`.
- The featured before-and-after section also uses an autoplay video
  with the same MP4 `src`, even when the section is below the fold.
- The hero already has an optimized WebP poster with a high-priority
  preload. It remains unchanged.
- The tracked MP4 `public/videos/before-after-video.mp4` is **1,392,063
  bytes** in the repository, approximately 1.33 MiB. This is a source
  artifact size, **not** a measured over-the-wire download or transfer
  cost; caching, byte-range requests, and CDN transforms may differ.
- Both code paths are subject to the browser's caching behavior;
  do not simply multiply the MP4 size by two and call it transfer bytes.
- Images already have extensive WebP and lazy-loading support; this
  change avoids rewriting that system without a benchmark identifying
  it as the bottleneck.

## Paired mobile benchmark

The non-blocking `mobile-performance.yml` workflow runs on performance PRs:

1. Checkout the PR base SHA, build the production Cloudflare site, and
   serve it locally through Wrangler on port 8787.
2. Run Lighthouse mobile **three times**, with the same runner, Chrome,
   Lighthouse 13.0.1 and simulated mobile throttling.
3. Checkout the PR head SHA and run the same build and three audits.
4. Report medians for performance score, FCP, LCP, TBT, CLS, Speed Index,
   network request count, and observed network transfer bytes.
5. Save all six raw Lighthouse JSON reports and the markdown summary
   as a GitHub Actions artifact.

Because PageSpeed Insights tests a **deployed URL** and this workflow tests
**local production builds**, the two sets of scores must not be mixed in
the same before/after table. Repeat mobile PageSpeed on the production
homepage after merging to check real CDN/font/analytics effects, ideally
across several runs. INP requires sufficient real-user data and cannot be
measured by a page-load-only Lighthouse test.

## Acceptance criteria

- No broken hero appearance; poster and slogan remain visible immediately.
- Hero animation timings and before-and-after interactions remain intact.
- Decorative videos don't request MP4 files when reduced motion is on.
- Featured project video isn't fetched merely because the page loaded.
- LCP/TBT, CLS and overall mobile score are compared as **medians**, not
  a single noisy run; investigate any regression before merging.
- Browser validation remains required; the performance benchmark itself
  is informational and does not block deployment.

## Expected effect vs. measured effect

**Expected:** less competition between decorative media and the
critical rendering path, especially on mobile.

**Measured:** see the PR's `Mobile performance comparison` workflow
summary and its `mobile-lighthouse-before-after` artifact. Do not
claim a numeric improvement until that run completes successfully.
