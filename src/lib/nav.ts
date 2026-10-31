import type { SiteData } from '@/lib/data/store'

export type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

type Labels = {
  home: string
  about: string
  products: string
  services: string
  projects: string
  blog: string
  contact: string
}

export function buildNav(labels: Labels, site: SiteData): NavLink[] {
  const base = site.chrome.navigation?.length
    ? site.chrome.navigation
    : [
        { label: labels.home, href: '/' },
        { label: labels.about, href: '/about' },
        { label: labels.products, href: '/products' },
        { label: labels.services, href: '/services' },
        { label: labels.projects, href: '/projects' },
        { label: labels.blog, href: '/blog' },
        { label: labels.contact, href: '/contact' },
      ]

  return base.map((item) => {
    const path = item.href.split('?')[0]?.replace(/\/$/, '') || '/'
    if (path === '/products') {
      return {
        ...item,
        children: site.catalogue.categories.map((category) => ({
          label: category.name,
          href: `/products?category=${category.slug}`,
        })),
      }
    }
    if (path === '/services') {
      return {
        ...item,
        children: site.catalogue.services.map((service) => ({
          label: service.title,
          href: `/services/${service.slug}`,
        })),
      }
    }
    return item
  })
}
