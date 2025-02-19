/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'cool.ahmadi98.ir'],
  },
  // Disable automatic static optimization
  experimental: {
    // This will disable static page generation
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig