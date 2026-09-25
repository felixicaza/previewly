import type { GetPreviewlyOptions } from 'previewly'
import type { Elements, OutputType } from './types.ts'

import { clearCustomProperties, createElements } from './dom.ts'
import { generatePlaceholder } from './generation.ts'
import { getOptions } from './options.ts'
import { getOutputElements, render, selectOutputTab, selectOutputTabForType } from './output.ts'
import { createRenderers } from './renderers.ts'
import { LANGUAGES, OUTPUT_TYPES, PLACEHOLDER_PROPERTIES } from './constants.ts'

function setLoading(elements: Elements, loading: boolean) {
  elements.generateButton.disabled = loading
  elements.generateButton.textContent = loading ? 'Generating...' : 'Generate placeholder'
}

function addFileInputListeners(elements: Elements, setFile: (file: File | null) => void) {
  function handleFile(file: File | null) {
    setFile(file)
  }

  elements.fileInput.addEventListener('change', () => {
    handleFile(elements.fileInput.files?.[0] ?? null)
  })

  elements.fileDropzone.addEventListener('dragover', (event) => {
    event.preventDefault()
    elements.fileDropzone.classList.add('dragging')
  })

  elements.fileDropzone.addEventListener('dragleave', () => {
    elements.fileDropzone.classList.remove('dragging')
  })

  elements.fileDropzone.addEventListener('drop', (event) => {
    event.preventDefault()
    elements.fileDropzone.classList.remove('dragging')

    handleFile(event.dataTransfer?.files[0] ?? null)
  })
}

function getFilenameFromUrl(imageUrl: string) {
  const pathname = new URL(imageUrl, document.baseURI).pathname
  const filename = pathname.slice(pathname.lastIndexOf('/') + 1)
  return filename || 'test-image'
}

function addTestImageListeners(elements: Elements, updatePreview: () => Promise<void>, setFile: (file: File | null) => void) {
  elements.testImages.addEventListener('click', async(event) => {
    if (!(event.target instanceof Element)) return

    const button = event.target.closest('[data-image]')
    if (!(button instanceof HTMLButtonElement)) return

    const imageUrl = button.dataset.image
    if (!imageUrl) return

    try {
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error(`Failed to load test image: ${response.status}`)

      const blob = await response.blob()
      const filename = getFilenameFromUrl(imageUrl)

      setFile(new File([blob], filename, { type: blob.type || 'image/jpeg' }))

      await updatePreview()
    } catch(error) {
      console.error('Failed to load test image:', error)
    }
  })
}

function addOptionListeners(elements: Elements, scheduleUpdatePreview: () => void) {
  elements.size.addEventListener('input', () => {
    // Keep the displayed value in sync immediately, before the preview is generated
    elements.sizeValue.value = elements.size.value
    scheduleUpdatePreview()
  })

  elements.brightness.addEventListener('input', scheduleUpdatePreview)
  elements.saturation.addEventListener('input', scheduleUpdatePreview)
  elements.hue.addEventListener('input', scheduleUpdatePreview)
  elements.autoOrient.addEventListener('change', scheduleUpdatePreview)
  elements.removeAlpha.addEventListener('change', scheduleUpdatePreview)
  elements.getExif.addEventListener('change', scheduleUpdatePreview)

  elements.type.addEventListener('change', () => {
    selectOutputTabForType(elements, elements.type.value)
    scheduleUpdatePreview()
  })
}

function isOutputType(value: string): value is OutputType {
  return Object.hasOwn(LANGUAGES, value)
}

function addOutputListeners(elements: Elements) {
  elements.outputContent.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    const tab = event.target.closest('.tab')

    if (tab instanceof HTMLButtonElement) {
      const selectedTab = tab.dataset.tab

      if (selectedTab && isOutputType(selectedTab)) {
        selectOutputTab(elements, selectedTab)
      }

      return
    }

    const copyButton = event.target.closest('.copy')
    if (!(copyButton instanceof HTMLButtonElement)) return

    const panel = copyButton.closest('.panel')
    if (!(panel instanceof HTMLElement)) return

    const output = panel.querySelector('pre')
    if (!(output instanceof HTMLPreElement)) return

    navigator.clipboard.writeText(output.textContent ?? '')
      .then(() => {
        const originalText = copyButton.textContent

        copyButton.textContent = 'Copied'

        setTimeout(() => {
          copyButton.textContent = originalText
        }, 1200)
      })
      .catch((error) => console.error('Failed to copy output:', error))
  })
}

