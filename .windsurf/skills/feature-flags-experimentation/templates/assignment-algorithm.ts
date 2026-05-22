export function assignVariant(userId: string, experimentId: string, variants: string[]): string {
  const hash = hashString(`${userId}:${experimentId}`)
  const index = hash % variants.length
  return variants[index]
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}
