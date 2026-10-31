'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/cn'

export function RichTextContent({ data, className }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return (
    <div className={cn('rich-text max-w-2xl', className)}>
      <RichText data={data as never} />
    </div>
  )
}
