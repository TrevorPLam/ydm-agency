---
name: data-protection-compliance
description: Comprehensive data protection compliance guide covering GDPR, CCPA, data subject rights, consent management, breach notification, cross-border transfers, and regulatory compliance frameworks for 2026
---

# Data Protection Compliance Guide

This skill provides comprehensive guidance for achieving data protection compliance with GDPR, CCPA, and other global privacy regulations, covering data subject rights, consent management, breach notification, and regulatory frameworks for 2026.

## GDPR Overview

### What is GDPR?

The General Data Protection Regulation (GDPR) is the EU's overarching data privacy law that governs how businesses collect, process, store, and share the personal data of EU residents. It applies to any company that processes data from EU residents, regardless of where the company is located.

### Seven Core Principles

1. **Lawfulness, fairness, transparency**: Process data lawfully, fairly, and transparently
2. **Purpose limitation**: Collect data for specified, explicit, and legitimate purposes
3. **Data minimization**: Collect only data adequate, relevant, and limited to what's necessary
4. **Accuracy**: Keep data accurate and up to date
5. **Storage limitation**: Store data no longer than necessary
6. **Integrity and confidentiality**: Ensure security of processing
7. **Accountability**: Be responsible for compliance and able to demonstrate it

### Legal Bases for Processing

```typescript
enum LegalBasis {
  CONSENT = 'consent',
  CONTRACT = 'contract',
  LEGAL_OBLIGATION = 'legal_obligation',
  VITAL_INTERESTS = 'vital_interests',
  PUBLIC_TASK = 'public_task',
  LEGITIMATE_INTERESTS = 'legitimate_interests',
}

const determineLegalBasis = (
  processingPurpose: string
): LegalBasis => {
  // Assess the most appropriate legal basis
  if (requiresExplicitConsent(processingPurpose)) {
    return LegalBasis.CONSENT;
  }
  
  if (requiredForContract(processingPurpose)) {
    return LegalBasis.CONTRACT;
  }
  
  if (requiredByLaw(processingPurpose)) {
    return LegalBasis.LEGAL_OBLIGATION;
  }
  
  // Default to legitimate interests with assessment
  return LegalBasis.LEGITIMATE_INTERESTS;
};
```

## CCPA Overview

### What is CCPA?

The California Consumer Privacy Act (CCPA) grants California residents control over their personal information. The California Privacy Rights Act (CPRA) strengthened CCPA requirements and created the California Privacy Protection Agency (CalPrivacy).

### Who Does CCPA Apply To?

CCPA applies only to for-profit businesses that meet specific thresholds:
- Annual gross revenue over $25 million
- Buying/selling personal information of 100,000+ California residents
- Deriving 50%+ of annual revenue from selling personal information

### Key Differences: GDPR vs CCPA

| Aspect | GDPR | CCPA |
|--------|------|------|
| Scope | Any business processing EU resident data | Businesses meeting revenue/data thresholds |
| Legal Basis | Six legal bases required | Opt-out model for data sales |
| Rights | Access, rectification, erasure, portability, objection | Access, deletion, opt-out, non-discrimination |
| Data Sales | Requires legal basis | Opt-out required |
| Sensitive Data | Special category data | Expanded definition in CPRA |

## Data Subject Rights

### Right to Access (DSAR)

```typescript
const handleDataAccessRequest = async (
  userId: string,
  request: DataAccessRequest
): Promise<DataAccessResponse> => {
  // Verify identity
  const verified = await verifyIdentity(userId, request.verification);
  if (!verified) {
    throw new Error('Identity verification failed');
  }
  
  // Collect all personal data
  const personalData = await collectAllPersonalData(userId);
  
  // Include data sources and purposes
  const sources = await getDataSources(userId);
  const purposes = await getDataPurposes(userId);
  
  // Include third parties data shared with
  const thirdParties = await getThirdPartySharing(userId);
  
  // Generate response
  const response = {
    userId,
    personalData,
    sources,
    purposes,
    thirdParties,
    retentionPeriods: await getRetentionPeriods(userId),
    timestamp: Date.now(),
  };
  
  // Log request
  await logDSAR({
    userId,
    type: 'access',
    timestamp: Date.now(),
  });
  
  return response;
};
```

