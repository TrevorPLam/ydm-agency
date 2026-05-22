---
name: identity-access-privacy
description: Comprehensive identity and access privacy guide covering zero-trust IAM, biometric data protection, non-human identity governance, privacy-preserving authentication, and secure identity lifecycle management for 2026
---

# Identity and Access Privacy Guide

This skill provides comprehensive guidance for implementing secure identity and access management with privacy protections, covering zero-trust IAM, biometric data protection, and privacy-preserving authentication for 2026.

## Zero-Trust Identity Management

### Core Principles

Zero-trust identity management operates on the principle that no user or system should be trusted by default, regardless of their location or network position.

```typescript
interface ZeroTrustPolicy {
  verifyEveryRequest: boolean;
  leastPrivilege: boolean;
  assumeBreach: boolean;
  explicitVerification: boolean;
}

const enforceZeroTrust = async (
  request: Request,
  policy: ZeroTrustPolicy
): Promise<AccessDecision> => {
  // Verify identity on every request
  const identity = await verifyIdentity(request);
  
  // Verify device health
  const deviceHealth = await checkDeviceHealth(request.deviceId);
  
  // Verify context (location, time, behavior)
  const context = await analyzeContext(request);
  
  // Make access decision
  const decision = await evaluateAccess({
    identity,
    deviceHealth,
    context,
    policy,
  });
  
  return decision;
};
```

### Continuous Authentication

```typescript
const continuousAuth = async (user: User, session: Session) => {
  // Monitor user behavior patterns
  const behaviorScore = await analyzeBehavior(user, session);
  
  // Re-authenticate if behavior deviates
  if (behaviorScore < THRESHOLD) {
    await triggerReauthentication(user);
  }
  
  // Monitor device signals
  const deviceSignals = await collectDeviceSignals(session.deviceId);
  
  // Check for anomalies
  if (detectAnomalies(deviceSignals)) {
    await terminateSession(session);
  }
};
```

## Biometric Data Protection

### Biometric Data Classification

Biometric data is highly sensitive and requires special protection under regulations like GDPR and CCPA.

```typescript
interface BiometricData {
  type: 'fingerprint' | 'facial' | 'iris' | 'voice' | 'behavioral';
  template: Buffer;
  encryptionKey: string;
  retentionPolicy: RetentionPolicy;
  consent: ConsentRecord;
}

const storeBiometricTemplate = async (
  biometricData: BiometricData
) => {
  // Encrypt biometric template
  const encrypted = await encryptData(
    biometricData.template,
    biometricData.encryptionKey
  );
  
  // Store in secure enclave or HSM
  await secureStorage.store({
    type: biometricData.type,
    encryptedTemplate: encrypted,
    keyId: biometricData.encryptionKey,
    consentId: biometricData.consent.id,
    retentionUntil: calculateRetentionDate(biometricData.retentionPolicy),
  });
  
  // Log access
  await auditLog.log({
    action: 'biometric_storage',
    userId: biometricData.consent.userId,
    timestamp: Date.now(),
  });
};
```

### Privacy-Preserving Biometric Matching

```typescript
const privacyPreservingMatch = async (
  sample: BiometricSample,
  storedTemplates: BiometricTemplate[]
): Promise<MatchResult> => {
  // Use homomorphic encryption for comparison
  const encryptedSample = await homomorphicEncrypt(sample);
  
  const matches = await Promise.all(
    storedTemplates.map(async (template) => {
      const encryptedTemplate = await homomorphicEncrypt(template);
      
      // Compare without decrypting
      const similarity = await homomorphicCompare(
        encryptedSample,
        encryptedTemplate
      );
      
      return { templateId: template.id, similarity };
    })
  );
  
  // Find best match
  const bestMatch = matches.reduce((best, current) =>
    current.similarity > best.similarity ? current : best
  );
  
  return {
    matched: bestMatch.similarity > MATCH_THRESHOLD,
    confidence: bestMatch.similarity,
    templateId: bestMatch.templateId,
  };
};
```

### Biometric Consent Management

```typescript
const manageBiometricConsent = async (
  userId: string,
  purpose: string
): Promise<ConsentRecord> => {
  // Obtain explicit consent
  const consent = await requestConsent({
    userId,
    purpose,
    dataTypes: ['fingerprint', 'facial'],
    retentionPeriod: '5_years',
    dataProcessing: 'template_matching_only',
  });
  
  if (!consent.granted) {
    throw new Error('Biometric consent required');
  }
  
  // Store consent record
  const consentRecord = await db.consents.insert({
    userId,
    purpose,
    grantedAt: Date.now(),
    expiresAt: Date.now() + 5 * 365 * 24 * 60 * 60 * 1000,
    dataTypes: consent.dataTypes,
  });
  
  return consentRecord;
};
```

