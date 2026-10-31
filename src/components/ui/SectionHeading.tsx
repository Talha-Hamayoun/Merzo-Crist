import { cn } from '@/utilities/cn'

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'start',
  tone = 'dark',
  className,
}: {
  eyebrow?: string
  title: string
  text?: string
  align?: 'start' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className={cn('eyebrow', tone === 'light' && 'text-champagne')}>{eyebrow}</p> : null}
      <h2
        className={cn(
          'mt-3 font-display text-4xl leading-[1.05] md:text-5xl',
          tone === 'light' ? 'text-ivory' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn('mt-4 text-base leading-relaxed md:text-lg', tone === 'light' ? 'text-ivory/75' : 'text-muted')}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
