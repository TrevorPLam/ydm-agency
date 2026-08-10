/**
 * FILE: leads.ts
 * PURPOSE: Provide a factory for Supabase lead row fixtures.
 * ARCHITECTURE: test-utils factory, deterministic default lead with optional overrides.
 * KEY RULES: Defaults must match the expected Supabase leads table shape and status enum.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  source?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'closed';
  timestamp?: string;
}

/**
 * WHAT IT DOES: Builds a lead fixture with default values matching the Supabase leads table.
 * @param {Partial<Lead>} [overrides] – optional field overrides
 * @return {Lead} – a complete lead fixture
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
export function createLead(overrides?: Partial<Lead>): Lead {
  return {
    name: 'Jordan Doe',
    email: 'jordan@example.com',
    company: 'Example Inc.',
    budget: '$5,000 - $10,000',
    message:
      'We need help generating more qualified leads from our website and improving conversion rates.',
    source: 'contact',
    status: 'new',
    timestamp: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}
