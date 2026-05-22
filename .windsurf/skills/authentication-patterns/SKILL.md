---
name: authentication-patterns
description: Comprehensive authentication and authorization guide covering OAuth 2.0, OpenID Connect, PKCE, passkeys, MFA, RBAC, ABAC, SSO, and passwordless authentication for 2026
---

# Authentication Patterns Guide

This skill provides comprehensive guidance for implementing secure authentication and authorization, covering OAuth 2.0, OpenID Connect, PKCE, passkeys, MFA, RBAC, ABAC, and SSO for 2026.

## Authentication vs Authorization

- **Authentication**: Answers "Are you who you claim to be?" - verified with credentials, tokens, biometrics, or MFA
- **Authorization**: Answers "Do you have permission to do this?" - implemented with roles, permissions, and access policies

Both layers must be designed and maintained with equal rigor.

## Session-Based Authentication

### Classic Model

The server creates a session after verifying credentials, stores state in memory or database, and sends a session identifier in an httpOnly, secure cookie.

```typescript
const createSession = async (user: User): Promise<string> => {
  const sessionId = crypto.randomBytes(32).toString('hex');
  
  // Store session in database or Redis
  await redis.setex(
    `session:${sessionId}`,
    3600, // 1 hour
    JSON.stringify({
      userId: user.id,
      createdAt: Date.now(),
    })
  );
  
  return sessionId;
};

const sessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ error: 'No session' });
  }
  
  const sessionData = await redis.get(`session:${sessionId}`);
  
  if (!sessionData) {
    return res.status(401).json({ error: 'Invalid session' });
  }
  
  req.user = JSON.parse(sessionData);
  next();
};
```

### Advantages

- Server has full control over session (can invalidate immediately)
- Session ID is opaque and contains no user information

### Limitations

- Requires server-side state storage
- More complex to scale horizontally (requires Redis or sticky sessions)

## JSON Web Tokens (JWT)

### JWT Structure

JWT contains a payload with user data encoded in Base64 and digitally signed. The server validates the signature and extracts information directly from the token.

```typescript
import jwt from 'jsonwebtoken';

const generateJWT = (user: User): string => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
      issuer: 'example.com',
      audience: 'example.com',
    }
  );
};

const verifyJWT = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
};
```

### Important Limitations

- Issued token cannot be revoked without additional mechanisms (blacklists or short-lived tokens with refresh tokens)
- Storing JWT in localStorage is vulnerable to XSS
- Use httpOnly cookies for secure storage

## OAuth 2.0 and OpenID Connect

### OAuth 2.0 Flows

OAuth 2.0 is a delegated authorization protocol that allows an application to access a user's resources on another service without knowing their credentials.

#### Authorization Code Flow (Most Secure)

Recommended for applications with a backend.

```typescript
const initiateAuth = () => {
  const authUrl = `https://auth.example.com/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
    `scope=openid profile email&` +
    `state=${generateState()}`;
  
  return authUrl;
};

const handleCallback = async (code: string, state: string) => {
  // Validate state
  if (!validateState(state)) {
    throw new Error('Invalid state');
  }
  
  // Exchange code for tokens
  const tokenResponse = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });
  
  const tokens = await tokenResponse.json();
  
  // Verify ID token (OpenID Connect)
  const userInfo = await verifyIdToken(tokens.id_token);
  
  return userInfo;
};
```

#### PKCE (Proof Key for Code Exchange)

Mandatory extension for SPAs and mobile apps.

```typescript
const generatePKCE = () => {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  
  return { codeVerifier, codeChallenge };
};

const initiateAuthWithPKCE = () => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  
  // Store codeVerifier in session
  sessionStorage.setItem('codeVerifier', codeVerifier);
  
  const authUrl = `https://auth.example.com/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;
  
  return authUrl;
};
```

#### Client Credentials Flow

For machine-to-machine (M2M) communication.

```typescript
const getClientCredentialsToken = async () => {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'api:read api:write',
    }),
  });
  
  return await response.json();
};
```

### OpenID Connect

