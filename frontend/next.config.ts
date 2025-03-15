import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  async exportPathMap(defaultPathMap) {
    // Remove dynamic blog pages from export
    delete defaultPathMap["/blog/[id]"];
    return defaultPathMap;
  },
};

export default nextConfig;
