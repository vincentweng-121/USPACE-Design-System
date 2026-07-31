/** 純函式工具。與元件分開，避免影響 React Fast Refresh。 */
import { semantic } from './tokens/colors';

/** 語意 token 名稱 → 亮色主題的實際色值 */
export const colorOf = (token: string | null | undefined) =>
  token ? (semantic as Record<string, string>)[token] : undefined;

/** 首字母大寫，供展示標籤使用 */
export const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/** 由標題文字產生錨點 id */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w一-鿿\s-]/g, '')
    .replace(/\s+/g, '-');
}

