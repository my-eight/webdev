import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, relative, sep } from 'node:path'

const output = fileURLToPath(new URL('../.output/public/', import.meta.url))
const base = '/' + (process.env.NUXT_APP_BASE_URL || '/').split('/').filter(Boolean).join('/')
const prefix = base === '/' ? '/' : base + '/'
const origin = process.env.NUXT_PUBLIC_SITE_URL || ''
const indexable = process.env.NUXT_PUBLIC_INDEXABLE === 'true'
const routes = ['/', '/web-development', '/moysklad', '/design']
const documents = new Map()
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2].replaceAll('&amp;', '&')]))
const publicRoute = path => prefix + (path === '/' ? '' : path.slice(1) + '/')
const titles = new Set()
const descriptions = new Set()

async function fileFor(pathname) {
  assert.ok(pathname.startsWith(prefix), `Ресурс или ссылка вне базового пути: ${pathname}`)
  const local = resolve(output, '.' + sep + decodeURIComponent(pathname.slice(prefix.length)))
  assert.ok(!relative(output, local).startsWith('..'), `Путь вне каталога сайта: ${pathname}`)
  for (const candidate of [local, resolve(local, 'index.html'), local + '.html']) {
    try { const value = await readFile(candidate); return { path: candidate, value } } catch (error) {
      if (!['ENOENT', 'EISDIR', 'EPERM'].includes(error.code)) throw error
    }
  }
  assert.fail(`Отсутствует локальный файл для ${pathname}`)
}

for (const path of routes) {
  const { value } = await fileFor(publicRoute(path))
  const html = value.toString('utf8')
  documents.set(path, html)
  assert.match(html, /<html[^>]*lang="ru"/)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Один H1: ${path}`)
  assert.ok(html.includes('id="contact"'), `Контактный блок: ${path}`)
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1] || ''
  const title = head.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title?.length > 15, `Заголовок: ${path}`)
  titles.add(title)
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(match => attributes(match[0]))
  const meta = key => metas.find(tag => tag.name === key || tag.property === key)?.content
  assert.ok(meta('description')?.length > 90)
  descriptions.add(meta('description'))
  assert.match(meta('robots'), indexable ? /^index, follow/ : /^noindex, nofollow/)
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]))
  if (origin) {
    const canonical = links.find(tag => tag.rel === 'canonical')?.href
    assert.equal(canonical, origin + publicRoute(path))
    assert.equal(meta('og:url'), canonical)
    assert.equal(meta('og:image'), origin + prefix + `social/${path.slice(1) || 'home'}.png`)
    const schemas = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    assert.equal(schemas.length, 1)
    const graph = schemas[0]['@graph']
    assert.ok(graph.some(item => item['@type'] === 'WebSite' && item.url === origin + prefix))
    assert.ok(graph.some(item => item['@type'] === 'WebPage' && item.url === canonical))
    if (path !== '/') assert.ok(graph.some(item => item['@type'] === 'Service' && item.url === canonical))
  }
  for (const tagMatch of html.matchAll(/<(?:script|link|img)\b[^>]*>/g)) {
    const tag = attributes(tagMatch[0])
    const target = tag.src || tag.href
    if (!target || !target.startsWith('/') || target.startsWith('//')) continue
    const url = new URL(target, 'https://static-check.example')
    const resource = await fileFor(url.pathname)
    if (tag.rel === 'stylesheet') {
      for (const cssUrl of resource.value.toString('utf8').matchAll(/url\(["']?([^\s\)"']+)["']?\)/g)) {
        if (/^(data:|https?:)/.test(cssUrl[1])) continue
        await fileFor(new URL(cssUrl[1], url).pathname)
      }
    }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const href = match[1].replaceAll('&amp;', '&')
    if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith('//')) continue
    const url = new URL(href, 'https://static-check.example' + publicRoute(path))
    const target = await fileFor(url.pathname)
    if (url.hash) assert.ok(target.value.toString('utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Неверный якорь: ${href}`)
  }
}
assert.equal(titles.size, routes.length)
assert.equal(descriptions.size, routes.length)
const home = documents.get('/')
assert.ok(!home.includes('С кем обсудить задачу'))
assert.ok(!home.includes('Эрин'))
const design = documents.get('/design')
assert.ok(design.includes('Эрин'))
assert.ok(!design.includes('03 / Графический'))
const order = ['process', 'pricing', 'services', 'situation', 'deliverables', 'projects', 'about', 'faq', 'contact'].map(id => design.indexOf(`id="${id}"`))
assert.ok(order.every((value, i) => value >= 0 && (!i || value > order[i - 1])))
await access(resolve(output, '.nojekyll'))
await access(resolve(output, '404.html'))
const robots = (await readFile(resolve(output, 'robots.txt'), 'utf8'))
assert.match(robots, indexable ? /Allow: \// : /Disallow: \//)
if (indexable) {
  const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8')
  for (const path of routes) assert.ok(sitemap.includes(`<loc>${origin}${publicRoute(path)}</loc>`))
}
const artifactFiles = await readdir(output, { recursive: true })
assert.ok(!artifactFiles.some(file => /(^|[\\/])(?:node_modules|\.git|\.env)([\\/]|$)|\.md$/i.test(file)), 'В артефакте не должно быть исходников, настроек или Markdown')
console.log(`Проверено: 4 готовые HTML-страницы, метаданные, JSON-LD, ссылки и якоря, ресурсы с базовым путём ${prefix}, robots, 404 и отсутствие внутренних документов.`)
