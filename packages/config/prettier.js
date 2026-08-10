/**
 * FILE: prettier.js
 * PURPOSE: Provide the shared Prettier formatting configuration for the monorepo.
 * ARCHITECTURE: packages/config shared formatter preset with Tailwind class sorting.
 * KEY RULES: Single quotes, semicolons, 2-space tabs, ES5 trailing commas, 100 print width.
 * DEPENDS ON: prettier, prettier-plugin-tailwindcss
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100
}
