import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

import { compare } from 'compare-versions'
import { getPackageInfoSync, resolveModule } from 'local-pkg'
import { toCamelCase, toCapitalCase } from '@sykj-ui/utils'

export interface GenerateOptions {
  cwd: string
  force?: boolean
  temp?: string
  prefix?: string
  output?: string
}

const validTemps = ['types']

export async function generate(options: GenerateOptions) {
  if (!options.temp || !validTemps.includes(options.temp)) {
    throw new Error('Invalid template type to generate')
  }

  let components: string[]

  try {
    const info =
      getPackageInfoSync('sykj-ui') ??
      getPackageInfoSync('sykj-ui', { paths: [resolveModule('sykj-ui') || process.cwd()] })!

    const metaPath = compare(info.version!, '2.1.18', '<')
      ? 'sykj-ui/meta-data.json'
      : 'sykj-ui/meta-data/components.json'
    const path = resolveModule(metaPath) || resolveModule(metaPath, { paths: [info.rootPath] })
    const metaData = JSON.parse(await readFile(path!, 'utf-8'))

    components = metaData.components
  } catch (error: any) {
    console.error(error)
    throw new Error('Failed to load sykj-ui, have you installed it?')
  }

  if (options.temp === 'types') {
    await generateTypes(options, components)
  }
}

async function generateTypes(options: GenerateOptions, components: string[]) {
  if (!options.prefix) {
    throw new Error('Invalid component prefix to generate')
  }

  const prefix = toCapitalCase(options.prefix)
  const camelPrefix = toCamelCase(prefix)
  const plugins = ['Confirm', 'Contextmenu', 'Loading', 'Message', 'Notice', 'Toast']
  const types = `declare module 'vue' {
  export interface GlobalComponents {
    ${components
      .filter(name => !plugins.includes(name))
      .map(name => `${prefix}${name}: typeof import('sykj-ui')['${toCapitalCase(name)}']`)
      .join(',\n    ')}
  }

  interface ComponentCustomProperties {
    ${plugins
      .map(name => `$${camelPrefix}${name}: typeof import('sykj-ui')['${toCapitalCase(name)}']`)
      .join(',\n    ')}
  }
}

export {}
`

  const output = resolve(options.cwd, options.output || '.', 'sykj-ui.d.ts')

  if (existsSync(output) && !options.force) {
    throw new Error('Failed to generate, a file with same name exists')
  }

  await writeFile(output, types, 'utf-8')
}
