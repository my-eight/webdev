import { allowsIndexing, publicPath, publicPaths, siteOrigin } from '../../shared/utils/site'

export default defineEventHandler((event) => {
  const runtime = useRuntimeConfig(event)
  const config = runtime.public
  if (!allowsIndexing(config)) throw createError({ statusCode: 404, message: 'Карта сайта недоступна в режиме предпросмотра' })
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const origin = siteOrigin(config.siteUrl)!
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(path => `<url><loc>${origin}${publicPath(path, runtime.app.baseURL, config.trailingSlash)}</loc></url>`).join('')}</urlset>`
})
