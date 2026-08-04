import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Changelog / Status 頁直接讀 repo 根目錄的 tracking/*.md，
  // 不再手抄成陣列，所以要允許讀取 website/ 之外的檔案。
  server: { fs: { allow: ['..'] } },
  plugins: [react()],
  base: '/USPACE-Design-System/',
})
