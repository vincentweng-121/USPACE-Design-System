import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';
import SpecTable from '../components/SpecTable';

export default function DevelopingPage() {
  return (
    <>
      <PageHero
        title="Developing"
        lead="設計系統以 Flutter 原始碼交付。這一區說明檔案怎麼取得、主題怎麼接上，以及哪些檔案不可以手改。"
      />

      <section className="section">
        <SectionTitle>交付方式</SectionTitle>
        <p className="text-md text-muted">
          所有程式碼放在 repo 的 <code>styles/</code> 目錄，直接取用即可。
          目前不透過 pub.dev 發佈；repo 根目錄的 <code>pubspec.yaml</code> 只是為了讓
          CI 能執行靜態分析與測試。
        </p>
        <div style={{ marginTop: 16 }}>
          <SpecTable
            headers={['檔案', '內容', '可否手改']}
            rows={[
              [<code key="1">uspace_palette.dart</code>, '基底色票', '否'],
              [<code key="2">uspace_colors_extension.dart</code>, '語意色（亮/暗）', '否'],
              [<code key="3">typography_extension.dart</code>, '字體樣式', '否'],
              [<code key="4">spacing_extension.dart</code>, '間距', '否'],
              [<code key="5">radius_extension.dart</code>, '圓角', '否'],
              [<code key="6">elevation_extension.dart</code>, '陰影尺寸', '否'],
              [<code key="7">glass_extension.dart</code>, 'Glass 效果', '否'],
              [<code key="8">uspace_theme.dart</code>, 'ThemeData 組裝', '可'],
              [<code key="9">uspace_design_system.dart</code>, 'barrel file', '可'],
              ['其餘元件檔', 'Button / Chip / Header…', '可'],
            ]}
          />
        </div>
        <p className="text-sm" style={{ marginTop: 12, color: 'var(--text-tertiary)' }}>
          標示「否」的檔案由 <code>tokens/*.json</code> 產生，檔頭有 GENERATED 標記。
          手改會在下次產生時被覆蓋，CI 也會擋下。
        </p>
      </section>

      <section className="section">
        <SectionTitle>安裝</SectionTitle>
        <CodeBlock
          lang="bash"
          title="取得原始碼"
          code={`git clone https://github.com/vincentweng-121/USPACE-Design-System.git
cp -R USPACE-Design-System/styles your_app/lib/styles`}
        />
        <p className="text-sm" style={{ marginTop: 12, color: 'var(--text-tertiary)' }}>
          字體檔（PingFang TC / SF Pro）為系統字體，iOS 與 macOS 內建；
          Android 與 Web 需另行提供對應字體，否則會回退到系統預設。
        </p>
      </section>

      <section className="section">
        <SectionTitle>檢查指令</SectionTitle>
        <SpecTable
          headers={['指令', '用途']}
          rows={[
            [<code key="a">./verify_skill.sh</code>, '提交前跑完下列四項'],
            [<code key="b">npm run check:tokens</code>, '確認產生檔與 tokens/*.json 同步'],
            [<code key="c">dart analyze --fatal-infos</code>, '靜態分析'],
            [<code key="d">flutter test</code>, 'token 規則、元件 token、Header 行為'],
          ]}
          minWidth={420}
        />
      </section>
    </>
  );
}
