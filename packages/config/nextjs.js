/**
 * FILE: nextjs.js
 * PURPOSE: Provide the shared Next.js runtime configuration preset.
 * ARCHITECTURE: packages/config shared Next.js config, enables strict mode and transpiles workspace packages.
 * KEY RULES: TranspilePackages must list all @ydm-agency/* packages used by the app.
 * DEPENDS ON: next
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@ydm-agency/ui',
    '@ydm-agency/forms',
    '@ydm-agency/seo',
    '@ydm-agency/analytics',
    '@ydm-agency/utils',
    '@ydm-agency/email',
  ],
};
