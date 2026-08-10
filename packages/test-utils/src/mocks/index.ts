/**
 * FILE: index.ts
 * PURPOSE: Re-export all API mock fixtures and their option types.
 * ARCHITECTURE: test-utils mocks barrel file.
 * KEY RULES: Re-export every mock factory and its TypeScript type.
 * DEPENDS ON: ./api
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export {
  createMockFetchResponse,
  createMockApiError,
  createMockResendSuccess,
  createMockSupabaseInsert,
  type MockResponseOptions,
} from './api';