Extends OAuth 2.0 by adding a standardized authentication layer.

```typescript
const verifyIdToken = async (idToken: string): Promise<UserInfo> => {
  const decoded = jwt.decode(idToken, { complete: true });
  
  // Verify signature
  const publicKey = await fetchPublicKey(decoded.header.kid);
  jwt.verify(idToken, publicKey);
  
  // Verify claims
  if (decoded.payload.iss !== 'https://auth.example.com') {
    throw new Error('Invalid issuer');
  }
  
  if (decoded.payload.aud !== process.env.CLIENT_ID) {
    throw new Error('Invalid audience');
  }
  
  if (decoded.payload.exp < Date.now() / 1000) {
    throw new Error('Token expired');
  }
  
  return {
    userId: decoded.payload.sub,
    email: decoded.payload.email,
    name: decoded.payload.name,
  };
};
```

## RBAC and Permission Models

### Role-Based Access Control (RBAC)

Assign permissions to roles and roles to users.

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

const authorize = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

### Attribute-Based Access Control (ABAC)

Evaluates user, resource, and context attributes to make access decisions.

```typescript
interface ABACPolicy {
  subject: { role: string; department: string; clearance: string };
  resource: { type: string; classification: string; owner: string };
  action: string;
  environment: { time: string; location: string; device: string };
}

const evaluateABAC = (policy: ABACPolicy): boolean => {
  // Complex policy evaluation based on attributes
  if (policy.action === 'delete' && policy.subject.role !== 'admin') {
    return false;
  }
  
  if (policy.resource.classification === 'confidential' && 
      policy.subject.clearance !== 'secret') {
    return false;
  }
  
  if (policy.resource.type === 'financial' && 
      policy.subject.department !== 'finance') {
    return false;
  }
  
  return true;
};
```

## Single Sign-On (SSO)

SSO allows users to authenticate once and access multiple applications without repeating login.

### SAML 2.0

```typescript
const initiateSAML = () => {
  const samlRequest = generateSAMLRequest({
    assertionConsumerServiceURL: process.env.ACS_URL,
    issuer: process.env.SP_ENTITY_ID,
  });
  
  const encodedRequest = base64Encode(samlRequest);
  const redirectUrl = `https://idp.example.com/sso?SAMLRequest=${encodedRequest}`;
  
  return redirectUrl;
};

const handleSAMLResponse = async (samlResponse: string) => {
  const decoded = base64Decode(samlResponse);
  const assertion = parseSAMLResponse(decoded);
  
  // Verify signature
  const idpPublicKey = await fetchIdPPublicKey();
  if (!verifySignature(assertion, idpPublicKey)) {
    throw new Error('Invalid signature');
  }
  
  // Extract user attributes
  const user = {
    id: assertion.attributes.nameID,
    email: assertion.attributes.email,
    name: assertion.attributes.name,
  };
  
  return user;
};
```

### OpenID Connect SSO

```typescript
const initiateOIDC = () => {
  const authUrl = `https://idp.example.com/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
    `scope=openid profile email&` +
    `response_mode=fragment`;
  
  return authUrl;
};
```

## Passwordless Authentication

Passwords are the weakest link. Passwordless authentication eliminates this vector.

### Magic Links

```typescript
const sendMagicLink = async (email: string) => {
  const token = crypto.randomBytes(32).toString('hex');
  
  // Store token with expiration
  await redis.setex(
    `magic-link:${token}`,
    600, // 10 minutes
    email
  );
  
  const magicLink = `https://example.com/auth/magic-link?token=${token}`;
  
  await sendEmail({
    to: email,
    subject: 'Sign in to Example',
    body: `Click this link to sign in: ${magicLink}`,
  });
};

