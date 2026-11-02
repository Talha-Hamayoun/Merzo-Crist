'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ProjectCard } from '@/components/catalog/Cards'
import type { Project, ProjectCategory, Testimonial } from '@/types/site'
import { cn } from '@/utilities/cn'

export function StatsBand({
  stats,
}: {
  stats: { value: number; suffix: string; label: string }[]
}) {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="container-site grid grid-cols-2 gap-8 py-16 md:grid-cols-4 md:py-20">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl text-champagne md:text-6xl">
              <Counter value={stat.value} />
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm text-ivory/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Counter({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduce) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1100)
          const eased = 1 - (1 - progress) ** 3
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce, value])

  return <span ref={ref}>{display}</span>
}

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const t = useTranslations('common')
  const [index, setIndex] = useState(0)
  const item = items[index]
  if (!item) return null

  function go(next: number) {
    setIndex((next + items.length) % items.length)
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-3xl leading-snug text-ink md:text-4xl">
        “{item.review}”
      </blockquote>
      <div
        className="mt-6 flex items-center justify-center gap-1 text-bronze"
        aria-label={`${item.rating}/5`}
      >
        {Array.from({ length: 5 }, (_, star) => (
          <span key={star} className={star < item.rating ? 'opacity-100' : 'opacity-25'}>
            ★
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm tracking-[0.14em] uppercase">{item.name}</p>
      {item.role ? <p className="mt-1 text-sm text-muted">{item.role}</p> : null}
      {items.length > 1 ? (
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            className="flex size-10 items-center justify-center border border-border"
            aria-label={t('previous')}
            onClick={() => go(index - 1)}
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center border border-border"
            aria-label={t('next')}
            onClick={() => go(index + 1)}
          >
            <ChevronRight className="size-4 rtl:rotate-180" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const expanded = open === index
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-start"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-display text-2xl">{item.question}</span>
              <span className="text-bronze">{expanded ? '–' : '+'}</span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300',
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProjectBrowser({
  projects,
  labels,
}: {
  projects: Project[]
  labels: Record<ProjectCategory | 'all', string>
}) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')
  const visible =
    filter === 'all' ? projects : projects.filter((project) => project.category === filter)
  const filters: (ProjectCategory | 'all')[] = ['all', 'residential', 'hospitality', 'commercial']

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              'h-10 border px-4 text-sm',
              filter === key
                ? 'border-charcoal bg-charcoal text-ivory'
                : 'border-border bg-surface',
            )}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}

export function PartnerRow({
  partners,
}: {
  partners: { name: string; href?: string; logo?: string }[]
}) {
  const loop = [...partners, ...partners]
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-10">
      <div className="marquee-track flex w-max items-center gap-4 px-4">
        {loop.map((partner, index) => {
          const className =
            'flex h-28 min-w-56 items-center justify-center border border-border px-8 text-sm tracking-[0.18em] text-ink-soft uppercase'
          const inner = partner.logo ? (
            // Logos from the CMS are arbitrary uploads; next/image needs known dimensions.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-20 max-w-44 w-auto object-contain"
            />
          ) : (
            partner.name
          )
          return partner.href ? (
            <a
              key={`${partner.name}-${index}`}
              href={partner.href}
              className={className}
              target="_blank"
              rel="noreferrer"
            >
              {inner}
            </a>
          ) : (
            <span key={`${partner.name}-${index}`} className={className}>
              {inner}
            </span>
          )
        })}
      </div>
    </div>
  )
}
