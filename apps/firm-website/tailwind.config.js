/**
 * FILE: tailwind.config.js
 * PURPOSE: Provide the Tailwind CSS configuration for the firm-website app.
 * ARCHITECTURE: App-level styling config; re-exports the workspace @ydm-agency/config/tailwind.js preset.
 * KEY RULES: Do not define design tokens here; centralize them in the workspace config package.
 * DEPENDS ON: @ydm-agency/config/tailwind.js, Tailwind CSS
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

const config = require('@ydm-agency/config/tailwind.js');

module.exports = config;
