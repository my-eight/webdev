import process from 'node:process'
import { allowsIndexing, publicPath, publicPaths } from './shared/utils/site'

const isGitHubPages = process.env.NITRO_PRESET === 'github_pages'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-07',
  devtools: { enabled: false },
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
      indexable: false,
      trailingSlash: isGitHubPages,
      slavaTelegram: '',
      slavaEmail: '',
      erinTelegram: '',
      erinEmail: '',
    },
  },
  typescript: { strict: true },
  nitro: {
    preset: isGitHubPages ? 'github_pages' : 'node-server',
    compressPublicAssets: true,
    ...(isGitHubPages ? { prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [...publicPaths, '/robots.txt', ...(allowsIndexing({ siteUrl: process.env.NUXT_PUBLIC_SITE_URL, indexable: process.env.NUXT_PUBLIC_INDEXABLE }) ? ['/sitemap.xml'] : [])],
    } } : {}),
  },
})
