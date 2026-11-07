import { allowsIndexing, publicPath, publicPaths } from '../../shared/utils/site'

export default defineEventHandler((event) => {
  const runtime = useRuntimeConfig(event)
  const base = publicPath('/', runtime.app.baseURL)
  const requestPath = getRequestURL(event).pathname
  const path = base !== '/' && requestPath.startsWith(base) ? '/' + requestPath.slice(base.length) : requestPath
  const trimmed = path.length > 1 ? path.replace(/\/+$/, '') : path
  if (!runtime.public.trailingSlash && path !== trimmed && publicPaths.some(page => page === trimmed)) {
    const query = getRequestURL(event).search
    return sendRedirect(event, publicPath(trimmed, runtime.app.baseURL) + query, 308)
  }
  if (!allowsIndexing(runtime.public)) {
    setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }
})
