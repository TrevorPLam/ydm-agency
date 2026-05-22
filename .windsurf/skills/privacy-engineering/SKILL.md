---
name: privacy-engineering
description: Comprehensive privacy engineering guide covering LINDDUN threat modeling, privacy risk assessment, privacy controls implementation, continuous privacy monitoring, and privacy-by-design development practices for 2026
---

# Privacy Engineering Guide

This skill provides comprehensive guidance for implementing privacy engineering practices, covering LINDDUN threat modeling, privacy risk assessment, privacy controls, and continuous privacy monitoring for 2026.

## LINDDUN Threat Modeling

### What is LINDDUN?

LINDDUN is a privacy threat modeling methodology that provides a systematic approach to identifying and mitigating privacy risks in software systems. The acronym represents seven privacy threat types:

- **L**inking: Correlating data from different sources to identify individuals
- **I**dentifying: Extracting identity information from anonymized data
- **N**on-repudiation: Linking actions to individuals without their consent
- **D**etecting: Observing user actions or presence
- **D**ata Disclosure: Unauthorized exposure of personal data
- **U**nawareness: Users unaware of data collection and processing
- **N**on-compliance: Violating privacy regulations and policies

### LINDDUN Process

```typescript
interface LINDDUNModel {
  system: SystemDescription;
  dataFlows: DataFlow[];
  threats: PrivacyThreat[];
  mitigations: Mitigation[];
}

const performLINDDUN = async (
  system: SystemDescription
): Promise<LINDDUNModel> => {
  // 1. Model the system
  const dataFlows = await modelDataFlows(system);
  
  // 2. Identify threats using LINDDUN categories
  const threats = await identifyLINDDUNThreats(dataFlows);
  
  // 3. Prioritize threats
  const prioritized = prioritizeThreats(threats);
  
  // 4. Define mitigations
  const mitigations = await defineMitigations(prioritized);
  
  return {
    system,
    dataFlows,
    threats: prioritized,
    mitigations,
  };
};
```

### Threat Identification

```typescript
const identifyLINDDUNThreats = async (
  dataFlows: DataFlow[]
): Promise<PrivacyThreat[]> => {
  const threats: PrivacyThreat[] = [];
  
  for (const flow of dataFlows) {
    // Linking threats
    if (flow.correlatable) {
      threats.push({
        type: 'linking',
        description: 'Data can be correlated across sources',
        severity: 'high',
        location: flow.id,
      });
    }
    
    // Identifying threats
    if (flow.reidentifiable) {
      threats.push({
        type: 'identifying',
        description: 'Anonymized data can be re-identified',
        severity: 'high',
        location: flow.id,
      });
    }
    
    // Non-repudiation threats
    if (flow.auditLogs && !flow.consentForAudit) {
      threats.push({
        type: 'non-repudiation',
        description: 'Actions linked to identity without consent',
        severity: 'medium',
        location: flow.id,
      });
    }
    
    // Detecting threats
    if (flow.observable) {
      threats.push({
        type: 'detecting',
        description: 'User actions can be observed',
        severity: 'medium',
        location: flow.id,
      });
    }
    
    // Data disclosure threats
    if (flow.exposed) {
      threats.push({
        type: 'data-disclosure',
        description: 'Data exposed to unauthorized parties',
        severity: 'critical',
        location: flow.id,
      });
    }
    
    // Unawareness threats
    if (!flow.transparency) {
      threats.push({
        type: 'unawareness',
        description: 'Users unaware of data collection',
        severity: 'high',
        location: flow.id,
      });
    }
    
    // Non-compliance threats
    if (!flow.compliant) {
      threats.push({
        type: 'non-compliance',
        description: 'Processing violates privacy regulations',
        severity: 'critical',
        location: flow.id,
      });
    }
  }
  
  return threats;
};
```

### Mitigation Strategies

```typescript
const getLINDDUNMitigations = (
  threat: PrivacyThreat
): Mitigation[] => {
  const mitigations: Record<string, Mitigation[]> = {
    linking: [
      { type: 'pseudonymization', description: 'Use pseudonyms instead of identifiers' },
      { type: 'data_minimization', description: 'Collect only necessary data' },
      { type: 'segregation', description: 'Separate data stores' },
    ],
    identifying: [
      { type: 'k-anonymity', description: 'Ensure k-anonymity in datasets' },
      { type: 'l-diversity', description: 'Ensure l-diversity for sensitive attributes' },
      { type: 't-closeness', description: 'Ensure t-closeness for distribution' },
    ],
    non_repudiation: [
      { type: 'anonymous_access', description: 'Allow anonymous access where possible' },
      { type: 'consent_management', description: 'Obtain consent for audit logging' },
    ],
    detecting: [
      { type: 'access_control', description: 'Implement strict access controls' },
      { type: 'encryption', description: 'Encrypt data in transit and at rest' },
    ],
    data_disclosure: [
      { type: 'encryption', description: 'Encrypt sensitive data' },
      { type: 'access_control', description: 'Implement RBAC' },
      { type: 'audit_logging', description: 'Log all data access' },
    ],
    unawareness: [
      { type: 'transparency', description: 'Provide clear privacy notices' },
      { type: 'consent_management', description: 'Implement granular consent' },
    ],
    non_compliance: [
      { type: 'compliance_monitoring', description: 'Monitor regulatory compliance' },
      { type: 'data_governance', description: 'Implement data governance framework' },
    ],
  };
  
  return mitigations[threat.type] || [];
};
```

