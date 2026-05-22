export function testEmailTemplate(template: EmailTemplate, testVariables: Record<string, any>): {
  subject: string
  html: string
  text: string
} {
  return {
    subject: renderTemplate(template.subject, testVariables),
    html: renderTemplate(template.html, testVariables),
    text: renderTemplate(template.text, testVariables),
  }
}

export function validateTemplate(template: EmailTemplate): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!template.subject) errors.push('Subject is required')
  if (!template.html) errors.push('HTML content is required')
  if (!template.text) errors.push('Text content is required')

  return {
    isValid: errors.length === 0,
    errors,
  }
}