const verifyMagicLink = async (token: string): Promise<User> => {
  const email = await redis.get(`magic-link:${token}`);
  
  if (!email) {
    throw new Error('Invalid or expired token');
  }
  
  // Delete token after use
  await redis.del(`magic-link:${token}`);
  
  const user = await findOrCreateUser(email);
  
  return user;
};
```

### Passkeys (WebAuthn)

```typescript
const registerPasskey = async (userId: string) => {
  const challenge = crypto.randomBytes(32);
  
  const registrationOptions = {
    challenge: challenge.toString('base64url'),
    rp: {
      name: 'Example App',
      id: 'example.com',
    },
    user: {
      id: userId,
      name: 'user@example.com',
      displayName: 'User',
    },
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 }, // ES256
      { type: 'public-key', alg: -257 }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'preferred',
    },
  };
  
  // Store challenge for verification
  await redis.setex(
    `webauthn:challenge:${userId}`,
    300,
    challenge.toString('base64url')
  );
  
  return registrationOptions;
};

const verifyPasskeyRegistration = async (
  userId: string,
  credential: PublicKeyCredential
) => {
  const challenge = await redis.get(`webauthn:challenge:${userId}`);
  
  if (!challenge) {
    throw new Error('Challenge expired');
  }
  
  // Verify credential
  const verification = verifyRegistrationResponse({
    credential,
    expectedChallenge: challenge,
    expectedOrigin: 'https://example.com',
    expectedRPID: 'example.com',
  });
  
  if (!verification verified) {
    throw new Error('Invalid credential');
  }
  
  // Store credential
  await db.credentials.insert({
    userId,
    credentialId: credential.id,
    publicKey: verification.publicKey,
    counter: verification.counter,
  });
  
  return verification;
};
```

## Multi-Factor Authentication (MFA)

### TOTP (Time-Based One-Time Password)

```typescript
import speakeasy from 'speakeasy';

const generateTOTPSecret = (user: User) => {
  const secret = speakeasy.generateSecret({
    name: 'Example App',
    issuer: 'example.com',
    length: 32,
  });
  
  // Store secret for user
  await db.users.update(user.id, {
    totpSecret: secret.base32,
  });
  
  return {
    secret: secret.base32,
    qrCode: secret.otpauth_url,
  };
};

const verifyTOTP = (user: User, token: string): boolean => {
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 time steps (1 minute) for clock drift
  });
  
  return verified;
};
```

### SMS-based MFA

```typescript
const sendSMSCode = async (phoneNumber: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store code with expiration
  await redis.setex(
    `sms-code:${phoneNumber}`,
    300, // 5 minutes
    code
  );
  
  await sendSMS({
    to: phoneNumber,
    body: `Your verification code is: ${code}`,
  });
};

const verifySMSCode = async (phoneNumber: string, code: string): boolean => {
  const storedCode = await redis.get(`sms-code:${phoneNumber}`);
  
  if (!storedCode || storedCode !== code) {
    return false;
  }
  
  // Delete code after use
  await redis.del(`sms-code:${phoneNumber}`);
  
  return true;
};
```

## Best Practices

### Do

- Use OAuth 2.0 with PKCE for SPAs and mobile apps
- Use Authorization Code Flow for backend applications
- Implement RBAC for most permission needs
- Use ABAC for complex, attribute-based decisions
- Implement MFA for sensitive operations
- Use httpOnly cookies for token storage
- Validate all tokens on every request
- Implement proper logout and token revocation
- Use short-lived tokens with refresh tokens
- Monitor for suspicious authentication activity

### Don't

- Use Implicit Flow (deprecated)
- Store tokens in localStorage
- Use weak password policies
- Skip MFA for admin accounts
- Use the same key for multiple purposes
- Ignore token expiration
- Skip state validation in OAuth flows
- Store secrets in client-side code
- Use predictable session IDs
- Forget about rate limiting on auth endpoints

## Resources

### Documentation

- [OAuth 2.0 Specification](https://oauth.net/2/)
- [OpenID Connect](https://openid.net/connect/)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn/)
- [Midrocket Authentication Guide](https://midrocket.com/en/guides/web-authentication-authorization/)

### Libraries

- [Passport.js](http://www.passportjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Auth.js](https://authjs.dev)
- [Speakeasy (TOTP)](https://github.com/speakeasyjs/speakeasy)
