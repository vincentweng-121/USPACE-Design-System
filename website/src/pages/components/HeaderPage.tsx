import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Pending, Playground, PendingImage, type PlaygroundDimension } from '../../components/spec';
import { semanticDark } from '../../tokens/colors';

const types = ['FullPage', 'Floating', 'Modal'] as const;

/** 依 token 渲染的 Header 預覽。無互動，供規格展示用。 */
function HeaderPreview({ type }: { type: (typeof types)[number] }) {
  const isFull = type === 'FullPage';
  return (
    <div style={{ width: 240, flexShrink: 0 }}>
      <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>
        {type}
      </div>
      <div
        style={{
          background: isFull ? semanticDark.pagePrimary : semanticDark.pageSecondary,
          borderRadius: isFull ? 12 : type === 'Floating' ? '24px 24px 12px 12px' : '20px 20px 12px 12px',
          border: '1px solid var(--border-divider)',
          overflow: 'hidden',
        }}
      >
        {type === 'Floating' && (
          <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
            {/* GrabBar 用 borderDivider，見 header.dart _GrabBarSpacing */}
            <div style={{ width: 40, height: 4, borderRadius: 100, background: semanticDark.borderDivider }} />
          </div>
        )}
        {type === 'Modal' && <div style={{ height: 16 }} />}
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, color: semanticDark.contentPrimary }}>&#8249;</span>
          <span style={{ fontSize: 20, color: semanticDark.contentPrimary }}>&#x2715;</span>
        </div>
        <div style={{ padding: '0 14px 20px' }}>
          <div
            style={{
              fontSize: isFull ? 22 : 18,
              color: semanticDark.textPrimary,
              textAlign: isFull ? 'left' : 'center',
            }}
          >
            {isFull ? 'Page Title' : type === 'Floating' ? 'Sheet Title' : 'Modal Title'}
          </div>
          <div
            style={{
              fontSize: 13,
              color: semanticDark.textSecondary,
              marginTop: 6,
              textAlign: isFull ? 'left' : 'center',
            }}
          >
            Subtitle text here
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Playground 的維度 ──
const playgroundDimensions: PlaygroundDimension[] = [
  { key: 'type', label: 'Type', options: types.map((t) => ({ value: t, label: t })) },
];

export default function HeaderPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Header"
        lead="頁面頂部標題列。3 種 type 對應不同的容器情境，可搭配返回按鈕、操作按鈕與副標題。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="header-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="header"
              dimensions={playgroundDimensions}
              render={(v) => <HeaderPreview type={v.type as (typeof types)[number]} />}
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
                <li><strong>Default</strong>：標題完整顯示，LeftSection / RightSection 正常呈現。Header 固定於頂部，下方內容可捲動。</li>
                <li><strong>Scrolling</strong>：使用者向下捲動後，標題區域收縮（collapse），僅保留導航列與 action icon，釋放更多閱讀空間。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="header-measurements" note="標出高度、內距、間距的量測圖。" />
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Property', 'FullPage', 'Floating', 'Modal'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Title style', 'headingL (26px)', 'headingM (22px)', 'headingM (22px)'],
                    ['Corner radius', '0', '24px (top)', '20px (top)'],
                    ['GrabBar', 'No', 'Yes (40×4)', 'No'],
                    ['Title align', 'Left', 'Left / Center', 'Center'],
                    ['Top spacing', '16px', '20px (with grab)', '16px'],
                  ].map(([prop, ...vals]) => (
                    <tr key={prop}>
                      <td>{prop}</td>
                      {vals.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="header-toucharea" note="標出觸控熱區範圍，並確認是否達到 44px 最小建議值。" />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（header-do-caseN / header-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>3 種 Type 對應不同導航層級</strong>：FullPage 為頂層頁面、Floating 為可拖拉底部彈出、Modal 為對話框。</li>
                <li><strong>標題對齊反映資訊架構</strong>：FullPage 標題靠左，符合閱讀動線；Floating/Modal 標題置中，強調焦點內容。</li>
                <li><strong>GrabBar 暗示手勢操作</strong>：Floating 帶 GrabBar（40x4 pill）暗示可手勢拖拉。</li>
                <li><strong>支援 Scrolling 狀態</strong>：滾動時標題可收縮以釋放閱讀空間。</li>
                <li><strong>LeftSection 功能多樣</strong>：支援 chevron/title/profileTitle，由上下文決定。</li>
                <li><strong>RightSection 支援多種形式</strong>：支援 icon24/icon32/textButton 三種形式。</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Left Section Functions</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>fullPageIcon</strong> — ChevronLeft 24px（h=34 container）</li>
                <li><strong>floatingIcon</strong> — ChevronLeft 24px（h=24 container）</li>
                <li><strong>title</strong> — headingM 文字，left-align</li>
                <li><strong>profileTitle</strong> — headingL + w700，left-align</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
