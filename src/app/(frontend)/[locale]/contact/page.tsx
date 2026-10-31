import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageHero } from '@/components/common/PageHero'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { photos } from '@/content/photos'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata, whatsappUrl } from '@/utilities/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const t = await getTranslations({ locale, namespace: 'meta' })
  return buildPageMetadata({ locale, path: '/contact', title: t('contactTitle'), description: t('contactDescription'), image: photos.interior })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, pages, form, footer] = await Promise.all([
    loadSite(locale),
    getTranslations('pages'),
    getTranslations('form'),
    getTranslations('footer'),
  ])

  return (
    <>
      <PageHero eyebrow={pages('contactLead')} title={pages('contactTitle')} image={{ src: photos.interior, alt: 'Merzo Crist contact' }} />
      <section id="consultation" className="container-site grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <h2 className="font-display text-4xl">{form('title')}</h2>
          <p className="mt-3 text-muted">{form('intro')}</p>
          <ul className="mt-8 grid gap-3 text-sm">
            <li><a href={site.chrome.phoneHref}>{site.chrome.phone}</a></li>
            <li><a href={`mailto:${site.chrome.email}`}>{site.chrome.email}</a></li>
            <li><a href={whatsappUrl(site.chrome.whatsapp)}>{footer('whatsapp')}</a></li>
            <li>{site.chrome.address}</li>
            <li>{site.chrome.hours}</li>
          </ul>
        </div>
        <div className="border border-border bg-surface p-6 md:p-8">
          <InquiryForm services={site.catalogue.services} whatsapp={site.chrome.whatsapp} />
        </div>
      </section>
    </>
  )
}
