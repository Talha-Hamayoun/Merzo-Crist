import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOnly } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status'],
    group: 'Studio',
  },
  versions: { drafts: true },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedOnly,
    update: adminOrEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'residential',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Hospitality', value: 'hospitality' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    { name: 'summary', type: 'textarea', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'location', type: 'text', localized: true },
    { name: 'completedOn', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    seoFields,
  ],
}
