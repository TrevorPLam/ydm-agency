/**
 * FILE: contact-schema.ts
 * PURPOSE: Zod validation schema for contact form with bot detection via honeypot field.
 * ARCHITECTURE: Validation schema using Zod with preprocessing for optional fields and honeypot bot detection.
 * KEY RULES: Honeypot field must be empty for valid submissions; empty strings convert to undefined for optional fields; minimum length requirements enforced.
 * DEPENDS ON: zod.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  // WHY: Preprocess empty string to undefined for optional enum field
  projectType: z
    .preprocess(
      (val) => (val === '' ? undefined : val),
      z.enum(['website', 'traffic-leads', 'other']).optional()
    ),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  // WHY: Honeypot field must be empty - bots will fill it but users won't see it
  _honeypot: z.string().refine((val) => val === '', 'Bot detected'),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
