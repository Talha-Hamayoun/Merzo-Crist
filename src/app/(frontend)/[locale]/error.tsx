'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-site flex min-h-[70vh] flex-col items-start justify-center py-24">
      <h1 className="font-display text-5xl">{t('errorTitle')}</h1>
      <p className="mt-4 max-w-md text-muted">{t('errorBody')}</p>
      <div className="mt-8 flex gap-3">
        <Button type="button" onClick={reset}>
          {t('retry')}
        </Button>
        <Button href="/" variant="outline">
          {t('backHome')}
        </Button>
      </div>
    </div>
  )
}
