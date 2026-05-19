import { useState, useRef, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';

type Status = 'Default' | 'Active' | 'Typing' | 'Complete' | 'Disabled' | 'Error' | 'Error-Active' | 'Incomplete' | 'Non-editable';

const allStatuses: Status[] = ['Default', 'Active', 'Typing', 'Complete', 'Disabled', 'Error', 'Error-Active', 'Incomplete', 'Non-editable'];

const canType = (s: Status) => !['Disabled', 'Non-editable'].includes(s);

function getBorder(status: Status): string {
  if (status === 'Active' || status === 'Typing') return '2px solid var(--input-border-active)';
  if (status === 'Error-Active') return '2px solid var(--input-border-error)';
  return '1px solid var(--border-divider)';
}

function TextFieldPlayground({ status, onStatusChange }: { status: Status; onStatusChange: (s: Status) => void }) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevStatus = useRef(status);

  // Reset text when switching to a status that shouldn't have text
  useEffect(() => {
    if (status === 'Default' || status === 'Active') setText('');
    if (status === 'Disabled') setText('');
    if (status === 'Non-editable') setText('Read-only text');
    if (status === 'Error') setText('Error input');
    if (status === 'Error-Active') setText('Error input');
    if (status === 'Incomplete') setText('Partial');

    // Auto-focus on editable states
    if (canType(status) && inputRef.current) {
      if (['Active', 'Typing', 'Error-Active'].includes(status)) {
        inputRef.current.focus();
      }
    }
    prevStatus.current = status;
  }, [status]);

  const isDisabled = status === 'Disabled';
  const isReadonly = status === 'Non-editable';
  const isError = status === 'Error' || status === 'Error-Active';
  const showClear = (status === 'Typing' || status === 'Complete') && text.length > 0;
  const showErrorIcon = isError;
  const showButton = status === 'Incomplete';
  const handleInput = (val: string) => {
    setText(val);
    // Auto-transition: if user starts typing in Active, switch to Typing
    if (status === 'Active' && val.length > 0) onStatusChange('Typing');
    // If user clears all text in Typing, go back to Active
    if (status === 'Typing' && val.length === 0) onStatusChange('Active');
  };

  const handleClear = () => {
    setText('');
    if (status === 'Complete') onStatusChange('Active');
    if (status === 'Typing') onStatusChange('Active');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (status === 'Default') onStatusChange('Active');
    if (status === 'Complete') onStatusChange('Typing');
    if (status === 'Error') onStatusChange('Error-Active');
  };

  const handleBlur = () => {
    if (status === 'Active') onStatusChange('Default');
    if (status === 'Typing' && text.length > 0) onStatusChange('Complete');
    if (status === 'Typing' && text.length === 0) onStatusChange('Default');
    if (status === 'Error-Active') onStatusChange('Error');
  };

  return (
    <div>
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
        {/* Real input — flex: 1, min-width: 0 to shrink properly */}
        <input
          ref={inputRef}
          value={text}
          onChange={e => handleInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled || isReadonly}
          placeholder="Placeholder"
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: 14,
            lineHeight: '20px',
            color: (isDisabled || isReadonly) ? '#D9D9D9' : 'var(--text-primary)',
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
            fontSize: 18, color: '#FF4A20', flexShrink: 0,
            marginLeft: 8, lineHeight: 1, display: 'flex', alignItems: 'center',
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
              fontSize: 18, color: 'var(--text-secondary)', flexShrink: 0,
              marginLeft: 8, cursor: 'pointer', lineHeight: 1,
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
        {showButton && (
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

      {/* Current state indicator */}
      <div style={{
        marginTop: 16, padding: '8px 12px', borderRadius: 8,
        background: 'var(--page-primary)', border: '1px solid var(--border-divider)',
        fontSize: 12, color: 'var(--text-tertiary)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>Current: <strong style={{ color: 'var(--text-primary)' }}>{status}</strong></span>
        <span style={{ color: 'var(--text-tertiary)' }}>
          {canType(status) ? 'Editable' : 'Read-only'}
        </span>
      </div>
    </div>
  );
}

export default function TextFieldPage() {
  const [activeStatus, setActiveStatus] = useState<Status>('Default');

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Text Field</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>text_field.dart</code>。
        支援 9 種狀態，可嵌入 USpaceButton (Small/Primary) 作為 trailing action。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 40:3307。輸入框高度 48px，圓角 StadiumBorder (1000)。
        Active 與 Typing 狀態帶 2px 邊框（<code style={{ color: 'var(--accent)' }}>inputBorderActive</code>）。
      </p>

      {/* Playground */}
      <SectionTitle>Playground</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {allStatuses.map(s => (
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '6px 16px', borderRadius: 100, border: 'none',
            background: activeStatus === s ? 'var(--accent)' : 'var(--border-divider)',
            color: activeStatus === s ? '#000' : 'var(--text-secondary)',
            fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.12s',
          }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{
        padding: 'clamp(20px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40, maxWidth: 420,
      }}>
        <TextFieldPlayground status={activeStatus} onStatusChange={setActiveStatus} />
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

      {/* Status Descriptions */}
      <div style={{ marginTop: 40 }}>
        <SectionTitle>Status Descriptions</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                {['Status', 'Border', 'Function Area', 'Description'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Default', 'None', 'None', 'Initial empty state'],
                ['Active', 'inputBorderActive 2px', 'None', 'Focused, no input yet'],
                ['Typing', 'inputBorderActive 2px', 'Clear icon', 'User is typing, cursor visible'],
                ['Complete', 'None', 'Clear icon', 'Input completed, unfocused'],
                ['Disabled', 'None', 'None', 'Non-interactive, dimmed'],
                ['Error', 'None', 'Error icon', 'Validation failed, unfocused'],
                ['Error-Active', 'inputBorderError 2px', 'Error icon', 'Validation failed, focused'],
                ['Incomplete', 'None', 'Button', 'Partial input with action button'],
                ['Non-editable', 'None', 'None', 'Read-only display'],
              ].map(([status, border, func, desc]) => (
                <tr key={status} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{status}</td>
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{border}</code></td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{func}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
