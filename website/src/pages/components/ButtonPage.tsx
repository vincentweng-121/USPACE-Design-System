import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import DoDont, { DoDontExamples } from '../../components/DoDont';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import { AnatomyImage } from '../../components/spec';
import { semantic } from '../../tokens/colors';
import { typographyStyles } from '../../tokens/typography';
import { buttonSpec } from '../../tokens/componentSpecs';

type Style = 'primary' | 'secondary' | 'tertiary';
type Emphasis = 'none' | 'accent' | 'charging';
type Size = 'regular' | 'small';
type State = 'enabled' | 'disabled';

const styles = buttonSpec.dimensions.style as Style[];
const emphases = buttonSpec.dimensions.emphasis as Emphasis[];
const states = buttonSpec.dimensions.state as State[];
const layout = buttonSpec.layout! as Record<string, number>;

/** 按鈕文字使用的字體 token */
const labelType = typographyStyles
  .flatMap((f) => f.styles.map((s) => ({ ...s, family: f.family })))
  .find((s) => s.name === 'displayM')!;

/** 由 tokens/components/button.json 查出該 style × emphasis × state 的 token 名稱 */
function variantOf(style: Style, state: State, emphasis: Emphasis = 'none') {
  return buttonSpec.variants.find(
    (v) => v.style === style && v.state === state && v.emphasis === emphasis,
  )!;
}

