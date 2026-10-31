'use client'

import { Menu, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useTransition } from 'react'

import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import type { NavLink } from '@/lib/nav'
import { cn } from '@/utilities/cn'

function isActive(pathname: string, href: string) {
  const path = href.split('?')[0] || '/'
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

function LanguageSwitcher({ tone }: { tone: 'light' | 'dark' }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [pending, start] = useTransition()

  function choose(next: 'en' | 'ar') {
    const search = typeof window === 'undefined' ? '' : window.location.search
    start(() => {
      router.replace(`${pathname}${search}`, { locale: next })
    })
  }

  return (
    <div className={cn('flex items-center gap-2 text-[0.68rem] tracking-[0.18em]', tone === 'light' ? 'text-ivory' : 'text-ink')} aria-label={t('language')}>
      {(['en', 'ar'] as const).map((code) => (
        <button
          key={code}
          type="button"
          disabled={pending}
          onClick={() => choose(code)}
          className={cn('uppercase', locale === code ? 'border-b border-bronze pb-0.5' : 'opacity-60 hover:opacity-100')}
          aria-current={locale === code ? 'true' : undefined}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export function Header({
  announcement,
  phone,
  phoneHref,
  email,
  nav,
  ctaLabel,
  ctaHref,
}: {
  announcement: string
  phone: string
  phoneHref: string
  email: string
  nav: NavLink[]
  ctaLabel: string
  ctaHref: string
}) {
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const tone = solid || open ? 'dark' : 'light'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-9 items-center justify-between bg-charcoal px-[4vw] text-[0.68rem] tracking-[0.14em] text-ivory/80 uppercase">
        <p className="truncate">{announcement}</p>
        <div className="hidden items-center gap-5 sm:flex">
          <a href={phoneHref} dir="ltr" className="hover:text-ivory">{phone}</a>
          <a href={`mailto:${email}`} dir="ltr" className="hover:text-ivory">{email}</a>
        </div>
      </div>
      <div
        className={cn(
          'flex h-16 items-center gap-6 px-[4vw] transition-colors duration-300 md:h-20',
          solid || open ? 'border-b border-border bg-ivory/95 text-ink backdrop-blur' : 'bg-transparent text-ivory',
        )}
      >
        <Link href="/" aria-label="Merzo Crist" className="shrink-0">
          <Logo tone={tone} />
        </Link>
        <nav className="ms-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn('relative py-2 text-[0.78rem] tracking-[0.14em] uppercase', isActive(pathname, item.href) && 'text-bronze')}
                data-active={isActive(pathname, item.href)}
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <div className="invisible absolute start-1/2 top-full z-20 w-72 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 rtl:translate-x-1/2">
                  <div className="max-h-[70vh] overflow-auto border border-border bg-surface p-3 shadow-soft">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-3 py-2.5 text-sm text-ink-soft hover:bg-ivory hover:text-ink">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-4 lg:ms-0">
          <LanguageSwitcher tone={tone} />
          <Button href={ctaHref} variant={tone === 'light' ? 'light' : 'primary'} size="sm" className="hidden md:inline-flex">
            {ctaLabel}
          </Button>
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 top-[6.25rem] z-40 overflow-auto bg-ivory px-[6vw] py-8 text-ink lg:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-border py-3">
                <Link href={item.href} className="font-display text-4xl">
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="mt-3 grid gap-2">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="text-sm text-muted">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <Button href={ctaHref} className="mt-8 w-full">
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </header>
  )
}
