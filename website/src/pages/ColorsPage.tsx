import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { paletteGroups, semanticGroups } from '../tokens/colors';

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = hex === '#FFFFFF' || hex === '#F8F8F8' || hex === '#EEEEEE' || hex === '#D9D9D9';

  return (
    <div
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 10, background: hex,
        border: '1px solid var(--border-divider)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: isLight ? '#323237' : '#fff',
        transition: 'transform 0.1s',
      }}>
        {copied ? 'Copied!' : ''}
      </div>
      <div style={{ fontSize: 12, marginTop: 6, color: 'var(--text-primary)' }}>{name}</div>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{hex}</div>
    </div>
  );
}

function SemanticRow({ name, light, dark }: { name: string; light: string; dark: string }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '200px 48px 120px 48px 120px',
      alignItems: 'center', gap: 12, padding: '8px 0',
      borderBottom: '1px solid var(--border-divider)',
    }}>
      <span style={{ fontSize: 13 }}>{name}</span>
      <div style={{ width: 32, height: 32, borderRadius: 6, background: light, border: '1px solid var(--border-divider)' }} />
      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{light}</span>
      <div style={{ width: 32, height: 32, borderRadius: 6, background: dark, border: '1px solid var(--border-divider)' }} />
      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{dark}</span>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>Colors</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 40 }}>
        USPACE 色票系統。點擊色塊可複製色碼。
      </p>

      <SectionTitle>Core Palette</SectionTitle>
      {paletteGroups.map(group => (
        <div key={group.name} style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{group.name}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: 12,
          }}>
            {group.colors.map(c => <ColorSwatch key={c.name} name={c.name} hex={c.hex} />)}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 48 }}>
        <SectionTitle>Semantic Tokens</SectionTitle>
        <div style={{
          display: 'grid', gridTemplateColumns: '200px 48px 120px 48px 120px',
          gap: 12, padding: '8px 0', marginBottom: 8,
          fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500,
        }}>
          <span>Token</span>
          <span>Light</span>
          <span />
          <span>Dark</span>
          <span />
        </div>
        {semanticGroups.map(group => (
          <div key={group.name} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 8, marginTop: 16 }}>{group.name}</h3>
            {group.tokens.map(t => <SemanticRow key={t.name} name={t.name} light={t.light} dark={t.dark} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
