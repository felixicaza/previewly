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

async function getMetadata(src: GetPreviewlySrc, getExif: boolean) {
  const metadata = await new Transformer(src).metadata(getExif)
  if (!metadata.width || !metadata.height) throw new Error('Could not get required image metadata')
  return metadata
}

async function extractPixels(src: GetPreviewlySrc, options: PipelineOptions) {
  const pipeline = transformPipeline(src, options)
  const pixelMetadata = await pipeline.metadata()
  const channels = getChannelsFromColorType(pixelMetadata.colorType)
  const raw = await pipeline.rawPixels()

  const pixels = getPixels({
    data: raw,
    width: pixelMetadata.width,
    height: pixelMetadata.height,
    channels,
    removeAlpha: options.removeAlpha ?? false
  })

  return { pixelMetadata, pixels }
}

async function createPreview(src: GetPreviewlySrc, options: PipelineOptions, format: ImageFormats) {
  const encoded = await encodePreview(transformPipeline(src, options), format)
  return `data:${getMimeType(format)};base64,${encoded.toString('base64')}`
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

  const { pixelMetadata, pixels } = await extractPixels(src, pipelineOptions)
  const base64 = await createPreview(src, pipelineOptions, format)
  const metadata = await getMetadata(src, getExif)

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
