export interface ContactInput {
  name: string;
  email: string;
  projectType?: 'website' | 'traffic-leads' | 'other';
  message: string;
  _honeypot: string;
}

export interface LeadInput {
  fullName: string;
  email: string;
  companyName?: string;
  budget?: string;
  message: string;
}

export type AuditMarketingState =
  | 'no-website'
  | 'website-no-traffic'
  | 'traffic-no-leads'
  | 'leads-now'
  | 'automation-mess'
  | 'unsure';

export interface AuditInput {
  name: string;
  email: string;
  website: string;
  challenge: string;
  marketingState: AuditMarketingState;
  _honeypot: string;
}

export function createContactInput(overrides?: Partial<ContactInput>): ContactInput {
  return {
    name: 'Jordan Doe',
    email: 'jordan@example.com',
    projectType: 'website',
    message:
      'I need a new website for my business with e-commerce functionality and a clear conversion path.',
    _honeypot: '',
    ...overrides,
  };
}

export function createLeadInput(overrides?: Partial<LeadInput>): LeadInput {
  return {
    fullName: 'Jordan Doe',
    email: 'jordan@example.com',
    companyName: 'Example Inc.',
    budget: '$5,000 - $10,000',
    message:
      'I need more leads for my B2B SaaS company and want a complete audit of my current funnel.',
    ...overrides,
  };
}

export function createAuditInput(overrides?: Partial<AuditInput>): AuditInput {
  return {
    name: 'Jordan Doe',
    email: 'jordan@example.com',
    website: 'https://example.com',
    challenge:
      'I need more qualified leads and a clearer conversion path on my current site.',
    marketingState: 'traffic-no-leads',
    _honeypot: '',
    ...overrides,
  };
}
