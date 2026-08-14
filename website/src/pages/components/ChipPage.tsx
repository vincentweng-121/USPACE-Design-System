import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  AnatomyImage,
  IconPlaceholder,
  NumberedCaptions,
  Playground,
  Swatch,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { chipSpec } from '../../tokens/componentSpecs';
import { touch } from '../../tokens/scalars';
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
  trailing = false,
}: {
  label: string;
  style: Style;
  level?: Level;
  size?: Size;
  icon?: boolean;
  trailing?: boolean;
}) {
  const v = variantOf(style, level);
  const isRegular = size === 'regular';
  const t = isRegular ? labelType : smallType;

  // small 兩側都沒有 icon 版本，widget 也會忽略傳進來的 icon，這裡跟著一致
  const showsIcon = icon && isRegular;
  const showsTrailing = trailing && isRegular;
  const padLeft = showsIcon
    ? layout.regularPaddingLeftWithIcon
    : isRegular
      ? layout.regularPaddingX
      : layout.smallPaddingX;
  const padRight = showsTrailing
    ? layout.regularPaddingWithTrailingIcon
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
        gap: showsIcon || showsTrailing ? layout.gap : 0,
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
      {showsIcon && <IconPlaceholder color={contentColor} size={layout.iconSize} />}
      {label}
      {showsTrailing && <IconPlaceholder color={contentColor} size={layout.iconSize} />}
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
    // small 兩側都不支援 icon，Figma 只畫了 regular 的 icon 版本。
    // 停用而不是隱藏，讀者才看得出這個選項存在、只是這個尺寸下不適用；
    // 選項文字不再重複寫「Small 不適用」——停用狀態本身就講清楚了。
    options: [
      { value: 'none', label: 'None' },
      { value: 'leading', label: 'Leading' },
      { value: 'trailing', label: 'Trailing' },
      { value: 'both', label: 'Both' },
    ],
    disabled: (v) => v.icon !== 'none' && v.size === 'small',
  },
];

