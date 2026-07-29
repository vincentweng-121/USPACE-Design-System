// 手寫工具函式（非產生檔）。
// 用途：把 palette 色票轉成帶透明度的 CSS 值，避免在頁面裡把色票拆成十進位寫死。

/** #RRGGBB → rgba(r,g,b,alpha)。傳入非 6 碼 hex 時原樣回傳。 */
export function withAlpha(hex: string, alpha: number): string {
  const m = hex.match(/^#([0-9A-Fa-f]{6})$/);
  if (!m) return hex;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
}
