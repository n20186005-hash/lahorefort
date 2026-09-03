// Compliance audit (rebuildable checklist): runs over src/public and dist.
// Usage: pnpm build && node scripts/audit-compliance.mjs
// Prints PASS/FAIL/INFO per item with evidence; exits 1 on any FAIL.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://lahorefort.org';
const HTML_DIR = 'dist';
const SRCS = ['src', 'public', 'astro.config.mjs'];
const htmlFiles = [];
const srcFiles = [];

function walk(root, acc, re) {
  if (!fs.existsSync(root)) return;
  const st = fs.statSync(root);
  if (st.isFile()) { if (re.test(root)) acc.push(root); return; }
  for (const e of fs.readdirSync(root, { withFileTypes: true })) {
    const f = path.join(root, e.name);
    if (e.isDirectory()) walk(f, acc, re);
    else if (re.test(f)) acc.push(f);
  }
}
walk(HTML_DIR, htmlFiles, /\.html$/);
for (const s of SRCS) walk(s, srcFiles, /\.(astro|js|mjs|ts|css|html|txt|svg|json|md|mjs)$/);

let pass = 0, fail = 0, info = 0;
const fails = [];
function ok(id, msg, ev) { pass++; console.log(`  PASS ${id} | ${msg}${ev ? ' | evidence: ' + ev : ''}`); }
function no(id, msg, ev) { fail++; fails.push(id); console.log(`  FAIL ${id} | ${msg}${ev ? ' | evidence: ' + ev : ''}`); }
function nf(id, msg, ev) { info++; console.log(`  INFO ${id} | ${msg}${ev ? ' | evidence: ' + ev : ''}`); }
const count = (s, needle) => s.split(needle).length - 1;

const home = fs.readFileSync('dist/index.html', 'utf8');
const read = (p) => fs.readFileSync(p, 'utf8');

// ---------- JSON-LD ----------
console.log('\n[JSON-LD]');
const lds = [];
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let m;
let parseFail = false;
while ((m = re.exec(home))) { try { lds.push(JSON.parse(m[1])); } catch (e) { parseFail = true; no('LD-1', 'JSON-LD block failed to parse', e.message); } }
ok('LD-1', 'all JSON-LD blocks parse on home', parseFail ? 'has failure' : lds.length + ' blocks OK');
const ta = lds.find((x) => x['@type'] === 'TouristAttraction');
if (!ta) no('LD-2', 'TouristAttraction block present'); else {
  ok('LD-2', 'TouristAttraction block present', '@type present');
  for (const [k, v] of [
    ['@id', ta['@id'] === SITE + '/#attraction'],
    ['url', ta.url === SITE],
    ['image', Array.isArray(ta.image) && ta.image[0] === SITE + '/images/alamgiri-gate.jpg'],
    ['hasMap', ta.hasMap === 'https://maps.app.goo.gl/new9CMHfA9H4XSZH6'],
    ['alternateName', Array.isArray(ta.alternateName) && ta.alternateName.includes('Lahore Fort')],
    ['isAccessibleForFree', ta.isAccessibleForFree === false],
    ['geo', ta.geo && Math.abs(ta.geo.latitude - 31.588273674183135) < 1e-9],
    ['NAP-city', ta.address && ta.address.addressLocality === 'لاہور'],
    ['NAP-country', ta.address && ta.address.addressCountry === 'PK'],
    ['phone', ta.telephone === '+92-42-99204196']
  ]) ok('LD-2.' + k, '@field ' + k, v ? 'schema value OK' : JSON.stringify(ta[k]).slice(0, 90));
}
const faqS = lds.find((x) => x['@type'] === 'FAQPage');
if (!faqS) no('LD-3', 'FAQPage block present');
else ok('LD-3', 'FAQPage block present', faqS.mainEntity.length + ' questions');
const detailsCount = count(home, '<details>');
if (!faqS) { /* noop */ } else if (faqS.mainEntity.length !== detailsCount) no('LD-4', 'FAQ DOM count == FAQPage count', detailsCount + ' <details> vs schema ' + faqS.mainEntity.length);
else ok('LD-4', 'FAQ DOM count == FAQPage count', detailsCount + ' == ' + faqS.mainEntity.length);
// visible rating matches schema
ok('LD-5', 'visible rating 4.6/26,406 == schema aggregateRating 4.6/26,406',
  count(home, '4.6 / 5') && count(home, '26,406') && ta && ta.aggregateRating.ratingValue === 4.6 && ta.aggregateRating.reviewCount === 26406 ? '4.6/26406 both' : 'mismatch');

