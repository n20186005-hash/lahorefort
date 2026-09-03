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
