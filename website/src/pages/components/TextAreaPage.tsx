import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { touch } from '../../tokens/scalars';
import { text_areaSpec } from '../../tokens/componentSpecs';
import { Pending, ColorTable, ConfidenceNote, Playground, PendingImage, type PlaygroundDimension } from '../../components/spec';
import { colorOf } from '../../utils';

// ── Playground ─────────────────────────────────────────────
/** 依 token 渲染的輸入框。無互動，供規格展示用。 */
function StatusPreview({
  status,
  showLabel = true,
  showHint = true,
  showButton = false,
}: {
  status: string;
  /** 上方欄位標題 */
  showLabel?: boolean;
  /** 下方提示文字 */
  showHint?: boolean;
  /** 尾端的行動按鈕 */
  showButton?: boolean;
}) {
  const v = text_areaSpec.variants.find((x) => x.status === status)!;
  const isPlaceholder = ['default', 'active'].includes(status);

  return (
    <div style={{ width: 260, flexShrink: 0 }}>
      {showLabel && (
        <div
          className="text-sm"
          style={{ color: 'var(--text-tertiary)', marginBottom: 6, paddingLeft: 8 }}
        >
          {status}
        </div>
      )}
      <div
        style={{
          height: 144,
          borderRadius: 20,
          background: colorOf(v.bg as string),
          border: v.border
            ? `2px solid ${colorOf(v.border as string)}`
            : '1px solid var(--border-divider)',
          display: 'flex',
          alignItems: 144 > 60 ? 'flex-start' : 'center',
          padding: 144 > 60 ? '16px 20px' : '0 20px',
          fontSize: 14,
          lineHeight: '20px',
          fontFamily: '"PingFang TC", sans-serif',
          color: colorOf(v.text as string),
        }}
      >
        <span style={{ flex: 1, minWidth: 0 }}>
          {isPlaceholder ? 'Placeholder' : 'Input text'}
        </span>
        {showButton && (
          <span
            style={{
              flexShrink: 0,
              marginLeft: 12,
              padding: '4px 14px',
              borderRadius: 1000,
              background: 'var(--text-primary)',
              color: 'var(--page-primary)',
              fontSize: 13,
            }}
          >
            送出
          </span>
        )}
      </div>
      {showHint && (
        <div
          className="text-sm"
          style={{ color: colorOf(v.hint as string), marginTop: 6, paddingLeft: 8 }}
        >
          Hint text
        </div>
      )}
    </div>
  );
}


// ── Page ───────────────────────────────────────────────────
// ── Playground 的維度 ──
// status 不在這裡：它是「狀態」不是「配置」，而且 active / typing / error
// 會渲染出綠色或紅色邊框。九種狀態在 States 與 Color 區塊已完整說明。
// 這裡只放真正可配置的結構，預覽固定用 default（1px 中性灰邊框）。
const playgroundDimensions: PlaygroundDimension[] = [
  {
    key: 'label',
    label: 'Label',
    options: [
      { value: 'show', label: '有' },
      { value: 'hide', label: '無' },
    ],
  },
  {
    key: 'hint',
    label: 'Hint text',
    options: [
      { value: 'show', label: '有' },
      { value: 'hide', label: '無' },
    ],
  },
  {
    key: 'button',
    label: 'Trailing button',
    options: [
      { value: 'hide', label: '無' },
      { value: 'show', label: '有' },
    ],
  },
];

