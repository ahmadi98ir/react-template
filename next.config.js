/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-quill$': 'react-quill/dist/react-quill.js',
    };
    return config;
  },
}

module.exports = nextConfig;