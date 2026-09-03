# Lahore Fort 合规审计报告（代码合规 · 可复跑）

- 日期：2026-09-03
- 项目：lahorefort（قلعہ لاہور / Lahore Fort 官方域名 https://lahorefort.org，Astro 7 静态站，5 页：/、/raazdari、/sharaait、/cookies、/404）
- 审计方式：对照「避坑指南」类目自动重建清单 → 源码/产物逐项取证
- 复跑命令：`pnpm check && pnpm build && pnpm audit:compliance`
- 结果：**68 PASS / 0 FAIL / 1 INFO**（astro check 0 error / 0 warning / 0 hint；verify-build `Build audit: clean`）

审计脚本：`scripts/audit-compliance.mjs`（已注册 `pnpm audit:compliance`）。核对对象 = `dist/*.html` 产物 + `src/`、`public/`、`astro.config.mjs` 源码。

## 1. JSON-LD（LD-1..LD-5 全 PASS）
| ID | 检查项 | 证据 |
|---|---|---|
| LD-1 | 首页全部 JSON-LD 块可解析 | 2 块（TouristAttraction + FAQPage），JSON.parse 无异常 |
| LD-2 | TouristAttraction 含 `@id https://lahorefort.org/#attraction`、`url`、`image[绝对首图]`、`hasMap maps.app.goo.gl/new9CMHfA9H4XSZH6`、`alternateName` 数组、`isAccessibleForFree:false`、`geo 31.588273674183135/74.31287757729703`、NAP（لاہور/PK/H8Q7+56P فورٹ روڈ）、`telephone +92-42-99204196` | `src/pages/index.astro` 常量 + dist/index.html |
| LD-3 | FAQPage 块 | 6 问 |
| LD-4 | 可见 `<details>` 6 == Schema mainEntity 6 | DOM 与 Schema 对齐 |
| LD-5 | 可见评分 4.6(26,406) == aggregateRating 4.6/26406 | 首页 stat + JSON-LD |

## 2. 开放时间与事实项（OH-1..OH-6 全 PASS）
- OH-1 JSON-LD `openingHoursSpecification` 每日 09:00–18:00（与可见卡片一致）。
- OH-2 首页可见开放时间卡；OH-3 同时保留「出发前请核实」软表述（未虚构成保证承诺）；OH-4 开放时间旁挂 WCLA 官方链接；OH-5 电话 +92 42 99204196 可见且与 Schema 同源；OH-6 Plus Code `H8Q7+56P` 与 فورٹ روڈ 地址可见（需求数据一致）。

## 3. E-E-A-T（EE-1..EE-5 PASS，EE-6 可选 INFO）
- EE-1 Footer 独立非营利声明；EE-2 Footer 声明资料与官方机构比对（پنجاب والڈ سٹی اتھارٹی）；EE-3 隐私/条款/Cookie 三页均带「ستمبر 2026」最后更新；EE-4 首页 Sources（معتبر حوالے）列 6 条官方参考；EE-5 Footer 图片产权说明 + IMAGE-CREDITS.md 已生成并引用。
- INFO EE-6：首页 JSON-LD 未含 WebPage/dateModified（法律页可见日期已覆盖该信息；如需可在后续轮补 Organization/WebSite/WebPage 节点）。

## 4. Sitemap / robots（SM-1..SM-5 全 PASS）
- dist 生成 `sitemap-0.xml` + `sitemap-index.xml`；条目全为官方域名绝对 URL；不含 /404；无伪造 `<lastmod>`；`robots.txt` 含 `Sitemap: https://lahorefort.org/sitemap-index.xml`。

## 5. 图片署名（IC-1..IC-3 PASS；2026-09-03 用户确认 5 张 JPG 均为真实照片）
- IMAGE-CREDITS.md 存在且逐张登记（对应 Wikimedia Commons 来源与 CC 许可）；首页引用的 5 张 `/images/*.jpg` 文件全部存在（182KB–2.5MB 实拍文件）；页面文案指向署名文件。
- 状态确认（用户 2026-09-03）：`public/images/` 5 张 JPG 均为真实照片，非占位/示意文件；不再需要“替换占位图”步骤。

