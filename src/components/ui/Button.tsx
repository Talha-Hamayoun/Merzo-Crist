import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/utilities/cn'

const variants = {
  primary: 'bg-charcoal text-ivory hover:bg-bronze-deep',
  bronze: 'bg-bronze-deep text-ivory hover:bg-charcoal',
  outline: 'border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory',
  light: 'bg-ivory text-charcoal hover:bg-white',
  ghostLight: 'border border-ivory/50 bg-transparent text-ivory hover:bg-ivory hover:text-charcoal',
} as const

const sizes = {
  sm: 'h-10 px-4 text-[0.72rem]',
  md: 'h-12 px-6 text-[0.74rem]',
  lg: 'h-14 px-7 text-[0.78rem]',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

type Common = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = Common &
  Omit<ComponentPropsWithoutRef<'button'>, keyof Common> & { href?: undefined }

type ButtonAsLink = Common &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof Common | 'href'> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 font-medium tracking-[0.16em] uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    'btn-label',
    variants[variant],
    sizes[size],
    className,
  )

  if ('href' in props && props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof Common>
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...linkRest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as Omit<ButtonAsButton, keyof Common>)}>
      {children}
    </button>
  )
}
