export function getOptimizationRecommendations(metrics: PerformanceReport): string[] {
  const recommendations: string[] = []

  if (metrics.lcp > 2500) {
    recommendations.push('Optimize largest contentful paint by lazy loading images')
  }

  if (metrics.fid > 100) {
    recommendations.push('Reduce JavaScript execution time to improve first input delay')
  }

  if (metrics.cls > 0.1) {
    recommendations.push('Prevent layout shifts by reserving space for dynamic content')
  }

  return recommendations
}
