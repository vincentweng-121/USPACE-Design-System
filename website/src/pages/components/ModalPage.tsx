import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { IconPlaceholder, Pending, Playground, PendingImage, type PlaygroundDimension } from '../../components/spec';
import { semantic, palette } from '../../tokens/colors';
import { glass, elevation, touch } from '../../tokens/scalars';

// ── Types ──────────────────────────────────────────────────
type Category = 'list' | 'textarea' | 'image' | 'null';

// ── SVG Icons ──────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="6" x2="18" y2="18" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="18" y1="6" x2="6" y2="18" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="var(--accent)" />
      <polyline points="8,12.5 11,15.5 16.5,9" stroke={palette.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ── Divider ────────────────────────────────────────────────
function ModalDivider() {
  return <div style={{ height: 1, background: 'var(--border-divider)', width: '100%' }} />;
}

// ── List Item ──────────────────────────────────────────────
function ListItem({ title, showCheck, showTopDivider = false }: {
  title: string; showCheck?: boolean; showTopDivider?: boolean;
}) {
  return (
    <div>
      {showTopDivider && <ModalDivider />}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '16px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <IconPlaceholder color="var(--text-secondary)" size={32} />
          <span style={{
            fontSize: 18, lineHeight: '26px',
            fontFamily: '"PingFang TC", sans-serif',
            color: 'var(--text-primary)',
          }}>
            {title}
          </span>
        </div>
        {showCheck && <CheckIcon />}
      </div>
      <ModalDivider />
    </div>
  );
}

// ── Modal Preview ──────────────────────────────────────────
function ModalPreview({ category, showBottomBar, showNotice }: {
  category: Category; showBottomBar: boolean; showNotice: boolean;
}) {
  return (
    <div style={{
      width: 390, maxWidth: '100%',
      borderRadius: '20px 20px 0 0',
      background: semantic.pagePopup,
      backdropFilter: `blur(${glass.blurSigma}px)`,
      WebkitBackdropFilter: `blur(${glass.blurSigma}px)`,
      boxShadow: `0 0 ${elevation.shadowBlur}px ${semantic.shadowDefault}`,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px' }}>
        {/* TopSpacing */}
        <div style={{ height: 16 }} />

        {/* ActionBar: close button right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ cursor: 'pointer' }}><CloseIcon /></div>
        </div>

        {/* Title */}
        <div style={{
          textAlign: 'center',
          fontSize: 18, fontWeight: 500, lineHeight: '26px',
          fontFamily: '"PingFang TC", sans-serif',
          color: 'var(--text-primary)',
        }}>
          Title
        </div>
      </div>

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {category === 'list' && (
          <div>
            <ListItem title="Title" showCheck />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
          </div>
        )}

        {category === 'textarea' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              fontSize: 12, lineHeight: '16px', paddingLeft: 8,
              fontFamily: '"PingFang TC", sans-serif',
              color: 'var(--text-primary)',
            }}>
              Label
            </div>
            <div style={{
              height: 144, borderRadius: 20,
              background: semantic.inputBgDefault,
              padding: '16px 20px',
            }}>
              <span style={{
                fontSize: 14, lineHeight: '20px',
                fontFamily: '"PingFang TC", sans-serif',
                color: semantic.inputTextPlaceholder,
              }}>
                Placeholder
              </span>
            </div>
          </div>
        )}

        {category === 'image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              height: 196, borderRadius: 20,
              background: 'var(--page-primary)',
            }} />
            {showNotice && (
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <IconPlaceholder color="var(--text-secondary)" size={16} />
                <span style={{
                  fontSize: 12, lineHeight: '16px',
                  fontFamily: '"PingFang TC", sans-serif',
                  color: 'var(--text-secondary)',
                  flex: 1,
                }}>
                  A reminder or explanatory text
                </span>
              </div>
            )}
          </div>
        )}

        {/* Null category: empty */}
      </div>

      {/* BottomBar or Home Indicator */}
      {showBottomBar ? (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            padding: '12px 0',
            borderRadius: 1000,
            background: 'var(--grey800)',
            textAlign: 'center',
            fontSize: 16, lineHeight: '24px',
            fontFamily: '"PingFang TC", sans-serif',
            color: semantic.textAccent,
          }}>
            Label
          </div>
          <div style={{ height: 20 }} />
        </div>
      ) : (
        <div style={{ height: 16 }} />
      )}
    </div>
  );
}

