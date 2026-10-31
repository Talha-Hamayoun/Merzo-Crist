import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedFlag } from '@/access'
import { orderField, publishedField } from '@/fields/common'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'order', 'published'],
    group: 'Journal',
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedFlag,
    update: adminOrEditor,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', localized: true },
    { name: 'review', type: 'textarea', required: true, localized: true },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    orderField,
    publishedField,
  ],
}
