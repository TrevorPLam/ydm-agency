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
