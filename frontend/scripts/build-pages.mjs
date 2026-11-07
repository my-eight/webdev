import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const child = spawn(process.execPath, [fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url)), 'build', '--preset', 'github_pages'], {
  cwd: fileURLToPath(new URL('../', import.meta.url)),
  env: { ...process.env, NITRO_PRESET: 'github_pages' },
  stdio: 'inherit', windowsHide: true,
})
child.on('error', error => { console.error(error); process.exitCode = 1 })
child.on('exit', async code => {
  if (code !== 0) { process.exitCode = code || 1; return }
  await writeFile(new URL('../.output/public/.nojekyll', import.meta.url), '')
})
