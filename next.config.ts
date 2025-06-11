import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@opentelemetry/sdk-node'],
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
