import type { CollectionConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access'
import { slugField } from '@/fields/seo'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: { singular: 'Blog Category', plural: 'Blog Categories' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Journal',
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField('name'),
  ],
}
