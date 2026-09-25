const LANGUAGES = {
  base64: 'css',
  color: 'css',
  css: 'css',
  svg: 'xml',
  json: 'json'
} as const

type OutputType = keyof typeof LANGUAGES

function isOutputType(value: string): value is OutputType {
  return Object.hasOwn(LANGUAGES, value)
}

const OUTPUT_TYPES = Object.keys(LANGUAGES).filter(isOutputType)

const PLACEHOLDER_PROPERTIES = [
  '--background',
  '--background-position',
  '--background-size',
  '--background-repeat'
] as const

const TAB_BY_TYPE = {
  '--background': 'base64',
  '--background-color': 'color',
  '--background-image': 'css',
  '--background-svg': 'svg'
} satisfies Record<string, OutputType>

export type { OutputType }
export { LANGUAGES, OUTPUT_TYPES, PLACEHOLDER_PROPERTIES, TAB_BY_TYPE }
