import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { allowsIndexing, publicPath, publicPaths } from './shared/utils/site'
import { publicContacts } from './shared/config/contacts'

const isGitHubPages = process.env.NITRO_PRESET === 'github_pages'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const buildMode = isGitHubPages ? 'pages' : process.env.WEBDEV_BUILD_MODE === 'server' ? 'server' : 'dev'
const buildDir = buildMode === 'dev' ? '.nuxt' : `.nuxt-${buildMode}`

export default defineNuxtConfig({
  compatibilityDate: '2026-11-07',
  devtools: { enabled: false },
  buildDir,
  typesDir: buildDir,
  vite: { cacheDir: `.cache/nuxt/${buildMode}` },
  ssr: true,
  features: { inlineStyles: false },
  css: [
    '@fontsource-variable/manrope/wght.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/global.css',
  ],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [{ name: 'theme-color', content: '#F7F4EC' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: publicPath('/favicon.svg', baseURL) }],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: '',
      // Keep closed until production deployment and the full SEO/GEO text review are complete.
      indexable: false,
      trailingSlash: isGitHubPages,
      slavaPhone: publicContacts.slava.phone,
      slavaTelegram: publicContacts.slava.telegram,
      slavaEmail: publicContacts.slava.email,
      erinPhone: publicContacts.erin.phone,
      erinTelegram: publicContacts.erin.telegram,
      erinEmail: publicContacts.erin.email,
    },
  },
  typescript: { strict: true },
  nitro: {
    preset: isGitHubPages ? 'github_pages' : 'node-server',
    output: { dir: isGitHubPages ? '.output-pages' : '.output' },
    // Nuxt supplies file: URLs for its prerender storage driver on Windows.
    // Rollup needs a filesystem ID to bundle that module instead of externalizing it.
    ...(process.platform === 'win32' ? { rollupConfig: { plugins: [{
      name: 'resolve-windows-file-urls',
      resolveId(source: string) {
        if (source.startsWith('file:')) return fileURLToPath(source).replaceAll('\\', '/')
      },
    }] } } : {}),
    compressPublicAssets: true,
    ...(isGitHubPages ? { prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [...publicPaths, '/robots.txt', ...(allowsIndexing({ siteUrl: process.env.NUXT_PUBLIC_SITE_URL, indexable: process.env.NUXT_PUBLIC_INDEXABLE }) ? ['/sitemap.xml'] : [])],
    } } : {}),
  },
})
