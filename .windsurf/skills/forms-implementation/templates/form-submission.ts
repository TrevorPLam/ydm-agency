export async function submitForm(data: FormData, endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
  })

  if (!response.ok) {
    throw new Error('Form submission failed')
  }

  return response.json()
}