## Non-Human Identity Governance

### Machine Identity Management

```typescript
interface MachineIdentity {
  id: string;
  type: 'service_account' | 'bot' | 'api_key' | 'certificate';
  owner: string;
  permissions: Permission[];
  rotationSchedule: RotationSchedule;
  usageMonitoring: MonitoringConfig;
}

const createMachineIdentity = async (
  config: MachineIdentityConfig
): Promise<MachineIdentity> => {
  // Generate identity credentials
  const credentials = await generateCredentials(config.type);
  
  // Assign minimal permissions
  const permissions = await assignMinimalPermissions(config.requiredActions);
  
  // Set up rotation schedule
  const rotationSchedule = {
    interval: 90, // days
    nextRotation: Date.now() + 90 * 24 * 60 * 60 * 1000,
  };
  
  // Configure usage monitoring
  const monitoring = {
    logAllAccess: true,
    alertOnAnomalies: true,
    quotaLimits: config.quotaLimits,
  };
  
  const identity = await db.machineIdentities.insert({
    id: config.id,
    type: config.type,
    owner: config.owner,
    credentials: encryptCredentials(credentials),
    permissions,
    rotationSchedule,
    usageMonitoring: monitoring,
  });
  
  return identity;
};
```

### Just-in-Time Access

```typescript
const grantJustInTimeAccess = async (
  requester: User,
  resource: Resource,
  duration: number
): Promise<TemporaryAccess> => {
  // Verify requester has authorization to grant access
  if (!await canGrantAccess(requester, resource)) {
    throw new Error('Unauthorized to grant access');
  }
  
  // Create temporary credential
  const tempCredential = await generateTemporaryCredential({
    resource,
    permissions: ['read', 'write'],
    expiresAt: Date.now() + duration,
  });
  
  // Log access grant
  await auditLog.log({
    action: 'jit_access_granted',
    requester: requester.id,
    resource: resource.id,
    duration,
    timestamp: Date.now(),
  });
  
  // Schedule automatic revocation
  scheduleRevocation(tempCredential.id, duration);
  
  return {
    credential: tempCredential,
    expiresAt: Date.now() + duration,
  };
};
```

## Privacy-Preserving Authentication

### Zero-Knowledge Proofs

```typescript
const zkAuth = async (
  user: User,
  challenge: Challenge
): Promise<Proof> => {
  // Generate zero-knowledge proof
  const proof = await zkSNARK.prove({
    publicInput: challenge.publicInput,
    privateInput: {
      userSecret: user.secret,
      userIdentity: user.identity,
    },
  });
  
  return proof;
};

const verifyZKAuth = async (
  proof: Proof,
  publicInput: any
): Promise<boolean> => {
  const verified = await zkSNARK.verify({
    proof,
    publicInput,
    verificationKey: VERIFICATION_KEY,
  });
  
  return verified;
};
```

### Anonymous Credentials

```typescript
const issueAnonymousCredential = async (
  issuer: Issuer,
  attributes: CredentialAttributes
): Promise<AnonymousCredential> => {
  // Create anonymous credential using CL signatures
  const credential = await CLSignature.issue({
    issuerKey: issuer.privateKey,
    attributes,
    randomness: generateRandomness(),
  });
  
  return {
    signature: credential.signature,
    attributes: credential.attributes,
    issuerPublicKey: issuer.publicKey,
  };
};

const verifyAnonymousCredential = async (
  credential: AnonymousCredential,
  proof: ProofOfPossession
): Promise<boolean> => {
  // Verify without revealing identity
  const verified = await CLSignature.verify({
    signature: credential.signature,
    attributes: credential.attributes,
    issuerPublicKey: credential.issuerPublicKey,
    proof,
  });
  
  return verified;
};
```

## Identity Lifecycle Management

### Onboarding

```typescript
const onboardUser = async (
  user: User,
  role: Role
): Promise<OnboardingResult> => {
  // Create identity
  const identity = await createIdentity(user);
  
  // Assign role-based permissions
  const permissions = await assignPermissions(identity, role);
  
  // Issue initial credentials
  const credentials = await issueCredentials(identity, permissions);
  
  // Set up MFA
  const mfaSetup = await configureMFA(identity);
  
  // Document consent
  const consent = await recordConsent(user, privacyPolicy);
  
  // Log onboarding
  await auditLog.log({
    action: 'user_onboarded',
    userId: user.id,
    role,
    timestamp: Date.now(),
  });
  
  return {
    identity,
    credentials,
    mfaSetup,
    consent,
  };
};
```

