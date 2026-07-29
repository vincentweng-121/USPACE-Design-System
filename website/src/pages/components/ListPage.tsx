import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { semantic, palette } from '../../tokens/colors';

function MiniToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 64, height: 24, borderRadius: 27, padding: 2,
        background: value ? semantic.actionPrimaryContentAccent : semantic.actionPrimaryContent,
        display: 'flex', alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
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
  const [toggled, setToggled] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <PageHero
        title="List"
        lead="列表項目元件，支援 5 種 trailing type（None / Detail / Tag / Toggle / Arrow），適用於設定頁面與資訊列表。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{
            padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16, width: '100%',
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
            marginBottom: 120,
          }}>
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
              <MiniToggle value={toggled} onChange={setToggled} />
            </div>

            {/* Button item */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey200)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'var(--text-secondary)' }}>★</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Action Item</div>
              </div>
              <button style={{
                padding: '8px 24px', borderRadius: 100, border: 'none', flexShrink: 0,
                background: semantic.actionPrimaryBg, color: semantic.actionPrimaryContent, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              }}>Action</button>
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
                <div onClick={() => setSelected(!selected)} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: selected ? 'none' : '2px solid var(--text-secondary)',
                  background: selected ? semantic.contentAccent : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}>
                  {selected && <span style={{ color: palette.black, fontSize: 16 }}>✓</span>}
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>資訊展示單元</strong>：ListItem 是 USPACE 中最常用的資訊展示單元，用於設定頁、選單、歷史紀錄等。</li>
              <li><strong>Trailing 對應互動模式</strong>：5 種 trailing type 對應不同互動模式：none（純資訊）、button（觸發動作）、toggle（切換開關）、value（顯示數值）、selectable（多選）。</li>
              <li><strong>Leading 保持彈性</strong>：Leading 由呼叫端決定形狀與尺寸，保持元件彈性。</li>
              <li><strong>群組分隔</strong>：ListHeading 作為群組分隔，提供視覺層次。</li>
              <li><strong>視覺邊界</strong>：Divider 分隔各項目，維持清晰的視覺邊界。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>none</strong>：純資訊展示，無互動行為。</li>
              <li><strong>button</strong>：點擊右側按鈕觸發對應動作。</li>
              <li><strong>toggle</strong>：點擊右側開關切換布林值狀態。</li>
              <li><strong>value</strong>：右側顯示文字數值，通常搭配導航行為。</li>
              <li><strong>selectable</strong>：右側顯示 Tag 與 Checkbox，用於多選場景。</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          {/* Trailing Types */}
          <SectionTitle>Trailing Types</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 400 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Type', 'Description'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
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
                  <tr key={type} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}><code>{type}</code></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Specs */}
          <SectionTitle>Layout Specs</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>ListHeading</strong>: pt=32, pb=8, bodyS textSecondary</li>
              <li><strong>ListItem</strong>: py=16, leading right margin 12px, trailing left margin 20px</li>
              <li><strong>Title</strong>: bodyL textPrimary</li>
              <li><strong>Subtitle</strong>: bodyS textSecondary（與 hints 互斥）</li>
              <li><strong>Hints</strong>: captionS textSecondary, 1-2 行</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
