export async function fetchContent<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.statusText}`)
  }

  return response.json()
}
