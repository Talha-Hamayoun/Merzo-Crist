import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { ArticleBody } from '@/components/common/ArticleBody'
import { PageHero } from '@/components/common/PageHero'
import { findBySlug, loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { formatDate } from '@/utilities/format'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  const post = findBySlug(site.catalogue.posts, slug)
  if (!post) return {}
  return buildPageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.image.src,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const [site, common] = await Promise.all([loadSite(locale), getTranslations('common')])
  const post = findBySlug(site.catalogue.posts, slug)
  if (!post) notFound()

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} text={post.excerpt} image={post.image} />
      <article className="container-site py-16">
        <p className="text-sm text-muted">
          {formatDate(post.date, locale)} · {common('by')} {post.author}
        </p>
        <div className="mt-8">
          <ArticleBody body={post.body} />
        </div>
      </article>
    </>
  )
}
