import { registerOTel } from '@vercel/otel';
import { AccessLogSpanProcessor } from './access-log-span-processor';

process.env.OTEL_LOG_LEVEL = 'debug';

export function register() {
  registerOTel({
    serviceName: 'next-app',
    spanProcessors: ['auto', new AccessLogSpanProcessor()],
    traceExporter: 'auto',
  });
}

// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     await import('./instrumentation.node');
//   }
// }
