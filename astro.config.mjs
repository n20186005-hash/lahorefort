import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical domain: https://lahorefort.org. SITE_URL may override (CI/staging), falling back to the canonical domain.
const configuredSite = (process.env.SITE_URL ?? 'https://lahorefort.org').trim();
const site = configuredSite || 'https://lahorefort.org';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap({filter: page => !/\/(?:404|cookies|raazdari|sharaait)(?:\/|\.html|$)/.test(page)})],
  vite: { plugins: [tailwindcss()] }
});
