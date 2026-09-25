import type { GetPreviewlyPixel, GetPreviewlyPixels, GetPreviewlySVG, GetPreviewlySVGRect } from '../types.ts'

import { toRGBAString } from '../color.ts'

interface GetSVGOptions {
  pixels: GetPreviewlyPixels
  width: number
  height: number
}

const SVG_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  right: 0,
  bottom: 0,
  transformOrigin: 'top left',
  transform: 'translate(-50%, -50%)'
} as const

function createRect(pixel: GetPreviewlyPixel, x: number, y: number): GetPreviewlySVGRect {
  const { a: alpha = 1, ...rgb } = pixel

  return [
    'rect',
    {
      x,
      y,
      width: 1,
      height: 1,
      fill: toRGBAString(rgb),
      'fill-opacity': alpha
    }
  ]
}

export function getSVG({ pixels, width, height }: GetSVGOptions): GetPreviewlySVG {
  const rowCount = pixels.length
  if (rowCount !== height) console.warn(`Expected ${height} rows but received ${rowCount}.`)

  const rects: GetPreviewlySVGRect[] = []

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row = pixels[rowIndex]

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      rects.push(createRect(row[columnIndex], columnIndex, rowIndex))
    }
  }

  return [
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      height: '100%',
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'none',
      'shape-rendering': 'crispEdges',
      style: SVG_STYLE
    },
    rects
  ]
}
