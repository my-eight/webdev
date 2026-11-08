import { Resvg } from '@resvg/resvg-js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import { formatTypography } from '../shared/utils/typography.ts'

const css = await readFile(new URL('../app/assets/styles/tokens.css', import.meta.url), 'utf8')
function color(name) {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`))?.[1]
  assert.ok(value, `Не найден цвет --color-${name} в tokens.css`)
  return value
}
const palette = Object.fromEntries(
  ['paper', 'ink', 'muted', 'line', 'web', 'stock', 'design'].map((name) => [name, color(name)]),
)
const fontFiles = ['Exo2-Regular.ttf', 'HS_LunaObscura.ttf'].map((name) =>
  fileURLToPath(new URL('./assets/' + name, import.meta.url)),
)
const check = process.argv.includes('--check')
const output = new URL('../public/social/', import.meta.url)
await mkdir(output, { recursive: true })
const cards = [
  {
    file: 'home',
    label: 'Разработка · Автоматизация · Дизайн',
    lines: ['Сайты.', 'Системы.', 'Дизайн.'],
    detail: 'Технологии и визуальный характер',
    accent: palette.web,
  },
  {
    file: 'web-development',
    label: 'Слава · Разработка',
    lines: ['Сайты.', 'Веб-сервисы.'],
    detail: 'Разработка · Доработки · Интеграции',
    accent: palette.web,
  },
  {
    file: 'moysklad',
    label: 'Слава · МойСклад',
    lines: ['МойСклад.', 'Порядок', 'в процессах.'],
    detail: 'Внедрение · Автоматизация · Обучение',
    accent: palette.stock,
  },
  {
    file: 'design',
    label: 'Эрин Вишневская · Дизайн',
    lines: ['Дизайн.', 'Характер', 'в деталях.'],
    detail: 'Айдентика · Упаковка · Веб-дизайн',
    accent: palette.design,
  },
]
for (const card of cards) {
  card.label = formatTypography(card.label)
  card.lines = card.lines.map(formatTypography)
  card.detail = formatTypography(card.detail)
  const colors =
    card.file === 'home' ? [palette.web, palette.stock, palette.design] : [palette.ink, card.accent, card.accent]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
 <defs><pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse"><path d="M160 0H0V160" fill="none" stroke="${card.accent}" opacity=".15"/><circle r="2" fill="${card.accent}" opacity=".4"/></pattern><linearGradient id="shade" x2="1" y2="1"><stop stop-color="#18212c"/><stop offset="1" stop-color="#06080b"/></linearGradient></defs>
 <rect width="1200" height="630" fill="${palette.paper}"/><rect width="1200" height="630" fill="url(#grid)"/>
 <text x="64" y="83" fill="${palette.muted}" font-family="Exo 2" font-weight="400" font-size="19">${card.label}</text>
 ${card.lines.map((line, i) => `<text x="60" y="${225 + i * 78}" fill="${colors[i]}" font-family="HS_LunaObscura" font-weight="400" font-size="52">${line}</text>`).join('')}
 <text x="64" y="490" fill="${palette.muted}" font-family="Exo 2" font-weight="400" font-size="20">${card.detail}</text>
 <g transform="translate(780 120)"><circle cx="160" cy="180" r="163" fill="none" stroke="${card.accent}" opacity=".2"/>
 <path d="m160 25-120 65 24 163 85-62Z" fill="url(#shade)" stroke="${card.file === 'home' ? palette.web : card.accent}" stroke-width="2"/>
 <path d="m179 44 119 71-24 160-84-76Z" fill="url(#shade)" stroke="${card.file === 'home' ? palette.stock : card.accent}" stroke-width="2"/>
 <path d="m74 274 86-60 102 75-102 69Z" fill="url(#shade)" stroke="${card.file === 'home' ? palette.design : card.accent}" stroke-width="2"/>
 <path d="m160 163 25 30-25 30-23-30Z" fill="${card.accent}"/></g>
 <path d="M64 553h1072" stroke="${palette.line}"/><text x="64" y="593" fill="${palette.muted}" font-family="Exo 2" font-weight="400" font-size="16">${formatTypography('Россия · Удалённо · По договору')}</text>
 </svg>`
  const image = new Resvg(svg, { font: { loadSystemFonts: false, fontFiles, defaultFontFamily: 'Exo 2' } })
    .render()
    .asPng()
  const target = new URL(`${card.file}.png`, output)
  if (check)
    assert.deepEqual(image, await readFile(target), `Превью ${card.file}.png устарело: выполните pnpm generate:social`)
  else await writeFile(target, image)
  console.log(`${check ? 'Проверено' : 'Создано'} ${card.file}.png (1200×630)`)
}
