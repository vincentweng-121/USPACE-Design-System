import SectionTitle from '../../components/SectionTitle';
import { typographyStyles, weightLabel } from '../../tokens/typography';

export default function TypographyPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Typography</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        USPACE 使用 <strong style={{ color: 'var(--text-secondary)' }}>PingFang TC</strong>（中文）與{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>SF Pro</strong>（英數）兩套字型系統。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 40, lineHeight: 1.6 }}>
        fontWeight 必須完全以 JSON 數值為準（400=Regular, 500=Medium, 700=Bold），不依語意推斷。
        captionS 和 displayM 的 fontSize 在兩套字體中刻意不同，這是設計意圖。
      </p>

      {typographyStyles.map(family => (
        <div key={family.family} style={{ marginBottom: 56 }}>
          <SectionTitle>{family.family}</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {family.styles.map(s => (
              <div
                key={s.name}
                style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'baseline',
                  padding: '16px 0', borderBottom: '1px solid var(--border-divider)',
                  gap: '8px 24px',
                }}
              >
                <div style={{ minWidth: 140, flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'monospace' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
                    {s.size}px / {s.lineHeight}px / {weightLabel(s.weight)}
                  </div>
                  {s.desc && (
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.desc}</div>
                  )}
                </div>
                <div style={{
                  flex: '1 1 200px',
                  fontFamily: family.family === 'PingFang TC'
                    ? '"PingFang TC", -apple-system, sans-serif'
                    : '"SF Pro", -apple-system, sans-serif',
                  fontSize: Math.min(s.size, 26), lineHeight: `${s.lineHeight}px`,
                  fontWeight: s.weight, color: 'var(--text-primary)',
                  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', minWidth: 0,
                }}>
                  {family.family === 'PingFang TC' ? 'USPACE 智慧停車' : 'USPACE Smart Parking'}
                </div>
                <div style={{
                  fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'monospace',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {s.lineHeight}/{s.size} = {(s.lineHeight / s.size).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
