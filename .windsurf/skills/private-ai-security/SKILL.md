---
name: private-ai-security
description: Comprehensive private AI security guide covering AI agent sandboxing, network isolation, prompt injection protection, supply chain defense, and secure AI deployment for 2026
---

# Private AI Security Guide

This skill provides comprehensive guidance for securing private AI deployments, covering agent sandboxing, network isolation, prompt injection protection, and secure AI workflows for 2026.

## AI Agent Sandboxing

### Why Sandboxing is Non-Negotiable

AI agents execute shell commands, call APIs, read/write filesystems, and spawn subprocesses without human approval at every step. This creates a fundamentally different threat model from traditional applications.

### Four Isolation Layers

#### 1. Network Egress Control

```typescript
interface NetworkPolicy {
  allowedEndpoints: string[];
  allowedPorts: number[];
  proxyConfig: ProxyConfig;
  alertOnViolation: boolean;
}

const enforceNetworkPolicy = async (
  agent: AIAgent,
  policy: NetworkPolicy
) => {
  // Define exactly which external APIs the agent can call
  for (const endpoint of policy.allowedEndpoints) {
    await agent.allowEndpoint(endpoint);
  }
  
  // Enforce via egress proxy or network policy
  const proxy = createEgressProxy({
    allowlist: policy.allowedEndpoints,
    ports: policy.allowedPorts,
  });
  
  // Alert on all other outbound traffic
  agent.onNetworkRequest((request) => {
    if (!policy.allowedEndpoints.includes(request.url)) {
      alert(`Unexpected network request: ${request.url}`);
      proxy.blockRequest(request);
    }
  });
  
  return proxy;
};
```

#### 2. Filesystem Boundaries

```typescript
interface FilesystemPolicy {
  writeProtected: string[];
  readOnly: string[];
  allowedPaths: string[];
}

const enforceFilesystemPolicy = (
  agent: AIAgent,
  policy: FilesystemPolicy
) => {
  // Protect configuration files that execute automatically
  const protectedPaths = [
    '.git/hooks',
    '.mcp/config',
    '.config/antigravity',
    'package.json',
  ];
  
  for (const path of protectedPaths) {
    agent.protectPath(path, { write: false, read: true });
  }
  
  // Prevent execution of modified files
  agent.onFileAccess((path, mode) => {
    if (policy.writeProtected.includes(path) && mode === 'write') {
      throw new SecurityError(`Write attempt on protected path: ${path}`);
    }
    
    // Verify integrity before execution
    if (policy.writeProtected.includes(path)) {
      const integrity = verifyFileIntegrity(path);
      if (!integrity.valid) {
        throw new SecurityError(`File integrity check failed: ${path}`);
      }
    }
  });
};
```

#### 3. Process Isolation

```typescript
const isolateProcess = async (agent: AIAgent): Promise<Sandbox> => {
  // Use microVM for strongest isolation
  const sandbox = await createMicroVM({
    type: 'firecracker',
    resourceLimits: {
      cpu: '2',
      memory: '4GB',
      disk: '10GB',
    },
    network: {
      isolated: true,
      allowedIPs: ['10.0.0.0/8'],
    },
  });
  
  // Ensure subprocesses remain in sandbox
  sandbox.onSubprocessSpawn((process) => {
    if (!sandbox.contains(process)) {
      terminateProcess(process);
      alert('Subprocess escape attempt detected');
    }
  });
  
  return sandbox;
};
```

#### 4. Secrets Scoping

```typescript
const scopeSecrets = async (
  agent: AIAgent,
  task: Task
) => {
  // Inject only required secrets per task
  const requiredSecrets = analyzeTaskRequirements(task);
  
  const secrets = await secretsManager.getSecrets(
    requiredSecrets.map(s => s.name)
  );
  
  // Provide secrets at runtime, revoke after completion
  agent.provideSecrets(secrets);
  
  agent.onTaskComplete(() => {
    secrets.revoke();
  });
  
  // Never inherit full host environment
  agent.clearEnvironment();
};
```

