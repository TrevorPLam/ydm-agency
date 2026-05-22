import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'

const exporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
})
