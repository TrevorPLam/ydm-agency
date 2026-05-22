import Handlebars from 'handlebars'

export function renderTemplate(template: string, variables: Record<string, any>): string {
  const compiled = Handlebars.compile(template)
  return compiled(variables)
}

export function renderEmail(template: EmailTemplate, variables: Record<string, any>): EmailTemplate {
  return {
    subject: renderTemplate(template.subject, variables),
    html: renderTemplate(template.html, variables),
    text: renderTemplate(template.text, variables),
  }
}
