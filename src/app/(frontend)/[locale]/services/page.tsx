import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageHero } from '@/components/common/PageHero'
import { MediaImage } from '@/components/media/MediaImage'
import { Link } from '@/i18n/navigation'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/services', title: t('servicesTitle'), description: t('servicesDescription'), image: photos.fabric })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, pages, common] = await Promise.all([loadSite(locale), getTranslations('pages'), getTranslations('common')])

  return (
    <>
      <PageHero eyebrow={pages('servicesLead')} title={pages('servicesLead')} text={site.catalogue.services[0]?.summary} image={{ src: photos.fabric, alt: 'Merzo Crist atelier' }} />
      <section className="container-site grid gap-10 py-16">
        {site.catalogue.services.map((service, index) => (
          <article key={service.slug} className="grid items-center gap-6 border-b border-border pb-10 md:grid-cols-2">
            <div className={`relative aspect-[5/4] overflow-hidden bg-sand ${index % 2 ? 'md:order-2' : ''}`}>
              <MediaImage image={service.image} sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
            <div>
              <h2 className="font-display text-4xl">
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex text-sm text-bronze-deep">{common('learnMore')}</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
