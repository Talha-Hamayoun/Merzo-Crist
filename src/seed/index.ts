import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  if (!process.env.MAIN_DATABASE_URL || !process.env.PAYLOAD_SECRET) {
    console.error('Set MAIN_DATABASE_URL and PAYLOAD_SECRET before seeding.')
    process.exit(1)
  }
  const password = process.env.SEED_ADMIN_PASSWORD
  if (!password) {
    console.error('Set SEED_ADMIN_PASSWORD before creating an admin user.')
    process.exit(1)
  }

  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.docs[0]) {
    console.log('A user already exists. Catalogue content can be edited in the admin.')
    return
  }

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@merzocrist.com'
  await payload.create({
    collection: 'users',
    data: {
      name: 'Merzo Crist Admin',
      email,
      password,
      role: 'admin',
      active: true,
    },
  })
  console.log(`Created admin user ${email}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
