import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api': 'rota-verde365.onrender.com'
    },
    allowedHosts:["rota-verde365.onrender.com"],
    host: true,
    port: process.env.PORT || 5173
  }
})