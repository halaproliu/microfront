import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  rollupOptions: {
    input: 'src/main.js',
    format: 'iife',
    output: {
      name: 'viteVue'
    },
    preserveEntrySignatures: true
  },
  base: 'http://localhost:9004',
  plugins: [vue()]
})
