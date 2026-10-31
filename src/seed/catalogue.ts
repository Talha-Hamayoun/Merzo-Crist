import 'dotenv/config'
import { getPayload, type Payload } from 'payload'

type Collection = Parameters<Payload['count']>[0]['collection']

import { ar, en, type Copy } from '../content/copy'
import config from '../payload.config'

const categorySlugs = [
  'electric-curtains',
  'wave-curtains',
  'roller-blinds',
  'roman-blinds',
  'zebra-blinds',
  'wooden-blinds',
  'vertical-blinds',
  'american-curtains',
  'custom-curtains',
]

const productMeta = [
  { slug: 'sera-wave-oat', category: 1, featured: true },
  { slug: 'nocturne-electric', category: 0, featured: true },
  { slug: 'alba-roller-stone', category: 2, featured: true },
  { slug: 'palazzo-roman-sand', category: 3, featured: true },
  { slug: 'linea-zebra', category: 4, featured: true },
  { slug: 'oak-slat', category: 5, featured: true },
  { slug: 'gallery-vertical', category: 6, featured: false },
  { slug: 'maison-pleat', category: 7, featured: false },
  { slug: 'atelier-sheer', category: 8, featured: false },
]

const serviceMeta = [
  { slug: 'free-measurement', icon: 'ruler' },
  { slug: 'custom-design', icon: 'design' },
  { slug: 'manufacturing', icon: 'scissors' },
  { slug: 'installation', icon: 'wrench' },
  { slug: 'maintenance', icon: 'support' },
  { slug: 'consultation', icon: 'chat' },
]

const projectMeta = [
  { slug: 'palm-court-living-room', category: 'residential', completed: '2025-06-12' },
  { slug: 'hotel-lounge-sheers', category: 'hospitality', completed: '2025-03-04' },
  { slug: 'north-gallery', category: 'commercial', completed: '2024-11-18' },
  { slug: 'linen-bedroom-suite', category: 'residential', completed: '2025-01-22' },
  { slug: 'courtyard-house', category: 'residential', completed: '2024-09-09' },
  { slug: 'evening-reception', category: 'hospitality', completed: '2025-04-02' },
]

const postMeta = [
  { slug: 'heading-for-a-tall-window', category: 'design-notes', date: '2025-09-12' },
  { slug: 'layering-a-sheer', category: 'materials', date: '2025-08-03' },
  { slug: 'what-installation-includes', category: 'atelier', date: '2025-07-16' },
]

const blogCategories = [
  { slug: 'design-notes', en: 'Design notes', ar: 'ملاحظات تصميم' },
  { slug: 'materials', en: 'Materials', ar: 'الخامات' },
  { slug: 'atelier', en: 'Atelier', ar: 'المحترف' },
]

const faqCategories = ['types', 'customization', 'measurement', 'installation', 'delivery', 'maintenance', 'consultation']
const whyIcons = ['gem', 'pen', 'team', 'calendar', 'badge', 'handshake'] as const
const statValues = [48, 36, 6, 52]
const promoHrefs = ['/products', '/services/custom-design', '/services/installation', '/contact']

const nav = [
  { href: '/', en: 'Home', ar: 'الرئيسية' },
  { href: '/about', en: 'About Us', ar: 'من نحن' },
  { href: '/products', en: 'Products', ar: 'المنتجات' },
  { href: '/services', en: 'Services', ar: 'الخدمات' },
  { href: '/projects', en: 'Our Projects', ar: 'مشاريعنا' },
  { href: '/blog', en: 'Blog', ar: 'المدونة' },
  { href: '/contact', en: 'Contact Us', ar: 'تواصل معنا' },
]

function richText(paragraphs: string[], direction: 'ltr' | 'rtl') {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction,
      children: paragraphs.map((paragraph) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph,
            version: 1,
          },
        ],
      })),
    },
  }
}

