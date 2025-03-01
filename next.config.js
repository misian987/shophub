/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only apply basePath and assetPrefix in production
  basePath: process.env.NODE_ENV === 'production' ? '/shophub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/shophub/' : '',
};

module.exports = nextConfig; 