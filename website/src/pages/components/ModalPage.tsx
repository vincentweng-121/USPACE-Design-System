import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

// ── Types ──────────────────────────────────────────────────
type Category = 'list' | 'textarea' | 'image' | 'null';

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

function Toggle({ value, onChange, labelOn, labelOff }: {
  value: boolean; onChange: (v: boolean) => void;
  labelOn: string; labelOff: string;
}) {
  return (
    <div style={{
      display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
      border: '1px solid var(--border-divider)',
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

// ── SVG Icons ──────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="6" x2="18" y2="18" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="18" y1="6" x2="6" y2="18" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="8" width="22" height="18" rx="3" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
      <path d="M11 8V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
      <line x1="5" y1="16" x2="27" y2="16" stroke="var(--text-secondary)" strokeWidth="1.5"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="var(--accent)" />
      <polyline points="8,12.5 11,15.5 16.5,9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function NoticeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="var(--text-secondary)" strokeWidth="1.2"/>
      <line x1="8" y1="5" x2="8" y2="9" stroke="var(--text-secondary)" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.8" fill="var(--text-secondary)"/>
    </svg>
  );
}

// ── Divider ────────────────────────────────────────────────
function ModalDivider() {
  return <div style={{ height: 1, background: 'var(--border-divider)', width: '100%' }} />;
}

// ── List Item ──────────────────────────────────────────────
function ListItem({ title, showCheck, showTopDivider = false }: {
  title: string; showCheck?: boolean; showTopDivider?: boolean;
}) {
  return (
    <div>
      {showTopDivider && <ModalDivider />}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '16px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <BusinessIcon />
          <span style={{
            fontSize: 18, lineHeight: '26px',
            fontFamily: '"PingFang TC", sans-serif',
            color: 'var(--text-primary)',
          }}>
            {title}
          </span>
        </div>
        {showCheck && <CheckIcon />}
      </div>
      <ModalDivider />
    </div>
  );
}

// ── Modal Preview ──────────────────────────────────────────
function ModalPreview({ category, showBottomBar, showNotice }: {
  category: Category; showBottomBar: boolean; showNotice: boolean;
}) {
  return (
    <div style={{
      width: 390, maxWidth: '100%',
      borderRadius: '20px 20px 0 0',
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      boxShadow: '0 0 30px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px' }}>
        {/* TopSpacing */}
        <div style={{ height: 16 }} />

        {/* ActionBar: close button right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ cursor: 'pointer' }}><CloseIcon /></div>
        </div>

        {/* Title */}
        <div style={{
          textAlign: 'center',
          fontSize: 18, fontWeight: 500, lineHeight: '26px',
          fontFamily: '"PingFang TC", sans-serif',
          color: 'var(--text-primary)',
        }}>
          Title
        </div>
      </div>

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Content */}
      <div style={{ padding: '0 20px' }}>
        {category === 'list' && (
          <div>
            <ListItem title="Title" showCheck />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
            <ListItem title="Title" />
          </div>
        )}

        {category === 'textarea' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              fontSize: 12, lineHeight: '16px', paddingLeft: 8,
              fontFamily: '"PingFang TC", sans-serif',
              color: 'var(--text-primary)',
            }}>
              Label
            </div>
            <div style={{
              height: 144, borderRadius: 20,
              background: 'white',
              padding: '16px 20px',
            }}>
              <span style={{
                fontSize: 14, lineHeight: '20px',
                fontFamily: '"PingFang TC", sans-serif',
                color: '#D9D9D9',
              }}>
                Placeholder
              </span>
            </div>
          </div>
        )}

        {category === 'image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              height: 196, borderRadius: 20,
              background: 'var(--page-primary)',
            }} />
            {showNotice && (
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <NoticeIcon />
                <span style={{
                  fontSize: 12, lineHeight: '16px',
                  fontFamily: '"PingFang TC", sans-serif',
                  color: 'var(--text-secondary)',
                  flex: 1,
                }}>
                  A reminder or explanatory text
                </span>
              </div>
            )}
          </div>
        )}

        {/* Null category: empty */}
      </div>

      {/* BottomBar or Home Indicator */}
      {showBottomBar ? (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            padding: '12px 0',
            borderRadius: 1000,
            background: 'var(--grey800)',
            textAlign: 'center',
            fontSize: 16, lineHeight: '24px',
            fontFamily: '"PingFang TC", sans-serif',
            color: 'var(--accent)',
          }}>
            Label
          </div>
          <div style={{ height: 20 }} />
        </div>
      ) : (
        <div style={{ height: 16 }} />
      )}
    </div>
  );
}

