import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOnly } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', '_status'],
    group: 'Catalogue',
  },
  versions: { drafts: true },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedOnly,
    update: adminOrEditor,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField('name'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    { name: 'summary', type: 'textarea', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
