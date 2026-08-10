/**
 * FILE: forms.ts
 * PURPOSE: Provide typed factory functions for contact, lead, and audit form inputs used in tests.
 * ARCHITECTURE: test-utils factories, deterministic default values with optional overrides.
 * KEY RULES: Defaults must be valid shapes; overrides are applied as a partial spread.
 * DEPENDS ON: None
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

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

/**
 * WHAT IT DOES: Builds a contact form input with sensible defaults.
 * @param {Partial<ContactInput>} [overrides] – optional field overrides
 * @return {ContactInput} – a complete contact form input object
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
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

/**
 * WHAT IT DOES: Builds a lead form input with sensible defaults.
 * @param {Partial<LeadInput>} [overrides] – optional field overrides
 * @return {LeadInput} – a complete lead form input object
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
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

/**
 * WHAT IT DOES: Builds an audit request form input with sensible defaults.
 * @param {Partial<AuditInput>} [overrides] – optional field overrides
 * @return {AuditInput} – a complete audit form input object
 * SIDE EFFECTS: None
 * ASSUMES: None
 */
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
