/**
 * FILE: formatDate.ts
 * PURPOSE: Provides the formatDate() utility for formatting dates as localized, human-readable strings.
 * ARCHITECTURE: Pure helper wrapping Date.toLocaleDateString with en-US defaults and caller-overridable Intl options.
 * KEY RULES: Must remain a pure function with no side effects; must accept both Date objects and ISO date strings; caller options must override defaults.
 * DEPENDS ON: None (uses built-in Date and Intl APIs).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/**
 * WHAT IT DOES: Formats a Date or ISO date string as a localized date string, merging caller-supplied options over the default long-form date format.
 * @param {Date | string} date - Date object or ISO 8601 date string to format
 * @param {Intl.DateTimeFormatOptions} options - Optional Intl formatting options that override the defaults
 * @return {string} - Localized date string in en-US locale
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: String inputs are valid ISO 8601 dates parseable by the Date constructor.
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return d.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}
