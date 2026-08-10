/**
 * FILE: index.ts
 * PURPOSE: Re-export the custom Zod matcher for assertion consumption.
 * ARCHITECTURE: test-utils matchers barrel file.
 * KEY RULES: Keep matcher exports minimal and type-safe.
 * DEPENDS ON: ./zod
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { toHaveZodIssue } from './zod';
