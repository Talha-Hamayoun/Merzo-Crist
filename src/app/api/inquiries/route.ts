import { NextResponse } from 'next/server'

import { getPayloadClientSafe } from '@/lib/payload'
import { inquirySchema } from '@/validations/inquiry'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const payload = await getPayloadClientSafe()
  if (!payload) {
    return NextResponse.json({ error: 'Unavailable' }, { status: 503 })
  }

  try {
    if (parsed.data.kind === 'newsletter') {
      await payload.create({
        collection: 'inquiries',
        overrideAccess: false,
        data: {
          email: parsed.data.email,
          locale: parsed.data.locale ?? null,
          source: 'newsletter',
          message: 'Newsletter subscription',
          status: 'new',
        },
      })
    } else {
      await payload.create({
        collection: 'inquiries',
        overrideAccess: false,
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          service: parsed.data.service,
          contactMethod: parsed.data.contactMethod,
          message: parsed.data.message,
          locale: parsed.data.locale ?? null,
          source: 'consultation',
          status: 'new',
        },
      })
    }
  } catch {
    return NextResponse.json({ error: 'Could not save inquiry' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
