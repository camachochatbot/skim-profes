import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages publica en https://camachochatbot.github.io/skim-profes/
const base = process.env.BASE_PATH ?? '/skim-profes/';

export default defineConfig({
  base,
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo/*.png', 'logo/*.svg', 'logo/favicon.ico'],
      manifest: {
        name: 'SKIM · Profes',
        short_name: 'SKIM Profes',
        description: 'Tu grupo en La Molina, a mano. / Your group in La Molina, at hand.',
        lang: 'es',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0c24',
        theme_color: '#1d2063',
        icons: [
          { src: 'logo/icono-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo/icono-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'logo/icono-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Todo lo de la app queda guardado en el móvil: funciona en modo avión.
        globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,woff2,xlsx}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: 'index.html',
      },
    }),
  ],
});
