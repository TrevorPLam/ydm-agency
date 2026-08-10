/**
 * FILE: setup.ts
 * PURPOSE: Test setup file that loads jest-dom matchers for the forms package.
 * ARCHITECTURE: packages/forms / Vitest setup file imported before each test run.
 * KEY RULES: Must be referenced by vitest.config.ts setupFiles and must not contain test logic.
 * DEPENDS ON: @testing-library/jest-dom.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import '@testing-library/jest-dom';