async function count(payload: Payload, collection: Collection) {
  const result = await payload.count({ collection, overrideAccess: true })
  return result.totalDocs
}

async function seedPair(
  payload: Payload,
  collection: Collection,
  english: Record<string, unknown>,
  arabic: Record<string, unknown>,
  draft = false,
) {
  const created = await payload.create({
    collection,
    locale: 'en',
    overrideAccess: true,
    draft,
    data: english,
  })
  await payload.update({
    collection,
    id: created.id,
    locale: 'ar',
    overrideAccess: true,
    data: arabic,
  })
  return created.id
}

async function seedCategoriesAndProducts(payload: Payload) {
  if ((await count(payload, 'categories')) > 0) {
    console.log('categories: already present')
  } else {
    for (const [index, slug] of categorySlugs.entries()) {
      const english = en.categories[index]
      const arabic = ar.categories[index]
      if (!english || !arabic) throw new Error(`Missing category copy at ${index}`)
      await seedPair(
        payload,
        'categories',
        { name: english.name, slug, description: english.description, order: index, published: true },
        { name: arabic.name, description: arabic.description },
      )
    }
    console.log(`categories: seeded ${categorySlugs.length}`)
  }

  if ((await count(payload, 'products')) > 0) {
    console.log('products: already present')
    return
  }

  const categories = await payload.find({ collection: 'categories', limit: 20, overrideAccess: true, locale: 'en' })
  const categoryId = new Map(categories.docs.map((doc) => [doc.slug, doc.id]))
  for (const [index, meta] of productMeta.entries()) {
    const english = en.products[index]
    const arabic = ar.products[index]
    const category = categoryId.get(categorySlugs[meta.category] ?? '')
    if (!english || !arabic || !category) throw new Error(`Missing product copy at ${index}`)
    await seedPair(
      payload,
      'products',
      {
        name: english.name,
        slug: meta.slug,
        category,
        summary: english.summary,
        description: english.paragraph,
        featured: meta.featured,
        features: english.features.map((text) => ({ text })),
        specifications: english.specs.map(([label, value]) => ({ label, value })),
        _status: 'published',
      },
      {
        name: arabic.name,
        summary: arabic.summary,
        description: arabic.paragraph,
        features: arabic.features.map((text) => ({ text })),
        specifications: arabic.specs.map(([label, value]) => ({ label, value })),
      },
    )
  }
  console.log(`products: seeded ${productMeta.length}`)
}

async function seedServices(payload: Payload) {
  if ((await count(payload, 'services')) > 0) {
    console.log('services: already present')
    return
  }
  for (const [index, meta] of serviceMeta.entries()) {
    const english = en.services[index]
    const arabic = ar.services[index]
    if (!english || !arabic) throw new Error(`Missing service copy at ${index}`)
    await seedPair(
      payload,
      'services',
      {
        title: english.title,
        slug: meta.slug,
        summary: english.summary,
        description: english.paragraph,
        icon: meta.icon,
        features: english.features.map((text) => ({ text })),
        _status: 'published',
      },
      {
        title: arabic.title,
        summary: arabic.summary,
        description: arabic.paragraph,
        features: arabic.features.map((text) => ({ text })),
      },
    )
  }
  console.log(`services: seeded ${serviceMeta.length}`)
}

async function seedProjects(payload: Payload) {
  if ((await count(payload, 'projects')) > 0) {
    console.log('projects: already present')
    return
  }
  for (const [index, meta] of projectMeta.entries()) {
    const english = en.projects[index]
    const arabic = ar.projects[index]
    if (!english || !arabic) throw new Error(`Missing project copy at ${index}`)
    await seedPair(
      payload,
      'projects',
      {
        title: english.title,
        slug: meta.slug,
        category: meta.category,
        summary: english.summary,
        description: english.paragraphs.join('\n\n'),
        location: english.location,
        completedOn: meta.completed,
        _status: 'published',
      },
      {
        title: arabic.title,
        summary: arabic.summary,
        description: arabic.paragraphs.join('\n\n'),
        location: arabic.location,
      },
    )
  }
  console.log(`projects: seeded ${projectMeta.length}`)
}

