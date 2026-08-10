/**
 * FILE: .eslintrc.js
 * PURPOSE: Apply the shared ESLint configuration for the firm-website Next.js app.
 * ARCHITECTURE: Tooling config; re-exports the workspace @ydm-agency/config/eslint-next.js preset.
 * KEY RULES: Do not add app-specific overrides without a WHY comment; keep in sync with the workspace config package.
 * DEPENDS ON: @ydm-agency/config/eslint-next.js
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = require('@ydm-agency/config/eslint-next.js');
