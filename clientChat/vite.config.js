import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /api to the backend server
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // Change the origin header to match the target server
        secure: false,      // Disable SSL verification (useful for self-signed certificates)
      },
    },
  },
})
