import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.aacpaintersinc.com',
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
