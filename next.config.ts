import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Reimagine' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Reimagine/' : '',
};

export default nextConfig;
