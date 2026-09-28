import type { GetPreviewlyOptions, GetPreviewlyReturn, GetPreviewlySrc, ImageFormats, PipelineOptions } from './types.ts'

import { Transformer } from '@napi-rs/image'

import { getDominantColor } from './color.ts'

import { getCSS } from './render/css.ts'
import { getSVG } from './render/svg.ts'

import { transformPipeline } from './image/transformPipeline.ts'
import { getChannelsFromColorType, getPixels } from './image/pixels.ts'
import { encodePreview, getMimeType } from './image/encoder.ts'

const SIZE_RANGE = {
  min: 4,
  max: 64
} as const

function isValidSize(size: number) {
  return size >= SIZE_RANGE.min && size <= SIZE_RANGE.max
}

export async function getPreviewly(src: GetPreviewlySrc, options: GetPreviewlyOptions = {}): Promise<GetPreviewlyReturn> {
  const {
    autoOrient = false,
    size = 4,
    format = 'webp',
    brightness = 1,
    saturation = 1.2,
    hue = 0,
    removeAlpha = false,
    getExif = false
  } = options

  if (!isValidSize(size)) {
    throw new Error(`Size must be between ${SIZE_RANGE.min} and ${SIZE_RANGE.max}, received ${size}.`)
  }

  const pipelineOptions: PipelineOptions = {
    ...options,
    autoOrient,
    size,
    brightness,
    saturation,
    hue,
    removeAlpha
  }

  const source = new Transformer(src)
  const metadata = await source.metadata(getExif)
  const pipeline = transformPipeline(source, pipelineOptions)
  const pixelMetadata = await pipeline.metadata()
  const raw = await pipeline.rawPixels()
  const encoded = await encodePreview(pipeline, format)
  const channels = getChannelsFromColorType(pixelMetadata.colorType)
  const base64 = `data:${getMimeType(format)};base64,${encoded.toString('base64')}`

  const pixels = getPixels({
    data: raw,
    width: pixelMetadata.width,
    height: pixelMetadata.height,
    channels,
    removeAlpha
  })

  return {
    base64,
    pixels,
    metadata: {
      ...metadata,
      format,
      originalFormat: metadata.format,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      width: pixelMetadata.width,
      height: pixelMetadata.height
    },
    color: getDominantColor(pixels),
    css: getCSS({
      pixels,
      height: pixelMetadata.height
    }),
    svg: getSVG({
      pixels,
      width: pixelMetadata.width,
      height: pixelMetadata.height
    })
  }
}
