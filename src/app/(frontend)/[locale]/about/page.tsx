import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageHero } from '@/components/common/PageHero'
import { ArticleBody } from '@/components/common/ArticleBody'
import { MediaImage } from '@/components/media/MediaImage'
import { Button } from '@/components/ui/Button'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/about', title: t('aboutTitle'), description: t('aboutDescription') })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, pages, nav] = await Promise.all([
    loadSite(locale),
    getTranslations('pages'),
    getTranslations('nav'),
  ])

  return (
    <>
      <PageHero eyebrow={pages('aboutLead')} title={site.home.about.title} text={site.home.about.paragraphs[0]} image={{ src: photos.livingSoft, alt: site.home.about.title }} />
      <section className="container-site grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <ArticleBody body={{ kind: 'paragraphs', paragraphs: site.home.about.paragraphs }} />
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <MediaImage image={site.home.about.image} sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
      </section>
      <section className="bg-paper">
        <div className="container-site grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4 md:py-20">
          {site.home.pillars.map((pillar) => (
            <article key={pillar.title}>
              <h2 className="font-display text-3xl">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="relative aspect-[5/4] overflow-hidden bg-sand">
          <MediaImage image={site.home.editorial.image} sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
        <div>
          <p className="eyebrow">{site.home.editorial.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{site.home.editorial.title}</h2>
          <ArticleBody body={{ kind: 'paragraphs', paragraphs: site.home.editorial.paragraphs }} />
        </div>
      </section>
      <section className="container-site pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.catalogue.team.map((member) => (
            <article key={member.name}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <MediaImage image={member.image} sizes="25vw" />
              </div>
              <h2 className="mt-4 font-display text-2xl">{member.name}</h2>
              <p className="text-sm text-bronze-deep">{member.position}</p>
            </article>
          ))}
        </div>
        <Button href="/contact#consultation" className="mt-12">{nav('consult')}</Button>
      </section>
    </>
  )
}