function addGenerateListener(
  elements: Elements,
  hasFile: () => boolean,
  updatePreview: (manual?: boolean) => Promise<void>,
  clearUpdateTimeout: () => void
) {
  elements.generateButton.addEventListener('click', () => {
    if (!hasFile()) {
      console.error('Please select an image first.') // Replace with a toast notification if available
      return
    }

    clearUpdateTimeout()
    updatePreview(true).catch(() => undefined)
  })
}

/**
 * Mounts a playground into the specified root element.
 *
 * This function is exported so the playground can also be mounted manually
 * from another module.
 */
export function mountPlayground(root: HTMLElement) {
  const elements = createElements(root)
  const renderers = createRenderers(elements)

  let file: File | null = null
  let objectUrl: string | null = null
  let generationId = 0
  let updateTimeout: ReturnType<typeof setTimeout> | null = null

  function updateOriginalPreview(nextFile: File | null) {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      objectUrl = null
    }

    if (!nextFile) {
      elements.original.removeAttribute('style')
      return
    }

    objectUrl = URL.createObjectURL(nextFile)

    elements.original.style.setProperty('--background', `url("${objectUrl}")`)
    elements.original.style.setProperty('--background-size', 'contain')
    elements.original.style.setProperty('--background-position', 'center')
    elements.original.style.setProperty('--background-repeat', 'no-repeat')
  }

  function clearGeneratedData() {
    clearUpdateTimeout()
    generationId += 1
    setLoading(elements, false)

    clearCustomProperties(elements.placeholder, PLACEHOLDER_PROPERTIES)

    const outputs = getOutputElements(elements)

    OUTPUT_TYPES.forEach((type) => {
      const output = outputs[type]

      output.className = `shj-lang-${LANGUAGES[type]} shj-block`
      output.textContent = 'Upload an image to start.'
    })
  }

  function setCurrentFile(nextFile: File | null) {
    clearGeneratedData()

    file = nextFile
    updateOriginalPreview(nextFile)
  }

  function clearUpdateTimeout() {
    if (updateTimeout) {
      clearTimeout(updateTimeout)
      updateTimeout = null
    }
  }

  /**
   * Schedules a preview update using a short debounce interval.
   *
   * This prevents a new placeholder from being generated for every input
   * event while the user is adjusting a control.
   */
  function scheduleUpdatePreview() {
    const DEBOUNCE_TIMER = 150

    if (!file) return

    clearUpdateTimeout()

    updateTimeout = setTimeout(() => {
      updateTimeout = null
      updatePreview().catch(() => undefined)
    }, DEBOUNCE_TIMER)
  }

  async function updatePreview(manual = false): Promise<void> {
    if (!file) return

    const currentGenerationId = ++generationId

    if (manual) {
      setLoading(elements, true)
    }

    try {
      const options: GetPreviewlyOptions = getOptions(elements)
      const generated = await generatePlaceholder(file, options)

      // Ignore stale results when a newer preview generation has already been requested
      if (currentGenerationId !== generationId) return

      await render(elements, generated, renderers)
    } catch(error) {
      if (currentGenerationId !== generationId) return

      console.error('Failed to generate placeholder:', error) // Replace with a toast notification if available
    } finally {
      if (manual && currentGenerationId === generationId) {
        setLoading(elements, false)
      }
    }
  }

  addFileInputListeners(elements, setCurrentFile)
  addTestImageListeners(elements, updatePreview, setCurrentFile)
  addOptionListeners(elements, scheduleUpdatePreview)
  addOutputListeners(elements)

  addGenerateListener(
    elements,
    () => file !== null,
    updatePreview,
    clearUpdateTimeout
  )

  // Keep the displayed size value in sync with the initial HTML value
  elements.sizeValue.value = elements.size.value
}
