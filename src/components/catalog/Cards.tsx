import { ArrowRight } from 'lucide-react'

import { BrandIcon } from '@/components/brand/Icon'
import { MediaImage } from '@/components/media/MediaImage'
import { Link } from '@/i18n/navigation'
import type { Category, ImageAsset, Post, Product, Project, Service } from '@/types/site'
import { formatDate } from '@/utilities/format'

function CatalogueCard({
  href,
  image,
  title,
  sizes,
  imageClassName = 'h-82.5 md:h-60',
}: {
  href: string
  image: ImageAsset
  title: string
  sizes: string
  imageClassName?: string
}) {
  return (
    <Link href={href} className="hover-card group block overflow-hidden rounded-b-[15px] bg-surface">
      <span className={`relative block overflow-hidden ${imageClassName}`}>
        <MediaImage image={image} sizes={sizes} className="image-zoom" />
        <span className="hover-sheet absolute inset-0 flex items-center justify-center bg-black/50 px-6 text-center text-[18px] leading-snug font-semibold text-white" aria-hidden>
          {title}
        </span>
      </span>
      <span className="hover-line mx-auto mt-2.5 flex w-[95%] justify-center border-t-[2px] border-champagne px-3 pt-2.5 pb-4">
        <span className="hover-btn inline-flex max-w-full items-center justify-center gap-2.5 bg-champagne px-6 py-3 text-center text-sm leading-snug font-medium text-white">
          <span className="line-clamp-2">{title}</span>
          <ArrowRight className="size-3.5 shrink-0 rtl:rotate-180" aria-hidden />
        </span>
      </span>
    </Link>
  )
}

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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <CatalogueCard
      href={`/projects/${project.slug}`}
      image={project.image}
      title={project.title}
      sizes="(min-width: 1024px) 30vw, 100vw"
      imageClassName="h-[26rem] md:h-[28rem]"
    />
  )
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <CatalogueCard
      href={`/products?category=${category.slug}`}
      image={category.image}
      title={category.name}
      sizes="(min-width: 1024px) 33vw, 100vw"
    />
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
