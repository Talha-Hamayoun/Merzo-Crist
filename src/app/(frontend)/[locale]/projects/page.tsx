import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageHero } from '@/components/common/PageHero'
import { ProjectBrowser } from '@/components/home/Interactive'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/projects', title: t('projectsTitle'), description: t('projectsDescription'), image: photos.gallery })
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, pages, labels, common] = await Promise.all([
    loadSite(locale),
    getTranslations('pages'),
    getTranslations('projects'),
    getTranslations('common'),
  ])

  return (
    <>
      <PageHero eyebrow={pages('projectsLead')} title={pages('projectsLead')} image={{ src: photos.gallery, alt: 'Merzo Crist projects' }} />
      <section className="container-site py-14 md:py-20">
        <ProjectBrowser
          projects={site.catalogue.projects}
          labels={{
            all: common('all'),
            residential: labels('residential'),
            hospitality: labels('hospitality'),
            commercial: labels('commercial'),
          }}
        />
      </section>
    </>
  )
}