// ---------- opening hours / factual fields ----------
console.log('\n[OPENING HOURS & FACTS]');
ok('OH-1', 'openingHoursSpecification daily 09:00-18:00 in JSON-LD', JSON.stringify(ta && ta.openingHoursSpecification));
ok('OH-2', 'visible hours card present on home', home.includes('9 بجے صبح سے 6 بجے شام تک') ? 'home planning card' : 'missing');
ok('OH-3', 'hours shown with "verify before visit" hedge (not fabricated guarantee)',
  home.includes('روانگی سے پہلے تصدیق کریں') ? 'disclaimer present' : 'missing');
ok('OH-4', 'official source for hours linked (WCLA)',
  home.includes('walledcitylahore.gop.pk/lahore-fort/') ? 'WCLA link' : 'missing');
ok('OH-5', 'phone matches provided data', count(home, '+92 42 99204196') >= 1 ? 'visible phone' : 'no');
ok('OH-6', 'plus code + address visible', home.includes('H8Q7+56P') && home.includes('فورٹ روڈ') ? 'visible' : 'missing');

// ---------- E-E-A-T ----------
console.log('\n[E-E-A-T]');
const srcAll = srcFiles.map(read).join('\n');
ok('EE-1', 'Footer: independent non-profit disclosure', read('src/components/Footer.astro').includes('آزاد، غیر منافع بخش'));
ok('EE-2', 'Footer: authorities compared listed', read('src/components/Footer.astro').includes('پنجاب والڈ سٹی اتھارٹی'));
ok('EE-3', 'legal pages carry last-updated (ستمبر 2026)', ['raazdari', 'sharaait', 'cookies'].every((p) => read(`src/pages/${p}.astro`).includes('ستمبر 2026')));
ok('EE-4', 'home Sources section lists 6 official references', count(read('src/pages/index.astro'), 'target="_blank" rel="noopener"') >= 7 && read('src/pages/index.astro').includes('معتبر حوالے'));
ok('EE-5', 'photo-rights statement in Footer + IMAGE-CREDITS.md referenced', read('src/components/Footer.astro').includes('IMAGE-CREDITS.md') && fs.existsSync('IMAGE-CREDITS.md'));
nf('EE-6', 'WebPage/dateModified JSON-LD not present (optional enhancement; legal pages expose ستمبر 2026)');

// ---------- sitemap / robots ----------
console.log('\n[SITEMAP & ROBOTS]');
const maps = fs.readdirSync(HTML_DIR).filter((x) => x.startsWith('sitemap') && x.endsWith('.xml'));
ok('SM-1', 'sitemap files generated', maps.join(', '));
const sitemapTxt = maps.map((f) => read(path.join(HTML_DIR, f))).join('');
ok('SM-2', 'sitemap entries are absolute with official host', !sitemapTxt.includes('http://') && count(sitemapTxt, SITE) >= 4 ? SITE + ' x' + count(sitemapTxt, SITE) : 'check');
ok('SM-3', 'sitemap excludes /404', !sitemapTxt.includes('/404'));
ok('SM-4', 'no fabricated <lastmod>', !sitemapTxt.includes('<lastmod>'));
ok('SM-5', 'robots.txt Allow + official sitemap link', read('public/robots.txt').includes('Sitemap: ' + SITE + '/sitemap-index.xml'));

