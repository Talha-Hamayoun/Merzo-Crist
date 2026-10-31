import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access'

const linkFields = [
  { name: 'label', type: 'text' as const, required: true, localized: true },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
    admin: { description: 'Path without a language prefix, for example /products.' },
  },
]

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    {
      name: 'announcement',
      type: 'text',
      localized: true,
    },
    {
      name: 'navigation',
      type: 'array',
      fields: linkFields,
      admin: { description: 'Leave empty to use the default navigation.' },
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    { name: 'description', type: 'textarea', localized: true },
    { name: 'copyright', type: 'text', localized: true },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Merzo Crist' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'siteLogo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
  ],
}

export const ContactInformation: GlobalConfig = {
  slug: 'contact-information',
  label: 'Contact Information',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    { name: 'phone', type: 'text' },
    {
      name: 'whatsappNumber',
      type: 'text',
      admin: { description: 'Country code and number, without spaces or a plus sign.' },
    },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'textarea', localized: true },
    { name: 'hours', type: 'text', localized: true },
  ],
}

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: anyone, update: adminOrEditor },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'headline', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'promos',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'href', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'editorial',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'process',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
      ],
    },
    {
      name: 'showroom',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    {
      name: 'whyChoose',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Gem', value: 'gem' },
            { label: 'Pen', value: 'pen' },
            { label: 'Team', value: 'team' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Badge', value: 'badge' },
            { label: 'Handshake', value: 'handshake' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Sample figures until verified numbers are entered.' },
      fields: [
        { name: 'value', type: 'number', required: true, min: 0 },
        { name: 'suffix', type: 'text' },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'finalCta',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
