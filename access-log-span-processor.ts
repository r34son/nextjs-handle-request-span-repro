import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-base';

/** @link https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry#httpmethod-nextroute */
const ROOT_SPAN_TYPE = 'BaseServer.handleRequest';

export class AccessLogSpanProcessor implements SpanProcessor {
  onStart(span: Span): void {
    if (span.attributes['next.span_type'] === ROOT_SPAN_TYPE) {
      console.log(
        `Incoming request started: ${span.attributes['next.span_name']}`
      );
      console.log('span', span);
    }
  }
  onEnd(span: ReadableSpan): void {
    if (span.attributes['next.span_type'] === ROOT_SPAN_TYPE) {
      console.log(
        `Incoming request finished: ${span.attributes['next.span_name']}`
      );
      console.log('span', span);
    }
  }
  async forceFlush(): Promise<void> {}
  async shutdown(): Promise<void> {}
}
