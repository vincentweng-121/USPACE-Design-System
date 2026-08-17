import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import CodeBlock from '../../components/CodeBlock';
import SpecTable from '../../components/SpecTable';
import {
  AnatomyImage,
  IconPlaceholder,
  Playground,
  PendingImage,
  Swatch,
  type PlaygroundDimension,
} from '../../components/spec';
import { typographyStyles } from '../../tokens/typography';
import { action_areaSpec as spec, buttonSpec } from '../../tokens/componentSpecs';
import { gradients } from '../../tokens/colors';
import { colorOf } from '../../utils';

type Background = 'gray' | 'none';

const layout = spec.layout! as Record<string, number>;

const textType = typographyStyles.flatMap((f) => f.styles).find((s) => s.name === 'captionS')!;

/** 由 tokens/components/action_area.json 查出該組合的 token 名稱 */
const variantOf = (background: Background, multiRow: boolean) =>
  spec.variants.find(
    (v) => v.background === background && v.rows === (multiRow ? 'multi' : 'single'),
  )!;

/** 由 button.json 查出該 level 的 token，避免在這一頁自己寫死顏色 */
const buttonVariant = (level: string) =>
  buttonSpec.variants.find(
    (v) => v.level === level && v.state === 'enabled' && v.emphasis === 'none',
  )!;

/** 按鈕文字的字體同 Button 元件 */
const buttonType = typographyStyles.flatMap((f) => f.styles).find((s) => s.name === 'displayM')!;

// ── 按鈕的簡化示意 ──
/**
 * 這一頁講的是版面，不是按鈕本身。按鈕只畫成正確高度與底色的方塊，
 * 細節看 Button 頁——重複畫一次會變成第二份會漂移的規格。
 */
function ButtonBlock({
  level = 'primary',
  content = 'label',
}: {
  level?: string;
  /** 並排列的格子放 icon，其餘放文字 */
  content?: 'label' | 'icon';
}) {
  const v = buttonVariant(level);
  const color = colorOf(v.content as string)!;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: layout.buttonHeight,
        borderRadius: 1000,
        background: colorOf(v.bg as string),
        color,
        fontSize: buttonType.size,
        lineHeight: `${buttonType.lineHeight}px`,
        fontWeight: buttonType.weight,
        fontFamily: '"PingFang TC", sans-serif',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {content === 'icon' ? (
        <IconPlaceholder color={color} size={layout.rowIconSize} />
      ) : (
        'Label'
      )}
    </div>
  );
}

// ── 依 token 渲染的 Action Area ──
function ActionAreaPreview({
  background = 'gray',
  rows = 1,
  rowCells = 0,
  showText = false,
}: {
  background?: Background;
  rows?: number;
  /** 上方那一列要並排幾格；0 表示沒有這一列 */
  rowCells?: number;
  showText?: boolean;
}) {
  const multiRow = rows > 1 || rowCells > 0;
  const v = variantOf(background, multiRow);
  const gradient = v.gradient
    ? (gradients as Record<string, string>)[v.gradient as string]
    : undefined;

  const items: React.ReactNode[] = [];
  if (rowCells > 0) {
    items.push(
      <div key="row" style={{ display: 'flex', gap: layout.rowGap }}>
        {Array.from({ length: rowCells }, (_, i) => (
          <ButtonBlock key={i} level="tertiary" content="icon" />
        ))}
      </div>,
    );
  }
  for (let i = 0; i < rows; i++) {
    items.push(<ButtonBlock key={`b${i}`} level={i === 0 ? 'primary' : 'secondary'} />);
  }

  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        background: gradient,
        // 沒有背景時補一條虛線，否則讀者看不出這個區塊的範圍
        outline: gradient ? undefined : '1px dashed var(--border-divider)',
        padding: `${layout.paddingTop}px ${layout.marginX}px ${layout.homeIndicatorHeight}px`,
        boxSizing: 'border-box',
      }}
    >
      {showText && (
        <div
          style={{
            textAlign: 'center',
            marginBottom: layout.textGap,
            color: colorOf(v.text as string),
            fontSize: textType.size,
            lineHeight: `${textType.lineHeight}px`,
            fontFamily: '"PingFang TC", sans-serif',
          }}
        >
          Text
        </div>
      )}
      <div style={{ display: 'grid', gap: layout.buttonGap }}>{items}</div>
    </div>
  );
}

