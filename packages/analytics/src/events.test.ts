/**
 * FILE: events.test.ts
 * PURPOSE: Unit tests for the trackEvent function and EVENT_NAMES constants.
 * ARCHITECTURE: Vitest + jsdom; mocks window.gtag, window.posthog, and window.fbq to verify provider dispatch.
 * KEY RULES: Reset window globals and document.cookie before each test; verify consent gating; test all provider calls.
 * DEPENDS ON: vitest, ./events.
 * LAST UPDATED: 2026-08-10 Add unit tests for events.ts
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, EVENT_NAMES, type AnalyticsEventName } from './events';

describe('events', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
      configurable: true,
    });
    window.gtag = undefined;
    window.posthog = undefined;
    window.fbq = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('EVENT_NAMES', () => {
    it('contains all expected event name constants', () => {
      expect(EVENT_NAMES.FORM_SUBMISSION).toBe('form_submission');
      expect(EVENT_NAMES.LEAD_FORM_SUBMITTED).toBe('lead_form_submitted');
      expect(EVENT_NAMES.PRICING_ESTIMATOR_STARTED).toBe('pricing_estimator_started');
      expect(EVENT_NAMES.PRICING_ESTIMATOR_STEP_CHANGED).toBe('pricing_estimator_step_changed');
      expect(EVENT_NAMES.PRICING_ESTIMATOR_RESTARTED).toBe('pricing_estimator_restarted');
      expect(EVENT_NAMES.PRICING_ESTIMATOR_COMPLETED).toBe('pricing_estimator_completed');
      expect(EVENT_NAMES.PRICING_ESTIMATOR_CTA_CLICKED).toBe('pricing_estimator_cta_clicked');
      expect(EVENT_NAMES.LESSON_FILTER).toBe('lesson_filter');
      expect(EVENT_NAMES.LESSON_SHARE_LINK_COPY).toBe('lesson_share_link_copy');
      expect(EVENT_NAMES.LESSON_SHARE).toBe('lesson_share');
      expect(EVENT_NAMES.EDUCATION_SEARCH).toBe('education_search');
      expect(EVENT_NAMES.LESSON_VIEW).toBe('lesson_view');
      expect(EVENT_NAMES.TOPIC_VIEW).toBe('topic_view');
    });
  });

  describe('trackEvent', () => {
    it('does nothing when window is undefined (server-side)', () => {
      const originalWindow = global.window;
      // @ts-expect-error - intentionally removing window for test
      delete global.window;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      // @ts-expect-error - restoring window
      global.window = originalWindow;
    });

    it('does nothing when consent is not granted', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=rejected',
        configurable: true,
      });

      const gtag = vi.fn();
      window.gtag = gtag;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(gtag).not.toHaveBeenCalled();
    });

    it('calls gtag when consent is granted and gtag is available', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const gtag = vi.fn();
      window.gtag = gtag;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(gtag).toHaveBeenCalledWith('event', 'test_event', { foo: 'bar' });
    });

    it('calls posthog.capture when consent is granted and posthog is available', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const capture = vi.fn();
      window.posthog = { capture };

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(capture).toHaveBeenCalledWith('test_event', { foo: 'bar' });
    });

    it('calls fbq.trackCustom when consent is granted and fbq is available', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const trackCustom = vi.fn();
      window.fbq = trackCustom;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(trackCustom).toHaveBeenCalledWith('trackCustom', 'test_event', { foo: 'bar' });
    });

    it('calls all providers when all are available and consent is granted', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const gtag = vi.fn();
      const capture = vi.fn();
      const trackCustom = vi.fn();

      window.gtag = gtag;
      window.posthog = { capture };
      window.fbq = trackCustom;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(gtag).toHaveBeenCalledWith('event', 'test_event', { foo: 'bar' });
      expect(capture).toHaveBeenCalledWith('test_event', { foo: 'bar' });
      expect(trackCustom).toHaveBeenCalledWith('trackCustom', 'test_event', { foo: 'bar' });
    });

    it('uses empty properties object when not provided', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const gtag = vi.fn();
      window.gtag = gtag;

      trackEvent({ eventName: 'test_event' });

      expect(gtag).toHaveBeenCalledWith('event', 'test_event', {});
    });

    it('handles undefined provider globals gracefully', () => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      // Only gtag is available
      const gtag = vi.fn();
      window.gtag = gtag;

      expect(() => trackEvent({ eventName: 'test_event' })).not.toThrow();
      expect(gtag).toHaveBeenCalledWith('event', 'test_event', {});
    });

    it('logs to console in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      const gtag = vi.fn();
      window.gtag = gtag;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(consoleLog).toHaveBeenCalledWith('[Analytics] Tracked: test_event', { foo: 'bar' });

      consoleLog.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('does not log to console in production mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'ydm-analytics-consent=accepted',
        configurable: true,
      });

      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      const gtag = vi.fn();
      window.gtag = gtag;

      trackEvent({ eventName: 'test_event', properties: { foo: 'bar' } });

      expect(consoleLog).not.toHaveBeenCalled();

      consoleLog.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });
});
