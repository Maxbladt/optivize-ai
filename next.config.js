/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
  async rewrites() {
    return {
      // Fallback rewrites only apply when the file is not found in public/
      fallback: [
        {
          source: '/uploads/:path*',
          destination: '/api/uploads/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
