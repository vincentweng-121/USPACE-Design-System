import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented, Toggle } from '../../components/Controls';
import { asOptions } from '../../utils';
import { semantic, palette, gradients } from '../../tokens/colors';

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
    cursor: 'default',
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

  // token 對應來源：styles/chip.dart 的 _bgColor / _iconColor
  switch (level) {
    case 'Accent':
      return { ...base, background: semantic.chipBgAccent, color: 'var(--text-primary)' };
    case 'Primary':
      return { ...base, background: semantic.chipBgPrimary, color: 'var(--text-primary)', border: '1px solid var(--border-divider)' };
    case 'Secondary':
      return { ...base, background: semantic.chipBgSecondary, color: 'var(--text-primary)' };
    case 'Outline':
      // 品牌漸層色，無對應 semantic token（見 chip.dart 註解）
      return { ...base, background: 'transparent', border: `1px solid ${palette.neonLime200}`, color: 'transparent' };
  }
}

function GradientText({ children, size }: { children: string; size: ChipSize }) {
  return (
    <span style={{
      background: gradients.limeLinear,
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
  const iconColor = isOutline ? palette.neonLime200 : 'var(--text-primary)';

  const labels = ['Label A', 'Label B', 'Label C'];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {/* Level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Level</span>
          <Segmented
            compact
            value={level}
            onChange={setLevel}
            options={asOptions(levels)}
          />
        </div>

        {/* Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Size</span>
          <Segmented
            compact
            value={size}
            onChange={setSize}
            options={asOptions(sizes)}
          />
        </div>

        {/* Icon toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Icon</span>
          <Toggle value={showIcon} onChange={setShowIcon} labelOn="ON" labelOff="OFF" />
        </div>
      </div>

      {/* Chip Row */}
      <div style={{
        padding: '24px 20px', borderRadius: 16, width: '100%',
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
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
          Level: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{level}</strong>
          {' / '}
          Size: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{size}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {showIcon ? 'leadingIcon = true' : 'leadingIcon = false'}
        </span>
      </div>
    </div>
  );
}

export default function ChipPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Chip"
        lead="展示標籤元件，支援 4 種 Level（Accent / Primary / Secondary / Outline）與 2 種 Size（Regular / Small），適用於狀態標示與分類。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <ChipPlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>純展示標籤，不可點擊</strong>：Chip 用於顯示分類、狀態、標記等資訊，不具備互動行為。若需可互動的 chip，應使用 <code>USpaceTab</code>（Filter / Input type）。</li>
              <li><strong>4 Level 對應不同視覺語意</strong>：Accent（強調）使用螢光綠背景，適用於需要突出的標記；Primary（一般白底）為預設樣式；Secondary（次要灰底）適用於輔助資訊；Outline（特殊漸層邊框）使用 neonLime 漸層文字和邊框，用於品牌相關標記。</li>
              <li><strong>Outline 的品牌識別</strong>：Outline Level 使用 neonLime 漸層文字（neonLime200 → neonLime800）和漸層邊框，專為品牌相關標記設計，視覺上具有高辨識度。</li>
              <li><strong>2 Size 適應不同資訊密度</strong>：Regular 適用於一般場景；Small 適用於資訊密集的列表或卡片中，以更小的尺寸減少視覺佔用。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Static</strong>：Chip 為靜態元件，無互動狀態。不支援 hover、pressed、disabled 等狀態變化。</li>
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
                    <td style={{ padding: '10px 12px' }}><code>{bg}</code></td>
                    <td style={{ padding: '10px 12px' }}><code>{text}</code></td>
                    <td style={{ padding: '10px 12px' }}><code>{border}</code></td>
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
                    <td style={{ padding: '10px 12px' }}><code>{padIcon}</code></td>
                    <td style={{ padding: '10px 12px' }}><code>{padNo}</code></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{font}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{icon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <SectionTitle>Notes</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Non-interactive</strong>: Chip 為純展示標籤，不可點擊。若需可互動 chip，請使用 <code>USpaceTab</code>（filter / input type）</li>
              <li><strong>Outline</strong>: 文字使用 ShaderMask 漸層（neonLime200 → neonLime800），border 為 neonLime200</li>
              <li><strong>Small</strong>: 字體 10px/14px Semibold（displayXXS），typography extension 中尚無此定義，chip.dart 內 inline 定義</li>
              <li><strong>Leading icon</strong>: 20×20，Outline 時 icon 色為 neonLime200，其餘為 contentPrimary</li>
              <li><strong>Surface</strong>: Figma 有 White/Gray surface 區分，不影響 chip 本身色值</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
