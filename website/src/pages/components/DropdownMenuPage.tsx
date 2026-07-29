import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Pending, SpecBox, SpecimenRow } from '../../components/spec';
import { semantic } from '../../tokens/colors';

// ── Types ──────────────────────────────────────────────────
type Availability = 'enabled' | 'incomplete' | 'error';

// ── Chevron SVG ────────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Playground ─────────────────────────────────────────────
/** 收合狀態的 Dropdown 預覽。無互動，供規格展示用。 */
function DropdownPreview({ availability }: { availability: Availability }) {
  const isError = availability !== 'enabled';
  return (
    <div style={{ width: 240, flexShrink: 0 }}>
      <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 6, paddingLeft: 8 }}>
        {availability}
      </div>
      <div
        style={{
          height: 48,
          borderRadius: 1000,
          background: 'var(--input-bg)',
          border: '1px solid var(--border-divider)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          opacity: availability === 'enabled' ? 1 : 0.7,
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 14,
            fontFamily: '"PingFang TC", sans-serif',
            color: 'var(--input-text-placeholder)',
          }}
        >
          Placeholder
        </div>
        <span style={{ color: 'var(--text-secondary)', display: 'flex' }}>
          <ChevronDown open={false} />
        </span>
      </div>
      <div
        className="text-sm"
        style={{
          color: isError ? 'var(--input-text-error)' : 'var(--text-secondary)',
          marginTop: 6,
          paddingLeft: 8,
        }}
      >
        Hint text
      </div>
    </div>
  );
}


// ── Page ───────────────────────────────────────────────────
export default function DropdownMenuPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Dropdown Menu"
        lead="下拉選單元件，支援 5 種互動狀態（Default / Active / Filled / Disabled / Error），適用於表單中的選項選擇。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <p className="text-md text-muted" style={{ marginBottom: 32 }}>
              收合狀態下的 3 種可用性。展開後的面板見下方 States。
            </p>
            <SpecBox>
              <SpecimenRow n={1} title="Availability" note="Incomplete 與 Error 的差別在提示文字，觸發區外觀相同">
                {(['enabled', 'incomplete', 'error'] as Availability[]).map((a) => (
                  <DropdownPreview key={a} availability={a} />
                ))}
              </SpecimenRow>
            </SpecBox>
          </section>

          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <div style={{ marginTop: 32 }}>
              <Pending
                what="Anatomy"
                why="部件拆解圖尚未製作。需先確認各部位的正式名稱與必要性，避免自行命名。"
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <div style={{ marginTop: 32 }}>
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
                <li><strong>Default</strong>：未選取狀態，顯示 Placeholder 文字，面板隱藏，Chevron 朝下。</li>
                <li><strong>Selecting</strong>：點擊觸發器後面板展開，Chevron 旋轉 180°，選項可捲動瀏覽。點擊外部區域收合面板。</li>
                <li><strong>Complete</strong>：已選取選項，觸發器顯示選取文字，面板隱藏，Chevron 恢復朝下。</li>
                <li><strong>Incomplete</strong>：必填欄位未完成，觸發器顯示 Placeholder，Hint 變為紅色錯誤提示，面板隱藏。</li>
                <li><strong>Error</strong>：輸入驗證失敗，Hint 變為紅色錯誤提示，面板隱藏。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Trigger</strong>: height 48px, borderRadius 1000, padding horizontal 20px</li>
                <li><strong>Label</strong>: PingFang TC 12px/16px Regular, padding horizontal 8px</li>
                <li><strong>Input/Placeholder</strong>: PingFang TC 14px/20px Regular</li>
                <li><strong>Hint</strong>: SF Pro 14px/16px Regular, padding horizontal 8px</li>
                <li><strong>Chevron</strong>: 16px, contentSecondary, trailing</li>
                <li><strong>Panel</strong>: borderRadius 20px, padding 16px 20px, gap 8px</li>
                <li><strong>Panel items</strong>: PingFang TC 14px/20px Regular, inputText</li>
                <li><strong>Scrollbar</strong>: 4px wide, borderRadius 1000</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>與 TextField 共用視覺語言</strong>：同高度 48px、StadiumBorder，降低使用者認知負擔。</li>
                <li><strong>5 種狀態覆蓋完整流程</strong>：Default → Selecting → Complete / Incomplete / Error，涵蓋從未操作到選取完成或異常的所有情境。</li>
                <li><strong>面板與觸發器的圓角層次</strong>：下拉面板使用 20px 圓角，與觸發器的 Stadium 圓角形成層次差異，視覺上區分操作區與選項區。</li>
                <li><strong>面板可捲動</strong>：適應不同數量的選項，面板設有 maxHeight 限制並支援捲動，避免畫面被過長列表撐開。</li>
                <li><strong>Chevron 旋轉反饋</strong>：Chevron 圖示 180° 旋轉反饋展開/收合狀態，提供即時的視覺回饋。</li>
              </ul>
            </div>
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
                    ['Trigger background', 'inputBgDefault (white)'],
                    ['Panel background', 'inputBgDefault (white)'],
                    ['Label text', 'inputText (bodyS 12px)'],
                    ['Input text', 'inputText (bodyM 14px)'],
                    ['Placeholder', 'inputTextPlaceholder'],
                    ['Hint (normal)', 'textSecondary (sfCaptionS 14px)'],
                    ['Hint (error)', `inputTextError (${semantic.inputTextError})`],
                    ['Chevron icon', 'contentSecondary'],
                    ['Panel border radius', '20px (number/20)'],
                    ['Scrollbar track', 'pagePrimary'],
                    ['Scrollbar thumb', 'borderDivider'],
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
            <SectionTitle>Status Descriptions</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Status', 'Trigger', 'Panel', 'Hint'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Default', 'Placeholder text', 'Hidden', 'Optional (showHint)'],
                    ['Complete', 'Selected text', 'Hidden', 'Optional (showHint)'],
                    ['Selecting', 'Selected text', 'Visible, scrollable', 'Hidden'],
                    ['Incomplete', 'Placeholder text', 'Hidden', 'Error hint (red)'],
                    ['Error', 'Input text', 'Hidden', 'Error hint (red)'],
                  ].map(([status, trigger, panel, hint]) => (
                    <tr key={status}>
                      <td>{status}</td>
                      <td>{trigger}</td>
                      <td>{panel}</td>
                      <td>{hint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
