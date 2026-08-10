/**
 * FILE: eslint.config.mjs
 * PURPOSE: ESLint configuration for the email package.
 * ARCHITECTURE: packages/email / re-exports the shared UI ESLint config from @ydm-agency/config.
 * KEY RULES: Applies TypeScript, React, and Prettier rules to all source files.
 * DEPENDS ON: @ydm-agency/config/eslint-ui.config.mjs.
 * LAST UPDATED: 2026-08-09 Add package ESLint config.
 */

export { default } from '@ydm-agency/config/eslint-ui.config.mjs';
