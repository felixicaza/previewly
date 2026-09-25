import type { GetPreviewlyOptions } from '../../src/index.ts'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

interface Asset {
  name: string
  buffer: Buffer
  tags: Array<'default' | 'exif' | 'alpha'>
}

interface Variant {
  name: string
  options: GetPreviewlyOptions
  predicate?: (asset: Asset) => boolean
}

const landscapeExifImage = await readFile(new URL('../fixtures/landscape-exif.jpg', import.meta.url))
const portraitExifImage = await readFile(new URL('../fixtures/portrait-exif.jpg', import.meta.url))
const transparentImage = await readFile(new URL('../fixtures/transparent.png', import.meta.url))
const colorfulImage = await readFile(new URL('../fixtures/pexels-fabianwiktor-3470872.jpg', import.meta.url))

const assets: Asset[] = [
  {
    name: 'landscape',
    buffer: landscapeExifImage,
    tags: ['default', 'exif']
  },
  {
    name: 'portrait',
    buffer: portraitExifImage,
    tags: ['default', 'exif']
  },
  {
    name: 'transparent',
    buffer: transparentImage,
    tags: ['default', 'alpha']
  },
  {
    name: 'colorful',
    buffer: colorfulImage,
    tags: ['default']
  }
]

const variants: Variant[] = [
  {
    name: 'default',
    options: {}
  },
  {
    name: 'size-16',
    options: {
      size: 16
    }
  },
  {
    name: 'brightness-2',
    options: {
      brightness: 2
    }
  },
  {
    name: 'saturation-2',
    options: {
      saturation: 2
    }
  },
  {
    name: 'hue-90',
    options: {
      hue: 90
    }
  },
  {
    name: 'avif',
    options: {
      format: 'avif'
    }
  },
  {
    name: 'png',
    options: {
      format: 'png'
    }
  },
  {
    name: 'jpeg',
    options: {
      format: 'jpeg'
    }
  },
  {
    name: 'remove-alpha',
    options: {
      removeAlpha: true
    },
    predicate: asset => asset.tags.includes('alpha')
  },
  {
    name: 'auto-orient',
    options: {
      autoOrient: true
    },
    predicate: asset => asset.tags.includes('exif')
  }
]

export const cases = assets.flatMap(asset =>
  variants.flatMap(variant => {
    if (!(variant.predicate?.(asset) ?? true)) {
      return []
    }

    return [{
      name: join(asset.name, variant.name),
      image: asset.buffer,
      options: variant.options
    }]
  })
)
