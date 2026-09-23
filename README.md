# قلعہ لاہور — اردو سیاحتی رہنما

Astro + Tailwind CSS + TypeScript پر مبنی RTL اردو سائٹ، Cloudflare Worker static assets deployment کے لیے تیار۔

## ڈومین اور تعیناتی
مستقل ڈومین `https://lahorefort.org` ہے (astro.config.mjs میں ڈیفالٹ؛ CI/پری پروڈکشن کے لیے اسے `SITE_URL` ماحول متغیر سے override کیا جا سکتا ہے)۔ `site` ہمیشہ متعین رہتا ہے، اس لیے sitemap، canonical اور absolute Open Graph URLs خودکار پیدا ہوتے ہیں۔

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy   # wrangler static assets
```

## PWA
- `public/manifest.webmanifest` + `public/sw.js` (navigation network-first، آف لائن میں کیچ شدہ ہوم پیج) + `public/icons/icon-192.png`/`icon-512.png`۔
- Service worker صرف HTTPS پر رجسٹر ہوتا ہے۔

## اہم راستے
- `/` مرکزی واحد صفحہ
- `/raazdari/` رازداری
- `/sharaait/` خدمت کی شرائط
- `/cookies/` کوکی ترتیبات

## تجزیات
GA4 شناسه `G-HXM22WWPKP` صرف صارف کی واضح تجزیاتی رضامندی کے بعد لوڈ ہوتی ہے۔

## تصاویر
ویب سائٹ `public/images/*.jpg` سے مقامی تصاویر پڑھتی ہے۔ تصویر کے ماخذ اور لائسنس `IMAGE-CREDITS.md` میں درج ہیں۔

## GSC / SEO نگرانی (Cloudflare Workers static assets)

GSC رپورٹ میں http/https اور www/non-www کے مختلف ورژن آتے ہیں (مثلاً `http://www.lahorefort.org/`، `https://www.lahorefort.org/`، `https://lahorefort.org/`)۔ ہم نے کینونیکل اور absolute OG URLs پہلے ہی سیٹ کیے ہیں (سب کا اشارہ apex `https://lahorefort.org/` کی طرف)، لیکن **ڈومین لیول 301 ری ڈائریکٹ کوڈ سے نہیں کیا جا سکتا** کیونکہ Workers static assets صرف پاتھ لیول ری ڈائریکٹ دیتا ہے۔ انہیں Cloudflare ڈیش بورڈ میں ترتیب دیں:

1. **Always Use HTTPS** — SSL/TLS → Edge Certificates سے آن کریں (http → https 301)۔
2. **Bulk Redirects / Redirect Rules** دو قاعدے بنائیں:
   - `http://www.lahorefort.org/*` → `https://lahorefort.org/*` (301)
   - `https://www.lahorefort.org/*` → `https://lahorefort.org/*` (301)
   اس سے وزن (PageRank) apex ورژن پر جمع ہو گا اور duplicated-URL کنفیوزن ختم ہو گی۔
3. `public/_headers` پہلے ہی HSTS (`Strict-Transport-Security`) اور سیکیورٹی ہیڈرز بھیجتا ہے۔

### Google Business Profile (Local SEO)
قلعہ لاہور کا Google Maps/سواری کی قیمت دان (Google listing) 4.6★ / 26,410 جائزے رکھتا ہے — یہ مضبوط اعتبار (E-E-A-T) ہے۔ Google Business Profile کی "ویب سائٹ" فیلڈ کو براہِ راست `https://lahorefort.org/` سے جوڑیں، اور فوٹر/نقشے کے سیکشن میں موجود Maps لِنک (`MAPS_SHARE_URL`) برقرار رکھیں تاکہ مقامی تلاش (Local Pack) میں ہم آہنگی بڑھے۔

### انگریزی کی ورڈز کی کوریج
سائٹ اصل میں اردو ہے؛ بین الاقوامی زائرین کے انگریزی کی ورڈز ("Lahore Fort ticket price"، "opening hours"، "Sheesh Mahal"، "Alamgiri Gate"، "Mughal history") اب ٹائٹل، میٹا ڈیسکرپشن اور FAQ میں شامل ہیں تاکہ انگریزی سرچ بھی مل سکے۔ مکمل انگریزی ورژن (hreflang `en`) کے لیے الگ صفحہ/زبان شاخ کی ضرورت ہو گی — فی الحال واحد اردو صفحہ x-default کے طور پر نشان زد ہے۔