/** emphasis 只對 primary 生效，其餘層級一律用 none 那筆 */
const emphasisOf = (style: Style, emphasis: Emphasis) =>
  style === 'primary' ? emphasis : 'none';

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
  emphasis = 'none',
  leading = false,
  trailing = false,
}: {
  label: string;
  style: Style;
  size: Size;
  state: State;
  emphasis?: Emphasis;
  leading?: boolean;
  trailing?: boolean;
}) {
  const v = variantOf(style, state, emphasisOf(style, emphasis));
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
        lead="按鈕觸發單一明確的行動。權重由 style 決定，共 primary、secondary、tertiary 三級；primary 可再用 emphasis 切換文字色做更強的強調。加上 size 與 state 共四個維度，文字左右兩側皆可放置 icon。"
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
              3 種樣式代表不同的行動權重，由重到輕排列。同一個畫面裡權重最高的只該有一個。
              文字色的變化屬於 emphasis，不是另一個權重層級，見下方 Configurations。
            </p>
            <AnatomyImage
              file="button-variant.png"
              alt="三種按鈕權重由重到輕：深底的 Primary、中灰底的 Secondary、淺灰底的 Tertiary"
            />

            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { style: 'primary' as Style, desc: '最高權重。畫面上最主要的那一個行動，實心底色。' },
                { style: 'secondary' as Style, desc: '次要操作。實心中灰底，存在感低於 primary。' },
                { style: 'tertiary' as Style, desc: '最低權重。實心淺灰底，適合取消、略過這類動作。' },
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
              基本樣式的四個維度。互動與狀態不在此處，見下方 States。
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
                <ButtonPreview label="Small" style="primary" size="small" state="enabled" />
                <ButtonPreview label="Regular" style="primary" size="regular" state="enabled" />
              </SpecimenRow>

              <SpecimenRow n={2} title="Style" note="3 種權重，此列以 Small 呈現以便並排比較">
                {styles.map((st) => (
                  <ButtonPreview key={st} label={cap(st)} style={st} size="small" state="enabled" />
                ))}
              </SpecimenRow>

              <SpecimenRow
                n={3}
                title="Emphasis"
                note="只改 primary 的文字色，底色與權重不變；secondary / tertiary 不受影響"
              >
                {emphases.map((em) => (
                  <ButtonPreview
                    key={em}
                    label={cap(em)}
                    style="primary"
                    size="small"
                    state="enabled"
                    emphasis={em}
                  />
                ))}
              </SpecimenRow>

              <SpecimenRow n={4} title="Icon" note="文字左右兩側各自獨立，可任意組合">
                <ButtonPreview label="無 icon" style="primary" size="small" state="enabled" />
                <ButtonPreview label="左側" style="primary" size="small" state="enabled" leading />
                <ButtonPreview label="右側" style="primary" size="small" state="enabled" trailing />
                <ButtonPreview label="兩側" style="primary" size="small" state="enabled" leading trailing />
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
                ['樣式數', `${styles.length} 種（Primary / Secondary / Tertiary）`, '—'],
                ['強調層級', `${emphases.length} 種（僅 Primary 適用）`, '—'],
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
            <AnatomyImage
              file="button-anatomy.png"
              alt="按鈕的四個組成部件：容器、左側 icon、文字、右側 icon"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '容器 Container', '必要', '底色與圓角由 style 決定；三個層級皆無描邊，高度固定 48'],
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
              顏色由 style 與 state 決定，不隨 size 改變。三個層級都是實心底色，皆無描邊。
              以下為亮色主題的值，暗色主題由同一組語意 token 自動切換。
            </p>

            {styles.map((st) => (
              <div key={st} style={{ marginBottom: 48 }}>
                <h3 className="heading-md" style={{ marginBottom: 16 }}>
                  {cap(st)}
                </h3>
                <SpecTable
                  headers={['元素', 'Enabled', 'Disabled']}
                  rows={[
                    [
                      '容器底色',
                      <Swatch key="e" token={variantOf(st, 'enabled').bg as string | null} />,
                      <Swatch key="d" token={variantOf(st, 'disabled').bg as string | null} />,
                    ],
                    // primary 的文字色隨 emphasis 變化，逐列展開；其餘層級只有一列
                    ...(st === 'primary'
                      ? emphases.map((em) => [
                          `文字與 icon（emphasis: ${em}）`,
                          <Swatch key="e" token={variantOf(st, 'enabled', em).content as string} />,
                          <Swatch key="d" token={variantOf(st, 'disabled', em).content as string} />,
                        ])
                      : [
                          [
                            '文字與 icon',
                            <Swatch key="e" token={variantOf(st, 'enabled').content as string} />,
                            <Swatch key="d" token={variantOf(st, 'disabled').content as string} />,
                          ],
                        ]),
                  ]}
                  minWidth={560}
                />
                {st === 'primary' ? (
                  <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
                    三種 emphasis 的容器底色完全相同，差別只在文字色。
                    accent 用於畫面上最主要的那一個行動，charging 為充電流程專用，
                    兩者都不改變 primary 的權重層級。disabled 時 emphasis 不生效。
                  </p>
                ) : (
                  variantOf(st, 'enabled').note && (
                    <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
                      {String(variantOf(st, 'enabled').note)}
                    </p>
                  )
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
                    {stt === 'enabled'
                      ? '可點擊，各 style 呈現自身配色'
                      : '不可點擊，所有 style 收斂為同一組 disabled 配色，emphasis 不生效'}
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
                ['Enabled', '依 style 呈現對應的底色與文字色；primary 另受 emphasis 影響文字色', '可點擊，觸發 onPressed'],
                [
                  'Disabled',
                  '三個層級一律改為 actionDisabledBg 底、actionDisabledContent 文字，emphasis 不生效',
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
            <AnatomyImage
              file="button-measurements.png"
              alt="Regular 與 Small 兩種尺寸的按鈕量測標示"
            />

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
                
              ]}
              minWidth={620}
            />
          </section>

          {/* ── 8. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              觸控熱區與容器可視邊界一致，不另外擴張。固定高度 {layout.height}px
              已超過最小建議值 44px，Regular 與 Small 兩種尺寸皆滿足，不需額外處理。
            </p>
            <AnatomyImage
              file="button-toucharea.png"
              alt="按鈕的觸控熱區範圍，與容器可視邊界一致"
            />
          </section>

          {/* ── 9. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <div style={{ marginTop: 32 }}>
              <DoDont
                dos={[
                  '一個畫面只給一個 primary 按鈕，代表最主要的行動',
                  'emphasis accent 用來讓那一顆 primary 更醒目，一個畫面同樣只給一顆',
                  'emphasis charging 只用於充電相關流程，不要當成一般強調色',
                  'secondary 用於次要操作，tertiary 用於取消、略過這類低權重動作',
                  'icon 只作輔助，按鈕語意仍以文字為主',
                ]}
                donts={[
                  '不要同時使用多個 primary 按鈕，權重會互相抵銷',
                  '不要用 emphasis 取代權重階層，它只改文字色，不會讓按鈕變得更重要',
                  '不要只放 icon 不放文字，這個元件的文字是必填',
                  '不要用 tertiary 承載主要行動，它的淺灰底與頁面背景相近，不夠醒目',
                  '不要自行改變高度，兩種 size 之外的尺寸不在規範內',
                ]}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    file: 'button-do-case1.png',
                    alt: '主要行動用 primary、次要行動用 secondary 的按鈕組合範例',
                    caption: '主要行動用 primary（此處搭配 emphasis accent），次要行動用 secondary，權重一眼可辨。',
                  },
                  {
                    kind: 'dont',
                    file: 'button-dont-case1.png',
                    alt: '兩個按鈕都使用 primary 樣式的錯誤範例',
                    caption: '兩個按鈕都用 primary，權重無法區分，使用者不知道哪一個才是主要行動。',
                  },
                ]}
              />
            </div>
          </section>

          {/* ── 10. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul
              className="text-md text-muted"
              style={{ paddingLeft: 20, display: 'grid', gap: 10, marginTop: 32 }}
            >
              <li>固定高度 {layout.height}px，超過觸控目標最小 44px 的建議值。</li>
              <li>disabled 同時移除點擊行為，不會出現「看起來不能按卻按得下去」的狀況。</li>
              <li>icon 為裝飾性元素，語意由文字承載，讀屏軟體只會讀到 label。</li>
              <li>tertiary 的淺灰底與頁面背景相近，放在深淺不一的背景上時需自行確認邊界是否可辨。</li>
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
  style: USpaceButtonStyle.primary,
  size: USpaceButtonSize.regular,
  leadingIcon: const Icon(Icons.directions_car),
  onPressed: () {},
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="用 emphasis 讓 primary 更醒目"
                code={`USpaceButton(
  label: '確認',
  style: USpaceButtonStyle.primary,
  emphasis: USpaceButtonEmphasis.accent,
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
                  [<code key="b">style</code>, 'USpaceButtonStyle', 'primary', '3 種行動權重'],
                  [
                    <code key="b2">emphasis</code>,
                    'USpaceButtonEmphasis',
                    'none',
                    'primary 的文字色變化，對 secondary / tertiary 無效',
                  ],
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
              headers={['Style', 'Emphasis', 'State', 'Background', 'Border', 'Content']}
              rows={buttonSpec.variants.map((row) => [
                String(row.style),
                String(row.emphasis),
                String(row.state),
                row.bg ? <code>{String(row.bg)}</code> : <span>transparent</span>,
                row.border ? <code>{String(row.border)}</code> : <span>—</span>,
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
