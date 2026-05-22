---
name: privacy-architecture
description: Comprehensive privacy architecture guide covering privacy by design, data minimization, purpose limitation, privacy-enhancing technologies, federated learning, and privacy-preserving system design for 2026
---

# Privacy Architecture Guide

This skill provides comprehensive guidance for designing privacy-first architectures, covering privacy by design principles, data minimization, purpose limitation, privacy-enhancing technologies, and privacy-preserving system design for 2026.

## Privacy by Design Principles

### Core Principles

Privacy by design ensures that privacy features are embedded into the core of systems, services, and business processes from the earliest design stage, not bolted on afterwards.

### Seven Foundational Principles

1. **Proactive not Reactive**: Anticipate and prevent privacy-invasive events before they happen
2. **Privacy as Default**: Automatically protect personal data; no action required
3. **Privacy Embedded into Design**: Privacy is integral to the system, not an add-on
4. **Full Functionality**: Positive-sum, not zero-sum; privacy and functionality coexist
5. **End-to-End Security**: Security across the entire lifecycle
6. **Visibility and Transparency**: Openness about practices and policies
7. **Respect for User Privacy**: Keep user-centric focus

## Data Minimization

### Collect Only What's Needed

```typescript
interface DataCollectionPolicy {
  purpose: string;
  dataFields: string[];
  retentionPeriod: number; // days
  accessControls: string[];
  encryptionRequired: boolean;
}

const assessDataCollection = (
  proposedFields: string[],
  purpose: string
): DataCollectionAssessment => {
  // Evaluate necessity of each field
  const assessment = proposedFields.map(field => ({
    field,
    necessary: isNecessaryForPurpose(field, purpose),
    alternatives: findAlternatives(field),
  }));
  
  // Remove unnecessary fields
  const minimizedFields = assessment
    .filter(a => a.necessary)
    .map(a => a.field);
  
  return {
    originalFields: proposedFields,
    minimizedFields,
    removedFields: assessment.filter(a => !a.necessary),
    alternatives: assessment.flatMap(a => a.alternatives),
  };
};
```

### Data Minimization in Practice

```typescript
const minimizeUserData = (user: User, context: Context): MinimizedUser => {
  // Only collect data needed for the specific context
  const minimized: MinimizedUser = {
    id: user.id,
  };
  
  if (context.requiresEmail) {
    minimized.email = user.email;
  }
  
  if (context.requiresAddress) {
    minimized.address = user.address;
  }
  
  // Never collect unnecessary data
  return minimized;
};
```

## Purpose Limitation

### Define Clear Purposes

```typescript
interface PurposeDefinition {
  id: string;
  description: string;
  legalBasis: string;
  dataCategories: string[];
  retentionPeriod: number;
  thirdPartySharing: boolean;
}

const definePurposes = (): PurposeDefinition[] => [
  {
    id: 'user-authentication',
    description: 'Authenticate users for access to services',
    legalBasis: 'contract',
    dataCategories: ['email', 'password_hash'],
    retentionPeriod: 365,
    thirdPartySharing: false,
  },
  {
    id: 'payment-processing',
    description: 'Process payments for goods and services',
    legalBasis: 'contract',
    dataCategories: ['payment_method', 'billing_address'],
    retentionPeriod: 1825, // 5 years for financial records
    thirdPartySharing: true, // payment processor
  },
];
```

### Enforce Purpose Limitation

```typescript
const enforcePurposeLimitation = async (
  dataAccess: DataAccessRequest
): Promise<AccessDecision> => {
  // Get original purpose of data collection
  const originalPurpose = await getPurpose(dataAccess.dataId);
  
  // Check if new purpose is compatible
  const compatible = arePurposesCompatible(
    originalPurpose,
    dataAccess.requestedPurpose
  );
  
  if (!compatible) {
    return {
      allowed: false,
      reason: 'Purpose not compatible with original collection purpose',
    };
  }
  
  // Check if user consent obtained for new purpose
  if (requiresConsent(dataAccess.requestedPurpose)) {
    const consent = await checkConsent(
      dataAccess.userId,
      dataAccess.requestedPurpose
    );
    
    if (!consent) {
      return {
        allowed: false,
        reason: 'User consent not obtained for this purpose',
      };
    }
  }
  
  return { allowed: true };
};
```

