import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { ArticleBody } from '@/components/common/ArticleBody'
import { PageHero } from '@/components/common/PageHero'
import { Button } from '@/components/ui/Button'
import { findBySlug, loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  const service = findBySlug(site.catalogue.services, slug)
  if (!service) return {}
  return buildPageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.summary,
    image: service.image.src,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const [site, common, nav] = await Promise.all([loadSite(locale), getTranslations('common'), getTranslations('nav')])
  const service = findBySlug(site.catalogue.services, slug)
  if (!service) notFound()

  return (
    <>
      <PageHero eyebrow={nav('services')} title={service.title} text={service.summary} image={service.image} />
      <section className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <ArticleBody body={service.body} />
        <div className="border border-border bg-surface p-7">
          <h2 className="font-display text-3xl">{common('features')}</h2>
          <ul className="mt-4 grid gap-3 text-sm text-ink-soft">
            {service.features.map((feature) => (
              <li key={feature} className="border-b border-border pb-3">{feature}</li>
            ))}
          </ul>
          <Button href="/contact#consultation" className="mt-6">{nav('consult')}</Button>
        </div>
      </section>
    </>
  )
}
