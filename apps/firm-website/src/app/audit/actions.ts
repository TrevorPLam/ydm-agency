'use server';

import { sendEmail } from '@ydm-agency/email';
import { auditFormSchema, type AuditFormInput } from '@/lib/audit-schema';

interface SubmitAuditResult {
  success: boolean;
  error?: string;
}

export async function submitAudit(data: AuditFormInput): Promise<SubmitAuditResult> {
  const parsed = auditFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  const { name, email, website, challenge, marketingState } = parsed.data;

  const marketingStateLabels: Record<string, string> = {
    'no-website': 'No website yet',
    'website-no-traffic': 'Website exists but gets little traffic',
    'traffic-no-leads': 'Traffic exists but few leads',
    'leads-now': 'Need leads quickly',
    'automation-mess': 'Leads slip through the cracks',
    'unsure': 'Not sure where to start',
  };

  const message = [
    `Free marketing audit request from ${name} (${email}).`,
    `Website: ${website}`,
    `Biggest challenge: ${challenge}`,
    `Current marketing state: ${marketingStateLabels[marketingState] ?? marketingState}`,
    'A structured audit will be delivered with findings and recommended next steps.',
  ].join('\n\n');

  const result = await sendEmail({
    name,
    email,
    projectType: 'Free Marketing Audit',
    message,
  });

  if (result.success) {
    return { success: true };
  }

  return {
    success: false,
    error: result.error ?? 'Failed to submit the audit request. Please try again.',
  };
}