## Privacy-Enhancing Technologies (PETs)

### Differential Privacy

```typescript
const addDifferentialPrivacy = (
  data: number[],
  epsilon: number
): number[] => {
  const sensitivity = 1; // Maximum change from one record
  const scale = sensitivity / epsilon;
  
  return data.map(value => {
    const noise = laplaceRandom(scale);
    return value + noise;
  });
};

const privateCount = (data: any[], epsilon: number): number => {
  const trueCount = data.length;
  return addDifferentialPrivacy([trueCount], epsilon)[0];
};
```

### Homomorphic Encryption

```typescript
const homomorphicEncrypt = async (
  data: number,
  publicKey: string
): Promise<EncryptedData> => {
  // Use Paillier or BFV for homomorphic encryption
  const encrypted = await paillier.encrypt(data, publicKey);
  
  return {
    ciphertext: encrypted.ciphertext,
    publicKey,
  };
};

const homomorphicAdd = async (
  encrypted1: EncryptedData,
  encrypted2: EncryptedData
): Promise<EncryptedData> => {
  // Add encrypted values without decrypting
  const sum = await paillier.add(encrypted1, encrypted2);
  
  return sum;
};
```

### Secure Multi-Party Computation

```typescript
const secureComputation = async (
  parties: Party[],
  computation: Computation
): Promise<ComputationResult> => {
  // Each party encrypts their input
  const encryptedInputs = await Promise.all(
    parties.map(p => p.encryptInput(computation.inputId))
  );
  
  // Perform computation on encrypted data
  const encryptedResult = await mpc.compute(
    encryptedInputs,
    computation.function
  );
  
  // Decrypt result with all parties' keys
  const result = await mpc.decrypt(encryptedResult, parties);
  
  return result;
};
```

## Federated Learning

### Privacy-Preserving Machine Learning

```typescript
class FederatedLearningClient {
  private localModel: Model;
  private data: TrainingData;
  
  async trainLocal(epochs: number): Promise<ModelUpdate> {
    // Train on local data
    const update = await this.localModel.train(this.data, epochs);
    
    // Apply differential privacy to gradients
    const privateUpdate = this.addDifferentialPrivacy(update);
    
    return privateUpdate;
  }
  
  addDifferentialPrivacy(update: ModelUpdate): ModelUpdate {
    const epsilon = 1.0;
    const sensitivity = 1.0;
    const scale = sensitivity / epsilon;
    
    return {
      weights: update.weights.map(w => w + laplaceRandom(scale)),
      metadata: update.metadata,
    };
  }
}

class FederatedLearningServer {
  private globalModel: Model;
  private clients: FederatedLearningClient[];
  
  async aggregateUpdates(
    updates: ModelUpdate[]
  ): Promise<Model> {
    // Federated averaging
    const aggregated = this.federatedAveraging(updates);
    
    // Update global model
    this.globalModel = await this.globalModel.update(aggregated);
    
    return this.globalModel;
  }
  
  federatedAveraging(updates: ModelUpdate[]): ModelUpdate {
    const totalWeight = updates.reduce((sum, u) => sum + u.metadata.weight, 0);
    
    const averagedWeights = updates[0].weights.map((_, i) => {
      return updates.reduce((sum, u) => {
        return sum + (u.weights[i] * u.metadata.weight);
      }, 0) / totalWeight;
    });
    
    return { weights: averagedWeights, metadata: { weight: totalWeight } };
  }
}
```

## Data Architecture Patterns

### Privacy-Preserving Data Flow

```typescript
interface PrivacyPreservingPipeline {
  collection: DataCollectionStage;
  processing: DataProcessingStage;
  storage: DataStorageStage;
  sharing: DataSharingStage;
}

const buildPrivacyPipeline = (): PrivacyPreservingPipeline => {
  return {
    collection: {
      minimize: true,
      encrypt: true,
      consent: true,
    },
    processing: {
      anonymize: true,
      pseudonymize: true,
      aggregate: true,
    },
    storage: {
      encryptAtRest: true,
      accessControl: true,
      auditLog: true,
    },
    sharing: {
      dataUseAgreement: true,
      purposeLimitation: true,
      differentialPrivacy: true,
    },
  };
};
```

