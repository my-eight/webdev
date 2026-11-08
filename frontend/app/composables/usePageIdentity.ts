import { people } from '~/data/people'

export function usePageIdentity() {
  const route = useRoute()
  return computed(() => {
    const path = route.path.replace(/\/+$/, '') || '/'
    if (path === '/design') {
      return { name: 'Эрин', person: people.erin }
    }
    if (path === '/web-development' || path === '/moysklad') {
      return { name: 'Слава', person: people.slava }
    }
    return undefined
  })
}
