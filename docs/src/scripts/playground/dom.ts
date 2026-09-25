import type { CSSCustomProperties, Elements } from './types.ts'

export function $<T extends HTMLElement>(root: HTMLElement, selector: string): T {
  const element = root.querySelector<T>(selector)
  if (!element) throw new Error(`Element not found: ${selector}`)
  return element
}

export function createElements(root: HTMLElement): Elements {
  return {
    root,
    original: $<HTMLImageElement>(root, '.original'),
    placeholder: $<HTMLDivElement>(root, '.placeholder'),
    fileDropzone: $<HTMLLabelElement>(root, '.dropzone'),
    fileInput: $<HTMLInputElement>(root, '#file'),
    testImages: $(root, '.test-images'),
    size: $<HTMLInputElement>(root, '#size'),
    sizeValue: $<HTMLOutputElement>(root, '#sizeValue'),
    type: $<HTMLSelectElement>(root, '#type'),
    brightness: $<HTMLInputElement>(root, '#brightness'),
    saturation: $<HTMLInputElement>(root, '#saturation'),
    hue: $<HTMLInputElement>(root, '#hue'),
    autoOrient: $<HTMLInputElement>(root, '#autoOrient'),
    removeAlpha: $<HTMLInputElement>(root, '#removeAlpha'),
    getExif: $<HTMLInputElement>(root, '#getExif'),
    generateButton: $<HTMLButtonElement>(root, '#generate'),
    outputContent: $<HTMLDivElement>(root, '.output-content'),
    tabs: $(root, '.tabs')
  }
}

export function setCustomProperties(element: HTMLElement, properties: CSSCustomProperties) {
  for (const [property, value] of Object.entries(properties)) {
    element.style.setProperty(property, value)
  }
}

export function clearCustomProperties(element: HTMLElement, properties: readonly string[]) {
  for (const property of properties) {
    element.style.removeProperty(property)
  }
}
