import { z } from 'zod';

export const leadCaptureSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  projectType: z
    .preprocess((val) => (val === '' ? undefined : val), z.enum(['website', 'seo', 'marketing', 'analytics', 'other']).optional()),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  _honeypot: z.string().refine((val) => val === '', 'Bot detected'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