// ── Playground ─────────────────────────────────────────────
function ModalPlayground() {
  const [category, setCategory] = useState<Category>('list');
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 80 }}>Category</span>
          <Segmented
            value={category}
            onChange={setCategory}
            options={[
              { value: 'list', label: 'List Item' },
              { value: 'textarea', label: 'Text Area' },
              { value: 'image', label: 'Image' },
              { value: 'null', label: 'Null' },
            ]}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 80 }}>Bottom Bar</span>
          <Toggle
            value={showBottomBar}
            onChange={setShowBottomBar}
            labelOff="Hidden"
            labelOn="Visible"
          />
        </div>

        {category === 'image' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 80 }}>Notice Text</span>
            <Toggle
              value={showNotice}
              onChange={setShowNotice}
              labelOff="Hidden"
              labelOn="Visible"
            />
          </div>
        )}
      </div>

      {/* Preview on dark bg to show glass effect */}
      <div style={{
        padding: '40px 20px 0',
        borderRadius: 16,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
        display: 'flex', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <ModalPreview
          category={category}
          showBottomBar={showBottomBar}
          showNotice={showNotice}
        />
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
          Category: <strong style={{ color: 'var(--text-primary)', fontSize: 13 }}>
            {category === 'list' ? 'List Item' : category === 'textarea' ? 'Text Area' : category === 'image' ? 'Image' : 'Null'}
          </strong>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
          bottomBar:{showBottomBar ? 'on' : 'off'}
          {category === 'image' ? ` / notice:${showNotice ? 'on' : 'off'}` : ''}
        </span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function ModalPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Modal</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>modal.dart</code>。
        底部彈出式 Modal，支援 4 種內容類別。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma node: 2237:3211。使用 pagePopup (rgba(255,255,255,0.8)) + backdrop blur 15px
        的毛玻璃效果，搭配 PageTitle (modal type) header。
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ maxWidth: 480, marginBottom: 140 }}>
        <ModalPlayground />
      </div>

      {/* Token Mapping */}
      <SectionTitle>Token Mapping</SectionTitle>
      <div style={{ overflowX: 'auto', marginBottom: 120 }}>
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
              ['Background', 'pagePopup (transparentWhite80)'],
              ['Backdrop blur', '15px gaussian blur'],
              ['Shadow', '0 0 30px rgba(0,0,0,0.1)'],
              ['Border radius', 'Number/20 (20px), top only'],
              ['Title text', 'textPrimary (displayL 18px/26px Medium)'],
              ['Paragraph text', 'textSecondary (bodyM 14px/20px)'],
              ['Close icon', 'contentPrimary (24px)'],
              ['List title', 'textPrimary (bodyL 18px/26px)'],
              ['List icon', '32px leading icon'],
              ['List divider', 'borderDivider'],
              ['Button bg', 'actionPrimaryBg (#323237)'],
              ['Button text', 'actionPrimaryContentAccent (#C3F400)'],
              ['Image placeholder', 'pagePrimary, 196px, radius 20px'],
              ['Notice icon', 'contentSecondary (16px)'],
              ['Notice text', 'textSecondary (captionS 12px/16px)'],
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
      <SectionTitle>Layout Specs</SectionTitle>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Container</strong>: width 390px (iPhone), top borderRadius 20px</li>
          <li><strong>Padding</strong>: horizontal 20px (margine)</li>
          <li><strong>Gap</strong>: 16px (spacer/16pt) between header and content</li>
          <li><strong>TopSpacing</strong>: 16px above ActionBar</li>
          <li><strong>Title</strong>: PingFang TC 18px/26px Medium (displayL), center-align</li>
          <li><strong>Paragraph</strong>: PingFang TC 14px/20px (bodyM), center-align, pt=12px</li>
          <li><strong>Close icon</strong>: 24px, right-aligned</li>
          <li><strong>List item</strong>: py=16px, icon 32px + gap 12px + title 18px</li>
          <li><strong>BottomBar</strong>: pt=20px, full-width stadium button, py=12px</li>
          <li><strong>Home Indicator</strong>: 20px bottom spacing (with BottomBar) or 16px (without)</li>
          <li><strong>Image</strong>: 196px height, radius 20px, pagePrimary bg</li>
          <li><strong>Notice text</strong>: icon 16px + gap 8px + captionS text</li>
        </ul>
      </div>

      {/* Categories */}
      <SectionTitle>Content Categories</SectionTitle>
      <div style={{ overflowX: 'auto', marginBottom: 120 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['Category', 'Content', 'BottomBar', 'Extra Props'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['List Item', 'Icon + title list with dividers', 'Optional', 'list1-6 visibility, check icon'],
              ['Text Area', 'Embedded TextArea component', 'Optional', 'showLabel, showHint'],
              ['Image', 'Image placeholder + notice text', 'Optional', 'showReminderText'],
              ['Null', 'Empty content (min-height 187px)', 'Optional', '—'],
            ].map(([cat, content, bar, props]) => (
              <tr key={cat} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{cat}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{content}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{bar}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{props}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <SectionTitle>Notes</SectionTitle>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <ul style={{ paddingLeft: 20 }}>
          <li>Modal 使用 <code style={{ color: 'var(--accent)' }}>pagePopup</code> + BackdropFilter 實現毛玻璃效果。</li>
          <li>Dart 實作使用 composable 設計：<code style={{ color: 'var(--accent)' }}>USpaceModal</code> 接受 child widget，搭配 <code style={{ color: 'var(--accent)' }}>USpaceModalListItem</code> 和 <code style={{ color: 'var(--accent)' }}>USpaceModalImageSection</code> helper widgets。</li>
          <li>BottomBar 的按鈕為全寬 stadium shape，使用 actionPrimaryBg + actionPrimaryContentAccent。</li>
          <li>Header 複用 PageTitle modal type 的結構（close button, center title），但直接內建於 Modal 中以簡化使用。</li>
          <li>List item 第一項可帶 check icon（trailing），表示已選取狀態。</li>
        </ul>
      </div>
    </div>
  );
}
