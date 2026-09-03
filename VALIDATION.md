# 交付验证状态 / Delivery Validation

## 已完成的静态检查

- `package.json` 与 `pnpm-lock.yaml` importer specifier 一致。
- 所有直接依赖均为精确版本，无 `latest`、`*`、`^`、`~`。
- 已新增根目录 `pnpm-workspace.yaml`（仅含 `allowBuilds: { esbuild: true }`）；pnpm v11 不再读取 package.json 的 `pnpm` 字段、`onlyBuiltDependencies` 已由 `allowBuilds` 取代，该文件用于放行 esbuild 的 postinstall，否则 CI 安装会以 `ERR_PNPM_IGNORED_BUILDS` 失败。
- Astro 可见页面源码未检测到 CJK 中文字符；站点内容为 Urdu / RTL。
- 源码扫描未发现 `example.com`、`localhost`、`chrome-extension://`。
- 官方域名固定为 `https://lahorefort.org`（astro.config.mjs 默认，`SITE_URL` 仅作 CI/预发布覆盖）；sitemap 集成始终启用，无手写 `lastmod`。

## 当前执行环境无法完成的步骤（已过时，见文末 2026-09-03 轮次）

`CI=1 corepack pnpm install --frozen-lockfile` 曾因 DNS 无法解析 `registry.npmjs.org` 而失败（`EAI_AGAIN`），导致无法运行 `pnpm check` 与 `pnpm build`。完整原始日志见 `VALIDATION-INSTALL.log`。

## 图片二进制状态

`public/images/` 下 5 个本地 JPG 文件存在，页面不会出现破图；逐张署名、摄影者与 CC 许可见 `IMAGE-CREDITS.md`（对应 Wikimedia Commons 来源）。

状态更新（2026-09-03，用户确认）：这 5 个 JPG 均为真实照片（文件 182KB–2.5MB，实拍文件），非此前轮次记录的占位/示意文件。不再需要“替换占位图”步骤；页面代码无需改动（文件名已固定）。

## 2026-09-03 轮次：安装修复 + 内容扩充 + 本地验证通过

- 本机（pnpm 11.25.0 / node 24.14.0）已实际成功执行 `pnpm install --frozen-lockfile`（esbuild postinstall 正常放行，无 `ERR_PNPM_IGNORED_BUILDS`）、`pnpm check`（0 错误 0 警告，仅 1 条 BaseLayout 既有 hint）与 `pnpm build`（5 页，`Build audit: clean`）。
- 首页内容扩充（纯新增，未删减原有文案）：
  - 时间线 4 → 8 段（新增：锡克时期/英治时期/巴基斯坦建国后保护/UNESCO 1981 与濒危记录）。
  - 新增「قلعے کی نمایاں عمارتیں」6 张卡（Diwan-i-Aam / Diwan-i-Khas / Khwabgah / Moti Masjid / Naulakha / Hathi Paer）。
  - 新增「کہانیاں اور روایات」7 条，每条带类型徽章（تاریخی حقیقت / روایت / نام کی وجہ），措辞保持史实与传说分离。
  - 新增「عملی سہولیات」9 张类型卡（WC/饮水/停车/餐饮/住宿/商超/医疗 1122/ATM/加油充电），仅类型词、无商户名、含中立声明。
  - 新增 Open-Meteo 实时天气 + 7 日预报（`src/components/Weather.astro`，客户端 fetch、30 分钟 localStorage 缓存、失败兜底、Urdu 星期与数字）。
  - FAQ 4 → 6 条，FAQPage JSON-LD 同步至 6（DOM 与 schema 数量一致）。
  - Header 导航新增「سہولیات」「موسم」两项；`#سہولیات` / `#موسم` 锚点与 id 一一对应。
- 史实依据：UNESCO World Heritage List（Fort & Shalamar Gardens）、WCLA / DOAM、AKDN 保护记录（图片墙约 442 m × 15 m）。新增 Urdu 文案为机器辅助撰写，上线前需乌尔都语母语者终校。

## 2026-09-03 轮次 2：官方域名 + SEO 实体绑定 + PWA

