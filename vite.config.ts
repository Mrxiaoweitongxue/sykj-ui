
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import glob from 'fast-glob'
import react from '@vitejs/plugin-react'

import type { UserConfig } from 'vite'

interface Manifest {
  dependencies?: Record<string, string>,
  peerDependencies?: Record<string, string>,
  version?: string
}
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest
const externalPkgs = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))
// https://vite.dev/config/

export default defineConfig(async (): Promise<UserConfig> => {
  let input = await glob('components/**/*.{ts,tsx}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true
  })
  input.push(resolve(__dirname, 'index.tsx'))
  input = input.filter(ele => /^(?!.*(stories\.tsx?|test\.ts)$).+\.tsx?$/.test(ele))
  return {
    plugins: [react()],
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') },
      ]
    },
    build: {
      minify: true,
      cssCodeSplit: true,
      lib: {
        entry: resolve(__dirname, 'index.tsx'),
        name: 'sykj-ui',
      },
      rollupOptions: {
        input,
        external,
        treeshake: true,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'lib',
            entryFileNames: '[name].cjs'
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'es',
            entryFileNames: '[name].mjs'
          }
        ],
      }
    },
  }
})