import { useState, useRef, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import { Segmented } from '../../components/Controls';
import PageHero from '../../components/PageHero';
import { semantic } from '../../tokens/colors';

// ── Types ──────────────────────────────────────────────────
type Availability = 'enabled' | 'incomplete' | 'error';

const sampleOptions = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

function deriveStatus(
  availability: Availability,
  selected: string | null,
  isOpen: boolean,
): string {
  if (availability === 'incomplete') return 'Incomplete';
  if (availability === 'error') return 'Error';
  if (isOpen) return 'Selecting';
  if (selected) return 'Complete';
  return 'Default';
}

// ── Chevron SVG ────────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Playground ─────────────────────────────────────────────
function DropdownPlayground() {
  const [availability, setAvailability] = useState<Availability>('enabled');
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const status = deriveStatus(availability, selected, isOpen);
  const isInteractive = availability === 'enabled';

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Reset when switching availability
  useEffect(() => {
    setIsOpen(false);
    if (availability !== 'enabled') setSelected(null);
  }, [availability]);

  const handleTriggerClick = () => {
    if (!isInteractive) return;
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div>
      {/* ── Controls ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 64 }}>Status</span>
          <Segmented
            compact
            value={availability}
            onChange={setAvailability}
            options={[
              { value: 'enabled' as const, label: 'Enabled' },
              { value: 'incomplete' as const, label: 'Incomplete' },
              { value: 'error' as const, label: 'Error' },
            ]}
          />
        </div>
      </div>

      {/* ── DropdownMenu ── */}
      <div
        ref={containerRef}
        style={{
          padding: '24px 20px', borderRadius: 16, width: '100%',
          background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
          display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Label */}
        <div style={{
          fontSize: 12, color: 'var(--text-primary)', marginBottom: 4,
          lineHeight: '16px', fontFamily: '"PingFang TC", sans-serif',
          padding: '0 8px',
        }}>
          Label
        </div>

        {/* Trigger */}
        <div
          onClick={handleTriggerClick}
          style={{
            height: 48,
            borderRadius: 1000,
            background: 'var(--input-bg)',
            border: '1px solid var(--border-divider)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            cursor: isInteractive ? 'pointer' : 'default',
            transition: 'border 0.15s',
            opacity: !isInteractive ? 0.7 : 1,
          }}
        >
          <div style={{
            flex: 1, minWidth: 0,
            fontSize: 14, lineHeight: '20px',
            fontFamily: '"PingFang TC", sans-serif',
            color: selected ? 'var(--text-primary)' : 'var(--input-text-placeholder)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {selected || 'Placeholder'}
          </div>
          <span style={{ color: 'var(--text-secondary)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <ChevronDown open={isOpen} />
          </span>
        </div>

        {/* Dropdown Panel */}
        {isOpen && (
          <div style={{
            marginTop: 4,
            background: 'var(--input-bg)',
            borderRadius: 20,
            padding: '16px 20px',
            border: '1px solid var(--border-divider)',
            maxHeight: 180,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            {sampleOptions.map(option => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  fontSize: 14, lineHeight: '20px',
                  fontFamily: '"PingFang TC", sans-serif',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  padding: '0',
                  borderRadius: 4,
                  background: selected === option ? 'var(--border-divider)' : 'transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => {
                  if (selected !== option) e.currentTarget.style.background = 'var(--page-secondary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = selected === option ? 'var(--border-divider)' : 'transparent';
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Hint */}
        <div style={{
          fontSize: 14, lineHeight: '16px',
          color: (availability === 'error' || availability === 'incomplete')
            ? 'var(--input-text-error)' : 'var(--text-secondary)',
          marginTop: 4,
          padding: '0 8px',
          fontFamily: '"SF Pro", "SF Pro Text", -apple-system, sans-serif',
          minHeight: 16,
        }}>
          {(availability === 'error' || availability === 'incomplete') ? 'Error hint' : 'Hint message'}
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
          {availability} / {selected ? `"${selected}"` : 'none'}
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function DropdownMenuPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Dropdown Menu"
        lead="下拉選單元件，支援 5 種互動狀態（Default / Active / Filled / Disabled / Error），適用於表單中的選項選擇。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <DropdownPlayground />
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>與 TextField 共用視覺語言</strong>：同高度 48px、StadiumBorder，降低使用者認知負擔。</li>
              <li><strong>5 種狀態覆蓋完整流程</strong>：Default → Selecting → Complete / Incomplete / Error，涵蓋從未操作到選取完成或異常的所有情境。</li>
              <li><strong>面板與觸發器的圓角層次</strong>：下拉面板使用 20px 圓角，與觸發器的 Stadium 圓角形成層次差異，視覺上區分操作區與選項區。</li>
              <li><strong>面板可捲動</strong>：適應不同數量的選項，面板設有 maxHeight 限制並支援捲動，避免畫面被過長列表撐開。</li>
              <li><strong>Chevron 旋轉反饋</strong>：Chevron 圖示 180° 旋轉反饋展開/收合狀態，提供即時的視覺回饋。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：未選取狀態，顯示 Placeholder 文字，面板隱藏，Chevron 朝下。</li>
              <li><strong>Selecting</strong>：點擊觸發器後面板展開，Chevron 旋轉 180°，選項可捲動瀏覽。點擊外部區域收合面板。</li>
              <li><strong>Complete</strong>：已選取選項，觸發器顯示選取文字，面板隱藏，Chevron 恢復朝下。</li>
              <li><strong>Incomplete</strong>：必填欄位未完成，觸發器顯示 Placeholder，Hint 變為紅色錯誤提示，面板隱藏。</li>
              <li><strong>Error</strong>：輸入驗證失敗，Hint 變為紅色錯誤提示，面板隱藏。</li>
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
                  ['Trigger background', 'inputBgDefault (white)'],
                  ['Panel background', 'inputBgDefault (white)'],
                  ['Label text', 'inputText (bodyS 12px)'],
                  ['Input text', 'inputText (bodyM 14px)'],
                  ['Placeholder', 'inputTextPlaceholder'],
                  ['Hint (normal)', 'textSecondary (sfCaptionS 14px)'],
                  ['Hint (error)', `inputTextError (${semantic.inputTextError})`],
                  ['Chevron icon', 'contentSecondary'],
                  ['Panel border radius', '20px (number/20)'],
                  ['Scrollbar track', 'pagePrimary'],
                  ['Scrollbar thumb', 'borderDivider'],
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
              <li><strong>Trigger</strong>: height 48px, borderRadius 1000, padding horizontal 20px</li>
              <li><strong>Label</strong>: PingFang TC 12px/16px Regular, padding horizontal 8px</li>
              <li><strong>Input/Placeholder</strong>: PingFang TC 14px/20px Regular</li>
              <li><strong>Hint</strong>: SF Pro 14px/16px Regular, padding horizontal 8px</li>
              <li><strong>Chevron</strong>: 16px, contentSecondary, trailing</li>
              <li><strong>Panel</strong>: borderRadius 20px, padding 16px 20px, gap 8px</li>
              <li><strong>Panel items</strong>: PingFang TC 14px/20px Regular, inputText</li>
              <li><strong>Scrollbar</strong>: 4px wide, borderRadius 1000</li>
            </ul>
          </div>

          {/* Status Descriptions */}
          <SectionTitle>Status Descriptions</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Status', 'Trigger', 'Panel', 'Hint'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Default', 'Placeholder text', 'Hidden', 'Optional (showHint)'],
                  ['Complete', 'Selected text', 'Hidden', 'Optional (showHint)'],
                  ['Selecting', 'Selected text', 'Visible, scrollable', 'Hidden'],
                  ['Incomplete', 'Placeholder text', 'Hidden', 'Error hint (red)'],
                  ['Error', 'Input text', 'Hidden', 'Error hint (red)'],
                ].map(([status, trigger, panel, hint]) => (
                  <tr key={status} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{status}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{trigger}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{panel}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{hint}</td>
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
