// Email parsing utilities
export interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  to: string[];
  body: string;
  timestamp: Date;
}

export function parseEmail(raw: string): EmailMessage {
  // Parse raw email message
  return {
    id: '',
    subject: '',
    from: '',
    to: [],
    body: '',
    timestamp: new Date(),
  };
}
