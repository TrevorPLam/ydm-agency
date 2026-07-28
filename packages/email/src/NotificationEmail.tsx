import { Html, Body, Container, Text, Heading, Section } from '@react-email/components';

interface NotificationEmailProps {
  name: string;
  email: string;
  projectType?: string;
  message: string;
}

export function NotificationEmail({ name, email, projectType, message }: NotificationEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact: {name} — {projectType ?? 'General'}</Heading>
          
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>
          
          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>
          
          {projectType && (
            <Section style={section}>
              <Text style={label}>Project Type:</Text>
              <Text style={value}>{projectType}</Text>
            </Section>
          )}
          
          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={value}>{message}</Text>
          </Section>
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

const section = {
  marginBottom: '16px',
};

const label = {
  color: '#4AE4A8',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '4px',
};

const value = {
  color: '#A1A1A9',
  fontSize: '16px',
  lineHeight: '1.5',
};
