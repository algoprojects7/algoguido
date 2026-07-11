import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Required in monorepos: tells Next.js where the workspace root is so it can
  // correctly generate Node File Tracing (.nft.json) manifests for all packages.
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: [
    "@algoguido/config",
    "@algoguido/types",
    "@algoguido/utils",
    "@algoguido/shared",
    "@algoguido/auth",
    "@algoguido/ai",
    "@algoguido/ui"
  ]
};

export default nextConfig;
