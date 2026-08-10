/**
 * FILE: eslint-next.js
 * PURPOSE: Provide the shared ESLint configuration for Next.js packages.
 * ARCHITECTURE: packages/config shared lint preset, extends Next core-web-vitals and Prettier.
 * KEY RULES: Disable Next.js html-link-for-pages rule to support custom routing.
 * DEPENDS ON: next, eslint-config-prettier
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off"
  }
}
