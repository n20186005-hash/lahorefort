# قلعہ لاہور — اردو سیاحتی رہنما

Astro + Tailwind CSS + TypeScript پر مبنی RTL اردو سائٹ، Cloudflare Worker static assets deployment کے لیے تیار۔

## واحد ڈومین ترتیب
`SITE_URL` ماحول متغیر Astro کے `site` فیلڈ کا واحد ماخذ ہے۔ اگر خالی ہو تو build چلتا ہے، sitemap integration شامل نہیں ہوتی اور canonical/absolute Open Graph URL omit ہو جاتے ہیں۔

```bash
export SITE_URL=https://your-real-domain.pk
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## اہم راستے
- `/` مرکزی واحد صفحہ
- `/raazdari/` رازداری
- `/sharaait/` خدمت کی شرائط
- `/cookies/` کوکی ترتیبات

## تجزیات
GA4 شناسه `G-HXM22WWPKP` صرف صارف کی واضح تجزیاتی رضامندی کے بعد لوڈ ہوتی ہے۔

## تصاویر
ویب سائٹ `public/images/*.jpg` سے مقامی تصاویر پڑھتی ہے۔ تصویر کے ماخذ اور لائسنس `IMAGE-CREDITS.md` میں درج ہیں۔
