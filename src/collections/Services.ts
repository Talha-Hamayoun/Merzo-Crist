import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOnly } from '@/access'
import { iconField } from '@/fields/common'
import { seoFields, slugField } from '@/fields/seo'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
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
    { name: 'summary', type: 'textarea', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    iconField,
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    seoFields,
  ],
}
