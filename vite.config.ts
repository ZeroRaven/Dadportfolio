import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt', // ask before activating a new SW mid-session
      injectRegister: 'auto',
      // Reuse the EXISTING hand-crafted manifest — don't generate a second.
      manifest: false,
      workbox: {
        // Precache the app shell + every hashed chunk, fonts and images so
        // the whole site (calculators, knowledge base) works offline.
        globPatterns: ['**/*.{js,css,html,woff2,svg,png}'],
        // Cap precache size sensibly (fonts + og-image dominate).
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
        // Data-heavy routes: serve cached instantly, refresh in background.
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith('/tools') || url.pathname.startsWith('/knowledge'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'tools-and-knowledge' },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Split heavyweight vendor libraries into their own cacheable chunks so
    // returning visitors re-download only the (tiny) app chunk on deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'
            }
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            // three.js is only used by the 404 page — keep it out of the
            // shared vendor chunk so normal routes never download it.
            if (id.includes('three')) {
              return 'vendor-three'
            }
            return 'vendor'
          }
        },
      },
    },
    // Keep assets readable in error traces without meaningfully changing size
    sourcemap: false,
  },
})
