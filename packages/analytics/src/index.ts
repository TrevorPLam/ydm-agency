/**
 * FILE: index.ts
 * PURPOSE: Public API exports for the analytics package.
 * ARCHITECTURE: Barrel file that re-exports AnalyticsProvider component and trackEvent utility.
 * KEY RULES: Maintain backward compatibility; export all public types.
 * DEPENDS ON: ./Analytics, ./events, ./types (global Window type augmentation).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import './types';
export { AnalyticsProvider, type AnalyticsProps } from './Analytics';
export { trackEvent, type TrackEventOptions } from './events';
