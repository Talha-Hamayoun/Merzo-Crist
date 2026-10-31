import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { ProductCard } from '@/components/catalog/Cards'
import { ArticleBody } from '@/components/common/ArticleBody'
import { Gallery } from '@/components/media/Gallery'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/navigation'
import { findBySlug, loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  const product = findBySlug(site.catalogue.products, slug)
  if (!product) return {}
  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.summary,
    image: product.image.src,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const [site, common, nav] = await Promise.all([loadSite(locale), getTranslations('common'), getTranslations('nav')])
  const product = findBySlug(site.catalogue.products, slug)
  if (!product) notFound()
  const related = site.catalogue.products.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 3)

  return (
    <article className="container-site py-28 md:py-36">
      <p className="text-sm text-muted">
        <Link href="/">{nav('home')}</Link>
        <span className="px-2">/</span>
        <Link href="/products">{nav('products')}</Link>
        <span className="px-2">/</span>
        {product.name}
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <Gallery images={product.gallery} layout="feature" />
        <div>
          <p className="eyebrow">{product.categoryName}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight">{product.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{product.summary}</p>
          <ArticleBody body={product.body} />
          <h2 className="mt-8 font-display text-2xl">{common('features')}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-ink-soft">
            {product.features.map((feature) => (
              <li key={feature} className="border-b border-border py-2">{feature}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl">{common('specifications')}</h2>
          <dl className="mt-3 grid gap-2 text-sm">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="grid grid-cols-2 border-b border-border py-2">
                <dt className="text-muted">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <Button href="/contact#consultation" className="mt-8">{nav('consult')}</Button>
        </div>
      </div>
      {related.length ? (
        <section className="mt-20">
          <h2 className="font-display text-4xl">{common('related')}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} cta={common('viewDetails')} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
