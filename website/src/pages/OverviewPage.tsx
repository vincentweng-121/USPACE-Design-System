import { Link } from 'react-router-dom';
import { semanticGroups, paletteGroups } from '../tokens/colors';
import { typographyStyles } from '../tokens/typography';

// 數字由 token 資料算出，新增 token 時自動更新
const semanticCount = semanticGroups.reduce((n, g) => n + g.tokens.length, 0);
const paletteCount = paletteGroups.reduce((n, g) => n + g.colors.length, 0);
const typeCount = typographyStyles.reduce((n, f) => n + f.styles.length, 0);

const benefits = [
  {
    title: '單一真實來源',
    desc: '色票、字級、間距只存在 tokens/*.json 一處，Flutter 端與本站由同一份產生，不會各自漂移。',
  },
  {
    title: '設計與工程並列',
    desc: '每個元件都有 Design 與 Develop 兩個視角：設計規格、用法準則、程式碼範例與 API 在同一頁。',
  },
  {
    title: '機器把關',
    desc: '元件實際套用的 token 由 Flutter 測試逐項驗證，寫死色碼或跳過 token 會在 CI 被擋下。',
  },
  {
    title: '亮色與暗色',
    desc: '所有語意色都定義了兩套值，元件透過主題自動切換，不需在呼叫端判斷。',
  },
];

export default function OverviewPage() {
  return (
    <>
      {/* ── 首屏：滿版影片 + 標題／副標題 ── */}
      <HeroVideo />

      {/* ── 首屏以下 ── */}
      <div className="home-body">
      {/* ── Stats ── */}
      <section className="section">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12,
            borderRadius: 10,
          }}
        >
          <Stat value={paletteCount} label="基底色票" />
          <Stat value={semanticCount} label="語意色 token" />
          <Stat value={typeCount} label="字體樣式" />
          <Stat value={10} label="元件" />
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section">
        <h2 className="heading-lg" style={{ marginBottom: 24 }}>
          這套系統做到的事
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                padding: '20px 22px',
                boxShadow: 'var(--shadow-card)',
                borderRadius: 10,
              }}
            >
              <div className="heading-sm" style={{ marginBottom: 8 }}>
                {b.title}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick links ── */}
      <section className="section">
        <h2 className="heading-lg" style={{ marginBottom: 24 }}>
          快速前往
        </h2>
        <div style={{ display: 'grid', gap: 12, borderRadius: 10 }}>
          <Row to="/styles/color" title="Color" desc={`${paletteCount} 個基底色票、${semanticCount} 個語意 token`} />
          <Row to="/styles/typography" title="Typography" desc="PingFang TC 與 SF Pro 共兩套字體樣式" />
          <Row to="/components/button" title="Components" desc="10 個已完成元件，含用法準則與 API" />
          <Row to="/developing/tokens" title="Token Pipeline" desc="token 怎麼從 JSON 產生到程式碼" />
          <Row to="/help/changelog" title="Changelog" desc="版本變更紀錄" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Cta to="/designing" primary>
            開始設計
          </Cta>
          <Cta to="/developing">開始開發</Cta>
        </div>
      </section>
      </div>
    </>
  );
}

/**
 * 首屏：影片鋪滿整個視窗，標題與副標題壓在上面。
 *
 * 影片自動播放、無限循環、無聲、無控制項。
 * muted 與 playsInline 是瀏覽器允許自動播放的必要條件，
 * 缺任一個 Safari 與 iOS 都會擋下。
 */
function HeroVideo() {
  return (
    <section className="hero-full">
      <video
        src={`${import.meta.env.BASE_URL}hero-loop.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      <div className="hero-copy">
        <h1 className="hero-title">USPACE Design System</h1>
        <p className="hero-sub">
          USPACE 產品的設計語言。定義色票、字體、元件規格與互動準則，
          讓設計師與工程師在同一份規格上工作。
        </p>
        <div className="hero-scroll-hint">
          <span>向下捲動</span>
          <span aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}

function Cta({ to, children, primary }: { to: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 44,
        padding: '0 22px',
        borderRadius: 100,
        fontSize: 15,
        fontWeight: 600,
        border: '1px solid var(--text-primary)',
        background: primary ? 'var(--text-primary)' : 'transparent',
        color: primary ? 'var(--page-primary)' : 'var(--text-primary)',
        transition: 'opacity 0.12s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </Link>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ padding: '22px 20px', background: 'var(--page-primary)' }}>
      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.05 }}>{value}</div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

function Row({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 20px',
        background: 'var(--page-primary)',
        transition: 'background 0.12s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--page-secondary)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--page-primary)')}
    >
      <div>
        <div className="heading-sm">{title}</div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
          {desc}
        </div>
      </div>
      <span aria-hidden style={{ color: 'var(--text-tertiary)', fontSize: 18 }}>
        →
      </span>
    </Link>
  );
}