- 官方域名定为 `https://lahorefort.org`：`astro.config.mjs` 默认 site（`SITE_URL` 仅作 CI 覆盖），sitemap 集成常开；`public/robots.txt` 补 `Sitemap: https://lahorefort.org/sitemap-index.xml`；`verify-build.mjs` 审计契约同步（sitemap 必有 + canonical/og:image host 与 sitemap 一致 + PWA 资产必备）。
- SEO 实体绑定（对照单景点模板逐项）：
  - TouristAttraction JSON-LD 补 `@id https://lahorefort.org/#attraction`、`url`、`image[alamgiri-gate.jpg 绝对 URL]`、`hasMap`、`isAccessibleForFree:false`、`alternateName` 数组（Lahore Fort / شاہی قلعہ / Shahi Qila）、description 含「城市+省+国家」语义，sameAs 追加 lahore-mc.punjab.gov.pk。
  - head：`og:image:alt`、manifest 链接、SW 注册（仅 HTTPS）；canonical/og:url/og:image 因 site 常驻而稳定为绝对 URL。
  - 正文语义：介绍段首句加入等位声明「قلعہ لاہور = Lahore Fort，位于 لاہور، پنجاب، پاکستان 中心」；地图区加入位置层级 + GPS 数字 + WCLA（.gop.pk）与 PTDC 权威外链。
  - 地图 iframe 换成用户提供的精确 pb embed src（保持原始 zh-CN 参数）；首图/主视觉 alt 绑定全称 + 城市层级（og:image:alt、hero aria-label、首张 gallery img）。
- PWA：`public/manifest.webmanifest`（lang ur / dir rtl / theme #6d281d / SVG+192+512+maskable）、`public/sw.js`（版本缓存 lahorefort-v1、导航 network-first + 离线回退首页、静态资源 cache-first + 后台刷新、旧缓存清理）、`public/icons/icon-192.png`（2.6KB）与 `icon-512.png`（6.7KB，纯 Node 像素渲染生成、签名与 IHDR 尺寸已核验）。
- 验证：`pnpm check` 与 `pnpm build`（含新审计：5 页 + sitemap-index + PWA 资产齐全，`Build audit: clean`）。待办不变：图片替换真实照片、Urdu 终校。

## 2026-09-03 轮次 3：代码合规审计（68 PASS / 0 FAIL / 1 INFO）

- 审计报告：`COMPLIANCE-AUDIT.md`；审计脚本 `scripts/audit-compliance.mjs`（已注册 `pnpm audit:compliance`，复跑：`pnpm check && pnpm build && pnpm audit:compliance`）。astro check 0 error / 0 warning / 0 hint。
- 修复项：
  - `BaseLayout.astro` 新增 `robots` prop（默认页保持 `index,follow,max-image-preview:large`）；404 页传 `robots="noindex"` → 产物 `noindex,follow`（此前 404 误随模板输出 index,follow）。同时 JSON-LD 注入 `<script>` 显式 `is:inline`（消除 astro(4000) hint）。
  - `astro.config.mjs` 注释英文化 → 源码+产物 CJK 零命中（此前含中文注释 19 处）。
- 12 类目全通过：JSON-LD（TA @id/url/image/hasMap/alternateName/free/geo/NAP/phone + FAQPage 6==6 + 可见评分与 schema 一致）、开放时间（schema 每日 09:00–18:00 == 可见卡，含「出行前核实」软表述 + WCLA 官链）、E-E-A-T（Footer 独立声明/权威比对、法律页 ستمبر 2026、Sources 6 官方源、图片产权说明）、sitemap（4 URL 绝对官方域、无 404、无伪造 lastmod）、图片署名（IMAGE-CREDITS.md + 5 图文件存在 + 页面指向）、GA4（唯一 G-HXM22WWPKP、同意门控、anonymize_ip、无广告残留）、PWA（图标实测尺寸==声明、sw 三监听/版本缓存/离线兜底/同源守卫、仅 HTTPS 注册）、404（noindex+f 现在通过）、官方外链（target=_blank 全带 rel=noopener 0 违规；WCLA/UNESCO/DOAM/市域/tdcp/tourism/maps 权威主机逐域命中）、语言一致性（5 页 lang=ur dir=rtl、单 h1、导航锚点 1:1、无跨站/占位词）、canonical/OG（5 页绝对带尾斜杠、og:image+alt）、禁用标记（example.com/localhost/ca-pub/ads 等 0 命中）。
- 1 条 INFO（可选增强）：首页 JSON-LD 未含 WebPage/dateModified 节点（法律页可见 ستمبر 2026 已覆盖）。
- 图片状态（用户 2026-09-03 确认）：public/images 5 张 JPG 均为真实照片，此前“替换占位图”待办撤销；剩余人工待办：Urdu 母语者终校。
