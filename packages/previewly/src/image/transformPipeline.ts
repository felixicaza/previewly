import type { GetPreviewlySrc, PipelineOptions } from '../types.ts'

import { ResizeFilterType, ResizeFit, Transformer } from '@napi-rs/image'

import { brightnessToNapiValue } from './encoder.ts'

export function transformPipeline(src: GetPreviewlySrc, options: PipelineOptions) {
  let pipeline = new Transformer(src)

  if (options.autoOrient) {
    pipeline = pipeline.rotate()
  }

  pipeline = pipeline.resize({
    width: options.size,
    height: options.size,
    filter: ResizeFilterType.Lanczos3,
    fit: ResizeFit.Inside
  })

  if (options.brightness !== 1) {
    pipeline = pipeline.brighten(brightnessToNapiValue(options.brightness))
  }

  if (options.hue !== 0) {
    pipeline = pipeline.huerotate(options.hue)
  }

  if (options.saturation !== 1) {
    // Approximate fallback due to the lack of modulate(saturation)
    pipeline = pipeline.adjustContrast((options.saturation - 1) * 20)
  }

  return pipeline
}
