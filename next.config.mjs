/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  skipTrailingSlashRedirect: true,
  experimental: {
    // Report PDFs are uploaded through server actions
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
