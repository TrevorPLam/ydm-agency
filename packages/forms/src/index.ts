/**
 * FILE: index.ts
 * PURPOSE: Public API exports for the forms package.
 * ARCHITECTURE: Barrel file that re-exports form components and validation schemas.
 * KEY RULES: Maintain backward compatibility; export all public types and components; expose the canonical contact schema.
 * DEPENDS ON: ./LeadForm, ./ContactForm, ./schemas/lead-schema, ./schemas/contact-schema.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export { LeadForm, type LeadFormProps } from './LeadForm';
export { ContactForm, type ContactFormProps } from './ContactForm';
export { leadCaptureSchema, type LeadCaptureInput } from './schemas/lead-schema';
export { contactFormSchema, type ContactFormInput } from './schemas/contact-schema';
