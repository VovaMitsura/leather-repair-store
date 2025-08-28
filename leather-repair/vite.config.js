import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward dev-time API calls to the local Express server
      '/api': 'http://localhost:3001',
    },
  },
})
