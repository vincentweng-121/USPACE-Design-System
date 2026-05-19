import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

type ChipLevel = 'Accent' | 'Primary' | 'Secondary' | 'Outline';
type ChipSize = 'Regular' | 'Small';

const levels: ChipLevel[] = ['Accent', 'Primary', 'Secondary', 'Outline'];
const sizes: ChipSize[] = ['Regular', 'Small'];

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.35 4.76 5.25.77-3.8 3.7.9 5.24L10 13.77l-4.7 2.7.9-5.24-3.8-3.7 5.25-.77L10 2z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function getChipStyle(level: ChipLevel, size: ChipSize, hasIcon: boolean): React.CSSProperties {
  const isRegular = size === 'Regular';
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 100,
    fontFamily: '"PingFang TC", sans-serif',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontSize: isRegular ? 14 : 10,
    lineHeight: isRegular ? '20px' : '14px',
    fontWeight: isRegular ? 400 : 600,
    gap: hasIcon ? 2 : 0,
  };

  // Padding
  if (isRegular) {
    base.paddingTop = 1;
    base.paddingBottom = 1;
    base.paddingLeft = hasIcon ? 8 : 12;
    base.paddingRight = hasIcon ? 12 : 12;
  } else {
    base.paddingTop = 1;
    base.paddingBottom = 1;
    base.paddingLeft = hasIcon ? 6 : 8;
    base.paddingRight = hasIcon ? 8 : 8;
  }

  switch (level) {
    case 'Accent':
      return { ...base, background: '#C3F400', color: 'var(--text-primary)' };
    case 'Primary':
      return { ...base, background: '#FFFFFF', color: 'var(--text-primary)', border: '1px solid var(--border-divider)' };
    case 'Secondary':
      return { ...base, background: '#EEEEEE', color: 'var(--text-primary)' };
    case 'Outline':
      return { ...base, background: 'transparent', border: '1px solid #00EEB7', color: 'transparent' };
  }
}

function GradientText({ children, size }: { children: string; size: ChipSize }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, #00EEB7, #B4E002)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: size === 'Regular' ? 14 : 10,
      lineHeight: size === 'Regular' ? '20px' : '14px',
      fontWeight: size === 'Regular' ? 400 : 600,
    }}>
      {children}
    </span>
  );
}

function ChipPlayground() {
  const [level, setLevel] = useState<ChipLevel>('Accent');
  const [size, setSize] = useState<ChipSize>('Regular');
  const [showIcon, setShowIcon] = useState(false);

  const isOutline = level === 'Outline';
  const iconColor = isOutline ? '#00EEB7' : 'var(--text-primary)';

  const labels = ['Label A', 'Label B', 'Label C'];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {/* Level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Level</span>
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {levels.map(l => (
              <button key={l} onClick={() => setLevel(l)} style={{
                padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
                background: level === l ? 'var(--accent)' : 'var(--page-primary)',
                color: level === l ? '#000' : 'var(--text-secondary)',
                fontWeight: level === l ? 600 : 400,
              }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Size</span>
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} style={{
                padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
                background: size === s ? 'var(--accent)' : 'var(--page-primary)',
                color: size === s ? '#000' : 'var(--text-secondary)',
                fontWeight: size === s ? 600 : 400,
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Icon toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Icon</span>
          <button onClick={() => setShowIcon(!showIcon)} style={{
            padding: '6px 12px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
            fontFamily: 'inherit', transition: 'all 0.12s',
            border: '1px solid var(--border-divider)',
            background: showIcon ? 'var(--accent)' : 'var(--page-primary)',
            color: showIcon ? '#000' : 'var(--text-secondary)',
            fontWeight: showIcon ? 600 : 400,
          }}>
            {showIcon ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Chip Row */}
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {labels.map((label, i) => {
            const style = getChipStyle(level, size, showIcon);
            return (
              <div key={i} style={style}>
                {showIcon && <StarIcon color={iconColor} />}
                {isOutline ? <GradientText size={size}>{label}</GradientText> : label}
              </div>
            );
          })}
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
          Level: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{level}</strong>
          {' / '}
          Size: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{size}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {showIcon ? 'leadingIcon = true' : 'leadingIcon = false'}
        </span>
      </div>
    </div>
  );
}

export default function ChipPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Chip</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>chip.dart</code>。
        4 levels × 2 sizes，可選前置圖示。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 1327:19329。Outline 層級使用漸層文字（neonLime200 → #B4E002）。
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ maxWidth: 560, marginBottom: 48 }}>
        <ChipPlayground />
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['Level', 'Background', 'Text Color', 'Border'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Accent', 'chipBgAccent', 'textPrimary', '—'],
              ['Primary', 'chipBgPrimary', 'textPrimary', '—'],
              ['Secondary', 'chipBgSecondary', 'textPrimary', '—'],
              ['Outline', '—', 'gradient (neonLime200 → neonLime800)', 'neonLime200'],
            ].map(([level, bg, text, border], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{level}</td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{bg}</code></td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{text}</code></td>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{border}</code></td>
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
                {['Size', 'Radius', 'Padding (with icon)', 'Padding (no icon)', 'Font', 'Icon'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Regular', '100px', 'pl=8 pr=12 gap=2', 'px=12', 'labelM (14px/20px Regular)', '20px'],
                ['Small', '100px', 'pl=6 pr=8 gap=2', 'px=8', '10px/14px Semibold', '20px'],
              ].map(([sz, r, padIcon, padNo, font, icon]) => (
                <tr key={sz} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{sz}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{r}</td>
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 11 }}>{padIcon}</code></td>
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 11 }}>{padNo}</code></td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{font}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{icon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Notes</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Outline</strong>: 文字使用 ShaderMask 漸層（neonLime200 → neonLime800），border 為 neonLime200</li>
            <li><strong>Small</strong>: 字體 10px/14px Semibold（displayXXS），typography extension 中尚無此定義，chip.dart 內 inline 定義</li>
            <li><strong>Leading icon</strong>: 20×20，Outline 時 icon 色為 neonLime200，其餘為 contentPrimary</li>
            <li><strong>Surface</strong>: Figma 有 White/Gray surface 區分，不影響 chip 本身色值</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
