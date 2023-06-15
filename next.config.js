/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
    COMPANY_API_URL: process.env.COMPANY_API_URL,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async rewrites() {
    return [
      {
        source: `/app/:path*`,
        destination: `${process.env.API_URL}/:path*`,
      },
      {
        source: `/auth-app/:path*`,
        destination: `${process.env.AUTH_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
