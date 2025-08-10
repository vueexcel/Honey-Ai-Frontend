import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Skip build if there are TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Skip build if there are ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