### Right to Deletion (Right to be Forgotten)

```typescript
const handleDeletionRequest = async (
  userId: string,
  request: DeletionRequest
): Promise<DeletionResponse> => {
  // Verify identity
  const verified = await verifyIdentity(userId, request.verification);
  if (!verified) {
    throw new Error('Identity verification failed');
  }
  
  // Check for legal hold or legitimate interest
  const canDelete = await checkDeletionEligibility(userId);
  if (!canDelete) {
    return {
      success: false,
      reason: 'Data required for legal obligation or legitimate interest',
    };
  }
  
  // Delete from all systems
  const systems = await getDataSystems(userId);
  const deletionResults = await Promise.all(
    systems.map(async (system) => {
      return await deleteFromSystem(system, userId);
    })
  );
  
  // Log deletion
  await logDeletion({
    userId,
    systems,
    timestamp: Date.now(),
  });
  
  return {
    success: true,
    deletedSystems: systems,
    timestamp: Date.now(),
  };
};
```

### Right to Portability

```typescript
const handlePortabilityRequest = async (
  userId: string,
  request: PortabilityRequest
): Promise<PortabilityResponse> => {
  // Verify identity
  const verified = await verifyIdentity(userId, request.verification);
  if (!verified) {
    throw new Error('Identity verification failed');
  }
  
  // Collect data in machine-readable format
  const data = await collectAllPersonalData(userId);
  
  // Convert to requested format
  let formattedData;
  switch (request.format) {
    case 'json':
      formattedData = JSON.stringify(data, null, 2);
      break;
    case 'csv':
      formattedData = convertToCSV(data);
      break;
    case 'xml':
      formattedData = convertToXML(data);
      break;
    default:
      formattedData = JSON.stringify(data, null, 2);
  }
  
  // Generate secure download link
  const downloadLink = await generateSecureDownload({
    data: formattedData,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  
  return {
    downloadLink,
    format: request.format,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
};
```

## Consent Management

### Granular Consent

```typescript
interface ConsentPurpose {
  id: string;
  name: string;
  description: string;
  legalBasis: string;
  dataCategories: string[];
  thirdPartySharing: boolean;
  retentionPeriod: number;
}

const manageConsent = async (
  userId: string,
  consent: ConsentRecord
): Promise<ConsentResult> => {
  // Validate consent record
  const validated = validateConsent(consent);
  
  // Store consent
  await db.consents.insert({
    userId,
    purposes: validated.purposes,
    grantedAt: Date.now(),
    version: consent.version,
    ipAddress: consent.ipAddress,
    userAgent: consent.userAgent,
  });
  
  // Apply consent to data processing
  await applyConsentToProcessing(userId, validated.purposes);
  
  // Generate consent receipt
  const receipt = generateConsentReceipt({
    userId,
    purposes: validated.purposes,
    timestamp: Date.now(),
  });
  
  return {
    success: true,
    receipt,
  };
};
```

### Consent Withdrawal

```typescript
const withdrawConsent = async (
  userId: string,
  purposeId: string
): Promise<WithdrawalResult> => {
  // Update consent record
  await db.consents.update(
    { userId, purposeId },
    { withdrawnAt: Date.now() }
  );
  
  // Stop processing for that purpose
  await stopProcessing(userId, purposeId);
  
  // Delete or anonymize data if required
  const purpose = await getPurpose(purposeId);
  if (purpose.deleteOnWithdrawal) {
    await deleteDataForPurpose(userId, purposeId);
  }
  
  return {
    success: true,
    purposeId,
    withdrawnAt: Date.now(),
  };
};
```

## Data Breach Notification

### GDPR Breach Notification

