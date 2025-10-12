/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for Netlify
  // output: 'export',
  trailingSlash: true,
  // distDir: 'out',
  
  // Fix for Supabase Edge Runtime issues
  // experimental: {
  //   runtime: 'nodejs', // Invalid option
  // },
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qgyboabomydquodygomq.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
