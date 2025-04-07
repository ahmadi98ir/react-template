/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ahmadi98.ir', 'cool.ahmadi98.ir'],
    unoptimized: true
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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
  }
};

module.exports = nextConfig;