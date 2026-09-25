interface Tabs {
  id: string
  label: string
  active?: boolean
}

export const tabs: Tabs[] = [
  {
    id: 'base64',
    label: 'Base64',
    active: true
  },
  {
    id: 'color',
    label: 'Color'
  },
  {
    id: 'css',
    label: 'CSS'
  },
  {
    id: 'svg',
    label: 'SVG'
  },
  {
    id: 'json',
    label: 'JSON'
  }
]
