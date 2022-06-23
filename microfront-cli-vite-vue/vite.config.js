import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from '@rollup/plugin-html'
const entryHtml = fs.readFileSync('./index.html', { encoding: 'utf-8' })
const name = 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:9005',
  plugins: [
    vue({
      transformAssetUrl: {
        base: './src'
      }
    }),
    {
      name: 'dev html',
      apply: 'serve',
      transformIndexHtml(indexHtml) {
        return indexHtml
          .replace('<!-- style placeholder -->', '')
          .replace('<!-- script placeholder -->', '<script type="module" src="/src/main.js"></script>')
      }
    },
    {
      name: 'build html',
      apply: 'build',
      ...html({
        template: () => {
          return entryHtml
            .replace('<!-- style placeholder -->', '<link rel="stylesheet" type="text/css" href="style.css" />')
            .replace('<!-- script placeholder -->', `<script type="text/javascript" src="${name}.umd.js"></script>`)
        }
      })
    }
  ],
  server: {
    port: 9005
  },
  build: {
    rollupOptions: {
      inlineDynamicImports: true
    },
    lib: {
      name,
      fileName: name,
      entry: path.resolve(__dirname, 'src/main.js'),
      formats: ['umd']
    },
    manifest: true
  }
})
