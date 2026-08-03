import { z } from 'zod';

export const leadCaptureSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
