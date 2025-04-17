import path from 'node:path'

import fs from 'fs-extra'
import { format } from 'prettier'
import { ESLint } from 'eslint'
import minimist from 'minimist'
import prompts from 'prompts'
import { logger } from '@sykj-ui/scripts'
import { toCamelCase, toCapitalCase, toKebabCase } from '@sykj-ui/utils'
import { components as allComponents, rootDir, prettierConfig } from './constant'

const args = minimist(process.argv.slice(2))

let name = args._[0]

const eslint = new ESLint({ fix: true })
async function getConvertCompTypeFiles(capitalCaseName: string, kebabCaseName: string): Promise<
  Array<{ filePath: string; source: string; convert?: boolean }>
> {

  const compConfigPath = path.resolve(rootDir, 'index.tsx')

  const compConfigSource = (await fs.readFile(compConfigPath, 'utf-8')).split('\n')
  compConfigSource.push(`export { default as ${capitalCaseName} } from './components/${kebabCaseName}'`)
  return [
    {
      filePath: compConfigPath,
      source: compConfigSource.join('\n'),
      convert: true
    }
  ]
}
async function main() {
  if (!name) {
    name = (
      await prompts({
        type: 'text',
        name: 'component',
        message: 'Input a component name:'
      })
    ).component
  }

  if (!name || allComponents.includes(name)) {
    process.exit(1)
  } else {

    logger.ln()

    await create(name)
  }

  logger.withBothLn(() => {
    if (!process.exitCode) {
      logger.success(`Component '${name}' created successfully`)
    } else {
      logger.error('Component name must be specified and not exists')
    }
  })
}

async function create(name: string) {
  if (allComponents.includes(name)) return

  let kebabCaseName: string
  let capitalCaseName: string
  let camelCaseName: string

  if (name.match(/[A-Z]/)) {
    capitalCaseName = name.replace(/-/g, '')
    kebabCaseName = toKebabCase(capitalCaseName)
    camelCaseName = capitalCaseName.charAt(0).toLowerCase() + capitalCaseName.slice(1)
  } else {
    kebabCaseName = name
    capitalCaseName = toCapitalCase(name)
    camelCaseName = toCamelCase(name)
  }
  console.log(camelCaseName);
  const generatedFiles: Array<{
    filePath: string
    source: string
    convert?: boolean
  }> = [
      {
        filePath: path.resolve(rootDir, 'components', kebabCaseName, 'index.ts'),
        source: `
          import { ${capitalCaseName} } from './${kebabCaseName}.tsx'
          export default ${capitalCaseName};
        `
      },
      {
        filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.tsx`),
        source: `
          import { FC } from 'react';
          import { ${capitalCaseName} as Antd${capitalCaseName} } from 'antd';
          import "./${kebabCaseName}.scss"
          export interface ${capitalCaseName}Props {
            name?: string
          }
          export const ${capitalCaseName}: FC<${capitalCaseName}Props> = () => {
            return (
              <Antd${capitalCaseName}></Antd${capitalCaseName}>
            );
          };
        `
      },
      {
        filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.test.ts`),
        source: `
          import { expect, test } from 'vitest'
          test('expect.soft test', () => {
            expect.soft(1 + 2).toBe(3)
            expect.soft(1 + 2).toBe(3)
          })
        `
      },
      {
        filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.stories.tsx`),
        source: `
          import { Meta, StoryObj } from '@storybook/react'
          import { ${capitalCaseName}, ${capitalCaseName}Props } from './${kebabCaseName}'
          import React from 'react'
          export default {
            title: '${capitalCaseName}',
            component: ${capitalCaseName},
          } as Meta<${capitalCaseName}Props>

          export const ${capitalCaseName}Comp: StoryObj<typeof ${capitalCaseName}> = {
            render() {
              return <${capitalCaseName} />
            }
          }
        `
      },
      {
        filePath: path.resolve(rootDir, 'components', kebabCaseName, `${kebabCaseName}.scss`),
        source: `
          .test{
            color:red;
          }
        `
      },
      ...await getConvertCompTypeFiles(capitalCaseName, kebabCaseName)
    ]

  const shouldLintFiles: string[] = []

  await Promise.all(
    generatedFiles.map(async ({ filePath, source, convert }) => {
      if (fs.existsSync(filePath) && !convert) {
        logger.warningText(`exists ${filePath}, skip`)
        return
      }
      await fs.ensureDir(path.dirname(filePath))

      if (filePath.match(/\.(s|p)?css$/)) {
        await fs.writeFile(filePath, await format(source, { ...prettierConfig, parser: 'scss' }))
      } else if (filePath.endsWith('.md')) {
        await fs.writeFile(
          filePath,
          await format(
            source
              .split('\n')
              .map(line => line.trim())
              .join('\n'),
            { ...prettierConfig, parser: 'markdown' }
          )
        )
      } else if (filePath.endsWith('.json')) {
        await fs.writeFile(
          filePath,
          await format(source, {
            ...prettierConfig,
            parser: 'json'
          })
        )
      } else if (filePath.match(/\.(tsx|ts)$/)) {
        await fs.writeFile(
          filePath,
          await format(source, {
            ...prettierConfig,
            parser: 'typescript'
          })
        )
      } else {
        await fs.writeFile(
          filePath,
          source
        )
      }
      logger.infoText(`generated ${filePath}`)
    })
  )

  logger.withStartLn(() => logger.infoText('Linting files...'))

  await ESLint.outputFixes(await eslint.lintFiles(shouldLintFiles))

  logger.successText(`Create component '${kebabCaseName}' successful`)
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
