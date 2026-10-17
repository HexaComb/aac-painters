import type { APIRoute } from 'astro';

export const prerender = false;

interface QuotePayload {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  propertyType?: string;
  services?: string[] | string;
  squareFootage?: string;
  timeline?: string;
  selectedFinish?: string;
  projectDetails?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: QuotePayload = {};

    if (contentType.includes('application/json')) {
      data = (await request.json()) as QuotePayload;
    } else {
      const formData = await request.formData();
      data = {
        name: String(formData.get('name') || ''),
        phone: String(formData.get('phone') || ''),
        email: String(formData.get('email') || ''),
        city: String(formData.get('city') || ''),
        propertyType: String(formData.get('propertyType') || 'Residential'),
        services: formData.getAll('services').map(String),
        squareFootage: String(formData.get('squareFootage') || ''),
        timeline: String(formData.get('timeline') || ''),
        selectedFinish: String(formData.get('selectedFinish') || ''),
        projectDetails: String(formData.get('projectDetails') || ''),
      };
    }

    const name = (data.name || '').trim();
    const phone = (data.phone || '').trim();
    const email = (data.email || '').trim();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Please provide both your name and phone number so Alex can reach you.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const servicesList = Array.isArray(data.services)
      ? data.services
      : data.services
      ? [data.services]
      : ['General Painting / Epoxy Consultation'];

    const quoteId = `AAC-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const submittedAt = new Date().toISOString();

    const quoteRecord = {
      quoteId,
      submittedAt,
      name,
      phone,
      email,
      city: (data.city || 'Central Valley (209)').trim(),
      propertyType: data.propertyType || 'Residential',
      services: servicesList,
      squareFootage: data.squareFootage || 'Not specified',
      timeline: data.timeline || 'Flexible',
      selectedFinish: data.selectedFinish || 'Custom Consultation',
      projectDetails: (data.projectDetails || '').trim(),
    };

    // Optional webhook forwarding if configured in Cloudflare Workers environment variables
    const runtimeEnv = (locals as Record<string, any>)?.runtime?.env || {};
    const webhookUrl = runtimeEnv.QUOTE_WEBHOOK_URL;
    if (webhookUrl && typeof webhookUrl === 'string') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quoteRecord),
        });
      } catch {
        // Non-blocking if external webhook fails
      }
    }

    const smsBody = encodeURIComponent(
      `Hi Alex! I just requested quote #${quoteId} on AACPaintersInc.com.\n` +
        `Name: ${quoteRecord.name}\n` +
        `Type: ${quoteRecord.propertyType} (${quoteRecord.city})\n` +
        `Services: ${quoteRecord.services.join(', ')}\n` +
        (quoteRecord.selectedFinish && quoteRecord.selectedFinish !== 'Custom Consultation'
          ? `Selected System: ${quoteRecord.selectedFinish}\n`
          : '') +
        (quoteRecord.squareFootage ? `Est. Size: ${quoteRecord.squareFootage}\n` : '') +
        (quoteRecord.projectDetails ? `Details: ${quoteRecord.projectDetails}` : '')
    );

    return new Response(
      JSON.stringify({
        ok: true,
        quoteId,
        submittedAt,
        message: `Thanks ${name}! Your quote request (${quoteId}) has been logged for Alex Delgadillo & the AAC Painters Inc. team.`,
        smsLink: `sms:+12094855103?&body=${smsBody}`,
        quote: quoteRecord,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Unable to process your quote request right now. Please call or text (209) 485-5103 directly.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
