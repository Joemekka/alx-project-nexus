import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 't4.ftcdn.net', 'media.istockphoto.com'],
  }, // allow images from Imgur
  webpack(config) {
    // Add SVGR support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
