type Types = 'base64' | 'color' | 'css' | 'svg' | 'json'

interface Panel {
  type: Types
  active?: boolean
}

export const panels: Panel[] = [
  { type: 'base64', active: true },
  { type: 'color' },
  { type: 'css' },
  { type: 'svg' },
  { type: 'json' }
]
