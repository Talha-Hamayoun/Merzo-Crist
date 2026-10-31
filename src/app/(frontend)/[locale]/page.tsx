import type { Metadata } from 'next'

import { HomePage } from '@/components/home/HomePage'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildPageMetadata } from '@/utilities/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  return {
    ...buildPageMetadata({
      locale,
      path: '/',
      title: site.chrome.seoTitle,
      description: site.chrome.seoDescription,
      image: site.chrome.seoImage,
    }),
    title: { absolute: site.chrome.seoTitle },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  return <HomePage locale={locale} />
}
