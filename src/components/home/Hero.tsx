'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import { Button } from '@/components/ui/Button'
import type { HeroSlide } from '@/types/site'

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations('nav')
  const common = useTranslations('common')
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = slides[index] ?? slides[0]

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 6800)
    return () => window.clearInterval(timer)
  }, [paused, reduce, slides.length])

  if (!slide) return null

  function go(next: number) {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((item, itemIndex) => (
        <div key={item.image.src} className={`absolute inset-0 transition-opacity duration-700 ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}>
          <MediaImage image={item.image} sizes="100vw" priority={itemIndex === 0} className="image-zoom scale-105" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/10 rtl:bg-gradient-to-l" />
      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="container-site pb-20 pt-36 md:pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="eyebrow text-champagne">{slide.eyebrow}</p>
              <h1 className="mt-4 font-display text-[clamp(2.7rem,6vw,5.4rem)] leading-[0.95] text-ivory">{slide.title}</h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/80 md:text-lg">{slide.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/products" variant="light">{t('explore')}</Button>
                <Button href="/contact#consultation" variant="ghostLight">{t('consult')}</Button>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center gap-4">
            <button type="button" className="flex size-10 items-center justify-center border border-ivory/30 hover:bg-ivory hover:text-charcoal" aria-label={common('previous')} onClick={() => go(index - 1)}>
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>
            <button type="button" className="flex size-10 items-center justify-center border border-ivory/30 hover:bg-ivory hover:text-charcoal" aria-label={common('next')} onClick={() => go(index + 1)}>
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-2" aria-label={common('slide')}>
              {slides.map((item, itemIndex) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`${common('slide')} ${itemIndex + 1}`}
                  aria-current={itemIndex === index}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-px transition-all ${itemIndex === index ? 'w-10 bg-champagne' : 'w-5 bg-ivory/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
