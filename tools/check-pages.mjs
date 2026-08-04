#!/usr/bin/env node
/**
 * 檢查元件頁的結構是否符合規則。
 *
 *   node tools/check-pages.mjs
 *
 * 擋兩類會讓文件站前後不一致的問題：
 *
 * 1. 缺少必要區塊
 *    每個元件頁都要有同樣的九個區塊。少一塊時讀者無從判斷是「還沒做」
 *    還是「這個元件不適用」，而規則寫在文件裡沒有人會每次去對。
 *
 * 2. Configurations 出現顏色
 *    Configurations 只講配置（尺寸、型別、狀態、icon 位置），顏色一律
 *    在 Color 區塊說明。同一件事寫兩處遲早會不同步。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = join(ROOT, 'website/src/pages/components');

/** 順序即為頁面上應有的順序 */
const REQUIRED = [
  'Variants',
  'Configurations',
  'Tokens &amp; specs',
  'Anatomy',
  'Color',
  'States',
  'Measurements',
  'Touch areas',
  'Usage',
];

/** Configurations 區塊裡不該出現的顏色寫法 */
const COLOR_IN_CONFIG = [
  { re: /\baccent\b/i, hint: 'accent 色票' },
  { re: /semantic\.\w*(Accent|Charging)\w*/, hint: '語意色票' },
  { re: /#[0-9a-fA-F]{6}\b/, hint: '裸 hex' },
];

const problems = [];

for (const file of readdirSync(PAGES).filter((f) => f.endsWith('Page.tsx'))) {
  const text = readFileSync(join(PAGES, file), 'utf8');
  const titles = [...text.matchAll(/<SectionTitle>([^<]+)<\/SectionTitle>/g)].map((m) => m[1]);

  // 1. 必要區塊
  const missing = REQUIRED.filter((r) => !titles.includes(r));
  if (missing.length) {
    problems.push(
      `${file}\n    缺少區塊：${missing.join('、')}\n` +
        `    內容還沒有的話用 <PendingImage> 或 <Pending> 佔位，不要整段省略`,
    );
  }

  // 順序：只看有出現的那些，相對順序要正確
  const present = REQUIRED.filter((r) => titles.includes(r));
  const actual = titles.filter((t) => REQUIRED.includes(t));
  if (present.join('|') !== actual.join('|')) {
    problems.push(`${file}\n    區塊順序不符\n    應為：${present.join(' → ')}\n    實為：${actual.join(' → ')}`);
  }

  // 2. Configurations 區塊內的顏色
  const start = text.indexOf('<SectionTitle>Configurations</SectionTitle>');
  if (start >= 0) {
    const end = text.indexOf('</section>', start);
    const block = text.slice(start, end < 0 ? undefined : end);
    for (const { re, hint } of COLOR_IN_CONFIG) {
      const hit = block.match(re);
      if (hit) {
        problems.push(
          `${file}\n    Configurations 區塊出現${hint}：${hit[0]}\n` +
            `    Configurations 只講配置，顏色一律在 Color 區塊說明；示意用中性色`,
        );
      }
    }
  }
}

if (problems.length) {
  console.error(`✗ 元件頁結構有 ${problems.length} 個問題：\n`);
  problems.forEach((p) => console.error(`  ${p}\n`));
  process.exit(1);
}

console.log(`✓ 元件頁結構正確（${readdirSync(PAGES).filter((f) => f.endsWith('Page.tsx')).length} 頁）`);
