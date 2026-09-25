import { defineConfig } from 'astro/config'

import starlight from '@astrojs/starlight'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightLlmsTxt from 'starlight-llms-txt'
import { satteri } from '@astrojs/markdown-satteri'
import htmlMinifier from 'astro-html-minifier-next'
import compressor from 'astro-compressor'

import satteriExternalLinks from 'satteri-external-links'

const DEV_URL = 'http://localhost:4321'
const DOMAIN_URL = 'https://previewly.feli.cc'
const SITE = import.meta.env.DEV === true ? DEV_URL : DOMAIN_URL
const OG_IMAGE_URL = String(new URL('/og.png', SITE))

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  compressHTML: false,
  prefetch: {
    prefetchAll: true
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@napi-rs/image', '@napi-rs/image-wasm32-wasi']
    }
  },
  markdown: {
    processor: satteri({
      hastPlugins: [
        satteriExternalLinks({
          rel: ['noopener', 'noreferrer'],
          target: '_blank'
        })
      ]
    })
  },
  integrations: [
    starlight({
      plugins: [starlightCatppuccin(), starlightLlmsTxt()],
      customCss: ['./src/styles/index.css', './src/styles/playground.css'],
      favicon: '/favicon.png',
      lastUpdated: true,
      title: 'Previewly',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Previewly Logo'
      },
      editLink: {
        baseUrl: 'https://github.com/felixicaza/previewly/edit/main/docs/'
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: OG_IMAGE_URL
          }
        },
        /**
         * Force Dark mode
         * @see https://github.com/withastro/starlight/discussions/949
         */
        {
          tag: 'script',
          content: 'document.documentElement.setAttribute("data-theme", "dark")'
        }
      ],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        Footer: './src/components/starlight/Footer.astro',
        /**
         * Force Dark mode
         * @see https://github.com/withastro/starlight/discussions/949
         */
        ThemeProvider: './src/components/starlight/OverrideThemeMode.astro',
        ThemeSelect: './src/components/starlight/OverrideThemeMode.astro'
      },
      social: [
        {
          icon: 'github',
          label: 'Star on GitHub',
          href: 'https://github.com/felixicaza/previewly'
        }
      ],
      sidebar: [
        {
          label: 'Overview',
          link: '/docs'
        },
        {
          label: 'Getting Started',
          items: [
            'docs/installation',
            'docs/usage'
          ]
        },
        {
          label: 'Guides',
          items: [
            'docs/placeholder',
            'docs/resources'
          ]
        },
        {
          label: 'API Reference',
          link: 'docs/reference'
        }
      ]
    }),
    htmlMinifier({
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      maxLineLength: 0,
      mergeScripts: true,
      minifyCSS: true,
      minifyJS: {
        compress: {
          arguments: true,
          // oxlint-disable-next-line eslint-js/camelcase
          drop_console: true
        },
        format: {
          comments: false,
          // oxlint-disable-next-line eslint-js/camelcase
          indent_level: 2
        },
        ecma: 2023,
        toplevel: true
      },
      minifySVG: {
        plugins: ['preset-default', 'removeXMLNS']
      },
      minifyURLs: true,
      noNewlinesBeforeTagClose: true,
      removeComments: true,
      removeDefaultTypeAttributes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassNames: true,
      useShortDoctype: true
    }),
    compressor()
  ]
})
