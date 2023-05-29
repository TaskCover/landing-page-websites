/** @type {import('next').NextConfig} */

const apiPath = process.env.apiPath;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_PATH: apiPath,
  },
};

module.exports = nextConfig;