### Offboarding

```typescript
const offboardUser = async (userId: string): Promise<OffboardingResult> => {
  // Revoke all credentials
  await revokeAllCredentials(userId);
  
  // Remove all permissions
  await removeAllPermissions(userId);
  
  // Delete or anonymize personal data
  await handleDataRetention(userId);
  
  // Archive audit logs
  await archiveAuditLogs(userId);
  
  // Notify systems of departure
  await notifyDeparture(userId);
  
  return { success: true, timestamp: Date.now() };
};
```

### Access Review

```typescript
const performAccessReview = async (
  reviewPeriod: DateRange
): Promise<AccessReviewReport> => {
  // Get all access grants
  const accessGrants = await getAccessGrants(reviewPeriod);
  
  // Review each grant
  const reviewResults = await Promise.all(
    accessGrants.map(async (grant) => {
      // Check if still needed
      const stillNeeded = await verifyAccessNeed(grant);
      
      // Check for policy violations
      const violations = await checkPolicyCompliance(grant);
      
      return {
        grant,
        stillNeeded,
        violations,
        recommendation: stillNeeded ? 'retain' : 'revoke',
      };
    })
  );
  
  // Generate report
  const report = {
    period: reviewPeriod,
    totalGrants: accessGrants.length,
    retainCount: reviewResults.filter(r => r.recommendation === 'retain').length,
    revokeCount: reviewResults.filter(r => r.recommendation === 'revoke').length,
    violations: reviewResults.filter(r => r.violations.length > 0),
  };
  
  return report;
};
```

## Identity Federation

### SAML Federation

```typescript
const configureSAMLFederation = async (
  serviceProvider: ServiceProvider,
  identityProvider: IdentityProvider
): Promise<FederationConfig> => {
  // Exchange metadata
  const spMetadata = generateSPMetadata(serviceProvider);
  const idpMetadata = await fetchIDPMetadata(identityProvider);
  
  // Configure trust
  const trustConfig = {
    idpSSOURL: idpMetadata.ssoURL,
    idpSLOURL: idpMetadata.sloURL,
    idpCertificate: idpMetadata.certificate,
    spCertificate: serviceProvider.certificate,
    assertionConsumerService: serviceProvider.acsURL,
  };
  
  // Set up attribute mapping
  const attributeMapping = {
    email: 'emailAddress',
    name: 'displayName',
    department: 'department',
    title: 'jobTitle',
  };
  
  return {
    trustConfig,
    attributeMapping,
    metadata: spMetadata,
  };
};
```

### OIDC Federation

```typescript
const configureOIDCFederation = async (
  client: OIDCClient,
  provider: OIDCProvider
): Promise<FederationConfig> => {
  // Register client
  const registration = await provider.register({
    redirect_uris: client.redirectURIs,
    response_types: ['code'],
    grant_types: ['authorization_code'],
    token_endpoint_auth_method: 'client_secret_post',
  });
  
  // Configure federation
  const config = {
    issuer: provider.issuer,
    authorization_endpoint: provider.authorizationEndpoint,
    token_endpoint: provider.tokenEndpoint,
    jwks_uri: provider.jwksURI,
    client_id: registration.client_id,
    client_secret: registration.client_secret,
  };
  
  return config;
};
```

## Best Practices

### Do

- Implement zero-trust principles
- Protect biometric data with encryption
- Obtain explicit consent for biometric data
- Use just-in-time access for elevated privileges
- Implement continuous authentication
- Regular access reviews
- Log all identity-related events
- Use privacy-preserving authentication where possible
- Implement proper offboarding procedures
- Monitor for identity anomalies

### Don't

- Store biometric templates in plaintext
- Use biometric data for purposes beyond consent
- Grant permanent access when temporary suffices
- Skip access reviews
- Ignore identity federation security
- Forget about consent management
- Use weak authentication for machine identities
- Skip monitoring of identity usage
- Ignore data retention requirements
- Forget about privacy regulations

## Resources

### Documentation

- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-4/)
- [OWASP Identity Management](https://owasp.org/www-community/Identity_Management_Cheat_Sheet)
- [Ping Identity Zero-Knowledge Biometrics](https://press.pingidentity.com/2026-01-07-Ping-Identity-Marks-Digital-Trust-Milestone)

### Standards

- [FIDO2/WebAuthn](https://fidoalliance.org/fido2/)
- [OpenID Connect Federation](https://openid.net/specs/openid-connect-federation-1_0.html)
- [SAML 2.0](https://www.oasis-open.org/committees/security)
