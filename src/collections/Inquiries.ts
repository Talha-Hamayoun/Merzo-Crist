import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrEditor, anyone, isEditorOrAdmin } from '@/access'
import type { User } from '@/payload-types'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Inquiry', plural: 'Inquiries' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['fullName', 'email', 'service', 'source', 'status', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    create: anyone,
    delete: adminOnly,
    read: adminOrEditor,
    update: adminOrEditor,
  },
  fields: [
    { name: 'fullName', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'service', type: 'text', label: 'Service or product of interest' },
    {
      name: 'contactMethod',
      type: 'select',
      options: [
        { label: 'Phone', value: 'phone' },
        { label: 'Email', value: 'email' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
    },
    { name: 'message', type: 'textarea' },
    { name: 'locale', type: 'text' },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'consultation',
      options: [
        { label: 'Consultation', value: 'consultation' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      access: {
        create: () => false,
        update: ({ req: { user } }) => isEditorOrAdmin(user as User | null),
      },
      admin: { position: 'sidebar' },
    },
  ],
}
