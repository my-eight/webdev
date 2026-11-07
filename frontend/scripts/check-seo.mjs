import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const routes = ['/', '/web-development', '/moysklad', '/design']
const origin = 'https://services.example.test'
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]))
function meta(head, key) {
  const found = [...head.matchAll(/<meta\b[^>]*>/g)].map(match => attrs(match[0])).filter(tag => tag.name === key || tag.property === key)
  assert.equal(found.length, 1, `Expected one ${key} meta tag`)
  return found[0].content
}
async function freePort() {
  const server = createServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  await new Promise(resolve => server.close(resolve))
  return port
}
async function checkMode(mode) {
  const port = await freePort()
  const isPublic = mode === 'public'
  let logs = ''
  const child = spawn(process.execPath, ['.output/server/index.mjs'], {
    cwd: root,
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), NITRO_HOST: '127.0.0.1', NITRO_PORT: String(port),
      NODE_ENV: 'production', NUXT_PUBLIC_SITE_URL: isPublic ? origin : '', NUXT_PUBLIC_INDEXABLE: String(isPublic),
      NUXT_PUBLIC_SLAVA_TELEGRAM: '', NUXT_PUBLIC_SLAVA_EMAIL: '', NUXT_PUBLIC_ERIN_TELEGRAM: '', NUXT_PUBLIC_ERIN_EMAIL: '',
    },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  })
  child.stdout.on('data', chunk => { logs += chunk })
  child.stderr.on('data', chunk => { logs += chunk })
  child.on('error', error => { logs += error.message })
  const base = `http://127.0.0.1:${port}`
  try {
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      try { await fetch(base, { signal: AbortSignal.timeout(1000) }); ready = true; break } catch {}
      if (child.exitCode !== null) break
      await pause(150)
    }
    assert.ok(ready, `Server failed to start: ${logs.slice(-2000)}`)
    const documents = new Map()
    const titles = new Set()
    const descriptions = new Set()
    for (const path of routes) {
      const response = await fetch(base + path)
      assert.equal(response.status, 200, path)
      const html = await response.text()
      documents.set(path, html)
      const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1] || ''
      const title = head.match(/<title>([^<]+)<\/title>/)?.[1]
      assert.ok(title && title.length > 15 && title.length < 85, `Title: ${path}`)
      titles.add(title)
      const description = meta(head, 'description')
      assert.ok(description.length >= 90 && description.length <= 220, `Description: ${path}`)
      descriptions.add(description)
      assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1: ${path}`)
      assert.match(html, /<html[^>]*lang="ru"/)
      assert.match(html, /<main\b/)
      assert.match(html, /id="contact"/)
      assert.match(html, path === '/design' ? /Эрин/ : /Слава/)
      assert.equal(meta(head, 'og:title'), title)
      assert.equal(meta(head, 'og:description'), description)
      assert.equal(meta(head, 'og:locale'), 'ru_RU')
      assert.equal(meta(head, 'twitter:card'), 'summary_large_image')
      const canonical = [...head.matchAll(/<link\b[^>]*>/g)].map(match => attrs(match[0])).filter(tag => tag.rel === 'canonical')
      if (isPublic) {
        assert.equal(canonical.length, 1)
        assert.equal(canonical[0].href, origin + path)
        assert.match(meta(head, 'robots'), /^index, follow/)
        assert.equal(meta(head, 'og:url'), origin + path)
        const imagePath = `/social/${path.slice(1) || 'home'}.png`
        assert.equal(meta(head, 'og:image'), origin + imagePath)
        const image = await fetch(base + imagePath)
        assert.equal(image.status, 200)
        const png = Buffer.from(await image.arrayBuffer())
        assert.equal(png.readUInt32BE(16), 1200)
        assert.equal(png.readUInt32BE(20), 630)
        const schemas = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
        assert.equal(schemas.length, 1)
        const graph = schemas[0]['@graph']
        assert.equal(schemas[0]['@context'], 'https://schema.org')
        assert.ok(graph.some(item => item['@type'] === 'WebPage' && item.url === origin + path))
        if (path !== '/') {
          const service = graph.find(item => item['@type'] === 'Service')
          const person = graph.find(item => item['@type'] === 'Person')
          assert.ok(service && person)
          assert.equal(service.provider['@id'], person['@id'])
          assert.equal(person.name, path === '/design' ? 'Эрин Вишневская' : 'Слава')
          assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList'))
        }
        const queried = await (await fetch(base + path + '?utm_source=check')).text()
        assert.ok(queried.includes(`rel="canonical" href="${origin + path}"`))
      } else {
        assert.equal(canonical.length, 0, 'No fictitious canonical in local preview')
        assert.equal(meta(head, 'robots'), 'noindex, nofollow')
        assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow')
      }
    }
    assert.equal(titles.size, routes.length, 'Unique page titles')
    assert.equal(descriptions.size, routes.length, 'Unique page descriptions')
    // Inspect server HTML, including links to sections on other public pages.
    for (const [path, html] of documents) {
      for (const match of html.matchAll(/<a\b[^>]*href="([^"?]*)"[^>]*>/g)) {
        const href = match[1].replaceAll('&amp;', '&')
        if (!href.startsWith('/') && !href.startsWith('#')) continue
        if (href.startsWith('//')) continue
        const [targetPath, hash] = href.split('#')
        const target = documents.get(targetPath || path)
        assert.ok(target, `Broken internal route ${href} on ${path}`)
        if (hash) assert.ok(target.includes(`id="${hash}"`), `Broken anchor ${href} on ${path}`)
      }
    }
    const design = documents.get('/design')
    const order = ['process', 'pricing', 'services', 'situation', 'deliverables', 'projects', 'about', 'faq', 'contact'].map(id => design.indexOf(`id="${id}"`))
    assert.ok(order.every((offset, i) => offset >= 0 && (!i || offset > order[i - 1])), 'Design section order')
    const missing = await fetch(base + '/not-a-real-page', { headers: { Accept: 'text/html' } })
    assert.equal(missing.status, 404)
    assert.match(await missing.text(), /noindex, nofollow/)
    const redirect = await fetch(base + '/design/?utm_source=check', { redirect: 'manual' })
    assert.equal(redirect.status, 308)
    assert.equal(redirect.headers.get('location'), '/design?utm_source=check')
    const robots = await (await fetch(base + '/robots.txt')).text()
    const sitemap = await fetch(base + '/sitemap.xml')
    if (isPublic) {
      assert.match(robots, /Allow: \//)
      assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
      assert.equal(sitemap.status, 200)
      const xml = await sitemap.text()
      assert.equal((xml.match(/<loc>/g) || []).length, routes.length)
      for (const path of routes) assert.ok(xml.includes(`<loc>${origin}${path}</loc>`))
    } else {
      assert.match(robots, /Disallow: \//)
      assert.equal(sitemap.status, 404)
    }
    console.log(`PASS ${mode}: 4 SSR pages, metadata, headings, links, section order, 404, redirects, robots, sitemap${isPublic ? ', schema and social images' : ''}`)
  } finally {
    child.kill()
    for (let attempt = 0; attempt < 30 && child.exitCode === null && child.signalCode === null; attempt++) await pause(100)
  }
}

await access(new URL('../.output/server/index.mjs', import.meta.url))
await checkMode('preview')
await checkMode('public')
