export function getEnv(name: string, defaultValue?: string): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value;
}
