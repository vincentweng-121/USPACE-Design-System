import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';
import SpecTable from '../components/SpecTable';

export default function TokenPipelinePage() {
  return (
    <>
      <PageHero
        title="Token Pipeline"
        lead="色票、字級、間距只存在一個地方：tokens/*.json。Flutter 端與這個網站的 token 檔都由它產生，不會各自漂移。"
      />

      <section className="section">
        <SectionTitle>流程</SectionTitle>
        <div
          style={{
            border: '1px solid var(--border-divider)',
            borderRadius: 10,
            padding: '20px 24px',
            background: 'var(--page-secondary)',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            fontSize: 13,
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        >
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            tokens/*.json  ←  唯一手改處
          </div>
          <div>    │</div>
          <div>    │  npm run gen:tokens</div>
          <div>    ▼</div>
          <div>styles/*.dart            （Flutter）</div>
          <div>website/src/tokens/*.ts  （本站）</div>
        </div>
      </section>

      <section className="section">
        <SectionTitle>來源檔案</SectionTitle>
        <SpecTable
          headers={['檔案', '內容', '產出']}
          rows={[
            [<code key="1">palette.json</code>, '基底色票 hex', 'uspace_palette.dart、colors.ts'],
            [<code key="2">semantic-colors.json</code>, '語意色的亮/暗對應', 'uspace_colors_extension.dart、colors.ts'],
            [<code key="3">gradients.json</code>, '漸層', 'uspace_colors_extension.dart'],
            [<code key="4">typography.json</code>, '字體樣式', 'typography_extension.dart、typography.ts'],
            [<code key="5">scalars.json</code>, '間距 / 圓角 / 陰影 / Glass', '四個對應的 extension 檔、scalars.ts'],
            [<code key="6">components/*.json</code>, '元件的 token 對應', 'componentSpecs.ts、Flutter 測試'],
          ]}
          minWidth={560}
        />
      </section>

      <section className="section">
        <SectionTitle>常見操作</SectionTitle>

        <h3 className="heading-md" style={{ marginTop: 8, marginBottom: 12 }}>
          改一個色票的值
        </h3>
        <p className="text-md text-muted" style={{ marginBottom: 16 }}>
          只改 <code>palette.json</code> 對應的 <code>value</code>。
          所有引用該色票的語意色、Flutter 端與本站會一起更新。
        </p>
        <CodeBlock
          lang="json"
          title="tokens/palette.json"
          code={`"neonLime600": { "value": "0xFFC3F400" }`}
        />

        <h3 className="heading-md" style={{ marginTop: 32, marginBottom: 12 }}>
          新增一個語意色 token
        </h3>
        <p className="text-md text-muted" style={{ marginBottom: 16 }}>
          在 <code>semantic-colors.json</code> 對應的群組加一行。建構子、欄位、
          <code>copyWith</code>、<code>lerp</code> 都會自動補齊。
        </p>
        <CodeBlock
          lang="json"
          title="tokens/semantic-colors.json"
          code={`"shadowDefault": { "light": "transparentBlack10", "dark": "transparentBlack10" }`}
        />
        <p className="text-sm" style={{ marginTop: 12, color: 'var(--text-tertiary)' }}>
          <code>light</code> 與 <code>dark</code> 的值必須是 <code>palette.json</code> 裡
          存在的色票名稱，不存在時產生器會直接報錯。
        </p>
      </section>

      <section className="section">
        <SectionTitle>防止漂移</SectionTitle>
        <p className="text-md text-muted">
          產出的檔案檔頭都有 <code>⚠️ GENERATED FILE</code> 標記。
          CI 每次都會執行 <code>npm run check:tokens</code> 比對，
          有人手改產生檔就會擋下部署。
        </p>
        <div style={{ marginTop: 16 }}>
          <CodeBlock
            lang="bash"
            code={`npm run gen:tokens     # 改完 JSON 後重新產生
npm run check:tokens   # 比對是否同步（CI 會跑）`}
          />
        </div>
      </section>
    </>
  );
}