async function seedJournal(payload: Payload) {
  const categoryIds = new Map<string, number>()
  if ((await count(payload, 'blog-categories')) > 0) {
    console.log('blog-categories: already present')
    const existing = await payload.find({ collection: 'blog-categories', limit: 20, overrideAccess: true, locale: 'en' })
    for (const doc of existing.docs) categoryIds.set(doc.slug, doc.id)
  } else {
    for (const item of blogCategories) {
      const id = await seedPair(payload, 'blog-categories', { name: item.en, slug: item.slug }, { name: item.ar })
      categoryIds.set(item.slug, id)
    }
    console.log(`blog-categories: seeded ${blogCategories.length}`)
  }

  if ((await count(payload, 'blog-posts')) > 0) {
    console.log('blog-posts: already present')
  } else {
    for (const [index, meta] of postMeta.entries()) {
      const english = en.posts[index]
      const arabic = ar.posts[index]
      const category = categoryIds.get(meta.category)
      if (!english || !arabic || !category) throw new Error(`Missing post copy at ${index}`)
      await seedPair(
        payload,
        'blog-posts',
        {
          title: english.title,
          slug: meta.slug,
          excerpt: english.excerpt,
          content: richText(english.paragraphs, 'ltr'),
          category,
          authorName: 'Merzo Crist',
          publishedOn: meta.date,
          _status: 'published',
        },
        {
          title: arabic.title,
          excerpt: arabic.excerpt,
          content: richText(arabic.paragraphs, 'rtl'),
          authorName: 'ميرزو كريست',
        },
      )
    }
    console.log(`blog-posts: seeded ${postMeta.length}`)
  }

  if ((await count(payload, 'testimonials')) > 0) {
    console.log('testimonials: already present')
  } else {
    for (const [index, english] of en.testimonials.entries()) {
      const arabic = ar.testimonials[index]
      if (!arabic) throw new Error(`Missing testimonial copy at ${index}`)
      await seedPair(
        payload,
        'testimonials',
        { name: 'Merzo Crist', role: english.role, review: english.review, rating: 5, order: index, published: true },
        { role: arabic.role, review: arabic.review },
      )
    }
    console.log(`testimonials: seeded ${en.testimonials.length}`)
  }

  if ((await count(payload, 'faqs')) > 0) {
    console.log('faqs: already present')
  } else {
    for (const [index, english] of en.faqs.entries()) {
      const arabic = ar.faqs[index]
      if (!arabic) throw new Error(`Missing faq copy at ${index}`)
      await seedPair(
        payload,
        'faqs',
        {
          question: english.question,
          answer: english.answer,
          category: faqCategories[index] ?? 'consultation',
          order: index,
          published: true,
        },
        { question: arabic.question, answer: arabic.answer },
      )
    }
    console.log(`faqs: seeded ${en.faqs.length}`)
  }
}

async function seedStudio(payload: Payload) {
  if ((await count(payload, 'team-members')) > 0) {
    console.log('team-members: already present')
  } else {
    for (const [index, english] of en.team.entries()) {
      const arabic = ar.team[index]
      if (!arabic) throw new Error(`Missing team copy at ${index}`)
      await seedPair(
        payload,
        'team-members',
        { name: english.name, position: english.position, description: english.description.trim(), order: index, published: true },
        { name: arabic.name, position: arabic.position, description: arabic.description.trim() },
      )
    }
    console.log(`team-members: seeded ${en.team.length}`)
  }

  if ((await count(payload, 'partners')) > 0) {
    console.log('partners: already present')
  } else {
    for (const [index, name] of en.partners.entries()) {
      const arabic = ar.partners[index]
      if (!arabic) throw new Error(`Missing partner copy at ${index}`)
      await seedPair(payload, 'partners', { name, order: index, published: true }, { name: arabic })
    }
    console.log(`partners: seeded ${en.partners.length}`)
  }
}

