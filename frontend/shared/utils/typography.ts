const nbsp = '\u00a0'

const boundWords = [
  'в соответствии с',
  'по сравнению с',
  'в отличие от',
  'в связи с',
  'несмотря на',
  'невзирая на',
  'в течение',
  'в продолжение',
  'в отношении',
  'по поводу',
  'по причине',
  'в результате',
  'за счёт',
  'за счет',
  'в целях',
  'в силу',
  'по мере',
  'начиная с',
  'исходя из',
  'без',
  'безо',
  'благодаря',
  'близ',
  'в',
  'во',
  'вдоль',
  'вместо',
  'вне',
  'внутри',
  'внутрь',
  'вокруг',
  'возле',
  'вопреки',
  'впереди',
  'вслед',
  'вследствие',
  'для',
  'до',
  'за',
  'из',
  'из-за',
  'из-под',
  'к',
  'ко',
  'кроме',
  'меж',
  'между',
  'на',
  'над',
  'надо',
  'навстречу',
  'наподобие',
  'напротив',
  'о',
  'об',
  'обо',
  'около',
  'от',
  'ото',
  'перед',
  'передо',
  'по',
  'под',
  'подо',
  'позади',
  'помимо',
  'после',
  'посредством',
  'при',
  'про',
  'против',
  'путём',
  'путем',
  'ради',
  'с',
  'со',
  'сверх',
  'сквозь',
  'согласно',
  'среди',
  'спустя',
  'у',
  'через',
  'и',
  'а',
  'но',
  'или',
  'либо',
  'не',
  'ни',
].sort((a, b) => b.length - a.length)

const wordPattern = boundWords.map((word) => word.replaceAll(' ', '[ \\t\\u00a0]+')).join('|')
const bindPattern = new RegExp('(?<![\\p{L}\\p{N}_])(' + wordPattern + ')([ \\t\\u00a0]+)(?=\\S)', 'giu')
const technicalPattern = /https?:\/\/[^\s<>]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|[A-Z0-9_-]+(?:\.[A-Z0-9_-]+)+/giu

/** Pure text only: safe for SSR interpolation, never changes link attributes or contacts. */
export function formatTypography(value: string): string {
  const protectedValues: string[] = []
  let text = value.replace(technicalPattern, (token) => {
    const trailing = token.match(/[.,;:!?]+$/u)?.[0] || ''
    const content = trailing ? token.slice(0, -trailing.length) : token
    const marker = '\uE100' + protectedValues.length + '\uE101'
    protectedValues.push(content)
    return marker + trailing
  })
  const continuation = (word: string) => {
    const properName =
      /^(?:[A-Za-z\uE100]|МойСклад$|Слава$|Эрин$|Россия$|Битрикс24$)/u.test(word) || word === word.toUpperCase()
    return properName ? word : word.toLowerCase()
  }
  // Keep separate clauses readable after removing full stops.
  text = text.replace(
    /^(Да|Нет)\.[ \t\u00a0]+([«„"'(\[]*)([\p{L}\p{N}][\p{L}\p{N}-]*|\uE100\d+\uE101)/u,
    (_, answer: string, quote: string, word: string) => answer + ', ' + quote + continuation(word),
  )
  text = text.replace(
    /\.[ \t\u00a0]+([«„"'(\[]*)([\p{L}\p{N}][\p{L}\p{N}-]*|\uE100\d+\uE101)/gu,
    (_, quote: string, word: string) => {
      return '; ' + quote + continuation(word)
    },
  )
  text = text
    .replace(/[.。…]/gu, '')
    .replace(/[·•]/gu, ' ')
    .replace(/[ \t]{2,}/gu, ' ')
  text = text.replace(/\uE100(\d+)\uE101/gu, (_, index: string) => protectedValues[Number(index)] || '')
  return text.replace(bindPattern, (_, word: string) => word.replace(/[ \t\u00a0]+/gu, nbsp) + nbsp)
}
