#!/usr/bin/env node
/**
 * 檢查元件頁的結構是否符合規則。
 *
 *   node tools/check-pages.mjs
 *
 * 擋三類會讓文件站前後不一致的問題：
 *
 * 1. 缺少必要區塊 / 順序不符
 *    每個元件頁都要有同樣的九個區塊。少一塊時讀者無從判斷是「還沒做」
 *    還是「這個元件不適用」，而規則寫在文件裡沒有人會每次去對。
 *
 * 2. Configurations 直接寫死顏色
 *    區塊裡出現 accent、語意色票或裸 hex。
 *
 * 3. Configurations 的維度會渲染出非中性色
 *    這是第 2 類抓不到的情況，也是先前漏掉的原因：Chip 的 Configurations
 *    區塊裡一個顏色字都沒有，綠色是 <ChipPreview> 依 level 從 token 查出來的。
 *    所以這裡不看區塊文字，改看「playgroundDimensions 暴露的維度，切換後
 *    會不會解出非中性色票」。
 *
 * 中性 = palette 名稱為 grey / white / black / transparent 開頭。
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

/** Configurations 區塊裡不該直接出現的顏色寫法 */
const COLOR_LITERALS = [
  { re: /\baccent\b/i, hint: 'accent 色票' },
  { re: /semantic\.\w*(Accent|Charging)\w*/, hint: '語意色票' },
  { re: /#[0-9a-fA-F]{6}\b/, hint: '裸 hex' },
];

const isNeutral = (paletteName) => /^(grey|white|black|transparent)/i.test(paletteName);

// ── 語意色票 → palette 名稱（明暗都要看）──
const semantic = JSON.parse(readFileSync(join(ROOT, 'tokens/semantic-colors.json'), 'utf8'));
const semanticMap = new Map();
(function collect(node) {
  if (!node || typeof node !== 'object') return;
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object' && typeof v.light === 'string' && typeof v.dark === 'string') {
      semanticMap.set(k, [v.light, v.dark]);
    } else collect(v);
  }
})(semantic);

/**
 * 判斷 Configurations 暴露的維度會不會渲染出非中性色。
 *
 * 不能假設「未暴露的維度取第一個宣告值」——頁面可以把預覽固定成中性的
 * 那一個（Toggle 就把 value 固定為 off）。所以改成：只要存在一組未暴露
 * 維度的指派，能讓所有暴露維度的組合都是中性色，就算通過。
 */
function violatingKeys(spec, exposedKeys) {
  const dims = spec.dimensions ?? {};
  const exposed = exposedKeys.filter((k) => k in dims);
  if (!exposed.length) return [];

  // 沒有 variants 資料就無從判斷，不亂報（modal 目前是空的）
  if (!(spec.variants ?? []).length) return [];

  const free = Object.keys(dims).filter((k) => !exposed.includes(k));

  const isNeutralVariant = (v) =>
    Object.entries(v).every(([field, tok]) => {
      if (field === 'note' || typeof tok !== 'string') return true;
      const pair = semanticMap.get(tok);
      return !pair || pair.every((p) => isNeutral(p));
    });

  // 未暴露維度的所有指派
  const assignments = free.reduce(
    (acc, k) => acc.flatMap((a) => dims[k].map((v) => ({ ...a, [k]: v }))),
    [{}],
  );

  for (const pin of assignments) {
    const reachable = (spec.variants ?? []).filter((v) =>
      Object.entries(pin).every(([k, val]) => v[k] === undefined || v[k] === val),
    );
    if (reachable.length && reachable.every(isNeutralVariant)) return [];
  }

  return exposed;
}

// ── 元件 token JSON ────────────────────────────────────────
const specDir = join(ROOT, 'tokens/components');
const specs = new Map();
for (const f of readdirSync(specDir).filter((f) => f.endsWith('.json'))) {
  specs.set(f.replace('.json', ''), JSON.parse(readFileSync(join(specDir, f), 'utf8')));
}

/** 頁面檔名 → token JSON 檔名 */
const SPEC_OF = {
  ButtonPage: 'button',
  ChipPage: 'chip',
  TogglePage: 'toggle',
  TabPage: 'tab',
  TextFieldPage: 'text_field',
  TextAreaPage: 'text_area',
  ListPage: 'list',
  ModalPage: 'modal',
  DropdownMenuPage: 'dropdown_menu',
};

const problems = [];
const files = readdirSync(PAGES).filter((f) => f.endsWith('Page.tsx'));

for (const file of files) {
  const text = readFileSync(join(PAGES, file), 'utf8');
  const titles = [...text.matchAll(/<SectionTitle>([^<]+)<\/SectionTitle>/g)].map((m) => m[1]);

  // 1. 必要區塊與順序
  const missing = REQUIRED.filter((r) => !titles.includes(r));
  if (missing.length) {
    problems.push(
      `${file}\n    缺少區塊：${missing.join('、')}\n` +
        `    內容還沒有的話用 <PendingImage> 或 <Pending> 佔位，不要整段省略`,
    );
  }
  const present = REQUIRED.filter((r) => titles.includes(r));
  const actual = titles.filter((t) => REQUIRED.includes(t));
  if (present.join('|') !== actual.join('|')) {
    problems.push(`${file}\n    區塊順序不符\n    應為：${present.join(' → ')}\n    實為：${actual.join(' → ')}`);
  }

  // 2. Configurations 區塊裡寫死的顏色
  const start = text.indexOf('<SectionTitle>Configurations</SectionTitle>');
  if (start >= 0) {
    const end = text.indexOf('</section>', start);
    const block = text.slice(start, end < 0 ? undefined : end);
    for (const { re, hint } of COLOR_LITERALS) {
      const hit = block.match(re);
      if (hit) {
        problems.push(
          `${file}\n    Configurations 出現${hint}：${hit[0]}\n` +
            `    Configurations 只講配置，顏色一律在 Color 區塊；示意用中性色`,
        );
      }
    }
  }

  // 3. Configurations 的維度會不會渲染出非中性色
  const specName = SPEC_OF[file.replace('.tsx', '')];
  const spec = specName && specs.get(specName);
  if (spec) {
    const exposed = [...text.matchAll(/\{\s*key:\s*'(\w+)'/g)].map((m) => m[1]);
    const bad = violatingKeys(spec, exposed);
    if (bad.length) {
      problems.push(
        `${file}\n    Configurations 的維度會渲染出非中性色：${bad.join('、')}\n` +
          `    這個維度的差異就是顏色，請移出 Configurations 並在 Color 區塊說明；\n` +
          `    預覽固定用中性的那一個變體`,
      );
    }
  }
}

if (problems.length) {
  console.error(`✗ 元件頁結構有 ${problems.length} 個問題：\n`);
  problems.forEach((p) => console.error(`  ${p}\n`));
  process.exit(1);
}

console.log(`✓ 元件頁結構正確（${files.length} 頁）`);
