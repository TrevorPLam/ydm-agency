---
name: api-security
description: Comprehensive API security guide covering REST design, authentication, authorization, rate limiting, input validation, OWASP API Top 10, and transport security for 2026
---

# API Security Guide

This skill provides comprehensive guidance for securing REST APIs, covering authentication, authorization, input validation, rate limiting, and protection against common attack vectors following 2026 best practices.

## Core Security Principles

### Defense in Depth

- **Least Privilege**: Grant minimum necessary access
- **Zero Trust**: Verify every request, even from trusted sources
- **Fail Securely**: Default to deny, not allow
- **Defense in Depth**: Multiple security layers

### Security Checklist

- [ ] Authentication on all endpoints
- [ ] Authorization checks on sensitive operations
- [ ] Input validation and sanitization
- [ ] Output encoding for browser contexts
- [ ] TLS for all traffic
- [ ] Rate limiting and throttling
- [ ] API key and secret management
- [ ] Logging and monitoring
- [ ] Regular security testing

## Authentication & Authorization

### Require Identity Verification

Every request must be authenticated, including internal APIs. Use OAuth 2.0 and OpenID Connect with short-lived JWTs.

```typescript
// Example authentication middleware
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = await verifyJWT(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Granular Authorization

Prevent object-level authorization failures by verifying the caller can access each specific resource.

```typescript
// Example authorization check
const authorizeResourceAccess = async (
  user: User,
  resourceId: string,
  resourceType: string
) => {
  // Check if user owns the resource
  const ownership = await checkOwnership(user.id, resourceId, resourceType);
  
  if (!ownership) {
    throw new ForbiddenError('You do not have access to this resource');
  }
  
  // Check if user has required permissions
  const permissions = await getUserPermissions(user.id);
  if (!permissions.includes(`read:${resourceType}`)) {
    throw new ForbiddenError('Insufficient permissions');
  }
};
```

### Ownership Checks

```typescript
// Prevent BOLA (Broken Object Level Authorization)
app.get('/api/accounts/:accountId', authenticate, async (req, res) => {
  const { accountId } = req.params;
  const user = req.user;
  
  // Verify accountId matches authenticated user
  if (accountId !== user.accountId && !user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const account = await getAccount(accountId);
  res.json(account);
});
```

## Input Validation

### Validate All Input

Every input is untrusted, including headers and URLs. Use strict schemas and type checks.

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(2).max(100),
  age: z.number().int().min(18).max(120),
});

app.post('/api/users', async (req, res) => {
  try {
    const validated = CreateUserSchema.parse(req.body);
    const user = await createUser(validated);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid input' });
  }
});
```

### Parameterized Queries

Always use parameterized queries to prevent SQL injection.

```typescript
// Good: Parameterized query
const getUser = async (id: number) => {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Bad: String concatenation (vulnerable to SQL injection)
const getUserBad = async (id: number) => {
  const result = await db.query(
    `SELECT * FROM users WHERE id = ${id}`
  );
  return result.rows[0];
};
```

### Type Checking

```typescript
const validateId = (id: string): number => {
  const num = parseInt(id, 10);
  
  if (isNaN(num) || num < 0 || num > MAX_SAFE_INTEGER) {
    throw new ValidationError('Invalid ID');
  }
  
  return num;
};
```

## Access Control Models

### Role-Based Access Control (RBAC)

```typescript
enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

const permissions: Record<Role, string[]> = {
  [Role.ADMIN]: ['create', 'read', 'update', 'delete', 'manage_users'],
  [Role.EDITOR]: ['create', 'read', 'update'],
  [Role.VIEWER]: ['read'],
};

const hasPermission = (user: User, permission: string): boolean => {
  return permissions[user.role].includes(permission);
};
```

### Attribute-Based Access Control (ABAC)

```typescript
interface ABACPolicy {
  subject: { role: string; department: string };
  resource: { type: string; owner: string };
  action: string;
  environment: { time: string; location: string };
}

const evaluateABAC = (policy: ABACPolicy): boolean => {
  // Complex policy evaluation based on attributes
  if (policy.action === 'delete' && policy.subject.role !== 'admin') {
    return false;
  }
  
  if (policy.resource.type === 'financial' && 
      policy.subject.department !== 'finance') {
    return false;
  }
  
  return true;
};
```

## Transport Security

### TLS Configuration

Use TLS for all traffic. Require TLS 1.2 or higher, prioritize TLS 1.3.

```typescript
// Express TLS configuration
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  minVersion: 'TLSv1.2',
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
  ],
};

https.createServer(options, app).listen(443);
```

### Mutual TLS

Use mutual TLS for service-to-service calls when possible.

```typescript
const mTLSOptions = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: fs.readFileSync('ca-cert.pem'),
  rejectUnauthorized: true,
};

const agent = new https.Agent(mTLSOptions);
```

## Rate Limiting & Throttling

### Implement Rate Limits

Limit how often a user, IP address, or key can call your API within a time window.

```typescript
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api/', apiLimiter);

// Stricter limits on login endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later',
});

app.post('/api/login', loginLimiter, loginHandler);
```

### Token Bucket Algorithm

```typescript
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private capacity: number,
    private refillRate: number // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  async consume(tokens: number): Promise<boolean> {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    
    // Refill tokens
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    
    return false;
  }
}
```

## Bot Detection

### Behavior Analysis

```typescript
const detectBot = (req: Request): boolean => {
  const fingerprint = generateFingerprint(req);
  
  // Check for suspicious patterns
  const patterns = [
    isSequentialRequests(fingerprint),
    isHighFrequency(fingerprint),
    hasUnusualUserAgent(req),
    lacksHeaders(req),
  ];
  
  return patterns.some(p => p);
};
```

### IP Reputation

```typescript
const checkIPReputation = async (ip: string): Promise<boolean> {
  const reputation = await ipReputationService.check(ip);
  
  if (reputation.score < 50) {
    return false; // Block suspicious IPs
  }
  
  return true;
};
```

## Protection Against Injection

### SQL Injection Prevention

```typescript
// Use parameterized queries
const safeQuery = async (id: number) => {
  return await db.query('SELECT * FROM users WHERE id = $1', [id]);
};

// Use ORM with built-in protection
const user = await User.findByPk(id);
```

### NoSQL Injection Prevention

```typescript
// MongoDB injection prevention
const safeMongoQuery = async (email: string) => {
  // Use $eq instead of direct object construction
  return await User.findOne({ email: { $eq: email } });
};

// Avoid:
// const user = await User.findOne({ email: req.body.email });
```

### XSS Prevention

```typescript
import DOMPurify from 'dompurify';

const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html);
};

// In templates, use auto-escaping
// <div>{{{ userContent }}}</div> // Triple braces in Handlebars
```

## API Key Management

### Secure Storage

Never store API keys in code or environment variables. Use secret managers.

```typescript
import AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager();

const getSecret = async (secretName: string): Promise<string> => {
  const data = await secretsManager.getSecretValue({
    SecretId: secretName,
  }).promise();
  
  return data.SecretString;
};
```

### Key Rotation

```typescript
const rotateKeys = async () => {
  const oldKey = await getSecret('api-key');
  const newKey = await generateKey();
  
  // Update secret
  await secretsManager.updateSecret({
    SecretId: 'api-key',
    SecretString: newKey,
  });
  
  // Invalidate old key
  await invalidateKey(oldKey);
};
```

## Monitoring & Logging

### Security Logging

```typescript
const securityLogger = {
  logAuthentication: (event: AuthEvent) => {
    logger.info('Authentication event', {
      type: event.type,
      userId: event.userId,
      ip: event.ip,
      userAgent: event.userAgent,
      success: event.success,
      timestamp: new Date().toISOString(),
    });
  },
  
  logAuthorization: (event: AuthzEvent) => {
    logger.info('Authorization event', {
      userId: event.userId,
      resource: event.resource,
      action: event.action,
      allowed: event.allowed,
      reason: event.reason,
    });
  },
};
```

### Anomaly Detection

```typescript
const detectAnomaly = (metrics: SecurityMetrics): boolean => {
  const baseline = getBaselineMetrics();
  
  if (metrics.errorRate > baseline.errorRate * 5) {
    alert('Unusual error rate detected');
    return true;
  }
  
  if (metrics.requestRate > baseline.requestRate * 10) {
    alert('Possible DDoS attack');
    return true;
  }
  
  return false;
};
```

## Common Attack Vectors

### BOLA (Broken Object Level Authorization)

```typescript
// Vulnerable:
app.get('/api/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user); // Anyone can access any user
});

// Secure:
app.get('/api/users/:id', authenticate, async (req, res) => {
  if (req.params.id !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = await getUser(req.params.id);
  res.json(user);
});
```

### Mass Assignment

```typescript
// Vulnerable:
app.put('/api/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  Object.assign(user, req.body); // Allows overwriting any field
  await user.save();
  res.json(user);
});

// Secure:
app.put('/api/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  const allowedFields = ['name', 'email'];
  
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  }
  
  await user.save();
  res.json(user);
});
```

## API Gateway

### Centralized Security

Place APIs behind a gateway to centralize traffic, enforcement, and logging.

```typescript
// API Gateway configuration
const gatewayConfig = {
  authentication: {
    type: 'oauth2',
    provider: 'auth0',
  },
  rateLimiting: {
    default: 100,
    endpoints: {
      '/api/login': 5,
      '/api/sensitive': 10,
    },
  },
  cors: {
    allowedOrigins: ['https://example.com'],
    allowedMethods: ['GET', 'POST'],
  },
  logging: {
    level: 'security',
    destination: 'cloudwatch',
  },
};
```

## Best Practices

### Do

- Validate and sanitize all input
- Use parameterized queries
- Implement rate limiting
- Use TLS for all traffic
- Encrypt sensitive data at rest
- Monitor and log security events
- Test APIs continuously
- Keep dependencies updated

### Don't

- Trust client-side input
- Expose sensitive data in responses
- Use weak authentication
- Ignore rate limiting
- Use deprecated protocols
- Log sensitive data
- Skip security testing
- Ignore dependency vulnerabilities

## Resources

### Documentation

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [REST API Security Best Practices](https://www.levo.ai/resources/blogs/rest-api-security-best-practices)
- [APIsec Authentication Guide](https://www.apisec.ai/blog/master-api-authentication-and-authorization-best-practices-for-security)

### Tools

- [OWASP ZAP](https://www.zaproxy.org)
- [Postman Security](https://www.postman.com)
- [Burp Suite](https://portswigger.net/burp)
