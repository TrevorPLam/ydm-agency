---
name: secure-communications
description: Comprehensive secure communications guide covering end-to-end encryption, post-quantum cryptography, Signal protocol, TLS configuration, certificate management, and quantum-safe messaging for 2026
---

# Secure Communications Guide

This skill provides comprehensive guidance for implementing secure communications, covering end-to-end encryption, post-quantum cryptography, TLS configuration, and quantum-safe messaging protocols for 2026.

## End-to-End Encryption

### Signal Protocol Implementation

The Signal protocol provides forward secrecy and future secrecy for messaging.

```typescript
import { SignalProtocolStore } from '@signalapp/libsignal';

class SecureMessaging {
  private store: SignalProtocolStore;
  
  constructor() {
    this.store = new SignalProtocolStore();
  }
  
  async encryptMessage(
    recipientAddress: string,
    message: string
  ): Promise<EncryptedMessage> {
    const address = new SignalProtocolAddress(recipientAddress, 1);
    const session = await this.store.loadSession(address);
    
    if (!session) {
      throw new Error('No session established');
    }
    
    const cipherText = await session.encrypt(message);
    
    return {
      recipient: recipientAddress,
      cipherText: cipherText.body,
      type: cipherText.type,
    };
  }
  
  async decryptMessage(
    senderAddress: string,
    encryptedMessage: EncryptedMessage
  ): Promise<string> {
    const address = new SignalProtocolAddress(senderAddress, 1);
    const session = await this.store.loadSession(address);
    
    if (!session) {
      throw new Error('No session established');
    }
    
    const decrypted = await session.decrypt(
      encryptedMessage.type,
      encryptedMessage.cipherText
    );
    
    return decrypted;
  }
}
```

### Key Exchange

```typescript
const performKeyExchange = async () => {
  // Generate key pair
  const keyPair = await generateIdentityKeyPair();
  
  // Generate pre-keys
  const signedPreKey = await generateSignedPreKey(keyPair);
  const oneTimePreKeys = await generateOneTimePreKeys(100);
  
  // Upload to server
  await uploadKeys({
    identityKey: keyPair.publicKey,
    signedPreKey: signedPreKey.keyPair.publicKey,
    signedPreKeySignature: signedPreKey.signature,
    oneTimePreKeys: oneTimePreKeys.map(k => k.keyPair.publicKey),
  });
  
  return keyPair;
};
```

## Post-Quantum Cryptography

### Why Post-Quantum Matters

Quantum computers threaten current public-key cryptography through Shor's algorithm, which can break RSA and ECC. "Harvest now, decrypt later" attacks mean encrypted data captured today could be decrypted in the future.

### NIST Post-Quantum Algorithms

As of 2026, NIST has standardized several post-quantum algorithms:

- **ML-KEM (FIPS 203)**: Key encapsulation mechanism (formerly Kyber)
- **ML-DSA (FIPS 204)**: Digital signature algorithm (formerly Dilithium)
- **SLH-DSA (FIPS 205)**: Stateful hash-based signatures (formerly SPHINCS+)

### Hybrid Encryption

Combine classical and post-quantum algorithms for defense in depth.

```typescript
const hybridEncrypt = async (
  plaintext: string,
  recipientPublicKey: HybridPublicKey
): Promise<HybridCiphertext> => {
  // Classical encryption (e.g., X25519)
  const classicalKey = await generateX25519KeyPair();
  const classicalShared = await deriveSharedSecret(
    classicalKey.privateKey,
    recipientPublicKey.classical
  );
  const classicalCiphertext = await aesGcmEncrypt(
    plaintext,
    classicalShared
  );
  
  // Post-quantum encryption (e.g., Kyber)
  const pqKey = await generateKyberKeyPair();
  const pqShared = await kyberEncapsulate(
    recipientPublicKey.postQuantum
  );
  const pqCiphertext = await aesGcmEncrypt(
    plaintext,
    pqShared
  );
  
  return {
    classical: classicalCiphertext,
    postQuantum: pqCiphertext,
    ephemeralPublicKey: {
      classical: classicalKey.publicKey,
      postQuantum: pqKey.publicKey,
    },
  };
};
```

### Post-Quantum TLS

```typescript
const configurePQTLS = () => {
  const tlsConfig = {
    // Enable post-quantum key exchange
    keyExchange: ['hybrid_pq_kem', 'x25519'],
    
    // Post-quantum signature algorithms
    signatureAlgorithms: ['ml-dsa', 'ecdsa', 'rsa'],
    
    // Hybrid cipher suites
    cipherSuites: [
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
    ],
    
    // Minimum TLS version
    minVersion: 'TLSv1.3',
  };
  
  return tlsConfig;
};
```

## TLS Configuration

### Modern TLS Configuration

```typescript
const tlsConfig = {
  minVersion: 'TLSv1.3',
  maxVersion: 'TLSv1.3',
  
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
  ],
  
  // Prefer post-quantum when available
  groups: ['X25519Kyber768Draft00', 'X25519', 'P-256'],
  
  // Strong signature algorithms
  signatureAlgorithms: [
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'rsa_pss_rsae_sha256',
  ],
  
  // HSTS
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
};
```

### Certificate Management

```typescript
const configureCertificates = async () => {
  // Use Let's Encrypt with ACME
  const certificate = await acmeClient.getCertificate({
    domain: 'example.com',
    email: 'admin@example.com',
    keyType: 'ecdsa',
    keySize: 256,
  });
  
  // Configure automatic renewal
  const renewalConfig = {
    renewBefore: 30, // days before expiration
    autoRenew: true,
    notify: ['admin@example.com'],
  };
  
  return { certificate, renewalConfig };
};
```

