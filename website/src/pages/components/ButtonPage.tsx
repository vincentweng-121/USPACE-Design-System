import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented } from '../../components/Controls';
import { semantic, gradients } from '../../tokens/colors';
import { buttonSpec } from '../../tokens/componentSpecs';

type Level = 'Accent' | 'Charging' | 'Primary' | 'Secondary' | 'Customized';

// token 對應來源：styles/button.dart 的 _resolveBg / _resolveTextColor
const levels: { name: Level; bg: string; text: string; tokenBg: string; tokenText: string }[] = [
  { name: 'Accent', bg: semantic.actionPrimaryBg, text: semantic.actionPrimaryContentAccent, tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContentAccent' },
  { name: 'Charging', bg: semantic.actionPrimaryBg, text: semantic.actionPrimaryContentCharging, tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContentCharging' },
  { name: 'Primary', bg: semantic.actionPrimaryBg, text: semantic.actionPrimaryContent, tokenBg: 'actionPrimaryBg', tokenText: 'actionPrimaryContent' },
  { name: 'Secondary', bg: semantic.actionSecondaryBg, text: semantic.actionSecondaryContent, tokenBg: 'actionSecondaryBg', tokenText: 'actionSecondaryContent' },
  { name: 'Customized', bg: '', text: '', tokenBg: 'transparent', tokenText: 'actionTertiaryContent' },
];

export default function ButtonPage() {
  const [tab, setTab] = usePageTab();
  const [activeLevel, setActiveLevel] = useState<Level>('Accent');
  const current = levels.find(l => l.name === activeLevel)!;

  return (
    <div>
      <PageHero
        title="Button"
        lead="支援 5 種 Level（Accent / Charging / Primary / Secondary / Customized）與 2 種 Size（Regular / Small），涵蓋主要行動、次要操作與特殊場景的按鈕需求。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <div style={{ marginBottom: 120 }}>
          <SectionTitle>Playground</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 48 }}>Level</span>
              <Segmented
                compact
                value={activeLevel}
                onChange={setActiveLevel}
                options={levels.map(l => ({ value: l.name, label: l.name }))}
              />
            </div>
          </div>

          <div style={{
            padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16, width: '100%',
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
          }}>
            {activeLevel !== 'Customized' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Disabled</div>
                  <button style={{
                    padding: '12px 24px', borderRadius: 100, border: 'none', width: '100%', maxWidth: 320,
                    background: semantic.actionDisabledBg, color: semantic.actionDisabledContent,
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
                  backgroundImage: `linear-gradient(var(--page-secondary), var(--page-secondary)), ${gradients.actionCustomizedBorder}`,
                  backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box',
                  color: semantic.actionTertiaryContent, fontSize: 16, fontWeight: 400, cursor: 'pointer',
                  width: '100%', maxWidth: 320, fontFamily: 'inherit',
                }}>
                  Customized Button
                </button>
              </div>
            )}
          </div>
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>語意層級引導行動</strong>：5 種 Level 表達不同行動權重。Accent（螢光綠）為最高優先，用於主要 CTA；Charging（綠色）用於充電相關操作；Primary（白字深底）為一般操作；Secondary（深字淺底）為次要操作；Customized（漸層邊框）為特殊場景。</li>
              <li><strong>尺寸決定佈局角色</strong>：Regular（全寬）適合表單底部等需要強調的場景；Small（內縮）適合內嵌於列表或卡片中的行動按鈕。</li>
              <li><strong>Disabled 由邏輯驅動</strong>：透過 <code>onPressed: null</code> 觸發 disabled 外觀，不需額外管理 disabled state。視覺上統一為低對比灰色，明確傳達「不可操作」。</li>
              <li><strong>文字 Typography 統一</strong>：所有按鈕文字使用 <code>labelL</code> token，不因 Level 或 Size 改變字體樣式，確保視覺一致性。</li>
              <li><strong>Icon 輔助而非主導</strong>：Icon 置於文字左側，僅作為視覺輔助，按鈕含義仍以文字為主。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：正常可點擊狀態，顯示對應 Level 的背景與文字色。</li>
              <li><strong>Disabled</strong>：背景變為 <code>actionDisabledBg</code>，文字變為 <code>actionDisabledContent</code>。cursor 變為 not-allowed。</li>
              <li><strong>Customized Level</strong>：使用漸層邊框（gradient border），背景透明，文字使用 <code>actionTertiaryContent</code>。不支援 Disabled 狀態。</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          {/* Token Mapping — 由 tokens/components/button.json 產生，
              與 test/component_token_test.dart 同源 */}
          <SectionTitle>Token Mapping</SectionTitle>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16, lineHeight: 1.6 }}>
            來源 <code>{buttonSpec.source}</code>
            {buttonSpec.figmaNode && <> · Figma node <code>{buttonSpec.figmaNode}</code></>}
            。此表由元件規格檔產生，並由 Flutter widget test 逐項驗證。
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 620 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Level', 'Size', 'State', 'Background', 'Text / Icon Color'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buttonSpec.variants.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{v.level}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 13 }}>{v.size}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 13 }}>{v.state}</td>
                    <td style={{ padding: '10px 12px' }}><code>{v.bg}</code></td>
                    <td style={{ padding: '10px 12px' }}>
                      <code>{v.content}</code>
                      {v.note && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{v.note}</div>}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>customized</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 13 }}>—</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 13 }}>enabled</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)', fontSize: 13 }}>transparent</td>
                  <td style={{ padding: '10px 12px' }}>
                    <code>actionTertiaryContent</code>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>邊框為 silverLinear 漸層</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Size Spec */}
          <SectionTitle>Size Specs</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Regular</strong>: padding 12px vertical, full width, StadiumBorder</li>
              <li><strong>Small</strong>: padding 8px 24px, hug content, StadiumBorder</li>
              <li>Icon 置於文字左側，尺寸 24px，間距 8px</li>
              <li>Typography: <code>labelL</code> (16px/24px Regular)</li>
              <li>Border radius: <code>USpaceRadius.full</code> (1000)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
