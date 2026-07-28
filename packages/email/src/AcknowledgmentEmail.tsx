import { Html, Body, Container, Text, Heading } from '@react-email/components';

interface AcknowledgmentEmailProps {
  name: string;
}

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
  color: '#4AE4A8',
  fontSize: '16px',
  marginTop: '24px',
};
