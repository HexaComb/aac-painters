import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import { POST } from '../src/pages/api/quote.ts';
import { getQuoteService, isValidPhone, quoteServices } from '../src/data/quoteOptions.ts';

const apiKey = 'test-only-resend-key';
const turnstileSecret = 'test-only-turnstile-secret';
const turnstileToken = 'test-only-turnstile-token';
const valid = {
  name: 'Sample Contact',
  phone: '(209) 555-0100',
  email: 'sample@example.invalid',
  city: 'Modesto',
  services: 'Interior & Exterior Residential Painting',
  propertyType: 'Residential — Home Interior',
  selectedFinish: 'Custom Architectural Paint Color Match',
  projectDetails: 'TEST ONLY: discuss an interior repaint.',
  'cf-turnstile-response': turnstileToken,
};

type RouteContext = Parameters<typeof POST>[0];
type Delivery = (url: string | URL | Request, init?: RequestInit) => Promise<Response>;

const TURNSTILE_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

function mockDelivery(
  t: TestContext,
  implementation: Delivery = async () => Response.json({ id: 'test-email-id' }),
  turnstileImplementation: Delivery = async () => Response.json({
    success: true,
    action: 'quote_estimate',
    hostname: 'www.aacpaintersinc.com',
  }),
) {
  // Every fetch is intercepted; the test keys are not real credentials.
  return t.mock.method(globalThis, 'fetch', (async (url: string | URL | Request, init?: RequestInit) => {
    if (String(url) === TURNSTILE_URL) return turnstileImplementation(url, init);
    return implementation(url, init);
  }) as typeof fetch);
}

function callsFor(mock: ReturnType<typeof mockDelivery>, targetUrl: string) {
  return mock.mock.calls.filter((call) => String(call.arguments[0]) === targetUrl);
}

function jsonRequest(data: unknown, headers: Record<string, string> = {}) {
  return new Request('https://website.example.invalid/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(data),
  });
}

async function invoke(
  request: Request,
  env: Record<string, string> | boolean = true,
) {
  const resolvedEnv = env === true
    ? { RESEND_API_KEY: apiKey, TURNSTILE_SECRET_KEY: turnstileSecret }
    : env === false
      ? {}
      : env;
  const response = await POST({
    request,
    locals: Object.keys(resolvedEnv).length ? { runtime: { env: resolvedEnv } } : {},
  } as RouteContext);
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  return { response, body: await response.json() };
}

