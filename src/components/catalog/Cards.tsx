import { BrandIcon } from '@/components/brand/Icon'
import { MediaImage } from '@/components/media/MediaImage'
import { Link } from '@/i18n/navigation'
import type { Category, Post, Product, Service } from '@/types/site'
import { formatDate } from '@/utilities/format'

export function ProductCard({ product, cta }: { product: Product; cta: string }) {
  return (
    <article className="group hover-card">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-sand">
        <MediaImage image={product.image} sizes="(min-width: 1024px) 30vw, 100vw" className="image-zoom" />
        <span className="hover-sheet absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center font-display text-3xl text-ivory">
          {product.name}
        </span>
      </Link>
      <p className="eyebrow mt-4">{product.categoryName}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{product.summary}</p>
      <Link href={`/products/${product.slug}`} className="mt-3 inline-flex text-sm text-bronze-deep">
        {cta}
      </Link>
    </article>
  )
}

export function CategoryCard({ category, cta }: { category: Category; cta: string }) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group hover-card relative block aspect-[4/5] overflow-hidden bg-sand">
      <MediaImage image={category.image} sizes="(min-width: 1024px) 33vw, 100vw" className="image-zoom" />
      <div className="hover-sheet absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center text-ivory">
        <div>
          <h3 className="font-display text-3xl">{category.name}</h3>
          <p className="mt-2 text-sm text-ivory/85">{category.description}</p>
          <span className="mt-3 inline-block text-xs tracking-[0.16em] text-champagne uppercase">{cta}</span>
        </div>
      </div>
    </Link>
  )
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group flex h-full flex-col border border-border bg-surface p-7 transition hover:border-bronze">
      <BrandIcon name={service.icon} className="size-6 text-bronze-deep" />
      <h3 className="mt-6 font-display text-3xl">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>
    </Link>
  )
}

export function PostCard({ post, locale, cta }: { post: Post; locale: string; cta: string }) {
  return (
    <article className="group hover-card">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-sand">
        <MediaImage image={post.image} sizes="(min-width: 1024px) 33vw, 100vw" className="image-zoom" />
        <span className="hover-sheet absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center font-display text-3xl text-ivory">
          {post.title}
        </span>
      </Link>
      <p className="eyebrow mt-4">{post.category}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <p className="mt-3 text-xs tracking-[0.12em] text-muted uppercase">{formatDate(post.date, locale)}</p>
      <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm text-bronze-deep">
        {cta}
      </Link>
    </article>
  )
}
