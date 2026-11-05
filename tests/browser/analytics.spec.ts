import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

async function events(page: Page, name: string) {
  return page.evaluate((eventName) => window.dataLayer.flatMap((entry) => {
    if (typeof entry !== 'object' || entry === null || !('0' in entry) || entry[0] !== 'event'
      || !('1' in entry) || entry[1] !== eventName || !('2' in entry)) return [];
    return [entry[2]];
  }), name);
}

test('first landing is recorded once per tab across navigation and reloads', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => events(page, 'first_landing')).toEqual([
    { send_to: 'G-EX8HXMVRGP', page_path: '/', landing_page: '/' },
  ]);
  await page.goto('/projects');
  await expect(page.locator('h1')).toBeVisible();
  expect(await events(page, 'first_landing')).toEqual([]);
  await page.reload();
  expect(await events(page, 'first_landing')).toEqual([]);
});

test('navigation and CTA clicks include readable names and placement without SMS form data', async ({ page }) => {
  await page.goto('/');
  await page.locator('.footer-nav a[href="/#reviews"]').click();
  await expect.poll(() => events(page, 'navigation_click')).toEqual([
    { send_to: 'G-EX8HXMVRGP', page_path: '/', link_name: 'Project Videos', link_url: 'http://127.0.0.1:4321/#reviews', link_location: 'footer' },
  ]);
  await page.locator('.header-estimate-pill').click();
  await expect.poll(() => events(page, 'cta_click')).toContainEqual({
    send_to: 'G-EX8HXMVRGP', page_path: '/', link_name: 'Get a Free Estimate', link_url: 'http://127.0.0.1:4321/#quote-builder', link_location: 'header',
  });
  await page.locator('#fullName').fill('Private Test Person');
  await page.locator('#projectDetails').fill('Private project details');
  await page.locator('#quote-text-link').evaluate((link) => link.addEventListener('click', (event) => event.preventDefault()));
  await page.locator('#quote-text-link').click();
  const clicks = await events(page, 'cta_click');
  expect(clicks).toContainEqual({
    send_to: 'G-EX8HXMVRGP', page_path: '/', link_name: 'text your project details', link_url: 'sms:', link_location: 'quote-builder',
  });
  expect(JSON.stringify(clicks)).not.toContain('Private');
  expect(JSON.stringify(clicks)).not.toContain('body=');
});

test('scroll milestones fire once per page even after scrolling back and forth', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await expect.poll(() => events(page, 'scroll_depth')).toEqual([
    { send_to: 'G-EX8HXMVRGP', page_path: '/', percent_scrolled: 25 },
    { send_to: 'G-EX8HXMVRGP', page_path: '/', percent_scrolled: 50 },
    { send_to: 'G-EX8HXMVRGP', page_path: '/', percent_scrolled: 75 },
    { send_to: 'G-EX8HXMVRGP', page_path: '/', percent_scrolled: 90 },
  ]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  expect(await events(page, 'scroll_depth')).toHaveLength(4);
});

test('only a confirmed submission generates a lead, without customer details', async ({ page }) => {
  let accepted = false;
  let requests = 0;
  await page.route('**/api/quote', (route) => {
    requests++;
    return route.fulfill({
      status: accepted ? 200 : 503,
      contentType: 'application/json',
      body: JSON.stringify(accepted
        ? { ok: true, quoteId: 'test-reference', message: 'Sent.' }
        : { ok: false, error: 'Delivery unavailable.' }),
    });
  });
  await page.goto('/');
  await page.locator('#quote-submit-btn').click();
  expect(requests).toBe(0);
  expect(await events(page, 'generate_lead')).toEqual([]);
  await page.locator('#fullName').fill('Private Test Person');
  await page.locator('#phone').fill('2095550100');
  await page.locator('#city').fill('Modesto');
  await page.locator('#serviceType').selectOption('Pressure Washing');
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toHaveClass(/is-error/);
  expect(await events(page, 'generate_lead')).toEqual([]);
  accepted = true;
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toHaveClass(/is-success/);
  expect(await events(page, 'generate_lead')).toEqual([
    { send_to: 'G-EX8HXMVRGP', page_path: '/', form_id: 'aac-quote-form', form_name: 'Free Estimate' },
  ]);
});
