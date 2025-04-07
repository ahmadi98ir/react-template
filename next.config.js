/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ahmadi98.ir'],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 60,
  // Disable static optimization for pages that use client-side features
  unstable_runtimeJS: false,
  // Enable dynamic rendering for all pages
  unstable_includeFiles: ['node_modules/**'],
  // Disable static page generation
  unstable_disableStaticGeneration: false,
};

module.exports = nextConfig;