import { allowsIndexing, publicPath, siteOrigin, siteRoot } from '#shared/utils/site'
import { site } from '~/config/site'
import { formatTypography } from '#shared/utils/typography'

interface PageSeoOptions {
  title: string
  description: string
  path: string
  person?: { name: string; id: 'slava' | 'erin'; role: string; portfolio?: string }
  serviceName?: string
}

export function usePageSeo(options: PageSeoOptions) {
  options = {
    ...options,
    title: formatTypography(options.title),
    description: formatTypography(options.description),
    serviceName: options.serviceName ? formatTypography(options.serviceName) : undefined,
  }
  const runtime = useRuntimeConfig()
  const contacts = options.person ? usePersonContacts(options.person.id) : undefined
  const config = runtime.public
  const origin = siteOrigin(config.siteUrl)
  const root = siteRoot(config.siteUrl, runtime.app.baseURL)
  const canonical = origin ? origin + publicPath(options.path, runtime.app.baseURL, config.trailingSlash) : undefined
  const imagePath = publicPath(`/social/${options.path.slice(1) || 'home'}.png`, runtime.app.baseURL)
  useSeoMeta({
    title: options.title,
    description: options.description,
    author: options.person?.name || site.name,
    robots: allowsIndexing(config) ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    ogType: 'website',
    ogLocale: 'ru_RU',
    ogSiteName: formatTypography(site.name),
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogImage: origin ? `${origin}${imagePath}` : undefined,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: options.title,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: origin ? `${origin}${imagePath}` : undefined,
  })

  const graph: Record<string, unknown>[] = []
  if (origin) {
    graph.push({ '@type': 'WebSite', '@id': `${root}#website`, url: root, name: site.name, inLanguage: 'ru-RU' })
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: options.title,
      description: options.description,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': `${root}#website` },
      ...(options.person ? { about: { '@id': `${root}#${options.person.id}` } } : {}),
    })
    if (options.person) {
      const contact = contacts?.value
      const sameAs = [options.person.portfolio, contact?.telegram].filter((value): value is string => Boolean(value))
      graph.push({
        '@type': 'Person',
        '@id': `${root}#${options.person.id}`,
        name: options.person.name,
        jobTitle: options.person.role,
        ...(contact?.phone ? { telephone: contact.phone.slice('tel:'.length) } : {}),
        ...(contact?.email ? { email: contact.emailLabel } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      })
    }
    if (options.serviceName && options.person) {
      graph.push({
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: options.serviceName,
        description: options.description,
        url: canonical,
        provider: { '@id': `${root}#${options.person.id}` },
        areaServed: { '@type': 'Country', name: 'Россия' },
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: canonical },
      })
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: root },
          { '@type': 'ListItem', position: 2, name: options.serviceName, item: canonical },
        ],
      })
    }
  }
  useHead({
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    script: graph.length
      ? [
          {
            key: 'page-schema',
            type: 'application/ld+json',
            innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
          },
        ]
      : [],
  })
}
