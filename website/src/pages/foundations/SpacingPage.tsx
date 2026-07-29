import SectionTitle from '../../components/SectionTitle';
import PageHero from '../../components/PageHero';
import { margin, spacers, radii } from '../../tokens/scalars';

export default function SpacingPage() {
  return (
    <div>
      <PageHero
        title="Spacing & Radius"
        lead={<>定義於 <code>spacing_extension.dart</code> 與{' '} <code>radius_extension.dart</code>。 來源：Figma Variables Mode 1。Spacer 用於元件間距（GAP scope），Number 用於圓角（CORNER_RADIUS scope）。</>}
      />

      {/* Margin */}
      <section className="section">
        <SectionTitle>Margin</SectionTitle>
        <div style={{
          padding: '24px 20px', borderRadius: 16,
          background: 'var(--page-secondary)', border: '1px solid var(--border-divider)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: margin.value, height: 60, borderRadius: 4,
              background: 'var(--accent-bg)', opacity: 0.6 }} />
            <div>
              <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{margin.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
                <code>{margin.value}px</code> — 頁面左右邊距
              </div>
            </div>
          </div>
        </div>

        {/* Spacer Scale */}
      </section>

      <section className="section">
        <SectionTitle>Spacer Scale</SectionTitle>
        <div style={{
          padding: '24px 20px', borderRadius: 16,
          background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
          display: 'flex', flexDirection: 'column', gap: 12 }}>
          {spacers.map(s => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code>
                {s.name}
              </code>
              <div style={{
                width: s.value, height: 20, borderRadius: 2,
                background: 'var(--accent-bg)', opacity: 0.7,
                minWidth: 2 }} />
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                {s.value}px
              </span>
            </div>
          ))}
        </div>

        {/* Spacer Table */}
      </section>

      <section className="section">
        <SectionTitle>Spacer Tokens</SectionTitle>
        <div className="spec-table">
<div>
          <table style={{ minWidth: 400 }}>
            <thead>
              <tr>
                {['Token', 'Value', 'Figma Scope'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>margin</code></td>
                <td>20px</td>
                <td>GAP</td>
              </tr>
              {spacers.map(s => (
                <tr key={s.name}>
                  <td><code>{s.name}</code></td>
                  <td>{s.value}px</td>
                  <td>GAP</td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </section>

      {/* Corner Radius */}

      <section className="section">
        <SectionTitle>Corner Radius</SectionTitle>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16 }}>
          {radii.map(r => (
            <div key={r.name} style={{
              padding: 20, borderRadius: 12,
              background: 'var(--page-secondary)', border: '1px solid var(--border-divider)' }}>
              <div style={{
                width: 64, height: 64, borderRadius: Math.min(r.value, 32),
                border: '2px solid var(--accent-bg)',
                marginBottom: 12 }} />
              <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{r.value}px</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div className="spec-table">
<div>
          <table style={{ minWidth: 400 }}>
            <thead>
              <tr>
                {['Token', 'Value', 'Usage'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {radii.map(r => (
                <tr key={r.name}>
                  <td><code>{r.name}</code></td>
                  <td>{r.value}px</td>
                  <td>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </section>

      {/* Notes */}

      <section className="section">
        <SectionTitle>Notes</SectionTitle>
        <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>Margin</strong>: 頁面統一邊距 20px，Figma 中命名為 "Margine"（原始拼寫）</li>
            <li><strong>Spacer</strong>: 11 級間距階梯，從 2px 到 56px，scope = GAP</li>
            <li><strong>Radius full</strong>: 值為 1000px，等同 StadiumBorder，適用於 Button、Chip、Input 等完全圓角元件</li>
            <li><strong>Radius small</strong>: 8px，適用於 card 內嵌小元素</li>
            <li><strong>Radius medium</strong>: 20px，適用於 dropdown panel、popup 等浮動元件</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
