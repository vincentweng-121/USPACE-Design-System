import { useState, useRef, useEffect, useCallback } from 'react';
import SectionTitle from '../../components/SectionTitle';

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

// ── Toggle component ───────────────────────────────────────
function Toggle({ value, onChange, labelOn, labelOff, disabled }: {
  value: boolean; onChange: (v: boolean) => void;
  labelOn: string; labelOff: string; disabled?: boolean;
}) {
  return (
    <div style={{
      display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
      border: '1px solid var(--border-divider)',
      opacity: disabled ? 0.35 : 1, pointerEvents: disabled ? 'none' : 'auto',
    }}>
      {[false, true].map(v => (
        <button key={String(v)} onClick={() => onChange(v)} style={{
          padding: '6px 16px', border: 'none', fontSize: 12, cursor: 'pointer',
          fontFamily: 'inherit', transition: 'all 0.12s',
          background: value === v ? 'var(--accent)' : 'var(--page-primary)',
          color: value === v ? '#000' : 'var(--text-secondary)',
          fontWeight: value === v ? 600 : 400,
        }}>
          {v ? labelOn : labelOff}
        </button>
      ))}
    </div>
  );
}

// ── Segmented control ──────────────────────────────────────
function Segmented<T extends string>({ value, onChange, options }: {
  value: T; onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div style={{
      display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
      border: '1px solid var(--border-divider)',
    }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: '6px 16px', border: 'none', fontSize: 12, cursor: 'pointer',
          fontFamily: 'inherit', transition: 'all 0.12s',
          background: value === opt.value ? 'var(--accent)' : 'var(--page-primary)',
          color: value === opt.value ? '#000' : 'var(--text-secondary)',
          fontWeight: value === opt.value ? 600 : 400,
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
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
        padding: '24px 20px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
      }}>
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
              color: '#FF4A20', flexShrink: 0,
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
              background: 'var(--grey800)',
              color: '#fff',
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

      {/* ── State indicator ── */}
      <div style={{
        marginTop: 12, padding: '10px 16px', borderRadius: 8,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        fontSize: 12, color: 'var(--text-tertiary)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 8,
      }}>
        <span>
          Figma Status: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>{status}</strong>
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
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Text Field</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>text_field.dart</code>。
        支援 9 種狀態，可嵌入 USpaceButton (Small/Primary) 作為 trailing action。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 40:3307。透過下方三個維度的組合 + 實際操作（點擊、輸入、失焦），
        可觸發所有 9 種 Figma 狀態。
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ maxWidth: 480, marginBottom: 48 }}>
        <TextFieldPlayground />
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
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
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{token}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Layout Specs */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Layout Specs</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Container</strong>: height 48px, borderRadius 1000 (StadiumBorder)</li>
            <li><strong>Padding</strong>: left 20px, right 16px (without button) / 4px (with button)</li>
            <li><strong>Label</strong>: PingFang TC 12px/16px Regular, <code style={{ color: 'var(--accent)' }}>inputText</code></li>
            <li><strong>Input</strong>: PingFang TC 14px/20px Regular, <code style={{ color: 'var(--accent)' }}>inputText</code></li>
            <li><strong>Hint</strong>: SF Pro 14px/16px Regular, <code style={{ color: 'var(--accent)' }}>textSecondary</code></li>
            <li><strong>Cursor</strong>: 2px wide, 24px tall, <code style={{ color: 'var(--accent)' }}>contentAccent</code></li>
            <li><strong>Border (active)</strong>: 2px, <code style={{ color: 'var(--accent)' }}>inputBorderActive</code></li>
            <li><strong>Border (error-active)</strong>: 2px, <code style={{ color: 'var(--accent)' }}>inputBorderError</code></li>
            <li><strong>Icons</strong>: 20px (error icon, clear/delete icon)</li>
            <li><strong>Button</strong>: USpaceButton Small/Primary, trailing</li>
          </ul>
        </div>
      </div>

      {/* Status Mapping */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Dimension → Status Mapping</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
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
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{figma}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
