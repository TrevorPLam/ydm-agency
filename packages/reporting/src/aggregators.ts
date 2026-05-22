// Aggregation functions for reporting
export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export function average(values: number[]): number {
  return values.length > 0 ? sum(values) / values.length : 0;
}

export function count(values: any[]): number {
  return values.length;
}
