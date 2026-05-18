import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

export default function TogglePage() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Toggle</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>toggle.dart</code>。
        基於 Flutter Switch widget。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        On 色暫定為 <code style={{ color: 'var(--accent)' }}>neonLime800</code>，待使用者確認後更新。
      </p>

      <SectionTitle>Interactive Demo</SectionTitle>
      <div style={{
        padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40,
      }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {[
            { label: 'On State', value: on, set: setOn },
            { label: 'Off State', value: off, set: setOff },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>{item.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  onClick={() => item.set(!item.value)}
                  style={{
                    width: 51, height: 31, borderRadius: 16,
                    background: item.value ? '#A7D100' : '#D9D9D9',
                    position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 27, height: 27, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2,
                    left: item.value ? 22 : 2, transition: 'left 0.2s',
                  }} />
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  {item.value ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['Property', 'Token / Value'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Thumb color', 'Colors.white'],
              ['Track (on)', 'neonLime800 (#A7D100) ⚠️ 暫定'],
              ['Track (off)', 'actionPrimaryContent'],
              ['Track outline', 'Colors.transparent'],
            ].map(([prop, token]) => (
              <tr key={prop} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px' }}>{prop}</td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{token}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