```typescript
const handleDataBreach = async (
  breach: DataBreach
): Promise<BreachResponse> => {
  // Assess severity
  const severity = assessBreachSeverity(breach);
  
  // Notify supervisory authority within 72 hours if high risk
  if (severity === 'high') {
    await notifySupervisoryAuthority({
      breach,
      severity,
      affectedCount: breach.affectedIndividuals.length,
      mitigation: breach.mitigationMeasures,
    });
  }
  
  // Notify affected individuals if high risk
  if (severity === 'high') {
    await notifyAffectedIndividuals(breach);
  }
  
  // Document breach
  await documentBreach({
    breach,
    severity,
    notificationTimestamp: Date.now(),
  });
  
  return {
    breachId: breach.id,
    severity,
    notificationsSent: severity === 'high',
    timestamp: Date.now(),
  };
};
```

### CCPA Breach Notification

```typescript
const handleCCPABreach = async (
  breach: DataBreach
): Promise<BreachResponse> => {
  // California requires notification for breaches involving
  // personal information that is unencrypted, unredacted
  
  const requiresNotification = assessCCPANotification(breach);
  
  if (requiresNotification) {
    // Notify affected California residents
    await notifyCaliforniaResidents(breach);
    
    // Notify California Attorney General if > 500 residents
    if (breach.affectedCaliforniaResidents > 500) {
      await notifyCaliforniaAG(breach);
    }
  }
  
  return {
    breachId: breach.id,
    requiresNotification,
    timestamp: Date.now(),
  };
};
```

## Cross-Border Data Transfers

### GDPR Cross-Border Transfers

```typescript
const assessCrossBorderTransfer = async (
  transfer: DataTransfer
): Promise<TransferAssessment> => {
  // Check if destination has adequate protection
  const adequateCountry = isAdequateCountry(transfer.destinationCountry);
  
  if (adequateCountry) {
    return {
      allowed: true,
      reason: 'Destination country has adequate protection',
    };
  }
  
  // Check for appropriate safeguards
  const safeguards = await checkSafeguards(transfer);
  
  if (safeguards.valid) {
    return {
      allowed: true,
      reason: 'Appropriate safeguards in place',
      safeguards: safeguards.type,
    };
  }
  
  // Check for binding corporate rules
  const bcr = await checkBCR(transfer);
  
  if (bcr.valid) {
    return {
      allowed: true,
      reason: 'Binding corporate rules apply',
    };
  }
  
  // Check for derogations
  const derogation = await checkDerogation(transfer);
  
  if (derogation.valid) {
    return {
      allowed: true,
      reason: 'Derogation applies',
      derogation: derogation.type,
    };
  }
  
  return {
    allowed: false,
    reason: 'No adequate protection or safeguards',
  };
};
```

### Standard Contractual Clauses (SCCs)

```typescript
const implementSCCs = async (
  transfer: DataTransfer
): Promise<SCCImplementation> => {
  // Obtain SCCs from European Commission
  const sccTemplate = await getSCCTemplate(transfer.dataCategories);
  
  // Customize SCCs for specific transfer
  const customizedSCC = customizeSCC({
    template: sccTemplate,
    exporter: transfer.exporter,
    importer: transfer.importer,
    dataCategories: transfer.dataCategories,
    processingActivities: transfer.activities,
  });
  
  // Sign SCCs
  const signed = await signDocument(customizedSCC);
  
  // Store SCC record
  await db.sccs.insert({
    transferId: transfer.id,
    scc: signed,
    signedAt: Date.now(),
    validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
  });
  
  return {
    sccId: signed.id,
    validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000,
  };
};
```

## Data Protection Officer (DPO)

### DPO Requirements

A DPO is required when:
- Processing is carried out by a public authority
- Core activities require regular and systematic monitoring of data subjects on a large scale
- Core activities involve large-scale processing of special categories of data

