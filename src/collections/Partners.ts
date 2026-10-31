import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedFlag } from '@/access'
import { orderField, publishedField } from '@/fields/common'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'published'],
    group: 'Studio',
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
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    orderField,
    publishedField,
  ],
}
