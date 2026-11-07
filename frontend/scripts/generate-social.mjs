import { Resvg } from '@resvg/resvg-js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

// CSS remains the single source of palette values. Require explicit hex tokens
// so an unsupported token change fails generation instead of silently using a fallback.
const css = await readFile(new URL('../app/assets/styles/tokens.css', import.meta.url), 'utf8')
function color(name) {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`))?.[1]
  assert.ok(value, `Не найден цвет --color-${name} в tokens.css`)
  return value
}
const palette = Object.fromEntries(['paper', 'ink', 'muted', 'line', 'red', 'web', 'stock', 'design'].map(name => [name, color(name)]))
const fontFamily = 'Manrope'
const fontFile = fileURLToPath(new URL('./assets/Manrope-Regular.ttf', import.meta.url))
const check = process.argv.includes('--check')
const output = new URL('../public/social/', import.meta.url)
await mkdir(output, { recursive: true })
const cards = [
  { file: 'home', label: 'РАЗРАБОТКА / АВТОМАТИЗАЦИЯ / ДИЗАЙН', lines: ['Сайты. Системы.', 'Дизайн.'], detail: 'От вашей задачи — к продуманному решению', accent: palette.red },
  { file: 'web-development', label: 'СЛАВА / ВЕБ-РАЗРАБОТКА', lines: ['Сайты и приложения.', 'От задачи до запуска.'], detail: 'Разработка · Доработки · Интеграции', accent: palette.web },
  { file: 'moysklad', label: 'СЛАВА / МОЙСКЛАД', lines: ['Порядок в данных.', 'Ясность в процессах.'], detail: 'Внедрение · Автоматизация · Обучение', accent: palette.stock },
  { file: 'design', label: 'ЭРИН ВИШНЕВСКАЯ / ДИЗАЙН', lines: ['У каждого бренда', 'свой характер.'], detail: 'Айдентика · Упаковка · Веб-дизайн', accent: palette.design },
]
for (const card of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${palette.paper}"/>
    <path d="M65 105h1070M65 533h1070M855 140v350M965 140v350M1075 140v350" stroke="${palette.line}"/>
    <rect x="65" y="58" width="8" height="8" fill="${card.accent}"/>
    <text x="90" y="69" fill="${palette.ink}" font-family="${fontFamily}" font-weight="400" font-size="17" letter-spacing="2">${card.label}</text>
    <text x="65" y="246" fill="${palette.ink}" font-family="${fontFamily}" font-weight="400" font-size="64" letter-spacing="-3">${card.lines[0]}</text>
    <text x="65" y="328" fill="${card.accent}" font-family="${fontFamily}" font-weight="400" font-size="64" letter-spacing="-3">${card.lines[1]}</text>
    <text x="68" y="404" fill="${palette.muted}" font-family="${fontFamily}" font-weight="400" font-size="21">${card.detail}</text>
    <circle cx="980" cy="304" r="109" fill="none" stroke="${card.accent}" stroke-width="34"/>
    <rect x="936" y="260" width="89" height="89" fill="${palette.paper}" stroke="${palette.ink}"/>
    <rect x="1018" y="192" width="33" height="33" fill="${card.accent}"/>
    <text x="65" y="578" fill="${palette.muted}" font-family="${fontFamily}" font-weight="400" font-size="17">Россия · Удалённо · По договору</text>
  </svg>`
  const image = new Resvg(svg, { font: { loadSystemFonts: false, fontFiles: [fontFile], defaultFontFamily: fontFamily } }).render().asPng()
  const target = new URL(`${card.file}.png`, output)
  if (check) assert.deepEqual(image, await readFile(target), `Превью ${card.file}.png устарело: выполните pnpm generate:social`)
  else await writeFile(target, image)
  console.log(`${check ? 'Проверено' : 'Создано'} ${card.file}.png (1200×630)`)
}