export default function TextAreaPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Text Area"
        lead="多行文字輸入元件，支援自動高度調整與字數限制，適用於留言、備註等需要較長文字輸入的場景。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          {/* ── Variants ── */}
          <section className="section">
            <SectionTitle>Variants</SectionTitle>
            <PendingImage expects="text-area-variant" note="一張圖並排所有變體，圖上標號 1、2、3…，下方用 NumberedCaptions 逐項說明。" />
          </section>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <Playground
              name="text-area"
              dimensions={playgroundDimensions}
              render={(v) => (
                <StatusPreview
                  status="default"
                  showLabel={v.label === 'show'}
                  showHint={v.hint === 'show'}
                  showButton={v.button === 'show'}
                />
              )}
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
            <ConfidenceNote confidence={text_areaSpec.confidence} source={text_areaSpec.source} />
            <ColorTable
              variants={text_areaSpec.variants}
              dimensionKeys={['status']}
              partKeys={['bg', 'border', 'text', 'hint']}
              partLabels={{ bg: '容器底色', border: '描邊', content: '文字與 icon', text: '輸入文字', hint: '提示文字', type: 'Type', state: 'State', status: 'Status', level: 'Level' }}
            />
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Default</strong>：正常可點擊狀態，顯示 placeholder 文字與 1px 邊框。</li>
                <li><strong>Active</strong>：獲得焦點後邊框變為 2px <code>inputBorderActive</code>（綠色），顯示游標。</li>
                <li><strong>Typing</strong>：輸入中狀態，邊框保持 2px 綠色，出現 delete icon。</li>
                <li><strong>Complete</strong>：失去焦點且有文字，字體從 14px 放大為 16px，邊框恢復 1px。</li>
                <li><strong>Error</strong>：驗證錯誤，邊框為 2px 綠色（非紅色），hint 文字變紅色並帶 icon。</li>
                <li><strong>Disabled</strong>：整體 opacity 0.5，cursor not-allowed，不可互動。</li>
                <li><strong>Non-editable</strong>：顯示唯讀內容，cursor not-allowed，但無 opacity 降低。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <PendingImage expects="text-area-measurements" note="標出高度、內距、間距的量測圖。" />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Container</strong>: height 144px, borderRadius 20px</li>
                <li><strong>Padding</strong>: horizontal 20px, vertical 16px</li>
                <li><strong>Label</strong>: PingFang TC 12px/16px (labelS), paddingLeft 8px, <code>inputText</code></li>
                <li><strong>Input (default)</strong>: PingFang TC 14px/20px (labelM), <code>inputText</code></li>
                <li><strong>Input (complete/disabled)</strong>: PingFang TC 16px/24px (labelL)</li>
                <li><strong>Hint</strong>: PingFang TC 12px/16px (labelS), <code>textSecondary</code></li>
                <li><strong>Cursor</strong>: 2px wide, 24px tall, <code>contentAccent</code></li>
                <li><strong>Border (active/typing/error)</strong>: 2px, <code>inputBorderActive</code></li>
                <li><strong>Delete icon</strong>: 20px, shown in Error/Typing/Complete states</li>
                <li><strong>Error hint icon</strong>: 12px prefix icon on error/incomplete hints</li>
              </ul>
            </div>
          </section>

          {/* ── Touch areas ── */}
          <section className="section">
            <SectionTitle>Touch areas</SectionTitle>
            <PendingImage expects="text-area-toucharea" note={`標出觸控熱區範圍，並確認是否達到 ${touch.minTarget}px 最小建議值。`} />
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <Pending
              what="Do / Don't 圖例"
              why="Button 頁是三組對照圖（text-area-do-caseN / text-area-dont-caseN）。這裡的 Figma artboard 尚未產出。"
            />
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>多行文字輸入元件</strong>：用於需要較長文字的場景（備註、描述、回饋等）。</li>
                <li><strong>與 TextField 共用設計語言但有關鍵差異</strong>：高度 144px、圓角 20px（非 Stadium）。</li>
                <li><strong>Error 邊框為綠色（inputBorderActive），非紅色</strong>：錯誤由下方紅色 hint 文字指示，邊框僅表示 active focus。</li>
                <li><strong>Complete 狀態字體放大（14px → 16px）</strong>：提升已填寫內容的可讀性。</li>
                <li><strong>showLabel / showHint 為 boolean 屬性</strong>：提供彈性佈局。</li>
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
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Property', 'Token'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Background', 'inputBgDefault'],
                    ['Border (active/typing/error)', 'inputBorderActive (neonLime600)'],
                    ['Input text', 'inputText (labelM 14px/20px)'],
                    ['Complete/Disabled text', 'inputText (labelL 16px/24px)'],
                    ['Placeholder', 'inputTextPlaceholder (labelM)'],
                    ['Disabled text', 'inputTextDisabled'],
                    ['Label text', 'inputText (labelS 12px/16px)'],
                    ['Hint text', 'textSecondary (labelS)'],
                    ['Error/Incomplete hint', 'inputTextError (labelS)'],
                    ['Disabled hint', 'textDisabled'],
                    ['Cursor', 'contentAccent (neonLime600)'],
                    ['Delete icon', 'contentSecondary (20px)'],
                    ['Error hint icon', 'inputTextError (12px)'],
                  ].map(([prop, token]) => (
                    <tr key={prop}>
                      <td>{prop}</td>
                      <td><code>{token}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>TextField vs TextArea</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    {['Property', 'TextField', 'TextArea'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Height', '48px', '144px'],
                    ['Lines', 'Single', 'Multi'],
                    ['Border radius', '1000 (Stadium)', '20px'],
                    ['Error border', 'inputBorderError (red)', 'inputBorderActive (green)'],
                    ['States', '9 (incl. Error-Active)', '8 (no Error-Active)'],
                    ['Trailing', 'USpaceButton / icons', 'Delete icon only'],
                    ['Complete text', 'labelM (14px)', 'labelL (16px)'],
                  ].map(([prop, tf, ta]) => (
                    <tr key={prop}>
                      <td>{prop}</td>
                      <td>{tf}</td>
                      <td>{ta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Dimension → Status Mapping</SectionTitle>
            <div className="spec-table" >
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Availability', 'Validation', 'Interaction', 'Figma Status'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Editable', 'Normal', 'Idle', 'Default'],
                    ['Editable', 'Normal', 'Focused', 'Active'],
                    ['Editable', 'Normal', 'Typing', 'Typing'],
                    ['Editable', 'Normal', 'Blur w/ text', 'Complete'],
                    ['Editable', 'Error', 'Any', 'Error'],
                    ['Disabled', '—', '—', 'Disabled'],
                    ['Non-editable', '—', '—', 'Non-editable'],
                  ].map(([avail, valid, interaction, figma], i) => (
                    <tr key={i}>
                      <td>{avail}</td>
                      <td style={{ color: valid === 'Error' ? 'var(--input-text-error)' : 'var(--text-secondary)' }}>{valid}</td>
                      <td>{interaction}</td>
                      <td><code>{figma}</code></td>
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
                <li>Figma 原始命名為 "TextAera"（typo），Dart 檔案統一使用正確拼寫 TextArea。</li>
                <li>Error 狀態邊框為 <code>inputBorderActive</code>（綠色），非紅色。錯誤由下方紅色 hint 文字指示。</li>
                <li>Incomplete 狀態無邊框，但 hint 文字使用 <code>inputTextError</code>（紅色）。</li>
                <li>showLabel / showHint 為 boolean 屬性，控制 label 與 hint 的顯示。</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
