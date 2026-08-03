import SectionTitle from '../../components/SectionTitle';
import PageTabs, { usePageTab } from '../../components/PageTabs';
import PageHero from '../../components/PageHero';
import { text_fieldSpec } from '../../tokens/componentSpecs';
import { Pending, ColorTable, ConfidenceNote, SpecBox, SpecimenRow } from '../../components/spec';
import { colorOf } from '../../utils';

// ── Playground ─────────────────────────────────────────────
/** 依 token 渲染的輸入框。無互動，供規格展示用。 */
function StatusPreview({ status }: { status: string }) {
  const v = text_fieldSpec.variants.find((x) => x.status === status)!;
  const isPlaceholder = ['default', 'active'].includes(status);

  return (
    <div style={{ width: 260, flexShrink: 0 }}>
      <div
        className="text-sm"
        style={{ color: 'var(--text-tertiary)', marginBottom: 6, paddingLeft: 8 }}
      >
        {status}
      </div>
      <div
        style={{
          height: 48,
          borderRadius: 1000,
          background: colorOf(v.bg as string),
          border: v.border
            ? `2px solid ${colorOf(v.border as string)}`
            : '1px solid var(--border-divider)',
          display: 'flex',
          alignItems: 48 > 60 ? 'flex-start' : 'center',
          padding: 48 > 60 ? '16px 20px' : '0 20px',
          fontSize: 14,
          lineHeight: '20px',
          fontFamily: '"PingFang TC", sans-serif',
          color: colorOf(v.text as string),
        }}
      >
        {isPlaceholder ? 'Placeholder' : 'Input text'}
      </div>
      <div
        className="text-sm"
        style={{ color: colorOf(v.hint as string), marginTop: 6, paddingLeft: 8 }}
      >
        Hint text
      </div>
    </div>
  );
}


