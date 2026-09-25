# Contributing to Previewly

I'm excited that you are interested in contributing to this repository! This guide will help you get started with your contributions.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Working on the Documentation](#working-on-the-documentation)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Getting Help](#getting-help)

## How to Contribute

There are several ways you can contribute to this project:

1. **Reporting Bugs**: If you find a bug, please report it by [creating an issue](https://github.com/felixicaza/previewly/issues).
2. **Suggesting Features**: If you have an idea for a new feature, please open an [discussion](https://github.com/felixicaza/previewly/discussions).
3. **Improving Documentation**: Help improve documentation ([README.md](./README.md) or [Documentation website](https://previewly.feli.cc/)) by making it clearer and more comprehensive.
4. **Submitting Code Changes**: If you want to fix a bug or implement a new feature, follow the steps below to submit your changes.

## Setting Up Your Development Environment

1. **Fork the repository**:
    Click the [Fork button](https://github.com/felixicaza/previewly/fork) at the top right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone your fork**:
    ```sh
    git clone https://github.com/yourusername/previewly.git
    ```

3. **Install dependencies**:
    Use [pnpm](https://pnpm.io/installation) as package manager. Install the project dependencies:
    ```sh
    pnpm install
    ```

4. **Create a new branch**:
    ```sh
    git checkout -b your-branch-name
    ```

## Working on the Documentation

The documentation website is located in the `docs` folder and uses [Astro Starlight](https://starlight.astro.build/).

### Starting the Documentation Website

From the repository root, move to the documentation directory:

```
cd docs
```

Start the development server:

```sh
pnpm dev
```

The site will be available at http://localhost:4321.

### Adding Documentation

Add Markdown or MDX pages under [docs/src/content/docs/](./src/content/docs/).

Each page should include frontmatter:

```astro
---
title: Page title
description: Short page description
---
```

When adding a page to a section, update the sidebar in [astro.config.ts](./astro.config.ts).

### Editing Documentation

To edit an existing documentation page, open the corresponding Markdown or MDX file under [docs/src/content/docs/](./src/content/docs/).

When editing a page:
- Keep the frontmatter title and description accurate.
- Preserve the existing Markdown or MDX structure unless the page requires a larger change.
- Update code examples when the public API changes.
- Verify that internal links point to the correct documentation routes.
- Keep terminology and formatting consistent with the surrounding pages.
- Update the sidebar or related links when changing the page structure.
- Run the documentation build to check for broken links, invalid frontmatter or MDX errors.

The documentation package provides the following commands:
- `pnpm dev`: Starts the development server.
- `pnpm build`: Generates the production build.
- `pnpm preview`: Previews the production build locally.

## Submitting Changes

1. **Make your changes**:
    Ensure your changes follow the project's coding standards, preserve the existing structure and passes all tests.

2. **Validate your changes**:
    Run the project checks from the repository root:
    ```sh
    pnpm lint
    pnpm typecheck
    ```
    If you only changed the documentation, build the documentation website:
    ```sh
    cd docs
    pnpm build
    ```

3. **Commit your changes**:
    ```sh
    git add .
    git commit -m "Description of your changes"
    ```

3. **Push your changes to your fork**:
    ```sh
    git push origin your-branch-name
    ```

4. **Create a Pull Request**:
    Go to the original repository and click the **New Pull Request** button. Provide a clear and descriptive title and description for your pull request.

## Reporting Issues

If you encounter any issues while using the plugins, please report them by [creating an issue](https://github.com/felixicaza/previewly/issues) in the repository. Provide as much detail as possible to help us understand and resolve the issue quickly.

## Getting Help

If you need help or have any questions, feel free to open an issue or start a [discussion](https://github.com/felixicaza/previewly/discussions). I'm here to help!
