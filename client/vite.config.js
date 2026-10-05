import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://solidworks-banglore.onrender.com',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://solidworks-banglore.onrender.com',
        changeOrigin: true
      },
      '/assets': {
        target: 'https://solidworks-banglore.onrender.com',
        changeOrigin: true
      }
    }
  }
});
