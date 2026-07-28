import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented } from '../../components/Controls';
import { semantic } from '../../tokens/colors';

type TabType = 'Tab_icon' | 'Tab_Graphic' | 'Tab' | 'Filter' | 'Input';

const tabTypes: { value: TabType; label: string }[] = [
  { value: 'Tab_icon', label: 'Tab + Icon' },
  { value: 'Tab_Graphic', label: 'Tab + Graphic' },
  { value: 'Tab', label: 'Tab' },
  { value: 'Filter', label: 'Filter' },
  { value: 'Input', label: 'Input' },
];

function InfoIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5"/>
      <line x1="10" y1="9" x2="10" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="6.5" r="1" fill={color}/>
    </svg>
  );
}

function GraphicIcon() {
  return (
    <div style={{
      width: 31.5, height: 31.5, borderRadius: 8,
      background: semantic.contentPrimary, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: 14, color: semantic.textInverse, fontWeight: 600,
    }}>
      P
    </div>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="4.5" y1="4.5" x2="11.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11.5" y1="4.5" x2="4.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function getTabStyle(type: TabType, isActive: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', cursor: 'pointer',
    fontFamily: '"PingFang TC", sans-serif', whiteSpace: 'nowrap',
    transition: 'all 0.15s',
  };

  switch (type) {
    case 'Tab_icon':
      return {
        ...base, height: 38, paddingLeft: 12, paddingRight: 16, borderRadius: 32, gap: 4,
        background: isActive ? 'var(--text-primary)' : 'var(--border-divider)',
        color: isActive ? '#fff' : 'var(--text-primary)',
        fontSize: 14, lineHeight: '20px',
      };
    case 'Tab_Graphic':
      return {
        ...base, height: 38, paddingLeft: 8, paddingRight: 16, borderRadius: 32,
        background: isActive ? 'var(--text-primary)' : 'var(--border-divider)',
        color: isActive ? '#fff' : 'var(--text-primary)',
        fontSize: 14, lineHeight: '20px',
      };
    case 'Tab':
      return {
        ...base, height: 38, paddingLeft: 16, paddingRight: 16, borderRadius: 32,
        justifyContent: 'center',
        background: isActive ? 'var(--text-primary)' : 'var(--border-divider)',
        color: isActive ? '#fff' : 'var(--text-primary)',
        fontSize: 14, lineHeight: '20px',
      };
    case 'Filter':
      return {
        ...base, height: 32, paddingLeft: 12, paddingRight: 12, borderRadius: 1000,
        justifyContent: 'center', maxWidth: 156,
        background: isActive ? 'var(--grey800)' : 'var(--border-divider)',
        color: isActive ? '#fff' : 'var(--text-primary)',
        fontSize: 12, lineHeight: '16px',
      };
    case 'Input':
      return {
        ...base, paddingLeft: 12, paddingRight: 8, paddingTop: 8, paddingBottom: 8,
        borderRadius: 1000, gap: 4,
        background: '#fff', color: 'var(--text-secondary)',
        border: '1px solid var(--border-divider)',
        fontSize: 12, lineHeight: '16px',
      };
  }
}

