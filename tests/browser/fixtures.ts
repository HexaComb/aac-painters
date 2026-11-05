import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route(
      /^https:\/\/(?:[^/]+\.)?(?:googletagmanager\.com|google-analytics\.com|doubleclick\.net)\//,
      (route) => route.abort(),
    );
    await use(context);
  },
});

export { expect };
