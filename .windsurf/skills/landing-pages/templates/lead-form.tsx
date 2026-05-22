'use client'

export function LeadForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    await fetch('/api/leads', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  )
}
