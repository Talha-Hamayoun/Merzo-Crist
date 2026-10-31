import { ar, en, type Copy } from '@/content/copy'
import { photos } from '@/content/photos'
import type { Locale } from '@/i18n/routing'
import type { Catalogue, Chrome, HomeContent, ImageAsset, RichBody } from '@/types/site'

const phone = '+966 50 000 0000'
const phoneHref = 'tel:+966500000000'
const email = 'hello@merzocrist.com'
const whatsapp = '966500000000'

const categoryMeta = [
  { slug: 'electric-curtains', image: photos.bedroomNight },
  { slug: 'wave-curtains', image: photos.livingGold },
  { slug: 'roller-blinds', image: photos.modern },
  { slug: 'roman-blinds', image: photos.bedroomLinen },
  { slug: 'zebra-blinds', image: photos.sheer },
  { slug: 'wooden-blinds', image: photos.lounge },
  { slug: 'vertical-blinds', image: photos.gallery },
  { slug: 'american-curtains', image: photos.livingStone },
  { slug: 'custom-curtains', image: photos.fabric },
]

const productMeta = [
  { slug: 'sera-wave-oat', category: 1, featured: true, image: photos.livingGold, gallery: [photos.livingWindow, photos.detail] },
  { slug: 'nocturne-electric', category: 0, featured: true, image: photos.bedroomNight, gallery: [photos.bedroomCalm, photos.suite] },
  { slug: 'alba-roller-stone', category: 2, featured: true, image: photos.modern, gallery: [photos.kitchen, photos.bright] },
  { slug: 'palazzo-roman-sand', category: 3, featured: true, image: photos.bedroomLinen, gallery: [photos.bedroomWhite, photos.bedroomWindow] },
  { slug: 'linea-zebra', category: 4, featured: true, image: photos.sheer, gallery: [photos.apartment, photos.bedroomWindow] },
  { slug: 'oak-slat', category: 5, featured: true, image: photos.lounge, gallery: [photos.nordic, photos.interior] },
  { slug: 'gallery-vertical', category: 6, featured: false, image: photos.gallery, gallery: [photos.house, photos.bright] },
  { slug: 'maison-pleat', category: 7, featured: false, image: photos.livingStone, gallery: [photos.livingSoft, photos.sofa] },
  { slug: 'atelier-sheer', category: 8, featured: false, image: photos.fabric, gallery: [photos.bedroomWhite, photos.sheer] },
]

const serviceMeta = [
  { slug: 'free-measurement', icon: 'ruler', image: photos.interior },
  { slug: 'custom-design', icon: 'design', image: photos.fabric },
  { slug: 'manufacturing', icon: 'scissors', image: photos.detail },
  { slug: 'installation', icon: 'wrench', image: photos.livingWindow },
  { slug: 'maintenance', icon: 'support', image: photos.bedroomCalm },
  { slug: 'consultation', icon: 'chat', image: photos.livingSoft },
]

const projectMeta = [
  { slug: 'palm-court-living-room', category: 'residential' as const, image: photos.livingGold, gallery: [photos.livingWindow, photos.livingSoft], completed: '2025-06-12' },
  { slug: 'hotel-lounge-sheers', category: 'hospitality' as const, image: photos.lounge, gallery: [photos.sofa, photos.sheer], completed: '2025-03-04' },
  { slug: 'north-gallery', category: 'commercial' as const, image: photos.gallery, gallery: [photos.modern, photos.bright], completed: '2024-11-18' },
  { slug: 'linen-bedroom-suite', category: 'residential' as const, image: photos.bedroomLinen, gallery: [photos.bedroomWhite, photos.bedroomWindow], completed: '2025-01-22' },
  { slug: 'courtyard-house', category: 'residential' as const, image: photos.nordic, gallery: [photos.house, photos.interior], completed: '2024-09-09' },
  { slug: 'evening-reception', category: 'hospitality' as const, image: photos.livingStone, gallery: [photos.livingGreen, photos.detail], completed: '2025-04-02' },
]

const postMeta = [
  { slug: 'heading-for-a-tall-window', author: 'Merzo Crist', date: '2025-09-12', image: photos.livingStone },
  { slug: 'layering-a-sheer', author: 'Merzo Crist', date: '2025-08-03', image: photos.sheer },
  { slug: 'what-installation-includes', author: 'Merzo Crist', date: '2025-07-16', image: photos.livingWindow },
]

const whyIcons = ['gem', 'pen', 'team', 'calendar', 'badge', 'handshake']
const statValues = [48, 36, 6, 52]
const faqCategories = ['types', 'customization', 'measurement', 'installation', 'delivery', 'maintenance', 'consultation']
const promoHrefs = ['/products', '/services/custom-design', '/services/installation', '/contact']
const promoImages = [photos.livingGold, photos.fabric, photos.livingWindow, photos.bedroomLinen]
const heroImages = [photos.bedroomWhite, photos.livingWindow, photos.sheer]
const showroomImages = [photos.interior, photos.fabric, photos.detail, photos.gallery, photos.bedroomWhite, photos.lounge]
const teamImages = [photos.portraitA, photos.portraitB, photos.portraitC, photos.portraitD]
const guestImages = [photos.livingWindow, photos.sheer, photos.detail]

