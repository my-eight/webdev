import { emailLink, phoneLink, telegramLink } from '#shared/utils/site'
import type { MaybeRefOrGetter } from 'vue'

export function usePersonContacts(person: MaybeRefOrGetter<'slava' | 'erin'>) {
  const config = useRuntimeConfig().public
  return computed(() => {
    const values = toValue(person) === 'slava'
      ? { phone: config.slavaPhone, telegram: config.slavaTelegram, email: config.slavaEmail }
      : { phone: config.erinPhone, telegram: config.erinTelegram, email: config.erinEmail }
    const telegram = telegramLink(values.telegram)
    const email = emailLink(values.email)
    const phone = phoneLink(values.phone)
    return {
      telegram, email, phone,
      telegramLabel: telegram ? '@' + telegram.slice('https://t.me/'.length) : '',
      emailLabel: email ? email.slice('mailto:'.length) : '',
      phoneLabel: phone ? values.phone.trim() : '',
    }
  })
}
