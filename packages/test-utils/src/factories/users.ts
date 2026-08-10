/**
 * FILE: users.ts
 * PURPOSE: Provide a factory for user fixtures used in tests.
 * ARCHITECTURE: test-utils factory, deterministic default user with optional overrides.
 * KEY RULES: Defaults must be valid; overrides are applied as a partial spread.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

/**
 * WHAT IT DOES: Builds a user fixture with default values.
 * @param {Partial<User>} [overrides] – optional field overrides
 * @return {User} – a complete user fixture
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
export function createUser(overrides?: Partial<User>): User {
  return {
    id: 'usr_001',
    name: 'Jordan Doe',
    email: 'jordan@example.com',
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}
