import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { tabSpec } from '../../tokens/componentSpecs';
import { Pending, ColorTable, ConfidenceNote, IconPlaceholder, SpecBox, StateRow, Playground, PendingImage, type PlaygroundDimension } from '../../components/spec';
import { colorOf } from '../../utils';

type TabType = 'Tab_icon' | 'Tab_Graphic' | 'Tab' | 'Filter' | 'Input';

const tabTypes: { value: TabType; label: string }[] = [
  { value: 'Tab_icon', label: 'Tab + Icon' },
  { value: 'Tab_Graphic', label: 'Tab + Graphic' },
  { value: 'Tab', label: 'Tab' },
  { value: 'Filter', label: 'Filter' },
  { value: 'Input', label: 'Input' },
];

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="4.5" y1="4.5" x2="11.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11.5" y1="4.5" x2="4.5" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/** TabType（頁面用字）→ 規格檔的 type 鍵 */
const SPEC_KEY: Record<TabType, string> = {
  Tab_icon: 'tabIcon',
  Tab_Graphic: 'tabGraphic',
  Tab: 'tab',
  Filter: 'filter',
  Input: 'input',
};

function tabVariant(type: TabType, isActive: boolean) {
  return tabSpec.variants.find(
    (v) => v.type === SPEC_KEY[type] && v.state === (isActive ? 'active' : 'inactive')
  )!;
}

/** 版面數值取自 styles/tab.dart；顏色一律由 tokens/components/tab.json 決定 */
function getTabStyle(type: TabType, isActive: boolean): React.CSSProperties {
  const v = tabVariant(type, isActive);
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: '"PingFang TC", sans-serif',
    whiteSpace: 'nowrap',
    background: colorOf(v.bg as string),
    color: colorOf(v.content as string),
    border: v.border ? `1px solid ${colorOf(v.border as string)}` : undefined,
  };

  switch (type) {
    case 'Tab_icon':
      return { ...base, height: 38, paddingLeft: 12, paddingRight: 16, borderRadius: 32, gap: 4, fontSize: 14, lineHeight: '20px' };
    case 'Tab_Graphic':
      return { ...base, height: 38, paddingLeft: 8, paddingRight: 16, borderRadius: 32, fontSize: 14, lineHeight: '20px' };
    case 'Tab':
      return { ...base, height: 38, paddingLeft: 16, paddingRight: 16, borderRadius: 32, justifyContent: 'center', fontSize: 14, lineHeight: '20px' };
    case 'Filter':
      return { ...base, height: 32, paddingLeft: 12, paddingRight: 12, borderRadius: 1000, justifyContent: 'center', maxWidth: 156, fontSize: 12, lineHeight: '16px' };
    case 'Input':
      return { ...base, paddingLeft: 12, paddingRight: 8, paddingTop: 8, paddingBottom: 8, borderRadius: 1000, gap: 4, fontSize: 12, lineHeight: '16px' };
  }
}

/** 依 token 渲染的 Tab。無互動，供規格展示用。 */
function TabPreview({ type, label, isActive = false }: { type: TabType; label: string; isActive?: boolean }) {
  const color = colorOf(tabVariant(type, isActive).content as string)!;
  return (
    <div style={getTabStyle(type, isActive)}>
      {type === 'Tab_icon' && <IconPlaceholder color={color} size={20} />}
      {type === 'Tab_Graphic' && <IconPlaceholder color={color} size={31.5} />}
      <span style={{ padding: type === 'Tab_Graphic' ? '0 0 0 8px' : undefined }}>{label}</span>
      {type === 'Input' && <CloseIcon color={color} />}
    </div>
  );
}