export default function ChipPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Chip"
        lead="Chip 用來標記狀態、分類，或作為同一頁面內的篩選條件。傳入 onTap 就可以點擊，不傳則是純展示標籤。形狀由 style 決定，共 filled、outlined、text 三種；filled 再由 level 決定底色，共 accent、primary、secondary 三級。加上 regular 與 small 兩種 size，文字左右各可放一個 icon。"
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
            <AnatomyImage
              image="chip-variant"
              alt="三種 Chip 形狀由重到輕：灰底的 Filled、透明底加描邊的 Outlined、無底無框的 Text"
            />

            <NumberedCaptions
              items={[
                { name: 'Filled', desc: '實心底色，存在感最強。底色由 level 決定。' },
                { name: 'Outlined', desc: '透明底加一圈中性色描邊。適合放在已經有底色的區塊上。' },
                { name: 'Text', desc: '無底無框，只有文字。存在感最低，內距與 filled 相同。' },
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
                  icon={v.icon === 'leading' || v.icon === 'both'}
                  trailing={v.icon === 'trailing' || v.icon === 'both'}
                />
              )}
            />
          </section>

          {/* ── 3. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <AnatomyImage
              image="chip-anatomy"
              alt="Chip 的三個部件：容器、左側 icon 佔位框、文字，圖上分別標號 1、2、3"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '容器 Container', '必要', `底色與描邊由 level 決定；圓角固定 100px，垂直內距 ${layout.paddingY}px`],
                ['2', 'Leading icon', '選用', `${layout.iconSize}px，顏色與文字相同，僅 regular 支援。可放 icon 或圖示`],
                ['3', '文字 Label', '必要', 'Chip 語意的唯一承載者，不可省略'],
                ['4', 'Trailing icon', '選用', `${layout.iconSize}px，僅 regular 支援。X 用於移除、下箭頭用於展開更多選項`],
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
                ['純展示（不傳 onTap）', '依 style 與 level 呈現，不隨互動改變', '不可點擊，不包 GestureDetector'],
                ['Small', '只作為內容標籤', '慣例上不可點擊'],
                ['可點擊（傳 onTap）', '外觀與純展示完全相同', `可點擊，觸控熱區垂直外擴至 ${touch.minTarget}px`],
                ['選中 / 未選中', '目前用 style 與 level 表達，沒有獨立的選中狀態', '由呼叫端切換'],
                ['Hover / Pressed', '尚未定義', '—'],
                ['Hover / Pressed', '不適用', '—'],
                ['Disabled', '不適用', '—'],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              可點擊與純展示的外觀完全一樣，差別只在有沒有傳 <code>onTap</code>。
              目前沒有獨立的「選中」狀態——篩選條件被選取時，由呼叫端切換 style 或 level
              來表達（例如未選用 outlined、選中改 filled）。Figma 尚未畫選中狀態，
              等設計稿產出後再補成正式的維度。
            </p>
          </section>

          {/* ── 6. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <AnatomyImage
              image="chip-measurements"
              alt="上方為 Small 的高度 16 與左右內距 8，下方為 Regular 有 icon 時的高度 22、左內距 8、icon 20、間距 2、右內距 12"
            />

            <SpecTable
              headers={['項目', 'Regular', 'Small', 'Token']}
              rows={[
                [
                  '高度',
                  `${layout.heightRegular}px`,
                  `${layout.heightSmall}px`,
                  '—',
                ],
                [
                  '水平內距（無 icon）',
                  `${layout.regularPaddingX}px`,
                  `${layout.smallPaddingX}px`,
                  <code key="p">USpaceSpacing.spacer{layout.regularPaddingX} / spacer{layout.smallPaddingX}</code>,
                ],
                [
                  '水平內距（有 leading icon）',
                  `左 ${layout.regularPaddingLeftWithIcon} / 右 ${layout.regularPaddingRightWithIcon}`,
                  '不適用（無 icon 版本）',
                  <code key="pi">USpaceSpacing.spacer{layout.regularPaddingLeftWithIcon} / spacer{layout.regularPaddingRightWithIcon}</code>,
                ],
                [
                  '水平內距（有 trailing icon）',
                  `左 ${layout.regularPaddingX} / 右 ${layout.regularPaddingWithTrailingIcon}`,
                  '不適用（無 icon 版本）',
                  <code key="pt">USpaceSpacing.spacer{layout.regularPaddingX} / spacer{layout.regularPaddingWithTrailingIcon}</code>,
                ],
                [
                  '觸控熱區（傳 onTap 時）',
                  `高 ${touch.minTarget}px`,
                  `高 ${touch.minTarget}px`,
                  '—',
                ],
                ['垂直內距', `${layout.paddingY}px`, `${layout.paddingY}px`, '—'],
                [
                  'icon 與文字間距',
                  `${layout.gap}px`,
                  '不適用',
                  <code key="g">USpaceSpacing.spacer{layout.gap}</code>,
                ],
                ['icon 尺寸', `${layout.iconSize}px`, '不適用', '—'],
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
              Small 兩側都不支援 icon，因此沒有「有 icon」的內距——widget 收到也會忽略。
              Trailing 側的內距 {layout.regularPaddingWithTrailingIcon} 是 leading 規則的鏡像推導，
              Figma 尚未畫 trailing 版本，待設計稿產出後校對。垂直內距 {layout.paddingY}px 是 Figma 的元件特定值，spacing token 沒有
              這個級距，chip.dart 直接寫死。Small 的文字 {smallType.size}px /{' '}
              {smallType.lineHeight}px Semibold 同樣沒有對應的 typography token。
            </p>
          </section>

          {/* ── 7. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <p className="text-md text-muted" style={{ margin: 0 }}>
              純展示的 Chip 沒有觸控熱區。傳了 <code>onTap</code> 之後，熱區會垂直外擴到{' '}
              {touch.minTarget}px——Regular 視覺上只有 {layout.heightRegular}px、Small
              只有 {layout.heightSmall}px，遠低於觸控目標建議值，不外擴會很難點。
              視覺高度不變，但可點擊的 Chip 在版面上會佔 {touch.minTarget}px 高，
              與純展示的 Chip 並排時要留意對齊。
            </p>
          </section>

          {/* ── 8. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>什麼時候用 Chip、什麼時候用 Tab</strong>：Chip 是
                <strong>同一個頁面內的篩選條件，可以複選</strong>——選了之後畫面上的內容被篩選，
                但還在同一頁。<code>USpaceTab</code> 的 filter 是
                <strong>點擊後切換分頁，因此只能單選</strong>。
                要「選了以後換一頁」用 Tab，要「在同一頁疊加條件」用 Chip。
              </li>
              <li>
                <strong>Small 只作為內容標籤</strong>：慣例上不可點擊，用於列表、卡片這類
                一次出現多個標籤的地方。要做可點擊的篩選條件一律用 Regular——Small 兩側
                不支援 icon，也放不下移除用的 X。
              </li>
              <li>
                <strong>右側 icon 表達可以對這個標籤做的事</strong>：X 用於移除已套用的條件，
                下箭頭用於展開更多選項。沒有動作就不要放右側 icon——它會讓人以為可以點。
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
              <li>
                純展示的 Chip 讀屏軟體只會讀到文字，不會被當成按鈕朗讀；傳了{' '}
                <code>onTap</code> 之後才是可操作的元素。
              </li>
              <li>
                可點擊時熱區垂直外擴到 {touch.minTarget}px，達到觸控目標建議值。
                右側的 X 沒有自己的獨立熱區——點整顆 Chip 都會觸發 <code>onTap</code>，
                需要「點 X 才移除、點本體是別的行為」時，這個元件目前做不到。
              </li>
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
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="可移除的篩選條件：右側放 X"
                code={`USpaceChip(
  label: '快充',
  style: USpaceChipStyle.filled,
  level: USpaceChipLevel.secondary,
  trailingIcon: const Icon(Icons.close),
  onTap: () => removeFilter('fast-charge'),
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="選中與未選中：目前用 style 表達"
                code={`// Figma 尚未定義選中狀態，先由呼叫端切換 style
USpaceChip(
  label: '有空位',
  style: isSelected
      ? USpaceChipStyle.filled
      : USpaceChipStyle.outlined,
  level: USpaceChipLevel.secondary,
  trailingIcon: const Icon(Icons.expand_more),
  onTap: () => toggleFilter('available'),
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
                    `文字左側 icon 或圖示，建議 ${layout.iconSize}×${layout.iconSize}，僅 regular 支援`,
                  ],
                  [
                    <code key="d2">trailingIcon</code>,
                    'Widget?',
                    'null',
                    ' 文字右側 icon，例如移除用的 X 或展開用的下箭頭，僅 regular 支援',
                  ],
                  [
                    <code key="d3">onTap</code>,
                    'VoidCallback?',
                    'null',
                    `傳了才可點擊，熱區垂直外擴至 ${touch.minTarget}px；不傳則是純展示標籤`,
                  ],
                ]}
                minWidth={560}
              />
              <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
                不傳 <code>onTap</code> 時完全不包 GestureDetector，維持純展示標籤的行為；
                版面上也不會佔用外擴的 {touch.minTarget}px。
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
                <strong>small 沒有 leading icon</strong>：Figma 的元件只畫了 regular 的 icon 版本。
                widget 收到 <code>leadingIcon</code> 但 size 為 small 時會直接忽略，
                文件站的 Configurations 也會把這個組合停用，兩邊行為一致。
              </li>
              <li>
                <strong>可點擊是 2026-08-14 新增的</strong>：Chip 原本明確不可點擊。開放之後
                與 <code>USpaceTab</code> 的分界為——Chip 是同一頁面內的篩選條件、可複選；
                Tab 點擊後切換分頁、只能單選。Figma 的 Chip 元件目前只有 Leading Icon /
                Size / Surface / Level 四個維度，沒有畫 trailing icon，也沒有點擊或選中狀態，
                因此 trailing 的內距是 leading 規則的鏡像推導，待設計稿產出後校對。
              </li>
              <li>
                <strong>整顆 Chip 共用一個熱區</strong>：右側的 X 沒有自己的 onTap。
                需要「點 X 移除、點本體做別的事」時，這個元件目前做不到。
              </li>
              <li>
                <strong>style 與 level 是兩個維度</strong>：level 只在 <code>filled</code> 時生效，
                <code>outlined</code> 與 <code>text</code> 傳任何 level 都不影響外觀，
                widget test 有對應斷言。2026-08-13 由使用者確認重整，原本 outline 混在 level 裡，
                且用的是品牌漸層；現在 outlined 改為中性色，並補上 text。outlined 的描邊色
                已比對 Figma node 3808:9321 確認為 <code>contentSecondary</code>。
              </li>
              <li>
                <strong>Small</strong>：字體 {smallType.size}px / {smallType.lineHeight}px Semibold，
                TypographyExtension 中尚無此樣式，chip.dart 內 inline 定義。
              </li>
              <li>
                <strong>Leading icon</strong>：{layout.iconSize}×{layout.iconSize}，僅 regular 支援，
                icon 色一律為 contentPrimary，不隨 style 或 level 改變。
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
