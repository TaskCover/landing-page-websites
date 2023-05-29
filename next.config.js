/** @type {import('next').NextConfig} */

const apiPath = process.env.apiPath || "http://103.196.145.232:6801/api/v1";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_PATH: apiPath,
  },
};

module.exports = nextConfig;
