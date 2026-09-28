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

export function encodePreview(pipeline: Transformer, format: ImageFormats): Promise<Buffer> {
  switch (format) {
    case 'png':
      return pipeline.png()
    case 'jpeg':
    case 'jpg':
      return pipeline.jpeg()
    case 'avif':
      return pipeline.avif()
    case 'webp':
    default:
      return pipeline.webp()
  }
}
