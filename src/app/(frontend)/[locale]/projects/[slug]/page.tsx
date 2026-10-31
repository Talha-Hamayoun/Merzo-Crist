import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { ArticleBody } from '@/components/common/ArticleBody'
import { PageHero } from '@/components/common/PageHero'
import { Gallery } from '@/components/media/Gallery'
import { Button } from '@/components/ui/Button'
import { findBySlug, loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { formatDate } from '@/utilities/format'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  const project = findBySlug(site.catalogue.projects, slug)
  if (!project) return {}
  return buildPageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: project.image.src,
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const [site, common, nav, categories] = await Promise.all([
    loadSite(locale),
    getTranslations('common'),
    getTranslations('nav'),
    getTranslations('projects'),
  ])
  const project = findBySlug(site.catalogue.projects, slug)
  if (!project) notFound()

  return (
    <>
      <PageHero eyebrow={categories(project.category)} title={project.title} text={project.summary} image={project.image} />
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <ArticleBody body={project.body} />
        <aside className="h-fit border border-border bg-surface p-7 text-sm">
          <p className="text-muted">{common('location')}</p>
          <p className="mt-1 text-base">{project.location || '—'}</p>
          <p className="mt-5 text-muted">{common('completed')}</p>
          <p className="mt-1 text-base">{project.completed ? formatDate(project.completed, locale) : '—'}</p>
          <Button href="/contact#consultation" className="mt-8">{nav('consult')}</Button>
        </aside>
      </section>
      <section className="container-site pb-20">
        <Gallery images={project.gallery} />
      </section>
    </>
  )
}
