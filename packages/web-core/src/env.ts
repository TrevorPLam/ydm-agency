/**
 * FILE: env.ts
 * PURPOSE: Provide a safe wrapper for reading environment variables with optional defaults.
 * ARCHITECTURE: web-core utility, treats empty strings as unset and returns a default.
 * KEY RULES: An empty string is considered unset; undefined is returned when no default is provided.
 * DEPENDS ON: process.env (Node runtime)
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

/**
 * WHAT IT DOES: Reads an environment variable and falls back to a default when unset or empty.
 * @param {string} name – the environment variable name
 * @param {string} [defaultValue] – value to return when the variable is missing or empty
 * @return {string | undefined} – the environment value, default, or undefined
 * SIDE EFFECTS: None
 * ASSUMES: Runs in a Node environment with process.env available.
 */
export function getEnv(name: string, defaultValue?: string): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value;
}
