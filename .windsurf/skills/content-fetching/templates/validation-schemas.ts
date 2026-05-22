import { z } from 'zod'

export const contentSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.string().optional(),
})

export type Content = z.infer<typeof contentSchema>
