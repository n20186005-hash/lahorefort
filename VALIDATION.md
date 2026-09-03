# 交付验证状态 / Delivery Validation

## 已完成的静态检查

- `package.json` 与 `pnpm-lock.yaml` importer specifier 一致。
- 所有直接依赖均为精确版本，无 `latest`、`*`、`^`、`~`。
- 项目不存在 `pnpm-workspace.yaml`。
- Astro 可见页面源码未检测到 CJK 中文字符；站点内容为 Urdu / RTL。
- 源码扫描未发现 `example.com`、`localhost`、`chrome-extension://`。
- `SITE_URL` 为空时 sitemap 集成不会启用；项目源码没有手写 sitemap 或 `lastmod`。

## 当前执行环境无法完成的步骤

`CI=1 corepack pnpm install --frozen-lockfile` 在当前运行沙箱中因 DNS 无法解析 `registry.npmjs.org` 而失败（`EAI_AGAIN`）。完整原始日志见 `VALIDATION-INSTALL.log`。因此本次环境中无法继续实际运行 `pnpm check` 与 `pnpm build`，也没有伪造成功结果。

## 图片二进制状态

网站已包含 5 个本地 JPG 文件，保证页面不会出现破图；但当前沙箱同时禁止把已核验的 Wikimedia Commons 原始照片二进制下载到文件系统，所以这 5 个 JPG 是明确的本地设计占位图，而不是伪装成实景照片。真实照片的逐张原始页面、摄影者和许可见 `IMAGE-CREDITS.md`。

用户要求的最终生产版本应以 `IMAGE-CREDITS.md` 中对应真实照片替换同名 JPG 后再部署；文件名已经固定，无需修改页面代码。
