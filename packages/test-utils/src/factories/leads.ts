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
