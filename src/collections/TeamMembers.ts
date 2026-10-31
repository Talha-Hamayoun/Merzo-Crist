import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedFlag } from '@/access'
import { orderField, publishedField } from '@/fields/common'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team Member', plural: 'Team Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'order', 'published'],
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
    { name: 'position', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Email', value: 'email' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    orderField,
    publishedField,
  ],
}
