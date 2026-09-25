import type { GetPreviewlySVG } from '../types.ts'

import { escapeXml } from '../utils.ts'

export function serializeStyle(style: Record<string, string | number>) {
  return (
    Object.entries(style)
      .map(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
        return `${cssKey}:${String(value)}`
      })
      .join(';')
  )
}

export function serializeAttrs(attrs: Record<string, string | number | undefined>) {
  return (
    Object.entries(attrs)
      .filter(([, value]) => typeof value !== 'undefined')
      .map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
      .join(' ')
  )
}

export function serializeSVG(svg: GetPreviewlySVG) {
  const [tag, attrs, rects] = svg
  const rootAttrs = serializeAttrs({ ...attrs, style: serializeStyle(attrs.style) })
  const children = rects
    .map(([childTag, childAttrs]) => `<${childTag} ${serializeAttrs(childAttrs)} />`)
    .join('')

  return `<${tag} ${rootAttrs}>${children}</${tag}>`
}
