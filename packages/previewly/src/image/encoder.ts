import type { Transformer } from '@napi-rs/image'
import type { ImageFormats } from '../types.ts'

export function getMimeType(format: ImageFormats) {
  if (format === 'jpg') return 'image/jpeg'
  return `image/${format}`
}

export function brightnessToNapiValue(brightness: number) {
  // sharp.modulate({ brightness: 1 }) = identity
  // @napi-rs/image.brighten(value) = additive
  // Reasonable approximation for very small thumbnails
  return Math.round((brightness - 1) * 255)
}

export async function encodePreview(pipeline: Transformer, format: ImageFormats): Promise<Buffer> {
  switch (format) {
    case 'png':
      return pipeline.png()
    case 'webp':
      return pipeline.webp()
    case 'avif':
      return pipeline.avif()
    case 'jpeg':
    default:
      return pipeline.jpeg()
  }
}
