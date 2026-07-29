/** 純函式工具。與元件分開，避免影響 React Fast Refresh。 */

/** 由標題文字產生錨點 id */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w一-鿿\s-]/g, '')
    .replace(/\s+/g, '-');
}

/** 字串陣列 → Segmented 的 options */
export const asOptions = <T extends string>(values: readonly T[]) =>
  values.map((v) => ({ value: v, label: v }));
