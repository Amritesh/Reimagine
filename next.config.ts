import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // We'll let GitHub Actions handle the basePath via configure-pages if possible,
  // or keep it simple for now to ensure 'out' is generated.
  basePath: '/Reimagine',
};

export default nextConfig;
