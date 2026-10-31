'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export function NewsletterForm() {
  const t = useTranslations('form')
  const footer = useTranslations('footer')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'newsletter', email, locale, company: '' }),
      })
      if (!response.ok) throw new Error('failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <label className="sr-only" htmlFor="newsletter-email">
        {footer('email')}
      </label>
      <div className="flex border border-ivory/20">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={footer('email')}
          className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-ivory outline-none placeholder:text-ivory/40"
        />
        <button type="submit" disabled={status === 'loading'} className="btn-label bg-bronze px-4 text-[0.72rem] tracking-[0.14em] text-ivory uppercase">
          {status === 'loading' ? t('sending') : footer('subscribe')}
        </button>
      </div>
      <p className="mt-2 text-xs" aria-live="polite">
        {status === 'success' ? t('newsletterSuccess') : null}
        {status === 'error' ? t('newsletterError') : null}
      </p>
    </form>
  )
}
