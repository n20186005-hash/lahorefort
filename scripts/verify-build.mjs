import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
if (!fs.existsSync(dist)) throw new Error('dist not found');

const bad = ['example.com', 'localhost', 'chrome-extension://'];
const hits = [];
function walk(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const f = path.join(p, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.(html|xml|js|css|txt)$/.test(f)) {
      const t = fs.readFileSync(f, 'utf8');
      for (const b of bad) if (t.includes(b)) hits.push(`${f}: ${b}`);
    }
  }
}
walk(dist);
if (hits.length) { console.error(hits.join('\n')); process.exit(1); }

// Sitemap is always generated now that astro.config ships the official domain default.
const maps = fs.readdirSync(dist).filter((x) => x.startsWith('sitemap') && x.endsWith('.xml'));
if (!maps.length) throw new Error('Sitemap missing (official domain default expected)');
for (const m of maps) {
  const t = fs.readFileSync(path.join(dist, m), 'utf8');
  if (t.includes('<lastmod>')) throw new Error('Fabricated lastmod found');
}

// Canonical/OG host inside built HTML must equal the sitemap host.
const firstMap = fs.readFileSync(path.join(dist, maps[0]), 'utf8');
const hostMatch = firstMap.match(/https:\/\/([^/]+)\//);
if (!hostMatch) throw new Error('Cannot derive sitemap host');
const host = hostMatch[1];
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!home.includes(`href="https://${host}/"`)) throw new Error(`Canonical host mismatch (${host})`);
if (!home.includes(`content="https://${host}/images/`)) throw new Error(`og:image host mismatch (${host})`);

// PWA essentials present.
for (const f of ['manifest.webmanifest', 'sw.js', 'icons/icon-192.png', 'icons/icon-512.png']) {
  if (!fs.existsSync(path.join(dist, f))) throw new Error(`PWA asset missing: ${f}`);
}

console.log('Build audit: clean');
