/**
 * FILE: .prettierrc.js
 * PURPOSE: Apply the shared Prettier formatting configuration for the firm-website app.
 * ARCHITECTURE: Tooling config; re-exports the workspace @ydm-agency/config/prettier.js preset.
 * KEY RULES: Do not define formatting rules here; centralize them in the workspace config package.
 * DEPENDS ON: @ydm-agency/config/prettier.js
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = require('@ydm-agency/config/prettier.js');