## Privacy Risk Assessment

### Risk Assessment Framework

```typescript
interface PrivacyRisk {
  threat: PrivacyThreat;
  likelihood: number; // 1-5
  impact: number; // 1-5
  riskScore: number; // likelihood * impact
  mitigation: Mitigation;
  residualRisk: number;
}

const assessPrivacyRisks = async (
  threats: PrivacyThreat[]
): Promise<PrivacyRisk[]> => {
  const risks = await Promise.all(
    threats.map(async (threat) => {
      const likelihood = await assessLikelihood(threat);
      const impact = await assessImpact(threat);
      const riskScore = likelihood * impact;
      
      const mitigations = getLINDDUNMitigations(threat);
      const mitigation = mitigations[0]; // Select best mitigation
      
      const residualRisk = calculateResidualRisk(
        riskScore,
        mitigation.effectiveness
      );
      
      return {
        threat,
        likelihood,
        impact,
        riskScore,
        mitigation,
        residualRisk,
      };
    })
  );
  
  return risks.sort((a, b) => b.riskScore - a.riskScore);
};
```

### Continuous Risk Monitoring

```typescript
const monitorPrivacyRisks = async (
  system: System
): Promise<PrivacyRiskReport> => {
  // Collect current privacy metrics
  const metrics = await collectPrivacyMetrics(system);
  
  // Compare with baseline
  const baseline = await getBaselineMetrics(system);
  const deviations = detectDeviations(metrics, baseline);
  
  // Assess new risks
  const newThreats = await identifyNewThreats(system);
  const newRisks = await assessPrivacyRisks(newThreats);
  
  // Generate report
  return {
    timestamp: Date.now(),
    metrics,
    deviations,
    newRisks,
    recommendations: generateRecommendations(newRisks),
  };
};
```

## Privacy Controls Implementation

### Technical Controls

```typescript
const implementPrivacyControls = async (
  system: System,
  risks: PrivacyRisk[]
): Promise<ControlImplementation> => {
  const implementations = await Promise.all(
    risks.map(async (risk) => {
      switch (risk.mitigation.type) {
        case 'pseudonymization':
          return await implementPseudonymization(system, risk.threat.location);
        case 'encryption':
          return await implementEncryption(system, risk.threat.location);
        case 'access_control':
          return await implementAccessControl(system, risk.threat.location);
        case 'consent_management':
          return await implementConsentManagement(system);
        case 'transparency':
          return await implementTransparency(system);
        default:
          return { implemented: false, reason: 'Unknown control type' };
      }
    })
  );
  
  return {
    system: system.id,
    implementations,
    timestamp: Date.now(),
  };
};
```

### Pseudonymization Implementation

```typescript
const implementPseudonymization = async (
  system: System,
  location: string
): Promise<ControlResult> => {
  // Generate pseudonymization keys
  const keys = await generatePseudonymKeys();
  
  // Configure pseudonymization at data collection
  await configureDataCollection({
    location,
    pseudonymize: true,
    keys,
    reversible: false, // Use irreversible pseudonymization
  });
  
  // Update data mapping
  await updateDataMapping({
    location,
    pseudonymized: true,
    keyId: keys.id,
  });
  
  return {
    implemented: true,
    control: 'pseudonymization',
    location,
  };
};
```

### Consent Management

```typescript
const implementConsentManagement = async (
  system: System
): Promise<ControlResult> => {
  // Define consent purposes
  const purposes = await defineConsentPurposes(system);
  
  // Implement consent UI
  await implementConsentUI({
    purposes,
    granularity: 'fine-grained',
    default: 'opt-in',
  });
  
  // Store consent records
  await configureConsentStorage({
    system: system.id,
    retention: 365, // days
    auditTrail: true,
  });
  
  // Implement consent API
  await implementConsentAPI({
    endpoints: ['/consent', '/consent/withdraw'],
    versioning: true,
  });
  
  return {
    implemented: true,
    control: 'consent_management',
    system: system.id,
  };
};
```

