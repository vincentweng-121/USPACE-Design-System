import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import DoDont from '../../components/DoDont';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import { semantic } from '../../tokens/colors';
import { typographyStyles } from '../../tokens/typography';
import { buttonSpec } from '../../tokens/componentSpecs';

type Style = 'accent' | 'charging' | 'primary' | 'secondary' | 'tertiary';
type Size = 'regular' | 'small';
type State = 'enabled' | 'disabled';

const styles = buttonSpec.dimensions.style as Style[];
const states = buttonSpec.dimensions.state as State[];
const layout = buttonSpec.layout! as Record<string, number>;

/** 按鈕文字使用的字體 token */
const labelType = typographyStyles
  .flatMap((f) => f.styles.map((s) => ({ ...s, family: f.family })))
  .find((s) => s.name === 'displayM')!;

/** 由 tokens/components/button.json 查出該 style × state 的 token 名稱 */
function variantOf(style: Style, state: State) {
  return buttonSpec.variants.find((v) => v.style === style && v.state === state)!;
}

/** token 名稱 → 實際色值 */
const colorOf = (token: string | null | undefined) =>
  token ? (semantic as Record<string, string>)[token] : undefined;

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

// ── 車輛 icon（Figma 使用 .24px/NormalCar）──
function CarIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 15.5v2a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-2m17 0v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-2M2.5 15.5h17V12l-1.6-4a1.5 1.5 0 0 0-1.4-1H7.5a1.5 1.5 0 0 0-1.4 1L4.5 12v3.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="13.5" r="1" fill={color} />
      <circle cx="15.5" cy="13.5" r="1" fill={color} />
    </svg>
  );
}

// ── 依 token 渲染的按鈕 ──
function ButtonPreview({
  label,
  style,
  size,
  state,
  leading = false,
  trailing = false,
}: {
  label: string;
  style: Style;
  size: Size;
  state: State;
  leading?: boolean;
  trailing?: boolean;
}) {
  const v = variantOf(style, state);
  const content = colorOf(v.content as string)!;
  const border = colorOf(v.border as string | null);

  return (
    <button
      disabled={state === 'disabled'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: layout.gap,
        height: layout.height,
        width: size === 'regular' ? '100%' : undefined,
        maxWidth: size === 'regular' ? 350 : undefined,
        padding: size === 'small' ? `0 ${layout.smallPaddingX}px` : 0,
        borderRadius: 1000,
        background: colorOf(v.bg as string | null) ?? 'transparent',
        border: border ? `2px solid ${border}` : '2px solid transparent',
        color: content,
        fontSize: labelType.size,
        lineHeight: `${labelType.lineHeight}px`,
        fontWeight: labelType.weight,
        fontFamily: '"PingFang TC", sans-serif',
        whiteSpace: 'nowrap',
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      }}
    >
      {leading && <CarIcon color={content} />}
      {label}
      {trailing && <CarIcon color={content} />}
    </button>
  );
}

// ── 編號圓圈 ──
function Badge({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: '1px solid var(--border-strong)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: 'var(--text-secondary)',
        background: 'var(--page-secondary)',
      }}
    >
      {n}
    </span>
  );
}

