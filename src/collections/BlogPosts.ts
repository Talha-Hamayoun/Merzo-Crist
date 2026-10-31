import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOnly } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedOn', '_status'],
    group: 'Journal',
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
    { name: 'excerpt', type: 'textarea', required: true, localized: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
    },
    { name: 'authorName', type: 'text', localized: true },
    {
      name: 'publishedOn',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    seoFields,
  ],
}
