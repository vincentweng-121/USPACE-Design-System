import SectionTitle from '../../components/SectionTitle';
import { listSpec } from '../../tokens/componentSpecs';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Pending, PendingImage, TokensSpecs } from '../../components/spec';
import { semantic } from '../../tokens/colors';

function MiniToggle({ value }: { value: boolean }) {
  return (
    <div
      style={{
        width: 64, height: 24, borderRadius: 27, padding: 2,
        background: value ? semantic.actionPrimaryContentAccent : semantic.actionPrimaryContent,
        display: 'flex', alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 34, height: 20, borderRadius: 27,
        background: semantic.contentInverse, transition: 'all 0.2s',
      }} />
    </div>
  );
}

export default function ListPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="List"
        lead="列表項目元件，支援 5 種 trailing type（None / Detail / Tag / Toggle / Arrow），適用於設定頁面與資訊列表。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="list-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <div style={{
              padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16, width: '100%',
              background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
              display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: 400 }}>
              {/* Heading */}
              <div style={{ padding: '32px 0 8px', fontSize: 14, color: 'var(--text-secondary)' }}>
                Section Heading
              </div>

              {/* Toggle item */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey200)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'var(--text-secondary)' }}>⚙</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Setting Item</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>trailing: toggle</div>
                </div>
                <MiniToggle value />
              </div>

              {/* Button item */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey200)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'var(--text-secondary)' }}>★</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Action Item</div>
                </div>
                <button style={{
                  padding: '8px 24px', borderRadius: 100, border: 'none', flexShrink: 0,
                  background: semantic.actionPrimaryBg, color: semantic.actionPrimaryContent, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Action</button>
              </div>

              {/* Value item */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey200)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'var(--text-secondary)' }}>📍</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Value Item</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>trailing: value</div>
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', flexShrink: 0 }}>Detail</span>
              </div>

              {/* Selectable item */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey200)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'var(--text-secondary)' }}>◎</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Selectable</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ padding: '1px 12px', borderRadius: 100, background: 'var(--grey100)', fontSize: 14, color: 'var(--text-primary)' }}>Tag</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: 'none',
                    background: 'var(--text-primary)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s' }}>
                    <span style={{ color: 'var(--page-primary)', fontSize: 16 }}>✓</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>

          {/* ── Tokens & specs ── */}
          <section className="section">
            <SectionTitle>Tokens &amp; specs</SectionTitle>
            <TokensSpecs spec={listSpec} />
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
                <li><strong>none</strong>：純資訊展示，無互動行為。</li>
                <li><strong>button</strong>：點擊右側按鈕觸發對應動作。</li>
                <li><strong>toggle</strong>：點擊右側開關切換布林值狀態。</li>
                <li><strong>value</strong>：右側顯示文字數值，通常搭配導航行為。</li>
                <li><strong>selectable</strong>：右側顯示 Tag 與 Checkbox，用於多選場景。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="list-measurements" note="標出高度、內距、間距的量測圖。" />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>ListHeading</strong>: pt=32, pb=8, bodyS textSecondary</li>
                <li><strong>ListItem</strong>: py=16, leading right margin 12px, trailing left margin 20px</li>
                <li><strong>Title</strong>: bodyL textPrimary</li>
                <li><strong>Subtitle</strong>: bodyS textSecondary（與 hints 互斥）</li>
                <li><strong>Hints</strong>: captionS textSecondary, 1-2 行</li>
              </ul>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="list-toucharea" note="標出觸控熱區範圍，並確認是否達到 44px 最小建議值。" />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don&apos;t 圖例"
              why="Button 頁是三組對照圖（list-do-caseN / list-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>資訊展示單元</strong>：ListItem 是 USPACE 中最常用的資訊展示單元，用於設定頁、選單、歷史紀錄等。</li>
                <li><strong>Trailing 對應互動模式</strong>：5 種 trailing type 對應不同互動模式：none（純資訊）、button（觸發動作）、toggle（切換開關）、value（顯示數值）、selectable（多選）。</li>
                <li><strong>Leading 保持彈性</strong>：Leading 由呼叫端決定形狀與尺寸，保持元件彈性。</li>
                <li><strong>群組分隔</strong>：ListHeading 作為群組分隔，提供視覺層次。</li>
                <li><strong>視覺邊界</strong>：Divider 分隔各項目，維持清晰的視覺邊界。</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Trailing Types</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 400 }}>
                <thead>
                  <tr>
                    {['Type', 'Description'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['none', '無 trailing 元件'],
                    ['button', 'Small USpaceButton'],
                    ['toggle', 'USpaceToggle switch (64×24 pill)'],
                    ['value', 'bodyS textSecondary 文字'],
                    ['selectable', 'Tag label + Checkbox（28px circle）'],
                  ].map(([type, desc]) => (
                    <tr key={type}>
                      <td><code>{type}</code></td>
                      <td>{desc}</td>
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
