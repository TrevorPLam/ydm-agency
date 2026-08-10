/**
 * FILE: schemas.ts
 * PURPOSE: Central schema exports for the forms package, re-exporting from individual schema files.
 * ARCHITECTURE: Barrel file that consolidates validation schemas for contact and lead forms.
 * KEY RULES: Maintain backward compatibility; ensure schema consistency across exports.
 * DEPENDS ON: zod, ./schemas/lead-schema.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { z } from 'zod';

export { leadCaptureSchema, type LeadCaptureInput } from './schemas/lead-schema';

// WHY: Contact form schema duplicated here for backward compatibility - consider consolidating to schemas/contact-schema.ts
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
