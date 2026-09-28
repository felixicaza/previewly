import type { Transformer } from '@napi-rs/image'
import type { PipelineOptions } from '../types.ts'

import { ResizeFit } from '@napi-rs/image'

import { brightnessToNapiValue } from './encoder.ts'

export function transformPipeline(pipeline: Transformer, options: PipelineOptions) {
  let transformer = pipeline

  if (options.autoOrient) {
    transformer = transformer.rotate()
  }

  transformer = transformer.fastResize({
    width: options.size,
    height: options.size,
    fit: ResizeFit.Inside
  })

  if (options.brightness !== 1) {
    transformer = transformer.brighten(brightnessToNapiValue(options.brightness))
  }

  if (options.hue !== 0) {
    transformer = transformer.huerotate(options.hue)
  }

  if (options.saturation !== 1) {
    // Approximate fallback due to the lack of modulate(saturation)
    transformer = transformer.adjustContrast((options.saturation - 1) * 20)
  }

  return transformer
}
