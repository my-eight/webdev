import { loadEnvFile } from 'node:process'
try { loadEnvFile() } catch (error) { if (error.code !== 'ENOENT') throw error }
const problems = []
const origin = process.env.NUXT_PUBLIC_SITE_URL || ''
try {
  const url = new URL(origin)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /localhost|\.test$|\.example$|example\.(com|org|net)$|\.local$|^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) throw new Error()
} catch { problems.push('Укажите настоящий HTTPS origin в NUXT_PUBLIC_SITE_URL, без пути и параметров.') }
if (process.env.NUXT_PUBLIC_INDEXABLE !== 'true') problems.push('После подготовки сайта включите NUXT_PUBLIC_INDEXABLE=true для боевого окружения.')
for (const [prefix, person] of [['SLAVA', 'Славы'], ['ERIN', 'Эрин']]) {
  const telegram = (process.env[`NUXT_PUBLIC_${prefix}_TELEGRAM`] || '').replace(/^https:\/\/t\.me\//, '').replace(/^@/, '')
  const email = process.env[`NUXT_PUBLIC_${prefix}_EMAIL`] || ''
  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(telegram) && !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) problems.push(`Добавьте хотя бы один согласованный контакт ${person}.`)
}
if (problems.length) {
  console.error('Настройки пока не готовы к публичному релизу:\n' + problems.map(p => `- ${p}`).join('\n'))
  process.exitCode = 1
} else console.log('Настройки домена, индексации и контактов заполнены. Ручная проверка материалов и документов остаётся обязательной.')
