import { NextResponse } from 'next/server';
import { trace } from '@opentelemetry/api';

export async function middleware() {
  const tracer = trace.getTracer('middleware');
  console.log('middleware invoke');

  return tracer.startActiveSpan('logic', async (span) => {
    try {
      const fetchSpan = tracer.startSpan('fetch-ya.ru');
      try {
        const response = await fetch('https://ya.ru');
        fetchSpan.setAttribute('http.status_code', response.status);
        fetchSpan.setAttribute('http.url', 'https://ya.ru');
      } finally {
        fetchSpan.end();
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('sleep end');

      return NextResponse.next();
    } finally {
      span.end();
    }
  });
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
