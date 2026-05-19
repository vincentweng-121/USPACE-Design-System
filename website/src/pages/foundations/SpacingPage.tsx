import SectionTitle from '../../components/SectionTitle';

const spacers = [
  { name: 'spacer2', value: 2 },
  { name: 'spacer4', value: 4 },
  { name: 'spacer8', value: 8 },
  { name: 'spacer12', value: 12 },
  { name: 'spacer16', value: 16 },
  { name: 'spacer20', value: 20 },
  { name: 'spacer24', value: 24 },
  { name: 'spacer32', value: 32 },
  { name: 'spacer40', value: 40 },
  { name: 'spacer48', value: 48 },
  { name: 'spacer56', value: 56 },
];

const radii = [
  { name: 'small', value: 8, desc: 'Card 內元素、小圓角' },
  { name: 'medium', value: 20, desc: 'Dropdown panel、popup' },
  { name: 'full', value: 1000, desc: 'Button、Chip、Input' },
];

export default function SpacingPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Spacing & Radius</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>spacing_extension.dart</code> 與{' '}
        <code style={{ color: 'var(--accent)', fontSize: 12 }}>radius_extension.dart</code>。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        來源：Figma Variables Mode 1。Spacer 用於元件間距（GAP scope），Number 用於圓角（CORNER_RADIUS scope）。
      </p>

      {/* Margin */}
      <SectionTitle>Margin</SectionTitle>
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        marginBottom: 48,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 20, height: 60, borderRadius: 4,
            background: 'var(--accent-bg)', opacity: 0.6,
          }} />
          <div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>margin</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
              <code style={{ color: 'var(--accent)' }}>20px</code> — 頁面左右邊距
            </div>
          </div>
        </div>
      </div>

      {/* Spacer Scale */}
      <SectionTitle>Spacer Scale</SectionTitle>
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {spacers.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <code style={{
              fontSize: 12, color: 'var(--accent)', minWidth: 80,
              fontFamily: 'monospace',
            }}>
              {s.name}
            </code>
            <div style={{
              width: s.value, height: 20, borderRadius: 2,
              background: 'var(--accent-bg)', opacity: 0.7,
              minWidth: 2,
            }} />
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              {s.value}px
            </span>
          </div>
        ))}
      </div>

      {/* Spacer Table */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Spacer Tokens</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                {['Token', 'Value', 'Figma Scope'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>margin</code></td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>20px</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>GAP</td>
              </tr>
              {spacers.map(s => (
                <tr key={s.name} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{s.name}</code></td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{s.value}px</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>GAP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corner Radius */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Corner Radius</SectionTitle>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16, marginBottom: 48,
        }}>
          {radii.map(r => (
            <div key={r.name} style={{
              padding: 20, borderRadius: 12,
              background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: Math.min(r.value, 32),
                border: '2px solid var(--accent-bg)',
                marginBottom: 12,
              }} />
              <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{r.value}px</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                {['Token', 'Value', 'Usage'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {radii.map(r => (
                <tr key={r.name} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{r.name}</code></td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{r.value}px</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginTop: 120 }}>
        <SectionTitle>Notes</SectionTitle>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Margin</strong>: 頁面統一邊距 20px，Figma 中命名為 "Margine"（原始拼寫）</li>
            <li><strong>Spacer</strong>: 11 級間距階梯，從 2px 到 56px，scope = GAP</li>
            <li><strong>Radius full</strong>: 值為 1000px，等同 StadiumBorder，適用於 Button、Chip、Input 等完全圓角元件</li>
            <li><strong>Radius small</strong>: 8px，適用於 card 內嵌小元素</li>
            <li><strong>Radius medium</strong>: 20px，適用於 dropdown panel、popup 等浮動元件</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
