import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Resource } from '@opentelemetry/resources'

const provider = new NodeTracerProvider({
  resource: new Resource({
    'service.name': 'agency-platform',
  }),
})
