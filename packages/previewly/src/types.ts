import type { Metadata } from '@napi-rs/image'

export interface GetPreviewlyOptions {
  /**
   * Automatically orient the image using its EXIF orientation metadata.
   * @default false
   */
  autoOrient?: boolean

  /**
   * Size of the generated placeholder image, in pixels.
   * Must be an integer between 4 and 64.
   * @default 4
   */
  size?: number

  /**
   * Output image format for the generated placeholder.
   * @default "webp"
   */
  format?: ImageFormats

  /**
   * Brightness multiplier applied to the image.
   * @default 1
   */
  brightness?: number

  /**
   * Saturation multiplier applied to the image.
   * @default 1.2
   */
  saturation?: number

  /**
   * Hue rotation, in degrees.
   * @default 0
   */
  hue?: number

  /**
   * Remove the alpha channel from transparent images.
   * @default false
   */
  removeAlpha?: boolean

  /**
   * Include the image EXIF metadata in the returned result.
   * @default false
   */
  getExif?: boolean
}

export type GetPreviewlySrc = Buffer | Uint8Array
export type GetPreviewlyPixels = GetPreviewlyPixel[][]
export type ImageFormats = 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif'
export type PipelineOptions = Required<Pick<GetPreviewlyOptions, 'autoOrient' | 'size' | 'brightness' | 'saturation' | 'hue' | 'removeAlpha'>>

export interface GetPreviewlyPixel {
  r: number
  g: number
  b: number
  a?: number
}

export interface GetPreviewlyColor {
  hex: string
  r: number
  g: number
  b: number
}

export interface GetPreviewlyCSS {
  backgroundImage: string
  backgroundPosition: string
  backgroundSize: string
  backgroundRepeat: 'no-repeat'
}

export type GetPreviewlySVGRect = [
  'rect',
  {
    x: number
    y: number
    width: number
    height: number
    fill: string
    'fill-opacity': number
  }
]

export type GetPreviewlySVG = [
  'svg',
  {
    xmlns: string
    viewBox: string
    width: string
    height: string
    preserveAspectRatio: string
    'shape-rendering': string
    style: {
      position: string
      top: string
      left: string
      transformOrigin: string
      transform: string
      right: number
      bottom: number
    }
  },
  GetPreviewlySVGRect[]
]

export interface GetPreviewlyMetadata
  extends Omit<Metadata, 'width' | 'height'> {
  width: number
  height: number
  originalFormat: string
  originalWidth: number
  originalHeight: number
}

export interface GetPreviewlyReturn {
  metadata: GetPreviewlyMetadata
  base64: string
  color: GetPreviewlyColor
  pixels: GetPreviewlyPixels
  css: GetPreviewlyCSS
  svg: GetPreviewlySVG
}
