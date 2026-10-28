import { test, expect, type Page, type Route } from '@playwright/test';
import { POST } from '../../src/pages/api/quote';

async function fillContact(page: Page) {
  await page.locator('#fullName').fill('Test Contact');
  await page.locator('#phone').fill('(209) 555-0100');
  await page.locator('#city').fill('Modesto');
  await page.locator('#projectDetails').fill('TEST ONLY: driveway cleaning.');
  await page.locator('#serviceType').selectOption('Pressure Washing');
}

test('services are an equal, text-only list and route to a neutral estimate choice', async ({ page }) => {
  const services = [
    ['Interior & exterior painting', '/services/residential-painting'],
    ['Cabinet, stairwell & railing painting', '/services/residential-painting'],
    ['Fence & deck staining', '/services/residential-painting'],
    ['Epoxy flooring', '/services/epoxy-flooring'],
    ['Grind & seal concrete', '/services/epoxy-flooring'],
    ['Popcorn removal & texture', '/services/residential-painting'],
    ['Pressure washing', '/services/residential-painting'],
  ] as const;
  await page.goto('/');
  const list = page.locator('#our-services .services-list');
  await expect(list.locator('li')).toHaveCount(services.length);
  await expect(page.locator('#our-services img, #our-services picture, #our-services svg, #our-services figure')).toHaveCount(0);
  await expect(page.locator('#serviceType')).toHaveValue('');
  await expect(page.locator('#finish-field')).toBeHidden();
  await expect(page.locator('#preferredFinish option')).toHaveCount(1);
  let unselectedRequests = 0;
  await page.route('**/api/quote', (route) => { unselectedRequests++; return route.abort(); });
  await page.locator('#fullName').fill('Test Contact');
  await page.locator('#phone').fill('2095550100');
  await page.locator('#city').fill('Modesto');
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#serviceType')).toHaveAttribute('aria-invalid', 'true');
  expect(unselectedRequests).toBe(0);
  for (const [label, path] of services) {
    const link = list.getByRole('link', { name: label });
    await expect(link).toHaveAttribute('href', path);
  }
  await list.getByRole('link', { name: 'Grind & seal concrete' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/services\/epoxy-flooring$/);
  await expect(page.locator('#serviceType')).toHaveValue('');
  await expect(page.locator('#serviceType')).toContainText('Grind & Seal Concrete');
  await page.goBack();
  await expect(page.locator('#serviceType')).toHaveValue('');
  await page.goForward();
  await expect(page.locator('#serviceType')).toHaveValue('');
  await page.goto('/services/residential-painting');
  await expect(page.locator('#serviceType')).toHaveValue('');
  await expect(page.locator('.estimate-credentials')).toContainText('Painting, floor coatings, staining & surface work');
  await expect(page.locator('.estimate-credentials')).not.toContainText('Fully Insured');
  await page.locator('#serviceType').selectOption('Stairwell & Railing Painting');
  await expect(page.locator('#propertyScope')).toContainText('Home Interior');
});

test('FAQ covers the service range, matches JSON-LD, and toggles by keyboard and touch', async ({ page }, testInfo) => {
  await page.goto('/');
  const faq = page.locator('#faq');
  const items = faq.locator('details.faq-item');
  await expect(items).toHaveCount(8);
  await expect(faq).toContainText('cabinet');
  await expect(faq).toContainText('staining');
  await expect(faq).toContainText('pressure washing');
  await expect(faq).toContainText('popcorn removal');
  await expect(faq).toContainText('grind-and-seal');
  const visible = await items.evaluateAll((details) => details.map((detail) => ({
    question: detail.querySelector('summary span')?.textContent?.trim(),
    answer: detail.querySelector('.faq-answer p')?.textContent?.trim(),
  })));
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const schema = scripts.map((script) => JSON.parse(script)).find((item) => item['@type'] === 'FAQPage');
  expect(schema?.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({
    question: item.name, answer: item.acceptedAnswer.text,
  }))).toEqual(visible);

  await expect(items.nth(0)).toHaveAttribute('open', '');
  await expect(items.nth(1)).not.toHaveAttribute('open', '');
  const second = items.nth(1).locator('summary');
  await second.focus();
  await page.keyboard.press('Enter');
  await expect(items.nth(1)).toHaveAttribute('open', '');
  await page.keyboard.press('Space');
  await expect(items.nth(1)).not.toHaveAttribute('open', '');
  if (testInfo.project.name === 'mobile') {
    await second.tap();
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await second.tap();
  } else {
    await second.click();
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await second.click();
  }
  await expect(items.nth(1)).not.toHaveAttribute('open', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

// Exercise the real route handler with an isolated delivery stub. Never send leads.
async function fulfillApi(route: Route, deliveryStatus?: number) {
  const original = globalThis.fetch;
  let record: Record<string, unknown> | undefined;
  globalThis.fetch = async (_url, init) => {
    record = JSON.parse(String(init?.body));
    return new Response(null, { status: deliveryStatus ?? 204 });
  };
  try {
    const response = await POST({
      request: new Request('http://localhost/api/quote', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: route.request().postData()!,
      }),
      locals: { runtime: { env: deliveryStatus ? { QUOTE_WEBHOOK_URL: 'https://delivery.invalid/test-only' } : {} } },
    } as unknown as Parameters<typeof POST>[0]);
    await route.fulfill({ status: response.status, contentType: 'application/json', body: await response.text() });
    return record;
  } finally {
    globalThis.fetch = original;
  }
}

test('service pages expose the shared lineup with correct project categories', async ({ page }) => {
  const pages = [
    { path: '/services/residential-painting', terms: ['Cabinet Painting', 'Stairwell', 'Popcorn', 'Pressure Washing'], count: 2 },
    { path: '/services/commercial-painting', terms: ['HOA', 'Hotel', 'Apartment'], count: 3 },
    { path: '/services/epoxy-flooring', terms: ['Pool Deck', 'Patio', 'Wood Deck'], count: 3 },
  ];
  for (const service of pages) {
    await page.goto(service.path);
    for (const term of service.terms) await expect(page.locator('.service-overview')).toContainText(term);
    await expect(page.locator('.ba-item')).toHaveCount(service.count);
    await expect(page.locator('body')).not.toContainText(/lorem ipsum|consectetur|adipiscing/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('pressure washing and ceiling removal do not request a coating; choices adapt across services', async ({ page }) => {
  await page.goto('/');
  for (const value of ['Pressure Washing', 'Popcorn Ceiling Removal & Re-Texturing']) {
    await page.locator('#serviceType').selectOption(value);
    await expect(page.locator('#finish-field')).toBeHidden();
    await expect(page.locator('#preferredFinish')).toBeDisabled();
    await expect(page.locator('#propertyScope')).not.toContainText('Garage');
  }
  await page.locator('#serviceType').selectOption('Fence & Deck Staining');
  await expect(page.locator('#finish-field')).toBeVisible();
  await expect(page.locator('#preferredFinish')).toContainText('Natural Wood Tone');
  await expect(page.locator('#preferredFinish')).not.toContainText('Tuxedo');
  await page.locator('#serviceType').selectOption('Interior & Exterior Residential Painting');
  await expect(page.locator('#propertyScope')).toContainText('Home Interior');
  await expect(page.locator('#preferredFinish')).toContainText('Custom Paint');
  await expect(page.locator('#preferredFinish')).not.toContainText('Natural Wood Tone');
});

test('valid form reaches the API with canonical fields and shows the returned quote ID', async ({ page }) => {
  let record: Record<string, unknown> | undefined;
  await page.route('**/api/quote', async (route) => { record = await fulfillApi(route, 202); });
  await page.goto('/');
  await fillContact(page);
  await page.locator('#serviceType').selectOption('Pressure Washing');
  await page.locator('#propertyScope').selectOption('Outdoor — Driveway / Patio / Walkway');
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toHaveClass(/is-success/);
  expect(record).toMatchObject({ name: 'Test Contact', services: ['Pressure Washing'], propertyType: 'Outdoor — Driveway / Patio / Walkway', selectedFinish: 'Not applicable' });
  await expect(page.locator('#quote-feedback')).toContainText(String(record!.quoteId));
  await expect(page.locator('#quote-feedback')).not.toContainText('undefined');
  await expect(page.locator('#fullName')).toHaveValue('');
});

test('validation prevents invalid requests, then missing delivery preserves inputs and offers text fallback', async ({ page }) => {
  let requests = 0;
  await page.route('**/api/quote', async (route) => { requests++; await fulfillApi(route); });
  await page.goto('/');
  await page.locator('#quote-submit-btn').click();
  expect(requests).toBe(0);
  await expect(page.locator('#fullName')).toBeFocused();
  await fillContact(page);
  await page.locator('#phone').fill('----------');
  await page.locator('#quote-submit-btn').click();
  expect(requests).toBe(0);
  await expect(page.locator('#phone')).toBeFocused();
  await page.locator('#phone').fill('2095550100');
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toContainText('has not been sent');
  await expect(page.locator('#fullName')).toHaveValue('Test Contact');
  await expect(page.locator('#projectDetails')).toHaveValue('TEST ONLY: driveway cleaning.');
  await expect(page.locator('#quote-text-link')).toHaveAttribute('href', /sms:\+12094855103\?&body=/);
  await expect(page.locator('#quote-submit-btn')).toBeEnabled();
  await page.locator('#projectDetails').fill('Updated text fallback');
  await expect(page.locator('#quote-text-link')).toHaveAttribute('href', /Updated%20text%20fallback/);
  expect(requests).toBe(1);
});

test('delivery rejection and network failure are recoverable without clearing the request', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/quote', async (route) => {
    calls++;
    if (calls === 2) await route.abort();
    else await fulfillApi(route, calls === 1 ? 500 : 204);
  });
  await page.goto('/');
  await fillContact(page);
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toContainText('could not confirm delivery');
  await expect(page.locator('#fullName')).toHaveValue('Test Contact');
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toHaveClass(/is-error/);
  await expect(page.locator('#fullName')).toHaveValue('Test Contact');
  await expect(page.locator('#quote-submit-btn')).toBeEnabled();
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-feedback')).toHaveClass(/is-success/);
  expect(calls).toBe(3);
});

test('pending duplicate submission is blocked and newer edits survive success', async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  let requests = 0;
  await page.route('**/api/quote', async (route) => { requests++; await pending; await fulfillApi(route, 202); });
  await page.goto('/');
  await fillContact(page);
  await page.locator('#quote-submit-btn').click();
  await expect(page.locator('#quote-submit-btn')).toBeDisabled();
  await page.locator('#projectDetails').fill('New edit while sending');
  await page.locator('#aac-quote-form').evaluate((form: HTMLFormElement) => form.requestSubmit());
  expect(requests).toBe(1);
  release();
  await expect(page.locator('#quote-feedback')).toContainText('newer edits');
  await expect(page.locator('#projectDetails')).toHaveValue('New edit while sending');
  await expect(page.locator('#quote-submit-btn')).toBeEnabled();
});

test('finish choices stay compatible and stale selections clear when changing services', async ({ page }) => {
  await page.goto('/');
  await page.locator('#serviceType').selectOption('Full-Broadcast Flake Epoxy Floor');
  await page.locator('#preferredFinish').selectOption({ index: 1 });
  await expect(page.locator('#preferredFinish')).not.toHaveValue('');
  await page.locator('#serviceType').selectOption('Cabinets, Trim & Interior Repaint');
  await expect(page.locator('#preferredFinish')).toHaveValue('');
  await expect(page.locator('#preferredFinish')).not.toContainText('Exterior Architectural');
  await expect(page.locator('#preferredFinish')).not.toContainText('Tuxedo');
  await page.locator('#preferredFinish').selectOption('Custom Architectural Paint Color Match');
  await page.locator('#serviceType').selectOption('Pressure Washing');
  await expect(page.locator('#preferredFinish')).toBeDisabled();
  await expect(page.locator('#preferredFinish')).toHaveValue('');
  await page.locator('#serviceType').selectOption('Full-Broadcast Flake Epoxy Floor');
  await expect(page.locator('#preferredFinish')).toBeEnabled();
  await expect(page.locator('#preferredFinish')).toHaveValue('');
  await expect(page.locator('#preferredFinish')).toContainText('Tuxedo');
});
