import type { GetPreviewlyReturn } from 'previewly'
import type { Elements, PlaceholderRenderer } from './types.ts'

import { setCustomProperties } from './dom.ts'

export function createRenderers(elements: Elements) {
  return {
    '--background': (data: GetPreviewlyReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': `url("${data.base64}")`,
        '--background-size': 'contain'
      })
    },

    '--background-color': (data: GetPreviewlyReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': data.color.hex
      })
    },

    '--background-image': (data: GetPreviewlyReturn) => {
      setCustomProperties(elements.placeholder, {
        '--background': data.css.backgroundImage,
        '--background-position': data.css.backgroundPosition,
        '--background-size': data.css.backgroundSize,
        '--background-repeat': data.css.backgroundRepeat
      })
    },

    '--background-svg': async(data: GetPreviewlyReturn) => {
      const { serializeSVG } = await import('previewly')
      const svg = serializeSVG(data.svg)
      const svgUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`

      setCustomProperties(elements.placeholder, {
        '--background': svgUrl,
        '--background-size': '100% 100%',
        '--background-repeat': 'no-repeat'
      })
    }
  } satisfies Record<string, PlaceholderRenderer>
}