## 6. GA4 同意门控（GA-1..GA-6 全 PASS）
- 全库唯一测量 ID `G-HXM22WWPKP`（唯一集合 size=1）；同意键 `lahoreFortConsent` 在 BaseLayout 加载器与 cookies 页面写入端一致；`p.analytics===true` 才加载 gtag；`anonymize_ip:true`；无 ca-pub/adsbygoogle 残留；隐私页披露 Google Analytics。

## 7. PWA（PW-1..PW-8 全 PASS）
- manifest 图标（favicon.svg any / 192×192 / 512×512 / 512 maskable）文件存在且 **PNG 实测尺寸与声明一致**；manifest dir=rtl lang=ur display=standalone theme #6d281d；head 含 manifest + theme-color + apple-touch-icon；sw.js 含 install/activate/fetch、版本缓存 `lahorefort-v1`、旧缓存清理、导航 network-first + 离线回退 `/`、同源守卫；head 注册 SW 且仅 HTTPS 协议启用。

## 8. 404（E4-1..E4-4 全 PASS，本轮修复）
- dist/404.html 生成；含返回首页链接；wrangler `not_found_handling: 404-page`。
- **本轮修复**：404 页此前随 BaseLayout 输出 `robots index,follow`。新增 BaseLayout `robots` prop（默认 index 页保持 `index,follow,max-image-preview:large`），404 页传 `robots="noindex"` → 产物为 `noindex,follow`。

## 9. 官方外链 / 权威域（XL-1..XL-4 全 PASS）
- 全部 `target="_blank"` 锚点均带 `rel="noopener"`（0 违规）；预期权威主机在源码+产物全部命中：WCLA(.gop.pk)×6、UNESCO×4、DOAM×4、lahore-mc.punjab.gov.pk×4、tdcp.gop.pk×2、tourism.gov.pk×4、maps.app.goo.gl×6、maps/embed×2、open-meteo×2、googletagmanager×6；地图 iframe 含 title + lazy + `referrerpolicy="strict-origin-when-cross-origin"`，且为需求提供的精确 pb embed src。

## 10. 语言与内容一致性（LC-1..LC-7 全 PASS，本轮微调）
- **本轮微调**：`astro.config.mjs` 中文注释改为英文 → 源码+产物 CJK 零命中（全站纯 Urdu）。
- 5 页均 `<html lang="ur" dir="rtl">`；无跨站/占位词泄漏（Sule Pagoda/Tha Phae/jaipur/pompeii/bupest/placeholder/TODO/Lorem/FIXME 等 0 命中）；每页唯一 h1；Header 6 个导航锚点 1:1 命中 6 个 section id；title/description 齐全；Weather 用 Open-Meteo 坐标 31.5883/74.3129 + 30 分钟缓存 + Urdu 星期。

## 11. Canonical / OG（CO-1..CO-4 全 PASS）
- 5 页 canonical == og:url 全绝对带尾斜杠（/、/raazdari/、/sharaait/、/cookies/、/404/）；og:image 绝对 + `og:image:alt` 存在；viewport 无 maximum-scale；首页 6 张 `<img>` 全部带 alt。

## 12. 禁用标记扫描（FT-1 PASS）
- example.com / localhost / chrome-extension:// / ca-pub- / adsbygoogle / fakephone / placeholder.com / yoursite / your-domain 全部零命中。

## 本轮代码改动
1. `src/layouts/BaseLayout.astro`：新增 `robots` prop（默认 index 输出 `index,follow,max-image-preview:large`；noindex 输出 `noindex,follow`）；JSON-LD 注入 `<script>` 显式 `is:inline`。
2. `src/pages/404.astro`：`robots="noindex"`。
3. `astro.config.mjs`：注释英文化（实现全库零 CJK）。
4. 新增 `scripts/audit-compliance.mjs`；`package.json` 注册 `audit:compliance`。

## 人工待办（上线前）
- Urdu 文案母语者终校（尤其新增段落）。
- （可选）首页 JSON-LD 补 Organization/WebSite/WebPage 节点与 dateModified。
- （已核对）public/images 5 张 JPG 均为真实照片（用户 2026-09-03 确认；逐张署名见 IMAGE-CREDITS.md）。
