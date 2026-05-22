---
name: application-security
description: Comprehensive application security guide covering threat modeling, input validation, output encoding, secrets management, supply chain security, and secure development lifecycle for 2026
---

# Application Security Guide

This skill provides comprehensive guidance for building secure applications, covering threat modeling, input validation, output encoding, secrets management, and secure development lifecycle practices for 2026.

## Threat Modeling

### What is Threat Modeling?

Threat modeling is a systematic approach to identifying and addressing security risks in software systems. It answers three key questions:
1. What are we working on?
2. What can go wrong?
3. What are we going to do about it?

### STRIDE Methodology

- **S**poofing: Impersonating something or someone
- **T**ampering: Modifying data or code
- **R**epudiation: Claiming to have not performed an action
- **I**nformation Disclosure: Exposing information to unauthorized parties
- **D**enial of Service: Denying service to legitimate users
- **E**levation of Privilege: Gaining unauthorized capabilities

### Threat Modeling Process

```typescript
interface ThreatModel {
  assets: Asset[];
  threats: Threat[];
  mitigations: Mitigation[];
}

const performThreatModeling = (system: SystemDescription): ThreatModel => {
  // 1. Identify assets
  const assets = identifyAssets(system);
  
  // 2. Identify threats using STRIDE
  const threats = identifyThreats(assets, STRIDE);
  
  // 3. Prioritize threats
  const prioritized = prioritizeThreats(threats);
  
  // 4. Define mitigations
  const mitigations = defineMitigations(prioritized);
  
  return { assets, threats: prioritized, mitigations };
};
```

### AI-Specific Threat Modeling

For AI applications, consider additional threats:
- **Prompt Injection**: Manipulating model behavior through inputs
- **Model Extraction**: Stealing model capabilities
- **Data Poisoning**: Corrupting training data
- **Model Inversion**: Extracting training data
- **Adversarial Examples**: Crafted inputs to cause misclassification

## Input Validation

### Validate All Input

Every input from untrusted sources must be validated.

```typescript
import { z } from 'zod';

const UserInputSchema = z.object({
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
  bio: z.string().max(500).optional(),
});

const validateUserInput = (input: unknown) => {
  return UserInputSchema.parse(input);
};
```

### Allowlist Validation

```typescript
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

const validateFileUpload = (file: File) => {
  if (!allowedFileTypes.includes(file.type)) {
    throw new ValidationError('Invalid file type');
  }
  
  if (file.size > maxFileSize) {
    throw new ValidationError('File too large');
  }
  
  // Scan for malware
  const scanResult = await scanForMalware(file);
  if (!scanResult.clean) {
    throw new ValidationError('Malware detected');
  }
  
  return true;
};
```

### Type Validation

```typescript
const validateType = <T>(value: unknown, typeName: string): T => {
  if (typeof value !== typeName) {
    throw new TypeError(`Expected ${typeName}, got ${typeof value}`);
  }
  return value as T;
};
```

## Output Encoding

### Context-Aware Encoding

```typescript
import DOMPurify from 'dompurify';
import escape from 'escape-html';

const encodeOutput = (value: string, context: 'html' | 'js' | 'url' | 'css'): string => {
  switch (context) {
    case 'html':
      return escape(value);
    case 'js':
      return JSON.stringify(value);
    case 'url':
      return encodeURIComponent(value);
    case 'css':
      return cssEscape(value);
    default:
      return value;
  }
};

const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html);
};
```

### Content Security Policy

```typescript
// CSP headers
const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.example.com",
    "frame-ancestors 'none'",
  ].join('; '),
};
```

## Secrets Management

### Never Commit Secrets

```typescript
// Bad: Hardcoded secrets
const API_KEY = 'sk-1234567890abcdef';

// Good: Environment variables
const API_KEY = process.env.API_KEY;

// Better: Secret manager
const API_KEY = await secretsManager.get('api-key');
```

### Use Secret Managers

```typescript
import AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager();

const getSecret = async (secretName: string): Promise<string> => {
  try {
    const data = await secretsManager.getSecretValue({
      SecretId: secretName,
    }).promise();
    
    if (data.SecretString) {
      return data.SecretString;
    }
    
    if (data.SecretBinary) {
      return data.SecretBinary.toString('utf-8');
    }
    
    throw new Error('Secret not found');
  } catch (error) {
    throw new Error(`Failed to retrieve secret: ${error.message}`);
  }
};
```

### Secret Rotation

```typescript
const rotateSecret = async (secretName: string) => {
  const oldSecret = await getSecret(secretName);
  const newSecret = generateSecureSecret();
  
  // Update secret
  await secretsManager.putSecretValue({
    SecretId: secretName,
    SecretString: newSecret,
  }).promise();
  
  // Update dependent services
  await updateDependentServices(secretName, newSecret);
  
  // Invalidate old secret
  await invalidateSecret(oldSecret);
};
```

## Supply Chain Security

### Dependency Scanning

```bash
# Scan for vulnerabilities
npm audit
npm audit fix

# Use Snyk for deeper scanning
snyk test
snyk monitor
```

