/**
 * FILE: lead-schema.ts
 * PURPOSE: Zod validation schema for lead capture form with company and budget information.
 * ARCHITECTURE: Validation schema using Zod for lead generation with optional company and budget fields.
 * KEY RULES: Minimum length requirements for name and message; email format validation; optional fields for company and budget.
 * DEPENDS ON: zod.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { z } from 'zod';

export const leadCaptureSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
