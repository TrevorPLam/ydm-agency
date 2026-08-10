/**
 * FILE: audit-schema.ts
 * PURPOSE: Provides the Zod validation schema for the free marketing audit form, including a honeypot field for bot detection.
 * ARCHITECTURE: Zod object schema exporting auditFormSchema and the inferred AuditFormInput type; consumed by the /audit Server Action.
 * KEY RULES: Must validate name, email, website (URL-like), challenge, and marketingState enum; must include a _honeypot field that rejects non-empty values for bot detection.
 * DEPENDS ON: zod.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { z } from 'zod';

export const auditFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  website: z
    .string()
    .min(3, 'Website is required')
    .regex(
      /^(\S+\.\S+|https?:\/\/\S+)$/,
      'Enter a valid website URL such as example.com or https://example.com'
    ),
  challenge: z.string().min(10, 'Describe your biggest challenge'),
  marketingState: z.enum([
    'no-website',
    'website-no-traffic',
    'traffic-no-leads',
    'leads-now',
    'automation-mess',
    'unsure',
  ]),
  _honeypot: z.string().refine((val) => val === '', 'Bot detected'),
});

export type AuditFormInput = z.infer<typeof auditFormSchema>;
