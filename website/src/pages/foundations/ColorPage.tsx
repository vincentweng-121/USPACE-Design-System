import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { paletteGroups, semanticGroups } from '../../tokens/colors';

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = hex === '#FFFFFF' || hex === '#F8F8F8' || hex === '#EEEEEE' || hex === '#D9D9D9';

  return (
    <div
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      style={{ cursor: 'pointer', minWidth: 0 }}
    >
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 10, background: hex,
        border: '1px solid var(--border-divider)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: isLight ? '#323237' : '#fff',
      }}>
        {copied ? 'Copied!' : ''}
      </div>
      <div style={{ fontSize: 11, marginTop: 6, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{name}</div>
      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', wordBreak: 'break-all' }}>{hex}</div>
    </div>
  );
}

function SemanticRow({ name, light, dark }: { name: string; light: string; dark: string }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', alignItems: 'center',
      gap: '8px 16px', padding: '10px 0',
      borderBottom: '1px solid var(--border-divider)',
    }}>
      <span style={{ fontSize: 13, minWidth: 160, flex: '1 0 160px' }}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: light, border: '1px solid var(--border-divider)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', minWidth: 70 }}>Light</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: dark, border: '1px solid var(--border-divider)', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', minWidth: 70 }}>Dark</span>
      </div>
    </div>
  );
}

export default function ColorPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Color</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        USPACE 色票系統。所有色值集中於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>uspace_palette.dart</code>，
        語意 Token 定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>uspace_colors_extension.dart</code>。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        點擊色塊可複製色碼。語意 Token 同時提供 Light / Dark 兩組配色。
      </p>

      <SectionTitle>Core Palette</SectionTitle>
      {paletteGroups.map(group => (
        <div key={group.name} style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{group.name}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: 12,
          }}>
            {group.colors.map(c => <ColorSwatch key={c.name} name={c.name} hex={c.hex} />)}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 48 }}>
        <SectionTitle>Semantic Tokens</SectionTitle>
        {semanticGroups.map(group => (
          <div key={group.name} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 8, marginTop: 16 }}>{group.name}</h3>
            {group.tokens.map(t => <SemanticRow key={t.name} name={t.name} light={t.light} dark={t.dark} />)}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <SectionTitle>Usage Guidelines</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li>所有 hex 值集中在 <code style={{ color: 'var(--accent)' }}>uspace_palette.dart</code>，不在其他檔案直接寫 hex</li>
            <li>帶透明度的色票使用具名常量，例如 <code style={{ color: 'var(--accent)' }}>transparentBlack50</code></li>
            <li>文字（Text）使用 <code style={{ color: 'var(--accent)' }}>text*</code> Token，圖示（Icon）使用 <code style={{ color: 'var(--accent)' }}>content*</code> Token</li>
            <li>同一 component 在不同 level/size/state 可能套用不同 Token，需逐一查 Figma 確認</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
