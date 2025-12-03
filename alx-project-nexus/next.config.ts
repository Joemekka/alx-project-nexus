import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.imgur.com',
      't4.ftcdn.net',
      'media.istockphoto.com',
      'www.pngkey.com',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'www.pngkey.com' },
    ],
  },
  turbopack: {}, // silences the error
};

export default nextConfig;
