# Lahore Fort visitor guide

Independent nonprofit visitor information in Urdu and English. This project is not the fort operator, WCLA or UNESCO. The canonical domain is https://lahorefort.org; the existing www entrance redirects to it.

The site uses static Astro pages, Tailwind CSS and a native Cloudflare Worker. Structured guide content lives in `src/data/guides.json`. Urdu guides answer independent visitor, monument and surrounding-site questions; English counterparts are published where provided. Each guide lists sources and a check date. A check date records when a source was read, not the source’s own update date.

Use the exact package-manager version in package.json. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`, `pnpm audit:source` and `pnpm audit:compliance`. The frozen native-build permission is limited to the locked esbuild version. Deployment uses the default Wrangler configuration and the existing project `lahorefort`; `npx wrangler deploy --dry-run` checks that entry.

The Worker handles canonical host/protocol redirects before assets, localized real 404 responses and the existing `/api/weather` refresh. Weather uses fixed fort coordinates, finite validated seven-day data, a bounded deadline and a ten-minute validated cache. Static pages may contain a dated build snapshot; failure is shown honestly and does not establish access or safety.

Analytics is opt-in through the existing cookie-settings pages. Runtime withdrawal, verified persistence, failure feedback and a single loader are handled by `public/analytics.js`. The separate hosting performance-beacon scope is disclosed in the privacy pages. The service worker caches same-origin resources and visited pages, excluding the weather API.

Five original photographs are retained. Public author, source and individual licence details are available at `/CREDITS.txt`. Reuse must follow each image’s own terms.
