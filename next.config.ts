import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos',
      'cms.cobasi.com.br',
      'cdn-cookieyes.com',
      'www.cobasi.com.br',
      'cobasi.vteximg.com.br'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
