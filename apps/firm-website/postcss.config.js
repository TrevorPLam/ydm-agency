/**
 * FILE: postcss.config.js
 * PURPOSE: Configure PostCSS plugins for the firm-website build.
 * ARCHITECTURE: Tooling config; registers Tailwind CSS and autoprefixer in the standard build pipeline.
 * KEY RULES: Maintain Tailwind first, then autoprefixer; do not reorder without confirming output.
 * DEPENDS ON: tailwindcss, autoprefixer
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
