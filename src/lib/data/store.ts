import { cache } from 'react'

import { getSample } from '@/content/assemble'
import type { Locale } from '@/i18n/routing'
import { getPayloadClientSafe } from '@/lib/payload'
import type {
  Catalogue,
  Category,
  Chrome,
  Faq,
  HomeContent,
  Partner,
  Post,
  Product,
  Project,
  ProjectCategory,
  RichBody,
  Service,
  TeamMember,
  Testimonial,
} from '@/types/site'

export type SiteData = {
  chrome: Chrome
  home: HomeContent
  catalogue: Catalogue
}

type LoosePayload = {
  find: (args: Record<string, unknown>) => Promise<{ docs?: unknown[] }>
  findGlobal: (args: Record<string, unknown>) => Promise<unknown>
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function mediaUrl(value: unknown): string | null {
  const record = asRecord(value)
  return typeof record?.url === 'string' ? record.url : null
}

function paragraphList(value: string): string[] {
  const parts = value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.length ? parts : [value]
}

function textBody(value: string): RichBody {
  return { kind: 'paragraphs', paragraphs: paragraphList(value) }
}

function listText(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => text(asRecord(item)?.text))
    .filter(Boolean)
}

function relation(value: unknown): Record<string, unknown> | null {
  return asRecord(value)
}

async function readCollection(db: LoosePayload, locale: Locale, collection: string) {
  try {
    const result = await db.find({
      collection,
      locale,
      fallbackLocale: 'en',
      depth: 2,
      limit: 200,
      sort: 'order',
    })
    return (result.docs ?? []).map(asRecord).filter((doc): doc is Record<string, unknown> => Boolean(doc))
  } catch {
    return null
  }
}

async function readGlobal(db: LoosePayload, locale: Locale, slug: string) {
  try {
    return asRecord(
      await db.findGlobal({
        slug,
        locale,
        fallbackLocale: 'en',
        depth: 1,
      }),
    )
  } catch {
    return null
  }
}

function mapCategories(docs: Record<string, unknown>[] | null, sample: Category[]): Category[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const name = text(doc.name)
      const slug = text(doc.slug)
      if (!name || !slug || !fallback) return null
      return {
        name,
        slug,
        description: text(doc.description, fallback.description),
        image: {
          src: mediaUrl(doc.image) || fallback.image.src,
          alt: name,
        },
        order: typeof doc.order === 'number' ? doc.order : index,
      }
    })
    .filter((item): item is Category => Boolean(item))
    .sort((a, b) => a.order - b.order)
  return mapped.length ? mapped : sample
}

