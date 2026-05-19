import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

type Level = 'Accent' | 'Charging' | 'Primary' | 'Secondary' | 'Customized';

const levels: { name: Level; bg: string; text: string; tokenBg: string; tokenText: string }[] = [
  { name: 'Accent', bg: '#323237', text: '#C3F400', tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContentAccent' },
  { name: 'Charging', bg: '#323237', text: '#00F158', tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContentCharging' },
  { name: 'Primary', bg: '#323237', text: '#D9D9D9', tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContent' },
  { name: 'Secondary', bg: '#B4B4B4', text: '#323237', tokenBg: 'actionSecondaryBg', tokenText: 'actionSecondaryContent' },
  { name: 'Customized', bg: '', text: '', tokenBg: 'transparent', tokenText: 'actionTertiaryContent' },
];

export default function ButtonPage() {
  const [activeLevel, setActiveLevel] = useState<Level>('Accent');
  const current = levels.find(l => l.name === activeLevel)!;

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Button</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>button.dart</code>。
        支援 5 種 Level、2 種 Size，以及 Floating Button 系列。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        文字使用 <code style={{ color: 'var(--accent)' }}>labelL</code> Typography Token。
        Disabled 狀態由 <code style={{ color: 'var(--accent)' }}>onPressed: null</code> 觸發。
      </p>

      {/* Levels */}
      <SectionTitle>Levels</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 48 }}>Level</span>
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {levels.map(l => (
              <button key={l.name} onClick={() => setActiveLevel(l.name)} style={{
                padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
                background: activeLevel === l.name ? 'var(--accent)' : 'var(--page-primary)',
                color: activeLevel === l.name ? '#000' : 'var(--text-secondary)',
                fontWeight: activeLevel === l.name ? 600 : 400,
              }}>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40,
      }}>
        {activeLevel !== 'Customized' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Regular */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Regular</div>
              <button style={{
                padding: '12px 24px', borderRadius: 100, border: 'none', width: '100%', maxWidth: 320,
                background: current.bg, color: current.text,
                fontSize: 16, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {activeLevel} Button
              </button>
            </div>
            {/* Small */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Small</div>
              <button style={{
                padding: '8px 24px', borderRadius: 100, border: 'none',
                background: current.bg, color: current.text,
                fontSize: 16, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {activeLevel}
              </button>
            </div>
            {/* Disabled */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Disabled</div>
              <button style={{
                padding: '12px 24px', borderRadius: 100, border: 'none', width: '100%', maxWidth: 320,
                background: '#EEEEEE', color: '#D9D9D9',
                fontSize: 16, fontWeight: 400, cursor: 'not-allowed', fontFamily: 'inherit',
              }}>
                Disabled
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Gradient Border</div>
            <button style={{
              padding: '12px 24px', borderRadius: 100, background: 'transparent',
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(var(--page-secondary), var(--page-secondary)), linear-gradient(to right, #777777, #D9D9D9)',
              backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box',
              color: '#777777', fontSize: 16, fontWeight: 400, cursor: 'pointer',
              width: '100%', maxWidth: 320, fontFamily: 'inherit',
            }}>
              Customized Button
            </button>
          </div>
        )}
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['Level', 'Background', 'Text / Icon Color'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {levels.map(l => (
              <tr key={l.name} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{l.name}</td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{l.tokenBg}</code></td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{l.tokenText}</code></td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 500 }}>Disabled</td>
              <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>actionDisabledBg</code></td>
              <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>actionDisabledContent</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Size Spec */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Size Specs</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Regular</strong>: padding 12px vertical, full width, StadiumBorder</li>
            <li><strong>Small</strong>: padding 8px 24px, hug content, StadiumBorder</li>
            <li>Icon 置於文字左側，尺寸 24px，間距 8px</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