// ── Playground 的維度 ──
const playgroundDimensions: PlaygroundDimension[] = [
  { key: 'type', label: 'Type', options: (['Tab_icon', 'Tab_Graphic', 'Tab', 'Filter', 'Input'] as TabType[]).map((t) => ({ value: t, label: t })) },
  { key: 'state', label: 'State', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
];

export default function TabPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Tab"
        lead="頁籤切換元件，支援 Segmented Control、Filter Tab 與 Input Tag 三種型態，適用於內容分類與篩選場景。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="tab-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="tab"
              dimensions={playgroundDimensions}
              render={(v) => <TabPreview type={v.type as TabType} label="Label" isActive={v.state === 'active'} />}
            />
          </section>

          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>
            <div>
              <Pending
                what="Anatomy"
                why="部件拆解圖尚未製作。需先確認各部位的正式名稱與必要性，避免自行命名。"
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <ConfidenceNote confidence={tabSpec.confidence} source={tabSpec.source} />
            <ColorTable
              variants={tabSpec.variants}
              dimensionKeys={['type', 'state']}
              partKeys={['bg', 'border', 'content']}
              partLabels={{ bg: '容器底色', border: '描邊', content: '文字與 icon', text: '輸入文字', hint: '提示文字', type: 'Type', state: 'State', status: 'Status', level: 'Level' }}
            />
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>

            <SpecBox>
              <StateRow first title="Active 選取" note="Tab 系列用 contentPrimary 底，Filter 改用 actionPrimaryBg">
                {tabTypes.filter((t) => t.value !== 'Input').map((t) => (
                  <TabPreview key={t.value} type={t.value} label={t.label} isActive />
                ))}
              </StateRow>
              <StateRow title="Inactive 未選取" note="統一為 actionTertiaryBg 底、actionTertiaryContent 文字">
                {tabTypes.filter((t) => t.value !== 'Input').map((t) => (
                  <TabPreview key={t.value} type={t.value} label={t.label} />
                ))}
              </StateRow>
              <StateRow title="Input" note="不區分選取狀態，固定為描邊樣式">
                <TabPreview type="Input" label="Input" />
              </StateRow>
            </SpecBox>

            <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Default</strong>：正常可點擊狀態，淺色背景搭配深色文字，表達可互動。</li>
                <li><strong>Active</strong>：深色填充背景搭配白色文字，明確標示當前選中項目。Tab / Tab_icon / Tab_Graphic / Filter 皆支援 Default 與 Active 切換。</li>
                <li><strong>Input</strong>：僅有 Default 狀態，使用 outline border，帶 Close icon 供使用者移除標籤。</li>
              </ul>
            </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="tab-measurements" note="標出高度、內距、間距的量測圖。" />
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Type', 'Height', 'Radius', 'Padding', 'Font', 'Leading'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tab_icon', '38px', '32px', 'pl=12 pr=16 gap=4', 'labelM (14px)', '20px'],
                    ['Tab_Graphic', '38px', '32px', 'pl=8 pr=16', 'labelM (14px)', '20px'],
                    ['Tab', '38px', '32px', 'px=16', 'labelM (14px)', '20px'],
                    ['Filter', '32px', '1000px', 'px=12', 'labelS (12px)', '16px'],
                    ['Input', 'auto', '1000px', 'pl=12 pr=8 py=8 gap=4', 'labelS (12px)', '16px'],
                  ].map(([type, h, r, pad, font, lh]) => (
                    <tr key={type}>
                      <td>{type}</td>
                      <td>{h}</td>
                      <td>{r}</td>
                      <td><code>{pad}</code></td>
                      <td>{font}</td>
                      <td>{lh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="tab-toucharea" note="標出觸控熱區範圍，並確認是否達到 44px 最小建議值。" />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（tab-do-caseN / tab-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>三種用途各司其職</strong>：Tab 系列涵蓋三種用途：Tab（頁籤切換）、Filter（篩選條件）、Input（已選輸入標籤）。</li>
                <li><strong>Filter 與 Chip 的分界</strong>：Tab 的 Filter 是<strong>點擊後切換分頁，因此只能單選</strong>；<code>USpaceChip</code> 的可點擊版本是<strong>同一個頁面內的篩選條件，可以複選</strong>。要「選了以後換一頁」用這裡的 Filter，要「在同一頁疊加條件」用 Chip。</li>
                <li><strong>圖示/圖形前綴增強辨識</strong>：Tab_icon / Tab_Graphic 提供圖示/圖形前綴，增強辨識度。</li>
                <li><strong>Active 狀態對比鮮明</strong>：Active 狀態用深色填充、白字，與 Default 的淺底形成強烈對比。</li>
                <li><strong>Filter 使用 pill shape</strong>：Filter 使用 pill shape（radius 1000），文字有 maxWidth 截斷避免破版。</li>
                <li><strong>Input 為唯讀標籤</strong>：Input 為唯讀標籤，僅有 Default 狀態，帶 Close icon 可移除。</li>
              </ul>
            </div>
          </section>

          {/* ── Accessibility ── */}
          <section className="section">
            <SectionTitle>Accessibility</SectionTitle>
            <Pending
              what="Accessibility"
              why="無障礙說明尚未撰寫。需先確認觸控目標尺寸、讀屏軟體的朗讀內容與對比度是否達標，避免寫出未經驗證的保證。"
            />
          </section>

        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Type', 'State', 'Background', 'Text Color'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tab / Tab_icon / Tab_Graphic', 'Default', 'actionTertiaryBg', 'actionTertiaryContent'],
                    ['Tab / Tab_icon / Tab_Graphic', 'Active', 'contentPrimary', 'textInverse'],
                    ['Filter', 'Default', 'actionTertiaryBg', 'actionTertiaryContent'],
                    ['Filter', 'Active', 'actionPrimaryBg', 'textInverse'],
                    ['Input', 'Default', 'actionOutlineBg', 'actionOutlineContent'],
                  ].map(([type, state, bg, text], i) => (
                    <tr key={i}>
                      <td>{type}</td>
                      <td>{state}</td>
                      <td><code>{bg}</code></td>
                      <td><code>{text}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Notes</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Tab_icon</strong>: Leading icon 20x20，icon color 與 text color 同源</li>
                <li><strong>Tab_Graphic</strong>: Leading graphic 31.5x31.5（如 product image）</li>
                <li><strong>Filter</strong>: 文字 maxWidth 132px，超過 ellipsis</li>
                <li><strong>Input</strong>: 帶 16px Close icon，僅 Default 狀態，outline border（<code>borderDivider</code>）</li>
                <li><strong>Active state</strong>: 由呼叫端管理，Input type 無 active 狀態</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
