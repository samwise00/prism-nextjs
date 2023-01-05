require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_KEY: process.env.ALCHEMY_KEY,
    THEGRAPH_URL: process.env.THEGRAPH_URL,
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
