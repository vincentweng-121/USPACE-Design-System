import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { toggleSpec } from '../../tokens/componentSpecs';
import SpecTable from '../../components/SpecTable';
import { SpecBox, StateRow, Swatch, Badge, AnatomyFigure, AnatomyMarker, Playground, PendingImage, Pending, type PlaygroundDimension } from '../../components/spec';
import { colorOf } from '../../utils';

const { track, thumb } = toggleSpec.layout! as Record<
  string,
  { width: number; height: number }
>;

/** 依 token 渲染的 Toggle。無互動，供規格展示用。 */
function TogglePreview({ value, disabled = false }: { value: boolean; disabled?: boolean }) {
  const v = toggleSpec.variants.find(
    (x) => x.value === (value ? 'on' : 'off') && x.enabled === (disabled ? 'disabled' : 'enabled')
  )!;

  return (
    <div
      style={{
        width: track.width,
        height: track.height,
        borderRadius: 27,
        padding: 2,
        background: colorOf(v.track as string),
        display: 'flex',
        alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        opacity: Number(v.opacity),
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: thumb.width,
          height: thumb.height,
          borderRadius: 27,
          background: colorOf(v.thumb as string),
        }}
      />
    </div>
  );
}

// ── Playground 的維度 ──
// Value 不在這裡：ON 的軌道是螢光綠，OFF 才是中性灰。
// Configurations 只講配置，開關兩個值的顏色差異在 Color 區塊說明。
const playgroundDimensions: PlaygroundDimension[] = [
  { key: 'enabled', label: 'State', options: [{ value: 'enabled', label: 'Enabled' }, { value: 'disabled', label: 'Disabled' }] },
];

export default function TogglePage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Toggle"
        lead="Toggle Switch 開關元件，支援 Enable 與 Disable 狀態切換，適用於設定頁面中的即時偏好控制。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="toggle-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="toggle"
              dimensions={playgroundDimensions}
              render={(v) => <TogglePreview value={false} disabled={v.enabled === 'disabled'} />}
            />
          </section>

          <section className="section">
            <SectionTitle>Anatomy</SectionTitle>

            <AnatomyFigure>
              <AnatomyMarker n={1} />
              <div style={{ position: 'absolute', top: -13, right: -13, zIndex: 1 }}>
                <Badge n={2} />
              </div>
              <TogglePreview value />
            </AnatomyFigure>

            <SpecTable
              headers={['', '部件', '尺寸', '說明']}
              rows={[
                ['1', 'Track 軌道', `${track.width}×${track.height}`, '底色代表開關狀態，圓角 27px'],
                ['2', 'Thumb 滑塊', `${thumb.width}×${thumb.height}`, '藥丸形而非圓形，是與系統 Switch 的主要差異'],
              ]}
              minWidth={520}
            />
          </section>

          <section className="section">
            <SectionTitle>Color</SectionTitle>
            <SpecTable
              headers={['Value', 'State', 'Track', 'Thumb', 'Opacity']}
              rows={toggleSpec.variants.map((v) => [
                String(v.value).toUpperCase(),
                v.enabled === 'enabled' ? 'Enabled' : 'Disabled',
                <Swatch key="t" token={v.track as string} />,
                <Swatch key="h" token={v.thumb as string} />,
                Number(v.opacity).toFixed(2),
              ])}
              minWidth={620}
            />
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>

            <SpecBox>
              <StateRow
                first
                title="Enabled"
                note="可點擊切換。ON 用 accent 色傳達啟用，OFF 用中性灰不帶情緒暗示"
              >
                <TogglePreview value={false} />
                <TogglePreview value />
              </StateRow>
              <StateRow
                title="Disabled"
                note="不可點擊。ON 以 opacity 0.25 表示「已啟用但不可操作」；OFF 改換 track 色而非降透明度，避免與 OFF + Enabled 混淆"
              >
                <TogglePreview value={false} disabled />
                <TogglePreview value disabled />
              </StateRow>
            </SpecBox>

            <div style={{ marginTop: 32 }}>
              <SpecTable
                headers={['組合', '外觀處理', '互動']}
                rows={[
                  ['ON + Enabled', 'track = actionPrimaryContentAccent', '可點擊切換為 OFF'],
                  ['ON + Disabled', '同上色彩，整體 Opacity(0.25)', '不可點擊'],
                  ['OFF + Enabled', 'track = actionPrimaryContent', '可點擊切換為 ON'],
                  ['OFF + Disabled', 'track 改為 actionDisabledBg，不降透明度', '不可點擊'],
                ]}
                minWidth={620}
              />
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="toggle-measurements" note="標出高度、內距、間距的量測圖。" />
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 400 }}>
                <thead>
                  <tr>
                    {['Part', 'Width', 'Height', 'Radius', 'Padding'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Track', '64px', '24px', '27px', '2px'],
                    ['Thumb', '34px', '20px', '27px', '—'],
                  ].map(([part, w, h, r, p]) => (
                    <tr key={part}>
                      <td>{part}</td>
                      <td>{w}</td>
                      <td>{h}</td>
                      <td>{r}</td>
                      <td>{p}</td>
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
            <PendingImage expects="toggle-toucharea" note="標出觸控熱區範圍，並確認是否達到 44px 最小建議值。" />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（toggle-do-caseN / toggle-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Thumb 為 34x20 pill shape（非圓形），區別於系統 Switch</strong></li>
                <li><strong>自訂實作（非 Flutter Switch），確保跨平台視覺一致</strong></li>
                <li><strong>ON 用 accent 色（螢光綠）清楚傳達啟用狀態</strong></li>
                <li><strong>OFF 用中性灰，不帶情緒暗示</strong></li>
                <li><strong>ON+Disable 用 opacity 降低表示「已啟用但不可操作」</strong></li>
                <li><strong>OFF+Disable 改用 disabledBg（非 opacity），避免與 OFF+Enable 混淆</strong></li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {tab === 'develop' && (
        <div>

          <section className="section">
            <SectionTitle>Baseline tokens</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['State', 'Track Color', 'Thumb', 'Opacity'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                {/* 由 tokens/components/toggle.json 產生，與 Flutter widget test 同源 */}
                <tbody>
                  {toggleSpec.variants.map((v, i) => (
                    <tr key={i}>
                      <td>
                        {String(v.value).toUpperCase()} + {v.enabled === 'enabled' ? 'Enable' : 'Disable'}
                      </td>
                      <td><code>{v.track}</code></td>
                      <td><code>{v.thumb}</code></td>
                      <td>
                        {Number(v.opacity).toFixed(2)}
                        {v.note && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{v.note}</div>}
                      </td>
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
                <li><strong>Thumb shape</strong>: 34x20 pill（rounded=27），非圓形</li>
                <li><strong>ON + Disable</strong>: 使用 Opacity widget 包裹，opacity=0.25</li>
                <li><strong>OFF + Disable</strong>: track 改為 actionDisabledBg（不使用 opacity）</li>
                <li><strong>不使用 Flutter Switch</strong>: 自訂 Container + GestureDetector，以精確控制尺寸與圓角</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
