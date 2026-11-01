import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    // Oglasi su uklonjeni; stari linkovi vode u direktorijum servisa.
    return [
      { source: "/poslovi", destination: "/izvori", permanent: true },
      { source: "/poslovi/:slug", destination: "/izvori", permanent: true },
      { source: "/kompanije", destination: "/izvori", permanent: true },
    ];
  },
};

export default nextConfig;
