import type { HTMLAttributes } from 'astro/types'

interface TestImages {
  src: string
  alt: string
}

interface Base {
  id: string
  label: string
  icon: string
}

interface Select extends Base {
  Element: 'select'
  attrs?: HTMLAttributes<'select'>
  options: {
    value: string
    label: string
  }[]
}

interface Input extends Base {
  Element: 'input'
  attrs: HTMLAttributes<'input'>
}

type Field = Select | Input

export const testImages: TestImages[] = [
  {
    src: '/src/assets/playground/pexels-akos-solymar-706203895-33926926.jpg',
    alt: 'Landscape'
  },
  {
    src: '/src/assets/playground/pexels-francesco-ungaro-16771889.jpg',
    alt: 'Portrait'
  },
  {
    src: '/src/assets/playground/pexels-lajos-kristof-kantor-2158796893-38252308.jpg',
    alt: 'Abstract'
  },
  {
    src: '/src/assets/playground/pexels-hwmedia-5045962.jpg',
    alt: 'Sunset'
  },
  {
    src: '/src/assets/playground/pexels-siarhei-s-284432195-14429380.jpg',
    alt: 'Orcas'
  }
]

export const fields: Field[] = [
  {
    id: 'type',
    label: 'Type',
    icon: 'material-symbols:imagesmode-outline-rounded',
    Element: 'select',
    options: [
      { value: '--background', label: 'Base64' },
      { value: '--background-color', label: 'Color' },
      { value: '--background-image', label: 'Gradient' },
      { value: '--background-svg', label: 'SVG' }
    ]
  },
  {
    id: 'brightness',
    label: 'Brightness',
    icon: 'material-symbols:brightness-6-outline-rounded',
    Element: 'input',
    attrs: {
      type: 'number',
      step: 0.1,
      value: 1
    }
  },
  {
    id: 'saturation',
    label: 'Saturation',
    icon: 'material-symbols:colorize-outline-rounded',
    Element: 'input',
    attrs: {
      type: 'number',
      step: 0.1,
      value: 1.2
    }
  },
  {
    id: 'hue',
    label: 'Hue',
    icon: 'material-symbols:rotate-90-degrees-cw-outline-rounded',
    Element: 'input',
    attrs: {
      type: 'number',
      value: 0
    }
  },
  {
    id: 'autoOrient',
    label: 'Auto orient',
    icon: 'tabler:rotate-rectangle',
    Element: 'input',
    attrs: {
      type: 'checkbox',
      role: 'switch'
    }
  },
  {
    id: 'removeAlpha',
    label: 'Remove alpha',
    icon: 'radix-icons:transparency-grid',
    Element: 'input',
    attrs: {
      type: 'checkbox',
      role: 'switch'
    }
  },
  {
    id: 'getExif',
    label: 'Include EXIF',
    icon: 'boxicons:devices',
    Element: 'input',
    attrs: {
      type: 'checkbox',
      role: 'switch'
    }
  }
]
