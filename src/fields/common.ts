import type { Field } from 'payload'

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar' },
}

export const publishedField: Field = {
  name: 'published',
  type: 'checkbox',
  defaultValue: true,
  admin: {
    position: 'sidebar',
    description: 'Unpublished entries stay out of the public website.',
  },
}

export const iconField: Field = {
  name: 'icon',
  type: 'select',
  defaultValue: 'spark',
  options: [
    { label: 'Ruler', value: 'ruler' },
    { label: 'Design', value: 'design' },
    { label: 'Scissors', value: 'scissors' },
    { label: 'Wrench', value: 'wrench' },
    { label: 'Support', value: 'support' },
    { label: 'Conversation', value: 'chat' },
    { label: 'Gem', value: 'gem' },
    { label: 'Pen', value: 'pen' },
    { label: 'Team', value: 'team' },
    { label: 'Calendar', value: 'calendar' },
    { label: 'Badge', value: 'badge' },
    { label: 'Handshake', value: 'handshake' },
    { label: 'Spark', value: 'spark' },
  ],
}
