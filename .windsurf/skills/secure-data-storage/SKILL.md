---
name: secure-data-storage
description: Comprehensive secure data storage guide covering encryption at rest, key management, data anonymization, secure deletion, database security, and post-quantum readiness for 2026
---

# Secure Data Storage Guide

This skill provides comprehensive guidance for securing data at rest, covering encryption, key management, data anonymization, secure deletion, and database security practices for 2026.

## Encryption at Rest

### Database Encryption

```typescript
// Application-level encryption before storage
import crypto from 'crypto';

const encryptData = (data: string, key: Buffer): EncryptedData => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    algorithm: 'aes-256-gcm',
  };
};

const decryptData = (encryptedData: EncryptedData, key: Buffer): string => {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(encryptedData.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

### Field-Level Encryption

```typescript
// Encrypt sensitive fields individually
const encryptUserPII = (user: User, encryptionKey: Buffer): EncryptedUser => {
  return {
    id: user.id,
    email: encryptData(user.email, encryptionKey),
    phone: encryptData(user.phone, encryptionKey),
    ssn: encryptData(user.ssn, encryptionKey),
    // Non-sensitive fields remain plaintext
    name: user.name,
    createdAt: user.createdAt,
  };
};
```

### Transparent Data Encryption (TDE)

```sql
-- Enable TDE in PostgreSQL
ALTER SYSTEM SET ssl = 'on';
ALTER SYSTEM SET ssl_cert_file = '/path/to/server.crt';
ALTER SYSTEM SET ssl_key_file = '/path/to/server.key';

-- Enable encryption for specific tables
CREATE TABLE encrypted_users (
  id SERIAL PRIMARY KEY,
  data BYTEA NOT NULL
);

-- Encrypt data before insert
INSERT INTO encrypted_users (data) 
VALUES (pgp_sym_encrypt('sensitive data', 'encryption_key'));
```

## Key Management

### Hardware Security Modules (HSMs)

```typescript
import AWS from 'aws-sdk';

const kms = new AWS.KMS();

const generateKey = async () => {
  const result = await kms.createKey({
    Description: 'Application data encryption key',
    KeyUsage: 'ENCRYPT_DECRYPT',
    KeySpec: 'AES_256',
    Origin: 'AWS_KMS',
  }).promise();
  
  return result.KeyMetadata;
};

const encryptWithKMS = async (data: string, keyId: string) => {
  const result = await kms.encrypt({
    KeyId: keyId,
    Plaintext: Buffer.from(data),
  }).promise();
  
  return result.CiphertextBlob;
};

const decryptWithKMS = async (ciphertext: Buffer) => {
  const result = await kms.decrypt({
    CiphertextBlob: ciphertext,
  }).promise();
  
  return result.Plaintext.toString('utf8');
};
```

### Key Rotation

```typescript
const rotateKey = async (oldKeyId: string) => {
  // Generate new key
  const newKey = await generateKey();
  
  // Re-encrypt all data with new key
  const encryptedData = await getAllEncryptedData(oldKeyId);
  
  for (const item of encryptedData) {
    const decrypted = await decryptWithKMS(item.ciphertext, oldKeyId);
    const reencrypted = await encryptWithKMS(decrypted, newKey.KeyId);
    await updateEncryptedData(item.id, reencrypted);
  }
  
  // Schedule old key for deletion
  await kms.scheduleKeyDeletion({
    KeyId: oldKeyId,
    PendingWindowInDays: 30,
  }).promise();
  
  return newKey;
};
```

### Key Lifecycle Management

```typescript
interface KeyLifecycle {
  generation: {
    location: 'hsm' | 'kms' | 'local';
    algorithm: 'aes-256' | 'rsa-4096';
  };
  distribution: {
    method: 'automatic' | 'manual';
    accessControls: string[];
  };
  rotation: {
    interval: number; // days
    automatic: boolean;
  };
  destruction: {
    method: 'cryptographic-erase' | 'physical-destruction';
    retention: number; // days
  };
}
```

## Data Anonymization

### Pseudonymization

```typescript
const pseudonymize = (data: string, salt: string): string => {
  const hash = crypto
    .createHash('sha256')
    .update(data + salt)
    .digest('hex');
  
  return hash.substring(0, 16); // Truncate for pseudonym
};

