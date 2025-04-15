import { resolve } from 'node:path'

import minimist from 'minimist'
import { logger, publish } from '@sykj-ui/scripts'
import { rootDir } from './constant'
import { getPackageName } from './utils'

const args = minimist<{
  d?: boolean
  dry?: boolean
  t?: string
  tag?: string
}>(process.argv.slice(2))

const target = args._[0]
const isDryRun = args.dry || args.d
const releaseTag = args.tag || args.t

async function main() {
  let inputPkg = ''

  if (target?.startsWith('v')) {
    inputPkg = 'sykj-ui'
  } else if (target?.includes('@')) {
    ;[inputPkg] = target.split('@')

    if (['hooks', 'icons', 'plugins', 'scripts', 'utils'].includes(inputPkg)) {
      inputPkg = `common/${inputPkg}`
    }
  }

  const pkgName = await getPackageName(inputPkg)
  const pkgDir = pkgName === 'sykj-ui' ? rootDir : resolve(rootDir, pkgName)

  await publish({ pkgDir, isDryRun, releaseTag })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
