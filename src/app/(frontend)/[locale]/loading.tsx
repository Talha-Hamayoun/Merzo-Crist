import { Monogram } from '@/components/brand/Logo'

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-ivory text-ink">
      <Monogram />
      <span className="h-px w-24 animate-pulse bg-bronze" />
    </div>
  )
}
