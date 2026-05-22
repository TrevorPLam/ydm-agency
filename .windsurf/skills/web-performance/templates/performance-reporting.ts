export interface PerformanceReport {
  lcp: number
  fid: number
  cls: number
  fcp: number
  ttfb: number
}

export function generatePerformanceReport(metrics: PerformanceReport): string {
  const score = calculatePerformanceScore(metrics)
  return `Performance Score: ${score}/100`
}

function calculatePerformanceScore(metrics: PerformanceReport): number {
  let score = 100
  if (metrics.lcp > 2500) score -= 20
  if (metrics.fid > 100) score -= 20
  if (metrics.cls > 0.1) score -= 20
  return Math.max(0, score)
}
