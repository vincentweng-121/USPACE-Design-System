#!/usr/bin/env node
/**
 * 檢查程式碼引用的靜態資源是否真的存在。
 *
 *   node tools/check-assets.mjs
 *
 * 擋三類上線才會爆的錯誤：
 *
 * 1. 大小寫不符
 *    macOS 的檔案系統預設不分大小寫，`Anatomy-Button.png` 寫成
 *    `anatomy-button.png` 在本機完全正常，但 GitHub Pages 的伺服器
 *    分大小寫，上線就是 404。
 *
 * 2. 缺少站台路徑
 *    站台部署在 /USPACE-Design-System/ 之下，寫 `/images/x.png`
 *    會指向網域根目錄。必須用 import.meta.env.BASE_URL。
 *
 * 3. 明暗雙版只補了一半
 *    說明圖一律成對存在（`-light.png` / `-dark.png`）。只加了 light
 *    的話，切到暗色主題就是破圖，而淺色下完全看不出問題。
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'website/src');
const PUBLIC = join(ROOT, 'website/public');

/** 遞迴列出目錄下所有檔案的相對路徑 */
function walk(dir, base = dir) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full, base) : [relative(base, full)];
  });
}

const publicFiles = walk(PUBLIC);
const publicLower = new Map(publicFiles.map((f) => [f.toLowerCase(), f]));

const sources = walk(SRC).filter((f) => /\.(tsx?|css)$/.test(f));
const problems = [];

// `${import.meta.env.BASE_URL}images/Foo.png` 之類的引用
const OK_REF = /\$\{import\.meta\.env\.BASE_URL\}([^`'"]+)/g;
// 直接寫死的絕對路徑
const BAD_REF = /src=["']\/([^"']+\.(?:png|jpe?g|svg|webp|mp4|gif))["']/g;
// 明暗雙版說明圖的基底名稱：image="button-anatomy" 或 image: 'button-anatomy'
// 兩種寫法分別對應 AnatomyImage / ThemedImage 的 prop 與 DoDontExamples 的欄位。
const THEMED_REF = /\bimage[=:]\s*["']([a-z0-9][a-z0-9-]*)["']/g;

for (const rel of sources) {
  const text = readFileSync(join(SRC, rel), 'utf8');

  for (const m of text.matchAll(OK_REF)) {
    const asked = m[1];
    // 含變數的路徑無法靜態驗證，交給下方的呼叫端檢查
    if (asked.includes('${')) continue;
    if (publicFiles.includes(asked)) continue;
    const actual = publicLower.get(asked.toLowerCase());
    problems.push(
      actual
        ? `${rel}\n    引用 ${asked}\n    實際檔名是 ${actual} — 大小寫不符，上線會 404`
        : `${rel}\n    引用 ${asked}\n    public/ 下找不到這個檔案`
    );
  }

  // 明暗雙版說明圖：一個基底名稱要對應到 -light 與 -dark 兩個檔案，缺一不可
  for (const m of text.matchAll(THEMED_REF)) {
    for (const mode of ['light', 'dark']) {
      const asked = `images/${m[1]}-${mode}.png`;
      if (publicFiles.includes(asked)) continue;
      const actual = publicLower.get(asked.toLowerCase());
      problems.push(
        actual
          ? `${rel}\n    image="${m[1]}" 需要 ${asked}\n    實際檔名是 ${actual} — 大小寫不符，上線會 404`
          : `${rel}\n    image="${m[1]}" 需要 ${asked}\n    public/ 下找不到這個檔案`
      );
    }
  }

  for (const m of text.matchAll(BAD_REF)) {
    problems.push(
      `${rel}\n    src="/${m[1]}" 少了站台路徑\n    改用 \`\${import.meta.env.BASE_URL}${m[1]}\``
    );
  }
}

if (problems.length) {
  console.error(`✗ 靜態資源引用有 ${problems.length} 個問題：\n`);
  problems.forEach((p) => console.error(`  ${p}\n`));
  process.exit(1);
}

console.log(`✓ 靜態資源引用正確（public/ 下 ${publicFiles.length} 個檔案）`);
