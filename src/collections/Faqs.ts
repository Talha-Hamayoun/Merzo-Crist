import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedFlag } from '@/access'
import { orderField, publishedField } from '@/fields/common'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'published'],
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
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'textarea', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'consultation',
      options: [
        { label: 'Curtain types', value: 'types' },
        { label: 'Customization', value: 'customization' },
        { label: 'Measurements', value: 'measurement' },
        { label: 'Installation', value: 'installation' },
        { label: 'Delivery', value: 'delivery' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Consultation', value: 'consultation' },
      ],
    },
    orderField,
    publishedField,
  ],
}
