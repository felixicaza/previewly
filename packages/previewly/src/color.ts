import type { GetPreviewlyPixel, GetPreviewlyPixels } from './types.ts'

import { clamp } from './utils.ts'

export function rgbToHex(r: number, g: number, b: number) {
  return (
    `#${
      [r, g, b]
      .map((x) => clamp(Math.round(x), 0, 255).toString(16).padStart(2, '0'))
      .join('')}`
  )
}

export function toRGBAString({ r, g, b, a }: GetPreviewlyPixel) {
  if (a === undefined) return `rgb(${r},${g},${b})`
  return `rgba(${r},${g},${b},${a})`
}

export function getDominantColor(pixels: GetPreviewlyPixels) {
  let totalWeight = 0
  let sumR = 0
  let sumG = 0
  let sumB = 0

  for (const row of pixels) {
    for (const pixel of row) {
      const alpha = pixel.a ?? 1
      const weight = alpha <= 0 ? 0 : alpha

      totalWeight += weight
      sumR += pixel.r * weight
      sumG += pixel.g * weight
      sumB += pixel.b * weight
    }
  }

  if (totalWeight === 0) return { r: 0, g: 0, b: 0, hex: '#000000' }

  const r = Math.round(sumR / totalWeight)
  const g = Math.round(sumG / totalWeight)
  const b = Math.round(sumB / totalWeight)

  return { r, g, b, hex: rgbToHex(r, g, b) }
}
