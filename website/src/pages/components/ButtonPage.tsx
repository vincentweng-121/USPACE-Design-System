import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { DoDontExamples, ExampleGrid } from '../../components/DoDont';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  AnatomyImage,
  IconPlaceholder,
  NumberedCaptions,
  Playground,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { buttonSpec } from '../../tokens/componentSpecs';
import { touch } from '../../tokens/scalars';
import { gradients } from '../../tokens/colors';
import { colorOf, cap } from '../../utils';

type Style = 'filled' | 'outlined';
type Size = 'regular' | 'small';
type State = 'enabled' | 'disabled';

const styles = buttonSpec.dimensions.style as Style[];
const states = buttonSpec.dimensions.state as State[];
const layout = buttonSpec.layout! as Record<string, number>;

const typeOf = (name: string) =>
  typographyStyles.flatMap((f) => f.styles).find((s) => s.name === name)!;
/** 一般字級；日文小一階 */
const labelType = typeOf('labelL');
const japaneseType = typeOf('labelM');

/** 由 tokens/components/button.json 查出該 style × state 的 token 名稱 */
const variantOf = (style: Style, state: State) =>
  buttonSpec.variants.find((v) => v.style === style && v.state === state)!;

// ── 依 token 渲染的按鈕 ──
function ButtonPreview({
  label,
  style,
  size,
  state,
  japanese = false,
  leading = false,
  trailing = false,
}: {
  label: string;
  style: Style;
  size: Size;
  state: State;
  /** 日文用小一階的字級 */
  japanese?: boolean;
  leading?: boolean;
  trailing?: boolean;
}) {
  const v = variantOf(style, state);
  const content = colorOf(v.content as string)!;
  const isSmall = size === 'small';
  const type = japanese ? japaneseType : labelType;

  return (
    <button
      disabled={state === 'disabled'}
      // 漸層描邊交給 .gradient-border 的 ::before 用 mask 畫。
      // 不能用 border-image——它會讓 border-radius 失效，按鈕會變成方角。
      className={v.borderGradient ? 'gradient-border' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: layout.gap,
        height: isSmall ? layout.smallHeight : layout.height,
        width: isSmall ? undefined : '100%',
        minWidth: isSmall ? layout.smallMinWidth : undefined,
        maxWidth: isSmall ? undefined : 350,
        padding: `0 ${layout.paddingX}px`,
        borderRadius: 1000,
        background: colorOf(v.bg as string | null) ?? 'transparent',
        border: 'none',
        ...(v.borderGradient
          ? ({
              '--gradient-border': (gradients as Record<string, string>)[
                v.borderGradient as string
              ],
              '--gradient-border-width': '3px',
              // disabled 時整條描邊變淡，與 widget 的 borderOpacity 一致
              '--gradient-border-opacity': String(v.borderOpacity ?? 1),
            } as React.CSSProperties)
          : {}),
        color: content,
        fontSize: type.size,
        lineHeight: `${type.lineHeight}px`,
        fontWeight: type.weight,
        fontFamily: '"PingFang TC", sans-serif',
        whiteSpace: 'nowrap',
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
        boxSizing: 'border-box',
      }}
    >
      {leading && <IconPlaceholder color={content} size={layout.iconSize} />}
      {label}
      {trailing && <IconPlaceholder color={content} size={layout.iconSize} />}
    </button>
  );
}

// ── Playground 的維度 ──
// icon 不是 token 維度（token 只管顏色），所以手寫。
// style 兩種解出來都是灰階，沒有非中性色，可以放進 Configurations。
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
      { value: 'trailing', label: 'Trailing' },
    ],
  },
];

// ── 色票方塊 ──
function Swatch({ token }: { token: string | null }) {
  if (!token) return <span style={{ color: 'var(--text-tertiary)' }}>—</span>;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          flexShrink: 0,
          background: colorOf(token),
          boxShadow: 'var(--shadow-card)',
        }}
      />
      <code>{token}</code>
    </span>
  );
}

