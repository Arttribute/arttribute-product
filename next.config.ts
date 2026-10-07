import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  // Share images read this font from disk at request time.
  outputFileTracingIncludes: {
    "/**": ["./fonts/Inter-Medium.ttf"],
  },
  async redirects() {
    return [
      // Retired pages from the earlier Arttribute site.
      { source: "/licenses", destination: "/", permanent: true },
      { source: "/studio", destination: "/", permanent: true },
      { source: "/private-beta", destination: "/", permanent: true },
      {
        source: "/games",
        destination: "https://arcade.agentcommons.io",
        permanent: false,
      },
      { source: "/writing", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