## Isolation Technologies

### Firecracker MicroVMs

**Strongest isolation** with dedicated kernels per workload.

```typescript
const createFirecrackerSandbox = async () => {
  const vm = await FirecrackerVM.create({
    kernelImagePath: '/path/to/vmlinux.bin',
    kernelArgs: 'console=ttyS0 reboot=k panic=1 pci=off',
    rootfsPath: '/path/to/rootfs.ext4',
    machineConfig: {
      vcpuCount: 2,
      memSizeMib: 512,
    },
  });
  
  return vm;
};
```

### gVisor

**Syscall-level isolation** without full hypervisor overhead.

```typescript
const createGVisorSandbox = async () => {
  const sandbox = await gVisor.create({
    runscConfig: {
      runtime: 'runsc',
      runtimeRoot: '/var/run/runsc',
    },
    network: {
      mode: 'sandbox',
    },
  });
  
  return sandbox;
};
```

### Container Isolation

**Use only for trusted code** - containers share the host kernel.

```typescript
const createContainerSandbox = async () => {
  const container = await docker.createContainer({
    image: 'python:3.11-slim',
    securityOpt: ['no-new-privileges'],
    readonlyRootfs: true,
    dropCapabilities: ['ALL'],
    networkMode: 'none',
  });
  
  return container;
};
```

## Resource Limits

### CPU and Memory Limits

```typescript
const setResourceLimits = (sandbox: Sandbox) => {
  sandbox.setLimits({
    cpu: {
      quota: 100000, // 100ms per second
      period: 1000000, // 1 second
      shares: 1024,
    },
    memory: {
      limit: 4 * 1024 * 1024 * 1024, // 4GB
      reservation: 2 * 1024 * 1024 * 1024, // 2GB
      swap: 0, // No swap
    },
  });
};
```

### Disk Limits

```typescript
const setDiskLimits = (sandbox: Sandbox) => {
  sandbox.setDiskLimits({
    size: 10 * 1024 * 1024 * 1024, // 10GB
    inodes: 100000,
  });
};
```

## Prompt Injection Protection

### Input Validation

```typescript
const validatePrompt = (prompt: string): ValidationResult => {
  // Check for injection patterns
  const injectionPatterns = [
    /ignore previous instructions/i,
    /system:/i,
    /admin:/i,
    /override:/i,
    /execute:/i,
    /eval:/i,
  ];
  
  for (const pattern of injectionPatterns) {
    if (pattern.test(prompt)) {
      return {
        valid: false,
        reason: 'Potential prompt injection detected',
      };
    }
  }
  
  // Check length
  if (prompt.length > 10000) {
    return {
      valid: false,
      reason: 'Prompt too long',
    };
  }
  
  return { valid: true };
};
```

### Output Sanitization