export default function ButtonPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Button"
        lead="按鈕觸發單一明確的行動。樣式只有 filled 與 outlined 兩種：一個畫面上最主要的行動用 filled，其餘用 outlined。加上 size 與 state 共三個維度，icon 可放在文字左側或右側，擇一。文字為 16/24，日文自動改用小一階的 14/20。"
        meta={
          <>
            <span>
              來源 <code>{buttonSpec.source}</code>
            </span>
            <span>
              Figma <code>{buttonSpec.figmaNode}</code>
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
              image="button-variant"
              alt="兩種按鈕樣式：實心深底的 Filled 與透明底加漸層描邊的 Outlined"
            />

            <NumberedCaptions
              items={[
                { name: 'Filled', desc: '實心深底，一個畫面只給一顆。' },
                { name: 'Outlined', desc: '透明底加漸層描邊，其餘行動用它。' },
              ]}
            />
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>

            <Playground
              name="button"
              dimensions={playgroundDimensions}
              render={(v) => (
                <ButtonPreview
                  label="Label"
                  style={v.style as Style}
                  size={v.size as Size}
                  state="enabled"
                  leading={v.icon === 'leading'}
                  trailing={v.icon === 'trailing'}
                />
              )}
            />
          </section>

          {/* ── 4. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <AnatomyImage
              image="button-anatomy"
              alt="按鈕的四個組成部件：容器、左側 icon、文字、右側 icon"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '容器 Container', '必要', '底色與圓角由 level 決定；三個層級皆無描邊，高度固定 48'],
                ['2', 'Leading icon', '選用', `${layout.iconSize}px，顏色與文字相同`],
                ['3', '文字 Label', '必要', '按鈕語意的唯一承載者，不可省略'],
                ['4', 'Trailing icon', '選用', `${layout.iconSize}px，顏色與文字相同；與 Leading 擇一，不同時出現`],
              ]}
              minWidth={560}
            />
          </section>

          {/* ── 5. Color ── */}
          <section className="section">
            <SectionTitle>Color</SectionTitle>

            <SpecTable
              headers={['Style', 'State', '容器底色', '描邊', '文字與 icon']}
              rows={buttonSpec.variants.map((v) => [
                cap(String(v.style)),
                String(v.state),
                <Swatch key="bg" token={v.bg as string | null} />,
                v.borderGradient ? <code>{String(v.borderGradient)}</code> : <span>—</span>,
                <Swatch key="ct" token={v.content as string | null} />,
              ])}
              minWidth={620}
            />
            <p className="note" style={{marginTop: 10}}>
              Filled 的 disabled 換底色，Outlined 把描邊降到 30% 透明度，兩者的文字都換成停用色。
            </p>
          </section>

          {/* ── 6. States ── */}
          <section className="section">
            <SectionTitle>States</SectionTitle>

            {/* enabled 與 disabled 左右並排，水平與垂直都置中；窄螢幕才換行。
                minHeight 288 是原本自動高度（約 144）的兩倍 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                minHeight: 288,
                gap: 96,
                padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)',
                borderRadius: 12,
                background: 'var(--page-secondary)',
                boxShadow: 'var(--shadow-card)',
                marginBottom: 32,
              }}
            >
              {states.map((stt) => (
                <div key={stt} style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
                  <div className="heading-sm">{cap(stt)}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                    {styles.map((s) => (
                      <ButtonPreview
                        key={s}
                        label={cap(s)}
                        style={s}
                        size="small"
                        state={stt}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <SpecTable
              headers={['狀態', '外觀', '互動']}
              rows={[
                ['Enabled', 'Filled 為 actionPrimaryBg 底；Outlined 為透明底加漸層描邊', '可點擊，觸發 onPressed'],
                [
                  'Disabled',
                  'Filled 換成 actionDisabledBg 底；Outlined 維持透明底與描邊，只把文字改為 actionDisabledContent',
                  '不可點擊，onPressed 不會被呼叫',
                ],
                ['Pressed', '尚未定義', '—'],
              ]}
              minWidth={620}
            />
          </section>

          {/* ── 7. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <AnatomyImage
              image="button-measurements"
              alt="Regular 與 Small 兩種尺寸的按鈕量測標示"
            />

            <SpecTable
              headers={['項目', 'Regular', 'Small', 'Token']}
              rows={[
                ['高度', `${layout.height}px`, `${layout.smallHeight}px`, '—'],
                ['寬度', '滿版', `貼合內容，最小 ${layout.smallMinWidth}px`, '—'],
                [
                  '水平內距',
                  `${layout.paddingX}px`,
                  `${layout.paddingX}px`,
                  <code key="p">USpaceSpacing.spacer{layout.paddingX}</code>,
                ],
                [
                  'icon 與文字間距',
                  `${layout.gap}px`,
                  `${layout.gap}px`,
                  <code key="g">USpaceSpacing.spacer{layout.gap}</code>,
                ],
                ['icon 尺寸', `${layout.iconSize}px`, `${layout.iconSize}px`, '—'],
                ['圓角', 'full', 'full', <code key="r">USpaceRadius.full</code>],
                ['描邊（僅 outlined）', '3px', '3px', '—'],
                [
                  '文字',
                  `${labelType.size}px / ${labelType.lineHeight}px`,
                  `${labelType.size}px / ${labelType.lineHeight}px`,
                  <code key="t">{labelType.name}</code>,
                ],
                [
                  '文字（日文）',
                  `${japaneseType.size}px / ${japaneseType.lineHeight}px`,
                  `${japaneseType.size}px / ${japaneseType.lineHeight}px`,
                  <code key="tj">{japaneseType.name}</code>,
                ],
              ]}
              minWidth={620}
            />
            <p className="note" style={{marginTop: 16}}>
              Small 的寬度貼合內容，但不會小於 {layout.smallMinWidth}px——一排短標籤的按鈕
              才不會參差不齊；內容比這個寬時就往外長。日文的字級小一階，由元件讀 App 的語系
              自動切換，兩種 size 都適用。Outlined 的描邊是{' '}
              <code>silverLinear</code> 漸層，寬度量自 Figma 的 2 倍匯出圖。
            </p>
          </section>

          {/* ── 8. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <AnatomyImage
              image="button-toucharea"
              alt="按鈕的觸控熱區範圍，與容器可視邊界一致"
            />
          </section>

          {/* ── 9. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            {/* 組與組之間也拉開一倍，免得三組 Do/Don't 黏成一片 */}
            <div style={{ display: 'grid', gap: 64 }}>
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case1',
                    alt: '主要行動用 filled、次要行動用 outlined 的按鈕組合範例',
                    caption: '主要行動用 filled，次要用 outlined。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case1',
                    alt: '兩個按鈕都使用 filled 樣式的錯誤範例',
                    caption: '兩個都用 filled，分不出主要行動。',
                  },
                ]}
              />
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case2',
                    alt: '只在文字左側放一個 icon 的按鈕',
                    caption: 'icon 只放單側，視線仍落在文字上。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case2',
                    alt: '文字左右兩側都放 icon 的按鈕',
                    caption: '兩側都放會把文字夾在中間，看不出重點。',
                  },
                ]}
              />
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case3',
                    alt: 'icon 搭配文字的按鈕',
                    caption: 'icon 一律搭配文字，語意由文字承載。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case3',
                    alt: '只有 icon 沒有文字的按鈕',
                    caption: '只放 icon，讀屏軟體讀不出用途。',
                  },
                ]}
              />
            </div>
          </section>

          {/* ── 10. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul className="note-list" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>固定高度 {layout.height}px，超過觸控目標最小 {touch.minTarget}px 的建議值。</li>
              <li>disabled 同時移除點擊行為，不會出現「看起來不能按卻按得下去」的狀況。</li>
              <li>icon 為裝飾性元素，語意由文字承載，讀屏軟體只會讀到 label。</li>
              <li>tertiary 的淺灰底與頁面背景相近，放在深淺不一的背景上時需自行確認邊界是否可辨。</li>
            </ul>
          </section>

          {/* ── 11. Edge cases（本頁專屬，接在必要區塊之後）── */}
          <section className="section">
            <SectionTitle>Edge cases</SectionTitle>

            {/* 版面與圖說完全沿用 Usage 的圖例格線，只是不畫勾叉記號 */}
            <ExampleGrid
              items={[
                {
                  image: 'button-edge-case1',
                  alt: '停車位列表中，已被預約的那一列整列淡化且按鈕為 disabled，可預約的那一列維持深色可按',
                  caption: '不可選時整列一起淡化，不是只停用按鈕。',
                },
                {
                  image: 'button-edge-case2',
                  alt: '標籤文字過長的按鈕，文字在單行內截斷並以刪節號結尾',
                  caption: '過長的標籤單行截斷，不換行也不撐高按鈕。',
                },
              ]}
            />
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          <section className="section">
            <SectionTitle>Examples</SectionTitle>
            <div>
              <CodeBlock
                code={`USpaceButton(
  label: '確認送出',
  style: USpaceButtonStyle.filled,
  size: USpaceButtonSize.regular,
  leadingIcon: const Icon(Icons.directions_car),
  onPressed: () {},
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="次要行動用 outlined"
                code={`USpaceButton(
  label: '再看看',
  style: USpaceButtonStyle.outlined,
  onPressed: () {},
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="單側 icon + 明確 disabled"
                code={`USpaceButton(
  label: '前往付款',
  style: USpaceButtonStyle.outlined,
  size: USpaceButtonSize.small,
  state: USpaceButtonState.disabled,
  trailingIcon: const Icon(Icons.chevron_right),
  onPressed: () {},
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
                  [<code key="a">label</code>, 'String', '必填', '按鈕文字'],
                  [
                    <code key="b">style</code>,
                    'USpaceButtonStyle',
                    'filled',
                    'filled 實心 / outlined 透明底加漸層描邊',
                  ],
                  [
                    <code key="c">size</code>,
                    'USpaceButtonSize',
                    'regular',
                    `regular 滿寬高 ${layout.height} / small 高 ${layout.smallHeight}、貼合內容但不小於 ${layout.smallMinWidth}`,
                  ],
                  [<code key="d">state</code>, 'USpaceButtonState', 'enabled', 'disabled 時不可點擊'],
                  [<code key="e">leadingIcon</code>, 'Widget?', 'null', '文字左側 icon'],
                  [<code key="f">trailingIcon</code>, 'Widget?', 'null', '文字右側 icon'],
                  [<code key="g">onPressed</code>, 'VoidCallback?', 'null', 'null 時同樣視為 disabled'],
                ]}
                minWidth={560}
              />
              <p className="note" style={{marginTop: 16}}>
                沒有語系參數。文字為 <code>{labelType.name}</code>（{labelType.size}/
                {labelType.lineHeight}），元件自己讀 App 的語系，是日文就換成小一階的{' '}
                <code>{japaneseType.name}</code>（{japaneseType.size}/{japaneseType.lineHeight}），
                呼叫端不需要處理。
              </p>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <p className="note" style={{ margin: '0 0 16px' }}>
              此表由 <code>tokens/components/button.json</code> 產生，
              並由 Flutter widget test 逐項驗證：改了對應卻沒改實作，CI 會擋下。
            </p>
            <SpecTable
              headers={['Style', 'State', 'Background', 'Border', 'Content']}
              rows={buttonSpec.variants.map((row) => [
                String(row.style),
                String(row.state),
                row.bg ? <code>{String(row.bg)}</code> : <span>transparent</span>,
                row.borderGradient ? <code>{String(row.borderGradient)}</code> : <span>—</span>,
                <code key="c">{String(row.content)}</code>,
              ])}
              minWidth={720}
            />
          </section>
        </div>
      )}
    </div>
  );
}
