import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import { semanticGroups, paletteGroups } from '../tokens/colors';
import { typographyStyles } from '../tokens/typography';

export default function DesigningPage() {
  const semanticCount = semanticGroups.reduce((n, g) => n + g.tokens.length, 0);
  const paletteCount = paletteGroups.reduce((n, g) => n + g.colors.length, 0);
  const typeCount = typographyStyles.reduce((n, f) => n + f.styles.length, 0);

  return (
    <>
      <PageHero
        title="Designing"
        lead="USPACE Design System 定義產品的視覺語言與互動準則。這一區說明設計師怎麼取用色票、字級與元件規格，以及變更設計時該走的流程。"
      />

      <section className="section">
        <SectionTitle>系統現況</SectionTitle>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          <Stat value={paletteCount} label="基底色票" />
          <Stat value={semanticCount} label="語意色 token" />
          <Stat value={typeCount} label="字體樣式" />
          <Stat value={10} label="已完成元件" />
        </div>
      </section>

      <section className="section">
        <SectionTitle>從哪裡開始</SectionTitle>
        <div style={{ display: 'grid', gap: 12 }}>
          <Card
            to="/styles/color"
            title="Color"
            desc="基底色票與語意色 token 的完整對照，含亮色與暗色兩套值。"
          />
          <Card
            to="/styles/typography"
            title="Typography"
            desc="PingFang TC 與 SF Pro 兩套字體樣式，含尺寸、行高與字重。"
          />
          <Card
            to="/components/button"
            title="Components"
            desc="每個元件都有 Design 與 Develop 兩個視角，設計規格與程式碼並列。"
          />
        </div>
      </section>

      <section className="section">
        <SectionTitle>變更設計時</SectionTitle>
        <div className="text-md text-muted" style={{ display: 'grid', gap: 12 }}>
          <p>
            所有色票與字級都來自 Figma Variables，經由{' '}
            <code>tokens/*.json</code> 產生給 Flutter 與這個網站使用。
            意思是：<strong style={{ color: 'var(--text-primary)' }}>同一個值只存在一個地方</strong>，
            不會出現設計稿改了、程式碼沒改的情況。
          </p>
          <p>
            要新增或修改 token，請直接告知，由工程流程更新 JSON 後重新產生。
            細節見 <Link to="/developing/tokens" style={{ textDecoration: 'underline' }}>Token Pipeline</Link>。
          </p>
          <p>
            發現 Figma 上有系統裡還沒有的色票時，請先提出，不要直接在元件上使用——
            未進入 palette 的色值不會被同步，也不會出現在這個網站上。
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        padding: '20px 20px 18px',
        border: '1px solid var(--border-divider)',
        borderRadius: 10,
        background: 'var(--page-secondary)',
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

function Card({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        padding: '18px 20px',
        border: '1px solid var(--border-divider)',
        borderRadius: 10,
        transition: 'border-color 0.12s, background 0.12s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)';
        e.currentTarget.style.background = 'var(--page-secondary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-divider)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div className="heading-sm" style={{ marginBottom: 4 }}>
        {title} →
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </div>
    </Link>
  );
}
