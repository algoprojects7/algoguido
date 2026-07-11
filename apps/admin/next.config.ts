import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@algoguido/config",
    "@algoguido/types",
    "@algoguido/utils",
    "@algoguido/shared",
    "@algoguido/auth",
    "@algoguido/ai"
  ]
};

export default nextConfig;
