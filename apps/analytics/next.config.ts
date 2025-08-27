import type { NextConfig } from "next"

if (!process.env.API_SERVER_BASEURL) {
  throw new Error(
    "API_SERVER_BASEURL environment variable is required. Please set it in your .env file."
  )
}

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/shared"],
  async rewrites() {
    return [
      {
        source: "/api/baas/:path*",
        destination: `${process.env.API_SERVER_BASEURL}/:path*`
      }
    ]
  }
}

export default nextConfig
