import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { DoDontExamples } from '../../components/DoDont';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import { AnatomyImage } from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { buttonSpec } from '../../tokens/componentSpecs';
import { colorOf, cap } from '../../utils';

type Level = 'primary' | 'secondary' | 'tertiary';
type Emphasis = 'none' | 'accent' | 'charging';
type Size = 'regular' | 'small';
type State = 'enabled' | 'disabled';

const levels = buttonSpec.dimensions.level as Level[];
const emphases = buttonSpec.dimensions.emphasis as Emphasis[];
const states = buttonSpec.dimensions.state as State[];
const layout = buttonSpec.layout! as Record<string, number>;

/** 按鈕文字使用的字體 token */
const labelType = typographyStyles
  .flatMap((f) => f.styles.map((s) => ({ ...s, family: f.family })))
  .find((s) => s.name === 'displayM')!;

/** 由 tokens/components/button.json 查出該 level × emphasis × state 的 token 名稱 */
function variantOf(level: Level, state: State, emphasis: Emphasis = 'none') {
  return buttonSpec.variants.find(
    (v) => v.level === level && v.state === state && v.emphasis === emphasis,
  )!;
}

/** emphasis 只對 primary 生效，其餘層級一律用 none 那筆 */
const emphasisOf = (level: Level, emphasis: Emphasis) =>
  level === 'primary' ? emphasis : 'none';

// ── icon 佔位框 ──
/**
 * 虛線方框，代表「這裡放一個 icon」。
 *
 * 來源：Figma node 3746:15802。文件站不該指定某個具體圖示，
 * 否則讀者會以為那是規範的一部分；佔位框只表達尺寸與位置。
 *
 * 顏色跟著文字走，與 Anatomy 表寫的「顏色與文字相同」一致。
 */
