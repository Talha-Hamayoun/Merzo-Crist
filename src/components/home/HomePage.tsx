import { getTranslations } from 'next-intl/server'

import { BrandIcon } from '@/components/brand/Icon'
import { CategoryCard, PostCard, ProductCard, ServiceCard } from '@/components/catalog/Cards'
import { ArticleBody } from '@/components/common/ArticleBody'
import { FaqList, PartnerRow, StatsBand, TestimonialSlider } from '@/components/home/Interactive'
import { Hero } from '@/components/home/Hero'
import { Gallery } from '@/components/media/Gallery'
import { MediaImage } from '@/components/media/MediaImage'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { loadSite } from '@/lib/data/store'

export async function HomePage({ locale }: { locale: Locale }) {
  const site = await loadSite(locale)
  const t = await getTranslations('sections')
  const common = await getTranslations('common')
  const nav = await getTranslations('nav')
  const projects = await getTranslations('projects')
  const featured = site.catalogue.products.filter((product) => product.featured).slice(0, 6)
  const products = featured.length ? featured : site.catalogue.products.slice(0, 6)

  return (
    <>
      <Hero slides={site.home.hero} />

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-3 md:grid-cols-12">
          {site.home.promos.map((promo, index) => (
            <Link
              key={promo.title}
              href={promo.href}
              className={`group relative min-h-64 overflow-hidden bg-sand ${index === 0 ? 'md:col-span-7 md:row-span-2 md:min-h-[36rem]' : index === 3 ? 'md:col-span-12 md:min-h-56' : 'md:col-span-5'}`}
            >
              <MediaImage image={promo.image} sizes="(min-width: 768px) 50vw, 100vw" className="image-zoom" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-charcoal/10 p-6 text-ivory md:p-8">
                <div className="max-w-md">
                  <h2 className="font-display text-4xl">{promo.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/80">{promo.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site grid items-center gap-12 py-8 md:grid-cols-2 md:py-16">
        <Reveal>
          <div className="relative">
            <div className="absolute -bottom-4 -end-4 h-full w-full border border-bronze/50" />
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <MediaImage image={site.home.about.image} sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">{site.home.about.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{site.home.about.title}</h2>
          <ArticleBody body={{ kind: 'paragraphs', paragraphs: site.home.about.paragraphs }} />
          <Button href="/about" variant="outline" className="mt-8">
            {t('editorialCta')}
          </Button>
        </Reveal>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading eyebrow={t('servicesEyebrow')} title={t('servicesTitle')} text={t('servicesText')} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {site.catalogue.services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t('categoriesEyebrow')} title={t('categoriesTitle')} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.catalogue.categories.map((category) => (
              <CategoryCard key={category.slug} category={category} cta={common('explore')} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t('productsEyebrow')} title={t('productsTitle')} text={t('productsText')} />
          <Link href="/products" className="text-sm text-bronze-deep">
            {common('viewAll')}
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} cta={common('viewDetails')} />
          ))}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t('projectsEyebrow')} title={t('projectsTitle')} text={t('projectsText')} />
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {site.catalogue.projects.slice(0, 6).map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group hover-card mb-4 block break-inside-avoid">
                <div className={`relative overflow-hidden bg-sand ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                  <MediaImage image={project.image} sizes="(min-width: 1024px) 30vw, 100vw" className="image-zoom" />
                  <div className="hover-sheet absolute inset-0 flex items-center justify-center bg-black/50 p-6 text-center text-ivory">
                    <div>
                      <p className="text-[0.68rem] tracking-[0.16em] text-champagne uppercase">{projects(project.category)}</p>
                      <h3 className="mt-2 font-display text-3xl">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading eyebrow={t('processEyebrow')} title={t('processTitle')} />
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {site.home.process.map((step, index) => (
            <li key={step.title} className="border-t border-bronze/40 pt-5">
              <span className="font-display text-4xl text-bronze">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site py-8 md:py-12">
        <SectionHeading eyebrow={t('showroomEyebrow')} title={t('showroomTitle')} />
        <div className="mt-10">
          <Gallery images={site.home.showroom} />
        </div>
      </section>

      <section className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">{site.home.editorial.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{site.home.editorial.title}</h2>
          <ArticleBody body={{ kind: 'paragraphs', paragraphs: site.home.editorial.paragraphs }} />
        </div>
        <div className="relative aspect-[5/4] overflow-hidden bg-sand">
          <MediaImage image={site.home.editorial.image} sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t('whyEyebrow')} title={t('whyTitle')} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.home.why.map((item) => (
              <article key={item.title} className="border border-border bg-surface p-7">
                <BrandIcon name={item.icon} className="size-6 text-bronze-deep" />
                <h3 className="mt-5 font-display text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PartnerRow partners={site.catalogue.partners} />
      <StatsBand stats={site.home.stats} />

      <section className="container-site py-16 md:py-24">
        <SectionHeading eyebrow={t('teamEyebrow')} title={t('teamTitle')} align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.catalogue.team.map((member) => (
            <article key={member.name}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <MediaImage image={member.image} sizes="(min-width: 1024px) 22vw, 50vw" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{member.name}</h3>
              <p className="text-sm text-bronze-deep">{member.position}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t('notesEyebrow')} title={t('notesTitle')} align="center" />
          <div className="mt-10">
            <TestimonialSlider items={site.catalogue.testimonials} />
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t('blogEyebrow')} title={t('blogTitle')} />
          <Link href="/blog" className="text-sm text-bronze-deep">{common('viewAll')}</Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {site.catalogue.posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} cta={common('readMore')} />
          ))}
        </div>
      </section>

      <section className="container-site py-8 md:py-16">
        <SectionHeading eyebrow={t('faqEyebrow')} title={t('faqTitle')} align="center" />
        <div className="mt-10">
          <FaqList items={site.catalogue.faqs} />
        </div>
      </section>

      <section className="relative mt-8 min-h-[28rem] overflow-hidden bg-charcoal text-ivory">
        <MediaImage image={site.home.finalCta.image} sizes="100vw" className="opacity-45" />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="container-site relative z-10 flex min-h-[28rem] flex-col items-start justify-center py-16">
          <p className="eyebrow text-champagne">{site.home.finalCta.eyebrow}</p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-[0.95] md:text-6xl">{site.home.finalCta.title}</h2>
          <p className="mt-4 max-w-md text-ivory/80">{site.home.finalCta.description}</p>
          <Button href="/contact#consultation" variant="light" className="mt-8">
            {nav('consult')}
          </Button>
        </div>
      </section>
    </>
  )
}
