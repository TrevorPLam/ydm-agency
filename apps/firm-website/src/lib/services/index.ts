/**
 * FILE: index.ts
 * PURPOSE: Barrel export for service configurations
 */
import { webDesignConfig } from './web-design';
import { seoConfig } from './seo';
import { analyticsConfig } from './analytics';
import { paidAdsConfig } from './paid-ads';
import { brandingConfig } from './branding';
import { contentConfig } from './content';
import { automationConfig } from './automation';
import { reputationConfig } from './reputation';

export const SERVICES_CONFIG: Record<string, import('../services-config').ServiceConfig> = {
  'web-design': webDesignConfig,
  'seo': seoConfig,
  'analytics': analyticsConfig,
  'paid-ads': paidAdsConfig,
  'branding': brandingConfig,
  'content': contentConfig,
  'automation': automationConfig,
  'reputation': reputationConfig,
};
