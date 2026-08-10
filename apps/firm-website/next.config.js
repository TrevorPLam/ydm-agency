/**
 * FILE: next.config.js
 * PURPOSE: Provide the Next.js runtime configuration for the firm-website app.
 * ARCHITECTURE: App-level build config; re-exports the workspace @ydm-agency/config/nextjs.js preset.
 * KEY RULES: App-specific overrides must be tracked here; do not duplicate values already in the workspace config.
 * DEPENDS ON: @ydm-agency/config/nextjs.js, Next.js
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

const config = require('@ydm-agency/config/nextjs.js');

module.exports = config;
