import type { GetPreviewlyColor, GetPreviewlyCSS, GetPreviewlyMetadata, GetPreviewlyReturn } from '../src/index.ts'

import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { getPreviewly, serializeSVG } from '../src/index.ts'

import { cleanImageSnapshotsOnce } from './helpers/snapshots.ts'

import { cases } from './data/previewly.ts'

const EXPECTED_DIR = fileURLToPath(new URL('./expected/', import.meta.url))

function formatResult(result: GetPreviewlyCSS | GetPreviewlyColor | GetPreviewlyMetadata) {
  return JSON.stringify(result, null, 2)
}

async function expectFixture(name: string, result: GetPreviewlyReturn) {
  const fixtureDir = join(EXPECTED_DIR, name)

  await mkdir(fixtureDir, { recursive: true })

  const image = Buffer.from(result.base64.slice(result.base64.indexOf(',') + 1), 'base64')

  await cleanImageSnapshotsOnce(fixtureDir)

  await expect(image).toMatchFileSnapshot(join(fixtureDir, `image.${result.metadata.format}`))
  await expect(serializeSVG(result.svg)).toMatchFileSnapshot(join(fixtureDir, 'placeholder.svg'))
  await expect(formatResult(result.css)).toMatchFileSnapshot(join(fixtureDir, 'css.json'))
  await expect(formatResult(result.color)).toMatchFileSnapshot(join(fixtureDir, 'color.json'))
  await expect(formatResult(result.metadata)).toMatchFileSnapshot(join(fixtureDir, 'metadata.json'))
}

describe('previewly fixtures tests', () => {
  it.each(cases)('$name', async({ name, image, options }) => {
    const result = await getPreviewly(image, options)

    await expectFixture(name, result)
  })
})
