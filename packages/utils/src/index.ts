/**
 * FILE: index.ts
 * PURPOSE: Public API barrel exports for the @ydm-agency/utils package.
 * ARCHITECTURE: Re-exports the cn, formatCurrency, and formatDate utilities as the package's public surface.
 * KEY RULES: Maintain backward compatibility; export all public utilities; keep the API surface consistent.
 * DEPENDS ON: ./cn, ./formatCurrency, ./formatDate.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export { cn } from './cn';
export { formatCurrency } from './formatCurrency';
export { formatDate } from './formatDate';
