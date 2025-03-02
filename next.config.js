/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: '/shophub',
  assetPrefix: '/shophub/',
  trailingSlash: true,
};

module.exports = nextConfig; 