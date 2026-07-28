import { useState, useRef, useEffect, useCallback } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented, Toggle } from '../../components/Controls';

// ── Types ──────────────────────────────────────────────────
type Availability = 'editable' | 'disabled' | 'non-editable';
type Validation = 'normal' | 'error';
type InternalState = 'idle' | 'focused' | 'hasText' | 'focusedWithText';

// ── Derive Figma status from dimensions ────────────────────
function deriveStatus(
  availability: Availability,
  validation: Validation,
  internal: InternalState,
): string {
  if (availability === 'disabled') return 'Disabled';
  if (availability === 'non-editable') return 'Non-editable';

  if (validation === 'error') return 'Error';

  switch (internal) {
    case 'idle': return 'Default';
    case 'focused': return 'Active';
    case 'focusedWithText': return 'Typing';
    case 'hasText': return 'Complete';
  }
}

// ── Border logic ───────────────────────────────────────────
function getBorder(status: string): string {
  if (status === 'Active' || status === 'Typing' || status === 'Error')
    return '2px solid var(--input-border-active)';
  return '1px solid var(--border-divider)';
}

// ── Playground ─────────────────────────────────────────────
function TextAreaPlayground() {
  const [availability, setAvailability] = useState<Availability>('editable');
  const [validation, setValidation] = useState<Validation>('normal');
  const [showLabel, setShowLabel] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInteractive = availability === 'editable';

  const internal: InternalState =
    focused && text.length > 0 ? 'focusedWithText' :
    focused ? 'focused' :
    text.length > 0 ? 'hasText' : 'idle';

  const status = deriveStatus(availability, validation, internal);

  useEffect(() => {
    if (availability === 'disabled') { setText(''); setFocused(false); }
    if (availability === 'non-editable') { setText('Read-only content that cannot be edited.'); setFocused(false); }
  }, [availability]);

  useEffect(() => {
    if (validation === 'error' && availability === 'editable' && text === '') {
      setText('Error input');
    }
  }, [validation, availability]);

  const isDisabled = availability === 'disabled';
  const isReadonly = availability === 'non-editable';
  const isError = validation === 'error' && isInteractive;
  const showDelete = isInteractive && text.length > 0 && (
    status === 'Typing' || status === 'Complete' || status === 'Error'
  );

  const handleClear = useCallback(() => {
    setText('');
    textareaRef.current?.focus();
  }, []);

  const textFontSize = (status === 'Complete' || status === 'Disabled') ? 16 : 14;
  const textLineHeight = (status === 'Complete' || status === 'Disabled') ? '24px' : '20px';

  return (
    <div>
      {/* ── Controls ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Label</span>
          <Toggle value={showLabel} onChange={setShowLabel} labelOff="Hidden" labelOn="Visible" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Hint</span>
          <Toggle value={showHint} onChange={setShowHint} labelOff="Hidden" labelOn="Visible" />
        </div>
      </div>

      {/* ── TextArea ── */}
      <div style={{
        padding: '24px 20px', borderRadius: 16, width: '100%',
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Label */}
        {showLabel && (
          <div style={{
            fontSize: 12, lineHeight: '16px',
            color: isDisabled ? 'var(--input-text-placeholder)' : 'var(--text-primary)',
            marginBottom: 4, paddingLeft: 8,
            fontFamily: '"PingFang TC", sans-serif',
          }}>
            Label
          </div>
        )}

        {/* Input Container */}
        <div style={{
          height: 144,
          borderRadius: 20,
          background: 'var(--input-bg)',
          border: getBorder(status),
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          opacity: isDisabled ? 0.5 : 1,
          transition: 'border 0.15s',
        }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isDisabled || isReadonly}
            placeholder="Placeholder"
            style={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              fontSize: textFontSize,
              lineHeight: textLineHeight,
              color: (isDisabled || isReadonly) ? 'var(--input-text-placeholder)' : 'var(--text-primary)',
              fontFamily: '"PingFang TC", sans-serif',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
              resize: 'none',
              cursor: (isDisabled || isReadonly) ? 'not-allowed' : 'text',
            }}
          />

          {/* Delete icon */}
          {showDelete && (
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
        </div>

        {/* Hint */}
        {showHint && (
          <div style={{
            fontSize: 12, lineHeight: '16px',
            color: isError ? 'var(--input-text-error)' : isDisabled ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            marginTop: 4,
            fontFamily: '"PingFang TC", sans-serif',
            display: 'flex', alignItems: 'center', gap: 4,
            minHeight: 16,
          }}>
            {isError && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/>
                <line x1="6" y1="3" x2="6" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="6" cy="9" r="0.7" fill="currentColor"/>
              </svg>
            )}
            {isError ? 'Error message' : 'Hint message'}
          </div>
        )}
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
          {availability} / {validation} / label:{showLabel ? 'on' : 'off'} / hint:{showHint ? 'on' : 'off'}
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function TextAreaPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Text Area"
        lead="多行文字輸入元件，支援自動高度調整與字數限制，適用於留言、備註等需要較長文字輸入的場景。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <TextAreaPlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>多行文字輸入元件</strong>：用於需要較長文字的場景（備註、描述、回饋等）。</li>
              <li><strong>與 TextField 共用設計語言但有關鍵差異</strong>：高度 144px、圓角 20px（非 Stadium）。</li>
              <li><strong>Error 邊框為綠色（inputBorderActive），非紅色</strong>：錯誤由下方紅色 hint 文字指示，邊框僅表示 active focus。</li>
              <li><strong>Complete 狀態字體放大（14px → 16px）</strong>：提升已填寫內容的可讀性。</li>
              <li><strong>showLabel / showHint 為 boolean 屬性</strong>：提供彈性佈局。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：正常可點擊狀態，顯示 placeholder 文字與 1px 邊框。</li>
              <li><strong>Active</strong>：獲得焦點後邊框變為 2px <code>inputBorderActive</code>（綠色），顯示游標。</li>
              <li><strong>Typing</strong>：輸入中狀態，邊框保持 2px 綠色，出現 delete icon。</li>
              <li><strong>Complete</strong>：失去焦點且有文字，字體從 14px 放大為 16px，邊框恢復 1px。</li>
              <li><strong>Error</strong>：驗證錯誤，邊框為 2px 綠色（非紅色），hint 文字變紅色並帶 icon。</li>
              <li><strong>Disabled</strong>：整體 opacity 0.5，cursor not-allowed，不可互動。</li>
              <li><strong>Non-editable</strong>：顯示唯讀內容，cursor not-allowed，但無 opacity 降低。</li>
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
                  ['Border (active/typing/error)', 'inputBorderActive (neonLime600)'],
                  ['Input text', 'inputText (labelM 14px/20px)'],
                  ['Complete/Disabled text', 'inputText (labelL 16px/24px)'],
                  ['Placeholder', 'inputTextPlaceholder (labelM)'],
                  ['Disabled text', 'inputTextDisabled'],
                  ['Label text', 'inputText (labelS 12px/16px)'],
                  ['Hint text', 'textSecondary (labelS)'],
                  ['Error/Incomplete hint', 'inputTextError (labelS)'],
                  ['Disabled hint', 'textDisabled'],
                  ['Cursor', 'contentAccent (neonLime600)'],
                  ['Delete icon', 'contentSecondary (20px)'],
                  ['Error hint icon', 'inputTextError (12px)'],
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
              <li><strong>Container</strong>: height 144px, borderRadius 20px</li>
              <li><strong>Padding</strong>: horizontal 20px, vertical 16px</li>
              <li><strong>Label</strong>: PingFang TC 12px/16px (labelS), paddingLeft 8px, <code>inputText</code></li>
              <li><strong>Input (default)</strong>: PingFang TC 14px/20px (labelM), <code>inputText</code></li>
              <li><strong>Input (complete/disabled)</strong>: PingFang TC 16px/24px (labelL)</li>
              <li><strong>Hint</strong>: PingFang TC 12px/16px (labelS), <code>textSecondary</code></li>
              <li><strong>Cursor</strong>: 2px wide, 24px tall, <code>contentAccent</code></li>
              <li><strong>Border (active/typing/error)</strong>: 2px, <code>inputBorderActive</code></li>
              <li><strong>Delete icon</strong>: 20px, shown in Error/Typing/Complete states</li>
              <li><strong>Error hint icon</strong>: 12px prefix icon on error/incomplete hints</li>
            </ul>
          </div>

          {/* vs TextField */}
          <SectionTitle>TextField vs TextArea</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Property', 'TextField', 'TextArea'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Height', '48px', '144px'],
                  ['Lines', 'Single', 'Multi'],
                  ['Border radius', '1000 (Stadium)', '20px'],
                  ['Error border', 'inputBorderError (red)', 'inputBorderActive (green)'],
                  ['States', '9 (incl. Error-Active)', '8 (no Error-Active)'],
                  ['Trailing', 'USpaceButton / icons', 'Delete icon only'],
                  ['Complete text', 'labelM (14px)', 'labelL (16px)'],
                ].map(([prop, tf, ta]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{prop}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{tf}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{ta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status Mapping */}
          <SectionTitle>Dimension → Status Mapping</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Availability', 'Validation', 'Interaction', 'Figma Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Editable', 'Normal', 'Idle', 'Default'],
                  ['Editable', 'Normal', 'Focused', 'Active'],
                  ['Editable', 'Normal', 'Typing', 'Typing'],
                  ['Editable', 'Normal', 'Blur w/ text', 'Complete'],
                  ['Editable', 'Error', 'Any', 'Error'],
                  ['Disabled', '—', '—', 'Disabled'],
                  ['Non-editable', '—', '—', 'Non-editable'],
                ].map(([avail, valid, interaction, figma], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}>{avail}</td>
                    <td style={{ padding: '10px 12px', color: valid === 'Error' ? 'var(--input-text-error)' : 'var(--text-secondary)' }}>{valid}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{interaction}</td>
                    <td style={{ padding: '10px 12px' }}><code>{figma}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <SectionTitle>Notes</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li>Figma 原始命名為 "TextAera"（typo），Dart 檔案統一使用正確拼寫 TextArea。</li>
              <li>Error 狀態邊框為 <code>inputBorderActive</code>（綠色），非紅色。錯誤由下方紅色 hint 文字指示。</li>
              <li>Incomplete 狀態無邊框，但 hint 文字使用 <code>inputTextError</code>（紅色）。</li>
              <li>showLabel / showHint 為 boolean 屬性，控制 label 與 hint 的顯示。</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