### Mutual TLS

```typescript
const configureMutualTLS = () => {
  const mTLSConfig = {
    // Server certificate
    cert: await fs.readFile('server-cert.pem'),
    key: await fs.readFile('server-key.pem'),
    
    // CA for client certificates
    ca: await fs.readFile('ca-cert.pem'),
    
    // Require client certificate
    requestCert: true,
    rejectUnauthorized: true,
    
    // Client certificate verification
    verifyClient: 'require',
  };
  
  return mTLSConfig;
};
```

## Quantum Key Distribution (QKD)

### QKD Overview

Quantum Key Distribution uses quantum mechanics to distribute encryption keys with information-theoretic security. While PQC is the primary migration path, QKD provides additional security for the most sensitive applications.

### QKD Implementation

```typescript
class QKDSession {
  private quantumChannel: QuantumChannel;
  private classicalChannel: ClassicalChannel;
  
  async establishKey(): Promise<SharedKey> {
    // BB84 protocol
    const aliceBits = this.generateRandomBits(256);
    const aliceBases = this.generateRandomBases(256);
    
    // Send quantum states
    await this.quantumChannel.sendStates(
      this.encodeStates(aliceBits, aliceBases)
    );
    
    // Bob measures
    const bobBases = this.generateRandomBases(256);
    const bobBits = await this.quantumChannel.receiveStates(bobBases);
    
    // Sift bases
    const siftedResult = this.siftBases(
      aliceBits,
      aliceBases,
      bobBits,
      bobBases
    );
    
    // Error estimation and privacy amplification
    const key = await this.privacyAmplification(siftedResult);
    
    return key;
  }
}
```

## Certificate Pinning

### Public Key Pinning

```typescript
const pinCertificate = async (hostname: string) => {
  // Get expected certificate
  const expectedCert = await getTrustedCertificate(hostname);
  
  // Pin public key hash
  const publicKeyHash = crypto
    .createHash('sha256')
    .update(expectedCert.publicKey)
    .digest('base64');
  
  // Store pin
  await storePin({
    hostname,
    publicKeyHash,
    expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days
  });
};

const verifyPinnedCertificate = async (
  hostname: string,
  cert: Certificate
): Promise<boolean> => {
  const pin = await getPin(hostname);
  
  if (!pin) {
    return true; // No pin set
  }
  
  const certHash = crypto
    .createHash('sha256')
    .update(cert.publicKey)
    .digest('base64');
  
  return certHash === pin.publicKeyHash;
};
```

## Secure Messaging Protocols

### Matrix Protocol

```typescript
const configureMatrix = async () => {
  const client = new MatrixClient({
    baseUrl: 'https://matrix.example.com',
    accessToken: process.env.MATRIX_TOKEN,
    userId: '@user:example.com',
  });
  
  // Enable end-to-end encryption
  await client.setCryptoEnabled(true);
  
  // Verify device keys
  client.on('device_verification', (userId, deviceInfo) => {
    // Implement verification UI
    verifyDevice(userId, deviceInfo);
  });
  
  return client;
};
```

### WebSocket Security

```typescript
const secureWebSocket = new WebSocket('wss://example.com/ws', {
  // Require TLS
  protocol: 'wss',
  
  // Certificate verification
  rejectUnauthorized: true,
  
  // Client certificate for mTLS
  cert: fs.readFileSync('client-cert.pem'),
  key: fs.readFileSync('client-key.pem'),
  
  // Origin header
  headers: {
    Origin: 'https://example.com',
  },
});
```

## Best Practices

### Do

- Use TLS 1.3 or higher
- Implement end-to-end encryption for sensitive communications
- Plan for post-quantum migration
- Use hybrid encryption during transition
- Implement certificate pinning for critical services
- Use mutual TLS for service-to-service communication
- Monitor certificate expiration
- Implement proper key rotation
- Use strong cipher suites
- Enable HSTS

### Don't

- Use TLS 1.0 or 1.1
- Use weak cipher suites
- Ignore certificate expiration
- Skip certificate verification
- Use plaintext protocols
- Disable certificate pinning
- Forget about post-quantum migration
- Use deprecated algorithms
- Ignore security warnings
- Skip key rotation

## Migration to Post-Quantum

### Phase 1: Assessment

1. **Inventory cryptographic assets**
2. **Identify systems using vulnerable algorithms**
3. **Assess migration complexity**
4. **Prioritize high-value systems**

### Phase 2: Preparation

1. **Test post-quantum algorithms in staging**
2. **Update dependencies to PQC-compatible versions**
3. **Train team on PQC concepts**
4. **Develop migration plans**

### Phase 3: Implementation

1. **Deploy hybrid encryption**
2. **Update TLS configurations**
3. **Migrate certificate authorities**
4. **Update key management systems**

### Phase 4: Validation

1. **Test interoperability**
2. **Verify security properties**
3. **Monitor performance impact**
4. **Document changes**

## Resources

### Documentation

- [NIST Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [Cisco Post-Quantum Cryptography](https://www.cisco.com/site/us/en/about/trust-center/post-quantum-cryptography)
- [Signal Protocol Documentation](https://signal.org/docs/)

### Tools

- [Open Quantum Safe](https://openquantumsafe.org)
- [liboqs](https://github.com/open-quantum-safe/liboqs)
- [OQS-OpenSSL](https://github.com/open-quantum-safe/oqs-provider)
