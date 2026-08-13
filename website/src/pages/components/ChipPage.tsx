import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  NumberedCaptions,
  Playground,
  PendingImage,
  Swatch,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { chipSpec } from '../../tokens/componentSpecs';
import { palette, gradients } from '../../tokens/colors';
import { colorOf, cap } from '../../utils';

type Level = 'accent' | 'primary' | 'secondary' | 'outline';
type Size = 'regular' | 'small';

const levels = chipSpec.dimensions.level as Level[];
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

/** 由 tokens/components/chip.json 查出該 level 的 token 名稱 */
const variantOf = (level: Level) => chipSpec.variants.find((v) => v.level === level)!;

// ── icon 佔位框 ──
/**
 * 虛線方框，代表「這裡放一個 icon」。與 Button 頁同一個理由：
 * 文件站不指定具體圖示，否則讀者會以為那是規範的一部分。
 */
function IconPlaceholder({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="1.33"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

/** Outline 的文字是品牌漸層，無對應 semantic token（見 chip.dart 的 ShaderMask） */
function GradientText({ children, size }: { children: string; size: Size }) {
  const t = size === 'regular' ? labelType : smallType;
  return (
    <span
      style={{
        background: gradients.limeLinear,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: t.size,
        lineHeight: `${t.lineHeight}px`,
        fontWeight: t.weight,
      }}
    >
      {children}
    </span>
  );
}

// ── 依 token 渲染的 Chip ──
function ChipPreview({
  label,
  level,
  size = 'regular',
  icon = false,
}: {
  label: string;
  level: Level;
  size?: Size;
  icon?: boolean;
}) {
  const v = variantOf(level);
  const isOutline = level === 'outline';
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

  const contentColor = isOutline
    ? palette.neonLime200
    : (colorOf(v.content as string) ?? 'var(--text-primary)');

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: icon ? layout.gap : 0,
        padding: `${layout.paddingY}px ${padRight}px ${layout.paddingY}px ${padLeft}px`,
        borderRadius: 100,
        background: isOutline ? 'transparent' : (colorOf(v.bg as string) ?? 'transparent'),
        border: isOutline ? `1px solid ${palette.neonLime200}` : '1px solid transparent',
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
      {isOutline ? <GradientText size={size}>{label}</GradientText> : label}
    </div>
  );
}

// ── Playground 的維度 ──
// 與 Button 頁同一條規則：Configurations 只講尺寸與元素配置。
// Level 不列入——Chip 四個 level 的差異就是顏色（accent 是螢光綠、outline 是品牌漸層），
// 顏色一律在 Color 區塊說明。預覽固定用中性的 secondary。
// icon 不是 token 維度（token 只管顏色），所以手寫。
const playgroundDimensions: PlaygroundDimension[] = [
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
        lead="Chip 是純展示的標籤，用來標記狀態或分類，本身不可點擊。視覺權重由 level 決定，共 accent、primary、secondary、outline 四種；加上 regular 與 small 兩種 size，並可在文字左側加一個 icon。"
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
              note="一張圖並排四個 level，圖上標號 1、2、3、4，對應下方說明。"
            />

            <NumberedCaptions
              items={[
                { name: 'Accent', desc: '最高視覺權重。螢光綠底，用於需要一眼看到的標記。' },
                { name: 'Primary', desc: '預設樣式。淺色底，適用於一般分類與狀態。' },
                { name: 'Secondary', desc: '次要資訊。灰底，存在感低於 Primary。' },
                { name: 'Outline', desc: '品牌標記。透明底加漸層邊框與漸層文字，專用於品牌相關內容。' },
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
                ['1', '容器 Container', '必要', `底色由 level 決定；圓角固定 100px，垂直內距 ${layout.paddingY}px`],
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
              headers={['Level', '容器底色', '文字與 icon']}
              rows={levels.map((lv) => {
                const v = variantOf(lv);
                return [
                  cap(lv),
                  <Swatch key="bg" token={v.bg as string | null} />,
                  <Swatch key="ct" token={v.content as string | null} />,
                ];
              })}
              minWidth={560}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              Outline 兩欄都是「—」，因為它沒有對應的 semantic token：底色為透明，邊框用{' '}
              <code>neonLime200</code>，文字用 <code>limeLinear</code> 漸層（neonLime200 →
              neonLime700）直接取自 palette。四個 level 的文字都是{' '}
              <code>{String(variantOf('accent').content)}</code>，顏色差異只在容器底色。
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
                <strong>四個 level 對應不同視覺權重</strong>：Accent 用於需要突出的標記，
                同一畫面不要出現多個；Primary 為預設；Secondary 用於輔助資訊；
                Outline 保留給品牌相關標記。
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
                Outline 的文字是漸層色，對比度會隨背景變化。放在深淺不一的背景上時需自行確認可讀性。
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
                title="列表裡的小尺寸標籤"
                code={`USpaceChip(
  label: 'VIP',
  level: USpaceChipLevel.outline,
  size: USpaceChipSize.small,
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
                  [<code key="b">level</code>, 'USpaceChipLevel', 'accent', '4 種視覺權重'],
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
              headers={['Level', 'Background', 'Content', '備註']}
              rows={chipSpec.variants.map((row) => [
                cap(String(row.level)),
                row.bg ? <code>{String(row.bg)}</code> : <span>transparent</span>,
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
                <strong>Outline</strong>：文字用 ShaderMask 套 <code>limeLinear</code> 漸層
                （neonLime200 → neonLime700），邊框為 neonLime200。兩者都直接取 palette，無 semantic token。
              </li>
              <li>
                <strong>Small</strong>：字體 {smallType.size}px / {smallType.lineHeight}px Semibold，
                TypographyExtension 中尚無此樣式，chip.dart 內 inline 定義。
              </li>
              <li>
                <strong>Leading icon</strong>：{layout.iconSize}×{layout.iconSize}，
                Outline 時 icon 色為 neonLime200，其餘為 contentPrimary。
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