// ── 變體展示列 ──
function SpecimenRow({
  n,
  title,
  note,
  children,
}: {
  n: number;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        padding: n === 1 ? '8px 0 28px' : '28px 0',
      }}
    >
      <div style={{ marginTop: 2 }}>
        <Badge n={n} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="heading-sm" style={{ marginBottom: 2 }}>
          {title}
        </div>
        <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 16 }}>
          {note}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

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
          border: '1px solid var(--border-divider)',
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
        lead="按鈕觸發單一明確的行動。由 style、size、state 三個維度組合而成，文字左右兩側皆可放置 icon。"
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
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              5 種樣式代表不同的行動權重，由重到輕排列。同一個畫面裡權重最高的只該有一個。
            </p>

            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { style: 'accent' as Style, desc: '最高權重。畫面上最主要的那一個行動。' },
                { style: 'charging' as Style, desc: '充電相關流程專用，不作為一般強調色使用。' },
                { style: 'primary' as Style, desc: '一般操作。與 accent 同底色，靠文字色區分。' },
                { style: 'secondary' as Style, desc: '次要操作。透明底加描邊，保有邊界但不搶焦點。' },
                { style: 'tertiary' as Style, desc: '最低權重。純文字，適合取消、略過這類動作。' },
              ].map((v) => (
                <div
                  key={v.style}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    flexWrap: 'wrap',
                    padding: 24,
                    borderRadius: 12,
                    background: 'var(--page-secondary)',
                    border: '1px solid var(--border-divider)',
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <ButtonPreview label={cap(v.style)} style={v.style} size="small" state="enabled" />
                  </div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div className="heading-sm" style={{ marginBottom: 4 }}>
                      {cap(v.style)}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              基本樣式的三個維度。互動與狀態不在此處，見下方 States。
            </p>

            <div
              style={{
                padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)',
                borderRadius: 12,
                background: 'var(--page-secondary)',
                border: '1px solid var(--border-divider)',
              }}
            >
              <SpecimenRow n={1} title="Size" note="高度相同，Regular 滿寬、Small 貼合內容">
                <ButtonPreview label="Small" style="accent" size="small" state="enabled" />
                <ButtonPreview label="Regular" style="accent" size="regular" state="enabled" />
              </SpecimenRow>

              <SpecimenRow n={2} title="Style" note="5 種樣式，此列以 Small 呈現以便並排比較">
                {styles.map((st) => (
                  <ButtonPreview key={st} label={cap(st)} style={st} size="small" state="enabled" />
                ))}
              </SpecimenRow>


              <SpecimenRow n={3} title="Icon" note="文字左右兩側各自獨立，可任意組合">
                <ButtonPreview label="無 icon" style="accent" size="small" state="enabled" />
                <ButtonPreview label="左側" style="accent" size="small" state="enabled" leading />
                <ButtonPreview label="右側" style="accent" size="small" state="enabled" trailing />
                <ButtonPreview label="兩側" style="accent" size="small" state="enabled" leading trailing />
              </SpecimenRow>
            </div>
          </section>

          {/* ── 3. Tokens & specs ── */}
          <section className="section">
            <SectionTitle>Tokens &amp; specs</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              不隨 style 或 size 改變的共通規格。逐項細節見下方各區塊。
            </p>
            <SpecTable
              headers={['項目', '值', 'Token']}
              rows={[
                ['樣式數', `${styles.length} 種`, '—'],
                ['尺寸數', '2 種（Regular / Small）', '—'],
                ['狀態數', `${states.length} 種（尚無 pressed）`, '—'],
                ['高度', `${layout.height}px（固定）`, '—'],
                ['圓角', '1000px', <code key="r">USpaceRadius.full</code>],
                [
                  '文字',
                  `${labelType.family} ${labelType.size}px / ${labelType.lineHeight}px Medium`,
                  <code key="t">{labelType.name}</code>,
                ],
                ['icon 尺寸', `${layout.iconSize}px`, '—'],
                [
                  'icon 與文字間距',
                  `${layout.gap}px`,
                  <code key="g">USpaceSpacing.spacer{layout.gap}</code>,
                ],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              Figma 標示文字為 16px / 24px Medium 並帶 0.6px 字距。經確認採用既有的{' '}
              <code>{labelType.name}</code> token，因此實作為 {labelType.size}px /{' '}
              {labelType.lineHeight}px 且無字距。也因為行高變為 {labelType.lineHeight}，
              高度改以固定 {layout.height}px 置中，而非由垂直內距推算。
            </p>
          </section>

          {/* ── 4. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              按鈕由四個部件組成。除文字外，其餘皆為選用。
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'clamp(32px, 6vw, 64px) 24px',
                borderRadius: 12,
                background: 'var(--page-secondary)',
                border: '1px solid var(--border-divider)',
                marginBottom: 32,
              }}
            >
              {/* 站台部署在子路徑下，圖片必須帶 BASE_URL；檔名大小寫需與實際檔案一致 */}
              <img
                src={`${import.meta.env.BASE_URL}images/Anatomy-Button.png`}
                alt="按鈕的四個組成部件：容器、左側 icon、文字、右側 icon"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '容器 Container', '必要', '底色、描邊與圓角由 style 決定；高度固定 48'],
                ['2', 'Leading icon', '選用', `${layout.iconSize}px，顏色與文字相同`],
                ['3', '文字 Label', '必要', '按鈕語意的唯一承載者，不可省略'],
                ['4', 'Trailing icon', '選用', `${layout.iconSize}px，顏色與文字相同`],
              ]}
              minWidth={560}
            />
          </section>

          {/* ── 5. Color ── */}
          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              顏色只由 style 與 state 決定，不隨 size 改變。以下為亮色主題的值，
              暗色主題由同一組語意 token 自動切換。
            </p>

            {styles.map((st) => (
              <div key={st} style={{ marginBottom: 48 }}>
                <h3 className="heading-md" style={{ marginBottom: 16 }}>
                  {cap(st)}
                </h3>
                <SpecTable
                  headers={['元素', 'Enabled', 'Disabled']}
                  rows={(['bg', 'border', 'content'] as const).map((part) => [
                    part === 'bg' ? '容器底色' : part === 'border' ? '描邊' : '文字與 icon',
                    <Swatch key="e" token={variantOf(st, 'enabled')[part] as string | null} />,
                    <Swatch key="d" token={variantOf(st, 'disabled')[part] as string | null} />,
                  ])}
                  minWidth={560}
                />
                {variantOf(st, 'enabled').note && (
                  <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
                    {String(variantOf(st, 'enabled').note)}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* ── 6. States ── */}
          <section className="section">
            <SectionTitle>States</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              目前只定義 enabled 與 disabled 兩種狀態，Figma 尚無 pressed 規格。
            </p>

            <div
              style={{
                padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)',
                borderRadius: 12,
                background: 'var(--page-secondary)',
                border: '1px solid var(--border-divider)',
                marginBottom: 32,
              }}
            >
              {states.map((stt, i) => (
                <div
                  key={stt}
                  style={{
                    padding: i === 0 ? '8px 0 28px' : '28px 0',
                  }}
                >
                  <div className="heading-sm" style={{ marginBottom: 2 }}>
                    {cap(stt)}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-tertiary)', marginBottom: 16 }}
                  >
                    {stt === 'enabled' ? '可點擊，各 style 呈現自身配色' : '不可點擊，所有 style 收斂為同一組 disabled 配色'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {styles.map((st) => (
                      <ButtonPreview
                        key={st}
                        label={cap(st)}
                        style={st}
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
                ['Enabled', '依 style 呈現對應的底色、描邊與文字色', '可點擊，觸發 onPressed'],
                [
                  'Disabled',
                  '填色樣式改為 actionDisabledBg 底；secondary 描邊改為 actionDisabledBg；文字一律 actionDisabledContent',
                  '不可點擊，onPressed 不會被呼叫',
                ],
                ['Pressed', '尚未定義', '—'],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              傳入 <code>onPressed: null</code> 也會進入 disabled，與明確設定 <code>state</code>{' '}
              效果相同，兩者取聯集。
            </p>
          </section>

          {/* ── 7. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              兩種尺寸的差別只有寬度行為與水平內距，高度與其餘數值完全相同。
            </p>
            <SpecTable
              headers={['項目', 'Regular', 'Small', 'Token']}
              rows={[
                ['高度', `${layout.height}px`, `${layout.height}px`, '—'],
                ['寬度', '滿版', '貼合內容', '—'],
                [
                  '水平內距',
                  '0',
                  `${layout.smallPaddingX}px`,
                  <code key="p">USpaceSpacing.spacer{layout.smallPaddingX}</code>,
                ],
                [
                  'icon 與文字間距',
                  `${layout.gap}px`,
                  `${layout.gap}px`,
                  <code key="g">USpaceSpacing.spacer{layout.gap}</code>,
                ],
                ['icon 尺寸', `${layout.iconSize}px`, `${layout.iconSize}px`, '—'],
                ['圓角', '1000px', '1000px', <code key="r">USpaceRadius.full</code>],
                ['描邊寬度', '2px（僅 secondary）', '2px（僅 secondary）', '—'],
              ]}
              minWidth={620}
            />
          </section>

          {/* ── 8. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <div style={{ marginTop: 32 }}>
              <DoDont
                dos={[
                  '一個畫面只給一個 accent 按鈕，代表最主要的行動',
                  'charging 只用於充電相關流程，不要當成一般強調色',
                  'secondary 用於次要但仍需要邊界的操作，tertiary 用於低權重的文字動作',
                  'icon 只作輔助，按鈕語意仍以文字為主',
                ]}
                donts={[
                  '不要同時使用多個 accent 按鈕，權重會互相抵銷',
                  '不要只放 icon 不放文字，這個元件的文字是必填',
                  '不要用 tertiary 承載主要行動，它沒有底色與邊界',
                  '不要自行改變高度，兩種 size 之外的尺寸不在規範內',
                ]}
              />
            </div>
          </section>

          {/* ── 9. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul
              className="text-md text-muted"
              style={{ paddingLeft: 20, display: 'grid', gap: 10, marginTop: 32 }}
            >
              <li>固定高度 {layout.height}px，超過觸控目標最小 44px 的建議值。</li>
              <li>disabled 同時移除點擊行為，不會出現「看起來不能按卻按得下去」的狀況。</li>
              <li>icon 為裝飾性元素，語意由文字承載，讀屏軟體只會讀到 label。</li>
              <li>tertiary 沒有底色與描邊，放在複雜背景上時需自行確認對比度。</li>
            </ul>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          <section className="section">
            <SectionTitle>Examples</SectionTitle>
            <div style={{ marginTop: 32 }}>
              <CodeBlock
                code={`USpaceButton(
  label: '確認送出',
  style: USpaceButtonStyle.accent,
  size: USpaceButtonSize.regular,
  leadingIcon: const Icon(Icons.directions_car),
  onPressed: () {},
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="兩側 icon + 明確 disabled"
                code={`USpaceButton(
  label: '前往付款',
  style: USpaceButtonStyle.secondary,
  size: USpaceButtonSize.small,
  state: USpaceButtonState.disabled,
  leadingIcon: const Icon(Icons.directions_car),
  trailingIcon: const Icon(Icons.chevron_right),
  onPressed: () {},
)`}
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>API</SectionTitle>
            <div style={{ marginTop: 32 }}>
              <SpecTable
                headers={['參數', '型別', '預設', '說明']}
                rows={[
                  [<code key="a">label</code>, 'String', '必填', '按鈕文字'],
                  [<code key="b">style</code>, 'USpaceButtonStyle', 'accent', '5 種視覺樣式'],
                  [
                    <code key="c">size</code>,
                    'USpaceButtonSize',
                    'regular',
                    'regular 滿寬 / small 貼合內容',
                  ],
                  [<code key="d">state</code>, 'USpaceButtonState', 'enabled', 'disabled 時不可點擊'],
                  [<code key="e">leadingIcon</code>, 'Widget?', 'null', '文字左側 icon'],
                  [<code key="f">trailingIcon</code>, 'Widget?', 'null', '文字右側 icon'],
                  [<code key="g">onPressed</code>, 'VoidCallback?', 'null', 'null 時同樣視為 disabled'],
                ]}
                minWidth={560}
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <p className="text-sm text-muted" style={{ margin: '32px 0 16px' }}>
              此表由 <code>tokens/components/button.json</code> 產生，
              並由 Flutter widget test 逐項驗證：改了對應卻沒改實作，CI 會擋下。
            </p>
            <SpecTable
              headers={['Style', 'State', 'Background', 'Border', 'Content']}
              rows={buttonSpec.variants.map((row) => [
                String(row.style),
                String(row.state),
                row.bg ? <code>{String(row.bg)}</code> : <span>transparent</span>,
                row.border ? <code>{String(row.border)}</code> : <span>—</span>,
                <code key="c">{String(row.content)}</code>,
              ])}
              minWidth={620}
            />
          </section>
        </div>
      )}
    </div>
  );
}
