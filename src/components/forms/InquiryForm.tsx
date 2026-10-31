'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { whatsappUrl } from '@/utilities/seo'

type Values = {
  fullName: string
  phone: string
  email: string
  service: string
  contactMethod: 'phone' | 'email' | 'whatsapp'
  message: string
  company?: string
}

export function InquiryForm({
  services,
  whatsapp,
}: {
  services: { title: string }[]
  whatsapp: string
}) {
  const t = useTranslations('form')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(2, t('errors.name')),
        phone: z.string().trim().min(7, t('errors.phone')),
        email: z.string().trim().email(t('errors.email')),
        service: z.string().trim().min(1, t('errors.service')),
        contactMethod: z.enum(['phone', 'email', 'whatsapp'], { message: t('errors.method') }),
        message: z.string().trim().min(10, t('errors.message')),
        company: z.string().optional(),
      }),
    [t],
  )
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { service: 'general', contactMethod: 'whatsapp', company: '' },
  })
  const method = watch('contactMethod')

  async function onSubmit(values: Values) {
    setStatus('loading')
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'consultation', ...values, locale }),
      })
      if (!response.ok) throw new Error('failed')
      setStatus('success')
      reset({ service: 'general', contactMethod: 'whatsapp', company: '', fullName: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'h-12 w-full border border-border bg-surface px-3 text-sm text-ink outline-none transition focus:border-bronze'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t('name')}
          <input className={fieldClass} autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register('fullName')} />
          {errors.fullName ? <span className="text-xs text-error">{errors.fullName.message}</span> : null}
        </label>
        <label className="grid gap-2 text-sm">
          {t('phone')}
          <input className={fieldClass} autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...register('phone')} />
          {errors.phone ? <span className="text-xs text-error">{errors.phone.message}</span> : null}
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        {t('email')}
        <input className={fieldClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />
        {errors.email ? <span className="text-xs text-error">{errors.email.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm">
        {t('service')}
        <select className={fieldClass} {...register('service')}>
          <option value="general">{t('general')}</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        {errors.service ? <span className="text-xs text-error">{errors.service.message}</span> : null}
      </label>
      <fieldset>
        <legend className="mb-2 text-sm">{t('method')}</legend>
        <div className="grid grid-cols-3 gap-2">
          {([
            ['phone', t('phoneMethod')],
            ['email', t('emailMethod')],
            ['whatsapp', t('whatsappMethod')],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={method === value}
              onClick={() => setValue('contactMethod', value, { shouldValidate: true })}
              className={`h-11 border text-sm transition ${method === value ? 'border-charcoal bg-charcoal text-ivory' : 'border-border bg-surface text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.contactMethod ? <span className="mt-2 block text-xs text-error">{errors.contactMethod.message}</span> : null}
      </fieldset>
      <label className="grid gap-2 text-sm">
        {t('message')}
        <textarea className="min-h-32 w-full border border-border bg-surface px-3 py-3 text-sm outline-none focus:border-bronze" {...register('message')} />
        {errors.message ? <span className="text-xs text-error">{errors.message.message}</span> : null}
      </label>
      <label className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        {t('company')}
        <input tabIndex={-1} autoComplete="off" {...register('company')} />
      </label>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('sending') : t('submit')}
      </Button>
      <div aria-live="polite">
        {status === 'success' ? <p className="text-sm text-success">{t('success')}</p> : null}
        {status === 'error' ? (
          <p className="text-sm text-error">
            {t('error')}{' '}
            <a className="underline" href={whatsappUrl(whatsapp)}>
              WhatsApp
            </a>
          </p>
        ) : null}
      </div>
    </form>
  )
}