function TabPlayground() {
  const [type, setType] = useState<TabType>('Tab_icon');
  const [activeIndex, setActiveIndex] = useState(0);
  const hasActive = type !== 'Input';

  const labels = ['Label A', 'Label B', 'Label C'];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 48 }}>Type</span>
          <Segmented
            compact
            value={type}
            onChange={v => { setType(v); setActiveIndex(0); }}
            options={tabTypes}
          />
        </div>
      </div>

      {/* Tab Row */}
      <div style={{
        padding: '24px 20px', borderRadius: 16, width: '100%',
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {labels.map((label, i) => {
            const isActive = hasActive && activeIndex === i;
            const style = getTabStyle(type, isActive);
            const textColor = isActive ? '#fff' : 'var(--text-primary)';

            return (
              <div
                key={i}
                onClick={() => hasActive && setActiveIndex(i)}
                style={style}
              >
                {type === 'Tab_icon' && <InfoIcon color={textColor} />}
                {type === 'Tab_Graphic' && <GraphicIcon />}
                <span style={{
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: (type === 'Filter' || type === 'Input') ? 132 : undefined,
                }}>
                  {label}
                </span>
                {type === 'Input' && (
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <CloseIcon color="var(--text-secondary)" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Active indicator */}
        {hasActive && (
          <div style={{
            marginTop: 16, fontSize: 12, color: 'var(--text-tertiary)',
          }}>
            Active: <strong style={{ color: 'var(--text-primary)' }}>{labels[activeIndex]}</strong>
          </div>
        )}
      </div>

      {/* State indicator */}
      <div style={{
        marginTop: 12, padding: '10px 16px', borderRadius: 8,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        fontSize: 12, color: 'var(--text-tertiary)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 8,
      }}>
        <span>
          Figma Type: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{type}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {type === 'Input' ? 'Default only' : `Default + Active`}
        </span>
      </div>
    </div>
  );
}

export default function TabPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Tab"
        lead="頁籤切換元件，支援 Segmented Control、Filter Tab 與 Input Tag 三種型態，適用於內容分類與篩選場景。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <TabPlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>三種用途各司其職</strong>：Tab 系列涵蓋三種用途：Tab（頁籤切換）、Filter（篩選條件）、Input（已選輸入標籤）。</li>
              <li><strong>圖示/圖形前綴增強辨識</strong>：Tab_icon / Tab_Graphic 提供圖示/圖形前綴，增強辨識度。</li>
              <li><strong>Active 狀態對比鮮明</strong>：Active 狀態用深色填充、白字，與 Default 的淺底形成強烈對比。</li>
              <li><strong>Filter 使用 pill shape</strong>：Filter 使用 pill shape（radius 1000），文字有 maxWidth 截斷避免破版。</li>
              <li><strong>Input 為唯讀標籤</strong>：Input 為唯讀標籤，僅有 Default 狀態，帶 Close icon 可移除。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：正常可點擊狀態，淺色背景搭配深色文字，表達可互動。</li>
              <li><strong>Active</strong>：深色填充背景搭配白色文字，明確標示當前選中項目。Tab / Tab_icon / Tab_Graphic / Filter 皆支援 Default 與 Active 切換。</li>
              <li><strong>Input</strong>：僅有 Default 狀態，使用 outline border，帶 Close icon 供使用者移除標籤。</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          {/* Token Mapping */}
          <SectionTitle>Token Mapping</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Type', 'State', 'Background', 'Text Color'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tab / Tab_icon / Tab_Graphic', 'Default', 'actionTertiaryBg', 'actionTertiaryContent'],
                  ['Tab / Tab_icon / Tab_Graphic', 'Active', 'contentPrimary', 'textInverse'],
                  ['Filter', 'Default', 'actionTertiaryBg', 'actionTertiaryContent'],
                  ['Filter', 'Active', 'actionPrimaryBg', 'textInverse'],
                  ['Input', 'Default', 'actionOutlineBg', 'actionOutlineContent'],
                ].map(([type, state, bg, text], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}>{type}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{state}</td>
                    <td style={{ padding: '10px 12px' }}><code>{bg}</code></td>
                    <td style={{ padding: '10px 12px' }}><code>{text}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Specs */}
          <SectionTitle>Layout Specs</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Type', 'Height', 'Radius', 'Padding', 'Font', 'Leading'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tab_icon', '38px', '32px', 'pl=12 pr=16 gap=4', 'labelM (14px)', '20px'],
                  ['Tab_Graphic', '38px', '32px', 'pl=8 pr=16', 'labelM (14px)', '20px'],
                  ['Tab', '38px', '32px', 'px=16', 'labelM (14px)', '20px'],
                  ['Filter', '32px', '1000px', 'px=12', 'labelS (12px)', '16px'],
                  ['Input', 'auto', '1000px', 'pl=12 pr=8 py=8 gap=4', 'labelS (12px)', '16px'],
                ].map(([type, h, r, pad, font, lh]) => (
                  <tr key={type} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{type}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{h}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{r}</td>
                    <td style={{ padding: '10px 12px' }}><code>{pad}</code></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{font}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{lh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <SectionTitle>Notes</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Tab_icon</strong>: Leading icon 20x20，icon color 與 text color 同源</li>
              <li><strong>Tab_Graphic</strong>: Leading graphic 31.5x31.5（如 product image）</li>
              <li><strong>Filter</strong>: 文字 maxWidth 132px，超過 ellipsis</li>
              <li><strong>Input</strong>: 帶 16px Close icon，僅 Default 狀態，outline border（<code>borderDivider</code>）</li>
              <li><strong>Active state</strong>: 由呼叫端管理，Input type 無 active 狀態</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
