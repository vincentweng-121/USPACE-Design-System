import PageHero from '../../components/PageHero';
import Markdown from '../../components/Markdown';
// 直接讀 tracking/CHANGELOG.md，不再把內容抄成陣列——
// 手抄的版本曾經停在 v0.2.10，而實際已經到 v0.7.x。
import source from '../../../../tracking/CHANGELOG.md?raw';

export default function ChangelogPage() {
  return (
    <div>
      <PageHero
        title="Changelog"
        lead="每個版本的變更內容。前端工程師以此為準。"
        meta={
          <span>
            來源 <code>tracking/CHANGELOG.md</code>
          </span>
        }
      />
      <section className="section">
        <Markdown source={source} />
      </section>
    </div>
  );
}
