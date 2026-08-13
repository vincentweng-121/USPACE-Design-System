import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  IconPlaceholder,
  NumberedCaptions,
  Playground,
  PendingImage,
  Swatch,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { chipSpec } from '../../tokens/componentSpecs';
import { colorOf, cap } from '../../utils';

type Style = 'filled' | 'outlined' | 'text';
type Level = 'accent' | 'primary' | 'secondary';
type Size = 'regular' | 'small';

const styles = chipSpec.dimensions.style as Style[];
const layout = chipSpec.layout! as Record<string, number>;

/** Regular 的文字使用 labelM；Small 沒有對應 token，見下方 smallType */
const labelType = typographyStyles
  .flatMap((f) => f.styles.map((s) => ({ ...s, family: f.family })))
  .find((s) => s.name === 'labelM')!;

/**
 * Small 的 10px/14px Semibold 在 TypographyExtension 裡沒有對應樣式，
 * chip.dart 是 inline 定義的。這裡照抄同一組數值，並在 Measurements 標明無 token。
 */
const smallType = { size: 10, lineHeight: 14, weight: 600 };

/**
 * 由 tokens/components/chip.json 查出該組合的 token 名稱。
 * outlined 與 text 不吃 level，規格檔就不帶 level 欄位，這裡也不比對。
 */
const variantOf = (style: Style, level: Level) =>
  chipSpec.variants.find(
    (v) => v.style === style && (v.level === undefined || v.level === level),
  )!;

// ── 依 token 渲染的 Chip ──
function ChipPreview({
  label,
  style,
  level = 'secondary',
  size = 'regular',
  icon = false,
}: {
  label: string;
  style: Style;
  level?: Level;
  size?: Size;
  icon?: boolean;
}) {
  const v = variantOf(style, level);
  const isRegular = size === 'regular';
  const t = isRegular ? labelType : smallType;

  // 有無 icon 的左右內距不同，數值取自 chip.json 的 layout
  const padLeft = icon
    ? isRegular
      ? layout.regularPaddingLeftWithIcon
      : layout.smallPaddingLeftWithIcon
    : isRegular
      ? layout.regularPaddingX
      : layout.smallPaddingX;
  const padRight = icon
    ? isRegular
      ? layout.regularPaddingRightWithIcon
      : layout.smallPaddingRightWithIcon
    : isRegular
      ? layout.regularPaddingX
      : layout.smallPaddingX;

  const contentColor = colorOf(v.content as string)!;
  const borderColor = colorOf(v.border as string | null);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: icon ? layout.gap : 0,
        padding: `${layout.paddingY}px ${padRight}px ${layout.paddingY}px ${padLeft}px`,
        borderRadius: 100,
        background: colorOf(v.bg as string | null) ?? 'transparent',
        border: `1px solid ${borderColor ?? 'transparent'}`,
        color: contentColor,
        fontSize: t.size,
        lineHeight: `${t.lineHeight}px`,
        fontWeight: t.weight,
        fontFamily: '"PingFang TC", sans-serif',
        whiteSpace: 'nowrap',
        cursor: 'default',
      }}
    >
      {icon && <IconPlaceholder color={contentColor} size={layout.iconSize} />}
      {label}
    </div>
  );
}

// ── Playground 的維度 ──
// 與 Button 頁同一條規則：Configurations 只講形狀、尺寸與元素配置。
// style 是形狀，三個值都解不出顏色，可以放；level 是顏色（accent 為螢光綠，
// primary 在 dark 也是螢光綠），一律留給 Color 區塊，預覽固定用中性的 secondary。
// icon 不是 token 維度（token 只管顏色），所以手寫。
const playgroundDimensions: PlaygroundDimension[] = [
  {
    key: 'style',
    label: 'Style',
    options: styles.map((s) => ({ value: s, label: cap(s) })),
  },
  {
    key: 'size',
    label: 'Size',
    options: [
      { value: 'regular', label: 'Regular' },
      { value: 'small', label: 'Small' },
    ],
  },
  {
    key: 'icon',
    label: 'Icon option',
    options: [
      { value: 'none', label: 'None' },
      { value: 'leading', label: 'Leading' },
    ],
  },
];

