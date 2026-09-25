/**
 * Chunks an array into smaller arrays of a specified size
 */
export function arrayChunk<T>(array: readonly T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be greater than zero.')

  const chunks: T[][] = []

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size))
  }

  return chunks
}

/**
 * Math utility functions for clamping and rounding numbers
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function round(value: number, precision = 2) {
  const factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

/**
 * Escapes special characters in a string for use in XML
 */
export function escapeXml(value: string) {
  return (
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;')
  )
}
