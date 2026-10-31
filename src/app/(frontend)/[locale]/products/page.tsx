import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { ProductCard } from '@/components/catalog/Cards'
import { PageHero } from '@/components/common/PageHero'
import { Link } from '@/i18n/navigation'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'
import { cn } from '@/utilities/cn'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/products', title: t('productsTitle'), description: t('productsDescription'), image: photos.livingGold })
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string; page?: string }>
}) {
  const [{ locale: raw }, query] = await Promise.all([params, searchParams])
  const locale = resolveLocale(raw)
  const [site, common, pages] = await Promise.all([
    loadSite(locale),
    getTranslations('common'),
    getTranslations('pages'),
  ])
  const category = query.category || ''
  const q = query.q?.trim() || ''
  const page = Math.max(1, Number(query.page) || 1)
  const filtered = site.catalogue.products.filter((product) => {
    const categoryMatch = !category || product.categorySlug === category
    const queryMatch = !q || `${product.name} ${product.summary}`.toLowerCase().includes(q.toLowerCase())
    return categoryMatch && queryMatch
  })
  const pageSize = 9
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, totalPages)
  const items = filtered.slice((current - 1) * pageSize, current * pageSize)
  const activeCategory = site.catalogue.categories.find((item) => item.slug === category)

  function href(nextPage: number, nextCategory = category) {
    const search = new URLSearchParams()
    if (nextCategory) search.set('category', nextCategory)
    if (q) search.set('q', q)
    if (nextPage > 1) search.set('page', String(nextPage))
    const value = search.toString()
    return value ? `/products?${value}` : '/products'
  }

  return (
    <>
      <PageHero
        eyebrow={pages('productsLead')}
        title={activeCategory?.name || pages('productsLead')}
        text={activeCategory?.description}
        image={activeCategory?.image || { src: photos.livingGold, alt: 'Merzo Crist collection' }}
      />
      <section className="container-site py-12 md:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-auto pb-1">
            <Link href={href(1, '')} className={cn('shrink-0 border px-4 py-2 text-sm', !category ? 'border-charcoal bg-charcoal text-ivory' : 'border-border')}>
              {common('all')}
            </Link>
            {site.catalogue.categories.map((item) => (
              <Link key={item.slug} href={`/products?category=${item.slug}`} className={cn('shrink-0 border px-4 py-2 text-sm', category === item.slug ? 'border-charcoal bg-charcoal text-ivory' : 'border-border')}>
                {item.name}
              </Link>
            ))}
          </div>
          <form action={`/${locale}/products`} method="get" className="flex w-full max-w-sm">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <label className="sr-only" htmlFor="product-search">{common('searchLabel')}</label>
            <input id="product-search" name="q" defaultValue={q} placeholder={common('search')} className="h-12 w-full border border-border bg-surface px-3 text-sm outline-none focus:border-bronze" />
          </form>
        </div>
        <p className="mt-6 text-sm text-muted">{pages('resultCount', { count: filtered.length })}</p>
        {items.length ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} cta={common('viewDetails')} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-border bg-surface p-10">
            <h2 className="font-display text-3xl">{common('emptyTitle')}</h2>
            <p className="mt-2 text-muted">{common('emptyBody')}</p>
          </div>
        )}
        {totalPages > 1 ? (
          <nav className="mt-10 flex items-center gap-3" aria-label={common('page')}>
            {current > 1 ? <Link href={href(current - 1)} className="border border-border px-4 py-2 text-sm">{common('previous')}</Link> : null}
            <span className="text-sm text-muted">{current} / {totalPages}</span>
            {current < totalPages ? <Link href={href(current + 1)} className="border border-border px-4 py-2 text-sm">{common('next')}</Link> : null}
          </nav>
        ) : null}
      </section>
    </>
  )
}