export default function ChipPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Chip"
        lead="Chip 是純展示的標籤，用來標記狀態或分類，本身不可點擊。形狀由 style 決定，共 filled、outlined、text 三種；filled 再由 level 決定底色，共 accent、primary、secondary 三級。加上 regular 與 small 兩種 size，並可在文字左側加一個 icon。"
        meta={
          <>
            <span>
              來源 <code>{chipSpec.source}</code>
            </span>
            <span>
              Figma <code>{chipSpec.figmaNode}</code>
            </span>
          </>
        }
      />

      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* ── 1. Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage
              expects="chip-variant"
              note="一張圖並排三種 style，filled 再展開三個 level，圖上標號對應下方說明。"
            />

            <NumberedCaptions
              items={[
                { name: 'Filled', desc: '實心底色，存在感最強。底色由 level 決定。' },
                { name: 'Outlined', desc: '透明底加一圈中性色描邊。適合放在已經有底色的區塊上。' },
                { name: 'Text', desc: '無底無框，只有文字。存在感最低，內距與 filled 相同。' },
                { name: 'Level（僅 filled）', desc: 'Accent 螢光綠底最搶眼、Primary 淺色底為預設、Secondary 灰底用於輔助資訊。' },
              ]}
            />
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>

            <Playground
              name="chip"
              dimensions={playgroundDimensions}
              render={(v) => (
                <ChipPreview
                  label="Label"
                  style={v.style as Style}
                  level="secondary"
                  size={v.size as Size}
                  icon={v.icon === 'leading'}
                />
              )}
            />
          </section>

          {/* ── 3. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <PendingImage
              expects="chip-anatomy"
              note="標出三個部件的拆解圖，編號與下表一致。"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '容器 Container', '必要', `底色與描邊由 level 決定；圓角固定 100px，垂直內距 ${layout.paddingY}px`],
                ['2', 'Leading icon', '選用', `${layout.iconSize}px，顏色與文字相同；只放左側，右側不放 icon`],
                ['3', '文字 Label', '必要', 'Chip 語意的唯一承載者，不可省略'],
              ]}
              minWidth={560}
            />
          </section>

          {/* ── 4. Color ── */}
          <section className="section">
            <SectionTitle>Color</SectionTitle>

            <SpecTable
              headers={['Style', 'Level', '容器底色', '描邊', '文字與 icon']}
              rows={chipSpec.variants.map((v) => [
                cap(String(v.style)),
                v.level ? cap(String(v.level)) : '不吃 level',
                <Swatch key="bg" token={v.bg as string | null} />,
                <Swatch key="bd" token={v.border as string | null} />,
                <Swatch key="ct" token={v.content as string | null} />,
              ])}
              minWidth={560}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              文字與 icon 一律是 <code>{String(variantOf('filled', 'accent').content)}</code>，
              不隨 style 或 level 改變。顏色差異只在容器：filled 依 level 上底色，
              outlined 改為透明底加一圈 <code>{String(variantOf('outlined', 'accent').border)}</code>{' '}
              描邊，text 兩者都沒有。這也是 Configurations 可以直接切換 style 的原因——
              三種形狀本身都不帶顏色。
            </p>
          </section>

          {/* ── 5. States ── */}
          <section className="section">
            <SectionTitle>States</SectionTitle>

            <SpecTable
              headers={['狀態', '外觀', '互動']}
              rows={[
                ['Static', '依 level 呈現對應的底色與文字色，不隨互動改變', '不可點擊，元件不接受 onTap'],
                ['Hover / Pressed', '不適用', '—'],
                ['Disabled', '不適用', '—'],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              Chip 是靜態標籤，沒有互動狀態。需要可點擊的標籤時請改用{' '}
              <code>USpaceTab</code> 的 filter 或 input type，不要自行為 Chip 外包一層點擊區。
            </p>
          </section>

          {/* ── 6. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="chip-measurements" note="標出內距、圓角、icon 尺寸與間距的量測圖。" />

            <SpecTable
              headers={['項目', 'Regular', 'Small', 'Token']}
              rows={[
                ['高度', '貼合內容', '貼合內容', '—'],
                [
                  '水平內距（無 icon）',
                  `${layout.regularPaddingX}px`,
                  `${layout.smallPaddingX}px`,
                  <code key="p">USpaceSpacing.spacer{layout.regularPaddingX} / spacer{layout.smallPaddingX}</code>,
                ],
                [
                  '水平內距（有 icon）',
                  `左 ${layout.regularPaddingLeftWithIcon} / 右 ${layout.regularPaddingRightWithIcon}`,
                  `左 ${layout.smallPaddingLeftWithIcon} / 右 ${layout.smallPaddingRightWithIcon}`,
                  <code key="pi">部分無 token</code>,
                ],
                ['垂直內距', `${layout.paddingY}px`, `${layout.paddingY}px`, '—'],
                [
                  'icon 與文字間距',
                  `${layout.gap}px`,
                  `${layout.gap}px`,
                  <code key="g">USpaceSpacing.spacer{layout.gap}</code>,
                ],
                ['icon 尺寸', `${layout.iconSize}px`, `${layout.iconSize}px`, '—'],
                ['圓角', '100px', '100px', <code key="r">USpaceRadius.full</code>],
                [
                  '文字',
                  `${labelType.size}px / ${labelType.lineHeight}px Regular`,
                  `${smallType.size}px / ${smallType.lineHeight}px Semibold`,
                  <code key="t">{labelType.name} / 無 token</code>,
                ],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              垂直內距 {layout.paddingY}px 與 Small 有 icon 時的左內距{' '}
              {layout.smallPaddingLeftWithIcon}px 是 Figma 的元件特定值，spacing token 沒有這兩個級距，
              chip.dart 直接寫死。Small 的文字 {smallType.size}px / {smallType.lineHeight}px Semibold
              同樣沒有對應的 typography token。
            </p>
          </section>

          {/* ── 7. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <p className="text-md text-muted" style={{ margin: 0 }}>
              Chip 不可點擊，沒有觸控熱區。它的高度低於 44px 的觸控目標建議值，這也是它不該被
              當成按鈕使用的原因之一。
            </p>
          </section>

          {/* ── 8. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>純展示，不可點擊</strong>：Chip 用來顯示分類、狀態、標記，不具備互動行為。
                需要可互動的標籤時使用 <code>USpaceTab</code>（filter / input type）。
              </li>
              <li>
                <strong>先選形狀，再選顏色</strong>：Filled 用於需要被看到的標記，
                Outlined 用於已經有底色、再加底色會糊掉的區塊，Text 用於一整排標籤時
                減少視覺噪音。選了 filled 才需要決定 level：Accent 最搶眼，
                同一畫面不要出現多個；Primary 為預設；Secondary 用於輔助資訊。
              </li>
              <li>
                <strong>Small 用於資訊密集處</strong>：列表、卡片這類一次出現多個標籤的地方用
                Small，其餘情況用 Regular。同一個列表裡不要混用兩種 size。
              </li>
              <li>
                <strong>icon 只放左側</strong>：Chip 沒有 trailing icon。icon 是輔助，
                語意仍然由文字承載。
              </li>
            </ul>
          </section>

          {/* ── 9. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>Chip 不可點擊，讀屏軟體只會讀到文字內容，不會被當成按鈕朗讀。</li>
              <li>icon 為裝飾性元素，語意由文字承載，缺少文字時讀屏軟體無法傳達這個標籤的意義。</li>
              <li>
                Outlined 與 Text 都是透明底，文字對比度直接受背後的底色影響。放在深淺不一的背景上時需自行確認可讀性。
              </li>
              <li>
                Small 的文字為 {smallType.size}px，低於一般建議的最小字級。只用於資訊密集處，
                不要用它承載關鍵資訊。
              </li>
            </ul>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          <section className="section">
            <SectionTitle>Examples</SectionTitle>
            <div>
              <CodeBlock
                code={`USpaceChip(
  label: '充電中',
  level: USpaceChipLevel.accent,
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="加上 leading icon"
                code={`USpaceChip(
  label: '快充',
  level: USpaceChipLevel.secondary,
  leadingIcon: const Icon(Icons.bolt),
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="描邊與純文字：不需要傳 level"
                code={`USpaceChip(
  label: 'VIP',
  style: USpaceChipStyle.outlined,
  size: USpaceChipSize.small,
)

USpaceChip(
  label: '已結束',
  style: USpaceChipStyle.text,
)`}
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>API</SectionTitle>
            <div>
              <SpecTable
                headers={['參數', '型別', '預設', '說明']}
                rows={[
                  [<code key="a">label</code>, 'String', '必填', 'Chip 文字'],
                  [
                    <code key="b0">style</code>,
                    'USpaceChipStyle',
                    'filled',
                    '容器形狀：filled / outlined / text',
                  ],
                  [
                    <code key="b">level</code>,
                    'USpaceChipLevel',
                    'accent',
                    '容器底色，只在 style 為 filled 時生效',
                  ],
                  [
                    <code key="c">size</code>,
                    'USpaceChipSize',
                    'regular',
                    'regular 一般 / small 資訊密集處',
                  ],
                  [
                    <code key="d">leadingIcon</code>,
                    'Widget?',
                    'null',
                    `文字左側 icon，建議 ${layout.iconSize}×${layout.iconSize}`,
                  ],
                ]}
                minWidth={560}
              />
              <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
                沒有 <code>onTap</code>。Chip 不包 GestureDetector，這是刻意的設計。
              </p>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <p className="text-sm text-muted" style={{ margin: '0 0 16px' }}>
              此表由 <code>tokens/components/chip.json</code> 產生，
              並由 Flutter widget test 逐項驗證：改了對應卻沒改實作，CI 會擋下。
            </p>
            <SpecTable
              headers={['Style', 'Level', 'Background', 'Border', 'Content', '備註']}
              rows={chipSpec.variants.map((row) => [
                cap(String(row.style)),
                row.level ? cap(String(row.level)) : '—',
                row.bg ? <code>{String(row.bg)}</code> : <span>transparent</span>,
                row.border ? <code>{String(row.border)}</code> : <span>—</span>,
                row.content ? <code>{String(row.content)}</code> : <span>—</span>,
                row.note ? String(row.note) : '—',
              ])}
              minWidth={720}
            />
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>style 與 level 是兩個維度</strong>：level 只在 <code>filled</code> 時生效，
                <code>outlined</code> 與 <code>text</code> 傳任何 level 都不影響外觀，
                widget test 有對應斷言。2026-08-13 由使用者確認重整，原本 outline 混在 level 裡，
                且用的是品牌漸層；現在 outlined 改為中性色，並補上 text。Figma 尚無對應設計稿。
              </li>
              <li>
                <strong>Small</strong>：字體 {smallType.size}px / {smallType.lineHeight}px Semibold，
                TypographyExtension 中尚無此樣式，chip.dart 內 inline 定義。
              </li>
              <li>
                <strong>Leading icon</strong>：{layout.iconSize}×{layout.iconSize}，
                icon 色一律為 contentPrimary，不隨 level 改變。
              </li>
              <li>
                <strong>Surface</strong>：Figma 有 White / Gray surface 區分，不影響 chip 本身色值。
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