```typescript
const sanitizeOutput = (output: string): string => {
  // Remove any code blocks that weren't requested
  if (!output.includes('```')) {
    return output;
  }
  
  // Validate code blocks
  const sanitized = output.replace(/```[\s\S]*?```/g, (match) => {
    // Check for dangerous operations
    const dangerous = [
      /exec\(/i,
      /eval\(/i,
      /system\(/i,
      /subprocess\./i,
      /os\.system/i,
    ];
    
    for (const pattern of dangerous) {
      if (pattern.test(match)) {
        return '[Code block removed due to security policy]';
      }
    }
    
    return match;
  });
  
  return sanitized;
};
```

## Supply Chain Defense

### MCP Tool Poisoning Prevention

```typescript
const validateMCPTool = async (tool: MCPTool): Promise<boolean> => {
  // Verify tool signature
  const signature = await getToolSignature(tool);
  const isValid = await verifySignature(signature, tool);
  
  if (!isValid) {
    throw new SecurityError('Tool signature verification failed');
  }
  
  // Scan for malicious code
  const scanResult = await scanForMalware(tool.code);
  if (!scanResult.clean) {
    throw new SecurityError('Malicious code detected in tool');
  }
  
  // Check against allowlist
  const allowedTools = await getToolAllowlist();
  if (!allowedTools.includes(tool.id)) {
    throw new SecurityError('Tool not in allowlist');
  }
  
  return true;
};
```

### Dependency Verification

```typescript
const verifyDependencies = async (packageJson: PackageJson) => {
  const dependencies = Object.keys(packageJson.dependencies);
  
  for (const dep of dependencies) {
    // Check against known vulnerable packages
    const vulnerabilities = await checkVulnerabilities(dep);
    if (vulnerabilities.length > 0) {
      throw new SecurityError(`Vulnerable dependency: ${dep}`);
    }
    
    // Verify package integrity
    const integrity = await verifyPackageIntegrity(dep);
    if (!integrity.valid) {
      throw new SecurityError(`Package integrity check failed: ${dep}`);
    }
  }
};
```

## Security Checklist

### Before Deployment

- [ ] Network egress controls configured
- [ ] Filesystem boundaries enforced
- [ ] Process isolation implemented
- [ ] Secrets scoped per task
- [ ] Resource limits set
- [ ] Prompt injection protection enabled
- [ ] Output sanitization configured
- [ ] Supply chain verification in place
- [ ] Monitoring and alerting configured
- [ ] Incident response procedures documented

### Runtime Monitoring

```typescript
const monitorAgent = (agent: AIAgent) => {
  // Monitor network requests
  agent.onNetworkRequest((request) => {
    logSecurityEvent({
      type: 'network_request',
      url: request.url,
      method: request.method,
      timestamp: Date.now(),
    });
  });
  
  // Monitor file access
  agent.onFileAccess((path, mode) => {
    logSecurityEvent({
      type: 'file_access',
      path,
      mode,
      timestamp: Date.now(),
    });
  });
  
  // Monitor subprocess spawns
  agent.onSubprocessSpawn((process) => {
    logSecurityEvent({
      type: 'subprocess_spawn',
      command: process.command,
      timestamp: Date.now(),
    });
  });
};
```

## Best Practices

### Do

- Use defense-in-depth with multiple isolation layers
- Implement kernel-level isolation for code execution
- Scope secrets per task, not per agent
- Monitor all agent activities
- Validate all inputs and outputs
- Verify tool signatures
- Scan dependencies for vulnerabilities
- Implement proper resource limits
- Have incident response procedures
- Regular security audits

### Don't

- Use standard containers for untrusted code
- Allow unrestricted network access
- Inherit full host environment
- Skip prompt injection protection
- Ignore subprocess isolation
- Allow filesystem write access to sensitive paths
- Skip supply chain verification
- Forget resource limits
- Disable monitoring
- Deploy without testing

## CVE Case Studies

### CVE-2025-59528 (Flowise AI)

**Vulnerability**: Subprocess injection via tool execution
**Impact**: CVSS 10.0
**Mitigation**: Use kernel-level isolation (Firecracker/gVisor)

### Google Antigravity Secure Mode Bypass

**Vulnerability**: Subprocess executed before security checks
**Impact**: Configuration injection
**Mitigation**: Kernel-level process isolation

### CVE-2025-59536 (Claude Code)

**Vulnerability**: Configuration injection
**Impact**: CVSS 8.7
**Mitigation**: Protect configuration directories

## Resources

### Documentation

- [Northflank AI Agent Sandboxing Guide](https://northflank.com/blog/how-to-sandbox-ai-agents)
- [BeyondScale Enterprise Security Guide](https://beyondscale.tech/blog/ai-agent-sandboxing-enterprise-security-guide)
- [OWASP Agentic AI Top 10](https://owasp.org/www-project-agentic-ai-top-10/)

### Tools

- [Firecracker](https://firecracker-microvm.github.io)
- [gVisor](https://gvisor.dev)
- [Kata Containers](https://katacontainers.io)
- [Docker Sandboxes](https://docs.docker.com/engine/security/sandbox/)
