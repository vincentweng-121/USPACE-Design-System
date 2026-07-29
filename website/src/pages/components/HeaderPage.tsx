import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { Segmented } from '../../components/Controls';
import { asOptions } from '../../utils';
import { semanticDark } from '../../tokens/colors';

const types = ['FullPage', 'Floating', 'Modal'] as const;

export default function HeaderPage() {
  const [tab, setTab] = usePageTab();
  const [active, setActive] = useState<typeof types[number]>('FullPage');

  return (
    <div>
      <PageHero
        title="Header"
        lead="頁面頂部標題列元件，支援 Type A / Type B / Type C 三種佈局，可搭配返回按鈕、操作按鈕與副標題。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>
          {/* Playground */}
          <SectionTitle>Playground</SectionTitle>
          <div style={{ marginBottom: 120 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 48 }}>Type</span>
                <Segmented compact value={active} onChange={setActive} options={asOptions(types)} />
              </div>
            </div>

            <div style={{
              padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16, width: '100%',
              background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
              display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
            }}>
              {/* 深色機殼預覽：token 取 dark 主題值 */}
              <div style={{
                background: active === 'FullPage' ? semanticDark.pagePrimary : semanticDark.pageSecondary,
                borderRadius: active === 'FullPage' ? 12 : active === 'Floating' ? '24px 24px 12px 12px' : '20px 20px 12px 12px',
                maxWidth: 375, width: '100%',
                border: '1px solid var(--border-divider)', overflow: 'hidden',
              }}>
                {active === 'Floating' && (
                  <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
                    {/* GrabBar 用 borderDivider，見 header.dart _GrabBarSpacing */}
                    <div style={{ width: 40, height: 4, borderRadius: 100, background: semanticDark.borderDivider }} />
                  </div>
                )}
                {active === 'Modal' && <div style={{ height: 16 }} />}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 24, color: semanticDark.contentPrimary }}>&#8249;</span>
                  <span style={{ fontSize: 24, color: semanticDark.contentPrimary }}>&#x2715;</span>
                </div>
                <div style={{ padding: '0 16px 24px' }}>
                  <div style={{
                    fontSize: active === 'FullPage' ? 26 : 22, fontWeight: 400,
                    color: semanticDark.textPrimary,
                    textAlign: active === 'FullPage' ? 'left' : 'center',
                  }}>
                    {active === 'FullPage' ? 'Page Title' : active === 'Floating' ? 'Sheet Title' : 'Modal Title'}
                  </div>
                  <div style={{
                    fontSize: 14, color: semanticDark.textSecondary, marginTop: 8,
                    textAlign: active === 'FullPage' ? 'left' : 'center',
                  }}>
                    Subtitle text here
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UX Principle */}
          <SectionTitle>UX Principle</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>3 種 Type 對應不同導航層級</strong>：FullPage 為頂層頁面、Floating 為可拖拉底部彈出、Modal 為對話框。</li>
              <li><strong>標題對齊反映資訊架構</strong>：FullPage 標題靠左，符合閱讀動線；Floating/Modal 標題置中，強調焦點內容。</li>
              <li><strong>GrabBar 暗示手勢操作</strong>：Floating 帶 GrabBar（40x4 pill）暗示可手勢拖拉。</li>
              <li><strong>支援 Scrolling 狀態</strong>：滾動時標題可收縮以釋放閱讀空間。</li>
              <li><strong>LeftSection 功能多樣</strong>：支援 chevron/title/profileTitle，由上下文決定。</li>
              <li><strong>RightSection 支援多種形式</strong>：支援 icon24/icon32/textButton 三種形式。</li>
            </ul>
          </div>

          {/* Interaction & States */}
          <SectionTitle>Interaction & States</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 120 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Default</strong>：標題完整顯示，LeftSection / RightSection 正常呈現。Header 固定於頂部，下方內容可捲動。</li>
              <li><strong>Scrolling</strong>：使用者向下捲動後，標題區域收縮（collapse），僅保留導航列與 action icon，釋放更多閱讀空間。</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'develop' && (
        <div>
          {/* Type Specifications */}
          <SectionTitle>Type Specifications</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 120 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['Property', 'FullPage', 'Floating', 'Modal'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Title style', 'headingL (26px)', 'headingM (22px)', 'headingM (22px)'],
                  ['Corner radius', '0', '24px (top)', '20px (top)'],
                  ['GrabBar', 'No', 'Yes (40×4)', 'No'],
                  ['Title align', 'Left', 'Left / Center', 'Center'],
                  ['Top spacing', '16px', '20px (with grab)', '16px'],
                ].map(([prop, ...vals]) => (
                  <tr key={prop} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{prop}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Left Section Functions */}
          <SectionTitle>Left Section Functions</SectionTitle>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>fullPageIcon</strong> — ChevronLeft 24px（h=34 container）</li>
              <li><strong>floatingIcon</strong> — ChevronLeft 24px（h=24 container）</li>
              <li><strong>title</strong> — headingM 文字，left-align</li>
              <li><strong>profileTitle</strong> — headingL + w700，left-align</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
