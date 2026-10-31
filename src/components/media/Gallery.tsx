'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { MediaImage } from '@/components/media/MediaImage'
import type { ImageAsset } from '@/types/site'
import { cn } from '@/utilities/cn'

export function Gallery({
  images,
  layout = 'mosaic',
}: {
  images: ImageAsset[]
  layout?: 'mosaic' | 'feature'
}) {
  const t = useTranslations('common')
  const [open, setOpen] = useState<number | null>(null)
  const [feature, setFeature] = useState(0)
  const current = open == null ? null : images[open]

  useEffect(() => {
    if (open == null) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(null)
      if (event.key === 'ArrowRight') setOpen((value) => (value == null ? value : (value + 1) % images.length))
      if (event.key === 'ArrowLeft') setOpen((value) => (value == null ? value : (value - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, open])

  return (
    <>
      {layout === 'feature' ? (
        <div>
          <button type="button" className="relative block aspect-[4/5] w-full overflow-hidden bg-sand md:aspect-[5/4]" onClick={() => setOpen(feature)} aria-label={t('openImage')}>
            {images[feature] ? <MediaImage image={images[feature]} sizes="(min-width: 1024px) 55vw, 100vw" priority /> : null}
          </button>
          {images.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button key={image.src + index} type="button" className={cn('relative aspect-[4/3] overflow-hidden', index === feature && 'ring-1 ring-bronze')} onClick={() => setFeature(index)}>
                  <MediaImage image={image} sizes="20vw" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              className={cn('group relative overflow-hidden bg-sand', index % 5 === 0 ? 'col-span-2 aspect-[4/5] md:row-span-2' : 'aspect-[4/5]')}
              onClick={() => setOpen(index)}
              aria-label={t('openImage')}
            >
              <MediaImage image={image} sizes="(min-width: 768px) 25vw, 50vw" className="image-zoom" />
            </button>
          ))}
        </div>
      )}
      {current ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/92 p-4" role="dialog" aria-modal="true">
          <button type="button" className="absolute end-4 top-4 text-ivory" aria-label={t('close')} onClick={() => setOpen(null)}>
            <X />
          </button>
          <button type="button" className="absolute start-4 text-ivory" aria-label={t('previous')} onClick={() => setOpen((value) => (value == null ? value : (value - 1 + images.length) % images.length))}>
            <ChevronLeft className="rtl:rotate-180" />
          </button>
          <div className="relative h-[78vh] w-full max-w-5xl">
            <MediaImage image={current} sizes="90vw" />
          </div>
          <button type="button" className="absolute end-4 text-ivory" aria-label={t('next')} onClick={() => setOpen((value) => (value == null ? value : (value + 1) % images.length))}>
            <ChevronRight className="rtl:rotate-180" />
          </button>
        </div>
      ) : null}
    </>
  )
}