### Data Partitioning

```typescript
const partitionData = (
  data: UserData,
  sensitivity: SensitivityLevel
): DataPartition => {
  return {
    public: {
      id: data.id,
      createdAt: data.createdAt,
    },
    internal: {
      email: data.email,
      lastLogin: data.lastLogin,
    },
    restricted: {
      ssn: data.ssn,
      paymentInfo: data.paymentInfo,
    },
    encrypted: {
      // Encrypt restricted fields
      ssn: encrypt(data.ssn),
      paymentInfo: encrypt(data.paymentInfo),
    },
  };
};
```

## Privacy Impact Assessment

### Conduct PIA

```typescript
const conductPIA = async (
  system: SystemDescription
): Promise<PrivacyImpactAssessment> => {
  // Identify personal data processing
  const dataProcessing = await identifyDataProcessing(system);
  
  // Assess necessity and proportionality
  const necessity = assessNecessity(dataProcessing);
  
  // Identify risks
  const risks = await identifyPrivacyRisks(system, dataProcessing);
  
  // Identify mitigation strategies
  const mitigations = await identifyMitigations(risks);
  
  return {
    system: system.id,
    dataProcessing,
    necessity,
    risks,
    mitigations,
    residualRisk: calculateResidualRisk(risks, mitigations),
    recommendation: generateRecommendation(necessity, risks, mitigations),
  };
};
```

## Privacy Controls

### Technical Controls

```typescript
const implementPrivacyControls = async (
  system: System
): Promise<PrivacyControls> => {
  return {
    encryption: {
      atRest: await enableEncryptionAtRest(system),
      inTransit: await enableEncryptionInTransit(system),
    },
    accessControl: {
      rbac: await implementRBAC(system),
      abac: await implementABAC(system),
    },
    dataProtection: {
      anonymization: await enableAnonymization(system),
      pseudonymization: await enablePseudonymization(system),
    },
    monitoring: {
      auditLogging: await enableAuditLogging(system),
      anomalyDetection: await enableAnomalyDetection(system),
    },
  };
};
```

### Organizational Controls

```typescript
const implementOrganizationalControls = (): OrganizationalControls => {
  return {
    policies: {
      privacyPolicy: 'https://example.com/privacy',
      dataRetentionPolicy: 'https://example.com/retention',
      dataBreachPolicy: 'https://example.com/breach',
    },
    training: {
      employeeTraining: true,
      frequency: 'annually',
      topics: ['data_protection', 'privacy_principles', 'security'],
    },
    governance: {
      dpo: 'privacy@example.com',
      privacyCommittee: true,
      reviewSchedule: 'quarterly',
    },
  };
};
```

## Best Practices

### Do

- Apply privacy by design from the start
- Minimize data collection
- Limit data use to stated purposes
- Implement privacy-enhancing technologies
- Use encryption for all sensitive data
- Implement proper access controls
- Conduct privacy impact assessments
- Monitor for privacy violations
- Maintain transparency with users
- Plan for data deletion requests

### Don't

- Collect data "just in case"
- Use data for unspecified purposes
- Ignore data retention requirements
- Skip privacy impact assessments
- Store sensitive data in plaintext
- Forget about user consent
- Ignore regulatory requirements
- Skip privacy training
- Forget about data subject rights
- Ignore cross-border data transfer rules

## Resources

### Documentation

- [LINDDUN Privacy Threat Modeling](https://linddun.org/)
- [NIST Privacy Framework](https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering)
- [ISO 27550 Privacy Engineering](https://www.iso.org/standard/72830.html)

### Tools

- [Microsoft Privacy Tools](https://www.microsoft.com/privacy)
- [IBM Privacy Toolkit](https://www.ibm.com/privacy)
- [OneTrust Privacy Management](https://www.onetrust.com)
