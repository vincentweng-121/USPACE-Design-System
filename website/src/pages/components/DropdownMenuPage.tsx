import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  AnatomyImage,
  NumberedCaptions,
  Playground,
  PendingImage,
  Swatch,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { dropdown_menuSpec as spec } from '../../tokens/componentSpecs';
import { touch } from '../../tokens/scalars';
import { colorOf } from '../../utils';

type Status = 'default' | 'complete' | 'selecting' | 'incomplete' | 'error' | 'nonEditable';

const layout = spec.layout! as Record<string, number>;

/** 三個部位各自的字體，名稱取自 chip/dropdown 規格檔的 $typography */
const typeOf = (name: string) =>
  typographyStyles.flatMap((f) => f.styles).find((s) => s.name === name)!;
const labelType = typeOf('labelS');
const contentType = typeOf('labelM');
const hintType = typeOf('sfCaptionS');

/** 由 tokens/components/dropdown_menu.json 查出該 status 的 token 名稱 */
const variantOf = (status: Status) => spec.variants.find((v) => v.status === status)!;

/** 這些狀態顯示 placeholder 而非選取值——由 status 決定，不是「有沒有值」 */
const showsPlaceholder = (status: Status) => status === 'default' || status === 'incomplete';

// ── 收合狀態的 Dropdown 預覽 ──
/** 依 token 渲染，無互動，供規格展示用。 */
function DropdownPreview({
  status = 'default',
  showLabel = true,
  showHint = false,
}: {
  status?: Status;
  showLabel?: boolean;
  showHint?: boolean;
}) {
  const v = variantOf(status);
  const borderColor = colorOf(v.border as string | null);
  // hint 的顏色由 status 決定；沒有定義 hint 的狀態自行顯示時退回次要文字色
  const hintColor = colorOf(v.hint as string | null) ?? 'var(--text-secondary)';

  return (
    <div style={{ width: 280, flexShrink: 0 }}>
      {showLabel && (
        <div
          style={{
            padding: `0 ${layout.labelPaddingX}px`,
            marginBottom: layout.labelGap,
            color: colorOf(v.label as string),
            fontSize: labelType.size,
            lineHeight: `${labelType.lineHeight}px`,
            fontFamily: '"PingFang TC", sans-serif',
          }}
        >
          Label
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: layout.height,
          padding: `0 ${layout.paddingX}px`,
          borderRadius: layout.radius,
          background: colorOf(v.bg as string),
          // 沒有邊框的狀態也保留 1px 透明邊，避免切換時高度跳動
          border: `1px solid ${borderColor ?? 'transparent'}`,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            flex: 1,
            color: colorOf(v.content as string),
            fontSize: contentType.size,
            lineHeight: `${contentType.lineHeight}px`,
            fontFamily: '"PingFang TC", sans-serif',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {showsPlaceholder(status) ? 'Placeholder' : 'Input'}
        </div>
        <svg
          width={layout.iconSize}
          height={layout.iconSize}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0, color: colorOf(v.icon as string) }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {(showHint || v.hint) && (
        <div
          style={{
            padding: `0 ${layout.labelPaddingX}px`,
            marginTop: layout.hintGap,
            color: hintColor,
            fontSize: hintType.size,
            lineHeight: `${hintType.lineHeight}px`,
            fontFamily: '"SF Pro", sans-serif',
          }}
        >
          Hint
        </div>
      )}
    </div>
  );
}

// ── Playground 的維度 ──
// status 不列入：它是狀態不是配置，而且 selecting 是螢光綠邊框、
// incomplete 與 error 是紅字，切換後會渲染出非中性色。狀態一律在 States 與
// Color 區塊說明，預覽固定用中性的 default。
// 這裡只放結構性的維度：哪些部位要不要出現。
const playgroundDimensions: PlaygroundDimension[] = [
  {
    key: 'label',
    label: 'Label',
    options: [
      { value: 'shown', label: 'Shown' },
      { value: 'hidden', label: 'Hidden' },
    ],
  },
  {
    key: 'hint',
    label: 'Hint text',
    options: [
      { value: 'hidden', label: 'Hidden' },
      { value: 'shown', label: 'Shown' },
    ],
  },
];

export default function DropdownMenuPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Dropdown Menu"
        lead="從一組選項中選一個的表單欄位。收合時是一條與 TextField 等高的輸入列，點擊後展開選單。共六種狀態：default、complete、selecting、incomplete、error、nonEditable，由呼叫端依表單的驗證結果指定。"
        meta={
          <>
            <span>
              來源 <code>{spec.source}</code>
            </span>
            <span>
              Figma <code>{spec.figmaNode}</code>
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
              image="dropdown-menu-variant"
              alt="三種組成：只有 Label 與 placeholder、Label 與選取值、再加上下方的 Hint"
            />

            <NumberedCaptions
              items={[
                { name: '尚未選取', desc: '顯示 placeholder。Label 在上方，右側是收合的 chevron。' },
                { name: '已選取', desc: '同樣的結構，內容換成選取的值，文字色也跟著變深。' },
                { name: '帶提示文字', desc: '下方多一行 Hint。必填未填與驗證失敗時一定會出現，此時是紅字。' },
              ]}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              這張圖講的是<strong>組成</strong>——哪些部位會出現。六種 status 各自的顏色與行為
              在下方的 States 區塊。
            </p>
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>

            <Playground
              name="dropdown-menu"
              dimensions={playgroundDimensions}
              render={(v) => (
                <DropdownPreview
                  status="default"
                  showLabel={v.label === 'shown'}
                  showHint={v.hint === 'shown'}
                />
              )}
            />
          </section>

          {/* ── 3. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <AnatomyImage
              image="dropdown-menu-anatomy"
              alt="下拉選單的五個部件：輸入列容器、Label、Hint、內容文字、右側的 chevron"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '輸入列 Trigger', '必要', `高度固定 ${layout.height}px，圓角 ${layout.radius}，左右內距 ${layout.paddingX}px`],
                ['2', 'Label', '選用', `欄位名稱，左右內距 ${layout.labelPaddingX}px，與輸入列間距 ${layout.labelGap}px`],
                ['3', 'Hint', '選用', `說明或錯誤提示，與輸入列間距 ${layout.hintGap}px；incomplete 與 error 一定會顯示`],
                ['4', '內容文字', '必要', '尚未選取時是 placeholder，選取後換成選取的值'],
                ['5', 'Chevron', '必要', `${layout.iconSize}px，靠右，與內容文字間距 ${layout.contentIconGap}px，展開時旋轉 180°`],
              ]}
              minWidth={560}
            />
          </section>

          {/* ── 4. Color ── */}
          <section className="section">
            <SectionTitle>Color</SectionTitle>

            <SpecTable
              headers={['Status', '底色', '描邊', 'Label', '內容文字', 'Chevron', 'Hint']}
              rows={spec.variants.map((v) => [
                String(v.status),
                <Swatch key="bg" token={v.bg as string | null} />,
                <Swatch key="bd" token={v.border as string | null} />,
                <Swatch key="lb" token={v.label as string | null} />,
                <Swatch key="ct" token={v.content as string | null} />,
                <Swatch key="ic" token={v.icon as string | null} />,
                <Swatch key="hi" token={v.hint as string | null} />,
              ])}
              minWidth={860}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              底色、Label 與 Chevron 六種狀態都相同，真正變動的只有內容文字色、描邊與 hint。
              描邊只有 selecting 有，hint 只有 incomplete 與 error 有——「—」代表該狀態沒有這個部位，
              不是還沒填。
            </p>
          </section>

          {/* ── 5. States ── */}
          <section className="section">
            <SectionTitle>States</SectionTitle>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 32,
                padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)',
                borderRadius: 12,
                background: 'var(--page-secondary)',
                border: '1px solid var(--border-divider)',
                marginBottom: 32,
              }}
            >
              {(spec.dimensions.status as Status[]).map((s) => (
                <div key={s}>
                  <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>
                    {s}
                  </div>
                  <DropdownPreview status={s} />
                </div>
              ))}
            </div>

            <SpecTable
              headers={['Status', '輸入列顯示', '選單', 'Hint', '可否展開']}
              rows={[
                ['default', 'Placeholder', '收合', '無', '可以'],
                ['complete', '選取的值', '收合', '無', '可以'],
                ['selecting', '選取的值', '展開', '無', '可以（再點一次收合）'],
                ['incomplete', 'Placeholder', '收合', '紅字提示', '不可以'],
                ['error', '選取的值', '收合', '紅字提示', '不可以'],
                ['nonEditable', '選取的值（停用色）', '收合', '無', '不可以'],
              ]}
              minWidth={720}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              incomplete、error 與 nonEditable 點擊不會展開，這是元件內建的行為，
              呼叫端不需要另外擋。狀態由呼叫端依表單的驗證結果指定，元件本身不會自己
              從 default 變成 complete。
            </p>
          </section>

          {/* ── 6. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <AnatomyImage
              image="dropdown-menu-measurements"
              alt="上方標出輸入列高度 48 與左右內距 20，下方標出 Label 與 Hint 和輸入列之間的間距"
            />

            <SpecTable
              headers={['項目', '數值', 'Token']}
              rows={[
                ['輸入列高度', `${layout.height}px`, '—'],
                ['圓角', `${layout.radius}`, <code key="r">USpaceRadius.full</code>],
                [
                  '輸入列左右內距',
                  `${layout.paddingX}px`,
                  <code key="p">USpaceSpacing.margin</code>,
                ],
                [
                  'Label / Hint 左右內距',
                  `${layout.labelPaddingX}px`,
                  <code key="lp">USpaceSpacing.spacer{layout.labelPaddingX}</code>,
                ],
                [
                  'Label 與輸入列間距',
                  `${layout.labelGap}px`,
                  <code key="lg">USpaceSpacing.spacer{layout.labelGap}</code>,
                ],
                [
                  '輸入列與 Hint 間距',
                  `${layout.hintGap}px`,
                  <code key="hg">USpaceSpacing.spacer{layout.hintGap}</code>,
                ],
                ['Chevron 尺寸', `${layout.iconSize}px`, '—'],
                [
                  '內容文字與 Chevron 間距',
                  `${layout.contentIconGap}px`,
                  <code key="cg">USpaceSpacing.spacer{layout.contentIconGap}</code>,
                ],
                [
                  'Label 文字',
                  `${labelType.size}px / ${labelType.lineHeight}px Regular`,
                  <code key="lt">{labelType.name}</code>,
                ],
                [
                  '內容文字',
                  `${contentType.size}px / ${contentType.lineHeight}px Regular`,
                  <code key="ct">{contentType.name}</code>,
                ],
                [
                  'Hint 文字',
                  `${hintType.size}px / ${hintType.lineHeight}px Regular（SF Pro）`,
                  <code key="ht">{hintType.name}</code>,
                ],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              展開後的選單面板（圓角 20、內距 16 / 20、項目間距 8）不在這次比對的 Figma
              node 內，該 node 只畫了六個收合狀態。面板數值沿用既有實作，尚未比對 Figma。
            </p>
          </section>

          {/* ── 7. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage
              expects="dropdown-menu-toucharea"
              note={`標出觸控熱區範圍，並確認展開後的選項列是否達到 ${touch.minTarget}px 最小建議值。`}
            />
            <p className="text-md text-muted" style={{ margin: 0 }}>
              輸入列高度 {layout.height}px，超過觸控目標最小 {touch.minTarget}px 的建議值。整條輸入列都是
              熱區，不只 Chevron。
            </p>
          </section>

          {/* ── 8. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>與 TextField 共用視覺語言</strong>：同樣的高度 {layout.height}px 與
                Stadium 圓角，同一張表單裡兩者並排時對得齊。
              </li>
                <li>
                <strong>狀態由呼叫端決定</strong>：元件不會自己判斷填得對不對。表單驗證後
                把結果傳進 <code>status</code>，incomplete 用於必填未填、error 用於填了但不合法。
              </li>
              <li>
                <strong>Hint 一次只講一件事</strong>：錯誤時的 hint 要寫「該怎麼做」而不是
                「哪裡錯了」。這個位置只有一行，塞不下長句。
              </li>
              <li>
                <strong>選項多的時候仍用下拉</strong>：面板可捲動並有高度上限，不會把畫面撐開。
                但選項超過十幾個時，改用可搜尋的選擇頁比較好找。
              </li>
              <li>
                <strong>唯讀用 nonEditable，不要用視覺手段假裝</strong>：它同時關掉展開行為，
                自己調透明度做不到這件事。
              </li>
            </ul>
          </section>

          {/* ── 9. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>輸入列高度 {layout.height}px，超過觸控目標最小 {touch.minTarget}px 的建議值。</li>
              <li>
                nonEditable、incomplete 與 error 同時關閉展開行為，不會出現「看起來能點卻沒反應」
                或「看起來不能點卻展開了」。
              </li>
              <li>
                錯誤只靠紅色傳達是不夠的——hint 的文字本身就要說明問題，色盲使用者才讀得到。
              </li>
              <li>
                Chevron 是裝飾性元素，語意由 Label 與選取值承載，讀屏軟體不需要讀出它。
              </li>
              <li>
                Placeholder 的色票是 {String(variantOf('default').content)}，對比度低，
                不可拿來當 Label 用——欄位名稱一律放在上方的 Label。停用文字用的是另一個
                較深的 {String(variantOf('nonEditable').content)}，兩者不再同色。
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
                code={`USpaceDropdownMenu<String>(
  label: '車輛類型',
  placeholder: '請選擇',
  items: const ['汽車', '機車'],
  itemLabelBuilder: (item) => item,
  selectedItem: selected,
  onChanged: (item) => setState(() => selected = item),
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="表單驗證失敗時帶入錯誤狀態"
                code={`USpaceDropdownMenu<String>(
  label: '車輛類型',
  placeholder: '請選擇',
  hint: '請先選擇車輛類型',
  status: USpaceDropdownMenuStatus.incomplete,
  items: items,
  itemLabelBuilder: (item) => item,
  onChanged: onChanged,
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="唯讀：不可展開"
                code={`USpaceDropdownMenu<String>(
  label: '方案',
  status: USpaceDropdownMenuStatus.nonEditable,
  items: items,
  itemLabelBuilder: (item) => item,
  selectedItem: '月租型',
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
                  [<code key="a">label</code>, 'String?', 'null', '上方的欄位名稱，null 時不顯示'],
                  [<code key="b">placeholder</code>, 'String', "'Placeholder'", '尚未選取時顯示的文字'],
                  [<code key="c">hint</code>, 'String?', 'null', '下方的說明或錯誤文字'],
                  [
                    <code key="d">showHint</code>,
                    'bool',
                    'false',
                    'incomplete 與 error 一定會顯示 hint，其餘狀態要顯示才需要開這個',
                  ],
                  [<code key="e">items</code>, 'List&lt;T&gt;', '必填', '選項清單'],
                  [
                    <code key="f">itemLabelBuilder</code>,
                    'String Function(T)',
                    '必填',
                    '把選項轉成顯示文字',
                  ],
                  [<code key="g">selectedItem</code>, 'T?', 'null', '目前選取的項目'],
                  [<code key="h">onChanged</code>, 'ValueChanged&lt;T&gt;?', 'null', '選取變更的回呼'],
                  [
                    <code key="i">status</code>,
                    'USpaceDropdownMenuStatus',
                    'defaultStatus',
                    '6 種狀態，決定外觀與能不能展開',
                  ],
                ]}
                minWidth={620}
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <p className="text-sm text-muted" style={{ margin: '0 0 16px' }}>
              此表由 <code>tokens/components/dropdown_menu.json</code> 產生，
              並由 Flutter widget test 逐項驗證：改了對應卻沒改實作，CI 會擋下。
            </p>
            <SpecTable
              headers={['Status', 'Background', 'Border', 'Label', 'Content', 'Icon', 'Hint']}
              rows={spec.variants.map((row) => [
                String(row.status),
                <code key="bg">{String(row.bg)}</code>,
                row.border ? <code>{String(row.border)}</code> : <span>—</span>,
                <code key="lb">{String(row.label)}</code>,
                <code key="ct">{String(row.content)}</code>,
                <code key="ic">{String(row.icon)}</code>,
                row.hint ? <code>{String(row.hint)}</code> : <span>—</span>,
              ])}
              minWidth={860}
            />
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>2026-08-14 導入時修正六處</strong>：補上 nonEditable 狀態；chevron 由
                contentSecondary 改為 contentTertiary；selecting 補上 inputBorderActive 邊框；
                Label 字體由 bodyS(14/20) 改為 labelS(12/16)；內容字體由 bodyM(16/24) 改為
                labelM(14/20)；文字色改由 status 決定而非「有沒有選取」。以上都是比對 Figma
                node 2141:11030 的結果。
              </li>
              <li>
                <strong>inputTextDisabled 已對齊 Figma</strong>：2026-08-14 由 grey200 改為
                grey400（#A6A6A6）。原值與 placeholder 同色，停用與未填看起來一樣。
                這個 token 同時被 TextField 與 TextArea 使用，那兩個元件的 disabled 與
                nonEditable 也跟著變深。
              </li>
              <li>
                <strong>面板尚未比對</strong>：展開後的選單面板不在該 Figma node 內，
                圓角 20、內距 16 / 20、項目間距 8 沿用既有實作。
              </li>
              <li>
                <strong>hint 的非錯誤用法</strong>：Figma 只定義了 incomplete 與 error 的 hint。
                其他狀態開 <code>showHint</code> 時 hint 會用 textSecondary，這個顏色不在 Figma
                的六個狀態裡。
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
