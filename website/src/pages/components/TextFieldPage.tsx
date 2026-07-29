import { useState, useRef, useEffect, useCallback } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented, Toggle } from '../../components/Controls';
import { semantic } from '../../tokens/colors';

// ── Types ──────────────────────────────────────────────────
type Availability = 'editable' | 'disabled' | 'non-editable';
type Validation = 'normal' | 'error';
type InternalState = 'idle' | 'focused' | 'hasText' | 'focusedWithText';

// ── Derived Figma status from 3 dimensions ─────────────────
function deriveStatus(
  availability: Availability,
  validation: Validation,
  showButton: boolean,
  internal: InternalState,
): string {
  if (availability === 'disabled') return 'Disabled';
  if (availability === 'non-editable') return 'Non-editable';

  if (validation === 'error') {
    if (internal === 'focused' || internal === 'focusedWithText') return 'Error-Active';
    return 'Error';
  }

  // normal validation
  if (showButton) {
    if (internal === 'focused') return 'Active';
    if (internal === 'focusedWithText') return 'Typing';
    if (internal === 'hasText') return 'Incomplete';
    return 'Incomplete';
  }

  switch (internal) {
    case 'idle': return 'Default';
    case 'focused': return 'Active';
    case 'focusedWithText': return 'Typing';
    case 'hasText': return 'Complete';
  }
}

// ── Border logic ───────────────────────────────────────────
function getBorder(status: string): string {
  if (status === 'Active' || status === 'Typing') return '2px solid var(--input-border-active)';
  if (status === 'Error-Active') return '2px solid var(--input-border-error)';
  return '1px solid var(--border-divider)';
}

