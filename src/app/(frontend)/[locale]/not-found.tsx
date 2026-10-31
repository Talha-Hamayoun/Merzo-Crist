import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/Button'

export default async function NotFound() {
  const t = await getTranslations('common')
  return (
    <div className="container-site flex min-h-[70vh] flex-col justify-center py-28">
      <p className="eyebrow">{t('notFoundCode')}</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">{t('notFoundTitle')}</h1>
      <p className="mt-4 max-w-md text-muted">{t('notFoundBody')}</p>
      <div className="mt-8">
        <Button href="/">{t('backHome')}</Button>
      </div>
    </div>
  )
}
