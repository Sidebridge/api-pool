/** @type {import('next').NextConfig} */

require("dotenv").config();

// Add the following two lines for video support
// const withPlugins = require("next-compose-plugins");
// const withVideos = require("next-videos");

const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: false,
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

// modify export to this
// module.exports = withPlugins([withVideos], nextConfig);

module.exports = nextConfig;
