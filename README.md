# Next.js OpenTelemetry Tracing Reproduction

This project demonstrates OpenTelemetry tracing behavior in Next.js applications, specifically examining:

## Current Observations

### 1. Separate Traces for Middleware and Rendering

- Middleware executions and page renders appear as distinct traces
- Example scenario showing trace separation

### 2. Runtime Differences in Tracing

- Node.js middleware shows full tracing
- Edge middleware has no tracing capability

## Purpose

This reproduction helps:

- Document default Next.js tracing behavior
- Identify tracing boundaries between components
- Explore context propagation challenges

## Running the Example

1. Start Jaeger: `pnpm jaeger`
2. Run app in second terminal: `pnpm dev`
3. View traces at http://localhost:16686
