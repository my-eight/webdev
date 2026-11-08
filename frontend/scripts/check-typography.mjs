import assert from 'node:assert/strict'
import { formatTypography } from '../shared/utils/typography.ts'

const nbsp = '\u00a0'
const cases = [
  ['Характер в деталях.', 'Характер в' + nbsp + 'деталях'],
  ['От идеи до готовых материалов.', 'От' + nbsp + 'идеи до' + nbsp + 'готовых материалов'],
  ['В связи с вашей задачей.', ['В', 'связи', 'с', 'вашей'].join(nbsp) + ' задачей'],
  ['Дизайн · Разработка', 'Дизайн Разработка'],
  ['Да. Можно начать.', 'Да, можно начать'],
  ['Да. МойСклад уже настроен.', 'Да, МойСклад уже настроен'],
  ['Разрабатываю сайты. Подключаю интеграции.', 'Разрабатываю сайты; подключаю интеграции'],
  ['Сайт. Figma и Node.js.', 'Сайт; Figma и' + nbsp + 'Node.js'],
  ['mybusinessacc8@gmail.com', 'mybusinessacc8@gmail.com'],
  ['https://example.com/a.b?q=1.2', 'https://example.com/a.b?q=1.2'],
  ['Версия 3.5.45.', 'Версия 3.5.45'],
  [
    'Сайт https://example.com. Отправка на mybusinessacc8@gmail.com.',
    'Сайт https://example.com; отправка на' + nbsp + 'mybusinessacc8@gmail.com',
  ],
]
for (const [input, expected] of cases) {
  assert.equal(formatTypography(input), expected, input)
  assert.equal(formatTypography(expected), expected, 'Repeated formatting changes output: ' + input)
}
for (const input of [
  'В данных',
  'С сотрудниками',
  'Без ручной работы',
  'Для пользователей',
  'На сайте',
  'По договору',
  'Через интеграцию',
  'И мерч',
]) {
  assert.ok(formatTypography(input).includes(nbsp), input)
}
console.log(
  'Проверено: переносы предлогов, отсутствие точек, связность фраз, сохранность почты, URL и технических названий',
)
