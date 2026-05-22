export function measureCustomMetric(name: string, value: number) {
  if (window.performance) {
    window.performance.mark(name)
    window.analytics?.track('Custom Metric', { name, value })
  }
}

export function measureRenderTime(componentName: string) {
  const start = performance.now()
  return () => {
    const duration = performance.now() - start
    measureCustomMetric(`${componentName}_render`, duration)
  }
}
