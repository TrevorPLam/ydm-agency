---
name: ai-command-center-ui
description: Comprehensive guide for building AI command center UIs covering dashboard design patterns, model management interfaces, real-time monitoring displays, chat interfaces, and responsive design for 2026
---

# AI Command Center UI Guide

This skill provides comprehensive guidance for building user interfaces for managing and monitoring AI models, agents, and workflows, following 2026 best practices for dashboard design and real-time monitoring.

## Key Components of AI Dashboards

### Core Architecture

- **Data Integration**: Native connectors to vector databases, model APIs, and telemetry systems
- **Semantic Layer**: Curated metrics, dimensions, and joins for consistent data
- **NL-to-SQL Planner**: LLM that reads questions and generates queries
- **Visualization Layer**: Auto-picked chart types with interactivity
- **Narrative Engine**: Writes summaries and suggests next actions
- **Automation**: Scheduled refreshes, anomaly alerts, routing
- **Personalization**: Role-aware views and learned shortcuts

## Dashboard Design Patterns

### Real-Time Monitoring Display

```typescript
interface MonitoringDashboard {
  modelMetrics: {
    latency: number;
    throughput: number;
    errorRate: number;
    tokenUsage: number;
  };
  agentStatus: {
    activeAgents: number;
    queuedTasks: number;
    completedTasks: number;
  };
  systemHealth: {
    cpu: number;
    memory: number;
    gpu: number;
  };
}
```

### Model Management Interface

```typescript
interface ModelConfig {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'local';
  version: string;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
  };
  status: 'active' | 'inactive' | 'deprecated';
  deployment: {
    endpoint: string;
    rateLimit: number;
    costPerToken: number;
  };
}
```

### Chat Interface Components

```typescript
interface ChatInterface {
  messages: Message[];
  inputArea: {
    placeholder: string;
    maxLength: number;
    supportsFileUpload: boolean;
  };
  responseArea: {
    streaming: boolean;
    showReasoning: boolean;
    showSources: boolean;
  };
  actions: {
    regenerate: boolean;
    copy: boolean;
    share: boolean;
  };
}
```

## Layout Patterns

### Command Center Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo, Search, User Profile, Notifications      │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │         Main Content Area               │
│              │                                          │
│  - Models    │  ┌────────────────────────────────────┐  │
│  - Agents    │  │  Real-time Metrics Cards           │  │
│  - Workflows │  └────────────────────────────────────┘  │
│  - Logs      │                                          │
│  - Settings  │  ┌────────────────────────────────────┐  │
│              │  │  Active Agent Status Table         │  │
│              │  └────────────────────────────────────┘  │
│              │                                          │
│              │  ┌────────────────────────────────────┐  │
│              │  │  Recent Activity Feed              │  │
│              │  └────────────────────────────────────┘  │
└──────────────┴──────────────────────────────────────────┘
```

### Model Comparison View

```typescript
interface ModelComparison {
  models: ModelConfig[];
  metrics: {
    accuracy: number;
    latency: number;
    cost: number;
    throughput: number;
  };
  visualization: 'bar' | 'line' | 'radar';
  timeRange: '1h' | '24h' | '7d' | '30d';
}
```

## Real-Time Updates

### WebSocket Integration

```typescript
const useRealTimeMetrics = (modelId: string) => {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  
  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/metrics/${modelId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };
    
    return () => ws.close();
  }, [modelId]);
  
  return metrics;
};
```

### Streaming Response Display

```typescript
interface StreamingResponse {
  content: string;
  reasoning?: string;
  sources?: Source[];
  isComplete: boolean;
}

