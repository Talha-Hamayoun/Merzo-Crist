export type ImageAsset = {
  src: string
  alt: string
}

export type RichBody =
  | { kind: 'paragraphs'; paragraphs: string[] }
  | { kind: 'rich'; data: unknown }

export type Category = {
  name: string
  slug: string
  description: string
  image: ImageAsset
  order: number
}

export type Product = {
  name: string
  slug: string
  categoryName: string
  categorySlug: string
  summary: string
  featured: boolean
  image: ImageAsset
  gallery: ImageAsset[]
  features: string[]
  specifications: { label: string; value: string }[]
  body: RichBody
  seoTitle?: string
  seoDescription?: string
}

export type Service = {
  title: string
  slug: string
  summary: string
  image: ImageAsset
  features: string[]
  icon: string
  body: RichBody
}

export type ProjectCategory = 'residential' | 'hospitality' | 'commercial'

export type Project = {
  title: string
  slug: string
  category: ProjectCategory
  summary: string
  image: ImageAsset
  gallery: ImageAsset[]
  location?: string
  completed?: string
  body: RichBody
}

export type Post = {
  title: string
  slug: string
  excerpt: string
  image: ImageAsset
  category: string
  author: string
  date: string
  body: RichBody
  seoTitle?: string
  seoDescription?: string
}

export type Testimonial = {
  name: string
  role?: string
  review: string
  rating: number
  image?: ImageAsset
}

export type TeamMember = {
  name: string
  position: string
  description: string
  image: ImageAsset
}

export type Faq = {
  question: string
  answer: string
  category: string
}

export type Partner = {
  name: string
  href?: string
  logo?: string
}

export type HeroSlide = {
  eyebrow: string
  title: string
  description: string
  image: ImageAsset
}

export type Promo = {
  title: string
  description: string
  href: string
  image: ImageAsset
}

export type Chrome = {
  announcement: string
  phone: string
  phoneHref: string
  email: string
  whatsapp: string
  address: string
  hours: string
  footerDescription: string
  copyright: string
  social: { platform: string; url: string }[]
  ctaLabel?: string
  ctaHref?: string
  navigation?: { label: string; href: string }[]
  seoTitle: string
  seoDescription: string
  seoImage?: string
}

export type HomeContent = {
  hero: HeroSlide[]
  promos: Promo[]
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    image: ImageAsset
  }
  editorial: {
    eyebrow: string
    title: string
    paragraphs: string[]
    image: ImageAsset
  }
  pillars: { title: string; text: string }[]
  process: { title: string; description: string }[]
  showroom: ImageAsset[]
  why: { title: string; description: string; icon: string }[]
  stats: { value: number; suffix: string; label: string }[]
  finalCta: {
    eyebrow: string
    title: string
    description: string
    image: ImageAsset
  }
}

export type Catalogue = {
  categories: Category[]
  products: Product[]
  services: Service[]
  projects: Project[]
  posts: Post[]
  testimonials: Testimonial[]
  team: TeamMember[]
  faqs: Faq[]
  partners: Partner[]
}
