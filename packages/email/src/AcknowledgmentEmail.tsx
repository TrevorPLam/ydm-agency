/**
 * FILE: AcknowledgmentEmail.tsx
 * PURPOSE: React Email template for auto-acknowledgment email sent to users after form submission.
 * ARCHITECTURE: React Email component with inline styles matching the agency's dark theme design system.
 * KEY RULES: Match agency design system colors; maintain consistent branding; provide clear response time expectations.
 * DEPENDS ON: @react-email/components.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { Html, Body, Container, Text, Heading } from '@react-email/components';

interface AcknowledgmentEmailProps {
  name: string;
}

/**
 * WHAT IT DOES: Renders an acknowledgment email template with personalized greeting and response time expectations.
 * @param {AcknowledgmentEmailProps} props - User's name for personalization
 * @return {JSX.Element} - React Email component
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: Rendered in server context for email sending; name is sanitized by caller.
 */
export function AcknowledgmentEmail({ name }: AcknowledgmentEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Got your message — YDM Agency</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Your message was received. A personal reply will follow within 2 hours on business days.
          </Text>
          <Text style={text}>
            If this is urgent, email contact@ydmagency.com directly.
          </Text>
          <Text style={signature}>YDM Agency</Text>
        </Container>
      </Body>
    </Html>
  );
}

// WHY: Inline styles match agency design system dark theme colors
const main = {
  backgroundColor: '#0A0A0B',
  fontFamily: 'Inter, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  backgroundColor: '#161618',
  borderRadius: '8px',
};

const heading = {
  color: '#F5F5F6',
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '20px',
};

const text = {
  color: '#A1A1A9',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '16px',
};

const signature = {
  color: '#3B82F6',
  fontSize: '16px',
  marginTop: '24px',
};
