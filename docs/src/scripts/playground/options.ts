import type { GetPreviewlyOptions } from 'previewly'
import type { Elements } from './types.ts'

export function getOptions(elements: Elements): GetPreviewlyOptions {
  return {
    size: Number(elements.size.value),
    brightness: Number(elements.brightness.value),
    saturation: Number(elements.saturation.value),
    hue: Number(elements.hue.value),
    autoOrient: elements.autoOrient.checked,
    removeAlpha: elements.removeAlpha.checked,
    getExif: elements.getExif.checked
  }
}
