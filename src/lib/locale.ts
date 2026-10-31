import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { isLocale, type Locale } from '@/i18n/routing'

export function resolveLocale(value: string): Locale {
  if (!isLocale(value)) notFound()
  setRequestLocale(value)
  return value
}
