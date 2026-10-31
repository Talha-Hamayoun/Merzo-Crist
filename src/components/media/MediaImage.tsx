import Image from 'next/image'

import type { ImageAsset } from '@/types/site'
import { cn } from '@/utilities/cn'

export function MediaImage({
  image,
  sizes,
  className,
  priority = false,
}: {
  image: ImageAsset
  sizes: string
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={image.src.startsWith('http')}
      className={cn('object-cover', className)}
    />
  )
}
