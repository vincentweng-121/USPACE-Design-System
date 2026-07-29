import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';
import SpecTable from '../components/SpecTable';
import DoDont from '../components/DoDont';

export default function FlutterSetupPage() {
  return (
    <>
      <PageHero
        title="Flutter Setup"
        lead="把設計系統接上 App 的主題，之後所有元件都會自動取得正確的色票與字體。"
      />

      <section className="section">
        <SectionTitle>一行 import</SectionTitle>
        <p className="text-md text-muted">
          barrel file 匯出所有 token 與元件，不需要逐一 import。
        </p>
        <div style={{ marginTop: 16 }}>
          <CodeBlock code={`import 'package:your_app/styles/uspace_design_system.dart';`} />
        </div>
      </section>

      <section className="section">
        <SectionTitle>接上主題</SectionTitle>
        <p className="text-md text-muted">
          最簡單的做法是直接使用 <code>USpaceTheme</code>：
        </p>
        <div style={{ marginTop: 16 }}>
          <CodeBlock
            title="main.dart"
            code={`MaterialApp(
  theme: USpaceTheme.light,
  darkTheme: USpaceTheme.dark,
  themeMode: ThemeMode.system,
  home: const HomePage(),
)`}
          />
        </div>

        <p className="text-md text-muted" style={{ marginTop: 24 }}>
          App 已經有自己的 <code>ThemeData</code> 時，改用{' '}
          <code>extensionsFor</code> 只併入需要的部分：
        </p>
        <div style={{ marginTop: 16 }}>
          <CodeBlock
            code={`ThemeData(
  // ...既有設定
  extensions: USpaceTheme.extensionsFor(Brightness.light),
)`}
          />
        </div>
      </section>

      <section className="section">
        <SectionTitle>取用 token</SectionTitle>
        <p className="text-md text-muted">
          主題接上後，透過 <code>BuildContext</code> 取得色票與字體：
        </p>
        <div style={{ marginTop: 16 }}>
          <CodeBlock
            code={`Container(
  color: context.uColors.pagePrimary,
  padding: const EdgeInsets.all(USpaceSpacing.spacer16),
  child: Text(
    '標題',
    style: context.typography.headingL.copyWith(
      color: context.uColors.textPrimary,
    ),
  ),
)`}
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <SpecTable
            headers={['取用方式', '內容']}
            rows={[
              [<code key="1">context.uColors</code>, '語意色 token（隨主題切換）'],
              [<code key="2">context.typography</code>, '字體樣式'],
              [<code key="3">USpaceSpacing</code>, '間距，static 常量'],
              [<code key="4">USpaceRadius</code>, '圓角，static 常量'],
              [<code key="5">USpaceElevation</code>, '陰影尺寸，static 常量'],
              [<code key="6">USpaceGlass</code>, 'Glass 效果，static 常量'],
              [<code key="7">USpacePalette</code>, '基底色票，一般不直接使用'],
            ]}
            minWidth={420}
          />
        </div>
      </section>

      <section className="section">
        <SectionTitle>Usage</SectionTitle>
        <DoDont
          dos={[
            '用 context.uColors 取語意色，讓元件自動支援亮色與暗色',
            '間距與圓角使用 USpaceSpacing / USpaceRadius 的具名常量',
            '字重使用 AppTypographyExtension 的 regular / medium / semibold / bold',
            '需要覆寫個別樣式時，用 copyWith 而非重新宣告 TextStyle',
          ]}
          donts={[
            '不要直接寫 Color(0xFF……)，所有色值都應該來自 palette',
            '不要直接引用 USpacePalette，語意色才會隨主題變化',
            '不要手改標有 GENERATED 的檔案，改 tokens/*.json 後重新產生',
            '不要把落在間距階梯上的數字寫死（8、12、16…），CI 會擋下',
          ]}
        />
      </section>
    </>
  );
}
