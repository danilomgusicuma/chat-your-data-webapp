/** @type {import('next').NextConfig} */

nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gw.alipayobjects.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