const pseudonymizeUser = (user: User): PseudonymizedUser => {
  const salt = process.env.PSEUDONYMIZATION_SALT;
  
  return {
    pseudonymId: pseudonymize(user.id, salt),
    pseudonymEmail: pseudonymize(user.email, salt),
    // Keep non-identifying data
    age: user.age,
    region: user.region,
  };
};
```

### Data Masking

```typescript
const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  const maskedLocal = local.substring(0, 2) + '***';
  return `${maskedLocal}@${domain}`;
};

const maskPhone = (phone: string): string => {
  return phone.substring(0, 3) + '***' + phone.substring(phone.length - 4);
};

const maskSSN = (ssn: string): string => {
  return '***-**-' + ssn.substring(ssn.length - 4);
};
```

### Differential Privacy

```typescript
const addLaplaceNoise = (value: number, epsilon: number): number => {
  const sensitivity = 1; // Maximum change from one record
  const scale = sensitivity / epsilon;
  const noise = laplaceRandom(scale);
  
  return value + noise;
};

const privateCount = (data: any[], epsilon: number): number => {
  const trueCount = data.length;
  return addLaplaceNoise(trueCount, epsilon);
};
```

## Secure Deletion

### Cryptographic Erasure

```typescript
const cryptographicallyErase = async (keyId: string) => {
  // Destroy the key, making all encrypted data unrecoverable
  await kms.disableKey({ KeyId: keyId }).promise();
  await kms.scheduleKeyDeletion({
    KeyId: keyId,
    PendingWindowInDays: 7,
  }).promise();
};
```

### Secure File Deletion

```typescript
const secureDeleteFile = async (filePath: string) => {
  // Overwrite file with random data multiple times
  const fileHandle = await fs.open(filePath, 'r+');
  
  for (let i = 0; i < 3; i++) {
    const randomData = crypto.randomBytes(await fs.stat(filePath).then(s => s.size));
    await fileHandle.write(randomData, 0, 0, randomData.length);
    await fs.fsync(fileHandle.fd);
  }
  
  await fileHandle.close();
  await fs.unlink(filePath);
};
```

### Database Record Deletion

```sql
-- Soft delete with audit trail
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  deleted_at TIMESTAMP,
  deletion_reason TEXT,
  deleted_by TEXT
);

-- Hard delete with logging
CREATE OR REPLACE FUNCTION secure_delete_user(user_id INTEGER)
RETURNS VOID AS $$
BEGIN
  -- Log deletion
  INSERT INTO deletion_audit (user_id, deleted_at, deleted_by)
  VALUES (user_id, NOW(), current_user);
  
  -- Delete record
  DELETE FROM users WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;
```

## Database Security

### Row-Level Security

```sql
-- Enable RLS
ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY user_data_isolation ON sensitive_data
  FOR SELECT
  USING (user_id = current_user_id());

-- Policy: Users can only update their own data
CREATE POLICY user_data_update ON sensitive_data
  FOR UPDATE
  USING (user_id = current_user_id());
```

### Column-Level Encryption

```typescript
// Use pgcrypto for column-level encryption
const encryptColumn = async (value: string, key: string) => {
  const result = await db.query(
    `SELECT pgp_sym_encrypt($1, $2) as encrypted`,
    [value, key]
  );
  
  return result.rows[0].encrypted;
};

const decryptColumn = async (encrypted: string, key: string) => {
  const result = await db.query(
    `SELECT pgp_sym_decrypt($1, $2) as decrypted`,
    [encrypted, key]
  );
  
  return result.rows[0].decrypted;
};
```

### Database Backup Encryption

```bash
# Encrypt PostgreSQL backup
pg_dump dbname | gzip | gpg --encrypt --recipient admin@example.com > backup.sql.gz.gpg

