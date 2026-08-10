/**
 * FILE: schemas.ts
 * PURPOSE: Central schema barrel for the forms package, re-exporting from individual schema files.
 * ARCHITECTURE: Thin barrel that re-exports the canonical contact and lead schemas.
 * KEY RULES: Maintain backward compatibility; do not define schemas here; use the canonical deep modules.
 * DEPENDS ON: ./schemas/contact-schema, ./schemas/lead-schema.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { contactFormSchema, type ContactFormInput } from './schemas/contact-schema';
export { leadCaptureSchema, type LeadCaptureInput } from './schemas/lead-schema';
