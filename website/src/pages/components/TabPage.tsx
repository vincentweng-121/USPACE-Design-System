import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

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
      background: 'var(--grey800)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: 14, color: '#fff', fontWeight: 600,
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
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {tabTypes.map(t => (
              <button key={t.value} onClick={() => { setType(t.value); setActiveIndex(0); }} style={{
                padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
                background: type === t.value ? 'var(--accent)' : 'var(--page-primary)',
                color: type === t.value ? '#000' : 'var(--text-secondary)',
                fontWeight: type === t.value ? 600 : 400,
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Row */}
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
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
          Figma Type: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{type}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {type === 'Input' ? 'Default only' : `Default + Active`}
        </span>
      </div>
    </div>
  );
}

export default function TabPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Tab</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>tab.dart</code>。
        涵蓋 Tab、Filter chip 和 Input chip 三大類。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 972:7985。5 種 type × 2 種 state（Default / Active）。
        Input type 僅有 Default 狀態，帶 Close icon。
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ maxWidth: 560, marginBottom: 48 }}>
        <TabPlayground />
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
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
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{bg}</code></td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{text}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Layout Specs */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Layout Specs</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
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
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 11 }}>{pad}</code></td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{font}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{lh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extra notes */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Notes</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Tab_icon</strong>: Leading icon 20×20，icon color 與 text color 同源</li>
            <li><strong>Tab_Graphic</strong>: Leading graphic 31.5×31.5（如 product image）</li>
            <li><strong>Filter</strong>: 文字 maxWidth 132px，超過 ellipsis</li>
            <li><strong>Input</strong>: 帶 16px Close icon，僅 Default 狀態，outline border（<code style={{ color: 'var(--accent)' }}>borderDivider</code>）</li>
            <li><strong>Active state</strong>: 由呼叫端管理，Input type 無 active 狀態</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
