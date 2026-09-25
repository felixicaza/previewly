---
title: Resources
description: Explore LQIP projects, image-loading techniques, and articles about progressive image loading.
---

If you'd like to learn more about **Low-Quality Image Placeholders (LQIP)** and related image loading techniques, this page collects some useful projects and articles worth exploring.

## Related projects

Previewly is part of a broader ecosystem of libraries that aim to improve the perceived loading experience of images. While each project takes a different approach, they’re all useful sources of inspiration.

- [**@zouhir/lqip**](https://github.com/zouhir/lqip)
The original LQIP module that popularized the technique in the JavaScript ecosystem.

- [**@transitive-bullshit/lqip-modern**](https://github.com/transitive-bullshit/lqip-modern)
A modern implementation built around WebP and Sharp for generating compact image placeholders.

- [**@axe312ger/sqip**](https://github.com/axe312ger/sqip)
Generates artistic SVG placeholders by approximating images with simple vector shapes.

- [**@woltapp/blurhash**](https://github.com/woltapp/blurhash)
Encodes an image into a compact string that can be decoded into a blurred placeholder on the client.

- [**@evanw/thumbhash**](https://github.com/evanw/thumbhash)
An alternative to BlurHash that produces compact placeholders while preserving aspect ratio and transparency.

- [**@frzi/lqip-css**](https://github.com/frzi/lqip-css)
An implementation that recreates placeholders entirely with CSS gradients.

---

## Further reading

If you're interested in the ideas behind image placeholders and progressive image loading, these articles provide an excellent introduction.

- [**Introducing LQIP – Low Quality Image Placeholders**](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)
  Learn about the origins of the LQIP technique and why it improves perceived loading performance.

- [**How to use SVG as a Placeholder, and Other Image Loading Techniques**](https://www.freecodecamp.org/news/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c/)
  An overview of different placeholder strategies, including SVG-based approaches.

- [**The Ultimate Low-Quality Image Placeholder Technique**](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/)
  A deep dive into modern LQIP techniques and their impact on Core Web Vitals and Largest Contentful Paint (LCP).

---

## Inspiration

Previewly was heavily inspired by [**Plaiceholder**](http://plaiceholder.co/), a fantastic project that generates image placeholders.

The goal of Previewly is not to reinvent the idea of **LQIP**, but to provide a lightweight, fast, multi-environment implementation with a simple developer experience.
