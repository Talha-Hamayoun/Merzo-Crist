import { MessageCircle } from 'lucide-react'

import { whatsappUrl } from '@/utilities/seo'

export function WhatsAppButton({ number, label }: { number?: string | null; label: string }) {
  if (!number) return null
  return (
    <a
      href={whatsappUrl(number, 'Hello Merzo Crist')}
      className="fixed bottom-5 end-5 z-40 flex size-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-soft transition hover:bg-bronze-deep"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}
