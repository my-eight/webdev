// Defaults apply only to the child build process; the calling shell stays unchanged.
export function pagesEnv(env = process.env) {
  return {
    ...env,
    NITRO_PRESET: 'github_pages',
    NUXT_APP_BASE_URL: env.NUXT_APP_BASE_URL || '/webdev/',
    NUXT_PUBLIC_SITE_URL: env.NUXT_PUBLIC_SITE_URL || 'https://my-eight.github.io',
    NUXT_PUBLIC_INDEXABLE: env.NUXT_PUBLIC_INDEXABLE || 'false',
  }
}
