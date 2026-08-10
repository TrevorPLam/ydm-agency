/**
 * FILE: index.ts
 * PURPOSE: Re-export all test data factories and their associated types.
 * ARCHITECTURE: test-utils factories barrel file.
 * KEY RULES: Keep factory exports grouped by domain and re-export their input/output types.
 * DEPENDS ON: ./users, ./leads, ./forms
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { createUser, type User } from './users';
export { createLead, type Lead } from './leads';
export {
  createContactInput,
  createLeadInput,
  createAuditInput,
  type ContactInput,
  type LeadInput,
  type AuditInput,
} from './forms';
