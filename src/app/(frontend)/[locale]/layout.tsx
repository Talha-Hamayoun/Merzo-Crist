import type { Metadata } from 'next'
import { Cairo, Cormorant_Garamond, Outfit } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import React from 'react'

import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { routing } from '@/i18n/routing'
import { loadSite } from '@/lib/data/store'
import { resolveLocale } from '@/lib/locale'
import { buildNav } from '@/lib/nav'
import { absoluteUrl } from '@/utilities/seo'
import '../globals.css'

export const dynamic = 'force-dynamic'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const arabic = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const site = await loadSite(locale)
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: {
      default: site.chrome.seoTitle,
      template: '%s · Merzo Crist',
    },
    description: site.chrome.seoDescription,
    openGraph: {
      siteName: 'Merzo Crist',
      images: site.chrome.seoImage ? [{ url: site.chrome.seoImage }] : undefined,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = resolveLocale(raw)
  const [site, messages, navLabels, footerLabels] = await Promise.all([
    loadSite(locale),
    getMessages(),
    getTranslations('nav'),
    getTranslations('footer'),
  ])
  const nav = buildNav(
    {
      home: navLabels('home'),
      about: navLabels('about'),
      products: navLabels('products'),
      services: navLabels('services'),
      projects: navLabels('projects'),
      blog: navLabels('blog'),
      contact: navLabels('contact'),
    },
    site,
  )
  const columns = [
    { title: footerLabels('visit'), links: nav.map(({ label, href }) => ({ label, href })) },
    {
      title: footerLabels('collections'),
      links: site.catalogue.categories.map((category) => ({
        label: category.name,
        href: `/products?category=${category.slug}`,
      })),
    },
    {
      title: footerLabels('services'),
      links: site.catalogue.services.map((service) => ({
        label: service.title,
        href: `/services/${service.slug}`,
      })),
    },
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Merzo Crist',
    description: site.chrome.seoDescription,
    url: absoluteUrl(`/${locale}`),
    telephone: site.chrome.phone,
    email: site.chrome.email,
    image: site.chrome.seoImage,
    address: site.chrome.address,
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:z-[80] focus:bg-ivory focus:p-3">
            {locale === 'ar' ? 'تخطّ إلى المحتوى' : 'Skip to content'}
          </a>
          <Header
            announcement={site.chrome.announcement}
            phone={site.chrome.phone}
            phoneHref={site.chrome.phoneHref}
            email={site.chrome.email}
            nav={nav}
            ctaLabel={site.chrome.ctaLabel || navLabels('consult')}
            ctaHref={site.chrome.ctaHref || '/contact#consultation'}
          />
          <main id="content">{children}</main>
          <Footer
            description={site.chrome.footerDescription}
            columns={columns}
            phone={site.chrome.phone}
            phoneHref={site.chrome.phoneHref}
            email={site.chrome.email}
            address={site.chrome.address}
            hours={site.chrome.hours}
            whatsapp={site.chrome.whatsapp}
            social={site.chrome.social}
            copyright={site.chrome.copyright}
            labels={{
              contact: footerLabels('contact'),
              phone: footerLabels('phone'),
              address: footerLabels('address'),
              hours: footerLabels('hours'),
              whatsapp: footerLabels('whatsapp'),
              newsletter: footerLabels('newsletter'),
              newsletterText: footerLabels('newsletterText'),
            }}
          />
          <WhatsAppButton number={site.chrome.whatsapp} label={footerLabels('whatsapp')} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
