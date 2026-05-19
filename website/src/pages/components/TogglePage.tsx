import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

function Toggle({ value, onChange, disabled = false }: {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const trackColor = value
    ? '#C3F400' // actionPrimaryContentAccent
    : disabled
      ? '#EEEEEE' // actionDisabledBg
      : '#D9D9D9'; // actionPrimaryContent

  const opacity = value && disabled ? 0.25 : 1;

  return (
    <div
      onClick={() => !disabled && onChange(!value)}
      style={{
        width: 64, height: 24, borderRadius: 27, padding: 2,
        background: trackColor,
        display: 'flex', alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity,
      }}
    >
      <div style={{
        width: 34, height: 20, borderRadius: 27,
        background: '#FFFFFF', // contentInverse
        transition: 'all 0.2s',
      }} />
    </div>
  );
}

function TogglePlayground() {
  const [isOn, setIsOn] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Status</span>
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {(['Enable', 'Disable'] as const).map(s => {
              const active = s === 'Enable' ? !disabled : disabled;
              return (
                <button key={s} onClick={() => setDisabled(s === 'Disable')} style={{
                  padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.12s',
                  background: active ? 'var(--accent)' : 'var(--page-primary)',
                  color: active ? '#000' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 400,
                }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toggle Demo */}
      <div style={{
        padding: '32px 24px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Toggle value={isOn} onChange={setIsOn} disabled={disabled} />
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {isOn ? 'On' : 'Off'}
          </span>
        </div>
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
          Switch: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{isOn ? 'ON' : 'OFF'}</strong>
          {' / '}
          Status: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{disabled ? 'Disable' : 'Enable'}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {isOn && disabled ? 'opacity: 0.25' : 'opacity: 1.0'}
        </span>
      </div>
    </div>
  );
}

export default function TogglePage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Toggle</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>toggle.dart</code>。
        自訂 Toggle Switch，不依賴 Flutter Switch widget。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 191:6185。2 states (ON / OFF) × 2 status (Enable / Disable)。
        Thumb 為 34×20 pill shape，非圓形。
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ maxWidth: 560, marginBottom: 140 }}>
        <TogglePlayground />
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['State', 'Track Color', 'Thumb', 'Opacity'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['ON + Enable', 'actionPrimaryContentAccent', 'contentInverse', '1.0'],
              ['ON + Disable', 'actionPrimaryContentAccent', 'contentInverse', '0.25'],
              ['OFF + Enable', 'actionPrimaryContent', 'contentInverse', '1.0'],
              ['OFF + Disable', 'actionDisabledBg', 'contentInverse', '1.0'],
            ].map(([state, track, thumb, opacity], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{state}</td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{track}</code></td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{thumb}</code></td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{opacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Layout Specs */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Layout Specs</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                {['Part', 'Width', 'Height', 'Radius', 'Padding'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Track', '64px', '24px', '27px', '2px'],
                ['Thumb', '34px', '20px', '27px', '—'],
              ].map(([part, w, h, r, p]) => (
                <tr key={part} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{part}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{w}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{h}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{r}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Notes</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Thumb shape</strong>: 34×20 pill（rounded=27），非圓形</li>
            <li><strong>ON + Disable</strong>: 使用 Opacity widget 包裹，opacity=0.25</li>
            <li><strong>OFF + Disable</strong>: track 改為 actionDisabledBg（不使用 opacity）</li>
            <li><strong>不使用 Flutter Switch</strong>: 自訂 Container + GestureDetector，以精確控制尺寸與圓角</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
