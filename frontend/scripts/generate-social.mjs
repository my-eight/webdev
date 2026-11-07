import { Resvg } from '@resvg/resvg-js'
import { mkdir, writeFile } from 'node:fs/promises'

const output = new URL('../public/social/', import.meta.url)
await mkdir(output, { recursive: true })
const cards = [
  { file: 'home', label: 'РАЗРАБОТКА / АВТОМАТИЗАЦИЯ / ДИЗАЙН', lines: ['Сайты. Системы.', 'Дизайн.'], detail: 'От вашей задачи — к продуманному решению', accent: '#A63D32' },
  { file: 'web-development', label: 'СЛАВА / ВЕБ-РАЗРАБОТКА', lines: ['Сайты и приложения.', 'От задачи до запуска.'], detail: 'Разработка · Доработки · Интеграции', accent: '#3E5D49' },
  { file: 'moysklad', label: 'СЛАВА / МОЙСКЛАД', lines: ['Порядок в данных.', 'Ясность в процессах.'], detail: 'Внедрение · Автоматизация · Обучение', accent: '#294B68' },
  { file: 'design', label: 'ЭРИН ВИШНЕВСКАЯ / ДИЗАЙН', lines: ['У каждого бренда', 'свой характер.'], detail: 'Айдентика · Упаковка · Веб-дизайн', accent: '#A63D32' },
]
for (const card of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#F7F4EC"/>
    <path d="M65 105h1070M65 533h1070M855 140v350M965 140v350M1075 140v350" stroke="#D8D5CC"/>
    <rect x="65" y="58" width="8" height="8" fill="${card.accent}"/>
    <text x="90" y="69" fill="#202523" font-family="Segoe UI, Arial, sans-serif" font-size="17" letter-spacing="2">${card.label}</text>
    <text x="65" y="246" fill="#202523" font-family="Segoe UI, Arial, sans-serif" font-size="64" letter-spacing="-3">${card.lines[0]}</text>
    <text x="65" y="328" fill="${card.accent}" font-family="Segoe UI, Arial, sans-serif" font-size="64" letter-spacing="-3">${card.lines[1]}</text>
    <text x="68" y="404" fill="#5F6763" font-family="Segoe UI, Arial, sans-serif" font-size="21">${card.detail}</text>
    <circle cx="980" cy="304" r="109" fill="none" stroke="${card.accent}" stroke-width="34"/>
    <rect x="936" y="260" width="89" height="89" fill="#F7F4EC" stroke="#202523"/>
    <rect x="1018" y="192" width="33" height="33" fill="${card.accent}"/>
    <text x="65" y="578" fill="#5F6763" font-family="Segoe UI, Arial, sans-serif" font-size="17">Россия · Удалённо · По договору</text>
  </svg>`
  await writeFile(new URL(`${card.file}.png`, output), new Resvg(svg, { font: { loadSystemFonts: true } }).render().asPng())
  console.log(`Generated ${card.file}.png (1200×630)`)
}
