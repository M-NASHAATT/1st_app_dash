import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells your local computer to build a secret tunnel too!
      '/api': {
        target: 'http://187.124.12.183:8090',
        changeOrigin: true,
      }
    }
  }
})