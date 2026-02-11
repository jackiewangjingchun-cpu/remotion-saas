/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/remotion/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
