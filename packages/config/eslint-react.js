/**
 * FILE: eslint-react.js
 * PURPOSE: Provide the shared ESLint configuration for React packages.
 * ARCHITECTURE: packages/config shared lint preset, extends recommended React and Prettier.
 * KEY RULES: JSX scope and prop-types rules are disabled for React 19/TypeScript.
 * DEPENDS ON: eslint, eslint-plugin-react, eslint-config-prettier
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  }
}
