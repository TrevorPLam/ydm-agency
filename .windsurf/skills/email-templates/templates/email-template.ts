export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const welcomeEmail: EmailTemplate = {
  subject: 'Welcome to {{companyName}}',
  html: '<h1>Welcome {{userName}}</h1><p>Thanks for joining us!</p>',
  text: 'Welcome {{userName}}. Thanks for joining us!',
}