// ── Page ───────────────────────────────────────────────────
export default function TextFieldPage() {
  const [tab, setTab] = usePageTab();

  return (
    <div>
      <PageHero
        title="Text Field"
        lead="單行文字輸入元件，支援 9 種狀態（Empty / Focused / Filled / Error 等），包含標籤、提示文字與錯誤訊息。"
      />
      <PageTabs active={tab} onChange={setTab} />

      {tab === 'design' && (
        <div>

          <section className="section">
            <SectionTitle>Configurations</SectionTitle>
            <SpecBox>
              <SpecimenRow n={1} title="Status" note="每個 status 的實際樣貌，含邊框、文字與提示文字的差異">
                {(text_fieldSpec.dimensions.status as string[]).map((st) => (
                  <StatusPreview key={st} status={st} />
                ))}
              </SpecimenRow>
            </SpecBox>
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
            <ConfidenceNote confidence={text_fieldSpec.confidence} source={text_fieldSpec.source} />
            <ColorTable
              variants={text_fieldSpec.variants}
              dimensionKeys={['status']}
              partKeys={['bg', 'border', 'text', 'hint']}
              partLabels={{ bg: '容器底色', border: '描邊', content: '文字與 icon', text: '輸入文字', hint: '提示文字', type: 'Type', state: 'State', status: 'Status', level: 'Level' }}
            />
          </section>

          <section className="section">
            <SectionTitle>States</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Default</strong>：Editable + Normal + Idle。輸入框顯示 placeholder，1px 邊框。</li>
                <li><strong>Active</strong>：使用者點擊輸入框獲得焦點，邊框變為 2px 綠色。</li>
                <li><strong>Typing</strong>：聚焦狀態下開始輸入文字，維持 2px 綠色邊框。</li>
                <li><strong>Complete</strong>：輸入完成後失焦（blur），文字保留，邊框回復 1px。</li>
                <li><strong>Incomplete</strong>：有 trailing button 時，文字已輸入但尚未送出。</li>
                <li><strong>Error</strong>：Validation 為 error 且未聚焦，顯示紅色邊框 + 紅色 hint。</li>
                <li><strong>Error-Active</strong>：Error 狀態下聚焦，邊框變為 2px 紅色。</li>
                <li><strong>Disabled</strong>：功能暫不可用，opacity 降低，cursor 變為 not-allowed。</li>
                <li><strong>Non-editable</strong>：資料唯讀，顯示固定文字，不可編輯。</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Measurements</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>Container</strong>: height 48px, borderRadius 1000 (StadiumBorder)</li>
                <li><strong>Padding</strong>: left 20px, right 16px (without button) / 4px (with button)</li>
                <li><strong>Label</strong>: PingFang TC 12px/16px Regular, <code>inputText</code></li>
                <li><strong>Input</strong>: PingFang TC 14px/20px Regular, <code>inputText</code></li>
                <li><strong>Hint</strong>: SF Pro 14px/16px Regular, <code>textSecondary</code></li>
                <li><strong>Cursor</strong>: 2px wide, 24px tall, <code>contentAccent</code></li>
                <li><strong>Border (active)</strong>: 2px, <code>inputBorderActive</code></li>
                <li><strong>Border (error-active)</strong>: 2px, <code>inputBorderError</code></li>
                <li><strong>Icons</strong>: 20px (error icon, clear/delete icon)</li>
                <li><strong>Button</strong>: USpaceButton Small/Primary, trailing</li>
              </ul>
            </div>
          </section>

          <section className="section">
            <SectionTitle>Usage</SectionTitle>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: 20 }}>
                <li><strong>三維度組合產生 9 種狀態</strong>：Availability（editable / disabled / non-editable） x Validation（normal / error） x Interaction（idle / focused / typing / blur），完整覆蓋所有使用情境。</li>
                <li><strong>Active 聚焦回饋</strong>：Active 時顯示 2px 綠色邊框，提供明確的聚焦回饋。</li>
                <li><strong>Error 雙重提示</strong>：Error 時顯示 2px 紅色邊框 + 紅色 hint 文字，雙重提示錯誤。</li>
                <li><strong>Clear icon 快速清除</strong>：Clear icon 在有文字時出現，方便快速清除。</li>
                <li><strong>複合操作支援</strong>：可嵌入 trailing USpaceButton（Small / Primary），支援「輸入 + 動作」的複合操作。</li>
                <li><strong>Disabled vs Non-editable</strong>：視覺相似但語意不同 — Disabled 表示功能暫不可用，Non-editable 表示資料唯讀。</li>
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
                    {['Property', 'Token'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Background', 'inputBgDefault'],
                    ['Border (active)', 'inputBorderActive (neonLime600)'],
                    ['Border (error)', 'inputBorderError (red500)'],
                    ['Input text', 'inputText'],
                    ['Placeholder', 'inputTextPlaceholder'],
                    ['Disabled text', 'inputTextDisabled'],
                    ['Error text', 'inputTextError'],
                    ['Label text', 'inputText (bodyS)'],
                    ['Hint text', 'textSecondary (sfBodyS)'],
                    ['Error hint', 'inputTextError (sfBodyS)'],
                    ['Cursor', 'contentAccent (neonLime600)'],
                    ['Error icon', 'contentError (red400)'],
                    ['Clear icon', 'contentSecondary'],
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
            <SectionTitle>Dimension → Status Mapping</SectionTitle>
            <div className="spec-table">
  <div>
              <table style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    {['Availability', 'Validation', 'Button', 'Interaction', 'Figma Status'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Editable', 'Normal', 'Off', 'Idle', 'Default'],
                    ['Editable', 'Normal', 'Off', 'Focused', 'Active'],
                    ['Editable', 'Normal', 'Off', 'Typing', 'Typing'],
                    ['Editable', 'Normal', 'Off', 'Blur w/ text', 'Complete'],
                    ['Editable', 'Normal', 'On', 'Has text', 'Incomplete'],
                    ['Editable', 'Error', 'Off', 'Idle', 'Error'],
                    ['Editable', 'Error', 'Off', 'Focused', 'Error-Active'],
                    ['Disabled', '—', '—', '—', 'Disabled'],
                    ['Non-editable', '—', '—', '—', 'Non-editable'],
                  ].map(([avail, valid, btn, interaction, figma], i) => (
                    <tr key={i}>
                      <td>{avail}</td>
                      <td style={{ color: valid === 'Error' ? 'var(--input-text-error)' : 'var(--text-secondary)' }}>{valid}</td>
                      <td>{btn}</td>
                      <td>{interaction}</td>
                      <td><code>{figma}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
