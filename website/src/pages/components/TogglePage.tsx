import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented } from '../../components/Controls';
import { asOptions } from '../../utils';
import { semantic } from '../../tokens/colors';
import { toggleSpec } from '../../tokens/componentSpecs';

const { track, thumb } = toggleSpec.layout! as Record<
  string,
  { width: number; height: number }
>;

function Toggle({ value, onChange, disabled = false }: {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  // token 對應來源：styles/toggle.dart
  const trackColor = value
    ? semantic.actionPrimaryContentAccent
    : disabled
      ? semantic.actionDisabledBg
      : semantic.actionPrimaryContent;

  const opacity = value && disabled ? 0.25 : 1;

  return (
    <div
      onClick={() => !disabled && onChange(!value)}
      style={{
        width: track.width, height: track.height, borderRadius: 27, padding: 2,
        background: trackColor,
        display: 'flex', alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity,
      }}
    >
      <div style={{
        width: thumb.width, height: thumb.height, borderRadius: 27,
        background: semantic.contentInverse,
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
          <Segmented
            compact
            value={disabled ? 'Disable' : 'Enable'}
            onChange={v => setDisabled(v === 'Disable')}
            options={asOptions(['Enable', 'Disable'] as const)}
          />
        </div>
      </div>

      {/* Toggle Demo */}
      <div style={{
        padding: '32px 24px', borderRadius: 16, width: '100%',
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
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
          Switch: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{isOn ? 'ON' : 'OFF'}</strong>
          {' / '}
          Status: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{disabled ? 'Disable' : 'Enable'}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {isOn && disabled ? 'opacity: 0.25' : 'opacity: 1.0'}
        </span>
      </div>
    </div>
  );
}

export default function TogglePage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Toggle"
        lead="Toggle Switch 開關元件，支援 Enable 與 Disable 狀態切換，適用於設定頁面中的即時偏好控制。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <TogglePlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Thumb 為 34x20 pill shape（非圓形），區別於系統 Switch</strong></li>
              <li><strong>自訂實作（非 Flutter Switch），確保跨平台視覺一致</strong></li>
              <li><strong>ON 用 accent 色（螢光綠）清楚傳達啟用狀態</strong></li>
              <li><strong>OFF 用中性灰，不帶情緒暗示</strong></li>
              <li><strong>ON+Disable 用 opacity 降低表示「已啟用但不可操作」</strong></li>
              <li><strong>OFF+Disable 改用 disabledBg（非 opacity），避免與 OFF+Enable 混淆</strong></li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>ON + Enable</strong>：Track 使用 <code>actionPrimaryContentAccent</code>（螢光綠），Thumb 為白色，opacity 1.0。正常可點擊切換為 OFF。</li>
              <li><strong>ON + Disable</strong>：同 ON + Enable 色彩，但整體以 <code>Opacity(0.25)</code> 包裹，表示已啟用但不可操作。cursor 變為 not-allowed。</li>
              <li><strong>OFF + Enable</strong>：Track 使用 <code>actionPrimaryContent</code>（中性灰 {semantic.actionPrimaryContent}），Thumb 為白色，opacity 1.0。正常可點擊切換為 ON。</li>
              <li><strong>OFF + Disable</strong>：Track 改為 <code>actionDisabledBg</code>（{semantic.actionDisabledBg}），不使用 opacity 降低，以明確區別於 OFF + Enable。cursor 變為 not-allowed。</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          {/* Token Mapping */}
          <SectionTitle>Token Mapping</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['State', 'Track Color', 'Thumb', 'Opacity'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              {/* 由 tokens/components/toggle.json 產生，與 Flutter widget test 同源 */}
              <tbody>
                {toggleSpec.variants.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>
                      {String(v.value).toUpperCase()} + {v.enabled === 'enabled' ? 'Enable' : 'Disable'}
                    </td>
                    <td style={{ padding: '10px 12px' }}><code>{v.track}</code></td>
                    <td style={{ padding: '10px 12px' }}><code>{v.thumb}</code></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                      {Number(v.opacity).toFixed(2)}
                      {v.note && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{v.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Specs */}
          <SectionTitle>Layout Specs</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 400 }}>
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

          {/* Notes */}
          <SectionTitle>Notes</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Thumb shape</strong>: 34x20 pill（rounded=27），非圓形</li>
              <li><strong>ON + Disable</strong>: 使用 Opacity widget 包裹，opacity=0.25</li>
              <li><strong>OFF + Disable</strong>: track 改為 actionDisabledBg（不使用 opacity）</li>
              <li><strong>不使用 Flutter Switch</strong>: 自訂 Container + GestureDetector，以精確控制尺寸與圓角</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
