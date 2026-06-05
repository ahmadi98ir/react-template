const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: [
    'better-auth',
    '@better-auth/kysely-adapter',
    'kysely',
    'drizzle-orm',
    'postgres',
  ],
  experimental: {
    cacheComponents: true,
  },
  webpack: (config) => {
    // Stub out @better-auth/kysely-adapter — it tries to import
    // DEFAULT_MIGRATION_TABLE which is not a public export of kysely.
    // We use the Drizzle adapter so the Kysely adapter is never called.
    config.resolve.alias['@better-auth/kysely-adapter'] =
      path.resolve(__dirname, 'lib/kysely-adapter-stub.js');
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
