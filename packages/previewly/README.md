[![previewly](https://raw.githubusercontent.com/felixicaza/previewly/HEAD/.github/assets/previewly.jpg)][website]

# 🏞️ Previewly

[![npm version](https://img.shields.io/npm/v/previewly?color=4dae5f&logo=npm&logoColor=888888&labelColor=ffffff)][package]
[![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/previewly/tests.yml?color=4dae5f&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)](https://github.com/felixicaza/previewly/actions/workflows/tests.yml)
[![license](https://img.shields.io/badge/license-MIT-4dae5f?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/previewly/blob/main/LICENSE)

A lightweight, fast, multi-environment generator of beautiful low-quality image placeholders.

## ✨ Features

- 🖼️ Generates low-quality image placeholders (LQIP) in multiple formats, including Base64, CSS, SVG and color.
- 📂 Supports decoding a wide range of image formats, with configurable output encoding. See [`@napi-rs/image` supported formats](https://image.napi.rs/docs#supported-formats).
- 🌐 Supports multiple environments, including server and browser.
- 🚀 Provides a simple and intuitive API for generating placeholders.
- ⚡ Optimized for performance and speed, making it suitable for production use.

## 📦 Installation

### Node.js

Previewly requires **Node.js 22.23.3 or later**. You can install [`Previewly`][website] with its required peer dependency using npm:

```sh
$ npm install @napi-rs/image previewly
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add @napi-rs/image previewly
  ```

  Using yarn:
  ```sh
  $ yarn add @napi-rs/image previewly
  ```

  Using bun:
  ```sh
  $ bun add @napi-rs/image previewly
  ```
</details>

### Browser

You can install [`Previewly`][website] for browser usage with its required peer dependency using npm:

```sh
$ npm install @napi-rs/image @napi-rs/image-wasm32-wasi buffer previewly
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add @napi-rs/image @napi-rs/image-wasm32-wasi buffer previewly
  ```

  Using yarn:
  ```sh
  $ yarn add @napi-rs/image @napi-rs/image-wasm32-wasi buffer previewly
  ```

  Using bun:
  ```sh
  $ bun add @napi-rs/image @napi-rs/image-wasm32-wasi buffer previewly
  ```
</details>

See the [Installation guide](https://previewly.feli.cc/docs/installation) for more details.

## 🚀 Usage

See the [Usage Guide](https://previewly.feli.cc/docs/usage) for examples of generating placeholders in Node.js and browser applications.

## ⚙️ Options

[`Previewly`][website] accepts options for image orientation, placeholder size and format, brightness, saturation, hue, transparency, and EXIF metadata.

See the [API Reference](https://previewly.feli.cc/docs/reference#getpreviewly) for all options, defaults, and types.

## 🏆 Credits

This project is highly inspired by [@joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder).

## 📝 Knowledge

Other related projects for the LQIP (Low-Quality Image Placeholders) technique:

- [`@zouhir/lqip`](https://github.com/zouhir/lqip): The original LQIP module.
- [`@transitive-bullshit/lqip-modern`](https://github.com/transitive-bullshit/lqip-modern): Modern approach to LQIP using webp and sharp.
- [`@axe312ger/sqip`](https://github.com/axe312ger/sqip): A library for SVG-based LQIP technique.
- [`@woltapp/blurhash`](https://github.com/woltapp/blurhash): A compact representation of a placeholder for an image.
- [`@evanw/thumbhash`](https://github.com/evanw/thumbhash): Alternative to BlurHash with some advantages.
- [`@frzi/lqip-css`](https://github.com/frzi/lqip-css): Demonstrating a pure CSS implementation for LQIP.

Good reading on the topic of LQIP and related techniques:

- [Introducing LQIP – Low Quality Image Placeholders](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)
- [How to use SVG as a Placeholder, and Other Image Loading Techniques](https://www.freecodecamp.org/news/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c/)
- [The Ultimate Low-Quality Image Placeholder Technique](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/)

<!-- ## 📚 Related Projects -->

## 🤝 Contributing

Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request. I appreciate your help in making [`Previewly`][website] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/previewly/blob/main/CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/previewly/blob/main/LICENSE) file for details.

[website]: https://previewly.feli.cc/
[package]: https://npmx.dev/package/previewly
