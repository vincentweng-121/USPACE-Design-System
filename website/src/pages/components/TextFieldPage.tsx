import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

type Status = 'Default' | 'Active' | 'Typing' | 'Complete' | 'Disabled' | 'Error' | 'Error-Active' | 'Incomplete' | 'Non-editable';

const allStatuses: Status[] = ['Default', 'Active', 'Typing', 'Complete', 'Disabled', 'Error', 'Error-Active', 'Incomplete', 'Non-editable'];

interface StatusConfig {
  placeholder: string;
  value: string;
  label: string;
  hint: string;
  hintError: boolean;
  showButton: boolean;
  showClear: boolean;
  showError: boolean;
  border: string;
  disabled: boolean;
  textColor: string;
}

function getConfig(status: Status): StatusConfig {
  const base = {
    placeholder: 'Placeholder',
    value: '',
    label: 'Label',
    hint: 'Hint message',
    hintError: false,
    showButton: false,
    showClear: false,
    showError: false,
    border: '1px solid var(--border-divider)',
    disabled: false,
    textColor: 'var(--text-primary)',
  };

  switch (status) {
    case 'Default':
      return { ...base };
    case 'Active':
      return { ...base, border: '2px solid var(--input-border-active)' };
    case 'Typing':
      return { ...base, value: 'Input text', border: '2px solid var(--input-border-active)', showClear: true };
    case 'Complete':
      return { ...base, value: 'Completed text', showClear: true };
    case 'Disabled':
      return { ...base, textColor: '#D9D9D9', disabled: true };
    case 'Error':
      return { ...base, value: 'Error input', showError: true, hint: 'Error message', hintError: true };
    case 'Error-Active':
      return { ...base, value: 'Error input', border: '2px solid var(--input-border-error)', showError: true, hint: 'Error message', hintError: true };
    case 'Incomplete':
      return { ...base, value: 'Partial', showButton: true };
    case 'Non-editable':
      return { ...base, value: 'Read-only text', textColor: '#D9D9D9', disabled: true };
  }
}

function TextFieldDemo({ status }: { status: Status }) {
  const c = getConfig(status);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>{status}</div>

      {/* Label */}
      <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 4, lineHeight: '16px', fontFamily: '"PingFang TC", sans-serif' }}>
        {c.label}
      </div>

      {/* Input Container */}
      <div style={{
        height: 48,
        borderRadius: 1000,
        background: 'var(--input-bg)',
        border: c.border,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: c.showButton ? 4 : 20,
        opacity: c.disabled ? 0.6 : 1,
      }}>
        {/* Input text / placeholder */}
        <div style={{
          flex: 1,
          fontSize: 14,
          lineHeight: '20px',
          color: c.value ? c.textColor : 'var(--input-text-placeholder)',
          fontFamily: '"PingFang TC", sans-serif',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {c.value || c.placeholder}
        </div>

        {/* Error icon */}
        {c.showError && (
          <span style={{ fontSize: 20, color: '#FF4A20', marginLeft: 8, lineHeight: 1 }}>&#9888;</span>
        )}

        {/* Clear icon */}
        {c.showClear && (
          <span style={{ fontSize: 20, color: 'var(--text-secondary)', marginLeft: 8, cursor: 'pointer', lineHeight: 1 }}>&#10005;</span>
        )}

        {/* Action button */}
        {c.showButton && (
          <button style={{
            marginLeft: 8,
            padding: '8px 24px',
            borderRadius: 100,
            border: 'none',
            background: '#606060',
            color: '#FFFFFF',
            fontSize: 14,
            cursor: c.disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}>
            Action
          </button>
        )}

        {/* Typing cursor indicator */}
        {status === 'Typing' && (
          <div style={{
            width: 2,
            height: 24,
            background: 'var(--accent)',
            marginLeft: -4,
            marginRight: 4,
            animation: 'blink 1s step-end infinite',
          }} />
        )}
      </div>

      {/* Hint */}
      {c.hint && (
        <div style={{
          fontSize: 14,
          lineHeight: '16px',
          color: c.hintError ? '#F40000' : 'var(--text-secondary)',
          marginTop: 4,
          fontFamily: '"SF Pro", "SF Pro Text", -apple-system, sans-serif',
        }}>
          {c.hint}
        </div>
      )}
    </div>
  );
}

export default function TextFieldPage() {
  const [activeStatus, setActiveStatus] = useState<Status>('Default');

  return (
    <div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>

      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Text Field</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>text_field.dart</code>。
        支援 9 種狀態，可嵌入 USpaceButton (Small/Primary) 作為 trailing action。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 40:3307。輸入框高度 48px，圓角 StadiumBorder (1000)。
        Active 與 Typing 狀態帶 2px 邊框（<code style={{ color: 'var(--accent)' }}>inputBorderActive</code>）。
      </p>

      {/* Status Switcher */}
      <SectionTitle>Interactive Demo</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {allStatuses.map(s => (
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '6px 16px', borderRadius: 100, border: 'none',
            background: activeStatus === s ? 'var(--accent)' : 'var(--grey800)',
            color: activeStatus === s ? '#000' : 'var(--text-secondary)',
            fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{
        padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40, maxWidth: 400,
      }}>
        <TextFieldDemo status={activeStatus} />
      </div>

      {/* All States Gallery */}
      <SectionTitle>All States</SectionTitle>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24, marginBottom: 40,
      }}>
        {allStatuses.map(s => (
          <div key={s} style={{
            padding: 20, borderRadius: 12,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
          }}>
            <TextFieldDemo status={s} />
          </div>
        ))}
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
            <li><strong>Padding</strong>: left 20px, right 20px (without button) / 4px (with button)</li>
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
