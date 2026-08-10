/**
 * FILE: index.ts
 * PURPOSE: Re-export the public branding tokens and their TypeScript types.
 * ARCHITECTURE: branding package barrel file.
 * KEY RULES: Keep the public surface limited to tokens and ColorToken/Tokens types.
 * DEPENDS ON: ./tokens
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { tokens } from './tokens';
export type { Tokens, ColorToken } from './tokens';
