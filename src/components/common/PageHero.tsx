import { MediaImage } from '@/components/media/MediaImage'
import type { ImageAsset } from '@/types/site'

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string
  title: string
  text?: string
  image: ImageAsset
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-charcoal text-ivory">
      <MediaImage image={image} sizes="100vw" priority className="opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20" />
      <div className="container-site relative z-10 pb-14 pt-36">
        <p className="eyebrow text-champagne">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">{title}</h1>
        {text ? <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">{text}</p> : null}
      </div>
    </section>
  )
}
