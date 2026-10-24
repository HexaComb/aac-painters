import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import { POST } from '../src/pages/api/quote.ts';
import { getQuoteService, isValidPhone, quoteServices } from '../src/data/quoteOptions.ts';

const webhook = 'https://quote-delivery.example.invalid/test-only';
const valid = {
  name: 'Sample Contact',
  phone: '(209) 555-0100',
  email: 'sample@example.invalid',
  city: 'Modesto',
  services: 'Interior & Exterior Residential Painting',
  propertyType: 'Residential — Home Interior',
  selectedFinish: 'Custom Architectural Paint Color Match',
  projectDetails: 'TEST ONLY: discuss an interior repaint.',
};

type RouteContext = Parameters<typeof POST>[0];
type Delivery = (url: string | URL | Request, init?: RequestInit) => Promise<Response>;

function mockDelivery(t: TestContext, implementation: Delivery = async () => new Response(null, { status: 204 })) {
  // Every invocation is intercepted. The .invalid address can never receive leads.
  return t.mock.method(globalThis, 'fetch', implementation as typeof fetch);
}

function jsonRequest(data: unknown) {
  return new Request('https://website.example.invalid/api/quote', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
}

async function invoke(request: Request, configured = true) {
  const response = await POST({
    request,
    locals: configured ? { runtime: { env: { QUOTE_WEBHOOK_URL: webhook } } } : {},
  } as RouteContext);
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  return { response, body: await response.json() };
}

test('canonical JSON fields are forwarded intact after confirmed delivery', async (t) => {
  const delivery = mockDelivery(t);
  const { response, body } = await invoke(jsonRequest({
    ...valid, name: '  Sample Contact  ', city: ' Modesto ', squareFootage: '450', timeline: 'Discuss availability',
  }));
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.match(body.quoteId, /^AAC-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.equal(new Date(body.submittedAt).toISOString(), body.submittedAt);
  assert.match(body.message, /sent to the AAC Painters team/);
  assert.equal(body.referenceId, undefined);
  assert.equal(body.quote, undefined, 'Do not reflect contact PII in the success response.');
  assert.equal(delivery.mock.callCount(), 1);
  const [url, init] = delivery.mock.calls[0].arguments;
  assert.equal(url, webhook);
  assert.equal(init?.method, 'POST');
  assert.deepEqual(init?.headers, { 'Content-Type': 'application/json' });
  assert.ok(init?.signal instanceof AbortSignal);
  assert.equal(init.signal.aborted, false);
  assert.deepEqual(JSON.parse(String(init?.body)), {
    quoteId: body.quoteId, submittedAt: body.submittedAt,
    ...valid, name: 'Sample Contact', services: [valid.services],
    squareFootage: '450', timeline: 'Discuss availability',
  });
});

test('legacy JSON form names still map into the canonical record', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({
    fullName: valid.name, phone: valid.phone, email: valid.email, city: valid.city,
    serviceType: valid.services, propertyScope: valid.propertyType, preferredFinish: valid.selectedFinish,
    projectDetails: valid.projectDetails,
  }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
  for (const field of ['name', 'phone', 'email', 'city', 'propertyType', 'selectedFinish', 'projectDetails'] as const) {
    assert.equal(record[field], valid[field]);
  }
  assert.deepEqual(record.services, [valid.services]);
  assert.equal(record.fullName, undefined);
  assert.equal(record.propertyScope, undefined);
});

test('canonical names take precedence over legacy aliases', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({
    ...valid, fullName: 'Old name', serviceType: 'Pressure Washing', propertyScope: 'Old property', preferredFinish: 'Old finish',
  }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
  assert.equal(record.name, valid.name);
  assert.deepEqual(record.services, [valid.services]);
  assert.equal(record.propertyType, valid.propertyType);
  assert.equal(record.selectedFinish, valid.selectedFinish);
});

test('multipart form fields preserve multiple canonical services', async (t) => {
  const delivery = mockDelivery(t);
  const form = new FormData();
  for (const [key, value] of Object.entries(valid)) form.append(key, value);
  form.append('services', 'Fence & Deck Staining');
  const { response } = await invoke(new Request('https://website.example.invalid/api/quote', { method: 'POST', body: form }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
  assert.deepEqual(record.services, [valid.services, 'Fence & Deck Staining']);
  assert.equal(record.name, valid.name);
  assert.equal(record.propertyType, valid.propertyType);
});

test('URL-encoded legacy form fields remain compatible', async (t) => {
  const delivery = mockDelivery(t);
  const form = new URLSearchParams({
    fullName: valid.name, phone: valid.phone, city: valid.city, serviceType: valid.services,
    propertyScope: valid.propertyType, preferredFinish: valid.selectedFinish,
  });
  const { response } = await invoke(new Request('https://website.example.invalid/api/quote', { method: 'POST', body: form }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
  assert.equal(record.name, valid.name);
  assert.deepEqual(record.services, [valid.services]);
  assert.equal(record.selectedFinish, valid.selectedFinish);
});

for (const service of ['Pressure Washing', 'Popcorn Ceiling Removal & Re-Texturing']) {
  test(`${service} discards stale finish preferences`, async (t) => {
    const delivery = mockDelivery(t);
    const { response } = await invoke(jsonRequest({ ...valid, services: service }));
    assert.equal(response.status, 200);
    const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
    assert.deepEqual(record.services, [service]);
    assert.equal(record.selectedFinish, 'Not applicable');
  });
}

test('optional details have neutral defaults, not a forced coating or property', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({ name: valid.name, phone: valid.phone, city: valid.city, services: valid.services }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(delivery.mock.calls[0].arguments[1]?.body));
  assert.equal(record.email, '');
  assert.equal(record.propertyType, 'Not specified');
  assert.equal(record.selectedFinish, 'Not specified');
  assert.equal(record.squareFootage, 'Not specified');
  assert.equal(record.timeline, 'Not specified');
});

const invalidFields: [string, Record<string, unknown>][] = [
  ['empty name', { name: '' }], ['whitespace name', { name: '  ' }], ['one-character name', { name: 'A' }],
  ['oversized name', { name: 'x'.repeat(121) }], ['non-string name', { name: { invalid: true } }],
  ['empty phone', { phone: '' }], ['short phone', { phone: '209555010' }], ['letters in phone', { phone: '209-555-CALL' }],
  ['invalid country prefix', { phone: '+44 2095550100' }], ['oversized phone', { phone: '209' + ' '.repeat(25) + '5550100' }],
  ['empty city', { city: '' }], ['one-character city', { city: 'M' }], ['oversized city', { city: 'x'.repeat(121) }],
  ['empty service', { services: '' }], ['empty service array', { services: [] }], ['unknown service', { services: 'Not a service' }],
  ['invalid email', { email: 'not-an-email' }], ['oversized email', { email: `${'x'.repeat(250)}@example.invalid` }],
  ['oversized property', { propertyType: 'x'.repeat(201) }], ['oversized finish', { selectedFinish: 'x'.repeat(201) }],
  ['oversized project details', { projectDetails: 'x'.repeat(5001) }], ['filled honeypot', { companyWebsite: 'https://spam.example.invalid' }],
];
for (const [label, overrides] of invalidFields) {
  test(`validation rejects ${label} before any delivery attempt`, async (t) => {
    const delivery = mockDelivery(t);
    const { response, body } = await invoke(jsonRequest({ ...valid, ...overrides }));
    assert.equal(response.status, 400);
    assert.equal(body.ok, false);
    assert.equal(typeof body.error, 'string');
    assert.equal(delivery.mock.callCount(), 0);
  });
}

for (const body of [null, [], 'text', 42]) {
  test(`malformed JSON shape ${JSON.stringify(body)} is rejected`, async (t) => {
    const delivery = mockDelivery(t);
    const { response, body: result } = await invoke(jsonRequest(body));
    assert.equal(response.status, 400);
    assert.equal(result.ok, false);
    assert.equal(delivery.mock.callCount(), 0);
  });
}

test('invalid JSON syntax is rejected without attempting delivery', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(new Request('https://website.example.invalid/api/quote', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken',
  }));
  assert.equal(response.status, 400);
  assert.equal(delivery.mock.callCount(), 0);
});

test('missing webhook never claims successful receipt and includes a usable text fallback', async (t) => {
  const delivery = mockDelivery(t);
  const { response, body } = await invoke(jsonRequest(valid), false);
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.match(body.error, /has not been sent/);
  assert.match(body.error, /call or text \(209\) 485-5103/);
  assert.equal(body.quoteId, undefined);
  assert.match(body.smsLink, /^sms:\+12094855103\?&body=/);
  const message = decodeURIComponent(body.smsLink.split('body=')[1]);
  for (const value of [valid.name, valid.phone, valid.city, valid.services, valid.projectDetails]) assert.ok(message.includes(value));
  assert.equal(delivery.mock.callCount(), 0);
});

for (const status of [400, 429, 500]) {
  test(`webhook HTTP ${status} is not reported as success`, async (t) => {
    const delivery = mockDelivery(t, async () => new Response('Not accepted', { status }));
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /could not confirm delivery/);
    assert.match(body.smsLink, /^sms:\+12094855103/);
    assert.equal(delivery.mock.callCount(), 1);
  });
}

for (const error of [new Error('Simulated connection reset'), new DOMException('Simulated timeout', 'TimeoutError')]) {
  test(`${error.name} during delivery returns a truthful recoverable error`, async (t) => {
    const delivery = mockDelivery(t, async () => { throw error; });
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /could not confirm delivery/);
    assert.equal(body.quoteId, undefined);
    assert.equal(delivery.mock.callCount(), 1, 'No silent retry that could duplicate a delivered request.');
  });
}

test('service catalog includes every newly advertised service and appropriate secondary fields', () => {
  assert.equal(new Set(quoteServices.map((service) => service.value)).size, quoteServices.length);
  for (const service of quoteServices) {
    assert.ok(service.label);
    assert.ok(service.propertyTypes.length);
    assert.equal(getQuoteService(service.value), service);
  }
  assert.equal(getQuoteService('Pressure Washing')?.finishType, 'none');
  assert.ok(getQuoteService('Pressure Washing')?.propertyTypes.includes('Outdoor — Driveway / Patio / Walkway'));
  assert.equal(getQuoteService('Popcorn Ceiling Removal & Re-Texturing')?.finishType, 'none');
  assert.equal(getQuoteService('Fence & Deck Staining')?.finishType, 'stain');
  assert.ok(getQuoteService('Pool Deck & Patio Coatings'));
  assert.equal(getQuoteService('Not a service'), undefined);
});

test('phone validation accepts US formatting and rejects invalid digit lengths and letters', () => {
  for (const number of ['2095550100', '(209) 555-0100', '+1 (209) 555-0100', '1.209.555.0100']) assert.equal(isValidPhone(number), true, number);
  for (const number of ['', '209555010', '20955501000', '+44 2095550100', '209555ABCD']) assert.equal(isValidPhone(number), false, number);
});
