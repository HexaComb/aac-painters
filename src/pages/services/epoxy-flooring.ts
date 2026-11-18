import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = () => new Response('This service is no longer offered. Visit https://www.aacpaintersinc.com/ for painting services.', {status: 410, headers: {'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex'}});