function homeFields(copy: Copy) {
  return {
    heroSlides: copy.hero.map((item) => ({
      eyebrow: item.eyebrow,
      headline: item.title,
      description: item.description,
    })),
    promos: copy.promos.map((item, index) => ({
      title: item.title,
      description: item.description,
      href: promoHrefs[index] ?? '/contact',
    })),
    about: {
      eyebrow: copy.about.eyebrow,
      title: copy.about.title,
      body: copy.about.paragraphs.join('\n\n'),
    },
    editorial: {
      eyebrow: copy.editorial.eyebrow,
      title: copy.editorial.title,
      body: copy.editorial.paragraphs.join('\n\n'),
    },
    process: copy.process,
    whyChoose: copy.why.map((item, index) => ({
      title: item.title,
      description: item.description,
      icon: whyIcons[index] ?? 'gem',
    })),
    stats: copy.stats.map((label, index) => ({
      value: statValues[index] ?? 0,
      suffix: '',
      label,
    })),
    finalCta: copy.finalCta,
  }
}

async function seedGlobals(payload: Payload) {
  await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    overrideAccess: true,
    data: {
      announcement: en.announcement,
      navigation: nav.map((item) => ({ label: item.en, href: item.href })),
      cta: { label: 'Book a Free Consultation', href: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'header',
    locale: 'ar',
    overrideAccess: true,
    data: {
      announcement: ar.announcement,
      navigation: nav.map((item) => ({ label: item.ar, href: item.href })),
      cta: { label: 'احجز استشارة مجانية', href: '/contact' },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    overrideAccess: true,
    data: { description: en.footer, copyright: en.copyright },
  })
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'ar',
    overrideAccess: true,
    data: { description: ar.footer, copyright: ar.copyright },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    overrideAccess: true,
    data: { siteName: 'Merzo Crist', tagline: en.seoDescription },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'ar',
    overrideAccess: true,
    data: { tagline: ar.seoDescription },
  })

  await payload.updateGlobal({
    slug: 'contact-information',
    locale: 'en',
    overrideAccess: true,
    data: {
      phone: '+966 50 000 0000',
      whatsappNumber: '966500000000',
      email: 'hello@merzocrist.com',
      address: en.address,
      hours: en.hours,
    },
  })
  await payload.updateGlobal({
    slug: 'contact-information',
    locale: 'ar',
    overrideAccess: true,
    data: { address: ar.address, hours: ar.hours },
  })

  await payload.updateGlobal({
    slug: 'seo-defaults',
    locale: 'en',
    overrideAccess: true,
    data: { title: en.seoTitle, description: en.seoDescription },
  })
  await payload.updateGlobal({
    slug: 'seo-defaults',
    locale: 'ar',
    overrideAccess: true,
    data: { title: ar.seoTitle, description: ar.seoDescription },
  })

  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'en',
    overrideAccess: true,
    data: homeFields(en),
  })
  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'ar',
    overrideAccess: true,
    data: homeFields(ar),
  })

  console.log('globals: header, footer, site settings, contact, SEO, and homepage seeded')
}

async function main() {
  if (!process.env.MAIN_DATABASE_URL || !process.env.PAYLOAD_SECRET) {
    console.error('Set MAIN_DATABASE_URL and PAYLOAD_SECRET before seeding.')
    process.exit(1)
  }

  console.log('connecting')
  const payload = await getPayload({ config })
  console.log('connected')
  await seedCategoriesAndProducts(payload)
  await seedServices(payload)
  await seedProjects(payload)
  await seedJournal(payload)
  await seedStudio(payload)
  await seedGlobals(payload)
  console.log('done')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