// ── Playground ─────────────────────────────────────────────
function TextFieldPlayground() {
  const [availability, setAvailability] = useState<Availability>('editable');
  const [validation, setValidation] = useState<Validation>('normal');
  const [showButton, setShowButton] = useState(false);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInteractive = availability === 'editable';

  // Derive internal state from focus + text
  const internal: InternalState =
    focused && text.length > 0 ? 'focusedWithText' :
    focused ? 'focused' :
    text.length > 0 ? 'hasText' : 'idle';

  const status = deriveStatus(availability, validation, showButton, internal);

  // Reset text when switching availability
  useEffect(() => {
    if (availability === 'disabled') { setText(''); setFocused(false); }
    if (availability === 'non-editable') { setText('Read-only text'); setFocused(false); }
  }, [availability]);

  // Prefill text for error mode
  useEffect(() => {
    if (validation === 'error' && availability === 'editable' && text === '') {
      setText('Error input');
    }
  }, [validation, availability]);

  const isDisabled = availability === 'disabled';
  const isReadonly = availability === 'non-editable';
  const isError = validation === 'error' && isInteractive;
  const showClear = isInteractive && !isError && text.length > 0 && (focused || internal === 'hasText');
  const showErrorIcon = isError;

  const handleClear = useCallback(() => {
    setText('');
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      {/* ── Controls ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24,
      }}>
        {/* Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Availability</span>
          <Segmented
            value={availability}
            onChange={setAvailability}
            options={[
              { value: 'editable', label: 'Editable' },
              { value: 'disabled', label: 'Disabled' },
              { value: 'non-editable', label: 'Non-editable' },
            ]}
          />
        </div>

        {/* Validation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Validation</span>
          <Toggle
            value={validation === 'error'}
            onChange={v => setValidation(v ? 'error' : 'normal')}
            labelOff="Normal"
            labelOn="Error"
            disabled={!isInteractive}
          />
        </div>

        {/* Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Trailing</span>
          <Toggle
            value={showButton}
            onChange={setShowButton}
            labelOff="No Button"
            labelOn="Button"
            disabled={!isInteractive}
          />
        </div>
      </div>

      {/* ── TextField ── */}
      <div style={{
        padding: '24px 20px', borderRadius: 16, width: '100%',
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Label */}
        <div style={{
          fontSize: 12, color: 'var(--text-primary)', marginBottom: 4,
          lineHeight: '16px', fontFamily: '"PingFang TC", sans-serif',
        }}>
          Label
        </div>

        {/* Input Container */}
        <div style={{
          height: 48,
          borderRadius: 1000,
          background: 'var(--input-bg)',
          border: getBorder(status),
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: showButton ? 4 : 16,
          opacity: isDisabled ? 0.5 : 1,
          transition: 'border 0.15s',
        }}>
          <input
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isDisabled || isReadonly}
            placeholder="Placeholder"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: 14,
              lineHeight: '20px',
              color: (isDisabled || isReadonly) ? 'var(--input-text-placeholder)' : 'var(--text-primary)',
              fontFamily: '"PingFang TC", sans-serif',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
              cursor: (isDisabled || isReadonly) ? 'not-allowed' : 'text',
            }}
          />

          {/* Error icon */}
          {showErrorIcon && (
            <span style={{
              color: semantic.contentError, flexShrink: 0,
              marginLeft: 8, display: 'flex', alignItems: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                <line x1="10" y1="5.5" x2="10" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="10" cy="14" r="1.2" fill="currentColor"/>
              </svg>
            </span>
          )}

          {/* Clear icon */}
          {showClear && (
            <span
              onMouseDown={e => { e.preventDefault(); handleClear(); }}
              style={{
                color: 'var(--text-secondary)', flexShrink: 0,
                marginLeft: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15"/>
                <line x1="7" y1="7" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="13" y1="7" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          )}

          {/* Action button */}
          {showButton && isInteractive && (
            <button style={{
              marginLeft: 8,
              padding: '8px 24px',
              borderRadius: 100,
              border: 'none',
              background: semantic.actionPrimaryBg,
              color: semantic.actionPrimaryContent,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              Action
            </button>
          )}
        </div>

        {/* Hint */}
        <div style={{
          fontSize: 14,
          lineHeight: '16px',
          color: isError ? 'var(--input-text-error)' : 'var(--text-secondary)',
          marginTop: 4,
          fontFamily: '"SF Pro", "SF Pro Text", -apple-system, sans-serif',
          minHeight: 16,
        }}>
          {isError ? 'Error message' : 'Hint message'}
        </div>
        </div>
      </div>

      {/* ── State indicator ── */}
      <div style={{
        marginTop: 12, padding: '10px 16px', borderRadius: 8,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        fontSize: 12, color: 'var(--text-tertiary)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 8,
      }}>
        <span>
          Figma Status: <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{status}</strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          {availability} / {validation} / {showButton ? 'button' : 'no-button'}
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function TextFieldPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Text Field"
        lead="單行文字輸入元件，支援 9 種狀態（Empty / Focused / Filled / Error 等），包含標籤、提示文字與錯誤訊息。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <TextFieldPlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>三維度組合產生 9 種狀態</strong>：Availability（editable / disabled / non-editable） x Validation（normal / error） x Interaction（idle / focused / typing / blur），完整覆蓋所有使用情境。</li>
              <li><strong>Active 聚焦回饋</strong>：Active 時顯示 2px 綠色邊框，提供明確的聚焦回饋。</li>
              <li><strong>Error 雙重提示</strong>：Error 時顯示 2px 紅色邊框 + 紅色 hint 文字，雙重提示錯誤。</li>
              <li><strong>Clear icon 快速清除</strong>：Clear icon 在有文字時出現，方便快速清除。</li>
              <li><strong>複合操作支援</strong>：可嵌入 trailing USpaceButton（Small / Primary），支援「輸入 + 動作」的複合操作。</li>
              <li><strong>Disabled vs Non-editable</strong>：視覺相似但語意不同 — Disabled 表示功能暫不可用，Non-editable 表示資料唯讀。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：Editable + Normal + Idle。輸入框顯示 placeholder，1px 邊框。</li>
              <li><strong>Active</strong>：使用者點擊輸入框獲得焦點，邊框變為 2px 綠色。</li>
              <li><strong>Typing</strong>：聚焦狀態下開始輸入文字，維持 2px 綠色邊框。</li>
              <li><strong>Complete</strong>：輸入完成後失焦（blur），文字保留，邊框回復 1px。</li>
              <li><strong>Incomplete</strong>：有 trailing button 時，文字已輸入但尚未送出。</li>
              <li><strong>Error</strong>：Validation 為 error 且未聚焦，顯示紅色邊框 + 紅色 hint。</li>
              <li><strong>Error-Active</strong>：Error 狀態下聚焦，邊框變為 2px 紅色。</li>
              <li><strong>Disabled</strong>：功能暫不可用，opacity 降低，cursor 變為 not-allowed。</li>
              <li><strong>Non-editable</strong>：資料唯讀，顯示固定文字，不可編輯。</li>
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
                  {['Property', 'Token'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Background', 'inputBgDefault'],
                  ['Border (active)', 'inputBorderActive (neonLime600)'],
                  ['Border (error)', 'inputBorderError (red500)'],
                  ['Input text', 'inputText'],
                  ['Placeholder', 'inputTextPlaceholder'],
                  ['Disabled text', 'inputTextDisabled'],
                  ['Error text', 'inputTextError'],
                  ['Label text', 'inputText (bodyS)'],
                  ['Hint text', 'textSecondary (sfBodyS)'],
                  ['Error hint', 'inputTextError (sfBodyS)'],
                  ['Cursor', 'contentAccent (neonLime600)'],
                  ['Error icon', 'contentError (red400)'],
                  ['Clear icon', 'contentSecondary'],
                ].map(([prop, token]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}>{prop}</td>
                    <td style={{ padding: '10px 12px' }}><code>{token}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Specs */}
          <SectionTitle>Layout Specs</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Container</strong>: height 48px, borderRadius 1000 (StadiumBorder)</li>
              <li><strong>Padding</strong>: left 20px, right 16px (without button) / 4px (with button)</li>
              <li><strong>Label</strong>: PingFang TC 12px/16px Regular, <code>inputText</code></li>
              <li><strong>Input</strong>: PingFang TC 14px/20px Regular, <code>inputText</code></li>
              <li><strong>Hint</strong>: SF Pro 14px/16px Regular, <code>textSecondary</code></li>
              <li><strong>Cursor</strong>: 2px wide, 24px tall, <code>contentAccent</code></li>
              <li><strong>Border (active)</strong>: 2px, <code>inputBorderActive</code></li>
              <li><strong>Border (error-active)</strong>: 2px, <code>inputBorderError</code></li>
              <li><strong>Icons</strong>: 20px (error icon, clear/delete icon)</li>
              <li><strong>Button</strong>: USpaceButton Small/Primary, trailing</li>
            </ul>
          </div>

          {/* Status Mapping */}
          <SectionTitle>Dimension → Status Mapping</SectionTitle>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Availability', 'Validation', 'Button', 'Interaction', 'Figma Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Editable', 'Normal', 'Off', 'Idle', 'Default'],
                  ['Editable', 'Normal', 'Off', 'Focused', 'Active'],
                  ['Editable', 'Normal', 'Off', 'Typing', 'Typing'],
                  ['Editable', 'Normal', 'Off', 'Blur w/ text', 'Complete'],
                  ['Editable', 'Normal', 'On', 'Has text', 'Incomplete'],
                  ['Editable', 'Error', 'Off', 'Idle', 'Error'],
                  ['Editable', 'Error', 'Off', 'Focused', 'Error-Active'],
                  ['Disabled', '—', '—', '—', 'Disabled'],
                  ['Non-editable', '—', '—', '—', 'Non-editable'],
                ].map(([avail, valid, btn, interaction, figma], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}>{avail}</td>
                    <td style={{ padding: '10px 12px', color: valid === 'Error' ? 'var(--input-text-error)' : 'var(--text-secondary)' }}>{valid}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{btn}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{interaction}</td>
                    <td style={{ padding: '10px 12px' }}><code>{figma}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
