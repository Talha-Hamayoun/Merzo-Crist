import type { Field } from 'payload'

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Shared across languages. Use lowercase English words, for example wave-curtains.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, req }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[fieldToUse]
        const locale = typeof req?.locale === 'string' ? req.locale : undefined
        const raw = readLocaleString(source, locale)
        const next = raw ? slugify(raw) : ''
        return next || value
      },
    ],
  },
})

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Meta Title',
      admin: {
        description: 'Overrides the default page title for search engines.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Meta Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No Index',
      defaultValue: false,
      admin: {
        description: 'Prevent search engines from indexing this page.',
      },
    },
  ],
}

function readLocaleString(source: unknown, locale?: string): string {
  if (typeof source === 'string') return source
  if (!source || typeof source !== 'object') return ''
  const record = source as Record<string, unknown>
  const preferred = locale ? record[locale] : undefined
  if (typeof preferred === 'string') return preferred
  if (typeof record.en === 'string') return record.en
  const first = Object.values(record).find((value) => typeof value === 'string')
  return typeof first === 'string' ? first : ''
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
