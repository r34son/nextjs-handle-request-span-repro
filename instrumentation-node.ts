import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
  NodeTracerProvider,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// from https://github.com/vercel/next.js/commit/2451af931cb120c940396630fc4493e230f65e88#diff-4207142439be777189ec4d699d3017bac5c970a2e58324eca5860c219770b524
export function register() {
  // Next.js expects you to use to register TraceProvider. It won't work if you use NodeSDK.
  // We use registered provider to create traces inside of Next.js internals.
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: 'next-app',
    }),
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({})));

  // Make sure to register you provider
  provider.register();
}
