import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedFlag } from '@/access'
import { orderField, publishedField } from '@/fields/common'
import { slugField } from '@/fields/seo'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Product Category', plural: 'Product Categories' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'published'],
    group: 'Catalogue',
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedFlag,
    update: adminOrEditor,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField('name'),
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    orderField,
    publishedField,
  ],
}
