import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'sykj-ui',
      fileName: 'libs',
      // fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs.js')
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd'],
    }
  },
})
