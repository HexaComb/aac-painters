import type { APIRoute } from 'astro';
import { getQuoteService, isValidPhone } from '../../data/quoteOptions.ts';

export const prerender = false;

const fallback = 'Please call or text (209) 485-5103 directly.';
const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});
const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export const POST: APIRoute = async ({ request, locals }) => {
  let data: Record<string, unknown>;
  try {
    if (request.headers.get('content-type')?.includes('application/json')) {
      const body: unknown = await request.json();
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
      data = body as Record<string, unknown>;
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
      if (form.has('services')) data.services = form.getAll('services');
    }
  } catch {
    return json({ ok: false, error: `Unable to read your request. ${fallback}` }, 400);
  }

  // Accept the former form names as well, so already-open pages remain usable.
  const name = text(data.name ?? data.fullName);
  const phone = text(data.phone);
  const email = text(data.email);
  const city = text(data.city);
  const rawServices = data.services ?? data.serviceType;
  const services = (Array.isArray(rawServices) ? rawServices : [rawServices]).map(text).filter(Boolean);
  const propertyType = text(data.propertyType ?? data.propertyScope);
  const selectedFinish = text(data.selectedFinish ?? data.preferredFinish);
  const projectDetails = text(data.projectDetails);

  if (text(data.companyWebsite)) return json({ ok: false, error: 'Unable to process this request.' }, 400);
  if (name.length < 2 || name.length > 120 || !isValidPhone(phone) || phone.length > 30) {
    return json({ ok: false, error: 'Please provide your name and a valid 10-digit phone number.' }, 400);
  }
  if (city.length < 2 || city.length > 120 || services.length === 0 || services.some((service) => !getQuoteService(service))) {
    return json({ ok: false, error: 'Please provide the project city and select a service.' }, 400);
  }
  if ((email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || email.length > 254) {
    return json({ ok: false, error: 'Please provide a valid email address, or leave it blank.' }, 400);
  }
  if (propertyType.length > 200 || selectedFinish.length > 200 || projectDetails.length > 5000) {
    return json({ ok: false, error: 'Please shorten the project details and try again.' }, 400);
  }

  const quoteId = `AAC-${crypto.randomUUID()}`;
  const submittedAt = new Date().toISOString();
  const quoteRecord = {
    quoteId, submittedAt, name, phone, email, city, services,
    propertyType: propertyType || 'Not specified',
    squareFootage: text(data.squareFootage).slice(0, 100) || 'Not specified',
    timeline: text(data.timeline).slice(0, 200) || 'Not specified',
    // Cleaning and ceiling removal should not carry a stale coating selection.
    selectedFinish: services.every((service) => getQuoteService(service)?.finishType === 'none')
      ? 'Not applicable' : selectedFinish || 'Not specified',
    projectDetails,
  };
  const smsBody = encodeURIComponent(
    `Hi AAC Painters, I'd like an estimate.\nName: ${name}\nPhone: ${phone}\nCity: ${city}\n` +
    `Services: ${services.join(', ')}\nProperty: ${quoteRecord.propertyType}\n` +
    (email ? `Email: ${email}\n` : '') +
    `Finish: ${quoteRecord.selectedFinish}\nSize: ${quoteRecord.squareFootage}\nTimeline: ${quoteRecord.timeline}\n` +
    (projectDetails ? `Details: ${projectDetails}` : '')
  );
  const smsLink = `sms:+12094855103?&body=${smsBody}`;
  const runtime = (locals as { runtime?: { env?: { QUOTE_WEBHOOK_URL?: string } } }).runtime;
  const webhookUrl = runtime?.env?.QUOTE_WEBHOOK_URL;

  // There is no database here: only acknowledge receipt after the configured
  // destination accepts the request. Never silently discard an estimate lead.
  if (!webhookUrl) {
    return json({ ok: false, error: `Online requests are not available right now. Your request has not been sent. ${fallback}`, smsLink }, 503);
  }
  try {
    const delivery = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteRecord),
      signal: AbortSignal.timeout(10_000),
    });
    if (!delivery.ok) throw new Error('Delivery not accepted');
  } catch {
    return json({ ok: false, error: `We could not confirm delivery of your request. ${fallback}`, smsLink }, 502);
  }

  return json({ ok: true, quoteId, submittedAt, message: 'Your estimate request has been sent to the AAC Painters team.' });
};
