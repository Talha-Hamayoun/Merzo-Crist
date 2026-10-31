import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import { Logo } from '@/components/brand/Logo'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { Link } from '@/i18n/navigation'
import type { NavLink } from '@/lib/nav'
import { whatsappUrl } from '@/utilities/seo'

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: Instagram,
}

export function Footer({
  description,
  columns,
  phone,
  phoneHref,
  email,
  address,
  hours,
  whatsapp,
  social,
  copyright,
  labels,
}: {
  description: string
  columns: { title: string; links: { label: string; href: string }[] }[]
  phone: string
  phoneHref: string
  email: string
  address: string
  hours: string
  whatsapp: string
  social: { platform: string; url: string }[]
  copyright: string
  labels: { contact: string; phone: string; address: string; hours: string; whatsapp: string; newsletter: string; newsletterText: string }
}) {
  return (
    <footer className="bg-charcoal text-ivory/75">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:py-20">
        <div className="min-w-0 lg:col-span-3">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{description}</p>
          {social.length ? (
            <div className="mt-6 flex gap-3">
              {social.map((item) => {
                const Icon = socialIcons[item.platform as keyof typeof socialIcons] ?? Instagram
                return (
                  <a key={item.url} href={item.url} target="_blank" rel="noreferrer" aria-label={item.platform} className="flex size-10 items-center justify-center border border-ivory/20 text-ivory hover:border-bronze hover:text-champagne">
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          ) : null}
        </div>
        {columns.map((column) => (
          <div key={column.title} className="min-w-0 lg:col-span-2">
            <h2 className="text-xs tracking-[0.2em] text-champagne uppercase">{column.title}</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="min-w-0 lg:col-span-3">
          <h2 className="text-xs tracking-[0.2em] text-champagne uppercase">{labels.contact}</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><a className="hover:text-ivory" dir="ltr" href={phoneHref}>{phone}</a></li>
            <li><a className="hover:text-ivory" dir="ltr" href={`mailto:${email}`}>{email}</a></li>
            <li><a className="hover:text-ivory" href={whatsappUrl(whatsapp)}>{labels.whatsapp}</a></li>
            <li>{address}</li>
            <li>{hours}</li>
          </ul>
          <h2 className="mt-8 text-xs tracking-[0.2em] text-champagne uppercase">{labels.newsletter}</h2>
          <p className="mt-3 text-sm">{labels.newsletterText}</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <p className="container-site py-5 text-xs tracking-[0.08em]">{copyright}</p>
      </div>
    </footer>
  )
}

export type { NavLink }
