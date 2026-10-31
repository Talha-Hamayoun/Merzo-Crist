import { cn } from '@/utilities/cn'

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="8" y="6" width="48" height="52" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 15.5h48" stroke="currentColor" strokeWidth="1" />
      <path d="M18 15.5c.4 8 7 7 5.6 16.2C22.2 41 28 38.5 27 51" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M23 15.5c.3 8.5 6.4 7.4 5.2 16.4-.9 7.2 4 6.4 3.2 19.1" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
      <path d="M46 15.5c-.4 8-7 7-5.6 16.2C41.8 41 36 38.5 37 51" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M41 15.5c-.3 8.5-6.4 7.4-5.2 16.4.9 7.2-4 6.4-3.2 19.1" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
      <path d="M32 6v4.2" stroke="#a68456" strokeWidth="1.4" />
      <path d="M32 11.2l1.7 1.7-1.7 1.7-1.7-1.7z" fill="#a68456" />
    </svg>
  )
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-14 items-center justify-center rounded-full border border-current', className)}>
      <span className="font-display text-xl tracking-[0.12em]">MC</span>
      <span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rotate-45 bg-bronze" />
    </span>
  )
}

export function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', tone === 'light' ? 'text-ivory' : 'text-ink', className)}>
      <Mark className="size-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] tracking-[0.22em]">MERZO</span>
        <span className="mt-1.5 text-[0.62rem] tracking-[0.46em]">CRIST</span>
      </span>
    </span>
  )
}
