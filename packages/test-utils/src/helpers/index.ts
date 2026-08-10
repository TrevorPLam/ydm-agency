/**
 * FILE: index.ts
 * PURPOSE: Re-export shared testing-library helpers for tests across the monorepo.
 * ARCHITECTURE: test-utils helpers barrel file.
 * KEY RULES: Only expose setup, render, and user-event utilities.
 * DEPENDS ON: ./testing-library
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export { setupTest, renderWithProviders, createUserEvent } from './testing-library';