function mapProducts(docs: Record<string, unknown>[] | null, sample: Product[]): Product[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const name = text(doc.name)
      const slug = text(doc.slug)
      if (!name || !slug || !fallback) return null
      const category = relation(doc.category)
      const description = text(doc.description)
      const gallery = Array.isArray(doc.gallery)
        ? doc.gallery
            .map((item) => {
              const src = mediaUrl(asRecord(item)?.image ?? item)
              return src ? { src, alt: name } : null
            })
            .filter((item): item is { src: string; alt: string } => Boolean(item))
        : []
      const specifications = Array.isArray(doc.specifications)
        ? doc.specifications
            .map((item) => {
              const row = asRecord(item)
              const label = text(row?.label)
              const value = text(row?.value)
              return label && value ? { label, value } : null
            })
            .filter((item): item is { label: string; value: string } => Boolean(item))
        : []
      const seo = asRecord(doc.seo)
      const imageSrc = mediaUrl(doc.featuredImage) || fallback.image.src
      return {
        name,
        slug,
        categoryName: text(category?.name, fallback.categoryName),
        categorySlug: text(category?.slug, fallback.categorySlug),
        summary: text(doc.summary, fallback.summary),
        featured: doc.featured === true,
        image: { src: imageSrc, alt: name },
        gallery: gallery.length ? gallery : [{ src: imageSrc, alt: name }],
        features: listText(doc.features).length ? listText(doc.features) : fallback.features,
        specifications: specifications.length ? specifications : fallback.specifications,
        body: description ? textBody(description) : fallback.body,
        seoTitle: text(seo?.title) || undefined,
        seoDescription: text(seo?.description) || undefined,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Product[]
  return mapped.length ? mapped : sample
}

function mapServices(docs: Record<string, unknown>[] | null, sample: Service[]): Service[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const title = text(doc.title)
      const slug = text(doc.slug)
      if (!title || !slug || !fallback) return null
      const description = text(doc.description)
      const seo = asRecord(doc.seo)
      return {
        title,
        slug,
        summary: text(doc.summary, fallback.summary),
        image: { src: mediaUrl(doc.image) || fallback.image.src, alt: title },
        features: listText(doc.features).length ? listText(doc.features) : fallback.features,
        icon: text(doc.icon, fallback.icon),
        body: description ? textBody(description) : fallback.body,
        seoTitle: text(seo?.title) || undefined,
        seoDescription: text(seo?.description) || undefined,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Service[]
  return mapped.length ? mapped : sample
}

function projectCategory(value: unknown): ProjectCategory {
  if (value === 'hospitality' || value === 'commercial' || value === 'residential') return value
  return 'residential'
}

function mapProjects(docs: Record<string, unknown>[] | null, sample: Project[]): Project[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const title = text(doc.title)
      const slug = text(doc.slug)
      if (!title || !slug || !fallback) return null
      const description = text(doc.description)
      const gallery = Array.isArray(doc.gallery)
        ? doc.gallery
            .map((item) => {
              const src = mediaUrl(asRecord(item)?.image ?? item)
              return src ? { src, alt: title } : null
            })
            .filter((item): item is { src: string; alt: string } => Boolean(item))
        : []
      const imageSrc = mediaUrl(doc.featuredImage) || fallback.image.src
      return {
        title,
        slug,
        category: projectCategory(doc.category),
        summary: text(doc.summary, fallback.summary),
        image: { src: imageSrc, alt: title },
        gallery: gallery.length ? gallery : [{ src: imageSrc, alt: title }],
        location: text(doc.location) || undefined,
        completed: text(doc.completedOn) || undefined,
        body: description ? textBody(description) : fallback.body,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Project[]
  return mapped.length ? mapped : sample
}

function mapPosts(docs: Record<string, unknown>[] | null, sample: Post[]): Post[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const title = text(doc.title)
      const slug = text(doc.slug)
      if (!title || !slug || !fallback) return null
      const category = relation(doc.category)
      const seo = asRecord(doc.seo)
      const content = doc.content
      const body: RichBody =
        content && typeof content === 'object' && 'root' in content
          ? { kind: 'rich', data: content }
          : fallback.body
      return {
        title,
        slug,
        excerpt: text(doc.excerpt, fallback.excerpt),
        image: { src: mediaUrl(doc.featuredImage) || fallback.image.src, alt: title },
        category: text(category?.name, fallback.category),
        author: text(doc.authorName, fallback.author),
        date: text(doc.publishedOn, text(doc.createdAt, fallback.date)),
        body,
        seoTitle: text(seo?.title) || undefined,
        seoDescription: text(seo?.description) || undefined,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Post[]
  return mapped.length ? mapped : sample
}

function mapTestimonials(docs: Record<string, unknown>[] | null, sample: Testimonial[]): Testimonial[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const name = text(doc.name)
      const review = text(doc.review)
      if (!name || !review) return null
      const photo = mediaUrl(doc.photo)
      return {
        name,
        role: text(doc.role) || undefined,
        review,
        rating: typeof doc.rating === 'number' ? doc.rating : 5,
        image: photo ? { src: photo, alt: name } : sample[index % sample.length]?.image,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Testimonial[]
  return mapped.length ? mapped : sample
}

function mapTeam(docs: Record<string, unknown>[] | null, sample: TeamMember[]): TeamMember[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc, index) => {
      const fallback = sample[index % sample.length]
      const name = text(doc.name)
      const position = text(doc.position)
      if (!name || !position || !fallback) return null
      return {
        name,
        position,
        description: text(doc.description, fallback.description),
        image: { src: mediaUrl(doc.photo) || fallback.image.src, alt: name },
      }
    })
    .filter((item): item is TeamMember => Boolean(item))
  return mapped.length ? mapped : sample
}

function mapFaqs(docs: Record<string, unknown>[] | null, sample: Faq[]): Faq[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc) => {
      const question = text(doc.question)
      const answer = text(doc.answer)
      if (!question || !answer) return null
      return { question, answer, category: text(doc.category, 'consultation') }
    })
    .filter((item): item is Faq => Boolean(item))
  return mapped.length ? mapped : sample
}

function mapPartners(docs: Record<string, unknown>[] | null, sample: Partner[]): Partner[] {
  if (!docs?.length) return sample
  const mapped = docs
    .map((doc) => {
      const name = text(doc.name)
      if (!name) return null
      const logo = mediaUrl(doc.logo)
      return { name, href: text(doc.website) || undefined, logo: logo || undefined }
    })
    .filter((item): item is NonNullable<typeof item> => item != null) as Partner[]
  return mapped.length ? mapped : sample
}

function mapHome(global: Record<string, unknown> | null, sample: HomeContent): HomeContent {
  if (!global) return sample
  const slides = Array.isArray(global.heroSlides) ? global.heroSlides : []
  const hero = slides
    .map((item, index) => {
      const row = asRecord(item)
      const fallback = sample.hero[index % sample.hero.length]
      const title = text(row?.headline)
      if (!title || !fallback) return null
      return {
        eyebrow: text(row?.eyebrow, fallback.eyebrow),
        title,
        description: text(row?.description, fallback.description),
        image: { src: mediaUrl(row?.image) || fallback.image.src, alt: title },
      }
    })
    .filter((item): item is HomeContent['hero'][number] => Boolean(item))

  const promoRows = Array.isArray(global.promos) ? global.promos : []
  const promos = promoRows
    .map((item, index) => {
      const row = asRecord(item)
      const fallback = sample.promos[index % sample.promos.length]
      const title = text(row?.title)
      if (!title || !fallback) return null
      return {
        title,
        description: text(row?.description, fallback.description),
        href: text(row?.href, fallback.href),
        image: { src: mediaUrl(row?.image) || fallback.image.src, alt: title },
      }
    })
    .filter((item): item is HomeContent['promos'][number] => Boolean(item))

  const about = asRecord(global.about)
  const editorial = asRecord(global.editorial)
  const finalCta = asRecord(global.finalCta)
  const aboutBody = text(about?.body)
  const editorialBody = text(editorial?.body)

  const process = Array.isArray(global.process)
    ? global.process
        .map((item) => {
          const row = asRecord(item)
          const title = text(row?.title)
          const description = text(row?.description)
          return title && description ? { title, description } : null
        })
        .filter((item): item is HomeContent['process'][number] => Boolean(item))
    : []

  const why = Array.isArray(global.whyChoose)
    ? global.whyChoose
        .map((item, index) => {
          const row = asRecord(item)
          const title = text(row?.title)
          const description = text(row?.description)
          if (!title || !description) return null
          return { title, description, icon: text(row?.icon, sample.why[index % sample.why.length]?.icon || 'spark') }
        })
        .filter((item): item is HomeContent['why'][number] => Boolean(item))
    : []

  const stats = Array.isArray(global.stats)
    ? global.stats
        .map((item) => {
          const row = asRecord(item)
          const label = text(row?.label)
          const value = typeof row?.value === 'number' ? row.value : null
          if (!label || value == null) return null
          return { label, value, suffix: text(row?.suffix) }
        })
        .filter((item): item is HomeContent['stats'][number] => Boolean(item))
    : []

  const showroom = Array.isArray(global.showroom)
    ? global.showroom
        .map((item, index) => {
          const row = asRecord(item)
          const src = mediaUrl(row?.image)
          if (!src) return null
          return { src, alt: text(row?.caption, `Showroom ${index + 1}`) }
        })
        .filter((item): item is HomeContent['showroom'][number] => Boolean(item))
    : []

  return {
    hero: hero.length ? hero : sample.hero,
    promos: promos.length ? promos : sample.promos,
    about: {
      eyebrow: text(about?.eyebrow, sample.about.eyebrow),
      title: text(about?.title, sample.about.title),
      paragraphs: aboutBody ? paragraphList(aboutBody) : sample.about.paragraphs,
      image: { src: mediaUrl(about?.image) || sample.about.image.src, alt: text(about?.title, sample.about.image.alt) },
    },
    editorial: {
      eyebrow: text(editorial?.eyebrow, sample.editorial.eyebrow),
      title: text(editorial?.title, sample.editorial.title),
      paragraphs: editorialBody ? paragraphList(editorialBody) : sample.editorial.paragraphs,
      image: {
        src: mediaUrl(editorial?.image) || sample.editorial.image.src,
        alt: text(editorial?.title, sample.editorial.image.alt),
      },
    },
    pillars: sample.pillars,
    process: process.length ? process : sample.process,
    showroom: showroom.length ? showroom : sample.showroom,
    why: why.length ? why : sample.why,
    stats: stats.length ? stats : sample.stats,
    finalCta: {
      eyebrow: text(finalCta?.eyebrow, sample.finalCta.eyebrow),
      title: text(finalCta?.title, sample.finalCta.title),
      description: text(finalCta?.description, sample.finalCta.description),
      image: {
        src: mediaUrl(finalCta?.image) || sample.finalCta.image.src,
        alt: text(finalCta?.title, sample.finalCta.image.alt),
      },
    },
  }
}

function mapChrome(
  sample: Chrome,
  header: Record<string, unknown> | null,
  footer: Record<string, unknown> | null,
  contact: Record<string, unknown> | null,
  social: Record<string, unknown> | null,
  seo: Record<string, unknown> | null,
): Chrome {
  const navigation = Array.isArray(header?.navigation)
    ? header.navigation
        .map((item) => {
          const row = asRecord(item)
          const label = text(row?.label)
          const href = text(row?.href)
          return label && href ? { label, href } : null
        })
        .filter((item): item is { label: string; href: string } => Boolean(item))
    : []
  const links = Array.isArray(social?.links)
    ? social.links
        .map((item) => {
          const row = asRecord(item)
          const platform = text(row?.platform)
          const url = text(row?.url)
          return platform && url ? { platform, url } : null
        })
        .filter((item): item is { platform: string; url: string } => Boolean(item))
    : []
  const cta = asRecord(header?.cta)
  const phone = text(contact?.phone, sample.phone)
  const whatsapp = text(contact?.whatsappNumber, sample.whatsapp).replace(/[^\d]/g, '')

  return {
    announcement: text(header?.announcement, sample.announcement),
    phone,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}`,
    email: text(contact?.email, sample.email),
    whatsapp: whatsapp || sample.whatsapp,
    address: text(contact?.address, sample.address),
    hours: text(contact?.hours, sample.hours),
    footerDescription: text(footer?.description, sample.footerDescription),
    copyright: text(footer?.copyright, sample.copyright),
    social: links.length ? links : sample.social,
    ctaLabel: text(cta?.label) || undefined,
    ctaHref: text(cta?.href) || undefined,
    navigation: navigation.length ? navigation : undefined,
    seoTitle: text(seo?.title, sample.seoTitle),
    seoDescription: text(seo?.description, sample.seoDescription),
    seoImage: mediaUrl(seo?.image) || sample.seoImage,
  }
}

export const loadSite = cache(async (locale: Locale): Promise<SiteData> => {
  const sample = getSample(locale)
  const payload = await getPayloadClientSafe()
  if (!payload) return sample

  const db = payload as unknown as LoosePayload
  const [categories, products, services, projects, posts, testimonials, team, faqs, partners, header, footer, contact, social, seo, homepage] =
    await Promise.all([
      readCollection(db, locale, 'categories'),
      readCollection(db, locale, 'products'),
      readCollection(db, locale, 'services'),
      readCollection(db, locale, 'projects'),
      readCollection(db, locale, 'blog-posts'),
      readCollection(db, locale, 'testimonials'),
      readCollection(db, locale, 'team-members'),
      readCollection(db, locale, 'faqs'),
      readCollection(db, locale, 'partners'),
      readGlobal(db, locale, 'header'),
      readGlobal(db, locale, 'footer'),
      readGlobal(db, locale, 'contact-information'),
      readGlobal(db, locale, 'social-links'),
      readGlobal(db, locale, 'seo-defaults'),
      readGlobal(db, locale, 'homepage'),
    ])

  return {
    chrome: mapChrome(sample.chrome, header, footer, contact, social, seo),
    home: mapHome(homepage, sample.home),
    catalogue: {
      categories: mapCategories(categories, sample.catalogue.categories),
      products: mapProducts(products, sample.catalogue.products),
      services: mapServices(services, sample.catalogue.services),
      projects: mapProjects(projects, sample.catalogue.projects),
      posts: mapPosts(posts, sample.catalogue.posts),
      testimonials: mapTestimonials(testimonials, sample.catalogue.testimonials),
      team: mapTeam(team, sample.catalogue.team),
      faqs: mapFaqs(faqs, sample.catalogue.faqs),
      partners: mapPartners(partners, sample.catalogue.partners),
    },
  }
})

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug) ?? null
}
