import { Console } from 'node:console'
import { cpus, freemem, totalmem, platform, release, arch } from 'node:os'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { PassThrough } from 'node:stream'

import { Bench } from 'tinybench'

import { getPlaiceholder } from 'plaiceholder'
import { getPreviewly } from '../packages/previewly/src/index.ts'

const FILES_EXT_REGEX = /\.(jpe?g|png|webp|avif)$/i

const fixtures = new URL('../packages/previewly/tests/fixtures/', import.meta.url)
const images = (await readdir(fixtures))
  .filter((file) => FILES_EXT_REGEX.test(file))
  .sort()

const ANSI_REGEX = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g')

function getSystemInfo() {
  const usedMemory = totalmem() - freemem()

  return [
    `OS: ${platform()} ${release()} ${arch()}`,
    `Kernel: ${release()}`,
    `CPU: ${cpus()[0]?.model ?? 'Unknown'}`,
    `Memory: ${Math.round(usedMemory / 1024 / 1024)}MiB / ${Math.round(totalmem() / 1024 / 1024)}MiB`,
    ''
  ].join('\n')
}

let results = `${getSystemInfo()}\n`

await images.reduce(
  async(previous, imageName) => {
    await previous

    const imageUrl = new URL(imageName, fixtures)
    const buffer = await readFile(new URL(imageName, fixtures))
    const { size } = await stat(imageUrl)

    const bench = new Bench({
      name: imageName,
      iterations: 100
    })

    bench
      .add('previewly', async() => {
        await getPreviewly(buffer, { size: 10 })
      })
      .add('plaiceholder', async() => {
        await getPlaiceholder(buffer, { size: 10 })
      })

    await bench.run()

    const table = bench.table()

    const output = new PassThrough()
    let text = ''

    output.on('data', chunk => {
      text += chunk.toString()
    })

    const logger = new Console({
      stdout: output,
      stderr: output
    })

    logger.log(`=== ${imageName} (${(size / 1024).toFixed(2)} KiB) ===`)
    logger.table(table)

    output.end()

    await new Promise(resolve => {
      output.on('finish', resolve)
    })

    results += `${text.replace(ANSI_REGEX, '')}\n`
  },
  Promise.resolve()
)

await writeFile(new URL('./results.txt', import.meta.url), results, 'utf8')
