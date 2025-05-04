import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  base: "/dayz/", // Remplacez "dayz" par le nom de votre dépôt GitHub
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Dayz',
        short_name: 'Dayz',
        description: 'Planificateur quotidien',
        theme_color: '#5d4f92',
        start_url: './index.html',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icon-pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  
  ],
  
})
