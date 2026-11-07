import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { pagesEnv } from './pages-env.mjs'

export async function build(pages = false) {
  const env = pages ? pagesEnv() : { ...process.env, WEBDEV_BUILD_MODE: 'server', NITRO_PRESET: 'node-server' }
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url)), 'build'], {
      cwd: fileURLToPath(new URL('../', import.meta.url)), env,
      stdio: 'inherit', windowsHide: true,
    })
    child.on('error', reject)
    child.on('exit', code => resolve(code ?? 1))
  })
  if (code !== 0) { process.exitCode = code; return }
  if (pages) await writeFile(new URL('../.output-pages/public/.nojekyll', import.meta.url), '')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build()
