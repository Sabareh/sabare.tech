/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static exports for client-side deployment
  output: 'export',
  // Ensure trailing slash for proper static file serving
  trailingSlash: true,
  // Disable server-side features
  experimental: {
    esmExternals: 'loose',
  },
  // Configure webpack to ignore server-side modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
      }
    }
    return config
  },
  // Configure headers for markdown files
  async headers() {
    return [
      {
        source: '/content/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
