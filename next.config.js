const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: [
    'better-auth',
    'kysely',
    'drizzle-orm',
    'postgres',
  ],
  // Exclude @better-auth/kysely-adapter from standalone output tracing —
  // we use the Drizzle adapter so the Kysely adapter files are never needed at runtime.
  outputFileTracingIgnores: [
    '**/node_modules/@better-auth/kysely-adapter/**',
  ],
  experimental: {
    cacheComponents: true,
  },
  webpack: (config) => {
    // Stub out both import paths for the kysely adapter.
    // @better-auth/kysely-adapter is NOT in serverExternalPackages so webpack
    // processes it via alias → empty stub instead of doing externals-tracing on it.
    const stub = path.resolve(__dirname, 'lib/kysely-adapter-stub.js');
    config.resolve.alias['better-auth/kysely-adapter'] = stub;
    config.resolve.alias['@better-auth/kysely-adapter'] = stub;
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
