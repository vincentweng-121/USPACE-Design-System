import SectionTitle from '../../components/SectionTitle';
import PageHero from '../../components/PageHero';
import { palette } from '../../tokens/colors';
import { glass } from '../../tokens/scalars';

export default function GlassPage() {
  return (
    <div>
      <PageHero
        title="Glass / Materials"
        lead={<>USPACE 使用半透明毛玻璃效果作為浮動元件的視覺語言。 定義於 <code>glass_extension.dart</code>。 渲染策略依平台不同：iOS 26+ 預計使用 Liquid Glass，其餘平台使用 BackdropFilter + Gaussian blur。</>}
      />

      <section className="section">
        <SectionTitle>Specs</SectionTitle>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16 }}>
          {[
            { label: 'Fill Color', value: glass.fillColor, code: glass.fillColorDart },
            { label: 'Blur Sigma', value: String(glass.blurSigma), code: `sigmaX: ${glass.blurSigma}, sigmaY: ${glass.blurSigma}` },
          ].map(spec => (
            <div key={spec.label} style={{
              padding: 20, borderRadius: 12,
              background: 'var(--page-secondary)', border: '1px solid var(--border-divider)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>{spec.label}</div>
              <div style={{ fontSize: 16, color: 'var(--text-primary)', marginBottom: 8 }}>{spec.value}</div>
              <code>{spec.code}</code>
            </div>
          ))}
        </div>

      </section>

      <section className="section">
        <SectionTitle>Preview</SectionTitle>
        <div style={{
          position: 'relative', height: 240, borderRadius: 16, overflow: 'hidden',
          background: `linear-gradient(135deg, ${palette.grey900} 0%, ${palette.grey800} 40%, ${palette.grey700} 100%)` }}>
          {/* Single floating button */}
          <div style={{
            position: 'absolute', top: 24, left: 24,
            width: 44, height: 44, borderRadius: '50%',
            background: glass.fillColor,
            backdropFilter: `blur(${glass.blurSigma}px)`, WebkitBackdropFilter: `blur(${glass.blurSigma}px)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: palette.white }}>
            +
          </div>
          <div style={{
            position: 'absolute', top: 24, left: 84,
            fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Single Button<br />44 x 44px
          </div>

          {/* Button bar */}
          <div style={{
            position: 'absolute', top: 24, right: 24,
            borderRadius: 100, padding: 4,
            background: glass.fillColor,
            backdropFilter: `blur(${glass.blurSigma}px)`, WebkitBackdropFilter: `blur(${glass.blurSigma}px)`,
            display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['◉', '◎', '◇'].map((icon, i) => (
              <div key={i} style={{
                width: 44, height: 44, borderRadius: '50%',
                background: i === 0 ? glass.fillColor : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: palette.white }}>
                {icon}
              </div>
            ))}
          </div>

          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
            fillColor: {glass.fillColor} &middot; blurSigma: {glass.blurSigma}
          </div>
        </div>

      </section>

      <section className="section">
        <SectionTitle>Platform Rendering</SectionTitle>
        <div className="spec-table">
  <div>
          <table style={{ minWidth: 400 }}>
            <thead>
              <tr>
                {['Platform', 'Strategy', 'Note'].map(h => (
                  <th key={h}>{h}</th>
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
                <tr key={platform}>
                  <td>{platform}</td>
                  <td>{strategy}</td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
  </div>
        </div>
      </section>
    </div>
  );
}
