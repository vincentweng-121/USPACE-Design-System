import PageHero from '../../components/PageHero';
import Markdown from '../../components/Markdown';
// 直接讀 tracking/SKILL_STATUS.md，理由同 Changelog 頁。
import source from '../../../../tracking/SKILL_STATUS.md?raw';

export default function StatusPage() {
  return (
    <div>
      <PageHero
        title="Status"
        lead="各項目前的版本與狀態。排程與進度請見 Roadmap。"
        meta={
          <span>
            來源 <code>tracking/SKILL_STATUS.md</code>
          </span>
        }
      />
      <section className="section">
        <Markdown source={source} />
      </section>
    </div>
  );
}
