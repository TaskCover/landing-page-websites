/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/utils/i18n.ts",
);

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    API_URL: process.env.API_URL,
    UPLOAD_API_URL: process.env.UPLOAD_API_URL,
    NEXT_APP_WS_URL: process.env.NEXT_APP_WS_URL,
    FEEDBACK_API_URL: process.env.FEEDBACK_API_URL,
    BLOG_API_URL: process.env.BLOG_API_URL,
    CAREER_API_URL: process.env.CAREER_API_URL,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "113.192.9.79",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