const StreamingChat = () => {
  const [response, setResponse] = useState<StreamingResponse>({
    content: '',
    isComplete: false,
  });
  
  const handleStream = async (prompt: string) => {
    const stream = await streamResponse(prompt);
    
    for await (const chunk of stream) {
      setResponse(prev => ({
        ...prev,
        content: prev.content + chunk.content,
        reasoning: chunk.reasoning,
        sources: chunk.sources,
      }));
    }
    
    setResponse(prev => ({ ...prev, isComplete: true }));
  };
  
  return <ChatInterface response={response} />;
};
```

## Data Visualization

### Metric Cards

```typescript
const MetricCard = ({ title, value, trend, unit }: MetricCardProps) => (
  <div className="metric-card">
    <h3>{title}</h3>
    <div className="value">
      {value} <span className="unit">{unit}</span>
    </div>
    <div className={`trend ${trend > 0 ? 'up' : 'down'}`}>
      {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
    </div>
  </div>
);
```

### Agent Status Table

```typescript
const AgentStatusTable = ({ agents }: { agents: Agent[] }) => (
  <table>
    <thead>
      <tr>
        <th>Agent ID</th>
        <th>Status</th>
        <th>Tasks Completed</th>
        <th>Average Latency</th>
        <th>Last Activity</th>
      </tr>
    </thead>
    <tbody>
      {agents.map(agent => (
        <tr key={agent.id}>
          <td>{agent.id}</td>
          <td>
            <StatusBadge status={agent.status} />
          </td>
          <td>{agent.completedTasks}</td>
          <td>{agent.avgLatency}ms</td>
          <td>{formatTime(agent.lastActivity)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
```

### Performance Charts

```typescript
const PerformanceChart = ({ data }: { data: TimeSeriesData[] }) => (
  <LineChart data={data}>
    <XAxis dataKey="timestamp" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="latency" stroke="#8884d8" />
    <Line type="monotone" dataKey="throughput" stroke="#82ca9d" />
  </LineChart>
);
```

## Interactive Features

### Natural Language Query

```typescript
const NLQueryInterface = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  
  const handleQuery = async () => {
    const response = await executeNLQuery(query);
    setResult(response);
  };
  
  return (
    <div className="nl-query">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about your AI metrics..."
      />
      <button onClick={handleQuery}>Query</button>
      {result && <QueryResultDisplay result={result} />}
    </div>
  );
};
```

### Model Configuration Editor

```typescript
const ModelConfigEditor = ({ model, onSave }: ModelConfigEditorProps) => {
  const [config, setConfig] = useState(model);
  
  return (
    <form onSubmit={() => onSave(config)}>
      <FormField
        label="Temperature"
        type="range"
        min={0}
        max={2}
        step={0.1}
        value={config.parameters.temperature}
        onChange={(value) => setConfig({
          ...config,
          parameters: { ...config.parameters, temperature: value }
        })}
      />
      <FormField
        label="Max Tokens"
        type="number"
        value={config.parameters.maxTokens}
        onChange={(value) => setConfig({
          ...config,
          parameters: { ...config.parameters, maxTokens: value }
        })}
      />
      <button type="submit">Save Configuration</button>
    </form>
  );
};
```

## Responsive Design

### Mobile Layout

```typescript
const ResponsiveDashboard = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <MobileLayout>
        <BottomNavigation />
        <SwipeableCards />
        <CompactMetrics />
      </MobileLayout>
    );
  }
  
  return (
    <DesktopLayout>
      <Sidebar />
      <MainContent />
    </DesktopLayout>
  );
};
```

### Touch-Friendly Interactions

```typescript
const TouchFriendlyControls = () => (
  <div className="touch-controls">
    <button className="large-touch-target" onClick={handleAction}>
      <Icon name="play" />
    </button>
    <button className="large-touch-target" onClick={handleStop}>
      <Icon name="stop" />
    </button>
  </div>
);
```

## Accessibility

### Keyboard Navigation

```typescript
const KeyboardNavigableDashboard = () => (
  <div role="main" tabIndex={0}>
    <h1>AI Command Center</h1>
    <nav aria-label="Main navigation">
      <button onClick={navigateToModels}>Models</button>
      <button onClick={navigateToAgents}>Agents</button>
    </nav>
  </div>
);
```

### Screen Reader Support

```typescript
const AccessibleMetricCard = ({ title, value, trend }: MetricCardProps) => (
  <div role="region" aria-label={`${title} metric`}>
    <h2>{title}</h2>
    <p aria-live="polite">
      Current value: {value}. Trend: {trend > 0 ? 'increasing' : 'decreasing'} by {Math.abs(trend)} percent.
    </p>
  </div>
);
```

## Performance Optimization

### Virtual Scrolling

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedAgentList = ({ agents }: { agents: Agent[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: agents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(item => (
          <AgentRow key={item.key} agent={agents[item.index]} />
        ))}
      </div>
    </div>
  );
};
```

### Lazy Loading

```typescript
const LazyChart = ({ metric }: { metric: string }) => {
  const ChartComponent = React.lazy(() => import('./Chart'));
  
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <ChartComponent metric={metric} />
    </React.Suspense>
  );
};
```

## Error Handling

### Error Boundaries

```typescript
class DashboardErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Retry Logic

```typescript
const useRetryableFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWithRetry = async (retries = 3) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (retries > 0) {
        setTimeout(() => fetchWithRetry(retries - 1), 1000);
      } else {
        setError(err);
      }
    }
  };
  
  return { data, error, fetchWithRetry };
};
```

## Best Practices

### Do

- Use real-time updates for critical metrics
- Implement proper error handling and retry logic
- Design for mobile and desktop
- Support keyboard navigation
- Provide clear visual feedback
- Use consistent color schemes
- Implement proper loading states

### Don't

- Overload the dashboard with too many metrics
- Use fixed timeouts instead of proper async handling
- Ignore accessibility requirements
- Create cluttered layouts
- Use inconsistent terminology
- Skip error states
- Ignore performance optimization

## Resources

### Design Systems

- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)
- [Headless UI](https://headlessui.com)

### Charting Libraries

- [Recharts](https://recharts.org)
- [Chart.js](https://www.chartjs.org)
- [D3.js](https://d3js.org)

### Real-Time Libraries

- [Socket.io](https://socket.io)
- [Pusher](https://pusher.com)
- [Ably](https://ably.com)