# Decrypt backup
gpg --decrypt backup.sql.gz.gpg | gunzip | psql dbname
```

## Post-Quantum Readiness

### Hybrid Key Storage

```typescript
const storeHybridKey = async (key: HybridKey) => {
  // Store classical key
  await kms.putKey({
    KeyId: `${key.id}-classical`,
    KeyMaterial: key.classical,
  });
  
  // Store post-quantum key
  await kms.putKey({
    KeyId: `${key.id}-postquantum`,
    KeyMaterial: key.postQuantum,
  });
  
  // Store metadata
  await db.keys.insert({
    id: key.id,
    classicalKeyId: `${key.id}-classical`,
    postQuantumKeyId: `${key.id}-postquantum`,
    createdAt: new Date(),
  });
};
```

### Algorithm Agility

```typescript
const encryptWithAlgorithm = async (
  data: string,
  algorithm: 'aes-256' | 'kyber' | 'hybrid'
) => {
  switch (algorithm) {
    case 'aes-256':
      return encryptAES256(data);
    case 'kyber':
      return encryptKyber(data);
    case 'hybrid':
      return encryptHybrid(data);
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
};
```

## Best Practices

### Do

- Encrypt sensitive data at rest
- Use HSMs or KMS for key management
- Implement key rotation (every 90-180 days)
- Separate keys by purpose
- Implement data minimization
- Use secure deletion for sensitive data
- Enable database-level security controls
- Plan for post-quantum migration
- Audit key access
- Test backup and recovery

### Don't

- Store keys in code or config files
- Use the same key for multiple purposes
- Skip key rotation
- Store plaintext sensitive data
- Ignore backup encryption
- Use weak encryption algorithms
- Forget about key destruction
- Skip database security controls
- Ignore post-quantum threats
- Forget about data retention policies

## Key Management Best Practices

### 1. Secure Key Generation

Generate keys within secure environments like HSMs or TPMs. Use sufficient key length (RSA-3072 or above) and avoid hardcoding keys.

### 2. Purpose-Bound Key Usage

Cryptographic keys must be strictly scoped to a single purpose. Encryption keys, signing keys, and authentication keys serve different roles and must never be reused interchangeably.

### 3. Secure Storage

Use FIPS 140-3 compliant HSMs or secure key vaults. Keys must never be stored in plaintext, configuration files, or unsecured storage.

### 4. Limit Access

Enforce role-based access control, the principle of least privilege, and multi-factor authentication for key usage.

### 5. Separation of Duties

No single user or system should control the entire key lifecycle. Separate responsibilities for generation, approval, deployment, and revocation.

### 6. Key Custodianship

Assign dedicated key custodians responsible for governance and oversight rather than direct operational use.

### 7. Risk-Based Segmentation

Classify keys based on sensitivity to ensure high-value cryptographic assets receive the highest level of protection.

### 8. Lifecycle-Driven Rotation

Define key lifetimes based on algorithm, usage, and risk profile. Compromised or deprecated keys must be revoked immediately.

### 9. Secure Backup and Recovery

Maintain encrypted backups stored in separate, secure geographic locations with strict access controls.

### 10. Continuous Monitoring and Auditing

Monitor key usage, access patterns, and anomaly detection for security events.

## Resources

### Documentation

- [NIST Key Management Guidelines](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)
- [AWS KMS Documentation](https://docs.aws.amazon.com/kms/)
- [Encryption Consulting Key Management](https://www.encryptionconsulting.com/best-practices-for-key-management-in-2026/)

### Tools

- [AWS KMS](https://aws.amazon.com/kms/)
- [HashiCorp Vault](https://www.vaultproject.io)
- [Azure Key Vault](https://azure.microsoft.com/services/key-vault/)
