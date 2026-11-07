export const publicPaths = ['/', '/web-development', '/moysklad', '/design'] as const

export function publicPath(path: string, baseURL = '/', trailingSlash = false): string {
  const base = '/' + baseURL.split('/').filter(Boolean).join('/')
  const suffix = path === '/' ? '/' : '/' + path.replace(/^\/+/, '')
  const result = (base === '/' ? '' : base) + suffix
  return trailingSlash && !result.endsWith('/') && !result.split('/').at(-1)?.includes('.') ? result + '/' : result
}

export function siteRoot(value: unknown, baseURL = '/'): string | undefined {
  const origin = siteOrigin(value)
  return origin ? origin + publicPath('/', baseURL) : undefined
}

export function siteOrigin(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') return
    if (!url.hostname.includes('.') || /(^localhost$|\.localhost$|\.local$|^127\.|^0\.|^\[|^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\.)/i.test(url.hostname)) return
    return url.origin
  } catch { return }
}

export function allowsIndexing(config: { siteUrl?: unknown; indexable?: unknown }): boolean {
  return Boolean(siteOrigin(config.siteUrl)) && (config.indexable === true || config.indexable === 'true')
}

export function telegramLink(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return
  const username = value.trim().replace(/^https:\/\/t\.me\//, '').replace(/^@/, '')
  return /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(username) ? `https://t.me/${username}` : undefined
}

export function emailLink(value: unknown): string | undefined {
  return typeof value === 'string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value.trim())
    ? `mailto:${value.trim()}` : undefined
}