### SBOM Generation

```typescript
import { createSBOM } from '@cyclonedx/cyclonedx-library';

const generateSBOM = async (projectPath: string) => {
  const sbom = await createSBOM({
    path: projectPath,
    format: 'json',
  });
  
  return sbom;
};
```

### Lockfile Verification

```typescript
import crypto from 'crypto';

const verifyLockfile = async (lockfilePath: string) => {
  const lockfile = await readFile(lockfilePath);
  const hash = crypto.createHash('sha256').update(lockfile).digest('hex');
  
  const expectedHash = process.env.LOCKFILE_HASH;
  
  if (hash !== expectedHash) {
    throw new Error('Lockfile has been modified');
  }
  
  return true;
};
```

## Secure Development Lifecycle

### Security Requirements

```typescript
interface SecurityRequirements {
  authentication: {
    mfaRequired: boolean;
    passwordPolicy: PasswordPolicy;
    sessionTimeout: number;
  };
  dataProtection: {
    encryptionAtRest: boolean;
    encryptionInTransit: boolean;
    dataRetention: number;
  };
  compliance: {
    standards: string[];
    auditLogging: boolean;
  };
}
```

### Security Code Review

```typescript
const securityReviewChecklist = [
  'Input validation',
  'Output encoding',
  'Authentication',
  'Authorization',
  'Error handling',
  'Logging',
  'Secrets management',
  'Dependency security',
  'Configuration security',
  'API security',
];

const performSecurityReview = async (code: string): Promise<ReviewResult> => {
  const results = await Promise.all(
    securityReviewChecklist.map(async (check) => {
      const result = await securityAnalyzer.analyze(code, check);
      return { check, result };
    })
  );
  
  return {
    passed: results.filter(r => r.result.passed),
    failed: results.filter(r => !r.result.passed),
    score: calculateSecurityScore(results),
  };
};
```

### Static Application Security Testing (SAST)

```typescript
// Use tools like SonarQube, Semgrep, or CodeQL
const runSAST = async (projectPath: string) => {
  const findings = await semgrep.scan({
    target: projectPath,
    rules: ['security'],
  });
  
  return findings;
};
```

## Common Vulnerabilities

### SQL Injection

```typescript
// Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Secure
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### XSS (Cross-Site Scripting)

```typescript
// Vulnerable
div.innerHTML = userContent;

// Secure
div.textContent = userContent;
// or
div.innerHTML = DOMPurify.sanitize(userContent);
```

### CSRF (Cross-Site Request Forgery)

```typescript
// Implement CSRF tokens
const csrfToken = generateCSRFToken();
res.cookie('csrf-token', csrfToken, { httpOnly: true, secure: true });

// Validate on POST
if (req.cookies['csrf-token'] !== req.body.csrfToken) {
  return res.status(403).json({ error: 'CSRF token mismatch' });
}
```

### Path Traversal

```typescript
// Vulnerable
const filePath = path.join('/var/www', req.query.file);

// Secure
const filePath = path.join('/var/www', req.query.file);
const resolvedPath = path.resolve(filePath);
if (!resolvedPath.startsWith('/var/www')) {
  throw new Error('Path traversal attempt');
}
```

## Security Headers

### Implement Security Headers

```typescript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=()',
};

app.use((req, res, next) => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});
```

## Error Handling

### Secure Error Messages

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  return res.status(500).json({
    error: error.message,
    stack: error.stack,
  });
}

// In production
return res.status(500).json({
  error: 'An internal error occurred',
  requestId: req.id,
});
```

### Error Logging

```typescript
const logSecurityEvent = (event: SecurityEvent) => {
  logger.error('Security event', {
    type: event.type,
    severity: event.severity,
    userId: event.userId,
    ip: event.ip,
    timestamp: new Date().toISOString(),
    context: event.context,
  });
  
  // Alert on critical events
  if (event.severity === 'critical') {
    alertSecurityTeam(event);
  }
};
```

## Best Practices

### Do

- Validate all input from untrusted sources
- Encode all output based on context
- Use parameterized queries
- Implement proper authentication and authorization
- Use secret managers for sensitive data
- Scan dependencies for vulnerabilities
- Implement security headers
- Log security events
- Perform regular security reviews
- Keep dependencies updated

### Don't

- Trust client-side input
- Expose sensitive information in error messages
- Hardcode secrets in code
- Use eval() or similar functions
- Disable security features for convenience
- Ignore security warnings
- Use deprecated cryptographic algorithms
- Skip input validation
- Log sensitive data
- Ignore dependency vulnerabilities

## Resources

### Documentation

- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP Threat Modeling](https://owasp.org/www-community/threat-modeling)
- [Microsoft Threat Modeling AI](https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml)

### Tools

- [OWASP ZAP](https://www.zaproxy.org)
- [SonarQube](https://www.sonarqube.org)
- [Semgrep](https://semgrep.dev)
- [Snyk](https://snyk.io)
- [Dependabot](https://github.com/dependabot)
