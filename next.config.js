/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ahmadi98.ir'],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  },
  // Disable static optimization for pages that use client-side features
  unstable_runtimeJS: true,
  // Enable dynamic rendering for all pages
  unstable_includeFiles: ['node_modules/**'],
  // Disable static page generation
  unstable_disableStaticGeneration: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable static generation for all pages
  staticPageGenerationTimeout: 60,
  // Handle self-signed certificates
  httpAgentOptions: {
    rejectUnauthorized: false
  }
}

module.exports = nextConfig