import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['@vue', 'vue']
    }
  },
  plugins: []
})
