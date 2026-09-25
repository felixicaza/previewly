[![previewly](https://raw.githubusercontent.com/felixicaza/previewly/HEAD/.github/assets/previewly.jpg)][website]

# 📚 Previewly Documentation

[![npm version](https://img.shields.io/npm/v/previewly?color=4dae5f&logo=npm&logoColor=888888&labelColor=ffffff)][package]
[![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/previewly/tests.yml?color=4dae5f&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)](https://github.com/felixicaza/previewly/actions/workflows/tests.yml)
[![license](https://img.shields.io/badge/license-MIT-4dae5f?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/previewly/blob/main/LICENSE)

Source code for the [Previewly documentation website](https://previewly.feli.cc/).

The documentation explains how to install, configure, and use [Previewly], a lightweight, fast, multi-environment generator of beautiful low-quality image placeholders.

## 🧰 Tech Stack

- [Astro](https://astro.build/)
- [Starlight](https://starlight.astro.build/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Workers](https://www.cloudflare.com/products/workers/)

## 📋 Requirements

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

The documentation is part of the [Previewly] pnpm monorepo.

## 🚀 Getting Started

Install the project dependencies from the repository root:

```sh
pnpm install
```

The development server will be available at http://localhost:4321

## ⚙️ Available Commands

Run these commands from the [docs](./) directory:

```sh
pnpm dev       # Start the development server
pnpm build     # Generate the production build
pnpm preview   # Preview the production build locally
```

The generated site is written to `docs/dist`.

## 📝 Adding Documentation

Add Markdown or MDX pages under [docs/src/content/docs/](./src/content/docs/).

Each page should include frontmatter:

```astro
---
title: Page title
description: Short page description
---
```

When adding a page to a section, update the sidebar in [astro.config.ts](./astro.config.ts).

## ✏️ Editing Documentation

To edit an existing documentation page, open the corresponding Markdown or MDX file under [docs/src/content/docs/](./src/content/docs/).

When editing a page:
- Keep the frontmatter title and description accurate.
- Preserve the existing Markdown or MDX structure unless the page requires a larger change.
- Update code examples when the public API changes.
- Verify that internal links point to the correct documentation routes.
- Keep terminology and formatting consistent with the surrounding pages.
- Update the sidebar or related links when changing the page structure.
- Run the documentation build to check for broken links, invalid frontmatter or MDX errors.

## 🤝 Contributing

Before opening a pull request, run the following commands from the repository root:

```sh
pnpm lint
pnpm typecheck
```

Then validate the documentation build:

```sh
cd docs
pnpm build
```

Documentation improvements and corrections are welcome. See [CONTRIBUTING.md](https://github.com/felixicaza/previewly/blob/main/CONTRIBUTING.md) for the contribution guidelines.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/previewly/blob/main/LICENSE) file for details.

[Previewly]: https://github.com/felixicaza/previewly
[website]: https://previewly.feli.cc/
[package]: https://npmx.dev/package/previewly
