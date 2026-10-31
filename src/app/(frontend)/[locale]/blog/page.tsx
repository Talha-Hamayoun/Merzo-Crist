import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PostCard } from '@/components/catalog/Cards'
import { PageHero } from '@/components/common/PageHero'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/blog', title: t('blogTitle'), description: t('blogDescription'), image: photos.sheer })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, pages, common] = await Promise.all([loadSite(locale), getTranslations('pages'), getTranslations('common')])

  return (
    <>
      <PageHero eyebrow={pages('blogLead')} title={pages('blogLead')} image={{ src: photos.sheer, alt: 'Merzo Crist journal' }} />
      <section className="container-site grid gap-10 py-16 md:grid-cols-3">
        {site.catalogue.posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} cta={common('readMore')} />
        ))}
      </section>
    </>
  )
}