function paragraphs(text: string): RichBody {
  return { kind: 'paragraphs', paragraphs: [text] }
}

function image(src: string, alt: string): ImageAsset {
  return { src, alt }
}

export function buildContent(copy: Copy) {
  const categories = copy.categories.map((item, index) => ({
    name: item.name,
    slug: categoryMeta[index]!.slug,
    description: item.description,
    image: image(categoryMeta[index]!.image, item.name),
    order: index,
  }))

  const categoryName = (index: number) => categories[index]?.name ?? ''
  const categorySlug = (index: number) => categories[index]?.slug ?? ''

  const products = copy.products.map((item, index) => {
    const meta = productMeta[index]!
    return {
      name: item.name,
      slug: meta.slug,
      categoryName: categoryName(meta.category),
      categorySlug: categorySlug(meta.category),
      summary: item.summary,
      featured: meta.featured,
      image: image(meta.image, item.name),
      gallery: [image(meta.image, item.name), ...meta.gallery.map((src) => image(src, item.name))],
      features: item.features,
      specifications: item.specs.map(([label, value]) => ({ label, value })),
      body: paragraphs(item.paragraph),
    }
  })

  const services = copy.services.map((item, index) => {
    const meta = serviceMeta[index]!
    return {
      title: item.title,
      slug: meta.slug,
      summary: item.summary,
      image: image(meta.image, item.title),
      features: item.features,
      icon: meta.icon,
      body: paragraphs(item.paragraph),
    }
  })

  const projects = copy.projects.map((item, index) => {
    const meta = projectMeta[index]!
    return {
      title: item.title,
      slug: meta.slug,
      category: meta.category,
      summary: item.summary,
      image: image(meta.image, item.title),
      gallery: [image(meta.image, item.title), ...meta.gallery.map((src) => image(src, item.title))],
      location: item.location,
      completed: meta.completed,
      body: { kind: 'paragraphs' as const, paragraphs: item.paragraphs },
    }
  })

  const posts = copy.posts.map((item, index) => {
    const meta = postMeta[index]!
    return {
      title: item.title,
      slug: meta.slug,
      excerpt: item.excerpt,
      image: image(meta.image, item.title),
      category: item.category,
      author: meta.author,
      date: meta.date,
      body: { kind: 'paragraphs' as const, paragraphs: item.paragraphs },
    }
  })

  const chrome: Chrome = {
    announcement: copy.announcement,
    phone,
    phoneHref,
    email,
    whatsapp,
    address: copy.address,
    hours: copy.hours,
    footerDescription: copy.footer,
    copyright: copy.copyright,
    social: [],
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
    seoImage: photos.livingGold,
  }

  const home: HomeContent = {
    hero: copy.hero.map((item, index) => ({
      ...item,
      image: image(heroImages[index] ?? photos.livingGold, item.title),
    })),
    promos: copy.promos.map((item, index) => ({
      ...item,
      href: promoHrefs[index] ?? '/contact',
      image: image(promoImages[index] ?? photos.livingSoft, item.title),
    })),
    about: {
      ...copy.about,
      image: image(photos.livingSoft, copy.about.title),
    },
    editorial: {
      ...copy.editorial,
      image: image(photos.detail, copy.editorial.title),
    },
    pillars: copy.pillars,
    process: copy.process,
    showroom: showroomImages.map((src, index) => image(src, `${copy.editorial.title} ${index + 1}`)),
    why: copy.why.map((item, index) => ({ ...item, icon: whyIcons[index] ?? 'spark' })),
    stats: copy.stats.map((label, index) => ({
      value: statValues[index] ?? 0,
      suffix: '',
      label,
    })),
    finalCta: {
      ...copy.finalCta,
      image: image(photos.bedroomNight, copy.finalCta.title),
    },
  }

  const catalogue: Catalogue = {
    categories,
    products,
    services,
    projects,
    posts,
    testimonials: copy.testimonials.map((item, index) => ({
      name: item.name,
      role: item.role,
      review: item.review,
      rating: 5,
      image: image(guestImages[index] ?? photos.guestA, item.name),
    })),
    team: copy.team.map((item, index) => ({
      ...item,
      image: image(teamImages[index] ?? photos.portraitA, item.name),
    })),
    faqs: copy.faqs.map((item, index) => ({
      ...item,
      category: faqCategories[index] ?? 'consultation',
    })),
    partners: copy.partners.map((name) => ({ name })),
  }

  return { chrome, home, catalogue }
}

const cache = new Map<Locale, ReturnType<typeof buildContent>>()

export function getSample(locale: Locale) {
  const existing = cache.get(locale)
  if (existing) return existing
  const built = buildContent(locale === 'ar' ? ar : en)
  cache.set(locale, built)
  return built
}
