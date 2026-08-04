import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { chipSpec } from '../../tokens/componentSpecs';
import { Pending, ColorTable, ConfidenceNote, Playground, PendingImage, type PlaygroundDimension } from '../../components/spec';
import { semantic, palette, gradients } from '../../tokens/colors';

type ChipLevel = 'Accent' | 'Primary' | 'Secondary' | 'Outline';
type ChipSize = 'Regular' | 'Small';

const levels: ChipLevel[] = ['Accent', 'Primary', 'Secondary', 'Outline'];

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

/** 依 token 渲染的 Chip。無互動，供規格展示用。 */
function ChipPreview({
  label,
  level,
  size = 'Regular',
  icon = false,
}: {
  label: string;
  level: ChipLevel;
  size?: ChipSize;
  icon?: boolean;
}) {
  const style = getChipStyle(level, size, icon);
  const iconColor = level === 'Outline' ? palette.neonLime200 : 'var(--text-primary)';
  return (
    <div style={style}>
      {icon && <StarIcon color={iconColor} />}
      {level === 'Outline' ? <GradientText size={size}>{label}</GradientText> : label}
    </div>
  );
}


// ── Playground 的維度 ──
const playgroundDimensions: PlaygroundDimension[] = [
  { key: 'level', label: 'Level', options: levels.map((l) => ({ value: l, label: l })) },
  { key: 'size', label: 'Size', options: [{ value: 'Regular', label: 'Regular' }, { value: 'Small', label: 'Small' }] },
  { key: 'icon', label: 'Icon option', options: [{ value: 'none', label: 'None' }, { value: 'leading', label: 'Leading' }] },
];

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

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="chip-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="chip"
              dimensions={playgroundDimensions}
              render={(v) => <ChipPreview label="Label" level={v.level as ChipLevel} size={v.size as ChipSize} icon={v.icon === 'leading'} />}
            />
          </section>

          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <div>
              <Pending
                what="Anatomy"
                why="部件拆解圖尚未製作。需先確認各部位的正式名稱與必要性，避免自行命名。"
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <ConfidenceNote confidence={chipSpec.confidence} source={chipSpec.source} />
            <ColorTable
              variants={chipSpec.variants}
              dimensionKeys={['level']}
              partKeys={['bg', 'content']}
              partLabels={{ bg: '容器底色', border: '描邊', content: '文字與 icon', text: '輸入文字', hint: '提示文字', type: 'Type', state: 'State', status: 'Status', level: 'Level' }}
            />
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Static</strong>：Chip 為靜態元件，無互動狀態。不支援 hover、pressed、disabled 等狀態變化。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="chip-measurements" note="標出高度、內距、間距的量測圖。" />
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Size', 'Radius', 'Padding (with icon)', 'Padding (no icon)', 'Font', 'Icon'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Regular', '100px', 'pl=8 pr=12 gap=2', 'px=12', 'labelM (14px/20px Regular)', '20px'],
                    ['Small', '100px', 'pl=6 pr=8 gap=2', 'px=8', '10px/14px Semibold', '20px'],
                  ].map(([sz, r, padIcon, padNo, font, icon]) => (
                    <tr key={sz}>
                      <td>{sz}</td>
                      <td>{r}</td>
                      <td><code>{padIcon}</code></td>
                      <td><code>{padNo}</code></td>
                      <td>{font}</td>
                      <td>{icon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="chip-toucharea" note="標出觸控熱區範圍，並確認是否達到 44px 最小建議值。" />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（chip-do-caseN / chip-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>純展示標籤，不可點擊</strong>：Chip 用於顯示分類、狀態、標記等資訊，不具備互動行為。若需可互動的 chip，應使用 <code>USpaceTab</code>（Filter / Input type）。</li>
                <li><strong>4 Level 對應不同視覺語意</strong>：Accent（強調）使用螢光綠背景，適用於需要突出的標記；Primary（一般白底）為預設樣式；Secondary（次要灰底）適用於輔助資訊；Outline（特殊漸層邊框）使用 neonLime 漸層文字和邊框，用於品牌相關標記。</li>
                <li><strong>Outline 的品牌識別</strong>：Outline Level 使用 neonLime 漸層文字（neonLime200 → neonLime800）和漸層邊框，專為品牌相關標記設計，視覺上具有高辨識度。</li>
                <li><strong>2 Size 適應不同資訊密度</strong>：Regular 適用於一般場景；Small 適用於資訊密集的列表或卡片中，以更小的尺寸減少視覺佔用。</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Level', 'Background', 'Text Color', 'Border'].map(h => (
                      <th key={h}>{h}</th>
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
                    <tr key={i}>
                      <td>{level}</td>
                      <td><code>{bg}</code></td>
                      <td><code>{text}</code></td>
                      <td><code>{border}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Non-interactive</strong>: Chip 為純展示標籤，不可點擊。若需可互動 chip，請使用 <code>USpaceTab</code>（filter / input type）</li>
                <li><strong>Outline</strong>: 文字使用 ShaderMask 漸層（neonLime200 → neonLime800），border 為 neonLime200</li>
                <li><strong>Small</strong>: 字體 10px/14px Semibold（displayXXS），typography extension 中尚無此定義，chip.dart 內 inline 定義</li>
                <li><strong>Leading icon</strong>: 20×20，Outline 時 icon 色為 neonLime200，其餘為 contentPrimary</li>
                <li><strong>Surface</strong>: Figma 有 White/Gray surface 區分，不影響 chip 本身色值</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
