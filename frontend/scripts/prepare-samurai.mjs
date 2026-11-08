import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

assert.ok(process.argv[2], 'Usage: node scripts/prepare-samurai.mjs <source-directory>')
const directory = resolve(process.argv[2])
const output = new URL('../public/images/samurai/', import.meta.url)
await mkdir(output, { recursive: true })
const manifest = {}
const generated = new Set()
for (const name of ['development', 'moysklad', 'design']) {
  const source = await readFile(resolve(directory, `${name}.png`))
  const metadata = await sharp(source).metadata()
  assert.ok(metadata.hasAlpha, `${name}: preserve the transparent cutout`)
  const fingerprint = createHash('sha256').update(source).digest('hex').slice(0, 10)
  const images = []
  for (const width of [480, 800, metadata.width]) {
    const filename = `${name}-${fingerprint}-${width}.webp`
    generated.add(filename)
    const info = await sharp(source).resize({ width, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 }).toFile(fileURLToPath(new URL(filename, output)))
    images.push({ path: `images/samurai/${filename}`, width: info.width, height: info.height, bytes: info.size })
  }
  manifest[name] = { images }
  console.log(`${name}: ${images.map(image => `${image.width}px / ${Math.round(image.bytes / 1024)}KiB`).join(', ')}`)
}
await writeFile(new URL('../app/data/samurai-assets.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n')
// Remove only obsolete derivatives owned by this generator, after the new set is complete
for (const filename of await readdir(output)) {
  if (/^(development|moysklad|design)-[a-f0-9]{10}-(480|800|1200|1312)\.webp$/.test(filename) && !generated.has(filename)) {
    await unlink(new URL(filename, output))
  }
}
