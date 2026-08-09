export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export function createUser(overrides?: Partial<User>): User {
  return {
    id: 'usr_001',
    name: 'Jordan Doe',
    email: 'jordan@example.com',
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}
