import type { MetadataRoute } from 'next'

import { loadSite } from '@/lib/data/store'
import { absoluteUrl } from '@/utilities/seo'

const paths = ['', '/about', '/products', '/services', '/projects', '/blog', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  for (const locale of ['en', 'ar'] as const) {
    for (const path of paths) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        lastModified: new Date(),
        alternates: {
          languages: {
            en: absoluteUrl(`/en${path}`),
            ar: absoluteUrl(`/ar${path}`),
          },
        },
      })
    }
  }

  try {
    const site = await loadSite('en')
    const details = [
      ...site.catalogue.products.map((item) => `/products/${item.slug}`),
      ...site.catalogue.services.map((item) => `/services/${item.slug}`),
      ...site.catalogue.projects.map((item) => `/projects/${item.slug}`),
      ...site.catalogue.posts.map((item) => `/blog/${item.slug}`),
    ]
    for (const path of details) {
      for (const locale of ['en', 'ar'] as const) {
        entries.push({
          url: absoluteUrl(`/${locale}${path}`),
          lastModified: new Date(),
          alternates: {
            languages: {
              en: absoluteUrl(`/en${path}`),
              ar: absoluteUrl(`/ar${path}`),
            },
          },
        })
      }
    }
  } catch {
    return entries
  }

  return entries
}
