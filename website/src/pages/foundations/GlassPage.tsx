import SectionTitle from '../../components/SectionTitle';

export default function GlassPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Glass / Materials</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        USPACE 使用半透明毛玻璃效果作為浮動元件的視覺語言。
      </p>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 48, lineHeight: 1.6 }}>
        定義於 <code style={{ color: 'var(--accent)', fontSize: 12 }}>glass_extension.dart</code>。
        渲染策略依平台不同：iOS 26+ 預計使用 Liquid Glass，其餘平台使用 BackdropFilter + Gaussian blur。
      </p>

      <SectionTitle>Specs</SectionTitle>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {[
          { label: 'Fill Color', value: 'rgba(255, 255, 255, 0.20)', code: 'Color(0x33FFFFFF)' },
          { label: 'Blur Sigma', value: '10.0', code: 'sigmaX: 10.0, sigmaY: 10.0' },
        ].map(spec => (
          <div key={spec.label} style={{
            padding: 20, borderRadius: 12,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>{spec.label}</div>
            <div style={{ fontSize: 16, color: 'var(--text-primary)', marginBottom: 8 }}>{spec.value}</div>
            <code style={{ fontSize: 11, color: 'var(--accent)' }}>{spec.code}</code>
          </div>
        ))}
      </div>

      <SectionTitle>Preview</SectionTitle>
      <div style={{
        position: 'relative', height: 240, borderRadius: 16, overflow: 'hidden',
        background: 'linear-gradient(135deg, #1A1A1A 0%, #323237 40%, #606060 100%)',
        marginBottom: 48,
      }}>
        {/* Single floating button */}
        <div style={{
          position: 'absolute', top: 24, left: 24,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.20)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff',
        }}>
          +
        </div>
        <div style={{
          position: 'absolute', top: 24, left: 84,
          fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6,
        }}>
          Single Button<br />44 x 44px
        </div>

        {/* Button bar */}
        <div style={{
          position: 'absolute', top: 24, right: 24,
          borderRadius: 100, padding: 4,
          background: 'rgba(255,255,255,0.20)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {['◉', '◎', '◇'].map((icon, i) => (
            <div key={i} style={{
              width: 44, height: 44, borderRadius: '50%',
              background: i === 0 ? 'rgba(255,255,255,0.20)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#fff',
            }}>
              {icon}
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap',
        }}>
          fillColor: rgba(255,255,255,0.20) &middot; blurSigma: 10.0
        </div>
      </div>

      <SectionTitle>Platform Rendering</SectionTitle>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
              {['Platform', 'Strategy', 'Note'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['iOS 26+', 'Liquid Glass (planned)', 'TODO: UIVisualEffectView platform view'],
              ['iOS < 26', 'BackdropFilter + Gaussian blur', 'Current implementation'],
              ['Android', 'BackdropFilter + Gaussian blur', ''],
              ['Web', 'BackdropFilter + Gaussian blur', ''],
            ].map(([platform, strategy, note]) => (
              <tr key={platform} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>{platform}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{strategy}</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)', fontSize: 12 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
