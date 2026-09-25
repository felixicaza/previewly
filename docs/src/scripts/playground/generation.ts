import type { GetPreviewlyOptions, GetPreviewlyReturn } from 'previewly'

export async function generatePlaceholder(inputFile: File, options: GetPreviewlyOptions): Promise<GetPreviewlyReturn> {
  const { getPreviewly } = await import('previewly')
  const buffer = new Uint8Array(await inputFile.arrayBuffer())
  return getPreviewly(buffer, options)
}
