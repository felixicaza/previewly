import type { GetPreviewlyPixel, GetPreviewlyPixels } from '../types.ts'

import { JsColorType } from '@napi-rs/image'

import { arrayChunk, round } from '../utils.ts'

interface GetPixelsOptions {
  data: Buffer
  width: number
  height: number
  channels: number
  removeAlpha?: boolean
}

function normalizeAlpha(alpha: number) {
  return Math.round((alpha / 255) * 1000) / 1000
}

function convertPixel(pixel: number[], channels: number, removeAlpha: boolean): GetPreviewlyPixel {
  switch (channels) {
    case 1: {
      const [value] = pixel
      return { r: value, g: value, b: value }
    }

    case 2: {
      const [value, alpha] = pixel
      if (removeAlpha) return { r: value, g: value, b: value }
      return { r: value, g: value, b: value, a: normalizeAlpha(alpha) }
    }

    case 3: {
      const [r, g, b] = pixel
      return { r, g, b }
    }

    case 4: {
      const [r, g, b, alpha] = pixel
      if (removeAlpha) return { r, g, b }
      return { r, g, b, a: normalizeAlpha(alpha) }
    }

    default: throw new Error(`Unsupported pixel channel count: ${channels}`)
  }
}

export function getPixels({ data, width, height, channels, removeAlpha = false }: GetPixelsOptions): GetPreviewlyPixels {
  const pixels: GetPreviewlyPixels = []
  const values = [...data]
  const rawPixels = arrayChunk(values, channels)
  const maxPixels = width * height

  for (let index = 0; index < Math.min(rawPixels.length, maxPixels); index++) {
    const rowIndex = Math.floor(index / width)
    const columnIndex = index % width

    pixels[rowIndex] ||= []
    pixels[rowIndex][columnIndex] = convertPixel(rawPixels[index], channels, removeAlpha)
  }

  return pixels
}

export function getChannelsFromColorType(colorType: JsColorType) {
  switch (colorType) {
    case JsColorType.L8:
      return 1
    case JsColorType.La8:
      return 2
    case JsColorType.Rgb8:
      return 3
    case JsColorType.Rgba8:
      return 4
    default:
      throw new Error(`Unsupported color type for Previewly-compatible output: ${JsColorType[colorType] ?? colorType}`)
  }
}
