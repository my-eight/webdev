import { allowsIndexing, siteRoot } from '../../shared/utils/site'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  const runtime = useRuntimeConfig(event)
  const config = runtime.public
  return allowsIndexing(config)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteRoot(config.siteUrl, runtime.app.baseURL)}sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
})
