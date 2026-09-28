---
title: Benchmark
description: Benchmark Previewly to see how fast low-quality placeholder generation can be.
---

Previewly is designed to generate high-quality placeholders with as little processing time as possible. The library focuses on keeping latency low while maintaining visually pleasing results, making it well suited for production environments and image-heavy applications.

## Analysis

To evaluate its performance, Previewly was benchmarked against [**Plaiceholder**](https://plaiceholder.co/) using the same input images and **100 samples per test case**.

| Image | Size | Previewly | Plaiceholder | Speedup |
| --- | ---: | ---: | ---: | ---: |
| [`landscape-exif.jpg`][fixtures] | 339.19 KiB | ~73 ms | ~120 ms | **1.6×** |
| [`pexels-fabianwiktor-3470872.jpg`][fixtures] | 798.19 KiB | ~594 ms | ~866 ms | **1.5×** |
| [`portrait-exif.jpg`][fixtures] | 239.93 KiB | ~59 ms | ~122 ms | **2.1×** |
| [`transparent.png`][fixtures] | 2.03 MiB | ~61 ms | ~318 ms | **5.2×** |

Across all benchmarked images, Previewly consistently achieved lower latency than Plaiceholder, with speed improvements ranging from **1.5×** to **5.2×**, depending on the image characteristics.

## Why is it faster?

Previewly is built with performance as a primary goal.

Some of the factors that contribute to its speed include:

- A lightweight processing pipeline with minimal overhead.
- Efficient image decoding powered by [`@napi-rs/image`](https://image.napi.rs/).
- Optimized placeholder generation algorithms.
- A simple API that avoids unnecessary processing steps.

The result is a library that can generate placeholders quickly enough for production workloads without sacrificing output quality.

## Benchmark details

The reported numbers represent average execution times collected over **100 runs** for each image.

Performance can vary depending on several factors, including:

- CPU architecture
- Available system resources
- JavaScript runtime and version
- Input image dimensions
- Image format and compression

Because of these variables, your results may differ from the benchmark presented here.

## Reproducing the benchmarks

The complete benchmark implementation, test images, and raw results are available in the project's [`benchmark`](https://github.com/felixicaza/previewly/tree/main/benchmark) directory.

If you'd like to compare Previewly against other libraries or test it on your own hardware, you can run the benchmark suite locally.

[fixtures]: https://github.com/felixicaza/previewly/tree/main/packages/previewly/tests/fixtures
