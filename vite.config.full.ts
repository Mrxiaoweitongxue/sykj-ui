// This config is for building library, do not use to create serve.

import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import type { LogLevel } from 'vite'

interface Manifest {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  version?: string
}

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest

const logLevel = process.env.LOG_LEVEL

const outDir = 'dist'

export default defineConfig(() => {
  return {
    logLevel: (logLevel || 'info') as LogLevel,
    publicDir: false,
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') },
      ]
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log']
    },
    build: {
      outDir,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'index.tsx'),
        formats: ['es', 'cjs', 'iife'],
        name: 'SYKJUI',
        fileName: format => `sykj-ui.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'js'}`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'antd'],
        output: {
          globals: {
            react: 'React',
            "react-dom": 'ReactDom',
            'antd': 'Antd'
          }
        }
      },
      commonjsOptions: {
        sourceMap: false
      },
      chunkSizeWarningLimit: 10000
    },
  }
})
