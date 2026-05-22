export function transformContent<T, U>(content: T, transformer: (data: T) => U): U {
  return transformer(content)
}

export function normalizeContent(content: any): any {
  if (Array.isArray(content)) {
    return content.map(normalizeContent)
  }

  if (content && typeof content === 'object') {
    return Object.fromEntries(
      Object.entries(content).map(([key, value]) => [key.toLowerCase(), normalizeContent(value)])
    )
  }

  return content
}
