import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['get-honey.ai'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
