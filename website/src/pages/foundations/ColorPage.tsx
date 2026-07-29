import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageHero from '../../components/PageHero';
import { paletteGroups, semanticGroups, palette } from '../../tokens/colors';

/** 以相對亮度決定疊字顏色，取代寫死的淺色清單 */
function isLightColor(color: string): boolean {
  const m = color.match(/^#([0-9A-Fa-f]{6})$/);
  if (!m) return true; // 半透明色票疊在白底上，一律視為淺色
  const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.4;
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = isLightColor(hex);

  return (
    <div
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      style={{ cursor: 'pointer', minWidth: 0 }}
    >
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 10, background: hex,
        border: '1px solid var(--border-divider)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, color: isLight ? palette.grey800 : palette.white }}>
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
      borderBottom: '1px solid var(--border-divider)' }}>
      <span style={{ fontSize: 14, minWidth: 160, flex: '1 0 160px' }}>{name}</span>
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
      <PageHero
        title="Color"
        lead={<>USPACE 色票系統。所有色值集中於 <code>uspace_palette.dart</code>， 語意 Token 定義於 <code>uspace_colors_extension.dart</code>。 點擊色塊可複製色碼。語意 Token 同時提供 Light / Dark 兩組配色。</>}
      />

      <section className="section">
        <SectionTitle>Core Palette</SectionTitle>
        {paletteGroups.map(group => (
          <div key={group.name} style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 16 }}>{group.name}</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
              gap: 12 }}>
              {group.colors.map(c => <ColorSwatch key={c.name} name={c.name} hex={c.hex} />)}
            </div>
          </div>
        ))}
      </section>
      <section className="section">
        <SectionTitle>Semantic Tokens</SectionTitle>
        {semanticGroups.map(group => (
          <div key={group.name} style={{ marginBottom: 32 }}>
            <h3 className="heading-sm" style={{ marginBottom: 8, marginTop: 24 }}>{group.name}</h3>
            {group.tokens.map(t => <SemanticRow key={t.name} name={t.name} light={t.light} dark={t.dark} />)}
          </div>
        ))}
      </section>

      <section className="section">
        <SectionTitle>Usage Guidelines</SectionTitle>
        <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li>所有 hex 值集中在 <code>uspace_palette.dart</code>，不在其他檔案直接寫 hex</li>
            <li>帶透明度的色票使用具名常量，例如 <code>transparentBlack50</code></li>
            <li>文字（Text）使用 <code>text*</code> Token，圖示（Icon）使用 <code>content*</code> Token</li>
            <li>同一 component 在不同 level/size/state 可能套用不同 Token，需逐一查 Figma 確認</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
