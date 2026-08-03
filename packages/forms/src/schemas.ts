import { z } from 'zod';

export { leadCaptureSchema, type LeadCaptureInput } from './schemas/lead-schema';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  projectType: z
    .preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(['website', 'traffic-leads', 'other']).optional()
    ),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  _honeypot: z.string().refine((val) => val === '', 'Bot detected'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
