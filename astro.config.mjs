import { copyFile } from 'node:fs/promises';
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
    {
      name: 'sitemap-alias',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await copyFile(
            new URL('sitemap-index.xml', dir),
            new URL('sitemap.xml', dir),
          );
        },
      },
    },
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
