/**
 * FILE: services-config.ts
 * PURPOSE: Provides ServiceConfig interfaces and re-exports SERVICES_CONFIG from the services directory
 * ARCHITECTURE: Type definitions module that re-exports the canonical SERVICES_CONFIG record from per-service files; consumed by service pages, deliverables pages, FAQ pages, and process pages.
 * KEY RULES: Slugs must match SERVICE_LABELS keys; content must use the firm-level impersonal voice (no we/us/our); FAQs must be answerable for FAQPage JSON-LD; meta titles/descriptions must be SEO-optimized.
 * DEPENDS ON: ./services/index (SERVICES_CONFIG); consumed by apps/firm-website/src/app/services/**, faq-utils.ts.
 * LAST UPDATED: 2026-08-10 Split into per-service files with barrel export
 */
export interface ProcessPhase {
  phase: number;
  title: string;
  duration: string;
  description: string;
}

export interface Deliverable {
  title: string;
  description: string;
  output: string;
  timeline: string;
  outcome: string;
}

export interface ServiceConfig {
  slug: string;
  h1: string;
  subhead: string;
  problemSolution: string;
  included: string[];
  whoItsFor: string;
  howItFits: { label: string; href: string }[];
  workingWithYdm: string;
  faqs: { q: string; a: string }[];
  finalCtaText: string;
  metaTitle: string;
  metaDescription: string;
  processPhases: ProcessPhase[];
  deliverables: Deliverable[];
}

export { SERVICES_CONFIG } from './services';