test('canonical JSON fields are forwarded intact after Turnstile verification and confirmed delivery', async (t) => {
  const delivery = mockDelivery(t);
  const { response, body } = await invoke(jsonRequest({
    ...valid, name: '  Sample Contact  ', city: ' Modesto ', squareFootage: '450', timeline: 'Discuss availability',
  }, { 'CF-Connecting-IP': '203.0.113.42' }));
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.match(body.quoteId, /^AAC-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.equal(new Date(body.submittedAt).toISOString(), body.submittedAt);
  assert.match(body.message, /sent to the AAC Painters team/);
  assert.equal(body.referenceId, undefined);
  assert.equal(body.quote, undefined, 'Do not reflect contact PII in the success response.');
  assert.equal(delivery.mock.callCount(), 2);

  const [verifyUrl, verifyInit] = delivery.mock.calls[0].arguments;
  assert.equal(verifyUrl, TURNSTILE_URL);
  assert.equal(verifyInit?.method, 'POST');
  assert.deepEqual(verifyInit?.headers, { 'Content-Type': 'application/x-www-form-urlencoded' });
  assert.ok(verifyInit?.signal instanceof AbortSignal);
  const verifyPayload = verifyInit?.body instanceof URLSearchParams
    ? verifyInit.body
    : new URLSearchParams(String(verifyInit?.body));
  assert.equal(verifyPayload.get('secret'), turnstileSecret);
  assert.equal(verifyPayload.get('response'), turnstileToken);
  assert.equal(verifyPayload.get('remoteip'), '203.0.113.42');
  assert.ok(verifyPayload.get('idempotency_key'));

  const [url, init] = delivery.mock.calls[1].arguments;
  assert.equal(url, RESEND_URL);
  assert.equal(init?.method, 'POST');
  assert.deepEqual(init?.headers, { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` });
  assert.ok(init?.signal instanceof AbortSignal);
  assert.equal(init.signal.aborted, false);
  const message = JSON.parse(String(init?.body));
  assert.deepEqual(Object.keys(message).sort(), ['from', 'reply_to', 'subject', 'text', 'to']);
  assert.equal(message.from, 'AAC Painters Website <submission@aacpaintersinc.com>');
  assert.deepEqual(message.to, ['aacpaintersinc@gmail.com']);
  assert.equal(message.reply_to, valid.email);
  assert.equal(message.subject, `New estimate request — ${body.quoteId}`);
  assert.equal(message.text, [
    'New estimate request from the AAC Painters website', '',
    `Reference: ${body.quoteId}`, `Submitted at (UTC): ${body.submittedAt}`, '',
    `Name: ${valid.name}`, `Phone: ${valid.phone}`, `Email: ${valid.email}`, `City: ${valid.city}`,
    `Services: ${valid.services}`, `Property: ${valid.propertyType}`, 'Size: 450',
    'Timeline: Discuss availability', `Finish: ${valid.selectedFinish}`, '',
    'Project details:', valid.projectDetails,
  ].join('\n'));
  assert.ok(!JSON.stringify(body).includes(apiKey));
  assert.ok(!JSON.stringify(body).includes(turnstileSecret));
});

test('legacy JSON form names still map into the canonical record', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({
    fullName: valid.name, phone: valid.phone, email: valid.email, city: valid.city,
    serviceType: valid.services, propertyScope: valid.propertyType, preferredFinish: valid.selectedFinish,
    projectDetails: valid.projectDetails, 'cf-turnstile-response': turnstileToken,
  }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  for (const field of ['name', 'phone', 'email', 'city', 'propertyType', 'selectedFinish', 'projectDetails'] as const) {
    assert.ok(record.text.includes(valid[field]));
  }
  assert.ok(record.text.includes(`Services: ${valid.services}`));
  assert.equal(record.fullName, undefined);
  assert.equal(record.propertyScope, undefined);
});

test('canonical names take precedence over legacy aliases', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({
    ...valid, fullName: 'Old name', serviceType: 'Pressure Washing', propertyScope: 'Old property', preferredFinish: 'Old finish',
  }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  assert.ok(record.text.includes(`Name: ${valid.name}`));
  assert.ok(record.text.includes(`Services: ${valid.services}`));
  assert.ok(record.text.includes(`Property: ${valid.propertyType}`));
  assert.ok(record.text.includes(`Finish: ${valid.selectedFinish}`));
});

test('multipart form fields preserve multiple canonical services', async (t) => {
  const delivery = mockDelivery(t);
  const form = new FormData();
  for (const [key, value] of Object.entries(valid)) form.append(key, value);
  form.append('services', 'Fence & Deck Staining');
  const { response } = await invoke(new Request('https://website.example.invalid/api/quote', { method: 'POST', body: form }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  assert.ok(record.text.includes(`Services: ${valid.services}, Fence & Deck Staining`));
  assert.ok(record.text.includes(`Name: ${valid.name}`));
  assert.ok(record.text.includes(`Property: ${valid.propertyType}`));
});

test('URL-encoded legacy form fields remain compatible', async (t) => {
  const delivery = mockDelivery(t);
  const form = new URLSearchParams({
    fullName: valid.name, phone: valid.phone, city: valid.city, serviceType: valid.services,
    propertyScope: valid.propertyType, preferredFinish: valid.selectedFinish,
    'cf-turnstile-response': turnstileToken,
  });
  const { response } = await invoke(new Request('https://website.example.invalid/api/quote', { method: 'POST', body: form }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  assert.ok(record.text.includes(`Name: ${valid.name}`));
  assert.ok(record.text.includes(`Services: ${valid.services}`));
  assert.ok(record.text.includes(`Finish: ${valid.selectedFinish}`));
});

for (const service of ['Pressure Washing', 'Popcorn Ceiling Removal & Re-Texturing']) {
  test(`${service} discards stale finish preferences`, async (t) => {
    const delivery = mockDelivery(t);
    const { response } = await invoke(jsonRequest({ ...valid, services: service }));
    assert.equal(response.status, 200);
    const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
    assert.ok(record.text.includes(`Services: ${service}`));
    assert.ok(record.text.includes('Finish: Not applicable'));
  });
}

test('optional details have neutral defaults, not a forced coating or property', async (t) => {
  const delivery = mockDelivery(t);
  const { response } = await invoke(jsonRequest({
    name: valid.name, phone: valid.phone, city: valid.city, services: valid.services,
    'cf-turnstile-response': turnstileToken,
  }));
  assert.equal(response.status, 200);
  const record = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  assert.equal(record.reply_to, undefined);
  assert.ok(record.text.includes('Email: Not provided'));
  assert.ok(record.text.includes('Property: Not specified'));
  assert.ok(record.text.includes('Finish: Not specified'));
  assert.ok(record.text.includes('Size: Not specified'));
  assert.ok(record.text.includes('Timeline: Not specified'));
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

test('missing Resend key never claims successful receipt and includes a usable text fallback', async (t) => {
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

test('missing Turnstile secret returns 503 with text fallback and calls no upstream', async (t) => {
  const delivery = mockDelivery(t);
  const { response, body } = await invoke(jsonRequest(valid), { RESEND_API_KEY: apiKey });
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.match(body.error, /has not been sent/);
  assert.match(body.smsLink, /^sms:\+12094855103\?&body=/);
  assert.equal(delivery.mock.callCount(), 0);
});

for (const [label, tokenValue] of [
  ['missing token', undefined],
  ['empty token', '   '],
  ['oversized token', 'x'.repeat(2049)],
] as const) {
  test(`Turnstile ${label} returns 400 before contacting Cloudflare or Resend`, async (t) => {
    const delivery = mockDelivery(t);
    const payload: Record<string, unknown> = { ...valid };
    if (tokenValue === undefined) delete payload['cf-turnstile-response'];
    else payload['cf-turnstile-response'] = tokenValue;
    const { response, body } = await invoke(jsonRequest(payload));
    assert.equal(response.status, 400);
    assert.equal(body.ok, false);
    assert.match(body.error, /security verification/i);
    assert.match(body.smsLink, /^sms:\+12094855103\?&body=/);
    assert.equal(delivery.mock.callCount(), 0);
  });
}

test('failed Turnstile verification returns 403 and never calls Resend', async (t) => {
  const delivery = mockDelivery(
    t,
    async () => Response.json({ id: 'should-not-be-called' }),
    async () => Response.json({ success: false, 'error-codes': ['timeout-or-duplicate'] }),
  );
  const { response, body } = await invoke(jsonRequest(valid));
  assert.equal(response.status, 403);
  assert.equal(body.ok, false);
  assert.match(body.error, /verification failed or expired/i);
  assert.match(body.smsLink, /^sms:\+12094855103\?&body=/);
  assert.equal(callsFor(delivery, TURNSTILE_URL).length, 1);
  assert.equal(callsFor(delivery, RESEND_URL).length, 0);
});

for (const [label, verifyBody] of [
  ['wrong action', { success: true, action: 'other_form', hostname: 'www.aacpaintersinc.com' }],
  ['missing action', { success: true, hostname: 'www.aacpaintersinc.com' }],
  ['disallowed hostname', { success: true, action: 'quote_estimate', hostname: 'evil.example' }],
  ['localhost hostname in production', { success: true, action: 'quote_estimate', hostname: 'localhost' }],
] as const) {
  test(`Turnstile ${label} returns 403 and never calls Resend`, async (t) => {
    const delivery = mockDelivery(
      t,
      async () => Response.json({ id: 'should-not-be-called' }),
      async () => Response.json(verifyBody),
    );
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 403);
    assert.equal(body.ok, false);
    assert.equal(callsFor(delivery, TURNSTILE_URL).length, 1);
    assert.equal(callsFor(delivery, RESEND_URL).length, 0);
  });
}

for (const [label, turnstileStub] of [
  ['HTTP 500', async () => new Response('Server error', { status: 500 })],
  ['malformed JSON', async () => new Response('not-json')],
  ['missing success boolean', async () => Response.json({ ok: true })],
  ['network error', async () => { throw new Error('Network failure'); }],
] as [string, Delivery][]) {
  test(`Turnstile ${label} returns 502 with SMS fallback and never calls Resend`, async (t) => {
    const delivery = mockDelivery(t, async () => Response.json({ id: 'should-not-be-called' }), turnstileStub);
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /could not verify your request/i);
    assert.match(body.smsLink, /^sms:\+12094855103\?&body=/);
    assert.equal(callsFor(delivery, TURNSTILE_URL).length, 1);
    assert.equal(callsFor(delivery, RESEND_URL).length, 0);
  });
}

for (const status of [400, 401, 403, 429, 500]) {
  test(`Resend HTTP ${status} is not reported as success`, async (t) => {
    const delivery = mockDelivery(t, async () => new Response('Not accepted', { status }));
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /could not confirm delivery/);
    assert.match(body.smsLink, /^sms:\+12094855103/);
    assert.equal(callsFor(delivery, RESEND_URL).length, 1);
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
    assert.equal(callsFor(delivery, RESEND_URL).length, 1, 'No silent retry that could duplicate a delivered request.');
  });
}

for (const receipt of [{}, { id: '' }, { id: 42 }, { error: 'Rejected' }, null]) {
  test(`Resend success without a valid email ID is rejected: ${JSON.stringify(receipt)}`, async (t) => {
    mockDelivery(t, async () => Response.json(receipt));
    const { response, body } = await invoke(jsonRequest(valid));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.quoteId, undefined);
  });
}

test('invalid JSON from Resend is not reported as success', async (t) => {
  mockDelivery(t, async () => new Response('invalid JSON'));
  const { response } = await invoke(jsonRequest(valid));
  assert.equal(response.status, 502);
});

test('visitor fields cannot override email routing and project markup stays plain text', async (t) => {
  const delivery = mockDelivery(t);
  const projectDetails = '<script>alert("test")</script>\nSecond line & details';
  const { response } = await invoke(jsonRequest({
    ...valid, projectDetails, from: 'attacker@example.invalid', to: 'attacker@example.invalid',
    reply_to: 'attacker@example.invalid', subject: 'Injected subject',
  }));
  assert.equal(response.status, 200);
  const message = JSON.parse(String(callsFor(delivery, RESEND_URL)[0].arguments[1]?.body));
  assert.equal(message.from, 'AAC Painters Website <submission@aacpaintersinc.com>');
  assert.deepEqual(message.to, ['aacpaintersinc@gmail.com']);
  assert.equal(message.reply_to, valid.email);
  assert.ok(message.text.endsWith(projectDetails));
  assert.equal(message.html, undefined);
  assert.match(message.subject, /^New estimate request — AAC-/);
});

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
  assert.equal(getQuoteService('Grind & Seal Concrete'), undefined);
  assert.equal(getQuoteService('Stairwell & Railing Painting')?.finishType, 'paint');
  assert.equal(getQuoteService('Pool Deck & Patio Coatings'), undefined);
  assert.equal(getQuoteService('Metallic Epoxy'), undefined);
  assert.equal(getQuoteService('Not a service'), undefined);
});

test('phone validation accepts US formatting and rejects invalid digit lengths and letters', () => {
  for (const number of ['2095550100', '(209) 555-0100', '+1 (209) 555-0100', '1.209.555.0100']) assert.equal(isValidPhone(number), true, number);
  for (const number of ['', '209555010', '20955501000', '+44 2095550100', '209555ABCD']) assert.equal(isValidPhone(number), false, number);
});
