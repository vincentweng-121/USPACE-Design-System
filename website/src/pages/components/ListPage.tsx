import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

export default function ListPage() {
  const [toggled, setToggled] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>List</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>list.dart</code>。
        包含 ListHeading 和 ListItem 兩個元件。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        ListItem 支援 5 種 trailing type：none / button / toggle / value / selectable。
        Leading 由呼叫端決定形狀與尺寸。
      </p>

      <SectionTitle>Interactive Demo</SectionTitle>
      <div style={{
        padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40,
      }}>
        {/* Heading */}
        <div style={{ padding: '32px 0 8px', fontSize: 14, color: 'var(--text-secondary)' }}>
          Section Heading
        </div>

        {/* Toggle item */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>⚙</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Setting Item</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>trailing: toggle</div>
          </div>
          <div onClick={() => setToggled(!toggled)} style={{
            width: 51, height: 31, borderRadius: 16, flexShrink: 0,
            background: toggled ? '#A7D100' : '#D9D9D9',
            position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
          }}>
            <div style={{ width: 27, height: 27, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: toggled ? 22 : 2, transition: 'left 0.2s' }} />
          </div>
        </div>

        {/* Button item */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>★</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Action Item</div>
          </div>
          <button style={{
            padding: '8px 24px', borderRadius: 100, border: 'none', flexShrink: 0,
            background: '#323237', color: '#606060', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          }}>Action</button>
        </div>

        {/* Value item */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📍</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Value Item</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>trailing: value</div>
          </div>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)', flexShrink: 0 }}>Detail</span>
        </div>

        {/* Selectable item */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>◎</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Selectable</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ padding: '1px 12px', borderRadius: 100, background: 'var(--grey800)', fontSize: 14 }}>Tag</span>
            <div onClick={() => setSelected(!selected)} style={{
              width: 28, height: 28, borderRadius: '50%',
              border: selected ? 'none' : '2px solid var(--text-secondary)',
              background: selected ? '#C3F400' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              {selected && <span style={{ color: '#000', fontSize: 16 }}>✓</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Trailing Types */}
      <SectionTitle>Trailing Types</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
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
              ['toggle', 'USpaceToggle switch'],
              ['value', 'bodyS textSecondary 文字'],
              ['selectable', 'Tag label + Checkbox（28px circle）'],
            ].map(([type, desc]) => (
              <tr key={type} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{type}</code></td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 40 }}>
        <SectionTitle>Layout Specs</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>ListHeading</strong>: pt=32, pb=8, bodyS textSecondary</li>
            <li><strong>ListItem</strong>: py=16, leading right margin 12px, trailing left margin 20px</li>
            <li><strong>Title</strong>: bodyL textPrimary</li>
            <li><strong>Subtitle</strong>: bodyS textSecondary（與 hints 互斥）</li>
            <li><strong>Hints</strong>: captionS textSecondary, 1-2 行</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
