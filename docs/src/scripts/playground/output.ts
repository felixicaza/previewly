import type { GetPreviewlyReturn } from 'previewly'
import type { Elements, OutputType, PlaceholderRenderer } from './types.ts'

import { dedent } from 'ts-dedent'
import { highlightHTML } from '@speed-highlight/core'
import '@speed-highlight/core/themes/atom-dark.css'

import { LANGUAGES, OUTPUT_TYPES, PLACEHOLDER_PROPERTIES, TAB_BY_TYPE } from './constants.ts'
import { clearCustomProperties } from './dom.ts'
import { formatSVG } from './utils.ts'

type TabType = keyof typeof TAB_BY_TYPE

function isTabType(value: string): value is TabType {
  return Object.hasOwn(TAB_BY_TYPE, value)
}

function getOutputElement(elements: Elements, type: OutputType) {
  const element = elements.root.querySelector<HTMLPreElement>(`[data-panel="${type}"] pre`)
  if (!element) throw new Error(`Missing output panel for type: ${type}`)
  return element
}

export function getOutputElements(elements: Elements) {
  return {
    base64: getOutputElement(elements, 'base64'),
    color: getOutputElement(elements, 'color'),
    css: getOutputElement(elements, 'css'),
    svg: getOutputElement(elements, 'svg'),
    json: getOutputElement(elements, 'json')
  } satisfies Record<OutputType, HTMLPreElement>
}

export function selectOutputTab(elements: Elements, selectedTab: OutputType) {
  const tabs = elements.tabs.querySelectorAll<HTMLButtonElement>('.tab')
  const panels = elements.root.querySelectorAll<HTMLElement>('.panel')

  tabs.forEach((tab) => {
    const isSelected = tab.dataset.tab === selectedTab
    tab.classList.toggle('is-active', isSelected)
    tab.setAttribute('aria-selected', String(isSelected))
  })

  panels.forEach((panel) => {
    const isSelected = panel.dataset.panel === selectedTab
    panel.classList.toggle('is-active', isSelected)
    panel.hidden = !isSelected
  })
}

export function selectOutputTabForType(elements: Elements, type: string) {
  if (!isTabType(type)) return
  selectOutputTab(elements, TAB_BY_TYPE[type])
}

export async function render(elements: Elements, data: GetPreviewlyReturn, renderers: Record<string, PlaceholderRenderer>) {
  const { serializeSVG } = await import('previewly')
  const outputs = getOutputElements(elements)

  const output = {
    base64: dedent`.previewly-placeholder {
      background-image: url("${data.base64}");
      background-size: cover;
    }`,
    color: dedent`.previewly-placeholder {
      background-color: ${data.color.hex};
    }`,
    css: dedent`.previewly-placeholder {
      background-image: ${data.css.backgroundImage};
      background-position: ${data.css.backgroundPosition};
      background-size: ${data.css.backgroundSize};
      background-repeat: ${data.css.backgroundRepeat};
    }`,
    svg: formatSVG(serializeSVG(data.svg)),
    json: JSON.stringify(
      {
        metadata: data.metadata,
        base64: data.base64,
        color: data.color,
        pixels: data.pixels,
        css: data.css,
        svg: data.svg
      },
      null,
      2
    )
  }

  await Promise.all(
    OUTPUT_TYPES.map(async(type) => {
      const element = outputs[type]
      const language = LANGUAGES[type]

      element.classList.add(`shj-lang-${language}`, 'shj-block')
      element.innerHTML = await highlightHTML(output[type], language)
    })
  )

  clearCustomProperties(elements.placeholder, PLACEHOLDER_PROPERTIES)

  const renderer = renderers[elements.type.value]
  if (!renderer) throw new Error(`Unsupported output type: ${elements.type.value}`)

  await renderer(data)

  selectOutputTabForType(elements, elements.type.value)
}