```typescript
const appointDPO = async (
  organization: Organization
): Promise<DPOAppointment> => {
  // Check if DPO is required
  const dpoRequired = await checkDPORequirement(organization);
  
  if (!dpoRequired) {
    return {
      required: false,
      reason: 'DPO not required based on processing activities',
    };
  }
  
  // Appoint DPO
  const dpo = await db.dpos.insert({
    organizationId: organization.id,
    name: organization.dpoName,
    email: organization.dpoEmail,
    contactDetails: organization.dpoContact,
    appointedAt: Date.now(),
  });
  
  // Notify supervisory authority
  await notifySupervisoryAuthority({
    organization: organization.id,
    dpo,
    appointment: 'appointed',
  });
  
  return {
    required: true,
    dpo,
    appointedAt: Date.now(),
  };
};
```

## Records of Processing

### ROPA (Records of Processing Activities)

```typescript
const maintainROPA = async (
  organization: Organization
): Promise<ROPARecord> => {
  // Document all processing activities
  const processingActivities = await getProcessingActivities(organization);
  
  const ropa = {
    organization: organization.id,
    controller: organization.name,
    dpo: organization.dpo,
    purposes: processingActivities.map(activity => ({
      name: activity.name,
      description: activity.description,
      legalBasis: activity.legalBasis,
      dataCategories: activity.dataCategories,
      dataSubjects: activity.dataSubjects,
      retentionPeriod: activity.retentionPeriod,
      securityMeasures: activity.securityMeasures,
      thirdPartyTransfers: activity.thirdPartyTransfers,
    })),
    lastUpdated: Date.now(),
  };
  
  // Store ROPA
  await db.ropa.upsert({
    organizationId: organization.id,
    ropa,
  });
  
  return ropa;
};
```

## Compliance Tools

### CMP (Consent Management Platform)

```typescript
const configureCMP = async (
  organization: Organization
): Promise<CMPConfiguration> => {
  const config = {
    organization: organization.id,
    consentPurposes: await getConsentPurposes(organization),
    defaultBehavior: 'opt-in', // GDPR requires opt-in
    granularConsent: true,
    withdrawalMethod: 'easy',
    consentRecording: true,
    privacyPolicyLink: organization.privacyPolicyUrl,
    cookieConsent: true,
    geoDetection: true, // Apply correct regulation based on location
  };
  
  // Deploy CMP
  await deployCMP(config);
  
  return config;
};
```

### Data Mapping

```typescript
const performDataMapping = async (
  organization: Organization
): Promise<DataMap> => {
  // Identify all data flows
  const dataFlows = await identifyDataFlows(organization);
  
  // Map data to purposes
  const dataPurposeMap = await mapDataToPurposes(dataFlows);
  
  // Identify data sources
  const dataSources = await identifyDataSources(organization);
  
  // Identify third parties
  const thirdParties = await identifyThirdParties(organization);
  
  return {
    organization: organization.id,
    dataFlows,
    dataPurposeMap,
    dataSources,
    thirdParties,
    lastUpdated: Date.now(),
  };
};
```

## Best Practices

### Do

- Conduct privacy impact assessments for high-risk processing
- Implement granular consent management
- Maintain records of processing activities
- Appoint DPO when required
- Implement data breach response procedures
- Use CMPs for consent management
- Conduct regular compliance audits
- Stay updated on regulatory changes
- Train staff on data protection
- Document all compliance measures

### Don't

- Ignore data subject rights requests
- Process data without legal basis
- Forget about cross-border transfer requirements
- Skip breach notification
- Ignore consent withdrawal
- Forget about data retention limits
- Skip documentation
- Ignore regulatory updates
- Forget about staff training
- Assume one size fits all for global compliance

## Resources

### Documentation

- [GDPR Official Text](https://gdpr-info.eu/)
- [CCPA Official Text](https://oag.ca.gov/privacy/ccpa)
- [Usercentrics GDPR vs CCPA](https://usercentrics.com/knowledge-hub/gdpr-vs-ccpa-compliance/)
- [IAPP Data Protection](https://iapp.org/)

### Tools

- [OneTrust](https://www.onetrust.com)
- [Usercentrics](https://usercentrics.com)
- [TrustArc](https://www.trustarc.com)
- [Ketch](https://www.ketch.com)
- [Osano](https://www.osano.com)
