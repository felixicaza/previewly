import type { GetPreviewlyReturn } from 'previewly'
import type { OUTPUT_TYPES } from './constants.ts'

export type PlaceholderRenderer = (data: GetPreviewlyReturn) => void | Promise<void>
export type CSSCustomProperties = Record<`--${string}`, string>
export type OutputType = typeof OUTPUT_TYPES[number]

export interface Elements {
  root: HTMLElement
  original: HTMLImageElement
  placeholder: HTMLDivElement
  fileDropzone: HTMLLabelElement
  fileInput: HTMLInputElement
  testImages: HTMLElement
  size: HTMLInputElement
  sizeValue: HTMLOutputElement
  type: HTMLSelectElement
  brightness: HTMLInputElement
  saturation: HTMLInputElement
  hue: HTMLInputElement
  autoOrient: HTMLInputElement
  removeAlpha: HTMLInputElement
  getExif: HTMLInputElement
  generateButton: HTMLButtonElement
  outputContent: HTMLDivElement
  tabs: HTMLElement
}
