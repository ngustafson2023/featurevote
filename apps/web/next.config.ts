import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@__APP_NAME__/core'],
}

export default nextConfig
