---
title: Overview
description: Generate lightweight image placeholders in Base64, CSS, SVG, or dominant color for Node.js and browser applications.
---

**Previewly** is a lightweight library for generating beautiful image placeholders that can be displayed while the original image is loading. It helps improve the perceived loading experience by replacing empty spaces or loading spinners with a small preview that closely resembles the final image.

Designed with performance in mind, Previewly is fast, easy to use, and works across multiple JavaScript environments, including [Node.js](https://nodejs.org/) and modern browsers. It exposes a simple API that takes an image as input and generates everything you need to render a placeholder in a single call.

## What does Previewly generate?

Previewly returns multiple placeholder representations so you can choose the one that best fits your application:

- **Base64** data URLs for quick image previews.
- **CSS** gradients that recreate the image using pure CSS.
- **SVG** placeholders for lightweight and scalable rendering.
- **Dominant color** extraction for simple color-based placeholders.

For more details, see [API Reference](/docs/reference).

## Why use Previewly?

Whether you're building a portfolio, an e-commerce platform, a blog, or any image-heavy application, Previewly helps you deliver a smoother visual experience without adding unnecessary complexity.

Some of its key advantages include:

- Fast placeholder generation optimized for production workloads.
- Support for a wide range of image formats through [`@napi-rs/image`](https://image.napi.rs/).
- Runs in both server and browser environments.
- Small, intuitive API with sensible defaults.
- Configurable output, including placeholder size, image format, color adjustments, EXIF handling, and more.

## How does it work?

Using Previewly is straightforward:

1. Provide an image as a buffer.
2. Generate the placeholder with [`getPreviewly()`](/docs/reference#getpreviewly).
3. Render the returned Base64, CSS, SVG, or dominant color while the original image loads.

That's it! No complicated setup or additional processing pipeline is required.

## Next steps

If you're ready to get started, continue with the [**Installation**](/docs/installation) guide to add Previewly to your project, then head over to [**Usage**](/docs/usage) to generate your first image placeholder.
