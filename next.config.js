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
  // Remove invalid properties and handle static generation properly
  env: {
    // Add other environment variables here if needed
  }
};

module.exports = nextConfig;