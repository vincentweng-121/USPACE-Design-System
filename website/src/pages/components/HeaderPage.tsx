import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

const types = ['FullPage', 'Floating', 'Modal'] as const;

export default function HeaderPage() {
  const [active, setActive] = useState<typeof types[number]>('FullPage');

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Header</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>header.dart</code>。
        對應 Figma PageTitle component set，支援三種 type。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        Figma nodes: 1327:17998 (FullPage), 1327:18205 (Floating), 1327:18962 (Modal)
      </p>

      <SectionTitle>Playground</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', minWidth: 48 }}>Type</span>
          <div style={{
            display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border-divider)',
          }}>
            {types.map(t => (
              <button key={t} onClick={() => setActive(t)} style={{
                padding: '6px 12px', border: 'none', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
                background: active === t ? 'var(--accent)' : 'var(--page-primary)',
                color: active === t ? '#000' : 'var(--text-secondary)',
                fontWeight: active === t ? 600 : 400,
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: 'clamp(16px, 4vw, 32px)', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 40,
      }}>
        <div style={{
          background: active === 'FullPage' ? '#000' : '#1A1A1A',
          borderRadius: active === 'FullPage' ? 12 : active === 'Floating' ? '24px 24px 12px 12px' : '20px 20px 12px 12px',
          maxWidth: 375, width: '100%',
          border: '1px solid var(--border-divider)', overflow: 'hidden',
        }}>
          {active === 'Floating' && (
            <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 4, borderRadius: 100, background: 'rgba(255,255,255,0.15)' }} />
            </div>
          )}
          {active === 'Modal' && <div style={{ height: 16 }} />}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, color: '#fff' }}>&#8249;</span>
            <span style={{ fontSize: 24, color: '#fff' }}>&#x2715;</span>
          </div>
          <div style={{ padding: '0 16px 24px' }}>
            <div style={{
              fontSize: active === 'FullPage' ? 26 : 22, fontWeight: 400,
              color: '#fff',
              textAlign: active === 'FullPage' ? 'left' : 'center',
            }}>
              {active === 'FullPage' ? 'Page Title' : active === 'Floating' ? 'Sheet Title' : 'Modal Title'}
            </div>
            <div style={{
              fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8,
              textAlign: active === 'FullPage' ? 'left' : 'center',
            }}>
              Subtitle text here
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <SectionTitle>Type Specifications</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
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

      <div style={{ marginTop: 120 }}>
        <SectionTitle>Left Section Functions</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>fullPageIcon</strong> — ChevronLeft 24px（h=34 container）</li>
            <li><strong>floatingIcon</strong> — ChevronLeft 24px（h=24 container）</li>
            <li><strong>title</strong> — headingM 文字，left-align</li>
            <li><strong>profileTitle</strong> — headingL + w700，left-align</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