## Privacy by Design in Development

### Privacy Requirements

```typescript
interface PrivacyRequirements {
  dataMinimization: boolean;
  purposeLimitation: boolean;
  consentRequired: boolean;
  dataRetention: number; // days
  crossBorderTransfer: boolean;
  encryptionRequired: boolean;
  anonymizationRequired: boolean;
}

const definePrivacyRequirements = (
  system: System
): PrivacyRequirements => {
  return {
    dataMinimization: true,
    purposeLimitation: true,
    consentRequired: system.processesPersonalData,
    dataRetention: calculateRetentionPeriod(system),
    crossBorderTransfer: assessCrossBorderTransfer(system),
    encryptionRequired: system.sensitiveData,
    anonymizationRequired: system.analyticsData,
  };
};
```

### Privacy Testing

```typescript
const testPrivacyControls = async (
  system: System
): Promise<PrivacyTestResults> => {
  const tests = [
    testDataMinimization(system),
    testPurposeLimitation(system),
    testConsentManagement(system),
    testEncryption(system),
    testAccessControl(system),
    testDataRetention(system),
  ];
  
  const results = await Promise.all(tests);
  
  return {
    system: system.id,
    tests: results,
    passed: results.every(r => r.passed),
    timestamp: Date.now(),
  };
};

const testDataMinimization = async (
  system: System
): Promise<TestResult> => {
  const collectedData = await getCollectedData(system);
  const requiredData = getRequiredData(system);
  
  const unnecessaryData = collectedData.filter(
    d => !requiredData.includes(d)
  );
  
  return {
    test: 'data_minimization',
    passed: unnecessaryData.length === 0,
    details: {
      collected: collectedData,
      required: requiredData,
      unnecessary: unnecessaryData,
    },
  };
};
```

## Continuous Privacy Monitoring

### Privacy Metrics

```typescript
interface PrivacyMetrics {
  dataCollectionVolume: number;
  consentRate: number;
  dataAccessRequests: number;
  dataDeletionRequests: number;
  privacyIncidents: number;
  complianceScore: number;
}

const collectPrivacyMetrics = async (
  system: System
): Promise<PrivacyMetrics> => {
  return {
    dataCollectionVolume: await getDataCollectionVolume(system),
    consentRate: await getConsentRate(system),
    dataAccessRequests: await getDataAccessRequests(system),
    dataDeletionRequests: await getDataDeletionRequests(system),
    privacyIncidents: await getPrivacyIncidents(system),
    complianceScore: await calculateComplianceScore(system),
  };
};
```

### Privacy Incident Response

```typescript
const handlePrivacyIncident = async (
  incident: PrivacyIncident
): Promise<IncidentResponse> => {
  // Assess severity
  const severity = assessIncidentSeverity(incident);
  
  // Notify affected parties
  if (severity >= 'high') {
    await notifyAffectedParties(incident);
  }
  
  // Notify regulators if required
  if (severity === 'critical') {
    await notifyRegulators(incident);
  }
  
  // Implement containment measures
  await containIncident(incident);
  
  // Document incident
  await documentIncident(incident);
  
  // Review and update controls
  await reviewAndUpdateControls(incident);
  
  return {
    incidentId: incident.id,
    severity,
    actionsTaken: ['notification', 'containment', 'documentation'],
    timestamp: Date.now(),
  };
};
```

## Best Practices

### Do

- Perform LINDDUN threat modeling early in design
- Implement privacy by design principles
- Use privacy-enhancing technologies
- Conduct regular privacy impact assessments
- Monitor privacy metrics continuously
- Implement granular consent management
- Test privacy controls regularly
- Have incident response procedures
- Maintain transparency with users
- Stay updated on regulations

### Don't

- Skip privacy threat modeling
- Collect data without clear purpose
- Ignore consent requirements
- Forget about data retention
- Skip privacy testing
- Ignore privacy incidents
- Forget about cross-border transfers
- Use weak privacy controls
- Skip user transparency
- Ignore regulatory changes

## Resources

### Documentation

- [LINDDUN.org](https://linddun.org/)
- [OWASP Privacy Threat Modeling](https://owasp.org/www-community/Privacy_Threat_Modeling)
- [NIST Privacy Engineering](https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering)
- [Fraunhofer Privacy by Design](https://www.cybersecurity.blog.aisec.fraunhofer.de/en/privacy-by-design-integrating-privacy-into-the-software-development-life-cycle/)

### Tools

- [Microsoft Privacy Tools](https://www.microsoft.com/privacy)
- [IBM Privacy Toolkit](https://www.ibm.com/privacy)
- [OneTrust Privacy Management](https://www.onetrust.com)
- [TRUSTe Privacy Assessment](https://www.truste.com)
