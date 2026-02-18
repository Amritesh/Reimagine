import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Reimagine' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Reimagine/' : '',
};

export default nextConfig;
