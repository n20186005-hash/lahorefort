import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Official domain: https://lahorefort.org. SITE_URL may override (CI/staging), falling back to the official domain.
const configuredSite = (process.env.SITE_URL ?? 'https://lahorefort.org').trim();
const site = configuredSite || 'https://lahorefort.org';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] }
});
