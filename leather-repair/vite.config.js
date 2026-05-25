import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
  },
  server: {
    // host: true binds to 0.0.0.0 so other devices on your LAN (phone, tablet)
    // can hit the dev server. Vite prints a Network URL on startup.
    host: true,
    proxy: {
      // Forward dev-time API calls to the local Express server.
      // The proxy runs on the dev machine, so localhost is correct here even
      // when the browser is on another device.
      '/api': 'http://localhost:3001',
    },
  },
});
