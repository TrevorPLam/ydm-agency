/**
 * FILE: index.ts
 * PURPOSE: Public API exports for the forms package.
 * ARCHITECTURE: Barrel file that re-exports form components and validation schemas.
 * KEY RULES: Maintain backward compatibility; export all public types and components; expose the canonical contact schema.
 * DEPENDS ON: ./ContactForm, ./schemas/contact-schema.
 * LAST UPDATED: 2026-08-09 Remove LeadForm and lead schema
 */
export { ContactForm, type ContactFormProps } from './ContactForm';
export { contactFormSchema, type ContactFormInput } from './schemas/contact-schema';
