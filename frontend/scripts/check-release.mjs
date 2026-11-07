import { loadEnvFile } from 'node:process'
import { publicContacts } from '../shared/config/contacts.ts'
import { emailLink, phoneLink, telegramLink } from '../shared/utils/site.ts'
try { loadEnvFile() } catch (error) { if (error.code !== 'ENOENT') throw error }
const problems = []
const origin = process.env.NUXT_PUBLIC_SITE_URL || ''
try {
  const url = new URL(origin)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /localhost|\.test$|\.example$|example\.(com|org|net)$|\.local$|^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) throw new Error()
} catch { problems.push('Укажите настоящий HTTPS origin в NUXT_PUBLIC_SITE_URL, без пути и параметров.') }
if (process.env.NUXT_PUBLIC_INDEXABLE !== 'true') problems.push('После подготовки сайта включите NUXT_PUBLIC_INDEXABLE=true для боевого окружения.')
for (const [prefix, person] of [['SLAVA', 'Славы'], ['ERIN', 'Эрин']]) {
  const defaults = publicContacts[prefix.toLowerCase()]
  const telegram = telegramLink(process.env[`NUXT_PUBLIC_${prefix}_TELEGRAM`] ?? defaults.telegram)
  const email = emailLink(process.env[`NUXT_PUBLIC_${prefix}_EMAIL`] ?? defaults.email)
  const phone = phoneLink(process.env[`NUXT_PUBLIC_${prefix}_PHONE`] ?? defaults.phone)
  if (!telegram && !email && !phone) problems.push(`Добавьте хотя бы один согласованный контакт ${person}.`)
}
if (problems.length) {
  console.error('Настройки пока не готовы к публичному релизу:\n' + problems.map(p => `- ${p}`).join('\n'))
  process.exitCode = 1
} else console.log('Настройки домена, индексации и контактов заполнены. Ручная проверка материалов и документов остаётся обязательной.')