// ── Playground ─────────────────────────────────────────────

// ── Page ───────────────────────────────────────────────────
// ── Playground 的維度 ──
const playgroundDimensions: PlaygroundDimension[] = [
  { key: 'category', label: 'Content category', options: (['listItem', 'textArea', 'image', 'none'] as Category[]).map((c) => ({ value: c, label: c })) },
  { key: 'bottomBar', label: 'Bottom bar', options: [{ value: 'show', label: 'Show' }, { value: 'hide', label: 'Hide' }] },
  { key: 'notice', label: 'Notice text', options: [{ value: 'hide', label: 'Hide' }, { value: 'show', label: 'Show' }] },
];

export default function ModalPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Modal"
        lead="底部彈出式 Modal 元件，支援多種內容類型（確認對話框、選項列表、自訂內容），包含拖曳關閉與背景遮罩互動。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="modal-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="modal"
              dimensions={playgroundDimensions}
              render={(v) => <ModalPreview category={v.category as Category} showBottomBar={v.bottomBar === 'show'} showNotice={v.notice === 'show'} />}
            />
          </section>

          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <div>
              <Pending
                what="Anatomy"
                why="部件拆解圖尚未製作。需先確認各部位的正式名稱與必要性，避免自行命名。"
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <div>
              <Pending
                what="Color"
                why="各部位的 token 對應尚未整理。維度已確認，但要逐一列出底色、描邊、文字的 token 需先比對 Figma 或細讀實作。"
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>展開/關閉</strong>：Modal 從底部滑入展開，點擊 close button 或背景 overlay 關閉，從底部滑出。</li>
                <li><strong>List Category</strong>：點擊 list item 可觸發選取（顯示 check icon）或導航行為，依業務邏輯決定。</li>
                <li><strong>TextArea Category</strong>：內嵌 TextArea 元件，使用者可直接輸入文字，搭配 BottomBar 提交。</li>
                <li><strong>Image Category</strong>：展示圖片內容，可選顯示 notice 提示文字，搭配 BottomBar 進行確認操作。</li>
                <li><strong>Null Category</strong>：空內容區域，作為自訂內容的容器，最小高度 187px。</li>
                <li><strong>BottomBar</strong>：全寬 stadium shape 按鈕，使用 actionPrimaryBg + actionPrimaryContentAccent token，點擊執行主要操作。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="modal-measurements" note="標出高度、內距、間距的量測圖。" />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Container</strong>: width 390px (iPhone), top borderRadius 20px</li>
                <li><strong>Padding</strong>: horizontal 20px (margine)</li>
                <li><strong>Gap</strong>: 16px (spacer/16pt) between header and content</li>
                <li><strong>TopSpacing</strong>: 16px above ActionBar</li>
                <li><strong>Title</strong>: PingFang TC 18px/26px Medium (displayL), center-align</li>
                <li><strong>Paragraph</strong>: PingFang TC 14px/20px (bodyM), center-align, pt=12px</li>
                <li><strong>Close icon</strong>: 24px, right-aligned</li>
                <li><strong>List item</strong>: py=16px, icon 32px + gap 12px + title 18px</li>
                <li><strong>BottomBar</strong>: pt=20px, full-width stadium button, py=12px</li>
                <li><strong>Home Indicator</strong>: 20px bottom spacing (with BottomBar) or 16px (without)</li>
                <li><strong>Image</strong>: 196px height, radius 20px, pagePrimary bg</li>
                <li><strong>Notice text</strong>: icon 16px + gap 8px + captionS text</li>
              </ul>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="modal-toucharea" note={`標出觸控熱區範圍，並確認是否達到 ${touch.minTarget}px 最小建議值。`} />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（modal-do-caseN / modal-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>底部彈出式互動</strong>：底部彈出式 Modal，用於需要使用者注意但不離開當前頁面的場景。</li>
                <li><strong>毛玻璃效果降低脫離感</strong>：使用毛玻璃效果（pagePopup + backdrop blur），暗示下層內容仍在，降低脫離感。</li>
                <li><strong>4 種內容類別覆蓋常見情境</strong>：List / TextArea / Image / Null 四種內容類別，覆蓋常見的 modal 使用情境。</li>
                <li><strong>Header 複用 PageTitle 結構</strong>：Header 複用 PageTitle modal type 結構（close button + center title），保持跨元件一致性。</li>
                <li><strong>BottomBar 為可選行動按鈕</strong>：BottomBar 為可選的全寬行動按鈕，用於確認/提交等主要操作。</li>
                <li><strong>List 支援選擇狀態</strong>：List 項目支援 check icon，用於選擇類場景。</li>
              </ul>
            </div>
          </section>

          {/* ── Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <Pending
              what="Accessibility"
              why="無障礙說明尚未撰寫。需先確認觸控目標尺寸、讀屏軟體的朗讀內容與對比度是否達標，避免寫出未經驗證的保證。"
            />
          </section>

        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Property', 'Token'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Background', 'pagePopup (transparentWhite80)'],
                    ['Backdrop blur', `${glass.blurSigma}px gaussian blur`],
                    ['Shadow', `0 0 ${elevation.shadowBlur}px ${semantic.shadowDefault} (shadowDefault)`],
                    ['Border radius', 'Number/20 (20px), top only'],
                    ['Title text', 'textPrimary (displayL 18px/26px Medium)'],
                    ['Paragraph text', 'textSecondary (bodyM 14px/20px)'],
                    ['Close icon', 'contentPrimary (24px)'],
                    ['List title', 'textPrimary (bodyL 18px/26px)'],
                    ['List icon', '32px leading icon'],
                    ['List divider', 'borderDivider'],
                    ['Button bg', `actionPrimaryBg (${semantic.actionPrimaryBg})`],
                    ['Button text', `actionPrimaryContentAccent (${semantic.actionPrimaryContentAccent})`],
                    ['Image placeholder', 'pagePrimary, 196px, radius 20px'],
                    ['Notice icon', 'contentSecondary (16px)'],
                    ['Notice text', 'textSecondary (captionS 12px/16px)'],
                  ].map(([prop, token]) => (
                    <tr key={prop}>
                      <td>{prop}</td>
                      <td><code>{token}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Content Categories</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Category', 'Content', 'BottomBar', 'Extra Props'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['List Item', 'Icon + title list with dividers', 'Optional', 'list1-6 visibility, check icon'],
                    ['Text Area', 'Embedded TextArea component', 'Optional', 'showLabel, showHint'],
                    ['Image', 'Image placeholder + notice text', 'Optional', 'showReminderText'],
                    ['Null', 'Empty content (min-height 187px)', 'Optional', '—'],
                  ].map(([cat, content, bar, props]) => (
                    <tr key={cat}>
                      <td>{cat}</td>
                      <td>{content}</td>
                      <td>{bar}</td>
                      <td>{props}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li>Modal 使用 <code>pagePopup</code> + BackdropFilter 實現毛玻璃效果。</li>
                <li>Dart 實作使用 composable 設計：<code>USpaceModal</code> 接受 child widget，搭配 <code>USpaceModalListItem</code> 和 <code>USpaceModalImageSection</code> helper widgets。</li>
                <li>BottomBar 的按鈕為全寬 stadium shape，使用 actionPrimaryBg + actionPrimaryContentAccent。</li>
                <li>Header 複用 PageTitle modal type 的結構（close button, center title），但直接內建於 Modal 中以簡化使用。</li>
                <li>List item 第一項可帶 check icon（trailing），表示已選取狀態。</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
