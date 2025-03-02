/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/shophub',
  assetPrefix: '/shophub/',
  trailingSlash: true,
};

module.exports = nextConfig; 