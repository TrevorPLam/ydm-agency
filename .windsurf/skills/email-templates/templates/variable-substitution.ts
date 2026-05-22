export function substituteVariables(template: string, variables: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match
  })
}

export function validateVariables(template: string, variables: Record<string, any>): string[] {
  const missing: string[] = []
  const matches = template.match(/\{\{(\w+)\}\}/g) || []

  matches.forEach((match) => {
    const key = match.replace(/\{\{|\}\}/g, '')
    if (!variables[key]) {
      missing.push(key)
    }
  })

  return missing
}
