import type { GetPreviewlyCSS, GetPreviewlyPixel, GetPreviewlyPixels } from '../types.ts'

import { toRGBAString } from '../color.ts'

interface GetCSSOptions {
  pixels: GetPreviewlyPixels
  height: number
}

function createRowGradient(row: GetPreviewlyPixel[]) {
  const columnCount = row.length

  if (columnCount === 0) return 'linear-gradient(90deg, transparent)'

  const stops = row
    .map(toRGBAString)
    .map((color, column) => {
      const start = column === 0 ? '' : ` ${(column / columnCount) * 100}%`
      const end = ` ${((column + 1) / columnCount) * 100}%`
      return `${color}${start}${end}`
    })
    .join(',')

  return `linear-gradient(90deg, ${stops})`
}

export function getCSS({ pixels, height }: GetCSSOptions): GetPreviewlyCSS {
  const rowCount = pixels.length

  if (rowCount === 0) {
    return {
      backgroundImage: '',
      backgroundPosition: '',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }
  }

  if (rowCount !== height) console.warn(`Expected ${height} rows but received ${rowCount}.`)

  const backgroundImage = pixels.map(createRowGradient).join(',')
  const step = rowCount > 1 ? 100 / (rowCount - 1) : 0
  const backgroundPosition = Array.from({ length: rowCount }, (_, row) => `0 ${row * step}%`).join(',')

  return {
    backgroundImage,
    backgroundPosition,
    backgroundSize: `100% ${100 / rowCount}%`,
    backgroundRepeat: 'no-repeat'
  }
}
