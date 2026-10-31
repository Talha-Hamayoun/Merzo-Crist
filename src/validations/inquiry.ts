import { z } from 'zod'

export const consultationSchema = z.object({
  kind: z.literal('consultation'),
  fullName: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().trim().email(),
  service: z.string().trim().min(1),
  contactMethod: z.enum(['phone', 'email', 'whatsapp']),
  message: z.string().trim().min(10),
  locale: z.string().optional(),
  company: z.string().optional(),
})

export const newsletterSchema = z.object({
  kind: z.literal('newsletter'),
  email: z.string().trim().email(),
  locale: z.string().optional(),
  company: z.string().optional(),
})

export const inquirySchema = z.discriminatedUnion('kind', [consultationSchema, newsletterSchema])

export type ConsultationValues = z.infer<typeof consultationSchema>
export type InquiryPayload = z.infer<typeof inquirySchema>