function IconPlaceholder({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="1.33"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

// ── 依 token 渲染的按鈕 ──
function ButtonPreview({
  label,
  level,
  size,
  state,
  emphasis = 'none',
  leading = false,
  trailing = false,
}: {
  label: string;
  level: Level;
  size: Size;
  state: State;
  emphasis?: Emphasis;
  leading?: boolean;
  trailing?: boolean;
}) {
  const v = variantOf(level, state, emphasisOf(level, emphasis));
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
      {leading && <IconPlaceholder color={content} />}
      {label}
      {trailing && <IconPlaceholder color={content} />}
    </button>
  );
}

// ── 圖說編號列表 ──
/**
 * 對應圖片上標號的說明，接在圖片下方。
 *
 * 欄數隨版面寬度自動增減（auto-fit + minmax），窄螢幕會收成一欄。
 */
function NumberedCaptions({ items }: { items: { name: string; desc?: string }[] }) {
  return (
    <ol className="numbered-captions">
      {items.map((item, i) => (
        <li key={item.name}>
          <strong>
            {i + 1}. {item.name}
          </strong>
          {item.desc && <span>{item.desc}</span>}
        </li>
      ))}
    </ol>
  );
}

// ── 互動式展示區 ──
type IconOption = 'none' | 'leading' | 'trailing';

/** 一組 radio。點選後由呼叫端更新狀態，預覽即時反映。 */
function ControlGroup<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="control-group-label">{label}</legend>
      {options.map((opt) => (
        <label key={opt.value} className="control-option">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}

/**
 * 左側即時預覽 + 右側控制卡。
 * 結構參考 Montage 文件站的 Variants 區塊。
 */
function Playground() {
  const [size, setSize] = useState<Size>('regular');
  const [level, setLevel] = useState<Level>('primary');
  const [icon, setIcon] = useState<IconOption>('none');

  return (
    <div className="playground">
      <div className="playground-preview">
        <div>
          <ButtonPreview
            label="Label"
            level={level}
            size={size}
            state="enabled"
            leading={icon === 'leading'}
            trailing={icon === 'trailing'}
          />
        </div>
      </div>

      <div className="playground-controls">
        <ControlGroup
          name="button-size"
          label="Size"
          value={size}
          onChange={setSize}
          options={[
            { value: 'regular', label: 'Regular' },
            { value: 'small', label: 'Small' },
          ]}
        />
        <ControlGroup
          name="button-level"
          label="Level"
          value={level}
          onChange={setLevel}
          options={levels.map((lv) => ({ value: lv, label: cap(lv) }))}
        />
        <ControlGroup
          name="button-icon"
          label="Icon option"
          value={icon}
          onChange={setIcon}
          options={[
            { value: 'none', label: 'None' },
            { value: 'leading', label: 'Leading' },
            { value: 'trailing', label: 'Trailing' },
          ]}
        />
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
        lead="按鈕觸發單一明確的行動。權重由 level 決定，共 primary、secondary、tertiary 三級；primary 可再用 emphasis 切換文字色做更強的強調。加上 size 與 state 共四個維度，icon 可放在文字左側或右側，擇一。"
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
              image="button-variant"
              alt="三種按鈕權重由重到輕：深底的 Primary、中灰底的 Secondary、淺灰底的 Tertiary"
            />

            <NumberedCaptions
              items={[
                { name: 'Primary', desc: '最高權重。畫面上最主要的那一個行動，實心深底。' },
                { name: 'Secondary', desc: '次要操作。實心中灰底，存在感低於 Primary。' },
                { name: 'Tertiary', desc: '最低權重。實心淺灰底，適合取消、略過這類動作。' },
              ]}
            />
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              調整右側的屬性，左側會即時反映。互動與狀態不在此處，見下方 States。
            </p>

            <Playground />
          </section>

          {/* ── 3. Tokens & specs ── */}
          <section className="section">
            <SectionTitle>Tokens &amp; specs</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              不隨 level 或 size 改變的共通規格。逐項細節見下方各區塊。
            </p>
            <SpecTable
              headers={['項目', '值', 'Token']}
              rows={[
                ['樣式數', `${levels.length} 種（Primary / Secondary / Tertiary）`, '—'],
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
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              顏色由 level 與 state 決定，不隨 size 改變。三個層級都是實心底色，皆無描邊。
              以下為亮色主題的值，暗色主題由同一組語意 token 自動切換。
            </p>

            {levels.map((lv) => (
              <div key={lv} style={{ marginBottom: 48 }}>
                <h3 className="heading-md" style={{ marginBottom: 16 }}>
                  {cap(lv)}
                </h3>
                <SpecTable
                  headers={['元素', 'Enabled', 'Disabled']}
                  rows={[
                    [
                      '容器底色',
                      <Swatch key="e" token={variantOf(lv, 'enabled').bg as string | null} />,
                      <Swatch key="d" token={variantOf(lv, 'disabled').bg as string | null} />,
                    ],
                    // primary 的文字色隨 emphasis 變化，逐列展開；其餘層級只有一列
                    ...(lv === 'primary'
                      ? emphases.map((em) => [
                          `文字與 icon（emphasis: ${em}）`,
                          <Swatch key="e" token={variantOf(lv, 'enabled', em).content as string} />,
                          <Swatch key="d" token={variantOf(lv, 'disabled', em).content as string} />,
                        ])
                      : [
                          [
                            '文字與 icon',
                            <Swatch key="e" token={variantOf(lv, 'enabled').content as string} />,
                            <Swatch key="d" token={variantOf(lv, 'disabled').content as string} />,
                          ],
                        ]),
                  ]}
                  minWidth={560}
                />
                {lv === 'primary' ? (
                  <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
                    三種 emphasis 的容器底色完全相同，差別只在文字色。
                    accent 用於畫面上最主要的那一個行動，charging 為充電流程專用，
                    兩者都不改變 primary 的權重層級。disabled 時 emphasis 不生效。
                  </p>
                ) : (
                  variantOf(lv, 'enabled').note && (
                    <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
                      {String(variantOf(lv, 'enabled').note)}
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
                      ? '可點擊，各 level 呈現自身配色'
                      : '不可點擊，所有 level 收斂為同一組 disabled 配色，emphasis 不生效'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {levels.map((lv) => (
                      <ButtonPreview
                        key={lv}
                        label={cap(lv)}
                        level={lv}
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
                ['Enabled', '依 level 呈現對應的底色與文字色；primary 另受 emphasis 影響文字色', '可點擊，觸發 onPressed'],
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
              image="button-measurements"
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
              image="button-toucharea"
              alt="按鈕的觸控熱區範圍，與容器可視邊界一致"
            />
          </section>

          {/* ── 9. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <div style={{ display: 'grid', gap: 32, marginTop: 32 }}>
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case1',
                    alt: '主要行動用 primary、次要行動用 secondary 的按鈕組合範例',
                    caption: '主要行動用 primary（此處搭配 emphasis accent），次要行動用 secondary，權重一眼可辨。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case1',
                    alt: '兩個按鈕都使用 primary 樣式的錯誤範例',
                    caption: '兩個按鈕都用 primary，權重無法區分，使用者不知道哪一個才是主要行動。',
                  },
                ]}
              />
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case2',
                    alt: '只在文字左側放一個 icon 的按鈕',
                    caption: 'icon 只放單側。左側 icon 補充行動的性質，視線仍然落在文字上。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case2',
                    alt: '文字左右兩側都放 icon 的按鈕',
                    caption: '不要兩側都放 icon。左右各一個會把文字夾在中間，反而看不出重點在哪。',
                  },
                ]}
              />
              <DoDontExamples
                items={[
                  {
                    kind: 'do',
                    image: 'button-do-case3',
                    alt: 'icon 搭配文字的按鈕',
                    caption: 'icon 一律搭配文字。語意由文字承載，icon 只是輔助。',
                  },
                  {
                    kind: 'dont',
                    image: 'button-dont-case3',
                    alt: '只有 icon 沒有文字的按鈕',
                    caption: '不要只放 icon。這個元件的文字是必填，少了文字讀屏軟體也讀不出這顆按鈕在做什麼。',
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
  level: USpaceButtonLevel.primary,
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
  level: USpaceButtonLevel.primary,
  emphasis: USpaceButtonEmphasis.accent,
  onPressed: () {},
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="單側 icon + 明確 disabled"
                code={`USpaceButton(
  label: '前往付款',
  level: USpaceButtonLevel.secondary,
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
            <div style={{ marginTop: 32 }}>
              <SpecTable
                headers={['參數', '型別', '預設', '說明']}
                rows={[
                  [<code key="a">label</code>, 'String', '必填', '按鈕文字'],
                  [<code key="b">level</code>, 'USpaceButtonLevel', 'primary', '3 種行動權重'],
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
              headers={['Level', 'Emphasis', 'State', 'Background', 'Border', 'Content']}
              rows={buttonSpec.variants.map((row) => [
                String(row.level),
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