// ── Playground 的維度 ──
// 背景解出來的是灰階漸層與中性文字色，沒有非中性色，所以可以放進 Configurations。
// 按鈕數量與說明文字都是結構性的維度。
const playgroundDimensions: PlaygroundDimension[] = [
  {
    key: 'background',
    label: 'Background',
    options: [
      { value: 'gray', label: 'Gray' },
      { value: 'none', label: 'None' },
    ],
  },
  {
    key: 'buttons',
    label: 'Button section',
    options: [
      { value: '1', label: '1 button' },
      { value: '2', label: '2 button' },
      { value: '3', label: '3 button' },
      { value: 'row2', label: '1 button + 2 row' },
      { value: 'row3', label: '1 button + 3 row' },
    ],
  },
  {
    key: 'text',
    label: 'Text',
    options: [
      { value: 'hidden', label: 'Hidden' },
      { value: 'shown', label: 'Shown' },
    ],
  },
];

export default function ActionAreaPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Action Area"
        lead="頁面底部放關鍵行動的區塊。它負責的是版面——背景漸層、左右邊距、按鈕之間的間距，以及底部留給 home indicator 的空間。按鈕本身由呼叫端傳入，這個元件不畫按鈕。"
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
              image="action-area-variant"
              alt="Gray 背景的動作區，內含主要與次要兩顆按鈕"
            />

            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>Gray</strong>：讓按鈕與底下捲動的內容分開。淺色時是由下往上的灰色漸層，
                深色時改為半透明的黑色遮罩——上圖示範的就是這一種，切換網站主題可以看到差異。
                放在會捲動的頁面上用它。
              </li>
              <li>
                <strong>None</strong>：沒有背景，直接疊在頁面內容上。底下不會捲動、
                或頁面本身已經是純色時用它。
              </li>
            </ul>
          </section>

          {/* ── 2. Configurations ── */}
          <section className="section">
            <SectionTitle>Configurations</SectionTitle>

            <Playground
              name="action-area"
              dimensions={playgroundDimensions}
              render={(v) => (
                <ActionAreaPreview
                  background={v.background as Background}
                  rows={v.buttons.startsWith('row') ? 1 : Number(v.buttons)}
                  rowCells={v.buttons.startsWith('row') ? Number(v.buttons.slice(3)) : 0}
                  showText={v.text === 'shown'}
                />
              )}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              按鈕在這裡只畫出底色、文字與高度，用來看版面關係。按鈕本身的規格
              （尺寸、狀態、icon 位置）在 Button 頁，這一頁不重複一份。
              上方那一列並排的格子，Figma 有兩格與三格兩種，寬度由容器平分。
              格子裡放的是 icon 而不是文字，這裡用虛線方框表示可擺放 icon 的位置——
              文件站不指定具體圖示，否則讀者會以為那個圖示是規範的一部分。
            </p>
          </section>

          {/* ── 3. Anatomy ── */}
          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <PendingImage
              expects="action-area-anatomy"
              note="標出四個部件的拆解圖，編號與下表一致。"
            />

            <SpecTable
              headers={['', '部件', '必要性', '說明']}
              rows={[
                ['1', '背景', '選用', 'Gray 時是由下往上的漸層；None 時不畫'],
                ['2', '說明文字', '選用', `置中，與按鈕區間距 ${layout.textGap}px`],
                ['3', '按鈕區', '必要', `由呼叫端傳入，每項高 ${layout.buttonHeight}px，彼此間距 ${layout.buttonGap}px`],
                ['3a', '並排列（選用）', '選用', `一列並排兩格或三格，格子之間間距 ${layout.rowGap}px，寬度平分；格子裡放一個 ${layout.rowIconSize}px 的 icon，置中`],
                ['4', 'Home indicator 留白', '選用', `底部保留 ${layout.homeIndicatorHeight}px；已被 SafeArea 包住時關掉`],
              ]}
              minWidth={560}
            />
          </section>

          {/* ── 4. Color ── */}
          <section className="section">
            <SectionTitle>Color</SectionTitle>

            <SpecTable
              headers={['Background', '列數', '漸層', '說明文字']}
              rows={spec.variants.map((v) => [
                String(v.background),
                v.rows === 'single' ? '單列' : '多列',
                v.gradient ? <code>{String(v.gradient)}</code> : <span>—</span>,
                <Swatch key="t" token={v.text as string | null} />,
              ])}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 10, color: 'var(--text-tertiary)' }}>
              Gray 依列數選漸層：單列用 <code>bottomBarGray1B</code>、多列用{' '}
              <code>bottomBarGray2B</code>，後者涵蓋範圍較高才蓋得住底下的內容。
              兩者都有明暗兩套，但形式不同：<strong>淺色是漸層</strong>（grey50 由透明到不透明，
              也就是頁面背景色的淡出），<strong>深色則是半透明的黑色遮罩</strong>
              （<code>transparentBlack40</code>），不是漸層。這是照 Figma 的 dark 變體——
              它掛的是 Background/Surface/Mask 而不是 BottomBar Gray。
            </p>
          </section>

          {/* ── 5. States ── */}
          <section className="section">
            <SectionTitle>States</SectionTitle>

            <SpecTable
              headers={['狀態', '外觀', '說明']}
              rows={[
                ['靜態', '依 background 與列數決定', '這個元件沒有互動狀態，它只是版面'],
                ['按鈕的狀態', '由按鈕自己負責', 'disabled、pressed 等都在 Button 元件上'],
              ]}
              minWidth={620}
            />
            <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              Action Area 不接受點擊，也沒有 enabled / disabled。要停用某個行動時，
              停用那顆按鈕，不要停用整個區塊。
            </p>
          </section>

          {/* ── 6. Measurements ── */}
          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage
              expects="action-area-measurements"
              note="標出邊距、按鈕高度與各項間距的量測圖。"
            />

            <SpecTable
              headers={['項目', '數值', 'Token']}
              rows={[
                ['左右邊距', `${layout.marginX}px`, <code key="m">USpaceSpacing.margin</code>],
                [
                  '頂部內距',
                  `${layout.paddingTop}px`,
                  <code key="pt">USpaceSpacing.spacer{layout.paddingTop}</code>,
                ],
                ['按鈕高度', `${layout.buttonHeight}px`, '—（由 Button 元件決定）'],
                ['並排列的 icon', `${layout.rowIconSize}px`, '—'],
                [
                  '按鈕之間間距',
                  `${layout.buttonGap}px`,
                  <code key="bg">USpaceSpacing.spacer{layout.buttonGap}</code>,
                ],
                [
                  '同一列內按鈕間距',
                  `${layout.rowGap}px`,
                  <code key="rg">USpaceSpacing.spacer{layout.rowGap}</code>,
                ],
                [
                  '說明文字與按鈕區間距',
                  `${layout.textGap}px`,
                  <code key="tg">USpaceSpacing.spacer{layout.textGap}</code>,
                ],
                [
                  'Home indicator 留白',
                  `${layout.homeIndicatorHeight}px`,
                  <code key="hi">USpaceSpacing.spacer{layout.homeIndicatorHeight}</code>,
                ],
                [
                  '說明文字',
                  `${textType.size}px / ${textType.lineHeight}px Regular`,
                  <code key="tt">{textType.name}</code>,
                ],
              ]}
              minWidth={620}
            />
          </section>

          {/* ── 7. Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <p className="text-md text-muted" style={{ margin: 0 }}>
              Action Area 本身不可點擊，沒有觸控熱區。區塊裡每顆按鈕高{' '}
              {layout.buttonHeight}px，各自符合觸控目標建議值。按鈕之間留{' '}
              {layout.buttonGap}px，是為了避免手指誤觸隔壁那顆。
            </p>
          </section>

          {/* ── 8. Usage ── */}
          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>放頁面最關鍵的那一兩個行動</strong>：這個位置是拇指最好按到的地方，
                留給主要行動。次要的操作放在頁面內容裡。
              </li>
              <li>
                <strong>會捲動的頁面用 Gray</strong>：漸層讓按鈕與底下捲過去的內容分開，
                不然文字會直接壓在按鈕下面。頁面不捲動時用 None。
              </li>
              <li>
                <strong>按鈕不要超過三顆</strong>：Figma 目前畫到三顆。再多的話使用者
                難以判斷該按哪一個，應該重新想這個頁面的主要行動是什麼。
              </li>
              <li>
                <strong>權重要分得出來</strong>：同時放兩顆以上時，只有一顆是 primary，
                其餘用 secondary 或 tertiary，三顆時依序往下降。三顆都用實心樣式，
                沒有描邊版本。兩顆都 primary 等於沒有主要行動。
              </li>
              <li>
                <strong>已經有 SafeArea 就關掉 home indicator 留白</strong>：兩邊都留會多出
                一段空白。
              </li>
            </ul>
          </section>

          {/* ── 9. Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                區塊本身不是可操作的元素，讀屏軟體會直接讀到裡面的按鈕，不會多讀一層。
              </li>
              <li>
                說明文字用 <code>{String(variantOf('gray', false).text)}</code>，
                對比度低於主要文字。它只適合放補充說明，關鍵資訊要放在按鈕文字裡。
              </li>
              <li>
                Gray 的漸層是半透明的，底下捲過去的內容會透出來。文字疊在漸層上時
                對比度會變動，重要訊息不要只靠這個位置傳達。
              </li>
              <li>
                底部留白讓按鈕不會貼齊螢幕邊緣，避免與系統的 home indicator 手勢衝突。
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
                code={`USpaceActionArea(
  children: [
    USpaceButton(
      label: '確認送出',
      onPressed: () {},
    ),
  ],
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="兩顆按鈕加說明文字"
                code={`USpaceActionArea(
  text: '送出後將無法修改',
  children: [
    USpaceButton(label: '確認送出', onPressed: onSubmit),
    USpaceButton(
      label: '再檢查一次',
      level: USpaceButtonLevel.secondary,
      onPressed: onBack,
    ),
  ],
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="一列並排兩顆：自己傳 Row"
                code={`USpaceActionArea(
  children: [
    Row(
      children: [
        Expanded(child: floorPicker),
        const SizedBox(width: USpaceSpacing.spacer16),
        Expanded(child: carPicker),
      ],
    ),
    USpaceButton(label: '開始停車', onPressed: onStart),
  ],
)`}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                title="頁面已經有 SafeArea 時關掉底部留白"
                code={`USpaceActionArea(
  background: USpaceActionAreaBackground.none,
  showHomeIndicator: false,
  children: [
    USpaceButton(label: '關閉', onPressed: onClose),
  ],
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
                  [
                    <code key="a">children</code>,
                    'List&lt;Widget&gt;',
                    '必填',
                    '由上到下排列的行動，通常是 USpaceButton；一列並排多顆時傳 Row',
                  ],
                  [<code key="b">text</code>, 'String?', 'null', '按鈕上方的說明文字，null 時整行不佔空間'],
                  [
                    <code key="c">background</code>,
                    'USpaceActionAreaBackground',
                    'gray',
                    'gray 畫漸層、none 不畫',
                  ],
                  [
                    <code key="d">showHomeIndicator</code>,
                    'bool',
                    'true',
                    `底部是否保留 ${layout.homeIndicatorHeight}px；已被 SafeArea 包住時關掉`,
                  ],
                ]}
                minWidth={620}
              />
              <p className="text-sm" style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
                沒有「按鈕數量」這個參數。Figma 變體名稱裡的 1 button／2 button／
                1 button + 2 row 講的是你要放幾個 <code>children</code>，不是元件的設定。
              </p>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <p className="text-sm text-muted" style={{ margin: '0 0 16px' }}>
              此表由 <code>tokens/components/action_area.json</code> 產生，
              並由 Flutter widget test 逐項驗證：改了對應卻沒改實作，CI 會擋下。
            </p>
            <SpecTable
              headers={['Background', '列數', 'Gradient', 'Text', '備註']}
              rows={spec.variants.map((row) => [
                String(row.background),
                String(row.rows),
                row.gradient ? <code>{String(row.gradient)}</code> : <span>—</span>,
                <code key="t">{String(row.text)}</code>,
                row.note ? String(row.note) : '—',
              ])}
              minWidth={820}
            />
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <ul className="text-md text-muted" style={{ paddingLeft: 20, display: 'grid', gap: 10 }}>
              <li>
                <strong>Figma 上這個元件叫 BottomBar</strong>：2026-08-17 經使用者確認，
                正式名稱為 Action Area，文件站原本的 Bottom Bar 項目已移除，
                原本的搜尋關鍵字（底部按鈕列、動作列、action bar 等）併入這一頁。
              </li>
              <li>
                <strong>Premium 變體未處理</strong>：Figma 的 <code>Premium Accout</code>
                （設計稿上就是這個拼字）為 True 的變體，在動作區下方多一條深色的權益列。
                經使用者指示這次完全略過。
              </li>
              <li>
                <strong>深色的背景不是漸層</strong>：Figma 上 BottomBar Gray 1B / 2B 是
                fill style 而非 variable，style 沒有明暗模式。後來從 Action Area 的
                dark 說明圖（node 3957:22476）查到，深色變體掛的是
                Background/Surface/Mask（#00000066 = <code>transparentBlack40</code>），
                是純色遮罩不是漸層。像素取樣可佐證：40% 黑疊在該圖背景上得到的值與圖上相符。
              </li>
              <li>
                <strong>⚠️ pageMask 的深色值待釐清</strong>：semantic 的{' '}
                <code>pageMask</code> 深色值目前是 <code>transparentWhite5</code>，
                與這裡觀察到的 <code>transparentBlack40</code> 不同。兩者何者為準需要設計確認，
                這次沒有動 <code>pageMask</code>。
              </li>
              <li>
                <strong>Figma 的變體會補齊</strong>：Gray 背景原本沒畫「3 button」、
                None 背景原本沒畫 row 變體，2026-08-17 經使用者確認屬於漏畫，設計稿會補上。
                元件本身不限制這些組合——<code>children</code> 由呼叫端自由組合，
                任何背景都能搭配任何列數。
              </li>
              <li>
                <strong>三顆按鈕一律用實心</strong>：None 背景的 3 button 變體原本畫成
                白底加描邊，2026-08-17 經使用者確認改用實心的 secondary 與 tertiary。
                <code>USpaceButton</code> 既有的三個 level 已經夠用，不另外新增描邊樣式。
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
