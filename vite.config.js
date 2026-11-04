import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Jangan inline file kecil sebagai base64 supaya semua slide tetap file terpisah
    assetsInlineLimit: 0,
  },
})