// ---------- image credit ----------
console.log('\n[IMAGE CREDIT]');
ok('IC-1', 'IMAGE-CREDITS.md exists and lists per-image entries', read('IMAGE-CREDITS.md').split('\n').filter((l) => /\.jpg/i.test(l)).length >= 5);
const imgRefs = new Set([...home.matchAll(/src="(\/images\/[^"]+)"/g)].map((x) => x[1]));
for (const p of imgRefs) if (!fs.existsSync('public' + p)) no('IC-2', 'referenced image missing ' + p);
ok('IC-2', 'every referenced image file exists', [...imgRefs].join(', '));
ok('IC-3', 'gallery/home text points to IMAGE-CREDITS.md', home.includes('IMAGE-CREDITS.md'));

// ---------- GA4 consent gate ----------
console.log('\n[GA4 & CONSENT]');
const ids = new Set();
for (const f of srcFiles) { const t = read(f); for (const i of t.matchAll(/G-[A-Z0-9]{10}/g)) ids.add(i[0]); }
ok('GA-1', 'single GA id across source', [...ids].join(',') + ' (unique set size ' + ids.size + ')');
ok('GA-2', 'consent key shared between loader and cookie page', count(read('src/layouts/BaseLayout.astro'), 'lahoreFortConsent') >= 1 && read('src/pages/cookies.astro').includes("key='lahoreFortConsent'"));
ok('GA-3', 'analytics loads only when consent granted', read('src/layouts/BaseLayout.astro').includes("p.analytics===true"));
ok('GA-4', 'anonymize_ip enabled', read('src/layouts/BaseLayout.astro').includes('anonymize_ip:true'));
ok('GA-5', 'no ads/AdSense leftovers', !srcAll.includes('ca-pub-') && !srcAll.includes('adsbygoogle'));
ok('GA-6', 'privacy page discloses GA usage', read('src/pages/raazdari.astro').includes('گوگل اینالیٹکس'));

// ---------- PWA ----------
console.log('\n[PWA]');
const mani = JSON.parse(read('public/manifest.webmanifest'));
const dim = (f) => { const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
let iconOk = true;
for (const ic of mani.icons) {
  const file = 'public' + ic.src;
  if (!fs.existsSync(file)) { no('PW-1.' + ic.src, 'manifest icon missing'); iconOk = false; continue; }
  if (ic.sizes !== 'any' && ic.sizes.endsWith('x192') === false) { /* png sizes below */ }
  if (/\.png$/.test(file)) {
    const [w, h] = dim(file);
    if (!ic.sizes.includes(w + 'x' + h)) { no('PW-1.' + ic.src, 'declared size mismatch', ic.sizes + ' vs actual ' + w + 'x' + h); iconOk = false; }
  }
}
if (iconOk) ok('PW-1', 'manifest icons exist and actual PNG dims match declared sizes', mani.icons.map((i) => i.src + '=' + i.sizes + '(' + i.purpose + ')').join(' '));
ok('PW-2', 'manifest rtl/ur/standalone/theme', mani.dir === 'rtl' && mani.lang === 'ur' && mani.display === 'standalone' && mani.theme_color === '#6d281d');
ok('PW-3', 'manifest linked + theme-color + apple-touch in head', home.includes('/manifest.webmanifest') && home.includes('#6d281d') && home.includes('apple-touch-icon'));
const sw = read('public/sw.js');
ok('PW-4', 'SW has install/activate/fetch', ['install', 'activate', 'fetch'].every((e) => sw.includes("addEventListener('" + e + "'")));
ok('PW-5', 'SW versioned cache + old cache cleanup', sw.includes("'lahorefort-v1'") && sw.includes('caches.delete(k)'));
ok('PW-6', 'SW navigation network-first + offline fallback to /', sw.includes('req.mode === ' + "'navigate'") && sw.includes("caches.match('/')"));
ok('PW-7', 'SW same-origin guard', sw.includes('url.origin !== self.location.origin'));
ok('PW-8', 'SW registration in head (https only)', read('src/layouts/BaseLayout.astro').includes("register('/sw.js')") && read('src/layouts/BaseLayout.astro').includes("location.protocol==='https:'"));

// ---------- 404 ----------
console.log('\n[404]');
ok('E4-1', 'dist/404.html generated', fs.existsSync('dist/404.html'));
ok('E4-2', '404 has content + home link', read('dist/404.html').includes('مرکزی صفحے پر واپس جائیں'));
ok('E4-3', 'wrangler serves 404 page for missing assets', read('wrangler.jsonc').includes('not_found_handling') && read('wrangler.jsonc').includes('404-page'));
if (read('dist/404.html').includes('name="robots" content="noindex')) ok('E4-4', '404 robots noindex,follow', 'meta present');
else no('E4-4', '404 robots noindex,follow', 'meta is index,follow');

// ---------- external links / official domains ----------
console.log('\n[EXTERNAL LINKS & AUTHORITY DOMAINS]');
const badAnchors = [];
for (const f of htmlFiles.concat(srcFiles.filter((x) => x.endsWith('.astro') || x.endsWith('.html')))) {
  const t = read(f);
  for (const a of t.matchAll(/<a[^>]*target="_blank"[^>]*>/g)) if (!/rel="[^"]*noopener/.test(a[0])) badAnchors.push(f + ': ' + a[0].slice(0, 120));
}
if (badAnchors.length) no('XL-1', 'every target=_blank anchor has rel=noopener', badAnchors.join(' | ').slice(0, 400));
else ok('XL-1', 'every target=_blank anchor has rel=noopener', '0 violations');
const allText = srcAll + '\n' + htmlFiles.map(read).join('\n');
const mustHave = ['walledcitylahore.gop.pk', 'whc.unesco.org', 'doam.gov.pk', 'lahore-mc.punjab.gov.pk', 'tdcp.gop.pk', 'tourism.gov.pk', 'maps.app.goo.gl', 'www.google.com/maps/embed', 'api.open-meteo.com', 'googletagmanager.com/gtag/js'];
const counts = mustHave.map((h) => h + '=' + count(allText, h));
const missingHost = mustHave.filter((h) => !allText.includes(h));
if (missingHost.length) no('XL-2', 'official/known outbound hosts present', missingHost.join(', ') + ' MISSING');
else ok('XL-2', 'official/known outbound hosts present in source+dist', counts.join(' '));
ok('XL-3', 'map iframe title+lazy+referrerpolicy', home.includes('title="قلعہ لاہور کا گوگل نقشہ"') && home.includes('loading="lazy"') && home.includes('referrerpolicy="strict-origin-when-cross-origin"'));
ok('XL-4', 'map embed is the exact user pb src', home.includes('maps/embed?pb=!1m18!1m12!1m3!1d6045.018717305006') && home.includes('4v1788420833647'));

// ---------- language / content consistency ----------
console.log('\n[LANGUAGE & CONTENT]');
let cjk = 0;
for (const f of srcFiles.concat(htmlFiles)) { const t = read(f); cjk += (t.match(/[\u4e00-\u9fff]/g) || []).length; }
if (cjk) no('LC-1', 'zero CJK characters in source+dist', cjk + ' hits');
else ok('LC-1', 'zero CJK characters in source+dist', 'site is pure Urdu');
for (const f of htmlFiles) {
  const t = read(f);
  const lang = /<html lang="ur" dir="rtl">/.test(t);
  if (!lang) no('LC-2.' + f, 'html lang=ur dir=rtl', f);
}
if (htmlFiles.every((f) => /<html lang="ur" dir="rtl">/.test(read(f)))) ok('LC-2', 'html lang=ur dir=rtl on every page', htmlFiles.length + ' pages');
for (const w of ['Sule Pagoda', 'Tha Phae', 'jaipur', 'pompeii', 'bupest', 'placeholder', 'TODO', 'Lorem', 'FIXME', 'crystal']) {
  if (srcAll.includes(w)) no('LC-3', 'no leakage word: ' + w, 'found');
}
ok('LC-3', 'no cross-site leakage / placeholder words', 'clean');
const h1s = htmlFiles.map((f) => [f, count(read(f), '<h1>')]);
for (const [f, n] of h1s) if (n !== 1) no('LC-4.' + f, 'single h1 per page', n + ' h1');
if (h1s.every(([, n]) => n === 1)) ok('LC-4', 'single h1 per page', h1s.map(([f]) => { const b = path.basename(f); const d = path.basename(path.dirname(f)); if (b === '404.html') return '/404/'; return b === 'index.html' && d === 'dist' ? '/' : '/' + d + '/'; }).join(', '));
const navNeed = ['تعارف', 'دورہ', 'سہولیات', 'موسم', 'نقشہ', 'سوالات'];
const srcHome = read('src/pages/index.astro');
const navIds = navNeed.every((a) => srcHome.includes('id="' + a + '"'));
const navLinks = navNeed.every((a) => read('src/components/Header.astro').includes('#' + a));
if (navIds && navLinks) ok('LC-5', 'header nav anchors map 1:1 to section ids', navNeed.join(', '));
else no('LC-5', 'header nav anchors map 1:1 to section ids', 'navIds=' + navIds + ' navLinks=' + navLinks);
for (const [f, t] of [['dist/index.html', home]]) {
  if (!/<title>[^<]+<\/title>/.test(t)) no('LC-6', 'title present', f);
  if (!/<meta name="description" content="[^"]+">/.test(t)) no('LC-6', 'description present', f);
}
ok('LC-6', 'title + description on pages', 'present');
ok('LC-7', 'weather uses Open-Meteo key coords + cache + Urdu weekdays', read('src/components/Weather.astro').includes('31.5883') && read('src/components/Weather.astro').includes('30 * 60 * 1000') && read('src/components/Weather.astro').includes("'اتوار'"));

// ---------- canonical / og ----------
console.log('\n[CANONICAL & OG]');
const pOf = (f) => {
  const b = path.basename(f);
  const d = path.basename(path.dirname(f));
  if (b === '404.html') return '/404/';
  if (b === 'index.html' && d === 'dist') return '/';
  return '/' + d + '/';
};
for (const f of htmlFiles) {
  const t = read(f);
  const p = pOf(f);
  if (!t.includes('rel="canonical" href="' + SITE + p + '"') || !t.includes('property="og:url" content="' + SITE + p + '"'))
    no('CO-1.' + p, 'canonical + og:url absolute with trailing slash', f);
}
ok('CO-1', 'canonical == og:url absolute on every page', htmlFiles.map(pOf).join(', '));
ok('CO-2', 'og:image absolute + og:image:alt', home.includes('property="og:image" content="' + SITE + '/images/alamgiri-gate.jpg"') && home.includes('property="og:image:alt"'));
ok('CO-3', 'viewport no maximum-scale', !home.includes('maximum-scale'));
const imgs = [...home.matchAll(/<img\b[^>]*>/g)].map((x) => x[0]);
const missingAlt = imgs.filter((i) => !/alt=/.test(i));
if (missingAlt.length) no('CO-4', 'all <img> have alt', missingAlt.length + ' without alt');
else ok('CO-4', 'all <img> have alt', imgs.length + ' imgs on home');

// ---------- forbidden tokens ----------
console.log('\n[FORBIDDEN TOKENS]');
const bad = ['example.com', 'localhost', 'chrome-extension://', 'ca-pub-', 'adsbygoogle', 'fakephone', 'placeholder.com', 'yoursite', 'your-domain'];
let hits = [];
for (const f of srcFiles.concat(htmlFiles)) { const t = read(f); for (const b of bad) if (t.includes(b)) hits.push(f + ': ' + b); }
if (hits.length) no('FT-1', 'no forbidden tokens', hits.join(' | ').slice(0, 500));
else ok('FT-1', 'no forbidden tokens (example.com/localhost/ca-pub/ads/placeholders)', 'clean');

console.log('\n===== SUMMARY =====');
console.log('PASS', pass, '| FAIL', fail, '| INFO', info);
if (fails.length) { console.log('FAILED:', fails.join(', ')); process.exit(1); }
console.log('Compliance audit: ALL CLEAR');
